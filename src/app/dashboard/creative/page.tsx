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
import { PlusCircle, RefreshCw, Pen, Trash, Save, Megaphone, Podcast } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { api } from '@/lib/api';

type Script = {
  id: string;
  title: string;
  content: string;
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
};

export default function CreativePage() {
  const { toast } = useToast();
  
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
  const [podcastTitle, setPodcastTitle] = useState('');
  const [podcastTopic, setPodcastTopic] = useState('');
  const [podcastContent, setPodcastContent] = useState('');
  const [editingPodcast, setEditingPodcast] = useState<PodcastScript | null>(null);
  
  const [isFetching, setIsFetching] = useState(false);


  const fetchScripts = async () => {
    try {
      const response = await api.get('/creative/scripts');
      setScripts(response.data);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch scripts.' });
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/creative/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch announcements.' });
    }
  };

  const fetchPodcasts = async () => {
    try {
      const response = await api.get('/creative/podcasts');
      setPodcastScripts(response.data);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch podcast scripts.' });
    }
  };

  useEffect(() => {
    fetchScripts();
    fetchAnnouncements();
    fetchPodcasts();
  }, []);

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
      toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please provide title and content.' });
      return;
    }
    try {
      if (editingScript) {
        await api.put(`/creative/scripts/${editingScript.id}`, { title: scriptTitle, content: scriptContent });
        toast({ title: 'Script Updated' });
      } else {
        await api.post('/creative/scripts', { title: scriptTitle, content: scriptContent });
        toast({ title: 'Script Saved' });
      }
      fetchScripts();
      setIsScriptDialogOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save script.' });
    }
  };

  const handleDeleteScript = async (scriptId: string) => {
    try {
      await api.delete(`/creative/scripts/${scriptId}`);
      toast({ title: 'Script Deleted' });
      fetchScripts();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete script.' });
    }
  };

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
      toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please provide title and content.' });
      return;
    }
    try {
      if (editingAnnouncement) {
        await api.put(`/creative/announcements/${editingAnnouncement.id}`, { title: announcementTitle, content: announcementContent });
        toast({ title: 'Announcement Updated' });
      } else {
        await api.post('/creative/announcements', { title: announcementTitle, content: announcementContent });
        toast({ title: 'Announcement Saved' });
      }
      fetchAnnouncements();
      setIsAnnouncementDialogOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save announcement.' });
    }
  };

  const handleDeleteAnnouncement = async (announcementId: string) => {
    try {
      await api.delete(`/creative/announcements/${announcementId}`);
      toast({ title: 'Announcement Deleted' });
      fetchAnnouncements();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete announcement.' });
    }
  };

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
      toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please provide title, topic, and content.' });
      return;
    }
    try {
      if (editingPodcast) {
        await api.put(`/creative/podcasts/${editingPodcast.id}`, { title: podcastTitle, topic: podcastTopic, content: podcastContent });
        toast({ title: 'Podcast Script Updated' });
      } else {
        await api.post('/creative/podcasts', { title: podcastTitle, topic: podcastTopic, content: podcastContent });
        toast({ title: 'Podcast Script Saved' });
      }
      fetchPodcasts();
      setIsPodcastDialogOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save podcast script.' });
    }
  };

  const handleDeletePodcast = async (podcastId: string) => {
    try {
      await api.delete(`/creative/podcasts/${podcastId}`);
      toast({ title: 'Podcast Script Deleted' });
      fetchPodcasts();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete podcast script.' });
    }
  };

  const handleFetchNews = async () => {
    setIsFetching(true);
    try {
      const response = await api.get("/news/fetch");
      // Assuming the creative page itself doesn't need to display the news, but trigger the fetch.
      // If it needs to display, news state management will be needed here.
      toast({
        title: "News Fetch Triggered",
        description: `Backend is fetching fresh articles.`
      });
    } catch (error: any) {
      console.error('Error fetching news:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Could not fetch news articles.',
      });
    } finally {
      setIsFetching(false);
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

      <Dialog open={isScriptDialogOpen} onOpenChange={setIsScriptDialogOpen}>
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
      
      <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
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
      
      <Dialog open={isPodcastDialogOpen} onOpenChange={setIsPodcastDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPodcast ? 'Edit Podcast Script' : 'New Podcast Script'}</DialogTitle>
            <DialogDescription>
              {editingPodcast ? 'Modify your podcast script.' : 'Draft a new podcast script.'}
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scripts</CardTitle>
            <CardDescription>Write and edit scripts for the shows.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Last Edited</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scripts.length > 0 ? scripts.map((script) => (
                  <TableRow key={script.id}>
                    <TableCell className="font-medium">{script.title}</TableCell>
                    <TableCell>{new Date(script.lastEdited).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => openEditScriptDialog(script)} variant="ghost" size="icon" className="h-8 w-8"><Pen className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDeleteScript(script.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">No scripts created yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Last Edited</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.length > 0 ? announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell>{new Date(announcement.lastEdited).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => openEditAnnouncementDialog(announcement)} variant="ghost" size="icon" className="h-8 w-8"><Pen className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDeleteAnnouncement(announcement.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">No announcements created yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Last Edited</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {podcastScripts.length > 0 ? podcastScripts.map((podcast) => (
                  <TableRow key={podcast.id}>
                    <TableCell className="font-medium">{podcast.title}</TableCell>
                    <TableCell>{podcast.topic}</TableCell>
                    <TableCell>{new Date(podcast.lastEdited).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => openEditPodcastDialog(podcast)} variant="ghost" size="icon" className="h-8 w-8"><Pen className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDeletePodcast(podcast.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={4} className="h-24 text-center">No podcast scripts created yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button onClick={openNewPodcastDialog}><Podcast className="mr-2 h-4 w-4" />Create Podcast Script</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>News Feed</CardTitle>
            <CardDescription>Fetch the latest news for RJs.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground text-center p-8'>Click the button to have the backend fetch the latest news articles. This won't display the news here, but makes it available for the RJ dashboard.</p>
          </CardContent>
           <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleFetchNews} disabled={isFetching} variant="outline">
                <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Fetching...' : 'Fetch News'}
              </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
