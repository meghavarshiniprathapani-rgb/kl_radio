'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';

const pastEvents = [
  {
    title: 'Vasantham',
    description: 'Not only in campus we are here to explore each every corner associated with your passion. Here we introduce multiple number of talents and the back stories of each and every ornament and the history of sarees that we are carrying forward from few decades.',
    hint: 'culture fashion',
  },
  {
    title: 'Udbav',
    description: '"UDBAV" An event where talent meets the opportunity.. Along with our students we are always encourage  people out of  campus to showcase their talents and grab the recognitions from our Team and the university.',
    hint: 'talent show',
  },
  {
    title: 'Carnival',
    description: '"CARNIVAL"- For Few minutes we forgot about ourselves , academics. we will vibe for each and every bite of music and create memories which will lock in our cameras.',
    hint: 'music festival',
  },
  {
    title: 'Samyak',
    description: '2 days which equals to 48 hours but in our definition these two days are not meant for 48 hours which will be equals to lifetime memories...The photos , vedioes, reunions, meetups, catchups, and mainly guests and last but not least non-stop DJ. we don\'t let our energies down for those two days ..Every single student in this university will be waiting for these night\'s to hangout with their friends.',
    hint: 'college fest',
  },
  {
    title: 'Podcasts',
    description: 'Till the date you are very familiar without our Liveshows ,podcasts with our lectures, events associated with KLRadio..Here for the first time in the history we did a wonderful Podcasts with the personalities known for their talent along with passions.We are so greatful to have time to gain the knowledge from the great people.',
    hint: 'podcast interview',
  },
  {
    title: 'Yuva Event',
    description: 'Great initiative taken by Youth Radio Andhra. .initiative to meet new persons and encourage the hidden talents and showcase them among all behalf of AP state..',
    hint: 'youth event',
  },
  {
    title: 'Ethnic Day',
    description: 'meet the students who carry their confidence by their outfits and showcase their way of beauty from their customes.',
    hint: 'traditional dress',
  },
  {
    title: 'Funfesta',
    description: 'guys here you can see the components includes songs, dance, translating dailogues , playing games , arranging puzzles and what not!!! I will promise that you will enjoy this events for sure.',
    hint: 'fun games',
  },
  {
    title: 'Resonance',
    description: 'Hardest good byes includes lifetime memories and endless relationships with our extended family...Our senior radio members are reconiziged by their own talents and new head\'s are introduced through this event.',
    hint: 'farewell party',
  },
  {
    title: 'Say No to Drugs',
    description: 'we are not only succeed in cultural events we did many programmerelated to the topic "SAY NO TO DRUGS".',
    hint: 'awareness campaign',
  },
  {
    title: 'SIL Events',
    description: 'not only events consists of entertainment, awareness we  conducted events and provided SIL points that students crave for.',
    hint: 'student workshop',
  }
];


export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <NavbarKL />
      <main className="flex-1 bg-background">
        <ScrollStack useWindowScroll={true} stackPosition="25%" itemDistance={20}>
            {pastEvents.map((event, index) => (
              <ScrollStackItem key={index} itemClassName="bg-card text-card-foreground border border-border">
                <h2 className="text-3xl font-bold mb-4 font-headline">{event.title}</h2>
                <p className="text-muted-foreground">{event.description}</p>
              </ScrollStackItem>
            ))}
        </ScrollStack>
      </main>
      <SiteFooter />
    </div>
  );
}
