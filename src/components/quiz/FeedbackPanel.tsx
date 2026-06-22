import type { AnsweredQuestion, Question } from '@/types'
import DocLink from '@/components/ui/DocLink'

interface FeedbackPanelProps {
  question: Question
  answeredQuestion: AnsweredQuestion
}

export default function FeedbackPanel({ question, answeredQuestion }: FeedbackPanelProps) {
  const isCorrect = answeredQuestion.isCorrect

  return (
    <div
      className={`rounded-xl border-l-4 p-4 space-y-2 ${
        isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
      }`}
    >
      <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
        {isCorrect ? '✓ Correto!' : `✗ Incorreto — A resposta certa é ${question.correct_answer}`}
      </p>
      <p className="text-slate-700 text-sm leading-relaxed">{question.explanation}</p>
      {question.reference_url && <DocLink url={question.reference_url} />}
    </div>
  )
}
