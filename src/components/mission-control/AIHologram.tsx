import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
  type: "bloom" | "energy" | "ring";
}

interface AIHologramProps {
  state: "idle" | "thinking" | "responding";
  compact?: boolean;
}

const AIHologram = ({ state, compact = false }: AIHologramProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  const createParticle = useCallback((cx: number, cy: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 80;
    const type = Math.random() < 0.3 ? "bloom" : Math.random() < 0.6 ? "energy" : "ring";
    return {
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.2,
      size: type === "bloom" ? 3 + Math.random() * 4 : 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
      hue: type === "bloom" ? 155 + Math.random() * 30 : 200 + Math.random() * 40,
      life: 0,
      maxLife: 120 + Math.random() * 180,
      type,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = compact ? 180 : 300;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    // Init particles
    particlesRef.current = Array.from({ length: compact ? 15 : 30 }, () => createParticle(cx, cy));

    let animId: number;
    const draw = () => {
      timeRef.current += 0.016;
      frameRef.current++;
      ctx.clearRect(0, 0, size, size);

      const t = timeRef.current;
      const pulseBase = state === "thinking" ? 0.6 + Math.sin(t * 4) * 0.4 : state === "responding" ? 0.8 + Math.sin(t * 2) * 0.2 : 0.4 + Math.sin(t * 0.8) * 0.15;

      // Outer rings
      const ringCount = compact ? 2 : 3;
      for (let i = 0; i < ringCount; i++) {
        const r = 35 + i * 22 + Math.sin(t * (1 + i * 0.3)) * 4;
        const rot = t * (0.3 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 1.5);
        ctx.strokeStyle = `hsla(${200 + i * 20}, 70%, 60%, ${0.15 + pulseBase * 0.15})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
        ctx.restore();
      }

      // Core glow
      const coreRadius = compact ? 22 : 35;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius + 15);
      gradient.addColorStop(0, `hsla(210, 80%, 65%, ${0.3 * pulseBase})`);
      gradient.addColorStop(0.5, `hsla(228, 60%, 55%, ${0.15 * pulseBase})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius + 15, 0, Math.PI * 2);
      ctx.fill();

      // Inner hologram shape - hexagon
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.2);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const r = coreRadius + Math.sin(t * 2 + i) * 3;
        if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.strokeStyle = `hsla(228, 60%, 65%, ${0.4 + pulseBase * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = `hsla(228, 50%, 55%, ${0.05 + pulseBase * 0.05})`;
      ctx.fill();
      ctx.restore();

      // HB text in center
      ctx.save();
      ctx.font = `${compact ? "bold 14px" : "bold 20px"} 'Inter', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `hsla(210, 80%, 75%, ${0.6 + pulseBase * 0.4})`;
      ctx.shadowColor = `hsla(210, 80%, 60%, ${pulseBase * 0.6})`;
      ctx.shadowBlur = 12;
      ctx.fillText("HB", cx, cy);
      ctx.restore();

      // Energy flare on responding
      if (state === "responding") {
        const flareR = 50 + Math.sin(t * 3) * 20;
        const flareGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, flareR);
        flareGrad.addColorStop(0, `hsla(180, 70%, 60%, ${0.08 + Math.sin(t * 5) * 0.04})`);
        flareGrad.addColorStop(1, "transparent");
        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, flareR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Bloom particles converge when responding
        if (state === "responding" && p.type === "bloom") {
          p.vx += (cx - p.x) * 0.002;
          p.vy += (cy - p.y) * 0.002;
        }

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = Math.max(1 - (lifeRatio - 0.7) / 0.3, 0);
        const alpha = p.opacity * fadeIn * (lifeRatio > 0.7 ? fadeOut : 1);

        if (p.type === "bloom") {
          // Flower-like particle
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(t + p.life * 0.02);
          for (let j = 0; j < 5; j++) {
            const pa = (Math.PI * 2 / 5) * j;
            ctx.beginPath();
            ctx.ellipse(Math.cos(pa) * p.size * 0.5, Math.sin(pa) * p.size * 0.5, p.size * 0.4, p.size * 0.2, pa, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 50%, 65%, ${alpha * 0.6})`;
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue - 10}, 60%, 75%, ${alpha})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 60%, 65%, ${alpha * 0.5})`;
          ctx.fill();
        }

        if (p.life >= p.maxLife) {
          particles[i] = createParticle(cx, cy);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [state, compact, createParticle]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: compact ? 180 : 300, height: compact ? 180 : 300 }}
      />
      {/* Status indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          <div className={`w-1.5 h-1.5 rounded-full ${
            state === "responding" ? "bg-emerald-400 animate-pulse" :
            state === "thinking" ? "bg-amber-400 animate-pulse" :
            "bg-cyan-400/60"
          }`} />
          <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">
            {state === "responding" ? "Responding" : state === "thinking" ? "Thinking" : "Online"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIHologram;
