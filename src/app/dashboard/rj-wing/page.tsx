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
import { Mic, Newspaper, Podcast, Megaphone, Star } from 'lucide-react';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


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
  status: 'pending' | 'completed';
  isLive: boolean;
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
  const [podcasts, setPodcasts] = useState<PodcastScript[]>([]);
  const [editingPodcast, setEditingPodcast] = useState<PodcastScript | null>(null);
  const [isPodcastDialogOpen, setIsPodcastDialogOpen] = useState(false);
  const [podcastContent, setPodcastContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const scriptPromise = api.get('/rj/live-script');
      const newsPromise = api.get('/rj/news');
      const announcementsPromise = api.get('/public/announcements');
      const podcastPromise = api.get('/rj/podcasts');

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
        setPodcasts(podcastResult.value.data);
      } else {
        console.error('Failed to fetch podcasts', podcastResult.reason);
        setPodcasts([]);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [toast]);

  const openEditPodcastDialog = (podcast: PodcastScript) => {
    setEditingPodcast(podcast);
    setPodcastContent(podcast.content);
    setIsPodcastDialogOpen(true);
  };

  const handleSaveAndCompletePodcast = async () => {
    if (!editingPodcast || !podcastContent) return;

    try {
        const payload = {
            content: podcastContent,
            status: 'completed'
        };
        const response = await api.put(`/rj/podcasts/${editingPodcast.id}`, payload);
        
        toast({
            title: 'Podcast Completed',
            description: `"${editingPodcast.title}" has been updated and marked as complete.`,
        });

        setPodcasts(prev => prev.map(p => 
            p.id === editingPodcast.id ? response.data : p
        ));
        
        setIsPodcastDialogOpen(false);
    } catch (error) {
        console.error('Failed to update podcast status', error);
        toast({
            variant: 'destructive',
            title: 'Update Failed',
            description: 'Could not update podcast. Please try again.',
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

       <Dialog open={isPodcastDialogOpen} onOpenChange={setIsPodcastDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>Edit Podcast: {editingPodcast?.title}</DialogTitle>
                <DialogDescription>
                    Finalize the script content below. Once you're done, mark it as complete.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Label htmlFor="podcast-content" className="sr-only">Script Content</Label>
                <Textarea 
                    id="podcast-content" 
                    value={podcastContent} 
                    onChange={(e) => setPodcastContent(e.target.value)}
                    rows={15} 
                    placeholder="Enter your final script..."
                />
            </div>
            <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button onClick={handleSaveAndCompletePodcast} disabled={editingPodcast?.status === 'completed'}>
                    {editingPodcast?.status === 'completed' ? 'Completed' : 'Save & Mark Complete'}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

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
                    <CardTitle>Your Podcast Assignments</CardTitle>
                    <CardDescription>Scripts assigned to you for recording.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : podcasts.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Live</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Topic</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {podcasts.map((podcast) => (
                            <TableRow key={podcast.id} className={podcast.isLive ? 'bg-primary/10' : ''}>
                                <TableCell>
                                    {podcast.isLive && <Star className="h-4 w-4 text-primary fill-primary" />}
                                </TableCell>
                                <TableCell className="font-medium">{podcast.title}</TableCell>
                                <TableCell>{podcast.topic}</TableCell>
                                <TableCell>
                                    <Badge variant={podcast.status === 'completed' ? 'secondary' : 'default'}>
                                        {podcast.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => openEditPodcastDialog(podcast)} variant="outline" size="sm">
                                        Edit Script
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-sm text-center text-muted-foreground py-10">No podcasts assigned to you at the moment.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
