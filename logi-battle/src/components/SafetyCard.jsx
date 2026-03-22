import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const SafetyCard = ({ 
  question, 
  team = 'A', 
  onAnswer, 
  isAnswering = false, 
  disabled = false, 
  responseTime = null 
}) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isWrong, setIsWrong] = useState(false)

  const isTeamA = team === 'A'
  const accentColor = isTeamA ? 'text-blue-400' : 'text-primary'
  const bgColor = isTeamA ? 'bg-blue-500' : 'bg-primary'
  const borderColor = isTeamA ? 'border-blue-500' : 'border-primary'
  const lightBg = isTeamA ? 'bg-blue-500/20' : 'bg-primary/20'

  const handleOptionSelect = (index) => {
    if (disabled || isAnswering) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (disabled || selectedOption === null) return
    
    const isCorrect = selectedOption === question.correctOption

    if (!isCorrect) {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 600)
    }

    onAnswer(isCorrect)
    if (isCorrect) {
      setSelectedOption(null)
    }
  }

  useEffect(() => {
    setSelectedOption(null)
    setIsWrong(false)
  }, [question?.id])

  const getOptionStyle = (index) => {
    const isSelected = selectedOption === index
    const isCorrect = index === question.correctOption
    
    if (isAnswering && isCorrect) {
      return 'bg-green-500/30 border-green-500 text-green-400'
    }
    
    if (isAnswering && isSelected && !isCorrect) {
      return 'bg-red-500/30 border-red-500 text-red-400'
    }
    
    if (isSelected) {
      return `${lightBg} ${borderColor} ${accentColor}`
    }
    
    return 'bg-slate-800 border-slate-700 text-gray-300 hover:border-slate-500'
  }

  const getCategoryIcon = () => {
    switch(question?.category) {
      case 'EPI': return '🦺'
      case 'CACES': return '🚧'
      case 'Risques': return '⚠️'
      case 'Signalisation': return '🚸'
      case 'Situations dangereuses': return '🚨'
      case 'Évacuation': return '🚪'
      case 'Premiers secours': return '🚑'
      case 'Ergonomie': return '🧘'
      case 'Réglementation': return '⚖️'
      case 'Équipement': return '🔧'
      default: return '🛡️'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl flex flex-col items-center gap-4"
    >
      <motion.div
        className={`w-full bg-slate-800 rounded-2xl p-5 border-2 ${
          isWrong ? 'border-red-500' : isTeamA ? 'border-blue-500/30' : 'border-primary/30'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon()}</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Safety First
            </span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${lightBg} ${accentColor}`}>
            {question?.category}
          </span>
        </div>

        {question?.scenario && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                {question.scenario}
              </p>
            </div>
          </div>
        )}

        <h3 className="text-white text-base md:text-lg font-bold leading-snug">
          {question?.question}
        </h3>

        <div className="flex items-center gap-1 mt-3">
          <span className="text-xs text-slate-500 mr-2">Niveau:</span>
          {[...Array(3)].map((_, i) => (
            <span 
              key={i} 
              className={`text-xs ${i < question?.difficulty ? 'text-red-400' : 'text-slate-700'}`}
            >
              ★
            </span>
          ))}
        </div>
      </motion.div>

      <div className="w-full grid gap-2.5">
        {question?.options?.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={disabled || isAnswering}
            whileHover={!disabled && !isAnswering ? { scale: 1.01, x: 4 } : {}}
            whileTap={!disabled && !isAnswering ? { scale: 0.99 } : {}}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${getOptionStyle(index)}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                selectedOption === index
                  ? `${bgColor} text-white`
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1 text-sm md:text-base">{option}</span>
              
              {isAnswering && index === question.correctOption && (
                <span className="material-icons text-green-400">check_circle</span>
              )}
              {isAnswering && selectedOption === index && index !== question.correctOption && (
                <span className="material-icons text-red-400">cancel</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={selectedOption === null || disabled || isAnswering}
        whileHover={!disabled && !isAnswering && selectedOption !== null ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isAnswering && selectedOption !== null ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
          isTeamA
            ? 'bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/20'
            : 'bg-primary hover:bg-amber-500 shadow-lg shadow-primary/20'
        } text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none`}
      >
        {disabled || isAnswering
          ? (responseTime ? `✓ ${(responseTime/1000).toFixed(1)}s` : '...') 
          : 'Valider la réponse'}
      </motion.button>

      <AnimatePresence>
        {isWrong && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 font-bold text-sm text-center bg-red-500/10 px-4 py-2 rounded-lg w-full"
          >
            <span className="material-icons text-sm align-middle mr-1">error</span>
            Risque non identifié !
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAnswering && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`w-full bg-slate-800/50 rounded-xl p-4 border ${isTeamA ? 'border-blue-500/30' : 'border-primary/30'}`}
          >
            <div className="flex items-start gap-2">
              <span className={`material-icons ${accentColor} text-sm mt-0.5`}>health_and_safety</span>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Règle de sécurité</p>
                <p className="text-sm text-gray-300">{question?.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SafetyCard
