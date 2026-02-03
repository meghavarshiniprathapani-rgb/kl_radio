'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash, Star, Users, FileText, Megaphone, Newspaper, Podcast, Music } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { roleDisplayName } from '@/lib/types';

// Local types for the admin dashboard view
type AdminUser = {
  id: string;
  username: string;
  role: string;
  createdAt: string;
};

type Script = {
  id: string;
  title: string;
  isLive: boolean;
};

type Announcement = {
  id: string;
  title: string;
};

type NewsItem = {
  id: string;
  title: string;
  isLive: boolean;
};

type PodcastScript = {
  id: string;
  title: string;
  status: string;
  isLive: boolean;
};

type SongSuggestion = {
  id: string;
  songTitle: string;
  movie: string;
  name: string;
};

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastScript[]>([]);
  const [songSuggestions, setSongSuggestions] = useState<SongSuggestion[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  
  const { user: adminUser } = useAuth();
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [usersRes, scriptsRes, announcementsRes, newsRes, podcastsRes, suggestionsRes] = await Promise.all([
        api.get('/users'),
        api.get('/scripts'),
        api.get('/announcements'),
        api.get('/news'),
        api.get('/podcasts'),
        api.get('/song-suggestions'),
      ]);
      setUsers(usersRes.data);
      setScripts(scriptsRes.data);
      setAnnouncements(announcementsRes.data);
      setNews(newsRes.data);
      setPodcasts(podcastsRes.data);
      setSongSuggestions(suggestionsRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
      toast({ variant: 'destructive', title: "Error", description: "Could not load all dashboard data." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- User Management ---
  const handleDeleteUser = async (userId: string) => {
    if (userId === adminUser?.id) {
      toast({ variant: 'destructive', title: 'Action Forbidden', description: 'You cannot delete your own account.' });
      return;
    }
    const originalUsers = [...users];
    setUsers(prev => prev.filter(user => user.id !== userId));
    try {
      await api.delete(`/users/${userId}`);
      toast({ title: 'User Deleted', description: 'The user has been successfully removed.' });
    } catch (error: any) {
      setUsers(originalUsers);
      toast({ variant: 'destructive', title: 'Delete Failed', description: error.response?.data?.message || 'Could not delete the user.' });
    }
  };

  // --- Live Content Management ---
  const createLiveHandler = <T extends { id: string; isLive: boolean }>(
    endpoint: string,
    stateSetter: React.Dispatch<React.SetStateAction<T[]>>,
    toastTitle: string
  ) => async (id: string) => {
    try {
      await api.patch(`/${endpoint}/${id}/live`);
      toast({ title: toastTitle, description: 'The content has been marked as live.' });
      const res = await api.get(`/${endpoint}`);
      stateSetter(res.data);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed', description: error.response?.data?.message || 'Could not set the item as live.' });
    }
  };
  
  const handleSetLiveScript = createLiveHandler('scripts', setScripts, 'Live Script Set');
  const handleSetLiveNews = createLiveHandler('news', setNews, 'Live News Set');
  const handleSetLivePodcast = createLiveHandler('podcasts', setPodcasts, 'Live Podcast Set');

  // --- Song Suggestion Management ---
  const handleSuggestionSelectionChange = (id: string, checked: boolean) => {
    setSelectedSuggestions(prev => checked ? [...prev, id] : prev.filter(sId => sId !== id));
  };
  
  const handleSelectAllSuggestions = (checked: boolean) => {
    setSelectedSuggestions(checked ? songSuggestions.map(s => s.id) : []);
  };
  
  const handleBulkDeleteSuggestions = async () => {
    if (selectedSuggestions.length === 0) return;
    const originalSuggestions = [...songSuggestions];
    setSongSuggestions(prev => prev.filter(s => !selectedSuggestions.includes(s.id)));
    try {
      await api.delete('/song-suggestions', { data: { ids: selectedSuggestions } });
      toast({ title: 'Suggestions Deleted', description: `${selectedSuggestions.length} items removed.` });
      setSelectedSuggestions([]);
    } catch (error: any) {
      setSongSuggestions(originalSuggestions);
      toast({ variant: 'destructive', title: 'Delete Failed', description: 'Could not delete suggestions.' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Admin Panel</h1>
        <p className="text-muted-foreground">Full administrative control for the Station Head.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3"><Users /><CardTitle>User Management</CardTitle></div>
            <CardDescription>View and manage all users in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-24 w-full" /> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0 ? users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{roleDisplayName(user.role as any)}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleDeleteUser(user.id)} variant="destructive" size="sm" disabled={user.id === adminUser?.id}>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={4} className="h-24 text-center">No users found.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Scripts */}
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3"><FileText /><CardTitle>Scripts</CardTitle></div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-24 w-full" /> : (
              <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {scripts.length > 0 ? scripts.map(script => (
                    <TableRow key={script.id} className={script.isLive ? 'bg-primary/10' : ''}>
                      <TableCell className="font-medium flex items-center gap-2">{script.title} {script.isLive && <Badge>LIVE</Badge>}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleSetLiveScript(script.id)} variant="outline" size="sm" disabled={script.isLive}><Star className="mr-2 h-4 w-4"/>Set Live</Button>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={2} className="h-24 text-center">No scripts found.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* News */}
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3"><Newspaper /><CardTitle>News</CardTitle></div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-24 w-full" /> : (
              <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {news.length > 0 ? news.map(item => (
                    <TableRow key={item.id} className={item.isLive ? 'bg-primary/10' : ''}>
                      <TableCell className="font-medium flex items-center gap-2">{item.title} {item.isLive && <Badge>LIVE</Badge>}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleSetLiveNews(item.id)} variant="outline" size="sm" disabled={item.isLive}><Star className="mr-2 h-4 w-4"/>Set Live</Button>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={2} className="h-24 text-center">No news items found.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Podcasts */}
         <Card>
          <CardHeader>
             <div className="flex items-center gap-3"><Podcast /><CardTitle>Podcasts</CardTitle></div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-24 w-full" /> : (
              <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {podcasts.length > 0 ? podcasts.map(podcast => (
                    <TableRow key={podcast.id} className={podcast.isLive ? 'bg-primary/10' : ''}>
                      <TableCell className="font-medium flex items-center gap-2">{podcast.title} {podcast.isLive && <Badge>LIVE</Badge>}</TableCell>
                       <TableCell><Badge variant={podcast.status === 'completed' ? 'secondary' : podcast.status === 'recording' ? 'default' : 'outline'}>{podcast.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleSetLivePodcast(podcast.id)} variant="outline" size="sm" disabled={podcast.isLive}><Star className="mr-2 h-4 w-4"/>Set Live</Button>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={3} className="h-24 text-center">No podcasts found.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3"><Megaphone /><CardTitle>Announcements</CardTitle></div>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-24 w-full" /> : (
              <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead></TableRow></TableHeader>
                <TableBody>
                  {announcements.length > 0 ? announcements.map(ann => (
                    <TableRow key={ann.id}>
                      <TableCell>{ann.title}</TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={1} className="h-24 text-center">No announcements found.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* Song Suggestions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3"><Music /><CardTitle>Song Suggestions</CardTitle></div>
            <CardDescription>Review and clear listener song requests.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-24 w-full" /> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"><Checkbox onCheckedChange={handleSelectAllSuggestions} checked={songSuggestions.length > 0 && selectedSuggestions.length === songSuggestions.length} /></TableHead>
                    <TableHead>Song</TableHead>
                    <TableHead>Movie</TableHead>
                    <TableHead>Submitted By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {songSuggestions.length > 0 ? songSuggestions.map(suggestion => (
                    <TableRow key={suggestion.id}>
                      <TableCell><Checkbox onCheckedChange={(checked) => handleSuggestionSelectionChange(suggestion.id, !!checked)} checked={selectedSuggestions.includes(suggestion.id)} /></TableCell>
                      <TableCell>{suggestion.songTitle}</TableCell>
                      <TableCell>{suggestion.movie}</TableCell>
                      <TableCell>{suggestion.name}</TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={4} className="h-24 text-center">No song suggestions.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={handleBulkDeleteSuggestions} variant="destructive" disabled={selectedSuggestions.length === 0}><Trash className="mr-2 h-4 w-4"/>Delete Selected ({selectedSuggestions.length})</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
