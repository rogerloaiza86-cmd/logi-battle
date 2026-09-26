import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { readChampionshipState } from '../utils/roundRules'
import { describeMatch, sortMatches } from '../utils/matchJournal'
import { rankGroups } from '../utils/classement'

const STORAGE_KEYS = {
  players: 'logi-battle-players',
  championship: 'logi-battle-championship',
  history: 'logi-battle-game-history',
  settings: 'logi-battle-settings',
}

export const HQDashboard = ({ onBack }) => {
  const [stats, setStats] = useState({
    totalGames: 0,
    totalPlayers: 0,
    totalClasses: 0,
    totalTime: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [classBoards, setClassBoards] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicEnabled: false,
    darkMode: true,
    timerDuration: 30,
  })

  useEffect(() => {
    loadStats()
    loadSettings()
  }, [])

  const loadStats = () => {
    // Load from all storage keys
    const players = JSON.parse(localStorage.getItem(STORAGE_KEYS.players) || '[]')
    const championship = readChampionshipState()
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]')

    const classes = championship.classes || []
    const groupCount = classes.reduce((count, cls) => count + (cls.groups?.length || 0), 0)
    
    let totalGames = 0
    let totalTime = 0

    // Count games from players
    players.forEach(player => {
      totalGames += player.stats?.totalGames || 0
      totalTime += player.stats?.timePlayed || 0
    })

    // Count championship matches
    classes.forEach(cls => {
      totalGames += cls.matches?.length || 0
    })

    setStats({
      totalGames,
      totalPlayers: players.length,
      totalClasses: classes.length,
      totalGroups: groupCount,
      totalTime,
    })

    const activities = []
    classes.forEach((cls) => {
      cls.matches?.forEach((match) => {
        const note = describeMatch(match, cls.groups || [], cls.name)
        activities.push({
          type: 'match',
          date: note.date,
          description: `${note.className} · ${note.left} vs ${note.right}`,
          result: note.result,
          draw: note.draw,
        })
      })
    })
    setRecentActivity(sortMatches(activities).slice(0, 10))
    setClassBoards(classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      groups: rankGroups(cls.groups || []),
    })).filter((board) => board.groups.length > 0))
  }

  const loadSettings = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.settings)
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }

  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(newSettings))
  }

  const handleClearData = () => {
    if (confirm('⚠️ ATTENTION: Cette action supprimera TOUTES les données (joueurs, championnats, historique). Cette action est irréversible.\n\nÊtes-vous sûr ?')) {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
      localStorage.removeItem('championship-storage')
      localStorage.removeItem('user_profile')
      alert('Toutes les données ont été supprimées.')
      window.location.reload()
    }
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
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
              <h1 className="text-xl font-bold text-white">QG - Command Center</h1>
              <p className="text-xs text-gray-500">Statistiques et paramètres</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#1d3d59] p-1 rounded-xl">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: 'dashboard' },
            { id: 'stats', label: 'Statistiques', icon: 'bar_chart' },
            { id: 'settings', label: 'Paramètres', icon: 'settings' },
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#f4b942]/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-[#f4b942]">sports_esports</span>
                </div>
                <p className="text-3xl font-black text-white">{stats.totalGames}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Parties Jouées</p>
              </div>
              
              <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#7fa99b]/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-[#7fa99b]">person</span>
                </div>
                <p className="text-3xl font-black text-white">{stats.totalPlayers}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Joueurs</p>
              </div>
              
              <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-green-400">school</span>
                </div>
                <p className="text-3xl font-black text-white">{stats.totalClasses}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Classes</p>
              </div>
              
              <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-purple-400">schedule</span>
                </div>
                <p className="text-3xl font-black text-white">{formatTime(stats.totalTime)}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Temps Total</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-icons text-[#f4b942]">history</span>
                Activité Récente
              </h2>
              
              {recentActivity.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-icons text-4xl text-gray-600 mb-2">inbox</span>
                  <p className="text-gray-500">Aucune activité récente</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-[#0f2539] rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#f4b942]/20 flex items-center justify-center flex-shrink-0">
                        <span className="material-icons text-[#f4b942]">sports_kabaddi</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.draw
                          ? 'bg-white/10 text-gray-300'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {activity.result}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => window.open('https://github.com', '_blank')}
                className="bg-[#1d3d59] rounded-2xl p-6 border border-white/5 hover:border-[#f4b942]/30 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-blue-400">help_outline</span>
                </div>
                <h3 className="text-white font-bold mb-1">Documentation</h3>
                <p className="text-gray-500 text-sm">Guide d'utilisation et règles du jeu</p>
              </button>

              <button
                onClick={() => alert('Fonctionnalité à venir dans une prochaine mise à jour !')}
                className="bg-[#1d3d59] rounded-2xl p-6 border border-white/5 hover:border-[#f4b942]/30 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-purple-400">update</span>
                </div>
                <h3 className="text-white font-bold mb-1">Mises à jour</h3>
                <p className="text-gray-500 text-sm">Historique des versions</p>
              </button>

              <button
                onClick={() => alert('Merci de votre soutien ! Contactez-nous pour toute question.')}
                className="bg-[#1d3d59] rounded-2xl p-6 border border-white/5 hover:border-[#f4b942]/30 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-pink-400">favorite</span>
                </div>
                <h3 className="text-white font-bold mb-1">Support</h3>
                <p className="text-gray-500 text-sm">Contact et assistance</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4">Performance Globale</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Parties Terminées</span>
                    <span className="text-white font-bold">{stats.totalGames}</span>
                  </div>
                  <div className="h-3 bg-[#0f2539] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#f4b942] rounded-full"
                      style={{ width: `${Math.min(100, stats.totalGames)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Joueurs Actifs</span>
                    <span className="text-white font-bold">{stats.totalPlayers}</span>
                  </div>
                  <div className="h-3 bg-[#0f2539] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#7fa99b] rounded-full"
                      style={{ width: `${Math.min(100, stats.totalPlayers * 10)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Classes Créées</span>
                    <span className="text-white font-bold">{stats.totalClasses}</span>
                  </div>
                  <div className="h-3 bg-[#0f2539] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.min(100, stats.totalClasses * 20)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4">Classements des classes</h2>
              {classBoards.length === 0 ? (
                <p className="text-gray-500">Aucune classe avec des groupes. Créez-les dans le championnat.</p>
              ) : (
                <div className="space-y-6">
                  {classBoards.map((board) => (
                    <div key={board.id}>
                      <p className="text-sm font-bold text-[#f4b942] mb-2">{board.name}</p>
                      <ol className="space-y-2">
                        {board.groups.map((group) => (
                          <li key={group.id} className="flex items-center justify-between text-white">
                            <span>{group.rank}. {group.name}</span>
                            <span className="text-[#f4b942] font-bold">{group.stats?.points || 0} pts</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Audio Settings */}
            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-icons text-[#f4b942]">volume_up</span>
                Audio
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0f2539] rounded-xl">
                  <div>
                    <p className="text-white font-medium">Effets Sonores</p>
                    <p className="text-xs text-gray-500">Sons des boutons et réponses</p>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
                    className={`w-14 h-8 rounded-full transition-colors relative ${
                      settings.soundEnabled ? 'bg-[#f4b942]' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                      settings.soundEnabled ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0f2539] rounded-xl">
                  <div>
                    <p className="text-white font-medium">Musique de Fond</p>
                    <p className="text-xs text-gray-500">Musique ambiante pendant le jeu</p>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, musicEnabled: !settings.musicEnabled })}
                    className={`w-14 h-8 rounded-full transition-colors relative ${
                      settings.musicEnabled ? 'bg-[#f4b942]' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                      settings.musicEnabled ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Game Settings */}
            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-icons text-[#f4b942]">timer</span>
                Paramètres de Jeu
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#0f2539] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white font-medium">Durée par Question</p>
                      <p className="text-xs text-gray-500">Temps limite pour répondre</p>
                    </div>
                    <span className="text-2xl font-black text-[#f4b942]">{settings.timerDuration}s</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="5"
                    value={settings.timerDuration}
                    onChange={(e) => saveSettings({ ...settings, timerDuration: parseInt(e.target.value) })}
                    className="w-full h-2 bg-[#234a68] rounded-lg appearance-none cursor-pointer accent-[#f4b942]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15s</span>
                    <span>60s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/10 rounded-3xl p-6 border border-red-500/20">
              <h2 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="material-icons">warning</span>
                Zone Dangereuse
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0f2539] rounded-xl">
                  <div>
                    <p className="text-white font-medium">Réinitialiser Toutes les Données</p>
                    <p className="text-xs text-red-400">Cette action est irréversible !</p>
                  </div>
                  <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold text-sm transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>

            {/* Version */}
            <div className="text-center text-gray-500 text-sm">
              <p>Geronimo Coop v1.0.0</p>
              <p className="mt-1">© 2025 - Tous droits réservés</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default HQDashboard
