'use client';

import Link from 'next/link';
import { Megaphone, Music, Send } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
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
import { AuthProvider, useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react';
import { NavbarKL } from '@/components/ui/navbar-kl';


// Mock data for announcements
const announcements = [
  {
    id: 1,
    title: 'New Primetime Show: "Midnight Grooves"',
    date: 'July 25, 2024',
    content: 'Tune in every weekday at 10 PM for the smoothest jazz and R&B tracks to wind down your day. Hosted by DJ Alex.',
  },
  {
    id: 2,
    title: 'Annual KL Radio Fest Announced!',
    date: 'July 22, 2024',
    content: 'Get ready for the biggest music event of the year! The KL Radio Fest is back with an amazing lineup. Tickets go on sale August 1st.',
  },
  {
    id: 3,
    title: 'Technical Maintenance Scheduled',
    date: 'July 20, 2024',
    content: 'Our services will be temporarily unavailable on July 28th from 2 AM to 4 AM for scheduled maintenance. We apologize for any inconvenience.',
  },
];

const Waveform = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 140 32" width="140" height="32" {...props}>
      <rect x="0" y="10" width="4" height="12" rx="2" fill="currentColor" />
      <rect x="8" y="4" width="4" height="24" rx="2" fill="currentColor" />
      <rect x="16" y="12" width="4" height="8" rx="2" fill="currentColor" />
      <rect x="24" y="0" width="4" height="32" rx="2" fill="currentColor" />
      <rect x="32" y="8" width="4" height="16" rx="2" fill="currentColor" />
      <rect x="40" y="12" width="4" height="8" rx="2" fill="currentColor" />
      <rect x="48" y="6" width="4" height="20" rx="2" fill="currentColor" />
      <rect x="56" y="10" width="4" height="12" rx="2" fill="currentColor" />
      <rect x="64" y="2" width="4" height="28" rx="2" fill="currentColor" />
      <rect x="72" y="8" width="4" height="16" rx="2" fill="currentColor" />
      <rect x="80" y="12" width="4" height="8" rx="2" fill="currentColor" />
      <rect x="88" y="4" width="4" height="24" rx="2" fill="currentColor" />
      <rect x="96" y="10" width="4" height="12" rx="2" fill="currentColor" />
      <rect x="104" y="6" width="4" height="20" rx="2" fill="currentColor" />
      <rect x="112" y="12" width="4" height="8" rx="2" fill="currentColor" />
      <rect x="120" y="2" width="4" height="28" rx="2" fill="currentColor" />
      <rect x="128" y="10" width="4" height="12" rx="2" fill="currentColor" />
      <rect x="136" y="4" width="4" height="24" rx="2" fill="currentColor" />
    </svg>
  );
  
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
              <CardDescription>Let us know what you want to hear on KL Radio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
              <Label htmlFor="song">Song Title</Label>
              <Input id="song" placeholder="e.g., Blinding Lights" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
              <Label htmlFor="artist">Artist</Label>
              <Input id="artist" placeholder="e.g., The Weeknd" value={artist} onChange={(e) => setArtist(e.target.value)} />
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
  )
}

function HomeComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarKL />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto max-w-5xl px-4 text-center">
             <h1 className="font-headline text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                The Voice of Klians
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-muted-foreground md:text-xl">
              KL Radio is your destination for live music, latest announcements, and community connection. Tune in and feel the vibe.
            </p>
          </div>
        </section>

        <section id="listen-live" className="container mx-auto max-w-5xl px-4 pb-20 md:pb-32 lg:pb-40">
           <Card className="overflow-hidden bg-primary/90 text-primary-foreground shadow-2xl backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center md:p-16">
              <h2 className="font-headline text-4xl font-bold">Listen Live</h2>
              <p className="mt-2 max-w-md text-primary-foreground/80">
                Stream KL Radio. Don't miss a beat of the KL's sound.
              </p>
              <Waveform className="my-8 text-primary-foreground/50" />
              <Button size="lg" variant="secondary" className="w-full max-w-xs text-lg font-bold shadow-lg transition-transform hover:scale-105">
                Start Listening
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="bg-muted/50 py-20 md:py-28">
            <div className="container mx-auto grid max-w-5xl gap-16 px-4 md:grid-cols-2 md:gap-12">
                <div id="announcements" className="space-y-6">
                <div className="flex items-center gap-3">
                    <Megaphone className="h-7 w-7 text-primary" />
                    <h2 className="font-headline text-3xl font-semibold">Announcements</h2>
                </div>
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                    <Card key={announcement.id}>
                        <CardHeader>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription>{announcement.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-muted-foreground">{announcement.content}</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                </div>
                <SuggestionForm />
            </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}


export default function Home() {
  return (
    <AuthProvider>
      <HomeComponent />
    </AuthProvider>
  )
}
