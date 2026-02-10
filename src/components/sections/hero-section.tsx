'use client';

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <div className="h-40 md:h-48">
            <div className="block h-full w-full md:hidden">
              <ParticleTextEffect words={["The Voice\nOf Klians"]} className="w-full h-full" />
            </div>
            <div className="hidden h-full w-full md:block">
              <ParticleTextEffect words={["The Voice of Klians"]} className="w-full h-full" />
            </div>
        </div>
        <p className="mt-6 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          KL Radio is your destination for live music, latest announcements, and community connection. Tune in and feel the vibe.
        </p>
      </div>
    </section>
  );
}
