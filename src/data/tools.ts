/**
 * Tool registry — single source of truth for all calculators on petconditionscore.com.
 *
 * `live: true` tools appear in navigation, homepage, /calculators/, and sitemap.
 */

export type Tier = 1 | 2 | 3;
export type ToolCategory = 'condition' | 'pregnancy' | 'nutrition' | 'growth-age';

export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  category: ToolCategory;
  species: Array<'dog' | 'cat' | 'human'>;
  /** Meta description, 140–160 characters. */
  description: string;
  /** Primary target keyword. */
  keyword: string;
  tier: Tier;
  live: boolean;
  /** Short line shown on cards. */
  blurb: string;
  /** Primary scientific reference. */
  sourceLabel: string;
}

export const TOOLS: Tool[] = [
  {
    slug: 'dog-bcs',
    title: 'Dog Body Condition Score & BMI Calculator',
    shortTitle: 'Dog BCS & BMI',
    category: 'condition',
    species: ['dog'],
    description:
      'Calculate your dog’s Body Condition Score (1–9 WSAVA scale), ideal weight range, body fat estimate, and safe daily calories by breed.',
    keyword: 'dog body condition score calculator',
    tier: 1,
    live: true,
    blurb: 'Guided 1–9 WSAVA condition assessment, ideal weight target, and breed-aware calorie plan.',
    sourceLabel: 'WSAVA & Laflamme (1997)',
  },
  {
    slug: 'cat-bmi',
    title: 'Cat BMI (FBMI) & Condition Score Calculator',
    shortTitle: 'Cat BMI & BCS',
    category: 'condition',
    species: ['cat'],
    description:
      'Compute your cat’s Feline Body Mass Index (FBMI) from 9th-rib and hind-leg measurements with an anatomical diagram and instant weight classification.',
    keyword: 'cat bmi calculator',
    tier: 1,
    live: true,
    blurb: 'Feline Body Mass Index from rib & leg measurements with visual guide and instant status.',
    sourceLabel: 'Hawthorne & Butterwick / WSAVA',
  },
  {
    slug: 'dog-pregnancy',
    title: 'Dog Pregnancy & Whelping Timeline Calculator',
    shortTitle: 'Dog Pregnancy',
    category: 'pregnancy',
    species: ['dog'],
    description:
      'Estimate your dog’s due date (58–68 day window) from mating date—or solve backward from due date—with a full week-by-week whelping timeline.',
    keyword: 'dog pregnancy calculator',
    tier: 1,
    live: true,
    blurb: '63-day due date, 58–68 day safe window, ultrasound & X-ray dates, and nutrition milestones.',
    sourceLabel: 'Canine Gestation Consensus (63d)',
  },
  {
    slug: 'cat-pregnancy',
    title: 'Cat Pregnancy & Queening Timeline Calculator',
    shortTitle: 'Cat Pregnancy',
    category: 'pregnancy',
    species: ['cat'],
    description:
      'Calculate your cat’s expected delivery date (58–71 day range) and week-by-week feline pregnancy milestones from mating date or due date.',
    keyword: 'cat pregnancy calculator',
    tier: 1,
    live: true,
    blurb: '64-day due date, 58–71 day delivery range, pinking-up milestone, and queening checklist.',
    sourceLabel: 'Feline Gestation Consensus (63–65d)',
  },
  {
    slug: 'gestational-week',
    title: 'Gestational Week Calculator (LMP & Due Date)',
    shortTitle: 'Gestational Week',
    category: 'pregnancy',
    species: ['human'],
    description:
      'Free gestational week calculator. Enter your Last Menstrual Period (LMP) or due date to calculate exact gestational age in weeks and days.',
    keyword: 'gestational week calculator',
    tier: 1,
    live: true,
    blurb: 'Calculate exact gestational age in weeks and days by LMP or EDD with trimester milestones.',
    sourceLabel: "Naegele's Rule / ACOG",
  },
  {
    slug: 'pet-calorie-calculator',
    title: 'Dog & Cat Daily Calorie & Food Portion Calculator',
    shortTitle: 'Pet Calorie & Food',
    category: 'nutrition',
    species: ['dog', 'cat'],
    description:
      'Work out daily calories (RER/DER) and exact dry cups, grams, or wet cans for dogs and cats using NRC (2006) formulas adjusted for body condition.',
    keyword: 'dog food calculator',
    tier: 1,
    live: true,
    blurb: 'NRC 2006 calorie targets converted directly to kcal/cup, grams, wet cans, and meal splits.',
    sourceLabel: 'NRC (2006)',
  },
  {
    slug: 'puppy-growth-calculator',
    title: 'Puppy Growth & Adult Weight Predictor',
    shortTitle: 'Puppy Growth',
    category: 'growth-age',
    species: ['dog'],
    description:
      'Predict your puppy’s adult weight and month-by-month growth trajectory using WSAVA size-class curves for toy, small, medium, large, and giant breeds.',
    keyword: 'puppy growth calculator',
    tier: 2,
    live: true,
    blurb: 'Predict adult weight and month-by-month growth from breed size class, age, and weight.',
    sourceLabel: 'WSAVA (Flohr et al., 2018)',
  },
  {
    slug: 'pet-age-converter',
    title: 'Dog & Cat Age Calculator (Human Years Converter)',
    shortTitle: 'Pet Age Converter',
    category: 'growth-age',
    species: ['dog', 'cat'],
    description:
      'Convert dog or cat years to human years—or reverse-convert human years to pet years—adjusted by canine breed size class and feline life stages.',
    keyword: 'dog age calculator',
    tier: 2,
    live: true,
    blurb: 'Two-way dog and cat age converter adjusted for breed size class and life stage.',
    sourceLabel: 'AAHA / AVMA Life-Stage Model',
  },
];

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  condition: 'Body Condition & BMI',
  pregnancy: 'Pregnancy & Gestation',
  nutrition: 'Calories & Feeding',
  'growth-age': 'Growth & Age',
};

export function liveTools(): Tool[] {
  return TOOLS.filter((t) => t.live);
}

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return liveTools().filter((t) => t.category === category);
}
