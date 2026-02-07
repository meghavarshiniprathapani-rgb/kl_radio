'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';
import ExpandableGallery from '@/components/ui/gallery-animation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageTransitionGallery from '@/components/ui/ImageTransitionGallery';

const events = [
    {
      title: 'Calendar',
      description: 'Our annual calendar launch, showcasing a year of memories and achievements.',
      image: 'event-calendar'
    },
    {
      title: 'Femflare',
      description: 'Celebrating the spirit of womanhood with inspiring talks and performances.',
      image: 'event-femflare'
    },
    {
      title: 'Kabaddi',
      description: 'High-energy Kabaddi tournament where teams battle for glory.',
      image: 'event-kabbadi'
    },
    {
      title: 'KLSAT2',
      description: 'Showcasing cutting-edge student projects and technological innovations.',
      image: 'event-klsat2'
    },
    {
      title: 'Parichayamila',
      description: 'A grand welcome for the new batch of students to the KL family.',
      image: 'event-prachayamila'
    },
    {
      title: 'Radio Fiesta',
      description: 'The ultimate celebration of radio with live shows, music, and fun.',
      image: 'event-radio-fiesta'
    },
    {
      title: 'Resonance',
      description: `Hardest goodbyes include lifetime memories and endless relationships with our extended family. Our senior radio members are recognized and new heads are introduced.`,
      image: 'event-resonance'
    },
    {
      title: 'Samyak',
      description: `Our university's biggest cultural fest. Two days of non-stop fun, music, and memories.`,
      image: 'event-samyak'
    },
    {
      title: 'Surabhi',
      description: 'A cultural extravaganza showcasing diverse talents in music, dance, and arts.',
      image: 'event-surabi'
    },
    {
      title: 'Udbhav',
      description: `"UDBAV" An event where talent meets opportunity, encouraging students to showcase their skills.`,
      image: 'event-udbav'
    },
    {
      title: 'Yuva',
      description: `A great initiative to meet new people, encourage hidden talents, and showcase them on a large platform.`,
      image: 'event-yuva'
    }
  ];

const galleryImageCounts: { [key: string]: number } = {
  'event-calendar': 18,
  'event-femflare': 6,
  'event-kabbadi': 3,
  'event-klsat2': 13,
  'event-prachayamila': 3,
  'event-radio-fiesta': 15,
  'event-resonance': 23,
  'event-samyak': 9,
  'event-surabi': 6,
  'event-udbav': 5,
  'event-yuva': 23,
};

const calendarImages = [
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00841.JPG?updatedAt=1770460287648',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01003.JPG?updatedAt=1770460287409',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00840.JPG?updatedAt=1770460287156',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01004.JPG?updatedAt=1770460287117',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01066.JPG?updatedAt=1770460286858',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01006.JPG?updatedAt=1770460286978',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00837.JPG?updatedAt=1770460286650',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00991.JPG?updatedAt=1770460286407',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00836.JPG?updatedAt=1770460286448',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00983.JPG?updatedAt=1770460285793',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01069.JPG?updatedAt=1770460285751',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00994.JPG?updatedAt=1770460285792',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01071.JPG?updatedAt=1770460285465',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00986.JPG?updatedAt=1770460284447',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00989.JPG?updatedAt=1770460284378',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00996.JPG?updatedAt=1770460284093',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC00984.JPG?updatedAt=1770460283278',
    'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01072.JPG?updatedAt=1770460283228'
];

const resonanceImages = [
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/DSC07351.JPG?updatedAt=1770460872039',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/DSC08868.JPG?updatedAt=1770460872109',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/DSC08979.JPG?updatedAt=1770460873307',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/DSC08982.JPG?updatedAt=1770460874425',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4064.JPG?updatedAt=1770460874642',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4070.JPG?updatedAt=1770460874798',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4061.JPG?updatedAt=1770460874870',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4068.JPG?updatedAt=1770460875207',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4088.JPG?updatedAt=1770460875362',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4072.JPG?updatedAt=1770460875390',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4069.JPG?updatedAt=1770460875403',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4089.JPG?updatedAt=1770460875406',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4083.JPG?updatedAt=1770460875492',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4085.JPG?updatedAt=1770460875473',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4101.JPG?updatedAt=1770460875576',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/DSC09061.JPG?updatedAt=1770460875539',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4073.JPG?updatedAt=1770460875632',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4063.JPG?updatedAt=1770460875695',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4082.JPG?updatedAt=1770460879130',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4075.JPG?updatedAt=1770460879211',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/_DSC4067.JPG?updatedAt=1770460879266',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/RAV_8690.JPG?updatedAt=1770460876548',
    'https://ik.imagekit.io/tz33swtq7h/Resonance/Resonance/DSC08994.JPG?updatedAt=1770460874664'
];

