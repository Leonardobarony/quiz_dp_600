'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Button from '@/components/ui/Button'

type Mode = 'login' | 'signup'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.replace('/')
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setSuccess('Verifique seu email para confirmar o cadastro.')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
    } catch (err: unknown) {
      setError('Login com Google não está configurado. Use email e senha.')
      setLoading(false)
    }
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-1">
        <span className="text-3xl">📊</span>
        <h1 className="text-xl font-bold text-slate-800">
          {mode === 'login' ? 'Entrar na sua conta' : 'Criar conta'}
        </h1>
        <p className="text-sm text-slate-500">Sincronize seu progresso entre dispositivos</p>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 text-center space-y-3">
          <p>{success}</p>
          <button onClick={() => switchMode('login')} className="text-blue-600 hover:underline text-sm">
            Voltar ao login
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button variant="primary" className="w-full" type="submit" disabled={loading}>
              {loading ? 'Carregando...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </Button>
          </form>

        </>
      )}

      <p className="text-center text-sm text-slate-500">
        {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
        <button
          onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
          className="text-blue-600 hover:underline font-medium"
        >
          {mode === 'login' ? 'Criar conta' : 'Entrar'}
        </button>
      </p>

      <p className="text-center">
        <button onClick={() => router.push('/')} className="text-xs text-slate-400 hover:text-slate-600">
          Continuar sem conta →
        </button>
      </p>
    </div>
  )
}
