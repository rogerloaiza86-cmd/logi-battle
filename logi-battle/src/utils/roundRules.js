/** Règles pures du duel, partagées par le plateau, le championnat et les téléphones. */

export const TOTAL_ROUNDS = 10
export const ROUND_TIME = 30
export const VOCABULARY_TIME = 20

export function questionUsesKeypad(question) {
  if (!question) return false
  if (question.isMCQ || question.data?.options) return false
  return typeof question.correctAnswer === 'number'
}

export function resolveRoundWinner(statusA, statusB, timeA, timeB) {
  const aCorrect = statusA === 'correct'
  const bCorrect = statusB === 'correct'
  if (aCorrect && bCorrect) {
    if (timeA == null || timeB == null || timeA === timeB) return null
    return timeA < timeB ? 'A' : 'B'
  }
  if (aCorrect) return 'A'
  if (bCorrect) return 'B'
  return null
}

export function toPublicQuestion(question) {
  if (!question) return null
  const options = question.data?.options
  return {
    id: question.id,
    type: question.type,
    title: question.title,
    description: question.description,
    difficulty: question.difficulty,
    isMCQ: Boolean(question.isMCQ || options),
    hints: question.hints || [],
    referentiel: question.referentiel || null,
    themeEleve: question.themeEleve || null,
    niveau: question.niveau || null,
    data: options
      ? {
          options,
          category: question.data.category,
          term: question.data.term,
          isMCQ: true,
        }
      : {
          boxLength: question.data?.boxLength,
          boxWidth: question.data?.boxWidth,
          boxHeight: question.data?.boxHeight,
          paletteLength: question.data?.paletteLength,
          paletteWidth: question.data?.paletteWidth,
          maxHeight: question.data?.maxHeight,
          distance: question.data?.distance,
          weight: question.data?.weight,
          costPerKm: question.data?.costPerKm,
          costPerTon: question.data?.costPerTon,
          discount: question.data?.discount,
          fuel: question.data?.fuel,
          toll: question.data?.toll,
          containerCapacity: question.data?.containerCapacity,
          packageSize: question.data?.packageSize,
          usablePercent: question.data?.usablePercent,
        },
  }
}

export function gradePlayerAnswer(question, answer) {
  if (!question || answer == null || answer === '') return false
  if (!questionUsesKeypad(question)) {
    const correct = question.data?.correctOption ?? question.correctAnswer
    return Number(answer) === Number(correct)
  }
  return parseInt(answer, 10) === Number(question.correctAnswer)
}

export function readChampionshipState() {
  try {
    const raw = localStorage.getItem('championship-storage')
    if (!raw) return { classes: [] }
    const parsed = JSON.parse(raw)
    return parsed.state || parsed
  } catch {
    return { classes: [] }
  }
}
