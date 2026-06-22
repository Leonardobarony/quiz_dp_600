import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const questions = JSON.parse(
  readFileSync(join(__dirname, '../src/data/questions.json'), 'utf-8')
)

const supabase = createClient(
  'https://ytuadsheseqzhuwvwmek.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { error } = await supabase.from('questions').upsert(questions, { onConflict: 'id' })

if (error) {
  console.error('Erro ao fazer seed:', error.message)
  process.exit(1)
}

console.log(`✓ ${questions.length} questões inseridas com sucesso.`)
