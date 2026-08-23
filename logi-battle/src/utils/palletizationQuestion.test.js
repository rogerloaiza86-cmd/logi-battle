import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildPalletizationQuestion } from './palletizationQuestion.js'

const expectedPalletCount = ({ boxLength, boxWidth, boxHeight, paletteLength, paletteWidth, maxHeight }) => {
  const ti = Math.floor(paletteLength / boxLength) * Math.floor(paletteWidth / boxWidth)
  const hi = Math.floor(maxHeight / boxHeight)
  return ti * hi
}

describe('buildPalletizationQuestion', () => {
  it('cite la hauteur réellement utilisée pour noter la réponse', () => {
    const question = buildPalletizationQuestion({
      difficulty: 3,
      boxLength: 48,
      boxWidth: 42,
      boxHeight: 28,
      paletteLength: 120,
      paletteWidth: 80,
      maxHeight: 175,
      explanation: 'test',
    })

    assert.match(question.description, /hauteur max: 175 cm/)
    assert.equal(question.data.maxHeight, 175)
    assert.equal(question.correctAnswer, expectedPalletCount(question.data))
    assert.notEqual(
      question.correctAnswer,
      expectedPalletCount({ ...question.data, maxHeight: 150 }),
      'un énoncé figé à 150 cm donnerait une autre réponse'
    )
  })

  it('reste cohérent quand la hauteur max est 150 cm', () => {
    const question = buildPalletizationQuestion({
      difficulty: 1,
      boxLength: 40,
      boxWidth: 40,
      boxHeight: 30,
      paletteLength: 120,
      paletteWidth: 80,
      maxHeight: 150,
      explanation: 'test',
    })

    assert.match(question.description, /hauteur max: 150 cm/)
    assert.equal(question.correctAnswer, 30)
  })
})
