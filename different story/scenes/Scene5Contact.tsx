/**
 * Scene5Contact.tsx — SCENE 5: Contact
 *
 * Light card (greige) with:
 *  - Marquee bridge (from Scene 4) at top edge
 *  - [CONTACT] red label
 *  - Huge bold "LET'S DISCUSS YOUR PROJECT" (lines rise from masks)
 *  - Mono paragraph
 *  - Black pill button with email + [WRITE] tag
 *  - Right: CHANNELS label + 2×2 bordered link buttons with ↗
 *  - LOCATION + "TOP ↑" button (Lenis scroll to top, duration 1.6s)
 */

import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

interface Scene5ContactProps {
  lenisRef: React.MutableRefObject<any>;
}

export const Scene5Contact: React.FC<Scene5ContactProps> = ({ lenisRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    }
  }, [lenisRef]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline lines rise from masks
      gsap.fromTo('.contact-headline',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#scene5-contact',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Contact pill & channels stagger in
      gsap.fromTo(['#contact-pill', '.channel-btn'],
        { yPercent: 18, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#scene5-contact',
            start: 'top 80%',
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
      <div className="contact-card" style={{ height: '100svh', overflow: 'hidden' }}>
        {/* Marquee bridge at top — mirrors Scene 4 marquee band */}
        <div className="contact-marquee-bridge">
          <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
            <div
              id="contact-marquee-track"
              style={{
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                willChange: 'transform',
                gap: 0,
              }}
            >
              {[...Array(6)].map((_, i) => (
                <span key={i} className="marquee-text" style={{ color: 'var(--ink)' }}>
                  {SITE.marqueeText}&nbsp;
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="contact-main">
          {/* Left */}
          <div>
            <span className="contact-label-red" id="contact-label">[ CONTACT ]</span>

            {/* Headline lines — rise from masks on entrance */}
            <div className="c-mask" style={{ marginTop: '0.5rem' }}>
              <span
                id="contact-h1"
                className="c-mask__inner contact-headline"
                style={{ display: 'block' }}
              >
                LET'S DISCUSS
              </span>
            </div>
            <div className="c-mask">
              <span
                id="contact-h2"
                className="c-mask__inner contact-headline"
                style={{ display: 'block' }}
              >
                {SITE.contactCta}<span style={{ color: 'var(--red)' }}>.</span>
              </span>
            </div>

            <p className="contact-para" id="contact-para">
              {SITE.contactPara}
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="contact-email-pill"
              id="contact-pill"
            >
              <span>{SITE.email}</span>
              <span className="contact-email-tag">[ WRITE ]</span>
            </a>
          </div>

          {/* Right */}
          <div>
            <div className="channels-label">CHANNELS</div>

            <div className="channels-grid">
              {SITE.channels.map((ch, idx) => (
                <a
                  key={ch.label}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-btn"
                  id={`channel-${idx}`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <span>{ch.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="contact-bottom">
          <div className="contact-location">
            <span style={{ color: 'var(--red)', fontWeight: 700 }}>// LOCATION</span>
            <span>{SITE.location}</span>
            <span style={{ opacity: 0.55 }}>
              {new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long' })}
            </span>
          </div>

          <button
            type="button"
            className="contact-top-btn"
            onClick={handleScrollTop}
            style={{ pointerEvents: 'auto' }}
          >
            TOP ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scene5Contact;
