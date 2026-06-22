'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/hooks/useQuiz'
import ScoreSummary from '@/components/results/ScoreSummary'
import DomainBreakdown from '@/components/results/DomainBreakdown'
import QuestionReviewList from '@/components/results/QuestionReviewList'
import Button from '@/components/ui/Button'

export default function ResultsPage() {
  const router = useRouter()
  const { session, lastRecord, resetSession } = useQuiz()

  useEffect(() => {
    if (!session && !lastRecord) {
      router.replace('/')
    }
  }, [session, lastRecord, router])

  if (!session || !lastRecord) return null

  function handleRetry() {
    const mode = session!.mode
    resetSession()
    router.push(`/quiz/${mode}`)
  }

  function handleHome() {
    resetSession()
    router.push('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold text-slate-800">Resultado da Sessão</h1>

      <ScoreSummary
        scorePercent={lastRecord.scorePercent}
        totalQuestions={lastRecord.totalQuestions}
        correctAnswers={lastRecord.correctAnswers}
      />

      <DomainBreakdown domainScores={lastRecord.domainScores} />

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={handleRetry}>
          Tentar Novamente
        </Button>
        <Button variant="primary" className="flex-1" onClick={handleHome}>
          Início
        </Button>
      </div>

      <QuestionReviewList questions={session.questions} answers={session.answers} />
    </div>
  )
}
