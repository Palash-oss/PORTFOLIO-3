import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Scene0LoaderProps {
  onComplete: () => void;
}

export const Scene0Loader: React.FC<Scene0LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    // Critical asset list
    const criticalImages = [
      '/vidya-1.png',
      '/CODEBASE-XRAY-1.jpg',
      '/ECOKERNEL-1.jpg'
    ];

    const ctx = gsap.context(() => {
      // 1. Smoothly animate counter 0% -> 100% on GSAP clock (0 React re-renders)
      const counterObj = { val: 0 };
      const counterTween = gsap.to(counterObj, {
        val: 100,
        duration: 1.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterTextRef.current) {
            const rounded = Math.min(100, Math.round(counterObj.val));
            counterTextRef.current.textContent = `[ ${rounded.toString().padStart(3, '0')}% ]`;
          }
        }
      });

      // 2. Preload assets in parallel with a hard safety fallback
      const preloadPromise = Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        Promise.all(
          criticalImages.map((src) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.src = src;
              img
                .decode()
                .then(() => resolve())
                .catch(() => resolve());
            });
          })
        ),
        // Minimum display duration matches counter (1.2s)
        new Promise((resolve) => setTimeout(resolve, 1200))
      ]);

      // Safety timeout: max 2.5s display time under any network condition
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 2500));

      Promise.race([preloadPromise, timeoutPromise]).then(() => {
        if (isCancelled || completedRef.current) return;
        completedRef.current = true;

        // Ensure counter shows 100%
        if (counterTextRef.current) {
          counterTextRef.current.textContent = '[ 100% ]';
        }

        // 3. Exit sequence: runner sprints & black wipe upwards
        const exitTl = gsap.timeline({
          onComplete: () => {
            onComplete();
          }
        });

        if (runnerRef.current) {
          exitTl.to(runnerRef.current, {
            x: '85vw',
            opacity: 0,
            duration: 0.6,
            ease: 'power3.in'
          });
        }

        if (containerRef.current) {
          exitTl.to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut',
              force3D: true
            },
            '-=0.2'
          );
        } else {
          onComplete();
        }
      });
    }, containerRef);

    return () => {
      isCancelled = true;
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0c0c0e] text-[#D9D9D9] select-none will-change-transform"
    >
      {/* Centered Loop Running Figure */}
      <div ref={runnerRef} className="relative flex flex-col items-center will-change-transform">
        <div className="w-14 h-14 relative flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-[#D9D9D9] animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="15" cy="4" r="2" fill="currentColor" />
            <path d="M7 21l3-7 4-2 3 3 3-1" />
            <path d="M10 14l-3-3 4-4 4 1 2 4" />
            <path d="M4 17l4-3" />
          </svg>
        </div>

        {/* Tiny white mono label + counter */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[11px] tracking-[0.35em] text-[#ffffff] uppercase font-bold">
            LOADING
          </span>
          <span
            ref={counterTextRef}
            className="font-mono text-[9px] tracking-[0.25em] text-[#88888c]"
          >
            [ 000% ]
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 font-mono text-[9px] text-[#555558] tracking-widest uppercase">
        PALASH PATHARE / CINEMATIC TIMELINE V2.6
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[9px] text-[#555558] tracking-widest uppercase">
        GPU COMPILED // LOCKED 60FPS
      </div>
    </div>
  );
};

export default Scene0Loader;
