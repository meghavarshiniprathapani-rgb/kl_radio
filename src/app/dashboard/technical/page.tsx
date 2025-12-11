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
    </div>
  )
}
