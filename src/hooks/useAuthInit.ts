'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { useProgressStore } from '@/store'
import { loadProgressFromSupabase } from '@/lib/supabaseSync'

export function useAuthInit() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null
      setUser(user)
      setLoading(false)

      if (user) {
        loadProgressFromSupabase(user.id).then((remote) => {
          if (remote) useProgressStore.getState().mergeFromRemote(remote)
        })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      setUser(user)

      if (user) {
        loadProgressFromSupabase(user.id).then((remote) => {
          if (remote) useProgressStore.getState().mergeFromRemote(remote)
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, setLoading])
}
