/**
 * QuantumScramble.tsx
 * Quantum / Matrix character decrypt scrambler for AI/ML engineering aesthetics.
 * Scrambles characters through numbers, hex, binary and quantum glyphs before locking in.
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';

const QUANTUM_GLYPHS = '01234567890101λ∑∆µ_/#Ø§ΨΞΩ0x7F';

interface QuantumRoleProps {
  roles?: string[];
  className?: string;
  interval?: number;
}

export const QuantumRole: React.FC<QuantumRoleProps> = ({
  roles = [
    'AI / ML ENGINEER & FULL-STACK DEVELOPER',
    'PRODUCTION RAG PIPELINE ARCHITECT',
    'NEURAL SYSTEMS & BRUTALIST RUNTIMES',
    'DISTRIBUTED INTELLIGENCE SPECIALIST',
  ],
  className = '',
  interval = 6000,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const isScramblingRef = useRef(false);
  const animFrameRef = useRef<number>(0);

  const scrambleTo = useCallback((targetText: string) => {
    isScramblingRef.current = true;
    const startTime = performance.now();
    const duration = 1100; // ms
    const targetLen = targetText.length;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Number of characters locked in
      const lockedCount = Math.floor(progress * targetLen);

      let result = '';
      for (let i = 0; i < targetLen; i++) {
        if (targetText[i] === ' ' || targetText[i] === '/' || targetText[i] === '&') {
          result += targetText[i];
        } else if (i < lockedCount) {
          result += targetText[i];
        } else if (i < lockedCount + 4 && progress < 0.95) {
          // Rapidly flickering quantum numbers/symbols
          const char = QUANTUM_GLYPHS[Math.floor(Math.random() * QUANTUM_GLYPHS.length)];
          result += char;
        } else {
          // Numbers cycling
          const char = String(Math.floor(Math.random() * 10));
          result += char;
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(frame);
      } else {
        setDisplayText(targetText);
        isScramblingRef.current = false;
      }
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(frame);
  }, []);

  // Cycle through roles after loader finishes
  useEffect(() => {
    let timer: any;
    const initialDelay = setTimeout(() => {
      timer = setInterval(() => {
        setRoleIndex((prev) => {
          const next = (prev + 1) % roles.length;
          scrambleTo(roles[next]);
          return next;
        });
      }, interval);
    }, 4500);

    return () => {
      clearTimeout(initialDelay);
      if (timer) clearInterval(timer);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [roles, interval, scrambleTo]);

  return (
    <span
      className={className}
      onMouseEnter={() => scrambleTo(roles[roleIndex])}
      style={{ cursor: 'pointer', display: 'inline-block' }}
      title="Quantum Decoherence Active — Click or Hover to Scramble"
    >
      {displayText}
    </span>
  );
};

interface QuantumBioProps {
  text: string;
  className?: string;
}

export const QuantumBio: React.FC<QuantumBioProps> = ({ text, className = '' }) => {
  // Split into words for localized quantum hover
  const words = useMemoWords(text);

  return (
    <p className={className} style={{ opacity: 1, transform: 'none' }}>
      {words.map((w, idx) => (
        <QuantumWord key={idx} word={w} />
      ))}
    </p>
  );
};

const QuantumWord: React.FC<{ word: string }> = ({ word }) => {
  const [display, setDisplay] = useState(word);
  const animRef = useRef<number>(0);

  const handleHover = () => {
    const startTime = performance.now();
    const duration = 500;
    const len = word.length;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const locked = Math.floor(p * len);

      let scrambled = '';
      for (let i = 0; i < len; i++) {
        if (/[\s,.\-]/.test(word[i])) {
          scrambled += word[i];
        } else if (i < locked) {
          scrambled += word[i];
        } else {
          scrambled += String(Math.floor(Math.random() * 10));
        }
      }

      setDisplay(scrambled);
      if (p < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(word);
      }
    };

    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(tick);
  };

  return (
    <span
      onMouseEnter={handleHover}
      style={{
        display: 'inline-block',
        marginRight: '0.32em',
        transition: 'color 0.2s',
      }}
      className="quantum-hover-word"
    >
      {display}
    </span>
  );
};

function useMemoWords(fullText: string) {
  return React.useMemo(() => fullText.split(' '), [fullText]);
}
