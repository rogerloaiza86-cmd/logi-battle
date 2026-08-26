/**
 * Assemble the prompt shown to the player.
 * QuestionCard and VocabularyCard only render `description`, so any
 * scenario required to answer must be part of that string.
 */
export const formatQuestionDescription = (questionText, scenario) => {
  const question = String(questionText || '').trim()
  const context = String(scenario || '').trim()

  if (!context) return question
  if (!question) return context
  if (question.includes(context) || context.includes(question)) {
    return question.length >= context.length ? question : context
  }

  return `${context} ${question}`
}
