import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../hooks/useGameStore'

export const GameOver = ({ winner, teamAScore = 0, teamBScore = 0, teamAName, teamBName, onRestart, onMenu }) => {
  const gameStore = useGameStore()
  const draw = winner == null
  const isTeamAWinner = winner === 'A'
  const nameA = teamAName || gameStore.teamA.name
  const nameB = teamBName || gameStore.teamB.name
  const peak = Math.max(Number(teamAScore) || 0, Number(teamBScore) || 0)
  const widthOf = (score) => (peak === 0 ? '0%' : `${(score / peak) * 100}%`)
  const leave = onMenu || onRestart

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="bg-gradient-to-br from-primary to-amber-500 p-1 rounded-3xl max-w-md w-full mx-4"
      >
        <div className="bg-background-dark rounded-3xl p-8 md:p-12 text-center space-y-6">
          <motion.div
            animate={{ rotate: draw ? 0 : 360 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl"
          >
            {draw ? '🤝' : '🎯'}
          </motion.div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{draw ? 'ÉGALITÉ' : 'VICTOIRE!'}</h2>
            <p className={`text-xl md:text-2xl font-bold ${draw ? 'text-white' : isTeamAWinner ? 'text-blue-400' : 'text-primary'}`}>
              {draw ? 'Les deux équipes terminent au même score.' : isTeamAWinner ? nameA : nameB}
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-400 font-bold">{nameA}</span>
              <span className="text-2xl font-black text-white">{teamAScore}</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                initial={{ width: 0 }}
                animate={{ width: widthOf(teamAScore) }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary font-bold">{nameB}</span>
              <span className="text-2xl font-black text-white">{teamBScore}</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: widthOf(teamBScore) }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-white font-bold py-4 rounded-xl text-lg uppercase tracking-wider transition-all"
          >
            Nouveau Duel
          </motion.button>

          <button
            onClick={leave}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wider transition-all"
          >
            Retour au Menu
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameOver
