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
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/context/auth-context';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';


// Mock Data
const mockTodaysScript = {
  id: '1',
  show: 'Story Time',
  title: '“SISTER”',
  content: `Hi hello namastey miru vintunaru kl radio the voice of kluains with me your rj……. vachesa andi vachesa malli mi mundhuku maroo kotha story tho vachesaa eroju nen chpaboye story deni gurinchi ante Eddari anna la muddula chelli katha…

General ga miru enno bondings gurinchi viney untaru for example akka-chelli, akka-thammudu, bava-bamaridhi, anna-chelli, vadina-maradhalu… kani na kadha koncham special ye .. kadhu kadhu chala special andi..

Chinnapati nundi amma, nanna, friends villey na lokam ga perigina nenu .Prapancham anty na drustilo villu mugurey ani chala gattiga fix awtuna rojulu avi.. School ki veladam allari chyadam malli sayantraniki intiki vachi amma nanna nalatho muchatlu veyadam edy pani ga chestuna days avi..

Entha anandani bayataki natichina edho oka moment lo nak antu evaryna sibiling unty bagundu eppudyna tattukoleni badha vachina pattani santhosham vachina chepukovadaniki nak antu oka manishi undalani na “KALA”.

But manakemo siblings leru kani chala mandhi okadanivey kadha chala happy ga undi untav , nikem siblings leru godavapadey valu undaru prasantaga undochu ani chala chepey vaalu but Unavalaki aa value eppatiki teliyadhu okavela adi manishyna …vastuvayna…

mana manasuki ledha mana sheriraniki degaraga undapudu dani viluva asalu teliyadhu .. Konni days ki friends degara una sare oka teliyani loneliness vachesindi adi entha la impact chsindi anty edyna anipisty okari chpadama ledha Manalo maname dachukundama aney oka pedda question mark na mind lo raise ayindi?? Appati varaku una friends ye tarvatha ela mayamayaro teliyadhu oka certain time tarvatha nak antu evaru leru nak anandani echey amma, dairyam chpey nanna tappa..

Konni sarlu narakam ela untadi anty anni untay kani share chskovali anukunapudu oka correct person manatho undaru amma,nanna ki enni chpukuna inka muta matalu dachukuney dani..Ela chala badhaga , koncham anandanga gadustuna na chinni jindagi loki oka eddari manushulani aa devudu varam ga pampadu..Valley na pranamga anukuntuna ma annayalu ..

A nimisham varaku oka Annaya prema ela untado , vala caring oka ammayi life lo entha impact chupistado asalu minimum idea leni naku tattukoleni prema, muta kataleni anandani parichayam chsaru.Appati varaku devudini nak enduku evarini thoduga evaledhu ani tittukuna nenu aa nimisham nundi chance dorikina prati saari devudiki thanks chpadam start chsa..

manam cheesy prati prayers aa devudu vintado vinaro teliyadhu kani nenu korukuna na santhoshani ma Annaya la Roopam lo na life lo oka pedda varam la aa devudi naku echadu..Siblings kakapoyina , oka thalli pegu pancukuni puttakapoyina na pyna vaalu chupinchey prema ee lokam lo evaru chupinchi undaremo (doubt enduku asalu undaru).

Annaya ani pilichina prati saari tanu enta panilo una sare aa pilupu loni ardham chpakundaney ardham chskuntadu ma bangaramyna Annaya..Ye janma lo punynam chskunano teliyadhu kani oka mulla chettu chuttu oka kavacham la na chuttu vala prema eppati alane undalani korukutuna..

Prati brother-sisters kadha lo kotukovadame vini untaru kani na kadha lo yedchina prati saari tana bhujam ye nak oka Raksha la tana mataley naku oka dairyam la untundi.. Oka nanna tana kuthurini enta allaaru mudhuga penchukuntaru nannu ma annayalu anta kana ekkuva ganey chuskuntaru … DISTANCE DOES’NT MATTER ee line miru chala lovestories lo viney untaru kani ma ee anadamyna bonding lo adey main character ni play chsindi Annaya ani call chsina prati saari call cut chsi vacheylopu na kala mundu pratysham ayeyvadu..

Chpey situation yeppud raledhu kani Annaya without you I’m nothing okavela ni character ye na life lo lekapoty ela untado kuda uhinchukoleni situation . Evari disti tagalakunda prathi janma lo niku SONTHA chellila putalani aa devudini korukuntu ni allari chelli… malli repu marenoo kotha stories tho mi mundhuku vachesthaam….. vintune vundandi kl radio the voice of kluains……. Entha manchiga thana gurinchi chpindhi Akshaya putti…..
Nenu mi rj…….. signing off.`,
};

const mockPlaylist = [
    { title: 'Blinding Lights', movie: 'The Weeknd' },
    { title: 'As It Was', movie: 'Harry Styles' },
    { title: 'Levitating', movie: 'Dua Lipa' },
    { title: 'Save Your Tears', movie: 'The Weeknd' },
    { title: 'good 4 u', movie: 'Olivia Rodrigo' },
];

export default function TechnicalPage() {
  const [isLive, setIsLive] = useState(false);
  const [streamStatus, setStreamStatus] = useState('Offline');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const { songSuggestions, setSongSuggestions } = useAuth();
  const { toast } = useToast();

  const currentSong = isLive ? mockPlaylist[currentSongIndex] : { title: 'Awaiting Song', movie: 'Playlist' };

  const toggleLive = () => {
    setIsLive(!isLive);
    setStreamStatus(isLive ? 'Offline' : 'Online - Stable');
    if (isLive) {
      setIsPlaying(false);
      setSongProgress(0);
    }
  };
  
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
  }, [isPlaying, isLive]);

  const formatTime = (percentage: number) => {
    const totalSeconds = 240; // Example song length: 4 minutes
    const currentSeconds = Math.floor((totalSeconds * percentage) / 100);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  const togglePlayedStatus = (id: string) => {
    setSongSuggestions(
      songSuggestions.map(suggestion => {
        if (suggestion.id === id) {
            const newStatus = suggestion.status === 'Played' ? 'Pending' : 'Played';
            if (suggestion.status !== 'Rejected') {
                toast({
                    title: 'Status Updated',
                    description: `Song suggestion status changed to ${newStatus}.`,
                });
                return { ...suggestion, status: newStatus };
            }
        }
        return suggestion;
      })
    );
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

        {/* Live Scripts and Song Suggestions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Script: {mockTodaysScript.show}</CardTitle>
              <CardDescription>Currently available script for the on-air show.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-4 pr-4 whitespace-pre-wrap">
                  <h3 className="font-semibold text-base">{mockTodaysScript.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{mockTodaysScript.content}</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Music2 className="h-6 w-6" />
                <div>
                  <CardTitle>Song Suggestions</CardTitle>
                  <CardDescription>Incoming requests from listeners.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Song</TableHead>
                      <TableHead>Played</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {songSuggestions.length > 0 ? (
                      songSuggestions.map((suggestion) => (
                        <TableRow key={suggestion.id}>
                          <TableCell>
                            <p className="font-medium">{suggestion.songTitle}</p>
                            <p className="text-xs text-muted-foreground">{suggestion.movie}</p>
                          </TableCell>
                          <TableCell>
                            {suggestion.status === 'Rejected' ? (
                              <Badge variant="destructive">Rejected</Badge>
                            ) : (
                              <Checkbox
                                checked={suggestion.status === 'Played'}
                                onCheckedChange={() => togglePlayedStatus(suggestion.id)}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="h-24 text-center">
                          No song suggestions yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
