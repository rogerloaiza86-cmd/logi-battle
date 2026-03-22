import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RopeAnimation from './RopeAnimation'
import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import { generateNextQuestion } from '../utils/questionGenerator'
import { useGameStore } from '../hooks/useGameStore'

const ROUND_TIME = 30
const VOCABULARY_TIME = 20

export const GameBoard = ({ onBack, gameMode }) => {
  const gameStore = useGameStore()
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

  useEffect(() => {
    startNewRound()
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
    const newQuestion = {
      ...generateNextQuestion(gameMode),
      id: `q_${Date.now()}`,
    }
    setQuestion(newQuestion)
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
    roundStartTime.current = Date.now()
  }

  const endRound = () => {
    setIsRoundActive(false)
    setBothTeamsAnswered(true)
    
    let winner = null
    
    if (teamAStatus === 'correct' && teamBStatus === 'correct') {
      winner = teamATime < teamBTime ? 'A' : 'B'
    } else if (teamAStatus === 'correct') {
      winner = 'A'
    } else if (teamBStatus === 'correct') {
      winner = 'B'
    }
    
    setRoundWinner(winner)
    
    if (winner === 'A') {
      gameStore.incrementTeamAScore(1)
      createParticles('A')
      addLog(gameStore.teamA.name, 'a répondu correctement !', 'A', '+250')
    } else if (winner === 'B') {
      gameStore.incrementTeamBScore(1)
      createParticles('B')
      addLog(gameStore.teamB.name, 'a répondu correctement !', 'B', '+250')
    }
    
    const delay = question?.type === 'vocabulaire' ? 4000 : 2500
    
    setTimeout(() => {
      if (gameStore.gameStatus !== 'finished') {
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
    const responseTime = Date.now() - roundStartTime.current
    
    if (team === 'A') {
      if (isCorrect) {
        setTeamAStatus('correct')
        setTeamATime(responseTime)
      } else {
        setTeamAStatus('wrong')
        setShowIncorrect(true)
        setTimeout(() => setShowIncorrect(false), 400)
        addLog(gameStore.teamA.name, 'a raté le timing.', 'A', '-50')
      }
    } else {
      if (isCorrect) {
        setTeamBStatus('correct')
        setTeamBTime(responseTime)
      } else {
        setTeamBStatus('wrong')
        setShowIncorrect(true)
        setTimeout(() => setShowIncorrect(false), 400)
        addLog(gameStore.teamB.name, 'a raté le timing.', 'B', '-50')
      }
    }
    
    const otherTeamStatus = team === 'A' ? teamBStatus : teamAStatus

    if (otherTeamStatus !== 'playing') {
      setBothTeamsAnswered(true)
      endRound()
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
  const timerColor = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#eab308' : '#fea52e'

  return (
    <div className="min-h-screen bg-[#0c0c1f] flex flex-col">
      {/* Header */}
      <header className="bg-[#121225] border-b border-white/5 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[#fea52e]">LOGI-BATTLE</span>
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
      <div className="bg-[#121225] px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Team Alpha */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#699cff]/20 flex items-center justify-center border border-[#699cff]/30">
              <span className="material-icons text-[#699cff]">local_shipping</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">ÉQUIPE ALPHA</p>
              <p className="text-3xl font-black text-[#699cff]">{gameStore.teamA.score.toLocaleString()}</p>
            </div>
          </div>

          {/* VS */}
          <div className="w-12 h-12 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center">
            <span className="text-gray-500 font-bold text-sm">VS</span>
          </div>

          {/* Team Omega */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">ÉQUIPE OMEGA</p>
              <p className="text-3xl font-black text-[#fea52e]">{gameStore.teamB.score.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#fea52e]/20 flex items-center justify-center border border-[#fea52e]/30">
              <span className="material-icons text-[#fea52e]">bolt</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-10 bg-[#1a1a2e] rounded-xl overflow-hidden">
          {/* Blue Side */}
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#699cff] to-[#699cff]/80 transition-all duration-500 flex items-center px-4"
            style={{ width: `${Math.max(0, 50 + gameStore.ropePosition / 2)}%` }}
          >
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
              {gameStore.ropePosition > 0 ? 'DOMINE' : ''}
            </span>
          </div>
          
          {/* Orange Side */}
          <div 
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#fea52e] to-[#fea52e]/80 transition-all duration-500 flex items-center justify-end px-4"
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
          <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-white/5">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#252538"
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
          <div className="bg-[#1a1a2e] rounded-3xl p-5 border border-red-500/20">
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
          <div className="max-w-2xl mx-auto">
            {/* Question Badge */}
            <div className="flex justify-center mb-6">
              <span className="px-4 py-2 bg-[#fea52e] text-[#0c0c1f] text-xs font-bold uppercase tracking-wider rounded-full">
                QUESTION {roundNumber}/20
              </span>
            </div>

            {/* Question Card */}
            {question && (
              <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-white/5">
                {/* Category */}
                <p className="text-[#699cff] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  {question.type === 'palettisation' && 'GESTION DU FRET'}
                  {question.type === 'cout_transport' && 'DYNAMIQUE DE FLOTTE'}
                  {question.type === 'vocabulaire' && 'TERMINOLOGIE'}
                  {question.type === 'culture' && 'CONNAISSANCES GÉNÉRALES'}
                </p>

                {/* Question Text */}
                <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
                  {question.description}
                </h2>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  {['A', 'B', 'C', 'D'].map((letter, index) => (
                    <button
                      key={letter}
                      className="group relative bg-[#252538] hover:bg-[#2d2d42] rounded-2xl p-5 text-left transition-all border border-transparent hover:border-white/10"
                    >
                      <span className="absolute top-4 left-4 text-gray-500 text-sm font-bold">{letter}</span>
                      <p className="text-white font-medium pl-6">
                        {index === 0 && '1,2 Mètres'}
                        {index === 1 && '2,4 Mètres'}
                        {index === 2 && 'Sans Limite'}
                        {index === 3 && 'Limité par le Poids'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Panel - Battle Logs */}
        <aside className="w-80 p-6">
          <div className="bg-[#1a1a2e] rounded-3xl p-5 border border-white/5 h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">JOURNAL DE COMBAT EN DIRECT</span>
            </div>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    log.team === 'A' ? 'bg-[#699cff]/20' : 'bg-[#fea52e]/20'
                  }`}>
                    <span className={`material-icons text-sm ${
                      log.team === 'A' ? 'text-[#699cff]' : 'text-[#fea52e]'
                    }`}>
                      {log.points.startsWith('+') ? 'check' : 'close'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className={`font-bold ${
                        log.team === 'A' ? 'text-[#699cff]' : 'text-[#fea52e]'
                      }`}>{log.user}</span>
                      {' '}{log.action}
                    </p>
                    <p className={`text-xs ${
                      log.points.startsWith('+') ? 'text-[#699cff]' : 'text-red-400'
                    }`}>{log.points}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Global Morale */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase">MORAL GLOBAL</span>
                <span className="text-xs font-bold text-[#699cff]">88%</span>
              </div>
              <div className="h-1.5 bg-[#252538] rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-[#699cff] rounded-full" />
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default GameBoard
