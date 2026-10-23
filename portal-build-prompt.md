# ApnaChawal portal — build prompt

Paste everything under the line into a new Cursor agent chat with this folder open. The prompt does not depend on any earlier conversation. Variety stories and nutrition live in `doc.txt` in this same folder. Read that file. Do not invent a second catalog.

---

You are building the customer storefront for **ApnaChawal** (apnachawal.com), a premium shop for Indian heritage rice. Build it in this repository as a Next.js app. Work in the order below. Stop after the homepage and one variety page and show me those two screens before you generate the other 9 varieties.

The design bar is explicit. These two screens must be good enough to be argued onto a **2027 list of the 100 most beautiful websites**. A tasteful template, a beige background, and a serif headline are not that list. A jury looking in 2027 should be able to say the type is the composition, the empty space is deliberate, one idea occupies each viewport, and the way you buy the rice never fights the story. If a choice is between more decoration and more quiet, choose quiet. If a choice is between “nice” and “considered down to the easing curve,” do the second.

## Product

ApnaChawal sells rice with a story, not commodity white rice. The line for the brand is: “Your ancestors ate better rice than you do. We’re just bringing it back.”

The catalog is **10 varieties**, chosen for a story a buyer can repeat and a reason they already want the rice. Nutrition and aroma matter only when they make that sale easier. Each variety has its own origin story, a nutrition note, a post-harvest note, and a regional dish. Take those facts from `doc.txt`. If a field is missing, leave it blank and mark it unknown. Do not invent glycemic-index numbers, iron figures, or health claims that are not in that file. Do not print disease, sleep, or “doctor” claims. Placeholder prices are fine if they are clearly labeled as placeholders.

The India map lights only the states these 10 come from. A state with two grains still lights once. The other states stay quiet. Choosing a lit state opens that state’s grains from this list, not a grid of every rice in the guide.

Group the 10 into five purposes, used as doors into the catalog, not as a grid of all 10:

1. Black and red pigmented rices.
2. Fragrant short- and medium-grain rices.
3. Ayurvedic and estuarine rices (Navara, Matta, khazan grains).
4. Original long-grain basmati.
5. Zero-cook and sticky rices (Boka Chaul, Chokuwa, and the northeastern glutinous grains).

Also sell a separate **mill** line: bran and broken-kernel products (flour from broken grains, and later anthocyanin bran). These are not heritage grains. Never place them in the same row as a variety.

Later, not in the first build, the site will also list three limited releases. Create the page now and leave it empty of products:

- Single-lot tins: one field, one harvest, milled on one day, sold until that lot is gone.
- Seasonal cups.
- A night cup.

The first variety you fully design is **Gobindobhog** (West Bengal). It is the pattern every other variety page copies.

### The 10

Use these names only. Fill story, dish, and nutrition from `doc.txt`. They were chosen because the story is one sentence and the buyer already has a reason to cook it. Grains with a stronger lab story and a colder checkout (Chhohartu, Koraput Kalajeera, Mappillai Samba, Jeeraphool) stay in the guide and out of the shop.

- **Gobindobhog, West Bengal.** Bengal already cooks it for Durga Puja khichuri and nolen gur payesh, and the name is the offering to Govindajiu. The festival is the sale.
- **Kalanamak, Uttar Pradesh.** The story is that Buddha gave the seeds at Kapilavastu. The name is already famous, so the page does not have to teach the category.
- **Basmati 370, Punjab.** Selected in 1933, and the guide treats it as the parent of modern basmati. The pitch is the one people repeat: you have been eating the copy.
- **Seeraga Samba, Tamil Nadu.** It is the grain of Dindigul and Ambur biryani. People buy it for a dish they already love.
- **Palakkadan Matta, Kerala.** It is the red rice of the Onam sadhya. Recognition does the selling.
- **Navara, Kerala.** Ayurveda names it, and the monsoon kanji is a specific ritual. It sells as a remedy, not as the feast, so it does not compete with Matta. The map lights Kerala once.
- **Ambemohar, Maharashtra.** The guide’s sellable fact is the mango-blossom scent, and the dish is Peshwa masale bhat. One sentence is enough.
- **Chak-Hao Amubi, Manipur.** It is black in the bag and purple in the pot, and the story is that it was kept for royalty. It sells on sight.
- **Rajamudi, Karnataka.** It was the everyday rice of the Wodeyar kings, and it still goes into bisi bele bath. A palace and a known plate.
- **Boka Chaul, Assam.** Soak it in cold milk. No fire. The Ahom story explains why it exists, and the buyer can try the claim in fifteen minutes.

