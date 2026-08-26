import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { formatQuestionDescription } from './questionPrompt.js'
import { receptionQuestions } from './receptionControlQuestions.js'
import { teamLeaderQuestions } from './teamLeaderQuestions.js'

describe('formatQuestionDescription', () => {
  it('injecte le scénario dans la description affichée', () => {
    const description = formatQuestionDescription(
      'Quelle anomalie devez-vous signaler ?',
      'Vous recevez un camion. 3 cartons sur 20 présentent des déchirures.'
    )

    assert.match(description, /3 cartons sur 20/)
    assert.match(description, /Quelle anomalie devez-vous signaler/)
  })

  it('ne duplique pas un scénario déjà présent dans la question', () => {
    const text = 'Le bon de livraison indique 50 colis. Combien manquent ?'
    assert.equal(formatQuestionDescription(text, text), text)
  })

  it('garde la question seule quand il n\'y a pas de scénario', () => {
    assert.equal(
      formatQuestionDescription('Que signifie JIT ?', undefined),
      'Que signifie JIT ?'
    )
  })
})

describe('banques avec scénario', () => {
  it('rend les questions de réception répondables une fois le scénario injecté', () => {
    const rec001 = receptionQuestions.find((q) => q.id === 'rec_001')
    const description = formatQuestionDescription(rec001.question, rec001.scenario)

    assert.match(description, /déchirures/)
    assert.match(description, /Quelle anomalie devez-vous signaler/)
    assert.notEqual(description, rec001.question)
  })

  it('rend les questions team leader répondables une fois le scénario injecté', () => {
    const leader001 = teamLeaderQuestions.find((q) => q.id === 'leader_001')
    const description = formatQuestionDescription(leader001.question, leader001.scenario)

    assert.match(description, /200 commandes/)
    assert.match(description, /première action/)
  })
})

describe('receptionQuestions rec_018', () => {
  it('a une réponse calculable présente dans les options', () => {
    const question = receptionQuestions.find((q) => q.id === 'rec_018')
    assert.ok(question)

    const weights = [...question.scenario.matchAll(/(\d+)\s*colis de (\d+)\s*kg/gi)]
    assert.ok(weights.length >= 2)

    const total = weights.reduce((sum, [, count, kg]) => sum + Number(count) * Number(kg), 0)
    const optionValues = question.options.map((option) => parseInt(option, 10))
    assert.equal(optionValues[question.correctOption], total)
    assert.ok(optionValues.includes(total))
  })
})
