/**
 * Calculation engine.
 *
 * Every function here has a published source. The source string is exported
 * alongside the result so the page can render it — the method must be named
 * and cited for the tool to be eligible for an AI Overview citation
 * (DECISIONS.md D10, D11, and PROJECT.md §7.3).
 */

import {
  GROWTH_CURVES,
  growthPercentAtAge,
  SIZE_CLASS_BOUNDS,
  type SizeClass,
} from './growthCurves';
import type { Breed } from './breeds';

// ─── Energy (NRC 2006) ──────────────────────────────────────────────────────

export const ENERGY_SOURCE =
  'Resting Energy Requirement formula from NRC (2006), Nutrient Requirements of Dogs and Cats';

/**
 * Resting Energy Requirement (kcal/day).
 * RER = 70 × (body weight in kg)^0.75
 */
export function rer(weightKg: number): number {
  if (weightKg <= 0) return 0;
  return 70 * Math.pow(weightKg, 0.75);
}

export type LifeStage = 'puppy' | 'adult' | 'senior';
export type ActivityLevel = 'low' | 'moderate' | 'high' | 'working';

export interface EnergyOptions {
  lifeStage: LifeStage;
  neutered: boolean;
  activity: ActivityLevel;
  breed?: Breed;
}

/**
 * Maintenance Energy Requirement (kcal/day) = RER × modifier.
 *
 * Modifiers follow NRC (2006), with breed-specific working multipliers from
 * the breed dataset where available.
 */
export function mer(weightKg: number, opts: EnergyOptions): number {
  const breed = opts.breed;
  const f = breed?.energy ?? {
    puppy: 3.0,
    intactAdult: 2.5,
    neuteredAdult: 1.6,
    senior: 1.4,
    working: 3.0,
  };

  let modifier: number;
  if (opts.lifeStage === 'puppy') {
    modifier = f.puppy;
  } else if (opts.lifeStage === 'senior') {
    modifier = f.senior;
  } else {
    modifier = opts.neutered ? f.neuteredAdult : f.intactAdult;
  }

  // Activity scales the adult requirement. Working dogs use the breed's own
  // working factor, which for many breeds is higher than the generic default.
  if (opts.activity === 'working') {
    modifier = Math.max(modifier, f.working);
  } else if (opts.activity === 'high') {
    modifier *= 1.3;
  } else if (opts.activity === 'low') {
    modifier *= 0.85;
  }

  return rer(weightKg) * modifier;
}

// ─── Portions ───────────────────────────────────────────────────────────────

export interface PortionResult {
  kcalPerDay: number;
  dryGrams: number;
  dryCups: number;
  wetGrams: number;
  wetCans: number;
  rawGrams: number;
  treatsKcalAllowance: number;
}

export interface PortionOptions extends EnergyOptions {
  /** kcal per gram of the dry food being fed. */
  dryKcalPerGram?: number;
  /** Grams per cup of the dry food being fed. */
  gramsPerCupDry?: number;
  /** kcal per 100 g of the wet food being fed. */
  wetKcalPer100g?: number;
  /** kcal per 100 g of the raw food being fed. */
  rawKcalPer100g?: number;
  /** Share of daily kcal allowed for treats, e.g. 0.1 for 10%. */
  treatShare?: number;
  /** Grams per standard 170 g / 5.5 oz wet-food can. */
  gramsPerWetCan?: number;
}

/**
 * Converts a daily energy requirement into food portions.
 * Sources: NRC (2006) energy requirements; kcal densities from manufacturer
 * feed labels (dry ≈ 3.4–3.6 kcal/g, wet ≈ 80–110 kcal/100 g).
 */
export function portions(weightKg: number, opts: PortionOptions): PortionResult {
  const kcalPerDay = mer(weightKg, opts);
  const dryKcalPerGram = opts.dryKcalPerGram ?? opts.breed?.calorieDensity.dryKcalPerGram ?? 3.5;
  const gramsPerCupDry = opts.gramsPerCupDry ?? opts.breed?.calorieDensity.gramsPerCupDry ?? 112;
  const wetKcalPer100g = opts.wetKcalPer100g ?? opts.breed?.calorieDensity.wetKcalPer100g ?? 90;
  const rawKcalPer100g = opts.rawKcalPer100g ?? opts.breed?.calorieDensity.rawKcalPer100g ?? 150;
  const treatShare = opts.treatShare ?? 0.1;
  const gramsPerWetCan = opts.gramsPerWetCan ?? 170;

  const dryGrams = kcalPerDay / dryKcalPerGram;

  return {
    kcalPerDay: Math.round(kcalPerDay),
    dryGrams: Math.round(dryGrams),
    dryCups: Math.round((dryGrams / gramsPerCupDry) * 10) / 10,
    wetGrams: Math.round((kcalPerDay / wetKcalPer100g) * 100),
    wetCans: Math.round((kcalPerDay / (wetKcalPer100g * (gramsPerWetCan / 100))) * 10) / 10,
    rawGrams: Math.round((kcalPerDay / rawKcalPer100g) * 100),
    treatsKcalAllowance: Math.round(kcalPerDay * treatShare),
  };
}

