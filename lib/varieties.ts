export type Variety = {
  slug: string;
  name: string;
  state: string;
  purpose: string;
  story: string;
  smell: string;
  dish: string;
  nutritionNote: string;
  soakingNote: string;
  farmerNote: string;
  polish: string;
  priceLabel: string;
  priceNote: string;
};

/**
 * Seeded only for the first screen. Facts are taken from doc.txt.
 * Iron, zinc, and the 3% milling figure in the same West Bengal line
 * belong to Radhunipagal, not this grain.
 */
export const gobindobhog: Variety = {
  slug: "gobindobhog",
  name: "Gobindobhog",
  state: "West Bengal",
  purpose: "Fragrant short grain",
  story:
    "On the southern bank of the Damodar, in the Raina and Khandaghosh blocks of Purba Bardhaman, farmers still grow the short grain Bengal chose for its gods. The guide traces the name to the Setts and Basaks, who carried it to Sutanuti as the daily offering for Govindajiu. The grain received a GI tag in 2017, and the same source notes UN FAO recognition as food and cultural heritage.",
  smell:
    "Buttery and sweet. The guide calls it an intense aroma, unlike the dry fragrance of long-grain basmati.",
  dish:
    "Bhoger khichuri at Durga Puja. Nolen gurer payesh. Chingri malai pulao. Muri ghonto.",
  nutritionNote:
    "Lower amylose than dry-cooking basmati, so the cooked grain is creamy and slightly sticky. The source does not give this variety its own iron, zinc, or glycemic figure.",
  soakingNote: "Not stated in the source.",
  farmerNote:
    "Raina and Khandaghosh, Purba Bardhaman, on the Damodar. The guide does not name a present-day farmer group for this grain.",
  polish:
    "Cool-milled, not parboiled, and packed so the surface oils that carry the aroma are not lost. A 3 percent milling note in the same passage belongs to Radhunipagal.",
  priceLabel: "₹480",
  priceNote: "Placeholder for 1 kg. Not a real offer.",
};

/** The shop is these ten. Brand is the name on the modern page. Only Gobindobhog is seeded until the first two screens are reviewed. */
export const catalog = [
  {
    slug: "gobindobhog",
    name: "Gobindobhog",
    brand: "Mishti Gobindobhog",
    state: "West Bengal",
    line: "The sweet offering to Govindajiu. A buttery short grain for khichuri, payesh, and pulao whenever you cook.",
    tag: "Smells like payesh",
  },
  {
    slug: "kalanamak",
    name: "Kalanamak",
    brand: "Kapilavastu Kalanamak",
    state: "Uttar Pradesh",
    line: "Buddha’s seeds from Kapilavastu. The black-husked grain the name already carries.",
    tag: "GI around 50",
  },
  {
    slug: "basmati-370",
    name: "Basmati 370",
    brand: "Asli 370",
    state: "Punjab",
    line: "Selected in 1933. The parent of modern basmati.",
    tag: "Stays long",
  },
  {
    slug: "seeraga-samba",
    name: "Seeraga Samba",
    brand: "Birinji Seeraga",
    state: "Tamil Nadu",
    line: "The grain of Dindigul and Ambur biryani.",
    tag: "Iron for a long day",
  },
  {
    slug: "palakkadan-matta",
    name: "Palakkadan Matta",
    brand: "Sadhya Matta",
    state: "Kerala",
    line: "The red rice of the Onam sadhya.",
    tag: "Red coat",
  },
  {
    slug: "navara",
    name: "Navara",
    brand: "Karkidaka Navara",
    state: "Kerala",
    line: "Ayurveda names it. The monsoon kanji.",
    tag: "Ayurveda",
  },
  {
    slug: "ambemohar",
    name: "Ambemohar",
    brand: "Peshwai Ambemohar",
    state: "Maharashtra",
    line: "Mango-blossom scent, for Peshwa masale bhat.",
    tag: "Mango blossom",
  },
  {
    slug: "chak-hao-amubi",
    name: "Chak-Hao Amubi",
    brand: "Ningthou Chak-Hao",
    state: "Manipur",
    line: "Black in the bag, purple in the pot, kept for royalty.",
    tag: "Purple in the pot",
  },
  {
    slug: "rajamudi",
    name: "Rajamudi",
    brand: "Aramane Rajamudi",
    state: "Karnataka",
    line: "The Wodeyars’ everyday rice, still used for bisi bele bath.",
    tag: "Red coat left on",
  },
  {
    slug: "boka-chaul",
    name: "Boka Chaul",
    brand: "Komal Chaul",
    state: "Assam",
    line: "Cold milk, no fire, ready in about fifteen minutes.",
    tag: "No fire · high fiber",
  },
] as const;

export const varieties: Variety[] = [gobindobhog];

export function getVariety(slug: string): Variety | undefined {
  return varieties.find((variety) => variety.slug === slug);
}
