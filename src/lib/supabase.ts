import { createClient } from '@supabase/supabase-js'

// Fallback prevents build-time crash when env vars are not yet set
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
)
