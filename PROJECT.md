# 🐾 Breed-Aware Pet Calculators — 90-Day Execution Plan

**Status:** Active plan (supersedes the Nov 10 research summary) · **AI Overview audit complete**
**Owner:** Himanshu
**Capacity:** 20+ hrs/week
**Market:** Global — US / UK / AU / CA — USD display ads + affiliate
**Last updated:** 2026-11-12 (post-AIO-audit revision)

> **v2 changelog (2026-11-12):** Live Google audit of 5 head terms completed (§1.5).
> New findings: (a) age-converter queries are **confirmed dead** — the AIO prints the full conversion table; (b) **the AIO for our two best queries lists tools instead of answering** — making AIO citation a *primary KPI*, not just a risk; (c) the food tool must ask for **ideal weight + BCS + neuter status** or it is not citable; (d) **reverse converters** (human→cat/dog years) are uncontested; (e) the size-class dataset spine is confirmed by Google's own AIO table.

---

## 0. The One-Page Strategy

We are not building a "pet calculator hub." We are building **a breed-level nutrition and growth database with calculators on top.**

| Layer | What it is | Why it matters |
|---|---|---|
| **Moat** | `breeds.json` — 300+ breeds with adult weight (M/F), growth curves, calorie-density defaults, energy factors, health flags, vet-cited notes | No competitor has this complete. Calculators are a weekend; data is a moat. |
| **Tools** | 10 calculators that all read from the dataset | Every tool is cheap to build *because* the data already exists. |
| **Breed hubs** | `/breeds/[breed]/` — real data + embedded calculator + feeding chart + health notes | Makes pSEO defensible instead of doorway-page thin. |
| **Money** | Display ads (Mediavine/Ezoic) + Chewy/Amazon affiliate + pet insurance CPA | Food intent is where the money is; ads cover the rest. |

**One-line thesis:** *The calculator is not the product. The dataset is the product. Calculators are how people find the dataset and how Google indexes it.*

### The four rules that make this work

1. **Publish only what is genuinely unique.** A breed page exists only when its structured data is complete, its `facts` are breed-specific, and it carries at least one real citation. No placeholders, no generic filler, no invented values. Prose is an upgrade for the top breeds, not a publish gate (§3.5).
2. **Ship a tool before you build a hub page.** No `/tools` index, no category filters, no filters UI until there are 8+ live tools.
3. **Every tool must require user input.** A tool that can be answered without the user typing something will be answered by an AI Overview, and you will earn zero clicks.
4. **Look like a clinical source, not a calculator.** Google's AIOs cite vets, labs and nonprofits — and zero of the 50 clone calculator sites. A named methodology, peer-reviewed citations, a `/methodology/` page and a named vet reviewer are what earn a citation. **Being cited in the AIO is now the #1 growth KPI** (§11).

---

## 1. Verified Market Reality (checked 2026-11-12)

We pulled live SERPs rather than trusting the prior summary. Findings that change the plan:

### 1.1 The niche is crowded — not empty

Every target keyword already returns **~10 dedicated competitor tools**. Roughly **45–50 distinct pet-calculator domains** are ranking across the head terms we care about.

| Query | Dedicated competitors ranking (sample) |
|---|---|
| `puppy growth calculator` | yourpaws.com, puppygrowthcalculator.com, dogster.com, thepetcalculator.com, purecalculators.com, dogcalculator.net, dogsizecalculator.net, omnicalculator.com, calculator-online.net, mypuppyweightcalculator.com |
| `cat years to human years` | catcalculator.com, thepetcalculator.com, almanac.com, catster.com, omnicalculator.com, animalcalculators.com, catsagecalculator.com, catagechart.com, lumencalculator.com, yearstohuman.com |
| `dog food calculator` | thepetcalculator.com, feedreal.com, dogcalculator.net, dogfoodcalculator.net, thedognutritionist.com, petcarecalculators.com, dogfeedingcalc.com, breedtobowl.com, infinitycalculator.com, dogfoodcalculator.net |
| `french bulldog food calculator` | frenchiestore.com, petcalculator.com, dafrenchie.com, frenchietails.com, frenchiecheck.com, petmealplanner.com, petcalori.com, breedcalc.com, petcalcengine.com |
| `dog pregnancy calculator` | calculator-online.net, omnicalculator.com, dogcalculator.net, dogpregnancycalculator.com, furcalc.com, dogpregnancycalendar.com, dogscalculators.com, mydogpregnancycalculator.com, caninepregnancycalculator.com, inchcalculator.com |

**Correction to the prior research:** *"no dominant dedicated competitor"* was technically true and practically misleading. There is no Google — but there are 50 clones, and Google is deliberately spreading page-1 clicks across them.

### 1.2 All competitors are AI-generated near-duplicates

Titles are effectively identical across unrelated domains:

> *"Dog Pregnancy Calculator - Due Date & Week-by-Week Timeline"*
> — `dogcalculator.net`, `dogpregnancycalculator.com`, `mypuppypregnancycalculator.com`, `caninepregnancycalculator.com`

Meta descriptions are likewise duplicated. **Implication: you cannot out-content this field — you can only out-engineer and out-credible it.** Copying their structure guarantees you become clone #51.

### 1.3 The one genuinely good sign

`omnicalculator.com` (DR 90+) and `almanac.com` are **not** ranking #1 for these queries. Google is rewarding tool relevance and specificity over domain authority. **A brand-new domain with a materially better tool can rank fast.** The KD 2–13 reading is real.

### 1.4 Domain availability (RDAP, verified 2026-11-12)

| Domain | Status |
|---|---|
| `petcalc.com` | ❌ Taken 2017, transfer-locked |
| `petcalculator.com` | ❌ Taken 2020, fully locked |
| `pawcalc.com` | ❌ Taken Nov 2025, Vercel DNS — live competitor |
| `mypetcalc.com` | ❌ Taken Apr 2026, parked |
| **`petcalc.io`** | ✅ **AVAILABLE** — RDAP 404 against the Identity Digital registry, control-tested against `wordpress.io` |
| **`petcalculator.io`** | ✅ **AVAILABLE** — same check |

**Good news: the original brand name survives.** The `.com` is gone but `petcalc.io` / `petcalculator.io` are open, so we don't have to invent a new brand. `.io` reads as techy, which suits a calculator site.

**Action, not a suggestion:** register `petcalc.io` and `petcalculator.io` at a registrar **today**, before checking the full shortlist. RDAP is not authoritative, and a clean name can be taken by a domainer within hours. Then run the full checks in §12 (Wayback history, trademark, social handles) — and if `petcalc.io` has a dirty history, fall back to a distinct brand from the §12 shortlist.

> ⚠️ `.io` registries have historically had aggressive renewal/resale pricing. **Check the renewal price, not just the first-year price**, before committing. A `.io` that renews at $60/year is worse than a clean `.com` at $12.

### 1.5 ✅ AI Overview Audit — COMPLETED 2026-11-12

Checked on google.com in Incognito (ENG/IN), 23:08–23:10. Full results:

