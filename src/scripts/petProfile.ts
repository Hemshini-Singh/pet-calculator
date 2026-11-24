/**
 * Client-side shared utilities for petconditionscore.com:
 * 1. Global Metric / Imperial unit system persisted in localStorage
 * 2. Local Pet Profile storage (no login required) so weight/species/breed
 *    flow seamlessly across BCS, Calorie, Growth, and Pregnancy calculators
 * 3. URL query-parameter serialization for Shareable Links
 */

export type UnitSystem = 'metric' | 'imperial';

export interface SavedPetProfile {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breedSlug?: string;
  weightKg: number;
  neutered: boolean;
  bcs?: number;
  updatedAt: string;
  history: Array<{ date: string; weightKg: number; bcs?: number }>;
}

const UNIT_KEY = 'pcs_unit_system';
const PROFILES_KEY = 'pcs_pet_profiles';
const ACTIVE_PET_KEY = 'pcs_active_pet_id';

export function getUnitSystem(): UnitSystem {
  if (typeof window === 'undefined') return 'metric';
  const saved = window.localStorage.getItem(UNIT_KEY);
  return saved === 'imperial' ? 'imperial' : 'metric';
}

export function setUnitSystem(unit: UnitSystem): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(UNIT_KEY, unit);
  window.dispatchEvent(new CustomEvent('pcs:unit-change', { detail: { unit } }));
}

export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbToKg(lb: number): number {
  return Math.round((lb / 2.20462) * 100) / 100;
}

export function cmToIn(cm: number): number {
  return Math.round((cm / 2.54) * 10) / 10;
}

export function inToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

export function getSavedPets(): SavedPetProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getActivePetId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACTIVE_PET_KEY);
}

export function setActivePetId(id: string | null): void {
  if (typeof window === 'undefined') return;
  if (id) {
    window.localStorage.setItem(ACTIVE_PET_KEY, id);
  } else {
    window.localStorage.removeItem(ACTIVE_PET_KEY);
  }
  window.dispatchEvent(new CustomEvent('pcs:pet-change', { detail: { id } }));
}

export function savePetProfile(input: Omit<SavedPetProfile, 'id' | 'updatedAt' | 'history'> & { id?: string }): SavedPetProfile {
  const pets = getSavedPets();
  const today = new Date().toISOString().slice(0, 10);
  const existingIdx = input.id ? pets.findIndex((p) => p.id === input.id) : -1;

  if (existingIdx >= 0) {
    const prev = pets[existingIdx];
    const history = [...(prev.history || [])];
    const last = history[history.length - 1];
    if (!last || last.date !== today || last.weightKg !== input.weightKg || last.bcs !== input.bcs) {
      history.push({ date: today, weightKg: input.weightKg, bcs: input.bcs });
    }
    const updated: SavedPetProfile = {
      ...prev,
      ...input,
      id: prev.id,
      updatedAt: today,
      history: history.slice(-20),
    };
    pets[existingIdx] = updated;
    window.localStorage.setItem(PROFILES_KEY, JSON.stringify(pets));
    setActivePetId(updated.id);
    return updated;
  }

  const created: SavedPetProfile = {
    id: `pet_${Date.now().toString(36)}`,
    name: input.name.trim() || (input.species === 'dog' ? 'My Dog' : 'My Cat'),
    species: input.species,
    breedSlug: input.breedSlug,
    weightKg: input.weightKg,
    neutered: input.neutered,
    bcs: input.bcs,
    updatedAt: today,
    history: [{ date: today, weightKg: input.weightKg, bcs: input.bcs }],
  };
  pets.push(created);
  window.localStorage.setItem(PROFILES_KEY, JSON.stringify(pets));
  setActivePetId(created.id);
  return created;
}

export function deletePetProfile(id: string): void {
  if (typeof window === 'undefined') return;
  const pets = getSavedPets().filter((p) => p.id !== id);
  window.localStorage.setItem(PROFILES_KEY, JSON.stringify(pets));
  if (getActivePetId() === id) {
    setActivePetId(pets[0]?.id ?? null);
  } else {
    window.dispatchEvent(new CustomEvent('pcs:pet-change', { detail: { id: getActivePetId() } }));
  }
}

export function buildShareUrl(params: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(window.location.href);
  url.search = '';
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') {
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}
