import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Badges débloqués à partir des statistiques cumulées d'un élève
export const BADGES = [
  { id: 'first_steps', label: 'Premiers pas', icon: '🎓', description: '10 questions répondues', test: (s) => s.totalAnswered >= 10 },
  { id: 'on_fire', label: 'En feu', icon: '🔥', description: 'Série de 5 bonnes réponses', test: (s) => s.bestStreak >= 5 },
  { id: 'sharpshooter', label: "Tireur d'élite", icon: '🎯', description: '80 % de précision sur 20+ questions', test: (s) => s.totalAnswered >= 20 && s.totalCorrect / s.totalAnswered >= 0.8 },
  { id: 'perfect', label: 'Sans faute', icon: '💎', description: 'Une session 10/10', test: (s) => s.perfectSessions >= 1 },
  { id: 'marathon', label: 'Marathonien', icon: '🏃', description: '10 sessions d\'entraînement', test: (s) => s.sessions >= 10 },
  { id: 'expert', label: 'Expert logistique', icon: '🏆', description: '100 bonnes réponses', test: (s) => s.totalCorrect >= 100 },
]

const emptyPlayer = () => ({
  totalAnswered: 0,
  totalCorrect: 0,
  bestStreak: 0,
  bestScore: 0,
  sessions: 0,
  perfectSessions: 0,
  modules: {}, // { [moduleId]: { answered, correct } }
  lastPlayed: null,
})

export const useStatsStore = create(
  persist(
    (set, get) => ({
      players: {},

      recordAnswer: (playerName, moduleId, isCorrect) => {
        if (!playerName) return
        set((state) => {
          const player = { ...emptyPlayer(), ...state.players[playerName] }
          const module = player.modules[moduleId] || { answered: 0, correct: 0 }
          return {
            players: {
              ...state.players,
              [playerName]: {
                ...player,
                totalAnswered: player.totalAnswered + 1,
                totalCorrect: player.totalCorrect + (isCorrect ? 1 : 0),
                lastPlayed: Date.now(),
                modules: {
                  ...player.modules,
                  [moduleId]: {
                    answered: module.answered + 1,
                    correct: module.correct + (isCorrect ? 1 : 0),
                  },
                },
              },
            },
          }
        })
      },

      recordSession: (playerName, _moduleId, { score, bestStreak, correct, answered }) => {
        if (!playerName) return
        set((state) => {
          const player = { ...emptyPlayer(), ...state.players[playerName] }
          return {
            players: {
              ...state.players,
              [playerName]: {
                ...player,
                sessions: player.sessions + 1,
                bestScore: Math.max(player.bestScore, score),
                bestStreak: Math.max(player.bestStreak, bestStreak),
                perfectSessions: player.perfectSessions + (answered >= 10 && correct === answered ? 1 : 0),
                lastPlayed: Date.now(),
              },
            },
          }
        })
      },

      getPlayerStats: (playerName) => get().players[playerName] || emptyPlayer(),

      getBadges: (playerName) => {
        const stats = get().players[playerName]
        if (!stats) return []
        return BADGES.filter((b) => b.test(stats))
      },

      resetStats: () => set({ players: {} }),
    }),
    { name: 'geronimo-stats' }
  )
)

// Export CSV des statistiques (pour le carnet de notes de l'enseignant)
export const buildStatsCSV = (players) => {
  const moduleIds = [...new Set(Object.values(players).flatMap((p) => Object.keys(p.modules)))].sort()
  const header = ['Élève', 'Questions', 'Correctes', 'Précision (%)', 'Meilleur score', 'Meilleure série', 'Sessions', ...moduleIds.map((m) => `${m} (%)`)]
  const rows = Object.entries(players).map(([name, p]) => {
    const accuracy = p.totalAnswered ? Math.round((p.totalCorrect / p.totalAnswered) * 100) : 0
    const moduleCols = moduleIds.map((m) => {
      const mod = p.modules[m]
      return mod && mod.answered ? Math.round((mod.correct / mod.answered) * 100) : ''
    })
    return [name, p.totalAnswered, p.totalCorrect, accuracy, p.bestScore, p.bestStreak, p.sessions, ...moduleCols]
  })
  return [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
    .join('\n')
}

export const downloadStatsCSV = (players, filename = 'geronimo-stats.csv') => {
  // BOM pour qu'Excel ouvre le CSV en UTF-8
  const blob = new Blob(['\uFEFF' + buildStatsCSV(players)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
