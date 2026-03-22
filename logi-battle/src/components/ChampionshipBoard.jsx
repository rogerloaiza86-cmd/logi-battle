import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChampionshipStore } from '../hooks/useChampionshipStore'

export const ChampionshipBoard = ({ classData, onBack, onStartChallenge }) => {
  const { getRankings, getCurrentChampion, getChallengers, getMatchHistory } = useChampionshipStore()
  
  const [selectedTab, setSelectedTab] = useState('ranking') // 'ranking', 'history', 'challenge'
  const [selectedChallenger, setSelectedChallenger] = useState(null)
  
  const rankings = getRankings(classData.id)
  const champion = getCurrentChampion(classData.id)
  const challengers = getChallengers(classData.id)
  const history = getMatchHistory(classData.id)
  
  const handleStartChallenge = () => {
    if (selectedChallenger && champion) {
      onStartChallenge(selectedChallenger, champion)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Champion Banner */}
      {champion ? (
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 rounded-2xl p-8 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10"
          >
            <div className="text-6xl mb-4">👑</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              {champion.name}
            </h2>
            <p className="text-yellow-100 text-lg">Champion en titre</p>
            
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-3xl font-black text-white">{champion.stats.wins}</p>
                <p className="text-sm text-yellow-100">Victoires</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-white">{champion.stats.titleDefenses}</p>
                <p className="text-sm text-yellow-100">Défenses</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-white">{champion.stats.points}</p>
                <p className="text-sm text-yellow-100">Points</p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
          <span className="text-5xl mb-4 block">🏆</span>
          <h2 className="text-xl font-bold text-white mb-2">Aucun champion</h2>
          <p className="text-gray-500">Créez des groupes et jouez pour désigner un champion</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-800 p-1 rounded-xl">
        <button
          onClick={() => setSelectedTab('ranking')}
          className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
            selectedTab === 'ranking' 
              ? 'bg-primary text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="material-icons text-sm align-middle mr-1">format_list_numbered</span>
          Classement
        </button>
        <button
          onClick={() => setSelectedTab('challenge')}
          className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
            selectedTab === 'challenge' 
              ? 'bg-primary text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="material-icons text-sm align-middle mr-1">sports_kabaddi</span>
          Défier
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
            selectedTab === 'history' 
              ? 'bg-primary text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="material-icons text-sm align-middle mr-1">history</span>
          Historique
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {selectedTab === 'ranking' && (
          <motion.div
            key="ranking"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700">
              <h3 className="font-bold text-white">Classement des groupes</h3>
            </div>
            
            {rankings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucun groupe dans cette classe
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {rankings.map((group, index) => (
                  <div
                    key={group.id}
                    className={`p-4 flex items-center gap-4 ${
                      group.isChampion ? 'bg-yellow-500/5' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      index === 1 ? 'bg-gray-400/20 text-gray-300' :
                      index === 2 ? 'bg-amber-700/20 text-amber-500' :
                      'bg-slate-700 text-gray-400'
                    }`}>
                      {index === 0 ? '👑' : index + 1}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-bold text-white">{group.name}</p>
                      <p className="text-xs text-gray-500">
                        {group.members.join(', ')}
                      </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <span className="text-green-400 font-bold">{group.stats.wins}V</span>
                        <span className="text-gray-600 mx-1">/</span>
                        <span className="text-red-400 font-bold">{group.stats.losses}D</span>
                      </div>
                      <div className="w-16 text-center">
                        <span className="text-primary font-bold">{group.stats.points} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {selectedTab === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {!champion ? (
              <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
                <span className="material-icons text-5xl text-slate-600 mb-3">sports_kabaddi</span>
                <p className="text-gray-500">Il n'y a pas encore de champion à défier</p>
                <p className="text-gray-600 text-sm mt-1">Créez au moins 2 groupes pour commencer</p>
              </div>
            ) : challengers.length === 0 ? (
              <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
                <span className="material-icons text-5xl text-slate-600 mb-3">groups</span>
                <p className="text-gray-500">Pas de challengers disponibles</p>
                <p className="text-gray-600 text-sm mt-1">Créez plus de groupes pour permettre des défis</p>
              </div>
            ) : (
              <>
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-icons text-primary">group</span>
                    Sélectionner un challenger
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {challengers.map((challenger) => (
                      <button
                        key={challenger.id}
                        onClick={() => setSelectedChallenger(challenger)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedChallenger?.id === challenger.id
                            ? 'border-primary bg-primary/10'
                            : 'border-slate-700 hover:border-slate-600 bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                            <span className="material-icons text-gray-400">group</span>
                          </div>
                          <div>
                            <p className="font-bold text-white">{challenger.name}</p>
                            <p className="text-xs text-gray-500">
                              {challenger.stats.wins}V • {challenger.stats.points} pts
                            </p>
                          </div>
                        </div>
                        {challenger.members.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {challenger.members.map((m, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 bg-slate-700 rounded text-gray-400">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedChallenger && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 border border-primary/30"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-center md:text-left">
                        <p className="text-sm text-gray-400 mb-1">Match à venir</p>
                        <p className="text-xl font-bold text-white">
                          <span className="text-blue-400">{selectedChallenger.name}</span>
                          <span className="text-gray-500 mx-3">VS</span>
                          <span className="text-yellow-400">{champion.name}</span>
                        </p>
                      </div>
                      <button
                        onClick={handleStartChallenge}
                        className="px-8 py-4 bg-primary hover:bg-amber-500 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                      >
                        <span className="material-icons">play_arrow</span>
                        Commencer le match
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        )}

        {selectedTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700">
              <h3 className="font-bold text-white">Historique des matchs</h3>
            </div>
            
            {history.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <span className="material-icons text-4xl mb-2">history</span>
                <p>Aucun match joué</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-700 max-h-96 overflow-y-auto">
                {[...history].reverse().map((match) => {
                  const challenger = classData.groups.find(g => g.id === match.challengerId)
                  const champ = classData.groups.find(g => g.id === match.championId)
                  
                  return (
                    <div key={match.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">
                          {new Date(match.date).toLocaleDateString('fr-FR')}
                        </span>
                        {match.winner === 'challenger' && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-bold">
                            NOUVEAU CHAMPION
                          </span>
                        )}
                        {match.winner === 'champion' && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded font-bold">
                            DÉFENSE RÉUSSIE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${match.winner === 'challenger' ? 'text-green-400' : 'text-gray-400'}`}>
                          {challenger?.name}
                        </span>
                        <span className="text-gray-600">VS</span>
                        <span className={`font-bold ${match.winner === 'champion' ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {champ?.name}
                        </span>
                      </div>
                      {match.score && (
                        <p className="text-sm text-gray-500 mt-1">
                          Score: {match.score.teamA} - {match.score.teamB}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ChampionshipBoard
