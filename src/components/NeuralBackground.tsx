"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const isMobile = () => window.innerWidth < 768;

    const getConfig = () => ({
      PARTICLE_COUNT: isMobile() ? 40 : 90,
      MAX_DIST: isMobile() ? 100 : 140,
      MOUSE_RADIUS: isMobile() ? 80 : 130,
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // re-init particles on resize to fit new dimensions
      const cfg = getConfig();
      // clamp existing particles, remove extras
      while (particles.length > cfg.PARTICLE_COUNT) particles.pop();
      // add missing particles
      while (particles.length < cfg.PARTICLE_COUNT) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { MAX_DIST, MOUSE_RADIUS } = getConfig();
      const isDark = resolvedTheme !== "light";
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < MOUSE_RADIUS && distM > 0) {
          const force = ((MOUSE_RADIUS - distM) / MOUSE_RADIUS) * 0.35;
          p.vx += (dxm / distM) * force;
          p.vy += (dym / distM) * force;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 2.5) {
          p.vx = (p.vx / spd) * 2.5;
          p.vy = (p.vy / spd) * 2.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        if (isDark) {
          grd.addColorStop(0, `rgba(139,92,246,${p.opacity})`);
          grd.addColorStop(1, `rgba(99,102,241,0)`);
        } else {
          grd.addColorStop(0, `rgba(67,56,202,${p.opacity})`);
          grd.addColorStop(1, `rgba(99,102,241,0)`);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * (isDark ? 0.25 : 0.3);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(139,92,246,${alpha})`
              : `rgba(67,56,202,${alpha})`;
            ctx.lineWidth = isDark ? 0.7 : 0.9;
            ctx.stroke();
          }
        }

        const dxm2 = particles[i].x - mx;
        const dym2 = particles[i].y - my;
        const distM2 = Math.sqrt(dxm2 * dxm2 + dym2 * dym2);
        if (distM2 < MOUSE_RADIUS * 1.5) {
          const alpha2 = (1 - distM2 / (MOUSE_RADIUS * 1.5)) * (isDark ? 0.55 : 0.55);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = isDark
            ? `rgba(167,139,250,${alpha2})`
            : `rgba(67,56,202,${alpha2})`;
          ctx.lineWidth = isDark ? 0.5 : 0.7;
          ctx.stroke();
        }
      }

      if (mx > -900) {
        const grdM = ctx.createRadialGradient(mx, my, 0, mx, my, 8);
        grdM.addColorStop(0, isDark ? "rgba(167,139,250,0.8)" : "rgba(67,56,202,0.85)");
        grdM.addColorStop(1, "rgba(99,102,241,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 8, 0, Math.PI * 2);
        ctx.fillStyle = grdM;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse events
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Touch events for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
    const onTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
