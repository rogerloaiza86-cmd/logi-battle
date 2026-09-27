import { cultureQuestions } from '../src/utils/cultureQuestions.js'
import { greenLogisticsQuestions } from '../src/utils/greenLogisticsQuestions.js'
import { mathQuestions } from '../src/utils/mathQuestions.js'
import { receptionQuestions } from '../src/utils/receptionControlQuestions.js'
import { safetyQuestions } from '../src/utils/safetyQuestions.js'
import { stockQuestions } from '../src/utils/stockManagementQuestions.js'
import { teamLeaderQuestions } from '../src/utils/teamLeaderQuestions.js'
import { traceabilityQuestions } from '../src/utils/traceabilityQuestions.js'
import {
  generateLoadingPlanQuestion,
  generateNextQuestion,
  generatePalletizationQuestion,
  generateTransportCostQuestion,
} from '../src/utils/questionGenerator.js'
import { formatQuestionDescription } from '../src/utils/questionPrompt.js'
import { answerTargetsQuestion, gradePlayerAnswer, questionUsesKeypad, resolveRoundWinner } from '../src/utils/roundRules.js'
import { createRoomCode, normalizeRoomCode, ROOM_ALPHABET } from '../src/services/roomCode.js'
import { questionRespecteNiveau } from '../src/data/niveaux.js'
import { decouverteQuestions } from '../src/utils/decouverteQuestions.js'
import { applyArenaResult, rankGroups } from '../src/utils/classement.js'
import { describeMatch, sortMatches } from '../src/utils/matchJournal.js'
import { buildRegisterFile, parseRegisterFile } from '../src/utils/classRegisterFile.js'

const types = [
  'palettisation', 'cout_transport', 'loading_plan', 'vocabulaire', 'supply_chain',
  'reception', 'stock', 'safety', 'traceability', 'green', 'team_leader', 'jit',
  'route', 'legal', 'math', 'culture',
]

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

for (const type of types) {
  const question = generateNextQuestion(type)
  assert(question.referentiel?.competence, `${type} sans compétence du référentiel`)
  if (questionUsesKeypad(question)) {
    assert(Number.isInteger(question.correctAnswer), `${type} calcul non entier: ${question.correctAnswer}`)
    assert(question.description && question.description.length > 20, `${type} énoncé trop court`)
    assert(gradePlayerAnswer(question, String(question.correctAnswer)), `${type} saisie correcte refusée`)
  } else {
    const options = question.data?.options
    const index = question.data?.correctOption
    assert(Array.isArray(options) && options.length >= 2, `${type} sans options`)
    assert(index >= 0 && index < options.length, `${type} index ${index} hors options`)
    assert(gradePlayerAnswer(question, index), `${type} index correct refusé`)
    assert(!gradePlayerAnswer(question, index === 0 ? 1 : 0), `${type} mauvais index accepté`)
  }
}

assert(resolveRoundWinner('correct', 'playing', 100, null) === 'A', 'équipe A seule')
assert(resolveRoundWinner('wrong', 'correct', null, 100) === 'B', 'équipe B seule')
assert(resolveRoundWinner('correct', 'correct', 200, 100) === 'B', 'B plus rapide')
assert(resolveRoundWinner('correct', 'correct', 100, 100) === null, 'égalité de temps')

for (const question of cultureQuestions) {
  assert(!/game of thrones|oscar|netflix|brexit/i.test(question.question), `hors référentiel: ${question.question}`)
  assert(question.correctOption >= 0 && question.correctOption < question.options.length, question.id)
}

const palette = generatePalletizationQuestion(3, true)
assert(palette.description.includes(String(palette.data.maxHeight)), 'hauteur de palette absente de l’énoncé')

for (let index = 0; index < 20; index += 1) {
  const loading = generateLoadingPlanQuestion(1, true)
  assert(Number.isInteger(loading.correctAnswer), `plan de chargement non entier: ${loading.correctAnswer}`)
  const transport = generateTransportCostQuestion(3, true)
  assert(transport.description.includes('carburant'), 'tarif carburant absent')
  assert(transport.description.includes('péage'), 'péage absent')
}

