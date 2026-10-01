import React from 'react';

export const Scene2Statements: React.FC = () => {
  return (
    <div
      id="scene2-statements"
      className="absolute inset-0 w-full h-full pointer-events-none select-none flex items-center justify-between px-6 sm:px-12 lg:px-20 z-20 will-change-transform"
      style={{
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Left Statement */}
      <div className="max-w-[42vw] flex flex-col items-start">
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#F0561F] font-bold uppercase mb-4">
          // THESIS 01 — SYNTHESIS
        </div>

        {/* Line 1 */}
        <div className="relative w-full text-left my-1 overflow-visible">
          <div
            className="slice-layer slice-l1-1 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)',
              transform: 'translate3d(-40px, 0, 0)'
            }}
          >
            BRIDGING DEEP
          </div>
          <div
            className="slice-layer slice-l1-2 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 34%, 100% 34%, 100% 67%, 0% 67%)',
              transform: 'translate3d(35px, 0, 0)'
            }}
          >
            BRIDGING DEEP
          </div>
          <div
            className="slice-layer slice-l1-3 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 67%, 100% 67%, 100% 100%, 0% 100%)',
              transform: 'translate3d(-25px, 0, 0)'
            }}
          >
            BRIDGING DEEP
          </div>
        </div>

        {/* Line 2 */}
        <div className="relative w-full text-left my-1 overflow-visible">
          <div
            className="slice-layer slice-l2-1 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)',
              transform: 'translate3d(-40px, 0, 0)'
            }}
          >
            NEURAL LOGIC
          </div>
          <div
            className="slice-layer slice-l2-2 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 34%, 100% 34%, 100% 67%, 0% 67%)',
              transform: 'translate3d(35px, 0, 0)'
            }}
          >
            NEURAL LOGIC
          </div>
          <div
            className="slice-layer slice-l2-3 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 67%, 100% 67%, 100% 100%, 0% 100%)',
              transform: 'translate3d(-25px, 0, 0)'
            }}
          >
            NEURAL LOGIC
          </div>
        </div>

        {/* Line 3 */}
        <div className="relative w-full text-left my-1 overflow-visible">
          <div
            className="slice-layer slice-l3-1 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)',
              transform: 'translate3d(-40px, 0, 0)'
            }}
          >
            WITH AESTHETICS
          </div>
          <div
            className="slice-layer slice-l3-2 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 34%, 100% 34%, 100% 67%, 0% 67%)',
              transform: 'translate3d(35px, 0, 0)'
            }}
          >
            WITH AESTHETICS
          </div>
          <div
            className="slice-layer slice-l3-3 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 67%, 100% 67%, 100% 100%, 0% 100%)',
              transform: 'translate3d(-25px, 0, 0)'
            }}
          >
            WITH AESTHETICS
          </div>
        </div>
      </div>

      {/* Center gap for rotating 3D glass cube */}
      <div className="w-[16vw] pointer-events-none" />

      {/* Right Statement */}
      <div className="max-w-[42vw] flex flex-col items-end">
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#F0561F] font-bold uppercase mb-4">
          // THESIS 02 — MISSION
        </div>

        {/* Line 1 */}
        <div className="relative w-full text-right my-1 overflow-visible">
          <div
            className="slice-layer slice-r1-1 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)',
              transform: 'translate3d(-40px, 0, 0)'
            }}
          >
            BUILDING RESILIENT
          </div>
          <div
            className="slice-layer slice-r1-2 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 34%, 100% 34%, 100% 67%, 0% 67%)',
              transform: 'translate3d(35px, 0, 0)'
            }}
          >
            BUILDING RESILIENT
          </div>
          <div
            className="slice-layer slice-r1-3 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 67%, 100% 67%, 100% 100%, 0% 100%)',
              transform: 'translate3d(-25px, 0, 0)'
            }}
          >
            BUILDING RESILIENT
          </div>
        </div>

        {/* Line 2 */}
        <div className="relative w-full text-right my-1 overflow-visible">
          <div
            className="slice-layer slice-r2-1 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)',
              transform: 'translate3d(-40px, 0, 0)'
            }}
          >
            AUTONOMOUS SYSTEMS
          </div>
          <div
            className="slice-layer slice-r2-2 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 34%, 100% 34%, 100% 67%, 0% 67%)',
              transform: 'translate3d(35px, 0, 0)'
            }}
          >
            AUTONOMOUS SYSTEMS
          </div>
          <div
            className="slice-layer slice-r2-3 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 67%, 100% 67%, 100% 100%, 0% 100%)',
              transform: 'translate3d(-25px, 0, 0)'
            }}
          >
            AUTONOMOUS SYSTEMS
          </div>
        </div>

        {/* Line 3 */}
        <div className="relative w-full text-right my-1 overflow-visible">
          <div
            className="slice-layer slice-r3-1 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)',
              transform: 'translate3d(-40px, 0, 0)'
            }}
          >
            FOR THE PLANET
          </div>
          <div
            className="slice-layer slice-r3-2 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 34%, 100% 34%, 100% 67%, 0% 67%)',
              transform: 'translate3d(35px, 0, 0)'
            }}
          >
            FOR THE PLANET
          </div>
          <div
            className="slice-layer slice-r3-3 absolute inset-0 font-headline text-[5.5vw] sm:text-[4vw] lg:text-[3.2vw] font-black tracking-tight uppercase leading-[0.92] text-[#0c0c0e] will-change-transform"
            style={{
              clipPath: 'polygon(0% 67%, 100% 67%, 100% 100%, 0% 100%)',
              transform: 'translate3d(-25px, 0, 0)'
            }}
          >
            FOR THE PLANET
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene2Statements;
