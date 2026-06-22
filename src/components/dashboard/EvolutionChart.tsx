'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { SessionRecord } from '@/types'

interface EvolutionChartProps {
  sessions: SessionRecord[]
}

export default function EvolutionChart({ sessions }: EvolutionChartProps) {
  const data = useMemo(() =>
    [...sessions]
      .reverse()
      .slice(-10)
      .map((s, i) => ({
        label: `#${i + 1}`,
        percent: s.scorePercent,
        date: new Date(s.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      })),
    [sessions]
  )

  if (data.length < 2) return null

  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold text-slate-700">Evolução das Últimas Sessões</h2>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Pontuação']} />
            <ReferenceLine y={70} stroke="#16a34a" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="percent" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: '#6366f1' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
