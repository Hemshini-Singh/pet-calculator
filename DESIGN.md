<!-- MIT licensed. Copyright and license: https://opendesignmd.com/licenses/ -->

# Design System: Anthropic Editorial Reference

Adapted from Anthropic's design character (`anthropic.com`) via OpenDesignMD for the **Breed-Aware Pet Nutrition & Growth Calculator & Database**.

---

## 1. Design Character

The site is **calm, editorial, scholarly, and unhurried**. A warm, paper-like field gives dense dark typography, disciplined 1px hairline rules, clear scientific charts, and structured calculation tables room to breathe.

The essential tension:
- **Crisp sans-serif interface & data layer (`Inter`):** Delivers functional precision, clarity for numeric inputs, unit toggles, and data tables.
- **Warm serif editorial display layer (`Fraunces`):** Lends long-form nutrition guides, breed histories, and vet-reviewed methodologies a literary, authoritative cadence.

> **Guiding Principle:** Look like a clinical reference source or a scientific monograph (WSAVA, NRC 2006), not a gimmicky calculator or affiliate farm. Avoid saturated candy gradients, floating 3D toy mascots, and heavy SaaS dropshadows.

---

## 2. Colors

A low-chroma, paper-and-ink palette built on warm neutrals with restrained forest and terracotta accents for scientific precision.

```yaml
colors:
  # Canvas & Surfaces (Warm Paper)
  canvas: "#FAF9F5"             # Main page background (warm unbleached paper)
  surface: "#FFFFFF"            # Card / input floor
  surface-subtle: "#F4F3EE"     # Tinted data sections, formula blocks, table headers
  surface-hover: "#EFECE4"      # Hover state for subtle surfaces
  surface-dark: "#18181B"       # High-contrast featured panels & footer

  # Typography (Ink)
  ink: "#18181B"                # Primary headings, key metrics, dominant text
  body: "#3F3F46"               # Long-form article text, calculator instructions
  muted: "#71717A"              # Secondary labels, table captions, footnote text
  faint: "#A1A1AA"              # Breadcrumb chevrons, disabled indicators

  # Hairlines & Borders
  hairline: "#E4E2DC"           # 1px structural rules, card outlines, table borders
  hairline-strong: "#D4D1C7"    # Emphasized separators, active tab outlines

  # Accents (Restrained & Purposeful)
  accent-forest: "#1B4332"      # Primary CTA background, verified badge, trustworthy signal
  accent-forest-hover: "#143326"
  accent-terracotta: "#C25E3D"  # Alert / attention indicator, secondary highlights
  accent-warm-gold: "#B4833E"   # Scientific award, benchmark highlight

  # Functional States
  success: "#2D6A4F"
  warning: "#D97706"
  error: "#DC2626"
```

---

## 3. Typography

Leverages `@fontsource-variable/fraunces` and `@fontsource-variable/inter` already configured in the project.

### Font Roles
- **Editorial / Headlines:** `Fraunces Variable, Georgia, serif` (optical sizing auto, weight 400–600, negative letter-spacing on larger sizes).
- **Interface / Body / Inputs:** `Inter Variable, -apple-system, BlinkMacSystemFont, sans-serif` (weight 400 for text, 500 for labels, 600 for buttons).
- **Tabular / Calculations / Metrics:** `ui-monospace, SFMono-Regular, Menlo, monospace` (with `font-variant-numeric: tabular-nums` enabled).

### Scale & Hierarchy

| Token / Role | Family | Size | Weight | Line Height | Tracking | Observed Use |
|---|---|---|---|---|---|---|
| `display-hero` | Fraunces | 56–64px | 500 | 1.1 | -0.02em | Home hero headline |
| `display-section` | Fraunces | 36–40px | 500 | 1.15 | -0.015em | Major page & tool headings (`h1` / `h2`) |
| `display-subhead` | Fraunces | 24–28px | 400 | 1.25 | -0.01em | Tool section headers, breed names |
| `title-ui` | Inter | 18–20px | 600 | 1.3 | 0 | Calculator panel title, card titles |
| `body-reading` | Fraunces / Inter | 17px | 400 | 1.65 | 0 | Editorial prose, methodology explanations |
| `body-default` | Inter | 15–16px | 400 | 1.55 | 0 | General interface copy, instructions |
| `ui-label` | Inter | 13–14px | 500 | 1.4 | 0 | Input labels, toggle switches, table headers |
| `caption-code` | Mono | 12–13px | 400 | 1.4 | 0.02em | Formula citations, WSAVA equations, units |
| `kpi-metric` | Mono / Inter | 32–40px | 600 | 1.0 | -0.02em | Calculated result (e.g. `34.2 kg`, `840 kcal`) |

