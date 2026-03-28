import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useModuleStore } from '../hooks/useModuleStore'
import { QuestionEditor } from './QuestionEditor'
import { AIQuestionGenerator } from './AIQuestionGenerator'

// ===== CONSTANTS =====
const ICONS = [
  'sailing', 'factory', 'engineering', 'science', 'school', 'auto_stories',
  'hub', 'route', 'inventory', 'forklift', 'local_shipping', 'warehouse',
  'calculate', 'map', 'account_tree', 'eco', 'health_and_safety', 'gavel',
  'precision_manufacturing', 'groups', 'track_changes', 'fact_check',
  'psychology', 'menu_book',
]

const COLORS = [
  { id: 'orange', label: 'Orange', bg: 'bg-[#fea52e]/20', text: 'text-[#fea52e]', dot: 'bg-[#fea52e]' },
  { id: 'blue', label: 'Bleu', bg: 'bg-[#699cff]/20', text: 'text-[#699cff]', dot: 'bg-[#699cff]' },
  { id: 'red', label: 'Rouge', bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
  { id: 'green', label: 'Vert', bg: 'bg-green-500/20', text: 'text-green-400', dot: 'bg-green-400' },
]

const LEVELS = ['NIV 01', 'NIV 02', 'NIV 03', 'NIV 04', 'NIV 05']

const STEPS = [
  { id: 1, label: 'Infos', icon: 'info' },
  { id: 2, label: 'Questions', icon: 'quiz' },
  { id: 3, label: 'Révision', icon: 'rule' },
  { id: 4, label: 'Config', icon: 'tune' },
]

const typeLabel = { qcm: 'QCM', vocabulaire: 'VOCAB', calcul: 'CALCUL' }
const typeColor = {
  qcm: 'bg-[#699cff]/20 text-[#699cff]',
  vocabulaire: 'bg-green-500/20 text-green-400',
  calcul: 'bg-[#fea52e]/20 text-[#fea52e]',
}

const colorStyle = (colorId) => {
  const c = COLORS.find((c) => c.id === colorId) || COLORS[0]
  return { bg: c.bg, text: c.text }
}

// ===== STEP 1: MODULE INFO =====
const StepModuleInfo = ({ info, onChange }) => (
  <div className="space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
          Nom du module *
        </label>
        <input
          type="text"
          value={info.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Ex: Transport Maritime Avancé"
          className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
          Matière / Expertise *
        </label>
        <input
          type="text"
          value={info.subject}
          onChange={(e) => onChange({ subject: e.target.value })}
          placeholder="Ex: Incoterms, Gestion des stocks..."
          className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
        />
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
        Description
      </label>
      <textarea
        value={info.description}
        onChange={(e) => onChange({ description: e.target.value })}
        rows={3}
        placeholder="Décrivez le contenu et les objectifs de ce module..."
        className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e] resize-none"
      />
    </div>

    {/* Icon picker */}
    <div>
      <label className="block text-xs font-bold text-gray-400 tracking-widest mb-3 uppercase">
        Icône
      </label>
      <div className="grid grid-cols-8 gap-2">
        {ICONS.map((ic) => (
          <button
            key={ic}
            onClick={() => onChange({ icon: ic })}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              info.icon === ic
                ? `${colorStyle(info.color).bg} border-2 border-[#fea52e]`
                : 'bg-[#1a1a2e] border border-white/5 hover:border-white/20'
            }`}
            title={ic}
          >
            <span className={`material-icons text-lg ${info.icon === ic ? colorStyle(info.color).text : 'text-gray-500'}`}>
              {ic}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Color picker */}
    <div>
      <label className="block text-xs font-bold text-gray-400 tracking-widest mb-3 uppercase">
        Couleur
      </label>
      <div className="flex gap-3">
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange({ color: c.id })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              info.color === c.id
                ? 'border-white/20 bg-[#252538]'
                : 'border-white/5 bg-[#1a1a2e] hover:border-white/10'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${c.dot}`} />
            <span className={`text-xs font-bold ${info.color === c.id ? c.text : 'text-gray-500'}`}>
              {c.label}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Level */}
    <div>
      <label className="block text-xs font-bold text-gray-400 tracking-widest mb-3 uppercase">
        Niveau
      </label>
      <div className="flex gap-2 flex-wrap">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => onChange({ level: lvl })}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              info.level === lvl
                ? 'bg-[#fea52e] text-[#0c0c1f]'
                : 'bg-[#1a1a2e] text-gray-500 border border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  </div>
)

