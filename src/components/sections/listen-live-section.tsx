'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import { SoundWave } from '../ui/sound-wave';
import { AudioWave } from '../ui/audio-wave';

// This component provides a static visual representation of a waveform.
const Waveform = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="240" height="60" viewBox="0 0 240 60" fill="none" {...props}>
    <g>
      <rect x="0" y="22.5" width="3" height="15" fill="currentColor" rx="1.5" />
      <rect x="6" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="12" y="17.5" width="3" height="25" fill="currentColor" rx="1.5" />
      <rect x="18" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="24" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="30" y="22.5" width="3" height="15" fill="currentColor" rx="1.5" />
      <rect x="36" y="15" width="3" height="30" fill="currentColor" rx="1.5" />
      <rect x="42" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="48" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="54" y="12.5" width="3" height="35" fill="currentColor" rx="1.5" />
      <rect x="60" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="66" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="72" y="22.5" width="3" height="15" fill="currentColor" rx="1.5" />
      <rect x="78" y="10" width="3" height="40" fill="currentColor" rx="1.5" />
      <rect x="84" y="5" width="3" height="50" fill="currentColor" rx="1.5" />
      <rect x="90" y="15" width="3" height="30" fill="currentColor" rx="1.5" />
      <rect x="96" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="102" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="108" y="0" width="3" height="60" fill="currentColor" rx="1.5" />
      <rect x="114" y="10" width="3" height="40" fill="currentColor" rx="1.5" />
      <rect x="120" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="126" y="15" width="3" height="30" fill="currentColor" rx="1.5" />
      <rect x="132" y="0" width="3" height="60" fill="currentColor" rx="1.5" />
      <rect x="138" y="10" width="3" height="40" fill="currentColor" rx="1.5" />
      <rect x="144" y="5" width="3" height="50" fill="currentColor" rx="1.5" />
      <rect x="150" y="15" width="3" height="30" fill="currentColor" rx="1.5" />
      <rect x="156" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="162" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="168" y="12.5" width="3" height="35" fill="currentColor" rx="1.5" />
      <rect x="174" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="180" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="186" y="22.5" width="3" height="15" fill="currentColor" rx="1.5" />
      <rect x="192" y="10" width="3" height="40" fill="currentColor" rx="1.5" />
      <rect x="198" y="15" width="3" height="30" fill="currentColor" rx="1.5" />
      <rect x="204" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="210" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="216" y="17.5" width="3" height="25" fill="currentColor" rx="1.5" />
      <rect x="222" y="20" width="3" height="20" fill="currentColor" rx="1.5" />
      <rect x="228" y="25" width="3" height="10" fill="currentColor" rx="1.5" />
      <rect x="234" y="22.5" width="3" height="15" fill="currentColor" rx="1.5" />
    </g>
  </svg>
);

export function ListenLiveSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check the live status from localStorage when the component mounts.
    const checkLiveStatus = () => {
      const status = localStorage.getItem('kl-radio-live-status');
      setIsPlaying(status === 'online');
    };

    checkLiveStatus();

    // Listen for changes in localStorage from other tabs.
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'kl-radio-live-status') {
        setIsPlaying(event.newValue === 'online');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
              {isPlaying ? 'We Are Live!' : 'Listen Live'}
            </h2>
            <p className="mt-2 max-w-md text-primary-foreground/80">
              {isPlaying ? 'Tune in now to hear what\'s happening at KL Radio.' : "The stream is currently offline. Check back soon!"}
            </p>
            <div className="my-8 h-[60px] w-[240px] flex items-center justify-center">
              {isPlaying ? <AudioWave /> : <Waveform className="text-primary-foreground/50" />}
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="w-full max-w-xs text-lg font-bold shadow-lg transition-transform hover:scale-105 bg-background text-foreground hover:bg-background/80 rounded-full"
              disabled={!isPlaying}
            >
              {isPlaying ? 'Now Playing' : 'Stream Offline'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