const femflareImages = [
    'https://ik.imagekit.io/tz33swtq7h/Femflare/femflare/DSC07668_edited.jpg?updatedAt=1770460423661',
    'https://ik.imagekit.io/tz33swtq7h/Femflare/femflare/DSC07810_edited.jpg?updatedAt=1770460424103',
    'https://ik.imagekit.io/tz33swtq7h/Femflare/femflare/DSC07854_edited.jpg?updatedAt=1770460424413',
    'https://ik.imagekit.io/tz33swtq7h/Femflare/femflare/DSC07908_edited.jpg?updatedAt=1770460424465',
    'https://ik.imagekit.io/tz33swtq7h/Femflare/femflare/DSC07820_edited.jpg?updatedAt=1770460424524',
    'https://ik.imagekit.io/tz33swtq7h/Femflare/femflare/DSC07834_edited.jpg?updatedAt=1770460424558'
];

const kabaddiImages = [
    'https://ik.imagekit.io/tz33swtq7h/Kabaddi/KABADDI/WhatsApp%20Image%202026-02-05%20at%2010.57.32%20PM.jpeg?updatedAt=1770460516709',
    'https://ik.imagekit.io/tz33swtq7h/Kabaddi/KABADDI/WhatsApp%20Image%202026-02-05%20at%2010.58.28%20PM.jpeg?updatedAt=1770460516891',
    'https://ik.imagekit.io/tz33swtq7h/Kabaddi/KABADDI/WhatsApp%20Image%202026-02-05%20at%2010.58.27%20PM.jpeg?updatedAt=1770460516509'
];

const klsat2Images = [
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/DSC9800.JPG?updatedAt=1770460599413',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/DSC9818.JPG?updatedAt=1770460599137',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/DSC9793.JPG?updatedAt=1770460598607',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/DSC9808.JPG?updatedAt=1770460598343',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/_DSC0835.jpg?updatedAt=1770460598304',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/_DSC0842.jpg?updatedAt=1770460597890',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/_DSC0732.jpg?updatedAt=1770460597665',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/_DSC1273.jpg?updatedAt=1770460597309',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/WhatsApp%20Image%202026-02-06%20at%2012.13.28%20PM.jpeg?updatedAt=1770460596988',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/DSC09911_edited.jpg?updatedAt=1770460596821',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/WhatsApp%20Image%202026-02-06%20at%2012.13.30%20PM.jpeg?updatedAt=1770460596260',
    'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/WhatsApp%20Image%202026-02-06%20at%2012.18.36%20PM.jpeg?updatedAt=1770460596267'
];

const parichayamilaImages = [
    'https://ik.imagekit.io/tz33swtq7h/Praichayamilla/Parichayamila/DSC08252.JPG?updatedAt=1770460688405',
    'https://ik.imagekit.io/tz33swtq7h/Praichayamilla/Parichayamila/DSC08236.JPG?updatedAt=1770460687572',
    'https://ik.imagekit.io/tz33swtq7h/Praichayamilla/Parichayamila/DSC08238.JPG?updatedAt=1770460688250'
];


export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params ? params.slug : null;
  const event = events.find(e => e.image === slug);
  const eventImage = PlaceHolderImages.find(p => p.id === slug);
  
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (slug) {
      if (slug === 'event-resonance') {
        setGalleryImages(resonanceImages);
      } else if (slug === 'event-calendar') {
        setGalleryImages(calendarImages);
      } else if (slug === 'event-femflare') {
        setGalleryImages(femflareImages);
      } else if (slug === 'event-kabbadi') {
        setGalleryImages(kabaddiImages);
      } else if (slug === 'event-klsat2') {
        setGalleryImages(klsat2Images);
      } else if (slug === 'event-prachayamila') {
        setGalleryImages(parichayamilaImages);
      } else {
        const imageCount = galleryImageCounts[slug] || 4; // Default to 4
        const items = Array.from({ length: imageCount }).map((_, i) => {
          const seed = `${slug}${i}`;
          return `https://picsum.photos/seed/${seed}/800/600`;
        });
        setGalleryImages(items);
      }
    }
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
                            className="w-full h-[32rem] bg-contain bg-no-repeat bg-center rounded-lg mb-6"
                            style={{ 
                                backgroundImage: `url(${eventImage?.imageUrl || 'https://picsum.photos/seed/default/800/400'})`,
                                backgroundPosition: 'center center',
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
