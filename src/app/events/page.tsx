'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import CardSwap, { Card } from '@/components/ui/card-swap';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const events = [
  {
    title: 'Vasantham',
    description: `Not only in campus we are here to explore each every corner associated with your passion. Here we introduce multiple number of talents and the back stories of each and every ornament and the history of sarees that we are carrying forward from few decades`,
    image: 'event-vasantham'
  },
  {
    title: 'Udbav',
    description: `"UDBAV" An event where talent meets the opportunity.. Along with our students we are always encourage  people out of  campus to showcase their talents and grab the recognitions from our Team and the university`,
    image: 'event-udbav'
  },
  {
    title: 'Carnival',
    description: `"CARNIVAL"- For Few minutes we forgot about ourselves , academics. we will vibe for each and every bite of music and create memories which will lock in our cameras`,
    image: 'event-carnival'
  },
  {
    title: 'Samyak',
    description: `2 days which equals to 48 hours but in our definition these two days are not meant for 48 hours which will be equals to lifetime memories...The photos , vedioes, reunions, meetups, catchups, and mainly guests and last but not least non-stop DJ. we don't let our energies down for those two days ..Every single student in this university will be waiting for these night's to hangout with their friends`,
    image: 'event-samyak'
  },
  {
    title: 'Podcasts',
    description: `Till the date you are very familiar without our Liveshows ,podcasts with our lectures, events associated with KLRadio..Here for the first time in the history we did a wonderful Podcasts with the personalities known for their talent along with passions.We are so greatful to have time to gain the knowledge from the great people.`,
    image: 'event-podcasts'
  },
  {
    title: 'Yuva Event',
    description: `Great initiative taken by Youth Radio Andhra. .initiative to meet new persons and encourage the hidden talents and showcase them among all behalf of AP state..`,
    image: 'event-yuva'
  },
  {
    title: 'Ethnic Day',
    description: `meet the students who carry their confidence by their outfits and showcase their way of beauty from their customes`,
    image: 'event-ethnic'
  },
  {
    title: 'Funfesta',
    description: `guys here you can see the components includes songs, dance, translating dailogues , playing games , arranging puzzles and what not!!! I will promise that you will enjoy this events for sure`,
    image: 'event-funfesta'
  },
  {
    title: 'Resonance',
    description: `Hardest good byes includes lifetime memories and endless relationships with our extended family...Our senior radio members are reconiziged by their own talents and new head's are introduced through this event`,
    image: 'event-resonance'
  },
  {
    title: 'Say No To Drugs',
    description: `we are not only succeed in cultural events we did many programmerelated to the topic "SAY NO TO DRUGS"`,
    image: 'event-drugs'
  },
  {
    title: 'SIL Events',
    description: `not only events consists of entertainment, awareness we  conducted events and provided SIL points that students crave for.`,
    image: 'event-sil'
  }
];

export default function EventsPage() {
  const eventCards = events.map((event, i) => {
    const eventImage = PlaceHolderImages.find((p) => p.id === event.image);
    return (
      <Card key={i}>
        <div className="flex flex-col h-full">
          <h3 className="text-2xl font-bold font-headline">{event.title}</h3>
          <ScrollArea className="flex-grow my-4 pr-4">
            <p className="text-muted-foreground text-sm">{event.description}</p>
          </ScrollArea>
          <div className="relative h-48 w-full rounded-lg overflow-hidden mt-auto">
            <Image
              src={eventImage?.imageUrl || 'https://picsum.photos/seed/default/400/200'}
              alt={event.title}
              fill
              className="object-cover"
              data-ai-hint={eventImage?.imageHint}
            />
          </div>
        </div>
      </Card>
    );
  });

  return (
    <div className="relative flex min-h-screen flex-col text-foreground overflow-hidden">
      <NavbarKL />
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl">
            Our Events
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            A look back at the moments that made us who we are.
          </p>
        </div>
        <div className="flex-grow w-full flex items-center justify-center relative mt-16">
          <CardSwap cardDistance={40} verticalDistance={-50}>
            {eventCards}
          </CardSwap>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
