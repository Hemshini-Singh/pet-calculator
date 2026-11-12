/**
 * Tool registry — the single source of truth for which calculators exist,
 * what they target, and whether they are live.
 *
 * The home page, the header nav, the footer and the sitemap all read from
 * here. Adding a tool means adding one entry plus one page under
 * `src/pages/tools/`.
 *
 * `live: false` tools are planned but not yet published — they are hidden from
 * the site and from navigation. We never ship a card that links to a 404.
 *
 * Priority order follows PROJECT.md §4: Tier 1 first (tools that require user
 * input and cannot be answered by an AI Overview), age converters last
 * (DECISIONS.md D3, D6).
 */

export type Tier = 1 | 2 | 3;

export interface Tool {
  slug: string;
  title: string;
  /** Meta description, 140–160 characters. */
  description: string;
  /** Primary target keyword. */
  keyword: string;
  tier: Tier;
  live: boolean;
  /** Short line shown on the home page card. */
  blurb: string;
}

export const TOOLS: Tool[] = [
  {
    slug: 'puppy-growth-calculator',
    title: 'Puppy Growth & Adult Weight Calculator',
    description:
      'Predict your puppy’s adult weight and height using WSAVA growth curves by breed size class. Enter breed, age and current weight for a sourced estimate.',
    keyword: 'puppy growth calculator',
    tier: 1,
    live: false,
    blurb: 'Predict adult weight and size from breed, age and current weight.',
  },
  {
    slug: 'puppy-weight-calculator',
    title: 'Puppy Weight & Growth Chart by Breed',
    description:
      'See your puppy’s projected weight at every month of growth. Uses WSAVA size-class growth curves for a breed-accurate month-by-month weight chart.',
    keyword: 'puppy weight calculator',
    tier: 1,
    live: false,
    blurb: 'A month-by-month projected weight chart for your puppy.',
  },
  {
    slug: 'dog-food-calculator',
    title: 'Dog Food & Daily Calorie Calculator',
    description:
      'Work out exactly how much food to feed your dog each day. Uses your dog’s body condition score, neuter status and activity, then converts calories to cups or grams.',
    keyword: 'dog food calculator',
    tier: 1,
    live: false,
    blurb: 'Exact daily portions from body condition score and activity level.',
  },
  {
    slug: 'cat-food-calculator',
    title: 'Cat Food & Daily Calorie Calculator',
    description:
      'Calculate how much food your cat needs each day in calories, grams and cans. Uses body condition score and life stage with feline-specific energy formulas.',
    keyword: 'cat food calculator',
    tier: 2,
    live: false,
    blurb: 'Feline-specific daily portions in kcal, grams and cans.',
  },
  {
    slug: 'dog-pregnancy-calculator',
    title: 'Dog Pregnancy & Whelping Timeline',
    description:
      'Estimate your dog’s due date from the mating date and get a week-by-week pregnancy timeline with whelping signs and vet visit reminders.',
    keyword: 'dog pregnancy calculator',
    tier: 2,
    live: false,
    blurb: 'Due date plus a week-by-week whelping calendar.',
  },
  {
    slug: 'raw-feeding-calculator',
    title: 'Raw Feeding & BARF Ratio Calculator',
    description:
      'Build a raw feeding plan for your dog using 80/10/10 or 70/10/20 ratios. Converts daily calories into organ meat, bone, muscle meat and vegetable amounts.',
    keyword: 'raw feeding calculator',
    tier: 2,
    live: false,
    blurb: 'Raw ratios and daily quantities from your dog’s calorie needs.',
  },
  {
    slug: 'human-years-to-cat-years',
    title: 'Human Years to Cat Years Converter',
    description:
      'Convert human years to cat years using the standard feline aging formula. Works in both directions for any cat age from newborn to 20 years old.',
    keyword: 'how old is 100 years in cat years',
    tier: 3,
    live: false,
    blurb: 'The reverse conversion — human years into cat years.',
  },
  {
    slug: 'human-years-to-dog-years',
    title: 'Human Years to Dog Years Converter',
    description:
      'Convert human years to dog years by breed size class, from small breeds through giant breeds. Uses the size-based canine aging formula with a full reference chart.',
    keyword: 'how old is 30 years in dog years',
    tier: 3,
    live: false,
    blurb: 'The reverse conversion — human years into dog years.',
  },
  {
    slug: 'dog-age-calculator',
    title: 'Dog Age in Human Years',
    description:
      'Convert your dog’s age to human years by breed size class, and see what life stage your dog is in and what care that stage needs.',
    keyword: 'dog age calculator',
    tier: 3,
    live: false,
    blurb: 'Size-based conversion plus life-stage guidance.',
  },
  {
    slug: 'cat-age-calculator',
    title: 'Cat Age in Human Years',
    description:
      'Convert your cat’s age to human years with the standard feline life-stage formula, and see the full cat-to-human years chart from one year to twenty.',
    keyword: 'cat age calculator',
    tier: 3,
    live: false,
    blurb: 'The standard feline conversion plus a full 1–20 chart.',
  },
];

export function liveTools(): Tool[] {
  return TOOLS.filter((t) => t.live);
}

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