// ─── Growth prediction ──────────────────────────────────────────────────────

export interface AdultWeightPrediction {
  minKg: number;
  maxKg: number;
  minLb: number;
  maxLb: number;
  growthPercent: number;
  monthsToMature: number;
  method: string;
}

export const GROWTH_METHOD =
  'Adult weight estimated from the current weight and the WSAVA size-class growth curve (Flohr et al., 2018)';

/**
 * Predicts adult body weight from a puppy's current weight and age.
 *
 * Adult weight ≈ current weight ÷ (fraction of adult weight expected at this
 * age). The size-class curve supplies that fraction.
 */
export function predictAdultWeight(
  currentKg: number,
  ageMonths: number,
  sizeClass: SizeClass,
): AdultWeightPrediction {
  const pct = growthPercentAtAge(sizeClass, ageMonths);
  const curve = GROWTH_CURVES[sizeClass];
  const matureAt = curve.matureAtMonths;

  // Guard against divide-by-zero at age 0.
  const safePct = Math.max(pct, 1);
  const midKg = currentKg / (safePct / 100);

  // Wider spread for giant and large breeds — growth is less predictable.
  const spread = sizeClass === 'giant' ? 0.16 : sizeClass === 'large' ? 0.12 : 0.1;

  const minKg = Math.round(midKg * (1 - spread) * 10) / 10;
  const maxKg = Math.round(midKg * (1 + spread) * 10) / 10;

  return {
    minKg,
    maxKg,
    minLb: Math.round(minKg * 2.20462),
    maxLb: Math.round(maxKg * 2.20462),
    growthPercent: Math.round(pct),
    monthsToMature: Math.max(0, Math.round((matureAt - ageMonths) * 10) / 10),
    method: GROWTH_METHOD,
  };
}

/**
 * Projected weight at each age from a puppy's current weight.
 * Used for the growth chart tool and the per-breed growth chart pages.
 */
export function projectedWeightTable(
  currentKg: number,
  ageMonths: number,
  sizeClass: SizeClass,
): Array<{ ageMonths: number; projectedKg: number }> {
  const table: Array<{ ageMonths: number; projectedKg: number }> = [];
  for (let m = ageMonths; m <= GROWTH_CURVES[sizeClass].matureAtMonths; m++) {
    const pct = growthPercentAtAge(sizeClass, m);
    const projected = currentKg / (Math.max(pct, 1) / 100);
    table.push({ ageMonths: m, projectedKg: Math.round(projected * 10) / 10 });
  }
  return table;
}

// ─── Age conversion ─────────────────────────────────────────────────────────

export const CAT_AGE_SOURCE =
  'Standard feline conversion rule: first year ≈ 15 human years, second year ≈ 24, then ≈ 4 human years per cat year (AAHA/AAFP feline life-stage model)';

export const DOG_AGE_SOURCE =
  'Size-based canine conversion: first year ≈ 15 human years, second year ≈ 24, then 4 human years per dog year for small breeds, rising to 7 for giant breeds';

/**
 * Cat years → human years.
 * 1st year = 15, 2nd year = 24, then +4 per year.
 */
export function catAgeToHuman(years: number): number {
  if (years <= 0) return 0;
  if (years < 1) return Math.round(years * 15);
  if (years < 2) return Math.round(15 + (years - 1) * 9);
  return Math.round(24 + (years - 2) * 4);
}

/**
 * Human years → cat years (the reverse direction — uncontested, see D7).
 * Inverts `catAgeToHuman`.
 */
export function humanToCatYears(humanYears: number): number {
  if (humanYears <= 0) return 0;
  if (humanYears <= 15) return Math.round((humanYears / 15) * 10) / 10;
  if (humanYears <= 24) return Math.round((1 + (humanYears - 15) / 9) * 10) / 10;
  return Math.round((2 + (humanYears - 24) / 4) * 10) / 10;
}

/** Human years added per dog year after the second, by size class. */
const DOG_YEARS_PER_HUMAN_YEAR: Record<SizeClass, number> = {
  toy: 4,
  small: 4,
  medium: 5,
  large: 6,
  giant: 7,
};

/**
 * Dog years → human years, by size class.
 * 1st year = 15, 2nd year = 24, then +4/+5/+6/+7 per year by size class.
 */
export function dogAgeToHuman(years: number, sizeClass: SizeClass): number {
  if (years <= 0) return 0;
  if (years < 1) return Math.round(years * 15);
  if (years < 2) return Math.round(15 + (years - 1) * 9);
  const per = DOG_YEARS_PER_HUMAN_YEAR[sizeClass];
  return Math.round(24 + (years - 2) * per);
}

/** Human years → dog years (reverse direction). */
export function humanToDogYears(humanYears: number, sizeClass: SizeClass): number {
  if (humanYears <= 0) return 0;
  if (humanYears <= 15) return Math.round((humanYears / 15) * 10) / 10;
  if (humanYears <= 24) return Math.round((1 + (humanYears - 15) / 9) * 10) / 10;
  const per = DOG_YEARS_PER_HUMAN_YEAR[sizeClass];
  return Math.round((2 + (humanYears - 24) / per) * 10) / 10;
}

