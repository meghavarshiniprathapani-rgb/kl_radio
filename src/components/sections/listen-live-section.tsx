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

  const streamStateRef = useRef<StreamState>('offline');
  useEffect(() => {
    streamStateRef.current = streamState;
  }, [streamState]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const connectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
    if (connectTimeoutRef.current) {
      clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
  };

  const cleanupConnection = useCallback(
    (showToast = false) => {
      clearTimers();

      const ws = socketRef.current;
      if (ws) {
        try {
          ws.onopen = null;
          ws.onmessage = null;
          ws.onerror = null;
          ws.onclose = null;
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
        } catch {}
        socketRef.current = null;
      }

      const pc = peerConnectionRef.current;
      if (pc) {
        try {
          pc.ontrack = null;
          pc.onicecandidate = null;
          pc.oniceconnectionstatechange = null;
          pc.onconnectionstatechange = null;
          pc.close();
        } catch {}
        peerConnectionRef.current = null;
      }

      const el = audioRef.current;
      if (el) {
        try { el.pause(); } catch {}
        el.srcObject = null;
      }

      setStreamState('offline');

      if (showToast) {
        toast({
          variant: 'destructive',
          title: 'Could not connect',
          description: 'Stream is offline or connection failed.',
        });
      }
    },
    [toast]
  );

  const primeAudioWithGesture = async () => {
    const el = audioRef.current;
    if (!el) return;

    el.playsInline = true;
    el.setAttribute('playsinline', 'true');
    el.preload = 'auto';
    el.muted = false;
    el.volume = 1;

    try {
      await el.play();
      console.log('✅ audio primed via tap');
    } catch (e) {
      console.log('⚠️ prime play blocked:', e);
    }
  };

  const handleTuneIn = useCallback(async () => {
    // Disconnect
    if (streamStateRef.current !== 'offline') {
      cleanupConnection(false);
      toast({ title: 'Stream disconnected.' });
      return;
    }

    setStreamState('connecting');
    toast({ title: 'Connecting...', description: 'Trying to tune in.' });

    // Hard timeout so you never “spin forever”
    connectTimeoutRef.current = setTimeout(() => {
      console.warn('⏱️ connect timeout (no offer/ontrack)');
      cleanupConnection(true);
    }, 15000);

    try {
      // iOS: must be inside tap
      await primeAudioWithGesture();

      const pc = new RTCPeerConnection(WEBRTC_CONFIG);
      peerConnectionRef.current = pc;

      // iOS/mobile: explicitly receive audio
      pc.addTransceiver('audio', { direction: 'recvonly' });

      pc.ontrack = (event) => {
        console.log('🎧 ontrack fired:', {
          kind: event.track.kind,
          muted: event.track.muted,
          readyState: event.track.readyState,
          streams: event.streams?.length ?? 0,
        });

        const stream = event.streams?.[0];
        const el = audioRef.current;
        if (!stream || !el) return;

        el.srcObject = stream;
        el.muted = false;
        el.volume = 1;
        el.playsInline = true;
        el.setAttribute('playsinline', 'true');

        queueMicrotask(() => {
          el.play().catch((err) => console.warn('play blocked:', err));
        });

        clearTimers(); // connected successfully
        setStreamState('live');
        toast({ title: "You're live!", description: 'Enjoy.' });
      };

      pc.onicecandidate = (event) => {
        const ws = socketRef.current;
        if (event.candidate && ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'candidate', candidate: event.candidate, roomId: LIVE_STREAM_ROOM_ID }));
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log('ICE:', pc.iceConnectionState);
      };

      pc.onconnectionstatechange = () => {
        console.log('PC:', pc.connectionState);
        if (['failed', 'disconnected', 'closed'].includes(pc.connectionState)) {
          cleanupConnection(streamStateRef.current === 'live');
        }
      };

      const ws = new WebSocket(SIGNALING_URL);
      socketRef.current = ws;

      ws.onerror = (e) => console.log('❌ WS error:', e);
      ws.onopen = () => {
        console.log('✅ WS opened:', SIGNALING_URL);

        ws.send(JSON.stringify({ type: 'join', roomId: LIVE_STREAM_ROOM_ID, role: 'listener' }));

        // keep alive
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }));
        }, 15000);
      };

      ws.onclose = (e) => {
        console.log('WS closed:', e.code, e.reason);
        cleanupConnection(streamStateRef.current === 'live');
      };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log('📩 WS msg:', data.type);

        const currentPc = peerConnectionRef.current;
        if (!currentPc) return;

        if (data.type === 'offer') {
          console.log('📩 got offer');
          await currentPc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await currentPc.createAnswer();
          await currentPc.setLocalDescription(answer);

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'answer',
              answer: currentPc.localDescription,
              roomId: LIVE_STREAM_ROOM_ID,
              listenerId: data.listenerId,
            }));
          }
        } else if (data.type === 'candidate' && data.candidate) {
          await currentPc.addIceCandidate(new RTCIceCandidate(data.candidate)).catch((err) => {
            console.error('ICE add error', err);
          });
        } else if (data.type === 'broadcast_end') {
          toast({ title: 'Broadcast ended', description: 'Thanks for listening!' });
          cleanupConnection(false);
        }
      };
    } catch (err) {
      console.error('Failed to start listening:', err);
      cleanupConnection(true);
    }
  }, [cleanupConnection, toast]);

  useEffect(() => {
    return () => cleanupConnection(false);
  }, [cleanupConnection]);

  const getButtonText = () => {
    if (streamState === 'live') return 'Disconnect';
    if (streamState === 'connecting') return 'Connecting...';
    return 'Tune In to Live Stream';
  };

  return (
    <section id="listen-live" className="container mx-auto max-w-5xl px-4 py-20 md:py-28">
      <div className="relative">
        <SoundWave />
        <Card className="relative overflow-hidden bg-primary text-primary-foreground shadow-2xl backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center md:p-16">
            <h2 className="font-headline text-5xl font-bold">
              {streamState === 'live' ? 'We Are Live!' : 'Listen Live'}
            </h2>

            <p className="mt-2 max-w-md text-primary-foreground/80">
              {streamState === 'live' ? "You're tuned in to KL Radio." : 'When we go live, you can tune in here!'}
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

            {/* Keep it rendered; avoid 0x0 on iOS */}
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
