import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Terminal, MapPin, Globe } from 'lucide-react';
import { StoryMorphCanvas } from './StoryMorphCanvas';

export const StoryHeroSticky: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll transformations for sticky layered parallax
  const heroScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.94, 0.88]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 0.95], [1, 0.85, 0]);
  const titleXLeft = useTransform(scrollYProgress, [0, 0.8], ['0%', '-8%']);
  const titleXRight = useTransform(scrollYProgress, [0, 0.8], ['0%', '8%']);

  return (
    <div ref={containerRef} className="relative w-full h-[220vh]">
      {/* Pinned Sticky Window (100vh) */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-14 overflow-hidden origin-center select-none"
      >
        {/* Interactive 3D Canvas Morph Pinned in Sticky Layer */}
        <StoryMorphCanvas />

        {/* Top Eyebrow Meta Status */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#ff641c] animate-pulse" />
            <span className="text-white font-bold">PORTFOLIO // PALASH PATHARE</span>
            <span className="hidden sm:inline text-gray-600">/</span>
            <span className="hidden sm:inline text-[#ff641c] font-semibold">STORY LAYER 01</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-300">
              <MapPin size={12} className="text-[#ff641c]" />
              <span>MUMBAI, INDIA</span>
            </div>
            <span className="text-gray-600">//</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <Globe size={12} className="text-gray-400" />
              <span>19.0760° N, 72.8777° E</span>
            </div>
          </div>
        </div>

        {/* Center Monumental Split Typography */}
        <div className="relative z-10 my-auto py-6">
          <motion.div style={{ x: titleXLeft }} className="flex items-baseline justify-between flex-wrap gap-4">
            <h1 className="font-display text-[15vw] sm:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase text-white">
              PALASH
            </h1>
            <span className="font-mono text-xs sm:text-sm text-[#ff641c] font-bold tracking-widest uppercase border border-[#ff641c]/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              AI / SYSTEMS ARCHITECT
            </span>
          </motion.div>

          <motion.div style={{ x: titleXRight }} className="flex justify-end mt-2 sm:mt-4">
            <h1 className="font-display text-[15vw] sm:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase story-outline cursor-default">
              PATHARE<span className="text-[#ff641c]">.</span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom Narrative Strip & Scroll Indicator */}
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-end pt-4 border-t border-white/10">
          <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 leading-relaxed max-w-xl">
              Shaping digital systems with <span className="text-white font-semibold italic underline decoration-[#ff641c]/60 underline-offset-4">neural architectures</span>, <span className="text-white font-semibold">low-carbon logistics algorithms</span>, and brutalist craft.
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#story-content-layer"
                className="inline-flex items-center gap-2.5 bg-[#ff641c] text-black hover:bg-[#ff7a38] px-6 py-3.5 rounded-full font-display font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(255,100,28,0.35)] transition-all transform hover:scale-105"
                data-cursor="SCROLL"
              >
                <span>SCROLL DOWN</span>
                <ArrowRight size={15} />
              </a>

              <a
                href="/PalashResume26.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full story-panel text-white font-display font-bold text-xs uppercase tracking-widest border border-white/15 hover:border-white/40 transition-all"
                data-cursor="RESUME"
              >
                <FileText size={15} className="text-[#ff641c]" />
                <span>RESUME</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <div className="flex items-center gap-2 font-mono text-[9px] text-gray-400 uppercase tracking-widest animate-bounce">
              <span>↓ PULL DOWN TO UNVEIL TOP LAYER</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
