import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const QuestionCard = ({ 
  question, 
  team = 'A', 
  onAnswer, 
  isAnswering = false, 
  disabled = false, 
  responseTime = null 
}) => {
  const [userInput, setUserInput] = useState('')
  const [isWrong, setIsWrong] = useState(false)

  const isTeamA = team === 'A'

  const handleNumberClick = (num) => {
    if (disabled) return
    if (num === 'C') {
      setUserInput('')
    } else if (num === 'backspace') {
      setUserInput(userInput.slice(0, -1))
    } else {
      if (userInput.length < 6) {
        setUserInput(userInput + num)
      }
    }
  }

  const handleSubmit = () => {
    if (disabled || !userInput) return
    
    const answer = parseInt(userInput)
    const isCorrect = answer === question.correctAnswer

    if (!isCorrect) {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 600)
    }

    onAnswer(isCorrect)
    if (isCorrect) {
      setUserInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (disabled) return
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Backspace') {
      setUserInput(userInput.slice(0, -1))
    } else if (/\d/.test(e.key)) {
      if (userInput.length < 6) {
        setUserInput(userInput + e.key)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [userInput, disabled])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg flex flex-col items-center gap-4"
    >
      {/* Question Card */}
      <motion.div
        className={`bg-slate-800 rounded-2xl w-full p-6 text-center border-2 transition-colors ${
          isWrong ? 'border-red-500' : isTeamA ? 'border-blue-500/30' : 'border-primary/30'
        }`}
      >
        {/* Type */}
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">
          {question?.type === 'palettisation' && '📦 Palettisation'}
          {question?.type === 'cout_transport' && '🚚 Transport'}
          {question?.type === 'loading_plan' && '📊 Chargement'}
          {question?.type === 'vocabulaire' && '📚 Vocabulaire'}
          {question?.type === 'culture' && `🧠 ${question?.data?.category || 'Culture'}`}
        </span>

        {/* Title */}
        <h3 className="text-white text-lg md:text-xl font-bold mb-3 leading-tight">
          {question?.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm md:text-base mb-5 leading-relaxed min-h-[60px]">
          {question?.description}
        </p>

        {/* Answer Display */}
        <div className={`bg-slate-900 rounded-xl p-4 border-2 ${
          isWrong ? 'border-red-500' : isTeamA ? 'border-blue-500/30' : 'border-primary/30'
        }`}>
          <span className={`text-3xl md:text-4xl font-black ${
            userInput ? 'text-white' : 'text-slate-600'
          }`}>
            {userInput || '---'}
          </span>
          <div className={`h-1 w-10 mx-auto mt-2 rounded-full ${
            isWrong ? 'bg-red-500' : isTeamA ? 'bg-blue-500' : 'bg-primary'
          }`} />
        </div>

        {/* Hints */}
        {question?.hints && (
          <div className="mt-4 text-left text-xs text-slate-500 space-y-1.5 bg-slate-900/50 p-3 rounded-lg">
            {question.hints.slice(0, 2).map((hint, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className={isTeamA ? 'text-blue-400' : 'text-primary'}>•</span>
                <span>{hint}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Keypad */}
      <div className="w-full grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'backspace'].map((num) => (
          <motion.button
            key={num}
            onClick={() => handleNumberClick(num)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className={`aspect-square rounded-xl font-bold text-xl transition-all ${
              isTeamA
                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-blue-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-primary/20'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {num === 'backspace' ? (
              <span className="material-icons text-lg">backspace</span>
            ) : (
              num
            )}
          </motion.button>
        ))}
      </div>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={!userInput || disabled}
        whileHover={!disabled && userInput ? { scale: 1.02 } : {}}
        whileTap={!disabled && userInput ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-xl font-bold text-base uppercase tracking-wider transition-all ${
          isTeamA
            ? 'bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/20'
            : 'bg-primary hover:bg-amber-500 shadow-lg shadow-primary/20'
        } text-white disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        {disabled 
          ? (responseTime ? `✓ ${(responseTime/1000).toFixed(1)}s` : '...') 
          : 'Valider'}
      </motion.button>

      {/* Wrong Answer Message */}
      <AnimatePresence>
        {isWrong && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 font-bold text-xs text-center"
          >
            ✗ Mauvaise réponse
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default QuestionCard
