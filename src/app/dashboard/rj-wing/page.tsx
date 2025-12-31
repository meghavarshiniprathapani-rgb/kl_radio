'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Newspaper, Podcast, Megaphone } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

type Script = {
  id: string;
  show: string;
  title: string;
  content: string;
};

type Podcast = {
  id: string;
  title: string;
  topic: string;
  status: string;
  completed: boolean;
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
    summary: string;
    source: string;
}


export default function RJWingPage() {
  const { toast } = useToast();
  const [liveScript, setLiveScript] = useState<Script | null>(null);
  const [assignedNews, setAssignedNews] = useState<NewsItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scriptRes, newsRes, announcementsRes, podcastsRes] = await Promise.all([
          api.get('/rj/live-script'),
          api.get('/rj/news'),
          api.get('/rj/announcements'),
          api.get('/rj/podcasts'),
        ]);
        setLiveScript(scriptRes.data);
        setAssignedNews(newsRes.data);
        setAnnouncements(announcementsRes.data);
        setPodcasts(podcastsRes.data.map((p: any) => ({...p, completed: p.status === 'completed'})));
      } catch (error) {
        console.error('Failed to fetch RJ dashboard data', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch all dashboard data.',
        });
      }
    };
    fetchData();
  }, [toast]);

  const handlePodcastCompletionChange = async (podcastId: string) => {
    const originalPodcasts = [...podcasts];
    const podcast = podcasts.find(p => p.id === podcastId);
    if (!podcast) return;

    const updatedPodcasts = podcasts.map(p =>
      p.id === podcastId ? { ...p, completed: !p.completed, status: !p.completed ? 'completed' : 'pending' } : p
    );
    setPodcasts(updatedPodcasts);

    try {
      await api.patch(`/rj/podcasts/${podcastId}/complete`);
      toast({
        title: 'Podcast Status Updated',
        description: `"${podcast.title}" marked as complete.`,
      });
    } catch (error) {
      console.error('Failed to update podcast status', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not update podcast status. Please try again.',
      });
      setPodcasts(originalPodcasts); // Revert on error
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
              {liveScript ? (
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
                    {assignedNews.map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                          <p className="text-xs text-muted-foreground/70 mt-2">Source: {item.source}</p>
                      </div>
                    ))}
                     {assignedNews.length === 0 && (
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
                            {announcements.map((announcement) => (
                                <div key={announcement.id} className="p-4 border rounded-lg">
                                    <h3 className="font-semibold">{announcement.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{new Date(announcement.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{announcement.content}</p>
                                </div>
                            ))}
                             {announcements.length === 0 && (
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
              <CardTitle>Assigned Podcasts</CardTitle>
              <CardDescription>Podcast episodes assigned to you for recording.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {podcasts.length > 0 ? (
            <div className="space-y-4">
              {podcasts.map((podcast) => (
                <div key={podcast.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Topic: {podcast.topic}</p>
                    <p className="text-sm font-medium text-primary mt-2">{podcast.status}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`completed-${podcast.id}`}
                      checked={podcast.completed}
                      onCheckedChange={() => handlePodcastCompletionChange(podcast.id)}
                    />
                    <Label htmlFor={`completed-${podcast.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Mark as Complete
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground py-10">No podcasts assigned to you at the moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
