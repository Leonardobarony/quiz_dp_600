'use client'

import { useEffect, useState } from 'react'
import { useProgressStore } from '@/store'

export function useProgress() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const sessions = useProgressStore((s) => s.sessions)
  const wrongAnswerIds = useProgressStore((s) => s.wrongAnswerIds)
  const flaggedIds = useProgressStore((s) => s.flaggedIds)
  const subdomainStats = useProgressStore((s) => s.subdomainStats)
  const flagQuestion = useProgressStore((s) => s.flagQuestion)
  const unflagQuestion = useProgressStore((s) => s.unflagQuestion)
  const clearHistory = useProgressStore((s) => s.clearHistory)

  return {
    hydrated,
    sessions,
    wrongAnswerIds,
    flaggedIds,
    subdomainStats,
    flagQuestion,
    unflagQuestion,
    clearHistory,
  }
}
