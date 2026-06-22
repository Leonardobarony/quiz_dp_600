import type { SessionRecord } from '@/types'
import { QUIZ_MODE_LABELS } from '@/lib/constants'

interface SessionHistoryProps {
  sessions: SessionRecord[]
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  const recent = sessions.slice(0, 10)

  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold text-slate-700">Histórico de Sessões</h2>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs">
            <tr>
              <th className="text-left px-4 py-3">Data</th>
              <th className="text-left px-4 py-3">Modo</th>
              <th className="text-right px-4 py-3">Pontuação</th>
              <th className="text-right px-4 py-3">Questões</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recent.map((s) => {
              const date = new Date(s.date).toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', year: '2-digit',
              })
              const scoreColor = s.scorePercent >= 70 ? 'text-green-700' : s.scorePercent >= 50 ? 'text-yellow-600' : 'text-red-600'
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{date}</td>
                  <td className="px-4 py-3 text-slate-700">{QUIZ_MODE_LABELS[s.mode]}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${scoreColor}`}>{s.scorePercent}%</td>
                  <td className="px-4 py-3 text-right text-slate-500">{s.correctAnswers}/{s.totalQuestions}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
