import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import GameOver from './GameOver'
import BrandMark from './BrandMark'
import { generateNextQuestion } from '../utils/questionGenerator'
import { useGameStore } from '../hooks/useGameStore'
import { gamesService } from '../services/database'
import { playCorrect, playWrong, playRoundEnd, playVictory, isMuted, toggleMuted } from '../utils/sounds'

const ROUND_TIME = 30
const VOCABULARY_TIME = 20
const CORRECTION_TIME = 8 // secondes d'affichage de la correction entre deux rounds
const MAX_ROUNDS = 10 // chaque battle se joue en 10 questions maximum

// Difficulté progressive : rounds 1-3 faciles, 4-7 moyens, 8+ difficiles
const difficultyForRound = (round) => (round <= 3 ? 1 : round <= 7 ? 2 : 3)

const isMCQQuestion = (q) => Array.isArray(q?.data?.options) || Array.isArray(q?.options)

export const GameBoard = ({ onBack, gameMode, isHost }) => {
  const gameStore = useGameStore()
  const channelRef = useRef(null)

  const [question, setQuestion] = useState(null)
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME)
  const [roundTime, setRoundTime] = useState(ROUND_TIME)
  const [isRoundActive, setIsRoundActive] = useState(false)
  const [roundWinner, setRoundWinner] = useState(null)
  const [showCorrection, setShowCorrection] = useState(false)
  const [roundNumber, setRoundNumber] = useState(1)
  const [muted, setMutedState] = useState(isMuted())
  const [logs, setLogs] = useState([])

  // Réponses du round courant — en ref pour rester correctes dans les
  // callbacks broadcast (qui capturent la première render sinon).
  const answersRef = useRef({ A: null, B: null })
  const isRoundActiveRef = useRef(false)
  const roundStartTime = useRef(null)
  const questionRef = useRef(null)
  const roundNumberRef = useRef(1)
  // Statuts dérivés pour l'UI
  const [teamAAnswer, setTeamAAnswer] = useState(null)
  const [teamBAnswer, setTeamBAnswer] = useState(null)

  const isFinished = gameStore.gameStatus === 'finished'

  // Persistance des scores côté hôte (mode multijoueur)
  useEffect(() => {
    if (isHost && gameStore.gameId) {
      gamesService.updateGameScore(
        gameStore.gameId,
        gameStore.teamA.score,
        gameStore.teamB.score,
        gameStore.ropePosition
      ).catch(console.error)
    }
  }, [gameStore.teamA.score, gameStore.teamB.score, gameStore.ropePosition, isHost, gameStore.gameId])

  useEffect(() => {
    if (isHost && gameStore.gameId) {
      const channel = gamesService.getGameChannel(gameStore.gameId)
      if (channel) {
        channel.on('broadcast', { event: 'player_answer' }, ({ payload }) => {
          handleAnswer(payload.team, payload.isCorrect, payload.playerName)
        }).subscribe()
        channelRef.current = channel
      }
    }

    startNewRound(1)

    return () => {
      if (isHost && gameStore.gameId) {
        gamesService.releaseGameChannel(gameStore.gameId)
        channelRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    let interval
    if (isRoundActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRoundActive) {
      endRound()
    }
    return () => clearInterval(interval)
  }, [isRoundActive, timeLeft])

  const broadcast = (event, payload) => {
    if (channelRef.current) {
      channelRef.current.send({ type: 'broadcast', event, payload })
    }
  }

  const startNewRound = (round) => {
    const newQuestion = {
      ...generateNextQuestion(gameMode, difficultyForRound(round)),
      id: `q_${Date.now()}`,
    }
    questionRef.current = newQuestion
    setQuestion(newQuestion)
    const time = newQuestion.type === 'vocabulaire' ? VOCABULARY_TIME : ROUND_TIME
    setRoundTime(time)
    setTimeLeft(time)
    setIsRoundActive(true)
    isRoundActiveRef.current = true
    answersRef.current = { A: null, B: null }
    setTeamAAnswer(null)
    setTeamBAnswer(null)
    setRoundWinner(null)
    setShowCorrection(false)
    roundStartTime.current = Date.now()

    broadcast('new_question', { questionData: newQuestion, time })
  }

  const endRound = () => {
    if (!isRoundActiveRef.current) return
    isRoundActiveRef.current = false
    setIsRoundActive(false)

    const a = answersRef.current.A
    const b = answersRef.current.B
    let winner = null
    if (a?.correct && b?.correct) {
      winner = a.time < b.time ? 'A' : 'B'
    } else if (a?.correct) {
      winner = 'A'
    } else if (b?.correct) {
      winner = 'B'
    }

    setRoundWinner(winner)
    setShowCorrection(true)
    playRoundEnd()

    const q = questionRef.current
    broadcast('round_end', {
      winner,
      correctAnswer: getCorrectAnswerText(q),
      explanation: q?.explanation || q?.data?.explanation || null,
    })

    if (winner === 'A') {
      gameStore.incrementTeamAScore(1)
      addLog(gameStore.teamA.name, 'remporte le round !', 'A', '+1')
    } else if (winner === 'B') {
      gameStore.incrementTeamBScore(1)
      addLog(gameStore.teamB.name, 'remporte le round !', 'B', '+1')
    } else {
      addLog('Personne', 'n\'a trouvé la bonne réponse.', 'A', '0')
    }

    setTimeout(() => {
      // gameStatus est mis à jour de façon synchrone par incrementTeam*Score ;
      // la battle s'arrête aussi après MAX_ROUNDS questions (vainqueur au score).
      const reachedMaxRounds = roundNumberRef.current >= MAX_ROUNDS
      if (reachedMaxRounds && useGameStore.getState().gameStatus !== 'finished') {
        gameStore.setGameStatus('finished')
      }
      const status = reachedMaxRounds ? 'finished' : useGameStore.getState().gameStatus
      if (status !== 'finished') {
        setRoundNumber((prev) => {
          const next = prev + 1
          roundNumberRef.current = next
          startNewRound(next)
          return next
        })
      } else {
        setShowCorrection(false)
        playVictory()
        const finalState = useGameStore.getState()
        broadcast('game_over', {
          winner:
            finalState.ropePosition >= 100 ? 'A'
            : finalState.ropePosition <= -100 ? 'B'
            : finalState.teamA.score > finalState.teamB.score ? 'A'
            : finalState.teamB.score > finalState.teamA.score ? 'B'
            : null,
          teamAScore: finalState.teamA.score,
          teamBScore: finalState.teamB.score,
        })
        if (isHost && gameStore.gameId) {
          gamesService.updateGameStatus(gameStore.gameId, 'finished').catch(console.error)
        }
      }
    }, CORRECTION_TIME * 1000)
  }

  const addLog = (user, action, team, points) => {
    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    setLogs((prev) => [{ id: Date.now() + Math.random(), user, action, team, points, time }, ...prev.slice(0, 4)])
  }

  const handleAnswer = (team, isCorrect, playerName = null) => {
    // Anti-triche : aucune réponse acceptée hors round actif (timer écoulé inclus)
    if (!isRoundActiveRef.current) return
    // Une seule réponse par équipe et par round
    if (answersRef.current[team]) return

    const responseTime = Date.now() - roundStartTime.current
    const entry = { correct: isCorrect, time: responseTime, playerName }
    answersRef.current[team] = entry

    if (team === 'A') setTeamAAnswer(entry)
    else setTeamBAnswer(entry)

    if (isCorrect) playCorrect()
    else playWrong()

    const teamName = playerName || (team === 'A' ? gameStore.teamA.name : gameStore.teamB.name)
    addLog(
      teamName,
      isCorrect ? `a répondu juste en ${(responseTime / 1000).toFixed(1)}s !` : 'a donné une mauvaise réponse.',
      team,
      isCorrect ? '+' : '✗'
    )

    if (answersRef.current.A && answersRef.current.B) {
      endRound()
    }
  }

  const getCorrectAnswerText = (q) => {
    if (!q) return ''
    const options = q.data?.options || q.options
    if (Array.isArray(options)) {
      const idx = q.data?.correctOption ?? q.correctOption
      return options[idx] ?? ''
    }
    return String(q.correctAnswer ?? '')
  }

  const getWinner = () => {
    if (gameStore.ropePosition >= 100) return 'A'
    if (gameStore.ropePosition <= -100) return 'B'
    if (gameStore.teamA.score > gameStore.teamB.score) return 'A'
    if (gameStore.teamB.score > gameStore.teamA.score) return 'B'
    return null
  }

  const handleRestart = () => {
    gameStore.resetGame()
    setRoundNumber(1)
    roundNumberRef.current = 1
    onBack()
  }

  const handleToggleMute = () => {
    setMutedState(toggleMuted())
  }

  const timerColor = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#eab308' : '#f4b942'
  const isMCQ = isMCQQuestion(question)

  const renderTeamCard = (team) => {
    const answer = team === 'A' ? teamAAnswer : teamBAnswer
    const disabled = !isRoundActive || !!answer
    const cardProps = {
      question,
      team,
      onAnswer: (isCorrect) => handleAnswer(team, isCorrect),
      disabled,
      responseTime: answer?.time ?? null,
    }
    return isMCQ
      ? <VocabularyCard {...cardProps} showCorrectAnswer={showCorrection} />
      : <QuestionCard {...cardProps} enableKeyboard={false} />
  }

  return (
    <div className="min-h-screen geronimo-screen flex flex-col">
      {/* Game Over */}
      {isFinished && !showCorrection && (
        <GameOver
          winner={getWinner()}
          teamAScore={gameStore.teamA.score}
          teamBScore={gameStore.teamB.score}
          onRestart={handleRestart}
        />
      )}

      {/* Header */}
      <header className="bg-[#0f2539]/92 border-b border-white/5 px-8 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandMark nameClassName="text-[1.35rem]" />
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleRestart}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-500/10"
              title="Arrêter la partie"
            >
              <span className="material-icons text-lg">stop</span>
              <span className="text-sm font-medium hidden sm:inline">Arrêter</span>
            </button>
            <button
              onClick={handleToggleMute}
              className="text-gray-500 hover:text-white transition-colors"
              title={muted ? 'Activer le son' : 'Couper le son'}
            >
              <span className="material-icons">{muted ? 'volume_off' : 'volume_up'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Score Bar */}
      <div className="bg-[#0f2539]/92 px-8 py-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* Team A */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7fa99b]/20 flex items-center justify-center border border-[#7fa99b]/30">
              <span className="material-icons text-[#7fa99b]">local_shipping</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{gameStore.teamA.name}</p>
              <p className="text-3xl font-black text-[#7fa99b]">{gameStore.teamA.score.toLocaleString()}</p>
            </div>
          </div>

          {/* Timer central */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#234a68" strokeWidth="10" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={timerColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="351.86"
                  strokeDashoffset={351.86 - (timeLeft / roundTime) * 351.86}
                  className="transition-all duration-1000"
                  style={{ filter: `drop-shadow(0 0 6px ${timerColor})` }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white">{timeLeft}</span>
              </div>
            </div>
            <span className="mt-1 px-3 py-1 bg-[#f4b942] text-[#17314a] text-[10px] font-bold uppercase tracking-wider rounded-full">
              Round {roundNumber}/{MAX_ROUNDS}
            </span>
          </div>

          {/* Team B */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{gameStore.teamB.name}</p>
              <p className="text-3xl font-black text-[#f4b942]">{gameStore.teamB.score.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#f4b942]/20 flex items-center justify-center border border-[#f4b942]/30">
              <span className="material-icons text-[#f4b942]">bolt</span>
            </div>
          </div>
        </div>

        {/* Corde de traction */}
        <div className="relative h-10 bg-[#1d3d59] rounded-xl overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#7fa99b] to-[#7fa99b]/80 transition-all duration-500 flex items-center px-4"
            style={{ width: `${Math.max(0, 50 + gameStore.ropePosition / 2)}%` }}
          >
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
              {gameStore.ropePosition > 0 ? 'DOMINE' : ''}
            </span>
          </div>
          <div
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#f4b942] to-[#f4b942]/80 transition-all duration-500 flex items-center justify-end px-4"
            style={{ width: `${Math.max(0, 50 - gameStore.ropePosition / 2)}%` }}
          >
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
              {gameStore.ropePosition < 0 ? 'REPRISE' : ''}
            </span>
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform -translate-x-1/2" />
        </div>
      </div>

      {/* Zone de jeu */}
      <main className="flex-1 p-6">
        {/* Correction entre deux rounds */}
        <AnimatePresence>
          {showCorrection && question && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mb-6 bg-[#1d3d59] border border-[#f4b942]/40 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="material-icons text-[#f4b942]">school</span>
                <span className="text-xs font-bold text-[#f4b942] uppercase tracking-wider">
                  Correction — {roundWinner ? `Round gagné par l'équipe ${roundWinner}` : 'Round nul'}
                </span>
              </div>
              <p className="text-white font-bold mb-2">
                Bonne réponse : <span className="text-green-400">{getCorrectAnswerText(question)}</span>
              </p>
              {(question.explanation || question.data?.explanation) && (
                <p className="text-sm text-gray-300 leading-relaxed">
                  {question.explanation || question.data?.explanation}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-3">Round suivant dans quelques secondes…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {isHost ? (
          /* Mode multijoueur : l'écran hôte affiche la question, les élèves répondent sur mobile */
          <div className="max-w-3xl mx-auto">
            {question && (
              <div className="bg-[#1d3d59] rounded-3xl p-8 border border-white/5 text-center">
                <p className="text-[#7fa99b] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  {question.title}
                </p>
                <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                  {question.description}
                </h2>
                {isMCQ && (
                  <div className="grid grid-cols-2 gap-4 text-left">
                    {(question.data?.options || question.options).map((option, index) => (
                      <div
                        key={index}
                        className={`relative bg-[#234a68] rounded-2xl p-5 border ${
                          showCorrection && index === (question.data?.correctOption ?? question.correctOption)
                            ? 'border-green-400'
                            : 'border-transparent'
                        }`}
                      >
                        <span className="absolute top-4 left-4 text-gray-500 text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <p className="text-white font-medium pl-6">{option}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex justify-center gap-8 text-sm">
                  <span className={teamAAnswer ? 'text-green-400' : 'text-gray-500'}>
                    Équipe A : {teamAAnswer ? '✓ a répondu' : 'en attente…'}
                  </span>
                  <span className={teamBAnswer ? 'text-green-400' : 'text-gray-500'}>
                    Équipe B : {teamBAnswer ? '✓ a répondu' : 'en attente…'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Mode local : split-screen, une carte par équipe */
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
              <p className="text-[#7fa99b] text-sm font-bold uppercase tracking-wider mb-3">
                {gameStore.teamA.name}
              </p>
              {question && renderTeamCard('A')}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#f4b942] text-sm font-bold uppercase tracking-wider mb-3">
                {gameStore.teamB.name}
              </p>
              {question && renderTeamCard('B')}
            </div>
          </div>
        )}

        {/* Journal */}
        {logs.length > 0 && (
          <div className="max-w-3xl mx-auto mt-8 bg-[#1d3d59]/60 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Journal d'affrontement</span>
            </div>
            <div className="space-y-2">
              {logs.map((log) => (
                <p key={log.id} className="text-sm text-gray-400">
                  <span className={`font-bold ${log.team === 'A' ? 'text-[#7fa99b]' : 'text-[#f4b942]'}`}>
                    {log.user}
                  </span>{' '}
                  {log.action} <span className="text-gray-600">({log.time})</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default GameBoard
