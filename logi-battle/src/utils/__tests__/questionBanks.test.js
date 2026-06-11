import { describe, it, expect } from 'vitest'
import { vocabularyQuestions } from '../vocabularyQuestions'
import { paletteMCQQuestions } from '../paletteMCQQuestions'
import { transportMCQQuestions } from '../transportMCQQuestions'
import { loadingMCQQuestions } from '../loadingMCQQuestions'
import { supplyChainQuestions } from '../supplyChainQuestions'
import { receptionQuestions } from '../receptionControlQuestions'
import { stockQuestions } from '../stockManagementQuestions'
import { safetyQuestions } from '../safetyQuestions'
import { traceabilityQuestions } from '../traceabilityQuestions'
import { greenLogisticsQuestions } from '../greenLogisticsQuestions'
import { teamLeaderQuestions } from '../teamLeaderQuestions'
import { jitQuestions } from '../jitQuestions'
import { routeOptimizerQuestions } from '../routeOptimizerQuestions'
import { legalQuestions } from '../legalQuestions'
import { mathQuestions } from '../mathQuestions'
import { cultureQuestions } from '../cultureQuestions'

// Toutes les banques QCM doivent être structurellement valides :
// 4 options, bonne réponse dans la plage, explication présente.
const mcqBanks = {
  vocabularyQuestions,
  paletteMCQQuestions,
  transportMCQQuestions,
  loadingMCQQuestions,
  supplyChainQuestions,
  receptionQuestions,
  stockQuestions,
  safetyQuestions,
  traceabilityQuestions,
  greenLogisticsQuestions,
  teamLeaderQuestions,
  jitQuestions,
  routeOptimizerQuestions,
  legalQuestions,
  mathQuestions,
}

describe.each(Object.entries(mcqBanks))('banque %s', (bankName, bank) => {
  it('contient au moins 15 questions', () => {
    expect(bank.length).toBeGreaterThanOrEqual(15)
  })

  it('chaque question a 4 options et une bonne réponse valide', () => {
    bank.forEach((q, i) => {
      expect(Array.isArray(q.options), `${bankName}[${i}] options manquantes`).toBe(true)
      expect(q.options, `${bankName}[${i}] doit avoir 4 options`).toHaveLength(4)
      expect(Number.isInteger(q.correctOption), `${bankName}[${i}] correctOption non entier`).toBe(true)
      expect(q.correctOption, `${bankName}[${i}] correctOption hors plage`).toBeGreaterThanOrEqual(0)
      expect(q.correctOption, `${bankName}[${i}] correctOption hors plage`).toBeLessThan(4)
    })
  })

  it('chaque question a une explication pédagogique', () => {
    bank.forEach((q, i) => {
      expect(typeof q.explanation, `${bankName}[${i}] explication manquante`).toBe('string')
      expect(q.explanation.length, `${bankName}[${i}] explication vide`).toBeGreaterThan(5)
    })
  })

  it("aucune explication ne contient de résidu d'IA (monologue, auto-correction)", () => {
    bank.forEach((q, i) => {
      expect(q.explanation, `${bankName}[${i}] explication suspecte`).not.toMatch(
        /Attendez|erreur de calcul|Je corrige|Recalcul|Hmm/i
      )
    })
  })

  it('les ids sont uniques (si présents)', () => {
    const ids = bank.map((q) => q.id).filter(Boolean)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('les options de chaque question sont distinctes', () => {
    bank.forEach((q, i) => {
      expect(new Set(q.options).size, `${bankName}[${i}] options dupliquées`).toBe(q.options.length)
    })
  })
})

describe('banque cultureQuestions', () => {
  it('contient au moins 100 questions', () => {
    expect(cultureQuestions.length).toBeGreaterThanOrEqual(100)
  })

  it('chaque question a une réponse numérique plausible (année ou nombre)', () => {
    cultureQuestions.forEach((q, i) => {
      expect(typeof q.question, `culture[${i}]`).toBe('string')
      expect(Number.isInteger(q.answer), `culture[${i}] réponse non entière`).toBe(true)
      expect(q.answer, `culture[${i}] réponse négative`).toBeGreaterThanOrEqual(0)
      expect(q.answer, `culture[${i}] réponse implausible`).toBeLessThanOrEqual(2026)
    })
  })
})
