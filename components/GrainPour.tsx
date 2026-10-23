"use client";

import { useEffect, useRef } from "react";

/** A short pour of grain. Stops when the visitor asks for less motion. */
export function GrainPour({ subtle = false }: { subtle?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = reduce ? 24 : subtle ? 36 : 90;
    const grains = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * (subtle ? 1 : 1.4),
      s: (subtle ? 0.08 : 0.15) + Math.random() * (subtle ? 0.16 : 0.45),
    }));

    let frame = 0;
    const fit = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
    };
    fit();
    window.addEventListener("resize", fit);
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      for (const grain of grains) {
        if (!reduce) grain.y += grain.s * (subtle ? 0.0016 : 0.004);
        if (grain.y > 1.05) {
          grain.y = -0.05;
          grain.x = Math.random();
        }
        ctx.fillStyle = subtle ? "rgba(226, 182, 87, 0.4)" : "rgba(226, 182, 87, 0.85)";
        ctx.beginPath();
        ctx.ellipse(grain.x * width, grain.y * height, grain.r, grain.r * 1.6, 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", fit);
    };
  }, [subtle]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