---

## 4. Spacing, Rhythm & Layout

Anthropic layout favors broad outer breathing room with controlled, comfortable reading measures inside.

- **Grid Width:**
  - Content container (default): `1200px` max.
  - Article / Reading measure: `680px` max (ensures 65–75 characters per line).
  - Tool / Calculator workspace: `960px` centered or 2-column split (inputs left, live result right).
- **Spacing Units:**
  - Compact elements (tags, badges): `4px`, `8px`
  - Input & card interiors: `16px`, `24px`
  - Section vertical rhythm: `64px`, `96px`
- **Separators:**
  - Single-pixel horizontal rules (`border-b border-[var(--hairline)]`) delineate transitions rather than bulky background shifts.

---

## 5. Components & Form Elements

### 5.1 Calculator Controls
- **Inputs:** Clean, flat white floors with a subtle `1px solid var(--hairline)`. Focus ring uses dark ink or deep forest (`#1B4332`), never neon blue. Height: `44px` for touch target compliance.
- **Unit Toggles (kg / lbs, g / cups):** Segmented pill or understated tab group with warm surface background (`#F4F3EE`), active segment set in crisp white surface with hairline border.
- **Sliders & Selectors:** Discrete, tactile notches with accompanying numeric readout.

### 5.2 Result Display Card (The Output Anchor)
- High contrast, clinical presentation.
- Can use a high-contrast dark panel (`#18181B` surface with white text) or a dignified paper container bordered by `hairline-strong`.
- Prominently showcases the primary metric (e.g., adult weight target or daily food intake) followed by the methodology citation:
  > *"Calculated using WSAVA Flohr et al. (2018) size-class logarithmic curve."*

### 5.3 Buttons & Actions
- **Primary Action (`button-primary`):** Solid `#18181B` (or `#1B4332`), text `#FFFFFF`, rounded `6px`–`8px`, font Inter 14px weight 600.
- **Secondary Action (`button-secondary`):** White/Canvas background, `#18181B` text, 1px `#E4E2DC` border.
- **Inline Links:** Underlined ink with low-opacity underline (`text-decoration-color: #D4D1C7`), transitioning to dark on hover.

### 5.4 Elevation & Depth
- **Zero heavy drop shadows:** No blurred modern float shadows.
- Depth is expressed via:
  1. Flat surface boundaries separated by `1px hairline`.
  2. Tone shifts: Paper canvas (`#FAF9F5`) vs pure card floor (`#FFFFFF`) vs tinted reference box (`#F4F3EE`).

---

## 6. Do's and Don'ts

### Do:
- ✅ Maintain the paper-like warmth (`#FAF9F5`).
- ✅ Cite the authoritative scientific source (WSAVA, NRC, Fediaz) on every calculation result card.
- ✅ Use `Fraunces` for titles to convey peer-reviewed authority, and `Inter` for data density and interactive inputs.
- ✅ Keep line weights disciplined (1px clean rules).
- ✅ Give calculation outputs immediate, clear visibility with tabular figures.

### Don't:
- ❌ Do NOT use 3D claymation illustrations, floating mascots, or cartoon animals.
- ❌ Do NOT use candy-colored cards (hot pink, saturated lavender, bright ochre).
- ❌ Do NOT use pure stark `#000000` text on blinding `#FFFFFF` backgrounds (use warm ink `#18181B` on `#FAF9F5`).
- ❌ Do NOT clutter with flashy AI badge icons or neon gradients.
- ❌ Do NOT use heavy pill-shaped buttons everywhere (stick to clean `6px` to `8px` rounded rectangles).
