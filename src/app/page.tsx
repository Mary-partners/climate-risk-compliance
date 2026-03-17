'use client'

import { useState, useEffect, FormEvent } from 'react'

const TABS = ['Overview', 'Get Started', 'Free Diagnostic', 'For Banks', 'Market', 'Timeline', 'Africa', 'Why Us'] as const
type Tab = typeof TABS[number]

const BANKS_TIER1 = [
  { n: 1, name: 'KCB Group', assets: '1,400+', ownership: 'Listed (NSE)', esg: 'KBA SFI Catalyst Awardee 2024' },
  { n: 2, name: 'Equity Group Holdings', assets: '1,350+', ownership: 'Listed (NSE)', esg: 'KBA SFI Catalyst Awardee 2024' },
  { n: 3, name: 'NCBA Group', assets: '650+', ownership: 'Listed (NSE)', esg: 'KBA SFI Catalyst Awardee 2024' },
  { n: 4, name: 'Co-operative Bank', assets: '600+', ownership: 'Listed (NSE)', esg: 'KBA SFI Catalyst Awardee 2024' },
  { n: 5, name: 'Absa Bank Kenya', assets: '500+', ownership: 'Absa Group (SA)', esg: 'KBA SFI Catalyst Awardee 2024' },
  { n: 6, name: 'Standard Chartered Kenya', assets: '400+', ownership: 'StanChart (UK)', esg: 'Parent group sustainability report' },
  { n: 7, name: 'Stanbic Bank Kenya', assets: '380+', ownership: 'Standard Bank (SA)', esg: 'Parent group sustainability report' },
  { n: 8, name: 'Diamond Trust Bank', assets: '350+', ownership: 'Aga Khan (Private)', esg: 'KBA SFI Catalyst Awardee 2024' },
  { n: 9, name: 'I&M Bank', assets: '320+', ownership: 'Listed (NSE)', esg: 'KBA SFI Catalyst Awardee 2024' },
]
const BANKS_TIER2 = [
  { n: 10, name: 'Family Bank', assets: '150+', ownership: 'Listed (NSE)' },
  { n: 11, name: 'Bank of Baroda Kenya', assets: '120+', ownership: 'Bank of Baroda (India)' },
  { n: 12, name: 'Prime Bank', assets: '110+', ownership: 'Private' },
  { n: 13, name: 'National Bank of Kenya', assets: '100+', ownership: 'KCB Group subsidiary' },
  { n: 14, name: 'SBM Bank Kenya', assets: '95+', ownership: 'SBM Group (Mauritius)' },
  { n: 15, name: 'Victoria Commercial Bank', assets: '80+', ownership: 'Private' },
  { n: 16, name: 'Guardian Bank', assets: '45+', ownership: 'Private' },
  { n: 17, name: 'Mayfair CIB Bank', assets: '40+', ownership: 'Private' },
  { n: 18, name: 'Kingdom Bank', assets: '35+', ownership: 'Co-op Bank subsidiary' },
  { n: 19, name: 'Gulf African Bank', assets: '35+', ownership: 'Private (Islamic)' },
]
const BANKS_TIER3 = [
  { n: 20, name: 'Sidian Bank', assets: '30+', ownership: 'Access Holdings (Nigeria)', esg: 'Parent group sustainability report' },
  { n: 21, name: 'Credit Bank', assets: '28+', ownership: 'Private' },
  { n: 22, name: 'Development Bank of Kenya', assets: '25+', ownership: 'Government + DFIs' },
  { n: 23, name: 'Habib Bank AG Zurich', assets: '22+', ownership: 'Habib Group (Intl)' },
  { n: 24, name: 'Middle East Bank Kenya', assets: '18+', ownership: 'Private' },
  { n: 25, name: 'Paramount Bank', assets: '15+', ownership: 'Private' },
  { n: 26, name: 'M-Oriental Bank', assets: '14+', ownership: 'Private' },
  { n: 27, name: 'First Community Bank', assets: '13+', ownership: 'Private (Islamic)' },
  { n: 28, name: 'Consolidated Bank', assets: '12+', ownership: 'Government' },
  { n: 29, name: 'UBA Kenya', assets: '10+', ownership: 'UBA Group (Nigeria)', esg: 'Parent group sustainability report' },
  { n: 30, name: 'Access Bank Kenya', assets: '10+', ownership: 'Access Holdings (Nigeria)', esg: 'Parent group sustainability report' },
  { n: 31, name: 'Ecobank Kenya', assets: '9+', ownership: 'ETI Group (Togo)', esg: 'Parent group sustainability report' },
  { n: 32, name: 'Bank of Africa Kenya', assets: '8+', ownership: 'BOA Group (Morocco)', esg: 'Parent group sustainability report' },
  { n: 33, name: 'African Banking Corp (BancABC)', assets: '7+', ownership: 'Atlas Mara' },
  { n: 34, name: 'Spire Bank', assets: '5+', ownership: 'Mwalimu SACCO' },
  { n: 35, name: 'Citibank Kenya', assets: '5+', ownership: 'Citigroup (USA)', esg: 'Parent group sustainability report' },
  { n: 36, name: 'DIB Kenya', assets: '4+', ownership: 'Dubai Islamic Bank' },
  { n: 37, name: 'Charterhouse Bank', assets: '2+', ownership: 'Private' },
  { n: 38, name: 'Imperial Bank (In Receivership)', assets: 'N/A', ownership: 'KDIC' },
  { n: 39, name: 'Chase Bank (In Receivership)', assets: 'N/A', ownership: 'KDIC' },
]

const SACCOS = [
  { n: 1, name: 'Stima SACCO', assets: '95+', members: '250K+', sector: 'Energy sector employees' },
  { n: 2, name: 'Kenya Police SACCO', assets: '85+', members: '200K+', sector: 'Security & government' },
  { n: 3, name: 'Mwalimu National SACCO', assets: '75+', members: '120K+', sector: 'Education sector' },
  { n: 4, name: 'Harambee SACCO', assets: '60+', members: '110K+', sector: 'Government employees' },
  { n: 5, name: 'Afya SACCO', assets: '55+', members: '80K+', sector: 'Health sector' },
  { n: 6, name: 'UN SACCO', assets: '45+', members: '30K+', sector: 'UN & NGO employees' },
  { n: 7, name: 'Ukulima SACCO', assets: '40+', members: '90K+', sector: 'Agriculture' },
  { n: 8, name: 'Unaitas SACCO', assets: '38+', members: '350K+', sector: 'Multi-sector MSME' },
  { n: 9, name: 'Tower SACCO', assets: '35+', members: '25K+', sector: 'Corporate employees' },
  { n: 10, name: 'Gusii Mwalimu SACCO', assets: '30+', members: '60K+', sector: 'Education sector' },
  { n: 11, name: 'Boresha SACCO', assets: '28+', members: '45K+', sector: 'Multi-sector' },
  { n: 12, name: 'Mentor SACCO', assets: '25+', members: '20K+', sector: 'Multi-sector' },
]

const INSURERS = [
  { name: 'Jubilee Holdings', type: 'Composite', premiums: 'KSH 45B+', esg: 'Annual sustainability disclosures' },
  { name: 'Britam Holdings', type: 'Composite', premiums: 'KSH 35B+', esg: 'Annual sustainability disclosures' },
  { name: 'CIC Insurance Group', type: 'Composite', premiums: 'KSH 22B+', esg: 'Published sustainability report' },
  { name: 'ICEA LION Group', type: 'Composite', premiums: 'KSH 20B+', esg: 'No public sustainability report' },
  { name: 'APA Insurance', type: 'General', premiums: 'KSH 18B+', esg: 'No public sustainability report' },
  { name: 'UAP Old Mutual', type: 'Composite', premiums: 'KSH 16B+', esg: 'Parent group sustainability report' },
  { name: 'AAR Insurance', type: 'General', premiums: 'KSH 8B+', esg: 'No public sustainability report' },
  { name: 'Madison Insurance', type: 'Composite', premiums: 'KSH 7B+', esg: 'No public sustainability report' },
]

