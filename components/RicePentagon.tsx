/** A price tag: triangular top, rectangular body, hole near the point. */
export function RicePentagon({ brand, label }: { brand: string; label: string }) {
  return (
    <div className="relative h-48 w-36 shrink-0 text-[#14080E]" aria-label={`Tag, ${brand}, ${label}`}>
      <svg viewBox="0 0 120 168" className="h-full w-full" aria-hidden="true">
        <path d="M60 6 L112 46 L112 158 L8 158 L8 46 Z" fill="#E2B657" />
        <circle cx="60" cy="34" r="7" fill="#14080E" />
      </svg>
      <div className="absolute inset-x-3 bottom-3 top-[4.5rem] flex flex-col justify-center text-center">
        <p className="text-[0.62rem] uppercase leading-tight tracking-[0.12em]">{brand}</p>
        <p className="mt-2 text-sm font-medium leading-tight">{label}</p>
      </div>
    </div>
  );
}