## Design

The ambition is a site that could be argued, in 2027, onto a list of the hundred most beautiful websites in the world. Beauty here is restraint with a point of view, not spectacle, not a Dribbble shot that falls apart when you scroll, resize, or open it on a phone.

2026–2027 award work, read from Awwwards and from Figma’s 2026 trend notes, has settled on a few things. Type is the hero, not a label on a hero image. Motion is pacing for a story, not a hover effect on every card. Color is a short palette used with discipline. Gamification, points, badges, and kinetic lettering on every section are the trends to refuse. They make a rice shop look like a supplement brand.

Study the attitude of these references. Do not copy their brands, logos, photography, layouts pixel for pixel, or wording.

- **Aesop**, as audited in 2026 and as originally framed by Work & Co. The homepage trusts one still life and one line of history. There is no carousel, no overlay ribbon, no second idea competing in the first viewport. The scroll is short. Every section has a reason to exist. On the product page the object, the price, and the buy button sit in the first screen, and the essay, the ingredients, and the close-ups sit below. Calm motion, the kind you feel in a shop, not a launch trailer. Aesop’s weakness is that the page can sell the brand and forget who the product is for. Do not copy that weakness. On a variety page the first paragraph names the dish and the person who cooks it.
- **More Nutrition**, Awwwards Site of the Day on 3 November 2025, by Future Three. One product, a tight palette, and scroll as the way you turn the object in your hand. They did not use a video. They tied rendered frames to scroll with GSAP, and when swapping image sources lagged they drew the frames on a canvas instead. Lenis carries the scroll. The goal they stated was that the product feel tangible without giving up usability. Do this once, on the homepage grain only. Do not repeat it on the other variety pages.
- **Shopify Renaissance Edition.** Commerce with the manners of a book. Two colors do the work: parchment `#F7F7EE` and ink `#292919`. You may add one clay and one sage, used rarely, never as a fill for large areas.

Rules:

- Display serif for headlines. A plain grotesque for moisture, polish, weight, and price. The pairing is specified in the craft section. Do not pick a third family.
- The visitor never sees 10 cards on the homepage. The homepage shows **one grain** and a sentence, then two ways in (by place, or by purpose), then four of the ten. Not the whole list.
- The catalog is a **map of India**. Only the states of these 10 are lit. Choosing a lit state reveals that state’s grains from this list and one paragraph on the land. Unlit states are not clickable.
- A variety page is a **short story**: where it grows, who kept it, what it smells like, what dish it is for. A sticky column holds weight, polish, placeholder price, and add to cart.
- No carousels, no points or badges, no neon, no gradients, no glassmorphism, no pure white `#FFFFFF` page background, no 3D grain on first load, no autoplaying video.
- Motion budget: one homepage sequence. Variety pages get a quiet image reveal and nothing else. Honor `prefers-reduced-motion`. The site must be fast on a phone.

## Award-level craft

This section is the standard the homepage and the Gobindobhog page are judged against. A page that is merely good has a serif, a warm background, and tidy cards. A page at this bar has a rhythm you can feel with the sound off, type that could be the poster, and a buy button you never have to hunt for.

### Typography

Pair one high-contrast display serif with one neutral grotesque, and stop.

- Serif, for the name of the grain and the one-sentence story: Fraunces, loaded with `next/font`, optical size on, soft weight around 360–440 for display lines that are large. If Fraunces looks too sweet at that size, use Newsreader at a light weight. Do not use a default system serif. Do not use more than one serif.
- Grotesque, for navigation, the buy column, nutrition, and any number: Geist or Schibsted Grotesk, also through `next/font`. Regular for body, medium for labels. No bold screaming.
- Scale. The homepage grain name should feel like a magazine cover: on a desktop viewport, roughly 12 to 18 percent of the viewport height, with tight but not colliding leading. Body copy sits at a size where a line holds about 60 to 70 characters. The price is grotesque, smaller than the name, and optically aligned with the buy button, not floating in its own style.
- The licensed faces named in luxury trend writing (Canela, Ogg, Editorial New, Söhne, GT America, Neue Haas Grotesk) are the mood, not the files. Do not hotlink them and do not pretend a fallback is one of them. Fraunces plus Geist is the shippable version of that mood: an organic serif against a razor grotesque.
- Variable font if the family supports it. Do not animate font weight on scroll except inside the single homepage sequence, and only if it stays smooth.

### Spacing rhythm

