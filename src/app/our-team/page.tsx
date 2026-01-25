'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CircularGallery from '@/components/ui/circular-gallery';

const teamMembers = [
  {
    role: 'Station Head',
    name: 'Dr. Emily Carter',
    avatarId: 'station-head',
  },
  {
    role: 'Deputy Station Head',
    name: 'Mr. Benjamin Hayes',
    avatarId: 'deputy-station-head',
  },
  {
    role: 'RJ Head',
    name: 'Alex "DJ Vibe" Chen',
    avatarId: 'rj-head',
  },
  {
    role: 'Creative Head',
    name: 'Sophia Rodriguez',
    avatarId: 'creative-head',
  },
  {
    role: 'Technical Head',
    name: 'Marcus Thorne',
    avatarId: 'technical-head',
  },
  {
    role: 'Broadcasting Head',
    name: 'Isabella Grant',
    avatarId: 'broadcasting-head',
  },
  {
    role: 'Video Editing Head',
    name: 'Leo Kim',
    avatarId: 'video-editing-head',
  },
  {
    role: 'PR Head',
    name: 'Chloe Davis',
    avatarId: 'pr-head',
  },
  {
    role: 'Designing Head',
    name: 'Olivia Martinez',
    avatarId: 'designing-head',
  },
];

export default function OurTeamPage() {
  const galleryItems = teamMembers.map((member) => {
    const memberImage = PlaceHolderImages.find((p) => p.id === member.avatarId);
    return {
      image: memberImage?.imageUrl || `https://picsum.photos/seed/${member.name}/800/600?grayscale`,
      text: `${member.name} - ${member.role}`,
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
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
              textColor="hsl(var(--foreground))"
              font="bold 30px Lexend"
              borderRadius={0.05}
              scrollEase={0.05}
              scrollSpeed={2}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
