import { supabase } from './supabase'
import type { ProgressState, SessionRecord } from '@/types'

export async function loadProgressFromSupabase(userId: string): Promise<Partial<ProgressState> | null> {
  const [{ data: progress }, { data: sessions }] = await Promise.all([
    supabase.from('progress').select('*').eq('user_id', userId).single(),
    supabase.from('sessions').select('*').eq('user_id', userId).order('date', { ascending: false }),
  ])

  if (!progress && !sessions?.length) return null

  return {
    sessions: (sessions ?? []).map((s) => ({
      id: s.id,
      mode: s.mode,
      date: s.date,
      totalQuestions: s.total_questions,
      correctAnswers: s.correct_answers,
      scorePercent: s.score_percent,
      domainScores: s.domain_scores ?? {},
    })) as SessionRecord[],
    wrongAnswerIds: progress?.wrong_answer_ids ?? [],
    flaggedIds: progress?.flagged_ids ?? [],
    subdomainStats: progress?.subdomain_stats ?? {},
  }
}

export async function saveSessionToSupabase(userId: string, record: SessionRecord): Promise<void> {
  await supabase.from('sessions').upsert({
    id: record.id,
    user_id: userId,
    mode: record.mode,
    date: record.date,
    total_questions: record.totalQuestions,
    correct_answers: record.correctAnswers,
    score_percent: record.scorePercent,
    domain_scores: record.domainScores,
  })
}

export async function saveProgressToSupabase(userId: string, state: {
  wrongAnswerIds: string[]
  flaggedIds: string[]
  subdomainStats: Record<string, unknown>
}): Promise<void> {
  await supabase.from('progress').upsert({
    user_id: userId,
    wrong_answer_ids: state.wrongAnswerIds,
    flagged_ids: state.flaggedIds,
    subdomain_stats: state.subdomainStats,
    updated_at: new Date().toISOString(),
  })
}
