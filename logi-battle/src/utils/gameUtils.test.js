import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { isChoiceQuestion } from './gameUtils.js'

describe('isChoiceQuestion', () => {
  it('routes option-based championship and training questions to the MCQ card', () => {
    const modulesWithoutMcqFlag = [
      'supply_chain',
      'reception',
      'stock',
      'safety',
      'traceability',
      'green',
      'team_leader',
      'jit',
      'route',
      'legal',
      'math',
    ]

    for (const type of modulesWithoutMcqFlag) {
      const question = {
        type,
        correctAnswer: 1,
        data: {
          options: ['A', 'B', 'C', 'D'],
          correctOption: 1,
        },
      }

      assert.equal(
        isChoiceQuestion(question),
        true,
        `${type} must render as a multiple-choice question even without isMCQ`
      )
    }
  })

  it('keeps calculation and culture questions on the numeric keypad', () => {
    assert.equal(
      isChoiceQuestion({
        type: 'palettisation',
        correctAnswer: 24,
        data: { boxLength: 40, boxWidth: 30 },
      }),
      false
    )
    assert.equal(
      isChoiceQuestion({
        type: 'culture',
        correctAnswer: 2024,
        data: { category: 'Sport' },
      }),
      false
    )
  })

  it('treats explicit flags and option arrays as choice questions', () => {
    assert.equal(isChoiceQuestion({ isMCQ: true }), true)
    assert.equal(isChoiceQuestion({ isVocabulary: true }), true)
    assert.equal(isChoiceQuestion({ data: { options: ['A', 'B'] } }), true)
    assert.equal(isChoiceQuestion({ options: ['A', 'B'] }), true)
    assert.equal(isChoiceQuestion({ type: 'vocabulaire', data: { options: ['A', 'B'] } }), true)
    assert.equal(isChoiceQuestion(null), false)
    assert.equal(isChoiceQuestion({ type: 'safety' }), false)
  })
})
