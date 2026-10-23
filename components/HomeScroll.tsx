"use client";

import { useEffect, useRef } from "react";

/**
 * One scroll sequence, type only. There is no photograph to slice into
 * frames, so this does not invent a grain. A clay rule draws as the first
 * viewport leaves, the way More Nutrition ties a change to the scroll
 * without a video. Lenis and GSAP stay on the homepage.
 */
export function HomeScroll({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rule = node.querySelector<HTMLElement>("[data-rule]");
    if (!rule) return;

    let cancelled = false;
    let removeTicker: (() => void) | undefined;
    let revert: (() => void) | undefined;
    let destroyLenis: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      removeTicker = () => gsap.ticker.remove(tick);
      destroyLenis = () => lenis.destroy();

      const ctx = gsap.context(() => {
        gsap.fromTo(
          rule,
          { scaleX: 0.08 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-hero]",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }, node);
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
      removeTicker?.();
      destroyLenis?.();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
