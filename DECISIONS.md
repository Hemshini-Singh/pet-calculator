# 📋 Decision Log & Research Audit Trail

**Companion to [PROJECT.md](./PROJECT.md).** PROJECT.md is *what to build*. This document is *why we built it that way* — the reasoning, the evidence, the things we got wrong and corrected, and the options we rejected.

**Purpose:** anyone (including you, in three months, when you've forgotten why the food calculator asks for BCS) should be able to read this and understand the reasoning without redoing the research.

**Last updated:** 2026-11-12

---

## How to use this file

- **Building a feature?** Read the relevant Decision (D-number) first. It usually names the constraint that feature must satisfy.
- **Stuck on a question?** Check §7 (Open Questions) — some things were deliberately left unverified.
- **Reviewing a PR?** §5 (Reversed Decisions) explains why things look the way they do despite looking arbitrary.
- **Doing outreach?** §8 (Talking Points) has the language for vet clinics, breed clubs and pet food brands.

---

## 1. The niche-selection journey

Six candidate niches were evaluated. Four were eliminated with data before the pet calculator was chosen. **Keep this section** — if the pet project is ever paused or revisited, it is the first place to look for alternatives, and it is the audit trail for why we didn't pick something obvious.

| # | Niche | Evidence checked | Why it was rejected | Revisit if |
|---|---|---|---|---|
| 1 | JEE Rank College Predictor | `collegedekho.com/exam/jee-main/college-predictor` returns **0 organic traffic** on a clean URL | Not a demand signal — a ranking artifact. Highly seasonal (Jan–Jul only), near-zero intent outside that window | Never. The traffic number is the disqualifier |
| 2 | AI Tools Directory (regional/Hindi) | `ai reel script generator hinglish`, `ai voiceover tools hindi free` → **0–10 monthly searches** | Volume is too low to ever matter. YouTube and Play Store absorb the intent, and AI models answer directly | Volume genuinely grows >100/mo on specific terms |
| 3 | Global Finance / Tax Calculators | `taxable income calculator`, `estimated tax calculator` → Ahrefs **KD 61–69** | Needs 130–190+ high-tier backlinks to crack top 10. NerdWallet / IRS / Bankrate own the SERP permanently | You'd have authority to spend on links |
| 4 | Global Business / Startup Calculators | `startup runway calculator`, `burn rate calculator` → **10–1,000 searches** | Volume too low for a standalone platform. Would need a paid-product pivot, not SEO | You're willing to sell a SaaS product instead |
| 5 | **Global Pet Calculator Hub** | 10K–100K searches on multiple head terms, **KD 2–13** | **SELECTED** — see §2 for what we later found | — |
| 6 | *(Held in reserve)* Housing Society / RWA calculators (India) | Live SERP returns only ~3 real tools + 2 Scribd PDFs | **Not selected, but relocated and kept** at `E:\new project-society` — it is the lowest-competition fallback in this table | The pet project hits a kill criterion (§7 of PROJECT.md) |

> **Note on #6:** it wasn't in the original comparison table because it wasn't one of the ideas explored in that session — it came out of the workspace itself. It is arguably the *easiest* of the six to rank for, but has a much smaller traffic ceiling and an indirect monetisation path. It was relocated on 2026-11-12, not discarded.

---

## 2. Verification log — what was actually checked, and when

Nothing in this project rests on a claim we didn't test. This is the log.

### 2.1 Live SERP pulls — DuckDuckGo, 2026-11-12

Pulled via `lite.duckduckgo.com` from the development environment.

| Query | Result | Key finding |
|---|---|---|
| `puppy growth calculator` | 10 dedicated competitors | yourpaws.com, puppygrowthcalculator.com, dogster.com, thepetcalculator.com, purecalculators.com, dogcalculator.net, dogsizecalculator.net, omnicalculator.com, calculator-online.net, mypuppyweightcalculator.com |
| `cat years to human years calculator` | 10 dedicated competitors | catcalculator.com, thepetcalculator.com, almanac.com, catster.com, omnicalculator.com, animalcalculators.com, catsagecalculator.com, catagechart.com, lumencalculator.com, yearstohuman.com |
| `dog food calculator how much to feed` | 10 dedicated competitors **incl. pet retailers** | thepetcalculator.com, feedreal.com, dogcalculator.net, dogfoodcalculator.net, thedognutritionist.com, petcarecalculators.com, dogfeedingcalc.com, breedtobowl.com, infinitycalculator.com, dogfoodcalculator.net |
| `french bulldog food calculator` | **9 breed-pSEO pages already exist** | frenchiestore.com, petcalculator.com, dafrenchie.com, frenchietails.com, frenchiecheck.com, petmealplanner.com, petcalori.com, breedcalc.com, petcalcengine.com |
| `dog pregnancy calculator` | 10 dedicated calculators | calculator-online.net, omnicalculator.com, dogcalculator.net, dogpregnancycalculator.com, furcalc.com, dogpregnancycalendar.com, dogscalculators.com, mydogpregnancycalculator.com, caninepregnancycalculator.com, inchcalculator.com |
| `cat food calculator how much to feed` | 10 dedicated competitors | thepetcalculator.com, catfoodcheck.com, catcalculator.net, calcqube.com, bestfamilypets.com, petscalculator.com, catcalculators.com, catcalculatoronline.com, expertcatcare.com, petcarecalculators.com |
| `housing society maintenance interest calculator` | **only ~3 real tools** | societyeasy.com, toolmintx.in, databus.co, dearsociety.in, mygate.com, puneri.news + 2 Scribd PDFs |

**Finding:** ~45–50 distinct pet-calculator domains rank across the head terms. The niche is **crowded, not empty**. The original research summary's phrasing — *"no dominant dedicated competitor"* — was technically true but practically misleading.

### 2.2 Competitor content analysis

Across the competitor set, titles are **near-identical across unrelated domains**:

> *"Dog Pregnancy Calculator - Due Date & Week-by-Week Timeline"*
> — `dogcalculator.net`, `dogpregnancycalculator.com`, `mypuppyweightcalculator.com`, `caninepregnancycalculator.com`

Meta descriptions are equally duplicated. **Conclusion: these are AI-generated content farms.** You cannot out-content this field — you can only out-engineer and out-credible it.

**The single most encouraging counter-finding:** `omnicalculator.com` (DR 90+) and `almanac.com` are **not** ranking #1 for these queries. Google is rewarding tool relevance over domain authority. A new domain with a materially better tool can rank fast. **The KD 2–13 reading is real.**

### 2.3 Domain availability — RDAP, 2026-11-12

| Domain | Result | Method |
|---|---|---|
| `petcalc.com` | ❌ Taken 2017, transfer-locked | Verisign RDAP |
| `petcalculator.com` | ❌ Taken 2020, fully locked | Verisign RDAP |
| `pawcalc.com` | ❌ Taken Nov 2025, Vercel DNS — live competitor | Verisign RDAP |
| `mypetcalc.com` | ❌ Taken Apr 2026, parked | Verisign RDAP |
| **`petcalc.io`** | ✅ **AVAILABLE** | Identity Digital RDAP, 404 — **control-tested** against `wordpress.io` (returned full data) to confirm 404 = unregistered |
| **`petcalculator.io`** | ✅ **AVAILABLE** | Same method |

The `.com` pet-calc name space is exhausted, but **the original brand survives on `.io`**.

### 2.4 Google SERP + AI Overview audit — Incognito, ENG/IN, 2026-11-12 23:08–23:10

| Query | AIO? | What the AIO does | AIO position | Verdict |
|---|---|---|---|---|
| `cat years to human years` | **Yes — total** | States the conversion rule (yr 1 ≈ 15 human yrs, yr 2 adds 9, yr 3+ adds ~4/yr), attributed to La Petitta Labs. Image carousel of cat-age charts | Entire first screen | ☠️ Dead for clicks |
| `how old is my dog in human years` | **Yes — total** | Debunks the "×7" myth and prints the **complete size-based conversion table** (Small/Med/Large/Giant × 1,2,3,5,7,10,12 yrs) + video carousel | Entire first screen, dark mode | ☠️ Dead — the table we planned to build already exists |
| `dog age calculator` | Yes | "The Modern Size-Based Formula" + "Year 1: 15 human years" (cites Omni Calculator) | **Below an image pack** | ⚠️ Damaged, not dead. Organic #1 = Pedigree |
| `puppy growth calculator` | **Yes — but it LISTS TOOLS** | *"use online tools like the **Puppy Weight Calculator by Sydney Animal Hospitals**, the Supreme Dog Growth Calculator, or a general formula"* + "Quick Rule of Thumb" (weight ÷ age in weeks × 52, via VitaDog) | Mid-page, after #1 organic | ✅ Viable + citable |
| `dog food calculator` | **Yes — but it LISTS TOOLS** | *"Use an online **Pet Nutrition Alliance Caloric Calculator** or the **Dog Food Advisor Calculator**"* + required inputs: ideal body weight, **BCS 1–9**, spayed/neutered | Mid-page, after #1 and #2 organic | ✅ Viable + citable |

**⚠️ Caveat:** AIOs are personalised by location, device and history. This audit ran from one location (India). **Re-run from a US IP before locking the citation-target list** (§8).

#### 2.4.1 What Google's AIOs reveal about the citation bar

Sources Google cited, in order of preference:

1. **Veterinary / clinical** — Sydney Animal Hospitals, Purina, Royal Canin, Pet Nutrition Alliance, International Cat Care, La Petitta Labs
2. **Nutrition labs / established publishers** — VitaDog Nutrition, WebMD, PetMD
3. **Established tools** — Omni Calculator, Dog Food Advisor
4. **Nobody** — not one of the 50 clone calculator sites

**Conclusion: to be cited we must look like a clinical source, not a calculator.**

#### 2.4.2 Two findings that changed the build

**(a) The AIO dictates our form fields.** The dog-food AIO specifies the required inputs: **ideal body weight, BCS (1–9), spayed/neutered status**. A tool that asks for less is not worth citing. BCS was originally planned as a separate Tier-2 tool — it was **pulled into the food tool itself**.

**(b) The size-class dataset spine is confirmed.** The dog-age AIO table uses **Small ≤10 kg / Medium 10–25 kg / Large 25–45 kg / Giant 45+ kg** — the WSAVA size classes. Our `sizeClass` field maps directly onto both this and the WSAVA growth charts. Google is already using the same classification.

> **The escape hatch:** that AIO table is *generic by size*. It cannot answer *"how old is my French Bulldog in human years"*. **Breed-level pages are how we beat a generic AIO.**

#### 2.4.3 People Also Ask — verified long-tail targets

Not in the original keyword list. Several are uncontested.

| PAA question | Type | Notes |
|---|---|---|
| "How old is 100 years in cat years?" | **Reverse** calc | AIO and every clone go cat→human only. **Cheapest win available.** |
| "How old is 7 years in cat years?" | Reverse calc | Same |
| "How old is a 20 year old cat?" | Boundary case | End-of-life framing — strong share potential |
| "How old is a 14-year-old cat?" | Boundary case | Senior cat |
| "How old is 3 year old dog?" / "How old is a 7 year old dog?" | Specific | Easy long-tail |
| "How do I calculate a dog's age?" | Informational | Guide page → links into the tool |
| "Is 1 Human year 7 years for a dog?" | Myth | AIO-citable myth-buster |
| "How much food to feed a dog chart?" | **Chart** | Static, linkable, image-worthy |
| "How much food should I feed my dog calculator by weight?" | Tool variant | Long-tail, low competition |
| "How much homemade dog food to feed calculator?" | Tool variant | Feeds the raw/homemade tool |
| **"What is the 95% rule in dog food?"** | **Informational** | Uncovered by every calculator site; natural internal link into the food tool |

#### 2.4.4 Image search is a real channel here

Two of the five audited SERPs showed an **image pack**; the cat AIO runs an **image carousel** of age charts. Growth charts, feeding charts and conversion charts must exist as real images with alt text and an image sitemap. Pinterest is the compounding version of the same channel.

---

## 3. Decision log

Each decision: what was chosen, why, what would reverse it.

### D1 — One domain, not one domain per tool
**Chosen:** A single hub domain.
**Why:** Topical authority + internal link equity + one backlink pool for all pages. Also one ad/affiliate setup to maintain.
**Reverses if:** You need a second niche you're unrelated to. Then use a subdomain at most — separate domains split authority.

### D2 — The dataset is the product, not the calculator
**Chosen:** Build `breeds.json` (300+ breeds) as the core asset; calculators read from it.
**Why:** 50 competitors already have good calculators. None has a complete breed dataset. Calculators are a weekend of work; a sourced dataset is weeks. **The dataset is what a competitor cannot clone in a day.**
**Reverses if:** You never get past ~50 breeds. In that case, ship the tools anyway and pivot monetisation (see §4, Rejected Options).

### D3 — Tool order: growth + weight + food FIRST; age converters last
**Chosen:** Tier 1 = Puppy Growth, Puppy Weight, Dog Food. Age converters are Tier 3 routers.
**Why:** The original plan had Cat Age and Dog Age in Phase 1. **Both queries are fully answered by the AIO** — for dog age, Google prints the complete conversion table. Those pages would earn zero clicks.
**Reverses if:** Never. This is settled by evidence.

### D4 — Every tool must require user input
**Chosen:** No tool answers a question the user didn't have to type something for.
**Why:** A tool that can be answered without input *will* be answered by an AI Overview.
**Reverses if:** Never.

### D5 — Breed-aware BCS is the differentiator in the food tool
**Chosen:** The food calculator asks for ideal weight + **breed-aware BCS (1–9)** + neuter status + activity + kcal density.
**Why:** The AIO names exactly these inputs, and no competitor asks for BCS at all. This is simultaneously (a) what makes the tool worth citing and (b) what makes an affiliate food recommendation credible.
**Reverses if:** Users abandon the form. Watch completion rate in GA4; if <40% complete, drop BCS to an optional field but keep it in the URL state.

### D6 — Age tools are routers, not answers
**Chosen:** The age pages answer in one line, then route: *"Your cat is 11 → 64 human years → SENIOR. Senior cats need X kcal/kg. → Calculate your senior cat's food amount."*
**Why:** Google owns the generic answer. The page's only job is to move the user to a tool that needs their data.
**Reverses if:** AIO coverage on those queries drops — re-check quarterly.

### D7 — Reverse calculators (human → cat/dog years) are a priority
**Chosen:** Build `/tools/human-years-to-cat-years/` and `/tools/human-years-to-dog-years/`.
**Why:** Google's AIO and all 50 clones convert in one direction only. The reverse direction is uncontested and appeared twice in People Also Ask.
**Reverses if:** It ranks and gets no traffic — then check whether Google has since added a reverse AIO.

### D8 — AIO citation is the #1 growth KPI
**Chosen:** Track weekly whether our URL is cited in the AIO for `puppy growth calculator` and `dog food calculator`.
**Why:** On those two queries the AIO is a **tool list**, not an answer. AIO citations are clickable. All 50 competitors have zero AIO presence. **This is the one channel where a new site with better methodology can leapfrog the whole field.**
**Reverses if:** Google's AIO on those queries starts answering directly instead of listing tools. Re-audit monthly.

### D9 — Publish gates: structured data + specific facts, not prose volume
**Chosen:** A breed page is publishable when its structured data is complete, its `facts` are breed-specific, and it carries ≥1 real citation. **Prose is optional**, applied to the top 20 breeds.
**Why:** See §5, R1 — the original 150–300-word-per-breed gate was ~60,000 words and would have cost 2–3 weeks before anything shipped.
**Reverses if:** Google treats the pages as thin. Monitor: if breed pages get impressions but low CTR, add prose to the top 20 first, then the rest.

### D10 — Real HTML tables everywhere, never canvas-only
**Chosen:** Every chart's underlying data also renders as a real HTML `<table>`.
**Why:** Google's extractor reads clean HTML. A canvas chart is invisible to it — and the AIO extractor is exactly what we're trying to get cited by.
**Reverses if:** Never.

### D11 — Build a `/methodology/` page
**Chosen:** Publish every formula, source, assumption and known limitation on one page.
**Why:** It is the single most citable asset we can own, and **not one of the 50 competitors has one.**
**Reverses if:** Never.

### D12 — The share card is the link engine
**Chosen:** Every tool generates a branded, shareable PNG of the user's result.
**Why:** A tool site with zero backlinks stalls at page 2. The share card turns a tool into a shareable artefact that earns links from Reddit, Pinterest and social. **No competitor in our 50-site list does this.**
**Reverses if:** Share-card links show no referral traffic. Track UTM `share` — if <5 referrals by Week 9, invest in direct outreach instead.

### D13 — Monetisation: food affiliate is the business, ads are the floor
**Chosen:** Chewy + Amazon affiliate on the food tool from Week 4. AdSense Week 9. Mediavine/Ezoic at ~50K sessions. Pet insurance CPA as a hedge.
**Why:** Display ads need ~100K sessions/mo to matter. The highest-intent query (food calculators) is already occupied by pet-food brands — but those are *affiliate* competitors, so we must out-recommend, not out-rank.
**Reverses if:** Affiliate EPC < $0.05 at Week 13 → the food tool is underperforming; rebuild it around breed-aware recommendations before investing in pSEO.

### D14 — Domain: `petcalc.io`
**Chosen:** Register `petcalc.io` + `petcalculator.io` (both RDAP-verified available). Check the `.io` renewal price before committing.
**Why:** The `.com` is gone, but the original brand survives on `.io`. No need to invent a name.
**Reverses if:** The `.io` has dirty history (Wayback spam) or renews above ~$40/yr — then use the §12 shortlist (`pawmetric`, `breedform`, `furfactor`, `pawform`, `breedwise`, `petgrids`).

### D15 — Do not use the Vercel design system
**Chosen:** Replace `DESIGN.md` with pet-appropriate tokens (warm brand colour, serif display face).
**Why:** The existing design is a black-and-ink developer-tool aesthetic. Pet food affiliate clicks need warmth and trust signals — clinical-but-friendly, not technical.
**Reverses if:** Never.

---

## 4. Rejected options

| Option | Rejected because |
|---|---|
| **Generic pet calculator hub** (the original plan) | Produces clone #51. Would have ~⅓ the revenue probability of the dataset-first version |
| **Publish all 300 breed pages in one day** | Classic pSEO failure. Google treats bulk thin pages as doorway pages. Ramp: 25 → 60 → 150 → 300 |
| **Templated breed pages** (same prose, breed swapped) | Literally a doorway page. Google ignores it |
| **A blog** | Doesn't need it. Needs data + tools + citations. Guides are limited to PAA-derived topics |
| **20+ tools** | Hard cap at 10. Breadth comes from breed pages |
| **Pay for backlinks / run ads on day 1** | Ads on a new domain hurt speed; paid links risk a manual action. Earn links with the share card instead |
| **AI-generate the breed data** | Destroys the entire thesis. The claim is *"we are more credible than the clones"* — AI-generated data with fake citations is less credible, not more |
| **Buy a premium domain** | $50 for a clean name beats $800 for a parked one |
| **Use the `.com` name from the original research** | Taken and locked since 2017 |

---

## 5. Reversed decisions — corrections made during the build

These matter most, because each one changed a plan that already looked reasonable.

### R1 — The publish gate was too strict *(our own mistake)*
**Was:** 150–300 words of original hand-written prose per breed, as a hard publish gate.
**Why wrong:** 300 breeds × 200 words = ~60,000 words. At 20 hrs/week that's **2–3 weeks before shipping anything**, which kills Week-1 momentum.
**Now:** Publishability = complete structured data + breed-specific `facts` + ≥1 real citation. Prose is an *upgrade* for the top 20 breeds.
**Why it's still safe:** A doorway page is a page with *generic* content. A page with one breed's specific weight range, growth curve, lifespan, BCS ideal, three named conditions and four citations is not generic. **The data is the content.**

### R2 — The AI Overview risk was framed backwards
**Was:** "AI Overviews are a direct competitor; the risk is that they take our clicks."
**Now:** On Tier 1 queries the AIO **lists tools instead of answering** — it is a distribution channel, and AIO citations are clickable. So the framing became *"be the tool worth citing"* (D8).
**Why it changed:** The live AIO audit showed the actual text, not a hypothesis.

### R3 — "No Google calculator widget" is the wrong test
**Was** (an early read of the audit): *no widget → AIOs aren't fatal.*
**Now:** The right test is *"did the AIO produce the user's answer?"* For `cat years to human years` and `how old is my dog in human years` it did — formula plus the complete table. Those are dead regardless of widgets.
**Why it changed:** Widget-vs-text is a UI detail. Answer-vs-no-answer is the traffic question.

### R4 — The tool portfolio needed two new tools and one demotion
**Added:** two reverse calculators (D7) — uncontested, surfaced from People Also Ask.
**Demoted:** the standalone BCS calculator → now a **guide page**; BCS moved into the food tool (D5).
**Added to the schema:** `lifespanYears`, `gramsPerCupDry`, and a structured `facts` block — surfaced by working examples of what an AIO *cannot* produce (*"the breed average is 10–12 years, so your dog is in mid-life"*, *"2.5 cups of Royal Canin Medium Adult"*).

### R5 — Realistic sourcing estimate
**Was:** "~1 week" for the full dataset.
**Now:** **~2 weeks** for 300 breeds of hand-sourced structured data; **~2 days** for the 25-breed Week-1 target. Top-20 prose is a Week-2 add-on.
**Why it changed:** Recalculating effort per data block rather than per breed (§3.6 of PROJECT.md).

---

## 6. Competing analysis reviewed

A second analysis (from another agent) was reviewed and cross-checked against ours. **Where it agreed:** the core thesis (breed-level data is the moat), the "funnels not pillars" treatment of the age tools, and the three worked examples of what an AIO can't produce. **Where we diverged:** the widget-vs-answer test (R3), the AIO-as-channel framing (D8), the missing open-items (below), and the strict publish gate (R1).

**Open items it listed that we agree with:** domain name, project relocation, data sourcing plan — all now actioned or scheduled.
**Open items it omitted that matter more:** AIO citation strategy, the share card, `/methodology/`, the reverse calculators, and the kill criteria. All are in PROJECT.md.

---

## 7. Open questions — deliberately not yet verified

Each of these could change a decision. Re-check at the stated cadence.

| # | Question | Why it matters | Re-check |
|---|---|---|---|
| Q1 | Do AIOs for `puppy growth calculator` / `dog food calculator` **from the US** cite different sources than from India? | Our citation targets (§8) are built from one audit location. If US AIOs cite different sites, our outreach list is wrong | Before Week 4 |
| Q2 | What is the actual **AIO-vs-organic click split**? | PROJECT.md §10 revenue ramp assumes full-SERP CTR. If the AIO absorbs 30%, the age-term traffic model needs a haircut | Week 8 |
| Q3 | Do the remaining 5 target keywords have AIOs? | `cat age calculator`, `cat food calculator`, `puppy weight calculator`, `dog pregnancy calculator`, `french bulldog food calculator` are **unaudited**. Each could change the tool order like the first batch did | Week 1 |
| Q4 | Current affiliate commission rates + approval criteria (Chewy, Amazon) | They change. The revenue model depends on them | Before Week 4 |
| Q5 | Current Mediavine / Ezoic session thresholds + engagement criteria | Same — they change | Week 9 |
| Q6 | `.io` renewal price at the chosen registrar | Some registries price `.io` renewals aggressively | Before registering |
| Q7 | Does `petcalc.io` have dirty history (Wayback spam)? | Decides D14 | Before registering |
| Q8 | **Kill criteria — the most important open question.** Check at Week 10 and Week 13 | See PROJECT.md §11. If no page is in the top 30 for any target keyword AND cumulative GSC impressions < 1,000 by Week 10, **stop and re-evaluate** | Week 10, Week 13 |

---

## 8. Outreach talking points

Use these when approaching vet clinics, breed clubs, universities and pet food brands (§7.3 of PROJECT.md). **The pitch is the dataset, not the calculator** — they're being offered a better reference tool, not a marketing favour.

### Vet clinics
> "We built a free, citation-backed puppy growth and feeding calculator using the WSAVA growth charts. It cites its sources the way you'd want your clients to see. We'd love to put your clinic's name on it — you already do this for your clients, and you rank #1 for the head term on your own site. The tool is free for you; we just ask that it's attributed."

### Breed clubs & national breed associations
> "We've compiled adult weight ranges, growth curves, expected lifespans and common health conditions for your breed, each with a citation. We're publishing it free. If your club wants to use it — or link to it, or correct anything we've got wrong — we'd like to work with you."

### Universities & research groups
> "Your growth-curve work is the reference standard for this field. We've implemented it in a free public calculator with the method named and cited on the page. If you'd like us to correct an attribution, or if there's a more recent dataset we should be using, we'd welcome that."

### Pet food brands
> "We've built a feeding calculator that asks for body condition score and neuter status — the same inputs your own nutrition team uses — and outputs a precise daily portion. We already link to your feeding guides. We'd like to add a co-branded version, and our users convert at a strong rate because the recommendation is breed-specific."

### Pet nutritionists / raw-feeding advocates
> "We publish every formula, every source and every limitation on a /methodology/ page. If you disagree with our coefficients, tell us — we'd rather be corrected in public than be wrong quietly. We'd also like to quote you as a reviewer."

---

## 9. What not to do

Hard rules. Every one of these has a reason.

1. **Don't publish a breed page without a source.** No invented facts, ever. Leave a field `undefined` and omit it.
2. **Don't AI-generate the breed data.** Format with AI, source by hand. This is the entire thesis.
3. **Don't build the homepage with 40 tool cards.** Not before 8+ tools are live.
4. **Don't try to compete with the AIO on the generic conversion charts.** Google owns them.
5. **Don't build templated breed pages.** Doorway pages.
6. **Don't add a blog.** Guides only, and only for PAA-derived topics.
7. **Don't run ads on a new domain.** It hurts speed and you're not optimising yet.
8. **Don't buy a premium domain.**
9. **Don't fabricate a vet reviewer.** An E-E-A-T liability, not an asset.
10. **Don't ship a canvas-only chart.** Always render the data as HTML too.
11. **Don't skip the share card.** It's the link engine.
12. **Don't publish more than ~10 tools.** Breadth comes from breed pages.
13. **Don't skip the kill criteria.** The project has a defined failure condition. Honour it.

---

## 10. Document map

| File | Purpose |
|---|---|
| **[PROJECT.md](./PROJECT.md)** | The build spec: strategy, schema, tool portfolio, URLs, tech setup, 90-day schedule, monetisation, KPIs, kill criteria, risks |
| **DECISIONS.md** *(this file)* | The reasoning: research journey, verification log, decision log, rejected options, corrections, open questions, outreach language |
| `src/data/breeds.ts` | The dataset — the actual product (D2). Includes `canPublish()`, the publishing gate |
| `src/data/growthCurves.ts` | WSAVA size-class growth curves — 5 curves, not 300 |
| `src/data/formulas.ts` | The calculation engine; every function exports its source string |
| `src/data/tools.ts` | Tool registry — single source of truth for nav, sitemap and the home page |
| `src/layouts/Base.astro` | SEO-complete layout: canonical, OG, JSON-LD (WebApplication + BreadcrumbList + FAQPage), self-hosted fonts |
| `src/styles/global.css` | Design tokens — the `@theme` block is the design system (D15) |
| `E:\new project-society\` | The relocated Housing Society Interest Calculator (India) — retained as the India-first fallback |

> ⚠️ **`DESIGN.md` was deleted on 2026-11-12** (and again from the society project). It specified the Vercel design system, which D15 rejects. The live design tokens are the `@theme` block in `src/styles/global.css`.
>
> ✅ **Git works.** It was unreachable from the shell because the original install lived on the vanished `D:` drive; the IDE was using the copy bundled with GitHub Desktop. That path is now on the user PATH. Both repos are committed with clean trees.

---

*Every claim in this document was verified on 2026-11-12 unless explicitly marked as an assumption. Numbers in PROJECT.md §10 are estimates to be revised with real data at Week 13. Where this document and PROJECT.md disagree, PROJECT.md wins on **what to build**; this document wins on **why**.*
