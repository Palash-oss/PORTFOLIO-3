import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Send, ArrowUp, ArrowUpRight } from 'lucide-react';

export const StoryOrangeFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = "palashpathare@gmail.com";
  const githubLink = "https://github.com/Palash-oss";
  const linkedinLink = "https://www.linkedin.com/in/palash-pathare-53260b28a";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="story-contact" className="relative w-full min-h-screen bg-[#ff641c] text-[#08080a] py-20 px-6 sm:px-12 lg:px-20 flex flex-col justify-between overflow-hidden select-none z-30 shadow-[0_-30px_90px_rgba(255,100,28,0.3)]">
      {/* Decorative Corner Registration Crosses in Black */}
      <div className="absolute top-8 left-8 w-4 h-4 opacity-40 pointer-events-none before:absolute before:top-2 before:left-0 before:w-4 before:h-[1px] before:bg-black after:absolute after:top-0 after:left-2 after:w-[1px] after:h-4 after:bg-black" />
      <div className="absolute top-8 right-8 w-4 h-4 opacity-40 pointer-events-none before:absolute before:top-2 before:left-0 before:w-4 before:h-[1px] before:bg-black after:absolute after:top-0 after:left-2 after:w-[1px] after:h-4 after:bg-black" />

      {/* Top Banner Status */}
      <div className="flex flex-wrap items-center justify-between pb-6 border-b border-black/20 font-mono text-xs uppercase font-black tracking-widest">
        <span>[ 05 // TRANSMISSION EPILOGUE ]</span>
        <span>STATUS: OPEN FOR SELECT ENGINEERING ROLES</span>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 my-auto py-12 items-start">
        {/* Left Column: Monumental Headline */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.88] text-black">
            LET ME RUN YOUR NEXT <br />
            <span>BREAKTHROUGH.</span>
          </h2>

          <p className="font-display text-xl sm:text-2xl font-bold text-black/80 max-w-xl leading-relaxed">
            "It's the one you didn't expect. Not in the spotlight, but out there on the edge."
          </p>

          {/* Interactive Direct Email Pill */}
          <div className="pt-4 space-y-2">
            <span className="font-mono text-[10px] text-black/70 uppercase font-black tracking-widest block">
              DIRECT DISPATCH
            </span>
            <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-black text-white shadow-2xl">
              <Mail size={18} className="text-[#ff641c]" />
              <a
                href={`mailto:${email}`}
                className="font-display font-bold text-base sm:text-lg text-white hover:text-gray-300 transition-colors"
                data-cursor="EMAIL"
              >
                {email}
              </a>
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/10 hover:bg-[#ff641c] hover:text-black text-white transition-all ml-2"
                title="Copy Email"
                data-cursor="COPY"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
            {copied && (
              <p className="font-mono text-xs text-black font-black">
                ✓ Copied to clipboard!
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-8 pt-4">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-black uppercase font-black flex items-center gap-1.5 hover:underline group"
              data-cursor="GITHUB"
            >
              <span>GitHub</span>
              <ArrowUpRight size={15} />
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-black uppercase font-black flex items-center gap-1.5 hover:underline group"
              data-cursor="LINKEDIN"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Right Column: Terminal Message Form in Inverted Slate Card */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-black/95 text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-black space-y-5">
            <div className="font-mono text-[10px] text-[#ff641c] font-black uppercase tracking-widest border-b border-white/10 pb-3">
              INIT DISPATCH // TRANSMISSION CONSOLE
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] text-gray-400 uppercase font-bold tracking-widest block">
                IDENTIFIER // NAME
              </label>
              <input
                type="text"
                required
                placeholder="YOUR NAME OR ORGANIZATION"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 outline-none focus:border-[#ff641c] text-white font-display text-sm transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] text-gray-400 uppercase font-bold tracking-widest block">
                COORDINATES // EMAIL
              </label>
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 outline-none focus:border-[#ff641c] text-white font-display text-sm transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] text-gray-400 uppercase font-bold tracking-widest block">
                TRANSMISSION // MESSAGE
              </label>
              <textarea
                required
                rows={3}
                placeholder="DETAILS ABOUT YOUR PROJECT OR ROLE..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 outline-none focus:border-[#ff641c] text-white font-display text-sm transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#ff641c] text-black font-display font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl group"
              data-cursor="TRANSMIT"
            >
              <span>SEND TRANSMISSION</span>
              <Send size={15} />
            </button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-400 font-mono text-xs font-bold text-center"
              >
                ✓ Transmission received. Will reach out within 24h.
              </motion.div>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="pt-8 border-t border-black/20 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-black text-white font-display font-black text-xs flex items-center justify-center">
            P
          </div>
          <span className="font-display font-black text-xs text-black">
            PALASH PATHARE // ALL RIGHTS RESERVED
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all shadow-xl"
          title="Back to Top"
          data-cursor="TOP"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};
