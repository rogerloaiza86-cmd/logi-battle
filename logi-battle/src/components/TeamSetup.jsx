import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../hooks/useGameStore'

export const TeamSetup = ({ onStart, onBack, gameMode }) => {
  const gameStore = useGameStore()
  const [teamAName, setTeamAName] = useState('')
  const [teamBName, setTeamBName] = useState('')
  const [errors, setErrors] = useState({})

  const getGameModeLabel = () => {
    const labels = {
      palettisation: '📦 Palettisation',
      cout_transport: '🚚 Coût de Transport',
      loading_plan: '📊 Plan de Chargement',
      vocabulaire: '📚 Vocabulaire Logistique',
      supply_chain: '🧩 Supply Chain',
      reception: '🚛 Réception & Contrôle',
      stock: '📦 Stock Master 3D',
      safety: '🛡️ Safety First',
      traceability: '📡 Traçabilité Track',
      green: '🌍 Green Logistique',
      culture: '🧠 Culture Générale',
      all: '🎲 Mode Mixte'
    }
    return labels[gameMode] || 'Mode de jeu'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!teamAName.trim()) {
      newErrors.teamA = 'Veuillez entrer un nom pour l\'équipe A'
    }
    if (!teamBName.trim()) {
      newErrors.teamB = 'Veuillez entrer un nom pour l\'équipe B'
    }
    if (teamAName.trim().toLowerCase() === teamBName.trim().toLowerCase()) {
      newErrors.same = 'Les deux équipes ne peuvent pas avoir le même nom'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Mettre à jour le store avec les noms des équipes
    gameStore.setTeamNames(teamAName.trim(), teamBName.trim())
    gameStore.setGameStatus('active')
    onStart()
  }

  const handleBack = () => {
    setTeamAName('')
    setTeamBName('')
    setErrors({})
    onBack()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <span className="material-icons text-2xl text-white">groups</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Configuration des Équipes
        </h1>
        <p className="text-gray-400 text-lg">
          {getGameModeLabel()}
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Team A Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-600/20 to-blue-400/10 border-2 border-blue-500/30 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                <span className="material-icons text-3xl text-blue-400">shield</span>
              </div>
              <div>
                <h2 className="text-blue-400 font-bold text-xl">ÉQUIPE A</h2>
                <p className="text-blue-300/70 text-sm">Couleur Bleue</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Nom de l'équipe
                </label>
                <input
                  type="text"
                  value={teamAName}
                  onChange={(e) => {
                    setTeamAName(e.target.value)
                    setErrors({ ...errors, teamA: undefined, same: undefined })
                  }}
                  placeholder="Ex: Les Logisticiens"
                  maxLength={20}
                  className={`w-full bg-slate-900/80 border-2 ${
                    errors.teamA ? 'border-red-500' : 'border-blue-500/30'
                  } rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-lg`}
                />
                {errors.teamA && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span className="material-icons text-sm">error</span>
                    {errors.teamA}
                  </motion.p>
                )}
              </div>

              {/* Avatar Preview */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={gameStore.teamA.avatar}
                  alt="Avatar Team A"
                  className="w-12 h-12 rounded-lg object-cover border-2 border-blue-500/30"
                />
                <span className="text-gray-500 text-sm">Avatar par défaut</span>
              </div>
            </div>
          </motion.div>

          {/* Team B Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-primary/20 to-amber-400/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center">
                <span className="material-icons text-3xl text-primary">shield</span>
              </div>
              <div>
                <h2 className="text-primary font-bold text-xl">ÉQUIPE B</h2>
                <p className="text-primary/70 text-sm">Couleur Orange</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Nom de l'équipe
                </label>
                <input
                  type="text"
                  value={teamBName}
                  onChange={(e) => {
                    setTeamBName(e.target.value)
                    setErrors({ ...errors, teamB: undefined, same: undefined })
                  }}
                  placeholder="Ex: Les Transporteurs"
                  maxLength={20}
                  className={`w-full bg-slate-900/80 border-2 ${
                    errors.teamB ? 'border-red-500' : 'border-primary/30'
                  } rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-lg`}
                />
                {errors.teamB && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span className="material-icons text-sm">error</span>
                    {errors.teamB}
                  </motion.p>
                )}
              </div>

              {/* Avatar Preview */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={gameStore.teamB.avatar}
                  alt="Avatar Team B"
                  className="w-12 h-12 rounded-lg object-cover border-2 border-primary/30"
                />
                <span className="text-gray-500 text-sm">Avatar par défaut</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Same Name Error */}
        {errors.same && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 text-center"
          >
            <p className="text-red-400 flex items-center justify-center gap-2">
              <span className="material-icons">warning</span>
              {errors.same}
            </p>
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-slate-800 hover:bg-slate-700 border-2 border-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="material-icons">arrow_back</span>
            Retour
          </button>
          
          <button
            type="submit"
            disabled={!teamAName.trim() || !teamBName.trim()}
            className="flex-[2] bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <span>Lancer le Duel</span>
            <span className="material-icons">sports_esports</span>
          </button>
        </motion.div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          <span className="material-icons text-sm align-middle mr-1">info</span>
          Les équipes répondront alternativement aux questions logistiques
        </motion.p>
      </motion.form>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
    </motion.div>
  )
}

export default TeamSetup
