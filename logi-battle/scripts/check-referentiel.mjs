import { cultureQuestions } from '../src/utils/cultureQuestions.js'
import { mathQuestions } from '../src/utils/mathQuestions.js'
import { safetyQuestions } from '../src/utils/safetyQuestions.js'
import {
  generateLoadingPlanQuestion,
  generateNextQuestion,
  generatePalletizationQuestion,
  generateTransportCostQuestion,
} from '../src/utils/questionGenerator.js'
import { gradePlayerAnswer, questionUsesKeypad, resolveRoundWinner } from '../src/utils/roundRules.js'
import { createRoomCode, normalizeRoomCode, ROOM_ALPHABET } from '../src/services/roomCode.js'
import { questionRespecteNiveau } from '../src/data/niveaux.js'
import { decouverteQuestions } from '../src/utils/decouverteQuestions.js'

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

console.log(`Référentiel OK — ${types.length} modules, ${cultureQuestions.length} questions de diplôme.`)
