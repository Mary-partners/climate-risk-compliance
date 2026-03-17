'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import AuthGate from '@/lib/AuthGate'
import { COUNTY_HAZARDS, HAZARD_DISPLAY_KEYS, HAZARD_LABELS, PERIOD_LABELS, getRiskLabel, getRiskColor, type PeriodIndex } from '@/lib/hazard-data'

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & TYPES
   ═══════════════════════════════════════════════════════════════ */

const STEPS = [
  'Institution Info',
  'Physical Risk Exposures',
  'Transition Risk Exposures',
  'Climate Risk Materiality',
  'Qualitative Questionnaire',
  'Climate Governance',
  'Metrics & Targets',
  'Alignment Metrics',
  'Review & Download',
] as const

type StepName = (typeof STEPS)[number]

const KESIC_SECTORS = [
  { code: 'A', label: 'Agriculture, forestry and fishing' },
  { code: 'B', label: 'Mining and Quarrying' },
  { code: 'C', label: 'Manufacturing' },
  { code: 'D', label: 'Electricity, gas, steam and air conditioning supply' },
  { code: 'E', label: 'Water supply, sewerage, waste management' },
  { code: 'F', label: 'Construction' },
  { code: 'G', label: 'Wholesale and retail trade' },
  { code: 'H', label: 'Transportation and storage' },
  { code: 'I', label: 'Accommodation and Food Service' },
  { code: 'J', label: 'Information and communication' },
  { code: 'K', label: 'Financial and insurance activities' },
  { code: 'L', label: 'Real estate activities' },
  { code: 'M', label: 'Professional, scientific and technical' },
  { code: 'N', label: 'Administrative and support services' },
  { code: 'O', label: 'Public administration and defence' },
  { code: 'P', label: 'Education' },
  { code: 'Q', label: 'Human health and social work' },
  { code: 'R', label: 'Arts, entertainment and recreation' },
  { code: 'S', label: 'Other service activities' },
  { code: 'T', label: 'Activities of households as employers' },
  { code: 'U', label: 'Activities of extraterritorial organizations' },
]

const HIGH_EMITTING_SECTORS = [
  { code: 'B', label: 'Mining and Quarrying' },
  { code: 'C', label: 'Manufacturing' },
  { code: 'D', label: 'Electricity, gas, steam and air conditioning' },
  { code: 'H', label: 'Transportation and storage' },
]

const COUNTIES = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu',
  'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho',
  'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale',
  'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit',
  'Meru', 'Migori', 'Mombasa', "Murang'a", 'Nairobi', 'Nakuru', 'Nandi',
  'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya',
  'Taita Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia', 'Turkana',
  'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot',
]

const REPORTING_PERIODS = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'FY 2026']

const TRANSITION_POLICY_RISKS = [
  'Introduction of GHG pricing',
  'Stricter emission-reporting',
  'GHG quotas',
  'Climate financial regulations',
  'Taxonomy regulation',
]
const TRANSITION_TECH_RISKS = [
  'Substitution with lower emission options',
  'Higher cost of low-carbon tech',
  'Transitioning to lower carbon tech',
]
const TRANSITION_MARKET_RISKS = [
  'Risk perception among co-financiers',
  'Insurance pricing',
  'Increased input costs',
]
const TRANSITION_REPUTATION_RISKS = ['Negative sector perception']
const PHYSICAL_ACUTE_RISKS = ['Drought', 'Flash floods', 'Wildfire', 'Hailstorm', 'Landslide', 'Tropical cyclone']
const PHYSICAL_CHRONIC_RISKS = ['Sea level rise', 'Water stress', 'Temperature increase', 'Biodiversity loss']

const IMPACT_LEVELS = ['High', 'Medium', 'Low', 'Not material']

const METRICS_KPIS = [
  { key: 'greenLoans', label: 'Green loans disbursed', unit: 'KSH' },
  { key: 'greenLoansRatio', label: 'Total green loans / total portfolio', unit: '%' },
  { key: 'greenLinkedLiabilities', label: 'Green-linked liabilities', unit: 'KSH' },
  { key: 'fundingClimate', label: 'Share of funding subject to climate criteria', unit: 'KSH' },
  { key: 'loansScreenedESG', label: '% loans screened for ESG', unit: '%' },
  { key: 'loansRejectedESG', label: '% loans rejected on ESG', unit: '%' },
  { key: 'grossGHG', label: 'Gross GHG emissions Scope 1+2+3', unit: 'tCO2e' },
  { key: 'ghgTarget', label: 'GHG emissions target', unit: 'tCO2e or %' },
  { key: 'financedEmissions', label: 'Financed Emissions total', unit: 'tCO2e' },
  { key: 'financedEmissionsTarget', label: 'Financed emissions targets', unit: 'tCO2e or %' },
  { key: 'sectorDecarb', label: 'Sector Decarbonization targets', unit: 'Text' },
  { key: 'otherTargets', label: 'Other targets', unit: 'Text' },
]

const STORAGE_KEY = 'cbk-crdf-report-draft'

/* ═══════════════════════════════════════════════════════════════
   INITIAL STATE BUILDERS
   ═══════════════════════════════════════════════════════════════ */

function buildInitialPhysicalA() {
  const data: Record<string, { totalGross: string; counties: string[]; countyExposures: Record<string, string> }> = {}
  KESIC_SECTORS.forEach((s) => {
    data[s.code] = { totalGross: '0', counties: [], countyExposures: {} }
  })
  return data
}

function buildInitialPhysicalB() {
  const data: Record<string, { acute: string; chronic: string; both: string; stage2: string; nonPerforming: string }> = {}
  KESIC_SECTORS.forEach((s) => {
    data[s.code] = { acute: '0', chronic: '0', both: '0', stage2: '0', nonPerforming: '0' }
  })
  return data
}