// ===== STEP 2: QUESTION GENERATION =====
const StepQuestionGeneration = ({ moduleInfo, onAddQuestions }) => {
  const [activeTab, setActiveTab] = useState('ai')
  const [showEditor, setShowEditor] = useState(false)
  const [jsonError, setJsonError] = useState(null)

  const handleJsonImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        const questions = Array.isArray(parsed) ? parsed : parsed.questions || []
        if (!questions.length) throw new Error('Aucune question trouvée')
        onAddQuestions(questions.map((q, i) => ({ ...q, id: q.id || `cq_${Date.now()}_${i}` })))
        setJsonError(null)
      } catch (err) {
        setJsonError('Format JSON invalide: ' + err.message)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const tabs = [
    { id: 'ai', label: 'IA', icon: 'auto_awesome' },
    { id: 'manual', label: 'Manuel', icon: 'edit' },
    { id: 'json', label: 'Import JSON', icon: 'upload_file' },
  ]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); setShowEditor(false) }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === t.id
                ? 'bg-[#252538] text-white border border-white/10'
                : 'text-gray-500 hover:text-white bg-[#1a1a2e] border border-white/5'
            }`}
          >
            <span className="material-icons text-sm">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* AI Tab */}
      {activeTab === 'ai' && (
        <AIQuestionGenerator
          onQuestionsGenerated={onAddQuestions}
          moduleInfo={moduleInfo}
        />
      )}

      {/* Manual Tab */}
      {activeTab === 'manual' && (
        <div>
          {showEditor ? (
            <QuestionEditor
              question={null}
              onSave={(q) => { onAddQuestions([q]); setShowEditor(false) }}
              onCancel={() => setShowEditor(false)}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-3xl text-gray-500">edit</span>
              </div>
              <p className="text-gray-400 text-sm mb-5">Créez vos questions une par une</p>
              <button
                onClick={() => setShowEditor(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#fea52e] to-[#e89420] rounded-xl text-[#0c0c1f] font-bold text-sm"
              >
                + Nouvelle question
              </button>
            </div>
          )}
        </div>
      )}

      {/* JSON Import Tab */}
      {activeTab === 'json' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-3xl text-gray-500">upload_file</span>
          </div>
          <p className="text-gray-400 text-sm mb-2">Importez un fichier JSON avec vos questions</p>
          <p className="text-gray-600 text-xs mb-5">
            Format: tableau de questions ou objet avec clé "questions"
          </p>
          <label className="px-6 py-3 bg-[#1a1a2e] border border-white/10 rounded-xl text-white font-bold text-sm cursor-pointer hover:bg-[#252538] transition-all inline-block">
            Choisir un fichier JSON
            <input type="file" accept=".json" onChange={handleJsonImport} className="hidden" />
          </label>
          {jsonError && (
            <p className="text-red-400 text-xs mt-3 bg-red-500/10 px-4 py-2 rounded-xl">{jsonError}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ===== STEP 3: REVIEW =====
const StepReview = ({ questions, onUpdate, onDelete, onReorder }) => {
  const [editingId, setEditingId] = useState(null)

  if (questions.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="material-icons text-5xl text-gray-600 mb-3 block">quiz</span>
        <p className="text-gray-400">Aucune question ajoutée</p>
        <p className="text-gray-600 text-sm mt-1">Retournez à l'étape précédente pour ajouter des questions</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">
          <span className="text-white font-bold">{questions.length}</span> question{questions.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
        {questions.map((q, index) => (
          <div key={q.id}>
            {editingId === q.id ? (
              <QuestionEditor
                question={q}
                onSave={(updated) => { onUpdate(updated); setEditingId(null) }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-4"
              >
                <div className="flex items-start gap-3">
                  {/* Order controls */}
                  <div className="flex flex-col gap-1 flex-shrink-0 mt-1">
                    <button
                      onClick={() => onReorder(index, index - 1)}
                      disabled={index === 0}
                      className="text-gray-600 hover:text-white disabled:opacity-20 transition-colors"
                    >
                      <span className="material-icons text-sm">arrow_upward</span>
                    </button>
                    <button
                      onClick={() => onReorder(index, index + 1)}
                      disabled={index === questions.length - 1}
                      className="text-gray-600 hover:text-white disabled:opacity-20 transition-colors"
                    >
                      <span className="material-icons text-sm">arrow_downward</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-600 text-xs font-bold">#{index + 1}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeColor[q.type] || 'bg-gray-500/20 text-gray-400'}`}>
                        {typeLabel[q.type] || q.type}
                      </span>
                      {q.aiGenerated && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400">IA</span>
                      )}
                      <span className="text-gray-600 text-xs">
                        Difficulté {q.difficulty || 1}
                      </span>
                    </div>
                    <p className="text-white text-sm line-clamp-2">{q.description}</p>

                    {/* Options preview for QCM */}
                    {q.type === 'qcm' && q.data?.options && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {q.data.options.map((opt, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-0.5 rounded ${
                              i === q.data.correctOption
                                ? 'bg-green-500/20 text-green-400 font-bold'
                                : 'bg-white/5 text-gray-500'
                            }`}
                          >
                            {['A', 'B', 'C', 'D'][i]}. {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setEditingId(q.id)}
                      className="w-8 h-8 rounded-lg bg-[#252538] border border-white/5 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                    >
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(q.id)}
                      className="w-8 h-8 rounded-lg bg-[#252538] border border-white/5 text-red-400 hover:text-red-300 transition-colors flex items-center justify-center"
                    >
                      <span className="material-icons text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== STEP 4: CONFIG =====
const StepConfig = ({ config, onChange }) => (
  <div className="space-y-6">
    {/* Questions per game */}
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">
          Questions par partie
        </label>
        <span className="text-[#fea52e] font-bold text-sm">{config.questionsPerGame}</span>
      </div>
      <input
        type="range"
        min="5" max="30"
        value={config.questionsPerGame}
        onChange={(e) => onChange({ questionsPerGame: parseInt(e.target.value) })}
        className="w-full accent-[#fea52e]"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>5</span><span>30</span>
      </div>
    </div>

    {/* Time per question */}
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">
          Temps par question
        </label>
        <span className="text-[#699cff] font-bold text-sm">{config.timePerQuestion}s</span>
      </div>
      <input
        type="range"
        min="10" max="60"
        value={config.timePerQuestion}
        onChange={(e) => onChange({ timePerQuestion: parseInt(e.target.value) })}
        className="w-full accent-[#699cff]"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>10s</span><span>60s</span>
      </div>
    </div>

    {/* Target class */}
    <div>
      <label className="block text-xs font-bold text-gray-400 tracking-widest mb-2 uppercase">
        Classe cible
      </label>
      <input
        type="text"
        value={config.targetClass}
        onChange={(e) => onChange({ targetClass: e.target.value })}
        placeholder="Ex: BTS TLOG, Terminale Pro..."
        className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#fea52e]"
      />
    </div>

    {/* Difficulty mode */}
    <div>
      <label className="block text-xs font-bold text-gray-400 tracking-widest mb-3 uppercase">
        Mode de difficulté
      </label>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          { id: 'easy', label: 'Facile', color: 'text-green-400' },
          { id: 'medium', label: 'Moyen', color: 'text-[#fea52e]' },
          { id: 'hard', label: 'Difficile', color: 'text-red-400' },
          { id: 'mixed', label: 'Mixte', color: 'text-[#699cff]' },
        ].map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => onChange({ difficulty: id })}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
              config.difficulty === id
                ? `bg-[#252538] border border-white/20 ${color}`
                : 'bg-[#1a1a2e] text-gray-500 border border-white/5 hover:border-white/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>

    {/* Publish toggle */}
    <div className="flex items-center justify-between bg-[#1a1a2e] border border-white/5 rounded-xl px-4 py-3">
      <div>
        <p className="text-white text-sm font-bold">Publier le module</p>
        <p className="text-gray-500 text-xs mt-0.5">Rendre visible à tous les élèves</p>
      </div>
      <button
        onClick={() => onChange({ isPublished: !config.isPublished })}
        className={`relative w-12 h-6 rounded-full transition-all ${config.isPublished ? 'bg-[#fea52e]' : 'bg-[#252538] border border-white/10'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${config.isPublished ? 'translate-x-7' : 'translate-x-1'}`} />
      </button>
    </div>
  </div>
)

// ===== MAIN COMPONENT =====
export const ModuleBuilder = ({ onBack, userProfile, editModule }) => {
  const { saveModule } = useModuleStore()
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [saveError, setSaveError] = useState(null)

  const [moduleInfo, setModuleInfo] = useState({
    title: editModule?.title || '',
    description: editModule?.description || '',
    icon: editModule?.icon || 'school',
    color: editModule?.color || 'orange',
    level: editModule?.level || 'NIV 01',
    subject: editModule?.subject || '',
  })

  const [questions, setQuestions] = useState(editModule?.questions || [])

  const [config, setConfig] = useState({
    questionsPerGame: editModule?.config?.questionsPerGame || 10,
    timePerQuestion: editModule?.config?.timePerQuestion || 30,
    targetClass: editModule?.config?.targetClass || userProfile?.class || '',
    difficulty: editModule?.config?.difficulty || 'medium',
    isPublished: editModule?.isPublished || false,
  })

  const updateModuleInfo = (patch) => setModuleInfo((prev) => ({ ...prev, ...patch }))
  const updateConfig = (patch) => setConfig((prev) => ({ ...prev, ...patch }))

  const addQuestions = (newQs) => {
    setQuestions((prev) => {
      const existingIds = new Set(prev.map((q) => q.id))
      const toAdd = newQs.filter((q) => !existingIds.has(q.id))
      return [...prev, ...toAdd]
    })
  }

  const updateQuestion = (updated) => {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)))
  }

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  const reorderQuestion = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= questions.length) return
    const updated = [...questions]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    setQuestions(updated)
  }

  const canProceedStep1 = moduleInfo.title.trim() && moduleInfo.subject.trim()
  const canProceedStep2 = questions.length > 0
  const canProceedStep3 = true

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      const module = {
        id: editModule?.id,
        ...moduleInfo,
        createdBy: {
          name: userProfile?.name || 'Professeur',
          class: userProfile?.class || '',
          role: userProfile?.role || 'teacher',
        },
        isCustom: true,
        isPublished: config.isPublished,
        config: {
          questionsPerGame: config.questionsPerGame,
          timePerQuestion: config.timePerQuestion,
          targetClass: config.targetClass,
          difficulty: config.difficulty,
        },
        questions,
        progress: 0,
      }
      saveModule(module)
      setSavedSuccess(true)
      setTimeout(() => onBack(), 1500)
    } catch (err) {
      console.error('[ModuleBuilder] Failed to save module:', err)
      setSaveError('Erreur lors de la sauvegarde. Veuillez réessayer.')
    } finally {
      setIsSaving(false)
    }
  }

  const cs = COLORS.find((c) => c.id === moduleInfo.color) || COLORS[0]

  return (
    <div className="min-h-screen bg-[#0c0c1f] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0c0c1f]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-[#1a1a2e] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-icons">arrow_back</span>
            </button>
            <div>
              <h1 className="text-white font-black text-lg">
                {editModule ? 'Modifier le module' : 'Créer un module'}
              </h1>
              <p className="text-gray-500 text-xs">
                {moduleInfo.title || 'Nouveau module personnalisé'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {moduleInfo.icon && (
              <div className={`w-10 h-10 rounded-xl ${cs.bg} flex items-center justify-center`}>
                <span className={`material-icons ${cs.text}`}>{moduleInfo.icon}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="border-b border-white/5 bg-[#121225]/50 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex">
            {STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  if (s.id < step) setStep(s.id)
                }}
                className={`flex-1 flex flex-col items-center py-4 gap-1 transition-all ${
                  s.id === step
                    ? 'border-b-2 border-[#fea52e]'
                    : s.id < step
                    ? 'border-b-2 border-green-500/50'
                    : 'border-b-2 border-transparent'
                }`}
              >
                <span className={`material-icons text-lg ${
                  s.id === step ? 'text-[#fea52e]' : s.id < step ? 'text-green-400' : 'text-gray-600'
                }`}>
                  {s.id < step ? 'check_circle' : s.icon}
                </span>
                <span className={`text-xs font-bold tracking-wider hidden sm:block ${
                  s.id === step ? 'text-[#fea52e]' : s.id < step ? 'text-green-400' : 'text-gray-600'
                }`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 md:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step title */}
              <div className="mb-6">
                <p className="text-[#fea52e] text-xs font-bold tracking-[0.2em] mb-1 uppercase">
                  Étape {step} / {STEPS.length}
                </p>
                <h2 className="text-2xl font-black text-white italic">
                  {step === 1 && 'Informations du module'}
                  {step === 2 && 'Ajout des questions'}
                  {step === 3 && 'Révision des questions'}
                  {step === 4 && 'Configuration finale'}
                </h2>
              </div>

              <div className="bg-[#121225]/80 border border-white/5 rounded-3xl p-6 md:p-8">
                {step === 1 && (
                  <StepModuleInfo info={moduleInfo} onChange={updateModuleInfo} />
                )}
                {step === 2 && (
                  <StepQuestionGeneration
                    moduleInfo={moduleInfo}
                    onAddQuestions={(qs) => { addQuestions(qs); }}
                  />
                )}
                {step === 3 && (
                  <StepReview
                    questions={questions}
                    onUpdate={updateQuestion}
                    onDelete={deleteQuestion}
                    onReorder={reorderQuestion}
                  />
                )}
                {step === 4 && (
                  <StepConfig config={config} onChange={updateConfig} />
                )}
              </div>

              {/* Step indicator for questions */}
              {step === 2 && questions.length > 0 && (
                <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="material-icons text-green-400 text-sm">check_circle</span>
                  <p className="text-green-400 text-sm font-medium">
                    {questions.length} question{questions.length > 1 ? 's' : ''} ajoutée{questions.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {saveError && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="material-icons text-red-400 text-sm">error</span>
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : onBack()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1a1a2e] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all text-sm font-bold"
            >
              <span className="material-icons text-sm">arrow_back</span>
              {step === 1 ? 'Annuler' : 'Précédent'}
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2)
                }
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#fea52e] to-[#e89420] text-[#0c0c1f] font-bold text-sm hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
              >
                Suivant
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={isSaving || savedSuccess}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#fea52e] to-[#e89420] text-[#0c0c1f] hover:scale-[1.02] disabled:hover:scale-100"
              >
                {savedSuccess ? (
                  <>
                    <span className="material-icons text-sm">check</span>
                    Module sauvegardé !
                  </>
                ) : isSaving ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="material-icons text-sm"
                    >
                      autorenew
                    </motion.span>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm">save</span>
                    Sauvegarder le module
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleBuilder
