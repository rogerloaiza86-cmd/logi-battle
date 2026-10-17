import { francaisQuestions } from './francais'
import { mathematiquesQuestions } from './mathematiques'
import { histoireQuestions } from './histoire'
import { geographieQuestions } from './geographie'
import { anglaisQuestions } from './anglais'
import { espagnolQuestions } from './espagnol'
import { matiereParId, voieParId } from '../cursus'
import { programmeDe } from '../programmes'

export const questionsCursus = [
  ...francaisQuestions,
  ...mathematiquesQuestions,
  ...histoireQuestions,
  ...geographieQuestions,
  ...anglaisQuestions,
  ...espagnolQuestions,
]

export function questionsDe(voie, annee, matiere) {
  return questionsCursus.filter((question) => (
    question.voies.includes(voie)
    && question.annee === annee
    && question.matiere === matiere
  ))
}

export function compterQuestions(voie, annee, matiere) {
  return questionsDe(voie, annee, matiere).length
}

export function tirerQuestionCursus({ voie, annee, matiere }) {
  const programme = programmeDe(voie, annee, matiere)
  const banque = questionsDe(voie, annee, matiere)
  if (!programme || banque.length === 0) {
    throw new Error(`Aucune question pour ${voie} ${annee} ${matiere}`)
  }
  const fiche = banque[Math.floor(Math.random() * banque.length)]
  const matiereLabel = matiereParId(matiere)?.label || matiere
  const voieLabel = voieParId(voie)?.label || voie
  return {
    type: matiere,
    difficulty: 1,
    title: matiereLabel,
    description: fiche.question,
    data: {
      options: fiche.options,
      correctOption: fiche.correctOption,
      explanation: fiche.explanation,
      category: fiche.theme,
      isMCQ: true,
    },
    correctAnswer: fiche.correctOption,
    explanation: fiche.explanation,
    hints: [fiche.theme],
    isMCQ: true,
    niveau: annee,
    themeEleve: fiche.theme,
    referentiel: {
      unite: programme.bulletin,
      competence: fiche.theme,
      pole: `${voieLabel} · ${matiereLabel}`,
      savoir: programme.intitule,
    },
    cursus: {
      voie,
      annee,
      matiere,
      programmeId: programme.id,
      source: programme.source,
    },
  }
}
