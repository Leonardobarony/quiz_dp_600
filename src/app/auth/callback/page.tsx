'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(() => {
        router.replace('/')
      })
    } else {
      router.replace('/')
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-slate-500 text-sm">Autenticando...</p>
    </div>
  )
}
