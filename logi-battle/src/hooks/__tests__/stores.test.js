import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useChampionshipStore } from '../useChampionshipStore'
import { useStatsStore, BADGES, buildStatsCSV } from '../useStatsStore'
import { useCustomQuizStore } from '../useCustomQuizStore'
import { generateNextQuestion } from '../../utils/questionGenerator'

// Les ids sont générés via Date.now() : on rend chaque appel unique
let tick = 1_000_000
beforeEach(() => {
  vi.spyOn(Date, 'now').mockImplementation(() => ++tick)
  localStorage.clear()
  useChampionshipStore.setState({ classes: [], currentClass: null })
  useStatsStore.setState({ players: {} })
  useCustomQuizStore.setState({ quizzes: {} })
})

describe('useCustomQuizStore (QCM du professeur)', () => {
  const validQuestion = {
    question: 'Quelle est la capitale de la France ?',
    options: ['Lyon', 'Paris', 'Marseille', 'Lille'],
    correctOption: 1,
    explanation: 'Paris est la capitale de la France.',
  }

  it('crée un QCM et y ajoute des questions valides', () => {
    const s = useCustomQuizStore.getState()
    const id = s.createQuiz('Chapitre 1', 'histoire')
    expect(s.addQuestion(id, validQuestion)).toBe(true)
    const quiz = useCustomQuizStore.getState().getQuiz(id)
    expect(quiz.questions).toHaveLength(1)
    expect(quiz.subject).toBe('histoire')
  })

  it('rejette les questions incomplètes', () => {
    const s = useCustomQuizStore.getState()
    const id = s.createQuiz('Test', 'francais')
    expect(s.addQuestion(id, { ...validQuestion, question: '' })).toBe(false)
    expect(s.addQuestion(id, { ...validQuestion, options: ['a', 'b', 'c', ''] })).toBe(false)
    expect(s.addQuestion(id, { ...validQuestion, correctOption: 5 })).toBe(false)
    expect(useCustomQuizStore.getState().getQuiz(id).questions).toHaveLength(0)
  })

  it('le générateur sait jouer un QCM du professeur (custom:<id>)', () => {
    const s = useCustomQuizStore.getState()
    const id = s.createQuiz('Mon cours', 'geographie')
    s.addQuestion(id, validQuestion)

    const q = generateNextQuestion(`custom:${id}`)
    expect(q.type).toBe('custom')
    expect(q.description).toBe(validQuestion.question)
    expect(q.data.options).toEqual(validQuestion.options)
    expect(q.data.correctOption).toBe(1)
  })

  it('le générateur échoue proprement sur un QCM vide ou inconnu', () => {
    expect(() => generateNextQuestion('custom:inexistant')).toThrow()
  })

  it("l'import accepte un export et ignore les questions invalides", () => {
    const s = useCustomQuizStore.getState()
    const result = s.importQuiz(JSON.stringify({
      format: 'geronimo-quiz-v1',
      title: 'QCM partagé',
      subject: 'anglais',
      questions: [validQuestion, { question: 'incomplète', options: ['a'], correctOption: 0 }],
    }))
    expect(result.ok).toBe(true)
    expect(result.imported).toBe(1)
    expect(result.skipped).toBe(1)
  })

  it("l'import rejette un JSON invalide", () => {
    expect(useCustomQuizStore.getState().importQuiz('pas du json').ok).toBe(false)
    expect(useCustomQuizStore.getState().importQuiz('{"x":1}').ok).toBe(false)
  })
})

