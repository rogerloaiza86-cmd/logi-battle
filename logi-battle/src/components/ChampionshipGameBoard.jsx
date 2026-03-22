import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RopeAnimation from './RopeAnimation'
import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import { generateNextQuestion } from '../utils/questionGenerator'
import { useChampionshipStore } from '../hooks/useChampionshipStore'

const ROUND_TIME = 30
const VOCABULARY_TIME = 20

export const ChampionshipGameBoard = ({ 
  gameMode, 
  challenger, 
  champion, 
  classId,
  matchType,
  onBack, 
  onMatchEnd 
}) => {
  const { getGroup } = useChampionshipStore()
  
  // Le challenger est Team A (Bleu), le Champion est Team B (Orange)
  const [teamA, setTeamA] = useState({
    name: challenger.name,
    score: 0,
    isChallenger: true,
    groupData: challenger,
  })
  
  const [teamB, setTeamB] = useState({
    name: champion.name,
    score: 0,
    isChampion: true,
    groupData: champion,
  })
  
  const [ropePosition, setRopePosition] = useState(0)
  const [gameStatus, setGameStatus] = useState('active') // waiting, active, finished
  
  const [question, setQuestion] = useState(null)
  const [showIncorrect, setShowIncorrect] = useState(false)
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
  const [totalRounds, setTotalRounds] = useState(10)
  const roundStartTime = useRef(null)
  const [matchStartTime, setMatchStartTime] = useState(Date.now())

  useEffect(() => {
    startNewRound()
    setMatchStartTime(Date.now())
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
  
  // Vérifier fin de match
  useEffect(() => {
    if (ropePosition >= 100 || ropePosition <= -100 || roundNumber > totalRounds) {
      setGameStatus('finished')
    }
  }, [ropePosition, roundNumber])

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
      setTeamA(prev => ({ ...prev, score: prev.score + 1 }))
      setRopePosition(prev => Math.min(100, prev + 10))
    } else if (winner === 'B') {
      setTeamB(prev => ({ ...prev, score: prev.score + 1 }))
      setRopePosition(prev => Math.max(-100, prev - 10))
    }
    
    const delay = question?.type === 'vocabulaire' ? 4000 : 2500
    
    setTimeout(() => {
      if (gameStatus !== 'finished') {
        setRoundNumber(prev => prev + 1)
        startNewRound()
      }
    }, delay)
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
      }
    } else {
      if (isCorrect) {
        setTeamBStatus('correct')
        setTeamBTime(responseTime)
      } else {
        setTeamBStatus('wrong')
        setShowIncorrect(true)
        setTimeout(() => setShowIncorrect(false), 400)
      }
    }
    
    const otherTeamStatus = team === 'A' ? teamBStatus : teamAStatus
    
    if (otherTeamStatus !== 'playing') {
      setBothTeamsAnswered(true)
    }
    
    if (isCorrect || otherTeamStatus !== 'playing') {
      if (otherTeamStatus !== 'playing') {
        endRound()
      }
    }
  }

  const getWinner = () => {
    if (ropePosition >= 100) return 'A'
    if (ropePosition <= -100) return 'B'
    if (teamA.score > teamB.score) return 'A'
    if (teamB.score > teamA.score) return 'B'
    return null
  }

  const handleEndMatch = () => {
    const winner = getWinner()
    const duration = Math.floor((Date.now() - matchStartTime) / 1000)
    
    onMatchEnd({
      winner,
      score: { teamA: teamA.score, teamB: teamB.score },
      duration,
      rounds: roundNumber,
    })
  }

  const timerProgress = (timeLeft / ROUND_TIME) * 100
  const winner = getWinner()

  return (
    <motion.div
      className="h-screen flex flex-col bg-background-dark overflow-hidden"
      animate={showIncorrect ? { scale: [1, 1.005, 0.995, 1.005, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Rope Progress Bar */}
      <RopeAnimation position={ropePosition} />

      {/* Timer Bar */}
      <div className="w-full h-1.5 bg-slate-800">
        <motion.div
          className={`h-full transition-colors ${
            timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-amber-500' : 'bg-green-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${timerProgress}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>

      {/* Timer Display */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex flex-col items-center">
          <span className={`text-3xl font-black ${
            timeLeft <= 5 ? 'text-red-500 animate-pulse' : timeLeft <= 10 ? 'text-amber-500' : 'text-white'
          }`}>
            {timeLeft}s
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">
            Manche {roundNumber}/{totalRounds}
          </span>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 z-50 bg-slate-800/80 hover:bg-slate-700 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 transition-all"
      >
        <span className="material-icons text-gray-400 text-lg">close</span>
        <span className="text-xs font-medium text-gray-400 hidden sm:inline">Abandonner</span>
      </button>

      {/* Match Info Banner */}
      <div className="bg-slate-900 border-b border-white/5 px-4 py-2">
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full font-bold">
            {matchType === 'challenge' ? '⚔️ Match de Championnat' : '🎮 Match Libre'}
          </span>
          <span className="text-gray-500">
            {challenger.name} VS {champion.name}
          </span>
        </div>
      </div>

      {/* Main Game Area */}
      <main className="flex-1 flex relative min-h-0">
        {/* Divider */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-40" />

        {/* Team A - Challenger (Blue) */}
        <section className="flex-1 flex flex-col bg-slate-900/50 min-w-0">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 transition-all ${
                teamAStatus === 'correct' ? 'border-green-500' :
                teamAStatus === 'wrong' ? 'border-red-500' :
                'border-blue-500'
              }`}>
                <div className="w-full h-full bg-blue-500/20 flex items-center justify-center">
                  <span className="material-icons text-blue-400 text-2xl">groups</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-blue-400 font-bold text-sm md:text-base truncate">
                    {teamA.name}
                  </h2>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded-full font-bold uppercase">
                    Challenger
                  </span>
                </div>
                <p className="text-white text-xl md:text-2xl font-black">
                  {teamA.score}
                  <span className="text-xs text-blue-300 font-normal ml-1">pts</span>
                </p>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                teamAStatus === 'correct' ? 'bg-green-500/20 text-green-400' :
                teamAStatus === 'wrong' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {teamAStatus === 'correct' ? '✓' : teamAStatus === 'wrong' ? '✗' : '●'}
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            {question && (
              question.isMCQ || question.type === 'vocabulaire' ? (
                <VocabularyCard
                  question={question}
                  team="A"
                  onAnswer={(isCorrect) => handleAnswer('A', isCorrect)}
                  isAnswering={!isRoundActive || teamAStatus !== 'playing'}
                  disabled={!isRoundActive || teamAStatus !== 'playing'}
                  responseTime={teamATime}
                  showCorrectAnswer={bothTeamsAnswered || timeLeft === 0}
                />
              ) : (
                <QuestionCard
                  question={question}
                  team="A"
                  onAnswer={(isCorrect) => handleAnswer('A', isCorrect)}
                  isAnswering={!isRoundActive || teamAStatus !== 'playing'}
                  disabled={!isRoundActive || teamAStatus !== 'playing'}
                  responseTime={teamATime}
                  showCorrectAnswer={bothTeamsAnswered || timeLeft === 0}
                />
              )
            )}
          </div>
        </section>

        {/* Team B - Champion (Orange) */}
        <section className="flex-1 flex flex-col bg-background-dark min-w-0">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 flex-row-reverse">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 transition-all ${
                teamBStatus === 'correct' ? 'border-green-500' :
                teamBStatus === 'wrong' ? 'border-red-500' :
                'border-yellow-500'
              }`}>
                <div className="w-full h-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-2xl">👑</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] rounded-full font-bold uppercase">
                    Champion
                  </span>
                  <h2 className="text-yellow-400 font-bold text-sm md:text-base truncate">
                    {teamB.name}
                  </h2>
                </div>
                <p className="text-white text-xl md:text-2xl font-black">
                  {teamB.score}
                  <span className="text-xs text-yellow-300 font-normal ml-1">pts</span>
                </p>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                teamBStatus === 'correct' ? 'bg-green-500/20 text-green-400' :
                teamBStatus === 'wrong' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {teamBStatus === 'correct' ? '✓' : teamBStatus === 'wrong' ? '✗' : '●'}
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            {question && (
              question.isMCQ || question.type === 'vocabulaire' ? (
                <VocabularyCard
                  question={question}
                  team="B"
                  onAnswer={(isCorrect) => handleAnswer('B', isCorrect)}
                  isAnswering={!isRoundActive || teamBStatus !== 'playing'}
                  disabled={!isRoundActive || teamBStatus !== 'playing'}
                  responseTime={teamBTime}
                  showCorrectAnswer={bothTeamsAnswered || timeLeft === 0}
                />
              ) : (
                <QuestionCard
                  question={question}
                  team="B"
                  onAnswer={(isCorrect) => handleAnswer('B', isCorrect)}
                  isAnswering={!isRoundActive || teamBStatus !== 'playing'}
                  disabled={!isRoundActive || teamBStatus !== 'playing'}
                  responseTime={teamBTime}
                  showCorrectAnswer={bothTeamsAnswered || timeLeft === 0}
                />
              )
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Championnat Actif
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-blue-400">{teamATime ? `${(teamATime/1000).toFixed(1)}s` : '--'}</span>
          <span className="text-slate-600">/</span>
          <span className="text-yellow-400">{teamBTime ? `${(teamBTime/1000).toFixed(1)}s` : '--'}</span>
        </div>
      </footer>

      {/* Game Over Overlay */}
      <AnimatePresence>
        {gameStatus === 'finished' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-800 rounded-3xl p-8 max-w-lg w-full text-center border border-primary/30"
            >
              {winner === 'A' ? (
                <>
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    NOUVEAU CHAMPION !
                  </h2>
                  <p className="text-xl text-blue-400 font-bold mb-4">
                    {teamA.name}
                  </p>
                  <p className="text-gray-400 mb-6">
                    Le challenger remporte la ceinture !
                  </p>
                </>
              ) : winner === 'B' ? (
                <>
                  <div className="text-6xl mb-4">👑</div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    DÉFENSE RÉUSSIE !
                  </h2>
                  <p className="text-xl text-yellow-400 font-bold mb-4">
                    {teamB.name}
                  </p>
                  <p className="text-gray-400 mb-6">
                    Le champion conserve son titre !
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">🤝</div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    MATCH NUL !
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Le champion conserve son titre
                  </p>
                </>
              )}
              
              <div className="flex justify-center gap-8 mb-8 py-4 bg-slate-900 rounded-xl">
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-400">{teamA.score}</p>
                  <p className="text-xs text-gray-500 uppercase">{teamA.name}</p>
                </div>
                <div className="text-3xl font-black text-gray-600 self-center">-</div>
                <div className="text-center">
                  <p className="text-3xl font-black text-yellow-400">{teamB.score}</p>
                  <p className="text-xs text-gray-500 uppercase">{teamB.name}</p>
                </div>
              </div>

              <button
                onClick={handleEndMatch}
                className="w-full py-4 bg-primary hover:bg-amber-500 rounded-xl text-white font-bold text-lg transition-colors"
              >
                Terminer le match
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Round Winner Overlay */}
      <AnimatePresence>
        {roundWinner && gameStatus !== 'finished' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -50 }}
              className="text-center"
            >
              <div className={`text-5xl md:text-7xl font-black mb-4 ${
                roundWinner === 'A' ? 'text-blue-400' : 'text-yellow-400'
              }`}>
                {roundWinner === 'A' ? teamA.name : teamB.name}
              </div>
              <div className="text-white text-xl font-bold">
                +1 POINT
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ChampionshipGameBoard
