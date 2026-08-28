/**
 * Clé et format de persistance du championnat.
 * Zustand persist écrit { state, version } sous CHAMPIONSHIP_STORAGE_KEY.
 * Archives / QG lisaient une autre clé et le JSON brut, donc matchs et
 * « tout effacer » ignoraient les vraies données (noms des élèves inclus).
 */

export const CHAMPIONSHIP_STORAGE_KEY = 'championship-storage'
export const LEGACY_CHAMPIONSHIP_STORAGE_KEY = 'logi-battle-championship'

export const parseChampionshipPersisted = (raw) => {
  if (raw == null || raw === '') {
    return { classes: [] }
  }

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { classes: [] }
  }

  const state =
    parsed && typeof parsed === 'object' && parsed.state && typeof parsed.state === 'object'
      ? parsed.state
      : parsed

  const classes = Array.isArray(state?.classes) ? state.classes : []
  return { ...state, classes }
}

export const championshipDateMs = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  const parsed = Date.parse(value ?? '')
  return Number.isNaN(parsed) ? 0 : parsed
}

export const collectChampionshipMatches = (championship) => {
  const matches = []

  for (const cls of championship?.classes || []) {
    for (const match of cls.matches || []) {
      const challenger = cls.groups?.find((g) => g.id === match.challengerId)
      const champion = cls.groups?.find((g) => g.id === match.championId)
      matches.push({
        ...match,
        className: cls.name,
        challengerName: challenger?.name || 'Inconnu',
        championName: champion?.name || 'Inconnu',
      })
    }
  }

  matches.sort((a, b) => championshipDateMs(b.date) - championshipDateMs(a.date))
  return matches
}

export const championshipKeysToClear = () => [
  CHAMPIONSHIP_STORAGE_KEY,
  LEGACY_CHAMPIONSHIP_STORAGE_KEY,
]
