import { useCallback, useEffect, useRef, useState } from 'react'
import { generateNextQuestion } from '../utils/questionGenerator'
import { ROUND_TIME, TOTAL_ROUNDS, VOCABULARY_TIME, resolveRoundWinner } from '../utils/roundRules'

/**
 * Manche en écran partagé. Les statuts sont lus dans une ref pour que
 * la dernière réponse compte dans le même tour que setState.
 */
export function useSplitRound(gameMode, { onRoundResolved, totalRounds = TOTAL_ROUNDS } = {}) {
  const [question, setQuestion] = useState(null)
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME)
  const [roundTime, setRoundTime] = useState(ROUND_TIME)
  const [isRoundActive, setIsRoundActive] = useState(false)
  const [teamAStatus, setTeamAStatus] = useState('playing')
  const [teamBStatus, setTeamBStatus] = useState('playing')
  const [teamATime, setTeamATime] = useState(null)
  const [teamBTime, setTeamBTime] = useState(null)
  const [roundWinner, setRoundWinner] = useState(null)
  const [bothTeamsAnswered, setBothTeamsAnswered] = useState(false)
  const [roundNumber, setRoundNumber] = useState(1)
  const [finished, setFinished] = useState(false)

  const statusRef = useRef({ A: 'playing', B: 'playing', timeA: null, timeB: null })
  const questionRef = useRef(null)
  const roundStartTime = useRef(Date.now())
  const endingRef = useRef(false)
  const activeRef = useRef(false)
  const finishedRef = useRef(false)
  const roundRef = useRef(1)
  const onRoundResolvedRef = useRef(onRoundResolved)
  const endRoundRef = useRef(() => {})
  const continueTimer = useRef(null)

  onRoundResolvedRef.current = onRoundResolved

  const startNewRound = useCallback(() => {
    if (finishedRef.current) return null
    if (continueTimer.current) {
      clearTimeout(continueTimer.current)
      continueTimer.current = null
    }
    const next = {
      ...generateNextQuestion(gameMode),
      id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    }
    questionRef.current = next
    statusRef.current = { A: 'playing', B: 'playing', timeA: null, timeB: null }
    endingRef.current = false
    activeRef.current = true
    roundStartTime.current = Date.now()
    const time = next.type === 'vocabulaire' ? VOCABULARY_TIME : ROUND_TIME
    setQuestion(next)
    setRoundTime(time)
    setTimeLeft(time)
    setIsRoundActive(true)
    setTeamAStatus('playing')
    setTeamBStatus('playing')
    setTeamATime(null)
    setTeamBTime(null)
    setRoundWinner(null)
    setBothTeamsAnswered(false)
    return next
  }, [gameMode])

  const endRound = useCallback(() => {
    if (endingRef.current || finishedRef.current) return
    endingRef.current = true
    activeRef.current = false
    setIsRoundActive(false)
    setBothTeamsAnswered(true)

    const { A, B, timeA, timeB } = statusRef.current
    const winner = resolveRoundWinner(A, B, timeA, timeB)
    setRoundWinner(winner)

    const stopForScore = onRoundResolvedRef.current?.({
      winner,
      question: questionRef.current,
      roundNumber: roundRef.current,
    }) === true
    const stopForRounds = roundRef.current >= totalRounds
    const delay = questionRef.current?.type === 'vocabulaire' ? 4000 : 2500

    continueTimer.current = setTimeout(() => {
      if (finishedRef.current) return
      if (stopForScore || stopForRounds) {
        finishedRef.current = true
        setFinished(true)
        return
      }
      roundRef.current += 1
      setRoundNumber(roundRef.current)
      startNewRound()
    }, delay)
  }, [startNewRound, totalRounds])

  endRoundRef.current = endRound

  useEffect(() => {
    startNewRound()
    return () => {
      if (continueTimer.current) clearTimeout(continueTimer.current)
    }
  }, [startNewRound])

  useEffect(() => {
    if (!isRoundActive) return undefined
    if (timeLeft <= 0) {
      endRoundRef.current()
      return undefined
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRoundActive, timeLeft])

  const handleAnswer = useCallback((team, isCorrect) => {
    if (!activeRef.current || endingRef.current) return
    if (team !== 'A' && team !== 'B') return
    const slot = statusRef.current
    if (slot[team] !== 'playing') return

    const responseTime = Date.now() - roundStartTime.current
    slot[team] = isCorrect ? 'correct' : 'wrong'
    if (team === 'A') {
      slot.timeA = isCorrect ? responseTime : null
      setTeamAStatus(slot.A)
      if (isCorrect) setTeamATime(responseTime)
    } else {
      slot.timeB = isCorrect ? responseTime : null
      setTeamBStatus(slot.B)
      if (isCorrect) setTeamBTime(responseTime)
    }

    const other = team === 'A' ? 'B' : 'A'
    if (slot[other] !== 'playing') endRoundRef.current()
  }, [])

  return {
    question,
    questionRef,
    timeLeft,
    roundTime,
    isRoundActive,
    teamAStatus,
    teamBStatus,
    teamATime,
    teamBTime,
    roundWinner,
    bothTeamsAnswered,
    roundNumber,
    finished,
    totalRounds,
    handleAnswer,
    startNewRound,
  }
}
