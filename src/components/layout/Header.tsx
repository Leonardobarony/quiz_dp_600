'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function Header() {
  const router = useRouter()
  const { user, loading, signOut } = useAuthStore()

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl">📊</span>
          <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
            DP-600 Quiz
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
            Progresso
          </Link>
          <Link href="/review" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
            Revisar
          </Link>

          {!loading && user && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden sm:block truncate max-w-[140px]">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-xs text-slate-500 hover:text-red-600 transition-colors border border-slate-200 rounded-lg px-2 py-1"
              >
                Sair
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
