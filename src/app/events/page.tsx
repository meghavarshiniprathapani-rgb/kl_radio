'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import CardSwap, { Card } from '@/components/ui/card-swap';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pastEvents = [
  {
    title: 'Vasantham',
    description: 'Not only in campus we are here to explore each every corner associated with your passion. Here we introduce multiple number of talents and the back stories of each and every ornament and the history of sarees that we are carrying forward from few decades.',
    imageId: 'event-1',
  },
  {
    title: 'Udbav',
    description: '"UDBAV" An event where talent meets the opportunity.. Along with our students we are always encourage  people out of  campus to showcase their talents and grab the recognitions from our Team and the university.',
    imageId: 'event-2',
  },
  {
    title: 'Carnival',
    description: '"CARNIVAL"- For Few minutes we forgot about ourselves , academics. we will vibe for each and every bite of music and create memories which will lock in our cameras.',
    imageId: 'event-3',
  },
  {
    title: 'Samyak',
    description: '2 days which equals to 48 hours but in our definition these two days are not meant for 48 hours which will be equals to lifetime memories...The photos , vedioes, reunions, meetups, catchups, and mainly guests and last but not least non-stop DJ. we don\'t let our energies down for those two days ..Every single student in this university will be waiting for these night\'s to hangout with their friends.',
    imageId: 'event-samyak',
  },
  {
    title: 'Podcasts',
    description: 'Till the date you are very familiar without our Liveshows ,podcasts with our lectures, events associated with KLRadio..Here for the first time in the history we did a wonderful Podcasts with the personalities known for their talent along with passions.We are so greatful to have time to gain the knowledge from the great people.',
    imageId: 'event-podcasts',
  },
  {
    title: 'Yuva Event',
    description: 'Great initiative taken by Youth Radio Andhra. .initiative to meet new persons and encourage the hidden talents and showcase them among all behalf of AP state..',
    imageId: 'event-yuva',
  },
  {
    title: 'Ethnic Day',
    description: 'meet the students who carry their confidence by their outfits and showcase their way of beauty from their customes.',
    imageId: 'event-ethnic',
  },
  {
    title: 'Funfesta',
    description: 'guys here you can see the components includes songs, dance, translating dailogues , playing games , arranging puzzles and what not!!! I will promise that you will enjoy this events for sure.',
    imageId: 'event-funfesta',
  },
  {
    title: 'Resonance',
    description: 'Hardest good byes includes lifetime memories and endless relationships with our extended family...Our senior radio members are reconiziged by their own talents and new head\'s are introduced through this event.',
    imageId: 'event-resonance',
  },
  {
    title: 'Say No to Drugs',
    description: 'we are not only succeed in cultural events we did many programmerelated to the topic "SAY NO TO DRUGS".',
    imageId: 'event-drugs',
  },
  {
    title: 'SIL Events',
    description: 'not only events consists of entertainment, awareness we  conducted events and provided SIL points that students crave for.',
    imageId: 'event-sil',
  }
];


export default function EventsPage() {
  return (
    <div className="relative flex min-h-screen flex-col text-foreground overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="https://ik.imagekit.io/bhanuteja110/Radio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(2).mp4" type="video/mp4" />
      </video>
      <NavbarKL />
      <main className="flex-1">
        <div className="container mx-auto max-w-6xl px-4 text-center pt-32 pb-20">
            <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl">
                Past Events
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                A look back at the moments that made us who we are.
            </p>
        </div>
        <div className="relative w-full h-[600px]">
            <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={3000}
                pauseOnHover={true}
            >
                {pastEvents.map((event, index) => {
                    const eventImage = PlaceHolderImages.find(p => p.id === event.imageId);
                    return (
                        <Card key={index}>
                            <div className="flex flex-col h-full">
                                <div>
                                    <h3 className="font-headline text-2xl font-bold mb-2">{event.title}</h3>
                                    <p className="text-muted-foreground text-sm max-h-24 overflow-y-auto pr-2">{event.description}</p>
                                </div>
                                {eventImage && (
                                    <div className="flex-grow relative mt-4 rounded-md overflow-hidden">
                                        <Image
                                            src={eventImage.imageUrl}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={eventImage.imageHint}
                                        />
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </CardSwap>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
