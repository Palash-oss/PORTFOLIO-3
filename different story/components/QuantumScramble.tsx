/**
 * QuantumScramble.tsx
 * Quantum / Matrix character decrypt scrambler for AI/ML engineering aesthetics.
 * Scrambles characters through numbers, hex, binary and quantum glyphs before locking in.
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';

const QUANTUM_GLYPHS = '01234567890101λ∑∆µ_/#Ø§ΨΞΩ0x7F';

interface QuantumRoleProps {
  role?: string;
  roles?: string[];
  className?: string;
}

export const QuantumRole: React.FC<QuantumRoleProps> = ({
  role,
  roles,
  className = '',
}) => {
  const targetText = role || (roles && roles[0]) || 'AI / ML ENGINEER & FULL-STACK DEVELOPER';
  const [displayText, setDisplayText] = useState(targetText);
  const animFrameRef = useRef<number>(0);
  const hasDecodedRef = useRef(false);

  const decodeToText = useCallback((target: string, duration = 800) => {
    const startTime = performance.now();
    const targetLen = target.length;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Accelerate towards lock
      const lockedCount = Math.floor(Math.pow(progress, 1.15) * targetLen);

      let result = '';
      for (let i = 0; i < targetLen; i++) {
        const ch = target[i];
        if (ch === ' ' || ch === '/' || ch === '&' || ch === '.') {
          result += ch;
        } else if (i < lockedCount) {
          result += ch;
        } else if (i < lockedCount + 3 && progress < 0.94) {
          // Quantum glyph flicker
          result += QUANTUM_GLYPHS[Math.floor(Math.random() * QUANTUM_GLYPHS.length)];
        } else {
          // Numbers during decode
          result += String(Math.floor(Math.random() * 10));
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(frame);
      } else {
        setDisplayText(target);
      }
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(frame);
  }, []);

  // Run once after loader exit to reveal final text
  useEffect(() => {
    if (hasDecodedRef.current) return;
    hasDecodedRef.current = true;

    const timer = setTimeout(() => {
      decodeToText(targetText, 850);
    }, 1100);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetText, decodeToText]);

  const handleInteraction = () => {
    decodeToText(targetText, 450);
  };

  return (
    <span
      className={className}
      onMouseEnter={handleInteraction}
      onClick={handleInteraction}
      style={{ cursor: 'pointer', display: 'inline-block' }}
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
