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

  const cleanupConnection = useCallback(() => {
    setStreamState(currentState => {
        if (currentState === 'offline') return 'offline';

        if (socketRef.current) {
            if(socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({ type: 'listener_left', roomId: LIVE_STREAM_ROOM_ID }));
            }
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
        return 'offline';
    });
  }, []);

  const handleTuneIn = useCallback(() => {
    if (streamState !== 'offline' || socketRef.current) return;

    setStreamState('connecting');
    toast({ title: 'Connecting to Live Stream...', description: 'This may take a moment.' });

    socketRef.current = new WebSocket(SIGNALING_URL);

    socketRef.current.onopen = () => {
        socketRef.current?.send(JSON.stringify({ type: 'request_offer', roomId: LIVE_STREAM_ROOM_ID }));
    };

    socketRef.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'offer') {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: STUN_SERVER }] });
            peerConnectionRef.current = pc;

            pc.ontrack = (e) => {
                if (audioRef.current) {
                    audioRef.current.srcObject = e.streams[0];
                    setStreamState('live');
                    toast({ title: "You're listening live!", description: 'Enjoy the show.' });
                }
            };
            
            pc.onicecandidate = (e) => {
                if (e.candidate && socketRef.current?.readyState === WebSocket.OPEN) {
                    socketRef.current.send(JSON.stringify({
                        type: 'candidate',
                        candidate: e.candidate,
                        roomId: LIVE_STREAM_ROOM_ID
                    }));
                }
            };

            await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({
                    type: 'answer',
                    answer: pc.localDescription,
                    roomId: LIVE_STREAM_ROOM_ID
                }));
            }
        } else if (data.type === 'candidate') {
            if (peerConnectionRef.current) {
                await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        } else if (data.type === 'broadcast_end') {
            toast({ title: 'Broadcast has ended', description: 'Thanks for listening!' });
            cleanupConnection();
        }
    };
    
    socketRef.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
        toast({ variant: 'destructive', title: 'Connection Failed', description: 'Could not connect to the live stream.' });
        cleanupConnection();
    };

    socketRef.current.onclose = () => {
        if (streamState !== 'offline') {
            cleanupConnection();
        }
    };
  }, [streamState, cleanupConnection, toast]);

  useEffect(() => {
    return () => cleanupConnection();
  }, [cleanupConnection]);

  const getButtonText = () => {
    switch (streamState) {
      case 'live':
        return 'Listening Live';
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
              {streamState === 'live' ? "You're tuned in to KL Radio." : "The stream is currently offline. When we go live, you can tune in here!"}
            </p>
            <div className="my-8 h-[60px] w-[240px] flex items-center justify-center">
              {streamState === 'live' ? <AudioWave /> : <div className="text-primary-foreground/50 text-sm">Stream Offline</div>}
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="w-full max-w-xs text-lg font-bold shadow-lg transition-transform hover:scale-105 bg-background text-foreground hover:bg-background/80 rounded-full"
              disabled={streamState !== 'offline'}
              onClick={handleTuneIn}
            >
              {getButtonText()}
            </Button>
             <audio ref={audioRef} autoPlay playsInline />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
