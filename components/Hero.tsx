import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const masteryItems = [
    { title: 'Neural Architectures', desc: 'Custom PyTorch & Deep Learning' },
    { title: 'LLM Orchestration', desc: 'RAG, Gemini & Groq Pipelines' },
    { title: 'Full-Stack Systems', desc: 'FastAPI, React & Scalable DBs' },
    { title: 'Creative Interface', desc: 'High-Performance Animations' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Top Eyebrow Tag */}
        <motion.div variants={fadeInUp} className="mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-gray-300">
            <Terminal size={14} className="animate-spin [animation-duration:8s]" />
            <span className="mono text-[11px] font-bold uppercase tracking-widest">
              AI/ML Engineer & Full-Stack Developer
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-gray-500 mono text-[10px] uppercase tracking-widest">
            <span>//</span>
            <span>Learning & Building</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="font-display text-[13vw] md:text-[10vw] font-black leading-[0.82] tracking-tighter uppercase mb-8 flex flex-col select-none"
        >
          <span className="text-white drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
            PALASH
          </span>
          <span className="hero-outline translate-x-[4vw] hover:translate-x-[6vw] transition-transform duration-700 cursor-default">
            PATHARE.
          </span>
        </motion.h1>

        {/* Content Row */}
        <motion.div variants={fadeInUp} className="grid lg:grid-cols-12 gap-12 items-end mt-8">
          {/* Bio & Buttons */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 leading-relaxed max-w-2xl">
              <span className="text-white font-semibold italic underline decoration-white/30 underline-offset-4">AI/ML Engineer</span> & <span className="text-white font-medium">Full-Stack Developer</span>. Architecting intelligent models, production RAG pipelines, and high-performance web systems.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-4 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-display font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
                data-cursor="EXPLORE"
              >
                <span className="relative z-10 flex items-center gap-3">
                  EXPLORE CASE STUDIES
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="/PalashResume26.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-full glass-card hover:bg-white/10 text-white font-display font-semibold text-xs uppercase tracking-widest border border-white/15 hover:border-white/40 transition-all duration-300"
                data-cursor="RESUME"
              >
                <FileText size={18} className="text-gray-300" />
                <span>RESUME</span>
              </a>
            </div>
          </div>

          {/* Right Core Pillars Card */}
          <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <span className="mono text-xs text-gray-300 font-bold uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} className="text-white" /> Domain Mastery
              </span>
            </div>

            <div className="space-y-4">
              {masteryItems.map((item, idx) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-300 group/item cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs text-gray-400 font-bold">0{idx + 1}</span>
                    <span className="font-display text-base font-bold text-gray-200 group-hover/item:text-white group-hover/item:translate-x-1 transition-all">
                      {item.title}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block mono text-[10px] text-gray-500 group-hover/item:text-gray-300 transition-colors">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
