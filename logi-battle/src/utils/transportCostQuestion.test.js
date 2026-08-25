import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildTransportCostQuestion, computeTransportCost } from './transportCostQuestion.js'

describe('buildTransportCostQuestion', () => {
  it('cite les tarifs réellement utilisés pour noter la réponse', () => {
    const question = buildTransportCostQuestion({
      difficulty: 1,
      distance: 150,
      weight: 10,
      costPerKm: 2,
      costPerTon: 100,
      explanation: 'test',
    })

    assert.match(question.description, /150 km/)
    assert.match(question.description, /2€\/km/)
    assert.match(question.description, /10 tonnes/)
    assert.match(question.description, /100€\/tonne/)
    assert.equal(question.data.costPerKm, 2)
    assert.equal(question.data.costPerTon, 100)
    assert.equal(question.correctAnswer, 1300)
  })

  it('cite la remise et note le coût après remise, pas le trajet seul', () => {
    const question = buildTransportCostQuestion({
      difficulty: 2,
      distance: 250,
      weight: 20,
      costPerKm: 1.8,
      costPerTon: 90,
      discount: 10,
      explanation: 'test',
    })

    assert.match(question.description, /1\.8€\/km/)
    assert.match(question.description, /90€\/tonne/)
    assert.match(question.description, /remise de 10%/)
    assert.equal(question.data.discount, 10)

    const expected = Math.round(computeTransportCost(question.data))
    assert.equal(question.correctAnswer, expected)
    assert.equal(question.correctAnswer, 2025)
    assert.notEqual(
      question.correctAnswer,
      250 * 20,
      'sans les tarifs, un élève ne peut pas retrouver 2025€'
    )
  })

  it('cite carburant et péages en difficulté élevée', () => {
    const question = buildTransportCostQuestion({
      difficulty: 3,
      distance: 500,
      weight: 40,
      costPerKm: 1.5,
      costPerTon: 80,
      fuel: 1.5,
      toll: 50,
      explanation: 'test',
    })

    assert.match(question.description, /1\.5€\/km de carburant/)
    assert.match(question.description, /50€ de péages/)
    assert.equal(question.correctAnswer, 4750)
    assert.notEqual(question.correctAnswer, 500 * 1.5 + 40 * 80)
  })
})
