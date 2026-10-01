import React, { useEffect, useState, useMemo } from 'react';

interface Scene1HeroProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export const Scene1Hero: React.FC<Scene1HeroProps> = ({
  isPlaying = false,
  onTogglePlay
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const creativeLetters = useMemo(() => 'CREATIVE'.split(''), []);
  const developerLetters = useMemo(() => 'DEVELOPER'.split(''), []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: 'Asia/Kolkata'
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="scene1-hero"
      className="absolute inset-0 w-full h-full pointer-events-none select-none flex flex-col justify-between p-6 sm:p-12 lg:p-16 z-20 will-change-transform"
      style={{
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Top Left Giant Headline Word: "CREATIVE" */}
      <div
        id="hero-creative"
        className="w-full flex justify-start pt-12 sm:pt-14 will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        <div className="overflow-hidden leading-none">
          <h1 className="font-headline text-[15vw] sm:text-[13vw] lg:text-[11vw] font-black tracking-tighter text-[#0c0c0e] uppercase leading-[0.8] m-0">
            {creativeLetters.map((char, i) => (
              <span
                key={i}
                className="hero-letter-entry inline-block transform transition-transform duration-700 ease-out"
                style={{
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Center "PRESS PLAY" + Orange Triangle (anchored beside 3D cube) */}
      <div
        id="hero-play-btn"
        className="hero-fade absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-auto cursor-pointer group z-30 bg-black/5 hover:bg-black/10 px-4 py-2 rounded-full border border-black/15 transition-colors duration-200"
        style={{
          transform: 'translate(-50%, calc(-50% + 155px)) translate3d(0, 0, 0)'
        }}
        onClick={onTogglePlay}
        title={isPlaying ? 'Pause cinematic auto-scroll' : 'Start cinematic auto-scroll'}
      >
        <div className="w-8 h-8 rounded-full bg-[#F0561F] flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover:scale-110">
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#0c0c0e] uppercase group-hover:text-[#F0561F] transition-colors">
          {isPlaying ? 'PAUSE FILM ❚❚' : 'PRESS PLAY'}
        </span>
      </div>

      {/* Bottom Area: Bottom-Left About + Bottom-Right Location & Live Clock + Giant "DEVELOPER" */}
      <div className="w-full flex flex-col gap-6">
        <div className="hero-fade w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="max-w-md flex flex-col gap-1.5">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#F0561F] font-bold uppercase">
              // 01 — AI/ML ENGINEER & SYSTEMS ARCHITECT
            </span>
            <p className="font-mono text-[11px] sm:text-[12px] leading-relaxed text-[#2a2a2d] uppercase tracking-wide">
              PALASH PATHARE — ARCHITECTING INTELLIGENT DEEP LEARNING MODELS, PRODUCTION RAG PIPELINES,
              BIO-INSPIRED GVRP OPTIMIZATIONS & HIGH-PERFORMANCE WEB RUNTIMES.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#F0561F] font-bold uppercase">
              // LOCATION & TELEMETRY
            </span>
            <div className="font-mono text-[11px] sm:text-[12px] text-[#2a2a2d] uppercase tracking-wider text-right">
              MUMBAI, IN [19.0760° N, 72.8777° E]
            </div>
            <div className="font-mono text-[12px] font-bold text-[#0c0c0e] tracking-widest bg-white/70 px-2.5 py-0.5 border border-black/10">
              {timeStr || 'LIVE TIME...'}
            </div>
          </div>
        </div>

        {/* Bottom Right Giant Headline Word: "DEVELOPER" */}
        <div
          id="hero-developer"
          className="w-full flex justify-end will-change-transform"
          style={{
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <div className="overflow-hidden leading-none">
            <h1 className="font-headline text-[15vw] sm:text-[13vw] lg:text-[11vw] font-black tracking-tighter text-[#0c0c0e] uppercase leading-[0.8] m-0">
              {developerLetters.map((char, i) => (
                <span
                  key={i}
                  className="hero-letter-entry inline-block transform transition-transform duration-700 ease-out"
                  style={{
                    transform: 'translate3d(0, 0, 0)'
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene1Hero;
