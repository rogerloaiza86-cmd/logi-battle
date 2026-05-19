import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gamesService } from '../services/database'
import BrandMark from './BrandMark'

export const PlayerGame = ({ gameId, playerName, team }) => {
  const channelRef = useRef(null)
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, playing, answered, finished
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null) // correct, wrong, null

  const isTeamA = team === 'A'
  const hasOptions = currentQuestion?.options?.length > 0

  // Écoute en temps réel Supabase
  useEffect(() => {
    const channel = gamesService.getGameChannel(gameId)
    let isMounted = true

    if (channel) {
      channel.on('broadcast', { event: 'new_question' }, ({ payload }) => {
        if (!isMounted) return

        const questionData = payload.questionData
        setCurrentQuestion({
          question: questionData.description,
          answer: questionData.data?.correctOption ?? questionData.correctOption ?? questionData.correctAnswer ?? questionData.answer,
          hint: questionData.hints?.[0] || '',
          type: questionData.type,
          category: questionData.data?.category || questionData.category || '',
          options: questionData.data?.options || questionData.options || null,
        })
        setTimeLeft(payload.time || 30)
        setGameStatus('playing')
        setUserAnswer('')
        setResult(null)
      })

      channel.on('broadcast', { event: 'round_end' }, ({ payload }) => {
        if (!isMounted) return
        setGameStatus('waiting')
      })

      channel.subscribe()
      channelRef.current = channel
    }

    return () => {
      isMounted = false
      channelRef.current = null
      gamesService.removeGameChannel(gameId)?.catch(console.error)
    }
  }, [gameId])

  // Timer
  useEffect(() => {
    let interval
    if (gameStatus === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      handleSubmit()
    }
    return () => clearInterval(interval)
  }, [gameStatus, timeLeft])

  const handleNumberClick = (num) => {
    if (gameStatus !== 'playing') return
    
    if (num === 'C') {
      setUserAnswer('')
    } else if (num === 'backspace') {
      setUserAnswer(userAnswer.slice(0, -1))
    } else {
      if (userAnswer.length < 6) {
        setUserAnswer(userAnswer + num)
      }
    }
  }

  const handleOptionSelect = (index) => {
    if (gameStatus !== 'playing') return
    setUserAnswer(String(index))
  }

  const handleSubmit = () => {
    if (userAnswer === '' || gameStatus !== 'playing') return
    
    // Pour vocabulaire ou culture (lettres A,B,C,D transformées potentiellement) ou chiffres
    // La logique existante comparait parseInt avec number. Ajustons si qcm.
    const isCorrect = 
      String(userAnswer).trim().toLowerCase() === String(currentQuestion?.answer).trim().toLowerCase() ||
      parseInt(userAnswer) === currentQuestion?.answer
      
    setResult(isCorrect ? 'correct' : 'wrong')
    setGameStatus('answered')
    
    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    // Envoyer la réponse à l'hôte
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'player_answer',
        payload: { team, isCorrect, playerName }
      })
    }
  }

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-red-500'
    if (timeLeft <= 10) return 'text-amber-500'
    return 'text-white'
  }

  // Écran d'attente
  if (gameStatus === 'waiting') {
    return (
      <div className="min-h-screen geronimo-screen flex flex-col items-center justify-center p-6">
        <BrandMark className="mb-8" nameClassName="text-2xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-xl font-bold text-white mb-2">En attente du professeur...</h2>
        <p className="text-gray-400 text-center">
          Bonjour <span className={isTeamA ? 'text-blue-400' : 'text-primary'}>{playerName}</span> !
          <br />La partie va bientôt commencer.
        </p>
        <div className="mt-8 px-4 py-2 bg-slate-800 rounded-lg">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isTeamA ? 'bg-blue-500' : 'bg-primary'}`}></span>
          <span className="text-gray-400 text-sm">Équipe {team}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen geronimo-screen flex flex-col">
      {/* Header */}
      <header className={`p-4 border-b ${isTeamA ? 'border-blue-500/20 bg-blue-500/5' : 'border-primary/20 bg-primary/5'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTeamA ? 'bg-blue-500' : 'bg-primary'}`}>
              <span className="material-icons text-white text-sm">person</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">{playerName}</p>
              <p className={`text-xs ${isTeamA ? 'text-blue-400' : 'text-primary'}`}>Équipe {team}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-white">{score}</p>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </div>
      </header>

      {/* Timer */}
      {gameStatus === 'playing' && (
        <div className="px-4 py-2">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-amber-500' : isTeamA ? 'bg-blue-500' : 'bg-primary'}`}
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </div>
          <p className={`text-center text-sm mt-1 font-bold ${getTimerColor()}`}>
            {timeLeft}s
          </p>
        </div>
      )}

      {/* Question */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {gameStatus === 'playing' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-sm"
            >
              {/* Question Card */}
              <div className="bg-slate-800 rounded-2xl p-5 mb-4 border border-white/10">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentQuestion?.type === 'vocabulaire' ? '📚 Vocabulaire' : '🧠 Culture Générale'}
                  {currentQuestion?.category && ` • ${currentQuestion.category}`}
                </span>
                <h2 className="text-lg font-bold text-white mt-2 leading-snug">
                  {currentQuestion?.question}
                </h2>
                {currentQuestion?.hint && (
                  <p className="text-xs text-gray-500 mt-3 italic">
                    💡 {currentQuestion.hint}
                  </p>
                )}
              </div>

              {/* Answer Display */}
              <div className={`bg-slate-900 rounded-xl p-4 mb-4 border-2 text-center ${
                isTeamA ? 'border-blue-500/30' : 'border-primary/30'
              }`}>
                <span className={`text-4xl font-black ${userAnswer ? 'text-white' : 'text-gray-600'}`}>
                  {hasOptions && userAnswer !== ''
                    ? String.fromCharCode(65 + Number(userAnswer))
                    : userAnswer || '---'}
                </span>
              </div>

              {hasOptions ? (
                <div className="grid gap-2">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = userAnswer === String(index)

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        whileTap={{ scale: 0.98 }}
                        className={`rounded-xl p-3 text-left border transition-colors ${
                          isSelected
                            ? isTeamA
                              ? 'bg-blue-500/30 border-blue-500 text-blue-100'
                              : 'bg-primary/30 border-primary text-primary'
                            : 'bg-slate-800 border-slate-700 text-white'
                        }`}
                      >
                        <span className="font-black mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </motion.button>
                    )
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'backspace'].map((num) => (
                    <motion.button
                      key={num}
                      onClick={() => handleNumberClick(num)}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-xl font-bold text-xl transition-colors ${
                        isTeamA
                          ? 'bg-slate-800 active:bg-blue-500/30 text-white'
                          : 'bg-slate-800 active:bg-primary/30 text-white'
                      }`}
                    >
                      {num === 'backspace' ? (
                        <span className="material-icons">backspace</span>
                      ) : (
                        num
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={!userAnswer}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-3 py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all ${
                  isTeamA
                    ? 'bg-blue-500 disabled:bg-slate-800 text-white'
                    : 'bg-primary disabled:bg-slate-800 text-white'
                }`}
              >
                Valider
              </motion.button>
            </motion.div>
          )}

          {gameStatus === 'answered' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <div className={`text-6xl mb-4 ${result === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                {result === 'correct' ? '✓' : '✗'}
              </div>
              <h2 className={`text-2xl font-bold ${result === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                {result === 'correct' ? 'Bonne réponse !' : 'Mauvaise réponse'}
              </h2>
              <p className="text-gray-400 mt-2">
                La réponse était : <span className="text-white font-bold">{currentQuestion?.answer}</span>
              </p>
              <p className="text-gray-500 text-sm mt-4">Prochaine question dans quelques secondes...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-gray-500 border-t border-white/5">
        <p>Geronimo Coop Mobile • Partie {gameId}</p>
      </footer>
    </div>
  )
}

export default PlayerGame
