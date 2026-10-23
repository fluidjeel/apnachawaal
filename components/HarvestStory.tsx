"use client";

import { useEffect, useMemo, useState } from "react";
import rawStates from "@/lib/india-states.json";

type Ring = number[][];
type StateShape = { n: string; r: Ring[] };

const states = rawStates as StateShape[];

const riceStates = new Set([
  "West Bengal",
  "Uttar Pradesh",
  "Punjab",
  "Tamil Nadu",
  "Kerala",
  "Maharashtra",
  "Manipur",
  "Karnataka",
  "Assam",
]);

/** Short product tags. Full sentences stay off the map. */
const tags = [
  { id: "mishti", brand: "Mishti Gobindobhog", label: "Smells like payesh", lon: 87.6, lat: 23.6, dx: 70, dy: 120 },
  { id: "kala", brand: "Kapilavastu Kalanamak", label: "GI around 50", lon: 83.0, lat: 27.4, dx: 40, dy: -90 },
  { id: "asli", brand: "Asli 370", label: "Stays long", lon: 75.4, lat: 31.0, dx: -170, dy: -10 },
  { id: "seeraga", brand: "Birinji Seeraga", label: "Iron for a long day", lon: 78.6, lat: 10.8, dx: 210, dy: -40 },
  { id: "matta", brand: "Sadhya Matta", label: "Red coat", lon: 76.3, lat: 10.7, dx: -160, dy: -40 },
  { id: "navara", brand: "Karkidaka Navara", label: "Ayurveda", lon: 76.4, lat: 9.6, dx: -70, dy: 40 },
  { id: "ambe", brand: "Peshwai Ambemohar", label: "Mango blossom", lon: 74.8, lat: 18.8, dx: -20, dy: -50 },
  { id: "chak", brand: "Ningthou Chak-Hao", label: "Purple in the pot", lon: 94.0, lat: 24.6, dx: 20, dy: 90 },
  { id: "raja", brand: "Aramane Rajamudi", label: "Red coat left on", lon: 76.2, lat: 14.2, dx: 90, dy: -20 },
  { id: "boka", brand: "Komal Chaul", label: "No fire · high fiber", lon: 92.6, lat: 26.4, dx: 20, dy: -100 },
];

const bounds = (() => {
  let minLon = 180;
  let maxLon = -180;
  let minLat = 90;
  let maxLat = -90;
  for (const state of states) {
    for (const ring of state.r) {
      for (const [lon, lat] of ring) {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      }
    }
  }
  return { minLon, maxLon, minLat, maxLat };
})();

function project(lon: number, lat: number) {
  const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 1000;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 1120;
  return { x, y };
}

