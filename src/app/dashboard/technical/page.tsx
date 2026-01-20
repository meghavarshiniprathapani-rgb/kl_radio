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
  PlayCircle,
  Mic,
  RefreshCw,
  PauseCircle,
  Rewind,
  FastForward,
  Shuffle,
  Repeat,
  Volume2,
  Music2,
  Trash2,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/context/auth-context';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import type { SongSuggestion } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


type LiveScript = {
  id: string;
  show: string;
  title: string;
  content: string;
}

const mockPlaylist = [
    { title: 'Blinding Lights', movie: 'The Weeknd' },
    { title: 'As It Was', movie: 'Harry Styles' },
    { title: 'Levitating', movie: 'Dua Lipa' },
    { title: 'Save Your Tears', movie: 'The Weeknd' },
    { title: 'good 4 u', movie: 'Olivia Rodrigo' },
];

export default function TechnicalPage() {
  const { toast } = useToast();
  const [isLive, setIsLive] = useState(false);
  const [streamStatus, setStreamStatus] = useState('Offline');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [liveScript, setLiveScript] = useState<LiveScript | null>(null);
  const [songSuggestions, setSongSuggestions] = useState<SongSuggestion[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

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

  const draw = useCallback(() => {
    if (!analyserRef.current || !canvasRef.current) {
      return;
    }
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = dataArray[i] / 2;
      ctx.fillStyle = `hsl(${barHeight + 100}, 100%, 50%)`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }

    animationFrameRef.current = requestAnimationFrame(draw);
  }, []);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      sourceRef.current = audioContext.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      animationFrameRef.current = requestAnimationFrame(draw);
    } catch (err) {
      console.error('Failed to get mic', err);
      toast({
        variant: 'destructive',
        title: 'Microphone Error',
        description: 'Could not access your microphone. Please check permissions.',
      });
      setIsLive(false);
      setStreamStatus('Offline');
      localStorage.setItem('kl-radio-live-status', 'offline');
    }
  };

  const stopMic = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);
  
  const toggleLive = () => {
    const newLiveState = !isLive;
    setIsLive(newLiveState);
    if (newLiveState) {
        startMic();
        setStreamStatus('Online - Mic Active');
        localStorage.setItem('kl-radio-live-status', 'online');
    } else {
        stopMic();
        setStreamStatus('Offline');
        localStorage.setItem('kl-radio-live-status', 'offline');
    }
  };

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
      await Promise.all(
        selectedSuggestions.map(id => api.delete(`/technical/song-suggestions/${id}`))
      );
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

  const currentSong = isLive ? mockPlaylist[currentSongIndex] : { title: 'Awaiting Song', movie: 'Playlist' };

  const togglePlay = () => {
    if (!isLive) return;
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (!isLive) return;
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % mockPlaylist.length);
    setSongProgress(0);
  };

  const handlePreviousSong = () => {
    if (!isLive) return;
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + mockPlaylist.length) % mockPlaylist.length);
    setSongProgress(0);
  };


  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isPlaying && isLive) {
      progressInterval = setInterval(() => {
        setSongProgress(prev => {
          if (prev >= 100) {
            handleNextSong();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(progressInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isLive]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => stopMic();
  }, [stopMic]);

  const formatTime = (percentage: number) => {
    const totalSeconds = 240; // Example song length: 4 minutes
    const currentSeconds = Math.floor((totalSeconds * percentage) / 100);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
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
                <Switch id="live-switch" checked={isLive} onCheckedChange={toggleLive} />
                <Label htmlFor="live-switch" className="text-lg font-medium">
                  {isLive ? 'You are LIVE' : 'Go Live'}
                </Label>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-muted p-3">
                <div className="text-sm">
                  <span className="font-semibold">Stream Status:</span>
                  <span
                    className={`ml-2 font-medium ${
                      streamStatus.includes('Online')
                        ? 'text-green-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {streamStatus}
                  </span>
                </div>
                <Button variant="outline" size="sm" disabled={!isLive}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Check Health
                </Button>
              </div>
               {isLive && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="mic-visualizer">Microphone Input</Label>
                  <div className="rounded-lg border bg-muted p-3">
                    <canvas ref={canvasRef} id="mic-visualizer" width="300" height="50" className="w-full h-[50px]"></canvas>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={toggleLive} className="w-full" variant={isLive ? 'destructive' : 'default'}>
                <Mic className="mr-2 h-4 w-4" />
                {isLive ? 'End Broadcast' : 'Start Broadcast'}
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Music Streamer</CardTitle>
              <CardDescription>Control the music being played on air.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Now Playing</p>
                <p className="font-bold">{currentSong.title}</p>
                <p className="text-xs text-muted-foreground">{currentSong.movie}</p>
              </div>
              <div className="space-y-1">
                <Progress value={songProgress} className="w-full h-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(songProgress)}</span>
                  <span>4:00</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Shuffle className="h-5 w-5"/>
                </Button>
                <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="icon" onClick={handlePreviousSong} disabled={!isLive}>
                        <Rewind className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={togglePlay} disabled={!isLive}>
                        {isPlaying ? <PauseCircle className="h-8 w-8" /> : <PlayCircle className="h-8 w-8" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleNextSong} disabled={!isLive}>
                        <FastForward className="h-6 w-6" />
                    </Button>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Repeat className="h-5 w-5"/>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <Slider 
                  defaultValue={[volume]} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setVolume(value[0])}
                  disabled={!isLive}
                />
              </div>

            </CardContent>
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