| Query | AI Overview? | What the AIO actually does | AIO position | Verdict |
|---|---|---|---|---|
| `cat years to human years` | **YES — total** | States the standard conversion rule (yr 1 ≈ 15 human yrs, yr 2 adds 9, yr 3+ adds ~4/yr), **attributed to La Petitta Labs**. Runs an image carousel of cat-age charts. | Above the fold, entire first screen | ☠️ **Effectively dead for clicks** |
| `how old is my dog in human years` | **YES — total** | Debunks the "×7" myth and prints the **complete size-based conversion table** (Small/Medium/Large/Giant × 1,2,3,5,7,10,12 yrs) + a video carousel | Entire first screen (dark mode) | ☠️ **Effectively dead** — the exact table we would build is already in the AIO |
| `dog age calculator` | **YES** | "The Modern Size-Based Formula" + "Year 1: 15 human years" (cites Omni Calculator) | **Below** an image pack — pushed down the page | ⚠️ **Damaged, not dead** — organic #1 is Pedigree |
| `puppy growth calculator` | **YES — but it LISTS TOOLS** | *"Estimate your puppy's final adult weight using online tools like the **Puppy Weight Calculator by Sydney Animal Hospitals**, the Supreme Dog Growth Calculator, or a general formula."* Plus "Quick Rule of Thumb" (weight ÷ age in weeks × 52, via VitaDog) | Mid-page, after #1 organic | ✅ **Viable — and citable** |
| `dog food calculator` | **YES — but it LISTS TOOLS** | *"Use an online **Pet Nutrition Alliance Caloric Calculator** or the **Dog Food Advisor Calculator** to determine the proper daily portion size for your dog."* Plus required inputs: ideal body weight, **BCS 1–9**, spayed/neutered | Mid-page, after #1 and #2 organic | ✅ **Viable — and citable** |

#### 🔑 The single most important finding

**On our two best queries, the AI Overview does not answer — it lists tools.**

The puppy-growth AIO says "use a tool like X, Y, or a general formula." The dog-food AIO says "use the PNA Caloric Calculator or the Dog Food Advisor Calculator."

That is Google conceding **there is no single canonical answer and surfacing the best available tools instead.** It is also a distribution channel — **AIO citations are clickable.**

This flips the framing. AI Overviews are not purely a threat on Tier 1 queries; on those queries they are **a ranking surface we can win**, if we are the tool worth citing.

> **New primary objective: be cited in the AI Overview.** This becomes a tracked KPI (§11), not a side effect.

#### What the AIOs reveal about the citation bar

Sources Google chose to cite, in order of preference:

- **Veterinary / clinical** — Sydney Animal Hospitals, Purina, Royal Canin, Pet Nutrition Alliance, International Cat Care, La Petitta Labs
- **Nutrition labs / established publishers** — VitaDog Nutrition, WebMD, PetMD
- **Established tools** — Omni Calculator, Dog Food Advisor
- **Nobody** — not one of the 50 clone calculator sites

> **Implication:** to be cited we must look like a *clinical source*, not a calculator. Therefore:
> 1. **Name the method.** "Using the WSAVA (2018) growth curves by size class" is citable. "We ran the numbers" is not.
> 2. **Cite peer-reviewed and nonprofit sources** (NRC 2006, WSAVA, OSU, International Cat Care) — not brand marketing pages, and never other calculator sites.
> 3. **Publish numbers as extractable HTML** — tables, `<dl>`, clean `<h2>`s. Google's extractor reads HTML, not a canvas or a JS-only widget.
> 4. **Get a named human reviewer.** "Reviewed by Dr. X, DVM" on even 5 breeds is the difference between a citation candidate and a clone. See §7.3.

#### Second finding — the AIO dictates the exact inputs to ask for

The `dog food calculator` AIO specifies the required inputs: **ideal body weight**, **Body Condition Score (1–9)**, and **spayed/neutered status**.

Our food-tool spec had neuter status but **BCS was planned as a separate Tier-2 tool**. BCS must be **pulled forward into the food tool itself**, and it must be **breed-aware** (`bcsIdeal` + `bcsCaution` from our dataset) — which is precisely what no clone does.

> A tool asking for ideal weight + BCS + neuter status is materially better than every competitor and therefore worth citing. A tool asking for weight + age is not.

#### Third finding — size classes are confirmed as the correct dataset spine

The `how old is my dog in human years` AIO table is built on **Small ≤10 kg / Medium 10–25 kg / Large 25–45 kg / Giant 45+ kg** — the WSAVA size classes. Our `sizeClass` field maps directly onto both this and the WSAVA growth charts. **The dataset spine in §3 is correct**, and Google is already using the same classification.

Critically, that AIO table is **generic by size**. It cannot answer *"how old is my French Bulldog in human years"*. **Breed-level pages are the escape hatch from a generic AIO** — this strengthens Tier 4 rather than weakening it.

#### Fourth finding — new keyword targets from People Also Ask

Verified live PAA questions from the five SERPs. **None are in the original keyword list**, and several are uncontested.

| PAA question | Type | Notes |
|---|---|---|
| "How old is 100 years in cat years?" | **Reverse** calc | The AIO covers cat→human only. Every clone is one-directional. **Cheapest win on the board.** |
| "How old is 7 years in cat years?" | Reverse calc | Same |
| "How old is a 20 year old cat?" | Boundary case | End-of-life framing — high emotional engagement, strong share potential |
| "How old is a 14-year-old cat?" | Boundary case | Senior cat |
| "How old is 3 year old dog?" / "How old is a 7 year old dog?" | Specific | Easy long-tail |
| "How do I calculate a dog's age?" | Informational | Guide page → links into the tool |
| "Is 1 Human year 7 years for a dog?" | Myth | AIO-citable myth-buster |
| "How much food to feed a dog chart?" | **Chart** | Static, linkable, image-worthy, PAA-targetable |
| "How much food should I feed my dog calculator by weight?" | Tool variant | Long-tail, low competition |
| "How much homemade dog food to feed calculator?" | Tool variant | Feeds the raw/homemade tool |
| **"What is the 95% rule in dog food?"** | **Informational** | Outstanding guide topic — uncovered by every calculator site, and a natural internal link into the food tool |

#### Fifth finding — image search is a real channel in this niche

Two of the five SERPs show an image pack (`dog age calculator`), and the cat AIO runs an image carousel of age charts. Growth charts, feeding charts and conversion charts as **real images with alt text + an image sitemap** are an underused channel here — and Pinterest (§7.2) is the compounding version of it.

---

## 2. Strategic Corrections vs. the Original Plan

### ❶ Tool order was backwards — AI Overviews eat lookup converters

The prior plan put **Cat Age** and **Dog Age** in Phase 1 alongside the growth and food tools. Both are lookup converters: Google can answer "how old is my cat in human years" directly from a formula without clicking anyone. That is zero-click traffic.

**✅ CONFIRMED by the live audit (§1.5).** The `cat years to human years` AIO occupies the entire first screen. The `how old is my dog in human years` AIO goes further — it prints the complete size-based conversion table, i.e. it has already built the product we were planning to build.

**Fix:** Phase 1 is **growth + weight + food** — three tools that *cannot* be answered without user input, and whose AIOs **list tools rather than answering**. Age converters move to Tier 3, where their job changes from *"be the answer"* to *"route to the tool that needs user data"*.

**One refinement the audit forced:** the food tool must ask for **ideal body weight + BCS (1–9) + neuter status**, because that is what Google's AIO says is required. A tool that asks for less is not worth citing.

### ❷ Monetization centre of gravity was wrong

Prior plan leaned on display ads ($3–8 RPM) as primary, affiliate as "Phase 3." Two problems:

1. Display ads need ~100K sessions/mo before they matter. That is a year away.
2. The high-intent, high-RPM query — food calculators — is **already occupied by pet-food brands**: `feedreal.com`, `frenchiestore.com`, `breedtobowl.com`, `thedognutritionist.com`. These are affiliate-earning competitors with real catalogues. Beating them with a generic calculator + AdSense is the weakest possible position on your best query.

**Fix:** Food calculator ships **in Week 4, not Month 3**, and is the first page to get affiliate links. Breed-aware calorie output ("a neutered 11 kg French Bulldog needs ~740 kcal/day") is what makes a food recommendation credible — and a credible food recommendation is what converts.

