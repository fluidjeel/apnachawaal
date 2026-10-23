# ApnaChawal — conversation and research summary

Sources: the Gemini thread saved in `gemini-chat.md`, and the compiled guide in `doc.txt`. Chrome is open on this Mac. Cursor cannot see inside that window until Accessibility and Screen Recording are turned on for Computer Use (System Settings, Privacy & Security). The notes below are from the saved thread and the guide.

The thread is one main Gemini chat. You asked twice whether you were in a fork or a subagent chat. The first reply could not tell. The later reply said this is the main chat, and the repeated “your Google Doc is ready” blocks were background research updates pasted into the same session. The working document is the Google Doc **ApnaChawal.com: Comprehensive Heritage Rice Varieties of India (State-by-State Guide)**, created 18 October.

## How the thread moved

1. **The brief.** Package hard-to-find rice from every Indian state under one brand, apnachawal.com, and collect the story and specialty of each grain.
2. **First samples, then the full set.** Gemini started with Chak-Hao, Kalanamak, Joha, Gobindobhog, and Mappillai Samba, then Navara, Ambemohar, Rajamudi, and a Nagaland sticky rice it called Mokdo. You asked for at least three varieties and a story per state, then told it to compile the long report instead of going state by state in chat.
3. **Procurement, while the report ran.** The supply problem it named is fragmented smallholders in remote places: uneven yields, weak village storage, multi-state transport, and traceability from farm to pack. That answer stayed short. No supplier list was built.
4. **The guide landed, then you widened it.** You asked what processing improves quality. Then you asked for a benefits column, a column on how post-harvest keeps or moves nutrients, and a regional dish for each rice. Then you asked for product-design ideas that ignore marketing, sales, and supply chain.
5. **The software question.** You asked whether this is one program or many. The answer was five systems: buy the ordinary commerce pieces, custom-build only the milling, blend, and story layer.
6. **One site, different people.** You wanted one login and different views for customers, back office, and admin, hosted on apnachawal.com rather than ten products. The follow-up recommendation was one brand domain, but not one app with `/admin` and `/ops` paths.
7. **Look and language.** You asked what to code so the site feels expensive, story-led, and fast. The answer was TypeScript end to end, with a luxury-editorial front end.
8. **What you are actually selling, in plain words.** The last two turns split the offer into three product tiers and wrote a jargon-free pitch for each of the five rice categories.

An early name did not survive into the final 84. Nagaland’s “Mokdo” was replaced by Naga Chakhao, Kemenya, and Mon Nyakmok. “Rajmudi” was later spelled Rajamudi.

## What you are selling

The surface product is rice. The line Gemini wrote for the brand is that ApnaChawal turns endangered Indian heirloom rice into premium, science-backed functional food: the medicinal use, fragrance, and terroir of 84 old grains, with modern convenience. The umbrella line for ordinary buyers is: “Your ancestors ate better rice than you do. We’re just bringing it back.”

Three tiers:

1. **Terroir grains.** The 84 landraces, in five discovery groups, milled so the germ stays and home cooking gets shorter.
2. **Convenience and wellness.** 18-minute mixed-grain blends, Boka Chaul travel cups, heat-stable low-GI rice, and freeze-dried fermented-rice cubes.
3. **High-margin leftovers.** Gluten-free flours, anthocyanin and gamma-oryzanol extracts from the 2% bran dust, and infant and geriatric porridges. Broken kernels and bran are treated as products, not waste.

The customer contrast in the chat: commodity rice sells “carbs, white grain, a 45-minute boil, an anonymous sack.” ApnaChawal sells steadier blood sugar, fragrance that hybrids lost, rice that cooks in 18 minutes or hydrates cold, and a named place and story.

## Plain pitches for the five categories

Written for households, not for a food-science label.

| Category | Hook |
| --- | --- |
| Black and red | “Same rice. More nutrition. Less hunger. Less sugar crash.” Framed as grains grandmothers served to brides and nursing mothers. |
| Fragrant short-grain | “Your khichdi, pulao, and payesh will never taste the same again.” Set against supermarket “fake-fragrant” Basmati. Names Gobindobhog, Joha, Kalanamak, Seeraga Samba. |
| Ayurvedic and estuarine | “The rice your body was always designed to eat.” Navara by name in Ayurveda; Matta as the Onam grain; gut and sugar as the everyday claim. |
| Original Basmati | “You’ve had the copy your whole life. Try the original.” Basmati 370 selected in 1933, slow to mature, aged in the husk, milled when the order comes in. |
| Zero-cook | “The only rice on earth that cooks itself. And it’s Indian.” Boka Chaul in cold milk or water for 15 minutes, as Bihu jolpan and as a desk or travel cup. |

