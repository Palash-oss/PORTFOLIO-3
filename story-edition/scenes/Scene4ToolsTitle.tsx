import React, { useMemo } from 'react';

export const Scene4ToolsTitle: React.FC = () => {
  const letters = useMemo(() => ['T', 'O', 'O', 'L', 'S'], []);

  return (
    <div
      id="scene4-tools-title"
      className="absolute inset-0 w-full h-full pointer-events-none select-none flex flex-col items-center justify-center z-25 overflow-hidden will-change-transform"
      style={{
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* 1. Thin vertical line + traveling dot */}
      <div
        id="tools-line-group"
        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center will-change-transform"
        style={{
          transform: 'translate3d(-50%, 0, 0)'
        }}
      >
        <div
          id="tools-draw-line"
          className="w-[1.5px] bg-[#0c0c0e] origin-top will-change-transform"
          style={{
            height: '38vh',
            transform: 'scaleY(0)'
          }}
        />
        <div
          id="tools-draw-dot"
          className="w-2.5 h-2.5 rounded-full bg-[#0c0c0e] -mt-1 shadow-sm opacity-0 will-change-transform"
        />
      </div>

      {/* 2. Giant "TOOLS" wordmark + horizontal underline */}
      <div
        id="tools-title-wrapper"
        className="relative flex flex-col items-center will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0) scale(1)'
        }}
      >
        {/* Letter by letter reveal */}
        <div className="overflow-hidden py-2 px-6 flex items-center justify-center">
          <h2 className="font-headline text-[16vw] sm:text-[14vw] lg:text-[12vw] font-black text-[#0c0c0e] uppercase tracking-tighter leading-none m-0 flex">
            {letters.map((char, i) => (
              <span
                key={i}
                className={`tools-char tools-char-${i} inline-block will-change-transform`}
                style={{
                  transform: 'translate3d(0, 110%, 0)',
                  opacity: 0
                }}
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* 3. Thin horizontal line under "TOOLS" */}
        <div
          id="tools-underline"
          className="w-full h-[2px] bg-[#0c0c0e] origin-center mt-2 will-change-transform"
          style={{
            transform: 'scaleX(0)'
          }}
        />

        {/* Mono subtitle badge */}
        <div
          id="tools-subtitle"
          className="font-mono text-[11px] tracking-[0.35em] text-[#0c0c0e] font-bold uppercase mt-3 opacity-0"
        >
          [ CORE ACCELERATION MATRIX ]
        </div>
      </div>
    </div>
  );
};

export default Scene4ToolsTitle;
