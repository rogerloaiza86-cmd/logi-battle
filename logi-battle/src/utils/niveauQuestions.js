import { cultureQuestions } from './cultureQuestions'
import { questionsDecouverte } from './decouverteQuestions'
import { greenLogisticsQuestions } from './greenLogisticsQuestions'
import { legalQuestions } from './legalQuestions'
import { loadingMCQQuestions } from './loadingMCQQuestions'
import { mathQuestions } from './mathQuestions'
import { paletteMCQQuestions } from './paletteMCQQuestions'
import { receptionQuestions } from './receptionControlQuestions'
import { routeOptimizerQuestions } from './routeOptimizerQuestions'
import { safetyQuestions } from './safetyQuestions'
import { stockQuestions } from './stockManagementQuestions'
import { supplyChainQuestions } from './supplyChainQuestions'
import { transportMCQQuestions } from './transportMCQQuestions'
import { vocabularyQuestions } from './vocabularyQuestions'
import {
  MODULE_THEME,
  THEME_LABEL,
  phraseAdapteeSeconde,
  themeDuModule,
} from '../data/niveaux'

function pick(list) {
  if (!list?.length) return null
  return list[Math.floor(Math.random() * list.length)]
}

function enonce(raw) {
  if (raw.term) return `Que signifie : ${raw.term}`
  if (raw.scenario && raw.question) return `${raw.scenario} ${raw.question}`
  return raw.question
}

function mcq(type, title, raw, themeEleve) {
  return {
    type,
    id: raw.id,
    difficulty: raw.difficulty || 1,
    title,
    description: enonce(raw),
    themeEleve: themeEleve || THEME_LABEL[raw.theme] || MODULE_THEME[type],
    isMCQ: true,
    data: {
      options: raw.options,
      correctOption: raw.correctOption,
      explanation: raw.explanation,
      category: raw.category || themeEleve,
      term: raw.term,
      isMCQ: true,
    },
    correctAnswer: raw.correctOption,
    explanation: raw.explanation,
    hints: [],
  }
}

function decouverte(theme) {
  const raw = pick(questionsDecouverte(theme))
  return mcq('decouverte', 'Découverte logistique', raw, THEME_LABEL[raw.theme])
}

function simples(list) {
  return list.filter((item) => phraseAdapteeSeconde(item.question || item.term, item.difficulty))
}

function jusqua(list, max) {
  return list.filter((item) => item.options && Number(item.difficulty || 1) <= max)
}

export function generateQuestionPourNiveau(gameMode, niveau, { palletCalc } = {}) {
  if (niveau === 'seconde') return questionSeconde(gameMode)
  return questionPremiere(gameMode, palletCalc)
}

function questionSeconde(gameMode) {
  const theme = themeDuModule(gameMode)
  if (gameMode === 'safety') {
    const raw = pick(simples(safetyQuestions))
    if (raw) return mcq('safety', 'La sécurité au quai', raw, MODULE_THEME.safety)
  }
  if (gameMode === 'supply_chain') {
    const raw = pick(simples(supplyChainQuestions))
    if (raw) return mcq('supply_chain', 'La chaîne logistique', raw, MODULE_THEME.supply_chain)
  }
  if (gameMode === 'all') {
    const choix = pick(['decouverte', 'safety', 'supply_chain'])
    if (choix === 'safety') return questionSeconde('safety')
    if (choix === 'supply_chain') return questionSeconde('supply_chain')
  }
  return decouverte(theme)
}

function questionPremiere(gameMode, palletCalc) {
  const mode = gameMode === 'all'
    ? pick(['reception', 'stock', 'palettisation', 'route', 'legal', 'safety', 'supply_chain', 'vocabulaire', 'green', 'math'])
    : gameMode

  if (mode === 'palettisation') {
    if (palletCalc && Math.random() < 0.5) {
      const calcul = palletCalc()
      return { ...calcul, themeEleve: MODULE_THEME.palettisation, difficulty: 1 }
    }
    const raw = pick(jusqua(paletteMCQQuestions, 2))
    if (raw) return mcq('palettisation', 'La palettisation', raw, MODULE_THEME.palettisation)
  }

  if (mode === 'cout_transport') {
    const raw = pick(jusqua(transportMCQQuestions, 2))
    if (raw) return mcq('cout_transport', 'Le transport', raw, 'Le transport, sans tarif composé')
  }

  if (mode === 'loading_plan') {
    const raw = pick(jusqua(loadingMCQQuestions, 1))
    if (raw) return mcq('loading_plan', 'Le chargement', raw, 'Préparer un chargement')
  }

  const banques = {
    reception: [receptionQuestions, 'reception', 'La réception'],
    stock: [stockQuestions, 'stock', 'Le stock'],
    route: [routeOptimizerQuestions, 'route', 'La tournée'],
    legal: [legalQuestions, 'legal', 'Les documents de transport'],
    green: [greenLogisticsQuestions, 'green', 'Les gaspillages'],
    safety: [safetyQuestions, 'safety', 'La sécurité au quai'],
    supply_chain: [supplyChainQuestions, 'supply_chain', 'La chaîne logistique'],
    vocabulaire: [vocabularyQuestions, 'vocabulaire', 'Les mots du métier'],
    math: [mathQuestions.filter((item) => item.difficulty === 1), 'math', 'Un calcul guidé'],
    culture: [cultureQuestions.filter((item) => /^C[12]/.test(item.category || '')), 'culture', 'Les activités logistiques'],
  }

  const banque = banques[mode]
  if (banque) {
    const [list, type, titre] = banque
    const raw = pick(type === 'math' || type === 'culture' ? list : jusqua(list, 2))
    if (raw) return mcq(type, titre, raw, MODULE_THEME[type] || titre)
  }

  return decouverte(themeDuModule(mode))
}
