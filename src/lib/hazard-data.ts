/**
 * CBK Official County-Level Hazard Risk Data
 * Source: Central Bank of Kenya Climate Risk Disclosure Framework (CRDF)
 *
 * Each hazard type has 3 values representing risk levels (1-5 scale) across periods:
 *   [0] = 1980-2020 (Historical)
 *   [1] = 2020-2040 (Near-term)
 *   [2] = 2040-2060 (Medium-term)
 *
 * Risk Scale: 1 = Very Low, 2 = Low, 3 = Moderate, 4 = High, 5 = Very High
 */

export interface HazardScores {
  heatStress: [number, number, number]
  heatStressRelative: [number, number, number]
  droughtShort: [number, number, number]
  drought: [number, number, number]
  extremePrecip: [number, number, number]
  floods: [number, number, number]
  wildfires: [number, number, number]
  landslides: [number, number, number]
}

export const HAZARD_LABELS: Record<keyof HazardScores, string> = {
  heatStress: 'Heat Stress',
  heatStressRelative: 'Heat Stress (Relative)',
  droughtShort: 'Drought (Short-term)',
  drought: 'Drought',
  extremePrecip: 'Extreme Precipitation',
  floods: 'Floods',
  wildfires: 'Wildfires',
  landslides: 'Landslides',
}

export const HAZARD_DISPLAY_KEYS: (keyof HazardScores)[] = [
  'heatStress',
  'drought',
  'extremePrecip',
  'floods',
  'wildfires',
  'landslides',
]

export const PERIOD_LABELS = ['1980–2020', '2020–2040', '2040–2060'] as const
export type PeriodIndex = 0 | 1 | 2

export function getRiskLabel(level: number): string {
  switch (level) {
    case 1: return 'Very Low'
    case 2: return 'Low'
    case 3: return 'Moderate'
    case 4: return 'High'
    case 5: return 'Very High'
    default: return '—'
  }
}

export function getRiskColor(level: number): { bg: string; text: string; border: string } {
  if (level <= 2) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
  if (level === 3) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
  return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
}

