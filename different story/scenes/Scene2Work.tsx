/**
 * Scene2Work.tsx — SCENE 2: Selected Work
 *
 * SPEC:
 *  - "SELECTED WORK" header (masked line reveal)
 *  - Thin rule + column labels INDEX / PROJECT / CATEGORY
 *  - 4 rows (3 real projects + experiments*) with index, giant title, mono category
 *  - Hover: row tint + title nudge right + floating browser-preview card
 *    following cursor with offset (+36px right, -16px up) + lag + rotation
 *  - Preview clamped inside viewport, pointer-events none, z-index BELOW title text
 *  - Red "VIEW PROJECT" badge attached to top-right of preview
 *  - Preview images preloaded, swap with clip-path wipe
 */

import React, { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

// Preload all preview images immediately
const preloadedImgs: Record<string, HTMLImageElement> = {};
SITE.projects.forEach(p => {
  p.images.forEach(src => {
    if (!preloadedImgs[src]) {
      const img = new Image();
      img.src = src;
      preloadedImgs[src] = img;
    }
  });
});

export const Scene2Work: React.FC = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [previewImg, setPreviewImg] = useState<string>('');

  const previewRef    = useRef<HTMLDivElement>(null);
  const badgeRef      = useRef<HTMLDivElement>(null);
  const cursorVelRef  = useRef({ x: 0, y: 0 });
  const lastMouseRef  = useRef({ x: 0, y: 0 });

  const previewXTo = useRef<gsap.QuickToFunc | null>(null);
  const previewYTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!previewRef.current) return;
    previewXTo.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
    previewYTo.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.45, ease: 'power2.out' });

    // Masked title reveal on scroll entry
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-title-big',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene2-work',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    cursorVelRef.current = { x: dx, y: dy };
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    if (previewRef.current && previewXTo.current && previewYTo.current) {
      // Offset: +36px right, -16px up, clamped inside viewport
      const cardW = 300;
      const cardH = 200;
      const rawX = e.clientX + 36;
      const rawY = e.clientY - 16;
      const targetX = Math.max(12, Math.min(window.innerWidth - cardW - 16, rawX));
      const targetY = Math.max(12, Math.min(window.innerHeight - cardH - 16, rawY));

      previewXTo.current(targetX);
      previewYTo.current(targetY);

      // Tilt rotation based on velocity
      const rot = Math.max(-8, Math.min(8, cursorVelRef.current.x * 0.15));
      gsap.to(previewRef.current, {
        rotation: rot,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
        force3D: true,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleRowEnter = useCallback((idx: number) => {
    setActiveRow(idx);
    const project = SITE.projects[idx];
    if (!project || project.images.length === 0) return;

    const newImg = project.images[0];

    if (previewRef.current) {
      gsap.fromTo(previewRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.3, ease: 'power3.out' }
      );
      gsap.to(previewRef.current, { opacity: 1, duration: 0.2 });
    }

    setPreviewImg(newImg);
  }, []);

  const handleRowLeave = useCallback(() => {
    setActiveRow(null);
    if (previewRef.current) {
      gsap.to(previewRef.current, { opacity: 0, duration: 0.2 });
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-greige)',
        width: '100%',
        height: '100svh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="work-card"
        style={{
          height: '100svh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(1.5rem, 3.5svh, 2.8rem) var(--scene-pad-x)',
        }}
      >
        {/* Header */}
        <div className="work-header" style={{ paddingBottom: '0.8rem' }}>
          <div>
            <div className="c-mask">
              <span
                id="work-title-mask"
                className="c-mask__inner work-title-big"
                style={{ display: 'block', fontSize: 'clamp(1.8rem, 4.5vw, 4.8rem)' }}
              >
                SELECTED
              </span>
            </div>
            <div className="c-mask">
              <span
                className="c-mask__inner work-title-big"
                style={{ display: 'block', fontSize: 'clamp(1.8rem, 4.5vw, 4.8rem)' }}
              >
                WORK
              </span>
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--ink)',
              opacity: 0.35,
              alignSelf: 'flex-end',
              paddingBottom: '0.5rem',
            }}
          >
            // FIG. 02 — CASE STUDIES
          </div>
        </div>

        {/* Thin rule */}
        <div className="c-rule" />

        {/* Column labels */}
        <div className="work-col-labels">
          <span className="work-col-label">INDEX</span>
          <span className="work-col-label">PROJECT</span>
          <span className="work-col-label" style={{ textAlign: 'right' }}>CATEGORY</span>
        </div>

        {/* Project rows */}
        {SITE.projects.map((project, idx) => (
          <div
            key={project.index}
            className={`work-row${project.index.includes('*') ? ' work-row--experiments' : ''}${activeRow === idx ? ' is-hovered' : ''}`}
            onMouseEnter={() => handleRowEnter(idx)}
            onMouseLeave={handleRowLeave}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
          >
            <span className="work-row-index">
              {project.index.includes('*') ? (
                <>
                  <span style={{ color: 'var(--red)' }}>*</span>
                  {project.index.replace('*', '')}
                </>
              ) : project.index}
            </span>
            <a
              href={project.live || project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="work-row-title"
              style={{ textDecoration: 'none', pointerEvents: 'auto', cursor: 'none', position: 'relative', zIndex: 10 }}
            >
              {project.title}
            </a>
            <span className="work-row-category">{project.category}</span>
          </div>
        ))}

        {/* Footnote */}
        <p className="work-footnote">
          * All case studies are production builds — source available on GitHub.
        </p>
      </div>

      {/* Floating preview card (follows cursor with lag, z-index below titles, pointer-events none) */}
      <div
        ref={previewRef}
        className="work-preview"
        style={{
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 5,
        }}
        aria-hidden="true"
      >
        {/* Browser chrome bar */}
        <div className="work-preview-bar">
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <span key={c} className="work-preview-dot" style={{ backgroundColor: c }} />
          ))}
        </div>
        {/* Preview image */}
        {previewImg && (
          <img
            className="work-preview-img"
            src={previewImg}
            alt="Project preview"
            loading="eager"
          />
        )}
        {/* Red "VIEW PROJECT" badge attached to top-right */}
        <div ref={badgeRef} className="work-preview-badge">
          VIEW<br />PROJECT
        </div>
      </div>
    </div>
  );
};

export default Scene2Work;
