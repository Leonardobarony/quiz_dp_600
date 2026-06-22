'use client'

import { useState } from 'react'
import type { AnsweredQuestion, Question } from '@/types'
import { useProgressStore } from '@/store'
import Badge from '@/components/ui/Badge'
import DocLink from '@/components/ui/DocLink'

interface QuestionReviewListProps {
  questions: Question[]
  answers: AnsweredQuestion[]
}

export default function QuestionReviewList({ questions, answers }: QuestionReviewListProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const flagQuestion = useProgressStore((s) => s.flagQuestion)
  const unflagQuestion = useProgressStore((s) => s.unflagQuestion)
  const flaggedIds = useProgressStore((s) => s.flaggedIds)

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-slate-700">Revisão das Questões</h2>
      {questions.map((q, i) => {
        const answer = answers.find((a) => a.questionId === q.id)
        if (!answer) return null
        const isCorrect = answer.isCorrect
        const isFlagged = flaggedIds.includes(q.id)
        const isOpen = expanded.has(q.id)

        return (
          <div
            key={q.id}
            className={`rounded-xl border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
          >
            <button
              className="w-full flex items-start gap-3 p-4 text-left"
              onClick={() => toggle(q.id)}
            >
              <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {isCorrect ? '✓' : '✗'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge label={`Q${i + 1}`} color="slate" />
                  <Badge label={`Dom. ${q.domain}`} color="blue" />
                </div>
                <p className="text-sm text-slate-700 leading-snug line-clamp-2">{q.question}</p>
              </div>
              <span className="text-slate-400 text-xs flex-shrink-0 mt-1">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-slate-200">
                <p className={`text-sm font-medium mt-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect
                    ? `Você acertou — Resposta: ${answer.selectedAnswer}`
                    : `Você respondeu ${answer.selectedAnswer} — Correta: ${q.correct_answer}`}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">{q.explanation}</p>
                {q.reference_url && <DocLink url={q.reference_url} />}
                <button
                  onClick={() => isFlagged ? unflagQuestion(q.id) : flagQuestion(q.id)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${isFlagged ? 'border-yellow-500 text-yellow-600 bg-yellow-50' : 'border-slate-300 text-slate-600 hover:border-yellow-400'}`}
                >
                  {isFlagged ? '🚩 Marcada' : '+ Marcar para revisão'}
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
