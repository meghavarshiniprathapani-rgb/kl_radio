'use client';

import { Megaphone, Music, Send } from 'lucide-react';
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

// Mock data for announcements
const announcements = [
  {
    id: 1,
    title: 'New Primetime Show: "Midnight Grooves"',
    date: 'July 25, 2024',
    content:
      'Tune in every weekday at 10 PM for the smoothest jazz and R&B tracks to wind down your day. Hosted by DJ Alex.',
  },
  {
    id: 2,
    title: 'Annual KL Radio Fest Announced!',
    date: 'July 22, 2024',
    content:
      'Get ready for the biggest music event of the year! The KL Radio Fest is back with an amazing lineup. Tickets go on sale August 1st.',
  },
  {
    id: 3,
    title: 'Technical Maintenance Scheduled',
    date: 'July 20, 2024',
    content:
      'Our services will be temporarily unavailable on July 28th from 2 AM to 4 AM for scheduled maintenance. We apologize for any inconvenience.',
  },
];

function SuggestionForm() {
  const { addSongSuggestion } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !songTitle || !artist) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill out all fields to suggest a song.',
      });
      return;
    }
    addSongSuggestion({ name, songTitle, artist });
    toast({
      title: 'Suggestion received!',
      description: "Thanks for the recommendation. We'll check it out!",
    });
    setName('');
    setSongTitle('');
    setArtist('');
  };

  return (
    <div id="suggestions" className="space-y-6">
      <div className="flex items-center gap-3">
        <Music className="h-7 w-7 text-primary" />
        <h2 className="font-headline text-3xl font-semibold">Suggest a Song</h2>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Heard a new banger?</CardTitle>
            <CardDescription>
              Let us know what you want to hear on KL Radio.
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
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                placeholder="e.g., The Weeknd"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
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
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto grid max-w-5xl gap-16 px-4 md:grid-cols-2 md:gap-12">
        <div id="announcements" className="space-y-6">
          <div className="flex items-center gap-3">
            <Megaphone className="h-7 w-7 text-primary" />
            <h2 className="font-headline text-3xl font-semibold">
              Announcements
            </h2>
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {announcement.title}
                  </CardTitle>
                  <CardDescription>{announcement.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <SuggestionForm />
      </div>
    </section>
  );
}
