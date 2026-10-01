import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const StoryCursor: React.FC = () => {
  const [hoverState, setHoverState] = useState<{ isHovered: boolean; text?: string }>({
    isHovered: false,
    text: '',
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.25 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], .cursor-pointer');
      if (interactive) {
        const customText = interactive.getAttribute('data-cursor');
        const isBtn = interactive.tagName === 'BUTTON' || interactive.tagName === 'A';
        setHoverState({
          isHovered: true,
          text: customText || (isBtn ? 'OPEN' : ''),
        });
      } else {
        setHoverState({ isHovered: false, text: '' });
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none z-[999999]">
      {/* Orange Center Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#ff641c] pointer-events-none shadow-[0_0_10px_#ff641c] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverState.isHovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Brutalist Orbit Ring */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full pointer-events-none flex items-center justify-center will-change-transform"
        animate={{
          width: hoverState.text ? 70 : hoverState.isHovered ? 44 : 28,
          height: hoverState.text ? 70 : hoverState.isHovered ? 44 : 28,
          borderColor: hoverState.isHovered ? '#ff641c' : 'rgba(219, 219, 218, 0.4)',
          backgroundColor: hoverState.isHovered ? 'rgba(255, 100, 28, 0.08)' : 'transparent',
        }}
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 340 }}
      >
        {hoverState.text && (
          <span className="font-mono text-[8px] font-bold text-[#ff641c] tracking-widest uppercase text-center px-1">
            {hoverState.text}
          </span>
        )}
      </motion.div>
    </div>
  );
};
