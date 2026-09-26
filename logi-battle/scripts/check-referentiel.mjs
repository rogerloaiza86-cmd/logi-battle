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

const rec001 = receptionQuestions.find((item) => item.id === 'rec_001')
assert(formatQuestionDescription(rec001.question, rec001.scenario).includes('déchirures'), 'rec_001')
const stock015 = stockQuestions.find((item) => item.id === 'stock_015')
const stockPrompt = formatQuestionDescription(stock015.question, stock015.scenario)
assert(stockPrompt.includes('100') && stockPrompt.includes('95'), 'stock_015')
const leader001 = teamLeaderQuestions.find((item) => item.id === 'leader_001')
assert(formatQuestionDescription(leader001.question, leader001.scenario).includes('200 commandes'), 'leader_001')

const rec018 = receptionQuestions.find((item) => item.id === 'rec_018')
const weights = [...rec018.scenario.matchAll(/(\d+)\s*colis de (\d+)\s*kg/gi)]
const totalWeight = weights.reduce((sum, [, count, kg]) => sum + Number(count) * Number(kg), 0)
assert(parseInt(rec018.options[rec018.correctOption], 10) === totalWeight, `rec_018 noté ${rec018.options[rec018.correctOption]} au lieu de ${totalWeight}`)

assert(answerTargetsQuestion({ id: 'q1' }, 'q1'), 'réponse de la manche courante')
assert(!answerTargetsQuestion({ id: 'q2' }, 'q1'), 'réponse d’une manche précédente')
assert(!answerTargetsQuestion({ id: 'q2' }, undefined), 'réponse sans identifiant')

assert(normalizeRoomCode(' ab-cde ') === 'ABCDE', 'code avec espaces')
assert(normalizeRoomCode('GAME-K7MNP') === 'K7MNP', 'préfixe GAME')
assert(normalizeRoomCode('GAMEABCDE') === 'ABCDE', 'préfixe collé')
const roomCode = createRoomCode()
assert(roomCode.length === 5, 'code de salle sur 5 caractères')
assert([...roomCode].every((char) => ROOM_ALPHABET.includes(char)), 'alphabet sans ambiguïté')

console.log(`Référentiel OK — ${types.length} modules, ${cultureQuestions.length} questions de diplôme.`)
