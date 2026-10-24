import { Outfit, Tiro_Devanagari_Hindi } from "next/font/google";
import { BrandList } from "@/components/BrandList";
import { DishSlides } from "@/components/DishSlides";
import { GrainPour } from "@/components/GrainPour";
import { HarvestStory } from "@/components/HarvestStory";
import { ShopLinks } from "@/components/shop/ShopLinks";
import { claims } from "@/lib/shop-catalog";
import { catalog } from "@/lib/varieties";

const latin = Outfit({ subsets: ["latin"], weight: ["300", "500"] });
const indic = Tiro_Devanagari_Hindi({ subsets: ["devanagari", "latin"], weight: "400" });

const heroAlt: Record<string, string> = {
  kalanamak: "Dark Kalanamak grains in a brass bowl in morning light.",
  "basmati-370": "Long slender basmati grains arranged on a dark stone.",
  "seeraga-samba": "Small seeraga samba grains in a warm copper pot.",
  "palakkadan-matta": "Red-coated matta rice in a brass bowl.",
  navara: "Navara rice in a quiet copper bowl.",
  ambemohar: "Pale Ambemohar rice in a soft bowl.",
  "chak-hao-amubi": "Black chak-hao grains beside cooked purple rice.",
  rajamudi: "Red-amber Rajamudi rice in a brass bowl.",
  "boka-chaul": "Komal rice soaking in a bowl of cold milk.",
};

const dishSlides: Record<string, { src: string; alt: string; label: string }[]> = {
  kalanamak: [
    { src: "/mockups/kalanamak-hero.jpg", alt: heroAlt.kalanamak, label: "Kalanamak" },
    { src: "/mockups/kalanamak-kheer.jpg", alt: "Kalanamak kheer.", label: "Kheer" },
    { src: "/mockups/kalanamak-tahri.jpg", alt: "Uttar Pradesh tahri with curd.", label: "UP Tahri" },
    { src: "/mockups/kalanamak-dal.jpg", alt: "Steamed Kalanamak with arhar dal.", label: "Dal Chawal" },
  ],
  "basmati-370": [
    { src: "/mockups/basmati-370-hero.jpg", alt: heroAlt["basmati-370"], label: "Basmati" },
    { src: "/mockups/basmati-370-jeera.jpg", alt: "Jeera rice of long basmati grains.", label: "Jeera Rice" },
    { src: "/mockups/basmati-370-matar-pulao.jpg", alt: "Matar pulao of long basmati grains.", label: "Matar Pulao" },
    { src: "/mockups/basmati-370-rajma.jpg", alt: "Long basmati beside a bowl of rajma.", label: "With Rajma" },
  ],
  "seeraga-samba": [
    { src: "/mockups/seeraga-samba-hero.jpg", alt: heroAlt["seeraga-samba"], label: "Seeraga Samba" },
    { src: "/mockups/seeraga-ambur-biryani.jpg", alt: "Ambur biryani with brinjal curry.", label: "Ambur Biryani" },
    { src: "/mockups/seeraga-dindigul-biryani.jpg", alt: "Dindigul biryani.", label: "Dindigul Biryani" },
    { src: "/mockups/seeraga-chettinad-biryani.jpg", alt: "Chettinad biryani.", label: "Chettinad Biryani" },
  ],
  "palakkadan-matta": [
    { src: "/mockups/palakkadan-matta-hero.jpg", alt: heroAlt["palakkadan-matta"], label: "Matta" },
    { src: "/mockups/palakkadan-matta-sadhya.jpg", alt: "Matta rice on a sadhya banana leaf.", label: "Sadhya" },
    { src: "/mockups/palakkadan-matta-meen.jpg", alt: "Matta rice beside meen puli.", label: "Meen Puli" },
    { src: "/mockups/palakkadan-matta-moru.jpg", alt: "Matta rice beside moru curry.", label: "Moru Curry" },
  ],
  navara: [
    { src: "/mockups/navara-hero.jpg", alt: heroAlt.navara, label: "Navara" },
    { src: "/mockups/navara-karkidaka-kanji.jpg", alt: "Karkidaka kanji in an earthen bowl.", label: "Karkidaka Kanji" },
    { src: "/mockups/navara-coconut-kanji.jpg", alt: "Navara kanji finished with coconut milk.", label: "Coconut Milk Kanji" },
    { src: "/mockups/navara-morning-kanji.jpg", alt: "Morning kanji in a brass tumbler.", label: "Morning Kanji" },
  ],
  ambemohar: [
    { src: "/mockups/ambemohar-hero.jpg", alt: heroAlt.ambemohar, label: "Ambemohar" },
    { src: "/mockups/ambemohar-masale-bhat.jpg", alt: "Masale bhat with peas and coconut.", label: "Masale Bhat" },
    { src: "/mockups/ambemohar-vangi-bhat.jpg", alt: "Vangi bhat with brinjal.", label: "Vangi Bhat" },
    { src: "/mockups/ambemohar-varan-bhat.jpg", alt: "Ambemohar rice with varan.", label: "Varan Bhat" },
  ],
  "chak-hao-amubi": [
    { src: "/mockups/chak-hao-hero.jpg", alt: heroAlt["chak-hao-amubi"], label: "Chak-Hao" },
    { src: "/mockups/chak-hao-kheer.jpg", alt: "Purple chak-hao kheer.", label: "Chak-Hao Kheer" },
    { src: "/mockups/chak-hao-eromba.jpg", alt: "Purple chak-hao beside eromba.", label: "Eromba" },
    { src: "/mockups/chak-hao-pot.jpg", alt: "Black rice turning purple in the pot.", label: "In the Pot" },
  ],
  rajamudi: [
    { src: "/mockups/rajamudi-hero.jpg", alt: heroAlt.rajamudi, label: "Rajamudi" },
    { src: "/mockups/rajamudi-bisi-bele.jpg", alt: "Bisi bele bath.", label: "Bisi Bele Bath" },
    { src: "/mockups/rajamudi-saaru.jpg", alt: "Steamed Rajamudi beside saaru.", label: "Saaru" },
    { src: "/mockups/rajamudi-palya.jpg", alt: "Rajamudi beside beans palya.", label: "With Palya" },
  ],
  "boka-chaul": [
    { src: "/mockups/boka-chaul-hero.jpg", alt: heroAlt["boka-chaul"], label: "Komal Chaul" },
    { src: "/mockups/boka-chaul-curd.jpg", alt: "Soaked komal chaul with curd and jaggery.", label: "Curd and Jaggery" },
    { src: "/mockups/boka-chaul-milk.jpg", alt: "Komal chaul soaking in cold milk.", label: "Cold Milk Soak" },
    { src: "/mockups/boka-chaul-banana.jpg", alt: "Soaked komal chaul with banana and jaggery.", label: "With Banana" },
  ],
};

