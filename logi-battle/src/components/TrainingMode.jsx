import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import { generateNextQuestion } from '../utils/questionGenerator'

const ROUND_TIME = 45

export const TrainingMode = ({ onBack }) => {
  const [selectedModule, setSelectedModule] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [question, setQuestion] = useState(null)
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME)
  const [isRoundActive, setIsRoundActive] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [questionHistory, setQuestionHistory] = useState([])
  const roundStartTime = useRef(null)

  const modules = [
    { id: 'palettisation', title: 'Palettisation', icon: 'inventory_2', color: 'orange', description: 'Maîtrisez les calculs de palettisation' },
    { id: 'cout_transport', title: 'Coût de Transport', icon: 'local_shipping', color: 'blue', description: 'Optimisez vos coûts logistiques' },
    { id: 'loading_plan', title: 'Plan de Chargement', icon: 'conveyor_belt', color: 'orange', description: 'Calculez les plans de chargement' },
    { id: 'vocabulaire', title: 'Vocabulaire', icon: 'menu_book', color: 'red', description: 'Apprenez la terminologie logistique' },
    { id: 'supply_chain', title: 'Supply Chain', icon: 'account_tree', color: 'blue', description: 'Comprendre la chaîne logistique' },
    { id: 'reception', title: 'Réception', icon: 'fact_check', color: 'orange', description: 'Maîtrisez la réception marchandise' },
    { id: 'stock', title: 'Gestion de Stock', icon: 'warehouse', color: 'orange', description: 'Optimisez la gestion des stocks' },
    { id: 'safety', title: 'Sécurité', icon: 'health_and_safety', color: 'red', description: 'Apprenez les protocoles de sécurité' },
    { id: 'traceability', title: 'Traçabilité', icon: 'track_changes', color: 'blue', description: 'Maîtrisez la traçabilité' },
    { id: 'green', title: 'Green Logistique', icon: 'eco', color: 'green', description: 'Logistique durable' },
    { id: 'team_leader', title: 'Management', icon: 'groups', color: 'blue', description: 'Compétences de team leader' },
    { id: 'jit', title: 'Logistique JIT', icon: 'precision_manufacturing', color: 'green', description: 'Just-in-Time' },
    { id: 'route', title: 'Routes', icon: 'map', color: 'blue', description: 'Optimisation des routes' },
    { id: 'legal', title: 'Légal', icon: 'gavel', color: 'orange', description: 'Connaissances légales' },
    { id: 'math', title: 'Calculs', icon: 'calculate', color: 'blue', description: 'Calculs logistiques avancés' },
    { id: 'culture', title: 'Culture G', icon: 'psychology', color: 'orange', description: 'Culture générale logistique' },
  ]

  useEffect(() => {
    let interval
    if (isRoundActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRoundActive) {
      handleTimeout()
    }
    return () => clearInterval(interval)
  }, [isRoundActive, timeLeft])

  const startTraining = (moduleId) => {
    setSelectedModule(moduleId)
    setIsPlaying(true)
    setScore(0)
    setStreak(0)
    setTotalAnswered(0)
    setCorrectAnswers(0)
    setQuestionHistory([])
    startNewQuestion(moduleId)
  }

  const startNewQuestion = (moduleId) => {
    const newQuestion = {
      ...generateNextQuestion(moduleId || selectedModule),
      id: `q_${Date.now()}`,
    }
    setQuestion(newQuestion)
    setTimeLeft(ROUND_TIME)
    setIsRoundActive(true)
    roundStartTime.current = Date.now()
  }

  const handleAnswer = (isCorrect) => {
    setIsRoundActive(false)
    setTotalAnswered(prev => prev + 1)
    
    const responseTime = Date.now() - roundStartTime.current
    const timeBonus = Math.max(0, Math.floor(timeLeft / 5) * 10)

    if (isCorrect) {
      const newStreak = streak + 1
      setCorrectAnswers(prev => prev + 1)
      setStreak(newStreak)
      setBestStreak(prev => Math.max(prev, newStreak))
      const basePoints = 100
      const streakBonus = newStreak * 10
      setScore(prev => prev + basePoints + timeBonus + streakBonus)
      setQuestionHistory(prev => [...prev, {
        question: question?.title || 'Question',
        isCorrect,
        time: responseTime,
        points: 100 + timeBonus + streakBonus
      }])
    } else {
      setStreak(0)
      setQuestionHistory(prev => [...prev, {
        question: question?.title || 'Question',
        isCorrect,
        time: responseTime,
        points: 0
      }])
    }

    setTimeout(() => {
      if (totalAnswered + 1 < 10) {
        startNewQuestion()
      } else {
        setShowResults(true)
      }
    }, 2000)
  }

  const handleTimeout = () => {
    setIsRoundActive(false)
    setStreak(0)
    setTotalAnswered(prev => prev + 1)
    setQuestionHistory(prev => [...prev, {
      question: question?.title || 'Question',
      isCorrect: false,
      time: ROUND_TIME * 1000,
      points: 0,
      timeout: true
    }])

    setTimeout(() => {
      if (totalAnswered + 1 < 10) {
        startNewQuestion()
      } else {
        setShowResults(true)
      }
    }, 2000)
  }

  const handleStopTraining = () => {
    setShowResults(true)
  }

  const resetTraining = () => {
    setShowResults(false)
    setIsPlaying(false)
    setSelectedModule(null)
    setScore(0)
    setStreak(0)
    setTotalAnswered(0)
    setCorrectAnswers(0)
    setQuestionHistory([])
  }

  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0

  // Mode jeu actif
  if (isPlaying && !showResults) {
    return (
      <div className="min-h-screen bg-[#0c0c1f] flex flex-col">
        {/* Header */}
        <header className="bg-[#121225] border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResults(true)}
                className="w-10 h-10 rounded-xl bg-[#1a1a2e] hover:bg-[#252538] flex items-center justify-center transition-colors"
              >
                <span className="material-icons text-gray-400">close</span>
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Mode Entraînement</h1>
                <p className="text-xs text-gray-500">
                  {modules.find(m => m.id === selectedModule)?.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Score */}
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Score</p>
                <p className="text-2xl font-black text-[#fea52e]">{score.toLocaleString()}</p>
              </div>
              
              {/* Streak */}
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Série</p>
                <p className="text-2xl font-black text-[#699cff]">{streak}🔥</p>
              </div>
              
              {/* Progress */}
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Question</p>
                <p className="text-xl font-bold text-white">{totalAnswered + 1}/10</p>
              </div>
            </div>
          </div>
        </header>

        {/* Timer Bar */}
        <div className="w-full h-1 bg-[#1a1a2e]">
          <motion.div
            className={`h-full ${
              timeLeft <= 10 ? 'bg-red-500' : timeLeft <= 20 ? 'bg-yellow-500' : 'bg-[#fea52e]'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / ROUND_TIME) * 100}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-xl">
            {question && (
              question.isMCQ || question.type === 'vocabulaire' ? (
                <VocabularyCard
                  question={question}
                  team="A"
                  onAnswer={handleAnswer}
                  isAnswering={!isRoundActive}
                  disabled={!isRoundActive}
                  showCorrectAnswer={!isRoundActive}
                />
              ) : (
                <QuestionCard
                  question={question}
                  team="A"
                  onAnswer={handleAnswer}
                  isAnswering={!isRoundActive}
                  disabled={!isRoundActive}
                  showCorrectAnswer={!isRoundActive}
                />
              )
            )}
          </div>
        </main>

        {/* Footer Stats */}
        <footer className="bg-[#121225] border-t border-white/5 px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                Précision: <span className="text-white font-bold">{accuracy}%</span>
              </span>
              <span className="text-gray-500">
                Correctes: <span className="text-green-400 font-bold">{correctAnswers}</span>
              </span>
            </div>
            <button
              onClick={handleStopTraining}
              className="text-red-400 hover:text-red-300 text-sm font-medium"
            >
              Arrêter l'entraînement
            </button>
          </div>
        </footer>
      </div>
    )
  }

  // Résultats
  if (showResults) {
    return (
      <div className="min-h-screen bg-[#0c0c1f] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-[#1a1a2e] rounded-3xl border border-white/5 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-black text-white mb-2">Entraînement Terminé!</h2>
              <p className="text-gray-400">
                {modules.find(m => m.id === selectedModule)?.title}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#121225] rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-[#fea52e]">{score.toLocaleString()}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Score Total</p>
              </div>
              <div className="bg-[#121225] rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-[#699cff]">{accuracy}%</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Précision</p>
              </div>
              <div className="bg-[#121225] rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-green-400">{correctAnswers}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Correctes</p>
              </div>
              <div className="bg-[#121225] rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-purple-400">{bestStreak}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">Meilleure Série</p>
              </div>
            </div>

            {/* History */}
            {questionHistory.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Historique</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {questionHistory.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        item.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-icons ${item.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {item.isCorrect ? 'check_circle' : 'cancel'}
                        </span>
                        <span className="text-sm text-gray-300">Question {index + 1}</span>
                        {item.timeout && <span className="text-xs text-red-400">(Temps écoulé)</span>}
                      </div>
                      <span className={`font-bold ${item.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        +{item.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={resetTraining}
                className="flex-1 py-4 bg-[#121225] hover:bg-[#252538] rounded-xl text-white font-bold transition-colors"
              >
                Changer de module
              </button>
              <button
                onClick={() => {
                  setShowResults(false)
                  setScore(0)
                  setStreak(0)
                  setTotalAnswered(0)
                  setCorrectAnswers(0)
                  setQuestionHistory([])
                  startNewQuestion()
                }}
                className="flex-1 py-4 bg-[#fea52e] hover:bg-[#e89420] rounded-xl text-[#0c0c1f] font-bold transition-colors"
              >
                Rejouer
              </button>
            </div>

            <button
              onClick={onBack}
              className="w-full mt-4 py-3 text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Retour au menu
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Sélection du module
  return (
    <div className="min-h-screen bg-[#0c0c1f]">
      {/* Header */}
      <header className="bg-[#121225] border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-[#1a1a2e] hover:bg-[#252538] flex items-center justify-center transition-colors"
            >
              <span className="material-icons text-gray-400">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Mode Entraînement</h1>
              <p className="text-xs text-gray-500">Pratiquez à votre rythme</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Intro */}
        <div className="mb-8">
          <p className="text-[#fea52e] text-xs font-bold uppercase tracking-[0.2em] mb-2">Pratique Solo</p>
          <h2 className="text-3xl font-black text-white italic">CHOISISSEZ VOTRE MODULE</h2>
          <p className="text-gray-400 mt-2">Entraînez-vous sur des questions spécifiques sans la pression du temps.</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <motion.button
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => startTraining(module.id)}
              className="bg-[#1a1a2e] rounded-3xl p-5 border border-white/5 hover:border-[#fea52e]/50 hover:bg-[#252538] transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                module.color === 'orange' ? 'bg-[#fea52e]/20 text-[#fea52e]' :
                module.color === 'blue' ? 'bg-[#699cff]/20 text-[#699cff]' :
                module.color === 'red' ? 'bg-red-500/20 text-red-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                <span className="material-icons">{module.icon}</span>
              </div>
              
              <h3 className="text-white font-bold text-lg mb-1">{module.title}</h3>
              <p className="text-gray-500 text-sm">{module.description}</p>
              
              <div className="mt-4 flex items-center gap-2 text-[#fea52e] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Commencer</span>
                <span className="material-icons text-sm">arrow_forward</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#fea52e]/20 flex items-center justify-center">
                <span className="material-icons text-[#fea52e]">emoji_events</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">1,250</p>
                <p className="text-xs text-gray-500 uppercase">Meilleur Score</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#699cff]/20 flex items-center justify-center">
                <span className="material-icons text-[#699cff]">local_fire_department</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">8</p>
                <p className="text-xs text-gray-500 uppercase">Série Max</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <span className="material-icons text-green-400">check_circle</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">47</p>
                <p className="text-xs text-gray-500 uppercase">Questions Réussies</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TrainingMode
