'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CircularGallery from '@/components/ui/circular-gallery';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { LenisProvider } from '@/components/lenis-provider';
import Image from 'next/image';

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

function OurTeamPageContent() {
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
                 <div className="flex h-full items-center gap-8">
                    <div className="relative w-1/2 h-full overflow-hidden rounded-2xl">
                        <Image src="https://ik.imagekit.io/tz33swtq7h/WhatsApp%20Image%202026-02-09%20at%2010.08.26%20PM.jpeg" alt="RJ Wing" fill className="object-cover" />
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-3xl font-bold font-headline">RJ Wing</h2>
                        <p className="mt-4 text-lg text-muted-foreground">The voices of KL Radio. Our RJs are the charismatic hosts who connect with the audience, conduct engaging shows, and bring an infectious energy to the airwaves every single day.</p>
                    </div>
                </div>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                <h2 className="text-3xl font-bold font-headline">Creative Wing</h2>
                <p className="mt-4 text-lg text-muted-foreground">The heart of our programming. From drafting compelling show scripts and engaging announcements to producing our thought-provoking podcasts, this wing is where ideas take flight.</p>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                 <div className="flex h-full items-center gap-8">
                    <div className="w-1/2">
                        <h2 className="text-3xl font-bold font-headline">Technical Wing</h2>
                        <p className="mt-4 text-lg text-muted-foreground">The wizards behind the curtain. This dedicated team manages our live broadcast infrastructure, develops and maintains the station's web presence, and ensures all technology runs smoothly.</p>
                    </div>
                    <div className="relative w-1/2 h-full overflow-hidden rounded-2xl">
                        <Image src="https://ik.imagekit.io/tz33swtq7h/IMG_0259.jpg?updatedAt=1770654468779" alt="Technical Wing" fill className="object-cover" />
                    </div>
                </div>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                <h2 className="text-3xl font-bold font-headline">Broadcasting Wing</h2>
                <p className="mt-4 text-lg text-muted-foreground">Ensuring a seamless, high-quality stream reaches your ears. The broadcasting team manages the on-air schedule, controls live transmissions, and guarantees a professional audio experience.</p>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                 <div className="flex h-full items-center gap-8">
                    <div className="relative w-1/2 h-full overflow-hidden rounded-2xl">
                        <Image src="https://ik.imagekit.io/tz33swtq7h/IMG_2185.jpg?updatedAt=1770654371827" alt="Video Editing Wing" fill className="object-cover" />
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-3xl font-bold font-headline">Video Editing Wing</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Bringing our visual stories to life. This talented team produces and edits all video content, from event highlights to promotional material, for our website and social media platforms.</p>
                    </div>
                </div>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                <h2 className="text-3xl font-bold font-headline">PR & Marketing Wing</h2>
                <p className="mt-4 text-lg text-muted-foreground">The bridge to our community and beyond. They handle public relations, devise marketing strategies, manage our social media presence, and promote our events and the station's brand.</p>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="bg-card/70 backdrop-blur-lg border border-white/10 text-card-foreground">
                <h2 className="text-3xl font-bold font-headline">Designing Wing</h2>
                <p className="mt-4 text-lg text-muted-foreground">Crafting the visual identity of KL Radio. From eye-catching event posters to stunning social media graphics and website aesthetics, our designers create the look and feel that defines us.</p>
            </ScrollStackItem>
        </ScrollStack>

      </main>
      <SiteFooter />
    </div>
  );
}

export default function OurTeamPage() {
    return (
        <LenisProvider>
            <OurTeamPageContent />
        </LenisProvider>
    )
}