## Software: what to buy, what to build, where it lives

Do not build payments, courier labels, or accounting. Do not launch on a plain store template either, because the order is not a finished T-shirt. A bag of rough paddy is milled on demand and split. The chat’s yield split for 1,000 kg is about 82% head rice, 15% broken kernels for flour, and 2% bran for extract.

| System | Job | Decision |
| --- | --- | --- |
| Storefront and blend configurator | Filters by state, GI, GI-index, pigment, and dish. Polish choice: whole grain, 2% dhenki-cut, or GABA sprouted. Custom blends. | Shopify first. MedusaJS plus Next.js later. Custom UI only for the configurator. |
| Mill ERP | Multi-level bill of materials, milling work orders, FSSAI lot genealogy, soaking and germination timers. | Configure ERPNext. Do not write an ERP. |
| Farm-to-pouch QR | FPO, harvest date, GPS, moisture, aging time, lab notes, cooking timer. | Small custom Next.js page on ERPNext batch IDs, or a traceability product such as TraceX. |
| Orders, warehouse, shipping | FEFO, mill aromatics no more than about 14 days before dispatch, courier choice. | Shiprocket early. Unicommerce, Base.com, or WareIQ later. |
| Rice finder | Health goal or dish in, variety, polish, and water ratio out. | Custom. This is the brand’s own tool. |

**One domain, three front doors, one repo.** Public pages stay on `apnachawal.com`, including `/b2b` and `/trace/[batch-id]`, so search authority stays on the root. Mill, warehouse, lab, and admin go to `ops.apnachawal.com` behind Cloudflare Zero Trust and a hardware second factor, so a mill-screen bug does not take down checkout and admin cookies are not on the public site. Field intake goes to `fpo.apnachawal.com`, a light offline-capable phone app: harvest weight, moisture, GPS, then sync. `api.apnachawal.com` is the only API the three fronts call. All three fronts live in one Next.js Turborepo and share types and the design system.

Roles called out: retail customer, B2B and export buyer, FPO partner, mill and warehouse, founder.

**Launch shape.** Months 1–3, aim to be live in about six weeks: Shopify, Shiprocket, ERPNext, plus only the rice finder and the batch QR page. Months 6–18: move commerce to MedusaJS for B2B price lists and live blend pricing, and connect silo temperature and humidity sensors to ERPNext.

**Design stack for a premium feel.** TypeScript on the site and the API. Next.js App Router, Tailwind, Lenis for weighted scroll, GSAP ScrollTrigger for grain stories, Framer Motion for the finder drawer, React Three Fiber only where a grain or a map earns it. Stories in Sanity or Strapi. Commerce in MedusaJS. Milling and silos stay in ERPNext (Python). Visual notes: a display serif with a plain grotesque, parchment and clay and charcoal instead of pure white, full-bleed field video, and a variety page that is a short dossier with a polish slider, not a supermarket grid.

## What the work is for

ApnaChawal.com is positioned as a story-driven catalog of Indian heritage rice, not a commodity white-rice shop. India is treated as the historic center of domesticated rice, with more than 6,000 surviving landraces. The catalog argument is that industrial hybrids and heavy milling stripped away traits landraces still carry: submergence and salinity tolerance, iron and zinc, anthocyanins, and the 2-acetyl-1-pyrroline (2AP) aroma that comes from a recessive mutation in `OsBadh2`.

The curation target is **three signature varieties from each of India’s 28 states — 84 varieties** — grouped into five agro-ecological zones.

## Five functional categories

Up to about 80% of minerals, B-vitamins, and polyphenols sit in the bran, aleurone, and germ. A uniform 10% abrasive polish is treated as the main way those advantages are lost. Each category has a processing rule meant to keep the trait that makes it worth selling.

