export type Difficulty = 'easy' | 'medium' | 'hard'
export type DomainNumber = 1 | 2 | 3
export type OptionKey = 'A' | 'B' | 'C' | 'D'
export type QuizMode = 'simulation' | 'domain-1' | 'domain-2' | 'domain-3' | 'review'

export interface Question {
  id: string
  domain: DomainNumber
  subdomain: string
  topic: string
  difficulty: Difficulty
  question: string
  options: Record<OptionKey, string>
  correct_answer: OptionKey
  explanation: string
  reference_url?: string
}

export interface AnsweredQuestion {
  questionId: string
  selectedAnswer: OptionKey
  isCorrect: boolean
  timeSpentSeconds: number
}

export interface QuizSession {
  id: string
  mode: QuizMode
  startedAt: number
  finishedAt?: number
  questions: Question[]
  answers: AnsweredQuestion[]
  currentIndex: number
  timeRemainingSeconds: number | null
  isFinished: boolean
}

export interface DomainScore {
  total: number
  correct: number
  percent: number
}

export interface SessionRecord {
  id: string
  mode: QuizMode
  date: number
  totalQuestions: number
  correctAnswers: number
  scorePercent: number
  domainScores: Partial<Record<DomainNumber, DomainScore>>
}

export interface SubdomainStat {
  subdomain: string
  topic: string
  total: number
  correct: number
  percent: number
}

export interface ProgressState {
  sessions: SessionRecord[]
  wrongAnswerIds: string[]
  flaggedIds: string[]
  subdomainStats: Record<string, SubdomainStat>
}
