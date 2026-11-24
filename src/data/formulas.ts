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
        ? 'This pet is below the ideal body condition score. Feed the calculated amount plus roughly 10% until the score reaches 5/9.'
        : s > 5
          ? 'This pet is above the ideal body condition score. Feed about 10% less than the calculated amount and reassess in 4 weeks.'
          : 'This pet is at the ideal body condition score. Feed the calculated amount.',
  };
}

// ─── Dog & Cat Body Condition / BMI Assessment ──────────────────────────────

export const DOG_BCS_METHOD_SOURCE =
  'WSAVA Global Nutrition Guidelines (9-Point Body Condition Score) & Laflamme (1997) ~10% body weight variance per BCS unit';

export interface DogBcsAssessment {
  bcs: number;
  category: 'Underweight' | 'Ideal' | 'Overweight' | 'Obese';
  label: string;
  description: string;
  estimatedBodyFatPct: number;
  idealWeightKg: number;
  weightDeltaKg: number;
  safeWeeklyLossKg: number;
  maintenanceKcal: number;
  targetKcal: number;
  bmi?: number;
  source: string;
}

/**
 * Computes a breed- and WSAVA-BCS-aware condition assessment for dogs.
 * Each BCS point away from 5/9 corresponds to roughly 10% weight variance
 * from ideal (Laflamme, 1997; WSAVA Global Nutrition Committee).
 */
export function assessDogCondition(opts: {
  weightKg: number;
  bcs: number;
  shoulderHeightCm?: number;
  neutered?: boolean;
  activity?: ActivityLevel;
  breed?: Breed;
}): DogBcsAssessment {
  const bcs = Math.min(9, Math.max(1, Math.round(opts.bcs)));
  const info = describeBcs(bcs);
  const weightKg = Math.max(0.5, opts.weightKg);

  // Estimate ideal weight using Laflamme (~10% per BCS unit from 5/9)
  const factor = bcs >= 5 ? 1 + (bcs - 5) * 0.1 : Math.max(0.55, 1 - (5 - bcs) * 0.1);
  const idealWeightKg = Math.round((weightKg / factor) * 10) / 10;
  const weightDeltaKg = Math.round((weightKg - idealWeightKg) * 10) / 10;

  // Approximate body fat % on the 9-point canine BCS scale (Laflamme 1997: BCS 5 ≈ 15-20%, +~5% per unit)
  const estimatedBodyFatPct = Math.min(50, Math.max(5, Math.round(17.5 + (bcs - 5) * 5)));

  const category: DogBcsAssessment['category'] =
    bcs <= 3 ? 'Underweight' : bcs <= 5 ? 'Ideal' : bcs <= 7 ? 'Overweight' : 'Obese';

  // Safe canine weight loss rate: 1–2% of current body weight per week (AAHA Weight Management Guidelines)
  const safeWeeklyLossKg = bcs > 5 ? Math.round(weightKg * 0.015 * 100) / 100 : 0;

  // Calorie target calculated on IDEAL weight for safe weight loss, or current weight if ideal
  const calcWeight = bcs > 5 ? idealWeightKg : weightKg;
  const maintenanceKcal = Math.round(
    mer(weightKg, {
      lifeStage: 'adult',
      neutered: opts.neutered ?? true,
      activity: opts.activity ?? 'moderate',
      breed: opts.breed,
    }),
  );

  let targetKcal = Math.round(
    rer(calcWeight) * (bcs > 5 ? 1.0 : opts.neutered === false ? 1.8 : 1.6),
  );
  if (bcs < 5) {
    targetKcal = Math.round(maintenanceKcal * 1.15);
  } else if (bcs === 5) {
    targetKcal = maintenanceKcal;
  }

  let bmi: number | undefined;
  if (opts.shoulderHeightCm && opts.shoulderHeightCm > 5) {
    const hMeters = opts.shoulderHeightCm / 100;
    bmi = Math.round((weightKg / (hMeters * hMeters)) * 10) / 10;
  }

  return {
    bcs,
    category,
    label: info.label,
    description: info.description,
    estimatedBodyFatPct,
    idealWeightKg,
    weightDeltaKg,
    safeWeeklyLossKg,
    maintenanceKcal,
    targetKcal,
    bmi,
    source: DOG_BCS_METHOD_SOURCE,
  };
}

