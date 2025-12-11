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
import { PlusCircle, RefreshCw, Pen, Trash, Save } from 'lucide-react';
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
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
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

type Script = {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
};

type NewsItem = {
  article_id: string;
  title: string;
  link: string;
  source_id: string;
  source_url: string;
  description: string | null;
  pubDate: string;
  assignedTo: string | null;
};

export default function CreativePage() {
  const { users, setAssignedNews } = useAuth();
  const rjs = users.filter(u => u.role === 'RJ');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isScriptDialogOpen, setIsScriptDialogOpen] = useState(false);
  const [scriptTitle, setScriptTitle] = useState('');
  const [scriptContent, setScriptContent] = useState('');
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const { toast } = useToast();

  const handleFetchNews = async () => {
    setIsFetching(true);
    try {
      const response = await fetch("https://newsdata.io/api/1/latest?apikey=pub_86147e4c6763799e06ca8b0b19a28eafd574a&country=in&language=te,en&category=education,science,technology,top,breaking&image=0&removeduplicate=1");
      const data = await response.json();
      if (data.status === 'success' && data.results) {
        setNews(data.results.map((item: any) => ({ ...item, assignedTo: null })));
        toast({
          title: "News Fetched",
          description: `Successfully fetched ${data.results.length} new articles.`
        });
      } else {
        throw new Error(data.message || 'Failed to fetch news.');
      }
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

  const handleAssignNews = (articleId: string, rjName: string | null) => {
    const updatedNews = news.map(item =>
      item.article_id === articleId ? { ...item, assignedTo: rjName === 'unassigned' ? null : rjName } : item
    );
    setNews(updatedNews);
  };
  
  const handleSaveAssignments = () => {
    const newsForRj = news.filter(item => item.assignedTo);
    if (newsForRj.length === 0) {
        toast({
            variant: "destructive",
            title: "No assignments to save",
            description: "Please assign at least one news item to an RJ.",
        });
        return;
    }

    const rjNewsItems = newsForRj.map(item => ({
      id: item.article_id,
      title: item.title,
      summary: item.description || 'No summary available.',
      source: item.source_id,
    }));
    
    setAssignedNews(rjNewsItems);

    toast({
        title: "Assignments Saved",
        description: "News assignments have been saved and sent to the RJ dashboard."
    });
  };

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

  const handleSaveScript = () => {
    if (!scriptTitle || !scriptContent) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please provide a title and content for the script.',
      });
      return;
    }

    if (editingScript) {
      // Update existing script
      setScripts(prev => prev.map(s => 
        s.id === editingScript.id 
          ? { ...s, title: scriptTitle, content: scriptContent, lastEdited: new Date().toLocaleString() } 
          : s
      ));
      toast({
        title: 'Script Updated',
        description: `"${scriptTitle}" has been updated.`,
      });
    } else {
      // Create new script
      const newScript: Script = {
        id: `s${scripts.length + 1}`,
        title: scriptTitle,
        content: scriptContent,
        lastEdited: new Date().toLocaleString(),
      };
      setScripts(prev => [...prev, newScript]);
      toast({
        title: 'Script Saved',
        description: `"${scriptTitle}" has been added.`,
      });
    }

    setScriptTitle('');
    setScriptContent('');
    setEditingScript(null);
    setIsScriptDialogOpen(false);
  };

  const handleDeleteScript = (scriptId: string) => {
    setScripts(prev => prev.filter(script => script.id !== scriptId));
    toast({
      title: 'Script Deleted',
      description: 'The script has been removed.',
    });
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Creative Wing
        </h1>
        <p className="text-muted-foreground">
          Write scripts, fetch news, and assign tasks to RJs.
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
              <Label htmlFor="script-title" className="text-right">
                Title
              </Label>
              <Input
                id="script-title"
                value={scriptTitle}
                onChange={(e) => setScriptTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="script-content" className="text-right">
                Content
              </Label>
              <Textarea
                id="script-content"
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                className="col-span-3"
                rows={10}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveScript}>{editingScript ? 'Save Changes' : 'Save Script'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scripts Management */}
        <Card>
          <CardHeader>
            <CardTitle>Scripts</CardTitle>
            <CardDescription>
              Write, upload, and edit scripts for the shows.
            </CardDescription>
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
                    <TableCell>{script.lastEdited}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => openEditScriptDialog(script)} variant="ghost" size="icon" className="h-8 w-8">
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleDeleteScript(script.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
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
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button onClick={openNewScriptDialog}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Write Script
            </Button>
          </CardFooter>
        </Card>

        {/* News Fetching and Assignment */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>News Feed</CardTitle>
                    <CardDescription>
                        Fetch the latest news and assign it to RJs.
                    </CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleFetchNews} disabled={isFetching} variant="outline">
                        <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                        {isFetching ? 'Fetching...' : 'Fetch News'}
                    </Button>
                    <Button onClick={handleSaveAssignments}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                </div>
            </div>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>News Title</TableHead>
                  <TableHead>Assign To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.length > 0 ? news.map((item) => (
                  <TableRow key={item.article_id}>
                    <TableCell>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.source_id}</p>
                    </TableCell>
                    <TableCell className="w-[180px]">
                      <Select 
                        defaultValue={item.assignedTo || "unassigned"}
                        onValueChange={(value) => handleAssignNews(item.article_id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to RJ..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {rjs.map(rj => (
                            <SelectItem key={rj.id} value={rj.name}>{rj.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={2} className="h-24 text-center">
                            No news fetched yet. Click "Fetch News" to get started.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
