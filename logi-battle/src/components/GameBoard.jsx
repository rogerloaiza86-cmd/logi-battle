import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RopeAnimation from './RopeAnimation'
import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import BrandMark from './BrandMark'
import { generateNextQuestion } from '../utils/questionGenerator'
import { useGameStore } from '../hooks/useGameStore'
import { gamesService } from '../services/database'

const ROUND_TIME = 30
const VOCABULARY_TIME = 20

export const GameBoard = ({ onBack, gameMode, isHost }) => {
  const gameStore = useGameStore()
  const channelRef = useRef(null)
  
  const [question, setQuestion] = useState(null)
  const [showIncorrect, setShowIncorrect] = useState(false)
  const [particles, setParticles] = useState([])
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME)
  const [roundTime, setRoundTime] = useState(ROUND_TIME)
  const [isRoundActive, setIsRoundActive] = useState(true)
  const [teamAStatus, setTeamAStatus] = useState('playing')
  const [teamBStatus, setTeamBStatus] = useState('playing')
  const [teamATime, setTeamATime] = useState(null)
  const [teamBTime, setTeamBTime] = useState(null)
  const [roundWinner, setRoundWinner] = useState(null)
  const [bothTeamsAnswered, setBothTeamsAnswered] = useState(false)
  const [roundNumber, setRoundNumber] = useState(1)
  const [logs, setLogs] = useState([
    { id: 1, user: 'User_42', action: 'a répondu correctement !', team: 'A', points: '+250', time: '14:30' },
    { id: 2, user: 'CargoKing', action: 'a raté le timing.', team: 'B', points: '-50', time: '14:28' },
    { id: 3, user: 'LogiMaster', action: 'est en série de 5 !', team: 'A', points: 'Bonus Combo Actif', time: '14:25' },
  ])
  const roundStartTime = useRef(null)
  const roundEndTimeoutRef = useRef(null)
  const questionRef = useRef(null)
  const gameStatusRef = useRef(gameStore.gameStatus)
  const roundStateRef = useRef({
    teamAStatus: 'playing',
    teamBStatus: 'playing',
    teamATime: null,
    teamBTime: null,
    ended: false,
  })

  useEffect(() => {
    gameStatusRef.current = gameStore.gameStatus
  }, [gameStore.gameStatus])

  // Enregistrement des scores dans la BD en temps réel
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
    // Configuration du Broadcast
    let shouldStartRoundImmediately = true
    if (isHost && gameStore.gameId) {
      const channel = gamesService.getGameChannel(gameStore.gameId)
      if (channel) {
        shouldStartRoundImmediately = false
        channel.on('broadcast', { event: 'player_answer' }, ({ payload }) => {
          handleAnswer(payload.team, payload.isCorrect)
        })
        channelRef.current = channel
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            startNewRound()
          }
        })
      }
    }

    if (shouldStartRoundImmediately) {
      startNewRound()
    }
    
    return () => {
      if (roundEndTimeoutRef.current) {
        clearTimeout(roundEndTimeoutRef.current)
      }
      if (gameStore.gameId) {
        gamesService.removeGameChannel(gameStore.gameId)
      }
      channelRef.current = null
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

  const startNewRound = () => {
    if (roundEndTimeoutRef.current) {
      clearTimeout(roundEndTimeoutRef.current)
      roundEndTimeoutRef.current = null
    }
    const newQuestion = {
      ...generateNextQuestion(gameMode),
      id: `q_${Date.now()}`,
    }
    setQuestion(newQuestion)
    questionRef.current = newQuestion
    const time = newQuestion.type === 'vocabulaire' ? VOCABULARY_TIME : ROUND_TIME
    setRoundTime(time)
    setTimeLeft(time)
    setIsRoundActive(true)
    setTeamAStatus('playing')
    setTeamBStatus('playing')
    setTeamATime(null)
    setTeamBTime(null)
    setRoundWinner(null)
    setBothTeamsAnswered(false)
    roundStateRef.current = {
      teamAStatus: 'playing',
      teamBStatus: 'playing',
      teamATime: null,
      teamBTime: null,
      ended: false,
    }
    roundStartTime.current = Date.now()

    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'new_question',
        payload: {
          questionData: newQuestion,
          time: time
        }
      })
    }
  }

  const endRound = (roundSnapshot = roundStateRef.current) => {
    if (roundStateRef.current.ended) return
    roundStateRef.current = { ...roundSnapshot, ended: true }
    setIsRoundActive(false)
    setBothTeamsAnswered(true)
    
    let winner = null
    
    if (roundSnapshot.teamAStatus === 'correct' && roundSnapshot.teamBStatus === 'correct') {
      winner = roundSnapshot.teamATime < roundSnapshot.teamBTime ? 'A' : 'B'
    } else if (roundSnapshot.teamAStatus === 'correct') {
      winner = 'A'
    } else if (roundSnapshot.teamBStatus === 'correct') {
      winner = 'B'
    }
    
    setRoundWinner(winner)
    
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'round_end',
        payload: {
          winner: winner,
          correctAnswer: questionRef.current?.correctAnswer ?? questionRef.current?.answer
        }
      })
    }

    if (winner === 'A') {
      gameStore.incrementTeamAScore(1)
      createParticles('A')
      addLog(gameStore.teamA.name, 'a répondu correctement !', 'A', '+250')
    } else if (winner === 'B') {
      gameStore.incrementTeamBScore(1)
      createParticles('B')
      addLog(gameStore.teamB.name, 'a répondu correctement !', 'B', '+250')
    }
    
    const delay = questionRef.current?.type === 'vocabulaire' ? 4000 : 2500
    
    roundEndTimeoutRef.current = setTimeout(() => {
      if (gameStatusRef.current !== 'finished') {
        setRoundNumber((prev) => prev + 1)
        startNewRound()
      }
    }, delay)
  }

  const addLog = (user, action, team, points) => {
    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    setLogs(prev => [{ id: Date.now(), user, action, team, points, time }, ...prev.slice(0, 4)])
  }

  const handleAnswer = (team, isCorrect) => {
    const currentRoundState = roundStateRef.current
    if (currentRoundState.ended) return
    if (team === 'A' && currentRoundState.teamAStatus !== 'playing') return
    if (team === 'B' && currentRoundState.teamBStatus !== 'playing') return

    const responseTime = Date.now() - roundStartTime.current
    const nextRoundState = { ...currentRoundState }
    
    if (team === 'A') {
      if (isCorrect) {
        nextRoundState.teamAStatus = 'correct'
        nextRoundState.teamATime = responseTime
        setTeamAStatus('correct')
        setTeamATime(responseTime)
      } else {
        nextRoundState.teamAStatus = 'wrong'
        setTeamAStatus('wrong')
        setShowIncorrect(true)
        setTimeout(() => setShowIncorrect(false), 400)
        addLog(gameStore.teamA.name, 'a raté le timing.', 'A', '-50')
      }
    } else {
      if (isCorrect) {
        nextRoundState.teamBStatus = 'correct'
        nextRoundState.teamBTime = responseTime
        setTeamBStatus('correct')
        setTeamBTime(responseTime)
      } else {
        nextRoundState.teamBStatus = 'wrong'
        setTeamBStatus('wrong')
        setShowIncorrect(true)
        setTimeout(() => setShowIncorrect(false), 400)
        addLog(gameStore.teamB.name, 'a raté le timing.', 'B', '-50')
      }
    }
    
    roundStateRef.current = nextRoundState

    if (nextRoundState.teamAStatus !== 'playing' && nextRoundState.teamBStatus !== 'playing') {
      setBothTeamsAnswered(true)
      endRound(nextRoundState)
    }
  }

  const createParticles = (winningTeam) => {
    // Animation effect handled by CSS
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
    onBack()
  }

  // Calculate timer circle progress
  const timerProgress = (timeLeft / roundTime) * 283
  const timerColor = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#eab308' : '#f4b942'
  const isChoiceQuestion = (currentQuestion) => {
    const options = currentQuestion?.data?.options || currentQuestion?.options || []
    return options.length > 0 || currentQuestion?.isMCQ || currentQuestion?.isVocabulary || currentQuestion?.type === 'vocabulaire'
  }
  const renderTeamQuestion = (team, status, responseTime) => {
    if (!question) return null
    const disabled = !isRoundActive || status !== 'playing'
    const commonProps = {
      question,
      team,
      onAnswer: (isCorrect) => handleAnswer(team, isCorrect),
      isAnswering: disabled,
      disabled,
      responseTime,
      showCorrectAnswer: bothTeamsAnswered || timeLeft === 0,
    }
    return isChoiceQuestion(question) ? <VocabularyCard {...commonProps} /> : <QuestionCard {...commonProps} />
  }

  return (
    <div className="min-h-screen geronimo-screen flex flex-col">
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
            <button className="text-gray-500 hover:text-white transition-colors">
              <span className="material-icons">bar_chart</span>
            </button>
            <button className="text-gray-500 hover:text-white transition-colors">
              <span className="material-icons">settings</span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <span className="material-icons text-white text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Score Bar */}
      <div className="bg-[#0f2539]/92 px-8 py-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* Team Alpha */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7fa99b]/20 flex items-center justify-center border border-[#7fa99b]/30">
              <span className="material-icons text-[#7fa99b]">local_shipping</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">ÉQUIPE ÉTOILE</p>
              <p className="text-3xl font-black text-[#7fa99b]">{gameStore.teamA.score.toLocaleString()}</p>
            </div>
          </div>

          {/* VS */}
          <div className="w-12 h-12 rounded-full bg-[#1d3d59] border border-white/10 flex items-center justify-center">
            <span className="text-gray-500 font-bold text-sm">VS</span>
          </div>

          {/* Team Omega */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">ÉQUIPE BOUSSOLE</p>
              <p className="text-3xl font-black text-[#f4b942]">{gameStore.teamB.score.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#f4b942]/20 flex items-center justify-center border border-[#f4b942]/30">
              <span className="material-icons text-[#f4b942]">bolt</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-10 bg-[#1d3d59] rounded-xl overflow-hidden">
          {/* Blue Side */}
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#7fa99b] to-[#7fa99b]/80 transition-all duration-500 flex items-center px-4"
            style={{ width: `${Math.max(0, 50 + gameStore.ropePosition / 2)}%` }}
          >
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
              {gameStore.ropePosition > 0 ? 'DOMINE' : ''}
            </span>
          </div>
          
          {/* Orange Side */}
          <div 
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#f4b942] to-[#f4b942]/80 transition-all duration-500 flex items-center justify-end px-4"
            style={{ width: `${Math.max(0, 50 - gameStore.ropePosition / 2)}%` }}
          >
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
              {gameStore.ropePosition < 0 ? 'REPRISE' : ''}
            </span>
          </div>

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform -translate-x-1/2" />
        </div>
      </div>

      {/* Main Game Area */}
      <main className="flex-1 flex">
        {/* Left Panel - Timer & Events */}
        <aside className="w-72 p-6 space-y-4">
          {/* Circular Timer */}
          <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#234a68"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={timerColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="351.86"
                  strokeDashoffset={351.86 - (timerProgress / 283) * 351.86}
                  className="transition-all duration-1000 linear"
                  style={{ filter: `drop-shadow(0 0 6px ${timerColor})` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{timeLeft}</span>
                <span className="text-xs text-gray-500 uppercase">SECONDES</span>
              </div>
            </div>
          </div>

          {/* Critical Event */}
          <div className="bg-[#1d3d59] rounded-3xl p-5 border border-red-500/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-icons text-red-400 text-sm">warning</span>
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">ÉVÉNEMENT CRITIQUE</span>
            </div>
            <p className="text-sm text-gray-400">
              Débordement de palettes en approche dans le Secteur 7. Points doublés pour les 3 prochaines questions !
            </p>
          </div>
        </aside>

        {/* Center - Question */}
        <section className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Question Badge */}
            <div className="flex justify-center mb-6">
              <span className="px-4 py-2 bg-[#f4b942] text-[#17314a] text-xs font-bold uppercase tracking-wider rounded-full">
                QUESTION {roundNumber}/20
              </span>
            </div>

            {/* Question Cards */}
            {question && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-[#10263a]/70 rounded-3xl p-4 border border-[#7fa99b]/20">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[#7fa99b] text-xs font-bold uppercase tracking-wider">{gameStore.teamA.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      teamAStatus === 'correct' ? 'bg-green-500/20 text-green-400' :
                      teamAStatus === 'wrong' ? 'bg-red-500/20 text-red-400' :
                      'bg-[#7fa99b]/20 text-[#7fa99b]'
                    }`}>
                      {teamAStatus === 'correct' ? 'Correct' : teamAStatus === 'wrong' ? 'Raté' : 'En jeu'}
                    </span>
                  </div>
                  {renderTeamQuestion('A', teamAStatus, teamATime)}
                </div>
                <div className="bg-[#10263a]/70 rounded-3xl p-4 border border-[#f4b942]/20">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[#f4b942] text-xs font-bold uppercase tracking-wider">{gameStore.teamB.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      teamBStatus === 'correct' ? 'bg-green-500/20 text-green-400' :
                      teamBStatus === 'wrong' ? 'bg-red-500/20 text-red-400' :
                      'bg-[#f4b942]/20 text-[#f4b942]'
                    }`}>
                      {teamBStatus === 'correct' ? 'Correct' : teamBStatus === 'wrong' ? 'Raté' : 'En jeu'}
                    </span>
                  </div>
                  {renderTeamQuestion('B', teamBStatus, teamBTime)}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Panel - Battle Logs */}
        <aside className="w-80 p-6">
          <div className="bg-[#1d3d59] rounded-3xl p-5 border border-white/5 h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Journal d'affrontement en direct</span>
            </div>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    log.team === 'A' ? 'bg-[#7fa99b]/20' : 'bg-[#f4b942]/20'
                  }`}>
                    <span className={`material-icons text-sm ${
                      log.team === 'A' ? 'text-[#7fa99b]' : 'text-[#f4b942]'
                    }`}>
                      {log.points.startsWith('+') ? 'check' : 'close'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className={`font-bold ${
                        log.team === 'A' ? 'text-[#7fa99b]' : 'text-[#f4b942]'
                      }`}>{log.user}</span>
                      {' '}{log.action}
                    </p>
                    <p className={`text-xs ${
                      log.points.startsWith('+') ? 'text-[#7fa99b]' : 'text-red-400'
                    }`}>{log.points}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Global Morale */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase">MORAL GLOBAL</span>
                <span className="text-xs font-bold text-[#7fa99b]">88%</span>
              </div>
              <div className="h-1.5 bg-[#234a68] rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-[#7fa99b] rounded-full" />
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default GameBoard
