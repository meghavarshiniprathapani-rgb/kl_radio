'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Mic,
  RefreshCw,
  Music2,
  Trash2,
  Lightbulb,
  Signal,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import type { SongSuggestion } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { generateSongSuggestion, type GenerateSongSuggestionOutput } from '@/ai/flows/generate-song-suggestion';
import { SIGNALING_URL, STUN_SERVER, LIVE_STREAM_ROOM_ID } from '@/lib/webrtc';
import 'webrtc-adapter';


type LiveScript = {
  id: string;
  show: string;
  title: string;
  content: string;
}

export default function TechnicalPage() {
  const { toast } = useToast();
  const [streamStatus, setStreamStatus] = useState('Offline');
  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [liveScript, setLiveScript] = useState<LiveScript | null>(null);
  const [songSuggestions, setSongSuggestions] = useState<SongSuggestion[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<GenerateSongSuggestionOutput['songs']>([]);

  // WebRTC Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const socketRef = useRef<WebSocket | null>(null);
  const animationFrameRef = useRef<number>();

  // Visualizer refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setIsFetching(true);
    try {
      const suggestionsRes = await api.get('/technical/song-suggestions');
      setSongSuggestions(suggestionsRes.data);
      setSelectedSuggestions([]);
    } catch (error) {
      console.error('Failed to fetch song suggestions', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch song suggestions.'
      });
    } finally {
        setIsFetching(false);
    }
  }, [toast]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsInitialLoading(true);
      try {
        const [scriptRes, suggestionsRes] = await Promise.all([
          api.get('/technical/live-script'),
          api.get('/technical/song-suggestions')
        ]);
        setLiveScript(scriptRes.data);
        setSongSuggestions(suggestionsRes.data);
      } catch (error) {
        console.error('Failed to fetch technical dashboard data', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch dashboard data.'
        });
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchInitialData();
  }, [toast]);

  const stopBroadcast = useCallback(() => {
    setStreamStatus(currentStatus => {
        if (currentStatus === 'Offline') return 'Offline';

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        if (audioContextRef.current) {
            audioContextRef.current.close().catch(console.error);
            audioContextRef.current = null;
        }
        analyserRef.current = null;

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }

        peerConnections.current.forEach(pc => pc.close());
        peerConnections.current.clear();

        if (socketRef.current) {
            if (socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({ type: 'broadcast_end', roomId: LIVE_STREAM_ROOM_ID }));
            }
            socketRef.current.onclose = null;
            socketRef.current.close();
            socketRef.current = null;
        }
        
        return 'Offline';
    });
  }, []);

  const drawVisualizer = useCallback(() => {
      if (!analyserRef.current || !canvasRef.current) return;
      
      const analyser = analyserRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLength);
      let barHeight;
      let x = 0;

      const primaryHsl = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      
      for(let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 1.5;
          const opacity = barHeight / 255 * 0.7 + 0.3;
          
          ctx.fillStyle = `hsla(${primaryHsl} / ${opacity})`;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
          
          x += barWidth + 1;
      }

      animationFrameRef.current = requestAnimationFrame(drawVisualizer);
  }, []);

  const startBroadcast = useCallback(async () => {
    if (socketRef.current) return;

    setStreamStatus('Connecting...');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = stream;

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        source.connect(analyser);
        analyserRef.current = analyser;
        drawVisualizer();

        socketRef.current = new WebSocket(SIGNALING_URL);

        socketRef.current.onopen = () => {
            setStreamStatus('Broadcasting...');
            const message = { type: 'start_broadcast', roomId: LIVE_STREAM_ROOM_ID };
            socketRef.current?.send(JSON.stringify(message));
            toast({ title: "You are live!", description: "Broadcast started successfully." });
        };

        socketRef.current.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            const { from: clientId } = data;

            if (data.type === 'request_offer' && clientId) {
                const pc = new RTCPeerConnection({ iceServers: [{ urls: STUN_SERVER }] });
                peerConnections.current.set(clientId, pc);

                localStreamRef.current?.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current!));

                pc.onicecandidate = (e) => {
                    if (e.candidate && socketRef.current?.readyState === WebSocket.OPEN) {
                        socketRef.current.send(JSON.stringify({
                            to: clientId,
                            type: 'candidate',
                            candidate: e.candidate,
                            roomId: LIVE_STREAM_ROOM_ID
                        }));
                    }
                };
                
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                
                if (socketRef.current?.readyState === WebSocket.OPEN) {
                    socketRef.current.send(JSON.stringify({
                        to: clientId,
                        type: 'offer',
                        offer: pc.localDescription,
                        roomId: LIVE_STREAM_ROOM_ID
                    }));
                }
            } else if (data.type === 'answer' && clientId) {
                const pc = peerConnections.current.get(clientId);
                if (pc && pc.signalingState !== 'closed') {
                   await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
                }
            } else if (data.type === 'candidate' && clientId) {
                const pc = peerConnections.current.get(clientId);
                if (pc) {
                   await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                }
            } else if (data.type === 'listener_left' && clientId) {
                const pc = peerConnections.current.get(clientId);
                if (pc) {
                    pc.close();
                    peerConnections.current.delete(clientId);
                }
            }
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket Error:", error);
            toast({ variant: 'destructive', title: 'Broadcast Error', description: 'Could not connect to the signaling server.' });
            stopBroadcast();
        };

        socketRef.current.onclose = () => {
            if (streamStatus !== 'Offline') {
                toast({ variant: 'destructive', title: 'Connection Lost', description: 'Disconnected from signaling server.' });
                stopBroadcast();
            }
        };

    } catch (err) {
        console.error('Failed to start broadcast', err);
        toast({
            variant: 'destructive',
            title: 'Microphone Error',
            description: 'Could not access your microphone. Please check permissions.',
        });
        stopBroadcast();
    }
  }, [toast, stopBroadcast, drawVisualizer, streamStatus]);

  const toggleLive = () => {
    if (streamStatus !== 'Offline') {
        stopBroadcast();
    } else {
        startBroadcast();
    }
  };

  useEffect(() => {
    return () => stopBroadcast();
  }, [stopBroadcast]);

  const handleSelectionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSuggestions(prev => [...prev, id]);
    } else {
      setSelectedSuggestions(prev => prev.filter(suggestionId => suggestionId !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSuggestions.length === 0) {
      await fetchSuggestions();
      toast({
        title: 'Suggestions Refreshed',
        description: 'The song suggestion list has been updated.',
      });
      return;
    }

    setIsFetching(true);
    const originalSuggestions = [...songSuggestions];
    setSongSuggestions(prev => prev.filter(s => !selectedSuggestions.includes(s.id)));

    try {
      await api.delete('/technical/song-suggestions', { data: { ids: selectedSuggestions } });
      toast({
        title: 'Suggestions Deleted',
        description: `${selectedSuggestions.length} song(s) have been removed.`,
      });
      setSelectedSuggestions([]);
    } catch (error) {
      console.error('Failed to delete suggestions', error);
      setSongSuggestions(originalSuggestions);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete the selected suggestions.',
      });
    } finally {
      setIsFetching(false);
      await fetchSuggestions();
    }
  };

  const handleGenerateSuggestions = async () => {
    if (!aiPrompt) {
        toast({
            variant: 'destructive',
            title: 'Prompt is empty',
            description: 'Please enter a prompt to generate song suggestions.'
        });
        return;
    }
    setIsGenerating(true);
    setAiSuggestions([]);
    try {
        const result = await generateSongSuggestion({ prompt: aiPrompt });
        if (result && result.songs) {
            setAiSuggestions(result.songs);
        }
        toast({
            title: 'Suggestions Generated',
            description: 'AI has generated a list of song suggestions for you.'
        });
    } catch (error) {
        console.error('Failed to generate AI suggestions', error);
        toast({
            variant: 'destructive',
            title: 'Generation Failed',
            description: 'Could not generate song suggestions at this time.'
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const isBroadcasting = streamStatus !== 'Offline';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Technical Wing
        </h1>
        <p className="text-muted-foreground">
          Manage live streams, music playback, and monitor station health.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Broadcast Controls</CardTitle>
              <CardDescription>
                Manage the live broadcast stream and monitor status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="live-switch" checked={isBroadcasting} onCheckedChange={toggleLive} />
                <Label htmlFor="live-switch" className="text-lg font-medium">
                  {isBroadcasting ? 'You are LIVE' : 'Go Live'}
                </Label>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-muted p-3">
                <div className="text-sm">
                  <span className="font-semibold">Stream Status:</span>
                  <span
                    className={`ml-2 font-medium ${
                      streamStatus === 'Broadcasting...'
                        ? 'text-green-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {streamStatus}
                  </span>
                </div>
                <Button variant="outline" size="sm" disabled={!isBroadcasting}>
                  <Signal className="mr-2 h-4 w-4" />
                  Peers: {peerConnections.current.size}
                </Button>
              </div>
               {isBroadcasting && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="mic-visualizer">Microphone Input</Label>
                  <div className="rounded-lg border bg-background p-3">
                    <canvas ref={canvasRef} id="mic-visualizer" width="300" height="50" className="w-full h-[50px]"></canvas>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={toggleLive} className="w-full" variant={isBroadcasting ? 'destructive' : 'default'}>
                <Mic className="mr-2 h-4 w-4" />
                {isBroadcasting ? 'End Broadcast' : 'Start Broadcast'}
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Song Suggester</CardTitle>
              <CardDescription>Get AI-powered song recommendations based on a prompt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Your Prompt</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="e.g., Upbeat indie pop for a sunny afternoon drive"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={3}
                />
              </div>
              {aiSuggestions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-sm">Generated Suggestions:</h4>
                  <ScrollArea className="h-40">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Song Title</TableHead>
                          <TableHead>Artist</TableHead>
                          <TableHead>Movie</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {aiSuggestions.map((song, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{song.title}</TableCell>
                            <TableCell>{song.artist}</TableCell>
                            <TableCell>{song.movie}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              )}
              {isGenerating && (
                  <div className="flex items-center justify-center p-4">
                      <Lightbulb className="mr-2 h-5 w-5 animate-pulse" />
                      <p className="text-muted-foreground text-sm">Generating ideas...</p>
                  </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateSuggestions} disabled={isGenerating} className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Songs'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Script: {liveScript?.show || 'No Live Show'}</CardTitle>
              <CardDescription>Currently available script for the on-air show.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                {isInitialLoading ? <div className="space-y-2 pr-4"><Skeleton className="h-6 w-3/4" /><Skeleton className="h-20 w-full" /></div> : liveScript ? (
                  <div className="space-y-4 pr-4 whitespace-pre-wrap">
                    <h3 className="font-semibold text-base">{liveScript.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{liveScript.content}</p>
                  </div>
                ) : (
                  <p className="text-sm text-center text-muted-foreground py-10">No live script assigned.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Music2 className="h-6 w-6" />
                  <div>
                    <CardTitle>Song Suggestions</CardTitle>
                    <CardDescription>Incoming requests from listeners.</CardDescription>
                  </div>
                </div>
                 <Button onClick={handleBulkDelete} disabled={isFetching} size="sm" variant={selectedSuggestions.length > 0 ? "destructive" : "outline"}>
                  {selectedSuggestions.length > 0 ? (
                    <Trash2 className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                  ) : (
                    <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                  )}
                  {isFetching ? 'Processing...' : (selectedSuggestions.length > 0 ? `Delete (${selectedSuggestions.length})` : 'Refresh')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                {isInitialLoading ? <div className="space-y-2 pr-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div> :
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">
                        <Checkbox 
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSuggestions(songSuggestions.map(s => s.id));
                            } else {
                              setSelectedSuggestions([]);
                            }
                          }}
                          checked={songSuggestions.length > 0 && selectedSuggestions.length === songSuggestions.length}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Song</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {songSuggestions.length > 0 ? (
                      songSuggestions.map((suggestion) => (
                        <TableRow key={suggestion.id}>
                           <TableCell>
                            <Checkbox 
                                onCheckedChange={(checked) => handleSelectionChange(suggestion.id, !!checked)}
                                checked={selectedSuggestions.includes(suggestion.id)}
                                aria-label={`Select ${suggestion.songTitle}`}
                            />
                           </TableCell>
                          <TableCell>
                            <p className="font-medium">{suggestion.songTitle}</p>
                            <p className="text-xs text-muted-foreground">{suggestion.movie}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant={suggestion.status === 'Rejected' ? 'destructive' : suggestion.status === 'Played' ? 'secondary' : 'default'}>
                                {suggestion.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          No song suggestions yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                }
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
