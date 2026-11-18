/** Réglages, historique et succès lus par le jeu, le QG et les archives. */

export const SETTINGS_KEY = 'logi-battle-settings'
export const HISTORY_KEY = 'logi-battle-game-history'
export const PLAYERS_KEY = 'logi-battle-players'

export const ACHIEVEMENTS = [
  { id: 'premiere-manche', name: 'Première manche', description: 'Terminer une partie.', icon: 'flag', when: (history) => history.length >= 1 },
  { id: 'cinq-manches', name: 'Cinq manches', description: 'Terminer cinq parties.', icon: 'military_tech', when: (history) => history.length >= 5 },
  { id: 'premiere-victoire', name: 'Première victoire', description: 'Une équipe l’emporte.', icon: 'emoji_events', when: (history) => history.some((item) => item.winner === 'A' || item.winner === 'B') },
  { id: 'match-nul', name: 'Match nul', description: 'Finir une partie à égalité.', icon: 'balance', when: (history) => history.some((item) => item.winner == null && item.kind !== 'entrainement') },
  { id: 'entrainement', name: 'Entraînement', description: 'Finir une séance solo.', icon: 'fitness_center', when: (history) => history.some((item) => item.kind === 'entrainement') },
  { id: 'sans-faute', name: 'Sans faute', description: 'Réussir les dix questions d’un entraînement.', icon: 'verified', when: (history) => history.some((item) => item.kind === 'entrainement' && item.total >= 10 && item.correct === item.total) },
  { id: 'championnat', name: 'Ceinture', description: 'Terminer un match de championnat.', icon: 'workspace_premium', when: (history) => history.some((item) => item.kind === 'championnat') },
]

export function defaultSettings() {
  return { soundEnabled: true, musicEnabled: false, darkMode: true, timerDuration: 30 }
}

export function readSettings(storage = globalThis.localStorage) {
  const base = defaultSettings()
  try {
    const raw = JSON.parse(storage?.getItem(SETTINGS_KEY) || '{}')
    const timer = Number(raw.timerDuration)
    return {
      ...base,
      ...raw,
      soundEnabled: raw.soundEnabled !== false,
      musicEnabled: Boolean(raw.musicEnabled),
      timerDuration: Number.isFinite(timer) ? Math.min(60, Math.max(15, timer)) : base.timerDuration,
    }
  } catch {
    return base
  }
}

export function readHistory(storage = globalThis.localStorage) {
  try {
    const raw = JSON.parse(storage?.getItem(HISTORY_KEY) || '[]')
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

export function evaluateAchievements(history) {
  return ACHIEVEMENTS.filter((item) => item.when(history || [])).map(({ when, ...badge }) => badge)
}

export const TRAINING_QUESTIONS = 10

/** Nouvelle séance, y compris après « Rejouer ». Les compteurs ne se cumulent pas. */
export function newTrainingCounters() {
  return { answered: 0, saved: false }
}

export function trainingSessionOver(answered) {
  return Number(answered) >= TRAINING_QUESTIONS
}

export function moduleProgress(moduleId, history) {
  const played = (history || []).filter((item) => item.moduleId === moduleId).length
  return Math.min(100, played * 10)
}

export function describeLocalMatch(entry) {
  const left = entry.teamA || 'Équipe A'
  const right = entry.teamB || 'Équipe B'
  const draw = entry.winner == null && entry.kind !== 'entrainement'
  let result = 'Match nul'
  if (entry.kind === 'entrainement') result = `${entry.correct ?? 0}/${entry.total ?? 0} en entraînement`
  else if (entry.winner === 'A') result = `${left} gagne`
  else if (entry.winner === 'B') result = `${right} gagne`
  return {
    id: entry.id,
    date: entry.date,
    className: entry.label || 'Partie',
    left,
    right,
    leftRole: entry.kind === 'entrainement' ? 'Solo' : 'Équipe A',
    rightRole: entry.kind === 'entrainement' ? 'Score' : 'Équipe B',
    result,
    scoreLabel: entry.kind === 'entrainement' ? '' : `${entry.scoreA ?? 0} — ${entry.scoreB ?? 0}`,
    draw,
    duration: entry.duration,
    rounds: entry.rounds,
  }
}

export function rememberMatch(entry, storage = globalThis.localStorage) {
  const history = readHistory(storage)
  const before = new Set(evaluateAchievements(history).map((item) => item.id))
  const next = [{
    id: entry.id || `match_${Date.now()}`,
    date: entry.date || new Date().toISOString(),
    ...entry,
  }, ...history].slice(0, 100)
  storage?.setItem(HISTORY_KEY, JSON.stringify(next))
  const unlocked = evaluateAchievements(next)
  const fresh = unlocked.filter((item) => !before.has(item.id))
  stampPlayers(fresh, storage)
  return { history: next, unlocked, fresh }
}

function stampPlayers(fresh, storage) {
  if (!fresh.length || !storage) return
  try {
    const players = JSON.parse(storage.getItem(PLAYERS_KEY) || '[]')
    if (!Array.isArray(players) || !players.length) return
    const stamped = players.map((player) => {
      const owned = new Set((player.achievements || []).map((item) => item.id))
      const additions = fresh
        .filter((item) => !owned.has(item.id))
        .map((item) => ({ ...item, unlockedAt: Date.now() }))
      if (!additions.length) return player
      return { ...player, achievements: [...(player.achievements || []), ...additions] }
    })
    storage.setItem(PLAYERS_KEY, JSON.stringify(stamped))
  } catch {
    // Le bataillon reste intact si le stockage est illisible.
  }
}
