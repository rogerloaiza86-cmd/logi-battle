import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { aiService } from '../services/aiService'

const COUNT_OPTIONS = [5, 10, 15, 20, 30]
const FORMAT_OPTIONS = [
  { id: 'qcm', label: 'QCM' },
  { id: 'vocabulaire', label: 'Vocabulaire' },
  { id: 'calcul', label: 'Calcul' },
  { id: 'mixed', label: 'Mixte' },
]
const DIFFICULTY_OPTIONS = [
  { id: 'easy', label: 'Facile' },
  { id: 'medium', label: 'Moyen' },
  { id: 'hard', label: 'Difficile' },
  { id: 'mixed', label: 'Varié' },
]

const typeLabel = { qcm: 'QCM', vocabulaire: 'VOCAB', calcul: 'CALCUL' }
const typeColor = { qcm: 'bg-[#699cff]/20 text-[#699cff]', vocabulaire: 'bg-green-500/20 text-green-400', calcul: 'bg-[#fea52e]/20 text-[#fea52e]' }

export const AIQuestionGenerator = ({ onQuestionsGenerated, moduleInfo }) => {
  const [topic, setTopic] = useState('')
  const [courseText, setCourseText] = useState('')
  const [showCourseText, setShowCourseText] = useState(false)
  const [count, setCount] = useState(10)
  const [format, setFormat] = useState('qcm')
  const [difficulty, setDifficulty] = useState('medium')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState([])
  const [selected, setSelected] = useState(new Set())

  const handleGenerate = async () => {
    if (!topic.trim()) return
    setIsLoading(true)
    setError(null)
    setPreview([])

    try {
      const questions = await aiService.generateQuestions({
        topic: moduleInfo?.subject ? `${topic} (module: ${moduleInfo.subject})` : topic,
        courseText: showCourseText ? courseText : '',
        count,
        format,
        difficulty,
        language: 'fr',
      })
      setPreview(questions)
      setSelected(new Set(questions.map((q) => q.id)))
    } catch (err) {
      setError(err?.message || 'Une erreur est survenue lors de la génération.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleAcceptAll = () => {
    onQuestionsGenerated(preview)
    setPreview([])
    setSelected(new Set())
  }

  const handleAcceptSelected = () => {
    onQuestionsGenerated(preview.filter((q) => selected.has(q.id)))
    setPreview([])
    setSelected(new Set())
  }

  return (
    <div className="space-y-5">
      {/* Topic input */}
      <div>
        <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
          Thème ou sujet du cours
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ex: Transport maritime et Incoterms 2020, Gestion des stocks..."
          className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
        />
      </div>

      {/* Optional course text */}
      <div>
        <button
          onClick={() => setShowCourseText((v) => !v)}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <span className="material-icons text-sm">{showCourseText ? 'expand_less' : 'expand_more'}</span>
          Coller un extrait de cours (optionnel)
        </button>
        {showCourseText && (
          <textarea
            value={courseText}
            onChange={(e) => setCourseText(e.target.value)}
            rows={5}
            placeholder="Collez ici un extrait de votre cours pour des questions plus précises..."
            className="mt-2 w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e] resize-none"
          />
        )}
      </div>

      {/* Config row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Count */}
        <div>
          <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
            Nombre
          </label>
          <select
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#fea52e]"
          >
            {COUNT_OPTIONS.map((c) => (
              <option key={c} value={c}>{c} questions</option>
            ))}
          </select>
        </div>

        {/* Format */}
        <div>
          <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
            Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#fea52e]"
          >
            {FORMAT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
            Difficulté
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#fea52e]"
          >
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!topic.trim() || isLoading}
        className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-[#699cff] to-[#4a7fe8] text-white hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
      >
        {isLoading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="material-icons text-lg"
            >
              autorenew
            </motion.span>
            Génération en cours...
          </>
        ) : (
          <>
            <span className="material-icons text-lg">auto_awesome</span>
            Générer avec l'IA
            {!aiService.isConfigured() && (
              <span className="text-xs opacity-70">(mode démo)</span>
            )}
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-icons text-red-400 text-sm">error</span>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
          <button onClick={handleGenerate} className="text-red-400 text-xs underline hover:no-underline">
            Réessayer
          </button>
        </div>
      )}

      {/* Preview */}
      <AnimatePresence>
        {preview.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-white">
                {preview.length} questions générées
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(new Set(preview.map((q) => q.id)))}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Tout sélectionner
                </button>
                <span className="text-gray-600">·</span>
                <button
                  onClick={() => setSelected(new Set())}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Désélectionner
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 mb-4">
              {preview.map((q) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => toggleSelect(q.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selected.has(q.id)
                      ? 'bg-[#252538] border-white/10'
                      : 'bg-[#1a1a2e] border-white/5 opacity-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 transition-all ${
                    selected.has(q.id) ? 'bg-[#fea52e] border-[#fea52e]' : 'border-white/20'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeColor[q.type] || 'bg-gray-500/20 text-gray-400'}`}>
                        {typeLabel[q.type] || q.type.toUpperCase()}
                      </span>
                      {q.aiGenerated && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400">
                          IA
                        </span>
                      )}
                    </div>
                    <p className="text-white text-xs line-clamp-2">{q.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAcceptSelected}
                disabled={selected.size === 0}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#1a1a2e] border border-white/10 text-white hover:bg-[#252538] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Accepter sélectionnés ({selected.size})
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#fea52e] to-[#e89420] text-[#0c0c1f] hover:scale-[1.02] transition-all"
              >
                Accepter tout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AIQuestionGenerator
