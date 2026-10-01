import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { StoryMusicPlayer } from './StoryMusicPlayer';

export const StoryNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INDEX', href: '#story-home' },
    { name: 'DISCIPLINES', href: '#story-about' },
    { name: 'RESEARCH', href: '#story-tools' },
    { name: 'WORKS', href: '#story-works' },
    { name: 'LOGS', href: '#story-journey' },
    { name: 'DISPATCH', href: '#story-contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-2.5' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
          isScrolled
            ? 'story-panel bg-[#08080a]/90 backdrop-blur-2xl border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border border-transparent'
        }`}>
          {/* Brand Mark */}
          <a href="#story-home" className="flex items-center gap-3 group" data-cursor="PALASH">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-display font-black text-sm group-hover:bg-[#ff641c] transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xs sm:text-sm tracking-tight text-white group-hover:text-gray-300">
                PALASH PATHARE
              </span>
              <span className="font-mono text-[8px] text-[#ff641c] tracking-widest uppercase font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff641c] animate-ping" /> AI / SYSTEMS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-widest font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all group/nav"
                data-cursor="GOTO"
              >
                <span>{link.name}</span>
                {/* Tiny Pixel Hover Shimmer Dot */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ff641c] opacity-0 group-hover/nav:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Right Action & Music Player */}
          <div className="flex items-center gap-3">
            {/* Embedded Ambient Sound Player */}
            <StoryMusicPlayer />

            {/* Let's Create CTA */}
            <a
              href="#story-contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#ff641c] hover:text-white transition-all shadow-md group"
              data-cursor="CONTACT"
            >
              <span>LET'S CREATE</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#ff641c]"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mx-4 mt-2 p-6 story-panel rounded-3xl border border-white/15 shadow-2xl flex flex-col gap-5 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-black text-2xl uppercase tracking-tight text-white hover:text-[#ff641c] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="font-mono text-xs text-[#ff641c] opacity-60">↗</span>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                PALASH PATHARE — STORY EDITION
              </span>
              <a
                href="#story-contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-[#ff641c] text-black font-display font-black text-xs uppercase tracking-wider rounded-full"
              >
                INIT DISPATCH
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
