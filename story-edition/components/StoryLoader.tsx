import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const StoryLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hiddenCells, setHiddenCells] = useState<Set<number>>(new Set());

  // 10 columns x 8 rows = 80 pixel cells
  const totalCells = 80;

  useEffect(() => {
    // Fast simulated progress to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Staggered randomized pixel dissolve wave
      const cellIndices = Array.from({ length: totalCells }, (_, i) => i);
      // Shuffle indices
      for (let i = cellIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
      }

      let count = 0;
      const dissolveInterval = setInterval(() => {
        count += 6;
        setHiddenCells(new Set(cellIndices.slice(0, count)));

        if (count >= totalCells) {
          clearInterval(dissolveInterval);
          setTimeout(() => {
            setIsDone(true);
            onComplete();
          }, 300);
        }
      }, 35);

      return () => clearInterval(dissolveInterval);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <div className="fixed inset-0 z-[99999] pointer-events-none select-none flex items-center justify-center overflow-hidden">
          {/* Pixel Grid Matrix (80 Cells) */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-8 w-full h-full">
            {Array.from({ length: totalCells }).map((_, idx) => (
              <span
                key={idx}
                className={`bg-[#08080a] transition-all duration-300 ${
                  hiddenCells.has(idx) ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                }`}
              />
            ))}
          </div>

          {/* Center Runner & Loading Typography */}
          <motion.div
            animate={{ opacity: progress >= 100 ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col items-center justify-center gap-4 text-center px-4"
          >
            {/* Animated Running Pixel Glyph */}
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <span className="w-6 h-6 rounded-full bg-[#ff641c] animate-ping opacity-75" />
              <span className="absolute font-mono text-xs font-black text-white">
                {Math.min(100, progress)}%
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff641c] animate-pulse" />
                INITIALIZING PALASH.AI
              </p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                RUNROBRUN STORY ENGINE // 2026
              </p>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-white to-[#ff641c] transition-all duration-75"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