/** Size class from a body weight in kg. */
export function sizeClassFromWeight(weightKg: number): SizeClass {
  if (weightKg <= SIZE_CLASS_BOUNDS.toy.max) return 'toy';
  if (weightKg <= SIZE_CLASS_BOUNDS.small.max) return 'small';
  if (weightKg <= SIZE_CLASS_BOUNDS.medium.max) return 'medium';
  if (weightKg <= SIZE_CLASS_BOUNDS.large.max) return 'large';
  return 'giant';
}

// ─── Pregnancy ──────────────────────────────────────────────────────────────

export const GESTATION_SOURCE =
  'Canine gestation is approximately 63 days (58–68) from mating; feline gestation is approximately 63–65 days';

export interface PregnancyTimeline {
  dueDate: Date;
  gestationDays: number;
  milestones: Array<{ day: number; date: Date; label: string; note: string }>;
}

export function pregnancyTimeline(
  matingDate: Date,
  species: 'dog' | 'cat' = 'dog',
): PregnancyTimeline {
  const gestationDays = species === 'dog' ? 63 : 64;
  const dueDate = new Date(matingDate);
  dueDate.setDate(dueDate.getDate() + gestationDays);

  const dogMilestones: Array<[number, string, string]> = [
    [21, 'Day 21', 'Embryos implant. Palpation may be possible from here. Vet visit: confirm pregnancy.'],
    [30, 'Day 30', 'Ultrasound can confirm and count embryos. Increase food slightly.'],
    [42, 'Day 42', 'Skeleton is forming. X-rays may show litter size. Switch to a puppy-appropriate food.'],
    [58, 'Day 58', 'Whelping is imminent. Set up the whelping area and review the birth plan.'],
    [63, 'Day 63', 'Expected due date. Gestation ranges 58–68 days — do not panic if it is a few days later.'],
  ];

  const catMilestones: Array<[number, string, string]> = [
    [21, 'Day 21', 'Implantation. Vet visit: confirm pregnancy.'],
    [28, 'Day 28', 'Palpation or ultrasound can confirm. Increase food slightly.'],
    [45, 'Day 45', 'Rapid growth in the final third. Switch to a kitten-appropriate food.'],
    [56, 'Day 56', 'Kittens are fully formed. Prepare the birthing space.'],
    [64, 'Day 64', 'Expected due date. Gestation ranges 63–65 days.'],
  ];

  const milestones = (species === 'dog' ? dogMilestones : catMilestones).map(
    ([day, label, note]) => {
      const date = new Date(matingDate);
      date.setDate(date.getDate() + day);
      return { day, date, label, note };
    },
  );

  return { dueDate, gestationDays, milestones };
}

// ─── Body condition score ───────────────────────────────────────────────────

export const BCS_SOURCE =
  'Body Condition Score is scored 1–9 with 5/9 ideal, per the WSAVA body condition score system';

export interface BcsResult {
  score: number;
  label: string;
  description: string;
  isIdeal: boolean;
  adjustmentNote: string;
}

/**
 * Maps a body condition score (1–9) to its description.
 * 1–3 underweight, 4–5 ideal, 6–9 overweight.
 */
export function describeBcs(score: number): BcsResult {
  const s = Math.min(9, Math.max(1, Math.round(score)));
  const table: Record<number, [string, string]> = {
    1: ['Very thin', 'Ribs, spine and pelvic bones are clearly visible and palpable with no fat covering.'],
    2: ['Thin', 'Ribs are easily visible, waist is easily felt, and there is a pronounced hollow behind the ribs.'],
    3: ['Lean', 'Ribs are easy to feel with a thin fat covering. A slight waist is visible from above.'],
    4: ['Borderline', 'Ribs are easily felt with a slight fat covering. A waist is easily felt from above.'],
    5: ['Ideal', 'Ribs are palpable but not visible, with a clear waist when viewed from above. Ideal weight.'],
    6: ['Slightly overweight', 'Ribs are palpable with a slight excess fat covering. A waist is visible when viewed from above.'],
    7: ['Overweight', 'Ribs are difficult to feel, with noticeable excess fat. No waist when viewed from above.'],
    8: ['Obese', 'Ribs are very difficult to feel. Excess fat is clearly visible and there is no waist.'],
    9: ['Severely obese', 'Ribs cannot be felt under a thick layer of fat. The body appears rounded with no waist.'],
  };
  const [label, description] = table[s];
  return {
    score: s,
    label,
    description,
    isIdeal: s === 5,
    adjustmentNote:
      s < 5
        ? 'This dog is below the ideal body condition score. Feed the calculated amount plus roughly 10% until the score reaches 5/9.'
        : s > 5
          ? 'This dog is above the ideal body condition score. Feed about 10% less than the calculated amount and reassess in 4 weeks.'
          : 'This dog is at the ideal body condition score. Feed the calculated amount.',
  };
}
