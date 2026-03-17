'use client'

import { useState, useEffect, FormEvent } from 'react'

const TABS = ['Overview', 'For Banks', 'Market', 'Timeline', 'Africa', 'Why Us', 'Diagnostic', 'Get Started'] as const
type Tab = typeof TABS[number]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    orgType: '',
    journeyStage: '',
    biggestChallenge: '',
    notes: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [showInterestModal, setShowInterestModal] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('interest_answered')) {
      const timer = setTimeout(() => setShowInterestModal(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleInterestSelect = (interest: string) => {
    sessionStorage.setItem('interest_answered', 'true')
    setShowInterestModal(false)
    fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Visitor', email: '', organisation: '', orgType: '', journeyStage: '', biggestChallenge: interest, notes: 'Auto: interest question' }),
    }).catch(() => {})
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', organisation: '', orgType: '', journeyStage: '', biggestChallenge: '', notes: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ─── INTEREST QUESTION MODAL ─── */}
      {showInterestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to CFOIP</h2>
            <p className="text-gray-600 text-sm mb-6">What brought you here today?</p>
            <div className="space-y-2">
              {[
                'CBK compliance deadline pressure',
                'Board or management directive',
                'Preparing for climate risk disclosure',
                'Exploring what others in the sector are doing',
                'DFI or investor requirement',
                'General curiosity about climate finance',
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInterestSelect(option)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-sm text-gray-700 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
            <button onClick={() => { sessionStorage.setItem('interest_answered', 'true'); setShowInterestModal(false) }} className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors w-full text-center">
              Skip
            </button>
          </div>
        </div>
      )}

      {/* ─── HEADER / NAV ─── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold gradient-text tracking-tight">CFOIP</span>
              <span className="hidden sm:inline text-sm text-gray-500 border-l border-gray-300 pl-3">Climate Risk &amp; Compliance</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="badge">IFRS S1/S2</span>
              <span className="badge">TCFD/PCAF</span>
              <span className="badge-amber">KGFT Mapped</span>
              <span className="badge">DFI Ready</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-1 overflow-x-auto pb-0 -mb-px scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? 'tab-button-active' : 'tab-button'}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ─── HERO (always visible) ─── */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Climate Risk Is Reshaping<br />
            <span className="gradient-text">Africa&apos;s Financial Sector</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Starting in Kenya and scaling across the continent. Banks, SACCOs, insurers, pension funds, DFIs, and climate funds all need reliable climate risk data. We&apos;re building the infrastructure to collect, analyse, and report it.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">1,500+</div>
              <div className="text-sm text-gray-600">Institutions in Kenya</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">$4B+</div>
              <div className="text-sm text-gray-600">Climate Finance Flowing</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">8</div>
              <div className="text-sm text-gray-600">Sectors Covered</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">10+</div>
              <div className="text-sm text-gray-600">African Markets</div>
            </div>
          </div>

          <div className="urgency-bar text-sm md:text-base">
            <span className="font-semibold">Deadline Alert:</span> Kenya Green Finance Taxonomy (KGFT) and Climate Risk Disclosure Framework launching Apr 2025. IFRS S1 &amp; S2 adoption for <span className="font-bold text-red-600">ALL Public Interest Entities</span> from Jan 2027.
          </div>
        </section>

        {/* ─── TAB CONTENT ─── */}
        <div className="animate-fade-in" key={activeTab}>

          {/* ============ OVERVIEW ============ */}
          {activeTab === 'Overview' && (
            <div className="space-y-16">
              {/* Intro */}
              <section>
                <h2 className="section-heading text-center">Climate Data Is the <span className="gradient-text">New Infrastructure</span></h2>
                <p className="section-subheading mx-auto text-center mb-4">
                  Globally, regulators are mandating climate-related financial disclosures. In Kenya, the Central Bank, Capital Markets Authority, and Insurance Regulatory Authority are all moving. Every financial institution needs a data backbone for climate risk — and it doesn&apos;t exist yet. That&apos;s what we&apos;re building.
                </p>
              </section>

              {/* Who We Serve */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Who We Serve</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[
                    { name: 'Commercial Banks', count: '39 Licensed', assets: 'KSH 7.2T', icon: '🏦' },
                    { name: 'DT-SACCOs', count: '176', assets: 'KSH 900B+', icon: '🤝' },
                    { name: 'Insurance Companies', count: '62', assets: 'KSH 320B+', icon: '🛡️' },
                    { name: 'Pension Funds', count: '1,200+', assets: 'KSH 1.8T+', icon: '📊' },
                    { name: 'Microfinance Banks', count: '14', assets: 'KSH 120B+', icon: '💳' },
                    { name: 'NSE-Listed Companies', count: '~65', assets: 'KSH 2.1T+', icon: '📈' },
                    { name: 'DFIs & Climate Funds', count: 'Global', assets: '$4B+', icon: '🌍' },
                  ].map((segment) => (
                    <div key={segment.name} className="card group">
                      <div className="text-3xl mb-3">{segment.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">{segment.name}</h4>
                      <p className="text-sm text-emerald-600 font-medium">{segment.count}</p>
                      <p className="text-sm text-gray-600">Total Assets: {segment.assets}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Our Platform */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Platform: Three Layers</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card glow-green">
                    <div className="text-emerald-600 font-bold text-lg mb-3">Layer 1: Data Collection</div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Standardised templates for Scope 1, 2, and 3 emissions. Sector-specific intake forms aligned to CBK CRDF, KGFT taxonomy mapping, and PCAF asset-class methodology. Integrates with existing core banking, insurance, and pension administration systems.
                    </p>
                  </div>
                  <div className="card glow-green">
                    <div className="text-emerald-600 font-bold text-lg mb-3">Layer 2: Reporting Engine</div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Auto-generates IFRS S2 disclosures, TCFD-aligned reports, KGFT taxonomy mapping tables, PCAF financed emissions reports, and board-ready risk summaries. Outputs in PDF, Excel, and API-ready JSON for regulator portals.
                    </p>
                  </div>
                  <div className="card glow-green">
                    <div className="text-emerald-600 font-bold text-lg mb-3">Layer 3: Intelligence Dashboard</div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Real-time climate risk scoring across portfolios. Scenario analysis for physical and transition risks. Peer benchmarking across Kenya&apos;s financial sector. Trend tracking and early-warning alerts for regulatory deadlines.
                    </p>
                  </div>
                </div>
              </section>

              {/* The Climate Data Gap */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">The Climate Data Gap</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat-card">
                    <div className="text-4xl font-bold text-red-600 mb-2">0%</div>
                    <div className="text-sm text-gray-600">Kenyan banks with full Scope 3 data</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-4xl font-bold text-amber-400 mb-2">3</div>
                    <div className="text-sm text-gray-600">Banks publishing any TCFD report</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-4xl font-bold text-red-600 mb-2">85%</div>
                    <div className="text-sm text-gray-600">Institutions with no climate data process</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">18mo</div>
                    <div className="text-sm text-gray-600">Until IFRS S1/S2 mandatory for PIEs</div>
                  </div>
                </div>
              </section>

              {/* Why Partner With Us */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Partner With Us</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Regulatory Alignment', desc: 'Built specifically around CBK CRDF, KGFT, IFRS S1/S2, TCFD, and PCAF. Not a generic ESG bolt-on.' },
                    { title: 'Kenya-First Design', desc: 'Every template, taxonomy mapping, and benchmark uses Kenyan data, Kenyan regulations, and Kenyan sector structures.' },
                    { title: 'Speed to Compliance', desc: 'Pre-built templates and automated report generation mean institutions can go from zero to first disclosure in weeks, not years.' },
                    { title: 'Multi-Stakeholder Platform', desc: 'One platform that serves banks, SACCOs, insurers, pension funds, and their regulators. Enables cross-sector data aggregation.' },
                    { title: 'DFI & Climate Fund Ready', desc: 'Built to the reporting standards that IFC, FMO, Proparco, GCF, and GFCR already require. Unlock climate capital faster.' },
                    { title: 'Affordable & Scalable', desc: 'SaaS pricing tiered by institution size. A Tier 3 bank or mid-size SACCO pays a fraction of what a Tier 1 bank pays.' },
                  ].map((item) => (
                    <div key={item.title} className="card">
                      <h4 className="font-semibold text-emerald-600 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ============ FOR BANKS ============ */}
          {activeTab === 'For Banks' && (
            <div className="space-y-16">
              <section>
                <h2 className="section-heading text-center">Climate Risk Reporting for <span className="gradient-text">Kenyan Banks</span></h2>
                <p className="section-subheading mx-auto text-center mb-8">
                  The CBK has issued the Climate Risk Disclosure Framework. IFRS S2 becomes mandatory for all PIEs in January 2027. Every bank in Kenya needs a climate risk data and reporting capability. Most don&apos;t have one yet.
                </p>
              </section>

              {/* What Banks Need */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Banks Need to Produce</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { framework: 'CBK CRDF', desc: 'Climate Risk Disclosure Framework — governance, strategy, risk management, metrics & targets for climate-related risks and opportunities.' },
                    { framework: 'IFRS S2', desc: 'Climate-related disclosures under ISSB standards — physical risks, transition risks, climate opportunities, Scope 1/2/3 emissions.' },
                    { framework: 'KGFT', desc: 'Kenya Green Finance Taxonomy — classify lending portfolios against green taxonomy categories. Required for CRDF alignment.' },
                    { framework: 'PCAF', desc: 'Partnership for Carbon Accounting Financials — calculate financed emissions across asset classes using PCAF methodology.' },
                    { framework: 'Board Reporting', desc: 'Board-level climate risk dashboards showing portfolio exposure, scenario analysis results, and regulatory compliance status.' },
                  ].map((item) => (
                    <div key={item.framework} className="card">
                      <span className="badge mb-3">{item.framework}</span>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Where Banks Get Stuck */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Where Banks Get Stuck</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { pain: 'No Climate Data Pipeline', detail: 'Core banking systems don\'t capture Scope 1, 2, or 3 data. There\'s no structured process to collect emissions data from borrowers or internal operations.' },
                    { pain: 'Fragmented Frameworks', detail: 'CBK CRDF, IFRS S2, KGFT, PCAF, and TCFD all have different requirements. Banks waste months trying to reconcile them manually.' },
                    { pain: 'Talent Gap', detail: 'Climate risk is a new discipline. Most banks have 0-1 staff with climate disclosure expertise. External consultants charge $200K+ per engagement.' },
                    { pain: 'No Benchmarking', detail: 'Banks can\'t compare their climate risk posture against peers. Regulators can\'t aggregate sector-wide data. Investors lack standardised comparisons.' },
                  ].map((item) => (
                    <div key={item.pain} className="card border-red-500/20">
                      <h4 className="font-semibold text-red-600 mb-2">{item.pain}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CFOIP Solution */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How CFOIP Solves This</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card border-emerald-500/20">
                    <div className="text-emerald-600 font-bold text-lg mb-3">1. Collect</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Standardised data intake templates for Scope 1 (direct operations), Scope 2 (purchased energy), and Scope 3 (financed emissions). Pre-mapped to PCAF asset classes. API connectors for core banking data extraction. Borrower-level climate questionnaires.
                    </p>
                  </div>
                  <div className="card border-emerald-500/20">
                    <div className="text-emerald-600 font-bold text-lg mb-3">2. Analyse</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Automated KGFT taxonomy classification of loan portfolios. Physical risk scoring using county-level climate hazard data (drought, floods, heat). Transition risk modelling across sectors. Portfolio concentration analysis by climate-sensitive sector.
                    </p>
                  </div>
                  <div className="card border-emerald-500/20">
                    <div className="text-emerald-600 font-bold text-lg mb-3">3. Report</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      One-click generation of IFRS S2 disclosures, CRDF submissions, KGFT alignment reports, PCAF financed emissions statements, and board-ready executive summaries. Multi-format output: PDF, Excel, and structured data for regulator submission portals.
                    </p>
                  </div>
                </div>
              </section>

              {/* All 39 Banks */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">All 39 Licensed Banks in Kenya</h3>

                {/* Tier 1 */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                    <span className="badge">Tier 1</span> Large Banks (9)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-600 border-b border-gray-200">
                          <th className="pb-3 pr-4">Bank</th>
                          <th className="pb-3 pr-4">Assets (KSH)</th>
                          <th className="pb-3 pr-4">Ownership</th>
                          <th className="pb-3">Sustainability Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        {[
                          { bank: 'KCB Group', assets: '1,400B+', ownership: 'Listed (NSE)', status: 'TCFD report published, GRI aligned' },
                          { bank: 'Equity Group', assets: '1,350B+', ownership: 'Listed (NSE)', status: 'Sustainability report, GCF partner' },
                          { bank: 'NCBA Group', assets: '650B+', ownership: 'Listed (NSE)', status: 'ESG framework in progress' },
                          { bank: 'Co-operative Bank', assets: '600B+', ownership: 'Listed (NSE)', status: 'Sustainability report published' },
                          { bank: 'Absa Bank Kenya', assets: '500B+', ownership: 'Absa Group (SA)', status: 'Group-level TCFD, local gap' },
                          { bank: 'Standard Chartered', assets: '400B+', ownership: 'SC plc (UK)', status: 'Group TCFD, local disclosure needed' },
                          { bank: 'Stanbic Bank', assets: '380B+', ownership: 'Standard Bank (SA)', status: 'Group ESG framework, local gap' },
                          { bank: 'DTB Bank', assets: '350B+', ownership: 'Aga Khan (Listed)', status: 'Limited ESG disclosure' },
                          { bank: 'I&M Group', assets: '320B+', ownership: 'Listed (NSE)', status: 'Sustainability reporting initiated' },
                        ].map((row) => (
                          <tr key={row.bank} className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                            <td className="py-3 pr-4 font-medium text-gray-900">{row.bank}</td>
                            <td className="py-3 pr-4">{row.assets}</td>
                            <td className="py-3 pr-4">{row.ownership}</td>
                            <td className="py-3">{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                    <span className="badge-amber">Tier 2</span> Mid-Size Banks (10)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-600 border-b border-gray-200">
                          <th className="pb-3 pr-4">Bank</th>
                          <th className="pb-3 pr-4">Assets (KSH)</th>
                          <th className="pb-3 pr-4">Ownership</th>
                          <th className="pb-3">Sustainability Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        {[
                          { bank: 'Family Bank', assets: '150B+', ownership: 'Listed (NSE)', status: 'Limited ESG reporting' },
                          { bank: 'Bank of Baroda', assets: '120B+', ownership: 'BOB India', status: 'Parent ESG, local gap' },
                          { bank: 'Prime Bank', assets: '110B+', ownership: 'Private', status: 'No formal ESG framework' },
                          { bank: 'National Bank (NBK)', assets: '100B+', ownership: 'KCB subsidiary', status: 'Under KCB group framework' },
                          { bank: 'SBM Bank', assets: '95B+', ownership: 'SBM Holdings (Mauritius)', status: 'Parent ESG, local minimal' },
                          { bank: 'Victoria Commercial', assets: '80B+', ownership: 'Private', status: 'No formal ESG framework' },
                          { bank: 'Guardian Bank', assets: '45B+', ownership: 'Private', status: 'No ESG reporting' },
                          { bank: 'Mayfair CIB', assets: '40B+', ownership: 'Private', status: 'No ESG reporting' },
                          { bank: 'Kingdom Bank', assets: '35B+', ownership: 'Private/Co-op', status: 'No ESG reporting' },
                          { bank: 'Gulf African Bank', assets: '35B+', ownership: 'Islamic/Private', status: 'No ESG reporting' },
                        ].map((row) => (
                          <tr key={row.bank} className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                            <td className="py-3 pr-4 font-medium text-gray-900">{row.bank}</td>
                            <td className="py-3 pr-4">{row.assets}</td>
                            <td className="py-3 pr-4">{row.ownership}</td>
                            <td className="py-3">{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tier 3 */}
                <div>
                  <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                    <span className="badge-red">Tier 3</span> Small Banks (20)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-600 border-b border-gray-200">
                          <th className="pb-3 pr-4">Bank</th>
                          <th className="pb-3 pr-4">Assets (KSH)</th>
                          <th className="pb-3 pr-4">Ownership</th>
                          <th className="pb-3">Sustainability Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        {[
                          { bank: 'Sidian Bank', assets: '30B+', ownership: 'Access Corp (Nigeria)', status: 'No local ESG framework' },
                          { bank: 'Credit Bank', assets: '28B+', ownership: 'Private', status: 'No ESG reporting' },
                          { bank: 'Development Bank (DBK)', assets: '25B+', ownership: 'Government', status: 'Development mandate, no climate reporting' },
                          { bank: 'Habib Bank AG Zurich', assets: '22B+', ownership: 'Habib Group (Switzerland)', status: 'No local ESG disclosure' },
                          { bank: 'Middle East Bank', assets: '18B+', ownership: 'Private', status: 'No ESG reporting' },
                          { bank: 'Paramount Bank', assets: '15B+', ownership: 'Private', status: 'No ESG reporting' },
                          { bank: 'M-Oriental Bank', assets: '14B+', ownership: 'Private', status: 'No ESG reporting' },
                          { bank: 'First Community Bank', assets: '13B+', ownership: 'Islamic/Private', status: 'No ESG reporting' },
                          { bank: 'Consolidated Bank', assets: '12B+', ownership: 'Government', status: 'No ESG reporting' },
                          { bank: 'UBA Kenya', assets: '10B+', ownership: 'UBA Group (Nigeria)', status: 'Parent ESG, no local framework' },
                          { bank: 'Access Bank Kenya', assets: '10B+', ownership: 'Access Corp (Nigeria)', status: 'Parent ESG, no local framework' },
                          { bank: 'Ecobank Kenya', assets: '9B+', ownership: 'ETI Group (Togo)', status: 'Group ESG, local gap' },
                          { bank: 'Bank of Africa', assets: '8B+', ownership: 'BOA Group (Morocco)', status: 'No local ESG framework' },
                          { bank: 'BancABC', assets: '7B+', ownership: 'Atlas Mara', status: 'No ESG reporting' },
                          { bank: 'Spire Bank', assets: '5B+', ownership: 'Mwalimu SACCO', status: 'No ESG reporting' },
                          { bank: 'Citibank Kenya', assets: '5B+', ownership: 'Citigroup (US)', status: 'Group TCFD, local minimal' },
                          { bank: 'DIB Kenya', assets: '4B+', ownership: 'DIB (UAE)', status: 'No local ESG framework' },
                          { bank: 'Charterhouse Bank', assets: '2B+', ownership: 'Private', status: 'No ESG reporting' },
                          { bank: 'Imperial Bank', assets: 'N/A', ownership: 'In receivership', status: 'N/A' },
                          { bank: 'Chase Bank', assets: 'N/A', ownership: 'In receivership', status: 'N/A' },
                        ].map((row) => (
                          <tr key={row.bank} className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                            <td className="py-3 pr-4 font-medium text-gray-900">{row.bank}</td>
                            <td className="py-3 pr-4">{row.assets}</td>
                            <td className="py-3 pr-4">{row.ownership}</td>
                            <td className="py-3">{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ============ MARKET ============ */}
          {activeTab === 'Market' && (
            <div className="space-y-16">
              <section>
                <h2 className="section-heading text-center">Climate Risk Readiness by <span className="gradient-text">Market Segment</span></h2>
                <p className="section-subheading mx-auto text-center mb-8">
                  Every segment of Kenya&apos;s financial sector faces climate disclosure requirements. Readiness varies dramatically.
                </p>
              </section>

              <section className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 border-b border-gray-200">
                      <th className="pb-3 pr-4 min-w-[140px]">Segment</th>
                      <th className="pb-3 pr-4 min-w-[130px]">Primary Regulator</th>
                      <th className="pb-3 pr-4 min-w-[160px]">Climate Framework</th>
                      <th className="pb-3 pr-4 min-w-[140px]">Reporting Timeline</th>
                      <th className="pb-3 pr-4 min-w-[130px]">Industry Progress</th>
                      <th className="pb-3 min-w-[140px]">CFOIP Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-medium text-gray-900">Commercial Banks (39)</td>
                      <td className="py-4 pr-4">Central Bank of Kenya</td>
                      <td className="py-4 pr-4">CBK CRDF, KGFT, IFRS S2</td>
                      <td className="py-4 pr-4"><span className="badge-red">Oct 2026 mandatory</span></td>
                      <td className="py-4 pr-4">3 of 39 with TCFD reports</td>
                      <td className="py-4"><span className="badge">Primary Target</span></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-medium text-gray-900">DT-SACCOs (176)</td>
                      <td className="py-4 pr-4">SASRA</td>
                      <td className="py-4 pr-4">Expected SASRA guidance</td>
                      <td className="py-4 pr-4"><span className="badge-amber">2027-2028 expected</span></td>
                      <td className="py-4 pr-4">Near-zero readiness</td>
                      <td className="py-4"><span className="badge">High — volume play</span></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-medium text-gray-900">Insurance (62)</td>
                      <td className="py-4 pr-4">IRA Kenya</td>
                      <td className="py-4 pr-4">IRA ESG Guidelines, IFRS S2</td>
                      <td className="py-4 pr-4"><span className="badge-amber">Jan 2027 for PIEs</span></td>
                      <td className="py-4 pr-4">Minimal disclosure</td>
                      <td className="py-4"><span className="badge">High priority</span></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-medium text-gray-900">Pension Funds (1,200+)</td>
                      <td className="py-4 pr-4">RBA Kenya</td>
                      <td className="py-4 pr-4">RBA ESG guidance</td>
                      <td className="py-4 pr-4"><span className="badge-amber">2027-2028 expected</span></td>
                      <td className="py-4 pr-4">Minimal, fund manager dependent</td>
                      <td className="py-4"><span className="badge">High — asset owner data</span></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-medium text-gray-900">MFBs (14)</td>
                      <td className="py-4 pr-4">Central Bank of Kenya</td>
                      <td className="py-4 pr-4">CBK CRDF extension expected</td>
                      <td className="py-4 pr-4"><span className="badge-amber">2027-2028 expected</span></td>
                      <td className="py-4 pr-4">Zero readiness</td>
                      <td className="py-4"><span className="badge">Medium</span></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-medium text-gray-900">NSE-Listed (~65)</td>
                      <td className="py-4 pr-4">CMA Kenya</td>
                      <td className="py-4 pr-4">NSE ESG Manual, IFRS S1/S2</td>
                      <td className="py-4 pr-4"><span className="badge-red">Jan 2027 for PIEs</span></td>
                      <td className="py-4 pr-4">Few with ESG reports</td>
                      <td className="py-4"><span className="badge">High — listed entities</span></td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          )}

          {/* ============ TIMELINE ============ */}
          {activeTab === 'Timeline' && (
            <div className="space-y-16">
              <section>
                <h2 className="section-heading text-center">Kenya&apos;s Climate Disclosure <span className="gradient-text">Timeline</span></h2>
                <p className="section-subheading mx-auto text-center mb-12">
                  From voluntary guidance to mandatory reporting — the regulatory clock is ticking.
                </p>
              </section>

              <section className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-red-500" />

                <div className="space-y-8">
                  {[
                    { date: 'Oct 2021', title: 'CBK Guidance on Climate-Related Risk Management', desc: 'Central Bank of Kenya issues first guidance on climate-related risk management for banks. Sets expectations for governance, strategy, risk management, metrics.', status: 'done' as const },
                    { date: 'Nov 2021', title: 'NSE ESG Disclosures Guidance Manual', desc: 'Nairobi Securities Exchange publishes ESG Disclosures Guidance Manual for listed companies. Voluntary but signals direction of travel for all PIEs.', status: 'done' as const },
                    { date: 'Jan 2024', title: 'IFRS S1 & S2 Voluntary Adoption Begins', desc: 'Kenya begins voluntary adoption phase for IFRS Sustainability Disclosure Standards S1 (general) and S2 (climate). Early movers start building capabilities.', status: 'active' as const },
                    { date: 'Apr 2025', title: 'CBK KGFT & CRDF Published', desc: 'Kenya Green Finance Taxonomy and Climate Risk Disclosure Framework officially launched by CBK. Banks given 18-month transition to mandatory reporting.', status: 'done' as const },
                    { date: 'Oct 2026', title: 'CRDF Reporting Mandatory for Banks', desc: 'All 39 licensed banks must submit Climate Risk Disclosure Framework reports to CBK. First mandatory climate reporting deadline for Kenya\'s banking sector.', status: 'urgent' as const, countdown: '7 months away' },
                    { date: 'Jan 2027', title: 'IFRS S1 & S2 Mandatory for All PIEs', desc: 'IFRS Sustainability Disclosure Standards become mandatory for all Public Interest Entities — listed companies, banks, insurers, large pension funds.', status: 'urgent' as const, countdown: '10 months away' },
                    { date: 'Jan 2028', title: 'Large Non-PIEs Required', desc: 'IFRS S1 & S2 disclosure requirements extend to large non-public interest entities meeting size thresholds. Brings in large SACCOs and private companies.', status: 'upcoming' as const, countdown: '22 months' },
                    { date: 'Jan 2029', title: 'SME Disclosure Requirements', desc: 'Simplified IFRS sustainability disclosure requirements apply to small and medium enterprises. Completes the coverage of Kenya\'s formal financial sector.', status: 'upcoming' as const, countdown: '34 months' },
                  ].map((item, i) => (
                    <div key={item.date} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0`}>
                        <div className={`card ${item.status === 'urgent' ? 'border-red-500/30 glow-green' : item.status === 'active' ? 'border-emerald-500/30' : item.status === 'done' ? 'border-gray-200' : 'border-gray-200'}`}>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-sm font-bold ${item.status === 'urgent' ? 'text-red-600' : item.status === 'active' ? 'text-emerald-600' : item.status === 'done' ? 'text-gray-600' : 'text-amber-400'}`}>
                              {item.date}
                            </span>
                            {item.status === 'done' && <span className="badge text-xs">Done</span>}
                            {item.status === 'active' && <span className="badge text-xs">Active</span>}
                            {item.status === 'urgent' && <span className="badge-red text-xs">{item.countdown}</span>}
                            {item.status === 'upcoming' && <span className="badge-amber text-xs">{item.countdown}</span>}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <div className="hidden md:block flex-1" />
                      {/* Timeline dot */}
                      <div className={`absolute left-2 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-2 ${item.status === 'urgent' ? 'bg-red-500 border-red-400 animate-pulse-slow' : item.status === 'active' ? 'bg-emerald-500 border-emerald-400' : item.status === 'done' ? 'bg-gray-500 border-gray-400' : 'bg-amber-500 border-amber-400'}`} />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ============ AFRICA ============ */}
          {activeTab === 'Africa' && (
            <div className="space-y-16">
              <section>
                <h2 className="section-heading text-center">Pan-African <span className="gradient-text">Expansion</span></h2>
                <p className="section-subheading mx-auto text-center mb-8">
                  Kenya is our launch market. The climate disclosure wave is moving across the continent. We&apos;re building for 10+ markets.
                </p>
              </section>

              <section className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 border-b border-gray-200">
                      <th className="pb-3 pr-4">Country</th>
                      <th className="pb-3 pr-4">Priority</th>
                      <th className="pb-3 pr-4">Key Regulation</th>
                      <th className="pb-3 pr-4">Timeline</th>
                      <th className="pb-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {[
                      { country: 'Kenya', priority: 'Launch Market', regulation: 'CBK CRDF, KGFT, IFRS S1/S2', timeline: 'Oct 2026 / Jan 2027', notes: 'First-mover. Platform built for this market.', badgeClass: 'badge' },
                      { country: 'Nigeria', priority: 'High Priority', regulation: 'SEC ESG Guidelines, IFRS adoption', timeline: 'PIEs Jan 2028', notes: 'Largest African economy. SEC pushing ESG.', badgeClass: 'badge' },
                      { country: 'South Africa', priority: 'High Priority', regulation: 'King V, JSE Listings Requirements', timeline: 'King V Jan 2026', notes: 'Most mature ESG market in Africa.', badgeClass: 'badge' },
                      { country: 'Ghana', priority: 'High Priority', regulation: 'BoG Sustainable Banking Principles', timeline: 'Banks Jan 2026', notes: 'Bank of Ghana active on green finance.', badgeClass: 'badge' },
                      { country: 'Egypt', priority: 'Medium', regulation: 'FRA ESG Guidelines', timeline: '2027+', notes: 'EGX sustainability index driving disclosure.', badgeClass: 'badge-amber' },
                      { country: 'Rwanda', priority: 'Medium', regulation: 'BNR Green Finance Strategy', timeline: '2027+', notes: 'EAC member. Strong green growth agenda.', badgeClass: 'badge-amber' },
                      { country: 'Uganda', priority: 'Medium', regulation: 'BoU guidance expected', timeline: '2027-2028', notes: 'EAC member. Following Kenya\'s lead.', badgeClass: 'badge-amber' },
                      { country: 'Tanzania', priority: 'Medium', regulation: 'BoT guidance expected', timeline: '2027-2028', notes: 'EAC member. Large banking sector.', badgeClass: 'badge-amber' },
                      { country: 'Ethiopia', priority: 'Medium', regulation: 'NBE modernisation', timeline: '2028+', notes: 'Banking sector opening. Climate framework nascent.', badgeClass: 'badge-amber' },
                      { country: 'Morocco', priority: 'Medium', regulation: 'AMMC ESG Guidelines', timeline: '2027+', notes: 'Casablanca Finance City driving ESG adoption.', badgeClass: 'badge-amber' },
                    ].map((row) => (
                      <tr key={row.country} className="border-b border-gray-200 hover:bg-white/5 transition-colors">
                        <td className="py-3 pr-4 font-medium text-gray-900">{row.country}</td>
                        <td className="py-3 pr-4"><span className={row.badgeClass}>{row.priority}</span></td>
                        <td className="py-3 pr-4">{row.regulation}</td>
                        <td className="py-3 pr-4">{row.timeline}</td>
                        <td className="py-3">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Why Kenya First */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Kenya First</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="card">
                    <h4 className="font-semibold text-emerald-600 mb-2">Regulatory Momentum</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">CBK has published both the CRDF and KGFT. Clear deadlines exist. This is not aspirational — it is mandated with a fixed compliance date of October 2026.</p>
                  </div>
                  <div className="card">
                    <h4 className="font-semibold text-emerald-600 mb-2">Market Structure</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">39 banks, 176 DT-SACCOs, 62 insurers — Kenya has a diverse, well-regulated financial sector that provides the ideal testing ground for a multi-segment platform.</p>
                  </div>
                  <div className="card">
                    <h4 className="font-semibold text-emerald-600 mb-2">DFI Concentration</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Nairobi hosts IFC, FMO, Proparco, AfDB regional offices, and is a hub for climate funds. These organisations need investee-level climate data — from Kenya first.</p>
                  </div>
                  <div className="card">
                    <h4 className="font-semibold text-emerald-600 mb-2">Regional Influence</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Kenya&apos;s regulatory framework influences the entire EAC — Uganda, Tanzania, Rwanda. A Kenya-proven platform can scale regionally with minimal adaptation.</p>
                  </div>
                </div>
              </section>

              {/* Expansion Channels */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Expansion Channels</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="card">
                    <h4 className="font-semibold text-emerald-600 mb-2">Regional Banks</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Pan-African banking groups like KCB, Equity, Ecobank, and Stanbic operate across multiple markets. Serving them in Kenya creates natural expansion into their other subsidiaries.</p>
                  </div>
                  <div className="card">
                    <h4 className="font-semibold text-emerald-600 mb-2">DFI Networks</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">DFIs investing across Africa will require consistent climate reporting from all their investees. CFOIP as the standard tool in Kenya becomes the standard tool across their African portfolios.</p>
                  </div>
                  <div className="card">
                    <h4 className="font-semibold text-emerald-600 mb-2">Regulator Partnerships</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Central banks in EAC countries collaborate on regulatory frameworks. A successful CBK partnership positions CFOIP as the recommended platform for peer regulators.</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ============ WHY US ============ */}
          {activeTab === 'Why Us' && (
            <div className="space-y-16">
              <section>
                <h2 className="section-heading text-center">Why <span className="gradient-text">CFOIP</span></h2>
                <p className="section-subheading mx-auto text-center mb-8">
                  Six reasons why Kenya&apos;s financial institutions should choose CFOIP as their climate risk and compliance partner.
                </p>
              </section>

              <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card">
                  <div className="text-3xl mb-4">🇰🇪</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">1. Kenya-Native Climate Intelligence</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We don&apos;t adapt a global platform for Kenya — we build from Kenya&apos;s regulations first. Every template maps to CBK CRDF fields. Every taxonomy classification uses KGFT categories. Every benchmark uses Kenyan financial sector data. County-level physical risk scores use Kenya Meteorological Department data, not global approximations. This is climate intelligence built for Kenya, by people who understand Kenya&apos;s financial sector.
                  </p>
                </div>
                <div className="card">
                  <div className="text-3xl mb-4">🔗</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">2. Every Stakeholder, One Platform</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Banks, SACCOs, insurers, pension funds, microfinance banks, listed companies, DFIs, and climate funds — all on one platform. This isn&apos;t a bank-only tool. When a DFI invests in a bank that lends to an MSME, the entire chain needs consistent climate data. CFOIP provides that chain from data collection at the borrower level to aggregated portfolio reporting at the investor level.
                  </p>
                </div>
                <div className="card">
                  <div className="text-3xl mb-4">🤝</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">3. Your Climate Risk Partner</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We don&apos;t just sell software and disappear. Every institution gets onboarding support, data migration assistance, staff training on climate risk concepts, and ongoing advisory on regulatory changes. Our customer success team includes climate risk specialists who understand both the technology and the regulatory landscape. We succeed when you succeed.
                  </p>
                </div>
                <div className="card">
                  <div className="text-3xl mb-4">⚡</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">4. Technology, Not Consulting</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Traditional consulting firms charge $200K+ per engagement and deliver a static report. We deliver a living platform that institutions use every quarter. Automated data collection, automated report generation, automated regulatory updates. The cost is a fraction of consulting and the output is continuous, not one-off. Technology scales; consulting doesn&apos;t.
                  </p>
                </div>
                <div className="card">
                  <div className="text-3xl mb-4">💰</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">5. Connects Capital to Impact</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    DFIs and climate funds have $4B+ earmarked for Kenya but struggle to find investees with credible climate data. CFOIP makes institutions &quot;investment-ready&quot; by providing the standardised climate disclosures that international capital providers require. Better data means faster capital deployment, lower due diligence costs, and more climate finance flowing into Kenya&apos;s real economy.
                  </p>
                </div>
                <div className="card">
                  <div className="text-3xl mb-4">🌐</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-3">6. Channel-Ready for Everyone</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Industry associations (KBA, KUSCO, AKI), consulting firms, audit firms, and regulators can all integrate or resell CFOIP. We provide white-label capabilities, API access, and partnership tiers. This isn&apos;t a closed platform — it&apos;s designed to plug into existing industry infrastructure and make every channel partner more valuable to their members or clients.
                  </p>
                </div>
              </section>
            </div>
          )}

          {/* ============ DIAGNOSTIC ============ */}
          {activeTab === 'Diagnostic' && (
            <div className="space-y-12">
              <section className="text-center">
                <h2 className="section-heading">Climate Risk <span className="gradient-text">Readiness Diagnostic</span></h2>
                <p className="section-subheading mx-auto text-center mb-8">
                  Assess where your institution stands on climate risk compliance. Our diagnostic tool evaluates your readiness across 6 pillars aligned to CBK CRDF, IFRS S1/S2, and PCAF requirements.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <a href="/diagnostic" className="card hover:shadow-xl group cursor-pointer block">
                  <div className="text-4xl mb-4">🏦</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Bank Self-Assessment</h3>
                  <p className="text-gray-600 mb-4">Simplified 36-question path designed for internal compliance teams. Takes approximately 30 minutes to complete.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge">6 Pillars</span>
                    <span className="badge">36 Questions</span>
                    <span className="badge">~30 min</span>
                  </div>
                  <span className="btn-primary w-full text-center">Start Self-Assessment →</span>
                </a>

                <a href="/diagnostic?mode=internal" className="card hover:shadow-xl group cursor-pointer block">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Full Expert Diagnostic</h3>
                  <p className="text-gray-600 mb-4">Complete 84-question assessment with CBK template gap analysis, PCAF readiness matrix, and critical checks.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge">6 Pillars</span>
                    <span className="badge">84 Questions</span>
                    <span className="badge-amber">CBK Gap Analysis</span>
                    <span className="badge">PCAF Matrix</span>
                  </div>
                  <span className="btn-secondary w-full text-center">Start Full Diagnostic →</span>
                </a>
              </div>

              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Six Assessment Pillars</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Governance & Oversight', desc: 'Board strategy, committee structure, accountability, and policy framework for climate risk.', icon: '⚖️' },
                    { name: 'Strategy & Planning', desc: 'Scenario analysis, transition planning, physical risk mapping, and opportunity identification.', icon: '🎯' },
                    { name: 'Risk Management', desc: 'ERM integration, credit risk, concentration monitoring, and climate stress testing.', icon: '🛡️' },
                    { name: 'Metrics & Targets', desc: 'Scope 1/2 emissions, financed emissions (PCAF), data quality, and science-based targets.', icon: '📊' },
                    { name: 'Data Infrastructure', desc: 'MSME data collection, core banking integration, external data sources, and data governance.', icon: '🗄️' },
                    { name: 'Taxonomy & Classification', desc: 'Kenya Green Taxonomy mapping, climate sensitivity tagging, and CBK reporting standards.', icon: '🏷️' },
                  ].map((pillar) => (
                    <div key={pillar.name} className="card">
                      <div className="text-3xl mb-3">{pillar.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{pillar.name}</h4>
                      <p className="text-sm text-gray-600">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You Get</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text mb-2">Score</div>
                    <div className="text-sm text-gray-600">Readiness score benchmarked against peers</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text mb-2">Gaps</div>
                    <div className="text-sm text-gray-600">Prioritised gap register with severity</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text mb-2">Roadmap</div>
                    <div className="text-sm text-gray-600">12-month phased implementation plan</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text mb-2">Call</div>
                    <div className="text-sm text-gray-600">30-minute consultation to review results</div>
                  </div>
                </div>
              </section>

              <section className="urgency-bar">
                <span className="font-semibold">Next Steps:</span> Complete the diagnostic → Receive your personalised assessment → Onboard to the CBK Report Builder → Generate your CRDF templates → Submit to CBK before <span className="font-bold text-red-600">October 2026</span>.
              </section>
            </div>
          )}

          {/* ============ GET STARTED ============ */}
          {activeTab === 'Get Started' && (
            <div className="space-y-16">
              <section>
                <h2 className="section-heading text-center">Get Started with <span className="gradient-text">CFOIP</span></h2>
                <p className="section-subheading mx-auto text-center mb-8">
                  From first conversation to fully operational climate risk reporting — here&apos;s how we work with you.
                </p>
              </section>

              {/* 3-Phase Model */}
              <section>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card border-emerald-500/20 relative">
                    <div className="absolute -top-3 left-6">
                      <span className="badge">Phase 1</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Discovery &amp; Assessment</h4>
                      <p className="text-emerald-600 text-sm font-medium mb-4">Weeks 1-3</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Initial consultation and regulatory gap analysis</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Review existing data sources and reporting processes</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Map current state to CBK CRDF and IFRS S2 requirements</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Identify data gaps and prioritise remediation</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Deliver assessment report with implementation roadmap</li>
                      </ul>
                    </div>
                  </div>

                  <div className="card border-emerald-500/20 relative">
                    <div className="absolute -top-3 left-6">
                      <span className="badge-amber">Phase 2</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Platform Configuration</h4>
                      <p className="text-amber-400 text-sm font-medium mb-4">Weeks 4-8</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Configure platform for your institution type and size</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Set up data collection templates and import pipelines</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> KGFT taxonomy mapping for your portfolio</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Historical data migration and baseline calculations</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Staff training on platform and climate risk concepts</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Generate first draft disclosure reports for review</li>
                      </ul>
                    </div>
                  </div>

                  <div className="card border-emerald-500/20 relative">
                    <div className="absolute -top-3 left-6">
                      <span className="badge">Phase 3</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Go-Live &amp; Ongoing</h4>
                      <p className="text-emerald-600 text-sm font-medium mb-4">Week 9+</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Full platform access with all reporting modules active</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Quarterly reporting cycle support</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Regulatory update alerts and template adjustments</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Peer benchmarking dashboard access</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Dedicated customer success manager</li>
                        <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">&#10003;</span> Annual review and framework evolution updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Inquiry Form */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Start the Conversation</h3>
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          className="input-field"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          className="input-field"
                          placeholder="you@organisation.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Organisation *</label>
                      <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="Your organisation name"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Organisation Type *</label>
                      <select
                        required
                        className="select-field"
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      >
                        <option value="">Select type...</option>
                        <option value="commercial_bank">Commercial Bank</option>
                        <option value="sacco">DT-SACCO</option>
                        <option value="insurance">Insurance Company</option>
                        <option value="pension">Pension Fund / Administrator</option>
                        <option value="mfb">Microfinance Bank</option>
                        <option value="nse_listed">NSE-Listed Company</option>
                        <option value="dfi">DFI / Climate Fund</option>
                        <option value="regulator">Regulator / Association</option>
                        <option value="consultant">Consultant / Advisor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Where Are You on the Journey?</label>
                      <select
                        className="select-field"
                        value={formData.journeyStage}
                        onChange={(e) => setFormData({ ...formData, journeyStage: e.target.value })}
                      >
                        <option value="">Select stage...</option>
                        <option value="not_started">Haven&apos;t started climate reporting</option>
                        <option value="early">Early stages — exploring requirements</option>
                        <option value="in_progress">In progress — some data collection underway</option>
                        <option value="advanced">Advanced — need a platform to scale</option>
                        <option value="looking_to_invest">Investor — looking for investee data</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Biggest Challenge</label>
                      <select
                        className="select-field"
                        value={formData.biggestChallenge}
                        onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
                      >
                        <option value="">Select challenge...</option>
                        <option value="data_collection">Collecting climate / emissions data</option>
                        <option value="understanding_regs">Understanding regulatory requirements</option>
                        <option value="report_generation">Generating compliant reports</option>
                        <option value="talent">Finding climate risk talent / expertise</option>
                        <option value="board_buyin">Getting board / management buy-in</option>
                        <option value="cost">Budget constraints</option>
                        <option value="integration">Integrating with existing systems</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Additional Notes</label>
                      <textarea
                        className="input-field min-h-[100px] resize-y"
                        placeholder="Tell us more about your situation or any specific questions..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="btn-primary w-full"
                    >
                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                    </button>

                    {formStatus === 'success' && (
                      <div className="text-center text-emerald-600 text-sm p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        Thank you! We&apos;ll be in touch within 24 hours.
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div className="text-center text-red-600 text-sm p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                        Something went wrong. Please email us directly at partner@cfopartners.fund.
                      </div>
                    )}
                  </form>
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
                <div className="max-w-3xl mx-auto space-y-4">
                  {[
                    {
                      q: 'How long does it take to get our first climate disclosure report?',
                      a: 'Most institutions generate their first draft disclosure within 6-8 weeks of starting. This includes discovery, platform configuration, data migration, and report generation. Institutions with some existing ESG data can move faster.',
                    },
                    {
                      q: 'What if we have no climate data at all?',
                      a: 'That is the most common starting point. Our platform includes data collection templates that guide you through gathering Scope 1, 2, and 3 data step by step. We also provide proxy methodologies and emission factors for sectors where primary data is not yet available.',
                    },
                    {
                      q: 'How much does CFOIP cost?',
                      a: 'Pricing is tiered by institution type and size. A Tier 3 bank or mid-size SACCO pays significantly less than a Tier 1 bank. We offer annual subscriptions with quarterly reporting cycles included. Contact us for a specific quote for your institution.',
                    },
                    {
                      q: 'Is this just for banks?',
                      a: 'No. CFOIP serves all financial sector institutions — banks, DT-SACCOs, insurance companies, pension funds, microfinance banks, and NSE-listed companies. We also serve DFIs and climate funds that need investee-level climate data.',
                    },
                    {
                      q: 'Can we use CFOIP to meet CBK CRDF requirements specifically?',
                      a: 'Yes. The platform is built around CBK CRDF structure and fields. It generates CRDF-aligned reports that map directly to the four TCFD pillars: governance, strategy, risk management, and metrics & targets. It also maps your portfolio against KGFT taxonomy categories.',
                    },
                    {
                      q: 'Do you integrate with our existing core banking system?',
                      a: 'Yes. We provide API connectors and data import tools that work with major core banking platforms used in Kenya including T24, Finacle, and Flexcube. For systems without API access, we support structured file imports (CSV, Excel).',
                    },
                  ].map((faq) => (
                    <div key={faq.q} className="card">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Direct Contact */}
              <section className="text-center">
                <div className="card max-w-lg mx-auto">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Prefer to Talk Directly?</h4>
                  <p className="text-gray-600 text-sm mb-4">Reach out to our founder for a conversation about your institution&apos;s climate risk journey.</p>
                  <div className="space-y-1">
                    <p className="text-gray-900 font-semibold">Mary Ndinda</p>
                    <p className="text-emerald-600 text-sm">Founder &amp; CEO</p>
                    <a href="mailto:partner@cfopartners.fund" className="text-emerald-600 hover:text-emerald-300 text-sm underline underline-offset-2 transition-colors">
                      partner@cfopartners.fund
                    </a>
                    <p className="text-gray-500 text-sm mt-1">+254 748 918 910</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold gradient-text">CFOIP</span>
              <span className="text-sm text-gray-500">Climate Risk &amp; Compliance Platform</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Built for Kenya&apos;s Financial Sector</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">&copy; {new Date().getFullYear()} CFO Partners</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}