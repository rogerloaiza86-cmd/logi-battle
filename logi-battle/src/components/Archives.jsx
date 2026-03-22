import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // Load championship data
    const championship = JSON.parse(localStorage.getItem(STORAGE_KEYS.championship) || '{}')
    const players = JSON.parse(localStorage.getItem(STORAGE_KEYS.players) || '[]')
    
    // Extract all matches
    const allMatches = []
    const classes = championship.classes || []
    
    classes.forEach(cls => {
      cls.matches?.forEach(match => {
        const challenger = cls.groups?.find(g => g.id === match.challengerId)
        const champion = cls.groups?.find(g => g.id === match.championId)
        
        allMatches.push({
          ...match,
          className: cls.name,
          challengerName: challenger?.name || 'Inconnu',
          championName: champion?.name || 'Inconnu',
        })
      })
    })
    
    // Sort by date (newest first)
    allMatches.sort((a, b) => b.date - a.date)
    setMatches(allMatches)

    // Build leaderboard from players
    const playerStats = players.map(player => ({
      ...player,
      winRate: player.stats?.totalGames > 0 
        ? Math.round((player.stats.wins / player.stats.totalGames) * 100)
        : 0,
    })).sort((a, b) => (b.stats?.totalScore || 0) - (a.stats?.totalScore || 0))
    
    setLeaderboard(playerStats)

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

  const getResultColor = (result) => {
    if (result === 'challenger') return 'text-green-400'
    if (result === 'champion') return 'text-[#fea52e]'
    return 'text-gray-400'
  }

  const getResultLabel = (result) => {
    if (result === 'challenger') return 'Challenger Gagne'
    if (result === 'champion') return 'Champion Défend'
    return 'Match Nul'
  }

  return (
    <div className="min-h-screen bg-[#0c0c1f]">
      {/* Header */}
      <header className="bg-[#121225] border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-[#1a1a2e] hover:bg-[#252538] flex items-center justify-center transition-colors"
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
        <div className="flex gap-2 mb-8 bg-[#1a1a2e] p-1 rounded-xl">
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
                  ? 'bg-[#fea52e] text-[#0c0c1f]'
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
                <div className="w-20 h-20 rounded-full bg-[#1a1a2e] flex items-center justify-center mx-auto mb-4">
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
                      className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5 hover:border-[#fea52e]/30 cursor-pointer transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Teams */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#699cff]/20 flex items-center justify-center">
                              <span className="material-icons text-[#699cff]">groups</span>
                            </div>
                            <div>
                              <p className="text-white font-bold">{match.challengerName}</p>
                              <p className="text-xs text-gray-500">Challenger</p>
                            </div>
                          </div>

                          <div className="px-4 py-2 bg-[#121225] rounded-lg">
                            <span className="text-2xl font-black text-gray-400">VS</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#fea52e]/20 flex items-center justify-center">
                              <span className="text-2xl">👑</span>
                            </div>
                            <div>
                              <p className="text-white font-bold">{match.championName}</p>
                              <p className="text-xs text-gray-500">Champion</p>
                            </div>
                          </div>
                        </div>

                        {/* Result */}
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-bold ${getResultColor(match.winner)}`}>
                            {getResultLabel(match.winner)}
                          </span>
                          {match.score && (
                            <span className="text-sm text-gray-400">
                              {match.score.teamA} - {match.score.teamB}
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
                <div className="w-20 h-20 rounded-full bg-[#1a1a2e] flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-4xl text-gray-600">emoji_events</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Aucun joueur classé</h2>
                <p className="text-gray-500">Créez des joueurs et jouez pour apparaître dans le classement</p>
              </div>
            ) : (
              <>
                <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-white/5 mb-6">
                  <h2 className="text-lg font-bold text-white mb-4">🏆 Top 3</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {leaderboard.slice(0, 3).map((player, index) => (
                      <div
                        key={player.id}
                        className={`text-center p-4 rounded-2xl ${
                          index === 0 ? 'bg-yellow-500/20 border border-yellow-500/30' :
                          index === 1 ? 'bg-gray-400/20 border border-gray-400/30' :
                          'bg-amber-700/20 border border-amber-700/30'
                        }`}
                      >
                        <div className="text-3xl mb-2">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </div>
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                          style={{ backgroundColor: `${player.avatar?.color || '#fea52e'}40` }}
                        >
                          <span 
                            className="material-icons"
                            style={{ color: player.avatar?.color || '#fea52e' }}
                          >
                            {player.avatar?.icon || 'person'}
                          </span>
                        </div>
                        <p className="text-white font-bold truncate">{player.name}</p>
                        <p className="text-lg font-black text-[#fea52e]">{player.stats?.totalScore || 0} pts</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1a1a2e] rounded-3xl border border-white/5 overflow-hidden">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="font-bold text-white">Classement Complet</h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {leaderboard.map((player, index) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-4 p-4 hover:bg-[#252538] transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                          index < 3 
                            ? 'bg-[#fea52e]/20 text-[#fea52e]' 
                            : 'bg-[#121225] text-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${player.avatar?.color || '#fea52e'}20` }}
                        >
                          <span 
                            className="material-icons"
                            style={{ color: player.avatar?.color || '#fea52e' }}
                          >
                            {player.avatar?.icon || 'person'}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-white font-bold">{player.name}</p>
                          <p className="text-xs text-gray-500">
                            {player.stats?.wins || 0}V / {player.stats?.losses || 0}D
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-black text-[#fea52e]">{player.stats?.totalScore || 0}</p>
                          <p className="text-xs text-gray-500">{player.winRate}% Win</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
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
                { icon: 'emoji_events', label: 'Victoires', count: 0, color: '#fea52e' },
                { icon: 'local_fire_department', label: 'Séries', count: 0, color: '#ef4444' },
                { icon: 'psychology', label: 'Connaissances', count: 0, color: '#699cff' },
                { icon: 'groups', label: 'Social', count: 0, color: '#22c55e' },
              ].map((cat) => (
                <div key={cat.label} className="bg-[#1a1a2e] rounded-2xl p-4 border border-white/5 text-center">
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
                <div className="w-20 h-20 rounded-full bg-[#1a1a2e] flex items-center justify-center mx-auto mb-4">
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
                    className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#fea52e]/20 flex items-center justify-center">
                        <span className="material-icons text-3xl text-[#fea52e]">
                          {achievement.icon || 'emoji_events'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{achievement.name}</h3>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{ backgroundColor: `${achievement.playerAvatar?.color || '#fea52e'}20` }}
                          >
                            <span 
                              className="material-icons text-xs"
                              style={{ color: achievement.playerAvatar?.color || '#fea52e' }}
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
              className="bg-[#1a1a2e] rounded-3xl p-8 max-w-lg w-full border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Détails du Match</h2>
                <p className="text-gray-400">{selectedMatch.className}</p>
                <p className="text-sm text-gray-500">{formatDate(selectedMatch.date)}</p>
              </div>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#699cff]/20 flex items-center justify-center mb-2">
                    <span className="material-icons text-3xl text-[#699cff]">groups</span>
                  </div>
                  <p className="text-white font-bold">{selectedMatch.challengerName}</p>
                  <p className="text-xs text-gray-500">Challenger</p>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-black text-gray-400">VS</p>
                  {selectedMatch.score && (
                    <p className="text-2xl font-bold text-[#fea52e]">
                      {selectedMatch.score.teamA} - {selectedMatch.score.teamB}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#fea52e]/20 flex items-center justify-center mb-2">
                    <span className="text-3xl">👑</span>
                  </div>
                  <p className="text-white font-bold">{selectedMatch.championName}</p>
                  <p className="text-xs text-gray-500">Champion</p>
                </div>
              </div>

              <div className={`text-center p-4 rounded-xl mb-6 ${
                selectedMatch.winner === 'challenger' 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-[#fea52e]/20 border border-[#fea52e]/30'
              }`}>
                <p className="text-sm text-gray-400 mb-1">Résultat</p>
                <p className={`text-xl font-bold ${getResultColor(selectedMatch.winner)}`}>
                  {selectedMatch.winner === 'challenger' 
                    ? `🏆 ${selectedMatch.challengerName} remporte le titre !` 
                    : `👑 ${selectedMatch.championName} conserve son titre !`}
                </p>
              </div>

              {selectedMatch.duration && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#121225] rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase">Durée</p>
                    <p className="text-xl font-bold text-white">{Math.floor(selectedMatch.duration / 60)}m {selectedMatch.duration % 60}s</p>
                  </div>
                  <div className="bg-[#121225] rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase">Manches</p>
                    <p className="text-xl font-bold text-white">{selectedMatch.rounds || 'N/A'}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedMatch(null)}
                className="w-full py-3 bg-[#121225] hover:bg-[#252538] rounded-xl text-white font-bold transition-colors"
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
