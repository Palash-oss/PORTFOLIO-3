/**
 * Scene4Principles.tsx — SCENE 4: Working Principles (dark, pinned)
 *
 * SPEC:
 *  - Words must be cream (#E5E3D8), fully inside the pinned card, sized with clamp()
 *    so all three lines fit in 100svh with margins.
 *  - Active word turns red + italic with the 3-strip slice.
 *  - Inactive words are cream at ~100%, not grey.
 *  - Wordmark/marquee band is the last child of the principles card and stays visible
 *    while the contact card slides over it.
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const Scene4Principles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clone marquee items once for seamless loop
    if (marqueeTrackRef.current && marqueeTrackRef.current.children.length <= 6) {
      marqueeTrackRef.current.innerHTML += marqueeTrackRef.current.innerHTML;
    }

    // ScrollTrigger on the 400svh wrapper: start 'top top', end 'bottom bottom'
    // Maps progress to active word (0 to 1/3 to 2/3 to 1)
    const offsets = [-14, 10, -8];

    const setActiveWord = (activeIdx: number) => {
      [0, 1, 2].forEach((i) => {
        const isActive = i === activeIdx;
        const wordEl = document.getElementById(`principle-word-${i}`);
        const indexEl = document.getElementById(`principle-idx-${i}`);
        if (!wordEl) return;

        if (indexEl) {
          indexEl.style.opacity = isActive ? '1' : '0.4';
          indexEl.style.color = isActive ? 'var(--red)' : 'var(--cream)';
        }

        const strips = wordEl.querySelectorAll<HTMLElement>('.principle-strip');
        strips.forEach((strip, sIdx) => {
          strip.style.transform = isActive ? `translate3d(${offsets[sIdx]}px, 0, 0)` : 'translate3d(0, 0, 0)';
          strip.style.color = isActive ? 'var(--red)' : 'var(--cream)';
          strip.style.fontStyle = isActive ? 'italic' : 'normal';
          strip.style.opacity = '1';
        });
      });
    };

    // Initial state: word 0 active
    setActiveWord(0);

    const st = ScrollTrigger.create({
      trigger: '#principles-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const activeIdx = p < 0.333 ? 0 : p < 0.666 ? 1 : 2;
        setActiveWord(activeIdx);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: 'var(--dark-bg)',
        width: '100%',
        height: '100svh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="principles-card" style={{ height: '100svh', position: 'relative' }}>
        {/* Grid background */}
        <div className="principles-grid-bg" />

        {/* Top bar */}
        <div className="principles-top-bar">
          <span className="principles-top-label">[ WORKING PRINCIPLES ]</span>
          <span className="principles-top-note">// FIG. 04 — METHODOLOGY</span>
        </div>

        {/* Giant words area — sized with clamp() so all 3 lines fit in 100svh */}
        <div
          className="principles-words-area"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(0.4rem, 1.6svh, 1.5rem)',
            paddingBottom: '60px',
          }}
        >
          {SITE.principles.map((word, idx) => (
            <div
              key={word}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.8rem, 2vw, 2rem)',
              }}
            >
              {/* Side index */}
              <span
                id={`principle-idx-${idx}`}
                className="principle-side-index"
                style={{
                  position: 'static',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'var(--cream)',
                  minWidth: '2.5rem',
                  opacity: 0.4,
                  transition: 'opacity 0.25s ease, color 0.25s ease',
                }}
              >
                0{idx + 1}
              </span>

              {/* Word container with 3-strip slice using clip-path */}
              <div
                id={`principle-word-${idx}`}
                className="principle-word"
                style={{
                  flex: 1,
                  position: 'relative',
                  height: 'clamp(2.4rem, 5.8vw, 5rem)',
                  overflow: 'visible',
                }}
              >
                {/* 3 identical layers sliced with clip-path */}
                {[0, 1, 2].map((stripIdx) => {
                  const clip = stripIdx === 0
                    ? 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)'
                    : stripIdx === 1
                    ? 'polygon(0% 33%, 100% 33%, 100% 67%, 0% 67%)'
                    : 'polygon(0% 66%, 100% 66%, 100% 100%, 0% 100%)';

                  return (
                    <span
                      key={stripIdx}
                      className="principle-strip"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        clipPath: clip,
                        fontFamily: 'var(--font-headline)',
                        fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        color: 'var(--cream)',
                        opacity: 1,
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        willChange: 'transform, color',
                        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), color 0.2s ease',
                      }}
                    >
                      {idx === 1 ? `· ${word} ·` : word}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Wordmark/marquee band — LAST child of principles card, stays visible while contact slides over it */}
        <div
          className="principles-marquee-band"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '56px',
            backgroundColor: 'var(--dark-bg)',
            borderTop: '1px solid rgba(229,227,216,0.15)',
            borderBottom: '1px solid rgba(229,227,216,0.15)',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          <div
            id="marquee-track"
            ref={marqueeTrackRef}
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              willChange: 'transform',
            }}
          >
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '13px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--cream)',
                  opacity: 0.8,
                  padding: '0 2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                }}
              >
                {SITE.marqueeText}
                <span style={{ color: 'var(--red)', fontSize: '8px' }}>●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene4Principles;
