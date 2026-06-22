'use client'

import { create } from 'zustand'
import type { AnsweredQuestion, OptionKey, Question, QuizMode, QuizSession } from '@/types'
import { SIMULATION_DURATION_SECONDS } from '@/lib/constants'
import { useProgressStore } from '@/store/progressStore'
import { calculateScore } from '@/lib/scoring'

interface QuizStore {
  session: QuizSession | null
  lastRecord: ReturnType<typeof calculateScore> | null
  startSession: (mode: QuizMode, questions: Question[]) => void
  answerQuestion: (answer: OptionKey) => void
  nextQuestion: () => void
  finishSession: () => void
  resetSession: () => void
  tickTimer: () => void
}

export const useQuizStore = create<QuizStore>()((set, get) => ({
  session: null,
  lastRecord: null,

  startSession(mode, questions) {
    const isSimulation = mode === 'simulation'
    set({
      session: {
        id: crypto.randomUUID(),
        mode,
        startedAt: Date.now(),
        questions,
        answers: [],
        currentIndex: 0,
        timeRemainingSeconds: isSimulation ? SIMULATION_DURATION_SECONDS : null,
        isFinished: false,
      },
      lastRecord: null,
    })
  },

  answerQuestion(selectedAnswer) {
    const { session } = get()
    if (!session || session.isFinished) return

    const currentQuestion = session.questions[session.currentIndex]
    if (!currentQuestion) return

    const isCorrect = selectedAnswer === currentQuestion.correct_answer

    const answered: AnsweredQuestion = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpentSeconds: 0,
    }

    useProgressStore.getState().recordAnswer(currentQuestion, isCorrect)

    set((state) => ({
      session: state.session
        ? { ...state.session, answers: [...state.session.answers, answered] }
        : null,
    }))
  },

  nextQuestion() {
    const { session } = get()
    if (!session) return

    const nextIndex = session.currentIndex + 1
    if (nextIndex >= session.questions.length) {
      get().finishSession()
    } else {
      set((state) => ({
        session: state.session ? { ...state.session, currentIndex: nextIndex } : null,
      }))
    }
  },

  finishSession() {
    const { session } = get()
    if (!session || session.isFinished) return

    const record = calculateScore(session.id, session.mode, session.answers, session.questions)
    useProgressStore.getState().recordSession(record)

    set((state) => ({
      session: state.session
        ? { ...state.session, isFinished: true, finishedAt: Date.now() }
        : null,
      lastRecord: record,
    }))
  },

  resetSession() {
    set({ session: null, lastRecord: null })
  },

  tickTimer() {
    set((state) => {
      if (!state.session || state.session.timeRemainingSeconds === null) return state
      if (state.session.timeRemainingSeconds <= 0) {
        setTimeout(() => get().finishSession(), 0)
        return state
      }
      return {
        session: {
          ...state.session,
          timeRemainingSeconds: state.session.timeRemainingSeconds - 1,
        },
      }
    })
  },
}))
