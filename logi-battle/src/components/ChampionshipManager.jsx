import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChampionshipStore } from '../hooks/useChampionshipStore'
import GroupManager from './GroupManager'
import ChampionshipBoard from './ChampionshipBoard'

export const ChampionshipManager = ({ onBack, onStartGame }) => {
  const [view, setView] = useState('list') // 'list', 'class', 'groups', 'championship'
  const [selectedClassId, setSelectedClassId] = useState(null)
  
  const { classes, createClass, deleteClass, selectClass, currentClass } = useChampionshipStore()
  
  const [newClassName, setNewClassName] = useState('')
  const [newClassDesc, setNewClassDesc] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreateClass = (e) => {
    e.preventDefault()
    if (newClassName.trim()) {
      const classId = createClass(newClassName.trim(), newClassDesc.trim())
      setNewClassName('')
      setNewClassDesc('')
      setShowCreateForm(false)
      setSelectedClassId(classId)
      setView('class')
    }
  }

  const handleSelectClass = (classId) => {
    setSelectedClassId(classId)
    selectClass(classId)
    setView('class')
  }

  const selectedClass = classes.find((c) => c.id === selectedClassId)

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-primary/20 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <span className="material-icons text-gray-400">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                🏆 <span className="text-primary">Championnat</span>
              </h1>
              <p className="text-xs text-gray-500">Gestion des classes et groupes</p>
            </div>
          </div>
          
          {view !== 'list' && (
            <div className="flex gap-2">
              <button
                onClick={() => setView('list')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors"
              >
                Classes
              </button>
              {selectedClass && (
                <>
                  <button
                    onClick={() => setView('class')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      view === 'class' ? 'bg-primary text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    Groupes
                  </button>
                  <button
                    onClick={() => setView('championship')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      view === 'championship' ? 'bg-primary text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    Championnat
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Create Class Button */}
              {!showCreateForm ? (
                <motion.button
                  onClick={() => setShowCreateForm(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-6 border-2 border-dashed border-primary/30 rounded-2xl bg-slate-800/50 hover:bg-slate-800 hover:border-primary/50 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-icons text-primary text-3xl">add_circle</span>
                  <span className="text-lg font-bold text-gray-300">Créer une nouvelle classe</span>
                </motion.button>
              ) : (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateClass}
                  className="bg-slate-800 rounded-2xl p-6 border border-primary/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4">Nouvelle Classe</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Nom de la classe *</label>
                      <input
                        type="text"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        placeholder="Ex: BTS Logistique 2025"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Description (optionnel)</label>
                      <input
                        type="text"
                        value={newClassDesc}
                        onChange={(e) => setNewClassDesc(e.target.value)}
                        placeholder="Ex: Promotion de septembre"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-gray-300 font-bold transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={!newClassName.trim()}
                        className="flex-1 py-3 bg-primary hover:bg-amber-500 rounded-xl text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Créer
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}

              {/* Classes List */}
              {classes.length === 0 ? (
                <div className="text-center py-16">
                  <span className="material-icons text-6xl text-slate-700 mb-4">school</span>
                  <p className="text-gray-500 text-lg">Aucune classe créée</p>
                  <p className="text-gray-600 text-sm">Créez votre première classe pour commencer</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <motion.div
                      key={cls.id}
                      layout
                      whileHover={{ y: -4 }}
                      onClick={() => handleSelectClass(cls.id)}
                      className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-primary/50 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <span className="material-icons text-primary text-2xl">class</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm('Supprimer cette classe ?')) {
                              deleteClass(cls.id)
                            }
                          }}
                          className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors"
                        >
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-1">{cls.name}</h3>
                      {cls.description && (
                        <p className="text-sm text-gray-500 mb-3">{cls.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <span className="material-icons text-base">groups</span>
                          {cls.groups.length} groupe{cls.groups.length !== 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-icons text-base">emoji_events</span>
                          {cls.matches.length} match{cls.matches.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      {cls.currentChampion && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <p className="text-xs text-primary uppercase tracking-wider mb-1">Champion actuel</p>
                          <p className="text-white font-bold">
                            👑 {cls.groups.find(g => g.id === cls.currentChampion)?.name || 'Inconnu'}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {view === 'class' && selectedClass && (
            <GroupManager
              key="groups"
              classData={selectedClass}
              onBack={() => setView('list')}
              onViewChampionship={() => setView('championship')}
              onStartGame={onStartGame}
            />
          )}

          {view === 'championship' && selectedClass && (
            <ChampionshipBoard
              key="championship"
              classData={selectedClass}
              onBack={() => setView('class')}
              onStartChallenge={(challenger, champion) => {
                onStartGame(challenger, champion, selectedClass.id)
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default ChampionshipManager
