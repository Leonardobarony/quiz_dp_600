'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProgress } from '@/hooks/useProgress'
import { useQuiz } from '@/hooks/useQuiz'
import { getQuestionsByIds } from '@/lib/questions'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

type Tab = 'wrong' | 'flagged'

export default function ReviewPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('wrong')
  const { hydrated, wrongAnswerIds, flaggedIds, unflagQuestion } = useProgress()
  const { start } = useQuiz()

  if (!hydrated) return null

  const wrongQuestions = getQuestionsByIds(wrongAnswerIds)
  const flaggedQuestions = getQuestionsByIds(flaggedIds)
  const activeQuestions = activeTab === 'wrong' ? wrongQuestions : flaggedQuestions

  function handleStart() {
    const ids = activeTab === 'wrong' ? wrongAnswerIds : flaggedIds
    start('review', ids)
    router.push('/quiz/review')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold text-slate-800">Revisão</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('wrong')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'wrong' ? 'bg-red-100 text-red-700' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          Respostas Erradas
          <Badge label={String(wrongQuestions.length)} color="red" />
        </button>
        <button
          onClick={() => setActiveTab('flagged')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'flagged' ? 'bg-yellow-100 text-yellow-700' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          Marcadas para Revisão
          <Badge label={String(flaggedQuestions.length)} color="yellow" />
        </button>
      </div>

      {activeQuestions.length === 0 ? (
        <EmptyState
          icon={activeTab === 'wrong' ? '✅' : '🚩'}
          title={activeTab === 'wrong' ? 'Nenhum erro registrado' : 'Nenhuma questão marcada'}
          description={
            activeTab === 'wrong'
              ? 'Complete um quiz e as questões erradas aparecerão aqui.'
              : 'Marque questões para revisão clicando no botão + Marcar durante a revisão de resultados.'
          }
        />
      ) : (
        <>
          <Button variant="primary" className="w-full" onClick={handleStart}>
            Iniciar Revisão ({activeQuestions.length} questões)
          </Button>

          <div className="space-y-3">
            {activeQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    <Badge label={`Dom. ${q.domain}`} color="blue" />
                    <Badge label={q.subdomain} color="slate" />
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2">{q.question}</p>
                </div>
                {activeTab === 'flagged' && (
                  <button
                    onClick={() => unflagQuestion(q.id)}
                    className="text-slate-400 hover:text-red-500 text-xs flex-shrink-0"
                    title="Remover marcação"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
