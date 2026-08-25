import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildLoadingPlanQuestion, computeLoadingPlanCount } from './loadingPlanQuestion.js'

describe('buildLoadingPlanQuestion', () => {
  it('reste cohérent à 100% d\'espace utilisable', () => {
    const question = buildLoadingPlanQuestion({
      difficulty: 1,
      containerCapacity: 24,
      packageSize: 3,
      usableRatio: 1,
      explanation: 'test',
    })

    assert.match(question.description, /capacité 24 unités/)
    assert.doesNotMatch(question.description, /utilisable/)
    assert.equal(question.correctAnswer, 8)
  })

  it('cite le taux réellement utilisé et ne note pas la division brute', () => {
    const question = buildLoadingPlanQuestion({
      difficulty: 2,
      containerCapacity: 40,
      packageSize: 2,
      usableRatio: 0.9,
      explanation: 'test',
    })

    assert.match(question.description, /40 unités \(90% utilisable\)/)
    assert.equal(question.data.usableRatio, 0.9)
    assert.equal(question.correctAnswer, computeLoadingPlanCount(question.data))
    assert.equal(question.correctAnswer, 18)
    assert.notEqual(
      question.correctAnswer,
      Math.floor(40 / 2),
      'un énoncé sans 90% notait 20 au lieu de 18'
    )
  })

  it('cite l\'efficacité en difficulté 3', () => {
    const question = buildLoadingPlanQuestion({
      difficulty: 3,
      containerCapacity: 60,
      packageSize: 2,
      usableRatio: 0.85,
      explanation: 'test',
    })

    assert.match(question.description, /85% utilisable/)
    assert.equal(question.correctAnswer, 25)
    assert.notEqual(question.correctAnswer, 30)
  })
})