export default function ModernHome() {
  return (
    <div
      id="pages"
      className={`${latin.className} h-[100dvh] snap-y snap-mandatory overflow-y-auto bg-[#14080E] text-[#F4E6C8]`}
    >
      <section className="relative isolate flex h-[100dvh] snap-start snap-always flex-col overflow-hidden">
        <GrainPour />
        <header className="relative z-10 flex items-center gap-4 px-[6vw] pt-8 text-[0.68rem] uppercase tracking-[0.22em] text-[#E2B657]">
          <p>ApnaChawal</p>
          <p className="border border-[#E2B657]/70 px-2 py-1 text-[0.62rem]">100% organic</p>
          <ShopLinks />
        </header>
        <main className="relative z-10 mt-auto px-[6vw] pb-10 pt-24">
          <p className={`${indic.className} text-3xl text-[#E2B657] md:text-5xl`}>अपना चावल</p>
          <h1 className="mt-4 max-w-[10ch] text-[clamp(3.5rem,9vw,7rem)] font-medium leading-[0.88] tracking-[-0.05em]">
            ApnaChawal
          </h1>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-[#F4E6C8]/85">
            Ten rices. One house. We bring the better grain back to the table.
          </p>
          <BrandList brands={catalog} />
          <p className="mt-8 text-[0.68rem] uppercase tracking-[0.22em] text-[#E2B657]/80">Scroll</p>
        </main>
      </section>

      <section id="harvest" className="relative flex h-[100dvh] snap-start snap-always flex-col overflow-hidden">
        <GrainPour />
        <div className="relative z-10 flex items-end justify-between gap-6 px-[6vw] pb-2 pt-6">
          <div>
            <p className="inline-block border border-[#E2B657]/70 px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[#E2B657]">
              100% organic
            </p>
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-[#E2B657]">The harvest</p>
            <h2 className="mt-1 max-w-[12ch] text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              From the field
            </h2>
          </div>
          <p className="max-w-xs pb-1 text-sm font-light leading-snug text-[#F4E6C8]/85">
            The map is where they come from. The line is where they go.
          </p>
        </div>
        <div className="relative z-10 min-h-0 flex-1">
          <HarvestStory />
        </div>
      </section>

      {catalog.map((grain) =>
        grain.slug === "gobindobhog" ? (
          <section
            id={grain.slug}
            key={grain.slug}
            className="relative flex h-[100dvh] snap-start snap-always flex-col justify-end overflow-hidden bg-[#14080E]"
          >
            <DishSlides />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-[#14080E]/35 to-transparent" />
            <p className="absolute left-[6vw] top-8 z-10 flex max-w-[68%] flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-[#E2B657]">
              <span className="border border-[#E2B657]/70 px-2 py-1">100% organic</span>
              {claims[grain.slug].map((badge) => (
                <span key={badge} className="border border-[#E2B657]/70 px-2 py-1">
                  {badge}
                </span>
              ))}
              <span className="tracking-[0.22em]">{grain.state}</span>
            </p>
            <div className="relative z-10 px-[6vw] pb-16">
              <h2 className="max-w-[16ch] text-[clamp(3.25rem,7vw,6rem)] font-medium leading-[0.9] tracking-[-0.05em]">
                {grain.brand}
              </h2>
              <p className="mt-8 max-w-md text-lg font-light leading-snug text-[#F4E6C8]/85">{grain.line}</p>
            </div>
          </section>
        ) : (
          <section
            id={grain.slug}
            key={grain.slug}
            className="relative flex h-[100dvh] snap-start snap-always flex-col justify-end overflow-hidden bg-[#14080E]"
          >
            <DishSlides slides={dishSlides[grain.slug]} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-[#14080E]/35 to-transparent" />
            <p className="absolute left-[6vw] top-8 z-10 flex max-w-[68%] flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-[#E2B657]">
              <span className="border border-[#E2B657]/70 px-2 py-1">100% organic</span>
              {claims[grain.slug].map((badge) => (
                <span key={badge} className="border border-[#E2B657]/70 px-2 py-1">
                  {badge}
                </span>
              ))}
              <span className="tracking-[0.22em]">{grain.state}</span>
            </p>
            <div className="relative z-10 px-[6vw] pb-16">
              <h2 className="max-w-[16ch] text-[clamp(3.25rem,7vw,6rem)] font-medium leading-[0.9] tracking-[-0.05em]">
                {grain.brand}
              </h2>
              <p className="mt-8 max-w-md text-lg font-light leading-snug text-[#F4E6C8]/85">{grain.line}</p>
            </div>
          </section>
        ),
      )}
    </div>
  );
}
