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

  const [streamState, setStreamState] = useState<
    'offline' | 'connecting' | 'live'
  >('offline');

  const audioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const cleanupConnection = useCallback(
    (showToast = false) => {
      if (socketRef.current) {
        socketRef.current.onclose = null;
        if (socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.close();
        }
        socketRef.current = null;
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.srcObject = null;
      }

      setStreamState('offline');

      if (showToast) {
        toast({
          variant: 'destructive',
          title: 'Stream Disconnected',
          description: 'The live stream has ended or the connection was lost.',
        });
      }
    },
    [toast]
  );

  const handleTuneIn = useCallback(async () => {
    // Disconnect
    if (streamState !== 'offline') {
      cleanupConnection();
      toast({ title: 'Stream disconnected.' });
      return;
    }

    setStreamState('connecting');
    toast({
      title: 'Connecting to Live Stream...',
      description: 'This may take a moment.',
    });

    try {
      const pc = new RTCPeerConnection(WEBRTC_CONFIG);
      peerConnectionRef.current = pc;

      pc.ontrack = (event) => {
        const stream = event.streams[0];
        if (!stream || !audioRef.current) return;

        // Attach stream
        audioRef.current.srcObject = stream;

        // 🔴 CRITICAL MOBILE FIX
        audioRef.current.muted = false;
        audioRef.current.volume = 1;

        // iOS Safari requirements
        audioRef.current.playsInline = true;
        audioRef.current.setAttribute('playsinline', 'true');

        // Mobile browsers need play after microtask
        setTimeout(() => {
          audioRef.current
            ?.play()
            .catch((err) => console.warn('Audio play blocked:', err));
        }, 0);

        setStreamState('live');
        toast({
          title: "You're listening live!",
          description: 'Enjoy the show.',
        });
      };

      pc.onicecandidate = (event) => {
        if (
          event.candidate &&
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        ) {
          socketRef.current.send(
            JSON.stringify({
              type: 'candidate',
              candidate: event.candidate,
              roomId: LIVE_STREAM_ROOM_ID,
            })
          );
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log('ICE state:', pc.iceConnectionState);
      };

      pc.onconnectionstatechange = () => {
        if (
          pc.connectionState === 'failed' ||
          pc.connectionState === 'disconnected' ||
          pc.connectionState === 'closed'
        ) {
          cleanupConnection(streamState === 'live');
        }
      };

      const ws = new WebSocket(SIGNALING_URL);
      socketRef.current = ws;

     ws.onopen = () => {
  ws.send(
    JSON.stringify({
      type: 'join',
      roomId: LIVE_STREAM_ROOM_ID,
      role: 'listener',
    })
  );

  // ✅ MOBILE FIX: keep WebSocket alive
  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'ping' }));
    }
  }, 15000);

  // clear ping on close
  ws.onclose = () => {
    clearInterval(pingInterval);
    cleanupConnection(streamState === 'live');
  };
};


      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        const currentPc = peerConnectionRef.current;
        if (!currentPc) return;

        if (data.type === 'offer') {
          await currentPc.setRemoteDescription(
            new RTCSessionDescription(data.offer)
          );
          const answer = await currentPc.createAnswer();
          await currentPc.setLocalDescription(answer);

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                type: 'answer',
                answer: currentPc.localDescription,
                roomId: LIVE_STREAM_ROOM_ID,
                listenerId: data.listenerId,
              })
            );
          }
        } else if (data.type === 'candidate' && data.candidate) {
          try {
            await currentPc.addIceCandidate(
              new RTCIceCandidate(data.candidate)
            );
          } catch (e) {
            console.error('Error adding ICE candidate', e);
          }
        } else if (data.type === 'broadcast_end') {
          toast({
            title: 'Broadcast has ended',
            description: 'Thanks for listening!',
          });
          cleanupConnection();
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        cleanupConnection(true);
      };

      ws.onclose = () => {
        cleanupConnection(streamState === 'live');
      };
    } catch (err) {
      console.error('Failed to start listening', err);
      cleanupConnection(true);
    }
  }, [cleanupConnection, toast, streamState]);

  useEffect(() => {
    return () => cleanupConnection();
  }, [cleanupConnection]);

  const getButtonText = () => {
    switch (streamState) {
      case 'live':
        return 'Disconnect';
      case 'connecting':
        return 'Connecting...';
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
              {streamState === 'live'
                ? "You're tuned in to KL Radio."
                : 'When we go live, you can tune in here!'}
            </p>

            <div className="my-8 h-[60px] w-[240px] flex items-center justify-center">
              {streamState === 'live' ? (
                <AudioWave />
              ) : (
                <div className="text-primary-foreground/50 text-sm">
                  Stream Offline
                </div>
              )}
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

           <audio
  ref={audioRef}
  playsInline
  style={{
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
    pointerEvents: 'none',
  }}
/>
/>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
