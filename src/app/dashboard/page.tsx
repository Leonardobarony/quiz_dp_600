'use client'

import { useProgress } from '@/hooks/useProgress'
import SessionHistory from '@/components/dashboard/SessionHistory'
import DomainProgressChart from '@/components/dashboard/DomainProgressChart'
import WeakTopicsPanel from '@/components/dashboard/WeakTopicsPanel'
import EvolutionChart from '@/components/dashboard/EvolutionChart'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const { hydrated, sessions, subdomainStats, clearHistory } = useProgress()

  if (!hydrated) return null

  if (sessions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <EmptyState
          icon="📊"
          title="Nenhuma sessão ainda"
          description="Complete pelo menos um quiz para ver seu progresso aqui."
          actionLabel="Começar um quiz"
          onAction={() => router.push('/')}
        />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Seu Progresso</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm('Limpar todo o histórico de progresso?')) clearHistory()
          }}
          className="text-red-500 hover:text-red-700"
        >
          Limpar histórico
        </Button>
      </div>

      <DomainProgressChart sessions={sessions} />
      <EvolutionChart sessions={sessions} />
      <WeakTopicsPanel subdomainStats={subdomainStats} />
      <SessionHistory sessions={sessions} />
    </div>
  )
}
