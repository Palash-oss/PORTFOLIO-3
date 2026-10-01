import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, Network, Zap, Layout } from 'lucide-react';

export const StoryAbout: React.FC = () => {
  const disciplines = [
    {
      num: '01',
      title: 'Neural Architectures & Vision',
      desc: 'Architecting custom PyTorch deep learning models, OCR vision pipelines with PaddleOCR, and handwriting feature extraction for educational intelligence.',
      icon: Brain,
      tags: ['PyTorch', 'PaddleOCR', 'Computer Vision', 'Deep Learning'],
    },
    {
      num: '02',
      title: 'LLM Orchestration & RAG',
      desc: 'Building production-grade Retrieval-Augmented Generation (RAG) engines with Google Gemini, Groq hardware acceleration, and persistent context sessions.',
      icon: Cpu,
      tags: ['Gemini 2.5', 'Groq', 'LangChain', 'Vector Search'],
    },
    {
      num: '03',
      title: 'Green Logistics Optimization',
      desc: 'Engineering Quantum-Inspired Genetic Algorithms (QIGA) to solve multi-objective Green Vehicle Routing Problems (GVRP), cutting freight carbon by up to 80%.',
      icon: Zap,
      tags: ['QIGA', 'GVRP Solver', 'ISO 14083', 'Pareto Front'],
    },
    {
      num: '04',
      title: 'High-Performance Full-Stack',
      desc: 'Developing microsecond FastAPI endpoints, real-time WebSocket telemetry, Go microservices, and React 19 reactive architectures.',
      icon: Network,
      tags: ['FastAPI', 'React 19', 'Go Lang', 'WebSockets', 'MongoDB'],
    },
    {
      num: '05',
      title: 'Creative Interface Craft',
      desc: 'Translating complex engineering systems into intuitive, high-fashion digital surfaces with fluid physics, custom shaders, and micro-interactions.',
      icon: Layout,
      tags: ['Framer Motion', 'Canvas 2D/3D', 'WebGL', 'Aesthetics'],
    },
  ];

  return (
    <section id="story-about" className="py-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-[10px] text-[#ff641c] uppercase font-bold tracking-widest block mb-2">
            [ 01 ] DISCIPLINES & RESEARCH
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            ENGINEERING CRAFT<span className="text-[#ff641c]">.</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-400 max-w-sm uppercase leading-relaxed">
          Translating complex machine learning and algorithmic research into production-grade systems.
        </p>
      </div>

      {/* Grid of Disciplines */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disciplines.map((item, idx) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0.01, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px 0px" }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="story-card-brutal p-8 rounded-3xl flex flex-col justify-between group hover:border-[#ff641c] transition-all"
            data-cursor="DISCIPLINE"
          >
            <div>
              {/* Card Top Index & Icon */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <span className="font-mono text-xs font-black text-[#ff641c] tracking-widest">
                  [ {item.num} ]
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-[#ff641c] group-hover:border-[#ff641c]/50 transition-colors">
                  <item.icon size={18} />
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-gray-100 transition-colors">
                {item.title}
              </h3>
              <p className="font-light text-gray-400 text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300 group-hover:border-white/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
