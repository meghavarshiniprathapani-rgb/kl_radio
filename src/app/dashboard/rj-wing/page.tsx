'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Newspaper, Podcast, Megaphone, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

type Script = {
  id: string;
  show: string;
  title: string;
  content: string;
};

type PodcastScript = {
  id: string;
  title: string;
  topic: string;
  content: string;
  status: 'recording';
};

type Announcement = {
  id: number;
  title: string;
  date: string;
  content: string;
};

type NewsItem = {
    id: string;
    title: string;
    content: string;
    source: string;
}


export default function RJWingPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [liveScript, setLiveScript] = useState<Script | null>(null);
  const [assignedNews, setAssignedNews] = useState<NewsItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [podcastForRecording, setPodcastForRecording] = useState<PodcastScript | null>(null);

  const fetchPodcast = async () => {
    try {
      const podcastResult = await api.get('/rj/podcast');
      setPodcastForRecording(podcastResult.data);
    } catch (error) {
       console.error('Failed to fetch podcast for recording', error);
       setPodcastForRecording(null);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const scriptPromise = api.get('/rj/live-script');
      const newsPromise = api.get('/rj/news');
      const announcementsPromise = api.get('/public/announcements');
      const podcastPromise = api.get('/rj/podcast');

      const [
        scriptResult,
        newsResult,
        announcementsResult,
        podcastResult,
      ] = await Promise.allSettled([
        scriptPromise,
        newsPromise,
        announcementsPromise,
        podcastPromise,
      ]);

      if (scriptResult.status === 'fulfilled') {
        setLiveScript(scriptResult.value.data);
      } else {
        console.error('Failed to fetch live script', scriptResult.reason);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch the live script.',
        });
      }

      if (newsResult.status === 'fulfilled') {
        setAssignedNews(newsResult.value.data);
      } else {
        console.error('Failed to fetch news', newsResult.reason);
      }
      
      if (announcementsResult.status === 'fulfilled') {
        setAnnouncements(announcementsResult.value.data);
      } else {
        console.error('Failed to fetch announcements', announcementsResult.reason);
      }

      if (podcastResult.status === 'fulfilled') {
        setPodcastForRecording(podcastResult.value.data);
      } else {
        console.error('Failed to fetch podcast for recording', podcastResult.reason);
        setPodcastForRecording(null);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);
  

  const handleMarkComplete = async () => {
    if (!podcastForRecording) return;

    try {
      await api.patch(`/rj/podcast/${podcastForRecording.id}/complete`);
      toast({
        title: 'Podcast Completed',
        description: `"${podcastForRecording.title}" has been marked as complete.`,
      });
      setPodcastForRecording(null);
      // Check if there's a new podcast to record
      fetchPodcast();
    } catch (error) {
      console.error('Failed to mark podcast as complete', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not mark podcast as complete. Please try again.',
      });
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Your Dashboard, RJ
        </h1>
        <p className="text-muted-foreground">
          Everything you need for your upcoming show is right here.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mic className="h-6 w-6" />
              <div>
                <CardTitle>Today's Live Script: {liveScript?.show || 'No Live Show'}</CardTitle>
                <CardDescription>All segments for your show today.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              {isLoading ? <div className="space-y-2 pr-4"><Skeleton className="h-6 w-3/4" /><Skeleton className="h-20 w-full" /></div> : liveScript ? (
                <div className="space-y-4 pr-4 whitespace-pre-wrap">
                    <h3 className="font-semibold text-base">{liveScript.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{liveScript.content}</p>
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground py-10">No live script assigned for today.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Newspaper className="h-6 w-6" />
                    <div>
                        <CardTitle>Today's News</CardTitle>
                        <CardDescription>News items to cover in your segments.</CardDescription>
                    </div>
                </div>
              </CardHeader>
               <CardContent>
                <ScrollArea className="h-40">
                  <div className="space-y-4">
                    {isLoading ? <div className="space-y-2 pr-4"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div> : assignedNews.length > 0 ? (
                        assignedNews.map((item) => (
                        <div key={item.id} className="p-4 border rounded-lg">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{item.content}</p>
                            <p className="text-xs text-muted-foreground/70 mt-2">Source: {item.source}</p>
                        </div>
                        ))
                    ) : (
                        <p className="text-sm text-center text-muted-foreground py-10">No news assigned for today.</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Megaphone className="h-6 w-6" />
                        <div>
                            <CardTitle>Recent Announcements</CardTitle>
                            <CardDescription>Latest station announcements.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-40">
                        <div className="space-y-4">
                            {isLoading ? <div className="space-y-2 pr-4"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div> : announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                <div key={announcement.id} className="p-4 border rounded-lg">
                                    <h3 className="font-semibold">{announcement.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{new Date(announcement.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{announcement.content}</p>
                                </div>
                                ))
                            ) : (
                                <p className="text-sm text-center text-muted-foreground py-10">No recent announcements.</p>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
      
       <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <Podcast className="h-6 w-6" />
                <div>
                    <CardTitle>Podcast for Recording</CardTitle>
                    <CardDescription>The current podcast assigned for recording.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="space-y-2"><Skeleton className="h-20 w-full" /></div>
            ) : podcastForRecording ? (
                 <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg">{podcastForRecording.title}</h3>
                            <p className="text-sm text-muted-foreground">{podcastForRecording.topic}</p>
                        </div>
                        <Badge>{podcastForRecording.status}</Badge>
                    </div>
                    <ScrollArea className="h-40 w-full whitespace-pre-wrap border bg-muted p-3 rounded-md">
                        <p className="text-sm">{podcastForRecording.content}</p>
                    </ScrollArea>
                </div>
            ) : (
                <p className="text-sm text-center text-muted-foreground py-10">No podcast currently marked for recording.</p>
            )}
        </CardContent>
        {podcastForRecording && (
          <CardFooter>
            <Button onClick={handleMarkComplete} className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Complete
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

    