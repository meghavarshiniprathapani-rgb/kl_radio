'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SoundWave } from '../ui/sound-wave';
import { AudioWave } from '../ui/audio-wave';
import { SIGNALING_URL, LIVE_STREAM_ROOM_ID, WEBRTC_CONFIG } from '@/lib/webrtc';
import { useToast } from '@/hooks/use-toast';
import 'webrtc-adapter';

export function ListenLiveSection() {
  const { toast } = useToast();
  const [streamState, setStreamState] = useState<'offline' | 'connecting' | 'live'>('offline');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const connectedRef = useRef(false);

  // --- Timeout and Retry refs ---
  const offerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const streamStateRef = useRef(streamState);
  useEffect(() => {
    streamStateRef.current = streamState;
  }, [streamState]);

  const cleanupConnection = useCallback((showErrorToast = false, errorDetails?: {title: string, description: string}) => {
    if (offerTimeoutRef.current) {
        clearTimeout(offerTimeoutRef.current);
        offerTimeoutRef.current = null;
    }
    if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
        retryIntervalRef.current = null;
    }

    if (socketRef.current) {
        socketRef.current.onclose = null;
        socketRef.current.close();
        socketRef.current = null;
    }
    if (peerConnectionRef.current) {
        peerConnectionRef.current.onconnectionstatechange = null;
        peerConnectionRef.current.ontrack = null;
        peerConnectionRef.current.onicecandidate = null;
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
    }
    if (audioRef.current) {
        audioRef.current.srcObject = null;
    }
    connectedRef.current = false;
    setStreamState('offline');
    if (showErrorToast) {
        toast({
          variant: "destructive",
          title: errorDetails?.title || "Stream Unavailable",
          description: errorDetails?.description || "The live stream is currently offline or could not connect.",
        });
    }
  }, [toast]);

  const handleTuneIn = useCallback(async () => {
    if (streamStateRef.current !== 'offline') {
      toast({ title: 'Stream disconnected.' });
      cleanupConnection();
      return;
    }

    if (connectedRef.current) return;
    connectedRef.current = true;

    setStreamState('connecting');
    toast({ title: 'Connecting to Live Stream...', description: 'This may take a moment.' });
    
    // STEP 1: Offer Timeout
    offerTimeoutRef.current = setTimeout(() => {
        if (streamStateRef.current === 'connecting') {
            cleanupConnection(true, {
                title: "Live stream not available",
                description: "The broadcast is not reachable right now.",
            });
        }
    }, 10000);

    try {
      const pc = new RTCPeerConnection(WEBRTC_CONFIG);
      peerConnectionRef.current = pc;

      // STEP 5: ICE Completion Guard
      pc.onconnectionstatechange = () => {
        if(pc.connectionState === 'connected') {
          if (streamStateRef.current !== 'live') {
            setStreamState('live');
            toast({ title: "You're listening live!", description: 'Enjoy the show.' });
          }
        }
        if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
          cleanupConnection(streamStateRef.current === 'live');
        }
      };
      
      pc.ontrack = (event) => {
        if (offerTimeoutRef.current) clearTimeout(offerTimeoutRef.current);
        if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
        if (audioRef.current) {
          audioRef.current.srcObject = event.streams[0];
          audioRef.current.play().catch(error => {
            console.error("Audio playback failed:", error);
            cleanupConnection(true, {
                title: "Audio Playback Failed",
                description: "Your browser may have blocked audio. Please click the button again.",
            })
          });
        }
      };
      
      const ws = new WebSocket(SIGNALING_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        let offerRetries = 0;
        
        const requestOffer = () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'request_offer', roomId: LIVE_STREAM_ROOM_ID }));
            }
        }
        
        requestOffer();

        // STEP 3: Retry offer request
        retryIntervalRef.current = setInterval(() => {
            if (streamStateRef.current === 'connecting' && offerRetries < 2) {
                offerRetries++;
                requestOffer();
            } else if (retryIntervalRef.current) {
                clearInterval(retryIntervalRef.current);
            }
        }, 3000);
      };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        const currentPc = peerConnectionRef.current;
        if (!currentPc) return;

        if (data.type === 'offer') {
          if (offerTimeoutRef.current) clearTimeout(offerTimeoutRef.current);
          if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);

          await currentPc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await currentPc.createAnswer();
          await currentPc.setLocalDescription(answer);

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'answer',
              answer: currentPc.localDescription,
              roomId: LIVE_STREAM_ROOM_ID
            }));
          }
        } else if (data.type === 'candidate' && data.candidate) {
           if (currentPc.remoteDescription) {
             try {
                await currentPc.addIceCandidate(new RTCIceCandidate(data.candidate));
             } catch(e) {
                console.error("Error adding ICE candidate", e);
             }
           }
        } else if (data.type === 'broadcast_end') {
           toast({ title: 'Broadcast has ended', description: 'Thanks for listening!' });
           cleanupConnection();
        }
      };
      
      pc.onicecandidate = (event) => {
        if (event.candidate && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'candidate',
            candidate: event.candidate,
            roomId: LIVE_STREAM_ROOM_ID
          }));
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        cleanupConnection(true);
      };
      
      ws.onclose = () => {
        if (streamStateRef.current === 'live') {
            toast({ title: "Stream disconnected", description: "The connection was lost." });
        }
        if (connectedRef.current) {
            cleanupConnection();
        }
      };

    } catch (err) {
        console.error('Failed to start listening', err);
        cleanupConnection(true);
    }
  }, [cleanupConnection, toast]);

  useEffect(() => {
    return () => {
        cleanupConnection();
    };
  }, [cleanupConnection]);

  const getButtonText = () => {
    switch (streamState) {
      case 'live':
        return 'Disconnect';
      case 'connecting':
        return 'Connecting...';
      case 'offline':
      default:
        return 'Tune In to Live Stream';
    }
  };

  return (
    <section
      id="listen-live"
      className="container mx-auto max-w-5xl px-4 py-20 md:py-28"
    >
      <div className="relative">
        <SoundWave />
        <Card className="relative overflow-hidden bg-primary text-primary-foreground shadow-2xl backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center md:p-16">
            <h2 className="font-headline text-5xl font-bold">
              {streamState === 'live' ? 'We Are Live!' : 'Listen Live'}
            </h2>
            <p className="mt-2 max-w-md text-primary-foreground/80">
              {streamState === 'live' ? "You're tuned in to KL Radio." : "When we go live, you can tune in here!"}
            </p>
            <div className="my-8 h-[60px] w-[240px] flex items-center justify-center">
              {streamState === 'live' ? <AudioWave /> : <div className="text-primary-foreground/50 text-sm">Stream Offline</div>}
            </div>
            <Button
              size="lg"
              variant={streamState === 'live' ? 'destructive' : 'secondary'}
              className="w-full max-w-xs text-lg font-bold shadow-lg transition-transform hover:scale-105 bg-background text-foreground hover:bg-background/80 rounded-full"
              disabled={streamState === 'connecting'}
              onClick={handleTuneIn}
            >
              {getButtonText()}
            </Button>
             <audio ref={audioRef} autoPlay controls className="mt-4" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
