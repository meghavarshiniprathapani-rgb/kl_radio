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
  Music,
  List,
  RefreshCw,
  PauseCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

// Mock Data
const mockScripts = [
  {
    id: 's1',
    title: 'Morning Rush Intro',
    show: 'Morning Rush',
    content: "Good morning, Klians! Welcome to the Morning Rush... We've got a great show for you today!",
  },
  {
    id: 's2',
    title: 'Weather Update',
    show: 'Morning Rush',
    content: 'Time for a quick look at the weather. Expect clear skies...',
  },
];

const mockSuggestions = [
  {
    id: '1',
    songTitle: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    status: 'Pending',
  },
  {
    id: '2',
    songTitle: 'Bohemian Rhapsody',
    artist: 'Queen',
    status: 'Played',
  },
  {
    id: '3',
    songTitle: 'Hotel California',
    artist: 'Eagles',
    status: 'Pending',
  },
];

export default function TechnicalPage() {
  const [isLive, setIsLive] = useState(false);
  const [streamStatus, setStreamStatus] = useState('Offline');
  const [currentSong, setCurrentSong] = useState({ title: 'Silence', artist: 'N/A' });
  const [songProgress, setSongProgress] = useState(0);

  const toggleLive = () => {
    setIsLive(!isLive);
    setStreamStatus(isLive ? 'Offline' : 'Online - Stable');
  };

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
        {/* Broadcast Controls and Music Streamer */}
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
                      streamStatus.includes('Stable')
                        ? 'text-green-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {streamStatus}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Check Health
                </Button>
              </div>
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
                <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
              </div>
              <Progress value={songProgress} className="w-full" />
              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="icon">
                  <PlayCircle className="h-6 w-6" />
                </Button>
                 <Button variant="ghost" size="icon">
                  <PauseCircle className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Scripts and Song Suggestions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Scripts</CardTitle>
              <CardDescription>Currently available scripts for the on-air show.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-4">
                  {mockScripts.map((script) => (
                    <div key={script.id} className="rounded-lg border p-3">
                      <h3 className="font-semibold">{script.title} ({script.show})</h3>
                      <p className="text-sm text-muted-foreground">
                        {script.content}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Song Suggestions</CardTitle>
                <CardDescription>View listener song requests.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-48">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Song</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockSuggestions.map((suggestion) => (
                            <TableRow key={suggestion.id}>
                            <TableCell>
                                <p className="font-medium">{suggestion.songTitle}</p>
                                <p className="text-xs text-muted-foreground">{suggestion.artist}</p>
                            </TableCell>
                            <TableCell>
                                <Badge variant={suggestion.status === 'Played' ? 'default' : suggestion.status === 'Pending' ? 'secondary' : 'destructive'}>
                                {suggestion.status}
                                </Badge>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
           </Card>
        </div>
      </div>
  I have replaced "Approved" with "Played" in the song suggestions feature. The status now correctly appears as "Played" in both the main suggestions table and on the Technical Wing's dashboard.
    </div>
  )
}