const math004 = mathQuestions.find((question) => question.id === 'math_004')
assert(math004.options[math004.correctOption] === '33', 'math_004')
const safety024 = safetyQuestions.find((question) => question.id === 'safety_024')
assert(safety024.correctOption === 1, 'safety_024')

const scenarioBanks = [
  ['reception', receptionQuestions],
  ['stock', stockQuestions],
  ['safety', safetyQuestions],
  ['traceability', traceabilityQuestions],
  ['green', greenLogisticsQuestions],
  ['team_leader', teamLeaderQuestions],
]

for (const [moduleId, bank] of scenarioBanks) {
  const needsContext = bank.filter((item) => item.scenario)
  assert(needsContext.length > 0, `${moduleId} sans scénario à vérifier`)
  for (const item of needsContext) {
    const description = formatQuestionDescription(item.question, item.scenario)
    assert(description.includes(item.scenario.trim()), `${item.id} perd son scénario`)
    assert(description.includes(item.question.trim()), `${item.id} perd sa question`)
  }

  const barePrompts = new Set(needsContext.map((item) => item.question.trim()))
  for (let index = 0; index < 40; index += 1) {
    const generated = generateNextQuestion(moduleId)
    assert(!barePrompts.has(generated.description.trim()), `${moduleId} affiche une question sans scénario`)
  }
}

const rec018 = receptionQuestions.find((item) => item.id === 'rec_018')
const weights = [...rec018.scenario.matchAll(/(\d+)\s*colis de (\d+)\s*kg/gi)]
const totalWeight = weights.reduce((sum, [, count, kg]) => sum + Number(count) * Number(kg), 0)
assert(parseInt(rec018.options[rec018.correctOption], 10) === totalWeight, `rec_018 noté ${rec018.options[rec018.correctOption]} au lieu de ${totalWeight}`)
assert(rec018.options.filter((option, index, all) => all.indexOf(option) !== index).length === 0, 'rec_018 options dupliquées')

assert(answerTargetsQuestion({ id: 'q1' }, 'q1'), 'réponse de la manche courante')
assert(!answerTargetsQuestion({ id: 'q2' }, 'q1'), 'réponse d’une manche précédente')
assert(!answerTargetsQuestion({ id: 'q2' }, undefined), 'réponse sans identifiant')

assert(normalizeRoomCode(' ab-cde ') === 'ABCDE', 'code avec espaces')
assert(normalizeRoomCode('GAME-K7MNP') === 'K7MNP', 'préfixe GAME')
assert(normalizeRoomCode('GAMEABCDE') === 'ABCDE', 'préfixe collé')
const roomCode = createRoomCode()
assert(roomCode.length === 5, 'code de salle sur 5 caractères')
assert([...roomCode].every((char) => ROOM_ALPHABET.includes(char)), 'alphabet sans ambiguïté')

const themes = new Set(decouverteQuestions.map((question) => question.theme))
assert(themes.size === 5, 'cinq thèmes de découverte')
assert(decouverteQuestions.length >= 40, 'banque de découverte trop courte')
for (const question of decouverteQuestions) {
  assert(question.options.length === 4, `${question.id} doit avoir 4 choix`)
  assert(question.correctOption >= 0 && question.correctOption < 4, `${question.id} index`)
  assert(!/\b(wms|tms|incoterm)\b/i.test(question.question), `${question.id} trop technique`)
}
assert(new Set(decouverteQuestions.map((question) => question.correctOption)).size === 4, 'bonnes réponses dispersées')

for (const moduleId of ['all', 'cout_transport', 'loading_plan', 'math', 'palettisation', 'safety', 'vocabulaire']) {
  for (let index = 0; index < 12; index += 1) {
    const seconde = generateNextQuestion(moduleId, 'seconde')
    assert(questionRespecteNiveau(seconde, 'seconde'), `${moduleId} seconde hors cadre: ${seconde.type}`)
    assert(seconde.themeEleve, 'thème élève manquant')
  }
}

