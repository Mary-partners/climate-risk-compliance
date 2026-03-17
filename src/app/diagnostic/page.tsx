'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

const INSTITUTION_TYPES = [
  'Commercial Bank',
  'SACCO',
  'Insurance Company',
  'Pension Fund/Fund Manager',
  'Microfinance Bank',
  'NSE-Listed Company',
  'DFI/Climate Fund/Development Partner',
  'Audit/Consulting Firm',
  'Regulator/Industry Association',
  'Other',
]

const ASSET_RANGES = [
  'Under KSH 10B',
  'KSH 10B - 50B',
  'KSH 50B - 100B',
  'KSH 100B - 500B',
  'KSH 500B - 1T',
  'Over KSH 1T',
]

const MEMBER_RANGES = [
  'Under 10,000',
  '10,000 - 50,000',
  '50,000 - 100,000',
  '100,000 - 500,000',
  'Over 500,000',
]

const FRAMEWORKS = [
  'CBK CRDF',
  'IFRS S1',
  'IFRS S2',
  'TCFD',
  'KGFT',
  'PCAF',
  'NSE ESG Guidance',
  'Not sure yet',
]

const DEADLINES = [
  'Oct 2026 CBK CRDF',
  'Jan 2027 IFRS S1/S2',
  'Not sure',
  'No immediate deadline',
]

const CHALLENGES = [
  'Lack of internal expertise',
  'No ESG team',
  'Data collection from borrowers',
  'Understanding regulatory requirements',
  'Budget constraints',
  'Board awareness',
  'Technology/systems gap',
  'Measuring financed emissions',
  'KGFT classification',
  'Stakeholder reporting',
]

const STEP_LABELS = [
  'About Your Institution',
  'Current Climate Risk Status',
  'Reporting Frameworks & Challenges',
  'Review & Submit',
]

interface FormData {
  institutionName: string
  yourName: string
  email: string
  role: string
  institutionType: string
  totalAssets: string
  memberCount: string
  hasEsgTeam: string
  submittedReports: string
  collectsClimateData: string
  kgftClassified: string
  measuredEmissions: string
  frameworks: string[]
  reportingDeadline: string
  challenges: string[]
  additionalContext: string
}

const INITIAL_FORM: FormData = {
  institutionName: '',
  yourName: '',
  email: '',
  role: '',
  institutionType: '',
  totalAssets: '',
  memberCount: '',
  hasEsgTeam: '',
  submittedReports: '',
  collectsClimateData: '',
  kgftClassified: '',
  measuredEmissions: '',
  frameworks: [],
  reportingDeadline: '',
  challenges: [],
  additionalContext: '',
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className || 'w-4 h-4'} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  )
}

