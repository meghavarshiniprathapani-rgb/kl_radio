'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CircularGallery from '@/components/ui/circular-gallery';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

const teamMembers = [
  {
    role: 'Station Head',
    name: 'S.Satya Vamsi Achyuth Ram',
    avatarId: 'station-head',
  },
  {
    role: 'Deputy Station Head',
    name: 'G. Manitej Chowdary',
    avatarId: 'deputy-station-head',
  },
  {
    role: 'RJ Head',
    name: 'Jahnavi Paruchuri',
    avatarId: 'rj-head',
  },
  {
    role: 'Creative Head',
    name: 'A. Sai charitha',
    avatarId: 'creative-head',
  },
  {
    role: 'Technical Head',
    name: 'Nallamothu Bhanuteja',
    avatarId: 'technical-head',
  },
  {
    role: 'Broadcasting Head',
    name: 'Ram Mandavilli',
    avatarId: 'broadcasting-head',
  },
  {
    role: 'Video Editing Head',
    name: 'Kanipakam Dilip Sai Nath Reddy',
    avatarId: 'video-editing-head',
  },
  {
    role: 'PR & Marketing Head',
    name: 'Gali Bala Bharath',
    avatarId: 'pr-head',
  },
  {
    role: 'Designing Head',
    name: 'Duggi Abhigna',
    avatarId: 'designing-head',
  },
];

export default function OurTeamPage() {
  const galleryItems = teamMembers.map((member) => {
    const memberImage = PlaceHolderImages.find((p) => p.id === member.avatarId);
    return {
      image: memberImage?.imageUrl || `https://picsum.photos/seed/${member.name}/800/600?grayscale`,
      text: `${member.role}\n${member.name}`,
    };
  });

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-foreground">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="https://ik.imagekit.io/bhanuteja110/Radio/Website.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 -z-10" />
      <NavbarKL />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl">
            Meet the Team
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            The driving force behind KL Radio, a collective of passionate minds dedicated to bringing you the best audio experience.
          </p>

          <div className="mt-16 relative" style={{ height: '70vh', minHeight: '500px' }}>
            <CircularGallery
              items={galleryItems}
              bend={1}
              textColor="#ffffff"
              font='30px "California Handmade Regular"'
              borderRadius={0.05}
              scrollEase={0.05}
              scrollSpeed={2}
            />
          </div>
        </div>

        <div className="mt-32 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tighter md:text-5xl">The Pillars of Our Station</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg mb-16">
                Our strength lies in our specialized wings, each a powerhouse of talent and dedication, working in harmony to create the KL Radio experience.
            </p>
        </div>

        <ScrollStack 
            useWindowScroll={true} 
            rotationAmount={-1} 
            blurAmount={2}
        >
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                <h2 className="text-3xl font-bold font-headline">Creative & Content Wing</h2>
                <p className="mt-4 text-lg text-muted-foreground">The heart of our programming. From drafting compelling show scripts and engaging announcements to producing our thought-provoking podcasts, this wing is where ideas take flight.</p>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                <h2 className="text-3xl font-bold font-headline">On-Air & Broadcasting</h2>
                <p className="mt-4 text-lg text-muted-foreground">The voices and technicians who bring KL Radio to life. Our RJs connect with the audience, while the broadcasting team ensures a seamless, high-quality stream reaches your ears.</p>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                <h2 className="text-3xl font-bold font-headline">Technical, Design & Production</h2>
                <p className="mt-4 text-lg text-muted-foreground">The wizards behind the curtain. This team manages the live broadcast infrastructure, handles all video editing and design needs, and ensures a polished final product for every platform.</p>
            </ScrollStackItem>
        </ScrollStack>

      </main>
      <SiteFooter />
    </div>
  );
}
