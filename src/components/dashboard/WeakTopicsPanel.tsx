import type { SubdomainStat } from '@/types'
import Card from '@/components/ui/Card'

interface WeakTopicsPanelProps {
  subdomainStats: Record<string, SubdomainStat>
}

export default function WeakTopicsPanel({ subdomainStats }: WeakTopicsPanelProps) {
  const stats = Object.values(subdomainStats)
    .filter((s) => s.total >= 2)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 5)

  if (stats.length === 0) {
    return (
      <Card>
        <p className="text-sm text-slate-500 text-center py-4">
          Responda pelo menos 2 questões por subdomínio para ver os tópicos mais fracos.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold text-slate-700">Tópicos com Menor Desempenho</h2>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.subdomain} className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-3">
            <span className={`text-sm font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${stat.percent < 50 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {stat.percent}%
            </span>
            <div className="min-w-0">
              <p className="text-xs text-slate-500">Subdomínio {stat.subdomain}</p>
              <p className="text-sm text-slate-700 truncate">{stat.topic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