Use an 8-pixel base and stick to it. Sections are not stacked cards with equal padding.

- Desktop section padding is large and uneven on purpose: about 120 to 160 pixels of air before a new idea, about 72 to 96 on a phone. The first viewport is the exception. It is composed, not padded into emptiness by accident.
- One idea per viewport on the homepage. When the next idea starts, the previous one has finished.
- Body measure stays narrow even when the screen is wide. The story column on a variety page is not a full-bleed paragraph. The sticky buy column is a fixed, quiet rail, about 320 to 380 pixels, and it never covers the story.
- Align to a single vertical grid. If the grain name, the sentence, and the two ways in do not share one left edge, the page is not finished.
- Do not use a 12-column card grid anywhere a person is meant to feel something. A state with two grains may show both. Ten cards on the homepage may not.

### Color

The page is paper and ink. Color is a material, not a theme toggle.

- Page background: parchment `#F7F7EE`. Never `#FFFFFF` as the page fill.
- Text and rules: ink `#292919`. Body text on parchment must clear WCAG AA. If a light weight of the serif fails contrast, darken the ink or raise the weight. Do not lighten the type to look delicate if it becomes unreadable.
- Clay `#C47A5A`: one accent in a viewport. A rule, a small mark, the focus ring. Not a button fill on every page, not a gradient.
- Sage `#7C8573`: the second accent, even rarer. Use it for a map state or a purpose door, not for both at once.
- No gradients, no glow, no colored shadows, no dark-mode version in this pass. Night is not a theme. The night cup is a future product.

### Scroll-driven storytelling

Scroll is the edit. It is not a place to hang effects.

On the homepage, one sequence, modeled on More Nutrition’s method. As the visitor scrolls the first viewport, a still of the grain changes in a way that feels like turning it, or like light moving across the bran. Implement it as a short run of frames drawn on a canvas with GSAP ScrollTrigger, scrubbed to the scroll, with Lenis smoothing the wheel. Do not use a background video. Do not swap an `img` source on every scroll tick. That is the lag More Nutrition already hit and fixed by drawing on a canvas. Cap the sequence at a handful of seconds of scroll, then release the page into the sentence and the two doors. If there is no photograph to slice into frames, do not fake a 3D grain. Set the type and the parchment perfectly and leave a note that the frame sequence is waiting on a real picture.

On a variety page there is no scrub. The story is the scroll. The first screen is the name, one sentence, the dish, and the sticky buy column, in the Aesop order: object and price before the essay. Below that, the origin, the smell, the soaking, the nutrition, the farmer note, each as its own short block with real air between them. The reader should feel they are turning a page, not opening an accordion.

Lenis is global and light. It must not trap the scrollbar, break anchor links, or fight the finder’s questions. If Lenis and the accessibility tree disagree, Lenis loses.

### Motion and micro-interactions

Motion explains. It does not perform.

- Durations live between about 200 and 450 milliseconds. Ease out. No bounce on a rice shop.
- Allowed: the homepage frame sequence. A variety image that fades and rises a few pixels the first time it enters. A text link whose underline draws on. The buy button darkening on press, with a slight scale no one would measure. The map state filling with sage on hover and on focus, same treatment for both.
- Forbidden: parallax on every block, cursor trails, magnetic buttons, page-transition theatre, loading animations longer than a blink, scroll-jacking that takes over the wheel, marquee text, and letter-by-letter hero animation.
- The cart and account pages are still. If they move, they are wrong.

### Accessibility

A beautiful site that cannot be used is not on the list.

- Every control works from the keyboard. Focus is a 2-pixel clay ring, visible on parchment, never removed.
- The map cannot be the only way to the 28 states. A text list of states sits with it, in the grotesque, for anyone who does not use a pointer.
- The sticky buy column is not `aria-hidden`, and it does not cover the story when the type is enlarged to 200 percent. At that size the column stacks under the story.
- Images have specific alt text: the variety and what the picture shows. Decorative frames in the homepage sequence are hidden from the accessibility tree if the grain name is already in text.
- Honor `prefers-reduced-motion`. The homepage shows the first frame, or the type alone, and does not scrub. Lenis turns off. Nothing autoplays.
- Heading order is real. One `h1` on a page, the grain name or the page title. Do not skip levels to get a size.
- Do not encode meaning by color alone. A selected state on the map also changes its label weight or adds the word of the state in text.

### Performance

Award pages die in the lab when they are heavy. Hold these budgets on the homepage and on Gobindobhog.

