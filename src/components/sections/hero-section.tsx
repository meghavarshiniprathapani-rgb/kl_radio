'use client';

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 md:py-32 lg:py-40">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <h1 className="font-headline text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          The Voice of Klians
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          KL Radio is your destination for live music, latest announcements, and community connection. Tune in and feel the vibe.
        </p>
      </div>
    </section>
  );
}
