import React, { useState } from 'react'
import { motion } from 'framer-motion'

const TYPES = [
  { id: 'qcm', label: 'QCM', icon: 'quiz' },
  { id: 'vocabulaire', label: 'Vocabulaire', icon: 'menu_book' },
  { id: 'calcul', label: 'Calcul', icon: 'calculate' },
]

const defaultQcm = () => ({
  type: 'qcm',
  description: '',
  data: { options: ['', '', '', ''], correctOption: 0 },
  difficulty: 1,
})

const defaultVocabulaire = () => ({
  type: 'vocabulaire',
  description: '',
  data: { term: '', definition: '', distractors: ['', '', ''] },
  difficulty: 1,
})

const defaultCalcul = () => ({
  type: 'calcul',
  description: '',
  data: { correctAnswer: '', unit: '', tolerance: 0 },
  difficulty: 1,
})

const defaultByType = { qcm: defaultQcm, vocabulaire: defaultVocabulaire, calcul: defaultCalcul }

export const QuestionEditor = ({ question, onSave, onCancel }) => {
  const initType = question?.type || 'qcm'
  const [type, setType] = useState(initType)

  const buildInitial = (t, q) => {
    if (!q) return defaultByType[t]()
    return { ...defaultByType[t](), ...q, type: t }
  }

  const [form, setForm] = useState(() => buildInitial(initType, question))

  const handleTypeChange = (newType) => {
    setType(newType)
    setForm(buildInitial(newType, null))
  }

  const updateData = (key, value) => {
    setForm((f) => ({ ...f, data: { ...f.data, [key]: value } }))
  }

  const updateOption = (index, value) => {
    const options = [...(form.data.options || ['', '', '', ''])]
    options[index] = value
    updateData('options', options)
  }

  const updateDistractor = (index, value) => {
    const distractors = [...(form.data.distractors || ['', '', ''])]
    distractors[index] = value
    updateData('distractors', distractors)
  }

  const handleSave = () => {
    const id = form.id || `cq_${Date.now()}`
    const saved = { ...form, id, aiGenerated: form.aiGenerated || false }

    // Normalize vocabulaire: build options from definition + distractors
    if (type === 'vocabulaire') {
      const { definition, distractors = ['', '', ''] } = saved.data
      saved.data = {
        ...saved.data,
        options: [definition, ...distractors],
        correctOption: 0,
      }
    }

    onSave(saved)
  }

  const isValid = () => {
    if (!form.description.trim()) return false
    if (type === 'qcm') {
      const opts = form.data.options || []
      return opts.every((o) => o.trim())
    }
    if (type === 'vocabulaire') {
      return form.data.term?.trim() && form.data.definition?.trim()
    }
    if (type === 'calcul') {
      return form.data.correctAnswer !== '' && form.data.unit?.trim()
    }
    return true
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#121225] border border-white/10 rounded-3xl p-6 w-full max-w-xl mx-auto"
    >
      <h3 className="text-white font-bold text-lg mb-5">
        {question ? 'Modifier la question' : 'Nouvelle question'}
      </h3>

      {/* Type selector */}
      <div className="flex gap-2 mb-5">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTypeChange(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold tracking-wider transition-all ${
              type === t.id
                ? 'bg-[#fea52e] text-[#0c0c1f]'
                : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <span className="material-icons text-sm">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
          {type === 'vocabulaire' ? 'Terme / Question' : 'Énoncé de la question'}
        </label>
        {type === 'vocabulaire' ? (
          <input
            type="text"
            value={form.data.term || ''}
            onChange={(e) => {
              updateData('term', e.target.value)
              setForm((f) => ({ ...f, description: `Définissez le terme: ${e.target.value}` }))
            }}
            placeholder="Ex: Incoterm CIF"
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
          />
        ) : (
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            placeholder="Saisissez l'énoncé de votre question..."
            className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e] resize-none"
          />
        )}
      </div>

      {/* QCM fields */}
      {type === 'qcm' && (
        <div className="mb-4 space-y-2">
          <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
            Options (sélectionnez la bonne réponse)
          </label>
          {['A', 'B', 'C', 'D'].map((letter, i) => (
            <div key={letter} className="flex items-center gap-3">
              <button
                onClick={() => updateData('correctOption', i)}
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all ${
                  form.data.correctOption === i
                    ? 'border-[#fea52e] bg-[#fea52e]'
                    : 'border-white/20 bg-transparent'
                }`}
              />
              <div className="flex-1 flex items-center gap-2">
                <span className={`text-xs font-bold w-5 ${form.data.correctOption === i ? 'text-[#fea52e]' : 'text-gray-500'}`}>
                  {letter}
                </span>
                <input
                  type="text"
                  value={(form.data.options || ['', '', '', ''])[i] || ''}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${letter}`}
                  className="flex-1 bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#fea52e]"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vocabulaire fields */}
      {type === 'vocabulaire' && (
        <div className="mb-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
              Définition correcte
            </label>
            <textarea
              value={form.data.definition || ''}
              onChange={(e) => updateData('definition', e.target.value)}
              rows={2}
              placeholder="Définition correcte du terme..."
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
              Définitions incorrectes (distracteurs)
            </label>
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                type="text"
                value={(form.data.distractors || ['', '', ''])[i] || ''}
                onChange={(e) => updateDistractor(i, e.target.value)}
                placeholder={`Distracteur ${i + 1}`}
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#fea52e] mb-2"
              />
            ))}
          </div>
        </div>
      )}

      {/* Calcul fields */}
      {type === 'calcul' && (
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
              Réponse numérique correcte
            </label>
            <input
              type="number"
              value={form.data.correctAnswer}
              onChange={(e) => updateData('correctAnswer', parseFloat(e.target.value) || '')}
              placeholder="Ex: 42"
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
              Unité
            </label>
            <input
              type="text"
              value={form.data.unit || ''}
              onChange={(e) => updateData('unit', e.target.value)}
              placeholder="Ex: palettes, €, km"
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
              Tolérance (%)
            </label>
            <input
              type="number"
              min="0"
              max="20"
              value={form.data.tolerance ?? 0}
              onChange={(e) => updateData('tolerance', parseInt(e.target.value) || 0)}
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
            />
          </div>
        </div>
      )}

      {/* Difficulty */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-400 tracking-widest mb-3 uppercase">
          Difficulté
        </label>
        <div className="flex gap-2">
          {[
            { v: 1, label: 'Facile', color: 'text-green-400' },
            { v: 2, label: 'Moyen', color: 'text-[#fea52e]' },
            { v: 3, label: 'Difficile', color: 'text-red-400' },
          ].map(({ v, label, color }) => (
            <button
              key={v}
              onClick={() => setForm((f) => ({ ...f, difficulty: v }))}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                form.difficulty === v
                  ? `bg-[#252538] border border-white/20 ${color}`
                  : 'bg-[#1a1a2e] text-gray-500 border border-white/5 hover:border-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-400 bg-[#1a1a2e] border border-white/5 hover:border-white/10 hover:text-white transition-all"
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          disabled={!isValid()}
          className="flex-1 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#fea52e] to-[#e89420] text-[#0c0c1f] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
        >
          Enregistrer
        </button>
      </div>
    </motion.div>
  )
}

export default QuestionEditor
