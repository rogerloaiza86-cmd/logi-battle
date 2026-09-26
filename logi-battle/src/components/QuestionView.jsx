import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import { questionUsesKeypad } from '../utils/roundRules'

export default function QuestionView({ question, ...props }) {
  if (!question) return null
  const Card = questionUsesKeypad(question) ? QuestionCard : VocabularyCard
  const badge = question.referentiel

  return (
    <div className="w-full max-w-lg">
      {question.themeEleve && (
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white text-center mb-1">
          {question.themeEleve}
        </p>
      )}
      {badge && (
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4b942] text-center mb-2">
          {badge.unite} · {badge.competence}
        </p>
      )}
      <Card question={question} {...props} />
    </div>
  )
}
