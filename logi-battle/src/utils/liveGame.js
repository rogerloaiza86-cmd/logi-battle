export const buildJoinUrl = (origin, gameId, basePath = '/') => {
  const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`
  return `${origin}${normalizedBasePath}join?game=${encodeURIComponent(gameId)}`
}

export const getCorrectAnswer = (question) => {
  if (!question) return undefined

  return question.correctAnswer
    ?? question.answer
    ?? question.correctOption
    ?? question.data?.correctAnswer
    ?? question.data?.answer
    ?? question.data?.correctOption
}

export const isAnswerCorrect = (question, userAnswer) => {
  const correctAnswer = getCorrectAnswer(question)

  if (correctAnswer === undefined || correctAnswer === null || userAnswer === undefined || userAnswer === null) {
    return false
  }

  const submitted = String(userAnswer).trim()
  const expected = String(correctAnswer).trim()

  if (submitted === '') return false

  const submittedNumber = Number(submitted)
  const expectedNumber = Number(expected)

  if (Number.isFinite(submittedNumber) && Number.isFinite(expectedNumber)) {
    return submittedNumber === expectedNumber
  }

  return submitted.toLowerCase() === expected.toLowerCase()
}

export const sanitizeQuestionForPlayer = (question) => {
  if (!question) return null

  const {
    correctAnswer,
    answer,
    correctOption,
    explanation,
    ...safeQuestion
  } = question

  const safeData = question.data ? { ...question.data } : undefined

  if (safeData) {
    delete safeData.correctAnswer
    delete safeData.answer
    delete safeData.correctOption
    delete safeData.explanation
  }

  return {
    ...safeQuestion,
    ...(safeData ? { data: safeData } : {}),
  }
}
