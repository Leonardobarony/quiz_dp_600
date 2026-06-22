import React from 'react'
import type { OptionKey } from '@/types'

interface OptionButtonProps {
  optionKey: OptionKey
  text: string
  isSelected: boolean
  isCorrect: boolean
  isRevealed: boolean
  isDisabled: boolean
  onClick: () => void
}

const OptionButton = React.memo(function OptionButton({
  optionKey,
  text,
  isSelected,
  isCorrect,
  isRevealed,
  isDisabled,
  onClick,
}: OptionButtonProps) {
  let stateClass = 'bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50'

  if (isRevealed) {
    if (isSelected && isCorrect) {
      stateClass = 'bg-green-50 border-green-500 text-green-800'
    } else if (isSelected && !isCorrect) {
      stateClass = 'bg-red-50 border-red-500 text-red-800'
    } else if (!isSelected && isCorrect) {
      stateClass = 'bg-green-50 border-green-400 text-green-700'
    } else {
      stateClass = 'bg-white border-slate-200 text-slate-400'
    }
  }

  const icon = isRevealed
    ? isCorrect
      ? '✓'
      : isSelected
      ? '✗'
      : ''
    : ''

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={isRevealed ? isSelected : undefined}
      className={`w-full flex items-start gap-3 text-left px-4 py-3 rounded-xl border-2 transition-all ${stateClass} ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
        {icon || optionKey}
      </span>
      <span className="text-sm leading-relaxed pt-0.5">{text}</span>
    </button>
  )
})

export default OptionButton
