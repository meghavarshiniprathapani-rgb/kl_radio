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
import { Mic, Newspaper, Podcast, Megaphone } from 'lucide-react';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


type Script = {
  id: string;
  show: string;
  title: string;
  content: string;
};

type LivePodcast = {
  id: string;
  title: string;
  topic: string;
  content: string;
  status: string;
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
  const [livePodcast, setLivePodcast] = useState<LivePodcast | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const scriptRes = await api.get('/rj/live-script');
        setLiveScript(scriptRes.data);
      } catch (error) {
        console.error('Failed to fetch live script', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch the live script.',
        });
      }

      try {
        const newsRes = await api.get('/rj/news');
        setAssignedNews(newsRes.data);
      } catch (error) {
        console.error('Failed to fetch news', error);
        // Silently fail is ok, UI will show an empty state.
      }
      
      try {
        const announcementsRes = await api.get('/public/announcements');
        setAnnouncements(announcementsRes.data);
      } catch (error) {
        console.error('Failed to fetch announcements', error);
        // Silently fail is ok, UI will show an empty state.
      }

      try {
        const podcastRes = await api.get('/rj/podcast');
        setLivePodcast(podcastRes.data);
      } catch (error) {
        console.error('Failed to fetch live podcast', error);
        setLivePodcast(null);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [toast]);

  const handleMarkPodcastComplete = async () => {
    if (!livePodcast) return;

    try {
        await api.patch(`/rj/podcast/${livePodcast.id}/complete`);
        toast({
            title: 'Podcast Complete',
            description: `"${livePodcast.title}" has been marked as complete.`,
        });
        setLivePodcast(null);
    } catch (error) {
        console.error('Failed to update podcast status', error);
        toast({
            variant: 'destructive',
            title: 'Update Failed',
            description: 'Could not update podcast status. Please try again.',
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
              <CardTitle>Live Podcast Episode</CardTitle>
              <CardDescription>The podcast script ready for you to record.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : livePodcast ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{livePodcast.title}</h3>
                <p className="text-sm text-muted-foreground">Topic: {livePodcast.topic}</p>
              </div>
              <ScrollArea className="h-60">
                <p className="text-sm whitespace-pre-wrap pr-4">{livePodcast.content}</p>
              </ScrollArea>
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground py-10">No live podcast assigned to you at the moment.</p>
          )}
        </CardContent>
        {livePodcast && !isLoading && (
          <CardFooter>
              <Button onClick={handleMarkPodcastComplete} className="w-full">
                  Mark as Complete
              </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
