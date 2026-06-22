import type { AnsweredQuestion, OptionKey, Question } from '@/types'
import OptionButton from './OptionButton'
import Badge from '@/components/ui/Badge'
import { DIFFICULTY_LABELS } from '@/lib/constants'

const difficultyColor: Record<string, 'green' | 'yellow' | 'red'> = {
  easy: 'green',
  medium: 'yellow',
  hard: 'red',
}

interface QuestionCardProps {
  question: Question
  answeredQuestion: AnsweredQuestion | null
  onAnswer: (key: OptionKey) => void
}

export default function QuestionCard({ question, answeredQuestion, onAnswer }: QuestionCardProps) {
  const isRevealed = answeredQuestion !== null
  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D']

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge label={`Domínio ${question.domain}`} color="blue" />
          <Badge label={question.subdomain} color="slate" />
          <Badge
            label={DIFFICULTY_LABELS[question.difficulty] ?? question.difficulty}
            color={difficultyColor[question.difficulty] ?? 'slate'}
          />
        </div>
        <p className="text-slate-800 font-medium leading-relaxed">{question.question}</p>
      </div>

      <div className="space-y-3">
        {optionKeys.map((key) => (
          <OptionButton
            key={key}
            optionKey={key}
            text={question.options[key]}
            isSelected={answeredQuestion?.selectedAnswer === key}
            isCorrect={question.correct_answer === key}
            isRevealed={isRevealed}
            isDisabled={isRevealed}
            onClick={() => onAnswer(key)}
          />
        ))}
      </div>
    </div>
  )
}
