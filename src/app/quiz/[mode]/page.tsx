'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useQuiz } from '@/hooks/useQuiz'
import { useProgressStore } from '@/store'
import QuizContainer from '@/components/quiz/QuizContainer'
import type { QuizMode } from '@/types'

const VALID_MODES: QuizMode[] = ['simulation', 'domain-1', 'domain-2', 'domain-3', 'review']

export default function QuizPage({ params }: { params: Promise<{ mode: string }> }) {
  const { mode } = use(params)
  const router = useRouter()
  const { session, start } = useQuiz()
  const wrongAnswerIds = useProgressStore((s) => s.wrongAnswerIds)
  const wrongAnswerIdsRef = useRef(wrongAnswerIds)
  wrongAnswerIdsRef.current = wrongAnswerIds

  const quizMode = VALID_MODES.includes(mode as QuizMode) ? (mode as QuizMode) : null

  useEffect(() => {
    if (!quizMode) {
      router.replace('/')
      return
    }
    if (!session || session.isFinished) {
      start(quizMode, quizMode === 'review' ? wrongAnswerIdsRef.current : undefined)
    }
  }, [quizMode]) // session e start são estáveis; wrongAnswerIds lido via ref

  useEffect(() => {
    if (session?.isFinished) {
      router.push('/quiz/results')
    }
  }, [session?.isFinished, router])

  if (!session || session.isFinished) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-500">Carregando questões...</p>
      </div>
    )
  }

  return <QuizContainer />
}
