/**
 * QuestionView, l'arène et les postes élèves n'affichent que `description`.
 * Le scénario nécessaire pour répondre doit donc faire partie de cette chaîne.
 */
export function formatQuestionDescription(questionText, scenario) {
  const question = String(questionText || '').trim()
  const context = String(scenario || '').trim()

  if (!context) return question
  if (!question) return context
  if (question.includes(context) || context.includes(question)) {
    return question.length >= context.length ? question : context
  }

  return `${context}\n\n${question}`
}