function buildInitialTransition() {
  const data: Record<string, {
    all: string; kgftAligned: string; otherGreen: string; stage2: string; nonPerforming: string;
    pctMeasured: string; financedEmissions: string; dataQuality: string;
    matLess1: string; mat1to5: string; matOver5: string;
  }> = {}
  KESIC_SECTORS.forEach((s) => {
    data[s.code] = {
      all: '0', kgftAligned: '0', otherGreen: '0', stage2: '0', nonPerforming: '0',
      pctMeasured: '0', financedEmissions: '0', dataQuality: '3',
      matLess1: '0', mat1to5: '0', matOver5: '0',
    }
  })
  return data
}

interface MaterialityRow {
  id: string
  riskType: string
  subType: string
  climateRisk: string
  impactDescription: string
  shortTerm: string
  mediumTerm: string
  longTerm: string
}

function buildInitialMateriality(): MaterialityRow[] {
  return [
    { id: '1', riskType: 'Transition Risk', subType: 'Policy & Legal', climateRisk: '', impactDescription: '', shortTerm: '', mediumTerm: '', longTerm: '' },
    { id: '2', riskType: 'Transition Risk', subType: 'Technology', climateRisk: '', impactDescription: '', shortTerm: '', mediumTerm: '', longTerm: '' },
    { id: '3', riskType: 'Transition Risk', subType: 'Market', climateRisk: '', impactDescription: '', shortTerm: '', mediumTerm: '', longTerm: '' },
    { id: '4', riskType: 'Transition Risk', subType: 'Reputation', climateRisk: '', impactDescription: '', shortTerm: '', mediumTerm: '', longTerm: '' },
    { id: '5', riskType: 'Physical Risk', subType: 'Acute', climateRisk: '', impactDescription: '', shortTerm: '', mediumTerm: '', longTerm: '' },
    { id: '6', riskType: 'Physical Risk', subType: 'Chronic', climateRisk: '', impactDescription: '', shortTerm: '', mediumTerm: '', longTerm: '' },
  ]
}

function buildInitialQualitative() {
  return {
    businessStrategy: {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
    },
    governance: {
      q1: '',
      q1Explain: '',
      q2: '',
      q2Explain: '',
      q3: '',
      q3Explain: '',
      q4: '',
      q4Explain: '',
    },
    riskManagement: {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
    },
    climateScenarios: {
      q1: '',
      q2: '',
    },
  }
}

interface GovernanceResponsibility {
  id: string
  role: string
  name: string
  responsibilities: string
}

function buildInitialGovernance() {
  return {
    boardStructure: '',
    managementStructure: '',
    responsibilities: [
      { id: '1', role: '', name: '', responsibilities: '' },
    ] as GovernanceResponsibility[],
  }
}

function buildInitialMetrics() {
  const data: Record<string, { answer: string; comment: string }> = {}
  METRICS_KPIS.forEach((k) => {
    data[k.key] = { answer: '', comment: '' }
  })
  return data
}

function buildInitialAlignment() {
  const data: Record<string, { grossCarrying: string; alignmentMetric: string; yearRef: string; target2030: string }> = {}
  HIGH_EMITTING_SECTORS.forEach((s) => {
    data[s.code] = { grossCarrying: '0', alignmentMetric: '', yearRef: '', target2030: '' }
  })
  return data
}

function buildInitialState() {
  return {
    step1: {
      bankName: '',
      cbkLicense: '',
      reportingPeriod: '',
      preparedBy: '',
      contactEmail: '',
      totalLoanBook: '',
      numberOfBorrowers: '',
    },
    step2a: buildInitialPhysicalA(),
    step2b: buildInitialPhysicalB(),
    step3: buildInitialTransition(),
    step4: buildInitialMateriality(),
    step5: buildInitialQualitative(),
    step6: buildInitialGovernance(),
    step7: buildInitialMetrics(),
    step8: buildInitialAlignment(),
  }
}

type FormState = ReturnType<typeof buildInitialState>