### ❸ Programmatic breed pages were assumed to be open ground — they are not

`french bulldog food calculator` already returns 9 breed-specific pages. A template swap on top of those is a doorway page: Google ignores it, and you waste a month.

**Fix:** Breed pages publish only where the dataset entry is complete and the prose is original. We ramp 25 → 300, gated on data completeness. See §3 and §8.

---

## 3. The Moat — `breeds.json`

### 3.1 Schema

```ts
// src/data/breeds.ts
export type HealthFlag =
  | 'brachycephalic' | 'obesity-prone' | 'joint' | 'gi-sensitive'
  | 'allergy-prone' | 'heat-sensitive' | 'low-tolerance' | 'working-high-energy';

export interface GrowthCurve {
  // % of adult weight expected at each age (months).
  // Derived from WSAVA growth charts (Flohr et al., 2018) by size class,
  // calibrated against Salt et al. (2017) puppy growth predictor study.
  points: Array<[months: number, pctAdult: number]>;
  // Adult body weight is reached at (approx) this age, in months.
  matureAtMonths: number;
}

export interface EnergyFactors {
  // Multipliers applied to RER to get MER.
  puppy: number;       // e.g. 3.0
  intactAdult: number; // e.g. 2.5
  neuteredAdult: number;// e.g. 1.6
  senior: number;      // e.g. 1.4
  working: number;     // e.g. 2.5-4.0 (herding, hunting, sport)
}

export interface Breed {
  slug: string;                  // "french-bulldog"
  name: string;                  // "French Bulldog"
  species: 'dog' | 'cat';
  sizeClass: 'toy' | 'small' | 'medium' | 'large' | 'giant';

  adultWeightKg: {
    male:   { min: number; max: number };
    female: { min: number; max: number };
  };
  adultHeightCm?: {
    male:   { min: number; max: number };
    female: { min: number; max: number };
  };

  growth: GrowthCurve;

  energy: EnergyFactors;

  // Typical kcal density of common foods for this species/size.
  calorieDensity: {
    dryKcalPerGram: number;    // dry kibble ≈ 3.4–3.6
    wetKcalPer100g: number;    // canned ≈ 80–110
    rawKcalPer100g: number;    // raw ≈ 120–180 (fat dependent)
    // Grams per "cup" — kibble cup sizes vary by brand (≈100–125 g).
    // Used to convert kcal/day → cups. Store the brand-specific value
    // when known; fall back to the species average otherwise.
    gramsPerCupDry: number;
  };

  // Expected lifespan range, in years. Lets age tools say
  // "your 4-year-old French Bulldog is mid-life — the breed average is 10–12."
  // Source: AKC breed profiles, Purina breed lifespan tables.
  lifespanYears: { min: number; max: number };

  bcsIdeal: number;             // 5/9 body condition score midpoint
  healthFlags: HealthFlag[];
  bcsCaution?: string;          // e.g. "Frenchies reach obesity easily; do not free-feed."

  // Breed-specific, sourced facts. This — not prose volume — is what makes
  // a breed page non-thin. Every value here must be specific to THIS breed
  // and carry a source.
  facts: {
    typicalLifespan: string;   // "10–12 years"
    commonConditions: string[];// ['BOAS', 'IVDD', 'patellar luxation']
    exerciseNeed: string;      // "30–60 min/day, low intensity"
    trainingNote?: string;     // "Known for stubbornness — short, consistent sessions"
    heatTolerance?: string;    // "Poor — monitor overheating in summer"
  };

  // OPTIONAL prose. 150–300 words, original, vet-cited.
  // Not a publishing gate — a quality upgrade for the top breeds.
  // See §3.5 for why this was downgraded from a hard gate.
  notes?: string;

  sources: string[];            // ['WSAVA 2018', 'AKC breed standard', 'Hill\'s nutrition']
  updatedAt: string;            // ISO date — drives "last reviewed" freshness
}
```

### 3.5 ⚠️ Correction — the publish gate was too strict

The original gate required **150–300 words of original prose per breed** before a page could publish. For 300 breeds that is ~60,000 words of hand-written copy — **2–3 weeks of your time before you can ship anything.** At 20 hrs/week that kills momentum in Week 1.

**Corrected:** publishability = **complete structured data + breed-specific sourced facts** (`facts` above) + citations. Prose is an *upgrade* applied to your top 20 breeds, not a gate.

> **Why this is safe:** a doorway page is a page with *generic* content. A page listing *specific* numbers for one breed — adult weight range, expected adult height, growth curve, lifespan range, BCS ideal, three named conditions, energy need, plus four citations — is not generic, even without 200 words of prose. The data *is* the content.
>
> **Rule still enforced:** no breed ships with placeholder text, and no breed ships without at least one source. Never invent a fact to fill a field — leave it `undefined` and omit it from the page.

### 3.6 Sourcing effort — realistic estimate

| Data block | Effort (at 20 hrs/week) | Source |
|---|---|---|
| Adult weight + height (M/F), 300 breeds | **2–3 days** | AKC breed pages, FCI standards, Purina tables (~10 published tables, transcribed) |
| Growth curves by size class | **2 hours** | WSAVA (Flohr et al., 2018) — 4–5 curves total, applied across breeds |
| Energy factors + calorie density | **3 hours** | NRC (2006); Royal Canin / Hill's RER-MER tables |
| Lifespan ranges, 300 breeds | **1 day** | AKC breed profiles, Purina lifespan tables |
| Health flags + conditions | **3–5 days** | AKC breed health pages, OFA |
| `facts` (exercise, training, heat tolerance) | **3–4 days** | Breed club sites, AKC |
| **Prose for the top 20 breeds** | **1 day** | You |
| **Total to a publishable 300** | **~2 weeks** | |
| **Total to a publishable 25 (Week 1 target)** | **~2 days** | |

> The other agent's "~1 week for the full dataset" is optimistic for hand-sourced prose but roughly right for structured data. The corrected figure is **~2 weeks for 300 breeds of structured data**, with the top-20 prose as a Week-2 add-on. The **25-breed Week-1 target is 2 days**, not a week — which means you can ship the first tool in Week 1, not Week 2.

### 3.2 Formulae we implement (sourced, citable, and defensible)

```
RER  = 70 × (weight_kg)^0.75                     // NRC (2006)
MER  = RER × life_stage_factor                    // NRC (2006) + neuter/activity modifiers
Daily kcal = MER
Dry grams   = Daily kcal ÷ 3.5
Wet grams   = Daily kcal ÷ 0.9        (≈90 kcal/100g)
Cups (dry)  = Dry grams ÷ grams_per_cup (≈112g/cup for standard kibble)

Adult weight estimate = current_weight ÷ growth_pct(current_age_months)
```

Citations to display on-page: **NRC (2006) Nutrient Requirements of Dogs and Cats**, **WSAVA growth charts (Flohr et al., 2018)**, **AKC breed standards**, **Ohio State puppy growth charts**, **Salt et al. (2017)**. Citing sources is a ranking differentiator — none of the 50 competitors do it.

### 3.3 Data sourcing (do this properly — it takes a day, not a week)

| Field | Source |
|---|---|
| Adult weight M/F | AKC breed pages, FCI standards, Purina/Royal Canin breed charts |
| Growth curves | WSAVA `Canine and Feline Body Condition` growth charts; Ohio State |
| Energy factors | NRC (2006); Royal Canin / Hill's published RER-MER tables |
| Health flags | AKC breed health pages, OFA (Orthopedic Foundation for Animals) |
| Calorie density | Feed label `kcal/kg` from major brands |