- Largest contentful paint under about 2.5 seconds on a mid-range phone over a slow connection. The thing that paints is the type or one image, not a library of frames.
- Cumulative layout shift at or near zero. Fonts come from `next/font` so the serif does not swap in and shove the headline.
- The homepage frame sequence, if you build it, is a small set of compressed frames, paused when off-screen, not requested again on every visit in the same session. If you cannot keep it inside the budget, ship the still page. A perfect still page beats a janky film.
- No third-party analytics, chat widgets, or tag managers in this pass.
- JavaScript on a variety page is the framework plus the sticky column. GSAP is not loaded there.

### What separates a stunning site from a good one

A good site looks finished in a screenshot. A stunning one still feels right after a minute of scrolling, on a phone, with motion reduced, and with the buy button found in the first screen.

Use this as the reject list. If any line is true, the page is not done.

- The homepage could be any premium food brand if you swapped the word rice.
- More than one idea is shouting in the first viewport.
- Type is sitting on a picture instead of being the picture.
- Spacing is even everywhere, so nothing feels composed.
- Motion is applied because the section felt empty.
- The story of Gobindobhog is below a gallery, a review widget, or a row of related products.
- The price is hard to find, or the page looks beautiful and cannot be bought.
- The phone layout is the desktop page narrowed until the sticky column covers the essay.
- A health claim appears that `doc.txt` did not already state, or a number appears with no source in that file.

When you are unsure, choose the quieter version. Then look again, and remove one more thing.

## Tech

- Next.js (App Router), TypeScript, Tailwind CSS.
- If a v0 export is dropped into the repo, keep it. v0 emits Next.js, React, TypeScript, and Tailwind. Rework the look to this brief. Do not start a second framework.
- Content in typed local data (one record per variety), loaded from a module you seed from `doc.txt`. A CMS can come later. Do not add Sanity, Medusa, ERPNext, or a payment provider in this pass.
- Cart is client-side and plain. Checkout can be a stub page that lists the bag and says payment is not connected.
- Lenis for scroll, GSAP only for the one homepage sequence.
- Do not use the Relume MCP. Do not generate 10 unique layouts. One variety template, one state template, fed by data.

## Pages

Build these routes and no others in this pass.

| Route | What it is |
| --- | --- |
| `/` | Home. One grain, one sentence, by place or by purpose, then four grains. |
| `/atlas` | Map of India. Only the states of the 10 are lit. A lit state opens its grains from this list. |
| `/states/[slug]` | One lit state. Its grains from the 10, and one paragraph on the land. |
| `/rice/[slug]` | Variety story. Sticky buy column. Nutrition, soaking, and farmer note below. |
| `/purpose` | Five doors. Each is a short essay and the grains from the 10 that belong there, not a grid of all 10. |
| `/find` | Four questions (a dish, steadier energy, a state, or a time of day). Returns three grains. |
| `/mill` | Bran and broken-kernel products only. |
| `/releases` | Dated list with no products yet. Copy explains single-lot tins, seasonal cups, and the night cup are not for sale yet. |
| `/journal` | A short index of essays. One sample essay that ends on Gobindobhog. |
| `/cart` | Plain list. No editorial motion. |
| `/account` | A quiet sign-in stub. No real auth. |

## Build order

Do these steps in order. Do not skip ahead.

1. Scaffold the Next.js app in this repo if it is not already there. App Router, TypeScript, Tailwind. Set the parchment and ink tokens and the two typefaces.
2. Define the variety type: slug, name, state, purpose, story, smell, dish, nutrition note, soaking note, farmer note, polish, placeholder price. Seed **only Gobindobhog** from `doc.txt`.
3. Build `/` and `/rice/gobindobhog` until both match the design rules above. Use a real photograph only if one is already in the repo. Otherwise use a quiet solid field and say the photograph is missing. Do not download random stock of rice.
4. Stop. Summarize what you built and what is still placeholder. Wait for review before continuing.
5. After review: seed the other 9 varieties from `doc.txt`, then build `/atlas`, `/states/[slug]`, `/purpose`, and `/find`. The map lights only their states.
6. Build `/mill` with two placeholder products (bran, broken-kernel flour), clearly separate from the grains.
7. Build `/releases` empty, `/journal` with one essay, `/cart`, and `/account`.
8. Check the homepage, Gobindobhog, one state, the map, the mill, and the cart in the browser. Fix anything that shows a wall of cards, a lit state that is not in the 10, a pure-white page, or a health claim you added.

When you are unsure, choose the quieter version.
