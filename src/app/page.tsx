'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { StickyScrollSection } from '@/components/sections/sticky-scroll-section';
import { ListenLiveSection } from '@/components/sections/listen-live-section';
import { AnnouncementsAndSuggestionsSection } from '@/components/sections/announcements-and-suggestions-section';
import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { LenisProvider } from '@/components/lenis-provider';

function HomeComponent() {
  return (
    <LenisProvider>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
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
        <main className="flex-1">
          <HeroSection />
          <StickyScrollSection />
          <ListenLiveSection />
          <AnnouncementsAndSuggestionsSection />
        </main>
        <SiteFooter />
      </div>
    </LenisProvider>
  );
}

export default function Home() {
  return (
    <HomeComponent />
  );
}
