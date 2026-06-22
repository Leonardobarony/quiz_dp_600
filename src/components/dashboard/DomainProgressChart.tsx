'use client'

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { DomainNumber, SessionRecord } from '@/types'
import { DOMAIN_NAMES } from '@/lib/constants'

interface DomainProgressChartProps {
  sessions: SessionRecord[]
}

export default function DomainProgressChart({ sessions: allSessions }: DomainProgressChartProps) {
  const domains: DomainNumber[] = [1, 2, 3]

  const data = useMemo(() => domains.map((domain) => {
    const scores: number[] = []
    for (const session of allSessions) {
      const ds = session.domainScores[domain]
      if (ds && ds.total > 0) scores.push(ds.percent)
    }
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    return {
      name: `Dom. ${domain}`,
      fullName: DOMAIN_NAMES[domain],
      percent: avg,
    }
  }), [allSessions])

  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold text-slate-700">Desempenho Médio por Domínio</h2>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Acertos']}
              labelFormatter={(label) => data.find((d) => d.name === label)?.fullName ?? label}
            />
            <ReferenceLine y={70} stroke="#16a34a" strokeDasharray="4 4" label={{ value: 'Meta 70%', fill: '#16a34a', fontSize: 11, position: 'right' }} />
            <Bar dataKey="percent" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
