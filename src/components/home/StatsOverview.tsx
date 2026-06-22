'use client'

import { useProgress } from '@/hooks/useProgress'

export default function StatsOverview() {
  const { hydrated, sessions } = useProgress()

  if (!hydrated || sessions.length === 0) return null

  const totalSessions = sessions.length
  const avgScore = Math.round(sessions.reduce((sum, s) => sum + s.scorePercent, 0) / totalSessions)
  const bestScore = Math.max(...sessions.map((s) => s.scorePercent))

  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-2xl font-bold text-blue-700">{totalSessions}</p>
        <p className="text-xs text-blue-600 mt-0.5">Sessões</p>
      </div>
      <div className="bg-purple-50 rounded-xl p-4">
        <p className="text-2xl font-bold text-purple-700">{avgScore}%</p>
        <p className="text-xs text-purple-600 mt-0.5">Média</p>
      </div>
      <div className="bg-green-50 rounded-xl p-4">
        <p className="text-2xl font-bold text-green-700">{bestScore}%</p>
        <p className="text-xs text-green-600 mt-0.5">Melhor nota</p>
      </div>
    </div>
  )
}
