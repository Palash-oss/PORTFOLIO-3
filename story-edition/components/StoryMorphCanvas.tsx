import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  origX: number;
  origY: number;
  origZ: number;
}

export const StoryMorphCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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

    // Generate 3D Geodesic Icosahedron / Neural Lattice nodes
    const nodes: Point3D[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseRadius = Math.min(width, height) * 0.22;

    const rawVertices = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1],
      // Extra inner neural core points
      [-0.5, 0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, -0.5, -0.5]
    ];

    for (const v of rawVertices) {
      const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      const x = (v[0] / len) * baseRadius;
      const y = (v[1] / len) * baseRadius;
      const z = (v[2] / len) * baseRadius;
      nodes.push({ x, y, z, origX: x, origY: y, origZ: z });
    }

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollMorph = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / width - 0.5) * 2;
      const my = (e.clientY / height - 0.5) * 2;
      targetRotY = mx * 0.8;
      targetRotX = -my * 0.8;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollMorph = progress * Math.PI * 4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.015;
      rotX += (targetRotX - rotX) * 0.05 + 0.003;
      rotY += (targetRotY - rotY) * 0.05 + 0.005;

      ctx.clearRect(0, 0, width, height);

      // Center coords in right portion on desktop, centered on mobile
      const centerX = width > 1024 ? width * 0.65 : width * 0.5;
      const centerY = height * 0.45;

      // Project and transform nodes
      const projected: { x: number; y: number; z: number; scale: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        
        // Harmonic morphing based on scroll progress and time
        const morphFactor = Math.sin(time * 2 + i * 0.4 + scrollMorph) * 0.28;
        const currentRadius = 1 + morphFactor;

        let px = n.origX * currentRadius;
        let py = n.origY * currentRadius;
        let pz = n.origZ * currentRadius;

        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;

        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        // 3D Perspective Projection
        const fov = 450;
        const perspective = fov / (fov + z2);

        projected.push({
          x: centerX + x1 * perspective,
          y: centerY + y2 * perspective,
          z: z2,
          scale: perspective,
        });
      }

      // Draw Connective Wireframe Edges
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Threshold for drawing wireframe edges
          if (dist < baseRadius * 1.35) {
            const alpha = Math.max(0, 1 - dist / (baseRadius * 1.35));
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Highlight close foreground edges with safety orange glow
            if (p1.z > 0 && p2.z > 0) {
              ctx.strokeStyle = `rgba(255, 100, 28, ${alpha * 0.45})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(219, 219, 218, ${alpha * 0.14})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Vertex Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const radius = Math.max(1.8, 3.2 * p.scale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        if (p.z > 0) {
          // Foreground nodes in Electric Safety Orange
          ctx.fillStyle = '#ff641c';
          ctx.shadowColor = 'rgba(255, 100, 28, 0.9)';
          ctx.shadowBlur = 8;
        } else {
          // Background nodes in Stone White
          ctx.fillStyle = 'rgba(219, 219, 218, 0.4)';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
