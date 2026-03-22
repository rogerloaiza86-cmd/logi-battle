import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const VocabularyCard = ({ 
  question, 
  team = 'A', 
  onAnswer, 
  isAnswering = false, 
  disabled = false, 
  responseTime = null,
  showCorrectAnswer = false 
}) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isWrong, setIsWrong] = useState(false)

  const isTeamA = team === 'A'

  const handleOptionSelect = (index) => {
    if (disabled || isAnswering) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (disabled || selectedOption === null) return
    
    const isCorrect = selectedOption === (question?.data?.correctOption ?? question?.correctOption)

    if (!isCorrect) {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 600)
    }

    onAnswer(isCorrect)
    if (isCorrect) {
      setSelectedOption(null)
    }
  }

  // Réinitialiser la sélection quand la question change
  useEffect(() => {
    setSelectedOption(null)
    setIsWrong(false)
  }, [question?.id])

  const getOptionStyle = (index) => {
    const isSelected = selectedOption === index
    const isCorrect = index === (question?.data?.correctOption ?? question?.correctOption)
    
    // Si on a déjà répondu et que c'est la bonne réponse
    if (showCorrectAnswer && isCorrect) {
      return 'bg-green-500/30 border-green-500 text-green-400'
    }
    
    // Si on a déjà répondu et que c'était notre mauvaise réponse
    if (showCorrectAnswer && isSelected && !isCorrect) {
      return 'bg-red-500/30 border-red-500 text-red-400'
    }
    
    // Style sélectionné
    if (isSelected) {
      return isTeamA 
        ? 'bg-blue-500/30 border-blue-500 text-blue-400' 
        : 'bg-primary/30 border-primary text-primary'
    }
    
    // Style par défaut
    return 'bg-slate-800 border-slate-700 text-gray-300 hover:border-slate-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md flex flex-col items-center gap-4"
    >
      {/* Question Card */}
      <motion.div
        className={`bg-slate-800 rounded-2xl w-full p-5 text-center border-2 transition-colors ${
          isWrong ? 'border-red-500' : isTeamA ? 'border-blue-500/30' : 'border-primary/30'
        }`}
      >
        {/* Type et Catégorie */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">
            {question?.type === 'palettisation' && '📦'}
            {question?.type === 'cout_transport' && '🚚'}
            {question?.type === 'loading_plan' && '📊'}
            {question?.type === 'vocabulaire' && '📚'}
            {question?.type === 'supply_chain' && '🧩'}
            {question?.type === 'reception' && '🚛'}
            {question?.type === 'stock' && '📦'}
            {question?.type === 'safety' && '🛡️'}
            {question?.type === 'traceability' && '📡'}
            {question?.type === 'green' && '🌍'}
            {question?.type === 'team_leader' && '👔'}
            {question?.type === 'jit' && '🏭'}
            {question?.type === 'route' && '🚛'}
            {question?.type === 'legal' && '⚖️'}
            {question?.type === 'math' && '🧮'}
          </span>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            {question?.type === 'palettisation' && 'Palettisation'}
            {question?.type === 'cout_transport' && 'Coût de Transport'}
            {question?.type === 'loading_plan' && 'Plan de Chargement'}
            {question?.type === 'vocabulaire' && `Vocabulaire • ${question?.data?.category || question?.category}`}
            {question?.type === 'supply_chain' && `Supply Chain • ${question?.data?.category || question?.category}`}
            {question?.type === 'reception' && `Réception • ${question?.data?.category || question?.category}`}
            {question?.type === 'stock' && `Stock • ${question?.data?.category || question?.category}`}
            {question?.type === 'safety' && `Sécurité • ${question?.data?.category || question?.category}`}
            {question?.type === 'traceability' && `Traçabilité • ${question?.data?.category || question?.category}`}
            {question?.type === 'green' && `Green • ${question?.data?.category || question?.category}`}
            {question?.type === 'team_leader' && `Management • ${question?.data?.category || question?.category}`}
            {question?.type === 'jit' && `JIT • ${question?.data?.category || question?.category}`}
            {question?.type === 'route' && `Route • ${question?.data?.category || question?.category}`}
            {question?.type === 'legal' && `Légal • ${question?.data?.category || question?.category}`}
            {question?.type === 'math' && `Calculs • ${question?.data?.category || question?.category}`}
          </span>
        </div>

        {/* Question / Terme à définir */}
        <div className="bg-slate-900/50 rounded-xl p-5 mb-4 min-h-[100px] flex items-center justify-center">
          {question?.data?.term || question?.term ? (
            <>
              <p className="text-slate-400 text-xs mb-1">Que signifie :</p>
              <h3 className="text-white text-xl md:text-2xl font-black tracking-wide">
                {question?.data?.term || question?.term}
              </h3>
            </>
          ) : (
            <h3 className="text-white text-lg md:text-xl font-bold leading-relaxed">
              {question?.description}
            </h3>
          )}
        </div>
        
        <p className="text-slate-400 text-sm mb-2">
          {question?.data?.term || question?.term ? "Choisissez la bonne définition :" : "Choisissez la bonne réponse :"}
        </p>

        {/* Difficulté */}
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(3)].map((_, i) => (
            <span 
              key={i} 
              className={`text-xs ${i < question?.difficulty ? 'text-primary' : 'text-slate-700'}`}
            >
              ★
            </span>
          ))}
        </div>
      </motion.div>

      {/* Options (définitions) */}
      <div className="w-full grid gap-2.5">
        {(question?.data?.options || question?.options)?.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={disabled || isAnswering}
            whileHover={!disabled && !isAnswering ? { scale: 1.02 } : {}}
            whileTap={!disabled && !isAnswering ? { scale: 0.98 } : {}}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${getOptionStyle(index)}`}
          >
            <div className="flex items-center gap-3">
              {/* Lettre A, B, C, D */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                selectedOption === index
                  ? isTeamA ? 'bg-blue-500 text-white' : 'bg-primary text-white'
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1 text-sm md:text-base">{option}</span>
              
              {/* Indicateur de sélection */}
              {selectedOption === index && !isAnswering && (
                <span className="material-icons text-lg">
                  {isTeamA ? 'radio_button_checked' : 'radio_button_checked'}
                </span>
              )}
              {showCorrectAnswer && index === (question?.data?.correctOption ?? question?.correctOption) && (
                <span className="material-icons text-green-400 text-lg">check_circle</span>
              )}
              {showCorrectAnswer && selectedOption === index && index !== question.correctOption && (
                <span className="material-icons text-red-400 text-lg">cancel</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Submit Button */}
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

      {/* Feedback */}
      <AnimatePresence>
        {isWrong && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 font-bold text-sm text-center bg-red-500/10 px-4 py-2 rounded-lg"
          >
            <span className="material-icons text-sm align-middle mr-1">error</span>
            ✗ Mauvaise réponse
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explication (affichée après réponse) */}
      <AnimatePresence>
        {showCorrectAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-slate-800/50 rounded-xl p-4 border border-slate-700"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Explication</p>
            <p className="text-sm text-gray-300">{question?.data?.explanation || question?.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default VocabularyCard
