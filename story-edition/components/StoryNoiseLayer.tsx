import React, { useEffect, useRef } from 'react';

export const StoryNoiseLayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Generate low-cost pre-rendered noise grain buffer
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 160;
    patternCanvas.height = 160;
    const patternCtx = patternCanvas.getContext('2d');
    const pData = patternCtx?.createImageData(160, 160);

    let frame = 0;
    const render = () => {
      frame++;
      // Throttle noise generation to every 3rd frame (~20fps) for organic film-grain look and 0 CPU burden
      if (frame % 3 === 0 && patternCtx && pData) {
        const d = pData.data;
        for (let i = 0; i < d.length; i += 4) {
          const val = Math.random() * 255;
          d[i] = val;
          d[i + 1] = val;
          d[i + 2] = val;
          d[i + 3] = 22; // Low subtle alpha
        }
        patternCtx.putImageData(pData, 0, 0);

        ctx.clearRect(0, 0, width, height);
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="site-noise-layer"
      aria-hidden="true"
    />
  );
};
