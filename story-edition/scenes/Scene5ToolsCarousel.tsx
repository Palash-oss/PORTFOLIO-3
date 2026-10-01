import React, { useMemo } from 'react';

interface ToolData {
  index: string;
  name: string;
  category: string;
  scrollLabel: string;
  description: string;
  rightBg: string;
  patternType: number;
  tags: string[];
  pipeline: string;
  telemetry: {
    stats: { label: string; val: string; sub?: string }[];
    code: string[];
    logs: string;
  };
}

const TOOLS: ToolData[] = [
  {
    index: '001',
    name: 'PYTORCH & COMPUTER VISION',
    category: 'NEURAL MODELS & VISION',
    scrollLabel: 'SCROLL 01',
    description: 'CUSTOM COMPUTER VISION & DEEP LEARNING ARCHITECTURES / PADDLEOCR TEXT EXTRACTION WITH HIGH-CONFIDENCE INFERENCE.',
    rightBg: '#08080a',
    patternType: 1,
    tags: ['CUDA 12.4', 'PYTORCH 2.5', 'PADDLEOCR v4', 'TENSORRT', 'FP16 MIXED'],
    pipeline: 'INPUT TENSOR → BACKBONE RESNET → CTC DECODER → OCR OUTPUT',
    telemetry: {
      stats: [
        { label: 'TENSOR ENGINE', val: 'PyTorch / CUDA', sub: 'FP16 Mixed Accel' },
        { label: 'OCR ACCURACY', val: '98.4% SCORE', sub: 'Text Detection' },
        { label: 'THROUGHPUT', val: '142 FPS', sub: 'Batch Size: 32' },
        { label: 'VRAM USAGE', val: '2.4 GB', sub: 'Allocation Stable' }
      ],
      code: [
        'import torch, paddleocr as ocr',
        'engine = ocr.PaddleOCR(use_angle_cls=True, lang="en")',
        'tensor = torch.from_numpy(img).to("cuda:0", torch.float16)',
        'result = engine.ocr(tensor, cls=True) # 98.4% rec_score'
      ],
      logs: '[CUDA:0] Active | Latency: 4.8ms | Alloc: 2420MB | Status: OPTIMAL'
    }
  },
  {
    index: '002',
    name: 'GEMINI AI & RAG PIPELINES',
    category: 'LLM ORCHESTRATION & GROQ',
    scrollLabel: 'SCROLL 02',
    description: 'PRODUCTION-GRADE RAG PIPELINES, MULTI-MODAL TUTORING & CONTEXT-AWARE AGENTS WITH COMPASS FRAMEWORK.',
    rightBg: '#121215',
    patternType: 2,
    tags: ['GEMINI 2.0 FLASH', 'GROQ LPU', 'QDRANT VECTOR', 'COMPASS RAG', 'HYBRID TOP-K'],
    pipeline: 'USER QUERY → EMBEDDING GRAPH → VECTOR STORE → LPU STREAM',
    telemetry: {
      stats: [
        { label: 'INFERENCE SPEED', val: '340 TOK/S', sub: 'Groq LPU Engine' },
        { label: 'CONTEXT WINDOW', val: '1.0M TOKENS', sub: 'Gemini 2.0 Flash' },
        { label: 'RAG SEARCH', val: '82 ms TOP-K', sub: 'Qdrant Hybrid Graph' },
        { label: 'ACCURACY CONF', val: '99.1% PREC', sub: 'Compass Verification' }
      ],
      code: [
        'client = genai.Client(api_key=SETTINGS.GEMINI_KEY)',
        'context = await vector_store.similarity_search(query, k=6)',
        'response = await client.models.generate_content_async(',
        '    model="gemini-2.0-flash", contents=[context, prompt])'
      ],
      logs: '[LLM_ROUTER] Groq LPU Warm | 340 tok/s | RAG Cache Hit: 94%'
    }
  },
  {
    index: '003',
    name: 'FASTAPI & GVRP SOLVER',
    category: 'ASYNC BACKENDS & IPC',
    scrollLabel: 'SCROLL 03',
    description: 'LOW-LATENCY ASYNC MICROSERVICES, BIO-INSPIRED GVRP SOLVERS (QIGA) & SECURE 24H PREDICTIVE CURFEW SHIELDS.',
    rightBg: '#0c0c0e',
    patternType: 3,
    tags: ['FASTAPI ASYNCIO', 'QIGA META-HEURISTICS', 'WEBSOCKETS IPC', 'ISO 14083', 'REDIS STREAM'],
    pipeline: 'FREIGHT DEMAND → QIGA QUANTUM SOLVER → CURFEW SHIELD → 24H DISPATCH',
    telemetry: {
      stats: [
        { label: 'DISPATCH LATENCY', val: '1.24 ms', sub: 'P99 Microsecond Route' },
        { label: 'GVRP OPTIMALITY', val: '99.2% OPT', sub: 'QIGA Bio-Heuristics' },
        { label: 'WS CONCURRENCY', val: '10,000+ WS', sub: 'Async Event Loop' },
        { label: 'CURFEW SHIELD', val: '24H PREDICT', sub: 'Border Curfew Defense' }
      ],
      code: [
        '@app.websocket("/ws/telemetry")',
        'async def telemetry_endpoint(ws: WebSocket):',
        '    await ws.accept()',
        '    await qiga_solver.stream_emissions_and_routes(ws)'
      ],
      logs: '[FASTAPI:UVICORN] 4 Workers | 10k sessions | P99: 1.24ms'
    }
  },
  {
    index: '004',
    name: 'REACT 19 & SPATIAL THREE.JS',
    category: 'AST CARTOGRAPHY & GRAPH ENGINE',
    scrollLabel: 'SCROLL 04',
    description: 'HARDWARE-ACCELERATED SHADERS, 3D AST SYSTEM DESIGN TOPOLOGIES, MERMAID.JS EXPORTERS & 60FPS CINEMATIC TIMELINES.',
    rightBg: '#1c1c22',
    patternType: 4,
    tags: ['REACT 19', 'THREE.JS / R3F', 'AST CARTOGRAPHY', 'WEBGL2 / GLSL', 'MERMAID.JS'],
    pipeline: 'SOURCE CODE → BABYLON AST → DEPENDENCY GRAPH → 3D TOPOLOGY',
    telemetry: {
      stats: [
        { label: 'FPS STABILITY', val: '60.0 FPS', sub: '0 Dropped Frames' },
        { label: 'RENDER PIPELINE', val: 'WebGL2 / R3F', sub: 'GPU Canvas Node' },
        { label: 'AST TOPOLOGY', val: '100% PRIVATE', sub: 'In-Browser AST Parser' },
        { label: 'GLSL SHADERS', val: 'CUSTOM POST', sub: 'Raymarching Glass FX' }
      ],
      code: [
        'useFrame(({ clock }) => {',
        '  const time = performance.now() * 0.001;',
        '  astMesh.rotation.y = time * 0.35 + mouseOffset;',
        '});'
      ],
      logs: '[R3F_CANVAS] WebGL2 Context OK | Draw Calls: 12 | 60.0 FPS'
    }
  }
];

