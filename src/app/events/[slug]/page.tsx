'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';
import ExpandableGallery from '@/components/ui/gallery-animation';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import ImageTransitionGallery from '@/components/ui/ImageTransitionGallery';
import { events, galleryImagesData, galleryImageCounts } from '@/lib/events-data';

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params ? params.slug : null;
  const event = events.find(e => e.image === slug);
  const eventImage = PlaceHolderImages.find(p => p.id === slug);
  
  const galleryImages = useMemo(() => {
    if (!slug) return [];

    if (galleryImagesData[slug]) {
        return galleryImagesData[slug];
    }

    // Fallback for events without a specific gallery
    const imageCount = galleryImageCounts[slug] || 4;
    return Array.from({ length: imageCount }).map((_, i) => {
        const seed = `${slug}${i}`;
        return `https://picsum.photos/seed/${seed}/800/600`;
    });
  }, [slug]);

  const useNewGallery = galleryImages.length > 5;
  const transitionGalleryImages = galleryImages.map(url => ({ src: url }));

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

        <NavbarKL />

        <main className="flex-1 flex flex-col items-center pt-32 pb-20">
             <div className="container mx-auto max-w-6xl px-4">
                {event ? (
                    <div className="bg-background/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10">
                        <div
                            className="w-full h-[32rem] bg-cover bg-center rounded-lg mb-6"
                            style={{ 
                                backgroundImage: `url(${eventImage?.imageUrl || 'https://picsum.photos/seed/default/800/400'})`,
                            }}
                        ></div>
                        <div className="text-center">
                            <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl mb-4">
                                {event.title}
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg mb-8">
                                {event.description}
                            </p>
                        </div>
                        
                        <div className="mt-12">
                            <h2 className="font-headline text-3xl font-bold tracking-tight text-center mb-8">Event Gallery</h2>
                            {useNewGallery ? (
                                <ImageTransitionGallery images={transitionGalleryImages} />
                            ) : (
                                <ExpandableGallery images={galleryImages} className="w-full" />
                            )}
                        </div>

                        <div className="text-center mt-12">
                            <Button asChild>
                               <Link href="/events"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Events</Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-background/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10">
                        <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl mb-4">
                            Event Not Found
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg mb-8">
                            The event you are looking for does not exist.
                        </p>
                        <Button asChild>
                           <Link href="/events"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Events</Link>
                        </Button>
                    </div>
                )}
            </div>
        </main>

        <SiteFooter />
    </div>
  );
}
