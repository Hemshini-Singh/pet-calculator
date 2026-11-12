/**
 * WSAVA growth curves (Flohr et al., 2018), "Body size, life span, and life stage
 * of dogs and their relationship to chronic disease", Research in Veterinary
 * Science 2018.
 *
 * ⚠️ VERIFY BEFORE PUBLISHING
 * The points below are *approximations* of the published WSAVA curves, transcribed
 * for scaffolding. Each value must be checked against the original publication
 * (or a reputable reproduction such as the Ohio State University puppy growth
 * charts) before any breed page using it goes live. See `BreedEntry.verified`.
 *
 * KEY INSIGHT: growth curves are a property of SIZE CLASS, not of individual
 * breeds. We store 5 curves, not 300. A breed inherits its curve from its
 * size class — which is why the dataset is cheap to extend and hard to copy.
 *
 * Each point is [age in months, % of adult body weight expected].
 */

export type SizeClass = 'toy' | 'small' | 'medium' | 'large' | 'giant';

export interface GrowthCurve {
  /** [age in months, percent of adult weight] */
  points: Array<[number, number]>;
  /** Approximate age at which adult body weight is reached, in months. */
  matureAtMonths: number;
  source: string;
}

// Size-class boundaries in kg. These match the WSAVA size-class definitions
// and the size bands used by major veterinary references (and by Google's own
// AI Overview table, which uses ≤10 / 10–25 / 25–45 / 45+ kg).
export const SIZE_CLASS_BOUNDS: Record<SizeClass, { min: number; max: number }> = {
  toy: { min: 0, max: 4 },
  small: { min: 4, max: 10 },
  medium: { min: 10, max: 25 },
  large: { min: 25, max: 45 },
  giant: { min: 45, max: 200 },
};

export const GROWTH_CURVES: Record<SizeClass, GrowthCurve> = {
  giant: {
    points: [
      [0, 0], [1, 10], [2, 25], [3, 40], [4, 53], [5, 64],
      [6, 72], [7, 78], [9, 90], [12, 98], [15, 100], [18, 100],
    ],
    matureAtMonths: 18,
    source: 'WSAVA (Flohr et al., 2018) — giant breeds',
  },
  large: {
    points: [
      [0, 0], [1, 12], [2, 28], [3, 42], [4, 55], [5, 65],
      [6, 73], [7, 80], [9, 88], [12, 96], [15, 100], [18, 100],
    ],
    matureAtMonths: 15,
    source: 'WSAVA (Flohr et al., 2018) — large breeds',
  },
  medium: {
    points: [
      [0, 0], [1, 15], [2, 35], [3, 50], [4, 62], [5, 72],
      [6, 79], [7, 85], [9, 92], [12, 98], [15, 100],
    ],
    matureAtMonths: 12,
    source: 'WSAVA (Flohr et al., 2018) — medium breeds',
  },
  small: {
    points: [
      [0, 0], [1, 18], [2, 40], [3, 55], [4, 67], [5, 76],
      [6, 83], [7, 89], [9, 94], [12, 99], [15, 100],
    ],
    matureAtMonths: 12,
    source: 'WSAVA (Flohr et al., 2018) — small breeds',
  },
  toy: {
    points: [
      [0, 0], [1, 20], [2, 44], [3, 60], [4, 72], [5, 81],
      [6, 87], [7, 92], [9, 96], [12, 100],
    ],
    matureAtMonths: 10,
    source: 'WSAVA (Flohr et al., 2018) — small breeds (toy extrapolation)',
  },
};

/**
 * Percent of adult weight expected at a given age, linearly interpolated
 * between the published curve points.
 */
export function growthPercentAtAge(sizeClass: SizeClass, ageMonths: number): number {
  const curve = GROWTH_CURVES[sizeClass];
  const pts = curve.points;

  if (ageMonths <= 0) return 0;
  if (ageMonths >= pts[pts.length - 1][0]) return 100;

  for (let i = 0; i < pts.length - 1; i++) {
    const [m0, p0] = pts[i];
    const [m1, p1] = pts[i + 1];
    if (ageMonths >= m0 && ageMonths <= m1) {
      const t = m1 === m0 ? 0 : (ageMonths - m0) / (m1 - m0);
      return p0 + (p1 - p0) * t;
    }
  }
  return 100;
}
