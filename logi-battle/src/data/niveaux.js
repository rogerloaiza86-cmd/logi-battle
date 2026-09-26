/** Niveaux scolaires du bac pro. La difficulté 1/2/3 d’un exercice n’est pas une classe. */

export const NIVEAUX = [
  {
    id: 'seconde',
    label: 'Seconde',
    accroche: 'Découvrir l’entrepôt, les mots et les risques. Pas de calcul.',
  },
  {
    id: 'premiere',
    label: 'Première',
    accroche: 'Réaliser une opération, puis un calcul guidé à une étape.',
  },
  {
    id: 'terminale',
    label: 'Terminale',
    accroche: 'Combiner coût, chargement, traçabilité et coordination.',
  },
]

export const NIVEAU_LABEL = Object.fromEntries(NIVEAUX.map((niveau) => [niveau.id, niveau.label]))

export const THEME_LABEL = {
  zones: 'Les zones de l’entrepôt',
  securite: 'La sécurité au quai',
  acteurs: 'Qui fait quoi',
  documents: 'Les documents',
  manutention: 'Palettes et colis',
}

const THEME_PAR_MODULE = {
  safety: 'securite',
  supply_chain: 'acteurs',
  culture: 'acteurs',
  reception: 'documents',
  stock: 'zones',
  palettisation: 'manutention',
  loading_plan: 'manutention',
  cout_transport: 'acteurs',
  route: 'acteurs',
  legal: 'documents',
  green: 'zones',
  math: 'manutention',
  jit: 'zones',
  traceability: 'documents',
  team_leader: 'acteurs',
  vocabulaire: null,
  all: null,
  decouverte: null,
}

export const MODULE_THEME = {
  decouverte: 'Découverte logistique',
  vocabulaire: 'Les mots de l’entrepôt',
  supply_chain: 'La chaîne logistique',
  safety: 'La sécurité au quai',
  culture: 'Métiers de la logistique',
  reception: 'La réception',
  stock: 'Le stock',
  palettisation: 'La palettisation',
  route: 'La tournée',
  legal: 'Les documents de transport',
  green: 'Les gaspillages',
  math: 'Un calcul guidé',
  cout_transport: 'Le coût d’un envoi',
  loading_plan: 'Le plan de chargement',
  jit: 'La ligne de production',
  traceability: 'La traçabilité',
  team_leader: 'La petite équipe',
}

const OUVERTS = {
  seconde: ['all', 'decouverte', 'vocabulaire', 'supply_chain', 'safety', 'culture'],
  premiere: ['all', 'decouverte', 'vocabulaire', 'supply_chain', 'safety', 'culture', 'reception', 'stock', 'palettisation', 'route', 'legal', 'green', 'math'],
}

const JARGON = /\b(wms|tms|3pl|4pl|incoterms?|kanban|kitting|cross-?dock|fifo|lifo|cmr|edi|sku|sap|r\.?\s*489)\b/i

export function normaliserNiveau(niveau) {
  return NIVEAU_LABEL[niveau] ? niveau : 'seconde'
}

export function themeDuModule(moduleId) {
  return THEME_PAR_MODULE[moduleId] || null
}

export function moduleOuvert(moduleId, niveau) {
  if (niveau === 'terminale' || !moduleId || moduleId === 'all') return true
  return (OUVERTS[niveau] || []).includes(moduleId)
}

export function messageReport(moduleId, niveau) {
  if (moduleOuvert(moduleId, niveau)) return ''
  return 'Ce sujet se traite plus tard dans le cursus. La salle joue d’abord les situations qui y préparent.'
}

export function phraseAdapteeSeconde(text, difficulty = 1) {
  if (Number(difficulty) > 1) return false
  const value = String(text || '')
  if (!value || value.length > 220) return false
  return !JARGON.test(value)
}

export function themeEleveDe(question) {
  if (question?.themeEleve) return question.themeEleve
  return MODULE_THEME[question?.type] || 'Logistique'
}

export function questionRespecteNiveau(question, niveau) {
  if (!question || question.niveau !== niveau) return false
  const keypad = !question.isMCQ && !question.data?.options && typeof question.correctAnswer === 'number'
  if (niveau === 'seconde') {
    return !keypad && question.type !== 'math' && question.type !== 'cout_transport' && question.type !== 'loading_plan'
  }
  if (niveau === 'premiere' && keypad) {
    return question.difficulty === 1 && question.type === 'palettisation'
  }
  return true
}
