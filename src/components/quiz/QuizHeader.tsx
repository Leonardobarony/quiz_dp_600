import ProgressBar from './ProgressBar'
import Timer from './Timer'
import Badge from '@/components/ui/Badge'
import type { QuizMode } from '@/types'
import { QUIZ_MODE_LABELS } from '@/lib/constants'

const modeBadgeColor: Record<QuizMode, 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'slate'> = {
  simulation: 'purple',
  'domain-1': 'blue',
  'domain-2': 'green',
  'domain-3': 'yellow',
  review: 'red',
}

interface QuizHeaderProps {
  mode: QuizMode
  currentIndex: number
  total: number
  timeRemainingSeconds: number | null
  onExit: () => void
}

export default function QuizHeader({ mode, currentIndex, total, timeRemainingSeconds, onExit }: QuizHeaderProps) {
  return (
    <div className="w-full space-y-3 pb-4 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge label={QUIZ_MODE_LABELS[mode]} color={modeBadgeColor[mode]} />
          {timeRemainingSeconds !== null && <Timer seconds={timeRemainingSeconds} />}
        </div>
        <button
          onClick={onExit}
          className="text-slate-400 hover:text-slate-600 text-sm"
        >
          Sair
        </button>
      </div>
      <ProgressBar current={currentIndex + 1} total={total} />
    </div>
  )
}