⚠️ **Do not use AI-generated breed data.** The whole thesis is that we are *more* credible than the clones. Every entry gets a human-sourced citation. AI can help you *format* the data, never *produce* it.

### 3.4 Seed list (Week 1, ~2 days)

Start with the breeds that carry the highest search volume:
French Bulldog, Labrador Retriever, Golden Retriever, German Shepherd, Beagle, Poodle (Standard/Mini/Toy), Dachshund, Chihuahua, Shih Tzu, Bulldog, Yorkshire Terrier, Boxer, Husky, Border Collie, Corgi, Rottweiler, Pit Bull, Australian Shepherd, Cavalier King Charles Spaniel, Great Dane, Maine Coon, Ragdoll, Siamese, British Shorthair, Persian, Bengal, plus ~20 more.

---

## 4. Tool Portfolio (ordered by AI-resistance × commercial intent)

### Tier 1 — Ship first (Weeks 2–4). Requires user input. Highest affiliate intent.

| # | Tool | Primary keyword | Input | Output | Monetisation |
|---|---|---|---|---|---|
| 1 | **Puppy Growth & Adult Weight Predictor** | `puppy growth calculator` (KD 2) | Breed, age, current weight, sex | Adult weight range, expected adult height, growth %, chart | Ads + insurance CTA |
| 2 | **Puppy Weight & Growth Chart by Breed** | `puppy weight calculator` | Breed, age, weight | Month-by-month projected weight table, chart | Ads + food CTA |
| 3 | **Dog Daily Food & Calorie Calculator** | `dog food calculator`, `dog feeding calculator` | **Ideal body weight, BCS (1–9), neuter status, age, activity, kcal density** | kcal/day, grams, cups, cans, meals/day, treat allowance | **Chewy/Amazon affiliate — primary money tool** |

### Tier 2 — Month 2 (Weeks 5–7). Also AI-resistant, strong intent.

| # | Tool | Primary keyword | Notes |
|---|---|---|---|
| 4 | Cat Daily Food & Calorie Calculator | `cat food calculator` | Cats need distinct treatment (RER, not the dog chart). Same BCS + neuter inputs. |
| 5 | Dog Pregnancy & Whelping Timeline | `dog pregnancy calculator` (+900% YoY) | 63-day gestation, week-by-week, vet visit calendar, breed litter-size notes |
| 6 | Cat Pregnancy / Gestation Calculator | `cat pregnancy calculator` | ~63–65 days |
| 7 | Raw Feeding & BARF Ratio Calculator | `dog raw diet calculator`, `raw feeding calculator` | 80/10/10 or 70/10/20 ratios, RMB, bone-in vs boneless. PAA: *"how much homemade dog food to feed calculator?"* |
| 8 | Breed-Aware Ideal Weight & BCS Guide | `dog ideal weight calculator`, `dog bcs calculator` | **Now a guide page, not a standalone tool** — BCS moved into Tool #3. This is the canonical BCS explainer + breed target tables, cited by the food tool. |

### Tier 3 — Support pages (Weeks 6–8). AIO-vulnerable. **Job changed: route, don't answer.**

The audit (§1.5) confirmed these queries are answered by Google, and for dog age the AIO has already printed the complete conversion table. Building the same chart is pointless.

The new job for these pages is to be **routers**: answer in one line, then route to the tool that needs user data.

