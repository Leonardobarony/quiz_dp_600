'use client'

import { useTimer } from '@/hooks/useTimer'

interface TimerProps {
  seconds: number
}

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function Timer({ seconds }: TimerProps) {
  useTimer()

  const isWarning = seconds <= 600

  return (
    <div
      className={`flex items-center gap-1.5 text-sm font-mono font-semibold px-3 py-1 rounded-full ${
        isWarning ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
      }`}
    >
      <span className={isWarning ? 'animate-pulse' : ''}>⏱</span>
      {formatTime(seconds)}
    </div>
  )
}
