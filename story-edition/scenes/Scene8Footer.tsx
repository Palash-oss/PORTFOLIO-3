import React, { useState, useMemo, useRef, useEffect } from 'react';

export const Scene8Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentLang, setCurrentLang] = useState<'EN' | 'DE' | 'JP'>('EN');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Direct DOM measurement with zero React state re-renders (preserves GSAP transforms)
  useEffect(() => {
    const measureAndFit = () => {
      if (!wrapperRef.current || !textRef.current) return;
      const containerWidth = wrapperRef.current.clientWidth;
      if (!containerWidth) return;

      const padding = window.innerWidth < 640 ? 16 : 40;
      const runnerWidth = window.innerWidth < 640 ? 32 : 52;
      const availableWidth = Math.max(containerWidth - padding - runnerWidth, 180);

      // In Space Grotesk, 16 characters ("/ PALASH PATHARE")
      // Average character width is ~0.65em with tracking-tighter
      const calculatedPx = Math.min(Math.max(availableWidth / (16 * 0.65), 18), 86);
      textRef.current.style.fontSize = `${calculatedPx.toFixed(1)}px`;
      wrapperRef.current.style.overflow = 'hidden';
      wrapperRef.current.style.whiteSpace = 'nowrap';
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAndFit);
    } else {
      measureAndFit();
    }

    let timer: number;
    const handleResize = () => {
      clearTimeout(timer);
      timer = window.setTimeout(measureAndFit, 60);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const steps = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7], []);
  const wordmarkLetters = useMemo(() => '/ PALASH PATHARE'.split(''), []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:palashpathare@gmail.com?subject=Collaboration%20Inquiry&body=Hello%20Palash,%20my%20contact:%20${encodeURIComponent(
        emailInput
      )}`;
    }, 600);
  };

  return (
    <div
      id="scene8-footer"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-30 bg-[#F0561F] will-change-transform"
      style={{
        opacity: 0
      }}
    >
      {/* Orange Background transition through rising pixel-stair silhouette (0.90 to 0.94) */}
      <div
        id="footer-orange-backdrop"
        className="fixed inset-0 pointer-events-none z-10 bg-[#F0561F] will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Rising Pixel-stair steps silhouette */}
      <div
        id="footer-stairs-container"
        className="fixed inset-0 pointer-events-none z-15 flex items-end will-change-transform"
      >
        {steps.map((step) => (
          <div
            key={step}
            className={`footer-stair-col footer-stair-${step} flex-1 bg-[#F0561F] border-t-2 border-black will-change-transform`}
            style={{
              height: '0vh'
            }}
          />
        ))}
      </div>

      {/* Footer Stage Content */}
      <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden z-20">
        {/* Top Tag */}
        <div className="w-full flex justify-between items-center text-[#0c0c0e] z-30 pt-8 sm:pt-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
            // TERMINAL SCENE 08 — CONTACT & DISPATCH
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
            [ STATUS: AVAILABLE ]
          </span>
        </div>

        {/* Framed 3-Column Box */}
        <div
          id="footer-framed-box"
          className="my-auto w-full max-w-6xl mx-auto bg-[#F0561F] border-2 border-black p-6 sm:p-10 relative pointer-events-auto shadow-xl z-30 will-change-transform"
          style={{
            opacity: 0
          }}
        >
          {/* Small Black Square Handles at Frame Corners */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-black" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-black" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black" />

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#0c0c0e]">
            {/* Column 1: Big CTA headline + short mono subtext */}
            <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/30 pb-6 md:pb-0 md:pr-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] font-bold uppercase block mb-3 text-black/70">
                  // COLLABORATION
                </span>
                <h2 className="font-headline text-[7vw] sm:text-[4vw] md:text-[2.6vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] mb-4">
                  LET’S BUILD SOMETHING EXTRAORDINARY.
                </h2>
              </div>
              <p className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#0c0c0e]/80 uppercase tracking-wider mt-4">
                OPEN FOR HIGH-IMPACT RESEARCH, MULTI-MODAL INTELLIGENCE & ENTERPRISE ARCHITECTURES.
              </p>
            </div>

            {/* Column 2: Links column with language toggle */}
            <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/30 pb-6 md:pb-0 md:pr-6 md:pl-2">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] font-bold uppercase block mb-3 text-black/70">
                  // NAVIGATION & LOCALE
                </span>
                {/* Language Toggle */}
                <div className="flex items-center gap-2 mb-6">
                  {(['EN', 'DE', 'JP'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setCurrentLang(lang)}
                      className={`font-mono text-[11px] font-bold px-2.5 py-1 border border-black transition-colors ${
                        currentLang === lang ? 'bg-black text-white' : 'bg-transparent text-black'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Quick Directory */}
                <div className="flex flex-col gap-2 font-mono text-[11px] font-bold tracking-wider">
                  <a
                    href="#story-root"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>→</span> 01 // OVERVIEW & HERO
                  </a>
                  <a
                    href="#tools"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({
                        top: window.innerHeight * 5.5,
                        behavior: 'smooth'
                      });
                    }}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>→</span> 02 // TOOLS & RUNTIMES
                  </a>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({
                        top: window.innerHeight * 9.2,
                        behavior: 'smooth'
                      });
                    }}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>→</span> 03 // ARCHITECTURAL WORKS
                  </a>
                  <a
                    href="/PalashResume26.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline flex items-center gap-1 text-black font-black"
                  >
                    <span>→</span> 04 // DOWNLOAD RESUME (PDF)
                  </a>
                </div>
              </div>

              <div className="font-mono text-[9px] text-black/60 uppercase mt-4">
                MUMBAI, IN // TIMEZONE: UTC+05:30
              </div>
            </div>

            {/* Column 3: Contact column */}
            <div className="flex flex-col justify-between md:pl-2">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] font-bold uppercase block mb-3 text-black/70">
                  // CONNECT & DISPATCH
                </span>

                <div className="flex flex-col gap-1.5 font-mono text-[11px] font-bold tracking-wider mb-6">
                  <a
                    href="https://github.com/Palash-oss"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GITHUB // @Palash-oss
                  </a>
                  <a
                    href="https://www.linkedin.com/in/palash-pathare-53260b28a"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LINKEDIN // Palash Pathare
                  </a>
                  <a
                    href="mailto:palashpathare@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    EMAIL // palashpathare@gmail.com
                  </a>
                </div>
              </div>

              {/* Email Transmission */}
              <form onSubmit={handleSend} className="flex flex-col gap-2 mt-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-black font-bold">
                  DIRECT TRANSMISSION
                </span>
                <div className="flex items-center">
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="flex-1 bg-black/10 border-2 border-black px-3 py-2 text-[11px] font-mono text-black placeholder:text-black/50 outline-none focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 font-mono text-[11px] font-bold tracking-wider border-2 border-black hover:bg-white hover:text-black transition-colors"
                  >
                    {submitted ? 'SENT ✓' : 'SEND'}
                  </button>
                </div>
                {submitted && (
                  <span className="font-mono text-[9px] text-black font-bold tracking-widest uppercase">
                    [ DISPATCHING TO PALASHPATHARE@GMAIL.COM ]
                  </span>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Colossal Black Wordmark `/ PALASH PATHARE` auto-fitted to full width with zero clipping */}
        <div
          ref={wrapperRef}
          id="footer-wordmark-wrapper"
          className="relative w-full flex items-center justify-center z-30 pt-2 pb-1 pointer-events-auto will-change-transform"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3.5 max-w-full px-2 sm:px-4">
            {/* Runner figure settling beside the slash */}
            <div
              id="footer-runner"
              className="flex items-center justify-center flex-shrink-0 will-change-transform"
            >
              <svg
                className="w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="15" cy="4" r="2" fill="currentColor" />
                <path d="M7 21l3-7 4-2 3 3 3-1" />
                <path d="M10 14l-3-3 4-4 4 1 2 4" />
                <path d="M4 17l4-3" />
              </svg>
            </div>

            <h1
              ref={textRef}
              id="footer-wordmark-text"
              className="font-headline font-black text-[#0c0c0e] uppercase leading-none tracking-tighter m-0 whitespace-nowrap flex select-none text-[clamp(1.2rem,5.2vw,5.2rem)]"
            >
              {wordmarkLetters.map((letter, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-200 hover:-translate-y-2 cursor-pointer"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene8Footer;
