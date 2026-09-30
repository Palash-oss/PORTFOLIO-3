import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { motion, useScroll, useSpring } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Only initialize smooth scroll on non-touch desktop devices to avoid mobile touch hijacking & intersection observer bugs
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch || window.innerWidth < 1024) {
      return;
    }

    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.08,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 0,
      }
    });

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Background Interactive 3D Spring Wobble Grid */}
      <BackgroundCanvas />

      {/* Custom Spring Cursor */}
      <CustomCursor />
      
      {/* Top Metallic Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-zinc-500 via-white to-zinc-500 origin-left z-[100] shadow-[0_0_15px_rgba(255,255,255,0.7)]"
        style={{ scaleX }}
      />

      {/* Floating Island Navigation */}
      <Navbar />
      
      <main className="relative z-10 w-full overflow-hidden">
        {/* Hero Section Container */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <section id="home">
            <Hero />
          </section>
        </div>
        
        {/* Full Screen Edge-to-Edge Tech Stack Marquee */}
        <section className="w-full overflow-hidden my-8 sm:my-14">
          <Marquee />
        </section>
        
        {/* Main Content Sections Container */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <section id="projects" className="pt-8 sm:pt-16">
            <Projects />
          </section>
          
          <section id="experience" className="pt-16 sm:pt-20">
            <Experience />
          </section>
          
          <section id="contact" className="pt-16 sm:pt-20 pb-20">
            <Contact />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
