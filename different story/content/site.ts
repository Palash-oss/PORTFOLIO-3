// ============================================================
// SINGLE SOURCE OF TRUTH — all content lives here
// ============================================================

export const SITE = {
  name: 'PALASH\nPATHARE',
  nameFlat: 'PALASH PATHARE',
  role: 'AI / ML Engineer & Full-Stack Developer',
  bio: 'Architecting intelligent models, production RAG pipelines, and high-performance web systems. Building at the intersection of neural architectures and brutalist engineering.',
  email: 'palashpathare@gmail.com',
  resumeUrl: '/PalashResume26.pdf',

  // SCENE 4 — Principles
  principles: ['PRECISE', 'RELENTLESS', 'ADAPTIVE'] as const,
  marqueeText: 'AI/ML ENGINEER • PALASH PATHARE • FULL-STACK •',

  // SCENE 1 — Hero domain mastery list
  masteryItems: [
    { label: '01', title: 'Neural Architectures', desc: 'Custom PyTorch & Deep Learning' },
    { label: '02', title: 'LLM Orchestration', desc: 'RAG, Gemini & Groq Pipelines' },
    { label: '03', title: 'Full-Stack Systems', desc: 'FastAPI, React & Scalable DBs' },
    { label: '04', title: 'Creative Interface', desc: 'High-Performance Animations' },
  ],

  // SCENE 3 — Experience / Record
  yearsOfExperience: 3,
  skills: [
    { label: 'PyTorch / TensorFlow', level: 92 },
    { label: 'Python / FastAPI', level: 95 },
    { label: 'React / TypeScript', level: 90 },
    { label: 'Gemini AI / LLM RAG', level: 88 },
    { label: 'MongoDB / PostgreSQL', level: 82 },
    { label: 'WebGL / Three.js', level: 75 },
  ],
  roles: [
    {
      title: 'AI Platform Engineer',
      subtitle: 'Independent / Freelance',
      dates: '2025 – PRESENT',
      desc: 'Production AI systems — VIDYA, EcoKernel — RAG pipelines, meta-heuristic optimisation.',
    },
    {
      title: 'Full-Stack Architect',
      subtitle: 'Web & Systems',
      dates: '2024 – 2025',
      desc: 'Microservices, real-time WebSockets, sentiment analysis platforms and AST-driven tooling.',
    },
    {
      title: 'ML Researcher',
      subtitle: 'Deep Learning Foundations',
      dates: '2023 – 2024',
      desc: 'Vision models, NLP, PaddleOCR — understanding the maths before moving to engineering.',
    },
  ],
  contributions: [
    { label: 'VIDYA — AI Academic Chatbot', tag: 'AI · EDU' },
    { label: 'EcoKernel — Green Logistics OS', tag: 'AI · LOGISTICS' },
    { label: 'CodeBase X-Ray', tag: 'AST · DEVTOOLS' },
  ],

  // SCENE 2 — Work
  projects: [
    {
      index: '01',
      title: 'VIDYA',
      fullTitle: 'VIDYA — Academic Chatbot',
      category: 'AI EDUCATION',
      description:
        'Intelligent academic assistant for CBSE students (Grade 1–4). Combines context-aware AI tutoring powered by Gemini & Groq, adaptive assessments, handwriting analysis via PaddleOCR, and knowledge graph visualisation. Multi-role dashboards, persistent chat sessions, and the COMPASS adaptive learning framework.',
      tags: ['React', 'Python', 'Gemini AI', 'PaddleOCR', 'Firebase', 'MongoDB'],
      images: ['/vidya-1.png', '/vidya-2.png', '/vidya-3.png', '/vidya-4.png'],
      github: 'https://github.com/flashrod/ACADEMIC-CHATBOT',
      live: null,
      previewColor: '#1a1a2e',
    },
    {
      index: '02',
      title: 'CODEBASE X-RAY',
      fullTitle: 'CodeBase X-Ray — Static Analysis Platform',
      category: 'AST & DEVTOOLS',
      description:
        '100% private AST-driven source-code analysis and architecture refactoring platform. Parses local repos or public GitHub URLs to construct System Design Topologies, interactive Refactoring Simulations, 1-Click Auto-Fixers, and exportable Mermaid.js architecture diagrams.',
      tags: ['React', 'Node.js', 'AST Analysis', 'Mermaid.js', 'WebSockets', 'Vercel'],
      images: [
        '/CODEBASE-XRAY-1.jpg',
        '/CODEBASE-XRAY-2.jpg',
        '/CODEBASE-XRAY-3.jpg',
        '/CODEBASE-XRAY-4.jpg',
        '/CODEBASE-XRAY-5.jpg',
      ],
      github: 'https://github.com/Palash-oss/Codebase',
      live: 'https://codebase-eight-murex.vercel.app/',
      previewColor: '#0a0f1a',
    },
    {
      index: '03',
      title: 'ECOKERNEL',
      fullTitle: 'EcoKernel — Low-Carbon Freight Logistics OS',
      category: 'GREEN LOGISTICS & AI',
      description:
        'AI-powered OS for low-carbon commercial freight. Optimises transit speed, cost, and CO₂ emissions using physics-informed modelling and a Quantum-Inspired Genetic Algorithm (QIGA). Delivers cryptographic SHA-256 carbon certificates compliant with ISO 14083, GLEC v3.0, and EU CBAM reporting.',
      tags: ['Python', 'FastAPI', 'React', 'QIGA / Meta-Heuristics', 'ISO 14083', 'Gemini RAG'],
      images: ['/ECOKERNEL-1.jpg', '/ECOKERNEL-2.jpg', '/ECOKERNEL-3.jpg', '/ECOKERNEL-4.jpg'],
      github: 'https://github.com/Palash-oss/Ecokernel',
      live: null,
      previewColor: '#0d1a0d',
    },
    {
      index: '04*',
      title: 'EXPERIMENTS',
      fullTitle: 'Experiments & Research',
      category: 'OPEN RESEARCH',
      description: 'Ongoing explorations in neural architectures, generative models, and creative engineering.',
      tags: ['Research', 'PyTorch', 'OpenGL', 'Generative Art'],
      images: [],
      github: 'https://github.com/Palash-oss',
      live: null,
      previewColor: '#1a0a0a',
    },
  ],

  // SCENE 5 — Contact
  contactCta: 'YOUR PROJECT',
  contactPara:
    'Open for engineering collaboration on AI/ML projects, neural architectures, and cutting-edge web platforms. Let\'s build something extraordinary.',
  channels: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/palash-pathare-53260b28a' },
    { label: 'GitHub', url: 'https://github.com/Palash-oss' },
    { label: 'Instagram', url: '#' },
    { label: 'X.com', url: '#' },
  ],
  location: 'Mumbai, India — IST (UTC+5:30)',

  // Persistent overlay
  cornerCaption: '// FIG. 00 — PALASH PATHARE / AI–ML ENGINEER',
};