| Category | What it is for | Processing rule | Signature uses |
| --- | --- | --- | --- |
| Pigmented black, purple, and red | Anthocyanins, roughly double the iron and zinc of white checks, low GI (~48–55) | Rubber-roll shelling and 0–2% dhenki-style micro-scoring; optional germination to unlock iron, zinc, and GABA | Chak-Hao kheer, kavuni halwa, Jadoh, Pahari dham |
| Short- and medium-grain non-Basmati aromatics | 2AP fragrance, digestibility, iron/zinc in grains such as Kalanamak | Keep paddy in-husk at ≤15°C; single-polish 3–4% only at dispatch. Milled 2AP can fall 54–73% within 3 months | Bhoger khichuri, biryani, masale bhat, payesh |
| Coastal, estuarine, and Ayurvedic parboiled | B-vitamins, magnesium, calcium, Type-III resistant starch; Navara as a neuromuscular grain | CFTRI hot-soak parboil at 65–70°C so thiamine and niacin move into the kernel (about 4–5× the thiamine of raw milled rice) | Onam matta, Goan xitt kodi, pez, sannas |
| Traditional long-grain Basmati and fine table rice | Higher amylose (20–25%), linear elongation, satiety; Telangana Sona cited at GI ~51.5 | Age 6–12 months in the husk; semi-polish (~5%) instead of a 10% silky glaze | Dum biryani, zarda, pulihora, daily annam |
| Glutinous and zero-cook “magic” rices | Very low amylose (under 2% in Boka Chaul), cooling energy, gluten-free binding | Steam rough paddy (komal processing) so starch gelatinizes inside the hull and the grain hydrates in cold water or milk | Jolpan, bamboo rice, pithas, sticky cakes |

## Five zones

1. **North (6 states).** Himalayan red japonica, black-husked Buddhist-era grains, and pure-line Basmati of the Indo-Gangetic plains.
2. **West and Central (5 states).** Khazan salt-tolerant rices, Western Ghats aromatics, and Vindhya–Satpura tribal grains.
3. **East (4 states).** Temple bhog rices, upland Gora rices, and cumin-pearl grains kept by tribal seed savers.
4. **South (5 states).** Ayurvedic red rices, palace grains, and estuarine rices.
5. **Northeast (8 states).** Sticky black, purple, and red rices of the Indo-Burma hotspot, Ahom zero-cook rices, and terrace paddy-fish grains.

## The 84-variety catalog

Each state entry in the source pairs three varieties with a nutrition note, a milling or storage note, and a dish. GI or farmers’-rights status called out in the write-ups is marked below. This is not a complete legal GI list; it only records what the research text flags.

### North

| State | Varieties | Role |
| --- | --- | --- |
| Haryana | Taraori (HBC-19), Basmati CSR 30 (Yamini), Muchhal (Pusa 1121) | Benchmark aged Basmati; sodicity-tolerant Yamini (soil pH up to 9.5); extra-long 1121 that can stretch to 20–25 mm |
| Himachal Pradesh | Chhohartu, Jatu, Matali (Lal Dhan) | Cold-hardy red japonica. Chhohartu was the state’s first PPV&FRA registration (2013). Iron up to 21.9 ppm and zinc up to 25.9 ppm are cited for these red rices. Maand (cooking water) is the traditional tonic |
| Punjab | Basmati 370, Basmati 386, Ranbir Basmati | 370 (selected 1933) is the parent line of modern Basmati. 386 is one of the six traditional notified Basmati varieties. Ranbir is the early sub-montane selection |
| Rajasthan | Kali Kamod, Mahi Sugandha, Hadoti Basmati | Black-husk Vagad landrace; gall-midge-resistant Mahi river aromatic; Chambal long-grain |
| Uttar Pradesh | Kalanamak, Adamchini, Bindli | Kalanamak (“Buddha’s gift”) and Adamchini (GI 2023) are the aromatic pair. Bindli is a floodplain micro-grain claimed locally to beat Basmati on aroma and digestibility. Kalanamak is cited at GI ~49–52 and protein ~10–11% |
| Uttarakhand | Purola Lal Chawal, Tilak Chandan, Thapachini | Snowmelt red japonica (GI noted for the Uttarakhand red), sandalwood-scented Tilak Chandan revived after the Green Revolution, and Baranaja hill grain Thapachini |

### West and Central

