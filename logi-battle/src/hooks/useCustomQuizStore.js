import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Matières proposées à la création d'un QCM
export const QUIZ_SUBJECTS = [
  { id: 'francais', label: 'Français', icon: 'menu_book' },
  { id: 'maths_generales', label: 'Mathématiques', icon: 'calculate' },
  { id: 'histoire', label: 'Histoire', icon: 'history_edu' },
  { id: 'geographie', label: 'Géographie', icon: 'public' },
  { id: 'anglais', label: 'Anglais', icon: 'translate' },
  { id: 'espagnol', label: 'Espagnol', icon: 'translate' },
  { id: 'logistique', label: 'Logistique & Transport', icon: 'local_shipping' },
  { id: 'autre', label: 'Autre matière', icon: 'school' },
]

const validateQuestion = (q) =>
  q &&
  typeof q.question === 'string' && q.question.trim().length > 0 &&
  Array.isArray(q.options) && q.options.length === 4 &&
  q.options.every((o) => typeof o === 'string' && o.trim().length > 0) &&
  Number.isInteger(q.correctOption) && q.correctOption >= 0 && q.correctOption < 4

export const useCustomQuizStore = create(
  persist(
    (set, get) => ({
      quizzes: {},

      createQuiz: (title, subject) => {
        const id = `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
        set((state) => ({
          quizzes: {
            ...state.quizzes,
            [id]: {
              id,
              title: title.trim(),
              subject: subject || 'autre',
              questions: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          },
        }))
        return id
      },

      updateQuiz: (quizId, fields) => {
        set((state) => {
          const quiz = state.quizzes[quizId]
          if (!quiz) return state
          return {
            quizzes: {
              ...state.quizzes,
              [quizId]: { ...quiz, ...fields, updatedAt: Date.now() },
            },
          }
        })
      },

      deleteQuiz: (quizId) => {
        set((state) => {
          const quizzes = { ...state.quizzes }
          delete quizzes[quizId]
          return { quizzes }
        })
      },

      addQuestion: (quizId, question) => {
        if (!validateQuestion(question)) return false
        set((state) => {
          const quiz = state.quizzes[quizId]
          if (!quiz) return state
          return {
            quizzes: {
              ...state.quizzes,
              [quizId]: {
                ...quiz,
                questions: [...quiz.questions, { ...question, explanation: question.explanation || '' }],
                updatedAt: Date.now(),
              },
            },
          }
        })
        return true
      },

      updateQuestion: (quizId, index, question) => {
        if (!validateQuestion(question)) return false
        set((state) => {
          const quiz = state.quizzes[quizId]
          if (!quiz || !quiz.questions[index]) return state
          const questions = [...quiz.questions]
          questions[index] = { ...question, explanation: question.explanation || '' }
          return {
            quizzes: { ...state.quizzes, [quizId]: { ...quiz, questions, updatedAt: Date.now() } },
          }
        })
        return true
      },

      deleteQuestion: (quizId, index) => {
        set((state) => {
          const quiz = state.quizzes[quizId]
          if (!quiz) return state
          return {
            quizzes: {
              ...state.quizzes,
              [quizId]: {
                ...quiz,
                questions: quiz.questions.filter((_, i) => i !== index),
                updatedAt: Date.now(),
              },
            },
          }
        })
      },

      getQuiz: (quizId) => get().quizzes[quizId] || null,

      // Import d'un QCM partagé (fichier JSON exporté par un autre professeur)
      importQuiz: (json) => {
        let data
        try {
          data = typeof json === 'string' ? JSON.parse(json) : json
        } catch {
          return { ok: false, error: 'Fichier JSON invalide' }
        }
        if (!data || typeof data.title !== 'string' || !Array.isArray(data.questions)) {
          return { ok: false, error: 'Format de QCM non reconnu' }
        }
        const valid = data.questions.filter(validateQuestion)
        if (valid.length === 0) {
          return { ok: false, error: 'Aucune question valide dans ce fichier' }
        }
        const id = get().createQuiz(data.title, data.subject)
        get().updateQuiz(id, { questions: valid.map((q) => ({ ...q, explanation: q.explanation || '' })) })
        return { ok: true, id, imported: valid.length, skipped: data.questions.length - valid.length }
      },
    }),
    { name: 'geronimo-custom-quizzes' }
  )
)

// Export d'un QCM en fichier JSON (partage entre professeurs)
export const downloadQuizJSON = (quiz) => {
  const payload = {
    format: 'geronimo-quiz-v1',
    title: quiz.title,
    subject: quiz.subject,
    questions: quiz.questions,
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `qcm-${quiz.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`
  link.click()
  URL.revokeObjectURL(url)
}
