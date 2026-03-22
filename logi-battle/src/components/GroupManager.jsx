import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChampionshipStore } from '../hooks/useChampionshipStore'

export const GroupManager = ({ classData, onBack, onViewChampionship, onStartGame }) => {
  const { createGroup, deleteGroup, getCurrentChampion, resetChampionship } = useChampionshipStore()
  
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [members, setMembers] = useState(['', '', ''])
  
  const currentChampion = getCurrentChampion(classData.id)
  const groups = classData.groups || []

  const handleCreateGroup = (e) => {
    e.preventDefault()
    if (newGroupName.trim()) {
      const validMembers = members.filter(m => m.trim()).map(m => m.trim())
      createGroup(classData.id, newGroupName.trim(), validMembers)
      setNewGroupName('')
      setMembers(['', '', ''])
      setShowCreateForm(false)
    }
  }

  const handleMemberChange = (index, value) => {
    const newMembers = [...members]
    newMembers[index] = value
    setMembers(newMembers)
  }

  const handleStartFreeMatch = () => {
    if (groups.length >= 2) {
      // Match libre entre les deux premiers groupes
      onStartGame(groups[0], groups[1], classData.id, 'free')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Info */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{classData.name}</h2>
            <p className="text-gray-500">{groups.length} groupe{groups.length !== 1 ? 's' : ''} • {classData.matches?.length || 0} matchs joués</p>
          </div>
          
          <div className="flex gap-3">
            {groups.length >= 2 && (
              <button
                onClick={handleStartFreeMatch}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-xl text-white font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <span className="material-icons text-sm">sports_esports</span>
                Match libre
              </button>
            )}
            <button
              onClick={onViewChampionship}
              className="px-4 py-2 bg-primary hover:bg-amber-500 rounded-xl text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <span className="material-icons text-sm">emoji_events</span>
              Voir le championnat
            </button>
            {groups.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Réinitialiser tous les scores ?')) {
                    resetChampionship(classData.id)
                  }
                }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-gray-300 font-bold text-sm transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
        
        {currentChampion && (
          <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center text-3xl">
              👑
            </div>
            <div>
              <p className="text-xs text-primary uppercase tracking-wider">Champion en titre</p>
              <p className="text-xl font-bold text-white">{currentChampion.name}</p>
              <p className="text-sm text-gray-500">
                {currentChampion.stats.wins}V - {currentChampion.stats.losses}D • {currentChampion.stats.titleDefenses} défenses
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Create Group */}
      {!showCreateForm ? (
        <motion.button
          onClick={() => setShowCreateForm(true)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full p-4 border-2 border-dashed border-primary/30 rounded-xl bg-slate-800/50 hover:bg-slate-800 hover:border-primary/50 transition-all flex items-center justify-center gap-3"
        >
          <span className="material-icons text-primary">add</span>
          <span className="font-bold text-gray-300">Ajouter un groupe / trinôme</span>
        </motion.button>
      ) : (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleCreateGroup}
          className="bg-slate-800 rounded-2xl p-6 border border-primary/20"
        >
          <h3 className="text-lg font-bold text-white mb-4">Nouveau Groupe</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nom du groupe *</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Ex: Les As de la Logistique"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Membres du trinôme (1 à 3)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {members.map((member, index) => (
                  <input
                    key={index}
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    placeholder={`Joueur ${index + 1}`}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
                  />
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false)
                  setNewGroupName('')
                  setMembers(['', '', ''])
                }}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-gray-300 font-bold transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!newGroupName.trim()}
                className="flex-1 py-3 bg-primary hover:bg-amber-500 rounded-xl text-white font-bold transition-colors disabled:opacity-50"
              >
                Créer le groupe
              </button>
            </div>
          </div>
        </motion.form>
      )}

      {/* Groups List */}
      {groups.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
          <span className="material-icons text-5xl text-slate-600 mb-3">groups</span>
          <p className="text-gray-500">Aucun groupe dans cette classe</p>
          <p className="text-gray-600 text-sm">Créez des groupes de 1 à 3 joueurs</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-slate-800 rounded-2xl p-5 border-2 transition-all ${
                group.isChampion 
                  ? 'border-yellow-500/50 bg-gradient-to-br from-slate-800 to-yellow-900/10' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {group.isChampion ? (
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👑</span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                      <span className="material-icons text-gray-400">group</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-white">{group.name}</h4>
                    <p className="text-xs text-gray-500">
                      {group.isChampion ? 'Champion en titre' : `Rang #${index + 1}`}
                    </p>
                  </div>
                </div>
                
                {!group.isChampion && (
                  <button
                    onClick={() => deleteGroup(classData.id, group.id)}
                    className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors"
                  >
                    <span className="material-icons text-sm">delete</span>
                  </button>
                )}
              </div>
              
              {/* Members */}
              {group.members.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {group.members.map((member, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-700 rounded-lg text-xs text-gray-300">
                      {member}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-700">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-400">{group.stats.wins}</p>
                  <p className="text-xs text-gray-500">Victoires</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-red-400">{group.stats.losses}</p>
                  <p className="text-xs text-gray-500">Défaites</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{group.stats.points}</p>
                  <p className="text-xs text-gray-500">Points</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-yellow-400">{group.stats.titleDefenses}</p>
                  <p className="text-xs text-gray-500">Défenses</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default GroupManager
