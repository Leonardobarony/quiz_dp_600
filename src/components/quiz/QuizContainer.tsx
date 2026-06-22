'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/hooks/useQuiz'
import QuizHeader from './QuizHeader'
import QuestionCard from './QuestionCard'
import FeedbackPanel from './FeedbackPanel'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import type { OptionKey } from '@/types'

export default function QuizContainer() {
  const router = useRouter()
  const { session, currentQuestion, currentAnswer, isAnswered, answerQuestion, nextQuestion, finishSession, resetSession } = useQuiz()
  const [showExitModal, setShowExitModal] = useState(false)

  if (!session || !currentQuestion) return null

  const isLastQuestion = session.currentIndex === session.questions.length - 1

  function handleAnswer(key: OptionKey) {
    if (!isAnswered) answerQuestion(key)
  }

  function handleNext() {
    if (isLastQuestion) {
      finishSession()
      router.push('/quiz/results')
    } else {
      nextQuestion()
    }
  }

  function handleExit() {
    resetSession()
    router.push('/')
  }

  return (
    <>
      <div className="max-w-2xl mx-auto w-full space-y-6 px-4 py-6">
        <QuizHeader
          mode={session.mode}
          currentIndex={session.currentIndex}
          total={session.questions.length}
          timeRemainingSeconds={session.timeRemainingSeconds}
          onExit={() => setShowExitModal(true)}
        />

        <QuestionCard
          question={currentQuestion}
          answeredQuestion={currentAnswer ?? null}
          onAnswer={handleAnswer}
        />

        {isAnswered && currentAnswer && (
          <FeedbackPanel question={currentQuestion} answeredQuestion={currentAnswer} />
        )}

        {isAnswered && (
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleNext}
          >
            {isLastQuestion ? 'Ver Resultados' : 'Próxima Questão →'}
          </Button>
        )}
      </div>

      <Modal
        isOpen={showExitModal}
        title="Sair do quiz?"
        message="Seu progresso nesta sessão será perdido. Deseja continuar?"
        confirmLabel="Sair"
        cancelLabel="Continuar quiz"
        onConfirm={handleExit}
        onCancel={() => setShowExitModal(false)}
      />
    </>
  )
}
