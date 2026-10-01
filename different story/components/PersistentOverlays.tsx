/**
 * PersistentOverlays.tsx
 *
 * Always-on elements that float above every scene:
 *  - Static grain (tiled SVG, zero CPU)
 *  - Thin red scroll-progress bars (left + right edges, scaleY from 0→1)
 *  - Persistent corner caption "// FIG. 00 — PALASH PATHARE / AI-ML ENGINEER"
 *  - Custom cursor: small red dot + lagging outlined ring
 *    (both driven by gsap.quickTo, transform only — Rule 6)
 *  - Ring grows on <a> / button hover, shows "VIEW" text on work rows
 *
 * Rules:
 *  - No React state on cursor path (refs + GSAP)    [Rule 2]
 *  - Never unmounted                                [Rule 3]
 *  - Transform only                                 [Rule 6]
 *  - No cursor on touch devices                     [Rule MOBILE]
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE } from '../content/site';

interface PersistentOverlaysProps {
  progressRef: React.MutableRefObject<number>;
}

export const PersistentOverlays: React.FC<PersistentOverlaysProps> = ({ progressRef }) => {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const barLeftRef  = useRef<HTMLDivElement>(null);
  const barRightRef = useRef<HTMLDivElement>(null);
  const captionRef  = useRef<HTMLDivElement>(null);

  // Detect touch device once
  const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouch) return; // no cursor on touch

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // quickTo for zero-alloc cursor movement (Rule 6)
    const dotX  = gsap.quickTo(dot,  'x', { duration: 0.05, ease: 'none' });
    const dotY  = gsap.quickTo(dot,  'y', { duration: 0.05, ease: 'none' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onEnterLink = (e: Event) => {
      const target = e.target as HTMLElement;
      const isWorkRow = target.closest('.work-row');
      ring.classList.remove('is-link', 'is-view');
      if (isWorkRow) {
        ring.classList.add('is-view');
      } else {
        ring.classList.add('is-link');
      }
      dot.style.opacity = '0';
    };

    const onLeaveLink = () => {
      ring.classList.remove('is-link', 'is-view');
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', (e) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, .work-row')) onEnterLink(e);
      else onLeaveLink();
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [isTouch]);

  // Edge bars driven by progressRef — updated every gsap.ticker tick from App.tsx
  // We expose the bar refs so App.tsx can set scaleY directly
  // But since App already owns the ticker, we subscribe here via a passive ticker
  useEffect(() => {
    const tick = () => {
      const p = progressRef.current;
      if (barLeftRef.current)  barLeftRef.current.style.transform  = `scaleY(${p})`;
      if (barRightRef.current) barRightRef.current.style.transform = `scaleY(${p})`;

      if (captionRef.current) {
        if (p < 0.15) {
          captionRef.current.textContent = '[ FIG. 01 — PARTICLES ]';
        } else if (p < 0.42) {
          captionRef.current.textContent = '// FIG. 02 — CASE STUDIES';
        } else if (p < 0.65) {
          captionRef.current.textContent = '// FIG. 03 — EXPERIENCE';
        } else if (p < 0.88) {
          captionRef.current.textContent = '// FIG. 04 — METHODOLOGY';
        } else {
          captionRef.current.textContent = '// FIG. 05 — COMMUNICATIONS';
        }
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [progressRef]);

  return (
    <>
      {/* Static grain */}
      <div className="c-grain" aria-hidden="true" />

      {/* Scroll-progress edge bars */}
      <div ref={barLeftRef}  className="c-edge-bar c-edge-bar--left"  aria-hidden="true" />
      <div ref={barRightRef} className="c-edge-bar c-edge-bar--right" aria-hidden="true" />

      {/* Persistent corner caption */}
      <div ref={captionRef} className="c-corner-caption" aria-hidden="true">
        [ FIG. 01 — PARTICLES ]
      </div>

      {/* Custom cursor — hidden on touch */}
      {!isTouch && (
        <>
          <div ref={dotRef}  className="c-cursor-dot"  aria-hidden="true" />
          <div ref={ringRef} className="c-cursor-ring" aria-hidden="true">
            <span className="c-ring-label">VIEW</span>
          </div>
        </>
      )}
    </>
  );
};

export default PersistentOverlays;
