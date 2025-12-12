'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';
import { SoundWave } from '../ui/sound-wave';
import { AudioWave } from '../ui/audio-wave';

// --- UPDATED WAVEFORM COMPONENT ---
const Waveform = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 140 32" width="140" height="32" {...props}>
    {/* Removed rx="2" from all rect elements for sharp edges */}
    <rect x="0" y="10" width="4" height="12" fill="currentColor" />
    <rect x="8" y="4" width="4" height="24" fill="currentColor" />
    <rect x="16" y="12" width="4" height="8" fill="currentColor" />
    <rect x="24" y="0" width="4" height="32" fill="currentColor" />
    <rect x="32" y="8" width="4" height="16" fill="currentColor" />
    <rect x="40" y="12" width="4" height="8" fill="currentColor" />
    <rect x="48" y="6" width="4" height="20" fill="currentColor" />
    <rect x="56" y="10" width="4" height="12" fill="currentColor" />
    <rect x="64" y="2" width="4" height="28" fill="currentColor" />
    <rect x="72" y="8" width="4" height="16" fill="currentColor" />
    <rect x="80" y="12" width="4" height="8" fill="currentColor" />
    <rect x="88" y="4" width="4" height="24" fill="currentColor" />
    <rect x="96" y="10" width="4" height="12" fill="currentColor" />
    <rect x="104" y="6" width="4" height="20" fill="currentColor" />
    <rect x="112" y="12" width="4" height="8" fill="currentColor" />
    <rect x="120" y="2" width="4" height="28" fill="currentColor" />
    <rect x="128" y="10" width="4" height="12" fill="currentColor" />
    <rect x="136" y="4" width="4" height="24" fill="currentColor" />
  </svg>
);
// ------------------------------------

export function ListenLiveSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <section
      id="listen-live"
      className="container mx-auto max-w-5xl px-4 py-20 md:py-28"
    >
      <div className="relative">
        <SoundWave />
        <Card className="relative overflow-hidden bg-primary text-primary-foreground shadow-2xl backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center md:p-16">
            <h2 className="font-headline text-5xl font-bold">
              {isPlaying ? 'Now Playing' : 'Listen Live'}
            </h2>
            <p className="mt-2 max-w-md text-primary-foreground/80">
              {isPlaying ? 'KL Radio - The Voice of Klians' : "Stream KL Radio. Don't miss a beat of the KL's sound."}
            </p>
            <div className="my-8 h-[32px] w-[140px] flex items-center justify-center">
              {isPlaying ? <AudioWave /> : <Waveform className="text-primary-foreground/50" />}
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="w-full max-w-xs text-lg font-bold shadow-lg transition-transform hover:scale-105 bg-background text-foreground hover:bg-background/80 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? 'Stop' : 'Start Listening'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}