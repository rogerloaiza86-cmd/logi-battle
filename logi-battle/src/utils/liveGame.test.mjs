import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getCorrectAnswer, isSubmittedAnswerCorrect, sanitizeQuestionForPlayer } from './liveGame.js'

describe('live game answer handling', () => {
  it('keeps zero as a valid correct answer', () => {
    const question = { correctAnswer: 0 }

    assert.equal(getCorrectAnswer(question), 0)
    assert.equal(isSubmittedAnswerCorrect('0', question), true)
    assert.equal(isSubmittedAnswerCorrect('', question), false)
  })

  it('normalizes numeric and text answers without trusting client flags', () => {
    assert.equal(isSubmittedAnswerCorrect('42', { correctAnswer: 42 }), true)
    assert.equal(isSubmittedAnswerCorrect('Geronimo', { correctAnswer: 'geronimo' }), true)
    assert.equal(isSubmittedAnswerCorrect('true', { correctAnswer: 'false' }), false)
  })

  it('removes answer material before broadcasting questions to players', () => {
    const safeQuestion = sanitizeQuestionForPlayer({
      id: 'q_1',
      description: 'Choisissez la bonne option',
      correctAnswer: 2,
      answer: 2,
      explanation: 'Secret',
      data: {
        options: ['A', 'B', 'C'],
        correctOption: 2,
        explanation: 'Secret data',
      },
    })

    assert.equal('correctAnswer' in safeQuestion, false)
    assert.equal('answer' in safeQuestion, false)
    assert.equal('explanation' in safeQuestion, false)
    assert.equal('correctOption' in safeQuestion.data, false)
    assert.equal('explanation' in safeQuestion.data, false)
    assert.deepEqual(safeQuestion.data.options, ['A', 'B', 'C'])
  })
})
