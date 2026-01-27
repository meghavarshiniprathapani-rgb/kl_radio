'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SoundWave } from '../ui/sound-wave';
import { AudioWave } from '../ui/audio-wave';
import { SIGNALING_URL, STUN_SERVER, LIVE_STREAM_ROOM_ID } from '@/lib/webrtc';
import { useToast } from '@/hooks/use-toast';
import 'webrtc-adapter';

export function ListenLiveSection() {
  const { toast } = useToast();
  const [streamState, setStreamState] = useState<'offline' | 'connecting' | 'live'>('offline');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const connectedRef = useRef(false);

  const cleanupConnection = useCallback(() => {
    if (socketRef.current) {
        socketRef.current.onclose = null;
        socketRef.current.close();
        socketRef.current = null;
    }
    if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
    }
    if (audioRef.current) {
        audioRef.current.srcObject = null;
    }
    connectedRef.current = false;
    setStreamState('offline');
  }, []);

  const handleTuneIn = useCallback(async () => {
    if (streamState !== 'offline') {
      toast({ title: 'Stream disconnected.' });
      cleanupConnection();
      return;
    }

    if (connectedRef.current) return;
    connectedRef.current = true;

    setStreamState('connecting');
    toast({ title: 'Connecting to Live Stream...', description: 'This may take a moment.' });

    try {
      const pc = new RTCPeerConnection({ iceServers: [{ urls: STUN_SERVER }] });
      peerConnectionRef.current = pc;

      pc.ontrack = (event) => {
        if (audioRef.current) {
          audioRef.current.srcObject = event.streams[0];
          // The button click serves as the required user interaction for autoplay.
          audioRef.current.play().catch(error => {
            console.error("Audio playback failed:", error);
            toast({
              variant: "destructive",
              title: "Audio Playback Failed",
              description: "Your browser may have blocked audio. Click anywhere on the page and try again.",
            });
          });
          setStreamState('live');
          toast({ title: "You're listening live!", description: 'Enjoy the show.' });
        }
      };

      const ws = new WebSocket(SIGNALING_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'request_offer', roomId: LIVE_STREAM_ROOM_ID }));
      };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        const currentPc = peerConnectionRef.current;
        if (!currentPc) return;

        if (data.type === 'offer') {
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
             await currentPc.addIceCandidate(new RTCIceCandidate(data.candidate));
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
        toast({ variant: 'destructive', title: 'Connection Failed', description: 'Could not connect to the live stream.' });
        cleanupConnection();
      };
      
      ws.onclose = () => {
        if(connectedRef.current) {
          cleanupConnection();
        }
      };

    } catch (err) {
        console.error('Failed to start listening', err);
        toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred.' });
        cleanupConnection();
    }
  }, [cleanupConnection, toast, streamState]);

  useEffect(() => {
    // Cleanup connection on component unmount
    return () => cleanupConnection();
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