export const COUNTY_HAZARDS: Record<string, HazardScores> = {
  'Baringo': {
    heatStress: [2, 3, 3], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 4], drought: [3, 2, 4],
    extremePrecip: [1, 1, 1], floods: [1, 2, 1], wildfires: [5, 5, 5], landslides: [2, 2, 3],
  },
  'Bomet': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 2, 4], drought: [2, 2, 3],
    extremePrecip: [1, 2, 2], floods: [3, 4, 4], wildfires: [5, 5, 5], landslides: [4, 4, 5],
  },
  'Bungoma': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'Busia': {
    heatStress: [2, 2, 2], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 1], floods: [2, 3, 2], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Elgeyo-Marakwet': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 2, 3], drought: [2, 2, 3],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [4, 4, 4],
  },
  'Embu': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 4, 5], drought: [3, 3, 4],
    extremePrecip: [5, 5, 5], floods: [4, 5, 5], wildfires: [2, 2, 3], landslides: [1, 1, 1],
  },
  'Garissa': {
    heatStress: [5, 5, 5], heatStressRelative: [2, 3, 4], droughtShort: [2, 4, 5], drought: [2, 4, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [4, 4, 4], landslides: [1, 1, 1],
  },
  'Homa Bay': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 1], floods: [3, 5, 4], wildfires: [2, 2, 2], landslides: [2, 2, 2],
  },
  'Isiolo': {
    heatStress: [5, 5, 5], heatStressRelative: [2, 3, 4], droughtShort: [3, 4, 5], drought: [3, 3, 5],
    extremePrecip: [1, 1, 2], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'Kajiado': {
    heatStress: [1, 2, 2], heatStressRelative: [2, 3, 3], droughtShort: [3, 5, 5], drought: [3, 4, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Kakamega': {
    heatStress: [1, 2, 2], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 1], floods: [1, 2, 1], wildfires: [2, 2, 2], landslides: [1, 1, 1],
  },
  'Kericho': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 4], drought: [2, 1, 3],
    extremePrecip: [1, 2, 3], floods: [3, 3, 3], wildfires: [5, 5, 5], landslides: [5, 5, 5],
  },
  'Kiambu': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 4, 5], drought: [2, 3, 4],
    extremePrecip: [2, 2, 2], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [2, 2, 2],
  },
  'Kilifi': {
    heatStress: [1, 1, 2], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 5], drought: [3, 3, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [2, 2, 2], landslides: [1, 1, 1],
  },
  'Kirinyaga': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 3, 4], drought: [3, 3, 4],
    extremePrecip: [5, 5, 5], floods: [4, 5, 5], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'Kisii': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 2, 4], drought: [2, 1, 3],
    extremePrecip: [2, 2, 3], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [3, 4, 4],
  },
  'Kisumu': {
    heatStress: [1, 2, 2], heatStressRelative: [2, 3, 4], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 2], floods: [5, 5, 5], wildfires: [3, 3, 3], landslides: [1, 1, 2],
  },
  'Kitui': {
    heatStress: [2, 3, 3], heatStressRelative: [2, 3, 3], droughtShort: [3, 4, 5], drought: [3, 4, 4],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Kwale': {
    heatStress: [1, 1, 2], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 5], drought: [2, 3, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Laikipia': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 4], drought: [3, 3, 4],
    extremePrecip: [1, 2, 2], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Lamu': {
    heatStress: [1, 2, 3], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 5], drought: [2, 3, 5],
    extremePrecip: [1, 2, 1], floods: [3, 3, 3], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'Machakos': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 4, 5], drought: [3, 4, 4],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Makueni': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 4, 5], drought: [3, 4, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Mandera': {
    heatStress: [4, 5, 5], heatStressRelative: [2, 3, 4], droughtShort: [2, 4, 5], drought: [2, 3, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'Marsabit': {
    heatStress: [4, 5, 5], heatStressRelative: [2, 3, 4], droughtShort: [2, 4, 5], drought: [2, 3, 5],
    extremePrecip: [1, 1, 1], floods: [2, 2, 2], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'Meru': {
    heatStress: [1, 1, 2], heatStressRelative: [2, 3, 4], droughtShort: [3, 4, 5], drought: [3, 3, 4],
    extremePrecip: [5, 5, 5], floods: [1, 2, 2], wildfires: [3, 3, 3], landslides: [1, 1, 1],
  },
  'Migori': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 2, 4], drought: [2, 2, 4],
    extremePrecip: [1, 1, 2], floods: [3, 3, 3], wildfires: [1, 1, 1], landslides: [1, 1, 2],
  },
  'Mombasa': {
    heatStress: [1, 1, 2], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 5], drought: [2, 3, 5],
    extremePrecip: [1, 1, 1], floods: [4, 4, 4], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  "Murang'a": {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 3, 4], drought: [2, 3, 4],
    extremePrecip: [5, 5, 5], floods: [2, 2, 3], wildfires: [5, 5, 5], landslides: [2, 3, 3],
  },
  'Nairobi': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 4, 5], drought: [3, 3, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [2, 2, 2], landslides: [1, 1, 1],
  },
  'Nakuru': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 3, 4], drought: [2, 2, 4],
    extremePrecip: [1, 1, 1], floods: [2, 2, 2], wildfires: [5, 5, 5], landslides: [3, 3, 4],
  },
  'Nandi': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 2], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [2, 3, 3],
  },
  'Narok': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 5], drought: [2, 3, 4],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [3, 3, 3], landslides: [2, 2, 2],
  },
  'Nyamira': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 4], droughtShort: [3, 2, 4], drought: [2, 1, 3],
    extremePrecip: [1, 2, 2], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [5, 5, 5],
  },
  'Nyandarua': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 3, 4], drought: [2, 2, 4],
    extremePrecip: [1, 2, 2], floods: [3, 4, 4], wildfires: [5, 5, 5], landslides: [4, 4, 4],
  },
  'Nyeri': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 3, 4], drought: [2, 2, 4],
    extremePrecip: [5, 5, 5], floods: [2, 2, 2], wildfires: [5, 5, 5], landslides: [4, 5, 5],
  },
  'Samburu': {
    heatStress: [2, 3, 3], heatStressRelative: [2, 3, 4], droughtShort: [3, 4, 5], drought: [3, 3, 4],
    extremePrecip: [1, 2, 2], floods: [1, 1, 1], wildfires: [2, 2, 2], landslides: [1, 1, 1],
  },
  'Siaya': {
    heatStress: [1, 2, 2], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 1], floods: [3, 4, 4], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Taita Taveta': {
    heatStress: [1, 1, 2], heatStressRelative: [2, 3, 3], droughtShort: [3, 4, 5], drought: [3, 4, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [1, 1, 1],
  },
  'Tana River': {
    heatStress: [4, 5, 5], heatStressRelative: [2, 3, 4], droughtShort: [3, 4, 5], drought: [3, 4, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [2, 2, 2], landslides: [1, 1, 1],
  },
  'Tharaka-Nithi': {
    heatStress: [2, 2, 3], heatStressRelative: [2, 3, 4], droughtShort: [3, 4, 5], drought: [3, 3, 4],
    extremePrecip: [5, 5, 5], floods: [2, 3, 3], wildfires: [2, 2, 3], landslides: [1, 1, 1],
  },
  'Trans Nzoia': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'Turkana': {
    heatStress: [5, 5, 5], heatStressRelative: [2, 3, 4], droughtShort: [3, 3, 4], drought: [2, 2, 4],
    extremePrecip: [1, 1, 1], floods: [1, 2, 2], wildfires: [3, 3, 3], landslides: [1, 1, 1],
  },
  'Uasin Gishu': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 2], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [1, 1, 2],
  },
  'Vihiga': {
    heatStress: [1, 1, 1], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 1, 3],
    extremePrecip: [1, 1, 2], floods: [1, 1, 1], wildfires: [1, 1, 1], landslides: [2, 2, 2],
  },
  'Wajir': {
    heatStress: [5, 5, 5], heatStressRelative: [2, 3, 4], droughtShort: [2, 4, 5], drought: [2, 3, 5],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [5, 5, 5], landslides: [1, 1, 1],
  },
  'West Pokot': {
    heatStress: [2, 2, 3], heatStressRelative: [2, 3, 3], droughtShort: [3, 2, 3], drought: [2, 2, 3],
    extremePrecip: [1, 1, 1], floods: [1, 1, 1], wildfires: [3, 3, 3], landslides: [1, 1, 1],
  },
}
