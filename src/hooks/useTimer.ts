'use client'

import { useEffect } from 'react'
import { useQuizStore } from '@/store'

export function useTimer() {
  const session = useQuizStore((s) => s.session)
  const tickTimer = useQuizStore((s) => s.tickTimer)

  const isActive =
    session !== null &&
    !session.isFinished &&
    session.timeRemainingSeconds !== null &&
    session.timeRemainingSeconds > 0

  useEffect(() => {
    if (!isActive) return
    const id = setInterval(tickTimer, 1000)
    return () => clearInterval(id)
  }, [isActive, tickTimer])
}
