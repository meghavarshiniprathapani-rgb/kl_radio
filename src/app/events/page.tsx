'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { events } from '@/lib/events-data';

export default function EventsPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
              border-radius: var(--radius);
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
              border-radius: var(--radius);
              background-color: hsl(var(--card) / 0.7);
              border: 1px solid hsl(var(--border) / 0.3);
              backdrop-filter: blur(12px);
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
              border-radius: calc(var(--radius) - 1px) calc(var(--radius) - 1px) 0 0;
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

            <div className="event-grid-container">
                {events.map((event, i) => {
                    const eventImage = PlaceHolderImages.find((p) => p.id === event.image);
                    return (
                        <div
                            key={i}
                            className="cardContainer"
                            onClick={() => setActiveCard(activeCard === i ? null : i)}
                        >
                            <div className={`card ${activeCard === i ? 'active' : ''}`}>
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
