'use client';

import { AuthProvider } from '@/context/auth-context';
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
      <div className="flex min-h-screen flex-col pt-24">
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
    <AuthProvider>
      <HomeComponent />
    </AuthProvider>
  );
}
