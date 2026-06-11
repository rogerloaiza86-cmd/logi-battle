import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gamesService } from '../services/database'
import BrandMark from './BrandMark'
import { playCorrect, playWrong, playVictory } from '../utils/sounds'

export const PlayerGame = ({ gameId, playerName, team }) => {
  const channelRef = useRef(null)
  const statusRef = useRef('waiting')
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, playing, answered, timeout, finished
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [roundTime, setRoundTime] = useState(30)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null) // correct, wrong, null
  const [correction, setCorrection] = useState(null) // { correctAnswer, explanation, winner }
  const [finalResult, setFinalResult] = useState(null) // { winner, teamAScore, teamBScore }
  const [connectionLost, setConnectionLost] = useState(false)

  const isTeamA = team === 'A'

  const setStatus = (s) => {
    statusRef.current = s
    setGameStatus(s)
  }

  // Écoute temps réel Supabase (broadcast) + présence dans le lobby
  useEffect(() => {
    const channel = gamesService.getGameChannel(gameId)
    if (channel) {
      channel
        .on('broadcast', { event: 'new_question' }, ({ payload }) => {
          setCurrentQuestion(payload.questionData)
          setRoundTime(payload.time || 30)
          setTimeLeft(payload.time || 30)
          setUserAnswer('')
          setSelectedOption(null)
          setResult(null)
          setCorrection(null)
          setStatus('playing')
        })
        .on('broadcast', { event: 'round_end' }, ({ payload }) => {
          setCorrection(payload)
          if (statusRef.current === 'playing') setStatus('timeout')
        })
        .on('broadcast', { event: 'game_over' }, ({ payload }) => {
          setFinalResult(payload)
          setStatus('finished')
          playVictory()
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setConnectionLost(false)
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            setConnectionLost(true)
          }
        })
      channelRef.current = channel
    }

    // Présence : signaler ce joueur à l'écran hôte
    const lobby = gamesService.getLobbyChannel(gameId, `${playerName}_${team}`)
    if (lobby) {
      lobby.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          lobby.track({ playerName, team })
        }
      })
    }

    return () => {
      gamesService.releaseGameChannel(gameId)
      gamesService.releaseLobbyChannel(gameId)
      channelRef.current = null
    }
  }, [gameId])

  // Resynchronisation après une coupure réseau : on relit l'état de la partie
  useEffect(() => {
    if (!connectionLost) return
    const interval = setInterval(async () => {
      try {
        const game = await gamesService.getGame(gameId)
        if (game) setConnectionLost(false)
        if (game?.status === 'finished') {
          setFinalResult({
            winner: game.winner,
            teamAScore: game.teamA_score,
            teamBScore: game.teamB_score,
          })
          setStatus('finished')
        }
      } catch {
        // toujours hors-ligne, on réessaie
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [connectionLost, gameId])

  // Timer
  useEffect(() => {
    let interval
    if (gameStatus === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      setStatus('timeout')
    }
    return () => clearInterval(interval)
  }, [gameStatus, timeLeft])

  const isMCQ = Array.isArray(currentQuestion?.data?.options) || Array.isArray(currentQuestion?.options)
  const options = currentQuestion?.data?.options || currentQuestion?.options || []
  const correctOption = currentQuestion?.data?.correctOption ?? currentQuestion?.correctOption

  const handleNumberClick = (num) => {
    if (gameStatus !== 'playing') return

    if (num === 'C') {
      setUserAnswer('')
    } else if (num === 'backspace') {
      setUserAnswer(userAnswer.slice(0, -1))
    } else if (userAnswer.length < 6) {
      setUserAnswer(userAnswer + num)
    }
  }

  const sendAnswer = (isCorrect) => {
    setResult(isCorrect ? 'correct' : 'wrong')
    setStatus('answered')

    if (isCorrect) {
      setScore((prev) => prev + 1)
      playCorrect()
    } else {
      playWrong()
    }

    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'player_answer',
        payload: { team, isCorrect, playerName, answeredAt: Date.now() },
      })
    }
  }

  const handleSubmit = () => {
    if (gameStatus !== 'playing') return

    if (isMCQ) {
      if (selectedOption === null) return
      sendAnswer(selectedOption === correctOption)
    } else {
      if (!userAnswer) return
      const isCorrect = parseInt(userAnswer, 10) === Number(currentQuestion?.correctAnswer)
      sendAnswer(isCorrect)
    }
  }

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-red-500'
    if (timeLeft <= 10) return 'text-amber-500'
    return 'text-white'
  }

  // Écran de fin de partie
  if (gameStatus === 'finished') {
    const won = finalResult?.winner === team
    return (
      <div className="min-h-screen geronimo-screen flex flex-col items-center justify-center p-6 text-center">
        <BrandMark className="mb-8" nameClassName="text-2xl" />
        <div className="text-6xl mb-4">{won ? '🏆' : '💪'}</div>
        <h2 className={`text-3xl font-black mb-2 ${won ? 'text-green-400' : 'text-gray-300'}`}>
          {won ? 'VICTOIRE !' : 'Défaite…'}
        </h2>
        <p className="text-gray-400 mb-6">
          Équipe A {finalResult?.teamAScore ?? '-'} — {finalResult?.teamBScore ?? '-'} Équipe B
        </p>
        <div className="bg-slate-800 rounded-xl px-6 py-4">
          <p className="text-sm text-gray-400">Ton score personnel</p>
          <p className="text-3xl font-black text-white">{score} pts</p>
        </div>
      </div>
    )
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
        {connectionLost && (
          <p className="mt-4 text-amber-400 text-sm">⚠️ Connexion instable, reconnexion en cours…</p>
        )}
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
        {connectionLost && (
          <p className="mt-2 text-amber-400 text-xs text-center">⚠️ Connexion instable, reconnexion…</p>
        )}
      </header>

      {/* Timer */}
      {gameStatus === 'playing' && (
        <div className="px-4 py-2">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-amber-500' : isTeamA ? 'bg-blue-500' : 'bg-primary'}`}
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / roundTime) * 100}%` }}
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
                  {currentQuestion?.title || 'Question'}
                </span>
                <h2 className="text-lg font-bold text-white mt-2 leading-snug">
                  {currentQuestion?.data?.term
                    ? `Que signifie : ${currentQuestion.data.term} ?`
                    : currentQuestion?.description}
                </h2>
                {currentQuestion?.hints?.[0] && (
                  <p className="text-xs text-gray-500 mt-3 italic">
                    💡 {currentQuestion.hints[0]}
                  </p>
                )}
              </div>

              {isMCQ ? (
                /* QCM : boutons d'options */
                <div className="space-y-2 mb-4">
                  {options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedOption(index)}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-3.5 rounded-xl border-2 text-left text-sm transition-all ${
                        selectedOption === index
                          ? isTeamA
                            ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                            : 'bg-primary/20 border-primary text-primary'
                          : 'bg-slate-800 border-slate-700 text-gray-300'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <>
                  {/* Saisie numérique */}
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
                </>
              )}

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={isMCQ ? selectedOption === null : !userAnswer}
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

          {(gameStatus === 'answered' || gameStatus === 'timeout') && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center max-w-sm w-full"
            >
              {gameStatus === 'timeout' && !result ? (
                <>
                  <div className="text-6xl mb-4 text-amber-500">⏱</div>
                  <h2 className="text-2xl font-bold text-amber-400">Temps écoulé !</h2>
                </>
              ) : (
                <>
                  <div className={`text-6xl mb-4 ${result === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                    {result === 'correct' ? '✓' : '✗'}
                  </div>
                  <h2 className={`text-2xl font-bold ${result === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                    {result === 'correct' ? 'Bonne réponse !' : 'Mauvaise réponse'}
                  </h2>
                </>
              )}

              {/* Correction pédagogique envoyée par l'hôte */}
              {correction && (
                <div className="mt-6 bg-slate-800 rounded-xl p-4 text-left border border-white/10">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Correction</p>
                  <p className="text-white text-sm font-bold mb-2">
                    Bonne réponse : <span className="text-green-400">{correction.correctAnswer}</span>
                  </p>
                  {correction.explanation && (
                    <p className="text-gray-400 text-sm leading-relaxed">{correction.explanation}</p>
                  )}
                </div>
              )}

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
