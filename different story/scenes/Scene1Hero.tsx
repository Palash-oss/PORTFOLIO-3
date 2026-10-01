/**
 * Scene1Hero.tsx — SCENE 1: Hero
 *
 * SPEC:
 *  - Left: halftone bust (R3F, bleed off bottom-left) + red disc sun
 *  - Cursor over bust: liquid ripple in dot field (shader uniform, eased)
 *  - Right: NAME (two-line, giant extended bold) + red full stop
 *           Role, mono bio ~4 lines
 *           CONTACT ↗ link (red underline draws on hover)
 *           — SCROLL TO EXPLORE
 *  - All elements visible after loader
 */

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { HalftoneBustCanvas } from '../three/HalftoneBust';
import { SITE } from '../content/site';
import { QuantumRole, QuantumBio } from '../components/QuantumScramble';

interface Scene1HeroProps {
  progressRef: React.MutableRefObject<number>;
}

export const Scene1Hero: React.FC<Scene1HeroProps> = ({ progressRef }) => {
  // Ripple refs — fed directly from mouse events, no React state
  const ripplePosRef      = useRef({ x: 0, y: 0 });
  const rippleStrengthRef = useRef(0);
  const bustAreaRef       = useRef<HTMLDivElement>(null);

  // Hero text ref for scroll-driven dim
  const heroTextRef = useRef<HTMLDivElement>(null);

  // Eased ripple decay — gsap.quickTo for zero-alloc animation
  const rippleXTo = useRef<gsap.QuickToFunc | null>(null);
  const rippleYTo = useRef<gsap.QuickToFunc | null>(null);
  const rippleStrTo = useRef<gsap.QuickToFunc | null>(null);

  const strengthProxy = useRef({ val: 0 });

  useEffect(() => {
    // Build quickTo easers for ripple position
    rippleXTo.current = gsap.quickTo(ripplePosRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
    rippleYTo.current = gsap.quickTo(ripplePosRef.current, 'y', { duration: 0.6, ease: 'power2.out' });
    rippleStrTo.current = gsap.quickTo(strengthProxy.current, 'val', { duration: 0.5, ease: 'power2.out' });

    // Sync strengthProxy to rippleStrengthRef every frame
    const syncStrength = () => { rippleStrengthRef.current = strengthProxy.current.val; };
    gsap.ticker.add(syncStrength);

    // Initial state: guarantee hero elements are ready and visible
    gsap.set('.hero-letter-entry', { yPercent: 0, opacity: 1 });

    return () => {
      gsap.ticker.remove(syncStrength);
    };
  }, []);

  const handleBustMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    if (rippleXTo.current) rippleXTo.current(nx);
    if (rippleYTo.current) rippleYTo.current(ny);
    if (rippleStrTo.current) rippleStrTo.current(1);
  }, []);

  const handleBustMouseLeave = useCallback(() => {
    if (rippleStrTo.current) rippleStrTo.current(0);
  }, []);

  return (
    <div
      id="scene1-hero-content"
      style={{
        backgroundColor: 'var(--bg-greige)',
        width: '100%',
        height: '100svh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="hero-wrap" style={{ height: '100svh' }}>
        {/* LEFT: Bust area */}
        <div
          ref={bustAreaRef}
          className="hero-bust-area"
          onMouseMove={handleBustMouseMove}
          onMouseLeave={handleBustMouseLeave}
          style={{ pointerEvents: 'auto', position: 'relative' }}
        >


          {/* Halftone WebGL bust */}
          <HalftoneBustCanvas
            progressRef={progressRef}
            ripplePosRef={ripplePosRef}
            rippleStrengthRef={rippleStrengthRef}
          />


        </div>

        {/* RIGHT: Text content */}
        <div className="hero-text" ref={heroTextRef} id="hero-text">
          {/* Name — two lines, red full stop */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="c-mask">
              <span
                className="c-mask__inner hero-letter-entry hero-name"
                style={{ display: 'block' }}
              >
                PALASH
              </span>
            </div>
            <div className="c-mask">
              <span
                className="c-mask__inner hero-letter-entry hero-name"
                style={{ display: 'block' }}
              >
                PATHARE<span className="hero-name-dot" style={{ color: 'var(--red)' }}>.</span>
              </span>
            </div>
          </div>

          {/* Role with Quantum Decrypt Scrambler */}
          <div className="c-mask" style={{ marginTop: '1.4rem' }}>
            <span
              className="c-mask__inner hero-letter-entry hero-role"
              style={{ display: 'block' }}
            >
              <QuantumRole />
            </span>
          </div>

          {/* Bio paragraph with localized quantum hover ripple */}
          <div className="hero-letter-entry" style={{ marginTop: '0.5rem' }}>
            <QuantumBio text={SITE.bio} className="hero-bio" />
          </div>

          {/* Contact link */}
          <div className="c-mask" style={{ marginTop: '2.2rem' }}>
            <a
              href={`mailto:${SITE.email}`}
              className="hero-contact-link c-mask__inner hero-letter-entry"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--ink)',
                textDecoration: 'none',
                position: 'relative',
              }}
            >
              CONTACT ↗
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">— SCROLL TO EXPLORE</div>
      </div>
    </div>
  );
};

export default Scene1Hero;