const MFBS = [
  { n: 1, name: 'Faulu Microfinance Bank', focus: 'MSME & SME lending', borrowers: '350K+' },
  { n: 2, name: 'Kenya Women MFB (KWFT)', focus: 'Women-focused micro-loans', borrowers: '500K+' },
  { n: 3, name: 'SMEP Microfinance Bank', focus: 'Church-based SME lending', borrowers: '80K+' },
  { n: 4, name: 'Rafiki Microfinance Bank', focus: 'General MSME', borrowers: '100K+' },
  { n: 5, name: 'Salaam Microfinance Bank', focus: 'Islamic micro-finance', borrowers: '60K+' },
  { n: 6, name: 'Caritas Microfinance Bank', focus: 'Faith-based MSME', borrowers: '40K+' },
  { n: 7, name: 'Sumac Microfinance Bank', focus: 'General MSME', borrowers: '30K+' },
  { n: 8, name: 'Choice Microfinance Bank', focus: 'General MSME', borrowers: '25K+' },
  { n: 9, name: 'U&I Microfinance Bank', focus: 'General micro-loans', borrowers: '20K+' },
  { n: 10, name: 'LOLC Kenya MFB', focus: 'Asian-backed micro-lending', borrowers: '35K+' },
  { n: 11, name: 'Branch Microfinance Bank', focus: 'Digital micro-loans', borrowers: '200K+' },
  { n: 12, name: 'Muungano MFB', focus: 'Community micro-lending', borrowers: '15K+' },
  { n: 13, name: 'On It Microfinance Bank', focus: 'Digital-first micro-loans', borrowers: '10K+' },
  { n: 14, name: 'Umba Microfinance Bank', focus: 'Digital lending', borrowers: '50K+' },
]

const AFRICA_MARKETS = [
  { country: 'Kenya', regulator: 'CBK, ICPAK, SASRA, IRA, RBA, CMA', status: 'CBK CRDF + IFRS S1/S2 adoption. Most advanced in East Africa.', timeline: 'CRDF: Oct 2026 / IFRS: Jan 2027', opportunity: 'Launch Market' },
  { country: 'Nigeria', regulator: 'FRC Nigeria, CBN, SEC', status: 'FRC published IFRS S1/S2 adoption roadmap (March 2024). Voluntary since Jan 2024.', timeline: 'PIEs: Jan 2028 / SMEs: Jan 2030', opportunity: 'High Priority' },
  { country: 'South Africa', regulator: 'JSE, SARB, King V Committee', status: 'JSE Sustainability Guidance (2022). King V effective Jan 2026.', timeline: 'King V: Jan 2026 / JSE ISSB: TBD', opportunity: 'High Priority' },
  { country: 'Ghana', regulator: 'Bank of Ghana, SEC Ghana', status: 'Bank of Ghana Climate Risk Directive (Nov 2024). Banks from Jan 2026.', timeline: 'Banks: Jan 2026 / NBFIs: Jan 2027', opportunity: 'High Priority' },
  { country: 'Egypt', regulator: 'FRA, CBE, EGX', status: 'FRA Decree 108/2021: ESG disclosure for listed companies. TCFD-aligned.', timeline: 'Active now', opportunity: 'Medium' },
  { country: 'Rwanda', regulator: 'BNR, CMA Rwanda', status: 'Green Taxonomy integration underway. GSS+ Bond Guidelines Dec 2024.', timeline: 'Evolving', opportunity: 'Medium (EAC)' },
  { country: 'Uganda', regulator: 'Bank of Uganda, CMA Uganda', status: 'Overhauled capital markets regime. Green bond framework emerging.', timeline: 'Evolving', opportunity: 'Medium (EAC)' },
  { country: 'Tanzania', regulator: 'Bank of Tanzania, CMSA', status: 'Updated financial sector regulations. Climate disclosure early stage.', timeline: 'Early stage', opportunity: 'Medium (EAC)' },
  { country: 'Ethiopia', regulator: 'National Bank of Ethiopia', status: 'Financial sector liberalisation underway. Climate finance developing.', timeline: 'Early stage', opportunity: 'Medium' },
  { country: 'Morocco', regulator: 'Bank Al-Maghrib, AMMC', status: 'Casablanca as green finance hub. AMMC ESG guidance. Climate stress testing.', timeline: 'Evolving', opportunity: 'Medium' },
]

