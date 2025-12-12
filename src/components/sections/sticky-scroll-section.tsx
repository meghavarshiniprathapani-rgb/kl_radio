

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const announcements = [
  {
    id: 1,
    title: 'New Primetime Show: "Midnight Grooves"',
    date: 'July 25, 2024',
    content:
      'Tune in every weekday at 10 PM for the smoothest jazz and R&B tracks to wind down your day. Hosted by DJ Alex.',
  },
  {
    id: 2,
    title: 'Annual KL Radio Fest Announced!',
    date: 'July 22, 2024',
    content:
      'Get ready for the biggest music event of the year! The KL Radio Fest is back with an amazing lineup. Tickets go on sale August 1st.',
  },
  {
    id: 3,
    title: 'Technical Maintenance Scheduled',
    date: 'July 20, 2024',
    content:
      'Our services will be temporarily unavailable on July 28th from 2 AM to 4 AM for scheduled maintenance. We apologize for any inconvenience.',
  },
];

export function StickyScrollSection() {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cardContainer = component.current!.querySelector('.card-container');
    const stickyHeader = component.current!.querySelector('.sticky-header h1');
    const cards = gsap.utils.toArray<HTMLElement>('.card');

    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    const gapTl = gsap.timeline({ paused: true });
    gapTl
      .to(cardContainer!, { gap: 30, duration: 1, ease: 'power3.out' }, 0)
      .to('#card-1', { x: -30, duration: 1, ease: 'power3.out' }, 0)
      .to('#card-3', { x: 30, duration: 1, ease: 'power3.out' }, 0)
      .to(cards, { borderRadius: '20px', duration: 1, ease: 'power3.out' }, 0);

    const flipTl = gsap.timeline({ paused: true });
    flipTl
      .to(
        '.card',
        {
          rotationY: 180,
          duration: 1,
          ease: 'power3.inOut',
          stagger: 0.1,
          transformOrigin: 'center center',
        },
        0
      )
      .to(
        ['#card-1', '#card-3'],
        {
          y: 30,
          rotationZ: (i) => (i === 0 ? -15 : 15),
          duration: 1,
          ease: 'power3.inOut',
        },
        0
      );

    function setDefaults() {
      document
        .querySelectorAll('.card, .card-container, .sticky-header h1')
        .forEach((el) => {
          if (el && (el as HTMLElement).style) (el as HTMLElement).style.cssText = '';
        });
      gapTl.pause(0);
      flipTl.pause(0);
      isGapAnimationCompleted = false;
      isFlipAnimationCompleted = false;
    }

    function updateHeader(progress: number) {
      if (progress >= 0.1 && progress <= 0.35) {
        const headerProgress = gsap.utils.mapRange(0.1, 0.35, 0, 1, progress);
        const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
        const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
        gsap.set(stickyHeader, { y: yValue, opacity: opacityValue });
      } else if (progress < 0.1) {
        gsap.set(stickyHeader, { y: 40, opacity: 0 });
      } else {
        gsap.set(stickyHeader, { y: 0, opacity: 1 });
      }
    }

    function updateCardWidth(progress: number) {
        const isMobile = window.innerWidth < 1000;
        if (isMobile) {
            gsap.set(cardContainer, { width: '100%' });
            return;
        }
      if (progress <= 0.35) {
        const widthPercentage = gsap.utils.mapRange(0, 0.35, 75, 60, progress);
        gsap.set(cardContainer, { width: `${widthPercentage}%` });
      } else {
        gsap.set(cardContainer, { width: '60%' });
      }
    }

    function handleGapAnimation(progress: number) {
      if (progress >= 0.45 && !isGapAnimationCompleted) {
        gapTl.play();
        isGapAnimationCompleted = true;
      } else if (progress < 0.45 && isGapAnimationCompleted) {
        gapTl.reverse();
        isGapAnimationCompleted = false;
      }
    }

    function handleFlipAnimation(progress: number) {
      if (progress >= 0.7 && !isFlipAnimationCompleted) {
        flipTl.play();
        isFlipAnimationCompleted = true;
      } else if (progress < 0.7 && isFlipAnimationCompleted) {
        flipTl.reverse();
        isFlipAnimationCompleted = false;
      }
    }

    function initAnimations() {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setDefaults();

      const st = ScrollTrigger.create({
        trigger: '.sticky',
        start: 'top top',
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate(self) {
          const progress = self.progress;
          updateHeader(progress);
          updateCardWidth(progress);
          handleGapAnimation(progress);
          handleFlipAnimation(progress);
        },
      });

      return () => st.kill();
    }

    let revert: (() => void) | undefined;
    const timeout = setTimeout(() => {
      revert = initAnimations();
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);


    return () => {
      clearTimeout(timeout);
      revert?.();
      resizeObserver.disconnect();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={component}>
      <style>{`
        .sticky-scroll-section-container {
          --bg: #0f0f0f;
          --fg: #fff;
          --card-1: #b2b2b2;
          --card-2: #ce2017;
          --card-3: #2f2f2f;
          font-family: 'Instrument Serif', serif;
        }
        
        .sticky-scroll-section-container img {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }

        .sticky-scroll-section-container h1 {
          font-size: 4rem;
          font-weight: 500;
          line-height: 1;
        }

        .sticky-scroll-section-container p {
          font-size: 1.25rem;
          line-height: 1.4;
        }

        .sticky-scroll-section-container section {
          position: relative;
          width: 100%;
          height: 100vh;
          padding: 2rem;
          background: var(--bg);
          color: var(--fg);
        }

        .sticky-scroll-section-container .outro {
          height: 50vh;
        }

        .sticky-scroll-section-container .sticky {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .sticky-scroll-section-container .sticky-header {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
        }

        .sticky-scroll-section-container .sticky-header h1 {
          position: relative;
          text-align: center;
          will-change: transform, opacity;
          transform: translateY(40px);
          opacity: 0;
        }

        .sticky-scroll-section-container .card-container {
          position: relative;
          width: 75%;
          display: flex;
          perspective: 1000px;
          transform: translateY(100px);
          will-change: width;
        }

        .sticky-scroll-section-container .card {
          position: relative;
          flex: 1;
          aspect-ratio: 5 / 7;
          transform-style: preserve-3d;
          transform-origin: top;
        }

        .sticky-scroll-section-container #card-1 {
          border-radius: 20px 0 0 20px;
        }

        .sticky-scroll-section-container #card-3 {
          border-radius: 0 20px 20px 0;
        }

        .sticky-scroll-section-container .card-front,
        .sticky-scroll-section-container .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: inherit;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }

        .sticky-scroll-section-container .card-front h2 {
            font-size: 1.5rem;
            font-weight: 500;
        }

        .sticky-scroll-section-container .card-back {
          transform: rotateY(180deg);
          font-size: 1rem;
        }

        .sticky-scroll-section-container .card-back span {
          position: absolute;
          top: 2rem;
          left: 2rem;
          opacity: 0.4;
          font-size: 2rem;
        }
        
        .sticky-scroll-section-container #card-1 .card-front {
            background: var(--card-1);
            color: var(--bg);
        }
        .sticky-scroll-section-container #card-2 .card-front {
            background: var(--card-2);
        }
        .sticky-scroll-section-container #card-3 .card-front {
            background: var(--card-3);
        }


        .sticky-scroll-section-container #card-1 .card-back {
          background: linear-gradient(
            165.825deg,
            rgb(199, 199, 199) 0%,
            rgb(131, 131, 131) 100%
          );
          color: var(--bg);
        }

        .sticky-scroll-section-container #card-2 .card-back {
          background: linear-gradient(
            177deg,
            rgb(250, 76, 45) -18%,
            rgb(191, 24, 21) 31%,
            rgb(74, 10, 8) 100%
          );
        }

        .sticky-scroll-section-container #card-3 .card-back {
          background: linear-gradient(rgb(31, 31, 31) 0%, rgb(22, 22, 22) 100%);
        }

        @media (max-width: 1000px) {
          .sticky-scroll-section-container h1 {
            font-size: 2.5rem;
          }

          .sticky-scroll-section-container .sticky {
            padding: 4rem 1rem;
            justify-content: flex-start;
          }
          
          .sticky-scroll-section-container .sticky-header {
             position: relative;
             top: 0;
             left: 0;
             transform: none;
             margin-bottom: 2rem;
             margin-top: 4rem;
          }

          .sticky-scroll-section-container .card-container {
            width: 100%;
            transform: none;
          }
          
          .sticky-scroll-section-container .card-front h2 {
            font-size: 1rem;
          }

          .sticky-scroll-section-container .card-back {
            font-size: 0.8rem;
            padding: 1.5rem;
          }

          .sticky-scroll-section-container .card-back span {
            font-size: 1.5rem;
            top: 1rem;
            left: 1rem;
          }
        }
      `}</style>
      <div className="sticky-scroll-section-container font-serif bg-[#0f0f0f]">
        <section className="sticky" id="sticky">
          <div className="sticky-header">
            <h1>Announcements</h1>
          </div>

          <div className="card-container">
            <div className="card" id="card-1">
              <div className="card-front">
                <h2>{announcements[0].title}</h2>
              </div>
              <div className="card-back">
                <span>01</span>
                <p>{announcements[0].content}</p>
              </div>
            </div>

            <div className="card" id="card-2">
              <div className="card-front">
                <h2>{announcements[1].title}</h2>
              </div>
              <div className="card-back">
                <span>02</span>
                <p>{announcements[1].content}</p>
              </div>
            </div>

            <div className="card" id="card-3">
              <div className="card-front">
                <h2>{announcements[2].title}</h2>
              </div>
              <div className="card-back">
                <span>03</span>
                <p>{announcements[2].content}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="outro text-center content-center">
          <h1>Every transition leaves a trace</h1>
        </section>
      </div>
    </div>
  );
}
