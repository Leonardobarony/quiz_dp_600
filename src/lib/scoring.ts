import type { AnsweredQuestion, DomainNumber, DomainScore, Question, QuizMode, SessionRecord } from '@/types'

export function getDomainScore(
  domain: DomainNumber,
  answers: AnsweredQuestion[],
  questions: Question[],
  questionMap: Map<string, Question>
): DomainScore {
  const domainQuestions = questions.filter((q) => q.domain === domain)
  const domainAnswers = answers.filter((a) => questionMap.get(a.questionId)?.domain === domain)

  const total = domainQuestions.length
  const correct = domainAnswers.filter((a) => a.isCorrect).length
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0

  return { total, correct, percent }
}

export function calculateScore(
  sessionId: string,
  mode: QuizMode,
  answers: AnsweredQuestion[],
  questions: Question[]
): SessionRecord {
  const totalQuestions = questions.length
  const correctAnswers = answers.filter((a) => a.isCorrect).length
  const scorePercent = totalQuestions > 0
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0

  const questionMap = new Map(questions.map((q) => [q.id, q]))
  const domains: DomainNumber[] = [1, 2, 3]
  const domainScores: Partial<Record<DomainNumber, DomainScore>> = {}

  for (const domain of domains) {
    const score = getDomainScore(domain, answers, questions, questionMap)
    if (score.total > 0) {
      domainScores[domain] = score
    }
  }

  return {
    id: sessionId,
    mode,
    date: Date.now(),
    totalQuestions,
    correctAnswers,
    scorePercent,
    domainScores,
  }
}