describe('useChampionshipStore', () => {
  it('le premier groupe créé devient champion', () => {
    const s = useChampionshipStore.getState()
    const classId = s.createClass('2nde Log A')
    const g1 = s.createGroup(classId, 'Trinôme 1', ['Ali', 'Beth', 'Carl'])
    const g2 = s.createGroup(classId, 'Trinôme 2', ['Dan', 'Eve', 'Fred'])

    const cls = useChampionshipStore.getState().classes.find((c) => c.id === classId)
    expect(cls.currentChampion).toBe(g1)
    expect(cls.groups.find((g) => g.id === g1).isChampion).toBe(true)
    expect(cls.groups.find((g) => g.id === g2).isChampion).toBe(false)
  })

  it('limite un trinôme à 3 membres', () => {
    const s = useChampionshipStore.getState()
    const classId = s.createClass('Classe')
    const gid = s.createGroup(classId, 'Trop grand', ['A', 'B', 'C', 'D', 'E'])
    const group = useChampionshipStore.getState().classes[0].groups.find((g) => g.id === gid)
    expect(group.members).toHaveLength(3)
  })

  it('un challenger vainqueur prend le titre et le classement suit les points', () => {
    const s = useChampionshipStore.getState()
    const classId = s.createClass('Classe')
    const champion = s.createGroup(classId, 'Champions', ['A'])
    const challenger = s.createGroup(classId, 'Challengers', ['B'])

    useChampionshipStore.getState().recordMatch(classId, challenger, champion, 'challenger', { score: '5-3' })

    const state = useChampionshipStore.getState()
    const cls = state.classes.find((c) => c.id === classId)
    expect(cls.currentChampion).toBe(challenger)

    const rankings = state.getRankings(classId)
    expect(rankings[0].id).toBe(challenger)
    expect(rankings[0].rank).toBe(1)
    expect(rankings[0].stats.wins).toBe(1)
    expect(rankings[1].stats.losses).toBe(1)
  })

  it('getChallengers exclut le champion en titre', () => {
    const s = useChampionshipStore.getState()
    const classId = s.createClass('Classe')
    const champ = s.createGroup(classId, 'G1', ['A'])
    s.createGroup(classId, 'G2', ['B'])
    s.createGroup(classId, 'G3', ['C'])

    const challengers = useChampionshipStore.getState().getChallengers(classId)
    expect(challengers).toHaveLength(2)
    expect(challengers.map((g) => g.id)).not.toContain(champ)
  })
})

describe('useStatsStore', () => {
  it('agrège les réponses par élève et par module', () => {
    const s = useStatsStore.getState()
    s.recordAnswer('Thomas', 'palettisation', true)
    s.recordAnswer('Thomas', 'palettisation', false)
    s.recordAnswer('Thomas', 'safety', true)

    const stats = useStatsStore.getState().getPlayerStats('Thomas')
    expect(stats.totalAnswered).toBe(3)
    expect(stats.totalCorrect).toBe(2)
    expect(stats.modules.palettisation).toEqual({ answered: 2, correct: 1 })
    expect(stats.modules.safety).toEqual({ answered: 1, correct: 1 })
  })

  it('ignore les réponses sans nom de joueur', () => {
    useStatsStore.getState().recordAnswer(null, 'palettisation', true)
    expect(Object.keys(useStatsStore.getState().players)).toHaveLength(0)
  })

  it('une session 10/10 débloque le badge Sans faute', () => {
    const s = useStatsStore.getState()
    s.recordSession('Léa', 'math', { score: 1500, bestStreak: 10, correct: 10, answered: 10 })
    const badges = useStatsStore.getState().getBadges('Léa')
    expect(badges.map((b) => b.id)).toContain('perfect')
  })

  it('les badges sont cohérents avec leurs seuils', () => {
    const s = useStatsStore.getState()
    for (let i = 0; i < 12; i++) s.recordAnswer('Max', 'jit', true)
    const badges = useStatsStore.getState().getBadges('Max')
    expect(badges.map((b) => b.id)).toContain('first_steps')
    expect(badges.map((b) => b.id)).not.toContain('expert')
    expect(BADGES.length).toBeGreaterThanOrEqual(6)
  })

  it('exporte un CSV exploitable (séparateur ;, précision calculée)', () => {
    const s = useStatsStore.getState()
    s.recordAnswer('Zoé', 'green', true)
    s.recordAnswer('Zoé', 'green', true)
    s.recordAnswer('Zoé', 'green', false)

    const csv = buildStatsCSV(useStatsStore.getState().players)
    const [header, row] = csv.split('\n')
    expect(header).toContain('Élève')
    expect(header).toContain('green (%)')
    expect(row).toContain('"Zoé"')
    expect(row).toContain('"67"') // 2/3 ≈ 67 %
  })
})
