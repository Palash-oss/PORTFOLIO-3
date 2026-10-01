/**
 * Scene0Loader.tsx — SCENE 0: Loader
 * 
 * SPEC:
 *  - Greige screen
 *  - Thin horizontal line draws across upper area
 *  - Red dot appears and grows into a large red disc
 *  - Giant bold counter ticks 000 -> 100 (GSAP-driven, min 1.8s)
 *  - Disc drops down-left to become the hero's red sun
 *  - Title block rises line-by-line from masks
 *  - Counter slides out
 *  - Scroll unlocks only when done
 *
 * Rules:
 *  - StrictMode-guarded (isCancelled + gsap.context().revert())  [Rule 9]
 *  - Exit via transform/clip-path only — no opacity flash          [Rule 9]
 *  - Only transform/opacity animated                               [Rule 6]
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE } from '../content/site';

interface LoaderProps {
  onComplete: () => void;
}

export const Scene0Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const discRef      = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Guard: if cancelled by StrictMode double-mount, bail immediately
    let isCancelled = false;

    // Pre-decode hero images so they're GPU-ready before loader exits
    const heroImages = SITE.projects.slice(0, 3).map(p => p.images[0]).filter(Boolean);
    const preloadPromise = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      Promise.all(heroImages.map(src => {
        return new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.decode().then(() => resolve()).catch(() => resolve());
        });
      })),
      // Minimum display duration: 1.8s (spec says min 1.8s)
      new Promise(r => setTimeout(r, 1800)),
    ]);

    const safetyTimeout = new Promise(r => setTimeout(r, 3500));

    const ctx = gsap.context(() => {
      if (!lineRef.current || !discRef.current || !counterRef.current) return;

      const tl = gsap.timeline();

      // 1. Draw the horizontal line left→right
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power3.out', force3D: true, transformOrigin: 'left center' },
        0
      );

      // 2. Red dot appears on the line and grows into a large disc
      tl.fromTo(discRef.current,
        { scale: 0, left: '8%', top: '30%' },
        { scale: 1, duration: 0.6, ease: 'back.out(1.8)', force3D: true },
        0.6
      );
      tl.to(discRef.current,
        { width: '18vw', height: '18vw', duration: 0.7, ease: 'power3.out' },
        1.1
      );

      // 3. Counter ticks 0 -> 100 over ~1.4s (starts at 0.2s so it overlaps the line draw)
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate() {
          if (counterRef.current) {
            const v = Math.min(100, Math.round(counterObj.val));
            counterRef.current.textContent = v.toString().padStart(3, '0');
          }
        }
      }, 0.3);

      // 4. Title lines rise from masks
      if (line1Ref.current && line2Ref.current) {
        tl.fromTo([line1Ref.current, line2Ref.current],
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.12, duration: 0.7, ease: 'power4.out', force3D: true },
          1.0
        );
      }

      // All async loading done → trigger exit
      Promise.race([preloadPromise, safetyTimeout]).then(() => {
        if (isCancelled || completedRef.current) return;
        completedRef.current = true;

        // Ensure counter shows exactly 100
        if (counterRef.current) counterRef.current.textContent = '100';

        const exitTl = gsap.timeline({
          onComplete() {
            if (!isCancelled) onComplete();
          }
        });

        // Counter slides out
        exitTl.to(counterRef.current!, {
          yPercent: -120,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
          force3D: true,
        }, 0);

        // Disc collapses and fades out cleanly on loader exit
        exitTl.to(discRef.current!, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
          force3D: true,
        }, 0.1);

        // Loader wipes upward to reveal hero underneath (clip-path, no flash)
        exitTl.to(wrapRef.current!, {
          yPercent: -100,
          duration: 0.72,
          ease: 'power4.inOut',
          force3D: true,
          clearProps: 'all',
        }, 0.55);
      });
    }, wrapRef);

    return () => {
      isCancelled = true;
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'var(--bg-greige)',
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      {/* Horizontal line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: 'var(--ink)',
          opacity: 0.3,
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />

      {/* Red disc (grows from dot) */}
      <div
        ref={discRef}
        style={{
          position: 'absolute',
          top: '30%',
          left: '8%',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: 'var(--red)',
          transform: 'translate(-50%, -50%) scale(0)',
          willChange: 'transform, width, height, top, left',
        }}
      />

      {/* Giant counter */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 'var(--scene-pad-x)',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-headline)',
          fontSize: 'clamp(5rem, 12vw, 14rem)',
          fontWeight: 900,
          color: 'var(--ink)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          willChange: 'transform, opacity',
        }}
      >
        <span ref={counterRef} style={{ display: 'block' }}>000</span>
      </div>

      {/* Title block (bottom-left, line-by-line mask reveal) */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute',
          bottom: 'var(--scene-pad-x)',
          left: 'var(--scene-pad-x)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <span
            ref={line1Ref}
            style={{
              display: 'block',
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              transform: 'translateY(110%)',
              willChange: 'transform',
            }}
          >
            PALASH PATHARE
          </span>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <span
            ref={line2Ref}
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.55rem, 0.9vw, 0.72rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--ink)',
              opacity: 0.45,
              marginTop: '0.3rem',
              transform: 'translateY(110%)',
              willChange: 'transform',
            }}
          >
            AI/ML Engineer & Full-Stack Developer
          </span>
        </div>
      </div>

      {/* Meta labels */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(var(--scene-pad-x) + 2px)',
          right: 'var(--scene-pad-x)',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: 'var(--ink)',
          opacity: 0.28,
        }}
      >
        CINEMATIC SCROLL PORTFOLIO / 2026
      </div>

      {/* Fig caption */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--scene-pad-x)',
          left: 'var(--scene-pad-x)',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: 'var(--ink)',
          opacity: 0.25,
        }}
      >
        // FIG. 00 — INITIALISING
      </div>
    </div>
  );
};

export default Scene0Loader;
