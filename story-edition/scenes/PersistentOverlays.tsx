import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PersistentOverlaysProps {
  cursorType: 'default' | 'orange' | 'red';
  onNavigateTo: (targetProgress: number) => void;
}

export const PersistentOverlays: React.FC<PersistentOverlaysProps> = ({
  cursorType,
  onNavigateTo
}) => {
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Ultra-fast GPU-accelerated cursor with gsap.quickTo (Zero React re-renders)
  useEffect(() => {
    if (!cursorDotRef.current) return;

    // Set initial position offscreen
    gsap.set(cursorDotRef.current, { x: -100, y: -100, force3D: true });

    const xTo = gsap.quickTo(cursorDotRef.current, 'x', {
      duration: 0.18,
      ease: 'power3.out'
    });
    const yTo = gsap.quickTo(cursorDotRef.current, 'y', {
      duration: 0.18,
      ease: 'power3.out'
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* 1. Static GPU Film Grain Overlay (Zero CPU cost, no frame loops) */}
      <div className="film-grain-static" aria-hidden="true" />

      {/* 2. Swiss "+" Crosshair Markers at 8 Viewport Points */}
      <div className="crosshair crosshair-tl text-[#0c0c0e]" />
      <div className="crosshair crosshair-tr text-[#0c0c0e]" />
      <div className="crosshair crosshair-tc text-[#0c0c0e]" />
      <div className="crosshair crosshair-bl text-[#0c0c0e]" />
      <div className="crosshair crosshair-br text-[#0c0c0e]" />
      <div className="crosshair crosshair-bc text-[#0c0c0e]" />
      <div className="crosshair crosshair-ml text-[#0c0c0e]" />
      <div className="crosshair crosshair-mr text-[#0c0c0e]" />

      {/* 3. Fixed Nav: Name at top-left, ABOUT / TOOLS / WORK / LET'S CREATE ■ at top-right */}
      <header className="fixed top-0 left-0 right-0 z-[9995] px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-none select-none">
        <div
          className="font-mono text-[12px] sm:text-[13px] font-black tracking-[0.25em] uppercase pointer-events-auto cursor-pointer text-[#0c0c0e] hover:text-[#F0561F] transition-colors duration-200"
          onClick={() => onNavigateTo(0.0)}
        >
          PALASH PATHARE
        </div>

        <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8 pointer-events-auto font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#0c0c0e]">
          <button
            type="button"
            onClick={() => onNavigateTo(0.12)}
            className="hover:text-[#F0561F] transition-colors duration-200"
          >
            ABOUT
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo(0.48)}
            className="hover:text-[#F0561F] transition-colors duration-200"
          >
            TOOLS
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo(0.78)}
            className="hover:text-[#F0561F] transition-colors duration-200"
          >
            WORK
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo(0.96)}
            className="flex items-center gap-1.5 bg-[#0c0c0e] text-[#D9D9D9] px-3 py-1.5 border border-black hover:bg-[#F0561F] hover:text-black transition-colors"
          >
            <span>LET’S CREATE</span>
            <span className="text-[9px] text-[#F0561F]">■</span>
          </button>
        </nav>
      </header>

      {/* 4. Custom Cursor Dot driven directly by gsap.quickTo */}
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${
          cursorType === 'orange' ? 'cursor-orange' : cursorType === 'red' ? 'cursor-red' : ''
        }`}
      />
    </>
  );
};

export default PersistentOverlays;
