import React from 'react';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  mainImg: string;
  floatImg: string;
  githubLink: string;
  liveLink?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'vidya',
    number: '01',
    title: 'VIDYA - ACADEMIC CHATBOT',
    category: 'AI EDUCATION & AGENTIC TUTORING',
    description:
      'INTELLIGENT ACADEMIC ASSISTANT COMBINING CONTEXT-AWARE AI TUTORING POWERED BY GEMINI & GROQ, ADAPTIVE ASSESSMENTS, HANDWRITING ANALYSIS VIA PADDLEOCR, AND KNOWLEDGE GRAPH VISUALIZATION.',
    tags: ['REACT', 'PYTHON', 'GEMINI AI', 'PADDLEOCR', 'FIREBASE', 'MONGODB'],
    mainImg: '/vidya-1.png',
    floatImg: '/vidya-2.png',
    githubLink: 'https://github.com/flashrod/ACADEMIC-CHATBOT'
  },
  {
    id: 'codebase-xray',
    number: '02',
    title: 'CODEBASE X-RAY — STATIC ANALYSIS',
    category: 'STATIC ANALYSIS & AST REFACTORING',
    description:
      'ADVANCED 100% PRIVATE AST-DRIVEN SOURCE CODE ANALYSIS & REFACTORING PLATFORM. PARSES REPOSITORIES TO CONSTRUCT SYSTEM DESIGN TOPOLOGIES, REFACTORING SIMULATIONS, 1-CLICK AUTO-FIXERS & MERMAID.JS ARCHITECTURES.',
    tags: ['REACT', 'NODE.JS', 'AST ANALYSIS', 'MERMAID.JS', 'WEBSOCKETS', 'VERCEL'],
    mainImg: '/CODEBASE-XRAY-1.jpg',
    floatImg: '/CODEBASE-XRAY-2.jpg',
    githubLink: 'https://github.com/Palash-oss/Codebase',
    liveLink: 'https://codebase-eight-murex.vercel.app/'
  },
  {
    id: 'ecokernel',
    number: '03',
    title: 'ECOKERNEL — LOW-CARBON FREIGHT OS',
    category: 'GREEN LOGISTICS & AI OPTIMIZATION',
    description:
      'AI OPERATING SYSTEM FOR LOW-CARBON FREIGHT BALANCING SPEED, COST IN INR, AND CO2. POWERED BY PHYSICS-INFORMED MODELING & QIGA META-HEURISTICS. ELIMINATES BORDER CURFEW TRAPS WITH 24H PREDICTIVE SHIELDS & RAIL PAIRING.',
    tags: ['PYTHON', 'FASTAPI', 'REACT', 'QIGA / META-HEURISTICS', 'ISO 14083', 'GEMINI RAG'],
    mainImg: '/ECOKERNEL-1.jpg',
    floatImg: '/ECOKERNEL-2.jpg',
    githubLink: 'https://github.com/Palash-oss/Ecokernel'
  }
];

export const Scene7WorkList: React.FC<{
  onSelectProject?: (project: ProjectItem) => void;
}> = ({ onSelectProject }) => {
  return (
    <div
      id="scene7-work-list"
      className="absolute inset-0 w-full h-[100svh] pointer-events-none select-none z-20 flex flex-col justify-between overflow-hidden will-change-transform"
      style={{
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Top Header Tag — sits safely below the fixed navbar */}
      <div className="absolute top-[60px] sm:top-[68px] left-0 right-0 w-full flex justify-between items-center text-[#0c0c0e] z-30 px-6 sm:px-12 py-2 border-b border-black/15 bg-[#D9D9D9]/80 backdrop-blur-sm">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
          // CHAPTER 03 — ARCHITECTURAL CASE STUDIES
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
          [ 03 SELECTED PROJECTS ]
        </span>
      </div>

      {/* Main Full-Width Project Rows Stack: bounded stage below navbar and sub-header */}
      <div className="absolute top-[102px] sm:top-[112px] bottom-3 sm:bottom-4 left-4 right-4 sm:left-10 sm:right-10 overflow-hidden z-20 border-2 border-black shadow-xl">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            id={`work-card-${idx}`}
            className={`work-card work-card-${idx} absolute inset-0 w-full h-full p-4 sm:p-6 lg:p-7 bg-[#D9D9D9] flex flex-col lg:flex-row pointer-events-auto cursor-pointer will-change-transform`}
            style={{
              clipPath: idx === 0 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              transform: 'translate3d(0, 0, 0)',
              zIndex: 10 + idx
            }}
            onClick={() => {
              if (onSelectProject) {
                onSelectProject(project);
              } else {
                window.open(project.githubLink, '_blank');
              }
            }}
          >
            {/* Column 1: Big Project Number + Buttons */}
            <div className="w-full lg:w-[22%] p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/80 bg-black/5">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#F0561F] font-bold uppercase block mb-1">
                  INDEX NUMBER
                </span>
                <div className="font-headline text-[10vw] sm:text-[7vw] lg:text-[5.5vw] font-black leading-none text-[#0c0c0e]">
                  {project.number}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-between border border-black px-4 py-2 text-[10px] font-mono tracking-widest font-bold uppercase hover:bg-black hover:text-white transition-colors"
                >
                  <span>SOURCE CODE</span>
                  <span>→</span>
                </a>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-between bg-black text-white px-4 py-2 text-[10px] font-mono tracking-widest font-bold uppercase hover:bg-[#F0561F] hover:text-black transition-colors"
                  >
                    <span>LIVE DEMO</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Large Center Image + Floating Framed Inset Screenshot */}
            <div className="w-full lg:w-[48%] h-48 sm:h-64 lg:h-full relative overflow-hidden bg-black/10 border-b lg:border-b-0 lg:border-r border-black/80 flex items-center justify-center p-3 sm:p-4">
              <div
                className={`work-img-wrapper work-img-${idx} w-full h-full overflow-hidden will-change-transform`}
                style={{
                  transform: 'scale(1)'
                }}
              >
                <img
                  src={project.mainImg}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale contrast-115 hover:grayscale-0 transition-all duration-300"
                  loading="eager"
                />
              </div>

              {/* Floating Framed Inset Screenshot */}
              <div
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-[42%] max-w-[220px] aspect-[16/10] bg-[#0c0c0e] p-1.5 rounded border border-white/40 shadow-xl"
                style={{
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                <img
                  src={project.floatImg}
                  alt={`${project.title} Preview`}
                  className="w-full h-full object-cover rounded-sm"
                  loading="eager"
                />
              </div>
            </div>

            {/* Column 3: Mono Text */}
            <div className="w-full lg:w-[30%] p-4 sm:p-6 lg:p-7 flex flex-col justify-between bg-white/40 overflow-y-auto">
              <div>
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#0c0c0e]/60 uppercase block mb-1">
                  {project.category}
                </span>
                <h3 className="font-headline text-[4vw] sm:text-[2.5vw] lg:text-[1.8vw] font-black text-[#0c0c0e] uppercase leading-tight tracking-tight mb-3">
                  {project.title}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#2a2a2e] uppercase tracking-wider">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="pt-4 border-t border-black/20 mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 bg-black/10 text-[#0c0c0e] border border-black/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Scene7WorkList;