| State | Varieties | Role |
| --- | --- | --- |
| Chhattisgarh | Jeeraphool, Nagri Dubraj, Vishnubhog | Jeeraphool (GI 2019) and Nagri Dubraj (GI 2023, “Basmati of Chhattisgarh”) plus temple Vishnubhog |
| Goa | Korgut, Assgo, Kalo Novan | Khazan salinity-tolerant reds, parboiled as Ukdo, for fish curry, pez, sannas, and Patoleo |
| Gujarat | Krishna Kamod, Jirasar, Pankhali | Soft medium and short aromatics for khichdi, doodhpak, and Surti snacks |
| Madhya Pradesh | Balaghat Chinnor, Kali Mooch, Seoni Jeera Shankar | High bran-oil aromatics; low-pressure milling and vacuum bricks to keep a buttery gloss |
| Maharashtra | Ambemohar, Ajara Ghansal, Wada Kolam | Western Ghats grains. Ambemohar cited near GI ~50. Wada Kolam received a GI tag in 2021 |

### East

| State | Varieties | Role |
| --- | --- | --- |
| Bihar | Katarni, Marcha (Mircha), Sonachur | Katarni (GI 2018) and Marcha (GI 2023) are beaten into chura. Sonachur is the Chhath and wedding grain |
| Jharkhand | Karhani, Gora Dhan, Dehati Kala Jeera | Adivasi medicinal and upland aus rices: Handia, maar, and 85–95 day Gora on tanr land |
| Odisha | Koraput Kalajeera, Kalabati, Machhakanta | Kalajeera (GI 2023–24, FAO GIAHS / Jeypore tract) is the “Prince of Rice.” Kalabati is a long black anthocyanin grain. Machhakanta is the pakhala and temple grain |
| West Bengal | Gobindobhog, Tulaipanji, Radhunipagal | All three are described as GI (2017, 2017, and 2024–25). Gobindobhog is buttery and slightly sticky; Tulaipanji is ~28% amylose and non-sticky; Radhunipagal is the iron-and-zinc payesh grain |

### South

| State | Varieties | Role |
| --- | --- | --- |
| Andhra Pradesh | Chitti Muthyalu, Kullakar, Bahurupi | Pearl aromatic plus unpolished reds. Zero-polish for the reds; in-husk aging so Chitti Muthyalu stays firm in pulao |
| Karnataka | Rajamudi, Kagga, Mysore Mallige | Palace red Rajamudi, estuarine Kagga, temple Mallige. Keep the red-amber bran at 1–2% milling |
| Kerala | Navara, Palakkadan Matta, Wayanad Jeerakasala | Ayurvedic Shashtika Navara (germinate, do not polish), parboiled Matta, and Kaima for Thalassery biryani |
| Tamil Nadu | Seeraga Samba, Mappillai Samba, Karuppu Kavuni | Selenium biryani pearl, low-GI (~50) stamina red, anthocyanin black. Hand-pound or micro-score the pigmented grains |
| Telangana | Chittimutyalu, Telangana Sona, Jai Sri Ram | Sona is the low-GI (~51.5), high-niacin daily rice if semi-polished at 3–4%. Heavy whitening is treated as the thing that raises its GI |

### Northeast

| State | Varieties | Role |
| --- | --- | --- |
| Arunachal Pradesh | Khaw Tai, Apatani Emo, Apatani Pyaping | Sticky Khamti rice and Ziro paddy-fish terrace grains. Shade-dry and under-mill |
| Assam | Joha, Boka Chaul, Chokuwa | Joha for 2AP and fatty acids; Boka and Chokuwa as komal zero-cook grains |
| Manipur | Chak-Hao Amubi, Chak-Hao Poireiton, Moirangphou | Black and purple prenatal tonics. Micro-score or pre-germinate so soaking drops from overnight to about 30 minutes |
| Meghalaya | Minil, U Khaw Saw, Pnah Iong | Sticky, red, and black hill rices. Stabilize lipase so monsoon humidity does not turn the bran rancid |
| Mizoram | Buhban, Kawnglawng, Buhpui | Jhum and waxy rices. Do not age them; aging kills stickiness. Vacuum-seal fresh |
| Nagaland | Naga Chakhao, Kemenya, Mon Nyakmok | Upland red and black grains, plus the glutinous rice used for Thuthse / Zutho. The research notes 867 documented Nagaland landraces |
| Sikkim | Attey, Kalo Nunia, Takmaru | Organic terrace staples. Shade-dry and keep the germ. Kalo Nunia is the black-husk wedding grain |
| Tripura | Kali Khasa, Binni (Guria), Harinarayan | All three are described as GI. Kali Khasa is cited at ~8.5–9% protein. Binni is the sticky rice for Bangwi |

