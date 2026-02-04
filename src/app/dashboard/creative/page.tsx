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
import { PlusCircle, Pen, Trash, Save, Megaphone, Podcast, Newspaper, Star, PlayCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

type Script = {
  id: string;
  title: string;
  content: string;
  isLive: boolean;
  lastEdited: string;
};

type Announcement = {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
};

type PodcastScript = {
  id: string;
  title: string;
  topic: string;
  content: string;
  lastEdited: string;
  status: 'draft' | 'recording' | 'completed';
};

type NewsItem = {
    id: string;
    title: string;
    content: string;
    source: string;
    lastEdited: string;
    isLive?: boolean;
};

export default function CreativePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isScriptDialogOpen, setIsScriptDialogOpen] = useState(false);
  const [scriptTitle, setScriptTitle] = useState('');
  const [scriptContent, setScriptContent] = useState('');
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const [podcastScripts, setPodcastScripts] = useState<PodcastScript[]>([]);
  const [isPodcastDialogOpen, setIsPodcastDialogOpen] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<PodcastScript | null>(null);
  const [podcastTitle, setPodcastTitle] = useState('');
  const [podcastTopic, setPodcastTopic] = useState('');
  const [podcastContent, setPodcastContent] = useState('');
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsSource, setNewsSource] = useState('');


  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const scriptsPromise = api.get('/creative/scripts').then(res => setScripts(res.data)).catch(err => {
        console.error("Failed to fetch scripts", err);
        toast({ variant: "destructive", title: "Fetch Error", description: "Could not load scripts." });
      });

      const announcementsPromise = api.get('/creative/announcements').then(res => setAnnouncements(res.data)).catch(err => {
        console.error("Failed to fetch announcements", err);
        toast({ variant: "destructive", title: "Fetch Error", description: "Could not load announcements." });
      });

      const podcastsPromise = api.get('/creative/podcasts').then(res => setPodcastScripts(res.data)).catch(err => {
        console.error("Failed to fetch podcasts", err);
        toast({ variant: "destructive", title: "Fetch Error", description: "Could not load podcast scripts." });
      });

      const newsPromise = api.get('/creative/news').then(res => setNews(res.data)).catch(err => {
        console.error("Failed to fetch news", err);
        toast({ variant: "destructive", title: "Fetch Error", description: "Could not load news items." });
      });

      await Promise.allSettled([
        scriptsPromise,
        announcementsPromise,
        podcastsPromise,
        newsPromise,
      ]);
      
      setIsLoading(false);
    };
    fetchData();
  }, [toast]);

  // --- SCRIPT MANAGEMENT ---
  const openNewScriptDialog = () => {
    setEditingScript(null);
    setScriptTitle('');
    setScriptContent('');
    setIsScriptDialogOpen(true);
  };

  const openEditScriptDialog = (script: Script) => {
    setEditingScript(script);
    setScriptTitle(script.title);
    setScriptContent(script.content);
    setIsScriptDialogOpen(true);
  };

  const handleSaveScript = async () => {
    if (!scriptTitle || !scriptContent) {
      toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please provide a title and content for the script.' });
      return;
    }

    const payload = { title: scriptTitle, content: scriptContent };

    try {
      if (editingScript) {
        const response = await api.put(`/creative/scripts/${editingScript.id}`, payload);
        setScripts(prev => prev.map(s => s.id === editingScript.id ? response.data : s));
        toast({ title: 'Script Updated', description: `"${scriptTitle}" has been updated.` });
      } else {
        const response = await api.post('/creative/scripts', payload);
        setScripts(prev => [...prev, response.data]);
        toast({ title: 'Script Saved', description: `"${scriptTitle}" has been added.` });
      }
      setIsScriptDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to save script", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.response?.data?.message || 'Could not save the script.' });
    }
  };

  const handleDeleteScript = async (scriptId: string) => {
    const originalScripts = [...scripts];
    setScripts(prev => prev.filter(script => script.id !== scriptId));
    try {
      await api.delete(`/creative/scripts/${scriptId}`);
      toast({ title: 'Script Deleted', description: 'The script has been removed.' });
    } catch (error: any) {
      console.error("Failed to delete script", error);
      setScripts(originalScripts);
      toast({ variant: 'destructive', title: 'Delete Failed', description: error.response?.data?.message || 'Could not delete the script.' });
    }
  };

  const handleSetLiveScript = async (scriptId: string) => {
    try {
      await api.patch(`/creative/scripts/${scriptId}/live`);
      setScripts(prev => prev.map(s => ({ ...s, isLive: s.id === scriptId })));
      toast({ title: 'Live Script Set', description: 'The script has been marked as live.' });
    } catch (error: any) {
      console.error("Failed to set live script", error);
      toast({ variant: 'destructive', title: 'Failed', description: error.response?.data?.message || 'Could not set the live script.' });
    }
  };


  // --- ANNOUNCEMENT MANAGEMENT ---
  const openNewAnnouncementDialog = () => {
    setEditingAnnouncement(null);
    setAnnouncementTitle('');
    setAnnouncementContent('');
    setIsAnnouncementDialogOpen(true);
  };

  const openEditAnnouncementDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementTitle(announcement.title);
    setAnnouncementContent(announcement.content);
    setIsAnnouncementDialogOpen(true);
  };

  const handleSaveAnnouncement = async () => {
    if (!announcementTitle || !announcementContent) {
      toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please provide a title and content.' });
      return;
    }
    
    const payload = { title: announcementTitle, content: announcementContent };

    try {
      if (editingAnnouncement) {
        const response = await api.put(`/creative/announcements/${editingAnnouncement.id}`, payload);
        setAnnouncements(prev => prev.map(a => a.id === editingAnnouncement.id ? response.data : a));
        toast({ title: 'Announcement Updated', description: `"${announcementTitle}" has been updated.` });
      } else {
        const response = await api.post('/creative/announcements', payload);
        setAnnouncements(prev => [...prev, response.data]);
        toast({ title: 'Announcement Saved', description: `"${announcementTitle}" has been added.` });
      }
      setIsAnnouncementDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to save announcement", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.response?.data?.message || 'Could not save the announcement.' });
    }
  };

  const handleDeleteAnnouncement = async (announcementId: string) => {
    const originalAnnouncements = [...announcements];
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== announcementId));
    try {
      await api.delete(`/creative/announcements/${announcementId}`);
      toast({ title: 'Announcement Deleted', description: 'The announcement has been removed.' });
    } catch (error: any) {
      console.error("Failed to delete announcement", error);
      setAnnouncements(originalAnnouncements);
      toast({ variant: 'destructive', title: 'Delete Failed', description: error.response?.data?.message || 'Could not delete the announcement.' });
    }
  };
  
  // --- PODCAST SCRIPT MANAGEMENT ---
  const openNewPodcastDialog = () => {
    setEditingPodcast(null);
    setPodcastTitle('');
    setPodcastTopic('');
    setPodcastContent('');
    setIsPodcastDialogOpen(true);
  };

  const openEditPodcastDialog = (podcast: PodcastScript) => {
    setEditingPodcast(podcast);
    setPodcastTitle(podcast.title);
    setPodcastTopic(podcast.topic);
    setPodcastContent(podcast.content);
    setIsPodcastDialogOpen(true);
  };

  const handleSavePodcast = async () => {
    if (!podcastTitle || !podcastTopic || !podcastContent) {
      toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please provide a title, topic, and content.' });
      return;
    }

    const payload = { 
        title: podcastTitle, 
        topic: podcastTopic,
        content: podcastContent,
    };

    try {
      if (editingPodcast) {
        const response = await api.put(`/creative/podcasts/${editingPodcast.id}`, payload);
        setPodcastScripts(prev => prev.map(p => p.id === editingPodcast.id ? response.data : p));
        toast({ title: 'Podcast Script Updated', description: `"${podcastTitle}" has been updated.` });
      } else {
        const response = await api.post('/creative/podcasts', payload);
        setPodcastScripts(prev => [...prev, response.data]);
        toast({ title: 'Podcast Script Saved', description: `"${podcastTitle}" has been added.` });
      }
      setIsPodcastDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to save podcast script", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.response?.data?.message || 'Could not save the podcast script.' });
    }
  };
  
  const handleDeletePodcast = async (podcastId: string) => {
    const originalPodcasts = [...podcastScripts];
    setPodcastScripts(prev => prev.filter(p => p.id !== podcastId));
    try {
      await api.delete(`/creative/podcasts/${podcastId}`);
      toast({ title: 'Podcast Script Deleted', description: 'The script has been removed.' });
    } catch (error: any) {
      console.error("Failed to delete podcast script", error);
      setPodcastScripts(originalPodcasts);
      toast({ variant: 'destructive', title: 'Delete Failed', description: error.response?.data?.message || 'Could not delete the script.' });
    }
  };

  const handleMarkForRecording = async (podcastId: string) => {
    try {
        await api.patch(`/creative/podcasts/${podcastId}/recording`);
        
        // Refetch to get the latest state, as backend handles status logic
        const podcastsResponse = await api.get('/creative/podcasts');
        setPodcastScripts(podcastsResponse.data);

        toast({ title: 'Podcast Sent for Recording', description: 'The podcast is now available for RJs.' });
    } catch (error: any) {
        console.error("Failed to set podcast for recording", error);
        toast({ variant: 'destructive', title: 'Failed', description: error.response?.data?.message || 'Could not mark the podcast for recording.' });
    }
  };


  // --- NEWS ITEM MANAGEMENT ---
  const openNewNewsDialog = () => {
    setNewsTitle('');
    setNewsContent('');
    setNewsSource('');
    setIsNewsDialogOpen(true);
  };

  const handleSaveNews = async () => {
    if (!newsTitle || !newsContent || !newsSource) {
      toast({ variant: 'destructive', title: 'Missing Fields', description: 'Title, Content, and Source are required.' });
      return;
    }

    const payload = { title: newsTitle, content: newsContent, source: newsSource };

    try {
      const response = await api.post('/creative/news', payload);
      setNews(prev => [...prev, response.data]);
      toast({ title: 'News Item Saved', description: `"${newsTitle}" has been added.` });
      setIsNewsDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to save news item", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.response?.data?.message || 'Could not save the news item.' });
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    const originalNews = [...news];
    setNews(prev => prev.filter(item => item.id !== newsId));
    try {
      await api.delete(`/creative/news/${newsId}`);
      toast({ title: 'News Item Deleted', description: 'The news item has been removed.' });
    } catch (error: any) {
      console.error("Failed to delete news item", error);
      setNews(originalNews);
      toast({ variant: 'destructive', title: 'Delete Failed', description: error.response?.data?.message || 'Could not delete the news item.' });
    }
  };

  const handleSetLiveNews = async (newsId: string) => {
    try {
      await api.patch(`/creative/news/${newsId}/live`);
      setNews(prev => prev.map(n => ({ ...n, isLive: n.id === newsId })));
      toast({ title: 'Live News Set', description: 'The news item has been marked as live for RJs.' });
    } catch (error: any) {
      console.error("Failed to set live news", error);
      toast({ variant: 'destructive', title: 'Failed', description: error.response?.data?.message || 'Could not set the live news item.' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Creative Wing
        </h1>
        <p className="text-muted-foreground">
          Write scripts, create announcements, and manage podcasts.
        </p>
      </div>

      <Dialog open={isScriptDialogOpen} onOpenChange={(isOpen) => {
          setIsScriptDialogOpen(isOpen);
          if (!isOpen) {
            setEditingScript(null);
            setScriptTitle('');
            setScriptContent('');
          }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingScript ? 'Edit Script' : 'Write a New Script'}</DialogTitle>
            <DialogDescription>
              {editingScript ? 'Modify the details of your script below.' : 'Create a new script for an upcoming show.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="script-title" className="text-right">Title</Label>
              <Input id="script-title" value={scriptTitle} onChange={(e) => setScriptTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="script-content" className="text-right">Content</Label>
              <Textarea id="script-content" value={scriptContent} onChange={(e) => setScriptContent(e.target.value)} className="col-span-3" rows={10} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSaveScript}>{editingScript ? 'Save Changes' : 'Save Script'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAnnouncementDialogOpen} onOpenChange={(isOpen) => {
          setIsAnnouncementDialogOpen(isOpen);
          if (!isOpen) {
              setEditingAnnouncement(null);
              setAnnouncementTitle('');
              setAnnouncementContent('');
          }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAnnouncement ? 'Edit Announcement' : 'Create an Announcement'}</DialogTitle>
            <DialogDescription>
              {editingAnnouncement ? 'Modify the details of your announcement.' : 'Draft a new announcement.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="announcement-title" className="text-right">Title</Label>
              <Input id="announcement-title" value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="announcement-content" className="text-right">Content</Label>
              <Textarea id="announcement-content" value={announcementContent} onChange={(e) => setAnnouncementContent(e.target.value)} className="col-span-3" rows={10} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSaveAnnouncement}>{editingAnnouncement ? 'Save Changes' : 'Save Announcement'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPodcastDialogOpen} onOpenChange={(isOpen) => {
          setIsPodcastDialogOpen(isOpen);
          if (!isOpen) {
            setEditingPodcast(null);
            setPodcastTitle('');
            setPodcastTopic('');
            setPodcastContent('');
          }
      }}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingPodcast ? 'Edit Podcast Script' : 'Create a Podcast Script'}</DialogTitle>
            <DialogDescription>
              {editingPodcast ? 'Modify the details of the podcast script.' : 'Draft a new script for a podcast episode.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="podcast-title" className="text-right">Title</Label>
              <Input id="podcast-title" value={podcastTitle} onChange={(e) => setPodcastTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="podcast-topic" className="text-right">Topic</Label>
              <Input id="podcast-topic" value={podcastTopic} onChange={(e) => setPodcastTopic(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="podcast-content" className="text-right">Content</Label>
              <Textarea id="podcast-content" value={podcastContent} onChange={(e) => setPodcastContent(e.target.value)} className="col-span-3" rows={8} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSavePodcast}>{editingPodcast ? 'Save Changes' : 'Save Script'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewsDialogOpen} onOpenChange={(isOpen) => {
          setIsNewsDialogOpen(isOpen);
          if (!isOpen) {
            setNewsTitle('');
            setNewsContent('');
            setNewsSource('');
          }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a News Item</DialogTitle>
            <DialogDescription>
              Draft a new news item for RJs to announce.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="news-title" className="text-right">Title</Label>
              <Input id="news-title" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="news-source" className="text-right">Source</Label>
              <Input id="news-source" value={newsSource} onChange={(e) => setNewsSource(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="news-content" className="text-right">Content</Label>
              <Textarea id="news-content" value={newsContent} onChange={(e) => setNewsContent(e.target.value)} className="col-span-3" rows={8} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSaveNews}>Save News Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Scripts</CardTitle>
            <CardDescription>
              Write and edit scripts for the shows. Mark one as LIVE.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div> :
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Live</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scripts.length > 0 ? scripts.map((script) => (
                  <TableRow key={script.id} className={script.isLive ? 'bg-primary/10' : ''}>
                    <TableCell>
                      <Button onClick={() => handleSetLiveScript(script.id)} variant="ghost" size="icon" className="h-8 w-8" disabled={script.isLive}>
                        <Star className={`h-4 w-4 ${script.isLive ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{script.title}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => openEditScriptDialog(script)} variant="ghost" size="icon" className="h-8 w-8"><Pen className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDeleteScript(script.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No scripts created yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            }
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button onClick={openNewScriptDialog}><PlusCircle className="mr-2 h-4 w-4" />Write Script</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Create and manage station announcements.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div> :
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.length > 0 ? announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => openEditAnnouncementDialog(announcement)} variant="ghost" size="icon" className="h-8 w-8"><Pen className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDeleteAnnouncement(announcement.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={2} className="h-24 text-center">No announcements created yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
            }
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button onClick={openNewAnnouncementDialog}><Megaphone className="mr-2 h-4 w-4" />Create Announcement</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Podcast Scripts</CardTitle>
            <CardDescription>Draft and manage scripts for podcast episodes.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div> :
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>For Recording</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {podcastScripts.length > 0 ? podcastScripts.map((podcast) => (
                  <TableRow key={podcast.id} className={podcast.status === 'recording' ? 'bg-primary/10' : ''}>
                    <TableCell>
                      <Button onClick={() => handleMarkForRecording(podcast.id)} variant="ghost" size="icon" className="h-8 w-8" disabled={podcast.status !== 'draft'}>
                        <PlayCircle className={`h-4 w-4 ${podcast.status === 'recording' ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{podcast.title}</TableCell>
                    <TableCell>{podcast.topic}</TableCell>
                    <TableCell>
                      <Badge variant={podcast.status === 'completed' ? 'secondary' : podcast.status === 'recording' ? 'default' : 'outline'}>
                        {podcast.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => openEditPodcastDialog(podcast)} variant="ghost" size="icon" className="h-8 w-8"><Pen className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDeletePodcast(podcast.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={5} className="h-24 text-center">No podcast scripts created yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
            }
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
             <Button onClick={openNewPodcastDialog}><Podcast className="mr-2 h-4 w-4" />Create Podcast Script</Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-3">
          <CardHeader>
            <CardTitle>News Items</CardTitle>
            <CardDescription>
                Create, assign, and manage news items for RJs. Mark one as LIVE.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div> :
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Live</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.length > 0 ? news.map((item) => (
                  <TableRow key={item.id} className={item.isLive ? 'bg-primary/10' : ''}>
                    <TableCell>
                      <Button onClick={() => handleSetLiveNews(item.id)} variant="ghost" size="icon" className="h-8 w-8" disabled={item.isLive}>
                        <Star className={`h-4 w-4 ${item.isLive ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.source}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => handleDeleteNews(item.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No news items created yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
            }
          </CardContent>
           <CardFooter className="flex justify-end gap-2">
            <Button onClick={openNewNewsDialog}><Newspaper className="mr-2 h-4 w-4" />Create News Item</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

    