// ─── Cat FBMI (Feline Body Mass Index) ──────────────────────────────────────

export const CAT_FBMI_SOURCE =
  'Feline Body Mass Index (FBMI) equation from Hawthorne & Butterwick (Waltham Centre for Pet Nutrition) & WSAVA Feline BCS';

export interface CatFbmiResult {
  fbmi: number;
  estimatedBcs: number;
  category: 'Underweight' | 'Normal / Healthy' | 'Overweight' | 'Obese';
  guidance: string;
  targetRibCageCm: number;
  source: string;
}

/**
 * Calculates Feline Body Mass Index (FBMI) from 9th-rib circumference (cm)
 * and lower hind-limb length from patella to calcaneus (cm).
 * Formula: FBMI = (((ribCageCm / 0.7062) - legLengthCm) / 0.9156) - legLengthCm
 */
export function calcCatFbmi(ribCageCm: number, legLengthCm: number): CatFbmiResult {
  const safeRib = Math.max(10, ribCageCm);
  const safeLeg = Math.max(4, legLengthCm);
  const raw = ((safeRib / 0.7062 - safeLeg) / 0.9156) - safeLeg;
  const fbmi = Math.round(raw * 10) / 10;

  let category: CatFbmiResult['category'];
  let estimatedBcs: number;
  let guidance: string;

  if (fbmi < 15) {
    category = 'Underweight';
    estimatedBcs = fbmi < 10 ? 2 : 3;
    guidance =
      'Estimated body fat is below healthy feline reserves. Rule out hyperthyroidism, dental pain, or GI issues with your veterinarian and increase caloric intake gradually.';
  } else if (fbmi < 30) {
    category = 'Normal / Healthy';
    estimatedBcs = fbmi < 20 ? 4 : 5;
    guidance =
      'Healthy feline body fat range (15–29.9%). Maintain current measured feeding portions and regular interactive play.';
  } else if (fbmi < 42) {
    category = 'Overweight';
    estimatedBcs = fbmi < 36 ? 6 : 7;
    guidance =
      'Above ideal feline body fat (30–41.9%). Aim for gradual weight loss of 0.5–1% of body weight per week; avoid crash diets due to hepatic lipidosis risk.';
  } else {
    category = 'Obese';
    estimatedBcs = fbmi < 48 ? 8 : 9;
    guidance =
      'Significantly elevated body fat (≥42%), increasing risk of feline diabetes, arthritis, and urinary issues. Partner with your veterinarian on a safe calorie-restricted plan.';
  }

  // Healthy midpoint FBMI = 22.5 -> solve backwards for ideal rib cage circumference
  const targetRibCageCm = Math.round(((22.5 + safeLeg) * 0.9156 + safeLeg) * 0.7062 * 10) / 10;

  return {
    fbmi,
    estimatedBcs,
    category,
    guidance,
    targetRibCageCm,
    source: CAT_FBMI_SOURCE,
  };
}

// ─── Detailed Animal Pregnancy & Gestation ──────────────────────────────────

export interface DetailedPregnancyResult {
  species: 'dog' | 'cat';
  matingDate: Date;
  dueDate: Date;
  earliestDate: Date;
  latestDate: Date;
  gestationDays: number;
  minDays: number;
  maxDays: number;
  daysElapsed: number;
  daysRemaining: number;
  currentWeek: number;
  trimester: 1 | 2 | 3;
  progressPct: number;
  milestones: Array<{
    week: string;
    day: number;
    date: Date;
    title: string;
    detail: string;
    status: 'passed' | 'current' | 'upcoming';
  }>;
  source: string;
}

