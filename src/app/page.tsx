import Link from 'next/link';
import { Megaphone, Music, Play, Send } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto grid max-w-5xl gap-12 px-4 py-12 md:py-20 lg:py-28">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              The Heartbeat of Your City
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl">
              KL Radio Hub is your destination for live music, latest announcements, and community connection. Tune in and feel the vibe.
            </p>
          </div>

          <Card className="overflow-hidden shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-10 md:p-16">
              <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                <Play className="h-10 w-10" style={{ transform: 'translateX(2px)' }} />
              </div>
              <h2 className="font-headline text-3xl font-semibold">Listen Live</h2>
              <p className="mt-2 text-muted-foreground">Stream KL Radio 24/7. Don't miss a beat.</p>
              <Button size="lg" className="mt-6" variant="default">
                <Play className="mr-2 h-5 w-5" />
                Start Listening
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-12 md:grid-cols-2">
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

            <div id="suggestions" className="space-y-6">
              <div className="flex items-center gap-3">
                <Music className="h-7 w-7 text-primary" />
                <h2 className="font-headline text-3xl font-semibold">Suggest a Song</h2>
              </div>
              <Card>
                <form>
                  <CardHeader>
                    <CardTitle>Heard a new banger?</CardTitle>
                    <CardDescription>Let us know what you want to hear on KL Radio.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="song">Song Title</Label>
                      <Input id="song" placeholder="e.g., Blinding Lights" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist</Label>
                      <Input id="artist" placeholder="e.g., The Weeknd" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" variant="secondary">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Suggestion
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
