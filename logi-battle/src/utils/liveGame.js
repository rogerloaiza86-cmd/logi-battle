export const getCorrectAnswer = (question) => (
  question?.correctAnswer ?? question?.answer ?? question?.data?.correctOption ?? question?.correctOption
)

export const isSubmittedAnswerCorrect = (submittedAnswer, question) => {
  if (submittedAnswer === null || submittedAnswer === undefined || submittedAnswer === '') {
    return false
  }

  const correctAnswer = getCorrectAnswer(question)
  if (correctAnswer === null || correctAnswer === undefined) {
    return false
  }

  const submitted = String(submittedAnswer).trim().toLowerCase()
  const expected = String(correctAnswer).trim().toLowerCase()

  if (submitted === expected) {
    return true
  }

  const submittedNumber = Number(submitted)
  const expectedNumber = Number(expected)
  return Number.isFinite(submittedNumber) && Number.isFinite(expectedNumber) && submittedNumber === expectedNumber
}

export const sanitizeQuestionForPlayer = (question) => {
  if (!question) return null

  const {
    correctAnswer,
    answer,
    correctOption,
    explanation,
    data,
    ...safeQuestion
  } = question

  const safeData = data ? { ...data } : undefined
  if (safeData) {
    delete safeData.correctOption
    delete safeData.explanation
  }

  return {
    ...safeQuestion,
    ...(safeData ? { data: safeData } : {}),
  }
}
