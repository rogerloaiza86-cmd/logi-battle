import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandMark from './BrandMark'

export const PlayerGame = ({ room, gameId, playerName, team }) => {
  const roomRef = useRef(room)
  const questionIdRef = useRef(null)
  const [gameStatus, setGameStatus] = useState('waiting')
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null)

  const isTeamA = team === 'A'
  roomRef.current = room

  useEffect(() => {
    if (!room) return undefined
    const off = room.on('new_question', ({ payload }) => {
      const data = payload.questionData
      if (!data?.id || data.id === questionIdRef.current) return
      questionIdRef.current = data.id
      setCurrentQuestion({
        id: data.id,
        question: data.description,
        options: data.data?.options || null,
        isMCQ: Boolean(data.isMCQ || data.data?.options),
        hint: data.hints?.[0] || '',
        type: data.type,
        category: data.themeEleve || data.data?.category || data.referentiel?.competence || '',
        time: payload.time || 30,
      })
      setTimeLeft(Number(payload.time) > 0 ? Number(payload.time) : 30)
      setGameStatus('playing')
      setUserAnswer('')
      setResult(null)
    })
    room.send('hello', { name: playerName, team })
    return off
  }, [room, playerName, team])

  // Timer
  useEffect(() => {
    let interval
    if (gameStatus === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      setGameStatus('answered')
      setResult('timeout')
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

  const sendAnswer = (answer) => {
    if (gameStatus !== 'playing' || answer == null || answer === '') return
    const questionId = currentQuestion?.id
    if (!questionId) return
    setGameStatus('answered')
    setResult('sent')
    roomRef.current?.send('player_answer', { team, answer, playerName, questionId })
  }

  const handleSubmit = () => {
    if (!userAnswer || gameStatus !== 'playing') return
    sendAnswer(currentQuestion?.isMCQ ? Number(userAnswer) : userAnswer)
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
              animate={{ width: `${(timeLeft / (currentQuestion?.time || 30)) * 100}%` }}
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
                  {currentQuestion?.category || 'Référentiel logistique'}
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

              {currentQuestion?.isMCQ ? (
                <div className="grid gap-3 mb-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={`${currentQuestion.id}-${index}`}
                      type="button"
                      onClick={() => sendAnswer(index)}
                      className="w-full min-h-14 text-left px-4 py-4 rounded-2xl bg-slate-800 border border-white/10 text-white text-lg"
                    >
                      <span className="font-black mr-3">{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
              <>
              <div className={`bg-slate-900 rounded-xl p-4 mb-4 border-2 text-center ${
                isTeamA ? 'border-blue-500/30' : 'border-primary/30'
              }`}>
                <span className={`text-4xl font-black ${userAnswer ? 'text-white' : 'text-gray-600'}`}>
                  {userAnswer || '---'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'backspace'].map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    whileTap={{ scale: 0.95 }}
                    className={`min-h-16 aspect-square rounded-2xl font-bold text-2xl transition-colors ${
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

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={!userAnswer}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-3 min-h-14 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all ${
                  isTeamA
                    ? 'bg-blue-500 disabled:bg-slate-800 text-white'
                    : 'bg-primary disabled:bg-slate-800 text-white'
                }`}
              >
                Valider
              </motion.button>
              </>
              )}
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
              <div className={`text-6xl mb-4 ${result === 'timeout' ? 'text-amber-400' : 'text-[#7fa99b]'}`}>
                {result === 'timeout' ? '…' : '✓'}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {result === 'sent' ? 'Réponse envoyée' : 'Temps écoulé'}
              </h2>
              <p className="text-gray-400 mt-2">L'écran de la classe valide la manche.</p>
              <p className="text-gray-500 text-sm mt-4">Prochaine question dans quelques secondes...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-gray-500 border-t border-white/5">
        <p>Poste élève · code {gameId}</p>
      </footer>
    </div>
  )
}

export default PlayerGame
