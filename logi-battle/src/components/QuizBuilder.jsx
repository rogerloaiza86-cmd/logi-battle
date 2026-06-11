import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import BrandMark from './BrandMark'
import { useCustomQuizStore, QUIZ_SUBJECTS, downloadQuizJSON } from '../hooks/useCustomQuizStore'

const emptyForm = () => ({ question: '', options: ['', '', '', ''], correctOption: 0, explanation: '' })

const LIBRARY_BASE = `${import.meta.env.BASE_URL}qcm-officiels/`

export const QuizBuilder = ({ onBack, onPlayQuiz, onHostQuiz }) => {
  const { quizzes, createQuiz, deleteQuiz, addQuestion, updateQuestion, deleteQuestion, importQuiz } =
    useCustomQuizStore()

  const [editingQuizId, setEditingQuizId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newSubject, setNewSubject] = useState('francais')
  const [form, setForm] = useState(emptyForm())
  const [editingIndex, setEditingIndex] = useState(null) // null = nouvelle question
  const [feedback, setFeedback] = useState(null)
  const fileInputRef = useRef(null)

  // Bibliothèque de QCM pré-faits alignés sur les programmes officiels (BO 2019)
  const [library, setLibrary] = useState([])
  const [libraryOpen, setLibraryOpen] = useState(false)
  useEffect(() => {
    fetch(`${LIBRARY_BASE}manifest.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setLibrary(Array.isArray(data) ? data : []))
      .catch(() => setLibrary([]))
  }, [])

  const handleImportFromLibrary = async (entry) => {
    try {
      const response = await fetch(`${LIBRARY_BASE}${entry.file}`)
      if (!response.ok) throw new Error()
      const result = importQuiz(await response.json())
      if (result.ok) {
        showFeedback(`« ${entry.title} » ajouté à vos QCM (${result.imported} questions) ✓`)
      } else {
        showFeedback(result.error, true)
      }
    } catch {
      showFeedback('Impossible de charger ce QCM de la bibliothèque.', true)
    }
  }

  const quiz = editingQuizId ? quizzes[editingQuizId] : null
  const quizList = Object.values(quizzes).sort((a, b) => b.updatedAt - a.updatedAt)

  const subjectLabel = (id) => QUIZ_SUBJECTS.find((s) => s.id === id)?.label || id

  const showFeedback = (message, isError = false) => {
    setFeedback({ message, isError })
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleCreate = () => {
    if (!newTitle.trim()) return
    const id = createQuiz(newTitle, newSubject)
    setNewTitle('')
    setEditingQuizId(id)
    setForm(emptyForm())
    setEditingIndex(null)
  }

  const handleSaveQuestion = () => {
    const ok =
      editingIndex === null
        ? addQuestion(editingQuizId, form)
        : updateQuestion(editingQuizId, editingIndex, form)
    if (!ok) {
      showFeedback('Question incomplète : énoncé, 4 réponses et la bonne réponse sont obligatoires.', true)
      return
    }
    showFeedback(editingIndex === null ? 'Question ajoutée ✓' : 'Question modifiée ✓')
    setForm(emptyForm())
    setEditingIndex(null)
  }

  const handleEditQuestion = (index) => {
    const q = quiz.questions[index]
    setForm({ question: q.question, options: [...q.options], correctOption: q.correctOption, explanation: q.explanation || '' })
    setEditingIndex(index)
  }

  const handleImportFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = importQuiz(reader.result)
      if (result.ok) {
        showFeedback(`QCM importé : ${result.imported} question(s)${result.skipped ? `, ${result.skipped} ignorée(s)` : ''} ✓`)
      } else {
        showFeedback(result.error, true)
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const setOption = (index, value) => {
    setForm((f) => {
      const options = [...f.options]
      options[index] = value
      return { ...f, options }
    })
  }

  return (
    <div className="min-h-screen geronimo-screen">
      {/* Header */}
      <header className="bg-[#0f2539] border-b border-white/5 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (editingQuizId ? setEditingQuizId(null) : onBack())}
              className="w-10 h-10 rounded-xl bg-[#1d3d59] hover:bg-[#234a68] flex items-center justify-center transition-colors"
            >
              <span className="material-icons text-gray-400">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">
                {quiz ? `Édition : ${quiz.title}` : 'QCM du professeur'}
              </h1>
              <p className="text-xs text-gray-500">
                {quiz ? `${subjectLabel(quiz.subject)} • ${quiz.questions.length} question(s)` : 'Créez vos quiz à partir de vos cours'}
              </p>
            </div>
          </div>
          <BrandMark compact className="hidden sm:flex" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {/* Feedback */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
              feedback.isError ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-green-500/15 text-green-400 border border-green-500/30'
            }`}
          >
            {feedback.message}
          </motion.div>
        )}

        {!quiz ? (
          <>
            {/* Création d'un QCM */}
            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5 mb-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-icons text-[#f4b942]">add_circle</span>
                Nouveau QCM
              </h2>
              <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  placeholder="Titre du QCM (ex : Chapitre 3 — La Révolution française)"
                  maxLength={60}
                  className="bg-[#0f2539] border-2 border-white/10 focus:border-[#f4b942] rounded-xl px-4 py-3 text-white transition-colors outline-none"
                />
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="bg-[#0f2539] border-2 border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                >
                  {QUIZ_SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <button
                  onClick={handleCreate}
                  disabled={!newTitle.trim()}
                  className="px-6 py-3 bg-[#f4b942] hover:bg-[#d99926] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-[#17314a] font-bold transition-colors"
                >
                  Créer
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-gray-400 hover:text-[#f4b942] flex items-center gap-1 transition-colors"
                >
                  <span className="material-icons text-sm">upload_file</span>
                  Importer un QCM partagé (.json)
                </button>
                <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={handleImportFile} className="hidden" />
              </div>
            </div>

            {/* Bibliothèque alignée sur les programmes officiels */}
            {library.length > 0 && (
              <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5 mb-6">
                <button
                  onClick={() => setLibraryOpen(!libraryOpen)}
                  className="w-full flex items-center justify-between"
                >
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-icons text-[#7fa99b]">auto_stories</span>
                    Bibliothèque — programmes officiels Bac Pro
                    <span className="text-xs text-gray-500 font-normal">({library.length} QCM prêts à l'emploi)</span>
                  </h2>
                  <span className="material-icons text-gray-400">
                    {libraryOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {libraryOpen && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-500 mb-3">
                      QCM alignés sur les programmes de la voie professionnelle (BO spécial n°5 du 11 avril 2019).
                      Ajoutez-les à vos QCM puis modifiez-les librement.
                    </p>
                    {library.map((entry) => (
                      <div key={entry.file} className="flex items-center gap-3 bg-[#0f2539] rounded-xl p-3">
                        <span className="material-icons text-[#7fa99b] text-lg">
                          {QUIZ_SUBJECTS.find((s) => s.id === entry.subject)?.icon || 'school'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{entry.title}</p>
                          <p className="text-xs text-gray-500">
                            {entry.niveau} • {entry.questions} questions
                          </p>
                        </div>
                        <button
                          onClick={() => handleImportFromLibrary(entry)}
                          className="px-3 py-1.5 bg-[#7fa99b] hover:bg-[#6e988a] rounded-lg text-white text-xs font-bold transition-colors flex-shrink-0"
                        >
                          Ajouter
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Liste des QCM */}
            {quizList.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                Aucun QCM pour l'instant. Créez votre premier quiz à partir de votre cours !
              </p>
            ) : (
              <div className="space-y-3">
                {quizList.map((item) => (
                  <div key={item.id} className="bg-[#1d3d59] rounded-2xl p-5 border border-white/5 flex flex-wrap items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#f4b942]/20 flex items-center justify-center">
                      <span className="material-icons text-[#f4b942]">
                        {QUIZ_SUBJECTS.find((s) => s.id === item.subject)?.icon || 'school'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-[180px]">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        {subjectLabel(item.subject)} • {item.questions.length} question(s)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlayQuiz?.(item.id)}
                        disabled={item.questions.length === 0}
                        title="Jouer en arène locale (2 équipes)"
                        className="px-4 py-2 bg-[#7fa99b] hover:bg-[#6e988a] disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-white text-sm font-bold transition-colors flex items-center gap-1"
                      >
                        <span className="material-icons text-sm">sports_esports</span>
                        Arène
                      </button>
                      <button
                        onClick={() => onHostQuiz?.(item.id)}
                        disabled={item.questions.length === 0}
                        title="Lancer en live (QR code, élèves sur mobile)"
                        className="px-4 py-2 bg-[#f4b942] hover:bg-[#d99926] disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[#17314a] text-sm font-bold transition-colors flex items-center gap-1"
                      >
                        <span className="material-icons text-sm">qr_code</span>
                        Live
                      </button>
                      <button
                        onClick={() => { setEditingQuizId(item.id); setForm(emptyForm()); setEditingIndex(null) }}
                        title="Modifier les questions"
                        className="w-10 h-10 rounded-xl bg-[#0f2539] hover:bg-[#234a68] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="material-icons text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => downloadQuizJSON(item)}
                        title="Exporter pour partager"
                        className="w-10 h-10 rounded-xl bg-[#0f2539] hover:bg-[#234a68] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="material-icons text-sm">download</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer le QCM « ${item.title} » et ses ${item.questions.length} question(s) ?`)) {
                            deleteQuiz(item.id)
                          }
                        }}
                        title="Supprimer"
                        className="w-10 h-10 rounded-xl bg-[#0f2539] hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Édition d'un QCM */
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Formulaire question */}
            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">
                  {editingIndex === null ? 'Nouvelle question' : `Modifier la question ${editingIndex + 1}`}
                </h2>
                {editingIndex !== null && (
                  <button
                    onClick={() => { setForm(emptyForm()); setEditingIndex(null) }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Annuler la modification
                  </button>
                )}
              </div>

              <label className="block text-gray-400 text-sm mb-1">Énoncé de la question *</label>
              <textarea
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="Ex : Quelle est la date de la bataille de Marignan ?"
                rows={3}
                className="w-full bg-[#0f2539] border-2 border-white/10 focus:border-[#f4b942] rounded-xl px-4 py-3 text-white text-sm transition-colors outline-none resize-none mb-4"
              />

              <label className="block text-gray-400 text-sm mb-2">
                Les 4 réponses * <span className="text-gray-600">(cochez la bonne)</span>
              </label>
              <div className="space-y-2 mb-4">
                {form.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <button
                      onClick={() => setForm({ ...form, correctOption: index })}
                      title="Marquer comme bonne réponse"
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                        form.correctOption === index
                          ? 'bg-green-500 text-white'
                          : 'bg-[#0f2539] text-gray-500 hover:bg-[#234a68]'
                      }`}
                    >
                      {form.correctOption === index ? '✓' : String.fromCharCode(65 + index)}
                    </button>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => setOption(index, e.target.value)}
                      placeholder={`Réponse ${String.fromCharCode(65 + index)}`}
                      className={`flex-1 bg-[#0f2539] border-2 rounded-xl px-4 py-2.5 text-white text-sm transition-colors outline-none ${
                        form.correctOption === index ? 'border-green-500/50' : 'border-white/10 focus:border-[#f4b942]'
                      }`}
                    />
                  </div>
                ))}
              </div>

              <label className="block text-gray-400 text-sm mb-1">
                Explication <span className="text-gray-600">(affichée à la correction — recommandé)</span>
              </label>
              <textarea
                value={form.explanation}
                onChange={(e) => setForm({ ...form, explanation: e.target.value })}
                placeholder="Ex : François Ier remporte Marignan en 1515 contre les Suisses."
                rows={2}
                className="w-full bg-[#0f2539] border-2 border-white/10 focus:border-[#f4b942] rounded-xl px-4 py-3 text-white text-sm transition-colors outline-none resize-none mb-4"
              />

              <button
                onClick={handleSaveQuestion}
                className="w-full py-3 bg-[#f4b942] hover:bg-[#d99926] rounded-xl text-[#17314a] font-bold transition-colors"
              >
                {editingIndex === null ? 'Ajouter la question' : 'Enregistrer la modification'}
              </button>
            </div>

            {/* Liste des questions du QCM */}
            <div className="bg-[#1d3d59] rounded-3xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">{quiz.questions.length} question(s)</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => onPlayQuiz?.(quiz.id)}
                    disabled={quiz.questions.length === 0}
                    className="px-4 py-2 bg-[#7fa99b] hover:bg-[#6e988a] disabled:opacity-30 rounded-xl text-white text-sm font-bold transition-colors"
                  >
                    Jouer
                  </button>
                  <button
                    onClick={() => downloadQuizJSON(quiz)}
                    disabled={quiz.questions.length === 0}
                    className="px-4 py-2 bg-[#0f2539] hover:bg-[#234a68] disabled:opacity-30 rounded-xl text-gray-300 text-sm font-bold transition-colors"
                  >
                    Exporter
                  </button>
                </div>
              </div>

              {quiz.questions.length === 0 ? (
                <p className="text-gray-500 text-sm py-8 text-center">
                  Ajoutez votre première question avec le formulaire ci-contre.
                  <br />Il faut au moins 1 question pour pouvoir jouer.
                </p>
              ) : (
                <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                  {quiz.questions.map((q, index) => (
                    <div key={index} className="bg-[#0f2539] rounded-xl p-4 group">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-white text-sm font-medium flex-1">
                          <span className="text-gray-500 mr-1">{index + 1}.</span>
                          {q.question}
                        </p>
                        <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditQuestion(index)}
                            className="w-7 h-7 rounded-lg bg-[#1d3d59] hover:bg-[#234a68] flex items-center justify-center text-gray-400"
                          >
                            <span className="material-icons text-xs">edit</span>
                          </button>
                          <button
                            onClick={() => deleteQuestion(quiz.id, index)}
                            className="w-7 h-7 rounded-lg bg-[#1d3d59] hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400"
                          >
                            <span className="material-icons text-xs">delete</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-green-400 text-xs mt-1.5">
                        ✓ {q.options[q.correctOption]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default QuizBuilder
