# 🐾 PetCalc — Breed-Aware Pet Calculators

A global (US / UK / AU / CA) suite of breed-aware pet calculators, built on a proprietary dataset of 300+ breeds.

> **The calculator is not the product. The dataset is the product.**
> Calculators are how people find the data and how Google indexes it.

---

## 📄 Documentation

| Document | Purpose |
|---|---|
| **[PROJECT.md](./PROJECT.md)** | **The build spec.** Strategy, moat/data model, tool portfolio, URL architecture, tech setup, 90-day schedule with gates, monetisation model, KPI dashboard, kill criteria, risk register. |
| **[DECISIONS.md](./DECISIONS.md)** | **The reasoning.** Research journey, verification log, decision log (D1–D15), rejected options, corrections (R1–R5), open questions, outreach talking points, hard rules. |

> Read PROJECT.md for **what** to build, DECISIONS.md for **why**. Where they disagree, PROJECT.md wins on what, DECISIONS.md wins on why.

---

## 🔍 Source research (external, read-only)

| Document | Contents |
|---|---|
| [full-conversation-archive.md](file:///C:/Users/Himanshu%20kumar/.gemini/antigravity/brain/32d09855-e13a-4761-ab7e-0cf448c2d6c1/full-conversation-archive.md) | Nov 10 niche-selection summary |
| [pet-calculator-site-plan.md](file:///C:/Users/Himanshu%20kumar/.gemini/antigravity/brain/32d09855-e13a-4761-ab7e-0cf448c2d6c1/pet-calculator-site-plan.md) | Original keyword list + tool ideas |
| [ai-tools-directory-research.md](file:///C:/Users/Himanshu%20kumar/.gemini/antigravity/brain/32d09855-e13a-4761-ab7e-0cf448c2d6c1/ai-tools-directory-research.md) | Rejected-niche analysis |
| [website-research-summary.md](file:///C:/Users/Himanshu%20kumar/.gemini/antigravity/brain/32d09855-e13a-4761-ab7e-0cf448c2d6c1/website-research-summary.md) | Earlier JEE / pSEO history |

> These were the **input** to the plan, not the plan. PROJECT.md corrects three structural errors in them (tool ordering, monetisation priority, the assumption that breed pSEO was unclaimed) and adds a **completed live AI Overview audit** of the 5 head terms.

---

## 🏗️ Project structure

```
src/
  data/
    breeds.ts        ← THE PRODUCT. Breed dataset + publishing gate (canPublish)
    growthCurves.ts  ← WSAVA size-class growth curves (5 curves, not 300)
    formulas.ts      ← RER/MER, portions, growth prediction, age conversion,
                       pregnancy timeline, BCS — each with its source string
    tools.ts         ← Tool registry (single source of truth for nav/sitemap)
  layouts/
    Base.astro       ← SEO-complete layout: canonical, OG, JSON-LD
                       (WebApplication + BreadcrumbList + FAQPage), fonts
  pages/
    index.astro      ← Home
  styles/
    global.css       ← Tailwind v4 @theme tokens (pet-appropriate, NOT Vercel)
public/
  robots.txt
```

### Related project

The **Housing Society Maintenance Interest Calculator (India)** was originally built in this folder. It was relocated to **`E:\new project-society`** on 2026-11-12 (verified: clean `npm install` + successful build) and is retained as the India-first fallback. See its own README.

---

## 🚀 Getting started

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # → dist/  (+ sitemap-index.xml)
npm run preview      # serve the built output locally
```

**Stack:** Astro 6 (SSG) · Tailwind CSS v4 (`@tailwindcss/vite`, no config file) · Cloudflare Pages · self-hosted variable fonts (`fontsource`) with `unicode-range` so browsers fetch only the latin subset.

---

## ✅ Current state

| Area | Status |
|---|---|
| Astro + Tailwind v4 + sitemap scaffold | ✅ Working, builds clean |
| `Base.astro` SEO layout (canonical, OG, JSON-LD, breadcrumbs) | ✅ |
| Design tokens (`global.css` `@theme`) | ✅ |
| Formula engine + WSAVA curves | ✅ Written, **not yet peer-verified** |
| Breed dataset | 🔶 15 seed entries, **all `verified: false`** — none publishable yet |
| Tool pages | 🔶 Registry ready; 0 of 10 built |
| Breed pages | 🔶 0 of 300 |
| `/methodology/` | ⬜ Not started (Week 4) |
| Brand assets | ✅ `favicon.svg`, `favicon.ico` (4 sizes), `og-default.png` (1200×630) |
| Domain | ⬜ `petcalc.io` — RDAP-verified available, not yet registered |
| Git | ✅ Working — 5 commits, clean tree |

**The publishing gate is enforced in code.** `canPublish()` in `src/data/breeds.ts` rejects any entry that is not human-verified, is missing sources, or has an empty `facts` block — so an unverified breed cannot accidentally reach production.

### Git

The repo has valid history and a clean working tree:

```
f90b9c0  feat: scaffold PetCalc - Astro + Tailwind v4, breed dataset layer, decision log
b73af4a  docs: replace default astro readme with pet calculator hub project details
6a4d139  feat: add layout and index page for housing society interest calculator
079d171  feat: initialize design system documentation for Vercel brand aesthetic
1dc00ea  "Initial commit from Astro"
```

> **Where git lives.** The original install was at `D:\Git\cmd` — but **the D: drive no longer exists on this machine**, so git was unreachable from every terminal. The Antigravity IDE was still working because it falls back to the git bundled with GitHub Desktop:
>
> `C:\Users\Himanshu kumar\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe` (git 2.53.0)
>
> That path has now been **prepended to your user PATH**, so git works from any new terminal. Restart the Antigravity IDE for it to pick up the change. The dead `D:\` entries were left in place — they are harmless no-ops, and they will work again if the drive is restored.
>
> Both projects have a `.gitattributes` forcing LF line endings, so Windows-authored files won't churn when built on Linux (Cloudflare Pages).

---

## 🧹 Workspace hygiene

Cleaned 2026-11-12. What was removed and why:

| Removed | Reason |
|---|---|
| `DESIGN.md` (Vercel spec) | Superseded — the live tokens are the `@theme` block in `src/styles/global.css` |
| `src/assets/astro.svg`, `background.svg` | Astro starter art, unreferenced |
| `.vscode/settings.json` (Python pytest) | Left over from an unrelated Python project — replaced with TS/Astro settings |
| Astro-default `favicon.svg` / `favicon.ico` | Replaced with a brand paw mark (ICO = 4 PNG-compressed sizes) |
| Missing `og-default.png` | Was referenced in `Base.astro` but never existed — a guaranteed 404 on every social share. Now generated. |

Also: `package.json` renamed `new-project` → `petcalc`; `site` URL now read from `astro.config.mjs` via `Astro.site` so canonical URLs can't drift from the config; `.gitignore` extended (env files, deploy caches, TS build info, editor dirs); `robots.txt` added.

The society project at `E:\new project-society` received the same treatment: `DESIGN.md` and starter assets deleted, `robots.txt` and `@astrojs/sitemap` added, `site` wired up, package renamed. It also has its own git repo now (initial commit, clean tree).

### 🔧 Also fixed: a broken Antigravity telemetry hook

Your Gemini agent in Antigravity was blocked by a failing hook:

```
JSON hook "__googlecloudtools_datacloud_telemetry_PreToolUse_0_0" failed:
Cannot find module '...\googlecloudtools.datacloud_telemetry\C:\Users\Himanshu kumar\...'
```

Two bugs in `~/.gemini/config/plugins/googlecloudtools.datacloud_telemetry/hooks.json`:

1. **Absolute path in the command.** The hook runner resolves the command's script path *relative to the plugin directory*, so the absolute `C:\...\telemetry_hook_bundle.js` was being joined onto the plugin dir → `<pluginDir>\C:\Users\...` → module not found. The working `dak-telemetry` hook in `data-agent-kit-plugin` uses a relative path for exactly this reason.
2. **`; exit 0` is not a separator in `cmd.exe`.** It echoes literally. Changed to `|| exit 0`, matching the working hook and valid in both `cmd` and `sh`.

Fixed to:

```json
"command": "node telemetry_hook_bundle.js --agent_name gemini --install_source \"Antigravity IDE\" || exit 0"
```

Verified: returns `{"decision":"allow"}` — the correct non-blocking response. Original saved as `hooks.json.bak` alongside it. **Restart the Antigravity IDE** for the plugin change to load.

---

## 📌 Next action

**PROJECT.md §15 — This Week's Checklist.**

Immediate next steps, in order:

1. **Register `petcalc.io`** (RDAP-verified available — check the `.io` *renewal* price first)
2. **Audit the remaining 5 target keywords** for AI Overviews (checklist step 2)
3. **Verify the 15 seed breed entries** against their cited sources and flip `verified: true`
4. **Build `/tools/puppy-growth-calculator/`** — the flagship tool, and the page most likely to earn an AI Overview citation
