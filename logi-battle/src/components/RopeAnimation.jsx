import React from 'react'
import { motion } from 'framer-motion'

export const RopeAnimation = ({ position = 0 }) => {
  // Position: -100 (team B winning) to 100 (team A winning)
  // Visual: 0 to 100% width
  const normalizedPosition = ((position + 100) / 200) * 100

  return (
    <div className="relative w-full h-16 bg-slate-900 dark:bg-black/40 flex items-center px-8 z-50 border-b border-primary/20">
      {/* Team Labels */}
      <div className="flex justify-between w-full absolute left-0 px-8 items-center pointer-events-none">
        <span className="text-blue-400 font-bold text-lg md:text-xl tracking-wider">TEAM A</span>
        <span className="text-primary font-bold text-lg md:text-xl tracking-wider">TEAM B</span>
      </div>

      {/* Main Rope Bar */}
      <div className="w-full h-3 bg-slate-800 rounded-full relative overflow-visible mx-20 md:mx-24">
        {/* Team A Progress (Blue) */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-l-full"
          initial={{ width: '50%' }}
          animate={{ width: `${normalizedPosition}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Team B Progress (Orange) */}
        <motion.div
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-primary to-amber-400 rounded-r-full"
          initial={{ width: '50%' }}
          animate={{ width: `${100 - normalizedPosition}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* The Knot/Flag Indicator */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-slate-100 rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-900 ring-4 ring-blue-500/30 z-10"
          animate={{ left: `${normalizedPosition}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="material-icons text-slate-900 text-xl">flag</span>
        </motion.div>
      </div>

      {/* Status Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        {Math.abs(position) >= 100 ? (
          <div className="text-xl font-bold text-primary animate-pulse">
            🎯 VICTOIRE!
          </div>
        ) : (
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Position: {position}
          </div>
        )}
      </div>
    </div>
  )
}

export default RopeAnimation
