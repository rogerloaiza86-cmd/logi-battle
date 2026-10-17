import QuestionCard from './QuestionCard'
import VocabularyCard from './VocabularyCard'
import SafetyCard from './SafetyCard'
import StockCard from './StockCard'
import GreenCard from './GreenCard'
import JitCard from './JitCard'
import LegalCard from './LegalCard'
import MathCard from './MathCard'
import RouteCard from './RouteCard'
import ReceptionCard from './ReceptionCard'
import SupplyChainCard from './SupplyChainCard'
import TraceabilityCard from './TraceabilityCard'
import TeamLeaderCard from './TeamLeaderCard'
import { presentQuestion, questionUsesKeypad } from '../utils/roundRules'

const SPECIALTY = {
  safety: SafetyCard,
  stock: StockCard,
  green: GreenCard,
  jit: JitCard,
  legal: LegalCard,
  math: MathCard,
  route: RouteCard,
  reception: ReceptionCard,
  supply_chain: SupplyChainCard,
  traceability: TraceabilityCard,
  team_leader: TeamLeaderCard,
}

export default function QuestionView({ question, ...props }) {
  if (!question) return null
  const shown = presentQuestion(question)
  const Card = questionUsesKeypad(question) ? QuestionCard : SPECIALTY[question.type] || VocabularyCard
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
      <Card question={shown} {...props} />
    </div>
  )
}
