/**
 * Scene3Record.tsx — SCENE 3: Record / Experience
 *
 * Two-column card:
 *  LEFT:  [RESUME] label · "RECORD / N YRS" (giant two-line masked reveal) ·
 *         mono para · bordered skills box with label + level rows, red underline fills on scroll
 *  RIGHT: EXPERIENCE label · role rows (title/subtitle/dates/desc, staggered) ·
 *         CONTRIBUTIONS bordered 2+1 card grid, cards lift on hover
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const Scene3Record: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked headline reveal: RECORD / [N] YRS
      gsap.fromTo('.record-line-reveal',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene3-record',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Label reveal
      gsap.fromTo('.record-label-reveal',
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene3-record',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Skills bar fill
      gsap.fromTo('.skill-bar-fill',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#scene3-record',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Role rows stagger
      gsap.fromTo('.exp-role',
        { yPercent: 24, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#scene3-record',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: 'var(--bg-greige)',
        width: '100%',
        height: '100svh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="record-card"
        style={{
          height: '100svh',
          overflow: 'hidden',
          padding: 'clamp(1.5rem, 3svh, 2.5rem) var(--scene-pad-x)',
        }}
      >
        {/* ─── LEFT COLUMN ─── */}
        <div className="record-left" id="record-left" style={{ gap: 'clamp(0.6rem, 1.4svh, 1.2rem)' }}>
          {/* Red label */}
          <div className="c-mask">
            <span className="c-mask__inner record-label-red record-label-reveal">
              [ RESUME ]
            </span>
          </div>

          {/* Giant headline: RECORD / [N] YRS */}
          <div style={{ marginTop: '0.2rem' }}>
            <div className="c-mask">
              <span
                className="c-mask__inner record-headline record-line-reveal"
                style={{ display: 'block', fontSize: 'clamp(2rem, 4.4vw, 4.6rem)', lineHeight: 0.92 }}
              >
                RECORD /
              </span>
            </div>
            <div className="c-mask">
              <span
                className="c-mask__inner record-headline record-line-reveal"
                style={{ display: 'block', fontSize: 'clamp(2rem, 4.4vw, 4.6rem)', lineHeight: 0.92 }}
              >
                {SITE.yearsOfExperience} YRS
              </span>
            </div>
          </div>

          {/* Mono paragraph */}
          <p className="record-para">
            Three years of building intelligent models, production RAG
            pipelines, and high-performance full-stack systems.
            From PyTorch research to shipping AI products.
          </p>

          {/* Skills box with red fill bars */}
          <div className="skills-box" id="skills-box">
            {SITE.skills.map((skill, idx) => (
              <div key={skill.label} className="skill-row">
                <span className="skill-label">{skill.label}</span>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    id={`skill-bar-${idx}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Resume link */}
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--ink)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--red)',
              paddingBottom: '2px',
              marginTop: 'auto',
              cursor: 'none',
              pointerEvents: 'auto',
            }}
          >
            DOWNLOAD RESUME ↗
          </a>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="record-right" id="record-right">
          {/* EXPERIENCE label */}
          <div>
            <div className="exp-section-label">EXPERIENCE</div>
          </div>

          {/* Role rows */}
          {SITE.roles.map((role, idx) => (
            <div
              key={role.title}
              className="exp-role"
              id={`exp-role-${idx}`}
            >
              <div>
                <div className="exp-role-title">{role.title}</div>
                <div className="exp-role-sub">{role.subtitle}</div>
                <div className="exp-role-desc">{role.desc}</div>
              </div>
              <div className="exp-role-dates">{role.dates}</div>
            </div>
          ))}

          {/* Thin rule */}
          <div className="c-rule" style={{ margin: '0.6rem 0' }} />

          {/* CONTRIBUTIONS label */}
          <div className="contributions-label">CONTRIBUTIONS</div>

          {/* 2+1 card grid */}
          <div className="contributions-grid">
            {SITE.contributions.map((c) => (
              <div
                key={c.label}
                className="contribution-card"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="contribution-card-tag">{c.tag}</span>
                <span className="contribution-card-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene3Record;
