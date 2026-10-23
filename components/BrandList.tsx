"use client";

export function BrandList({ brands }: { brands: readonly { slug: string; brand: string }[] }) {
  return (
    <ul className="mt-8 grid max-w-3xl gap-x-10 gap-y-2 sm:grid-cols-2">
      {brands.map((grain) => (
        <li key={grain.slug} className="text-sm font-light">
          <a
            href={`#${grain.slug}`}
            className="text-[#E2B657] underline-offset-4 hover:underline"
            onClick={(event) => {
              event.preventDefault();
              const root = document.getElementById("pages");
              const target = document.getElementById(grain.slug);
              if (!root || !target) return;
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              const top = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
              root.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
            }}
          >
            {grain.brand}
          </a>
        </li>
      ))}
    </ul>
  );
}