let premiereCalcul = false
for (let index = 0; index < 20; index += 1) {
  const premiere = generateNextQuestion('palettisation', 'premiere')
  assert(questionRespecteNiveau(premiere, 'premiere'), 'première hors cadre')
  if (questionUsesKeypad(premiere)) premiereCalcul = true
  const transport = generateNextQuestion('cout_transport', 'premiere')
  assert(!questionUsesKeypad(transport), 'première : coût composé interdit')
}
assert(premiereCalcul, 'la première doit pouvoir calculer une palettisation guidée')

const terminale = generateNextQuestion('culture', 'terminale')
assert(terminale.niveau === 'terminale', 'terminale non marquée')

const groups = [
  { id: 'a', name: 'Alpha', stats: { wins: 0, losses: 0, draws: 0, totalMatches: 0, points: 0, titleDefenses: 2 } },
  { id: 'b', name: 'Bravo', stats: { wins: 0, losses: 0, draws: 0, totalMatches: 0, points: 0, titleDefenses: 0 } },
]
const afterWin = applyArenaResult(groups, 'a', 'b', 'A')
assert(afterWin.find((group) => group.id === 'a').stats.points === 3, 'victoire = 3 points')
assert(afterWin.find((group) => group.id === 'b').stats.points === 0, 'défaite = 0 point')
assert(afterWin.find((group) => group.id === 'a').stats.titleDefenses === 2, 'un match d’arène ne gonfle pas les défenses')
const afterDraw = applyArenaResult(groups, 'a', 'b', null)
assert(afterDraw.every((group) => group.stats.points === 1), 'nul = 1 point chacun')
const ranked = rankGroups(afterWin)
assert(ranked[0].id === 'a' && ranked[0].rank === 1 && ranked[0].isChampion, 'le leader du classement est champion')

const journalGroups = [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Bravo' }]
const arenaNote = describeMatch({
  id: 'm1',
  type: 'arena',
  groupAId: 'a',
  groupBId: 'b',
  arenaWinner: 'A',
  winner: 'challenger',
  date: '2026-09-01T10:00:00.000Z',
  score: { A: 3, B: 1 },
}, journalGroups, '2LOG')
assert(arenaNote.result === 'Alpha gagne', 'journal arène')
assert(arenaNote.scoreLabel === '3 — 1', 'score arène')
const drawNote = describeMatch({
  type: 'arena', groupAId: 'a', groupBId: 'b', arenaWinner: null, winner: 'draw', date: '2026-09-02',
}, journalGroups)
assert(drawNote.result === 'Match nul' && drawNote.draw, 'journal nul')
const titleNote = describeMatch({
  challengerId: 'a', championId: 'b', winner: 'champion', date: '2026-08-01', score: { teamA: 2, teamB: 4 },
}, journalGroups)
assert(titleNote.result === 'Bravo conserve le titre', 'journal titre')
assert(titleNote.scoreLabel === '2 — 4', 'score titre')
const ordered = sortMatches([{ date: '2026-01-01T00:00:00.000Z' }, { date: '2026-06-01T00:00:00.000Z' }])
assert(ordered[0].date.startsWith('2026-06'), 'les matchs récents passent devant')

const register = buildRegisterFile([{
  id: 'class_1',
  name: '2LOG A',
  niveau: 'seconde',
  groups: [{ id: 'a', name: 'Alpha', stats: { points: 3, wins: 1, losses: 0, draws: 0, totalMatches: 1, titleDefenses: 0 } }],
  matches: [],
  online: { code: 'AB23CD45', teacherKey: 'CLEPROFESSEURTRESLONGUE123456' },
}])
const restored = parseRegisterFile(JSON.stringify(register))
assert(restored.ok && restored.classes[0].name === '2LOG A', 'reprise du fichier')
assert(restored.classes[0].groups[0].stats.points === 3, 'points repris')
assert(restored.classes[0].online.teacherKey === 'CLEPROFESSEURTRESLONGUE123456', 'clé professeur reprise')
assert(!parseRegisterFile('{}').ok, 'fichier étranger refusé')

console.log(`Référentiel OK — ${types.length} modules, ${cultureQuestions.length} questions de diplôme.`)
