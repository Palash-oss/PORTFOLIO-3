import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Globe, Layers, Cpu, Zap, Terminal, Brain, Shield, Rocket, Sparkles
} from 'lucide-react';

const techsRow1 = [
  { name: 'PyTorch', icon: Brain },
  { name: 'React 19', icon: Globe },
  { name: 'TensorFlow', icon: Cpu },
  { name: 'TypeScript', icon: Terminal },
  { name: 'Python', icon: Database },
  { name: 'Next.js', icon: Rocket },
];

const techsRow2 = [
  { name: 'FastAPI', icon: Zap },
  { name: 'Gemini AI', icon: Sparkles },
  { name: 'Tailwind CSS', icon: Layers },
  { name: 'OpenAI', icon: Shield },
  { name: 'Go Lang', icon: Terminal },
  { name: 'MongoDB', icon: Database },
];

export const Marquee: React.FC = () => {
  // Triple items for seamless infinite continuous scroll across all screen sizes
  const row1 = [...techsRow1, ...techsRow1, ...techsRow1];
  const row2 = [...techsRow2, ...techsRow2, ...techsRow2];

  return (
    <div className="w-full relative py-8 sm:py-12 overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-md space-y-4 sm:space-y-6 z-10">
      {/* Edge Fade Gradients - full screen edge fade */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* Row 1 - Left to Right */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
          className="flex gap-4 sm:gap-8 items-center shrink-0 will-change-transform"
        >
          {[...row1, ...row1].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl glass-card hover:border-white/40 transition-all duration-300 group cursor-default shrink-0"
              data-cursor="TECH"
            >
              <tech.icon size={22} className="text-gray-300 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform duration-300" />
              <span className="font-display text-lg sm:text-2xl font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 32,
              ease: "linear",
            },
          }}
          className="flex gap-4 sm:gap-8 items-center shrink-0 will-change-transform"
        >
          {[...row2, ...row2].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl glass-card hover:border-white/40 transition-all duration-300 group cursor-default shrink-0"
              data-cursor="TECH"
            >
              <tech.icon size={22} className="text-gray-300 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform duration-300" />
              <span className="font-display text-lg sm:text-2xl font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
