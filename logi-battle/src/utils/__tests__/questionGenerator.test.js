import { describe, it, expect } from 'vitest'
import { generateNextQuestion, generateRandomQuestion, getRandomQuestionType } from '../questionGenerator'

const ALL_MODES = [
  'palettisation', 'cout_transport', 'loading_plan', 'vocabulaire', 'culture',
  'supply_chain', 'reception', 'stock', 'safety', 'traceability', 'green',
  'team_leader', 'jit', 'route', 'legal', 'math',
  'francais', 'maths_generales', 'histoire', 'geographie', 'anglais', 'espagnol',
]

const isMCQ = (q) => Array.isArray(q?.data?.options)

describe.each(ALL_MODES)('generateNextQuestion(%s)', (mode) => {
  it('retourne toujours une question normalisée et répondable', () => {
    // Les générateurs sont aléatoires (50% QCM / 50% calcul pour certains) :
    // on échantillonne plusieurs tirages.
    for (let i = 0; i < 25; i++) {
      const q = generateNextQuestion(mode)
      expect(q.type).toBeTruthy()
      expect(q.title).toBeTruthy()
      expect(q.description).toBeTruthy()

      if (isMCQ(q)) {
        expect(q.data.options).toHaveLength(4)
        expect(q.data.correctOption).toBeGreaterThanOrEqual(0)
        expect(q.data.correctOption).toBeLessThan(4)
      } else {
        // Question à réponse numérique (clavier)
        expect(Number.isFinite(Number(q.correctAnswer))).toBe(true)
      }
    }
  })
})

describe('Culture Générale à niveaux (culture_g:N)', () => {
  it.each([1, 2, 3])('le niveau %i produit des QCM de la difficulté correspondante', (level) => {
    for (let i = 0; i < 15; i++) {
      const q = generateNextQuestion(`culture_g:${level}`)
      expect(q.type).toBe('culture_g')
      expect(q.difficulty).toBe(level)
      expect(q.data.options).toHaveLength(4)
      expect(q.data.correctOption).toBeGreaterThanOrEqual(0)
      expect(q.data.correctOption).toBeLessThan(4)
    }
  })

  it('un niveau invalide retombe sur le niveau facile', () => {
    const q = generateNextQuestion('culture_g:9')
    expect(q.type).toBe('culture_g')
    expect(q.difficulty).toBe(1)
  })
})

describe('mode mixte matières générales (all_general)', () => {
  it('ne génère que des matières générales', () => {
    const general = ['francais', 'maths_generales', 'histoire', 'geographie', 'anglais', 'espagnol']
    for (let i = 0; i < 40; i++) {
      expect(general).toContain(generateNextQuestion('all_general').type)
    }
  })
})

describe('mode mixte (all)', () => {
  it('génère des questions de types variés', () => {
    const types = new Set()
    for (let i = 0; i < 120; i++) {
      types.add(generateNextQuestion('all').type)
    }
    expect(types.size).toBeGreaterThan(5)
  })
})

describe('difficulté progressive', () => {
  it('respecte la difficulté forcée pour les questions de calcul', () => {
    for (let i = 0; i < 25; i++) {
      const q = generateNextQuestion('palettisation', 3)
      // Les tirages QCM portent la difficulté de la banque ; les tirages
      // calcul doivent respecter la difficulté forcée.
      if (!isMCQ(q)) {
        expect(q.difficulty).toBe(3)
      }
    }
  })

  it('generateRandomQuestion rejette un type inconnu', () => {
    expect(() => generateRandomQuestion('type_inexistant')).toThrow()
  })
})

describe('getRandomQuestionType', () => {
  it('retourne toujours un type connu', () => {
    for (let i = 0; i < 50; i++) {
      expect(ALL_MODES).toContain(getRandomQuestionType())
    }
  })
})
