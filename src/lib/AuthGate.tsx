'use client'
import { AuthProvider, useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, lazy, Suspense } from 'react'

const ClimateAssistant = lazy(() => import('@/components/ClimateAssistant'))

function AuthGateInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      {children}
      <Suspense fallback={null}><ClimateAssistant /></Suspense>
    </>
  )
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGateInner>{children}</AuthGateInner>
    </AuthProvider>
  )
}