const ORG_TYPES = ['Commercial Bank', 'SACCO', 'Insurance Company', 'Pension Fund / Fund Manager', 'Microfinance Bank', 'NSE-Listed Company', 'DFI / Climate Fund / Development Partner', 'Audit / Consulting Firm', 'Regulator / Industry Association', 'Other']
const JOURNEY_STAGES = ["Haven't started yet", "Exploring what's needed", 'Actively planning our approach', 'Already working on it (need a better solution)', 'We advise clients on this (audit/consulting firm)', 'We fund institutions that need this (DFI/climate fund)']
const CHALLENGES = ['Collecting climate data from borrowers / investees', "Understanding what's expected of us", 'Generating the actual reports and disclosures', 'No internal team or expertise to handle this', 'Worried about cost and effort', 'Need portfolio-level visibility across investees', 'Running out of time before reporting deadlines']
const ASSET_RANGES = ['Under KSH 5 Billion', 'KSH 5 - 20 Billion', 'KSH 20 - 50 Billion', 'KSH 50 - 100 Billion', 'KSH 100 - 500 Billion', 'Over KSH 500 Billion']
const BORROWER_RANGES = ['Under 1,000', '1,000 - 10,000', '10,000 - 50,000', '50,000 - 200,000', 'Over 200,000']
const FRAMEWORKS = ['CBK CRDF', 'IFRS S1', 'IFRS S2', 'TCFD', 'KGFT', 'PCAF', 'NSE ESG Guidance', 'Not sure yet']
const DEADLINES = ['October 2026 (CBK CRDF)', 'January 2027 (IFRS S1/S2)', 'DFI or funder reporting requirement', 'Board or management has requested this', 'Not sure']
const DIAG_CHALLENGES = ['Collecting climate data from borrowers/members/investees', "Understanding what's expected of us", 'Generating the actual reports and disclosures', 'No internal team or expertise', 'Worried about cost and effort', 'Need portfolio-level visibility', 'Running out of time before deadlines', 'Getting board or management buy-in']

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [marketSub, setMarketSub] = useState<'banks' | 'saccos' | 'insurers' | 'pension' | 'mfbs'>('banks')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get Started form
  const [gsForm, setGsForm] = useState({ name: '', email: '', organisation: '', orgType: '', journeyStage: '', biggestChallenge: '', notes: '', honeypot: '' })
  const [gsStatus, setGsStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Diagnostic form
  const [diagForm, setDiagForm] = useState({
    institutionName: '', name: '', email: '', role: '', institutionType: '', assets: '', borrowers: '',
    esgTeam: '', submittedReports: '', collectsData: '', kgftClassified: '', pcafMeasured: '',
    frameworks: [] as string[], deadline: '', challenges: [] as string[], moreInfo: '', honeypot: ''
  })
  const [diagStatus, setDiagStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Interest modal
  const [showInterest, setShowInterest] = useState(false)
  useEffect(() => {
    try {
      if (!sessionStorage.getItem('crc_interest')) {
        const t = setTimeout(() => setShowInterest(true), 800)
        return () => clearTimeout(t)
      }
    } catch { /* SSR safety */ }
  }, [])

  const dismissInterest = (interest: string) => {
    try { sessionStorage.setItem('crc_interest', 'true') } catch { /* noop */ }
    setShowInterest(false)
    fetch('/api/inquiry', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Visitor', email: '', organisation: '', orgType: '', journeyStage: '', biggestChallenge: interest, notes: 'Auto: interest question' })
    }).catch(() => {})
  }

  const submitGetStarted = async (e: FormEvent) => {
    e.preventDefault()
    if (gsForm.honeypot) return
    setGsStatus('submitting')
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gsForm) })
      setGsStatus(res.ok ? 'success' : 'error')
      if (res.ok) setGsForm({ name: '', email: '', organisation: '', orgType: '', journeyStage: '', biggestChallenge: '', notes: '', honeypot: '' })
    } catch { setGsStatus('error') }
  }

  const submitDiagnostic = async (e: FormEvent) => {
    e.preventDefault()
    if (diagForm.honeypot) return
    setDiagStatus('submitting')
    try {
      const res = await fetch('/api/diagnostic', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(diagForm) })
      setDiagStatus(res.ok ? 'success' : 'error')
      if (res.ok) setDiagForm({ institutionName: '', name: '', email: '', role: '', institutionType: '', assets: '', borrowers: '', esgTeam: '', submittedReports: '', collectsData: '', kgftClassified: '', pcafMeasured: '', frameworks: [], deadline: '', challenges: [], moreInfo: '', honeypot: '' })
    } catch { setDiagStatus('error') }
  }

  const toggleFramework = (f: string) => {
    setDiagForm(prev => ({ ...prev, frameworks: prev.frameworks.includes(f) ? prev.frameworks.filter(x => x !== f) : [...prev.frameworks, f] }))
  }
  const toggleChallenge = (c: string) => {
    setDiagForm(prev => ({ ...prev, challenges: prev.challenges.includes(c) ? prev.challenges.filter(x => x !== c) : [...prev.challenges, c] }))
  }

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style jsx global>{`
        :root {
          --bg: #f5f6fa;
          --card: #ffffff;
          --dark: #0a1628;
          --dark2: #132240;
          --accent: #0d9f6e;
          --accent2: #059669;
          --accent-light: #d1fae5;
          --blue: #2563eb;
          --blue-light: #dbeafe;
          --red: #dc2626;
          --red-light: #fee2e2;
          --amber: #d97706;
          --amber-light: #fef3c7;
          --purple: #7c3aed;
          --purple-light: #ede9fe;
          --teal: #0891b2;
          --teal-light: #ccfbf1;
          --text: #1e293b;
          --text2: #64748b;
          --border: #e2e8f0;
          --radius: 12px;
          --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { line-height: 1.6; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); }
        .card-accent { border-top: 3px solid var(--accent); }
        .card-blue { border-top: 3px solid var(--blue); }
        .card-amber { border-top: 3px solid var(--amber); }
        .card-red { border-top: 3px solid var(--red); }
        .card-purple { border-top: 3px solid var(--purple); }
        .card-teal { border-top: 3px solid var(--teal); }
        .btn { display: inline-block; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; border: none; transition: all 0.2s; text-decoration: none; }
        .btn-primary { background: var(--accent); color: white; }
        .btn-primary:hover { background: var(--accent2); }
        .btn-outline { background: transparent; color: var(--accent); border: 2px solid var(--accent); }
        .btn-outline:hover { background: var(--accent-light); }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-green { background: var(--accent-light); color: var(--accent2); }
        .badge-amber { background: var(--amber-light); color: var(--amber); }
        .badge-red { background: var(--red-light); color: var(--red); }
        .badge-blue { background: var(--blue-light); color: var(--blue); }
        .badge-purple { background: var(--purple-light); color: var(--purple); }
        .input-field { width: 100%; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; font-family: inherit; background: white; color: var(--text); }
        .input-field:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(13,159,110,0.1); }
        select.input-field { appearance: auto; }
        textarea.input-field { min-height: 80px; resize: vertical; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { background: var(--dark); color: white; padding: 10px 12px; text-align: left; font-weight: 600; }
        td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
        tr:hover td { background: #f8fafc; }
        .section { max-width: 1200px; margin: 0 auto; padding: 32px 16px; }
        .urgency-bar { background: linear-gradient(135deg, var(--dark), var(--dark2)); color: white; padding: 12px 16px; text-align: center; font-size: 13px; }
        .kpi { text-align: center; padding: 20px; }
        .kpi-value { font-size: 32px; font-weight: 800; color: var(--accent); }
        .kpi-label { font-size: 13px; color: var(--text2); margin-top: 4px; }
        @media (max-width: 768px) {
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
          .section { padding: 20px 12px; }
          table { font-size: 12px; display: block; overflow-x: auto; }
          .kpi-value { font-size: 24px; }
          .hide-mobile { display: none; }
          .desktop-tabs { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Interest Modal */}
      {showInterest && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Welcome! What brings you here?</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 20 }}>Quick tap — helps us tailor your experience</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Regulatory compliance deadline', 'Exploring climate risk solutions', 'DFI / funder requirement', 'Peer recommendation', 'Research / general interest', 'Just browsing'].map(opt => (
                <button key={opt} onClick={() => dismissInterest(opt)}
                  style={{ padding: '10px 16px', border: '1px solid var(--border)', borderRadius: 8, background: 'white', cursor: 'pointer', fontSize: 14, textAlign: 'left', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >{opt}</button>
              ))}
            </div>
            <button onClick={() => dismissInterest('Skipped')} style={{ marginTop: 12, background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: 13 }}>Skip</button>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--dark)' }}>CFOIP</div>
            <div style={{ fontSize: 11, color: 'var(--text2)' }}>Climate Risk &amp; Compliance Platform</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-red hide-mobile">Oct 2026: CBK CRDF</span>
            <span className="badge badge-amber hide-mobile">Jan 2027: IFRS S1/S2</span>
            <a href="/auth" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Login</a>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 18, alignItems: 'center', justifyContent: 'center' }}>
              {mobileMenuOpen ? '\u2715' : '\u2630'}
            </button>
          </div>
        </div>
        {/* Desktop Tabs */}
        <div className="desktop-tabs" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => switchTab(tab)}
              style={{
                padding: '10px 16px', border: 'none', borderBottom: activeTab === tab ? '3px solid var(--accent)' : '3px solid transparent',
                background: 'none', cursor: 'pointer', fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? 'var(--accent)' : 'var(--text2)', fontSize: 14, whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}>{tab}</button>
          ))}
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', padding: 8 }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => switchTab(tab)}
                style={{
                  display: 'block', width: '100%', padding: '12px 16px', border: 'none', textAlign: 'left',
                  background: activeTab === tab ? 'var(--accent-light)' : 'transparent',
                  color: activeTab === tab ? 'var(--accent)' : 'var(--text)', fontWeight: activeTab === tab ? 700 : 400,
                  cursor: 'pointer', borderRadius: 8, fontSize: 15
                }}>{tab}</button>
            ))}
          </div>
        )}
      </header>

      {/* ============ OVERVIEW ============ */}
      {activeTab === 'Overview' && (
        <>
          {/* Hero */}
          <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--dark2))', color: 'white', padding: '60px 16px', textAlign: 'center' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
                Climate Risk Is Reshaping Africa&apos;s Financial Sector
              </h1>
              <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', opacity: 0.85, maxWidth: 700, margin: '0 auto 32px' }}>
                Starting in Kenya and scaling across the continent. Banks, SACCOs, insurers, pension funds, DFIs, and climate funds all need reliable climate risk data. We&apos;re building the infrastructure to collect, analyse, and report it.
              </p>
              <div className="grid-4" style={{ maxWidth: 800, margin: '0 auto' }}>
                {[['1,500+', 'Institutions in Kenya'], ['$4B+', 'Climate Finance Flowing'], ['8', 'Sectors Covered'], ['10+', 'African Markets']].map(([v, l]) => (
                  <div key={l as string} className="kpi">
                    <div className="kpi-value" style={{ color: '#6ee7b7' }}>{v}</div>
                    <div className="kpi-label" style={{ color: 'rgba(255,255,255,0.7)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="urgency-bar">
            Climate disclosure is accelerating across Africa &nbsp;|&nbsp; 10+ African markets moving toward structured reporting &nbsp;|&nbsp; Institutions with climate data access cheaper capital
          </div>

          <div className="section">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>The Climate Risk Landscape</h2>
            <h3 style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 16 }}>Climate Data Is the New Infrastructure</h3>
            <p style={{ color: 'var(--text2)', marginBottom: 32, maxWidth: 900 }}>
              From banks assessing loan book exposures to DFIs tracking portfolio impact, from insurers modelling claims risk to climate funds measuring outcomes. Every player in Kenya&apos;s financial ecosystem needs reliable, granular climate data. The institutions that build this capability now will access cheaper capital, make better risk decisions, and lead the transition to a climate-resilient economy.
            </p>

            {/* Timeline */}
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Kenya&apos;s Climate Finance Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {[
                { date: 'Apr 2025', text: 'Kenya Green Finance Taxonomy (KGFT) and Climate Risk Disclosure Framework launched', color: 'var(--accent)' },
                { date: 'Apr 2025 \u2013 Sep 2026', text: '18-month voluntary adoption period. Institutions build internal capacity', color: 'var(--blue)' },
                { date: 'Oct 2026', text: 'Climate risk reporting begins for banks and mortgage finance companies', color: 'var(--red)' },
                { date: 'Jan 2027', text: 'IFRS S1 & S2 adoption for ALL Public Interest Entities', color: 'var(--red)' },
                { date: 'Jan 2028', text: 'Large Non-PIEs expected to adopt', color: 'var(--amber)' },
                { date: 'Jan 2029', text: 'SMEs brought into scope. Full economy-wide climate disclosure', color: 'var(--amber)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 12, height: 12, borderRadius: '50%', background: item.color, marginTop: 6 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: item.color }}>{item.date}</div>
                    <div style={{ color: 'var(--text2)', fontSize: 14 }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Who We Serve */}
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Who We Serve</h2>
            <div className="grid-3" style={{ marginBottom: 40 }}>
              {[
                { icon: '\ud83c\udfe2', title: 'Commercial Banks', count: '39 licensed banks', framework: 'IFRS S2 / TCFD', assets: 'KSH 7.2T', challenge: 'MSME data collection' },
                { icon: '\ud83e\udd1d', title: 'Deposit-Taking SACCOs', count: '176 licensed DT-SACCOs', framework: 'IFRS S1 + S2', assets: 'KSH 900B+', challenge: 'Building climate data infrastructure' },
                { icon: '\ud83d\udee1', title: 'Insurance Companies', count: '62 licensed insurers', framework: 'IFRS S1 + S2', assets: 'KSH 320B+ premiums', challenge: 'Claims exposure modelling' },
                { icon: '\ud83d\udcb0', title: 'Pension Funds', count: '1,200+ registered schemes', framework: 'IFRS S1 + S2', assets: 'KSH 1.8T+ AUM', challenge: 'Portfolio-level climate data' },
                { icon: '\ud83c\udfe6', title: 'Microfinance Banks', count: '14 licensed MFBs', framework: 'IFRS S2 / TCFD', assets: 'KSH 120B+', challenge: '100% MSME portfolios' },
                { icon: '\ud83d\udcc8', title: 'NSE-Listed Companies', count: '~65 listed issuers', framework: 'NSE ESG + IFRS S2', assets: 'KSH 2.1T+ market cap', challenge: 'Scope 3 supply chain data' },
                { icon: '\ud83c\udf0d', title: 'DFIs, Climate Funds & Partners', count: 'IFC, FMO, Norfund, GCF, KfW, EIB, AfDB, Proparco', framework: 'TCFD, PCAF, IFC PS', assets: '$4B+ climate finance', challenge: 'Investee-level climate data' },
              ].map((seg) => (
                <div key={seg.title} className="card card-accent">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{seg.icon}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{seg.title}</h4>
                  <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8 }}>{seg.count}</div>
                  <div style={{ fontSize: 13 }}><strong>Framework:</strong> {seg.framework}</div>
                  <div style={{ fontSize: 13 }}><strong>Assets:</strong> {seg.assets}</div>
                  <div style={{ fontSize: 13 }}><strong>Challenge:</strong> {seg.challenge}</div>
                </div>
              ))}
            </div>

            {/* Platform */}
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Our Platform</h2>
            <div className="grid-3" style={{ marginBottom: 40 }}>
              {[
                { title: '1. Data Collection', subtitle: 'Climate Data Capture Engine', items: ['Borrower & member-level climate data collection', 'Digital forms for relationship officers', 'Sector-specific templates (agri, manufacturing, trade)', 'Works for MSME lending, insurance, fund portfolios', 'Offline-capable for field officers'], color: 'var(--accent)' },
                { title: '2. Reporting Engine', subtitle: 'Reporting & Analytics Engine', items: ['IFRS S1 & S2 climate disclosures', 'TCFD-aligned reporting outputs', 'KGFT activity classification engine', 'PCAF-aligned financed emissions calculation', 'DFI impact reporting & portfolio analytics'], color: 'var(--blue)' },
                { title: '3. Intelligence', subtitle: 'Board & Management Dashboard', items: ['Real-time climate risk exposure visibility', 'Portfolio alignment tracking (green vs brown)', 'Physical & transition risk heatmaps', 'Stakeholder-ready data exports', 'Benchmarking against sector peers'], color: 'var(--purple)' },
              ].map((layer) => (
                <div key={layer.title} className="card" style={{ borderTop: `3px solid ${layer.color}` }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: layer.color, marginBottom: 4 }}>{layer.title}</h4>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{layer.subtitle}</div>
                  <ul style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 16 }}>
                    {layer.items.map(item => <li key={item} style={{ marginBottom: 4 }}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Climate Data Gap */}
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>The Climate Data Gap</h2>
            <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16 }}>Kenya&apos;s Climate Risk Data Landscape (Current state Q1 2026)</p>
            <div className="grid-3" style={{ marginBottom: 40 }}>
              {[
                ['500+', 'Institutions Needing Data', 'Across 7 segments'],
                ['73%', 'Banks with Climate Reports to CBK', 'KBA Sustainability Report 2024'],
                ['43.7%', 'Average ESG Score', 'WWF SUSBA 2025'],
                ['$4B+', 'DFI Climate Finance', 'Flowing into Kenya'],
                ['KSH 13T+', 'Total Assets at Stake', 'Across all segments'],
              ].map(([value, label, source]) => (
                <div key={label as string} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{value}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{source}</div>
                </div>
              ))}
            </div>

            {/* Why Partner Now */}
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Why Partner With Us Now</h2>
            <div className="grid-2" style={{ marginBottom: 40 }}>
              {[
                { title: 'Kenya-Native Climate Intelligence', text: "Not a generic ESG tool adapted for Africa. Built from the ground up around Kenya's Green Finance Taxonomy, 47-county hazard data, KeSIC sector codes, and the specific climate risks facing East African economies." },
                { title: 'One Platform, Every Stakeholder', text: 'Banks, SACCOs, insurers, pension funds, MFBs, listed companies, DFIs, and climate funds, all served by a single adaptable platform. The data flows up, down, and across the ecosystem.' },
                { title: 'Built for Institutions That Need a Partner', text: "Most institutions don't have ESG teams or climate risk expertise. We're building a platform with guided workflows, pre-built templates, and automated analytics." },
                { title: 'Connects You to Climate Capital', text: 'Institutions with climate data access DFI concessional capital, green bonds, and blended finance. For DFIs, our platform provides the investee-level data you need.' },
                { title: 'Channel-Ready for Partners', text: 'Audit firms, consulting firms, industry associations, and development agencies can deploy CFOIP across their portfolios. White-label options available.' },
                { title: "Shape What We're Building", text: "We're building alongside our first partners. Early adopters get preferential pricing, a genuine voice in product development, and the ability to tailor the platform." },
              ].map((item) => (
                <div key={item.title} className="card card-accent">
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text2)' }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Engagement Model */}
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Engagement Model</h2>
            <div className="grid-3" style={{ marginBottom: 32 }}>
              {[
                { phase: '01', title: 'Discovery & Assessment', period: 'Weeks 1-3', items: ['Map current climate risk data landscape', 'Identify portfolio data gaps', 'Define reporting & analytics requirements', 'Assess internal capacity & systems', 'Scope platform configuration'] },
                { phase: '02', title: 'Platform Configuration', period: 'Weeks 4-8', items: ['Configure data collection templates', 'Map portfolio to KGFT taxonomy', 'Set up reporting engine outputs', 'Integrate with existing systems', 'Train compliance & field teams'] },
                { phase: '03', title: 'Go-Live & Ongoing Support', period: 'Week 9+', items: ['First climate risk report generated', 'Board dashboard activated', 'Quarterly reporting cycles automated', 'Evolving standards built in automatically', 'Ongoing support & optimisation'] },
              ].map((phase) => (
                <div key={phase.phase} className="card card-accent">
                  <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, marginBottom: 4 }}>{phase.phase} \u2014 {phase.period}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{phase.title}</h4>
                  <ul style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 16 }}>
                    {phase.items.map(item => <li key={item} style={{ marginBottom: 4 }}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ============ GET STARTED ============ */}
      {activeTab === 'Get Started' && (
        <div className="section">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Let&apos;s Build Kenya&apos;s Climate Risk Infrastructure Together</h1>
            <p style={{ color: 'var(--text2)', maxWidth: 700, margin: '0 auto 20px', fontSize: 16 }}>
              Whether you&apos;re an institution managing climate risk, a DFI tracking portfolio impact, a climate fund deploying capital, or a partner serving multiple stakeholders &mdash; we&apos;d love to show you what we&apos;re building.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <button className="btn btn-primary" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>Request a Demo</button>
              <button className="btn btn-outline" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>Partner With Us</button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text2)' }}>Mary Ndinda | Founder &amp; CEO | partner@cfopartners.fund</p>
          </div>

          <div id="contact-form" className="card" style={{ maxWidth: 700, margin: '0 auto 40px' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Let&apos;s Talk About Your Climate Risk Needs</h3>
            <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>Answer a few quick questions so we can prepare the right conversation for you. You&apos;ll hear from us within 24 hours.</p>

            {gsStatus === 'success' ? (
              <div className="card card-accent" style={{ textAlign: 'center', padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{'\u2713'}</div>
                <h4 style={{ fontSize: 18, marginBottom: 8 }}>Thank you!</h4>
                <p style={{ color: 'var(--text2)' }}>We&apos;ve received your details. Mary will reach out to you within 24 hours to schedule a conversation.</p>
              </div>
            ) : (
              <form onSubmit={submitGetStarted}>
                <div style={{ position: 'absolute', left: '-9999px' }}>
                  <input value={gsForm.honeypot} onChange={e => setGsForm({ ...gsForm, honeypot: e.target.value })} tabIndex={-1} autoComplete="off" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Your Name *</label>
                    <input className="input-field" required value={gsForm.name} onChange={e => setGsForm({ ...gsForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Email Address *</label>
                    <input className="input-field" type="email" required value={gsForm.email} onChange={e => setGsForm({ ...gsForm, email: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Organisation Name *</label>
                    <input className="input-field" required value={gsForm.organisation} onChange={e => setGsForm({ ...gsForm, organisation: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>What type of organisation are you? *</label>
                    <select className="input-field" required value={gsForm.orgType} onChange={e => setGsForm({ ...gsForm, orgType: e.target.value })}>
                      <option value="">Select...</option>
                      {ORG_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Where are you on your climate risk journey? *</label>
                    <select className="input-field" required value={gsForm.journeyStage} onChange={e => setGsForm({ ...gsForm, journeyStage: e.target.value })}>
                      <option value="">Select...</option>
                      {JOURNEY_STAGES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>What&apos;s your biggest challenge right now?</label>
                    <select className="input-field" value={gsForm.biggestChallenge} onChange={e => setGsForm({ ...gsForm, biggestChallenge: e.target.value })}>
                      <option value="">Select...</option>
                      {CHALLENGES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Anything else you&apos;d like us to know?</label>
                    <textarea className="input-field" value={gsForm.notes} onChange={e => setGsForm({ ...gsForm, notes: e.target.value })} />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={gsStatus === 'submitting'} style={{ width: '100%' }}>
                    {gsStatus === 'submitting' ? 'Submitting...' : "Submit & We'll Be in Touch"}
                  </button>
                  {gsStatus === 'error' && <p style={{ color: 'var(--red)', fontSize: 14 }}>Something went wrong. Please try again or email partner@cfopartners.fund directly.</p>}
                </div>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 700, margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Frequently Asked Questions</h2>
            {[
              { q: 'How long does it take to get set up?', a: "For most institutions, initial onboarding takes 2 to 4 weeks. This includes system configuration, data mapping, and training. You'll be collecting data and generating initial reports within the first month." },
              { q: "What if we don't have any climate data yet?", a: "That's exactly who we built this for. The platform walks you through collecting the right data from your borrowers, investees, or operations using guided workflows. You don't need existing data to get started." },
              { q: 'What does it cost?', a: "Pricing depends on institution size, type, and scope. We offer tiered pricing so smaller institutions pay less. For DFIs looking to deploy across multiple investees, we have portfolio licensing. Let's talk and we'll give you a clear picture." },
              { q: 'Can we try it before committing?', a: "Yes. We offer a guided demo using your own institution's profile so you can see exactly how the platform works for your specific situation before making any decisions." },
              { q: "We're already doing some of this in-house. Can CFOIP help?", a: "Absolutely. Many institutions have started with spreadsheets or manual processes. CFOIP is designed to automate and standardise what you're already doing, plug the gaps, and generate the reports that regulators and funders expect." },
              { q: "I'm a DFI / climate fund. How do we work with you?", a: "DFIs can co-deploy CFOIP with their investees as part of lending agreements or TA packages. You get portfolio-level climate dashboards across all investees using the platform." },
            ].map((faq, i) => (
              <div key={i} className="card" style={{ marginBottom: 12 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: 'var(--dark)' }}>{faq.q}</h4>
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>{faq.a}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: 32 }}>
            <p style={{ fontWeight: 700, fontSize: 16 }}>Mary Ndinda &mdash; Founder &amp; CEO, CFO Innovation Partners</p>
            <p style={{ color: 'var(--text2)', fontSize: 14 }}>partner@cfopartners.fund &nbsp;|&nbsp; +254 748 918 910</p>
          </div>
        </div>
      )}

      {/* ============ FREE DIAGNOSTIC ============ */}
      {activeTab === 'Free Diagnostic' && (
        <div className="section">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Climate Risk Readiness Diagnostic</h1>
            <p style={{ color: 'var(--text2)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
              Find out where your institution stands on climate risk readiness. Complete this short diagnostic and we&apos;ll provide a personalised assessment with recommendations.
            </p>
          </div>

          <div className="card" style={{ maxWidth: 750, margin: '0 auto 40px' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Your Climate Risk Readiness Assessment</h3>

            {diagStatus === 'success' ? (
              <div className="card card-accent" style={{ textAlign: 'center', padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{'\u2713'}</div>
                <h4 style={{ fontSize: 18, marginBottom: 8 }}>Thank you!</h4>
                <p style={{ color: 'var(--text2)' }}>We&apos;ve received your diagnostic. Mary will review your responses and send you a personalised climate risk readiness assessment within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={submitDiagnostic}>
                <div style={{ position: 'absolute', left: '-9999px' }}>
                  <input value={diagForm.honeypot} onChange={e => setDiagForm({ ...diagForm, honeypot: e.target.value })} tabIndex={-1} autoComplete="off" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* About Your Institution */}
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>About Your Institution</h4>
                  <div className="grid-2">
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Institution Name *</label>
                      <input className="input-field" required value={diagForm.institutionName} onChange={e => setDiagForm({ ...diagForm, institutionName: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Your Name *</label>
                      <input className="input-field" required value={diagForm.name} onChange={e => setDiagForm({ ...diagForm, name: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Email Address *</label>
                      <input className="input-field" type="email" required value={diagForm.email} onChange={e => setDiagForm({ ...diagForm, email: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Your Role *</label>
                      <input className="input-field" required value={diagForm.role} onChange={e => setDiagForm({ ...diagForm, role: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Institution Type *</label>
                      <select className="input-field" required value={diagForm.institutionType} onChange={e => setDiagForm({ ...diagForm, institutionType: e.target.value })}>
                        <option value="">Select...</option>
                        {['Commercial Bank', 'Microfinance Bank', 'SACCO', 'Insurance Company', 'Pension Fund / Fund Manager', 'NSE-Listed Company', 'DFI / Climate Fund', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Approximate Total Assets or AUM *</label>
                      <select className="input-field" required value={diagForm.assets} onChange={e => setDiagForm({ ...diagForm, assets: e.target.value })}>
                        <option value="">Select...</option>
                        {ASSET_RANGES.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Number of Borrowers / Members / Policyholders</label>
                    <select className="input-field" value={diagForm.borrowers} onChange={e => setDiagForm({ ...diagForm, borrowers: e.target.value })}>
                      <option value="">Select...</option>
                      {BORROWER_RANGES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  {/* Current Status */}
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Current Climate Risk Status</h4>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Do you have a dedicated ESG or sustainability team? *</label>
                    <select className="input-field" required value={diagForm.esgTeam} onChange={e => setDiagForm({ ...diagForm, esgTeam: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Yes, we have a dedicated team">Yes, we have a dedicated team</option>
                      <option value="Yes, part of another team">Yes, it&apos;s part of another team (risk, compliance, etc.)</option>
                      <option value="No, but planning to">No, but we&apos;re planning to establish one</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Have you submitted any climate-related reports to your regulator? *</label>
                    <select className="input-field" required value={diagForm.submittedReports} onChange={e => setDiagForm({ ...diagForm, submittedReports: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Yes, comprehensive">Yes, comprehensive climate risk reports</option>
                      <option value="Yes, basic">Yes, basic or initial reports</option>
                      <option value="Preparing first">We&apos;re currently preparing our first report</option>
                      <option value="No">No, we haven&apos;t submitted any yet</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Do you collect climate-related data from your borrowers, members, or investees? *</label>
                    <select className="input-field" required value={diagForm.collectsData} onChange={e => setDiagForm({ ...diagForm, collectsData: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Yes, systematic">Yes, we have a systematic process</option>
                      <option value="Yes, ad hoc">Yes, but it&apos;s ad hoc or incomplete</option>
                      <option value="No, planning">No, but we&apos;re planning to start</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Have you classified your portfolio against the Kenya Green Finance Taxonomy (KGFT)?</label>
                    <select className="input-field" value={diagForm.kgftClassified} onChange={e => setDiagForm({ ...diagForm, kgftClassified: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Fully classified">Yes, fully classified</option>
                      <option value="Partially">Yes, partially classified</option>
                      <option value="Aware, not started">Aware of KGFT but haven&apos;t started</option>
                      <option value="Not familiar">Not yet familiar with KGFT</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Have you measured your financed emissions (PCAF methodology)?</label>
                    <select className="input-field" value={diagForm.pcafMeasured} onChange={e => setDiagForm({ ...diagForm, pcafMeasured: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Yes">Yes, we measure financed emissions</option>
                      <option value="In process">We&apos;re in the process of measuring</option>
                      <option value="Aware, not started">Aware of PCAF but haven&apos;t started</option>
                      <option value="Not familiar">Not yet familiar with PCAF</option>
                    </select>
                  </div>

                  {/* Frameworks */}
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Reporting Frameworks &amp; Deadlines</h4>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Which frameworks are you preparing for?</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {FRAMEWORKS.map(f => (
                        <label key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', padding: '6px 12px', border: `1px solid ${diagForm.frameworks.includes(f) ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 20, background: diagForm.frameworks.includes(f) ? 'var(--accent-light)' : 'white' }}>
                          <input type="checkbox" checked={diagForm.frameworks.includes(f)} onChange={() => toggleFramework(f)} style={{ display: 'none' }} />
                          {f}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>What&apos;s your most pressing reporting deadline?</label>
                    <select className="input-field" value={diagForm.deadline} onChange={e => setDiagForm({ ...diagForm, deadline: e.target.value })}>
                      <option value="">Select...</option>
                      {DEADLINES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  {/* Challenges */}
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>Your Biggest Challenges</h4>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>What are your top challenges with climate risk compliance?</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {DIAG_CHALLENGES.map(c => (
                        <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                          <input type="checkbox" checked={diagForm.challenges.includes(c)} onChange={() => toggleChallenge(c)} />
                          {c}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, display: 'block' }}>Tell us more about your situation</label>
                    <textarea className="input-field" value={diagForm.moreInfo} onChange={e => setDiagForm({ ...diagForm, moreInfo: e.target.value })} />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={diagStatus === 'submitting'} style={{ width: '100%' }}>
                    {diagStatus === 'submitting' ? 'Submitting...' : 'Get Your Free Diagnostic Assessment'}
                  </button>
                  {diagStatus === 'error' && <p style={{ color: 'var(--red)', fontSize: 14 }}>Something went wrong. Please try again or email partner@cfopartners.fund directly.</p>}
                </div>
              </form>
            )}
          </div>

          {/* What You'll Get */}
          <div className="grid-4" style={{ maxWidth: 900, margin: '0 auto 40px' }}>
            {[
              { icon: '\ud83d\udcca', title: 'Readiness Score', text: 'A clear assessment of where your institution stands, benchmarked against your sector peers.' },
              { icon: '\ud83d\udd0d', title: 'Gap Analysis', text: "A breakdown of what you have in place, what's missing, and what needs to be built." },
              { icon: '\ud83d\uddfa', title: 'Prioritised Roadmap', text: 'A recommended sequence of steps to achieve compliance, tailored to your institution.' },
              { icon: '\ud83d\udcde', title: '30-Minute Consultation', text: 'A complimentary call to walk through your results and discuss practical next steps.' },
            ].map((item) => (
              <div key={item.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text2)' }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--text2)' }}>
              With CBK CRDF reporting starting October 2026 and IFRS S1/S2 from January 2027, every financial institution in Kenya needs to understand their readiness gap. This diagnostic is free, confidential, and takes about 5 minutes. No commitment required.
            </p>
          </div>
        </div>
      )}

      {/* ============ FOR BANKS ============ */}
      {activeTab === 'For Banks' && (
        <div className="section">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Climate Risk Reporting for Kenyan Banks</h1>
          <p style={{ color: 'var(--text2)', maxWidth: 800, marginBottom: 32, fontSize: 16 }}>
            Climate disclosure frameworks are taking shape across Kenya&apos;s financial sector. The biggest challenge is the same: collecting climate data from thousands of borrowers and turning it into reports your board, regulators, and funders can use.
          </p>

          <div className="card" style={{ marginBottom: 32, borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>What&apos;s Coming Into Focus</h3>
            <p style={{ fontSize: 14, color: 'var(--text2)' }}>
              The CBK&apos;s Climate Risk Disclosure Framework outlines 9 standardised templates. IFRS S2 introduces quantitative scenario analysis, Scope 1/2/3 emissions, and financial impact estimates. The real question isn&apos;t what&apos;s expected &mdash; it&apos;s how to build the systems that collect borrower-level climate data across your entire loan book, every quarter, at a quality your auditors will accept.
            </p>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>What Your Bank Needs to Produce</h2>
          <div className="grid-3" style={{ marginBottom: 32 }}>
            {[
              { title: 'CBK CRDF Templates', text: 'Physical Risk Assessment (A & B), Transition Risk (A, B & C), Materiality Matrix, Governance Structure, Qualitative Disclosures, Metrics & Targets', color: 'var(--accent)' },
              { title: 'IFRS S2 Disclosures', text: 'Climate-related risks and opportunities, scenario analysis (1.5\u00b0C and 3\u00b0C), Scope 1, 2, and material Scope 3 emissions, financial impact quantification', color: 'var(--blue)' },
              { title: 'KGFT Classification', text: 'Every loan in your book classified against Kenya Green Finance Taxonomy activities. Green, transitional, or brown.', color: 'var(--accent)' },
              { title: 'PCAF Financed Emissions', text: 'Scope 3 Category 15: financed emissions across your lending portfolio, using PCAF methodology', color: 'var(--teal)' },
              { title: 'Board Reporting', text: 'Real-time climate risk dashboards showing portfolio exposure, green/brown split, and peer benchmarking', color: 'var(--purple)' },
            ].map(item => (
              <div key={item.title} className="card" style={{ borderTop: `3px solid ${item.color}` }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text2)' }}>{item.text}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Where Banks Get Stuck</h2>
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {[
              { title: 'Borrower Data Collection', text: 'You have thousands of borrowers. Getting climate-relevant data from each one manually is not practical.' },
              { title: 'MSME Portfolios', text: "Small businesses don't have sustainability reports. Your RM team needs a structured way to collect data during existing touchpoints." },
              { title: 'Turning Data Into Reports', text: "Collecting data is step one. Calculating financed emissions, running scenario analysis, classifying against KGFT, and generating the 9 CRDF templates is step two." },
              { title: 'Doing It Every Quarter', text: "This isn't a one-off exercise. You need a repeatable system your team can run every reporting cycle." },
            ].map(item => (
              <div key={item.title} className="card card-red">
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text2)' }}>{item.text}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>What CFOIP Does For Your Bank</h2>
          <div className="grid-3" style={{ marginBottom: 32 }}>
            {[
              { title: '1. Collect', subtitle: 'Borrower Climate Data', items: ['Digital forms your RMs use during client visits', 'Sector-specific templates (agri, manufacturing, trade)', 'Works with MSMEs who have no ESG data', 'Offline-capable for field visits', 'Integrates with your core banking system'], color: 'var(--accent)' },
              { title: '2. Analyse', subtitle: 'Risk Engine & Reports', items: ['All 9 CBK CRDF templates', 'IFRS S2 climate disclosures', 'KGFT loan portfolio classification', 'PCAF financed emissions calculation', 'Physical & transition risk scoring per borrower'], color: 'var(--blue)' },
              { title: '3. Report', subtitle: 'Board & Regulator Dashboards', items: ['Real-time portfolio climate risk exposure', 'Green vs brown loan book split', 'County-level physical risk heatmaps', 'Sector concentration risk views', 'Peer benchmarking across Kenyan banks'], color: 'var(--purple)' },
            ].map(item => (
              <div key={item.title} className="card" style={{ borderTop: `3px solid ${item.color}` }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.title}</h4>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{item.subtitle}</div>
                <ul style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 16 }}>
                  {item.items.map(i => <li key={i} style={{ marginBottom: 4 }}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>The Bigger Picture for Your Bank</h2>
          <div className="grid-3" style={{ marginBottom: 32 }}>
            <div className="card card-accent">
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Access Cheaper Capital</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>DFIs like IFC, FMO, and KfW offer concessional green credit lines to banks that can demonstrate climate risk management.</p>
            </div>
            <div className="card card-blue">
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Better Risk Decisions</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>Understanding which borrowers sit in flood zones, which sectors face transition risk helps your credit team price risk more accurately.</p>
            </div>
            <div className="card card-purple">
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Competitive Advantage</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>Banks that move early on climate data will be better positioned with regulators, investors, and international partners.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Let&apos;s Talk About Your Bank&apos;s Climate Risk Needs</h3>
            <p style={{ color: 'var(--text2)', marginBottom: 16 }}>We&apos;d like to show you how the platform works using your own portfolio structure.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => switchTab('Get Started')}>Book a Demo</button>
              <button className="btn btn-outline" onClick={() => switchTab('Free Diagnostic')}>Take the Diagnostic</button>
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 14, marginTop: 12 }}>Mary Ndinda | Founder &amp; CEO | partner@cfopartners.fund</p>
          </div>
        </div>
      )}

      {/* ============ MARKET ============ */}
      {activeTab === 'Market' && (
        <div className="section">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Kenya&apos;s Climate Risk Ecosystem</h1>
          <p style={{ color: 'var(--text2)', marginBottom: 24 }}>All the institutions, funders, and partners that need climate data.</p>

          {/* KPI row */}
          <div className="grid-4" style={{ marginBottom: 24 }}>
            {[['39', 'Licensed Banks'], ['176', 'DT-SACCOs'], ['62', 'Insurers'], ['1,200+', 'Pension Schemes'], ['14', 'MFBs']].map(([v, l]) => (
              <div key={l as string} className="card kpi">
                <div className="kpi-value">{v}</div>
                <div className="kpi-label">{l}</div>
              </div>
            ))}
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
            {([['banks', 'Commercial Banks'], ['saccos', 'DT-SACCOs'], ['insurers', 'Insurers'], ['pension', 'Pension Schemes'], ['mfbs', 'MFBs']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setMarketSub(key)} className={`btn ${marketSub === key ? 'btn-primary' : 'btn-outline'}`} style={{ whiteSpace: 'nowrap', fontSize: 13 }}>{label}</button>
            ))}
          </div>

          {/* Regulatory Comparison */}
          <div className="card" style={{ marginBottom: 32, overflowX: 'auto' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Regulatory Framework Comparison</h3>
            <table>
              <thead>
                <tr><th>Dimension</th><th>Banks</th><th>SACCOs</th><th>Insurers</th><th>Pension</th><th>MFBs</th></tr>
              </thead>
              <tbody>
                <tr><td style={{ fontWeight: 600 }}>Regulator</td><td>CBK</td><td>SASRA</td><td>IRA</td><td>RBA</td><td>CBK</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Framework</td><td>CBK CRDF + IFRS S2</td><td>IFRS S1 + S2</td><td>IFRS S1 + S2</td><td>IFRS S1 + S2</td><td>CBK CRDF + IFRS S2</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Timeline</td><td>Oct 2026 / Jan 2027</td><td>Jan 2027</td><td>Jan 2027</td><td>Jan 2027</td><td>Oct 2026 / Jan 2027</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Progress</td><td>73% submitted reports</td><td>Capacity building</td><td>Early movers</td><td>Emerging</td><td>Capacity needed</td></tr>
                <tr><td style={{ fontWeight: 600 }}>CFOIP Relevance</td><td><span className="badge badge-green">High</span></td><td><span className="badge badge-green">Very High</span></td><td><span className="badge badge-green">High</span></td><td><span className="badge badge-amber">Mod-High</span></td><td><span className="badge badge-green">Very High</span></td></tr>
              </tbody>
            </table>
          </div>

          {/* Market Sub-tab Content */}
          {marketSub === 'banks' && (
            <>
              <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Commercial Banks</h3>
                <div className="grid-4" style={{ marginBottom: 12 }}>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>39</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Licensed by CBK</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>KSH 7.2T+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Total Assets</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>KSH 3.8T+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Loan Book</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>73%</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Submitted Reports</div></div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>Banks touch every part of the economy through lending. A bank&apos;s climate risk sits in its loan book. Measuring that exposure across thousands of borrowers is where the real challenge lies.</p>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Tier 1 Banks (9) &mdash; ~75% of total assets</h3>
              <div className="card" style={{ marginBottom: 24, overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>#</th><th>Bank</th><th>Est. Assets (KSH B)</th><th>Ownership</th><th>Sustainability Data</th></tr></thead>
                  <tbody>
                    {BANKS_TIER1.map(b => <tr key={b.n}><td>{b.n}</td><td style={{ fontWeight: 600 }}>{b.name}</td><td>{b.assets}</td><td>{b.ownership}</td><td><span className="badge badge-green">{b.esg}</span></td></tr>)}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Tier 2 Banks (10)</h3>
              <div className="card" style={{ marginBottom: 24, overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>#</th><th>Bank</th><th>Est. Assets (KSH B)</th><th>Ownership</th></tr></thead>
                  <tbody>
                    {BANKS_TIER2.map(b => <tr key={b.n}><td>{b.n}</td><td style={{ fontWeight: 600 }}>{b.name}</td><td>{b.assets}</td><td>{b.ownership}</td></tr>)}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Tier 3 Banks (20)</h3>
              <div className="card" style={{ marginBottom: 24, overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>#</th><th>Bank</th><th>Est. Assets (KSH B)</th><th>Ownership</th></tr></thead>
                  <tbody>
                    {BANKS_TIER3.map(b => <tr key={b.n}><td>{b.n}</td><td style={{ fontWeight: 600 }}>{b.name}</td><td>{b.assets}</td><td>{b.ownership}</td></tr>)}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>CFOIP Approach by Bank Tier</h3>
              <div className="grid-3" style={{ marginBottom: 24 }}>
                <div className="card card-accent"><h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Tier 1 (9 banks)</h4><p style={{ fontSize: 13, color: 'var(--text2)' }}>Have started ESG reporting but need automated climate data collection from borrowers and CRDF template generation. CFOIP plugs into existing risk systems.</p></div>
                <div className="card card-blue"><h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Tier 2 (10 banks)</h4><p style={{ fontSize: 13, color: 'var(--text2)' }}>Most have no ESG infrastructure. Need the full platform: borrower data collection, risk analysis, report generation. Many face DFI pressure.</p></div>
                <div className="card card-amber"><h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Tier 3 (20 banks)</h4><p style={{ fontSize: 13, color: 'var(--text2)' }}>Smallest banks with least internal capacity. Many are pan-African subsidiaries facing group-level pressure. CFOIP provides a turnkey solution.</p></div>
              </div>
            </>
          )}

          {marketSub === 'saccos' && (
            <>
              <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Deposit-Taking SACCOs</h3>
                <div className="grid-4" style={{ marginBottom: 12 }}>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>176</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>SASRA-regulated</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>KSH 900B+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Total Assets</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>6.5M+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Total Members</div></div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>SACCOs are classified as Public Interest Entities by ICPAK and must adopt IFRS S1 &amp; S2 from January 2027. Yet virtually none have ESG teams. This creates a massive market for an automated, low-touch solution.</p>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Top 12 DT-SACCOs by Assets</h3>
              <div className="card" style={{ overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>#</th><th>SACCO</th><th>Est. Assets (KSH B)</th><th>Members</th><th>Sector</th></tr></thead>
                  <tbody>
                    {SACCOS.map(s => <tr key={s.n}><td>{s.n}</td><td style={{ fontWeight: 600 }}>{s.name}</td><td>{s.assets}</td><td>{s.members}</td><td>{s.sector}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {marketSub === 'insurers' && (
            <>
              <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Insurance Companies</h3>
                <div className="grid-4" style={{ marginBottom: 12 }}>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>62</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Licensed insurers</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>KSH 320B+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Gross Premiums</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>KSH 850B+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Industry Assets</div></div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>Insurers face a double exposure to climate risk &mdash; physical risks increase claims, while investment portfolios carry transition risk. CFOIP addresses both sides.</p>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Priority Insurance Targets</h3>
              <div className="card" style={{ overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>Insurer</th><th>Type</th><th>Premiums</th><th>Sustainability Data</th></tr></thead>
                  <tbody>
                    {INSURERS.map(i => <tr key={i.name}><td style={{ fontWeight: 600 }}>{i.name}</td><td>{i.type}</td><td>{i.premiums}</td><td>{i.esg}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {marketSub === 'pension' && (
            <>
              <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Pension Schemes</h3>
                <div className="grid-4" style={{ marginBottom: 12 }}>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>1,200+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Registered schemes</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>KSH 1.8T+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Assets Under Mgmt</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>25+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Licensed Fund Managers</div></div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>Pension funds invest through intermediaries. Climate risk sits across every asset class. CFOIP helps aggregate climate data across asset classes and calculate portfolio-level emissions.</p>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Key Pension Sector Players</h3>
              <div className="card" style={{ overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>Category</th><th>Key Names</th><th>CFOIP Relevance</th></tr></thead>
                  <tbody>
                    <tr><td style={{ fontWeight: 600 }}>Large Schemes</td><td>NSSF (KSH 300B+), LAPTRUST, County Pension Fund, Parliamentary Pension</td><td><span className="badge badge-green">High: direct users</span></td></tr>
                    <tr><td style={{ fontWeight: 600 }}>Fund Managers</td><td>Old Mutual, Britam, Sanlam, ICEA LION, CIC Asset Mgmt, GenAfrica</td><td><span className="badge badge-green">High: channel partners</span></td></tr>
                    <tr><td style={{ fontWeight: 600 }}>Administrators</td><td>Zamara, Minet, CPF Administrators, Enwealth Financial</td><td><span className="badge badge-amber">Medium: referral</span></td></tr>
                    <tr><td style={{ fontWeight: 600 }}>Trustees</td><td>Individual scheme boards across 1,200+ schemes</td><td><span className="badge badge-amber">Medium: dashboards</span></td></tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {marketSub === 'mfbs' && (
            <>
              <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Microfinance Banks</h3>
                <div className="grid-4" style={{ marginBottom: 12 }}>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>14</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Licensed MFBs</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>KSH 120B+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Combined Assets</div></div>
                  <div><span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>2M+</span><div style={{ fontSize: 13, color: 'var(--text2)' }}>Borrowers Served</div></div>
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>All 14 Licensed Microfinance Banks</h3>
              <div className="card" style={{ overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>#</th><th>MFB</th><th>Focus</th><th>Est. Borrowers</th></tr></thead>
                  <tbody>
                    {MFBS.map(m => <tr key={m.n}><td>{m.n}</td><td style={{ fontWeight: 600 }}>{m.name}</td><td>{m.focus}</td><td>{m.borrowers}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* ============ TIMELINE ============ */}
      {activeTab === 'Timeline' && (
        <div className="section">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Kenya Climate Disclosure Roadmap</h1>
          <p style={{ color: 'var(--text2)', marginBottom: 32 }}>All institutions, all deadlines.</p>

          <div className="card" style={{ marginBottom: 32, overflowX: 'auto' }}>
            <table>
              <thead><tr><th>Date</th><th>Milestone</th><th>Institutions Affected</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  { date: 'Oct 2021', milestone: 'CBK issues Climate-Related Risk Management Guidance', affected: 'All commercial banks & MFBs', status: 'Done', color: 'green' },
                  { date: 'Nov 2021', milestone: 'NSE publishes ESG Disclosures Guidance Manual', affected: 'All NSE-listed companies', status: 'Done', color: 'green' },
                  { date: 'Jan 2024', milestone: 'IFRS S1 & S2 voluntary adoption begins', affected: 'All PIEs (voluntary)', status: 'Active', color: 'blue' },
                  { date: 'Apr 2025', milestone: 'CBK issues KGFT & Climate Risk Disclosure Framework', affected: 'All banks & MFBs', status: 'Done', color: 'green' },
                  { date: 'Oct 2026', milestone: 'CBK CRDF reporting begins for banks & MFBs', affected: '39 banks + 14 MFBs', status: '7 months away', color: 'red' },
                  { date: 'Jan 2027', milestone: 'IFRS S1 & S2 adoption for all PIEs', affected: 'Banks, SACCOs, insurers, pension funds, MFBs, listed cos', status: '10 months away', color: 'red' },
                  { date: 'Jan 2028', milestone: 'Large Non-PIEs expected to adopt', affected: 'Large unlisted corporates', status: '22 months away', color: 'amber' },
                  { date: 'Jan 2029', milestone: 'SMEs brought into scope', affected: 'Small & medium enterprises', status: '34 months away', color: 'amber' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{row.date}</td>
                    <td>{row.milestone}</td>
                    <td style={{ fontSize: 13 }}>{row.affected}</td>
                    <td><span className={`badge badge-${row.color}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Climate Disclosure Frameworks by Regulator</h2>
          <div className="grid-2">
            {[
              { title: 'CBK (Banks & MFBs)', text: '9 standardised CRDF templates: Physical Risk A/B, Transition Risk A/B/C, Materiality Matrix, Governance, Qualitative Disclosures, Metrics & Targets, plus KGFT portfolio alignment.', color: 'var(--accent)' },
              { title: 'SASRA (SACCOs)', text: 'IFRS S1 & S2 disclosures integrated into annual audited financial statements. SASRA expected to issue sector-specific guidance.', color: 'var(--blue)' },
              { title: 'IRA (Insurers)', text: 'IFRS S1 & S2 for both underwriting and investment portfolios. IRA coordinating with ICPAK on enhanced guidance.', color: 'var(--purple)' },
              { title: 'RBA (Pension Funds)', text: "IFRS S1 & S2 for investment portfolios. RBA's governance guidelines already include ESG stewardship principles.", color: 'var(--teal)' },
              { title: 'CMA / NSE (Listed Cos)', text: "NSE ESG Guidance Manual + IFRS S2 adoption from Jan 2027. CMA's Code of Corporate Governance references ESG.", color: 'var(--amber)' },
              { title: 'ICPAK (Cross-cutting)', text: 'Overarching mandate. All PIEs must undergo readiness assessment before first disclosure. ICPAK sets the standard; sector regulators enforce.', color: 'var(--red)' },
            ].map(item => (
              <div key={item.title} className="card" style={{ borderTop: `3px solid ${item.color}` }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: item.color }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text2)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ AFRICA ============ */}
      {activeTab === 'Africa' && (
        <div className="section">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Continental Climate Disclosure Landscape</h1>
          <div className="grid-4" style={{ marginBottom: 32 }}>
            {[['30+', 'Countries Adopting IFRS S1/S2'], ['10+', 'African Markets Moving'], ['$30B+', 'DFI Climate Capital to SSA'], ['First', 'Built for African Institutions']].map(([v, l]) => (
              <div key={l as string} className="card kpi">
                <div className="kpi-value">{v}</div>
                <div className="kpi-label">{l}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>African Climate Disclosure Landscape</h2>
          <div className="card" style={{ marginBottom: 32, overflowX: 'auto' }}>
            <table>
              <thead><tr><th>Country</th><th>Regulator</th><th>Status</th><th>Timeline</th><th>Opportunity</th></tr></thead>
              <tbody>
                {AFRICA_MARKETS.map(m => (
                  <tr key={m.country}>
                    <td style={{ fontWeight: 700 }}>{m.country}</td>
                    <td style={{ fontSize: 13 }}>{m.regulator}</td>
                    <td style={{ fontSize: 13 }}>{m.status}</td>
                    <td style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{m.timeline}</td>
                    <td><span className={`badge ${m.opportunity.includes('High') || m.opportunity === 'Launch Market' ? 'badge-green' : 'badge-amber'}`}>{m.opportunity}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card" style={{ marginBottom: 32, borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Why Kenya First, Then the Continent</h3>
            <p style={{ fontSize: 14, color: 'var(--text2)' }}>
              Kenya has the most advanced climate disclosure regulatory environment in Sub-Saharan Africa outside of South Africa. Building and proving the platform here gives CFOIP tested products, reference clients, and a track record that translates directly into Nigeria (Jan 2028), Ghana (Jan 2026), and South Africa (King V from Jan 2026). The core platform is the same everywhere &mdash; what changes is local regulatory mapping, taxonomy alignment, and language.
            </p>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Expansion Channels</h2>
          <div className="grid-2">
            {[
              { title: 'Pan-African Bank Groups', text: 'KCB, Equity, Ecobank, Access, UBA, and Bank of Africa all operate across multiple African markets. A successful Kenya deployment extends to subsidiaries.' },
              { title: 'DFI Networks', text: 'IFC, AfDB, FMO, KfW operate continent-wide. Once CFOIP is embedded in their investee monitoring in Kenya, the same model applies anywhere.' },
              { title: 'EAC Harmonisation', text: 'The East African Community is harmonising financial regulations across Kenya, Uganda, Tanzania, Rwanda, Burundi, DRC, and South Sudan.' },
              { title: 'ICPAK Influence', text: "ICPAK's adoption of IFRS sustainability standards creates a model that other national accounting bodies are watching closely." },
            ].map(item => (
              <div key={item.title} className="card card-accent">
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text2)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ WHY US ============ */}
      {activeTab === 'Why Us' && (
        <div className="section">
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Why CFO Innovation Partners</h1>
          <p style={{ color: 'var(--text2)', maxWidth: 800, marginBottom: 32, fontSize: 16 }}>
            We&apos;re building the climate risk data infrastructure that Kenya&apos;s financial ecosystem needs &mdash; serving institutions, funders, and partners as one connected platform.
          </p>

          <div className="grid-2" style={{ marginBottom: 40 }}>
            {[
              { title: 'Kenya-Native, Not Adapted', text: "Built from the ground up around Kenya's Green Finance Taxonomy, 47-county hazard profiles, KeSIC sector codes, and East African climate risks. Not a European tool with a Kenyan label." },
              { title: 'Every Stakeholder, One Platform', text: "Banks, SACCOs, insurers, pension funds, MFBs, listed companies, DFIs, and climate funds \u2014 all connected through a single platform. Data flows seamlessly." },
              { title: 'Your Climate Risk Partner', text: "Most institutions don't have ESG teams. We're building guided workflows, automated analytics, and ongoing support so you can focus on your core business." },
              { title: 'Technology, Not Consulting', text: "We're not selling hours. We're building technology. Our platform automates what would otherwise require teams of consultants and months of manual data gathering." },
              { title: 'Connects Capital to Impact', text: 'For institutions: climate data unlocks DFI concessional capital and green bonds. For funders: investee-level data to deploy capital confidently.' },
              { title: 'Channel-Ready for Everyone', text: 'Audit firms, consulting firms, industry associations, DFIs can deploy CFOIP across their portfolios. White-label, co-branded, and bulk licensing available.' },
            ].map(item => (
              <div key={item.title} className="card card-accent">
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text2)' }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: 32 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Ready to Talk?</h3>
            <p style={{ color: 'var(--text2)', marginBottom: 16 }}>Whether you&apos;re managing climate risk, advising clients, supporting investees, or tracking impact &mdash; we&apos;d love to hear from you.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => switchTab('Get Started')}>Request a Demo</button>
              <button className="btn btn-outline" onClick={() => switchTab('Get Started')}>Explore Partnership</button>
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 14, marginTop: 12 }}>Mary Ndinda | Founder &amp; CEO | partner@cfopartners.fund | +254 748 918 910</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: 'var(--dark)', color: 'rgba(255,255,255,0.7)', padding: '24px 16px', textAlign: 'center', fontSize: 12 }}>
        <p>&copy; 2026 CFO Innovation Partners. Market data sourced from KBA Sustainability Report 2024, WWF SUSBA 2025, CBK, SASRA, IRA, RBA, CMA, and publicly available institutional reports.</p>
        <p style={{ marginTop: 4 }}>IFRS S1/S2 &bull; TCFD &bull; KGFT &bull; PCAF &bull; IFC PS</p>
        <p style={{ marginTop: 4 }}>partner@cfopartners.fund &nbsp;|&nbsp; +254 748 918 910</p>
      </footer>
    </div>
  )
}
