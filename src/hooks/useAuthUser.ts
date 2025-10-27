import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

import api from '@/lib/api'

export interface AuthUser {
  user: {
    id: string
    username: string
    firstname: string
    lastname: string
    roles: string[]
  }
  status: 'loading' | 'authenticated' | 'unauthenticated' | 'error'
  token: string | null
}

export const useAuthUser = (): AuthUser => {
  const { data, status } = useSession()

  useEffect(() => {
    if (!data || status !== 'authenticated') return

    const token = (data as any).id_token || null

    api.interceptors.request.use((config: any) => {
      return {
        ...config,
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    })
  }, [data, status])

  const user = (data as any) || {}

  return {
    user: {
      id: user.id,
      username: user.username,
      firstname: user.name,
      lastname: user.name,
      roles: user.roles
    },
    status,
    token: user.id_token || null
  }
}
