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
import { francaisQuestions } from '../francaisQuestions'
import { mathsGeneralesQuestions } from '../mathsGeneralesQuestions'
import { histoireQuestions } from '../histoireQuestions'
import { geographieQuestions } from '../geographieQuestions'
import { anglaisQuestions } from '../anglaisQuestions'
import { espagnolQuestions } from '../espagnolQuestions'
import { cultureGeneraleFacile } from '../cultureGeneraleFacile'
import { cultureGeneraleMoyen } from '../cultureGeneraleMoyen'
import { cultureGeneraleDifficile } from '../cultureGeneraleDifficile'

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
  francaisQuestions,
  mathsGeneralesQuestions,
  histoireQuestions,
  geographieQuestions,
  anglaisQuestions,
  espagnolQuestions,
  cultureGeneraleFacile,
  cultureGeneraleMoyen,
  cultureGeneraleDifficile,
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

describe('Culture Générale à 3 niveaux', () => {
  it('contient 100 questions par niveau', () => {
    expect(cultureGeneraleFacile).toHaveLength(100)
    expect(cultureGeneraleMoyen).toHaveLength(100)
    expect(cultureGeneraleDifficile).toHaveLength(100)
  })

  it('chaque niveau porte la bonne difficulté', () => {
    expect(cultureGeneraleFacile.every((q) => q.difficulty === 1)).toBe(true)
    expect(cultureGeneraleMoyen.every((q) => q.difficulty === 2)).toBe(true)
    expect(cultureGeneraleDifficile.every((q) => q.difficulty === 3)).toBe(true)
  })

  it('les bonnes réponses sont réparties sur les 4 positions', () => {
    ;[cultureGeneraleFacile, cultureGeneraleMoyen, cultureGeneraleDifficile].forEach((bank) => {
      const counts = [0, 0, 0, 0]
      bank.forEach((q) => counts[q.correctOption]++)
      counts.forEach((c) => expect(c).toBeGreaterThanOrEqual(10))
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
