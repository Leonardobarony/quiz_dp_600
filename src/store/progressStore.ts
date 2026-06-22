'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ProgressState, Question, SessionRecord } from '@/types'
import { saveSessionToSupabase, saveProgressToSupabase } from '@/lib/supabaseSync'

interface ProgressStore extends ProgressState {
  recordSession: (record: SessionRecord) => void
  recordAnswer: (question: Question, isCorrect: boolean) => void
  flagQuestion: (id: string) => void
  unflagQuestion: (id: string) => void
  clearHistory: () => void
  mergeFromRemote: (remote: Partial<ProgressState>) => void
}

const initialState: ProgressState = {
  sessions: [],
  wrongAnswerIds: [],
  flaggedIds: [],
  subdomainStats: {},
}

function getCurrentUserId(): string | null {
  try {
    const raw = localStorage.getItem('sb-ytuadsheseqzhuwvwmek-auth-token')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.user?.id ?? null
  } catch {
    return null
  }
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      recordSession(record) {
        set((state) => ({ sessions: [record, ...state.sessions] }))
        const userId = getCurrentUserId()
        if (userId) saveSessionToSupabase(userId, record).catch(console.error)
      },

      recordAnswer(question, isCorrect) {
        set((state) => {
          const wrongAnswerIds = isCorrect
            ? state.wrongAnswerIds.filter((id) => id !== question.id)
            : state.wrongAnswerIds.includes(question.id)
            ? state.wrongAnswerIds
            : [...state.wrongAnswerIds, question.id]

          const key = question.subdomain
          const existing = state.subdomainStats[key] ?? {
            subdomain: question.subdomain,
            topic: question.topic,
            total: 0,
            correct: 0,
            percent: 0,
          }
          const newTotal = existing.total + 1
          const newCorrect = existing.correct + (isCorrect ? 1 : 0)
          const subdomainStats = {
            ...state.subdomainStats,
            [key]: {
              ...existing,
              total: newTotal,
              correct: newCorrect,
              percent: Math.round((newCorrect / newTotal) * 100),
            },
          }

          const userId = getCurrentUserId()
          if (userId) {
            saveProgressToSupabase(userId, {
              wrongAnswerIds,
              flaggedIds: state.flaggedIds,
              subdomainStats,
            }).catch(console.error)
          }

          return { wrongAnswerIds, subdomainStats }
        })
      },

      flagQuestion(id) {
        set((state) => {
          const flaggedIds = state.flaggedIds.includes(id)
            ? state.flaggedIds
            : [...state.flaggedIds, id]
          const userId = getCurrentUserId()
          if (userId) {
            saveProgressToSupabase(userId, {
              wrongAnswerIds: state.wrongAnswerIds,
              flaggedIds,
              subdomainStats: state.subdomainStats,
            }).catch(console.error)
          }
          return { flaggedIds }
        })
      },

      unflagQuestion(id) {
        set((state) => {
          const flaggedIds = state.flaggedIds.filter((f) => f !== id)
          const userId = getCurrentUserId()
          if (userId) {
            saveProgressToSupabase(userId, {
              wrongAnswerIds: state.wrongAnswerIds,
              flaggedIds,
              subdomainStats: state.subdomainStats,
            }).catch(console.error)
          }
          return { flaggedIds }
        })
      },

      clearHistory() {
        set(initialState)
      },

      mergeFromRemote(remote) {
        set((state) => ({
          sessions: remote.sessions?.length
            ? remote.sessions
            : state.sessions,
          wrongAnswerIds: remote.wrongAnswerIds ?? state.wrongAnswerIds,
          flaggedIds: remote.flaggedIds ?? state.flaggedIds,
          subdomainStats: Object.keys(remote.subdomainStats ?? {}).length
            ? remote.subdomainStats!
            : state.subdomainStats,
        }))
      },
    }),
    {
      name: 'dp600-progress',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions,
        wrongAnswerIds: state.wrongAnswerIds,
        flaggedIds: state.flaggedIds,
        subdomainStats: state.subdomainStats,
      }),
    }
  )
)
