import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { readChampionshipState } from '../utils/roundRules'
import { describeMatch, sortMatches } from '../utils/matchJournal'
import { rankGroups } from '../utils/classement'

const STORAGE_KEYS = {
  championship: 'logi-battle-championship',
  players: 'logi-battle-players',
  history: 'logi-battle-game-history',
}

export const Archives = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('matches')
  const [matches, setMatches] = useState([])
  const [achievements, setAchievements] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [classPulse, setClassPulse] = useState({ wins: 0, draws: 0, groups: 0, classes: 0 })
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // Load championship data
    const championship = readChampionshipState()
    const players = JSON.parse(localStorage.getItem(STORAGE_KEYS.players) || '[]')
    
    // Extract all matches
    const classes = championship.classes || []
    const allMatches = []
    let wins = 0
    let draws = 0
    let groups = 0

    classes.forEach((cls) => {
      groups += cls.groups?.length || 0
      cls.groups?.forEach((group) => {
        wins += group.stats?.wins || 0
        draws += group.stats?.draws || 0
      })
      cls.matches?.forEach((match) => {
        allMatches.push(describeMatch(match, cls.groups || [], cls.name))
      })
    })

    setMatches(sortMatches(allMatches))
    setClassPulse({
      wins,
      draws,
      groups,
      classes: classes.length,
    })
    setLeaderboard(classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      groups: rankGroups(cls.groups || []),
    })).filter((board) => board.groups.length > 0))

    // Collect achievements
    const allAchievements = []
    players.forEach(player => {
      player.achievements?.forEach(achievement => {
        allAchievements.push({
          ...achievement,
          playerName: player.name,
          playerAvatar: player.avatar,
          unlockedAt: achievement.unlockedAt || Date.now(),
        })
      })
    })
    allAchievements.sort((a, b) => b.unlockedAt - a.unlockedAt)
    setAchievements(allAchievements)
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-[#17314a]">
      {/* Header */}
      <header className="bg-[#0f2539] border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-[#1d3d59] hover:bg-[#234a68] flex items-center justify-center transition-colors"
            >
              <span className="material-icons text-gray-400">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Archives</h1>
              <p className="text-xs text-gray-500">Historique et classements</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#1d3d59] p-1 rounded-xl">
          {[
            { id: 'matches', label: 'Matchs', icon: 'sports_kabaddi' },
            { id: 'leaderboard', label: 'Classement', icon: 'emoji_events' },
            { id: 'achievements', label: 'Succès', icon: 'military_tech' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#f4b942] text-[#17314a]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="material-icons text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {matches.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-[#1d3d59] flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-4xl text-gray-600">history</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Aucun match enregistré</h2>
                <p className="text-gray-500">Les matchs de championnat apparaîtront ici</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">{matches.length} match{matches.length > 1 ? 's' : ''} enregistré{matches.length > 1 ? 's' : ''}</p>
                </div>

                <div className="grid gap-3">
                  {matches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedMatch(match)}
                      className="bg-[#1d3d59] rounded-2xl p-5 border border-white/5 hover:border-[#f4b942]/30 cursor-pointer transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Teams */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#7fa99b]/20 flex items-center justify-center">
                              <span className="material-icons text-[#7fa99b]">groups</span>
                            </div>
                            <div>
                              <p className="text-white font-bold">{match.left}</p>
                              <p className="text-xs text-gray-500">{match.leftRole} · {match.className}</p>
                            </div>
                          </div>

                          <div className="px-4 py-2 bg-[#0f2539] rounded-lg">
                            <span className="text-2xl font-black text-gray-400">VS</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#f4b942]/20 flex items-center justify-center">
                              <span className="text-2xl">👑</span>
                            </div>
                            <div>
                              <p className="text-white font-bold">{match.right}</p>
                              <p className="text-xs text-gray-500">{match.rightRole}</p>
                            </div>
                          </div>
                        </div>

                        {/* Result */}
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-bold ${match.draw ? 'text-gray-300' : 'text-[#7fa99b]'}`}>
                            {match.result}
                          </span>
                          {match.scoreLabel && (
                            <span className="text-sm text-gray-400">
                              {match.scoreLabel}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDate(match.date)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {leaderboard.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-[#1d3d59] flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-4xl text-gray-600">emoji_events</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Aucun groupe classé</h2>
                <p className="text-gray-500">Inscrivez des groupes dans une classe pour voir leur classement</p>
              </div>
            ) : (
              leaderboard.map((board) => (
                <div key={board.id} className="bg-[#1d3d59] rounded-3xl border border-white/5 overflow-hidden">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="font-bold text-white">{board.name}</h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {board.groups.map((group) => (
                      <div key={group.id} className="flex items-center gap-4 p-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                          group.rank === 1 ? 'bg-[#f4b942]/20 text-[#f4b942]' : 'bg-[#0f2539] text-gray-400'
                        }`}>
                          {group.rank}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold">{group.name}</p>
                          <p className="text-xs text-gray-500">
                            {group.stats?.wins || 0}V · {group.stats?.draws || 0}N · {group.stats?.losses || 0}D
                          </p>
                        </div>
                        <p className="text-lg font-black text-[#f4b942]">{group.stats?.points || 0} pts</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Achievement Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: 'emoji_events', label: 'Victoires', count: classPulse.wins, color: '#f4b942' },
                { icon: 'handshake', label: 'Nuls', count: classPulse.draws, color: '#ef4444' },
                { icon: 'groups', label: 'Groupes', count: classPulse.groups, color: '#7fa99b' },
                { icon: 'school', label: 'Classes', count: classPulse.classes, color: '#22c55e' },
              ].map((cat) => (
                <div key={cat.label} className="bg-[#1d3d59] rounded-2xl p-4 border border-white/5 text-center">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <span className="material-icons" style={{ color: cat.color }}>{cat.icon}</span>
                  </div>
                  <p className="text-2xl font-black text-white">{cat.count}</p>
                  <p className="text-xs text-gray-500">{cat.label}</p>
                </div>
              ))}
            </div>

            {achievements.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-[#1d3d59] flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-4xl text-gray-600">military_tech</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Aucun succès débloqué</h2>
                <p className="text-gray-500">Jouez et gagnez pour débloquer des succès</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#1d3d59] rounded-2xl p-5 border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#f4b942]/20 flex items-center justify-center">
                        <span className="material-icons text-3xl text-[#f4b942]">
                          {achievement.icon || 'emoji_events'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{achievement.name}</h3>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{ backgroundColor: `${achievement.playerAvatar?.color || '#f4b942'}20` }}
                          >
                            <span 
                              className="material-icons text-xs"
                              style={{ color: achievement.playerAvatar?.color || '#f4b942' }}
                            >
                              {achievement.playerAvatar?.icon || 'person'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">{achievement.playerName}</span>
                          <span className="text-xs text-gray-600">
                            {new Date(achievement.unlockedAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Match Detail Modal */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedMatch(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1d3d59] rounded-3xl p-8 max-w-lg w-full border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Détails du Match</h2>
                <p className="text-gray-400">{selectedMatch.className}</p>
                <p className="text-sm text-gray-500">{formatDate(selectedMatch.date)}</p>
              </div>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#7fa99b]/20 flex items-center justify-center mb-2">
                    <span className="material-icons text-3xl text-[#7fa99b]">groups</span>
                  </div>
                  <p className="text-white font-bold">{selectedMatch.left}</p>
                  <p className="text-xs text-gray-500">{selectedMatch.leftRole}</p>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-black text-gray-400">VS</p>
                  {selectedMatch.scoreLabel && (
                    <p className="text-2xl font-bold text-[#f4b942]">
                      {selectedMatch.scoreLabel}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#f4b942]/20 flex items-center justify-center mb-2">
                    <span className="text-3xl">👑</span>
                  </div>
                  <p className="text-white font-bold">{selectedMatch.right}</p>
                  <p className="text-xs text-gray-500">{selectedMatch.rightRole}</p>
                </div>
              </div>

              <div className={`text-center p-4 rounded-xl mb-6 ${
                selectedMatch.draw
                  ? 'bg-white/10 border border-white/10'
                  : 'bg-[#7fa99b]/20 border border-[#7fa99b]/30'
              }`}>
                <p className="text-sm text-gray-400 mb-1">Résultat</p>
                <p className="text-xl font-bold text-white">{selectedMatch.result}</p>
              </div>

              {selectedMatch.duration && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0f2539] rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase">Durée</p>
                    <p className="text-xl font-bold text-white">{Math.floor(selectedMatch.duration / 60)}m {selectedMatch.duration % 60}s</p>
                  </div>
                  <div className="bg-[#0f2539] rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase">Manches</p>
                    <p className="text-xl font-bold text-white">{selectedMatch.rounds || 'N/A'}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedMatch(null)}
                className="w-full py-3 bg-[#0f2539] hover:bg-[#234a68] rounded-xl text-white font-bold transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Archives
