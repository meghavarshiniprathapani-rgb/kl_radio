'use client';

import Lenis from '@studio-freight/lenis';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => {
    return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const newLenis = new Lenis();
    
    function raf(time: number) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    const rafId = requestAnimationFrame(raf);
    setLenis(newLenis);

    return () => {
        cancelAnimationFrame(rafId);
        newLenis.destroy();
    }
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
        {children}
    </LenisContext.Provider>
  );
}
