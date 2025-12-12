'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const Waveform = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 140 32" width="140" height="32" {...props}>
    <rect x="0" y="10" width="4" height="12" rx="2" fill="currentColor" />
    <rect x="8" y="4" width="4" height="24" rx="2" fill="currentColor" />
    <rect x="16" y="12" width="4" height="8" rx="2" fill="currentColor" />
    <rect x="24" y="0" width="4" height="32" rx="2" fill="currentColor" />
    <rect x="32" y="8" width="4" height="16" rx="2" fill="currentColor" />
    <rect x="40" y="12" width="4" height="8" rx="2" fill="currentColor" />
    <rect x="48" y="6" width="4" height="20" rx="2" fill="currentColor" />
    <rect x="56" y="10" width="4" height="12" rx="2" fill="currentColor" />
    <rect x="64" y="2" width="4" height="28" rx="2" fill="currentColor" />
    <rect x="72" y="8" width="4" height="16" rx="2" fill="currentColor" />
    <rect x="80" y="12" width="4" height="8" rx="2" fill="currentColor" />
    <rect x="88" y="4" width="4" height="24" rx="2" fill="currentColor" />
    <rect x="96" y="10" width="4" height="12" rx="2" fill="currentColor" />
    <rect x="104" y="6" width="4" height="20" rx="2" fill="currentColor" />
    <rect x="112" y="12" width="4" height="8" rx="2" fill="currentColor" />
    <rect x="120" y="2" width="4" height="28" rx="2" fill="currentColor" />
    <rect x="128" y="10" width="4" height="12" rx="2" fill="currentColor" />
    <rect x="136" y="4" width="4" height="24" rx="2" fill="currentColor" />
  </svg>
);

export function ListenLiveSection() {
  return (
    <section
      id="listen-live"
      className="container mx-auto max-w-5xl px-4 pb-20 md:pb-32 lg:pb-40"
    >
      <Card className="overflow-hidden bg-primary/90 text-primary-foreground shadow-2xl backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center p-10 text-center md:p-16">
          <h2 className="font-headline text-4xl font-bold">Listen Live</h2>
          <p className="mt-2 max-w-md text-primary-foreground/80">
            Stream KL Radio. Don't miss a beat of the KL's sound.
          </p>
          <Waveform className="my-8 text-primary-foreground/50" />
          <Button
            size="lg"
            variant="secondary"
            className="w-full max-w-xs text-lg font-bold shadow-lg transition-transform hover:scale-105"
          >
            Start Listening
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
