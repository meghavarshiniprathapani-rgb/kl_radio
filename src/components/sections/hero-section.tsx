'use client';
import GlitchText from '@/components/ui/GlitchText';

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 md:py-32 lg:py-40">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <GlitchText
          speed={0.5}
          enableShadows={true}
          enableOnHover={false}
          className="font-headline tracking-tighter"
        >
          The Voice of Klians
        </GlitchText>
        <p className="mt-6 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          KL Radio is your destination for live music, latest announcements, and community connection. Tune in and feel the vibe.
        </p>
      </div>
    </section>
  );
}
