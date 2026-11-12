/**
 * The dataset — the actual product (DECISIONS.md D2).
 *
 * Every value here must be traceable to a real, published source. AI may help
 * format this file; it may never produce the values (DECISIONS.md §4, §9.2).
 *
 * The `verified` flag is the publishing gate (DECISIONS.md D9). It is set to
 * true only after a human has checked every field of that entry against its
 * cited source. `canPublish()` refuses to publish anything unverified, so an
 * unverified entry can never accidentally reach production.
 */

import { GROWTH_CURVES, SIZE_CLASS_BOUNDS, type SizeClass } from './growthCurves';

export type HealthFlag =
  | 'brachycephalic'
  | 'obesity-prone'
  | 'joint'
  | 'gi-sensitive'
  | 'allergy-prone'
  | 'heat-sensitive'
  | 'low-tolerance'
  | 'working-high-energy';

export interface EnergyFactors {
  /** Multiplier on RER for a growing puppy/kitten. */
  puppy: number;
  /** Multiplier on RER for an intact adult. */
  intactAdult: number;
  /** Multiplier on RER for a neutered adult. */
  neuteredAdult: number;
  /** Multiplier on RER for a senior. */
  senior: number;
  /** Multiplier on RER for a working/sport/herding dog. */
  working: number;
}

export interface BreedFacts {
  /** e.g. "10–12 years" */
  typicalLifespan: string;
  /** e.g. ['BOAS', 'IVDD', 'patellar luxation'] */
  commonConditions: string[];
  /** e.g. "30–60 min/day, low intensity" */
  exerciseNeed: string;
  trainingNote?: string;
  heatTolerance?: string;
}

export interface Breed {
  slug: string;
  name: string;
  species: 'dog' | 'cat';
  sizeClass: SizeClass;

  adultWeightKg: {
    male: { min: number; max: number };
    female: { min: number; max: number };
  };
  adultHeightCm?: {
    male: { min: number; max: number };
    female: { min: number; max: number };
  };

  energy: EnergyFactors;

  calorieDensity: {
    /** Dry kibble, kcal per gram. ≈ 3.4–3.6 */
    dryKcalPerGram: number;
    /** Canned wet food, kcal per 100 g. ≈ 80–110 */
    wetKcalPer100g: number;
    /** Raw food, kcal per 100 g. ≈ 120–180 (fat dependent) */
    rawKcalPer100g: number;
    /** Grams per "cup" of dry food. Cup sizes vary by brand (≈100–125 g). */
    gramsPerCupDry: number;
  };

  /** Expected lifespan range, in years. */
  lifespanYears: { min: number; max: number };

  /** 5/9 body condition score midpoint. */
  bcsIdeal: number;
  healthFlags: HealthFlag[];
  bcsCaution?: string;

  /** Breed-specific, sourced facts. */
  facts: BreedFacts;

  /** Optional prose. A quality upgrade for top breeds, not a publish gate. */
  notes?: string;

  /** e.g. ['AKC breed profile', 'WSAVA (Flohr et al., 2018)', 'Pet Nutrition Alliance'] */
  sources: string[];

  /** ISO date of last review — drives "last reviewed" freshness. */
  updatedAt: string;
}

/** A breed plus its human-verification state. */
export interface BreedEntry extends Breed {
  /**
   * true only after a human has checked every field against the cited source.
   * `canPublish()` blocks anything that is not verified.
   */
  verified: boolean;
}

// ─── Shared defaults ────────────────────────────────────────────────────────
// Energy factors follow NRC (2006). Health flags are per-breed.

const DOG_ENERGY: EnergyFactors = {
  puppy: 3.0,
  intactAdult: 2.5,
  neuteredAdult: 1.6,
  senior: 1.4,
  working: 3.0,
};

const CAT_ENERGY: EnergyFactors = {
  puppy: 2.5,
  intactAdult: 1.4,
  neuteredAdult: 1.2,
  senior: 1.1,
  working: 1.4,
};

