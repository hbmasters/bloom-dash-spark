// Minimal flower renderers for MiniHologram widget

export type FlowerType = "rose" | "tulip" | "daisy" | "lavender" | "eucalyptus" | "babybreath" | "craspedia" | "jasmine" | "wisteria" | "fern" | "freesia" | "whitebranch";

export const FLOWER_TYPES: FlowerType[] = [
  "rose", "tulip", "daisy", "lavender", "eucalyptus",
  "babybreath", "craspedia", "jasmine", "wisteria", "fern", "freesia", "whitebranch",
];

export const FLOWER_WEIGHTS = [0.15, 0.12, 0.1, 0.1, 0.08, 0.1, 0.08, 0.07, 0.05, 0.06, 0.05, 0.04];

type DrawFn = (ctx: CanvasRenderingContext2D, size: number, alpha: number) => void;

const drawCircleFlower = (ctx: CanvasRenderingContext2D, size: number, alpha: number, hue: number, sat: string, light: string) => {
  const petalCount = 5;
  for (let i = 0; i < petalCount; i++) {
    const a = (Math.PI * 2 / petalCount) * i;
    ctx.beginPath();
    ctx.ellipse(Math.cos(a) * size * 0.4, Math.sin(a) * size * 0.4, size * 0.45, size * 0.25, a, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, ${sat}, ${light}, ${alpha * 0.7})`;
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(45, 70%, 55%, ${alpha * 0.8})`;
  ctx.fill();
};

const drawLeaf = (ctx: CanvasRenderingContext2D, size: number, alpha: number, hue: number) => {
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.3, size * 0.8, 0, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${hue}, 35%, 45%, ${alpha * 0.6})`;
  ctx.fill();
};

const drawDot = (ctx: CanvasRenderingContext2D, size: number, alpha: number, hue: number, sat: string, light: string) => {
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${hue}, ${sat}, ${light}, ${alpha * 0.7})`;
  ctx.fill();
};

export const flowerDrawers: Record<FlowerType, DrawFn> = {
  rose: (ctx, s, a) => drawCircleFlower(ctx, s, a, 340, "50%", "60%"),
  tulip: (ctx, s, a) => drawCircleFlower(ctx, s, a, 350, "60%", "55%"),
  daisy: (ctx, s, a) => drawCircleFlower(ctx, s, a, 45, "80%", "70%"),
  lavender: (ctx, s, a) => drawDot(ctx, s, a, 270, "45%", "62%"),
  eucalyptus: (ctx, s, a) => drawLeaf(ctx, s, a, 160),
  babybreath: (ctx, s, a) => drawDot(ctx, s, a, 0, "0%", "90%"),
  craspedia: (ctx, s, a) => drawDot(ctx, s, a, 48, "80%", "55%"),
  jasmine: (ctx, s, a) => drawCircleFlower(ctx, s, a, 60, "30%", "85%"),
  wisteria: (ctx, s, a) => drawDot(ctx, s, a, 280, "50%", "70%"),
  fern: (ctx, s, a) => drawLeaf(ctx, s, a, 140),
  freesia: (ctx, s, a) => drawCircleFlower(ctx, s, a, 50, "70%", "65%"),
  whitebranch: (ctx, s, a) => drawLeaf(ctx, s, a, 100),
};
