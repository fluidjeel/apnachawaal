"use client";

import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; label?: string };

const mishtiSlides: Slide[] = [
  {
    src: "/mockups/gobindobhog-pulao.jpg",
    alt: "Pulao of plump Gobindobhog with cashews and raisins.",
  },
  {
    src: "/mockups/gobindobhog-hero.jpg",
    alt: "Kaju kishmish payesh, with golden Gobindobhog pouring in.",
  },
  {
    src: "/mockups/gobindobhog-khichuri.jpg",
    alt: "A bowl of khichuri made with Gobindobhog.",
  },
  {
    src: "/mockups/gobindobhog-prawn-curry.jpg",
    alt: "Chingri malai curry beside a larger bowl of plump Gobindobhog.",
  },
  {
    src: "/mockups/gobindobhog-muri-ghonto.jpg",
    alt: "Muri ghonto made with Gobindobhog.",
  },
];

/** Five seconds each. Reduced motion stays on the first slide. */
export function DishSlides({ slides = mishtiSlides }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0);
  const label = slides[index]?.label;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [slides]);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, slideIndex) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {label ? (
        <p className="pointer-events-none absolute right-[6vw] top-8 z-20 text-[0.62rem] uppercase tracking-[0.18em] text-[#E2B657]">
          {label}
        </p>
      ) : null}
    </div>
  );
}
