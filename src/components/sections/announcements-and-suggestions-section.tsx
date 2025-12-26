'use client';

import { Music, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react';
import { api } from '@/lib/api';

function SuggestionForm() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [movie, setMovie] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !songTitle || !movie) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill out all fields to suggest a song.',
      });
      return;
    }
    try {
        await api.post('/public/song-suggestion', { name, songTitle, movie });
        toast({
          title: 'Suggestion received!',
          description: "Thanks for the recommendation. We'll check it out!",
        });
        setName('');
        setSongTitle('');
        setMovie('');
    } catch(error) {
         toast({
            variant: 'destructive',
            title: 'Submission Error',
            description: 'Could not submit your suggestion. Please try again later.',
        });
    }
  };

  return (
    <div id="suggestions" className="space-y-6">
      <div className="flex items-center justify-center gap-3">
        <Music className="h-8 w-8 text-primary" />
        <h2 className="font-headline text-4xl font-semibold">Suggest a Song</h2>
      </div>
      <Card className="shadow-[0_0_15px_2px_hsl(var(--primary)/0.5)]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Drop the new banger?</CardTitle>
            <CardDescription>
              Tell KL Radio what's spinning next!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="song">Song Title</Label>
              <Input
                id="song"
                placeholder="e.g., Blinding Lights"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="movie">Movie</Label>
              <Input
                id="movie"
                placeholder="e.g., After Hours"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" variant="default">
              <Send className="mr-2 h-4 w-4" />
              Submit Suggestion
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export function AnnouncementsAndSuggestionsSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto grid max-w-md gap-16 px-4">
        <SuggestionForm />
      </div>
    </section>
  );
}
