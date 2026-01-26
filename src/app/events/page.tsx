import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pastEvents = [
  {
    title: 'KL Radio Annual Fest',
    description: 'Our biggest event of the year, featuring live music, RJ meet-and-greets, and exciting games. A day of fun and entertainment for the entire KL community.',
    imageId: 'event-1',
  },
  {
    title: 'Retro Night',
    description: 'A nostalgic journey back in time with classic hits from the 80s and 90s. Listeners joined us for a live DJ set and special retro-themed segments.',
    imageId: 'event-2',
  },
  {
    title: 'Indie Music Showcase',
    description: 'We celebrated independent artists by showcasing their talent. The event featured live performances and interviews with up-and-coming musicians.',
    imageId: 'event-3',
  }
];


export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavbarKL />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl">
              Past Events
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              A look back at some of the memorable events hosted by KL Radio.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => {
              const eventImage = PlaceHolderImages.find(p => p.id === event.imageId);
              return (
                <Card key={event.title} className="overflow-hidden">
                  <CardHeader className="p-0">
                     <Image
                        src={eventImage?.imageUrl || `https://picsum.photos/seed/${event.title}/600/400`}
                        alt={event.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover aspect-[3/2]"
                        data-ai-hint={eventImage?.imageHint}
                      />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
