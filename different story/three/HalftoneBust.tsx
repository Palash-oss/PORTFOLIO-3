/**
 * HalftoneBust.tsx
 * High-performance interactive particle canvas reproducing Palash's blindfolded statue
 * with neural synaptic pulses, laser crimson blindfold, and quantum dispersion physics.
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';

interface ColorBatch {
  color: string;
  startIndex: number;
  count: number;
}

interface HalftoneBustProps {
  progressRef: React.MutableRefObject<number>;
  ripplePosRef?: React.MutableRefObject<{ x: number; y: number }>;
  rippleStrengthRef?: React.MutableRefObject<number>;
}

export const HalftoneBustCanvas: React.FC<HalftoneBustProps> = ({
  progressRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const debugTex = useMemo(() => {
    return typeof window !== 'undefined' && window.location.search.includes('debug=tex');
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) {
      setErrorMsg('Failed to create 2D canvas context');
      return;
    }

    let isDisposed = false;
    let animId = 0;
    let isAnimating = false;
    let isVisible = true;

    // Physics arrays
    let totalParticles = 0;
    let posX: Float32Array;
    let posY: Float32Array;
    let targetX: Float32Array;
    let targetY: Float32Array;
    let velX: Float32Array;
    let velY: Float32Array;
    let energy: Float32Array; // 0 to 1 for quantum dispersion glow
    let isBlindfoldArr: Uint8Array; // 1 if particle belongs to ornamental blindfold
    let batches: ColorBatch[] = [];

    // Pointer state in CSS pixels
    const mouse = { x: -1000, y: -1000 };
    let lastClientX: number | null = null;
    let lastClientY: number | null = null;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    // User's blindfolded statue cutout with alpha
    img.src = '/blindfold_cutout.png';

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Scroll fade
      const scrollProgress = progressRef.current || 0;
      const scrollFade = Math.max(0, 1 - scrollProgress * 3.0);
      ctx.globalAlpha = scrollFade;

      if (debugTex) {
        // Draw raw image centered
        const nw = img.naturalWidth || 1;
        const nh = img.naturalHeight || 1;
        const scale = Math.min(width / nw, height / nh) * 0.95;
        const sw = nw * scale;
        const sh = nh * scale;
        ctx.save();
        ctx.drawImage(img, (width - sw) / 2, (height - sh) / 2, sw, sh);
        ctx.restore();
        ctx.globalAlpha = 1;
        return;
      }

      const pSize = 2.2;
      const tau = Math.PI * 2;

      // 1. Draw base batched particles
      for (let b = 0; b < batches.length; b++) {
        const batch = batches[b];
        ctx.fillStyle = batch.color;
        ctx.beginPath();
        const end = batch.startIndex + batch.count;
        for (let i = batch.startIndex; i < end; i++) {
          // If particle has high energy from quantum disturbance, skip here and draw in energy pass
          if (energy[i] > 0.15) continue;
          const px = posX[i];
          const py = posY[i];
          ctx.moveTo(px + pSize, py);
          ctx.arc(px, py, pSize, 0, tau);
        }
        ctx.fill();
      }

      // 2. Draw energized particles (quantum scatter glow: laser crimson / warm electric amber)
      let hasEnergized = false;
      for (let i = 0; i < totalParticles; i++) {
        if (energy[i] > 0.15) {
          if (!hasEnergized) {
            hasEnergized = true;
            ctx.fillStyle = '#FF2A14'; // Laser Crimson
            ctx.beginPath();
          }
          const px = posX[i];
          const py = posY[i];
          const eSize = pSize * (1 + energy[i] * 0.4);
          ctx.moveTo(px + eSize, py);
          ctx.arc(px, py, eSize, 0, tau);
        }
      }
      if (hasEnergized) {
        ctx.fill();
      }

      // 3. Neural Synaptic Pulse Wave
      const time = performance.now() * 0.001;
      const pulsePeriod = 3.6; // seconds
      const pulseProg = (time % pulsePeriod) / pulsePeriod;
      // Wave travels downwards from crown of head to neck
      const waveY = pulseProg * (height * 1.15) - height * 0.08;

      ctx.fillStyle = 'rgba(255, 42, 20, 0.72)'; // Electric Laser Crimson wave
      ctx.beginPath();
      let waveDrawn = false;
      for (let i = 0; i < totalParticles; i += 2) {
        const py = posY[i];
        const dist = Math.abs(py - waveY);
        if (dist < 26) {
          waveDrawn = true;
          const px = posX[i];
          const wSize = pSize * 1.15;
          ctx.moveTo(px + wSize, py);
          ctx.arc(px, py, wSize, 0, tau);
        }
      }
      if (waveDrawn) {
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const updatePhysics = (): boolean => {
      const curX = mouse.x;
      const curY = mouse.y;
      const hasPointer = curX !== -1000 && curY !== -1000;
      let hasMovement = false;

      const dispersionStrength = 5.2;
      const returnSpeed = 0.08;
      const damping = 0.85;
      const radius = 125;
      const radiusSq = radius * radius;

      for (let i = 0; i < totalParticles; i++) {
        let px = posX[i];
        let py = posY[i];
        let vx = velX[i];
        let vy = velY[i];
        let e = energy[i];

        if (hasPointer) {
          const dx = curX - px;
          const dy = curY - py;
          if (dx > -radius && dx < radius && dy > -radius && dy < radius) {
            const distSq = dx * dx + dy * dy;
            if (distSq < radiusSq && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const force = (radius - dist) / radius;
              const nx = dx / dist;
              const ny = dy / dist;
              vx -= nx * force * dispersionStrength;
              vy -= ny * force * dispersionStrength;
              e = Math.min(1.0, e + force * 0.9);
            }
          }
        }

        // Decay quantum disturbance energy
        if (e > 0.01) {
          e *= 0.88;
        } else {
          e = 0;
        }
        energy[i] = e;

        const tx = targetX[i];
        const ty = targetY[i];

        // Spring return to home position
        vx += (tx - px) * returnSpeed;
        vy += (ty - py) * returnSpeed;
        vx *= damping;
        vy *= damping;
        px += vx;
        py += vy;

        posX[i] = px;
        posY[i] = py;
        velX[i] = vx;
        velY[i] = vy;

        if (
          !hasMovement &&
          (Math.abs(vx) > 0.05 ||
            Math.abs(vy) > 0.05 ||
            Math.abs(tx - px) > 0.1 ||
            Math.abs(ty - py) > 0.1 ||
            e > 0.05)
        ) {
          hasMovement = true;
        }
      }

      // Always keep neural pulse running if page is visible
      return hasMovement || hasPointer || true;
    };

    const loop = () => {
      if (!isAnimating || isDisposed) return;
      const active = updatePhysics();
      render();
      if (active && isVisible) {
        animId = requestAnimationFrame(loop);
      } else {
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      if (isDisposed || !isVisible || isAnimating) return;
      isAnimating = true;
      animId = requestAnimationFrame(loop);
    };

    const buildParticles = () => {
      if (isDisposed) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (debugTex) {
        render();
        return;
      }

      // Offscreen extraction
      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      const nw = img.naturalWidth || 1;
      const nh = img.naturalHeight || 1;
      // Contain fit with scale so bust dominates the left hero space
      const fitScale = Math.min(canvas.width / nw, canvas.height / nh) * 0.98;
      const sw = nw * fitScale;
      const sh = nh * fitScale;

      offCtx.save();
      // Draw centered in hero area
      offCtx.drawImage(
        img,
        (canvas.width - sw) / 2,
        (canvas.height - sh) / 2,
        sw,
        sh
      );
      offCtx.restore();

      const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Density step in CSS pixels
      const density = 6.4;
      const step = Math.max(1, Math.floor(density * dpr));
      const extracted: { x: number; y: number; color: string; isBf: boolean }[] = [];

      for (let y = 0; y < imgData.height; y += step) {
        for (let x = 0; x < imgData.width; x += step) {
          const idx = (y * imgData.width + x) * 4;
          const a = data[idx + 3] || 0;
          if (a > 120) {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Blindfold detection (ornamental red headband across eyes)
            const isBlindfold = (r > 32 && r > g * 1.35 && r > b * 1.05) ||
              (y > canvas.height * 0.26 && y < canvas.height * 0.42 && r > 28 && (r - g) > 8);

            let colorStr: string;
            if (isBlindfold) {
              // Glowing Laser Crimson for blindfold
              colorStr = '#FF2A14';
            } else {
              // Bronze/charcoal with gamma curve so face and armor contours pop
              const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
              const boosted = Math.pow(lum / 255.0, 0.72) * 255;
              const factor = boosted / (lum + 1e-4);
              const cr = Math.min(240, Math.max(26, Math.floor(r * factor)));
              const cg = Math.min(238, Math.max(26, Math.floor(g * factor)));
              const cb = Math.min(230, Math.max(24, Math.floor(b * factor)));
              colorStr = `rgb(${cr},${cg},${cb})`;
            }

            extracted.push({
              x: x / dpr,
              y: y / dpr,
              color: colorStr,
              isBf: isBlindfold,
            });
          }
        }
      }

      totalParticles = extracted.length;
      if (totalParticles === 0) return;

      // Sort by color to batch draw calls for maximum 60fps performance
      extracted.sort((a, b) => (a.color > b.color ? 1 : -1));

      posX = new Float32Array(totalParticles);
      posY = new Float32Array(totalParticles);
      targetX = new Float32Array(totalParticles);
      targetY = new Float32Array(totalParticles);
      velX = new Float32Array(totalParticles);
      velY = new Float32Array(totalParticles);
      energy = new Float32Array(totalParticles);
      isBlindfoldArr = new Uint8Array(totalParticles);
      batches = [];

      let currentColor = '';
      let batchStart = 0;

      for (let i = 0; i < totalParticles; i++) {
        const p = extracted[i];
        targetX[i] = p.x;
        targetY[i] = p.y;
        posX[i] = p.x + (Math.random() - 0.5) * 6;
        posY[i] = p.y + (Math.random() - 0.5) * 6;
        velX[i] = 0;
        velY[i] = 0;
        energy[i] = 0;
        isBlindfoldArr[i] = p.isBf ? 1 : 0;

        if (p.color !== currentColor) {
          if (currentColor !== '') {
            batches.push({
              color: currentColor,
              startIndex: batchStart,
              count: i - batchStart,
            });
          }
          currentColor = p.color;
          batchStart = i;
        }
      }

      if (currentColor !== '') {
        batches.push({
          color: currentColor,
          startIndex: batchStart,
          count: totalParticles - batchStart,
        });
      }

      render();
      startAnimation();
    };

    const handlePointerCoord = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      startAnimation();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientX !== lastClientX || e.clientY !== lastClientY) {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        handlePointerCoord(e.clientX, e.clientY);
      }
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      lastClientX = null;
      lastClientY = null;
      startAnimation();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handlePointerCoord(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onScroll = () => {
      render();
    };

    img.onload = () => {
      if (isDisposed) return;
      try {
        const scratch = document.createElement('canvas');
        scratch.width = img.naturalWidth || 1;
        scratch.height = img.naturalHeight || 1;
        const sCtx = scratch.getContext('2d', { willReadFrequently: true });
        if (!sCtx) {
          setErrorMsg('Failed to validate bust alpha cutout');
          return;
        }
        sCtx.drawImage(img, 0, 0);
        const data = sCtx.getImageData(0, 0, Math.min(100, scratch.width), Math.min(100, scratch.height)).data;
        let hasAlpha = false;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 20) {
            hasAlpha = true;
            break;
          }
        }
        if (!hasAlpha) {
          setErrorMsg('DEV ERROR: /public/blindfold_cutout.png has NO alpha cutout. Aborted.');
          return;
        }
      } catch (err: any) {
        console.warn('Alpha validation skipped:', err.message);
      }

      buildParticles();
    };

    img.onerror = () => {
      if (!isDisposed) {
        if (!img.src.includes('bust.png')) {
          img.src = '/bust.png';
        } else {
          setErrorMsg('DEV ERROR: /public/blindfold_cutout.png and /public/bust.png failed to load. Halftone grid disabled.');
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      buildParticles();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = !!entry?.isIntersecting;
        if (isVisible) startAnimation();
      },
      { rootMargin: '60px' }
    );
    intersectionObserver.observe(container);

    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave, { passive: true });
    canvas.addEventListener('touchstart', onTouchMove, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onMouseLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouchMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [debugTex]);

  return (
    <div
      ref={containerRef}
      className="hero-canvas-wrap"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    >
      {errorMsg ? (
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            backgroundColor: 'rgba(210, 60, 40, 0.95)',
            color: '#fff',
            padding: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            lineHeight: 1.6,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '4px',
          }}
        >
          <strong style={{ fontSize: '13px', marginBottom: '8px' }}>BUST TEXTURE ERROR</strong>
          {errorMsg}
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Portrait of Palash Pathare with blindfold rendered as interactive neural particles"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            touchAction: 'pan-y',
          }}
        />
      )}
    </div>
  );
};

export default HalftoneBustCanvas;
