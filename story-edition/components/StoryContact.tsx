import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Send, ArrowUp, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export const StoryContact: React.FC = () => {
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
    <section id="story-contact" className="py-24 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid lg:grid-cols-12 gap-16 mb-24">
        {/* Left Column: Statement & Direct Coordinates */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="font-mono text-[10px] text-[#ff641c] uppercase font-bold tracking-widest block mb-2">
              [ 05 ] DISPATCH & INQUIRY
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              LET'S BUILD <br />
              <span className="story-outline">THE EDGE<span className="text-[#ff641c]">.</span></span>
            </h2>
          </div>

          <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-md">
            "It's the one you didn't expect. Not in the spotlight, but out there on the edge." Available for AI engineering, RAG architecture, and full-stack systems design.
          </p>

          {/* Interactive Direct Email Pill */}
          <div className="pt-4 space-y-3">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">
              DIRECT TRANSMISSION
            </span>
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl story-panel border border-white/10 hover:border-[#ff641c] transition-all">
              <Mail size={20} className="text-[#ff641c]" />
              <a
                href={`mailto:${email}`}
                className="font-display font-bold text-lg sm:text-xl text-white hover:text-[#ff641c] transition-colors"
                data-cursor="EMAIL"
              >
                {email}
              </a>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-[#ff641c] hover:text-black text-white transition-all ml-2"
                title="Copy Email"
                data-cursor="COPY"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-[#ff641c] font-bold"
              >
                ✓ Copied to clipboard!
              </motion.p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 pt-6">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-gray-400 hover:text-white uppercase font-bold flex items-center gap-1 group"
              data-cursor="GITHUB"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} className="text-[#ff641c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-gray-400 hover:text-white uppercase font-bold flex items-center gap-1 group"
              data-cursor="LINKEDIN"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={14} className="text-[#ff641c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: Terminal Transmission Form */}
        <div className="lg:col-span-6">
          <form onSubmit={handleSubmit} className="story-panel p-8 sm:p-10 rounded-3xl border border-white/15 space-y-6 relative overflow-hidden">
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-gray-400 uppercase font-bold tracking-widest block">
                IDENTIFIER // YOUR NAME
              </label>
              <input
                type="text"
                required
                placeholder="NAME OR ORGANIZATION"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#ff641c] text-white font-display text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] text-gray-400 uppercase font-bold tracking-widest block">
                COORDINATES // CONTACT EMAIL
              </label>
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#ff641c] text-white font-display text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] text-gray-400 uppercase font-bold tracking-widest block">
                TRANSMISSION // MESSAGE DETAILS
              </label>
              <textarea
                required
                rows={4}
                placeholder="DESCRIBE THE SYSTEM, ROLE, OR COLLABORATION..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#ff641c] text-white font-display text-sm transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#ff641c] text-black font-display font-black text-xs uppercase tracking-widest hover:bg-[#ff7a38] flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,100,28,0.35)] transition-all transform hover:scale-[1.01] active:scale-95 group"
              data-cursor="TRANSMIT"
            >
              <span>SEND TRANSMISSION</span>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-[#ff641c]/10 border border-[#ff641c]/30 rounded-xl text-[#ff641c] font-mono text-xs font-bold text-center"
              >
                ✓ Transmission received. Will respond within 24 hours.
              </motion.div>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <footer className="pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-white text-black font-display font-black text-xs flex items-center justify-center">
            P
          </div>
          <span className="font-display font-black text-sm text-white">
            PALASH PATHARE <span className="text-[#ff641c]">// STORY EDITION</span>
          </span>
        </div>

        <p className="font-mono text-[10px] text-gray-500 uppercase text-center">
          &copy; {new Date().getFullYear()} Designed & Engineered with Motion, Typography, and System Craft.
        </p>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white/5 hover:bg-[#ff641c] hover:text-black text-white border border-white/10 transition-all shadow-lg"
          title="Back to Top"
          data-cursor="TOP"
        >
          <ArrowUp size={16} />
        </button>
      </footer>
    </section>
  );
};
