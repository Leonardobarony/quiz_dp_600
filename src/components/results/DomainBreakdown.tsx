import type { DomainNumber, DomainScore } from '@/types'
import { DOMAIN_NAMES } from '@/lib/constants'
import Card from '@/components/ui/Card'

interface DomainBreakdownProps {
  domainScores: Partial<Record<DomainNumber, DomainScore>>
}

function scoreColor(percent: number) {
  if (percent >= 70) return 'text-green-700 bg-green-100'
  if (percent >= 50) return 'text-yellow-700 bg-yellow-100'
  return 'text-red-700 bg-red-100'
}

export default function DomainBreakdown({ domainScores }: DomainBreakdownProps) {
  const domains: DomainNumber[] = [1, 2, 3]

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-slate-700">Resultado por Domínio</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {domains.map((domain) => {
          const score = domainScores[domain]
          if (!score) return null
          return (
            <Card key={domain} className="p-4 space-y-2">
              <p className="text-xs font-medium text-slate-500 leading-tight">Domínio {domain}</p>
              <p className="text-sm font-semibold text-slate-800 leading-tight">{DOMAIN_NAMES[domain]}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{score.correct}/{score.total} certas</span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${scoreColor(score.percent)}`}>
                  {score.percent}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${score.percent >= 70 ? 'bg-green-500' : score.percent >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${score.percent}%` }}
                />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
