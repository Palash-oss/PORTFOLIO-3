import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sliders, Activity } from 'lucide-react';

export const StoryToolsReel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const studies = [
    {
      id: "000",
      title: "Neural Attention Topology",
      category: "DEEP LEARNING",
      detail: "Interactive visualization of cross-attention weights and multi-head projection matrices in real-time inference.",
      metric: "98.4% Accuracy",
      status: "Inference Latency: 12ms",
    },
    {
      id: "001",
      title: "QIGA Quantum-Inspired Genetic Solver",
      category: "ALGORITHMIC OPTIMIZATION",
      detail: "Simulates qubit state probability representations to solve combinatorial Green Vehicle Routing Problems across Indian corridors.",
      metric: "80% CO2 Reduction",
      status: "Convergence: 340 iterations",
    },
    {
      id: "002",
      title: "AST Private Codebase Parser",
      category: "STATIC ANALYSIS",
      detail: "100% in-browser Babel/Acorn AST traversal generating deterministic system architecture graphs and 1-click refactoring diffs.",
      metric: "12,000 Nodes/sec",
      status: "Zero Data Egress",
    },
    {
      id: "003",
      title: "Multi-Modal DFC Rail Pairings",
      category: "FREIGHT DECARBONIZATION",
      detail: "Dynamic logistics engine shifting diesel truck legs onto Dedicated Freight Corridors with 24-hour predictive curfew bypass.",
      metric: "22% Cost Savings",
      status: "ISO 14083 Compliant",
    },
    {
      id: "004",
      title: "PaddleOCR Handwriting Segmenter",
      category: "COMPUTER VISION",
      detail: "Convolutional neural network extracting cursive handwriting strokes from low-resolution student notebooks with real-time feedback.",
      metric: "94.2% Character IOU",
      status: "TensorRT Optimized",
    },
  ];

  return (
    <section id="story-tools" className="py-20 border-y border-white/10 my-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] text-[#ff641c] uppercase font-bold tracking-widest block mb-2">
              [ 02 ] INTERACTIVE STUDY REEL
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              RESEARCH LAB<span className="text-[#ff641c]">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 uppercase">
            <Activity size={14} className="text-[#ff641c]" />
            <span>Interactive Parameter Explorer</span>
          </div>
        </div>

        {/* Study Navigation Reel */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar border-b border-white/10 mb-8">
          {studies.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-2xl font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-3 whitespace-nowrap shrink-0 ${
                activeTab === idx
                  ? 'bg-[#ff641c] text-black shadow-[0_0_20px_rgba(255,100,28,0.4)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
              data-cursor="SELECT"
            >
              <span>#{item.id}</span>
              <span>{item.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Study Display Console */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="story-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-black text-[#ff641c] px-3 py-1 bg-[#ff641c]/10 rounded-full border border-[#ff641c]/30">
                  STUDY #{studies[activeTab].id}
                </span>
                <span className="font-mono text-xs text-gray-400 uppercase">
                  {studies[activeTab].category}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                {studies[activeTab].title}
              </h3>

              <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                {studies[activeTab].detail}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 p-6 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="font-mono text-[10px] text-gray-400 uppercase">KEY PERFORMANCE</span>
                <Sliders size={14} className="text-[#ff641c]" />
              </div>
              <div className="font-display text-3xl font-black text-[#ff641c]">
                {studies[activeTab].metric}
              </div>
              <div className="font-mono text-xs text-gray-400 flex items-center gap-2">
                <ChevronRight size={14} className="text-[#ff641c]" />
                <span>{studies[activeTab].status}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
