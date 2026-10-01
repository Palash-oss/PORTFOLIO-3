/**
 * App.tsx — In-Flow Sticky Cards Orchestrator
 *
 * SPEC:
 *  - Normal document flow inside <main className="c-main">
 *  - Each scene is a card: position: sticky; top: 0; height: 100svh; overflow: hidden
 *  - Increasing z-index (Hero: 10, Work: 20, Record: 30, Principles: 40, Contact: 50)
 *  - Soft top shadow and rounded top corners on every card except the first
 *  - Next card naturally slides up over previous one (blank gaps impossible by construction)
 *  - Card cover animation: ONE ScrollTrigger per card, scrubbed, trigger = NEXT card,
 *    start 'top bottom', end 'top top': scale 1 -> 0.94, translateY -> -4vh, opacity -> 0.6
 *  - Principles (pinned): wrapper height 400svh containing sticky 100svh child
 *    ScrollTrigger on wrapper (top top to bottom bottom) cycles active word (0 to 1/3 to 2/3 to 1)
 *  - Wordmark/marquee band is last child of principles card, stays visible while contact slides over
 *  - Lenis (autoRaf: false) driven by gsap.ticker, lagSmoothing(0), lenis.on('scroll', ScrollTrigger.update)
 *  - Stats.js monitoring FPS & frame times
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import { advance } from '@react-three/fiber';
// @ts-ignore
import Stats from 'stats.js';

import { Scene0Loader } from './scenes/Scene0Loader';
import { Scene1Hero } from './scenes/Scene1Hero';
import { Scene2Work } from './scenes/Scene2Work';
import { Scene3Record } from './scenes/Scene3Record';
import { Scene4Principles } from './scenes/Scene4Principles';
import { Scene5Contact } from './scenes/Scene5Contact';
import { PersistentOverlays } from './components/PersistentOverlays';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  // Scroll path refs — zero React state on scroll
  const progressRef = useRef(0);
  const lenisRef    = useRef<Lenis | null>(null);

  // Card element refs for cover transitions
  const heroCardRef       = useRef<HTMLElement>(null);
  const workCardRef       = useRef<HTMLElement>(null);
  const recordCardRef     = useRef<HTMLElement>(null);
  const principlesCardRef = useRef<HTMLElement>(null);
  const contactCardRef    = useRef<HTMLElement>(null);

  const workWrapperRef       = useRef<HTMLDivElement>(null);
  const recordWrapperRef     = useRef<HTMLDivElement>(null);
  const principlesWrapperRef = useRef<HTMLDivElement>(null);
  const contactWrapperRef    = useRef<HTMLDivElement>(null);

  // Marquee state
  const marqueeXRef    = useRef(0);
  const marqueeVelRef  = useRef(0);
  const lastScrollYRef = useRef(0);

  // ─── 1. Lenis + GSAP Engine + Stats.js ─────────────────────────────
  useEffect(() => {
    // Stats.js setup
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb
    stats.dom.id = 'stats-panel';
    stats.dom.style.position = 'fixed';
    stats.dom.style.top = '12px';
    stats.dom.style.right = '20px';
    stats.dom.style.left = 'auto';
    stats.dom.style.zIndex = '99999';
    stats.dom.style.opacity = '0.75';
    document.body.appendChild(stats.dom);

    // Build Lenis with buttery-smooth momentum and exponential deceleration
    const lenis = new Lenis({
      lerp: 0.055,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    lenis.stop(); // unlock after loader completes

    gsap.ticker.lagSmoothing(0);

    const onTick = (time: number) => {
      stats.begin();

      lenis.raf(time * 1000);

      // Advance R3F canvas only when hero is visible
      if (progressRef.current < 0.25) {
        advance(time);
      }

      // Marquee translate based on velocity
      const track = document.getElementById('marquee-track');
      const contactTrack = document.getElementById('contact-marquee-track');
      if (track || contactTrack) {
        const scrollDelta = lenis.scroll - lastScrollYRef.current;
        lastScrollYRef.current = lenis.scroll;
        marqueeVelRef.current = marqueeVelRef.current * 0.92 + scrollDelta * 0.12;
        const baseSpeed = 0.5;
        marqueeXRef.current -= (baseSpeed + marqueeVelRef.current);

        if (track) {
          const halfWidth = track.scrollWidth / 2;
          if (halfWidth > 0 && Math.abs(marqueeXRef.current) >= halfWidth) {
            marqueeXRef.current += halfWidth;
          }
          track.style.transform = `translate3d(${marqueeXRef.current}px, 0, 0)`;
        }
        if (contactTrack) {
          contactTrack.style.transform = `translate3d(${marqueeXRef.current}px, 0, 0)`;
        }
      }

      stats.end();
    };

    gsap.ticker.add(onTick);

    // Lenis updates ScrollTrigger and progressRef
    lenis.on('scroll', (e: any) => {
      progressRef.current = e.progress;
      ScrollTrigger.update();
    });

    // ─── 2. In-Flow Sticky Card Cover Animations ─────────────────────
    const ctx = gsap.context(() => {
      // ONE ScrollTrigger per card, scrubbed, trigger = NEXT card, start 'top bottom', end 'top top':
      // scale 1 -> 0.94, translateY -> -4vh, opacity/brightness -> 0.6. Reverse works automatically.

      // Card 1 (Hero) covered by Card 2 (Work)
      if (heroCardRef.current && workCardRef.current) {
        gsap.fromTo(heroCardRef.current,
          { scale: 1, y: 0, opacity: 1 },
          {
            scale: 0.94,
            y: '-4vh',
            opacity: 0.6,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: workCardRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 1.2,
            },
          }
        );
      }

      // Card 2 (Work) covered by Card 3 (Record)
      if (workCardRef.current && recordCardRef.current) {
        gsap.fromTo(workCardRef.current,
          { scale: 1, y: 0, opacity: 1 },
          {
            scale: 0.94,
            y: '-4vh',
            opacity: 0.6,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: recordCardRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 1.2,
            },
          }
        );
      }

      // Card 3 (Record) covered by Card 4 (Principles)
      if (recordCardRef.current && principlesCardRef.current) {
        gsap.fromTo(recordCardRef.current,
          { scale: 1, y: 0, opacity: 1 },
          {
            scale: 0.94,
            y: '-4vh',
            opacity: 0.6,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: principlesCardRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 1.2,
            },
          }
        );
      }

      // Card 4 (Principles) covered by Card 5 (Contact)
      if (principlesCardRef.current && contactCardRef.current) {
        gsap.fromTo(principlesCardRef.current,
          { scale: 1, y: 0, opacity: 1 },
          {
            scale: 0.94,
            y: '-4vh',
            opacity: 0.6,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: contactCardRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 1.2,
            },
          }
        );
      }
    });

    // Refresh after fonts & images load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      ctx.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      if (stats.dom && stats.dom.parentNode) {
        stats.dom.parentNode.removeChild(stats.dom);
      }
    };
  }, []);

  // ─── 3. Loader complete → unlock scroll + hero entrance ──────────
  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
    if (lenisRef.current) lenisRef.current.start();

    // Hero text entrance after loader exits (power4.out, masked)
    gsap.fromTo('.hero-letter-entry',
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.85,
        ease: 'power4.out',
        force3D: true,
        onComplete() {
          ScrollTrigger.refresh();
        }
      }
    );
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-greige)', minHeight: '100svh', position: 'relative' }}>
      {/* SCENE 0 — Loader */}
      {!loaderDone && <Scene0Loader onComplete={handleLoaderComplete} />}

      {/* Persistent overlays: grain, edge bars, custom cursor */}
      <PersistentOverlays progressRef={progressRef} />

      {/* MAIN DOCUMENT FLOW — In-flow sticky cards */}
      <main className="c-main">
        {/* CARD 1: Hero (z-index 10, no top radius, sticky at top) */}
        <section
          ref={heroCardRef}
          id="scene1-hero"
          className="c-card c-card--hero"
          style={{ zIndex: 10 }}
        >
          <Scene1Hero progressRef={progressRef} />
        </section>

        {/* CARD 2: Selected Work (wrapper 200svh, sticky child z-index 20) */}
        <div
          ref={workWrapperRef}
          id="work-wrapper"
          className="c-card-track"
          style={{ height: '200svh' }}
        >
          <section
            ref={workCardRef}
            id="scene2-work"
            className="c-card"
            style={{ zIndex: 20 }}
          >
            <Scene2Work />
          </section>
        </div>

        {/* CARD 3: Record / Experience (wrapper 200svh, sticky child z-index 30) */}
        <div
          ref={recordWrapperRef}
          id="record-wrapper"
          className="c-card-track"
          style={{ height: '200svh' }}
        >
          <section
            ref={recordCardRef}
            id="scene3-record"
            className="c-card"
            style={{ zIndex: 30 }}
          >
            <Scene3Record />
          </section>
        </div>

        {/* CARD 4: Principles (pinned wrapper 400svh, sticky child z-index 40) */}
        <div
          ref={principlesWrapperRef}
          id="principles-wrapper"
          className="c-card-track"
          style={{ height: '400svh' }}
        >
          <section
            ref={principlesCardRef}
            id="scene4-principles"
            className="c-card"
            style={{ zIndex: 40 }}
          >
            <Scene4Principles />
          </section>
        </div>

        {/* CARD 5: Contact (wrapper 100svh, sticky child z-index 50) */}
        <div
          ref={contactWrapperRef}
          id="contact-wrapper"
          className="c-card-track"
          style={{ height: '100svh' }}
        >
          <section
            ref={contactCardRef}
            id="scene5-contact"
            className="c-card"
            style={{ zIndex: 50 }}
          >
            <Scene5Contact lenisRef={lenisRef} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
