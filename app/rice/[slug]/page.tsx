import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyColumn } from "@/components/BuyColumn";
import { getVariety, varieties } from "@/lib/varieties";

export function generateStaticParams() {
  return varieties.map((variety) => ({ slug: variety.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const variety = getVariety(slug);
    if (!variety) return { title: "Not found" };
    return {
      title: variety.name,
      description: `${variety.name}, ${variety.state}. ${variety.dish}`,
    };
  });
}

export default async function VarietyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const variety = getVariety(slug);
  if (!variety) notFound();

  return (
    <>
      <header className="flex items-center justify-between px-[6vw] pt-8 font-sans text-[0.68rem] uppercase tracking-[0.28em]">
        <Link href="/">ApnaChawal</Link>
        <p>{variety.state}</p>
      </header>

      <main id="content" className="px-[6vw] pb-28 pt-16">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
              {variety.purpose}
            </p>
            <h1 className="mt-6 max-w-[12ch] font-serif text-[clamp(4rem,8vw,7rem)] font-light leading-[0.88] tracking-[-0.04em]">
              {variety.name}
            </h1>
            <p className="mt-8 max-w-[34rem] font-sans text-xl leading-snug">
              Cooked for Durga Puja khichuri, payesh, and prawn pulao.
            </p>
          </div>
          <BuyColumn variety={variety} />
        </div>

        <div className="mt-28 max-w-[38rem] space-y-16">
          <section>
            <h2 className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
              The offering
            </h2>
            <p className="mt-4 font-serif text-2xl font-light leading-snug">{variety.story}</p>
          </section>
          <section>
            <h2 className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
              The smell
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed">{variety.smell}</p>
          </section>
          <section>
            <h2 className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
              At the table
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed">{variety.dish}</p>
          </section>
          <section>
            <h2 className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
              The grain
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed">{variety.nutritionNote}</p>
          </section>
          <section>
            <h2 className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
              Soaking
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed">{variety.soakingNote}</p>
          </section>
          <section>
            <h2 className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ink/60">
              The land
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed">{variety.farmerNote}</p>
          </section>
        </div>
      </main>
    </>
  );
}
