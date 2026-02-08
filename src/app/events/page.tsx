'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { useEffect, useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

const events = [
  {
    title: 'Calendar',
    description: 'The KL Radio Calendar was introduced as a thoughtful initiative to document and celebrate important events, festivals, and significant days throughout the year. Designed exclusively for KL Radio, the calendar reflects the organization’s journey, values, and milestones, serving as both a functional guide and a symbol of unity and identity.',
    image: 'event-calendar'
  },
  {
    title: 'Femflare',
    description: 'Femflare is a vibrant celebration dedicated to honoring the strength, resilience, and achievements of women. The event brings together inspiring talks, thought-provoking discussions, and powerful performances that highlight the diverse roles women play in society. By creating a platform for expression, dialogue, and inspiration, Femflare encourages confidence, empowerment, and awareness, fostering a supportive environment that celebrates womanhood in all its forms.',
    image: 'event-femflare'
  },
  {
    title: 'Kabaddi',
    description: 'The Kabaddi event is a high-energy and adrenaline-filled tournament that showcases teamwork, strategy, and physical endurance. Teams compete with passion and determination, displaying sportsmanship and competitive spirit at its finest. The tournament not only promotes physical fitness and discipline but also strengthens camaraderie and unity among participants, making it a thrilling experience for both players and spectators.',
    image: 'event-kabbadi'
  },
  {
    title: 'KLSAT-2',
    description: 'KLSAT-2 represents a remarkable achievement in innovation and technological advancement at KL University. The successful development and launch of three satellites in the presence of distinguished authorities stands as a testament to academic excellence and vision. KL Radio proudly served as the media partner for this historic event, contributing to the dissemination of inspiration and highlighting how small dreams can transform into extraordinary realities.',
    image: 'event-klsat2'
  },
  {
    title: 'Parichayamila',
    description: 'KL Radio continuously supports and encourages the creative talents hidden within university students. *Parichayamila* is a cover song collaboratively produced by students, capturing emotions of love, elegance, and artistic expression. The grand launch of this cover song highlighted teamwork, musical passion, and the dedication of young artists, serving as a proud moment for KL Radio and its creative community.',
    image: 'event-parichayamila'
  },
  {
    title: 'Radio Fiesta',
    description: 'Radio Fiesta marks an exciting milestone in KL Radio’s journey of event organization. Building on years of successful initiatives, Radio Fiesta was introduced as a dedicated celebration to showcase talent, creativity, and entertainment. The event brought students together to enjoy performances, engage socially, and create lasting memories, strengthening the sense of unity and joy within the campus.',
    image: 'event-radio-fiesta'
  },
  {
    title: 'Resonance',
    description: `Resonance is an emotional and meaningful event that marks transitions within the KL Radio family. It serves as a farewell to senior radio members while celebrating the lifelong memories, friendships, and bonds they have built. The event also recognizes the talents and contributions of outgoing members and introduces new leadership, symbolizing continuity, growth, and the strengthening of the KL Radio community.`,
    image: 'event-resonance'
  },
  {
    title: 'Samyak',
    description: `Samyak is one of the most eagerly awaited events in the university, spanning two days that transform into a lifetime of cherished memories. Although defined as 48 hours, Samyak transcends time through its electrifying energy, nonstop DJ performances, guest appearances, reunions, meetups, and countless moments of joy. Students from across the university come together to celebrate friendship, freedom, and festivity, making Samyak a symbol of collective happiness and unforgettable campus life.`,
    image: 'event-samyak'
  },
  {
    title: 'Surabhi',
    description: 'Surabhi is a grand cultural extravaganza that brings together a vibrant blend of music, dance, and artistic performances. The event provides a stage for students to showcase their diverse talents and creative expressions, reflecting cultural richness and artistic excellence. Surabhi celebrates unity in diversity by encouraging participation, creativity, and appreciation for the arts, creating an atmosphere filled with color, rhythm, and inspiration.',
    image: 'event-surabhi'
  },
  {
    title: 'Udbhav',
    description: `Udbav is a dynamic platform designed to bridge talent and opportunity. Through this event, KL Radio extends its encouragement not only to university students but also to individuals outside the campus, inviting them to showcase their skills and creativity. Udbav plays a crucial role in identifying emerging talent, providing recognition, and offering exposure at both team and university levels. It fosters confidence, inclusivity, and a strong sense of achievement among participants.`,
    image: 'event-udbav'
  },
  {
    title: 'Yuva',
    description: `The Yuva Event is a meaningful initiative led by Youth Radio Andhra Pradesh with the objective of identifying and nurturing hidden talents among youth. This event serves as a platform to connect with new individuals, encourage creativity, and provide statewide exposure across Andhra Pradesh. By promoting inclusivity and innovation, the Yuva Event empowers young minds and strengthens the voice of youth through expression and collaboration.`,
    image: 'event-yuva'
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
                color: hsl(var(--foreground));
            }
            .card p, .card li {
                font-family: var(--font-body), sans-serif;
                font-weight: 400;
                color: hsl(var(--muted-foreground));
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
              width: 320px;
              height: 420px;
              min-width: 320px;
              min-height: 420px;
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
              border-radius: 12px;
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
              border-radius: 12px;
              background-color: hsl(var(--background));
              border: 1px solid hsl(var(--border));
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
              border-radius: 12px 12px 0 0;
              width: 100%;
              height: 250px;
            }
            .front .info {
                height: calc(420px - 250px);
                justify-content: center;
            }
            .back .info {
                justify-content: space-between;
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
            .explore-btn {
                display: block;
                margin-top: 1rem;
                padding: 0.75rem 1.5rem;
                background-color: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                transition: background-color 0.3s;
                text-align: center;
            }
            .explore-btn:hover {
                background-color: hsl(var(--primary) / 0.8);
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
                                      <div>
                                        <h2>{event.title}</h2>
                                        <ScrollArea className="h-[260px] pr-4">
                                          <p>{event.description}</p>
                                        </ScrollArea>
                                      </div>
                                      <Link
                                        href={`/events/${event.image}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="explore-btn"
                                      >
                                        Explore
                                      </Link>
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