const DOG_DENSITY = {
  dryKcalPerGram: 3.5,
  wetKcalPer100g: 90,
  rawKcalPer100g: 150,
  gramsPerCupDry: 112,
};

const CAT_DENSITY = {
  dryKcalPerGram: 3.5,
  wetKcalPer100g: 90,
  rawKcalPer100g: 150,
  gramsPerCupDry: 100,
};

// ─── Seed data ──────────────────────────────────────────────────────────────
// ⚠️ Every entry below is `verified: false` until a human checks it against
// the cited source. Adult weights and lifespans are from AKC breed profiles
// and Pet Nutrition Alliance / Purina breed tables; health flags are from AKC
// breed health pages and the Orthopedic Foundation for Animals (OFA).

export const BREEDS: BreedEntry[] = [
  {
    slug: 'french-bulldog',
    name: 'French Bulldog',
    species: 'dog',
    sizeClass: 'small',
    adultWeightKg: { male: { min: 7.3, max: 8.3 }, female: { min: 6.8, max: 7.7 } },
    adultHeightCm: { male: { min: 30, max: 32 }, female: { min: 28, max: 30 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 10, max: 12 },
    bcsIdeal: 5,
    healthFlags: ['brachycephalic', 'heat-sensitive', 'obesity-prone', 'joint', 'gi-sensitive'],
    bcsCaution: 'Frenchies gain weight easily and are often over-fed. Do not free-feed; measure portions.',
    facts: {
      typicalLifespan: '10–12 years',
      commonConditions: ['Brachycephalic obstructive airway syndrome (BOAS)', 'Intervertebral disc disease (IVDD)', 'Patellar luxation', 'Skin allergies'],
      exerciseNeed: '30–60 min/day, low intensity — avoid heat and long exertion',
      heatTolerance: 'Poor. Monitor closely in warm weather; never exercise in midday heat.',
      trainingNote: 'Known for a stubborn streak. Short, consistent sessions work better than long ones.',
    },
    sources: ['AKC breed profile — French Bulldog', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'labrador-retriever',
    name: 'Labrador Retriever',
    species: 'dog',
    sizeClass: 'large',
    adultWeightKg: { male: { min: 25, max: 36 }, female: { min: 20, max: 32 } },
    adultHeightCm: { male: { min: 57, max: 62 }, female: { min: 54, max: 59 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 11, max: 13 },
    bcsIdeal: 5,
    healthFlags: ['obesity-prone', 'joint', 'allergy-prone'],
    bcsCaution: 'Labs are highly food-motivated and gain weight easily. Treats count toward the daily total.',
    facts: {
      typicalLifespan: '11–13 years',
      commonConditions: ['Hip and elbow dysplasia', 'Osteoarthritis', 'Hypothyroidism', 'Food allergies'],
      exerciseNeed: '60–90 min/day, moderate to high',
      trainingNote: 'Eager to please and highly trainable. Excellent candidates for work and sport.',
    },
    sources: ['AKC breed profile — Labrador Retriever', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'golden-retriever',
    name: 'Golden Retriever',
    species: 'dog',
    sizeClass: 'large',
    adultWeightKg: { male: { min: 29, max: 34 }, female: { min: 27, max: 32 } },
    adultHeightCm: { male: { min: 55, max: 58 }, female: { min: 53, max: 56 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 10, max: 12 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'obesity-prone', 'allergy-prone'],
    facts: {
      typicalLifespan: '10–12 years',
      commonConditions: ['Hip dysplasia', 'Subvalvular aortic stenosis', 'Cancers (especially haemangiosarcoma)', 'Atopic dermatitis'],
      exerciseNeed: '60+ min/day, moderate',
    },
    sources: ['AKC breed profile — Golden Retriever', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'german-shepherd-dog',
    name: 'German Shepherd Dog',
    species: 'dog',
    sizeClass: 'large',
    adultWeightKg: { male: { min: 23, max: 41 }, female: { min: 23, max: 32 } },
    adultHeightCm: { male: { min: 60, max: 65 }, female: { min: 55, max: 60 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 9, max: 13 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'working-high-energy'],
    facts: {
      typicalLifespan: '9–13 years',
      commonConditions: ['Hip dysplasia', 'Degenerative myelopathy', 'Bloat (GDV)', 'Pannatitis'],
      exerciseNeed: '90+ min/day, high — they are working breeds',
      trainingNote: 'Needs a job. Mental work matters as much as physical work.',
    },
    sources: ['AKC breed profile — German Shepherd Dog', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'beagle',
    name: 'Beagle',
    species: 'dog',
    sizeClass: 'small',
    adultWeightKg: { male: { min: 9, max: 13.6 }, female: { min: 9, max: 13.6 } },
    adultHeightCm: { male: { min: 33, max: 38 }, female: { min: 33, max: 38 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 10, max: 15 },
    bcsIdeal: 5,
    healthFlags: ['obesity-prone', 'allergy-prone'],
    facts: {
      typicalLifespan: '10–15 years',
      commonConditions: ['Epilepsy', 'Hypothyroidism', 'Ear infections', 'Chiari-like malformation'],
      exerciseNeed: '45–60 min/day, moderate — plus scent work if they enjoy it',
    },
    sources: ['AKC breed profile — Beagle', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'dachshund',
    name: 'Dachshund',
    species: 'dog',
    sizeClass: 'toy',
    adultWeightKg: { male: { min: 5, max: 14.5 }, female: { min: 5, max: 14.5 } },
    adultHeightCm: { male: { min: 20, max: 27 }, female: { min: 20, max: 27 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 12, max: 16 },
    bcsIdeal: 5,
    healthFlags: ['obesity-prone', 'joint'],
    bcsCaution: 'Standard Dachshunds are highly prone to obesity, which worsens spinal disease. Measure meals exactly.',
    facts: {
      typicalLifespan: '12–16 years',
      commonConditions: ['Intervertebral disc disease (IVDD)', 'Patellar luxation', 'Cushing’s disease', 'Dental disease'],
      exerciseNeed: '30–45 min/day, low to moderate — stairs and jumping are risky',
    },
    sources: ['AKC breed profile — Dachshund', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'chihuahua',
    name: 'Chihuahua',
    species: 'dog',
    sizeClass: 'toy',
    adultWeightKg: { male: { min: 1.8, max: 2.7 }, female: { min: 1.8, max: 2.7 } },
    adultHeightCm: { male: { min: 15, max: 23 }, female: { min: 15, max: 23 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 14, max: 16 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'heat-sensitive'],
    facts: {
      typicalLifespan: '14–16 years',
      commonConditions: ['Patellar luxation', 'Heartworm (susceptible)', 'Dental disease', 'Hypoglycaemia'],
      exerciseNeed: '20–30 min/day, low to moderate — short bursts',
      heatTolerance: 'Poor. Small breeds overheat quickly.',
    },
    sources: ['AKC breed profile — Chihuahua', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'boxer',
    name: 'Boxer',
    species: 'dog',
    sizeClass: 'large',
    adultWeightKg: { male: { min: 23, max: 36 }, female: { min: 23, max: 27 } },
    adultHeightCm: { male: { min: 56, max: 64 }, female: { min: 54, max: 61 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 10, max: 12 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'heat-sensitive', 'working-high-energy'],
    facts: {
      typicalLifespan: '10–12 years',
      commonConditions: ['Heart disease (arrhythmia, cardiomyopathy)', 'Hip dysplasia', 'Bloat (GDV)', 'Hypothyroidism'],
      exerciseNeed: '60–90 min/day, high but with heat breaks',
      heatTolerance: 'Poor. Short muzzles mean poor cooling — never work them hard in heat.',
    },
    sources: ['AKC breed profile — Boxer', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'siberian-husky',
    name: 'Siberian Husky',
    species: 'dog',
    sizeClass: 'medium',
    adultWeightKg: { male: { min: 20, max: 27 }, female: { min: 16, max: 23 } },
    adultHeightCm: { male: { min: 50, max: 56 }, female: { min: 48, max: 53 } },
    energy: { ...DOG_ENERGY, working: 4.0 },
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 12, max: 14 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'working-high-energy', 'allergy-prone'],
    facts: {
      typicalLifespan: '12–14 years',
      commonConditions: ['Hip dysplasia', 'Eye disorders (including glaucoma and corneal dystrophy)', 'Epilepsy', 'Dermatitis'],
      exerciseNeed: '90+ min/day, very high — they were bred to run',
    },
    sources: ['AKC breed profile — Siberian Husky', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'border-collie',
    name: 'Border Collie',
    species: 'dog',
    sizeClass: 'medium',
    adultWeightKg: { male: { min: 14, max: 25 }, female: { min: 14, max: 25 } },
    adultHeightCm: { male: { min: 46, max: 56 }, female: { min: 46, max: 56 } },
    energy: { ...DOG_ENERGY, working: 4.0 },
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 12, max: 15 },
    bcsIdeal: 5,
    healthFlags: ['working-high-energy', 'joint'],
    facts: {
      typicalLifespan: '12–15 years',
      commonConditions: ['Hip dysplasia', 'Progressive retinal atrophy (PRA)', 'Epilepsy', 'Congenital deafness'],
      exerciseNeed: '2+ hours/day, very high — plus agility, flyball or herding',
    },
    sources: ['AKC breed profile — Border Collie', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'rottweiler',
    name: 'Rottweiler',
    species: 'dog',
    sizeClass: 'large',
    adultWeightKg: { male: { min: 36, max: 61 }, female: { min: 36, max: 48 } },
    adultHeightCm: { male: { min: 62, max: 70 }, female: { min: 59, max: 66 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 9, max: 10 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'obesity-prone'],
    facts: {
      typicalLifespan: '9–10 years',
      commonConditions: ['Hip and elbow dysplasia', 'Osteochondrosis', 'Heart disease', 'Bloat (GDV)'],
      exerciseNeed: '60–90 min/day, moderate to high',
    },
    sources: ['AKC breed profile — Rottweiler', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'great-dane',
    name: 'Great Dane',
    species: 'dog',
    sizeClass: 'giant',
    adultWeightKg: { male: { min: 63, max: 79 }, female: { min: 50, max: 63 } },
    adultHeightCm: { male: { min: 76, max: 81 }, female: { min: 71, max: 76 } },
    energy: DOG_ENERGY,
    calorieDensity: DOG_DENSITY,
    lifespanYears: { min: 7, max: 10 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'working-high-energy'],
    facts: {
      typicalLifespan: '7–10 years',
      commonConditions: ['Hip dysplasia', 'Bloat (GDV)', 'Heart disease', 'Wobbler syndrome (cervical spondylomyelopathy)'],
      exerciseNeed: '60–90 min/day, moderate — no long runs while growing',
    },
    sources: ['AKC breed profile — Great Dane', 'WSAVA (Flohr et al., 2018)', 'OFA breed statistics'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'maine-coon',
    name: 'Maine Coon',
    species: 'cat',
    sizeClass: 'large',
    adultWeightKg: { male: { min: 5.4, max: 8.2 }, female: { min: 3.6, max: 5.4 } },
    energy: CAT_ENERGY,
    calorieDensity: CAT_DENSITY,
    lifespanYears: { min: 12, max: 15 },
    bcsIdeal: 5,
    healthFlags: ['joint', 'obesity-prone'],
    facts: {
      typicalLifespan: '12–15 years',
      commonConditions: ['Hip dysplasia', 'Spinal muscular atrophy', 'Hypertrophic cardiomyopathy', 'Feline asthma'],
      exerciseNeed: '30–45 min/day of interactive play',
    },
    sources: ['CFA breed profile — Maine Coon', 'WSAVA feline body condition guidelines'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'siamese',
    name: 'Siamese',
    species: 'cat',
    sizeClass: 'small',
    adultWeightKg: { male: { min: 3.6, max: 5.4 }, female: { min: 3.6, max: 5.4 } },
    energy: CAT_ENERGY,
    calorieDensity: CAT_DENSITY,
    lifespanYears: { min: 12, max: 20 },
    bcsIdeal: 5,
    healthFlags: ['allergy-prone', 'gi-sensitive'],
    facts: {
      typicalLifespan: '12–20 years',
      commonConditions: ['Amyloidosis', 'Progressive retinal atrophy (PRA)', 'Asthma', 'Dental disease'],
      exerciseNeed: '30 min/day of interactive play — vocal and demanding',
    },
    sources: ['CFA breed profile — Siamese', 'WSAVA feline body condition guidelines'],
    updatedAt: '2026-11-12',
    verified: false,
  },
  {
    slug: 'ragdoll',
    name: 'Ragdoll',
    species: 'cat',
    sizeClass: 'large',
    adultWeightKg: { male: { min: 4.5, max: 6.8 }, female: { min: 4.5, max: 6.8 } },
    energy: CAT_ENERGY,
    calorieDensity: CAT_DENSITY,
    lifespanYears: { min: 12, max: 15 },
    bcsIdeal: 5,
    healthFlags: ['joint'],
    facts: {
      typicalLifespan: '12–15 years',
      commonConditions: ['Hypertrophic cardiomyopathy', 'Spinal muscular atrophy', 'Joint laxity'],
      exerciseNeed: '20–30 min/day of gentle interactive play',
    },
    sources: ['CFA breed profile — Ragdoll', 'WSAVA feline body condition guidelines'],
    updatedAt: '2026-11-12',
    verified: false,
  },
];

// ─── Lookup helpers ─────────────────────────────────────────────────────────

const BY_SLUG = new Map(BREEDS.map((b) => [b.slug, b]));

export function getBreed(slug: string): BreedEntry | undefined {
  return BY_SLUG.get(slug);
}

export function getBreeds(): BreedEntry[] {
  return BREEDS;
}

export function getBreedsBySizeClass(sizeClass: SizeClass): BreedEntry[] {
  return BREEDS.filter((b) => b.sizeClass === sizeClass);
}

export function growthCurveFor(breed: Breed): typeof GROWTH_CURVES[SizeClass] {
  return GROWTH_CURVES[breed.sizeClass];
}

export function sizeBoundsFor(sizeClass: SizeClass) {
  return SIZE_CLASS_BOUNDS[sizeClass];
}

// ─── Publishing gate (DECISIONS.md D9) ──────────────────────────────────────

export interface PublishCheck {
  ok: boolean;
  problems: string[];
}

/**
 * A breed may only be published when:
 *  1. it has been human-verified against its sources
 *  2. every required numeric field is populated and sane
 *  3. it has at least one source
 *  4. its `facts` block is populated with breed-specific values
 *
 * Prose is deliberately NOT required — see DECISIONS.md R1.
 */
export function canPublish(breed: BreedEntry): PublishCheck {
  const problems: string[] = [];

  if (!breed.verified) problems.push('Not human-verified against sources yet.');
  if (!breed.sources?.length) problems.push('No sources listed.');
  if (!breed.facts?.typicalLifespan) problems.push('facts.typicalLifespan missing.');
  if (!breed.facts?.exerciseNeed) problems.push('facts.exerciseNeed missing.');
  if (!breed.facts?.commonConditions?.length) problems.push('facts.commonConditions missing.');
  if (!breed.adultWeightKg?.male?.max) problems.push('Adult weight (male) missing.');
  if (!breed.adultWeightKg?.female?.max) problems.push('Adult weight (female) missing.');
  if (!breed.lifespanYears?.min) problems.push('Lifespan range missing.');
  if (breed.adultWeightKg?.male?.max > breed.adultWeightKg?.male?.min * 2)
    problems.push('Male weight range looks implausible (>2× spread).');
  if (!breed.updatedAt) problems.push('updatedAt missing.');

  return { ok: problems.length === 0, problems };
}

/** Breeds that currently pass the publishing gate. */
export function publishableBreeds(): BreedEntry[] {
  return BREEDS.filter((b) => canPublish(b).ok);
}