/* ═══════════════════════════════════════════════════════════════
   HELPER FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

function getStepCompletion(formData: FormState, stepIndex: number): 'complete' | 'partial' | 'empty' {
  switch (stepIndex) {
    case 0: {
      const s = formData.step1
      const filled = [s.bankName, s.contactEmail].filter(Boolean).length
      if (filled === 2 && s.reportingPeriod) return 'complete'
      if (filled > 0 || s.reportingPeriod || s.cbkLicense || s.preparedBy || s.totalLoanBook || s.numberOfBorrowers) return 'partial'
      return 'empty'
    }
    case 1: {
      const anyA = Object.values(formData.step2a).some((v) => parseFloat(v.totalGross) > 0)
      const anyB = Object.values(formData.step2b).some((v) => parseFloat(v.acute) > 0 || parseFloat(v.chronic) > 0 || parseFloat(v.both) > 0)
      if (anyA && anyB) return 'complete'
      if (anyA || anyB) return 'partial'
      return 'empty'
    }
    case 2: {
      const any = Object.values(formData.step3).some((v) => parseFloat(v.all) > 0)
      return any ? 'complete' : 'empty'
    }
    case 3: {
      const any = formData.step4.some((r) => r.climateRisk || r.impactDescription)
      const allDone = formData.step4.every((r) => r.climateRisk && r.shortTerm && r.mediumTerm && r.longTerm)
      if (allDone) return 'complete'
      if (any) return 'partial'
      return 'empty'
    }
    case 4: {
      const q = formData.step5
      const anyFilled = Object.values(q.businessStrategy).some(Boolean) ||
        Object.values(q.governance).some(Boolean) ||
        Object.values(q.riskManagement).some(Boolean) ||
        Object.values(q.climateScenarios).some(Boolean)
      const allFilled = Object.values(q.businessStrategy).every(Boolean) &&
        Object.values(q.riskManagement).every(Boolean) &&
        Object.values(q.climateScenarios).every(Boolean)
      if (allFilled) return 'complete'
      if (anyFilled) return 'partial'
      return 'empty'
    }
    case 5: {
      const g = formData.step6
      if (g.boardStructure && g.managementStructure && g.responsibilities.some((r) => r.role && r.name)) return 'complete'
      if (g.boardStructure || g.managementStructure || g.responsibilities.some((r) => r.role || r.name)) return 'partial'
      return 'empty'
    }
    case 6: {
      const any = Object.values(formData.step7).some((v) => v.answer)
      const allDone = Object.values(formData.step7).every((v) => v.answer)
      if (allDone) return 'complete'
      if (any) return 'partial'
      return 'empty'
    }
    case 7: {
      const any = Object.values(formData.step8).some((v) => parseFloat(v.grossCarrying) > 0 || v.alignmentMetric)
      const allDone = Object.values(formData.step8).every((v) => v.grossCarrying && v.alignmentMetric && v.target2030)
      if (allDone) return 'complete'
      if (any) return 'partial'
      return 'empty'
    }
    case 8:
      return 'empty'
    default:
      return 'empty'
  }
}

function getOverallProgress(formData: FormState): number {
  let completed = 0
  for (let i = 0; i < 8; i++) {
    const status = getStepCompletion(formData, i)
    if (status === 'complete') completed += 1
    else if (status === 'partial') completed += 0.5
  }
  return Math.round((completed / 8) * 100)
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ReportBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormState>(buildInitialState)
  const [loaded, setLoaded] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [saveFeedback, setSaveFeedback] = useState('')
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({})
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [hazardPeriod, setHazardPeriod] = useState<PeriodIndex>(1)
  const formRef = useRef(formData)
  formRef.current = formData

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setFormData((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true)
  }, [])

  // Auto-save to localStorage on every change
  useEffect(() => {
    if (!loaded) return
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formRef.current))
      } catch {
        // quota exceeded, ignore
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [formData, loaded])

  const updateStep1 = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, step1: { ...prev.step1, [field]: value } }))
  }, [])

  const updateStep2a = useCallback((sectorCode: string, field: string, value: string | string[] | Record<string, string>) => {
    setFormData((prev) => ({
      ...prev,
      step2a: {
        ...prev.step2a,
        [sectorCode]: { ...prev.step2a[sectorCode], [field]: value },
      },
    }))
  }, [])

  const updateStep2b = useCallback((sectorCode: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step2b: {
        ...prev.step2b,
        [sectorCode]: { ...prev.step2b[sectorCode], [field]: value },
      },
    }))
  }, [])

  const updateStep3 = useCallback((sectorCode: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step3: {
        ...prev.step3,
        [sectorCode]: { ...prev.step3[sectorCode], [field]: value },
      },
    }))
  }, [])

  const updateStep4Row = useCallback((id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step4: prev.step4.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    }))
  }, [])

  const addMaterialityRow = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      step4: [
        ...prev.step4,
        {
          id: String(Date.now()),
          riskType: 'Transition Risk',
          subType: 'Policy & Legal',
          climateRisk: '',
          impactDescription: '',
          shortTerm: '',
          mediumTerm: '',
          longTerm: '',
        },
      ],
    }))
  }, [])

  const removeMaterialityRow = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      step4: prev.step4.filter((r) => r.id !== id),
    }))
  }, [])

  const updateStep5 = useCallback((section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step5: {
        ...prev.step5,
        [section]: { ...(prev.step5 as Record<string, Record<string, string>>)[section], [field]: value },
      },
    }))
  }, [])

  const updateStep6 = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step6: { ...prev.step6, [field]: value },
    }))
  }, [])

  const updateStep6Responsibility = useCallback((id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step6: {
        ...prev.step6,
        responsibilities: prev.step6.responsibilities.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
      },
    }))
  }, [])

  const addResponsibilityRow = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      step6: {
        ...prev.step6,
        responsibilities: [...prev.step6.responsibilities, { id: String(Date.now()), role: '', name: '', responsibilities: '' }],
      },
    }))
  }, [])

  const removeResponsibilityRow = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      step6: {
        ...prev.step6,
        responsibilities: prev.step6.responsibilities.filter((r) => r.id !== id),
      },
    }))
  }, [])

  const updateStep7 = useCallback((key: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step7: { ...prev.step7, [key]: { ...prev.step7[key], [field]: value } },
    }))
  }, [])

  const updateStep8 = useCallback((sectorCode: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      step8: { ...prev.step8, [sectorCode]: { ...prev.step8[sectorCode], [field]: value } },
    }))
  }, [])

  const toggleSector = useCallback((code: string) => {
    setExpandedSectors((prev) => ({ ...prev, [code]: !prev[code] }))
  }, [])

  const handleSaveDraft = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formRef.current))
      setSaveFeedback('Draft saved successfully!')
      setTimeout(() => setSaveFeedback(''), 3000)
    } catch {
      setSaveFeedback('Failed to save draft.')
      setTimeout(() => setSaveFeedback(''), 3000)
    }
  }, [])

  const handleDownload = useCallback(async () => {
    setDownloading(true)
    try {
      const res = await fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formRef.current),
      })
      if (!res.ok) throw new Error('Generation failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `CBK_CRDF_Report_${formRef.current.step1.bankName || 'Draft'}_${new Date().toISOString().slice(0, 10)}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert('Failed to generate report. Please ensure the API endpoint is configured.')
    } finally {
      setDownloading(false)
    }
  }, [])

  const progress = getOverallProgress(formData)

  const getRiskOptions = (riskType: string, subType: string): string[] => {
    if (riskType === 'Transition Risk') {
      if (subType === 'Policy & Legal') return TRANSITION_POLICY_RISKS
      if (subType === 'Technology') return TRANSITION_TECH_RISKS
      if (subType === 'Market') return TRANSITION_MARKET_RISKS
      if (subType === 'Reputation') return TRANSITION_REPUTATION_RISKS
    }
    if (riskType === 'Physical Risk') {
      if (subType === 'Acute') return PHYSICAL_ACUTE_RISKS
      if (subType === 'Chronic') return PHYSICAL_CHRONIC_RISKS
    }
    return []
  }

  const getSubTypes = (riskType: string): string[] => {
    if (riskType === 'Transition Risk') return ['Policy & Legal', 'Technology', 'Market', 'Reputation']
    if (riskType === 'Physical Risk') return ['Acute', 'Chronic']
    return []
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading report builder...</div>
      </div>
    )
  }

  /* ─── STEP RENDERERS ─── */

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Institution Information</h2>
        <p className="text-gray-500 text-sm">Basic information about your institution for the CBK CRDF report header.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name <span className="text-red-500">*</span></label>
          <input type="text" className="input-field" placeholder="e.g. Kenya Commercial Bank" value={formData.step1.bankName} onChange={(e) => updateStep1('bankName', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CBK License Number</label>
          <input type="text" className="input-field" placeholder="e.g. LIC/001" value={formData.step1.cbkLicense} onChange={(e) => updateStep1('cbkLicense', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period <span className="text-red-500">*</span></label>
          <select className="select-field" value={formData.step1.reportingPeriod} onChange={(e) => updateStep1('reportingPeriod', e.target.value)}>
            <option value="">Select period</option>
            {REPORTING_PERIODS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prepared By</label>
          <input type="text" className="input-field" placeholder="Name of preparer" value={formData.step1.preparedBy} onChange={(e) => updateStep1('preparedBy', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email <span className="text-red-500">*</span></label>
          <input type="email" className="input-field" placeholder="compliance@bank.co.ke" value={formData.step1.contactEmail} onChange={(e) => updateStep1('contactEmail', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Loan Book (Million KSH)</label>
          <input type="number" className="input-field" placeholder="0" min="0" value={formData.step1.totalLoanBook} onChange={(e) => updateStep1('totalLoanBook', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Borrowers</label>
          <input type="number" className="input-field" placeholder="0" min="0" value={formData.step1.numberOfBorrowers} onChange={(e) => updateStep1('numberOfBorrowers', e.target.value)} />
        </div>
      </div>
      {(!formData.step1.bankName || !formData.step1.contactEmail) && (
        <div className="flex items-center gap-2 text-amber-600 text-sm bg-amber-50 border border-amber-200 rounded-xl p-3">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Bank Name and Contact Email are required for submission.
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Physical Risk Exposures</h2>
        <p className="text-gray-500 text-sm">Report your loan book exposures by KeSIC sector across Kenya counties and by climate risk type.</p>
      </div>

      {/* PART A */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">PART A: Gross Value of Immovable Collateral by Sector &amp; County</h3>
        <p className="text-gray-400 text-xs mb-4">Expand each sector to enter county-level exposure data. Values in Million KSH.</p>
        <div className="space-y-2">
          {KESIC_SECTORS.map((sector) => {
            const isExpanded = expandedSectors[`A-${sector.code}`]
            const data = formData.step2a[sector.code]
            return (
              <div key={sector.code} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  onClick={() => toggleSector(`A-${sector.code}`)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">{sector.code}</span>
                    <span className="text-sm font-medium text-gray-800">{sector.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">Total: {data?.totalGross || '0'} Mn</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isExpanded && (
                  <div className="p-4 space-y-4 bg-white">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Total Gross Exposure (Mn KSH)</label>
                      <input type="number" className="input-field" min="0" value={data?.totalGross || '0'} onChange={(e) => updateStep2a(sector.code, 'totalGross', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Top Counties by Exposure (select up to 5)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-3">
                        {COUNTIES.map((county) => {
                          const selected = data?.counties?.includes(county)
                          const atLimit = (data?.counties?.length || 0) >= 5 && !selected
                          return (
                            <label key={county} className={`flex items-center gap-1.5 text-xs py-0.5 cursor-pointer ${atLimit ? 'opacity-40' : ''}`}>
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                checked={selected || false}
                                disabled={atLimit}
                                onChange={(e) => {
                                  const current = data?.counties || []
                                  const updated = e.target.checked
                                    ? [...current, county]
                                    : current.filter((c: string) => c !== county)
                                  updateStep2a(sector.code, 'counties', updated)
                                  if (!e.target.checked) {
                                    const newExposures = { ...(data?.countyExposures || {}) }
                                    delete newExposures[county]
                                    updateStep2a(sector.code, 'countyExposures', newExposures)
                                  }
                                }}
                              />
                              {county}
                            </label>
                          )
                        })}
                      </div>
                    </div>
                    {(data?.counties?.length || 0) > 0 && (
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Exposure per County (Mn KSH)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {data.counties.map((county: string) => (
                            <div key={county} className="flex items-center gap-2">
                              <span className="text-xs text-gray-600 w-28 truncate">{county}</span>
                              <input
                                type="number"
                                className="input-field text-sm py-2"
                                min="0"
                                placeholder="0"
                                value={data.countyExposures?.[county] || ''}
                                onChange={(e) => {
                                  const updated = { ...(data.countyExposures || {}), [county]: e.target.value }
                                  updateStep2a(sector.code, 'countyExposures', updated)
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Auto-populated Hazard Risk Profile */}
                    {(data?.counties?.length || 0) > 0 && (
                      <div className="mt-4 border border-blue-200 rounded-xl overflow-hidden">
                        <div className="bg-blue-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-semibold text-blue-800">Auto-populated Hazard Risk Profile</h4>
                            <p className="text-[10px] text-blue-600">CBK official county-level hazard data (risk scale 1-5)</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {PERIOD_LABELS.map((label, idx) => (
                              <button
                                key={label}
                                type="button"
                                className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                                  hazardPeriod === idx
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-100'
                                }`}
                                onClick={() => setHazardPeriod(idx as PeriodIndex)}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-semibold text-gray-600">County</th>
                                {HAZARD_DISPLAY_KEYS.map((key) => (
                                  <th key={key} className="text-center py-2 px-2 font-semibold text-gray-600 whitespace-nowrap">
                                    {HAZARD_LABELS[key]}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {data.counties.map((county: string) => {
                                const hazard = COUNTY_HAZARDS[county]
                                if (!hazard) return null
                                return (
                                  <tr key={county} className="border-b border-gray-100">
                                    <td className="py-2 px-3 font-medium text-gray-700 whitespace-nowrap">{county}</td>
                                    {HAZARD_DISPLAY_KEYS.map((key) => {
                                      const level = hazard[key][hazardPeriod]
                                      const colors = getRiskColor(level)
                                      return (
                                        <td key={key} className="py-1.5 px-2 text-center">
                                          <span
                                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
                                            title={getRiskLabel(level)}
                                          >
                                            {level} - {getRiskLabel(level)}
                                          </span>
                                        </td>
                                      )
                                    })}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="bg-gray-50 px-4 py-2 flex items-center gap-4 text-[10px] text-gray-500 border-t border-gray-200">
                          <span className="font-medium">Legend:</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200"></span> 1-2 Low</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-50 border border-amber-200"></span> 3 Moderate</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-50 border border-red-200"></span> 4-5 High</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* PART B */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">PART B: Gross Carrying Amount by Climate Risk Type</h3>
        <p className="text-gray-400 text-xs mb-4">Report acute and chronic climate risk exposures per sector. Values in Million KSH.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Sector</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Acute (Mn)</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Chronic (Mn)</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Both (Mn)</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Stage 2</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600">Non-performing</th>
              </tr>
            </thead>
            <tbody>
              {KESIC_SECTORS.map((sector) => {
                const d = formData.step2b[sector.code]
                return (
                  <tr key={sector.code} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 text-xs font-medium text-gray-700">{sector.code} - {sector.label}</td>
                    <td className="py-2 px-2"><input type="number" className="input-field text-xs py-1.5 text-right" min="0" value={d?.acute || '0'} onChange={(e) => updateStep2b(sector.code, 'acute', e.target.value)} /></td>
                    <td className="py-2 px-2"><input type="number" className="input-field text-xs py-1.5 text-right" min="0" value={d?.chronic || '0'} onChange={(e) => updateStep2b(sector.code, 'chronic', e.target.value)} /></td>
                    <td className="py-2 px-2"><input type="number" className="input-field text-xs py-1.5 text-right" min="0" value={d?.both || '0'} onChange={(e) => updateStep2b(sector.code, 'both', e.target.value)} /></td>
                    <td className="py-2 px-2"><input type="number" className="input-field text-xs py-1.5 text-right" min="0" value={d?.stage2 || '0'} onChange={(e) => updateStep2b(sector.code, 'stage2', e.target.value)} /></td>
                    <td className="py-2 px-2"><input type="number" className="input-field text-xs py-1.5 text-right" min="0" value={d?.nonPerforming || '0'} onChange={(e) => updateStep2b(sector.code, 'nonPerforming', e.target.value)} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Transition Risk Exposures</h2>
        <p className="text-gray-500 text-sm">Report exposure to transition risks across KGFT alignment, financed emissions, and maturity buckets.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th rowSpan={2} className="text-left py-3 px-2 text-xs font-semibold text-gray-600 sticky left-0 bg-gray-50 min-w-[160px]">Sector</th>
              <th colSpan={5} className="text-center py-2 px-2 text-xs font-semibold text-emerald-700 border-b border-emerald-200">PART A: Exposure (Mn KSH)</th>
              <th colSpan={3} className="text-center py-2 px-2 text-xs font-semibold text-blue-700 border-b border-blue-200">PART B: Emissions</th>
              <th colSpan={3} className="text-center py-2 px-2 text-xs font-semibold text-purple-700 border-b border-purple-200">PART C: Maturity (Mn KSH)</th>
            </tr>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">ALL</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">KGFT</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">Other Green</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">Stage 2</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">Non-perf</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">% Measured</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">tCO2e</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">Quality</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">&lt;1yr</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">1-5yr</th>
              <th className="text-right py-2 px-1 text-[10px] font-medium text-gray-500">&gt;5yr</th>
            </tr>
          </thead>
          <tbody>
            {KESIC_SECTORS.map((sector) => {
              const d = formData.step3[sector.code]
              return (
                <tr key={sector.code} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-xs font-medium text-gray-700 sticky left-0 bg-white">{sector.code} - {sector.label}</td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.all || '0'} onChange={(e) => updateStep3(sector.code, 'all', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.kgftAligned || '0'} onChange={(e) => updateStep3(sector.code, 'kgftAligned', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.otherGreen || '0'} onChange={(e) => updateStep3(sector.code, 'otherGreen', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.stage2 || '0'} onChange={(e) => updateStep3(sector.code, 'stage2', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.nonPerforming || '0'} onChange={(e) => updateStep3(sector.code, 'nonPerforming', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" max="100" value={d?.pctMeasured || '0'} onChange={(e) => updateStep3(sector.code, 'pctMeasured', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.financedEmissions || '0'} onChange={(e) => updateStep3(sector.code, 'financedEmissions', e.target.value)} /></td>
                  <td className="py-1 px-1">
                    <select className="select-field text-[11px] py-1" value={d?.dataQuality || '3'} onChange={(e) => updateStep3(sector.code, 'dataQuality', e.target.value)}>
                      {[1, 2, 3, 4, 5].map((v) => <option key={v} value={String(v)}>{v}</option>)}
                    </select>
                  </td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.matLess1 || '0'} onChange={(e) => updateStep3(sector.code, 'matLess1', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.mat1to5 || '0'} onChange={(e) => updateStep3(sector.code, 'mat1to5', e.target.value)} /></td>
                  <td className="py-1 px-1"><input type="number" className="input-field text-[11px] py-1 text-right" min="0" value={d?.matOver5 || '0'} onChange={(e) => updateStep3(sector.code, 'matOver5', e.target.value)} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Climate Risk Materiality</h2>
        <p className="text-gray-500 text-sm">Assess how climate-related risks impact your institution across different time horizons.</p>
      </div>

      <div className="space-y-4">
        {formData.step4.map((row, idx) => (
          <div key={row.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <span className="badge">Risk Assessment #{idx + 1}</span>
              {formData.step4.length > 1 && (
                <button type="button" className="text-red-400 hover:text-red-600 text-xs" onClick={() => removeMaterialityRow(row.id)}>Remove</button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Risk Type</label>
                <select className="select-field text-sm" value={row.riskType} onChange={(e) => {
                  updateStep4Row(row.id, 'riskType', e.target.value)
                  const subs = e.target.value === 'Transition Risk' ? 'Policy & Legal' : 'Acute'
                  updateStep4Row(row.id, 'subType', subs)
                  updateStep4Row(row.id, 'climateRisk', '')
                }}>
                  <option value="Transition Risk">Transition Risk</option>
                  <option value="Physical Risk">Physical Risk</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Sub-Type</label>
                <select className="select-field text-sm" value={row.subType} onChange={(e) => {
                  updateStep4Row(row.id, 'subType', e.target.value)
                  updateStep4Row(row.id, 'climateRisk', '')
                }}>
                  {getSubTypes(row.riskType).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Climate-Related Risk</label>
                <select className="select-field text-sm" value={row.climateRisk} onChange={(e) => updateStep4Row(row.id, 'climateRisk', e.target.value)}>
                  <option value="">Select a risk</option>
                  {getRiskOptions(row.riskType, row.subType).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Impact Description</label>
              <textarea className="input-field text-sm" rows={2} placeholder="Describe the potential impact on your institution..." value={row.impactDescription} onChange={(e) => updateStep4Row(row.id, 'impactDescription', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Short-term Impact</label>
                <select className="select-field text-sm" value={row.shortTerm} onChange={(e) => updateStep4Row(row.id, 'shortTerm', e.target.value)}>
                  <option value="">Select level</option>
                  {IMPACT_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Medium-term Impact</label>
                <select className="select-field text-sm" value={row.mediumTerm} onChange={(e) => updateStep4Row(row.id, 'mediumTerm', e.target.value)}>
                  <option value="">Select level</option>
                  {IMPACT_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Long-term Impact</label>
                <select className="select-field text-sm" value={row.longTerm} onChange={(e) => updateStep4Row(row.id, 'longTerm', e.target.value)}>
                  <option value="">Select level</option>
                  {IMPACT_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="btn-secondary text-sm" onClick={addMaterialityRow}>
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add Another Risk Assessment
      </button>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Qualitative Questionnaire</h2>
        <p className="text-gray-500 text-sm">Answer qualitative questions about your institution&apos;s climate risk management practices.</p>
      </div>

      {/* Business Strategy */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">1</span>
          Business Strategy
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">How has the institution integrated climate risk into its business strategy?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe your approach..." value={formData.step5.businessStrategy.q1} onChange={(e) => updateStep5('businessStrategy', 'q1', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What are the institution&apos;s climate-related strategic objectives?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="List strategic objectives..." value={formData.step5.businessStrategy.q2} onChange={(e) => updateStep5('businessStrategy', 'q2', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What portfolio-level climate goals has the institution set?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe portfolio goals..." value={formData.step5.businessStrategy.q3} onChange={(e) => updateStep5('businessStrategy', 'q3', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">How does the institution assess the materiality of climate-related risks and opportunities?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe your materiality assessment process..." value={formData.step5.businessStrategy.q4} onChange={(e) => updateStep5('businessStrategy', 'q4', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">How does the institution engage clients on climate risk and transition planning?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe client engagement..." value={formData.step5.businessStrategy.q5} onChange={(e) => updateStep5('businessStrategy', 'q5', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Governance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">2</span>
          Governance
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Does the Board have defined responsibilities for climate risk oversight?</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q1" className="text-emerald-600" value="Yes" checked={formData.step5.governance.q1 === 'Yes'} onChange={(e) => updateStep5('governance', 'q1', e.target.value)} /> Yes</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q1" className="text-emerald-600" value="No" checked={formData.step5.governance.q1 === 'No'} onChange={(e) => updateStep5('governance', 'q1', e.target.value)} /> No</label>
            </div>
            <textarea className="input-field text-sm" rows={2} placeholder="Please explain..." value={formData.step5.governance.q1Explain} onChange={(e) => updateStep5('governance', 'q1Explain', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Does executive management have designated climate risk responsibilities?</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q2" className="text-emerald-600" value="Yes" checked={formData.step5.governance.q2 === 'Yes'} onChange={(e) => updateStep5('governance', 'q2', e.target.value)} /> Yes</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q2" className="text-emerald-600" value="No" checked={formData.step5.governance.q2 === 'No'} onChange={(e) => updateStep5('governance', 'q2', e.target.value)} /> No</label>
            </div>
            <textarea className="input-field text-sm" rows={2} placeholder="Please explain..." value={formData.step5.governance.q2Explain} onChange={(e) => updateStep5('governance', 'q2Explain', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Has the institution provided climate risk training for board and management?</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q3" className="text-emerald-600" value="Yes" checked={formData.step5.governance.q3 === 'Yes'} onChange={(e) => updateStep5('governance', 'q3', e.target.value)} /> Yes</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q3" className="text-emerald-600" value="No" checked={formData.step5.governance.q3 === 'No'} onChange={(e) => updateStep5('governance', 'q3', e.target.value)} /> No</label>
            </div>
            <textarea className="input-field text-sm" rows={2} placeholder="Please explain..." value={formData.step5.governance.q3Explain} onChange={(e) => updateStep5('governance', 'q3Explain', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Is climate risk performance linked to remuneration or incentives?</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q4" className="text-emerald-600" value="Yes" checked={formData.step5.governance.q4 === 'Yes'} onChange={(e) => updateStep5('governance', 'q4', e.target.value)} /> Yes</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="gov-q4" className="text-emerald-600" value="No" checked={formData.step5.governance.q4 === 'No'} onChange={(e) => updateStep5('governance', 'q4', e.target.value)} /> No</label>
            </div>
            <textarea className="input-field text-sm" rows={2} placeholder="Please explain..." value={formData.step5.governance.q4Explain} onChange={(e) => updateStep5('governance', 'q4Explain', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Risk Management */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">3</span>
          Risk Management
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What processes does the institution use to identify climate-related risks?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe identification processes..." value={formData.step5.riskManagement.q1} onChange={(e) => updateStep5('riskManagement', 'q1', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What methodologies are used for climate risk assessment (e.g., scenario analysis, stress testing)?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe methodologies..." value={formData.step5.riskManagement.q2} onChange={(e) => updateStep5('riskManagement', 'q2', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What mitigation strategies has the institution implemented for identified climate risks?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe mitigation strategies..." value={formData.step5.riskManagement.q3} onChange={(e) => updateStep5('riskManagement', 'q3', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What tools or systems does the institution use for climate risk monitoring?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe tools and systems..." value={formData.step5.riskManagement.q4} onChange={(e) => updateStep5('riskManagement', 'q4', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">How does the institution assess and manage climate data quality?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe data quality management..." value={formData.step5.riskManagement.q5} onChange={(e) => updateStep5('riskManagement', 'q5', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">How is climate risk integrated into the institution&apos;s overall risk appetite framework?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe integration..." value={formData.step5.riskManagement.q6} onChange={(e) => updateStep5('riskManagement', 'q6', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What key risk indicators (KRIs) does the institution use for climate risk?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="List key risk indicators..." value={formData.step5.riskManagement.q7} onChange={(e) => updateStep5('riskManagement', 'q7', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Climate Scenarios */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">4</span>
          Climate Scenarios
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What climate scenario analysis approach does the institution use (e.g., NGFS scenarios, IEA, custom)?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe scenario analysis approach..." value={formData.step5.climateScenarios.q1} onChange={(e) => updateStep5('climateScenarios', 'q1', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What are the key results and implications from the scenario analysis?</label>
            <textarea className="input-field text-sm" rows={3} placeholder="Describe results and implications..." value={formData.step5.climateScenarios.q2} onChange={(e) => updateStep5('climateScenarios', 'q2', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep6 = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Climate Governance</h2>
        <p className="text-gray-500 text-sm">Describe your institution&apos;s governance structure for climate risk oversight.</p>
      </div>

      <div className="card">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Board-Level Structure</h3>
        <p className="text-gray-400 text-xs mb-2">Describe the board-level oversight arrangements for climate risk management.</p>
        <textarea className="input-field text-sm" rows={4} placeholder="e.g. The Board Risk Committee has oversight of climate-related risks. Climate risk is a standing agenda item reviewed quarterly..." value={formData.step6.boardStructure} onChange={(e) => updateStep6('boardStructure', e.target.value)} />
      </div>

      <div className="card">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Management-Level Structure</h3>
        <p className="text-gray-400 text-xs mb-2">Describe how executive management is organized to manage climate risks.</p>
        <textarea className="input-field text-sm" rows={4} placeholder="e.g. A dedicated Sustainability & Climate Risk Unit reports to the Chief Risk Officer. The unit coordinates across departments..." value={formData.step6.managementStructure} onChange={(e) => updateStep6('managementStructure', e.target.value)} />
      </div>

      <div className="card">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Organization Chart Upload</h3>
        <p className="text-gray-400 text-xs mb-3">Upload your climate governance organization chart (optional).</p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
          <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-500">Drag and drop your org chart here, or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, or PDF up to 10MB</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-800">Climate Responsibility Assignment</h3>
            <p className="text-gray-400 text-xs">Assign climate risk responsibilities to specific roles and individuals.</p>
          </div>
          <button type="button" className="btn-secondary text-xs py-2 px-3" onClick={addResponsibilityRow}>
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Row
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Role</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Responsibilities</th>
                <th className="py-3 px-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {formData.step6.responsibilities.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="e.g. Chief Risk Officer" value={row.role} onChange={(e) => updateStep6Responsibility(row.id, 'role', e.target.value)} /></td>
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="Full name" value={row.name} onChange={(e) => updateStep6Responsibility(row.id, 'name', e.target.value)} /></td>
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="Key responsibilities" value={row.responsibilities} onChange={(e) => updateStep6Responsibility(row.id, 'responsibilities', e.target.value)} /></td>
                  <td className="py-2 px-2">
                    {formData.step6.responsibilities.length > 1 && (
                      <button type="button" className="text-red-400 hover:text-red-600" onClick={() => removeResponsibilityRow(row.id)}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderStep7 = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Metrics &amp; Targets</h2>
        <p className="text-gray-500 text-sm">Report key climate-related performance metrics and targets for your institution.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 min-w-[240px]">KPI</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 w-24">Unit</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 min-w-[180px]">Answer</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 min-w-[200px]">Comment</th>
            </tr>
          </thead>
          <tbody>
            {METRICS_KPIS.map((kpi) => {
              const d = formData.step7[kpi.key]
              return (
                <tr key={kpi.key} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 text-sm text-gray-700">{kpi.label}</td>
                  <td className="py-2 px-3 text-xs text-gray-400">{kpi.unit}</td>
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="Enter value" value={d?.answer || ''} onChange={(e) => updateStep7(kpi.key, 'answer', e.target.value)} /></td>
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="Optional comment" value={d?.comment || ''} onChange={(e) => updateStep7(kpi.key, 'comment', e.target.value)} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderStep8 = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Alignment Metrics</h2>
        <p className="text-gray-500 text-sm">Report alignment metrics for high-emitting sectors in your portfolio.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 min-w-[220px]">Sector</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Gross Carrying Amount (Mn KSH)</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Alignment Metric</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 w-28">Year of Reference</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">2030 Target</th>
            </tr>
          </thead>
          <tbody>
            {HIGH_EMITTING_SECTORS.map((sector) => {
              const d = formData.step8[sector.code]
              return (
                <tr key={sector.code} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 text-sm font-medium text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">{sector.code}</span>
                      {sector.label}
                    </span>
                  </td>
                  <td className="py-2 px-2"><input type="number" className="input-field text-sm py-2 text-right" min="0" value={d?.grossCarrying || '0'} onChange={(e) => updateStep8(sector.code, 'grossCarrying', e.target.value)} /></td>
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="e.g. tCO2e/KSH Mn" value={d?.alignmentMetric || ''} onChange={(e) => updateStep8(sector.code, 'alignmentMetric', e.target.value)} /></td>
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="e.g. 2025" value={d?.yearRef || ''} onChange={(e) => updateStep8(sector.code, 'yearRef', e.target.value)} /></td>
                  <td className="py-2 px-2"><input type="text" className="input-field text-sm py-2" placeholder="e.g. 30% reduction" value={d?.target2030 || ''} onChange={(e) => updateStep8(sector.code, 'target2030', e.target.value)} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderStep9 = () => {
    const sections = STEPS.slice(0, 8).map((name, i) => ({
      name,
      status: getStepCompletion(formData, i),
    }))

    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Review &amp; Download</h2>
          <p className="text-gray-500 text-sm">Review your submission status across all sections and download the completed CBK CRDF report.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s, i) => (
            <div key={s.name} className="card flex items-center gap-4 cursor-pointer" onClick={() => setCurrentStep(i)}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                s.status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                s.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-400'
              }`}>
                {s.status === 'complete' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : s.status === 'partial' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">Step {i + 1}: {s.name}</span>
                  <span className={`text-xs ${
                    s.status === 'complete' ? 'badge' :
                    s.status === 'partial' ? 'badge-amber' :
                    'badge-red'
                  }`}>
                    {s.status === 'complete' ? 'Complete' : s.status === 'partial' ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="text-2xl font-bold gradient-text">{formData.step1.bankName || '---'}</div>
            <div className="text-xs text-gray-400 mt-1">Institution</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold gradient-text">{formData.step1.reportingPeriod || '---'}</div>
            <div className="text-xs text-gray-400 mt-1">Reporting Period</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold gradient-text">{progress}%</div>
            <div className="text-xs text-gray-400 mt-1">Overall Completion</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold gradient-text">{sections.filter((s) => s.status === 'complete').length}/{sections.length}</div>
            <div className="text-xs text-gray-400 mt-1">Sections Complete</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className="btn-primary text-base py-4 px-8 flex-1"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Generating Report...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                Download CBK CRDF Report (Excel)
              </>
            )}
          </button>
          <button type="button" className="btn-secondary text-base py-4 px-8" onClick={handleSaveDraft}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            Save Draft
          </button>
        </div>
        {saveFeedback && (
          <div className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            {saveFeedback}
          </div>
        )}
      </div>
    )
  }

  const stepRenderers = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6, renderStep7, renderStep8, renderStep9]

  /* ═══════════════════════════════════════════════════════════════
     MAIN RENDER
     ═══════════════════════════════════════════════════════════════ */

  return (
    <AuthGate>
    <div className="min-h-screen bg-white">
      {/* ─── HEADER ─── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-400 hover:text-emerald-600 transition-colors flex items-center gap-1 text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back
              </a>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CBK CRDF <span className="gradient-text">Report Builder</span></h1>
                <p className="text-xs text-gray-400 hidden sm:block">Complete your Climate Risk Disclosure Framework templates. Fill in each section and download your report ready for CBK submission.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 hidden sm:inline">Auto-saved</span>
              <span className="badge">{progress}% Complete</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* ─── MOBILE NAV TOGGLE ─── */}
      <div className="lg:hidden sticky top-[105px] z-40 bg-white border-b border-gray-200 px-4 py-2">
        <button
          type="button"
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-xl"
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <span>Step {currentStep + 1}: {STEPS[currentStep]}</span>
          <svg className={`w-4 h-4 transition-transform ${showMobileNav ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showMobileNav && (
          <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {STEPS.map((step, i) => {
              const status = i < 8 ? getStepCompletion(formData, i) : 'empty'
              return (
                <button
                  key={step}
                  type="button"
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 border-b border-gray-100 last:border-0 transition-colors ${
                    i === currentStep ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                  onClick={() => { setCurrentStep(i); setShowMobileNav(false) }}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === currentStep ? 'bg-emerald-600 text-white' :
                    status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                    status === 'partial' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-400'
                  }`}>{i + 1}</span>
                  {step}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ─── MAIN LAYOUT ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="sticky top-[130px] space-y-1">
            {STEPS.map((step, i) => {
              const status = i < 8 ? getStepCompletion(formData, i) : 'empty'
              return (
                <button
                  key={step}
                  type="button"
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center gap-3 transition-all ${
                    i === currentStep
                      ? 'bg-emerald-50 text-emerald-700 font-medium shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentStep(i)}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === currentStep ? 'bg-emerald-600 text-white' :
                    status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                    status === 'partial' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {status === 'complete' && i !== currentStep ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className="truncate">{step}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {stepRenderers[currentStep]()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="btn-secondary text-sm"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Previous
            </button>
            <span className="text-xs text-gray-400">Step {currentStep + 1} of {STEPS.length}</span>
            <button
              type="button"
              className="btn-primary text-sm"
              disabled={currentStep === STEPS.length - 1}
              onClick={() => setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
            >
              Next
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </main>
      </div>
    </div>
    </AuthGate>
  )
}
