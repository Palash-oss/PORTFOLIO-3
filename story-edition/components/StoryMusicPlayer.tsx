import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ListMusic, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StoryMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const playlist = [
    { title: "Neural Drift — 120B Latent Flow", tempo: 72 },
    { title: "Dedicated Freight — DFC Rail Wave", tempo: 65 },
    { title: "AST Topologies — Midnight Synthetics", tempo: 80 },
  ];

  // Synthesizer Web Audio API context for zero-asset offline high-fidelity lo-fi ambient audio
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const playSynthesizedAmbientChords = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate a warm analog Lo-Fi pentatonic chord
      const chords = [
        [220, 261.63, 329.63, 392.00], // A min 7
        [174.61, 220.00, 261.63, 329.63], // F maj 7
        [196.00, 246.94, 293.66, 392.00], // G maj
        [164.81, 196.00, 246.94, 293.66]  // E min 7
      ];

      const now = ctx.currentTime;
      const chord = chords[Math.floor(Math.random() * chords.length)];

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Warm analog triangle & sine mix
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Lowpass warm filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);

        // Slow tape-like attack and soft release
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.025, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 5.0);
      });
    } catch {
      // Audio not permitted or supported
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      playSynthesizedAmbientChords();
      intervalRef.current = window.setInterval(() => {
        playSynthesizedAmbientChords();
      }, 4500);
    }
  };

  useEffect(() => {
    let anim: number;
    if (isPlaying) {
      const updateProg = () => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.12));
        anim = requestAnimationFrame(updateProg);
      };
      anim = requestAnimationFrame(updateProg);
    }
    return () => {
      cancelAnimationFrame(anim);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="relative z-30">
      <div className="flex items-center gap-3 bg-[#111115]/90 border border-white/10 hover:border-[#ff641c]/50 p-2 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-xl transition-all shadow-xl">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-[#ff641c] text-black shadow-[0_0_15px_#ff641c]' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isPlaying ? "Pause Ambient Sound" : "Play Ambient Lo-Fi Sound"}
          data-cursor="SOUND"
        >
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Live Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-4 w-4">
          <span className={`w-1 bg-[#ff641c] rounded-full transition-all ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'}`} />
          <span className={`w-1 bg-[#ff641c] rounded-full transition-all ${isPlaying ? 'h-2.5 animate-pulse [animation-delay:0.2s]' : 'h-1.5 opacity-40'}`} />
          <span className={`w-1 bg-[#ff641c] rounded-full transition-all ${isPlaying ? 'h-3.5 animate-pulse [animation-delay:0.4s]' : 'h-1.5 opacity-40'}`} />
        </div>

        {/* Track Label & Progress */}
        <div className="hidden sm:flex flex-col min-w-[140px] max-w-[200px]">
          <span className="font-mono text-[9px] text-[#ff641c] uppercase font-bold tracking-wider flex items-center gap-1">
            <Sparkles size={10} /> {isPlaying ? "PLAYING AUDIO" : "PRESS PLAY"}
          </span>
          <span className="font-display text-xs text-white truncate font-medium">
            {playlist[currentTrackIndex].title}
          </span>
          {/* Progress Puck Track */}
          <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-white to-[#ff641c] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Playlist Drawer Toggle */}
        <button
          onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Toggle Track List"
          data-cursor="LIST"
        >
          <ListMusic size={16} />
        </button>
      </div>

      {/* Playlist Dropdown Drawer */}
      <AnimatePresence>
        {isPlaylistOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-14 w-64 bg-[#111116] border border-white/15 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl z-50 space-y-1.5"
          >
            <div className="font-mono text-[9px] text-[#ff641c] font-bold uppercase tracking-widest px-2 py-1 border-b border-white/10">
              AMBIENT SOUNDTRACK
            </div>
            {playlist.map((track, i) => (
              <button
                key={track.title}
                onClick={() => {
                  setCurrentTrackIndex(i);
                  setIsPlaying(true);
                  playSynthesizedAmbientChords();
                }}
                className={`w-full text-left px-2.5 py-2 rounded-xl font-display text-xs flex items-center justify-between transition-colors ${
                  currentTrackIndex === i ? 'bg-[#ff641c]/15 text-[#ff641c] font-bold' : 'text-gray-300 hover:bg-white/5'
                }`}
                data-cursor="TRACK"
              >
                <span className="truncate">{track.title}</span>
                <span className="font-mono text-[9px] text-gray-500">{track.tempo} BPM</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
