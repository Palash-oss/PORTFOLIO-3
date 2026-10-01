import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Terminal, MapPin, Globe } from 'lucide-react';

export const StoryHero: React.FC = () => {
  return (
    <section id="story-home" className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 overflow-hidden">
      {/* Dynamic Location & Status Eyebrow Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-gray-400 font-mono text-[10px] uppercase tracking-widest"
      >
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#ff641c] animate-pulse" />
          <span className="text-white font-bold">PORTFOLIO // PALASH PATHARE</span>
          <span className="hidden sm:inline text-gray-600">/</span>
          <span className="hidden sm:inline text-[#ff641c] font-semibold">STORY EDITION 2026</span>
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
      </motion.div>

      {/* Monumental Headline Typography */}
      <div className="flex flex-col select-none my-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline justify-between flex-wrap gap-4"
        >
          <h1 className="font-display text-[14vw] sm:text-[11vw] font-black leading-[0.8] tracking-tighter uppercase text-white">
            PALASH
          </h1>
          <span className="font-mono text-xs sm:text-sm text-[#ff641c] font-bold tracking-widest uppercase border border-[#ff641c]/40 px-3 py-1 rounded-full mb-4">
            AI/ML & FULL-STACK
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-end"
        >
          <h1 className="font-display text-[14vw] sm:text-[11vw] font-black leading-[0.8] tracking-tighter uppercase story-outline translate-x-0 hover:translate-x-2 transition-transform duration-500 cursor-default">
            PATHARE<span className="text-[#ff641c]">.</span>
          </h1>
        </motion.div>
      </div>

      {/* Story Narrative & Action Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="grid lg:grid-cols-12 gap-8 items-end mt-12 pt-8 border-t border-white/10"
      >
        {/* Narrative Paragraph */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-2xl">
            Shaping thoughtful digital experiences through <span className="text-white font-semibold italic underline decoration-[#ff641c]/60 underline-offset-4">neural architectures</span>, <span className="text-white font-semibold">low-carbon freight systems</span>, and high-performance engineering craft.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#story-works"
              className="inline-flex items-center gap-3 bg-[#ff641c] text-black hover:bg-[#ff7a38] px-8 py-4 rounded-full font-display font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(255,100,28,0.35)] transition-all transform hover:scale-105 active:scale-95 group"
              data-cursor="WORKS"
            >
              <span>EXPLORE CASE STUDIES</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/PalashResume26.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full story-panel hover:bg-white/10 text-white font-display font-semibold text-xs uppercase tracking-widest border border-white/15 hover:border-white/40 transition-all"
              data-cursor="RESUME"
            >
              <FileText size={16} className="text-[#ff641c]" />
              <span>CURRICULUM VITAE</span>
            </a>
          </div>
        </div>

        {/* Technical Domain Matrix Card */}
        <div className="lg:col-span-5 story-panel p-6 sm:p-7 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff641c]" /> CORE CAPABILITIES
            </span>
            <span className="font-mono text-[9px] text-[#ff641c] font-bold">2026 ARCHIVE</span>
          </div>

          <div className="space-y-2.5">
            {[
              { id: '01', title: 'Neural Architectures', sub: 'PyTorch, Vision & PaddleOCR' },
              { id: '02', title: 'LLM Orchestration', sub: 'RAG, Gemini Flash, Groq Pipelines' },
              { id: '03', title: 'Green Logistics Engines', sub: 'QIGA Genetic Algorithms & GVRP' },
              { id: '04', title: 'Full-Stack Scalability', sub: 'FastAPI, React 19, Go & WebSockets' },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] transition-all group/it"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#ff641c] font-bold">{item.id}</span>
                  <span className="font-display text-sm font-bold text-gray-200 group-hover/it:text-white transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-gray-500 group-hover/it:text-gray-300">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
