import Link from "next/link";
import { HomeScroll } from "@/components/HomeScroll";

const later = [
  { name: "Kalanamak", place: "Uttar Pradesh" },
  { name: "Navara", place: "Kerala" },
  { name: "Boka Chaul", place: "Assam" },
];

export default function HomePage() {
  return (
    <HomeScroll>
      <header className="flex items-center justify-between px-[6vw] pt-8 font-sans text-[0.68rem] uppercase tracking-[0.28em]">
        <p>ApnaChawal</p>
        <p>One grain</p>
      </header>

      <main id="content">
        <section
          data-hero
          className="flex min-h-[100dvh] flex-col justify-between px-[6vw] pb-12 pt-16"
        >
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
            West Bengal
          </p>
          <div>
            <h1 className="max-w-[14ch] font-serif text-[clamp(4.5rem,12vw,9.5rem)] font-light leading-[0.86] tracking-[-0.045em]">
              Gobindobhog
            </h1>
            <div
              data-rule
              className="mt-8 h-px w-[min(28rem,70%)] origin-left bg-clay"
              aria-hidden="true"
            />
            <p className="mt-8 max-w-[28rem] font-sans text-lg leading-snug text-ink/80">
              The short grain Burdwan still cooks for Durga Puja khichuri.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.28em]">By place</p>
              <p className="mt-3 max-w-[18rem] font-serif text-2xl font-light leading-snug">
                Ten grains. The map lights only their states, and it comes after this page.
              </p>
            </div>
            <div>
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.28em]">By purpose</p>
              <p className="mt-3 max-w-[18rem] font-serif text-2xl font-light leading-snug">
                Fragrant, red, Ayurvedic, the old basmati, or rice that needs no fire.
              </p>
            </div>
          </div>
        </section>

        <section className="min-h-[100dvh] px-[6vw] py-28">
          <p className="max-w-[18ch] font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em]">
            Your ancestors ate better rice than you do.
          </p>
          <p className="mt-6 font-sans text-sm tracking-wide text-ink/70">
            We’re just bringing it back.
          </p>

          <ol className="mt-24 max-w-3xl border-t border-ink/15">
            <li className="border-b border-ink/15">
              <Link
                href="/rice/gobindobhog"
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7"
              >
                <span className="font-sans text-[0.68rem] tracking-[0.2em] text-ink/50">01</span>
                <span>
                  <span className="block font-serif text-4xl font-light tracking-tight group-hover:underline">
                    Gobindobhog
                  </span>
                  <span className="mt-1 block font-sans text-sm text-ink/60">West Bengal</span>
                </span>
                <span className="font-sans text-sm">Open</span>
              </Link>
            </li>
            {later.map((grain, index) => (
              <li key={grain.name} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-b border-ink/15 py-7">
                <span className="font-sans text-[0.68rem] tracking-[0.2em] text-ink/40">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-serif text-4xl font-light tracking-tight text-ink/45">
                    {grain.name}
                  </span>
                  <span className="mt-1 block font-sans text-sm text-ink/40">{grain.place}</span>
                </span>
                <span className="font-sans text-sm text-ink/40">Later</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </HomeScroll>
  );
}
