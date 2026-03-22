import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'logi-battle-players'

const AVATARS = [
  { id: 'truck', icon: 'local_shipping', color: '#fea52e' },
  { id: 'warehouse', icon: 'warehouse', color: '#699cff' },
  { id: 'box', icon: 'inventory_2', color: '#22c55e' },
  { id: 'forklift', icon: 'forklift', color: '#ef4444' },
  { id: 'robot', icon: 'smart_toy', color: '#a855f7' },
  { id: 'plane', icon: 'flight', color: '#06b6d4' },
  { id: 'ship', icon: 'directions_boat', color: '#3b82f6' },
  { id: 'train', icon: 'train', color: '#f97316' },
]

const RANKS = [
  { name: 'Recrue', minScore: 0, color: '#6b7280' },
  { name: 'Opérateur', minScore: 500, color: '#22c55e' },
  { name: 'Superviseur', minScore: 1500, color: '#3b82f6' },
  { name: 'Manager', minScore: 3000, color: '#a855f7' },
  { name: 'Directeur', minScore: 5000, color: '#f97316' },
  { name: 'Expert', minScore: 8000, color: '#ef4444' },
  { name: 'Maître Logisticien', minScore: 12000, color: '#fea52e' },
]

export const BattalionManager = ({ onBack }) => {
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [view, setView] = useState('list') // 'list', 'detail'
  
  // Form states
  const [newPlayerName, setNewPlayerName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0])

  // Load players from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setPlayers(JSON.parse(saved))
    }
  }, [])

  // Save players to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
  }, [players])

  const getRank = (score) => {
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (score >= RANKS[i].minScore) {
        return RANKS[i]
      }
    }
    return RANKS[0]
  }

  const createPlayer = (e) => {
    e.preventDefault()
    if (!newPlayerName.trim()) return

    const newPlayer = {
      id: `player_${Date.now()}`,
      name: newPlayerName.trim(),
      avatar: selectedAvatar,
      createdAt: Date.now(),
      stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        totalScore: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        bestStreak: 0,
        timePlayed: 0,
      },
      achievements: [],
      history: [],
    }

    setPlayers(prev => [...prev, newPlayer])
    setNewPlayerName('')
    setShowCreateForm(false)
    setSelectedPlayer(newPlayer)
    setView('detail')
  }

  const deletePlayer = (playerId) => {
    if (confirm('Supprimer ce joueur ?')) {
      setPlayers(prev => prev.filter(p => p.id !== playerId))
      if (selectedPlayer?.id === playerId) {
        setSelectedPlayer(null)
        setView('list')
      }
    }
  }

  const getWinRate = (stats) => {
    if (stats.totalGames === 0) return 0
    return Math.round((stats.wins / stats.totalGames) * 100)
  }

  const getAccuracy = (stats) => {
    if (stats.totalAnswers === 0) return 0
    return Math.round((stats.correctAnswers / stats.totalAnswers) * 100)
  }

  // Player Detail View
  if (view === 'detail' && selectedPlayer) {
    const rank = getRank(selectedPlayer.stats.totalScore)
    const winRate = getWinRate(selectedPlayer.stats)
    const accuracy = getAccuracy(selectedPlayer.stats)
    const nextRank = RANKS.find(r => r.minScore > selectedPlayer.stats.totalScore)
    const progressToNext = nextRank 
      ? Math.round(((selectedPlayer.stats.totalScore - rank.minScore) / (nextRank.minScore - rank.minScore)) * 100)
      : 100

    return (
      <div className="min-h-screen bg-[#0c0c1f]">
        {/* Header */}
        <header className="bg-[#121225] border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('list')}
                className="w-10 h-10 rounded-xl bg-[#1a1a2e] hover:bg-[#252538] flex items-center justify-center transition-colors"
              >
                <span className="material-icons text-gray-400">arrow_back</span>
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Profil du Joueur</h1>
                <p className="text-xs text-gray-500">Statistiques détaillées</p>
              </div>
            </div>
            <button
              onClick={() => deletePlayer(selectedPlayer.id)}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
            >
              Supprimer
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Profile Header */}
          <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-white/5 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${selectedPlayer.avatar.color}20` }}
              >
                <span 
                  className="material-icons text-5xl"
                  style={{ color: selectedPlayer.avatar.color }}
                >
                  {selectedPlayer.avatar.icon}
                </span>
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-black text-white mb-1">{selectedPlayer.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: `${rank.color}20`, color: rank.color }}
                  >
                    {rank.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Membre depuis {new Date(selectedPlayer.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              
              {/* Score */}
              <div className="text-center">
                <p className="text-4xl font-black text-[#fea52e]">{selectedPlayer.stats.totalScore.toLocaleString()}</p>
                <p className="text-xs text-gray-500 uppercase">Points Totaux</p>
              </div>
            </div>

            {/* Progress to next rank */}
            {nextRank && (
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Progression vers {nextRank.name}</span>
                  <span className="text-white font-bold">{progressToNext}%</span>
                </div>
                <div className="h-2 bg-[#121225] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${progressToNext}%`,
                      backgroundColor: rank.color
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {nextRank.minScore - selectedPlayer.stats.totalScore} points restants
                </p>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <p className="text-3xl font-black text-white">{selectedPlayer.stats.totalGames}</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Parties Jouées</p>
            </div>
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <p className="text-3xl font-black text-green-400">{selectedPlayer.stats.wins}</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Victoires</p>
            </div>
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <p className="text-3xl font-black text-red-400">{selectedPlayer.stats.losses}</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Défaites</p>
            </div>
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <p className="text-3xl font-black text-[#699cff]">{winRate}%</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Win Rate</p>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Précision</span>
                    <span className="text-white font-bold">{accuracy}%</span>
                  </div>
                  <div className="h-2 bg-[#121225] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#699cff] rounded-full"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Meilleure Série</span>
                    <span className="text-white font-bold">{selectedPlayer.stats.bestStreak}</span>
                  </div>
                  <div className="h-2 bg-[#121225] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#fea52e] rounded-full"
                      style={{ width: `${Math.min(100, selectedPlayer.stats.bestStreak * 10)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-400 text-sm">Temps de jeu</span>
                  <span className="text-white font-bold">
                    {Math.floor(selectedPlayer.stats.timePlayed / 60)}h {selectedPlayer.stats.timePlayed % 60}m
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Succès Débloqués</h3>
              {selectedPlayer.achievements.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-icons text-4xl text-gray-600 mb-2">emoji_events</span>
                  <p className="text-gray-500 text-sm">Aucun succès débloqué</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {selectedPlayer.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="aspect-square rounded-xl bg-[#121225] flex items-center justify-center"
                      title={achievement.name}
                    >
                      <span className="material-icons text-[#fea52e]">{achievement.icon}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // List View
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
              <h1 className="text-xl font-bold text-white">Bataillon</h1>
              <p className="text-xs text-gray-500">Gestion des joueurs</p>
            </div>
          </div>
          
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-[#fea52e] hover:bg-[#e89420] rounded-xl text-[#0c0c1f] font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <span className="material-icons text-sm">add</span>
              Nouveau Joueur
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Create Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-white/5">
                <h2 className="text-lg font-bold text-white mb-4">Nouveau Joueur</h2>
                
                <form onSubmit={createPlayer} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nom du joueur</label>
                    <input
                      type="text"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      placeholder="Ex: Jean Dupont"
                      className="w-full bg-[#121225] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#fea52e] focus:outline-none"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Avatar</label>
                    <div className="flex gap-3 flex-wrap">
                      {AVATARS.map((avatar) => (
                        <button
                          key={avatar.id}
                          type="button"
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                            selectedAvatar.id === avatar.id
                              ? 'ring-2 ring-[#fea52e]'
                              : ''
                          }`}
                          style={{ 
                            backgroundColor: `${avatar.color}20`,
                            opacity: selectedAvatar.id === avatar.id ? 1 : 0.6
                          }}
                        >
                          <span 
                            className="material-icons"
                            style={{ color: avatar.color }}
                          >
                            {avatar.icon}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 py-3 bg-[#121225] hover:bg-[#252538] rounded-xl text-white font-bold transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={!newPlayerName.trim()}
                      className="flex-1 py-3 bg-[#fea52e] hover:bg-[#e89420] disabled:opacity-50 rounded-xl text-[#0c0c1f] font-bold transition-colors"
                    >
                      Créer
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Players Grid */}
        {players.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#1a1a2e] flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-4xl text-gray-600">groups</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Aucun joueur</h2>
            <p className="text-gray-500 mb-6">Créez votre premier joueur pour commencer</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-[#fea52e] hover:bg-[#e89420] rounded-xl text-[#0c0c1f] font-bold transition-colors"
            >
              Créer un joueur
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-[#fea52e] text-xs font-bold uppercase tracking-[0.2em] mb-2">Régiment</p>
              <h2 className="text-3xl font-black text-white italic">MES OPÉRATEURS</h2>
              <p className="text-gray-400 mt-2">{players.length} joueur{players.length > 1 ? 's' : ''} enregistré{players.length > 1 ? 's' : ''}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player, index) => {
                const rank = getRank(player.stats.totalScore)
                const winRate = getWinRate(player.stats)
                
                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedPlayer(player)
                      setView('detail')
                    }}
                    className="bg-[#1a1a2e] rounded-3xl p-5 border border-white/5 hover:border-[#fea52e]/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${player.avatar.color}20` }}
                      >
                        <span 
                          className="material-icons text-2xl"
                          style={{ color: player.avatar.color }}
                        >
                          {player.avatar.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold truncate">{player.name}</h3>
                        <span 
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${rank.color}20`, color: rank.color }}
                        >
                          {rank.name}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-lg font-black text-white">{player.stats.totalGames}</p>
                        <p className="text-[10px] text-gray-500 uppercase">Matchs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-black text-green-400">{winRate}%</p>
                        <p className="text-[10px] text-gray-500 uppercase">Win</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-black text-[#fea52e]">{player.stats.totalScore}</p>
                        <p className="text-[10px] text-gray-500 uppercase">Points</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}

        {/* Rank Info */}
        {players.length > 0 && (
          <div className="mt-12 bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Système de Grades</h3>
            <div className="flex flex-wrap gap-3">
              {RANKS.map((rank) => (
                <div 
                  key={rank.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#121225]"
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: rank.color }}
                  />
                  <span className="text-sm text-gray-300">{rank.name}</span>
                  <span className="text-xs text-gray-500">{rank.minScore}+ pts</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default BattalionManager
