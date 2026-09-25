import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import { questionUsesKeypad } from '../utils/roundRules'

export default function QuestionView({ question, ...props }) {
  if (!question) return null
  const Card = questionUsesKeypad(question) ? QuestionCard : VocabularyCard
  const badge = question.referentiel

  return (
    <div className="w-full max-w-lg">
      {badge && (
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4b942] text-center mb-2">
          {badge.unite} · {badge.competence} · {badge.savoir}
        </p>
      )}
      <Card question={question} {...props} />
    </div>
  )
}
