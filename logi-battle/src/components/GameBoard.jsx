import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandMark from './BrandMark'
import QuestionView from './QuestionView'
import { useGameStore } from '../hooks/useGameStore'
import { useSplitRound } from '../hooks/useSplitRound'
import { gamesService } from '../services/database'
import { gradePlayerAnswer, toPublicQuestion } from '../utils/roundRules'

export const GameBoard = ({ onBack, gameMode, isHost }) => {
  const gameStore = useGameStore()
  const channelRef = useRef(null)
  const [logs, setLogs] = useState([])

  const round = useSplitRound(gameMode, {
    onRoundResolved: ({ winner }) => {
      if (winner === 'A') useGameStore.getState().incrementTeamAScore(1)
      else if (winner === 'B') useGameStore.getState().incrementTeamBScore(1)
      const status = useGameStore.getState().gameStatus
      if (winner === 'A') addLog(useGameStore.getState().teamA.name, 'remporte la manche.', 'A', '+1')
      else if (winner === 'B') addLog(useGameStore.getState().teamB.name, 'remporte la manche.', 'B', '+1')
      else addLog('Manche', 'sans point : égalité ou aucune bonne réponse.', 'A', '0')
      return status === 'finished'
    },
  })

  const addLog = (user, action, team, points) => {
    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    setLogs((prev) => [{ id: Date.now(), user, action, team, points, time }, ...prev.slice(0, 5)])
  }

  useEffect(() => {
    if (!(isHost && gameStore.gameId)) return undefined
    gamesService.updateGameScore(
      gameStore.gameId,
      gameStore.teamA.score,
      gameStore.teamB.score,
      gameStore.ropePosition
    ).catch(console.error)
    return undefined
  }, [gameStore.teamA.score, gameStore.teamB.score, gameStore.ropePosition, isHost, gameStore.gameId])

  useEffect(() => {
    if (!(isHost && gameStore.gameId)) return undefined
    const channel = gamesService.getGameChannel(gameStore.gameId)
    if (!channel) return undefined
    channel.on('broadcast', { event: 'player_answer' }, ({ payload }) => {
      const current = round.questionRef.current
      if (!current || payload?.answer == null) return
      round.handleAnswer(payload.team, gradePlayerAnswer(current, payload.answer))
    })
    channel.subscribe()
    channelRef.current = channel
    return () => {
      channelRef.current = null
    }
  }, [isHost, gameStore.gameId, round.handleAnswer, round.questionRef])

  useEffect(() => {
    if (!isHost || !channelRef.current || !round.question || !round.isRoundActive) return undefined
    const send = () => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'new_question',
        payload: {
          questionData: toPublicQuestion(round.question),
          time: round.roundTime,
        },
      })
    }
    send()
    const timer = setInterval(send, 4000)
    return () => clearInterval(timer)
  }, [isHost, round.question, round.isRoundActive, round.roundTime])

  const winner = gameStore.ropePosition >= 100
    ? 'A'
    : gameStore.ropePosition <= -100
      ? 'B'
      : gameStore.teamA.score === gameStore.teamB.score
        ? null
        : gameStore.teamA.score > gameStore.teamB.score
          ? 'A'
          : 'B'

  const timerColor = round.timeLeft <= 5 ? '#ef4444' : round.timeLeft <= 10 ? '#eab308' : '#f4b942'
  const showOver = round.finished || gameStore.gameStatus === 'finished'

  const teamCard = (team) => {
    const isA = team === 'A'
    const status = isA ? round.teamAStatus : round.teamBStatus
    const responseTime = isA ? round.teamATime : round.teamBTime
    return (
      <div className={`rounded-3xl border p-4 ${isA ? 'border-[#7fa99b]/30' : 'border-[#f4b942]/30'} bg-[#0f2539]/40`}>
        <div className="flex items-center justify-between mb-3">
          <p className={`text-sm font-bold ${isA ? 'text-[#7fa99b]' : 'text-[#f4b942]'}`}>
            {isA ? gameStore.teamA.name : gameStore.teamB.name}
          </p>
          <span className="text-xs text-gray-400">
            {status === 'correct' ? 'Bonne réponse' : status === 'wrong' ? 'Mauvaise réponse' : 'En jeu'}
          </span>
        </div>
        <QuestionView
          question={round.question}
          team={team}
          onAnswer={(isCorrect) => round.handleAnswer(team, isCorrect)}
          disabled={!round.isRoundActive || status !== 'playing'}
          isAnswering={!round.isRoundActive || status !== 'playing'}
          responseTime={responseTime}
          showCorrectAnswer={round.bothTeamsAnswered || round.timeLeft === 0}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen geronimo-screen flex flex-col">
      <header className="bg-[#0f2539]/92 border-b border-white/5 px-4 md:px-8 py-4 relative z-10">
        <div className="flex items-center justify-between gap-4">
          <BrandMark nameClassName="text-[1.35rem]" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white">
              Manche {round.roundNumber}/{round.totalRounds}
            </span>
            <span className="text-2xl font-black" style={{ color: timerColor }}>{round.timeLeft}s</span>
            <button
              onClick={() => {
                gameStore.resetGame()
                onBack()
              }}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-500/10"
            >
              <span className="material-icons text-lg">stop</span>
              <span className="text-sm font-medium">Arrêter</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-[#0f2539]/92 px-4 md:px-8 py-4">
        <div className="flex items-center justify-between mb-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{gameStore.teamA.name}</p>
            <p className="text-3xl font-black text-[#7fa99b]">{gameStore.teamA.score}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#1d3d59] border border-white/10 flex items-center justify-center">
            <span className="text-gray-500 font-bold text-sm">VS</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{gameStore.teamB.name}</p>
            <p className="text-3xl font-black text-[#f4b942]">{gameStore.teamB.score}</p>
          </div>
        </div>
        <div className="relative h-8 bg-[#1d3d59] rounded-xl overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[#7fa99b] transition-all duration-500"
            style={{ width: `${Math.max(0, 50 + gameStore.ropePosition / 2)}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-[#f4b942] transition-all duration-500"
            style={{ width: `${Math.max(0, 50 - gameStore.ropePosition / 2)}%` }}
          />
        </div>
      </div>

      <main className="flex-1 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_18rem] gap-4 p-4 md:p-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {teamCard('A')}
          {teamCard('B')}
        </section>
        <aside className="bg-[#1d3d59] rounded-3xl p-5 border border-white/5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Journal de manche</p>
          {logs.length === 0 && <p className="text-sm text-gray-500">Les résultats apparaîtront ici.</p>}
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id}>
                <p className="text-sm text-white">
                  <span className={log.team === 'A' ? 'text-[#7fa99b] font-bold' : 'text-[#f4b942] font-bold'}>{log.user}</span>
                  {' '}{log.action}
                </p>
                <p className="text-xs text-gray-400">{log.points} · {log.time}</p>
              </div>
            ))}
          </div>
        </aside>
      </main>

      <AnimatePresence>
        {showOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-[#1d3d59] rounded-3xl p-8 max-w-lg w-full text-center border border-white/10">
              <h2 className="text-3xl font-black text-white mb-2">
                {winner === 'A' ? gameStore.teamA.name : winner === 'B' ? gameStore.teamB.name : 'Égalité'}
              </h2>
              <p className="text-gray-300 mb-6">
                {gameStore.teamA.score} — {gameStore.teamB.score}
              </p>
              <button
                onClick={() => {
                  gameStore.resetGame()
                  onBack()
                }}
                className="w-full py-4 rounded-xl bg-[#f4b942] text-[#17314a] font-bold"
              >
                Retour aux équipes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GameBoard
