"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "field" | "grain" | "mill" | "pack" | "ship";

const labels: Record<Stage, string> = {
  field: "Harvest",
  grain: "The grain",
  mill: "The mill",
  pack: "Packed",
  ship: "On its way",
};

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

function span(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

function stageAt(progress: number): Stage {
  if (progress < 0.2) return "field";
  if (progress < 0.4) return "grain";
  if (progress < 0.6) return "mill";
  if (progress < 0.8) return "pack";
  return "ship";
}

/** The first journey, drawn only inside its own small canvas. */
function drawJourney(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  time: number,
) {
  const alpha = 0.9;
  const sway = Math.sin(time * 0.55) * 4;
  const grow = span(progress, 0, 0.24);
  const emerge = span(progress, 0.16, 0.42);
  const toMill = span(progress, 0.36, 0.64);
  const packed = span(progress, 0.56, 0.8);
  const shipped = span(progress, 0.74, 1);
  const fieldFade = 1 - toMill * 0.82;
  const ground = height * 0.82;

  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = `rgba(226, 182, 87, ${0.35 * alpha})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width * 0.06, ground);
  ctx.quadraticCurveTo(width * 0.4, ground - 4, width * 0.72, ground + 2);
  ctx.stroke();

  const stalks = 8;
  for (let i = 0; i < stalks; i += 1) {
    const x = width * (0.08 + (i / stalks) * 0.5);
    const lean = ((i % 5) - 2) * 3;
    const stalk = Math.min(height * 0.34, 78) * (0.72 + (i % 3) * 0.12) * Math.max(grow, 0.2);
    const top = ground - stalk;
    ctx.strokeStyle = `rgba(226, 182, 87, ${0.85 * alpha * Math.max(fieldFade, 0.12)})`;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(x, ground);
    ctx.bezierCurveTo(
      x + lean + sway * 0.25,
      ground - stalk * 0.35,
      x + lean * 1.4 + sway,
      ground - stalk * 0.7,
      x + lean + sway * 0.4,
      top,
    );
    ctx.stroke();
    if (emerge > 0 && fieldFade > 0.05) {
      ctx.fillStyle = `rgba(244, 230, 200, ${emerge * alpha * fieldFade})`;
      ctx.beginPath();
      ctx.ellipse(x + lean + sway * 0.4, top - 2, 2.2 * emerge, 4.6 * emerge, 0.5 + lean * 0.02, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const millX = width * 0.78;
  const millY = height * 0.36;
  if (toMill > 0) {
    for (let i = 0; i < 6; i += 1) {
      const t = clamp(toMill * 1.25 - i * 0.08);
      const x = width * 0.36 + (millX - width * 0.36) * t;
      const y = ground - 16 + (millY - (ground - 16)) * t - Math.sin(t * Math.PI) * 18;
      ctx.fillStyle = `rgba(226, 182, 87, ${t * alpha})`;
      ctx.beginPath();
      ctx.ellipse(x, y, 1.8, 3.2, 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = `rgba(226, 182, 87, ${toMill * alpha})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(millX, millY, 16 + 4 * toMill, time * 0.35, time * 0.35 + Math.PI * 1.65);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(millX, millY, 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (packed > 0 && shipped < 0.85) {
    const px = millX - 8;
    const py = millY + 28;
    ctx.save();
    ctx.translate(px, py);
    ctx.globalAlpha = packed * (1 - shipped * 0.6);
    ctx.fillStyle = "rgba(244, 220, 170, 0.9)";
    ctx.strokeStyle = "rgba(226, 182, 87, 1)";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-12, -2);
    ctx.bezierCurveTo(-16, 2, -16, 16, -10, 22);
    ctx.quadraticCurveTo(0, 26, 10, 22);
    ctx.bezierCurveTo(16, 16, 16, 2, 12, -2);
    ctx.quadraticCurveTo(0, 2, -12, -2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-6, -4);
    ctx.quadraticCurveTo(0, -10, 6, -4);
    ctx.moveTo(0, -8);
    ctx.lineTo(-4, -12);
    ctx.moveTo(0, -8);
    ctx.lineTo(4, -12);
    ctx.stroke();
    ctx.restore();
  }

  if (shipped > 0) {
    const x = width * (0.42 + shipped * 0.28);
    const y = height * (0.7 - shipped * 0.12);
    ctx.strokeStyle = `rgba(226, 182, 87, ${shipped * alpha})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 36, y);
    ctx.lineTo(x + 28, y + 10);
    ctx.lineTo(x + 8, y + 10);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.moveTo(x - 2, y + 12);
    ctx.lineTo(x - 28 * shipped, y + 12);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export function JourneyField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const stageRef = useRef<Stage>("field");
  const [stage, setStage] = useState<Stage>("field");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const held = reduce ? 0.22 : progress.current;
      drawJourney(ctx, rect.width, rect.height, held, reduce ? 0 : time);
      const next = stageAt(held);
      if (next !== stageRef.current) {
        stageRef.current = next;
        setStage(next);
      }
    };

    if (reduce) {
      paint(0);
      const onResize = () => paint(0);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let frame = 0;
    let killed = false;
    const cleanups: Array<() => void> = [];

    void (async () => {
      const { default: gsap } = await import("gsap");
      if (killed) return;
      const proxy = { value: 0 };
      const tween = gsap.to(proxy, {
        value: 1,
        duration: 16,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          progress.current = proxy.value;
        },
      });
      cleanups.push(() => tween.kill());
      const loop = (time: number) => {
        paint(time / 1000);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    })();

    return () => {
      killed = true;
      cancelAnimationFrame(frame);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 w-[min(80vw,440px)]">
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 0.8, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-1 text-right text-[0.68rem] uppercase tracking-[0.22em] text-[#E2B657]"
        >
          {labels[stage]}
        </motion.p>
      </AnimatePresence>
      <canvas ref={canvasRef} className="h-64 w-full" />
    </div>
  );
}