export const Scene5ToolsCarousel: React.FC = () => {
  // Static memoized pixel dissolve blocks
  const dissolveBlocks = useMemo(() => {
    const list = [];
    for (let r = 5; r >= 0; r--) {
      for (let c = 0; c < 10; c++) {
        const threshold = (5 - r) * 0.14 + (Math.sin(c * 2.3 + r * 1.7) * 0.5 + 0.5) * 0.16;
        list.push({ r, c, threshold });
      }
    }
    return list;
  }, []);

  const stairRows = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7], []);

  return (
    <div
      id="scene5-tools-carousel"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden will-change-transform"
      style={{
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* 4 Tool Sub-Scenes Mounted in DOM, scrubbed by master timeline */}
      {TOOLS.map((tool, idx) => (
        <div
          key={tool.index}
          id={`tool-subscene-${idx}`}
          className={`tool-subscene tool-subscene-${idx} absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between will-change-transform`}
          style={{
            opacity: idx === 0 ? 1 : 0,
            zIndex: 10 + idx * 5,
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {/* Top Bar */}
          <div className="w-full flex justify-between items-start z-30 pt-10 sm:pt-8">
            <div className="max-w-md">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#0c0c0e] font-bold uppercase block mb-1">
                // TOOL {tool.index} — {tool.category}
              </span>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#1c1c1f] uppercase tracking-wider leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.3em] text-[#0c0c0e] uppercase bg-black/10 px-3 py-1 border border-black/20">
              {tool.scrollLabel}
            </div>
          </div>

          {/* Main Demo Stage in the Middle */}
          <div className="my-auto w-full max-w-6xl mx-auto h-[50vh] sm:h-[55vh] flex rounded-sm overflow-hidden border-2 border-black shadow-xl z-30 pointer-events-auto">
            {/* Left Half: Black Pixel-Stair shape + Pipeline Flow */}
            <div className="w-1/2 h-full bg-[#F0561F] p-4 sm:p-5 flex flex-col justify-between border-r border-black relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center font-mono text-[8px] sm:text-[9px] text-black font-bold uppercase tracking-wider mb-1">
                  <span>[ PATTERN 0{tool.patternType} // TOPOLOGY ]</span>
                  <span className="bg-black text-[#F0561F] px-1.5 py-0.5 text-[8px]">ACTIVE</span>
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-black/75 uppercase tracking-wide truncate">
                  {tool.pipeline}
                </div>
              </div>

              {/* Pixel Stair Rows */}
              <div className="w-full flex flex-col justify-end gap-1.5 py-2">
                {stairRows.map((row) => {
                  let fillPercent = ((row + idx + 1) / 9) * 100;
                  if (tool.patternType === 2) {
                    fillPercent = (Math.abs(row - 3.5) / 4) * 100;
                  } else if (tool.patternType === 3) {
                    fillPercent = ((8 - row) / 8) * 100;
                  }
                  return (
                    <div key={row} className="w-full h-3.5 sm:h-5 flex items-center">
                      <div
                        className="h-full bg-[#0c0c0e] transition-all duration-300"
                        style={{
                          width: `${Math.min(Math.max(fillPercent, 12), 100)}%`
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Tags Pills */}
              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[8px] bg-black text-[#F0561F] px-1.5 py-0.5 font-bold uppercase border border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center font-mono text-[8px] sm:text-[9px] text-black/80 uppercase pt-1 border-t border-black/20">
                  <span>STEP DISPLACEMENT MATRIX</span>
                  <span>SUB-SCENE 0{idx + 1} / 04</span>
                </div>
              </div>
            </div>

            {/* Right Half: Live Interactive Demo Card */}
            <div
              className="w-1/2 h-full p-4 sm:p-5 flex flex-col justify-between text-white relative overflow-hidden"
              style={{ backgroundColor: tool.rightBg }}
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <div className="flex items-center gap-2">
                  {/* macOS / Linux Terminal Window Dots */}
                  <div className="flex items-center gap-1.5 mr-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#F0561F] uppercase font-bold">
                    KERNEL TELEMETRY
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse" />
                  <span className="font-mono text-[9px] text-white/60 tracking-widest">
                    [ 60.0 FPS LOCKED ]
                  </span>
                </div>
              </div>

              {/* 4-Stat Micro Dashboard */}
              <div className="grid grid-cols-2 gap-2 my-2 font-mono">
                {tool.telemetry.stats.map((s, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-white/5 px-2.5 py-1.5 rounded border border-white/10 flex flex-col justify-between"
                  >
                    <div className="text-white/45 text-[8px] sm:text-[9px] uppercase tracking-wider">
                      {s.label}
                    </div>
                    <div className="text-[#F0561F] font-black text-[11px] sm:text-[13px] tracking-tight">
                      {s.val}
                    </div>
                    {s.sub && (
                      <div className="text-white/35 text-[7px] sm:text-[8px] truncate">
                        {s.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Code Snippet Box with Line Numbers */}
              <div className="bg-black/75 p-2.5 sm:p-3 rounded border border-white/10 font-mono text-[9px] sm:text-[10px] leading-relaxed overflow-x-auto whitespace-pre">
                {tool.telemetry.code.map((line, lIdx) => (
                  <div key={lIdx} className="flex gap-2.5">
                    <span className="text-white/30 select-none">0{lIdx + 1}</span>
                    <span className={lIdx === 0 ? 'text-[#38bdf8]' : lIdx === 1 ? 'text-[#e4e4e7]' : lIdx === 2 ? 'text-[#facc15]' : 'text-[#34d399]'}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Status Log Line */}
              <div className="flex items-center justify-between font-mono text-[8px] sm:text-[8.5px] text-white/50 uppercase pt-2 border-t border-white/10">
                <span className="truncate text-white/70">{tool.telemetry.logs}</span>
                <span className="text-[#F0561F] font-bold ml-2 shrink-0">OPTIMAL</span>
              </div>
            </div>
          </div>

          {/* Bottom Area: Tool Name + Index Number */}
          <div className="w-full flex justify-between items-end z-30 pb-4">
            <div className="font-headline text-[8.5vw] sm:text-[7vw] lg:text-[5vw] font-black tracking-tighter text-[#0c0c0e] uppercase leading-none whitespace-nowrap">
              {tool.name}
            </div>

            <div className="font-mono text-[4vw] sm:text-[3vw] lg:text-[2.2vw] font-black tracking-widest text-[#0c0c0e]">
              {tool.index}
            </div>
          </div>
        </div>
      ))}

      {/* Blocky Pixel Dissolve Layer at end of tool 4 */}
      <div
        id="scene5-pixel-dissolve"
        className="fixed inset-0 z-40 grid grid-cols-10 grid-rows-6 pointer-events-none w-screen h-screen opacity-0 will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        {dissolveBlocks.map((block, idx) => (
          <div
            key={idx}
            className={`dissolve-block dissolve-block-${idx} w-full h-full bg-[#D9D9D9]`}
            style={{
              opacity: 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Scene5ToolsCarousel;
