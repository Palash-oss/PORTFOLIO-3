import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Sparkles } from 'lucide-react';

export const StoryJourney: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const logs = [
    {
      phase: "PHASE // 01",
      period: "2025 — 2026",
      title: "AI Ecosystems & Green Logistics",
      context: "ADVANCED ARCHITECTURES",
      desc: "Architecting production-grade AI platforms like VIDYA (adaptive student tutoring with Gemini & PaddleOCR) and EcoKernel (Quantum-Inspired Genetic Algorithms solving multi-objective freight routing with 80% CO2 reduction).",
      tags: ["LLM RAG", "QIGA", "FastAPI", "React 19", "Gemini AI", "ISO 14083"],
    },
    {
      phase: "PHASE // 02",
      period: "2024 — 2025",
      title: "Static Analysis & Full-Stack Systems",
      context: "WEB PLATFORMS",
      desc: "Developed CodeBase X-Ray, an AST-driven private code analysis platform generating real-time system design topologies, interactive refactoring simulations, and exportable Mermaid diagrams.",
      tags: ["AST Parsing", "Go Lang", "WebSockets", "Prisma", "System Design"],
    },
    {
      phase: "PHASE // 03",
      period: "2023 — 2024",
      title: "Deep Learning Foundations & Vision",
      context: "MODELS & VISION",
      desc: "Intensive deep-dive into machine learning fundamentals. Built custom convolutional vision models, handwriting OCR recognizers with PaddleOCR, and NLP transformers from scratch.",
      tags: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "PaddleOCR"],
    },
  ];

  return (
    <section id="story-journey" className="py-20 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-[10px] text-[#ff641c] uppercase font-bold tracking-widest block mb-2">
            [ 04 ] CHRONOLOGICAL LOGS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            JOURNEY ARCHIVE<span className="text-[#ff641c]">.</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-400 max-w-sm uppercase leading-relaxed">
          Technical milestones, research iterations, and architectural pivots.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {logs.map((log, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={log.phase}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`story-panel rounded-2xl p-6 sm:p-8 cursor-pointer transition-all ${
                isOpen ? 'border-[#ff641c]/50 bg-[#121217]' : 'hover:border-white/20'
              }`}
              data-cursor={isOpen ? "CLOSE" : "EXPAND"}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-black text-[#ff641c]">
                    {log.phase}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                    {log.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#ff641c]" /> {log.period}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1.5 rounded-full bg-white/5 text-gray-400"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pt-6 mt-4 border-t border-white/5"
                  >
                    <p className="text-gray-300 font-light text-base leading-relaxed mb-4 max-w-3xl">
                      {log.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {log.tags.map((t) => (
                        <span key={t} className="font-mono text-[9px] uppercase px-2.5 py-1 rounded bg-[#ff641c]/10 border border-[#ff641c]/25 text-[#ff641c] flex items-center gap-1">
                          <Sparkles size={10} /> {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
