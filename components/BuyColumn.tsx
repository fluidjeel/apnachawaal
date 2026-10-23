"use client";

import { useState } from "react";
import type { Variety } from "@/lib/varieties";

export function BuyColumn({ variety }: { variety: Variety }) {
  const [held, setHeld] = useState(false);

  return (
    <aside className="border-t border-ink/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
      <div className="lg:sticky lg:top-10">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-ink/70">
          1 kg
        </p>
        <p className="mt-6 font-sans text-3xl tracking-tight">{variety.priceLabel}</p>
        <p className="mt-2 max-w-[16rem] font-sans text-sm leading-relaxed text-ink/70">
          {variety.priceNote}
        </p>
        <p className="mt-8 max-w-[18rem] font-sans text-sm leading-relaxed">{variety.polish}</p>
        <button
          type="button"
          className="mt-10 w-full max-w-[18rem] bg-ink px-5 py-4 font-sans text-sm text-parchment transition-transform duration-200 ease-out hover:bg-ink/90 active:scale-[0.99]"
          aria-pressed={held}
          onClick={() => setHeld(true)}
        >
          {held ? "Held" : "Add to bag"}
        </button>
        <p className="mt-4 max-w-[18rem] font-sans text-sm leading-relaxed text-ink/70" aria-live="polite">
          {held
            ? "Held on this page. The bag itself opens after the rest of the shop is built."
            : "The bag is not open yet."}
        </p>
      </div>
    </aside>
  );
}
