import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Scene0Loader } from './scenes/Scene0Loader';
import { Scene1Hero } from './scenes/Scene1Hero';
import { Scene2Statements } from './scenes/Scene2Statements';
import { Scene3Services } from './scenes/Scene3Services';
import { Scene4ToolsTitle } from './scenes/Scene4ToolsTitle';
import { Scene5ToolsCarousel } from './scenes/Scene5ToolsCarousel';
import { Scene6WorkTitle } from './scenes/Scene6WorkTitle';
import { Scene7WorkList, ProjectItem } from './scenes/Scene7WorkList';
import { Scene8Footer } from './scenes/Scene8Footer';
import { PersistentOverlays } from './scenes/PersistentOverlays';
import { CinematicCanvas } from './three/CinematicCanvas';

gsap.registerPlugin(ScrollTrigger);

export const StoryApp: React.FC = () => {
  const [isLoaderDone, setIsLoaderDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // SHARED REFS: Zero React state on the scroll path
  const progressRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isPlayingRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);

  // Performance telemetry ref (direct DOM mutation, 0 React re-renders)
  const statsFpsRef = useRef<HTMLSpanElement>(null);

  // 1. Mouse movement tracking directly into ref (0 React re-renders)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. ONE ENGINE, ONE CLOCK: Lenis + GSAP Master Timeline
  useEffect(() => {
    document.body.classList.add('cinematic-body');

    // Initialize Lenis with precise specs
    const lenis = new Lenis({
      lerp: 0.065,          // lower = silkier momentum, butter smooth
      smoothWheel: true,
      wheelMultiplier: 1.0, // natural feel
      syncTouch: false,
      autoRaf: false
    });
    lenisRef.current = lenis;

    // Halt scroll until loader finishes
    lenis.stop();

    // Single Clock: driven exclusively by gsap.ticker
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const updateTicker = (time: number) => {
      // 1. Video auto-play crawl
      if (isPlayingRef.current && containerRef.current) {
        const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
        if (lenis.scroll < maxScroll - 8) {
          lenis.scrollTo(lenis.scroll + 2.5, { immediate: true });
        } else {
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      }

      // 2. Advance Lenis on GSAP clock
      lenis.raf(time * 1000);

      // 3. FPS / Frame-time acceptance counter (Acceptance Test 1)
      frameCount++;
      const now = performance.now();
      const frameDelta = now - lastTime;
      lastTime = now;

      if (now - fpsTimer >= 350) {
        const fps = Math.round((frameCount * 1000) / (now - fpsTimer));
        frameCount = 0;
        fpsTimer = now;
        if (statsFpsRef.current) {
          statsFpsRef.current.innerText = `${fps} FPS | ${frameDelta.toFixed(1)}ms | ${(progressRef.current * 100).toFixed(0)}%`;
        }
      }
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    // 3. BUILD THE MASTER GSAP TIMELINE (Scrub: 0.8, Overlapping continuous scenes)
    const ctx = gsap.context(() => {
      // BUG 1 FIX: Strictly guard scene visibility based on master timeline range + small overlap buffer
      const SCENE_RANGES = [
        { id: '#scene1-hero', start: 0.00, end: 0.12 },
        { id: '#scene2-statements', start: 0.07, end: 0.23 },
        { id: '#scene3-circular-wipe', start: 0.19, end: 0.72 },
        { id: '#scene3-services', start: 0.19, end: 0.42 },
        { id: '#scene4-tools-title', start: 0.37, end: 0.73 },
        { id: '#scene5-tools-carousel', start: 0.44, end: 0.73 },
        { id: '#scene6-work-title', start: 0.65, end: 0.77 },
        { id: '#scene7-work-list', start: 0.72, end: 0.95 },
        { id: '#scene8-footer', start: 0.90, end: 1.00 }
      ];

      const updateSceneVisibility = (progress: number) => {
        for (let i = 0; i < SCENE_RANGES.length; i++) {
          const { id, start, end } = SCENE_RANGES[i];
          const el = document.querySelector(id) as HTMLElement | null;
          if (el) {
            const isVisible = progress >= (start - 0.02) && progress <= (end + 0.02);
            const targetVis = isVisible ? 'visible' : 'hidden';
            if (el.style.visibility !== targetVis) {
              el.style.visibility = targetVis;
            }
          }
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,       // trailing scrub = cinematic butter feel
          onUpdate: (self) => {
            progressRef.current = self.progress;
            updateSceneVisibility(self.progress);
          }
        }
      });
      masterTlRef.current = tl;
      updateSceneVisibility(0);

      // Total timeline scale: 0 to 100

      // === SCENE 1: Hero (0 to 12) ===
      tl.to(
        '#hero-creative',
        {
          xPercent: -130,
          ease: 'none',
          duration: 8,
          force3D: true
        },
        0
      );
      tl.to(
        '#hero-developer',
        {
          xPercent: 130,
          ease: 'none',
          duration: 8,
          force3D: true
        },
        0
      );
      tl.to(
        '.hero-fade',
        {
          opacity: 0,
          y: -25,
          ease: 'none',
          duration: 6,
          force3D: true
        },
        0
      );
      tl.to(
        '#scene1-hero',
        {
          opacity: 0,
          ease: 'none',
          duration: 3
        },
        7
      );

      // === SCENE 2: Statements & Glass Cube (8 to 24) ===
      // Overlaps Scene 1 by 4%
      tl.fromTo(
        '#scene2-statements',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 3 },
        8
      );
      // Slices snap into alignment
      tl.fromTo(
        '.slice-l1-1, .slice-l2-1, .slice-l3-1, .slice-r1-1, .slice-r2-1, .slice-r3-1',
        { x: -40 },
        { x: 0, ease: 'none', duration: 5, force3D: true },
        8
      );
      tl.fromTo(
        '.slice-l1-2, .slice-l2-2, .slice-l3-2, .slice-r1-2, .slice-r2-2, .slice-r3-2',
        { x: 35 },
        { x: 0, ease: 'none', duration: 5, force3D: true },
        8
      );
      tl.fromTo(
        '.slice-l1-3, .slice-l2-3, .slice-l3-3, .slice-r1-3, .slice-r2-3, .slice-r3-3',
        { x: -25 },
        { x: 0, ease: 'none', duration: 5, force3D: true },
        8
      );
      // Slices shear apart upward on exit
      tl.to(
        '.slice-l1-1, .slice-r1-1',
        { y: -65, opacity: 0, ease: 'none', duration: 5, force3D: true },
        18
      );
      tl.to(
        '.slice-l1-2, .slice-r1-2',
        { y: -95, opacity: 0, ease: 'none', duration: 5, force3D: true },
        18
      );
      tl.to(
        '.slice-l1-3, .slice-r1-3',
        { y: -130, opacity: 0, ease: 'none', duration: 5, force3D: true },
        18
      );
      tl.to(
        '#scene2-statements',
        { opacity: 0, ease: 'none', duration: 2 },
        22
      );

      // === SCENE 3: Grey to Orange Wipe & Capabilities (20 to 42) ===
      // Overlaps Scene 2 by 4%
      tl.fromTo(
        '#scene3-circular-wipe',
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none', duration: 5 },
        20
      );
      tl.fromTo(
        '#scene3-services',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 2 },
        20
      );

      // 3 Photos Parallax
      tl.fromTo(
        '#scene3-photos',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 2 },
        21
      );
      tl.fromTo(
        '#photo-center',
        { y: 120, scale: 0.85 },
        { y: -160, scale: 1.0, ease: 'none', duration: 5.5, force3D: true },
        21.5
      );
      tl.fromTo(
        '#photo-left',
        { y: 160, scale: 0.85 },
        { y: -220, scale: 1.0, ease: 'none', duration: 5.5, force3D: true },
        21.5
      );
      tl.fromTo(
        '#photo-right',
        { y: 180, scale: 0.85 },
        { y: -240, scale: 1.0, ease: 'none', duration: 5.5, force3D: true },
        21.5
      );
      // BUG 5 FIX: Collage must be fully faded/translated out (or >=70% out) before list rows enter
      tl.to('#scene3-photos', { opacity: 0, y: -60, ease: 'none', duration: 2, force3D: true }, 26.5);

      // 5 Services Rows enter strictly AFTER photo collage has exited
      [0, 1, 2, 3, 4].forEach((idx) => {
        const rowStart = 29.0 + idx * 1.4;
        tl.to(`.service-line-${idx}`, { scaleX: 1, ease: 'none', duration: 2.2 }, rowStart);
        tl.to(`.service-row-${idx}`, { opacity: 1, y: 0, ease: 'none', duration: 2.2, force3D: true }, rowStart);
      });
      // Rows exit upward
      tl.to('.service-row', { y: -60, opacity: 0, stagger: 0.8, ease: 'none', duration: 3.5, force3D: true }, 38);
      tl.to('#scene3-services', { opacity: 0, ease: 'none', duration: 2 }, 41);

      // === SCENE 4: TOOLS Title (38 to 48) ===
      // Overlaps Scene 3 by 4%
      tl.fromTo(
        '#scene4-tools-title',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 2 },
        38
      );
      tl.to('#tools-draw-line', { scaleY: 1, ease: 'none', duration: 3, force3D: true }, 38);
      tl.to('#tools-draw-dot', { opacity: 1, ease: 'none', duration: 1 }, 39);
      // Letters reveal
      [0, 1, 2, 3, 4].forEach((i) => {
        tl.to(`.tools-char-${i}`, { y: 0, opacity: 1, ease: 'none', duration: 2, force3D: true }, 40 + i * 0.5);
      });
      tl.to('#tools-underline', { scaleX: 1, ease: 'none', duration: 2 }, 42.5);
      tl.to('#tools-subtitle', { opacity: 1, ease: 'none', duration: 1.5 }, 43);
      // Slides up to pin as header near top
      tl.to('#tools-line-group', { opacity: 0, ease: 'none', duration: 2 }, 44);
      tl.to(
        '#tools-title-wrapper',
        { yPercent: -35, scale: 0.65, ease: 'none', duration: 4, force3D: true },
        44
      );

      // === SCENE 5: Tools Carousel (45 to 74) ===
      // Active while TOOLS header is pinned at top
      tl.fromTo(
        '#scene5-tools-carousel',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 2 },
        45
      );

      // 4 Tools sequential overlapping transitions: 001 -> 002 -> 003 -> 004
      // Tool 0 is visible at start (zIndex 10).
      // Tool 1 (zIndex 15) slides up and fades in over Tool 0:
      tl.fromTo(
        '.tool-subscene-1',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, ease: 'none', duration: 2.5, force3D: true },
        50.5
      );
      tl.to('.tool-subscene-0', { opacity: 0, ease: 'none', duration: 2.0 }, 52.0);

      // Tool 2 (zIndex 20) slides up and fades in over Tool 1:
      tl.fromTo(
        '.tool-subscene-2',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, ease: 'none', duration: 2.5, force3D: true },
        56.5
      );
      tl.to('.tool-subscene-1', { opacity: 0, ease: 'none', duration: 2.0 }, 58.0);

      // Tool 3 (zIndex 25) slides up and fades in over Tool 2:
      // BUG 4 FIX: Overlap ranges so incoming animates while outgoing is still 30-40% visible
      tl.fromTo(
        '.tool-subscene-3',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, ease: 'none', duration: 2.5, force3D: true },
        61.5
      );
      tl.to('.tool-subscene-2', { opacity: 0, ease: 'none', duration: 2.0 }, 63.5);

      // === SCENE 6: WORK Title (66.5 to 78) ===
      // BUG 4 FIX: Work Title starts BEFORE dissolve so Work content is clearly visible underneath
      tl.fromTo(
        '#scene6-work-title',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 1.5 },
        66.5
      );
      tl.to('#work-draw-line', { scaleY: 1, ease: 'none', duration: 2.0, force3D: true }, 67.0);
      tl.to('#work-draw-dot', { opacity: 1, ease: 'none', duration: 0.8 }, 67.5);
      [0, 1, 2, 3].forEach((i) => {
        tl.to(`.work-char-${i}`, { y: 0, opacity: 1, ease: 'none', duration: 1.2, force3D: true }, 67.8 + i * 0.35);
      });
      tl.to('#work-underline', { scaleX: 1, ease: 'none', duration: 1.2 }, 69.0);
      tl.to('#work-subtitle', { opacity: 1, ease: 'none', duration: 1.0 }, 69.2);

      // Blocky Pixel Dissolve at end of tool 4 (68 to 72)
      tl.fromTo(
        '#scene5-pixel-dissolve',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 1.0 },
        68.0
      );
      tl.to('.dissolve-block', { opacity: 1, stagger: { amount: 1.8, from: 'random' }, ease: 'none' }, 68.3);

      // Exit Scene 4 Title and Scene 5 Carousel while dissolve reveals Work underneath
      tl.to('.tool-subscene-3', { opacity: 0, ease: 'none', duration: 1.5 }, 69.0);
      tl.to('#scene4-tools-title', { opacity: 0, ease: 'none', duration: 1.5 }, 69.5);
      tl.to('#scene5-pixel-dissolve', { opacity: 0, ease: 'none', duration: 1.5 }, 71.5);
      tl.to('#scene5-tools-carousel', { opacity: 0, ease: 'none', duration: 1.0 }, 72.5);

      // Work Title: shrinks to pinned header briefly, then fades OUT before cards fully reveal
      // This prevents the floating "WORK" label from overlapping card header text
      tl.to('#work-line-group', { opacity: 0, ease: 'none', duration: 1.2 }, 72.8);
      tl.to(
        '#work-title-wrapper',
        { yPercent: -35, scale: 0.65, ease: 'none', duration: 2.0, force3D: true },
        73.0
      );
      // Fade out the whole work-title scene EARLY (before cards are fully visible)
      tl.to('#scene6-work-title', { opacity: 0, ease: 'none', duration: 1.5 }, 75.0);

      // === SCENE 7: Work List (74 to 94) ===
      // Active while WORK header is pinned at top
      tl.fromTo(
        '#scene7-work-list',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 2 },
        74
      );
      // Card 0 (01 VIDYA)
      tl.fromTo(
        '#work-card-0',
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: 3 },
        74
      );
      tl.fromTo('.work-img-0', { scale: 1.15 }, { scale: 1.0, ease: 'none', duration: 3, force3D: true }, 74);
      // Card 0 pushes up as Card 1 enters
      tl.to('#work-card-0', { yPercent: -100, opacity: 0, ease: 'none', duration: 3, force3D: true }, 79.5);

      // Card 1 (02 CodeBase X-Ray)
      tl.fromTo(
        '#work-card-1',
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: 3 },
        80
      );
      tl.fromTo('.work-img-1', { scale: 1.15 }, { scale: 1.0, ease: 'none', duration: 3, force3D: true }, 80);
      // Card 1 pushes up as Card 2 enters
      tl.to('#work-card-1', { yPercent: -100, opacity: 0, ease: 'none', duration: 3, force3D: true }, 85.5);

      // Card 2 (03 EcoKernel)
      tl.fromTo(
        '#work-card-2',
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none', duration: 3 },
        86
      );
      tl.fromTo('.work-img-2', { scale: 1.15 }, { scale: 1.0, ease: 'none', duration: 3, force3D: true }, 86);

      // BUG 3 FIX: Card 2 pushes up smoothly as Footer enters (never sits under footer CTA box)
      tl.to('#work-card-2', { yPercent: -100, opacity: 0, ease: 'none', duration: 3.2, force3D: true }, 90.0);

      // Exit Scene 7 as Footer arrives (Scene 6 already faded at 75.0)
      tl.to('#scene7-work-list', { opacity: 0, ease: 'none', duration: 1.5 }, 93.5);

      // === SCENE 8: Footer (90.5 to 100) ===
      tl.fromTo(
        '#scene8-footer',
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 2.0 },
        90.5
      );
      // Rising stair steps
      [0, 1, 2, 3, 4, 5, 6, 7].forEach((s) => {
        tl.fromTo(`.footer-stair-${s}`, { height: '0vh' }, { height: '105vh', ease: 'none', duration: 2.5, force3D: true }, 90.8 + s * 0.3);
      });
      tl.to('#footer-orange-backdrop', { opacity: 1, ease: 'none', duration: 1.5 }, 92.5);

      // Framed Contact Box scales in AFTER footer arrives (zero overlap with Work Card 2)
      tl.fromTo(
        '#footer-framed-box',
        { opacity: 0, scale: 0.92, y: 35 },
        { opacity: 1, scale: 1, y: 0, ease: 'none', duration: 2.5, force3D: true },
        93.0
      );

      // Huge wordmark slides up from below
      tl.fromTo(
        '#footer-wordmark-wrapper',
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, ease: 'none', duration: 2.5, force3D: true },
        94.5
      );
      // Runner sprints in and settles beside slash
      tl.fromTo(
        '#footer-runner',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, ease: 'none', duration: 2.0, force3D: true },
        95.0
      );

      // Resting hold at 100% scroll progress: footer stays 100% visible and settled
      tl.to({}, { duration: 3 }, 97.0);
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // When loader completes: unlock scroll and animate hero entrance
  const handleLoaderComplete = useCallback(() => {
    setIsLoaderDone(true);
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    // Hero entrance letters stagger reveal
    gsap.fromTo(
      '.hero-letter-entry',
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.035, duration: 0.75, ease: 'power3.out', force3D: true }
    );
    // Refresh ScrollTrigger calculations
    ScrollTrigger.refresh();
  }, []);

  // Toggle Video Auto-Play Mode
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      isPlayingRef.current = next;
      if (next && lenisRef.current && containerRef.current) {
        const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
        if (lenisRef.current.scroll >= maxScroll - 20) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
      return next;
    });
  }, []);

  // Navigation jump
  const handleNavigateTo = useCallback((targetProgress: number) => {
    if (!containerRef.current || !lenisRef.current) return;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    const targetY = targetProgress * maxScroll;
    lenisRef.current.scrollTo(targetY, { duration: 1.4 });
  }, []);

  return (
    <div className="relative bg-[#0c0c0e] text-[#0c0c0e] selection:bg-[#F0561F] selection:text-black min-h-screen">
      {/* SCENE 0: StrictMode-guarded, font-preloaded State Machine Loader */}
      {!isLoaderDone && <Scene0Loader onComplete={handleLoaderComplete} />}

      {/* Persistent Overlays: Static GPU Grain, Swiss Crosshairs, Nav & gsap.quickTo Cursor */}
      <PersistentOverlays
        cursorType="default"
        onNavigateTo={handleNavigateTo}
      />

      {/* FIXED 100svh STAGE: All scenes pinned inside */}
      <div className="cinematic-stage">
        {/* Persistent WebGL Canvas: Direct progressRef read (0 React re-renders) */}
        <CinematicCanvas progressRef={progressRef} mousePosRef={mousePosRef} />

        {/* SCENE 1: Hero (0 to 12) */}
        <Scene1Hero
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />

        {/* SCENE 2: Statements & Glass Cube (8 to 24) */}
        <Scene2Statements />

        {/* SCENE 3: Grey to Orange Wipe & Capabilities (20 to 42) */}
        <Scene3Services />

        {/* SCENE 4: TOOLS Title Intro & Pin (38 to 48) */}
        <Scene4ToolsTitle />

        {/* SCENE 5: Tools Carousel - 4 Pinned Tools & Pixel Dissolve (45 to 74) */}
        <Scene5ToolsCarousel />

        {/* SCENE 6: WORK Title Intro & Pin (70 to 78) */}
        <Scene6WorkTitle />

        {/* SCENE 7: Work List - 3 Architectural Case Studies (74 to 94) */}
        <Scene7WorkList
          onSelectProject={(project) => setActiveModalProject(project)}
        />

        {/* SCENE 8: Footer - Pixel Stair Orange & Huge Wordmark (90 to 100) */}
        <Scene8Footer />
      </div>

      {/* Floating Cinema Playback HUD Pill */}
      {isLoaderDone && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto flex items-center gap-3 bg-[#0c0c0e]/95 text-white px-4 py-2 rounded-full border border-white/20 shadow-2xl transition-transform duration-200 hover:scale-105 select-none"
        >
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#F0561F] hover:text-white transition-colors"
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#F0561F] animate-pulse" />
                <span>CINEMA AUTOPLAY [PAUSE ❚❚]</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>PLAY FILM [AUTO-SCROLL ▶]</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Dev-only FPS / Frame-time Overlay (Acceptance Test 1) */}
      <div className="fixed bottom-3 left-4 z-[99999] pointer-events-none font-mono text-[9px] font-bold tracking-widest text-black/40 bg-white/60 px-2 py-1 border border-black/10">
        <span ref={statsFpsRef}>60 FPS | 16.6ms | 0%</span>
      </div>

      {/* TALL SCROLL CONTAINER (~1200vh) */}
      <div
        ref={containerRef}
        className="w-full h-[1200vh] pointer-events-none opacity-0 select-none"
        aria-hidden="true"
      />

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[999999] bg-black/85 flex items-center justify-center p-4 select-none">
          <div className="bg-[#D9D9D9] border-2 border-black max-w-2xl w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 font-mono text-sm font-bold px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors"
            >
              CLOSE [ESC]
            </button>

            <div>
              <span className="font-mono text-[10px] tracking-widest text-[#F0561F] font-bold uppercase block mb-1">
                // PROJECT SPECIFICATION {activeModalProject.number}
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase text-[#0c0c0e]">
                {activeModalProject.title}
              </h2>
            </div>

            <div className="w-full h-56 sm:h-72 overflow-hidden border border-black bg-black/10">
              <img
                src={activeModalProject.mainImg}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-mono text-xs sm:text-sm text-[#2a2a2e] leading-relaxed uppercase">
              {activeModalProject.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {activeModalProject.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] font-bold px-2.5 py-1 bg-black text-white"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-black/20">
              <div className="flex items-center gap-3">
                <a
                  href={activeModalProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold bg-black text-white px-4 py-2 border border-black hover:bg-[#F0561F] hover:text-black transition-colors"
                >
                  SOURCE CODE →
                </a>
                {activeModalProject.liveLink && (
                  <a
                    href={activeModalProject.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold bg-[#F0561F] text-black px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    LIVE DEMO ↗
                  </a>
                )}
              </div>
              <span className="font-mono text-[10px] text-black/60 uppercase">
                PRODUCTION READY // PALASH PATHARE
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryApp;
