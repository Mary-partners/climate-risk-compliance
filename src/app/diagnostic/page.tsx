'use client'

import { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AuthGate from '@/lib/AuthGate'

// ============================================================
// TYPES
// ============================================================
interface Question {
  text: string
  options: [string, string, string, string, string]
}

interface Category {
  name: string
  questions: Question[]
}

interface Pillar {
  id: string
  name: string
  shortName: string
  description: string
  categories: Category[]
}

interface CBKField {
  label: string
}

interface CBKTemplate {
  id: string
  name: string
  fields: CBKField[]
}

interface PCAFClass {
  name: string
}

interface CriticalCheck {
  title: string
  description: string
}

interface ClientInfo {
  bankName: string
  date: string
  lead: string
  sponsor: string
  scope: string
}

interface DiagnosticState {
  mode: 'bank' | 'internal'
  info: ClientInfo
  answers: Record<string, number>
  cbk: Record<string, string>
  pcaf: Record<string, string>
  checks: Record<number, string>
  activeSection: string
}

// ============================================================
// DATA: 6 PILLARS (36 questions for bank mode)
// ============================================================
const PILLARS: Pillar[] = [
  {
    id: 'p1',
    name: 'Pillar 1: Governance & Oversight',
    shortName: 'Governance',
    description: 'Board-level accountability, oversight structures, and climate risk policy frameworks.',
    categories: [
      {
        name: 'Board Oversight',
        questions: [
          {
            text: 'Has your board formally approved a climate risk strategy or policy?',
            options: ['No', 'Under discussion', 'Draft exists', 'Approved but needs updating', 'Yes \u2014 current and approved'],
          },
          {
            text: 'How frequently does the board discuss climate risk?',
            options: ['Never', 'Discussed once', 'Annually', 'Semi-annually', 'Quarterly or more'],
          },
          {
            text: 'Have board members received climate risk training in the past year?',
            options: ['No training', 'Planned but not done', 'Some members trained', 'Most members trained', 'All trained with refreshers'],
          },
        ],
      },
      {
        name: 'Accountability',
        questions: [
          {
            text: 'Is there a named senior executive accountable for climate risk?',
            options: ['No one assigned', 'Informal mention only', 'Partial responsibility', 'Named executive', 'C-suite with KPIs'],
          },
          {
            text: 'Is climate risk integrated into your enterprise risk management framework?',
            options: ['Not at all', 'Mentioned informally', 'Partially mapped', 'Formal integration underway', 'Fully embedded in ERM'],
          },
          {
            text: 'Does your institution have a documented climate risk policy?',
            options: ['No policy', 'Under development', 'Draft exists', 'Approved policy', 'Approved with regular review'],
          },
        ],
      },
    ],
  },
  {
    id: 'p2',
    name: 'Pillar 2: Strategy & Planning',
    shortName: 'Strategy',
    description: 'Climate scenario analysis, transition planning, and identification of opportunities.',
    categories: [
      {
        name: 'Scenario Analysis',
        questions: [
          {
            text: 'Has your institution conducted climate scenario analysis?',
            options: ['No', 'Planned', 'Basic qualitative', 'Quantitative for some portfolios', 'Full quantitative dual-scenario'],
          },
          {
            text: 'Do your scenarios cover both physical and transition risks?',
            options: ['Neither', 'Physical only', 'Transition only', 'Both but limited', 'Both comprehensively'],
          },
          {
            text: 'What time horizons does your scenario analysis cover?',
            options: ['None', 'Short-term only (<5y)', 'Medium-term (5-15y)', 'Long-term (>15y)', 'Multiple horizons integrated'],
          },
        ],
      },
      {
        name: 'Planning',
        questions: [
          {
            text: 'Does your institution have a documented transition plan?',
            options: ['No plan', 'Discussed but not documented', 'Draft in progress', 'Approved plan exists', 'Approved with milestones and KPIs'],
          },
          {
            text: 'Have you set green financing targets?',
            options: ['No targets', 'Under discussion', 'Informal targets', 'Formal targets set', 'Targets with tracking and reporting'],
          },
          {
            text: 'Have you identified climate-related business opportunities?',
            options: ['Not considered', 'Early discussions', 'Some identified', 'Formal pipeline', 'Revenue-generating products launched'],
          },
        ],
      },
    ],
  },
  {
    id: 'p3',
    name: 'Pillar 3: Risk Management',
    shortName: 'Risk Mgmt',
    description: 'Integration of climate factors into enterprise risk, credit assessment, and stress testing.',
    categories: [
      {
        name: 'ERM Integration',
        questions: [
          {
            text: 'Is climate risk formally incorporated into your ERM framework?',
            options: ['Not at all', 'Under discussion', 'Partially mapped', 'Formally integrated', 'Fully embedded with appetite limits'],
          },
          {
            text: 'Do you include climate factors in credit risk assessment?',
            options: ['No', 'Planned', 'Selective sectors only', 'Most sectors covered', 'All lending includes climate screening'],
          },
          {
            text: 'Do you monitor concentration risk to climate-sensitive sectors?',
            options: ['No monitoring', 'Ad hoc tracking', 'Informal monitoring', 'Formal limits set', 'Real-time monitoring with alerts'],
          },
        ],
      },
      {
        name: 'Stress Testing',
        questions: [
          {
            text: 'Do you conduct climate stress tests on your loan book?',
            options: ['No', 'Planned', 'Basic sensitivity', 'Detailed scenario-based', 'Annual comprehensive with board review'],
          },
          {
            text: 'Does your risk appetite statement reference climate risk?',
            options: ['No mention', 'Informally referenced', 'Qualitative statement', 'Quantitative thresholds', 'Fully embedded with escalation'],
          },
          {
            text: 'Do you use climate risk in ICAAP or ILAAP processes?',
            options: ['Not included', 'Planned', 'Qualitative mention', 'Partially quantified', 'Fully integrated capital allocation'],
          },
        ],
      },
    ],
  },
  {
    id: 'p4',
    name: 'Pillar 4: Metrics & Targets',
    shortName: 'Metrics',
    description: 'GHG emissions measurement, PCAF methodology, science-based targets, and dashboards.',
    categories: [
      {
        name: 'Emissions',
        questions: [
          {
            text: 'Do you measure your Scope 1 and 2 GHG emissions?',
            options: ['No', 'Planned', 'Partial measurement', 'Full measurement', 'Measured with third-party verification'],
          },
          {
            text: 'Do you measure financed emissions (Scope 3 Category 15)?',
            options: ['No', 'Awareness only', 'Initial estimates', 'PCAF methodology for key sectors', 'Full portfolio PCAF measurement'],
          },
          {
            text: 'What is your PCAF data quality score?',
            options: ['Not measured', 'Score 5 (Regional avg)', 'Score 4 (Sector avg)', 'Score 3 (Activity data)', 'Score 1-2 (Verified/Audited)'],
          },
        ],
      },
      {
        name: 'Targets',
        questions: [
          {
            text: 'Have you set GHG emission reduction targets?',
            options: ['No targets', 'Under discussion', 'Informal targets', 'Science-based targets set', 'SBTi validated targets'],
          },
          {
            text: 'Do you track a green asset ratio?',
            options: ['Not tracked', 'Planned', 'Partial tracking', 'Full tracking', 'Tracked with board reporting'],
          },
          {
            text: 'Is there a climate risk dashboard for management?',
            options: ['No dashboard', 'Ad hoc reports', 'Periodic manual reports', 'Automated quarterly', 'Real-time digital dashboard'],
          },
        ],
      },
    ],
  },
  {
    id: 'p5',
    name: 'Pillar 5: Data Infrastructure',
    shortName: 'Data',
    description: 'Climate data collection, core banking integration, geospatial capabilities, and governance.',
    categories: [
      {
        name: 'Data Collection',
        questions: [
          {
            text: 'Do you collect climate-related data from borrowers?',
            options: ['No collection', 'Planned', 'Ad hoc for some', 'Structured for major clients', 'Systematic for all borrowers'],
          },
          {
            text: 'Are climate fields embedded in your core banking system?',
            options: ['Not at all', 'Planned', 'Some fields added', 'Most fields in system', 'Fully integrated with automated feeds'],
          },
          {
            text: 'Do you capture geographic coordinates for collateral?',
            options: ['No', 'For some properties', 'Urban properties only', 'Most properties', 'All collateral geolocated'],
          },
        ],
      },
      {
        name: 'Data Quality',
        questions: [
          {
            text: 'Do you use external climate or geospatial data sources?',
            options: ['No', 'Awareness only', 'Exploring options', 'Some integrated', 'Multiple sources integrated'],
          },
          {
            text: 'Do you have a data governance framework for climate data?',
            options: ['No framework', 'Under development', 'Draft framework', 'Implemented', 'Implemented with quality dashboards'],
          },
          {
            text: 'Is your climate data auditable and traceable?',
            options: ['No trails', 'Minimal documentation', 'Partial trails', 'Mostly traceable', 'Fully auditable with lineage'],
          },
        ],
      },
    ],
  },
  {
    id: 'p6',
    name: 'Pillar 6: Taxonomy & Classification',
    shortName: 'Taxonomy',
    description: 'KGFT mapping, CBK CRDF template readiness, IFRS alignment, and gap analysis status.',
    categories: [
      {
        name: 'KGFT',
        questions: [
          {
            text: 'Have you mapped your portfolio against the Kenya Green Finance Taxonomy?',
            options: ['Not started', 'Aware of KGFT', 'Initial mapping', 'Partial mapping complete', 'Full portfolio classified'],
          },
          {
            text: 'Can you quantify KGFT-eligible and aligned activities?',
            options: ['Cannot quantify', 'Rough estimates', 'Some sectors quantified', 'Most quantified', 'Full quantification with reporting'],
          },
          {
            text: 'Have staff been trained on KGFT classification?',
            options: ['No training', 'Planned', 'Some staff trained', 'Key teams trained', 'Organization-wide with certification'],
          },
        ],
      },
      {
        name: 'Reporting',
        questions: [
          {
            text: 'Can you populate all 9 CBK CRDF templates from your systems?',
            options: ['Cannot populate any', '1-2 templates partially', '3-5 templates partially', 'Most templates mostly', 'All 9 templates fully from systems'],
          },
          {
            text: 'Are your disclosures aligned with IFRS S1/S2 requirements?',
            options: ['Not aware of requirements', 'Aware but not started', 'Gap analysis done', 'Partial alignment', 'Fully aligned and tested'],
          },
          {
            text: 'Have you completed a gap analysis between current reporting and required standards?',
            options: ['No gap analysis', 'Planned', 'In progress', 'Completed', 'Completed with remediation plan'],
          },
        ],
      },
    ],
  },
]

// ============================================================
// DATA: CBK TEMPLATES (internal only)
// ============================================================
const CBK_TEMPLATES: CBKTemplate[] = [
  {
    id: '5A',
    name: '5A Credit Risk',
    fields: [
      { label: 'Climate-sensitive sector exposure breakdown' },
      { label: 'Physical risk exposure by geography' },
      { label: 'Transition risk exposure by sector' },
      { label: 'Climate-adjusted probability of default' },
      { label: 'Climate-adjusted loss given default' },
      { label: 'Concentration risk to top climate-sensitive sectors' },
    ],
  },
  {
    id: '5B',
    name: '5B Market & Liquidity',
    fields: [
      { label: 'Climate-sensitive assets in trading book' },
      { label: 'Stranded asset exposure' },
      { label: 'Climate VaR estimates' },
      { label: 'Liquidity stress from climate events' },
      { label: 'Climate-related contingent liabilities' },
    ],
  },
  {
    id: '7A',
    name: '7A Scope 1 & 2',
    fields: [
      { label: 'Scope 1 emissions (tCO2e)' },
      { label: 'Scope 2 location-based emissions' },
      { label: 'Scope 2 market-based emissions' },
      { label: 'Emissions intensity per employee' },
      { label: 'Emissions intensity per revenue' },
      { label: 'Year-on-year change and methodology' },
    ],
  },
  {
    id: '7B',
    name: '7B Financed Emissions',
    fields: [
      { label: 'Total financed emissions (tCO2e)' },
      { label: 'Financed emissions by asset class' },
      { label: 'Financed emissions by sector' },
      { label: 'Attribution methodology (PCAF)' },
      { label: 'Data quality score by asset class' },
      { label: 'Coverage ratio of portfolio measured' },
    ],
  },
  {
    id: '7C',
    name: '7C Emissions Detail',
    fields: [
      { label: 'Top 10 emitting counterparties' },
      { label: 'Sector-level emission factors used' },
      { label: 'Data sources and proxies applied' },
      { label: 'Avoided emissions from green finance' },
      { label: 'Removals and offsets' },
      { label: 'Emissions trend analysis (3-year)' },
      { label: 'Verification and assurance status' },
    ],
  },
  {
    id: '10',
    name: '10 Targets & Transition',
    fields: [
      { label: 'GHG reduction targets (Scope 1, 2, 3)' },
      { label: 'Green financing targets' },
      { label: 'Transition plan milestones' },
      { label: 'Sector-specific decarbonisation pathways' },
      { label: 'Capital allocation to transition' },
      { label: 'Progress against targets to date' },
    ],
  },
  {
    id: '11',
    name: '11 Physical Risk',
    fields: [
      { label: 'Acute physical risk exposure (floods, drought)' },
      { label: 'Chronic physical risk exposure (temperature, rainfall)' },
      { label: 'Geographic distribution of exposed assets' },
      { label: 'Insurance coverage of physical risks' },
      { label: 'Physical risk scenario analysis results' },
      { label: 'Adaptation measures and residual risk' },
    ],
  },
  {
    id: '12',
    name: '12 Transition Risk',
    fields: [
      { label: 'Policy and legal transition risk exposure' },
      { label: 'Technology transition risk exposure' },
      { label: 'Market transition risk exposure' },
      { label: 'Reputational transition risk assessment' },
      { label: 'Transition scenario analysis results' },
      { label: 'Stranded asset risk and write-down estimates' },
    ],
  },
  {
    id: '14',
    name: '14 Green Finance',
    fields: [
      { label: 'Total green finance portfolio (KES)' },
      { label: 'Green asset ratio' },
      { label: 'KGFT-eligible activities' },
      { label: 'KGFT-aligned activities' },
      { label: 'Green bond/sukuk issuance' },
      { label: 'Sustainability-linked instruments' },
    ],
  },
]

// ============================================================
// DATA: PCAF ASSET CLASSES (internal only)
// ============================================================
const PCAF_CLASSES: PCAFClass[] = [
  { name: 'Listed Equity & Bonds' },
  { name: 'Business Loans' },
  { name: 'Project Finance' },
  { name: 'Commercial Real Estate' },
  { name: 'Mortgages' },
  { name: 'Motor Vehicle Loans' },
  { name: 'MSME Agriculture' },
  { name: 'MSME Manufacturing' },
  { name: 'MSME Trade & Services' },
  { name: 'MSME Transport' },
  { name: 'MSME Construction' },
  { name: 'MSME Other' },
]

// ============================================================
// DATA: CRITICAL CHECKS (internal only)
// ============================================================
const CRITICAL_CHECKS: CriticalCheck[] = [
  {
    title: 'Board Climate Risk Approval',
    description: 'Has the board formally approved a climate risk policy or strategy document within the last 12 months?',
  },
  {
    title: 'Named C-Suite Accountability',
    description: 'Is there a named C-suite executive (CRO, CFO, or equivalent) with explicit climate risk accountability in their job description and KPIs?',
  },
  {
    title: 'CBK CRDF Template Population',
    description: 'Can the institution populate at least 5 of the 9 CBK CRDF templates with data from existing systems (not manual workarounds)?',
  },
  {
    title: 'Financed Emissions Baseline',
    description: 'Has the institution completed a baseline financed emissions measurement using PCAF methodology for at least its top 3 sectors by exposure?',
  },
  {
    title: 'KGFT Portfolio Classification',
    description: 'Has the institution classified at least 50% of its lending portfolio against the Kenya Green Finance Taxonomy (eligible vs. aligned)?',
  },
  {
    title: 'Climate Scenario Analysis',
    description: 'Has the institution conducted at least one quantitative climate scenario analysis covering both physical and transition risks?',
  },
  {
    title: 'Data Collection Infrastructure',
    description: 'Does the institution have structured climate data collection fields embedded in its core banking or loan origination system (not just spreadsheets)?',
  },
]

// ============================================================
// NAVIGATION SECTIONS
// ============================================================
function getSections(mode: 'bank' | 'internal') {
  const sections = [
    { id: 'info', label: 'Client Info' },
    ...PILLARS.map((p) => ({ id: p.id, label: p.name })),
  ]
  if (mode === 'internal') {
    sections.push(
      { id: 'cbk', label: 'CBK Template Gap Analysis' },
      { id: 'pcaf', label: 'PCAF Readiness' },
      { id: 'checks', label: 'Critical Checks' }
    )
  }
  sections.push({ id: 'dashboard', label: 'Dashboard' })
  return sections
}

// ============================================================
// SCORING HELPERS
// ============================================================
function ragColor(score: number): string {
  if (score >= 4) return 'text-emerald-600'
  if (score >= 2) return 'text-amber-500'
  return 'text-red-500'
}

function ragBg(score: number): string {
  if (score >= 4) return 'bg-emerald-50 border-emerald-200'
  if (score >= 2) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}

function ragBadge(score: number): string {
  if (score >= 4) return 'badge'
  if (score >= 2) return 'badge-amber'
  return 'badge-red'
}

function ragLabel(score: number): string {
  if (score >= 4) return 'GREEN'
  if (score >= 2) return 'AMBER'
  return 'RED'
}

function severityLabel(score: number): string {
  if (score < 2) return 'Critical'
  if (score < 3) return 'High'
  return 'Medium'
}

function severityColor(score: number): string {
  if (score < 2) return 'text-red-600 bg-red-50'
  if (score < 3) return 'text-amber-700 bg-amber-50'
  return 'text-yellow-700 bg-yellow-50'
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DiagnosticPageWrapper() {
  return (
    <AuthGate>
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading diagnostic...</p>
          </div>
        </div>
      }>
        <DiagnosticPage />
      </Suspense>
    </AuthGate>
  )
}

function DiagnosticPage() {
  const searchParams = useSearchParams()
  const isInternal = searchParams.get('mode') === 'internal'

  const [state, setState] = useState<DiagnosticState>({
    mode: isInternal ? 'internal' : 'bank',
    info: { bankName: '', date: new Date().toISOString().split('T')[0], lead: '', sponsor: '', scope: '' },
    answers: {},
    cbk: {},
    pcaf: {},
    checks: {},
    activeSection: 'info',
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('climate-diagnostic-state')
      if (saved) {
        const parsed = JSON.parse(saved) as DiagnosticState
        parsed.mode = isInternal ? 'internal' : 'bank'
        setState(parsed)
      }
    } catch {
      // ignore parse errors
    }
  }, [isInternal])

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('climate-diagnostic-state', JSON.stringify(state))
    } catch {
      // ignore storage errors
    }
  }, [state])

  const updateInfo = useCallback((field: keyof ClientInfo, value: string) => {
    setState((prev) => ({ ...prev, info: { ...prev.info, [field]: value } }))
  }, [])

  const setAnswer = useCallback((key: string, value: number) => {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [key]: value } }))
  }, [])

  const setCbk = useCallback((key: string, value: string) => {
    setState((prev) => ({ ...prev, cbk: { ...prev.cbk, [key]: value } }))
  }, [])

  const setPcaf = useCallback((key: string, value: string) => {
    setState((prev) => ({ ...prev, pcaf: { ...prev.pcaf, [key]: value } }))
  }, [])

  const setCheck = useCallback((idx: number, value: string) => {
    setState((prev) => ({ ...prev, checks: { ...prev.checks, [idx]: value } }))
  }, [])

  const setActiveSection = useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeSection: id }))
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // ---- Scoring ----
  const pillarScores = useMemo(() => {
    return PILLARS.map((pillar) => {
      let total = 0
      let count = 0
      pillar.categories.forEach((cat) => {
        cat.questions.forEach((_, qi) => {
          const key = `${pillar.id}_${cat.name}_${qi}`
          if (state.answers[key] !== undefined) {
            total += state.answers[key] + 1 // options are 0-indexed, scores are 1-5
            count++
          }
        })
      })
      const totalQuestions = pillar.categories.reduce((s, c) => s + c.questions.length, 0)
      return {
        pillarId: pillar.id,
        pillarName: pillar.name,
        score: count > 0 ? total / count : 0,
        answered: count,
        total: totalQuestions,
      }
    })
  }, [state.answers])

  const overallScore = useMemo(() => {
    const scored = pillarScores.filter((p) => p.answered > 0)
    if (scored.length === 0) return 0
    return scored.reduce((s, p) => s + p.score, 0) / scored.length
  }, [pillarScores])

  const totalAnswered = useMemo(() => {
    return pillarScores.reduce((s, p) => s + p.answered, 0)
  }, [pillarScores])

  const totalQuestions = useMemo(() => {
    return pillarScores.reduce((s, p) => s + p.total, 0)
  }, [pillarScores])

  // Category scores for gap register
  const categoryScores = useMemo(() => {
    const results: { pillar: string; category: string; score: number; answered: number; total: number }[] = []
    PILLARS.forEach((pillar) => {
      pillar.categories.forEach((cat) => {
        let total = 0
        let count = 0
        cat.questions.forEach((_, qi) => {
          const key = `${pillar.id}_${cat.name}_${qi}`
          if (state.answers[key] !== undefined) {
            total += state.answers[key] + 1
            count++
          }
        })
        results.push({
          pillar: pillar.shortName,
          category: cat.name,
          score: count > 0 ? total / count : 0,
          answered: count,
          total: cat.questions.length,
        })
      })
    })
    return results
  }, [state.answers])

  // Progress percentage
  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0
    return Math.round((totalAnswered / totalQuestions) * 100)
  }, [totalAnswered, totalQuestions])

  // Pillar nav score for sidebar badge
  function getPillarNavScore(pillarId: string): number | null {
    const ps = pillarScores.find((p) => p.pillarId === pillarId)
    if (!ps || ps.answered === 0) return null
    return ps.score
  }

  // Export JSON
  function exportAssessment() {
    const data = {
      exportDate: new Date().toISOString(),
      clientInfo: state.info,
      mode: state.mode,
      pillarScores: pillarScores.map((ps) => ({
        ...ps,
        rag: ps.answered > 0 ? ragLabel(ps.score) : 'N/A',
      })),
      overallScore: overallScore.toFixed(2),
      overallRAG: totalAnswered > 0 ? ragLabel(overallScore) : 'N/A',
      answers: state.answers,
      ...(state.mode === 'internal' ? { cbk: state.cbk, pcaf: state.pcaf, checks: state.checks } : {}),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `climate-diagnostic-${state.info.bankName || 'assessment'}-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const sections = getSections(state.mode)

  // ============================================================
  // RENDER: SIDEBAR NAV
  // ============================================================
  function renderSidebar() {
    return (
      <nav className="space-y-1">
        {sections.map((sec) => {
          const isActive = state.activeSection === sec.id
          const isPillar = sec.id.startsWith('p')
          const pillarScore = isPillar ? getPillarNavScore(sec.id) : null

          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between gap-2 ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
              }`}
            >
              <span className="truncate">{sec.label}</span>
              {isPillar && pillarScore !== null && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${ragBadge(pillarScore)}`}>
                  {pillarScore.toFixed(1)}
                </span>
              )}
              {isPillar && pillarScore === null && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 flex-shrink-0">--</span>
              )}
            </button>
          )
        })}
      </nav>
    )
  }

  // ============================================================
  // RENDER: CLIENT INFO
  // ============================================================
  function renderClientInfo() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Client Information</h2>
          <p className="text-gray-500 text-sm">Enter the details of the institution being assessed.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bank / Institution Name</label>
            <input
              type="text"
              className="input-field"
              value={state.info.bankName}
              onChange={(e) => updateInfo('bankName', e.target.value)}
              placeholder="e.g. Kenya Commercial Bank"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Assessment Date</label>
            <input
              type="date"
              className="input-field"
              value={state.info.date}
              onChange={(e) => updateInfo('date', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Assessment Lead</label>
            <input
              type="text"
              className="input-field"
              value={state.info.lead}
              onChange={(e) => updateInfo('lead', e.target.value)}
              placeholder="e.g. Mary Ndinda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Executive Sponsor</label>
            <input
              type="text"
              className="input-field"
              value={state.info.sponsor}
              onChange={(e) => updateInfo('sponsor', e.target.value)}
              placeholder="e.g. Chief Risk Officer"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Scope</label>
          <select
            className="select-field"
            value={state.info.scope}
            onChange={(e) => updateInfo('scope', e.target.value)}
          >
            <option value="" disabled>Select assessment scope</option>
            <option value="Full Portfolio">Full Portfolio</option>
            <option value="MSME Only">MSME Only</option>
            <option value="Corporate & Commercial">Corporate &amp; Commercial</option>
          </select>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: PILLAR SECTION
  // ============================================================
  function renderPillar(pillar: Pillar) {
    const ps = pillarScores.find((p) => p.pillarId === pillar.id)

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{pillar.name}</h2>
          <p className="text-gray-500 text-sm">{pillar.description}</p>
          {ps && ps.answered > 0 && (
            <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg border ${ragBg(ps.score)}`}>
              <span className={`text-sm font-bold ${ragColor(ps.score)}`}>{ps.score.toFixed(1)} / 5.0</span>
              <span className={`text-xs font-medium ${ragColor(ps.score)}`}>{ragLabel(ps.score)}</span>
              <span className="text-gray-400 text-xs">({ps.answered}/{ps.total} answered)</span>
            </div>
          )}
        </div>

        {pillar.categories.map((cat) => {
          // Category subtotal
          let catTotal = 0
          let catCount = 0
          cat.questions.forEach((_, qi) => {
            const key = `${pillar.id}_${cat.name}_${qi}`
            if (state.answers[key] !== undefined) {
              catTotal += state.answers[key] + 1
              catCount++
            }
          })
          const catScore = catCount > 0 ? catTotal / catCount : null

          return (
            <div key={cat.name} className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">{cat.name}</h3>
                {catScore !== null && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ragBadge(catScore)}`}>
                    {catScore.toFixed(1)}
                  </span>
                )}
              </div>

              {cat.questions.map((q, qi) => {
                const key = `${pillar.id}_${cat.name}_${qi}`
                const selected = state.answers[key]

                return (
                  <div key={qi} className="card">
                    <p className="text-sm font-medium text-gray-800 mb-4">
                      {qi + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {q.options.map((opt, oi) => {
                        const isSelected = selected === oi
                        const scoreVal = oi + 1
                        let optBg = 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-600'
                        if (isSelected) {
                          if (scoreVal >= 4) optBg = 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-400'
                          else if (scoreVal >= 2) optBg = 'bg-amber-50 border-amber-400 text-amber-800 ring-1 ring-amber-400'
                          else optBg = 'bg-red-50 border-red-400 text-red-800 ring-1 ring-red-400'
                        }

                        return (
                          <button
                            key={oi}
                            type="button"
                            onClick={() => setAnswer(key, oi)}
                            className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all text-left ${optBg}`}
                          >
                            <span className="block text-[10px] font-bold mb-0.5 opacity-60">{scoreVal}/5</span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  // ============================================================
  // RENDER: CBK TEMPLATE GAP ANALYSIS (internal only)
  // ============================================================
  function renderCBK() {
    // Compute completion stats
    const totalFields = CBK_TEMPLATES.reduce((s, t) => s + t.fields.length, 0)
    let filledFull = 0
    let filledPartial = 0
    let filledNone = 0
    CBK_TEMPLATES.forEach((t) => {
      t.fields.forEach((_, fi) => {
        const key = `${t.id}_${fi}`
        const val = state.cbk[key]
        if (val === 'full') filledFull++
        else if (val === 'partial') filledPartial++
        else if (val === 'none') filledNone++
      })
    })
    const filledCount = filledFull + filledPartial + filledNone
    const completionPct = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">CBK Template Gap Analysis</h2>
          <p className="text-gray-500 text-sm">
            Assess your institution&apos;s ability to populate each of the 9 CBK CRDF disclosure templates.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Completion: {filledCount} / {totalFields} fields assessed</span>
              <span className="font-medium text-gray-900">{completionPct}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Full: {filledFull}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Partial: {filledPartial}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> None: {filledNone}</span>
            </div>
          </div>
        </div>

        {CBK_TEMPLATES.map((template) => (
          <div key={template.id} className="card">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Template {template.name}</h3>
            <div className="space-y-3">
              {template.fields.map((field, fi) => {
                const key = `${template.id}_${fi}`
                const val = state.cbk[key] || ''

                return (
                  <div key={fi} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700 flex-1">{field.label}</span>
                    <div className="flex gap-2 flex-shrink-0">
                      {(['full', 'partial', 'none'] as const).map((status) => {
                        const isSelected = val === status
                        let btnStyle = 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                        if (isSelected && status === 'full') btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-700 ring-1 ring-emerald-400'
                        if (isSelected && status === 'partial') btnStyle = 'bg-amber-50 border-amber-400 text-amber-700 ring-1 ring-amber-400'
                        if (isSelected && status === 'none') btnStyle = 'bg-red-50 border-red-400 text-red-700 ring-1 ring-red-400'

                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setCbk(key, status)}
                            className={`px-3 py-1 rounded-md border text-xs font-medium capitalize transition-all ${btnStyle}`}
                          >
                            {status}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ============================================================
  // RENDER: PCAF READINESS (internal only)
  // ============================================================
  function renderPCAF() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">PCAF Readiness Assessment</h2>
          <p className="text-gray-500 text-sm">
            Evaluate data quality, availability, and exposure for each PCAF asset class.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-gray-600 font-semibold">Asset Class</th>
                <th className="text-left py-3 px-2 text-gray-600 font-semibold">Data Quality (1-5)</th>
                <th className="text-left py-3 px-2 text-gray-600 font-semibold">Data Availability</th>
                <th className="text-left py-3 px-2 text-gray-600 font-semibold">Exposure (KES M)</th>
                <th className="text-left py-3 px-2 text-gray-600 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {PCAF_CLASSES.map((ac, idx) => {
                const dqKey = `pcaf_dq_${idx}`
                const daKey = `pcaf_da_${idx}`
                const exKey = `pcaf_ex_${idx}`
                const ntKey = `pcaf_nt_${idx}`

                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-800">{ac.name}</td>
                    <td className="py-3 px-2">
                      <select
                        className="select-field text-xs py-1.5"
                        value={state.pcaf[dqKey] || ''}
                        onChange={(e) => setPcaf(dqKey, e.target.value)}
                      >
                        <option value="" disabled>Score</option>
                        <option value="1">1 - Verified</option>
                        <option value="2">2 - Audited</option>
                        <option value="3">3 - Activity data</option>
                        <option value="4">4 - Sector avg</option>
                        <option value="5">5 - Regional avg</option>
                      </select>
                    </td>
                    <td className="py-3 px-2">
                      <select
                        className="select-field text-xs py-1.5"
                        value={state.pcaf[daKey] || ''}
                        onChange={(e) => setPcaf(daKey, e.target.value)}
                      >
                        <option value="" disabled>Select</option>
                        <option value="available">Available</option>
                        <option value="partial">Partial</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="number"
                        className="input-field text-xs py-1.5 w-28"
                        placeholder="0"
                        value={state.pcaf[exKey] || ''}
                        onChange={(e) => setPcaf(exKey, e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        className="input-field text-xs py-1.5"
                        placeholder="Notes..."
                        value={state.pcaf[ntKey] || ''}
                        onChange={(e) => setPcaf(ntKey, e.target.value)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: CRITICAL CHECKS (internal only)
  // ============================================================
  function renderChecks() {
    const passCount = Object.values(state.checks).filter((v) => v === 'pass').length
    const failCount = Object.values(state.checks).filter((v) => v === 'fail').length
    const partialCount = Object.values(state.checks).filter((v) => v === 'partial').length

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Critical Compliance Checks</h2>
          <p className="text-gray-500 text-sm">
            These are non-negotiable items for CBK CRDF compliance. Each must be addressed.
          </p>
          <div className="flex gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pass: {passCount}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Partial: {partialCount}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Fail: {failCount}</span>
          </div>
        </div>

        {CRITICAL_CHECKS.map((check, idx) => {
          const val = state.checks[idx] || ''

          return (
            <div key={idx} className="card">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{idx + 1}. {check.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{check.description}</p>
              <div className="flex gap-2">
                {(['pass', 'partial', 'fail'] as const).map((status) => {
                  const isSelected = val === status
                  let btnStyle = 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                  if (isSelected && status === 'pass') btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-700 ring-1 ring-emerald-400'
                  if (isSelected && status === 'partial') btnStyle = 'bg-amber-50 border-amber-400 text-amber-700 ring-1 ring-amber-400'
                  if (isSelected && status === 'fail') btnStyle = 'bg-red-50 border-red-400 text-red-700 ring-1 ring-red-400'

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setCheck(idx, status)}
                      className={`px-4 py-2 rounded-lg border text-xs font-semibold capitalize transition-all ${btnStyle}`}
                    >
                      {status}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // ============================================================
  // RENDER: DASHBOARD
  // ============================================================
  function renderDashboard() {
    const gaps = categoryScores.filter((c) => c.answered > 0 && c.score < 4.0).sort((a, b) => a.score - b.score)

    const roadmapPhases = [
      {
        phase: 'Phase 1: Foundation',
        timeline: 'Months 1-3',
        items: [
          'Establish board climate risk oversight committee',
          'Appoint named C-suite climate risk executive',
          'Complete gap analysis against CBK CRDF requirements',
          'Begin KGFT awareness training for key teams',
        ],
      },
      {
        phase: 'Phase 2: Data & Systems',
        timeline: 'Months 4-6',
        items: [
          'Embed climate data fields in core banking system',
          'Initiate borrower climate data collection',
          'Establish Scope 1 & 2 emissions baseline',
          'Begin PCAF financed emissions measurement for top sectors',
        ],
      },
      {
        phase: 'Phase 3: Integration',
        timeline: 'Months 7-9',
        items: [
          'Integrate climate risk into ERM framework',
          'Conduct first climate scenario analysis',
          'Map portfolio against Kenya Green Finance Taxonomy',
          'Develop climate risk dashboard for management',
        ],
      },
      {
        phase: 'Phase 4: Reporting & Compliance',
        timeline: 'Months 10-12',
        items: [
          'Populate all 9 CBK CRDF templates',
          'Complete IFRS S1/S2 alignment',
          'Set science-based emission reduction targets',
          'Submit first climate risk disclosure to CBK',
        ],
      },
    ]

    return (
      <div className="space-y-8 print:space-y-6" id="dashboard-print">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Assessment Dashboard</h2>
            <p className="text-gray-500 text-sm">
              {state.info.bankName ? `${state.info.bankName} \u2014 ` : ''}Climate Risk Readiness Assessment Results
            </p>
          </div>
          <button
            type="button"
            onClick={exportAssessment}
            className="btn-secondary text-sm print:hidden"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export Assessment
          </button>
        </div>

        {/* Overall Score */}
        <div className={`rounded-2xl border p-8 text-center ${totalAnswered > 0 ? ragBg(overallScore) : 'bg-gray-50 border-gray-200'}`}>
          <p className="text-sm font-medium text-gray-500 mb-2">Overall Readiness Score</p>
          <p className={`text-6xl font-black ${totalAnswered > 0 ? ragColor(overallScore) : 'text-gray-300'}`}>
            {totalAnswered > 0 ? overallScore.toFixed(1) : '--'}
          </p>
          <p className="text-lg font-medium text-gray-400 mt-1">/ 5.0</p>
          {totalAnswered > 0 && (
            <span className={`inline-block mt-3 text-sm font-bold px-4 py-1 rounded-full ${ragBadge(overallScore)}`}>
              {ragLabel(overallScore)}
            </span>
          )}
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat-card text-center">
            <p className="text-sm text-gray-500 mb-1">Overall Score</p>
            <p className={`text-3xl font-bold ${totalAnswered > 0 ? ragColor(overallScore) : 'text-gray-300'}`}>
              {totalAnswered > 0 ? overallScore.toFixed(2) : '--'}
            </p>
          </div>
          <div className="stat-card text-center">
            <p className="text-sm text-gray-500 mb-1">Questions Answered</p>
            <p className="text-3xl font-bold text-gray-900">{totalAnswered} <span className="text-lg text-gray-400">/ {totalQuestions}</span></p>
          </div>
          <div className="stat-card text-center">
            <p className="text-sm text-gray-500 mb-1">Gap Count</p>
            <p className="text-3xl font-bold text-amber-600">{gaps.length}</p>
          </div>
        </div>

        {/* Pillar Score Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pillar Scores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillarScores.map((ps) => {
              const pillar = PILLARS.find((p) => p.id === ps.pillarId)!
              return (
                <div key={ps.pillarId} className={`rounded-xl border p-5 ${ps.answered > 0 ? ragBg(ps.score) : 'bg-gray-50 border-gray-200'}`}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{pillar.shortName}</p>
                  <p className={`text-3xl font-bold ${ps.answered > 0 ? ragColor(ps.score) : 'text-gray-300'}`}>
                    {ps.answered > 0 ? ps.score.toFixed(1) : '--'}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {ps.answered > 0 && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ragBadge(ps.score)}`}>{ragLabel(ps.score)}</span>
                    )}
                    <span className="text-xs text-gray-400">{ps.answered}/{ps.total} answered</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Gap Register */}
        {gaps.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gap Register</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Severity</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Pillar</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Score</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {gaps.map((g, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${severityColor(g.score)}`}>
                          {severityLabel(g.score)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{g.pillar}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium">{g.category}</td>
                      <td className={`py-3 px-4 font-bold ${ragColor(g.score)}`}>{g.score.toFixed(1)}</td>
                      <td className="py-3 px-4 text-gray-500">
                        {g.score < 2 ? 'Q1 2027' : g.score < 3 ? 'Q2 2027' : 'Q3 2027'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 12-Month Roadmap */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">12-Month Implementation Roadmap</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roadmapPhases.map((phase, idx) => (
              <div key={idx} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{phase.phase}</h4>
                    <p className="text-xs text-gray-500">{phase.timeline}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-2 text-xs text-gray-600">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: ACTIVE SECTION
  // ============================================================
  function renderActiveSection() {
    if (state.activeSection === 'info') return renderClientInfo()
    if (state.activeSection === 'dashboard') return renderDashboard()
    if (state.activeSection === 'cbk' && state.mode === 'internal') return renderCBK()
    if (state.activeSection === 'pcaf' && state.mode === 'internal') return renderPCAF()
    if (state.activeSection === 'checks' && state.mode === 'internal') return renderChecks()

    const pillar = PILLARS.find((p) => p.id === state.activeSection)
    if (pillar) return renderPillar(pillar)

    return renderClientInfo()
  }

  // Nav helpers
  function goNext() {
    const idx = sections.findIndex((s) => s.id === state.activeSection)
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1].id)
    }
  }

  function goPrev() {
    const idx = sections.findIndex((s) => s.id === state.activeSection)
    if (idx > 0) {
      setActiveSection(sections[idx - 1].id)
    }
  }

  const currentIdx = sections.findIndex((s) => s.id === state.activeSection)
  const isFirst = currentIdx <= 0
  const isLast = currentIdx >= sections.length - 1

  // ============================================================
  // MAIN LAYOUT
  // ============================================================
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30 print:static">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Climate Risk <span className="gradient-text">Readiness Diagnostic</span>
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {state.mode === 'internal' ? 'Internal Assessment Mode' : 'Bank Assessment Mode'}
                  {state.info.bankName ? ` \u2014 ${state.info.bankName}` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Progress bar */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">{progress}%</span>
              </div>
              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              {renderSidebar()}
              <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">Auto-saved.</span> Your progress is saved to this browser automatically.
                </p>
              </div>
            </div>
          </aside>

          {/* Sidebar - mobile overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900">Navigation</h3>
                  <button type="button" onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {renderSidebar()}
              </div>
            </div>
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="card">
              {renderActiveSection()}

              {/* Section navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 print:hidden">
                {!isFirst ? (
                  <button type="button" onClick={goPrev} className="btn-secondary text-sm">
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Previous
                  </button>
                ) : (
                  <div />
                )}
                {!isLast ? (
                  <button type="button" onClick={goNext} className="btn-primary text-sm">
                    Next Section
                    <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                ) : (
                  <button type="button" onClick={exportAssessment} className="btn-primary text-sm">
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Export Assessment
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