> *"Your cat is 11 → **64 human years** → **SENIOR**. Senior cats need a higher protein floor and roughly X kcal/kg.*
> *→ [Calculate your senior cat's daily food amount]"*

| # | Tool | Primary keyword | Job |
|---|---|---|---|
| 9 | Dog Age in Human Years | `dog age calculator`, `how old is my dog in human years` | Router → puppy growth + food. Keep the size-class chart small — it is there for PAA + image search, not to win the head term. |
| 10 | Cat Age in Human Years + full 1–20 chart | `cat age calculator`, `cat years to human years` | Router → cat food. The 1–20 table earns the rich snippet and the image carousel. |
| 11 | **Human Years → Cat Years (reverse)** | `how old is 100 years in cat years`, `how old is 7 years in cat years` | **New. Uncontested — Google's AIO and every clone go cat→human only. Cheapest traffic on the board.** |
| 12 | **Human Years → Dog Years (reverse)** | `how old is a 20 year old dog` | **New. Same logic.** |

### Tier 4 — pSEO (Weeks 8–13). Gated on data completeness.

| # | Page | Targets |
|---|---|---|
| 13 | `/breeds/[breed]/` | `french bulldog food calculator`, `labrador feeding guide`, etc. |
| 14 | `/breeds/[breed]/feeding-chart/` | `french bulldog feeding chart`, weight-band tables |
| 15 | `/breeds/[breed]/growth-chart/` | `german shepherd puppy growth chart` |
| 16 | `/breeds/[breed]/health/` | `french bulldog health problems` — E-E-A-T signal, links to vet sources |
| 17 | `/guides/[slug]/` | PAA targets: *"the 95% rule in dog food"*, *"is 1 human year 7 years for a dog"*, *"how much food to feed a dog chart"* |

> **Why breed pages matter *more* after the audit:** the dog-age AIO table is generic by size class. It cannot answer *"how old is my French Bulldog in human years"*. Breed pages are the escape hatch from a generic AIO — which makes Tier 4 a **defensive** requirement, not merely a volume play.

---

## 5. URL Architecture

```
/                                   Home — brand + 10 tools + 3 featured breeds (no filters until 8+ tools)
/tools/{slug}/                      Every calculator
/breeds/                            Breed index (300 entries), faceted by size class
/breeds/{breed}/                    Breed hub: data, chart, embedded calculator, notes
/breeds/{breed}/feeding-chart/
/breeds/{breed}/growth-chart/
/breeds/{breed}/health/
/guides/{slug}/                     Long-form supporting content (feeds, myth-busting)
/glossary/{slug}/                   Entity coverage ("RER", "BARF", "body condition score")
```

**Rules**
- No trailing slashes. Lowercase, hyphenated, max 3 segments.
- Canonical = absolute URL, self-referencing. Every page.
- Breeds are **not** a sub-path of tools. `/breeds/french-bulldog/` (hub) is separate from `/tools/dog-food-calculator/` (generic tool). The generic tool links *down* to breed variants; breed hubs link *up* to the tool. That link graph is the topical authority signal.
- Breadcrumbs on every page, in JSON-LD.

---

## 6. Tech Stack & Exact Setup

**Stack:** Astro 6 (SSG) · Tailwind CSS v4 · Cloudflare Pages · GitHub Actions deploy · Google Search Console + GA4

> ⚠️ The current workspace is **not** set up for this. `package.json` has no Tailwind, `astro.config.mjs` is empty, and `src/pages/index.astro` contains an unrelated calculator. See §14 Housekeeping.

### 6.1 Install (Tailwind v4 — no `tailwind.config.js` needed)

```bash
npm install tailwindcss @tailwindcss/vite @astrojs/sitemap
```

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://yourdomain.com',          // REQUIRED for sitemap + canonical
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

`src/styles/global.css`:
```css
@import "tailwindcss";

@theme {
  --color-ink: #1c1917;
  --color-brand: #e8590c;      /* warm — pet niche, not developer-tool black */
  --color-surface: #fffdf9;
  --font-display: "Fraunces", serif;
  --font-body: "Inter", sans-serif;
}
```

> **v4 gotchas that will bite us:**
> - `@import "tailwindcss";` — the old `@tailwind base/components/utilities` directives are gone.
> - Astro `<style>` blocks and CSS Modules need `@reference "../styles/global.css";` at the top to access theme vars.
> - No `tailwind.config.js`. Theme tokens live in `@theme` in CSS.
> - `@theme` variables must be top-level (not nested in a selector or media query).

### 6.2 Layout requirements (non-negotiable for a tool site)

`src/layouts/Base.astro` must emit:
- `<title>` ≤ 60 chars, brand appended
- `<meta name="description">` 140–160 chars, includes the primary keyword naturally
- `<link rel="canonical">` absolute
- Open Graph + Twitter card
- **JSON-LD**: `WebApplication` (with `applicationCategory: "UtilitiesApplication"`), `BreadcrumbList`, `FAQPage` where a FAQ exists, `Dataset` on breed pages
- `robots.txt` + `sitemap-index.xml` (astro sitemap handles it)
- One `<h1>` per page, matching the primary keyword
- **No JS-dependent content.** All results must be in the server-rendered HTML or at minimum in a `<noscript>`-reachable path. Google will not index a calculator that renders nothing without JS. Astro islands are fine — but keep the static shell meaningful.

### 6.3 Performance budget

| Metric | Target |
|---|---|
| LCP (mobile, 4G) | < 1.8 s |
| CLS | < 0.05 |
| INP | < 150 ms |
| JS shipped | < 30 KB gzip per tool page |
| Fonts | Self-hosted, `font-display: swap`, ≤ 2 families, ≤ 2 weights each |

Pet audiences are 60%+ mobile, on mid-range Android. A slow tool page loses the ranking *and* the click.

---

## 7. Distribution — The Part the Original Plan Buried

The prior plan put Reddit outreach on **Day 14 of Week 2**. That is backwards. Distribution is not a post-launch task; it is the **link engine**, and a tool site with zero backlinks will stall at page 2.

### 7.1 The Share Card (build it in Week 2, not later)

Every tool generates a **branded, shareable PNG** of the user's result:
> *"Willow will weigh about 24–29 kg as an adult"* — with logo, breed photo, growth chart.

Implementation: `satori` + `resvg` server-side at build? No — client-side `html-to-image` or pre-render via an Astro API route. Simplest robust path: render the card as **SVG in the DOM**, serialise to a data URL, and post it.

**Why this matters:** it turns a tool into a shareable artefact. Posts to r/dogs, r/dogpictures, Pinterest, and Instagram carry backlinks to the specific tool URL. No competitor in our 50-site list does this. It is the single cheapest link-building tactic available.

### 7.2 Launch distribution checklist

| Channel | Action | When |
|---|---|---|
| Reddit | r/dogs, r/Puppy101, r/dogsomething, r/cats, r/catadvice, r/dogbreed (read their self-promo rules first — many ban outright) | Every tool launch, with the share card |
| Pet communities | Facebook groups (Breed-specific, raw feeding), Discord pet servers | Week 4+ |
| Pinterest | Growth charts and feeding charts as vertical pins → link to breed pages | Week 8+ (pins compound for months) |
| YouTube Shorts / TikTok | Screen-record the calculator → link in bio | Week 6+ |
| Direct outreach | Vet clinics, breeders, pet bloggers — offer the free tool | Week 8+ |
| Product Hunt / Indie Hackers | Launch the whole hub once 8+ tools are live | Week 12 |

### 7.3 E-E-A-T and AEO — winning the AI Overview citation

Since AI Overviews are a direct competitor *and* a distribution channel, we optimise for both.

#### The citation bar (derived from §1.5)

Google cited **Sydney Animal Hospitals, Purina, Royal Canin, Pet Nutrition Alliance, International Cat Care, La Petitta Labs, VitaDog Nutrition, WebMD, PetMD, Omni Calculator, Dog Food Advisor** — and **not one** of the 50 clone calculator sites.

The pattern: **clinical, academic, or long-established**. To be cited, we must look like a clinical source.

#### Rules

1. **Name the method, every time.** "Using the WSAVA (2018) growth curves by size class, cross-checked against Salt et al. (2017)" is citable. "We ran the numbers" is not. Put the method in its own `<h2>`-titled section on every tool page.
2. **Cite peer-reviewed and nonprofit sources** — NRC (2006), WSAVA / Flohr et al. (2018), OSU growth charts, International Cat Care, AAHA/AAFP guidelines. Never cite another calculator site. Never cite brand marketing pages as authority.
3. **Publish the numbers as extractable HTML.** Google's extractor reads clean HTML — tables, `<dl>`, `<th>`/`<td>`, tidy `<h2>`s. A chart drawn on a `<canvas>` or rendered only by JS is invisible to it. **Always render the underlying data as a real HTML table too.**
4. **Answer immediately below the H1.** One or two sentences, then the tool. Never bury the answer under a form.
5. **3–5 genuine FAQs per tool page**, in `FAQPage` schema. Write real questions with real answers — the PAA questions in §1.5 are a ready-made list.
6. **Keep answers short, quotable, and attributed.** AI Overviews lift short, well-structured statements with a clear source.
7. **Get a named human reviewer.** "Reviewed by Dr. X, DVM" on even 5 high-traffic breeds. Also add `lastReviewed` dates to every page. If no vet will sign off, **do not fabricate one** — a fake reviewer is an E-E-A-T liability, not an asset.
8. **Publish a methodology page** — `/methodology/` explaining every formula, every source, every assumption, and every known limitation. This is the single most citable asset we can own, and it is the one thing none of the 50 competitors has.
9. **Build for image search.** Two of the five audited SERPs showed image packs. Growth charts, feeding charts and conversion charts must exist as **real images** with descriptive alt text and an image sitemap. Pinterest is the compounding version of the same channel.

#### Citation-target list — who to chase for mentions

These are the sources Google already trusts in this space. A mention or link from any of them is worth far more than 50 generic guest posts.

| Target | Why | How |
|---|---|---|
| Veterinary clinics (Sydney Animal Hospitals took #1 on the head term) | A real clinic outranked every calculator | Offer them a free branded tool with their logo. They have traffic; you have the tool. |
| Pet-food brands (Purina, Royal Canin, Hill's, Iams) | Cited by Google; have co-marketing budgets | Offer a co-branded feeding calculator |
| Nonprofit & breed clubs (International Cat Care, AKC, Golden Retriever Club, French Bulldog Club of America) | Nonprofit sources get cited; clubs publish breed facts | Provide breed data they can cite — with a link back |
| Universities (OSU, Tufts, Cornell) | Publish growth-curve research | Cite them properly; some will link back |
| Pet nutritionists & raw-feeding advocates (VitaDog, The Dog Spot, The Dog Nutritionist) | Already ranking; used by owners | Offer data + a quotable methodology |

> A mention from one of these is worth ~50 generic backlinks — both for AIO citation and for ranking.

---

## 8. Publishing Gates (Quality Control)

| Asset | Gate |
|---|---|
| Breed entry | Complete: weight M/F, growth curve, energy factors, **lifespan range**, `bcsIdeal`, `facts` populated (exercise need + ≥1 condition + ≥1 citation), ≥1 source, no placeholder text. **Prose is optional** (§3.5) |
| Breed page | Entry passes gate + a breed-specific feeding chart + an embedded calculator + ≥ 3 internal links + share card |
| Tool page | Works with JS disabled for the static shell, has FAQPage schema, has a cited method section, mobile-perfect |
| Any page | `<title>` ≤ 60 chars, meta description 140–160, one H1, canonical absolute, image with OG tags |

**Ramp, don't dump:** 25 breeds (W1) → 60 (W3) → 150 (W9) → 300 (W11). Publishing 300 thin pages in one day is the classic pSEO failure mode.

---

## 9. 90-Day Schedule

### Week 1 — Foundation + first 25 breeds
- [ ] **Register `petcalc.io` + `petcalculator.io`** (§1.4 — RDAP-verified available). Check the `.io` renewal price before committing.
- [ ] Relocate the housing society calculator out of this tree (§14) — clean tree before any new file
- [ ] Set up Cloudflare Pages + GitHub repo
- [ ] Scaffold Astro + Tailwind v4 + sitemap (§6.1)
- [ ] Build `Base.astro` (SEO-complete layout) + design system (`global.css` `@theme`)
- [ ] Define the `Breed` interface incl. `lifespanYears` + `facts` (§3.1); create `src/data/breeds.ts`
- [ ] **Source and enter 25 breeds** — ~2 days of structured data, no prose yet (§3.6). Start with the seed list in §3.4
- [ ] Build the puppy-growth formula module + unit tests against published breed charts. **Name the method** (§15 step 7)
- **Gate A:** `npm run build` clean, site deploys, 25 breed entries validated with sources

### Week 2 — Tool #1 + the Link Engine
- [ ] `/tools/puppy-growth-calculator/` — full implementation, schema, FAQ, cited method section
- [ ] Share-card generator (SVG → PNG) — first working version
- [ ] Google Search Console + GA4 + Bing Webmaster
- [ ] `robots.txt`, sitemap submission, `llms.txt` (optional but cheap)
- [ ] **Write the prose for the top 5 breeds** (optional upgrade, §3.5) — this is where the AIO-citation language comes from
- **Gate B:** Tool live, indexed, GSC connected, 1 share card generated

### Week 3 — Dataset expansion + validation
- [ ] Grow dataset to 60 breeds
- [ ] Deploy + submit sitemap; check GSC for indexation errors
- [ ] **Reddit launch**: r/dogs, r/Puppy101 with the share card
- [ ] Start ranking baseline: record positions for all 10 target keywords
- **Gate C:** GSC impressions > 0 on the puppy tool; ≥ 1 page in top 30

### Week 4 — Tool #3, the Money Tool
- [ ] `/tools/dog-food-calculator/` — **inputs: ideal body weight, BCS (1–9), neuter status, age, activity, kcal density** (match what Google's AIO says is required — §1.5). Output: kcal/day, grams, cups, cans, meals/day, treat allowance
- [ ] Breed-aware BCS: `bcsIdeal` + `bcsCaution` per breed, with a visual BCS picker (9 tap-to-select silhouettes)
- [ ] **Affiliate integration**: Chewy + Amazon Associates links on the result (UTM-tagged)
- [ ] Validate against Royal Canin / Hill's / Dog Food Advisor published calculators
- [ ] Apply to Chewy affiliate programme (approval ~1–2 weeks)
- [ ] **Publish `/methodology/`** — every formula, source, assumption, limitation. The most citable asset we own (§7.3 rule 8)
- **Gate D:** first affiliate click tracked **AND** `/methodology/` live

### Week 5 — Tier 2 part 1
- [ ] `/tools/cat-food-calculator/` (same BCS + neuter inputs)
- [ ] `/tools/dog-pregnancy-calculator/` (63-day, week-by-week timeline, vet-visit calendar)
- [ ] Dataset → 100 breeds
- [ ] Pinterest account + 10 pins
- [ ] **Start the vet-review outreach list** — 20 clinics + breed clubs (§7.3 citation targets)

### Week 6 — Tier 3 support pages + the hub
- [ ] `/tools/dog-age-calculator/`, `/tools/cat-age-calculator/` — built as **routers**, not as answers (see §4 Tier 3)
- [ ] **`/tools/human-years-to-cat-years/`** and **`/tools/human-years-to-dog-years/`** — reverse calculators, uncontested (§1.5 PAA)
- [ ] Build the home page (brand + 10 tools + featured breeds) — **first time building it**
- [ ] Internal linking pass: every tool ↔ every related tool ↔ relevant breed hubs
- **Gate E:** 6 tools live, home page live, all links crawl-clean

### Week 7 — Breed hub template + first batch
- [ ] `/breeds/[breed]/` template with the real data, feeding chart, embedded calculator
- [ ] Publish 25 breed hubs (only gate-passing breeds)
- [ ] `/breeds/` index with size-class facets

### Week 8 — Analytics + iteration
- [ ] GSC deep dive: which queries get impressions but no clicks → fix titles/meta
- [ ] **First AI Overview citation audit** — check all 5 head queries, log whether we are cited (§11). If not cited, compare our page against the cited source (Sydney Animal Hospitals / Dog Food Advisor) and close the gap in methodology + trust signals
- [ ] Publish 25 more breed hubs (50 total)
- [ ] Core Web Vitals pass on the slowest templates
- [ ] Pet insurance affiliate application (Lemonade / Spot / Trupanion)
- [ ] Vet/club review outreach: first 10 clinics contacted, first 2 reviews signed (§7.3)
- **Gate F (checkpoint):** cumulative GSC impressions > 1,000 **AND** ≥ 3 pages in top 20 **AND** reverse calculator in top 10

### Week 9 — Monetisation + wider tool set
- [ ] `/tools/raw-feeding-calculator/`, `/tools/dog-ideal-weight-calculator/`
- [ ] AdSense application (eligible from day 1 traffic; apply now anyway)
- [ ] Dataset → 200 breeds; breed hubs → 100
- [ ] Pinterest + TikTok/Shorts push

### Week 10 — Scale + outreach
- [ ] Breed hubs → 150; dataset → 250
- [ ] Direct outreach: 20 vet clinics / bloggers offering the free tool
- [ ] `/guides/` content: 5 long-form pieces feeding internal links
- **Gate G (kill-criterion checkpoint):** see §11

### Week 11 — Completion
- [ ] Dataset → 300 breeds; breed hubs → 250
- [ ] `/breeds/[breed]/health/` pages (20 best breeds) — E-E-A-T play
- [ ] Glossary pages (RER, BARF, BCS, AAFCO)

### Week 12 — Monetisation stack + launch
- [ ] Apply to **Mediavine** / Ezoic (≈50K sessions/mo threshold — verify current requirements)
- [ ] Ad placement: below results, in-content, and on breed hubs (never on the tool result itself — that kills trust)
- [ ] Product Hunt + Indie Hackers launch of the full hub
- [ ] Article "How we calculate puppy growth" → link earning pitch to pet blogs

### Week 13 — Measure + plan Q2
- [ ] Full analytics review: sessions, top queries, top pages, affiliate EPC, RPM
- [ ] Update PROJECT.md with actuals; rewrite Q2 targets from real data
- [ ] Identify the 10 highest-performing pages → double down (more breeds, more tools, more links)

---

## 10. Monetisation Model

### 10.1 Revenue stack (in priority order)

| Source | When it starts | Mechanic | Notes |
|---|---|---|---|
| **Chewy / Amazon affiliate** | Week 4+ | 3–8% on a monthly food basket | The main lever. Convert = user acting on your food recommendation. |
| **Pet insurance CPA** | Week 8+ | $30–100 per signup | High variance, high payout. Best on "puppy" + "new owner" intent. |
| **AdSense** | Week 9+ | $3–8 RPM | Floor, not a business. |
| **Mediavine / Ezoic** | ~50K sessions/mo | $8–18 RPM | Step change over AdSense. Verify current threshold + engagement criteria. |
| **Own product (e.g. growth-plan PDF, printable charts)** | Month 5+ | $5–15 | Optional; only once traffic exists. |

> ⚠️ Commission rates, approval criteria, and RPM figures **change** and vary by geography/traffic quality. Re-verify every one of these against the programmes' current terms before you model revenue off them. Treat the table below as shape, not precision.

### 10.2 Shape of the ramp (indicative, not a promise)

| Month | Sessions/mo | Display | Affiliate | Total/mo |
|---|---|---|---|---|
| 3 | 2K–4K | $20–$60 | $0–$50 | $20–$110 |
| 6 | 15K–30K | $150–$500 | $150–$500 | $300–$1,000 |
| 9 | 40K–80K | $600–$2,000 | $700–$1,800 | $1,300–$3,800 |
| 12 | 80K–150K | $1,600–$4,500 | $1,500–$4,000 | $3,100–$8,500 |

**Assumptions:** display at $4–$10 RPM (AdSense→Mediavine blend), affiliate EPC of $0.10–$0.25 on food-calculator traffic. If your affiliate EPC is below $0.05, the pet food angle is not working and you must fix the food tool or reallocate effort to growth/insurance intent.

**Deliberately conservative:** this assumes you do NOT break out, do NOT go viral, and do NOT hit top-3 on head terms. A single top-3 placement on a 30K-volume term adds ~$1,500–$3,000/mo on its own.

### 10.3 Honest probability

| Outcome (12 months) | Probability |
|---|---|
| 10K+ sessions/mo | ~50% |
| 50K+ sessions/mo | ~20% |
| $1,000+/mo revenue | ~30% |
| $5,000+/mo revenue | ~8% |

This is a good, real, boring-money project. It is not a get-rich-quick play, and it is **not** the plan as originally written — the clone version has roughly a third of these odds.

---

## 11. KPI Dashboard & Kill Criteria

### Track weekly (a single spreadsheet, one tab)

| Metric | Where | Target trajectory |
|---|---|---|
| **AI Overview citations** | Manual check, weekly, logged per query | **Puppy growth + dog food: cited by Week 13.** This is the single most valuable metric — see below. |
| GSC impressions (cumulative) | GSC | Week 8 > 1,000; Week 13 > 10,000 |
| GSC clicks | GSC | Week 13 > 300 |
| Pages in top 20 (target keywords) | Manual rank tracker | Week 8 ≥ 3; Week 13 ≥ 15 |
| Reverse-calculator rankings | rank tracker | `how old is 100 years in cat years` in top 10 by Week 8 (should be fast — uncontested) |
| Indexed pages | GSC | = published pages − 5% |
| Organic sessions | GA4 | Week 13 > 1,500 |
| Affiliate clicks | GA4 + affiliate dashboard | Week 13 > 100 |
| Affiliate EPC | affiliate dashboard | > $0.10 |
| Avg position, head terms | rank tracker | Week 13 < 40 |
| Referring domains | Ahrefs free tier | Week 13 > 20 |

> **AIO citation tracking method:** once a week, load `puppy growth calculator`, `dog food calculator`, `dog age calculator`, `cat years to human years` in a clean incognito window and record (a) whether an AIO appears, (b) whether **our URL is cited in it**, (c) which URLs are cited instead. Log it in one column. If we are cited by Week 13, that single data point is worth more than 20 pages of organic traffic — AIO citations carry a click and a brand impression across every query that triggers them.
>
> **Why this is the top KPI:** the AIO on our two best queries is a *tool list*. If we are in that list, we receive traffic for queries we have not even ranked for yet. The 50 clone sites have zero AIO presence — this is the one channel where a new entrant with better methodology can leapfrog them.

### Kill criteria — be honest with yourself

| By | If | Then |
|---|---|---|
| **Week 10** | No page in top 30 for any target keyword **AND** cumulative GSC impressions < 1,000 | **Stop.** The keyword set or the SERP is wrong. Re-do §1.5 checks and reconsider. |
| **Week 13** | Total organic sessions < 500/mo | **Stop or pivot.** Consider the India-first calculator as a separate project. |
| **Week 13** | Affiliate EPC < $0.05 despite 1,000+ sessions | Not a kill, but a **reallocation**: the food tool is underperforming. Rebuild it around breed-aware recommendations before investing in pSEO. |
| **Any time** | You are averaging < 10 hrs/week | You will not hit these targets. Either cut scope to 3 tools + 50 breeds, or pause deliberately. |

---

## 12. Brand & Domain

**`.com` pet-calc names are exhausted.** The brand must be distinctive enough to stand apart from 50 clone sites, and ideally hint at the *data* (the moat), not just "calculator."

**Option A — keep the original brand on `.io` (recommended if the history is clean)**

| Domain | Status |
|---|---|
| `petcalc.io` | ✅ Available (RDAP-verified, control-tested) |
| `petcalculator.io` | ✅ Available (RDAP-verified, control-tested) |

The `.com` is gone, but the name is not. `petcalc.io` is short, memorable, and reads as a real product.

**Option B — distinct brand (if `petcalc.io` has a dirty history or is too generic)**

| Name | Angle |
|---|---|
| `pawmetric.com` | Data-first, sounds like a lab |
| `breedform.com` | Breed + formula |
| `furfactor.com` | Energetic, meme-able |
| `pawform.com` | Clean, brandable |
| `breedwise.com` | Authority framing |
| `petgrids.com` | Grid/table framing, distinctive |
| ~~`tailscale.com`~~ | ❌ Taken — famous scale-weighing company |

> **Why Option B is worth considering anyway:** 50 sites already use "pet" + "calc". A distinct brand is easier to make citable and easier to own. "PawMetric" or "BreedForm" signals *data*, which is our actual moat. **A brand that signals the moat is worth a day of extra deliberation.**

**Requirements**
- `.com` preferred → `.io` → `.co`
- No hyphens, no digits
- Check: RDAP/WHOIS, **Wayback Machine (spam history)**, USPTO/TPO trademark, Google "site:" + exact-match brand search, social handles (X, Reddit, Instagram, YouTube)
- **Check the RENEWAL price on `.io`** — several registries price `.io` renewals aggressively. A `.io` renewing at $60/yr loses to a clean `.com` at $12/yr.
- **Do not buy a "premium" domain.** $50 for a clean name beats $800 for a parked one.
- Register 2–3 years; set auto-renew on.

**Brand voice:** warm, confident, vet-adjacent, never cute-overload. Competitors are either clinical (petcarecalculators) or cutesy. Be the **trusted instrument** — "we cite our sources" is the brand.

---

## 13. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| ~~Google ships an AI Overview for our head terms~~ | **✅ MATERIALISED 2026-11-12** | — | **Closed.** Audit complete (§1.5). Age converters demoted to Tier 3 routers. Tier 1 tools confirmed viable. New risk tracked below. |
| **We are not cited in the AIO — our tool is good but Google prefers a known brand** | Medium | High | The AIO lists tools; it does not require brand authority. Win it with a **named methodology + peer-reviewed citations + a `/methodology/` page + a vet reviewer** (§7.3). Track citation weekly (§11). |
| **AIO citation never arrives** (Google keeps citing Pedigree/Purina/Dog Food Advisor) | Medium | Medium | Breed-level pages remain the escape hatch (§4 Tier 4) — a generic size-class AIO cannot answer a breed-specific question. Also: AIOs are personalised and vary by location/device — track across several. |
| **A clone copies our tool within 2 weeks** | Near-certain | Low | They can't copy the dataset's depth, the citations, or the methodology page. Ship the share card + `/methodology/` + the vet review first |
| **A big publisher (Rover, PetMD, AKC) builds the same tools** | Medium | High | They build content, not tools. Note **Sydney Animal Hospitals — a real vet clinic — is already #1 on our head term.** That is the template to beat: clinical credibility, not SEO tricks. Race to the dataset + brand. |
| **Pet food affiliate approval denied / EPC too low** | Medium | Medium | Apply Week 4. Have Amazon Associates as backup. Test EPC by Week 10 and reallocate per §11 |
| **Programmatic breed pages seen as doorway pages** | Medium (if we cut corners) | High | §8 publishing gates are hard. Ramp. Real prose. Real citations |
| **BREED DATA ERROR causes harm** | Low–Medium | **High** | Vet-review the top 20 breeds. Prominent disclaimer on every tool. "Educational estimate, consult your vet." Never present as medical advice |
| **Traffic never reaches Mediavine threshold** | Medium | Low | AdSense from Week 9 covers the floor. Insurance CPA is the hedge |
| **Underestimating build time** | High | Medium | Buffers are built into the gates. If Week 8 slips, cut breed count, never cut the gates |
| **Scope creep into 20 tools** | Medium | Medium | Hard cap: 10 tools in 90 days. Tier 4 is pSEO only |

---

## 14. Housekeeping — Current Workspace State

`E:\new project` currently contains **a different project**. Audit before touching anything:

| Path | Current state | Action |
|---|---|---|
| `src/pages/index.astro` | **Housing Society Maintenance Interest Calculator (India)** — unrelated to the pet plan | ⚠️ **Do not delete.** Relocate first — see the command below |

**Relocating it safely.** The other agent's `Copy-Item -Recurse "E:\new project" "E:\new project-society"` would also copy `node_modules` (hundreds of MB), `dist/` and `.git/` — slow and wasteful. Use `robocopy` with exclusions instead:

```powershell
$src = "E:\new project"
$dst = "E:\new project-society"

New-Item -ItemType Directory -Path $dst -Force | Out-Null
robocopy $src $dst /E /XD node_modules dist .git .astro /XF package-lock.json
```

This copies the source only, skips the build artefacts, and leaves the original untouched so nothing is lost if the copy is wrong. **Verify the copy opens and builds before you delete anything from `E:\new project`.**

> ✅ **DONE 2026-11-12.** Copied with `robocopy` (excluded `node_modules`, `dist`, `.git`, `.astro`), then verified with a clean `npm install` (253 packages) and a successful `npm run build` (1 page built). The society project now lives at `E:\new project-society` with its own README. It was **relocated, not deleted** — it is the India-first fallback (DECISIONS.md §1, row 6).

#### Status of this section — cleanup DONE 2026-11-12

| Path | Before | Now |
|---|---|---|
| `src/pages/index.astro` | Society calculator | ✅ Replaced with the pet home page |
| `src/layouts/Layout.astro` | Society layout | ✅ Replaced by `src/layouts/Base.astro` |
| `DESIGN.md` | Vercel design system | ✅ **Deleted** — superseded by the `@theme` tokens in `src/styles/global.css` (D15). A stale design spec in the tree during a build is actively misleading |
| `package.json` | Astro 6 only | ✅ `tailwindcss`, `@tailwindcss/vite`, `@astrojs/sitemap`, `@fontsource-variable/inter`, `@fontsource-variable/fraunces` |
| `astro.config.mjs` | Empty | ✅ `site: 'https://petcalc.io'`, `sitemap()`, Tailwind v4 Vite plugin, `build.format: 'directory'` |
| `src/assets/astro.svg`, `background.svg` | Starter assets | ✅ Removed |
| `public/robots.txt` | Missing | ✅ Created, points at the sitemap index |
| `src/styles/global.css` | Missing | ✅ Tailwind v4 `@theme` tokens — warm brand palette, Fraunces display + Inter body, self-hosted fonts |

**Verified working:** `npm run build` succeeds; sitemap-index.xml + sitemap-0.xml generated; title, meta description, absolute canonical and JSON-LD (`WebApplication` + `BreadcrumbList`) all present in the output HTML.

**Suggested layout after cleanup**
```
src/
  components/      ToolShell, ResultCard, ShareCard, DataTable, Faq, Breadcrumbs
  data/            breeds.ts (the dataset), formulas.ts, foods.ts
  layouts/         Base.astro, ToolLayout.astro, BreedLayout.astro
  pages/
    index.astro
    tools/[tool].astro
    breeds/index.astro
    breeds/[breed]/index.astro
    breeds/[breed]/feeding-chart.astro
    breeds/[breed]/growth-chart.astro
    guides/[slug].astro
  styles/global.css
```

---

## 15. This Week's Checklist

1. ~~**Run the AI-Overview check** (§1.5) on all target keywords in incognito.~~ ✅ **Done 2026-11-12.** Findings in §1.5; plan updated. Head terms audited: `cat years to human years`, `how old is my dog in human years`, `dog age calculator`, `puppy growth calculator`, `dog food calculator`.
2. **Audit the remaining 5 target keywords** the same way (AIO + PAA + organic #1): `cat age calculator`, `cat food calculator`, `puppy weight calculator`, `dog pregnancy calculator`, `french bulldog food calculator`. *Record: AIO present? does it answer or list tools? who is organic #1?* Add findings to §1.5. **← next**
3. **Register `petcalc.io` and `petcalculator.io`** (§1.4 — both RDAP-verified available). Then run the §12 history/trademark checks. Check the `.io` **renewal** price before committing.
4. ~~Decide the fate of `src/pages/index.astro` (housing society calculator)~~ ✅ **Done 2026-11-12** — relocated to `E:\new project-society`, verified with a clean install + successful build. Not deleted.
5. ~~Scaffold Astro + Tailwind v4 + sitemap in a clean branch~~ ✅ **Done 2026-11-12** — `astro.config.mjs` (`site` + `sitemap()` + Tailwind v4 Vite plugin), `src/styles/global.css` (`@theme` tokens), `src/layouts/Base.astro` (canonical + OG + JSON-LD + self-hosted fonts), `public/robots.txt`. Build verified clean.
6. **Define the `Breed` interface and source 25 breeds with real citations** (§3) — 🔶 interface done, **15 seed entries written but all `verified: false`**. Verify each against its source and flip the flag; `canPublish()` blocks the rest.
7. **Build the puppy-growth formula module + test against 10 published breed charts** — ✅ module written (`src/data/formulas.ts`, `src/data/growthCurves.ts`). **Still needed:** validate the WSAVA curve points against the published figures (they are currently transcribed approximations) and add unit tests.
8. **Ship `/tools/puppy-growth-calculator/` + the share card** — ⬜ next build task.

---

### 15.1 Recently completed

| Date | What |
|---|---|
| 2026-11-12 | Live AI Overview audit of 5 head terms → §1.5 written, plan revised (D3, D5, D7, D8) |
| 2026-11-12 | `petcalc.io` / `petcalculator.io` confirmed available via RDAP (control-tested) |
| 2026-11-12 | Housing society calculator relocated to `E:\new project-society`, verified by clean install + build |
| 2026-11-12 | Astro + Tailwind v4 + sitemap scaffold, `Base.astro`, design tokens, `robots.txt` — build verified |
| 2026-11-12 | Data layer written: `breeds.ts` (15 entries + publish gate), `growthCurves.ts` (WSAVA curves), `formulas.ts` (engine), `tools.ts` (registry) |
| 2026-11-12 | `DECISIONS.md` created — the full reasoning record |
| 2026-11-12 | Publish gate relaxed from prose-volume to structured-data + specific facts (D9, R1) |

---

*Plan basis: live SERP audit (5 head terms), RDAP domain checks, competitor content analysis, and the Nov 10 keyword research. Every number in §10 and §11 is an estimate — treat them as targets to beat or revise with real data at Week 13.*
