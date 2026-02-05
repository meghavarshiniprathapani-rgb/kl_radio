'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { useEffect, useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.card');
    if (!cards) return;

    function transition(this: HTMLElement) {
        this.classList.toggle('active');
    }

    cards.forEach(card => {
        card.addEventListener('click', transition as EventListener);
    });

    return () => {
        cards.forEach(card => {
            card.removeEventListener('click', transition as EventListener);
        });
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col text-foreground overflow-x-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        >
          <source src="https://ik.imagekit.io/bhanuteja110/Radio/WEBSITE_prob3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 -z-10" />

        <style jsx global>{`
            .card h2, .card h4 {
                font-family: var(--font-headline), sans-serif;
                text-transform: uppercase;
                color: hsla(0, 0%, 20%, 1);
            }
            .card p, .card li {
                font-family: var(--font-body), sans-serif;
                font-weight: 400;
                color: #555;
                line-height: 22px;
            }
            .event-grid-container {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                gap: 1rem;
                padding: 2rem 1rem;
                width: 100%;
            }
            .cardContainer {
              position: relative;
              width: 300px;
              height: 400px;
              min-width: 300px;
              min-height: 400px;
              margin: 4px;
              perspective: 1000px;
            }
            .card.active {
              transform: translateZ(0px) rotateY(180deg) !important;
            }
            .card.active:after {
              display: none;
            }
            .card {
              display: inline-block;
              width: 100%;
              height: 100%;
              cursor: pointer;
              -moz-backface-visibility: hidden;
              transform-style: preserve-3d;
              transform: translateZ(-100px);
              transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            }
            .card:after {
              content: '';
              position: absolute;
              z-index: -1;
              width: 100%;
              height: 100%;
              border-radius: 5px;
              box-shadow: 0 14px 50px -4px hsla(0, 0%, 0%, 0.15);
              opacity: 0;
              transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1.4);
            }
            .card:hover {
              transform: translateZ(0px);
            }
            .card:hover:after {
              opacity: 1;
            }
            .card .side {
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 5px;
              background-color: hsla(0, 0%, 100%, 1);
            }
            .card .front {
              z-index: 2;
            }
            .card .back {
              transform: rotateY(180deg);
            }
            .card .info {
              padding: 16px;
              height: 100%;
              display: flex;
              flex-direction: column;
            }
            .front .img {
              background-color: hsla(223, 13%, 87%, 1);
              background-position: center;
              background-size: cover;
              border-radius: 5px 5px 0 0;
              width: 100%;
              height: 250px;
            }
            .front .info {
                height: calc(400px - 250px);
                justify-content: center;
            }
            .back h2 {
              margin-top: 6px;
              margin-bottom: 18px;
            }
            h2 {
                font-size: 27px;
                font-weight: 500;
                letter-spacing: -0.2px;
                margin-bottom: 10px;
            }
            svg {
                margin: 0px;
                min-width: 24px;
                min-height: 24px;
            }
        `}</style>
        <NavbarKL />
        <main className="flex-1 flex flex-col items-center justify-start pt-32 pb-20">
             <div className="container mx-auto max-w-6xl px-4 text-center mb-16">
                <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl">
                    Our Events
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                    Click on a card to learn more about each event.
                </p>
            </div>

            <div ref={containerRef} className="event-grid-container">
                {events.map((event, i) => {
                    const eventImage = PlaceHolderImages.find((p) => p.id === event.image);
                    return (
                        <div
                            key={i}
                            className="cardContainer inactive"
                        >
                            <div className="card">
                                <div className="side front">
                                    <div
                                        className="img"
                                        style={{ backgroundImage: `url(${eventImage?.imageUrl || 'https://picsum.photos/seed/default/300/250'})` }}
                                    ></div>
                                    <div className="info">
                                        <h2>{event.title}</h2>
                                    </div>
                                </div>
                                <div className="side back">
                                    <div className="info">
                                        <h2>{event.title}</h2>
                                        <ScrollArea className="h-[280px] pr-4">
                                          <p>{event.description}</p>
                                        </ScrollArea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
        <SiteFooter />
    </div>
  );
}