export function calcDetailedPregnancy(
  inputDate: Date,
  mode: 'mating' | 'due',
  species: 'dog' | 'cat',
  today: Date = new Date(),
): DetailedPregnancyResult {
  const gestationDays = species === 'dog' ? 63 : 64;
  const minDays = 58;
  const maxDays = species === 'dog' ? 68 : 71;

  const base = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const matingDate = new Date(base);
  const dueDate = new Date(base);

  if (mode === 'mating') {
    dueDate.setDate(matingDate.getDate() + gestationDays);
  } else {
    matingDate.setDate(dueDate.getDate() - gestationDays);
  }

  const earliestDate = new Date(matingDate);
  earliestDate.setDate(matingDate.getDate() + minDays);

  const latestDate = new Date(matingDate);
  latestDate.setDate(matingDate.getDate() + maxDays);

  const cleanToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const msPerDay = 86_400_000;
  const rawElapsed = Math.round((cleanToday.getTime() - matingDate.getTime()) / msPerDay);
  const daysElapsed = Math.max(0, Math.min(maxDays, rawElapsed));
  const daysRemaining = Math.max(0, Math.round((dueDate.getTime() - cleanToday.getTime()) / msPerDay));
  const currentWeek = Math.min(10, Math.max(1, Math.floor(daysElapsed / 7) + 1));
  const trimester: 1 | 2 | 3 = daysElapsed <= 21 ? 1 : daysElapsed <= 42 ? 2 : 3;
  const progressPct = Math.min(100, Math.max(0, Math.round((daysElapsed / gestationDays) * 100)));

  const rawMilestones: Array<[string, number, string, string]> =
    species === 'dog'
      ? [
          ['Week 1–2', 7, 'Fertilization & cell division', 'Normal activity and regular adult maintenance diet; avoid unnecessary medications.'],
          ['Week 3', 21, 'Embryo implantation', 'Mild morning sickness or reduced appetite can occur. Gentle abdominal palpation window begins (~day 21–28).'],
          ['Week 4–5', 30, 'Ultrasound confirmation', 'Veterinary ultrasound confirms pregnancy and detects fetal heartbeats. Switch gradually to growth/puppy food if carrying a large litter.'],
          ['Week 6', 42, 'Rapid fetal growth & ossification', 'Increase daily calories by 20–25% split into smaller frequent meals. X-rays from day 45+ reliably count skeletons.'],
          ['Week 7–8', 52, 'Whelping box preparation', 'Mammary development increases; increase calories up to 35–50% above maintenance. Set up a quiet, draft-free whelping box.'],
          ['Week 9', 58, 'Safe delivery window opens', 'Rectal temperature drops below 37.2°C (99°F) 12–24 hours before active labor. Safe delivery window spans days 58–68.'],
          ['Due Date', 63, 'Expected whelping day (Day 63)', 'Average canine gestation from ovulation/LH surge is 63 days (±5 days). Contact your vet if no labor occurs by day 68 or contractions last >30 min without a pup.'],
        ]
      : [
          ['Week 1–2', 10, 'Fertilization & uterine migration', 'Keep routine calm and maintain normal balanced adult feline nutrition.'],
          ['Week 3', 18, '"Pinking up" & implantation', 'Nipples turn noticeably pink and slightly enlarged around days 15–18. Implantation completes near day 21.'],
          ['Week 4', 28, 'Ultrasound & palpation window', 'Veterinary ultrasound confirms kittens and heartbeats. Begin gradual transition toward energy-dense kitten food.'],
          ['Week 6', 42, 'Rapid third-trimester growth', 'Increase daily intake by 25–50% via multiple small meals as abdominal space tightens. X-rays after day 45 show kitten count.'],
          ['Week 8', 54, 'Nesting & queening box setup', 'Queen seeks quiet, dark nesting spots. Provide a lined, accessible queening box away from household traffic.'],
          ['Week 8–9', 58, 'Early viable window (Day 58)', 'Safe feline delivery ranges 58–71 days (mean 63–65). Watch for reduced appetite and nesting behavior 24 hours prior.'],
          ['Due Date', 64, 'Expected queening day (Day 64)', 'Most kittens arrive between days 63 and 65. Seek veterinary care if active straining produces no kitten within 30–45 minutes or gestation passes day 71.'],
        ];

  const milestones = rawMilestones.map(([week, day, title, detail]) => {
    const date = new Date(matingDate);
    date.setDate(matingDate.getDate() + day);
    const status: 'passed' | 'current' | 'upcoming' =
      rawElapsed >= day + 4 ? 'passed' : rawElapsed >= day - 3 ? 'current' : 'upcoming';
    return { week, day, date, title, detail, status };
  });

  return {
    species,
    matingDate,
    dueDate,
    earliestDate,
    latestDate,
    gestationDays,
    minDays,
    maxDays,
    daysElapsed,
    daysRemaining,
    currentWeek,
    trimester,
    progressPct,
    milestones,
    source: GESTATION_SOURCE,
  };
}

