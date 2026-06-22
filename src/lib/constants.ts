import type { DomainNumber, QuizMode } from '@/types'

export const DOMAIN_NAMES: Record<DomainNumber, string> = {
  1: 'Manter a Solução de Analytics',
  2: 'Preparar Dados',
  3: 'Implementar e Gerenciar Modelos Semânticos',
}

export const DOMAIN_WEIGHTS: Record<DomainNumber, number> = {
  1: 0.275,
  2: 0.475,
  3: 0.275,
}

export const SIMULATION_TOTAL_QUESTIONS = 60
export const SIMULATION_DOMAIN_COUNTS: Record<DomainNumber, number> = {
  1: 17,
  2: 28,
  3: 15,
}

export const SIMULATION_DURATION_SECONDS = 100 * 60

export const PASS_THRESHOLD = 0.7

export const QUIZ_MODE_LABELS: Record<QuizMode, string> = {
  simulation: 'Simulado Completo',
  'domain-1': 'Domínio 1',
  'domain-2': 'Domínio 2',
  'domain-3': 'Domínio 3',
  review: 'Revisão',
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}