function ringPath(ring: Ring) {
  const body = ring
    .map(([lon, lat], index) => {
      const { x, y } = project(lon, lat);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return `${body} Z`;
}

function RiceTag({
  brand,
  label,
  left,
  top,
  hot,
}: {
  brand: string;
  label: string;
  left: string;
  top: string;
  hot: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 w-[8.6rem] -translate-x-1/2 -translate-y-1/2 border px-2 py-1 ${
        hot ? "border-[#14080E] bg-[#F4E6C8] text-[#14080E]" : "border-[#F4E6C8] bg-[#0c0608] text-[#F4E6C8]"
      }`}
      style={{ left, top }}
    >
      <p className={`text-[0.56rem] uppercase leading-tight tracking-[0.12em] ${hot ? "text-[#14080E]" : "text-[#E2B657]"}`}>{brand}</p>
      <p className="text-[0.72rem] leading-tight">{label}</p>
    </div>
  );
}

function Journey() {
  return (
    <div className="relative flex h-full min-h-0 flex-col justify-between py-2 pr-[4vw]">
      <svg viewBox="0 0 280 640" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="grainSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF6DE" />
            <stop offset="0.45" stopColor="#E2B657" />
            <stop offset="1" stopColor="#8C4E28" />
          </linearGradient>
        </defs>
        <path d="M40 70 C 90 70, 90 150, 140 170 C 190 190, 190 250, 140 290 C 90 330, 90 400, 150 450 C 200 490, 200 560, 150 600" fill="none" stroke="#E2B657" strokeWidth="1.4" opacity="0.7" />
        {Array.from({ length: 7 }).map((_, i) => {
          const x = 28 + i * 16;
          const lean = (i - 3) * 6;
          const h = 52 + (i % 3) * 10;
          return (
            <g key={i}>
              <path
                d={`M${x} 118 C ${x + lean * 0.3} ${118 - h * 0.45}, ${x + lean} ${118 - h * 0.75}, ${x + lean * 0.5} ${118 - h}`}
                fill="none"
                stroke="#C4923A"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <ellipse cx={x + lean * 0.5} cy={118 - h - 5} rx="3.2" ry="6" fill="url(#grainSheen)" transform={`rotate(${12 + i * 8} ${x + lean * 0.5} ${118 - h - 5})`} />
            </g>
          );
        })}
        <g transform="translate(118 168)">
          <path d="M-34 28 L-34 -8 L34 -8 L34 28 Z" fill="#5C1C24" stroke="#E2B657" strokeWidth="1.4" />
          <path d="M-42 -4 L0 -28 L42 -4 Z" fill="#2C1014" stroke="#E2B657" strokeWidth="1.4" />
          <circle cx="0" cy="6" r="16" fill="#3A1418" stroke="#E2B657" strokeWidth="1.6" />
          <circle cx="0" cy="6" r="4" fill="none" stroke="#E2B657" />
          <path d="M-14 6 H14 M0 -8 V20" stroke="#E2B657" strokeWidth="1.2" />
          <rect x="18" y="-2" width="10" height="8" fill="#F4C47A" stroke="#E2B657" />
        </g>
        <g transform="translate(150 300)">
          <path d="M-22 -6 C-28 8 -26 28 -16 36 Q0 44 16 36 C26 28 28 8 22 -6 Q0 2 -22 -6 Z" fill="#F4DCAA" stroke="#E2B657" strokeWidth="1.5" />
          <path d="M-8 -8 Q0 -18 8 -8 M0 -14 L-6 -22 M0 -14 L6 -22" fill="none" stroke="#8C4E28" strokeWidth="1.3" />
        </g>
        <g transform="translate(70 470)">
          <path d="M-46 8 H-6 V-16 H8 Q28 -14 32 4 V8 H40" fill="#5C1C24" stroke="#E2B657" strokeWidth="1.5" />
          <path d="M8 -12 H22 L28 0 H8 Z" fill="#F4E6C8" opacity="0.7" />
          <circle cx="-28" cy="12" r="7" fill="#14080E" stroke="#E2B657" />
          <circle cx="18" cy="12" r="7" fill="#14080E" stroke="#E2B657" />
          <ellipse cx="-20" cy="-8" rx="3" ry="5" fill="url(#grainSheen)" />
          <ellipse cx="-10" cy="-6" rx="3" ry="5" fill="url(#grainSheen)" />
        </g>
        <g transform="translate(168 560)">
          <path d="M-26 18 L-26 -16 H26 V18 Z" fill="#5C1C24" stroke="#E2B657" strokeWidth="1.4" />
          <path d="M-34 -12 L0 -36 L34 -12 Z" fill="#2C1014" stroke="#E2B657" strokeWidth="1.4" />
          <rect x="-16" y="-8" width="10" height="8" fill="#F4C47A" stroke="#E2B657" />
          <path d="M6 18 V-2 Q14 -8 20 -2 V18 Z" fill="#241014" stroke="#E2B657" />
          <path d="M-18 22 H22 L26 28 H-22 Z" fill="#7A3030" stroke="#E2B657" />
        </g>
        {Array.from({ length: 5 }).map((_, i) => (
          <ellipse key={i} cx="40" cy={90 + i * 100} rx="3.2" ry="6" fill="url(#grainSheen)">
            <animate attributeName="cy" from="80" to="600" dur="9s" begin={`${i * 1.6}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </svg>
      <ul className="absolute right-2 top-6 flex flex-col gap-16 text-[0.62rem] uppercase tracking-[0.16em] text-[#E2B657]">
        {["Harvested", "Milled", "Packed", "To your door"].map((stage) => (
          <li key={stage} className="border border-[#E2B657]/80 bg-[#14080E]/80 px-2 py-1">
            {stage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HarvestStory() {
  const [hot, setHot] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setHot((n) => (n + 1) % tags.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  const placed = useMemo(
    () =>
      tags.map((tag) => {
        const anchor = project(tag.lon, tag.lat);
        const x = anchor.x + tag.dx;
        const y = anchor.y + tag.dy;
        return {
          ...tag,
          x1: anchor.x,
          y1: anchor.y,
          x2: x,
          y2: y,
          left: `${(x / 1000) * 100}%`,
          top: `${(y / 1120) * 100}%`,
        };
      }),
    [],
  );

  return (
    <div className="relative z-10 grid h-full min-h-0 grid-cols-[minmax(0,1.15fr)_minmax(180px,0.8fr)] gap-2 px-[4vw] pb-4">
      <div className="relative min-h-0">
        <p className="absolute left-0 top-0 z-20 text-[0.62rem] uppercase tracking-[0.22em] text-[#E2B657]">Tags</p>
        <svg viewBox="0 0 1000 1120" className="h-full w-full" role="img" aria-label="Map of India with rice tags">
          {states.map((state) => (
            <path
              key={state.n}
              d={state.r.map(ringPath).join(" ")}
              fill={riceStates.has(state.n) ? "rgba(122, 42, 48, 0.9)" : "rgba(28, 10, 14, 0.88)"}
              stroke="#E2B657"
              strokeWidth={riceStates.has(state.n) ? 1.6 : 0.8}
              strokeLinejoin="round"
            />
          ))}
          {placed.map((tag) => (
            <line
              key={`${tag.id}-lead`}
              x1={tag.x1}
              y1={tag.y1}
              x2={tag.x2}
              y2={tag.y2}
              stroke="#F4E6C8"
              strokeWidth="1.2"
            />
          ))}
        </svg>
        <div aria-label="Tags">
          {placed.map((tag, index) => (
            <RiceTag key={tag.id} brand={tag.brand} label={tag.label} left={tag.left} top={tag.top} hot={index === hot} />
          ))}
        </div>
      </div>
      <Journey />
    </div>
  );
}