## How the catalog is meant to be sold

Three merchandising ideas sit on top of the 84 varieties:

- **Five terroir boxes:** Himalayan crimson and snowmelt; Western Ghats and khazan tides; temple bhog and tribal seeds; Ayurvedic Shashtika and royal biryani; Seven Sisters sticky and magic rices.
- **Shop by function, not only by state:** anthocyanin black and purple; medicinal iron-dense red; zero-cook; saltwater and climate-resilient; short-grain biryani and bhog aromatics.
- **QR traceability** to the FPO or seed-keeper group (Koraput women’s seed banks, Apatani paddy-fish farmers, Purola growers), plus soaking ratios and water-to-grain measures on every pouch.

## Post-harvest protocol

One mill setting is treated as the failure mode. The recommended line has six stages:

1. Dry to 14–16% moisture with staged tempering, then store at 12–13%. Keep aromatic drying at or below 42°C. The claim is fewer fissures and higher head-rice yield.
2. Age Basmati, Taraori, and Seeraga Samba 6–12 months in the husk. Chill soft aromatics (Gobindobhog, Ambemohar, Joha) under 15°C and mill them on demand.
3. Rubber-roll the pigmented rices and micro-score 1–2% so they cook faster while keeping most of the bran, iron, and anthocyanins.
4. Hot-soak parboil coastal rices and komal-process Boka Chaul and Chokuwa. This replaces multi-day cold soaks that ferment and smell sour.
5. Germinate the wellness line (Navara, Kalanamak, Kullakar, Karhani) into GABA brown rice.
6. Kill lipase with a short dry steam and pack unpolished and aromatic SKUs under vacuum or nitrogen. Target shelf life moves from about 2 months to 12–18 months.

## Product ideas beyond the pouch

The research argues that selling only raw grain leaves the category open, and it sketches seven formats:

1. **Chrononutrition blends** with cooking times equalized (black rice otherwise needs ~45 minutes, white aromatics ~15). Morning stamina blend and an evening sprouted GABA blend.
2. **Type-V resistant starch** by complexing high-amylose varieties (Tulaipanji, Basmati 370, Taraori, Kalanamak, Telangana Sona) with bran lipid, coconut oil, or ghee during steaming. Unlike retrograded starch, these complexes are described as stable above 100°C.
3. **Freeze-dried pakhala / neeragaram / pazhankanji** cubes from Machhakanta, Kullakar, Mappillai Samba, Korgut, and Karhani.
4. **Gluten-free flours** that pair waxy Northeast rices (Boka, Minil, Buhban) as binders with pigmented structure builders (Karuppu Kavuni, Kalabati, Pankhali), milled wet or cold to 50–80 μm and under 4% damaged starch.
5. **Upcycled micro-bran** from the 1–2% polish of Chak-Hao, Kavuni, Kalabati, and Navara, sold as anthocyanin (C3G) and gamma-oryzanol colorants, capsules, or cosmetics.
6. **Zero-retort meal cups** built on Boka Chaul and Chokuwa, which hydrate in ambient or warm liquid after in-husk parboiling.
7. **Infant and geriatric nutrition**, using a trace of sprout alpha-amylase to thin porridge while raising calorie and iron density, plus extruded analogues from the 10–15% broken-grain stream.

## Still open

Gemini offered these and the saved thread does not show you taking them up: a mill SOP and vendor spec for FPOs, a Google Sheet of all 84 varieties with milling percent and recipes, formulation ratios for the first three products (18-minute blend, RS5 rice, freeze-dried pakhala cubes), a clickable storefront with the rice finder and QR page, and a click-through of the customer, FPO, and mill screens.

The thread also does not choose suppliers, prices, pack sizes, or which nutrition and GI lines are strong enough to print. Those figures are cited inside the guide and still need a primary-source check. Shelf-life wording is not identical everywhere in the chat: one pass says unpolished rice lasts 6–8 weeks before stabilization, the guide says about 2 months; both land on 12–18 months after lipase treatment and vacuum or nitrogen packing. Polish percents also drift between replies (about 2–3%, 3–4%, and 3–5% depending on the grain). Treat the per-variety notes in `doc.txt` as the working spec until you lock one number per SKU.