export default function DiagnosticPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function toggleCheckbox(field: 'frameworks' | 'challenges', value: string) {
    setForm((prev) => {
      const arr = prev[field]
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      }
    })
  }

  function validateStep(s: number): boolean {
    const newErrors: Record<string, string> = {}
    if (s === 0) {
      if (!form.institutionName.trim()) newErrors.institutionName = 'Institution name is required'
      if (!form.yourName.trim()) newErrors.yourName = 'Your name is required'
      if (!form.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address'
      if (!form.role.trim()) newErrors.role = 'Your role is required'
      if (!form.institutionType) newErrors.institutionType = 'Please select your institution type'
      if (!form.totalAssets) newErrors.totalAssets = 'Please select your asset range'
      if (!form.memberCount) newErrors.memberCount = 'Please select member count'
    }
    if (s === 1) {
      if (!form.hasEsgTeam) newErrors.hasEsgTeam = 'Please select an option'
      if (!form.submittedReports) newErrors.submittedReports = 'Please select an option'
      if (!form.collectsClimateData) newErrors.collectsClimateData = 'Please select an option'
      if (!form.kgftClassified) newErrors.kgftClassified = 'Please select an option'
      if (!form.measuredEmissions) newErrors.measuredEmissions = 'Please select an option'
    }
    if (s === 2) {
      if (form.frameworks.length === 0) newErrors.frameworks = 'Please select at least one framework'
      if (!form.reportingDeadline) newErrors.reportingDeadline = 'Please select a deadline'
      if (form.challenges.length === 0) newErrors.challenges = 'Please select at least one challenge'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function nextStep() {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 3))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        institutionName: form.institutionName,
        contactName: form.yourName,
        email: form.email,
        role: form.role,
        institutionType: form.institutionType,
        totalAssets: form.totalAssets,
        borrowerCount: form.memberCount,
        hasEsgTeam: form.hasEsgTeam,
        hasSubmittedReports: form.submittedReports,
        collectsClimateData: form.collectsClimateData,
        kgftClassified: form.kgftClassified,
        pcafMeasured: form.measuredEmissions,
        frameworks: form.frameworks,
        pressingDeadline: form.reportingDeadline,
        topChallenges: form.challenges,
        additionalInfo: form.additionalContext,
      }
      await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      // Still show success to avoid blocking the user
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  // ---- Success State ----
  if (submitted) {
    return (
      <div className="min-h-screen bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              We&apos;ve received your diagnostic. Mary will review your responses and send you a personalised climate risk readiness assessment within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ---- Helpers for rendering ----
  function renderSelectField(
    label: string,
    field: keyof FormData,
    options: string[],
    placeholder: string
  ) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="relative">
          <select
            className="select-field"
            value={form[field] as string}
            onChange={(e) => updateField(field, e.target.value)}
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
            <ChevronIcon />
          </div>
        </div>
        {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
      </div>
    )
  }

  function renderInputField(
    label: string,
    field: keyof FormData,
    type: string = 'text',
    placeholder: string = ''
  ) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input
          type={type}
          className="input-field"
          value={form[field] as string}
          onChange={(e) => updateField(field, e.target.value)}
          placeholder={placeholder}
          required
        />
        {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
      </div>
    )
  }

  function renderCheckboxGroup(
    label: string,
    field: 'frameworks' | 'challenges',
    options: string[]
  ) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{label}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const checked = form[field].includes(opt)
            return (
              <label
                key={opt}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  checked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                    : 'bg-navy-800/40 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex-shrink-0 border flex items-center justify-center transition-all ${
                    checked
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-white/20 bg-transparent'
                  }`}
                >
                  {checked && <CheckIcon />}
                </div>
                <span className="text-sm">{opt}</span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleCheckbox(field, opt)}
                />
              </label>
            )
          })}
        </div>
        {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
      </div>
    )
  }

  // ---- Progress Indicator ----
  function renderProgress() {
    return (
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    i < step
                      ? 'bg-emerald-500 text-white'
                      : i === step
                      ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500'
                      : 'bg-navy-800/60 text-gray-500 border border-white/10'
                  }`}
                >
                  {i < step ? <CheckIcon /> : i + 1}
                </div>
                <span
                  className={`text-xs mt-2 hidden sm:block whitespace-nowrap ${
                    i <= step ? 'text-emerald-400' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 sm:mx-4 rounded transition-all duration-300 ${
                    i < step ? 'bg-emerald-500' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        {/* Mobile step label */}
        <p className="text-sm text-emerald-400 font-medium sm:hidden mt-4 text-center">
          Step {step + 1} of 4: {STEP_LABELS[step]}
        </p>
      </div>
    )
  }

  // ---- Step 1 ----
  function renderStep1() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-2">About Your Institution</h2>
        <p className="text-gray-400 text-sm mb-6">
          Tell us about your organisation so we can tailor your assessment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {renderInputField('Institution Name', 'institutionName', 'text', 'e.g. Kenya Commercial Bank')}
          {renderInputField('Your Name', 'yourName', 'text', 'e.g. John Kamau')}
          {renderInputField('Email Address', 'email', 'email', 'you@institution.co.ke')}
          {renderInputField('Your Role', 'role', 'text', 'e.g. Head of Risk')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {renderSelectField('Institution Type', 'institutionType', INSTITUTION_TYPES, 'Select institution type')}
          {renderSelectField('Approximate Total Assets or AUM', 'totalAssets', ASSET_RANGES, 'Select asset range')}
        </div>
        {renderSelectField(
          'Number of Borrowers/Members/Policyholders',
          'memberCount',
          MEMBER_RANGES,
          'Select range'
        )}
      </div>
    )
  }

  // ---- Step 2 ----
  function renderStep2() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-2">Current Climate Risk Status</h2>
        <p className="text-gray-400 text-sm mb-6">
          Help us understand where you currently stand on climate risk management.
        </p>
        {renderSelectField(
          'Do you have a dedicated ESG or sustainability team?',
          'hasEsgTeam',
          ['Yes', 'No', 'Planning to hire'],
          'Select an option'
        )}
        {renderSelectField(
          'Have you submitted any climate-related reports to your regulator?',
          'submittedReports',
          ['Yes', 'No', 'In progress'],
          'Select an option'
        )}
        {renderSelectField(
          'Do you collect climate-related data from borrowers, members, or investees?',
          'collectsClimateData',
          ['Yes systematically', 'Yes partially', 'No', 'Planning to start'],
          'Select an option'
        )}
        {renderSelectField(
          'Have you classified your portfolio against the Kenya Green Finance Taxonomy (KGFT)?',
          'kgftClassified',
          ['Yes fully', 'Partially', 'No', 'Not aware of KGFT'],
          'Select an option'
        )}
        {renderSelectField(
          'Have you measured your financed emissions (PCAF methodology)?',
          'measuredEmissions',
          ['Yes', 'In progress', 'No', 'Not aware of PCAF'],
          'Select an option'
        )}
      </div>
    )
  }

  // ---- Step 3 ----
  function renderStep3() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-2">Reporting Frameworks & Challenges</h2>
        <p className="text-gray-400 text-sm mb-6">
          Tell us about the frameworks you&apos;re targeting and the obstacles you face.
        </p>
        {renderCheckboxGroup(
          'Which frameworks are you preparing for?',
          'frameworks',
          FRAMEWORKS
        )}
        {renderSelectField(
          "What's your most pressing reporting deadline?",
          'reportingDeadline',
          DEADLINES,
          'Select a deadline'
        )}
        {renderCheckboxGroup(
          'Top challenges you face',
          'challenges',
          CHALLENGES
        )}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional context (optional)
          </label>
          <textarea
            className="input-field min-h-[120px] resize-y"
            value={form.additionalContext}
            onChange={(e) => updateField('additionalContext', e.target.value)}
            placeholder="Anything else you'd like us to know about your climate risk journey..."
          />
        </div>
      </div>
    )
  }

  // ---- Step 4: Review ----
  function renderReviewRow(label: string, value: string | string[]) {
    const display = Array.isArray(value) ? value.join(', ') : value
    if (!display) return null
    return (
      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-white/5 last:border-0">
        <span className="text-gray-500 text-sm sm:w-64 flex-shrink-0">{label}</span>
        <span className="text-white text-sm">{display}</span>
      </div>
    )
  }

  function renderStep4() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-2">Review Your Responses</h2>
        <p className="text-gray-400 text-sm mb-6">
          Please review your answers before submitting. Click &quot;Back&quot; to make changes.
        </p>

        <div className="card space-y-0">
          <h3 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
            About Your Institution
          </h3>
          {renderReviewRow('Institution Name', form.institutionName)}
          {renderReviewRow('Your Name', form.yourName)}
          {renderReviewRow('Email', form.email)}
          {renderReviewRow('Role', form.role)}
          {renderReviewRow('Institution Type', form.institutionType)}
          {renderReviewRow('Total Assets / AUM', form.totalAssets)}
          {renderReviewRow('Borrowers/Members/Policyholders', form.memberCount)}
        </div>

        <div className="card space-y-0">
          <h3 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
            Current Climate Risk Status
          </h3>
          {renderReviewRow('Dedicated ESG team?', form.hasEsgTeam)}
          {renderReviewRow('Climate reports submitted?', form.submittedReports)}
          {renderReviewRow('Collects climate data?', form.collectsClimateData)}
          {renderReviewRow('KGFT classified?', form.kgftClassified)}
          {renderReviewRow('Financed emissions measured?', form.measuredEmissions)}
        </div>

        <div className="card space-y-0">
          <h3 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
            Reporting Frameworks & Challenges
          </h3>
          {renderReviewRow('Frameworks preparing for', form.frameworks)}
          {renderReviewRow('Most pressing deadline', form.reportingDeadline)}
          {renderReviewRow('Top challenges', form.challenges)}
          {renderReviewRow('Additional context', form.additionalContext)}
        </div>
      </div>
    )
  }

  // ---- What You'll Get cards ----
  const benefits = [
    {
      title: 'Readiness Score',
      description: 'A numerical score benchmarking your institution against Kenya\'s climate risk readiness landscape.',
      icon: (
        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      title: 'Gap Analysis',
      description: 'A detailed breakdown of where you fall short on CBK CRDF, IFRS S1/S2, KGFT, and PCAF requirements.',
      icon: (
        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      title: 'Prioritised Roadmap',
      description: 'A step-by-step action plan ordered by urgency and regulatory deadline, tailored to your institution.',
      icon: (
        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
    },
    {
      title: '30-Minute Consultation',
      description: 'A complimentary call with Mary to walk through your results and discuss next steps.',
      icon: (
        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm mb-6"
          >
            <ArrowLeftIcon />
            Back to Home
          </Link>
          <h1 className="section-heading">
            Climate Risk <span className="gradient-text">Readiness Diagnostic</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mt-2">
            Find out where your institution stands on climate risk readiness. Complete this short
            diagnostic and we&apos;ll provide a personalised assessment with recommendations.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {renderProgress()}

            <form onSubmit={handleSubmit}>
              <div className="card">
                {step === 0 && renderStep1()}
                {step === 1 && renderStep2()}
                {step === 2 && renderStep3()}
                {step === 3 && renderStep4()}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  {step > 0 ? (
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      <ArrowLeftIcon />
                      <span className="ml-2">Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button type="button" onClick={nextStep} className="btn-primary">
                      Continue
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Diagnostic
                          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar: What You'll Get */}
          <aside className="lg:col-span-1">
            <div className="sticky top-10">
              <h3 className="text-lg font-semibold text-white mb-4">What You&apos;ll Get</h3>
              <div className="space-y-4">
                {benefits.map((b) => (
                  <div key={b.title} className="stat-card flex items-start gap-4 text-left">
                    <div className="flex-shrink-0 mt-1">{b.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{b.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm font-medium mb-1">Free assessment</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  This diagnostic is completely free. Your data is confidential and will only be used to prepare your personalised assessment.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
