import React from 'react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    title: 'NEURAL ARCHITECTURES & DEEP LEARNING',
    description: 'CUSTOM PYTORCH & VISION MODELS / PADDLEOCR TEXT EXTRACTION & ADAPTIVE FRAMEWORKS.'
  },
  {
    id: '02',
    title: 'LLM ORCHESTRATION & RAG PIPELINES',
    description: 'GEMINI AI & GROQ INTEGRATIONS / CONTEXT RETRIEVAL, VECTOR GRAPHS & COMPASS LEARNING.'
  },
  {
    id: '03',
    title: 'LOW-CARBON FREIGHT & CBAM COMPLIANCE',
    description: 'MULTI-MODAL LOGISTICS OPTIMIZATION (QIGA) / 24H PREDICTIVE CURFEW SHIELDS & ISO 14083.'
  },
  {
    id: '04',
    title: 'AST STATIC ANALYSIS & REFACTORING',
    description: '100% PRIVATE REPOSITORY PARSING / SYSTEM TOPOLOGIES, 1-CLICK FIXERS & MERMAID.JS.'
  },
  {
    id: '05',
    title: 'HIGH-PERFORMANCE FULL-STACK SYSTEMS',
    description: 'FASTAPI, REACT 19 & WEBSOCKETS / HARDWARE-ACCELERATED SHADERS & DISTRIBUTED SCALE.'
  }
];

export const Scene3Services: React.FC = () => {
  return (
    <>
      {/* Expanding Orange Circular Wipe Background */}
      <div
        id="scene3-circular-wipe"
        className="circular-wipe fixed inset-0 pointer-events-none z-[18] bg-[#F0561F] will-change-transform"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Content Container inside the Stage */}
      <div
        id="scene3-services"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 flex flex-col justify-between p-6 sm:p-12 lg:p-16 will-change-transform"
        style={{
          opacity: 0,
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        {/* Top Header Label */}
        <div className="w-full flex justify-between items-center text-[#0c0c0e]">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
            // CHAPTER 02 — ARCHITECTURAL CAPABILITIES
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
            [ SERVICES & EXPERTISE ]
          </span>
        </div>

        {/* Real Portfolio Projects Photos Collage (Layer 1) - Full High-Res UI Screenshots */}
        <div
          id="scene3-photos"
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-25 will-change-transform"
          style={{
            opacity: 0,
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <div className="relative w-full max-w-6xl h-[65vh] flex items-center justify-between px-4 sm:px-8">
            {/* Left Photo: VIDYA full screenshot */}
            <div
              id="photo-left"
              className="w-[29vw] max-w-sm shadow-2xl rounded-sm overflow-hidden border-2 border-black bg-white will-change-transform"
              style={{
                transform: 'translate3d(0, 160px, 0) scale(0.85)'
              }}
            >
              <div className="bg-black text-white px-2.5 py-1 font-mono text-[8px] sm:text-[9px] font-bold flex justify-between items-center">
                <span>// PLATFORM 01</span>
                <span>VIDYA AI</span>
              </div>
              <img
                src="/vidya-1.png"
                alt="VIDYA Platform"
                className="w-full h-44 sm:h-56 object-cover object-top"
                loading="eager"
              />
            </div>

            {/* Center Photo: ECOKERNEL full screenshot */}
            <div
              id="photo-center"
              className="w-[35vw] max-w-md shadow-2xl rounded-sm overflow-hidden border-2 border-black z-10 bg-white will-change-transform"
              style={{
                transform: 'translate3d(0, 120px, 0) scale(0.85)'
              }}
            >
              <div className="bg-black text-[#F0561F] px-3 py-1 font-mono text-[9px] sm:text-[10px] font-bold flex justify-between items-center border-b border-black">
                <span>// PRODUCTION ARCHITECTURE</span>
                <span>ECOKERNEL DISPATCH</span>
              </div>
              <img
                src="/ECOKERNEL-1.jpg"
                alt="EcoKernel OS"
                className="w-full h-56 sm:h-72 object-cover object-top"
                loading="eager"
              />
            </div>

            {/* Right Photo: CODEBASE X-RAY full screenshot */}
            <div
              id="photo-right"
              className="w-[29vw] max-w-sm shadow-2xl rounded-sm overflow-hidden border-2 border-black bg-white will-change-transform"
              style={{
                transform: 'translate3d(0, 180px, 0) scale(0.85)'
              }}
            >
              <div className="bg-black text-white px-2.5 py-1 font-mono text-[8px] sm:text-[9px] font-bold flex justify-between items-center">
                <span>// CARTOGRAPHY 03</span>
                <span>CODEBASE AST</span>
              </div>
              <img
                src="/CODEBASE-XRAY-1.jpg"
                alt="CodeBase X-Ray Cartography"
                className="w-full h-44 sm:h-56 object-cover object-top"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* 5-Row Numbered Services List (Layer 2) */}
        <div
          id="scene3-list"
          className="my-auto w-full max-w-6xl mx-auto flex flex-col z-30 will-change-transform"
          style={{
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {SERVICES.map((item, idx) => (
            <div
              key={item.id}
              className={`service-row service-row-${idx} relative group w-full pointer-events-auto cursor-pointer border-b border-black/25 overflow-hidden transition-colors duration-200`}
              style={{
                opacity: 0,
                transform: 'translate3d(0, 30px, 0)'
              }}
            >
              {/* Black Fill slide from Left on Hover */}
              <div className="absolute inset-0 bg-[#0c0c0e] transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100" />

              {/* Row Line Draw (Left to Right) */}
              <div
                className={`service-line-${idx} absolute top-0 left-0 right-0 h-[1px] bg-black origin-left`}
                style={{
                  transform: 'scaleX(0)'
                }}
              />

              {/* Content Container */}
              <div className="relative z-10 py-5 sm:py-7 px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[14px] sm:text-[16px] font-bold tracking-widest text-black group-hover:text-[#F0561F] transition-colors duration-200">
                    {item.id}
                  </span>
                </div>

                <div className="flex-1 lg:text-center">
                  <h3 className="font-headline text-[4vw] sm:text-[2.6vw] lg:text-[2vw] font-black uppercase tracking-tight text-[#0c0c0e] group-hover:text-[#F0561F] transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                <div className="lg:max-w-xs text-left lg:text-right">
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2a2a2d] group-hover:text-[#D9D9D9] transition-colors duration-200">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar Info */}
        <div className="w-full flex justify-between items-center text-[#0c0c0e]">
          <span className="font-mono text-[9px] tracking-widest uppercase">
            HOVER TO INSPECT // PALASH.ARCH
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase">
            [ SCROLL TIMELINE 020-042 ]
          </span>
        </div>
      </div>
    </>
  );
};

export default Scene3Services;
