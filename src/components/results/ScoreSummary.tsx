import { PASS_THRESHOLD } from '@/lib/constants'

interface ScoreSummaryProps {
  scorePercent: number
  totalQuestions: number
  correctAnswers: number
}

export default function ScoreSummary({ scorePercent, totalQuestions, correctAnswers }: ScoreSummaryProps) {
  const passed = scorePercent >= PASS_THRESHOLD * 100

  return (
    <div className={`rounded-2xl p-8 text-center ${passed ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
      <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-700' : 'text-orange-600'}`}>
        {scorePercent}%
      </div>
      <p className={`text-lg font-semibold mb-1 ${passed ? 'text-green-700' : 'text-orange-600'}`}>
        {passed ? 'Aprovado! Excelente resultado.' : 'Continue praticando!'}
      </p>
      <p className="text-slate-600 text-sm">
        {correctAnswers} de {totalQuestions} questões corretas
        {passed
          ? ' — Pontuação acima do mínimo exigido (70%)'
          : ' — Meta: 70% para aprovação no exame DP-600'}
      </p>
    </div>
  )
}
