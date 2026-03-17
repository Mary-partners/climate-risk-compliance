'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthProvider, useAuth } from '@/lib/AuthContext'

type Tab = 'login' | 'register'

const ORG_TYPES = [
  'Commercial Bank',
  'DT-SACCO',
  'Insurance Company',
  'Pension Fund',
  'Microfinance Bank',
  'DFI/Climate Fund',
  'Listed Company',
  'Other',
]

const CBK_TIERS = [
  'Tier 1 (Large)',
  'Tier 2 (Medium)',
  'Tier 3 (Small)',
]

function AuthPageInner() {
  const router = useRouter()
  const { login, register } = useAuth()

  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register fields
  const [name, setName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [organisationType, setOrganisationType] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [cbkTier, setCbkTier] = useState('')

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function switchTab(t: Tab) {
    setTab(t)
    setError('')
    setFieldErrors({})
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const errors: Record<string, string> = {}
    if (!loginEmail.trim()) errors.email = 'Email is required'
    if (!loginPassword) errors.password = 'Password is required'
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return
    }

    setLoading(true)
    try {
      const res = await login(loginEmail.trim(), loginPassword)
      if (res.ok) {
        router.push('/diagnostic')
      } else {
        setError(res.error || 'Login failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const errors: Record<string, string> = {}
    if (!name.trim()) errors.name = 'Full name is required'
    if (!regEmail.trim()) errors.regEmail = 'Email is required'
    if (!regPassword) errors.regPassword = 'Password is required'
    else if (regPassword.length < 8) errors.regPassword = 'Password must be at least 8 characters'
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password'
    else if (regPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match'
    if (!organisation.trim()) errors.organisation = 'Organisation name is required'
    if (!organisationType) errors.organisationType = 'Organisation type is required'
    if (!jobTitle.trim()) errors.jobTitle = 'Job title is required'

    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return
    }

    setLoading(true)
    try {
      const res = await register({
        name: name.trim(),
        email: regEmail.trim(),
        password: regPassword,
        organisation: organisation.trim(),
        organisationType,
        jobTitle: jobTitle.trim(),
        phone: phone.trim(),
        cbkTier: organisationType === 'Commercial Bank' ? cbkTier : '',
      })
      if (res.ok) {
        router.push('/diagnostic')
      } else {
        setError(res.error || 'Registration failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-2">
            <h1 className="text-3xl font-bold gradient-text">CFOIP</h1>
          </Link>
          <p className="text-gray-500 text-sm">
            Climate Risk &amp; Compliance Platform
          </p>
        </div>

        {/* Card */}
        <div className="card">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => switchTab('login')}
              className={tab === 'login' ? 'tab-button-active flex-1' : 'tab-button flex-1'}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchTab('register')}
              className={tab === 'register' ? 'tab-button-active flex-1' : 'tab-button flex-1'}
            >
              Register
            </button>
          </div>

          {/* Global Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="input-field"
                  placeholder="you@institution.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="input-field"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 animate-fade-in">
              {/* Full Name */}
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-name"
                  type="text"
                  className="input-field"
                  placeholder="Jane Muthoni"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-email"
                  type="email"
                  className="input-field"
                  placeholder="you@institution.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
                {fieldErrors.regEmail && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.regEmail}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-password"
                  type="password"
                  className="input-field"
                  placeholder="Minimum 8 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  minLength={8}
                  required
                />
                {fieldErrors.regPassword && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.regPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="reg-confirm" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-confirm"
                  type="password"
                  className="input-field"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              {/* Organisation Name */}
              <div>
                <label htmlFor="reg-org" className="block text-sm font-medium text-gray-700 mb-1">
                  Organisation / Institution Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-org"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Kenya Commercial Bank"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  required
                />
                {fieldErrors.organisation && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.organisation}</p>
                )}
              </div>

              {/* Organisation Type */}
              <div>
                <label htmlFor="reg-org-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Organisation Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="reg-org-type"
                  className="select-field"
                  value={organisationType}
                  onChange={(e) => {
                    setOrganisationType(e.target.value)
                    if (e.target.value !== 'Commercial Bank') setCbkTier('')
                  }}
                  required
                >
                  <option value="">Select type...</option>
                  {ORG_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {fieldErrors.organisationType && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.organisationType}</p>
                )}
              </div>

              {/* CBK Tier — only for Commercial Bank */}
              {organisationType === 'Commercial Bank' && (
                <div className="animate-fade-in">
                  <label htmlFor="reg-cbk-tier" className="block text-sm font-medium text-gray-700 mb-1">
                    CBK Tier
                  </label>
                  <select
                    id="reg-cbk-tier"
                    className="select-field"
                    value={cbkTier}
                    onChange={(e) => setCbkTier(e.target.value)}
                  >
                    <option value="">Select tier...</option>
                    {CBK_TIERS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Job Title */}
              <div>
                <label htmlFor="reg-job" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-job"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Chief Risk Officer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
                {fieldErrors.jobTitle && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.jobTitle}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="reg-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  className="input-field"
                  placeholder="+254 7XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-sm text-gray-500">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <AuthProvider>
      <AuthPageInner />
    </AuthProvider>
  )
}
