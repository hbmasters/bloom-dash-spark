import { useEffect, useRef, useCallback } from "react";
import { flowerDrawers, FlowerType, FLOWER_TYPES, FLOWER_WEIGHTS } from "../mission-control/flowerRenderers";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; life: number; maxLife: number;
  type: FlowerType; rotation: number; rotSpeed: number;
  orbitAngle: number; orbitSpeed: number; orbitRadius: number;
}

interface MiniHologramProps {
  state: "idle" | "speaking";
  accentHsl: string;
  size?: number;
}

const MiniHologram = ({ state, accentHsl, size = 120 }: MiniHologramProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  const pickFlowerType = useCallback((): FlowerType => {
    let r = Math.random(), cumul = 0;
    for (let i = 0; i < FLOWER_WEIGHTS.length; i++) {
      cumul += FLOWER_WEIGHTS[i];
      if (r < cumul) return FLOWER_TYPES[i];
    }
    return FLOWER_TYPES[0];
  }, []);

  const createParticle = useCallback((cx: number, cy: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const maxR = size * 0.42;
    const dist = 10 + Math.random() * maxR;
    const type = pickFlowerType();
    const small = ["craspedia", "babybreath", "lavender", "eucalyptus"].includes(type as string);
    const baseSize = small ? 1.5 + Math.random() * 2 : 2.5 + Math.random() * 4;

    return {
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05 - 0.02,
      size: baseSize * (size / 120), // scale with canvas size
      opacity: 0.35 + Math.random() * 0.5,
      life: Math.random() * 100,
      maxLife: 200 + Math.random() * 250,
      type,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      orbitAngle: angle,
      orbitSpeed: (0.002 + Math.random() * 0.005) * (Math.random() < 0.5 ? 1 : -1),
      orbitRadius: dist,
    };
  }, [pickFlowerType, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const cx = size / 2;
    const cy = size / 2;

    // Scale particle count with size
    const particleCount = Math.max(20, Math.round((size / 120) * 80));
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(cx, cy));

    let animId: number;
    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      ctx.clearRect(0, 0, size, size);

      const isSpeaking = state === "speaking";
      const spinMul = isSpeaking ? 2.5 : 1;
      const pulse = isSpeaking
        ? 0.7 + Math.sin(t * 3) * 0.3
        : 0.35 + Math.sin(t * 0.8) * 0.15;

      // === HUD RINGS ===
      // Outer dashed arc segments
      for (let i = 0; i < 2; i++) {
        const r = size * (0.43 + i * 0.04);
        const rot = t * (0.08 + i * 0.04) * spinMul * (i % 2 === 0 ? 1 : -1);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        for (let j = 0; j < 3; j++) {
          const startA = (Math.PI * 2 / 3) * j + 0.15;
          const endA = startA + 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, r, startA, endA);
          ctx.strokeStyle = `hsla(${accentHsl}, ${0.06 + pulse * 0.08 - i * 0.015})`;
          ctx.lineWidth = 1 - i * 0.3;
          ctx.setLineDash([3 + i * 2, 5 + i * 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.restore();
      }

      // Tick marks (only for larger sizes)
      if (size >= 80) {
        const tickCount = Math.round(size / 4);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.02 * spinMul);
        for (let i = 0; i < tickCount; i++) {
          const a = (Math.PI * 2 / tickCount) * i;
          const isMajor = i % 5 === 0;
          const inner = size * (isMajor ? 0.39 : 0.41);
          const outer = size * 0.43;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
          ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
          ctx.strokeStyle = `hsla(${accentHsl}, ${isMajor ? 0.15 + pulse * 0.1 : 0.06})`;
          ctx.lineWidth = isMajor ? 0.8 : 0.3;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Scanning rings
      for (let i = 0; i < 3; i++) {
        const r = size * (0.15 + i * 0.1) + Math.sin(t * (0.8 + i * 0.2)) * 2;
        const rot = t * (0.12 + i * 0.06) * spinMul * (i % 2 === 0 ? 1 : -1);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * (1.0 + i * 0.2));
        ctx.strokeStyle = `hsla(${accentHsl}, ${0.06 + pulse * 0.07})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2 + i, 5 + i]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Corner brackets (medium+ sizes)
      if (size >= 100) {
        const bracketSize = size * 0.06;
        const bracketOffset = size * 0.38;
        const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.04 * spinMul);
        for (const [dx, dy] of corners) {
          const bx = dx * bracketOffset;
          const by = dy * bracketOffset;
          ctx.beginPath();
          ctx.moveTo(bx, by + dy * -bracketSize);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + dx * -bracketSize, by);
          ctx.strokeStyle = `hsla(${accentHsl}, ${0.12 + pulse * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      // === FLOWER PARTICLES ===
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        if (p.life >= p.maxLife) {
          particles[i] = createParticle(cx, cy);
          continue;
        }

        p.orbitAngle += p.orbitSpeed * spinMul;
        p.x = cx + Math.cos(p.orbitAngle) * p.orbitRadius + p.vx * p.life;
        p.y = cy + Math.sin(p.orbitAngle) * p.orbitRadius + p.vy * p.life;
        p.rotation += p.rotSpeed * spinMul;

        const fadeIn = Math.min(p.life / 15, 1);
        const fadeOut = Math.max(0, 1 - (p.life - p.maxLife + 30) / 30);
        const alpha = p.opacity * fadeIn * fadeOut;
        if (alpha <= 0) continue;

        const drawer = flowerDrawers[p.type];
        if (drawer) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawer(ctx, p.size, alpha);
          ctx.restore();
        }
      }

      // === CORE ===
      // Core glow
      const coreR = size * 0.12;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR + size * 0.05);
      grad.addColorStop(0, `hsla(${accentHsl}, ${0.18 * pulse})`);
      grad.addColorStop(0.5, `hsla(340, 40%, 65%, ${0.04 * pulse})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR + size * 0.05, 0, Math.PI * 2);
      ctx.fill();

      // Rotating hexagons
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.1 * spinMul);
      const hexR = coreR + Math.sin(t * 1.5) * 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        if (i === 0) ctx.moveTo(Math.cos(a) * hexR, Math.sin(a) * hexR);
        else ctx.lineTo(Math.cos(a) * hexR, Math.sin(a) * hexR);
      }
      ctx.closePath();
      ctx.strokeStyle = `hsla(${accentHsl}, ${0.25 + pulse * 0.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = `hsla(${accentHsl}, ${0.02 + pulse * 0.02})`;
      ctx.fill();

      // Inner counter-rotating hex
      ctx.rotate(-t * 0.2 * spinMul);
      const hexR2 = coreR * 0.55;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        if (i === 0) ctx.moveTo(Math.cos(a) * hexR2, Math.sin(a) * hexR2);
        else ctx.lineTo(Math.cos(a) * hexR2, Math.sin(a) * hexR2);
      }
      ctx.closePath();
      ctx.strokeStyle = `hsla(${accentHsl}, ${0.1 + pulse * 0.1})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();

      // === VOICE WAVEFORM ===
      if (size >= 60) {
        const barCount = Math.max(6, Math.round(size / 8));
        const barW = Math.max(1.2, size / 60);
        const barGap = Math.max(0.8, size / 80);
        const totalW = barCount * (barW + barGap);
        const waveBaseY = cy + coreR * 0.4;
        const maxBarH = isSpeaking ? size * 0.1 : size * 0.025;

        for (let i = 0; i < barCount; i++) {
          const x = cx - totalW / 2 + i * (barW + barGap);
          const freq1 = Math.sin(t * 8 * spinMul + i * 0.4) * 0.5 + 0.5;
          const freq2 = Math.sin(t * 12 * spinMul + i * 0.7) * 0.3 + 0.3;
          const envelope = Math.sin((i / barCount) * Math.PI);
          let h: number;
          if (isSpeaking) {
            h = maxBarH * (freq1 * 0.6 + freq2 * 0.4) * envelope;
          } else {
            h = maxBarH * (0.3 + freq1 * 0.2) * envelope;
          }
          const barAlpha = isSpeaking ? 0.4 + freq1 * 0.3 : 0.08 + freq1 * 0.05;
          ctx.fillStyle = `hsla(${accentHsl}, ${barAlpha})`;
          ctx.beginPath();
          ctx.roundRect(x, waveBaseY - h, barW, h * 2, barW / 2);
          ctx.fill();
        }
      }

      // === HBMASTER TEXT (larger sizes only) ===
      if (size >= 150) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = `hsla(${accentHsl}, ${pulse * 0.5})`;
        ctx.shadowBlur = 15;
        const fontSize = Math.round(size * 0.11);
        ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
        ctx.letterSpacing = `${Math.round(size * 0.02)}px`;
        ctx.fillStyle = `hsla(${accentHsl.split(",")[0] || "228"}, 55%, 38%, ${0.7 + pulse * 0.15})`;
        ctx.fillText("HBMASTER", cx, cy - coreR * 0.6);
        ctx.shadowBlur = 0;
        ctx.font = `500 ${Math.round(fontSize * 0.45)}px 'Inter', sans-serif`;
        ctx.letterSpacing = `${Math.round(size * 0.03)}px`;
        ctx.fillStyle = `hsla(${accentHsl}, ${0.25 + pulse * 0.1})`;
        ctx.fillText("MISSION CONTROL", cx, cy - coreR * 0.6 + fontSize * 0.7);
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [state, accentHsl, size, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="pointer-events-none"
    />
  );
};

export default MiniHologram;
