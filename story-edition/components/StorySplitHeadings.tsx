import React from 'react';
import { motion } from 'framer-motion';

export const StorySplitHeadings: React.FC = () => {
  return (
    <section className="relative w-full py-20 sm:py-32 border-y border-white/10 my-16 overflow-hidden">
      {/* Background Pixel Dots Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Left Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-4"
        >
          <div className="font-mono text-[10px] text-[#ff641c] uppercase font-bold tracking-widest flex items-center gap-2">
            <span>// CHAPTER 01</span>
            <span className="w-8 h-[1px] bg-[#ff641c]" />
            <span>CORE ETHOS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
            Thoughtful models shaped with <span className="text-[#ff641c]">purpose.</span>
          </h2>
        </motion.div>

        {/* Right Heading */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "100px 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-4 lg:pt-8"
        >
          <div className="font-mono text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center gap-2">
            <span>// PRODUCTION PHILOSOPHY</span>
            <span className="w-8 h-[1px] bg-white/20" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-300 leading-[1.05]">
            Scalable systems built to <span className="text-white">hold attention.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};
