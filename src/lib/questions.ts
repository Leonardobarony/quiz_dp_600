import type { DomainNumber, Question, QuizMode } from '@/types'
import { SIMULATION_DOMAIN_COUNTS } from '@/lib/constants'
import rawQuestions from '@/data/questions.json'

const allQuestions = rawQuestions as Question[]

export function getAllQuestions(): Question[] {
  return allQuestions
}

export function getQuestionsByDomain(domain: DomainNumber): Question[] {
  return allQuestions.filter((q) => q.domain === domain)
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const idSet = new Set(ids)
  return allQuestions.filter((q) => idSet.has(q.id))
}

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function buildSimulationQuestions(): Question[] {
  const domains: DomainNumber[] = [1, 2, 3]
  const selected: Question[] = []

  for (const domain of domains) {
    const count = SIMULATION_DOMAIN_COUNTS[domain]
    const domainQuestions = getQuestionsByDomain(domain)
    const shuffled = shuffleArray(domainQuestions)
    selected.push(...shuffled.slice(0, count))
  }

  return shuffleArray(selected)
}

export function getQuestionsForMode(mode: QuizMode, wrongIds?: string[]): Question[] {
  switch (mode) {
    case 'simulation':
      return buildSimulationQuestions()
    case 'domain-1':
      return shuffleArray(getQuestionsByDomain(1))
    case 'domain-2':
      return shuffleArray(getQuestionsByDomain(2))
    case 'domain-3':
      return shuffleArray(getQuestionsByDomain(3))
    case 'review':
      return wrongIds ? shuffleArray(getQuestionsByIds(wrongIds)) : []
    default:
      return []
  }
}
