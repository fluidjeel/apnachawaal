import { catalog } from "@/lib/varieties";

/** Badges already on the rice pages. Health line is first where the research supports one. */
export const claims: Record<string, string[]> = {
  gobindobhog: ["Buttery sweet", "Payesh scent", "Soft cook"],
  kalanamak: ["Low GI", "High protein", "Black husk", "Sweet aroma"],
  "basmati-370": ["Stays long", "Aged aroma", "Fluffy grain"],
  "seeraga-samba": ["High iron", "Biryani grain", "Stays separate"],
  "palakkadan-matta": ["Red bran", "Firm bite", "Feast rice"],
  navara: ["Ayurvedic", "Monsoon rice"],
  ambemohar: ["Mango blossom", "Soft grain"],
  "chak-hao-amubi": ["Low GI", "More filling", "Turns purple"],
  rajamudi: ["High fiber", "Bran on", "Firm bite"],
  "boka-chaul": ["High fiber", "No fire", "Soft rice"],
};

export const dishes: Record<string, string[]> = {
  gobindobhog: ["Payesh", "Khichuri", "Pulao", "Muri ghonto"],
  kalanamak: ["Kheer", "UP Tahri", "Dal chawal"],
  "basmati-370": ["Jeera rice", "Matar pulao", "Rajma chawal"],
  "seeraga-samba": ["Ambur biryani", "Dindigul biryani", "Chettinad biryani"],
  "palakkadan-matta": ["Sadhya", "Meen puli", "Moru curry"],
  navara: ["Karkidaka kanji", "Coconut milk kanji", "Morning kanji"],
  ambemohar: ["Masale bhat", "Vangi bhat", "Varan bhat"],
  "chak-hao-amubi": ["Chak-hao kheer", "Eromba", "In the pot"],
  rajamudi: ["Bisi bele bath", "Saaru", "Beans palya"],
  "boka-chaul": ["Curd and jaggery", "Cold milk soak", "With banana"],
};

/**
 * Gobindobhog uses the ₹480 figure already in the variety file.
 * Every other number is a scaffold so the bag can add up. None of these are offers.
 */
const pricePaise: Record<string, number> = {
  gobindobhog: 48000,
  kalanamak: 62000,
  "basmati-370": 54000,
  "seeraga-samba": 45000,
  "palakkadan-matta": 22000,
  navara: 38000,
  ambemohar: 36000,
  "chak-hao-amubi": 52000,
  rajamudi: 34000,
  "boka-chaul": 28000,
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  state: string;
  line: string;
  badges: string[];
  dishes: string[];
  pricePaise: number;
  stockKg: number;
  archived: boolean;
  image: string;
  priceNote: string;
};

export function formatRupees(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export function seedProducts(): Product[] {
  return catalog.map((grain) => ({
    slug: grain.slug,
    name: grain.name,
    brand: grain.brand,
    state: grain.state,
    line: grain.line,
    badges: claims[grain.slug] ?? [],
    dishes: dishes[grain.slug] ?? [],
    pricePaise: pricePaise[grain.slug] ?? 0,
    stockKg: 24,
    archived: false,
    image:
      grain.slug === "chak-hao-amubi"
        ? "/mockups/chak-hao-hero.jpg"
        : `/mockups/${grain.slug}-hero.jpg`,
    priceNote:
      grain.slug === "gobindobhog"
        ? "Placeholder for 1 kg. Not a real offer."
        : "Placeholder so the bag can add up. Not a real offer.",
  }));
}