// ─── Human Gestational Week Calculator (Naegele's Rule) ─────────────────────

export const HUMAN_GESTATION_SOURCE =
  "Naegele's Rule (280 days / 40 weeks from Last Menstrual Period) & ACOG Committee Opinion No. 700";

export interface GestationalWeekResult {
  lmpDate: Date;
  eddDate: Date;
  conceptionDate: Date;
  gestationalDays: number;
  weeks: number;
  daysRemainder: number;
  trimester: 1 | 2 | 3;
  daysRemaining: number;
  progressPct: number;
  fetalSizeComparison: string;
  source: string;
}

const FETAL_SIZE_BY_WEEK: Record<number, string> = {
  4: 'Poppy seed (~2 mm)',
  5: 'Sesame seed (~3 mm)',
  6: 'Lentil (~6 mm)',
  7: 'Blueberry (~1.3 cm)',
  8: 'Raspberry (~1.6 cm)',
  9: 'Cherry (~2.3 cm)',
  10: 'Strawberry (~3.1 cm)',
  11: 'Lime (~4.1 cm)',
  12: 'Plum (~5.4 cm)',
  13: 'Lemon (~7.4 cm)',
  14: 'Nectarine (~8.7 cm)',
  15: 'Apple (~10 cm)',
  16: 'Avocado (~11.6 cm)',
  17: 'Pear (~13 cm)',
  18: 'Bell pepper (~14.2 cm)',
  19: 'Mango (~15.3 cm)',
  20: 'Banana (~25.6 cm head-to-heel)',
  22: 'Papaya (~27.8 cm)',
  24: 'Ear of corn (~30 cm)',
  26: 'Scallion / lettuce (~35.6 cm)',
  28: 'Eggplant (~37.6 cm)',
  30: 'Cabbage (~39.9 cm)',
  32: 'Squash (~42.4 cm)',
  34: 'Cantaloupe (~45 cm)',
  36: 'Romaine lettuce (~47.4 cm)',
  38: 'Winter melon (~49.8 cm)',
  40: 'Small pumpkin (~51.2 cm)',
};

export function calcGestationalWeek(
  inputDate: Date,
  mode: 'lmp' | 'edd',
  cycleLengthDays: number = 28,
  today: Date = new Date(),
): GestationalWeekResult {
  const cycleAdjust = Math.max(-7, Math.min(14, Math.round(cycleLengthDays - 28)));
  const totalDays = 280 + cycleAdjust;

  const base = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const lmpDate = new Date(base);
  const eddDate = new Date(base);

  if (mode === 'lmp') {
    eddDate.setDate(lmpDate.getDate() + totalDays);
  } else {
    lmpDate.setDate(eddDate.getDate() - totalDays);
  }

  const conceptionDate = new Date(lmpDate);
  conceptionDate.setDate(lmpDate.getDate() + 14 + cycleAdjust);

  const cleanToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const msPerDay = 86_400_000;
  const rawDays = Math.round((cleanToday.getTime() - lmpDate.getTime()) / msPerDay);
  const gestationalDays = Math.max(0, Math.min(294, rawDays));
  const weeks = Math.floor(gestationalDays / 7);
  const daysRemainder = gestationalDays % 7;
  const trimester: 1 | 2 | 3 = weeks < 14 ? 1 : weeks < 28 ? 2 : 3;
  const daysRemaining = Math.max(0, Math.round((eddDate.getTime() - cleanToday.getTime()) / msPerDay));
  const progressPct = Math.min(100, Math.max(0, Math.round((gestationalDays / 280) * 100)));

  const milestoneWeeks = Object.keys(FETAL_SIZE_BY_WEEK)
    .map(Number)
    .sort((a, b) => a - b);
  let matchedWeek = 4;
  for (const w of milestoneWeeks) {
    if (weeks >= w) matchedWeek = w;
  }

  return {
    lmpDate,
    eddDate,
    conceptionDate,
    gestationalDays,
    weeks,
    daysRemainder,
    trimester,
    daysRemaining,
    progressPct,
    fetalSizeComparison:
      weeks < 4 ? 'Pre-implantation / early conception window' : FETAL_SIZE_BY_WEEK[matchedWeek],
    source: HUMAN_GESTATION_SOURCE,
  };
}
