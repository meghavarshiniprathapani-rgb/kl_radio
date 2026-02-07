'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SoundWave } from '../ui/sound-wave';
import { AudioWave } from '../ui/audio-wave';
import { SIGNALING_URL, LIVE_STREAM_ROOM_ID, WEBRTC_CONFIG } from '@/lib/webrtc';
import { useToast } from '@/hooks/use-toast';
import 'webrtc-adapter';

type StreamState = 'offline' | 'connecting' | 'live';

export function ListenLiveSection() {
  const { toast } = useToast();

  const [streamState, setStreamState] = useState<StreamState>('offline');

  const audioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanupConnection = useCallback(
    (showToast = false) => {
      // Stop ping
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }

      // Close WS
      if (socketRef.current) {
        try {
          socketRef.current.onopen = null;
          socketRef.current.onmessage = null;
          socketRef.current.onerror = null;
          socketRef.current.onclose = null;

          if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();
          }
        } catch {
          // ignore
        }
        socketRef.current = null;
      }

      // Close PC
      if (peerConnectionRef.current) {
        try {
          peerConnectionRef.current.ontrack = null;
          peerConnectionRef.current.onicecandidate = null;
          peerConnectionRef.current.oniceconnectionstatechange = null;
          peerConnectionRef.current.onconnectionstatechange = null;
          peerConnectionRef.current.close();
        } catch {
          // ignore
        }
        peerConnectionRef.current = null;
      }

      // Reset audio element
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch {
          // ignore
        }
        audioRef.current.srcObject = null;
      }

      setStreamState('offline');

      if (showToast) {
        toast({
          variant: 'destructive',
          title: 'Stream Disconnected',
          description: 'The live stream ended or the connection was lost.',
        });
      }
    },
    [toast]
  );

  const primeAudioWithGesture = async () => {
    const el = audioRef.current;
    if (!el) return;

    // iOS/Safari friendly attributes
    el.playsInline = true;
    el.setAttribute('playsinline', 'true');
    el.preload = 'auto';

    // Ensure not muted
    el.muted = false;
    el.volume = 1;

    // Prime play inside user gesture (tap)
    try {
      await el.play();
      // If there's no srcObject yet, Safari may start then pause immediately — that's fine.
      console.log('✅ audio primed via user gesture');
    } catch (e) {
      console.log('⚠️ audio prime play blocked (expected on some browsers):', e);
    }
  };

  const handleTuneIn = useCallback(async () => {
    // Disconnect
    if (streamState !== 'offline') {
      cleanupConnection(false);
      toast({ title: 'Stream disconnected.' });
      return;
    }

    setStreamState('connecting');

    toast({
      title: 'Connecting to Live Stream...',
      description: 'This may take a moment.',
    });

    try {
      // 🔑 iOS SAFARI: prime audio with direct user gesture (this click)
      await primeAudioWithGesture();

      const pc = new RTCPeerConnection(WEBRTC_CONFIG);
      peerConnectionRef.current = pc;

      // ✅ iOS/mobile reliability: explicitly declare we want to receive audio
      pc.addTransceiver('audio', { direction: 'recvonly' });

      pc.ontrack = (event) => {
        const el = audioRef.current;
        const stream = event.streams?.[0];

        console.log('ontrack:', {
          kind: event.track.kind,
          muted: event.track.muted,
          readyState: event.track.readyState,
          streams: event.streams?.length ?? 0,
        });

        if (!el || !stream) return;

        // Attach stream
        el.srcObject = stream;

        // Make sure Safari has the right flags
        el.muted = false;
        el.volume = 1;
        el.playsInline = true;
        el.setAttribute('playsinline', 'true');

        // Attempt to play again after attaching stream
        // (this usually succeeds because we primed play on click)
        queueMicrotask(() => {
          el.play().catch((err) => {
            console.warn('Audio play blocked:', err);
          });
        });

        setStreamState('live');
        toast({
          title: "You're listening live!",
          description: 'Enjoy the show.',
        });
      };

      pc.onicecandidate = (event) => {
        const ws = socketRef.current;
        if (event.candidate && ws && ws.readyState === WebSocket.OPEN) {
          ws.send(
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
        console.log('PC state:', pc.connectionState);
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

        // ✅ Keep WS alive on mobile
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, 15000);
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
            await currentPc.addIceCandidate(new RTCIceCandidate(data.candidate));
          } catch (e) {
            console.error('Error adding ICE candidate', e);
          }
        } else if (data.type === 'broadcast_end') {
          toast({
            title: 'Broadcast has ended',
            description: 'Thanks for listening!',
          });
          cleanupConnection(false);
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
    return () => cleanupConnection(false);
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

            {/* ✅ MUST exist in DOM (not hidden). Also avoid 0x0 sizing on iOS. */}
            <audio
              ref={audioRef}
              playsInline
              preload="auto"
              style={{
                position: 'fixed',
                left: '-9999px',
                top: '0px',
                width: '1px',
                height: '1px',
                opacity: 0.01,
                pointerEvents: 'none',
              }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
