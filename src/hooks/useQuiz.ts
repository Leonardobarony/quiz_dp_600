'use client'

import { useQuizStore } from '@/store'
import { getQuestionsForMode } from '@/lib/questions'
import type { QuizMode } from '@/types'

export function useQuiz() {
  const session = useQuizStore((s) => s.session)
  const lastRecord = useQuizStore((s) => s.lastRecord)
  const startSession = useQuizStore((s) => s.startSession)
  const answerQuestion = useQuizStore((s) => s.answerQuestion)
  const nextQuestion = useQuizStore((s) => s.nextQuestion)
  const finishSession = useQuizStore((s) => s.finishSession)
  const resetSession = useQuizStore((s) => s.resetSession)

  const currentQuestion = session
    ? session.questions[session.currentIndex]
    : null

  const currentAnswer = session
    ? session.answers.find((a) => a.questionId === currentQuestion?.id)
    : null

  const isAnswered = currentAnswer !== null && currentAnswer !== undefined

  function start(mode: QuizMode, wrongIds?: string[]) {
    const questions = getQuestionsForMode(mode, wrongIds)
    startSession(mode, questions)
  }

  return {
    session,
    lastRecord,
    currentQuestion,
    currentAnswer,
    isAnswered,
    start,
    answerQuestion,
    nextQuestion,
    finishSession,
    resetSession,
  }
}
