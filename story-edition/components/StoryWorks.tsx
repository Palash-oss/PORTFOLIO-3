import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  images: string[];
  githubLink: string;
  liveLink?: string;
}

const storyProjects: Project[] = [
  {
    id: "01",
    title: "VIDYA — Academic Chatbot",
    category: "AI EDUCATION & VISION",
    description: "An intelligent academic assistant for CBSE students (Grade 1-4) combining context-aware AI tutoring powered by Gemini & Groq, adaptive assessments, handwriting analysis via PaddleOCR, and knowledge graph visualization. Features multi-role dashboards, persistent chat sessions, and the COMPASS adaptive framework.",
    tags: ["React", "Python", "Gemini AI", "PaddleOCR", "Firebase", "MongoDB"],
    images: [
      "/vidya-1.png",
      "/vidya-2.png",
      "/vidya-3.png",
      "/vidya-4.png"
    ],
    githubLink: "https://github.com/flashrod/ACADEMIC-CHATBOT"
  },
  {
    id: "02",
    title: "CodeBase X-Ray — Static Analysis Platform",
    category: "STATIC ANALYSIS & AST",
    description: "An advanced, 100% private AST-driven source code analysis and architecture refactoring platform. Parses local repositories or public GitHub URLs to construct evidence-based System Design Topologies, interactive Refactoring Simulations, 1-Click Codebase Auto-Fixers, and exportable Mermaid.js architecture diagrams.",
    tags: ["React", "Node.js", "AST Analysis", "Mermaid.js", "WebSockets", "Vercel"],
    images: [
      "/CODEBASE-XRAY-1.jpg",
      "/CODEBASE-XRAY-2.jpg",
      "/CODEBASE-XRAY-3.jpg",
      "/CODEBASE-XRAY-4.jpg",
      "/CODEBASE-XRAY-5.jpg"
    ],
    githubLink: "https://github.com/Palash-oss/Codebase",
    liveLink: "https://codebase-eight-murex.vercel.app/"
  },
  {
    id: "03",
    title: "EcoKernel — Low-Carbon Freight Logistics OS",
    category: "GREEN LOGISTICS & AI OPTIMIZATION",
    description: "An AI-powered operating system for low-carbon commercial freight that optimizes transit speed, operational costs, and CO₂ emissions. Built on physics-informed modeling and a Quantum-Inspired Genetic Algorithm (QIGA), EcoKernel solves multi-objective Green Vehicle Routing Problems (GVRP) in milliseconds. It eliminates high-cost 'border traps' with 24-hour predictive curfew shields and pairs trucking with India’s Dedicated Freight Rail Corridors (DFC) to slash emissions by up to 80% with audit-proof ISO 14083 / GLEC v3.0 / CBAM certificates.",
    tags: ["Python", "FastAPI", "React", "QIGA / Meta-Heuristics", "ISO 14083", "Gemini RAG"],
    images: [
      "/ECOKERNEL-1.jpg",
      "/ECOKERNEL-2.jpg",
      "/ECOKERNEL-3.jpg",
      "/ECOKERNEL-4.jpg"
    ],
    githubLink: "https://github.com/Palash-oss/Ecokernel"
  }
];

export const StoryWorks: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; currentIndex: number }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
  };

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  }, []);

  const nextImage = useCallback((e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
  }, []);

  const prevImage = useCallback((e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, nextImage, prevImage]);

  return (
    <section id="story-works" className="py-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-[10px] text-[#ff641c] uppercase font-bold tracking-widest block mb-2">
            [ 03 ] SELECTED CASE STUDIES
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            THE WORKS<span className="text-[#ff641c]">.</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-400 max-w-sm uppercase leading-relaxed">
          Production systems, static analysis platforms, and multi-objective AI engines.
        </p>
      </div>

      {/* Case Studies Stack */}
      <div className="space-y-16">
        {storyProjects.map((project, pIdx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0.01, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ duration: 0.6, delay: pIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="story-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Metadata & Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black text-black px-3 py-1 bg-[#ff641c] rounded-full">
                    PROJECT // {project.id}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  {project.title}
                </h3>

                <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-gray-300 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#ff641c] text-black font-display font-black text-xs uppercase tracking-widest hover:bg-[#ff7a38] transition-all shadow-[0_0_20px_rgba(255,100,28,0.3)]"
                      data-cursor="DEMO"
                    >
                      <ExternalLink size={16} />
                      <span>LIVE DEMO</span>
                    </a>
                  )}

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all ${
                      project.liveLink
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                    data-cursor="SOURCE"
                  >
                    <Github size={16} />
                    <span>SOURCE CODE</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Swiper Carousel */}
              <div className="lg:col-span-7 w-full">
                <div className="relative rounded-2xl overflow-hidden story-card-brutal border border-white/15 shadow-2xl group/card">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    observer={true}
                    observeParents={true}
                    className="w-full h-auto"
                  >
                    {project.images.map((imgUrl, idx) => (
                      <SwiperSlide key={idx} className="w-full">
                        <div
                          className="relative cursor-pointer overflow-hidden group/slide"
                          onClick={() => openLightbox(project.images, idx)}
                          data-cursor="EXPAND"
                        >
                          <img
                            src={imgUrl}
                            alt={`${project.title} Preview ${idx + 1}`}
                            className="w-full h-[280px] sm:h-[400px] object-cover object-top transition-transform duration-700 group-hover/slide:scale-105"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/slide:opacity-20 transition-opacity" />

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(project.images, idx);
                            }}
                            className="absolute bottom-4 right-4 p-3 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-[#ff641c] hover:text-black transition-all shadow-lg z-10"
                            title="Expand Screenshot"
                            data-cursor="EXPAND"
                          >
                            <Maximize2 size={16} />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Lightbox Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {lightbox.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-[500000] bg-[#08080a]/98 flex items-center justify-center p-4 sm:p-8 select-none"
            >
              {/* Header Bar */}
              <div className="fixed top-6 left-6 right-6 flex items-center justify-between z-[500010]">
                <span className="font-mono text-xs text-white font-bold bg-[#121217] px-4 py-2 rounded-full border border-white/20">
                  IMAGE {lightbox.currentIndex + 1} / {lightbox.images.length}
                </span>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="px-5 py-2.5 bg-[#ff641c] text-black font-display font-black text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-xl flex items-center gap-2"
                  data-cursor="CLOSE"
                >
                  <span>CLOSE</span>
                  <X size={16} />
                </button>
              </div>

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={prevImage}
                className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 p-4 bg-[#121217] hover:bg-[#ff641c] hover:text-black rounded-full text-white border border-white/20 z-[500010] shadow-2xl transition-all"
                data-cursor="PREV"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 p-4 bg-[#121217] hover:bg-[#ff641c] hover:text-black rounded-full text-white border border-white/20 z-[500010] shadow-2xl transition-all"
                data-cursor="NEXT"
              >
                <ChevronRight size={24} />
              </button>

              {/* Full Preview */}
              <div onClick={(e) => e.stopPropagation()} className="relative max-w-[92vw] max-h-[85vh] flex items-center justify-center z-[500005]">
                <img
                  src={lightbox.images[lightbox.currentIndex]}
                  alt="Full Project Preview"
                  className="max-w-[92vw] max-h-[84vh] w-auto h-auto object-contain rounded-2xl border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.95)]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
