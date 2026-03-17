'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

interface User {
  id: string
  email: string
  name: string
  organisation: string | null
  organisationType: string | null
  jobTitle: string | null
  phone: string | null
  cbkTier: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  name: string
  organisation: string
  organisationType: string
  jobTitle: string
  phone: string
  cbkTier: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me').then(r => {
      if (r.ok) return r.json()
      throw new Error()
    }).then(d => setUser(d.user)).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      const data = await res.json()
      setUser(data.user)
      return { ok: true }
    }
    const err = await res.json().catch(() => ({ error: 'Login failed' }))
    return { ok: false, error: err.error || 'Login failed' }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const d = await res.json()
      setUser(d.user)
      return { ok: true }
    }
    const err = await res.json().catch(() => ({ error: 'Registration failed' }))
    return { ok: false, error: err.error || 'Registration failed' }
  }, [])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
