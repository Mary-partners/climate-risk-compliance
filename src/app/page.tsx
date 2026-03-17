'use client'

import { useState, useEffect, FormEvent } from 'react'

const TABS = ['Overview', 'Services', 'For Banks', 'Market', 'Timeline', 'Africa', 'Blog', 'Why Us', 'Get Started'] as const
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

const LISTED_COS = [
  { name: 'Safaricom PLC', sector: 'Telecoms', marketCap: 'KSH 500B+', esg: 'Published sustainability report', readiness: 'Partial alignment' },
  { name: 'East African Breweries', sector: 'Manufacturing', marketCap: 'KSH 180B+', esg: 'Published sustainability report', readiness: 'Partial alignment' },
  { name: 'BAT Kenya', sector: 'Manufacturing', marketCap: 'KSH 80B+', esg: 'Parent group sustainability report', readiness: 'Significant gap' },
  { name: 'Bamburi Cement', sector: 'Construction', marketCap: 'KSH 45B+', esg: 'Parent group sustainability report', readiness: 'Significant gap' },
  { name: 'Kenya Airways', sector: 'Aviation', marketCap: 'KSH 15B+', esg: 'Annual sustainability disclosures', readiness: 'Significant gap' },
  { name: 'Kakuzi PLC', sector: 'Agriculture', marketCap: 'KSH 8B+', esg: 'Limited sustainability disclosures', readiness: 'Significant gap' },
  { name: 'Sasini PLC', sector: 'Agriculture', marketCap: 'KSH 6B+', esg: 'Limited sustainability disclosures', readiness: 'Significant gap' },
  { name: 'TPS Eastern Africa', sector: 'Hospitality', marketCap: 'KSH 5B+', esg: 'No public sustainability report', readiness: 'Significant gap' },
]

const DFIS = [
  { name: 'IFC (World Bank Group)', type: 'Multilateral DFI', focus: 'Green credit lines, MSME finance, climate advisory', angle: 'Co-deploy with investees' },
  { name: 'EIB / EIF', type: 'Multilateral DFI', focus: 'Green taxonomy partner, climate risk capacity building', angle: 'KGFT alignment partner' },
  { name: 'FMO (Netherlands)', type: 'Bilateral DFI', focus: 'Financial sector climate resilience, green bonds', angle: 'Portfolio reporting tool' },
  { name: 'KfW (Germany)', type: 'Bilateral DFI', focus: 'Green finance, renewable energy, climate adaptation', angle: 'TA package integration' },
  { name: 'Norfund (Norway)', type: 'Bilateral DFI', focus: 'Clean energy, financial inclusion, climate impact', angle: 'Impact measurement' },
  { name: 'Proparco (France)', type: 'Bilateral DFI', focus: 'Green credit lines, climate adaptation', angle: 'Investee data platform' },
  { name: 'AfDB', type: 'Multilateral DFI', focus: 'Africa Green Financing Facility, climate resilience', angle: 'Pan-African scaling' },
  { name: 'Green Climate Fund (GCF)', type: 'Climate Fund', focus: 'Adaptation & mitigation projects across Kenya', angle: 'M&E data partner' },
  { name: 'Global Environment Facility', type: 'Climate Fund', focus: 'Biodiversity, climate change, land degradation', angle: 'Impact tracking' },
  { name: 'USAID / Power Africa', type: 'Dev Agency', focus: 'Clean energy, climate-smart agriculture', angle: 'TA partner' },
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

const BLOG_POSTS = [
  {
    id: 'cbk-crdf-deadline',
    title: "The CBK Climate Risk Deadline Is Real — Here's What Your Bank Needs to Do Before October 2026",
    date: 'March 2026',
    readTime: '8 min read',
    category: 'Regulatory',
    summary: "CBK's Climate-Related Disclosures Framework isn't a suggestion. It's a mandate. And October 2026 is closer than you think.",
    content: `Let's be honest — when CBK first started talking about climate risk disclosures, most banks in Kenya assumed it would be pushed back, watered down, or simply not enforced. That's not what's happening.

The Central Bank of Kenya's Climate-Related Disclosures Framework (CRDF) is now a binding requirement for all supervised institutions. By October 2026, every commercial bank, mortgage finance company, and microfinance bank regulated by CBK must submit their first climate risk report. Not a sustainability statement. Not a few paragraphs in your annual report. A structured, data-backed disclosure covering governance, strategy, risk management, and metrics.

**What the CRDF Actually Requires**

The framework follows the TCFD structure (now absorbed into IFRS S2), with four pillars:

1. **Governance**: How your board and senior management oversee climate-related risks and opportunities. You need documented policies, assigned roles, and evidence that climate risk is on the board agenda — not just once, but regularly.

2. **Strategy**: How climate risks (both physical and transition) affect your business model, lending portfolio, and long-term viability. This means scenario analysis. CBK expects banks to model at least two climate scenarios (e.g., 1.5°C and 3°C warming) and show how your portfolio holds up.

3. **Risk Management**: How you identify, assess, and manage climate risks across your credit, market, and operational risk frameworks. This isn't a separate climate risk silo — it needs to be integrated into your existing risk management processes.

4. **Metrics & Targets**: Quantitative data on your financed emissions (Scope 3, Category 15), exposure to carbon-related assets, green lending portfolio, and the targets you're setting.

**Why Most Banks Aren't Ready**

We've spoken to compliance officers, risk managers, and CFOs across Tier 1, 2, and 3 banks. The pattern is consistent:

- **No internal expertise**: Most banks don't have an ESG or climate risk team. The compliance department is already stretched thin.
- **No data infrastructure**: Collecting climate-relevant data from borrowers — energy sources, sector exposure, physical location risks — requires systems that don't exist yet.
- **No scenario analysis capability**: Running climate stress tests requires technical tools that most Kenyan banks haven't invested in.
- **Board-level gap**: Many boards haven't been briefed on what CRDF compliance actually entails or what the risks of non-compliance are.

**What Non-Compliance Looks Like**

CBK has made it clear: this is a supervisory expectation, not a voluntary guideline. Non-compliance will factor into CAMELS ratings, supervisory assessments, and could affect licensing reviews. Beyond regulation, DFIs and international lenders are increasingly making climate disclosure a condition for credit lines and partnerships.

**How to Get Started — Today**

You don't need to have everything figured out. But you do need to start:

1. **Run a gap assessment**: Understand where you stand against each of the four CRDF pillars. What data do you have? What's missing?
2. **Assign ownership**: Climate risk can't live in a vacuum. Designate a senior officer (or team) to own the CRDF response.
3. **Get your data house in order**: Start collecting borrower-level data — sector, location, energy exposure. Even basic data is better than none.
4. **Use technology, not consultants alone**: Tools like our platform automate data collection, scenario analysis, and report generation. You get compliant faster and at a fraction of the consulting cost.
5. **Brief your board**: The board needs to understand what's coming. A 30-minute board briefing now prevents a crisis in September 2026.

The banks that move first won't just be compliant — they'll unlock green financing, DFI partnerships, and competitive advantage. The ones that wait will be scrambling.

**Your CBK CRDF deadline is October 2026. That's 7 months away.**`
  },
  {
    id: 'saccos-climate-risk',
    title: "Why SACCOs Can't Ignore Climate Risk Anymore — Even If SASRA Hasn't Mandated It Yet",
    date: 'March 2026',
    readTime: '7 min read',
    category: 'SACCOs',
    summary: "Kenya's 175+ deposit-taking SACCOs hold KSH 700B+ in assets. Most haven't started thinking about climate risk. That needs to change.",
    content: `If you run a SACCO in Kenya, you might think climate risk reporting doesn't apply to you. After all, CBK's CRDF is aimed at banks, and SASRA hasn't issued a similar directive for SACCOs. So why worry?

Here's why: your members are already being affected by climate change, your loan portfolio is exposed to climate risks you're not measuring, and the regulatory wave that hit banks is heading your way next.

**The Climate Risk Hidden in Your Loan Book**

Let's look at what a typical Kenyan SACCO's loan portfolio contains:

- **Agriculture loans**: Farmers who depend on predictable rainfall patterns that are becoming increasingly erratic. The 2024 drought wiped out harvests across 15 counties. How many of your agricultural borrowers defaulted?
- **Real estate and construction**: Properties in flood-prone areas. Nairobi's 2024 floods caused billions in property damage. Are your mortgage portfolios stress-tested for this?
- **Transport and logistics**: Fuel-dependent businesses facing transition risk as Kenya moves toward green transport policies.
- **Small businesses in vulnerable areas**: Members running businesses in areas prone to drought, flooding, or extreme heat.

You're already exposed to climate risk. You're just not measuring it.

**Why SASRA Will Follow CBK**

Regulation follows a predictable pattern in Kenya's financial sector. When CBK moves, SASRA, IRA, and RBA follow within 12-24 months. Here's why SACCO-specific climate risk requirements are inevitable:

1. **CBK is setting the standard**: The CRDF creates a template that other regulators will adapt.
2. **IFRS S1/S2 is coming for everyone**: Kenya adopted IFRS S1 and S2 from January 2027 for Public Interest Entities. Large SACCOs are PIEs.
3. **DFI pressure**: Many SACCOs access wholesale funding from DFIs and banks. Those institutions will increasingly require climate data from their counterparties.
4. **Member protection**: SASRA's core mandate is protecting member deposits. Climate risk is a threat to deposit safety.

**The Competitive Advantage of Moving Early**

Here's what forward-thinking SACCOs stand to gain:

- **Access to green credit lines**: DFIs like IFC, FMO, and KfW are actively looking for SACCOs that can demonstrate climate-aware lending. Green credit lines come with concessional rates.
- **Better risk management**: Understanding which parts of your portfolio are climate-exposed helps you price risk better and reduce defaults.
- **Member trust**: Members are increasingly aware of environmental issues. Showing leadership builds trust and retention.
- **Regulatory readiness**: When SASRA's climate directive arrives (and it will), you'll already be ahead.

**What SACCOs Should Do Now**

1. **Map your portfolio exposure**: Which sectors and counties are your loans concentrated in? Cross-reference with Kenya's county-level climate hazard data.
2. **Start collecting basic climate data**: When onboarding new loans, add a few questions about the borrower's climate exposure and practices.
3. **Train your credit officers**: Your team needs to understand what climate risk means for lending decisions.
4. **Invest in reporting tools**: Manual spreadsheets won't scale. Platform-based tools can help you generate reports that meet future regulatory standards.
5. **Engage your board**: Put climate risk on the board agenda. Even a quarterly discussion creates accountability.

The SACCOs that start now won't just survive the regulatory wave — they'll ride it to competitive advantage.`
  },
  {
    id: 'ifrs-s1-s2-kenya',
    title: "IFRS S1 and S2 in Kenya: What Every CFO Needs to Know Before January 2027",
    date: 'March 2026',
    readTime: '9 min read',
    category: 'Standards',
    summary: "Kenya is adopting IFRS S1 and S2 from January 2027. Here's a plain-language breakdown of what these standards mean for your institution.",
    content: `If you've been hearing about IFRS S1 and S2 but aren't sure exactly what they mean for your institution, you're not alone. These are the most significant changes to corporate reporting since IFRS itself was adopted, and they're coming to Kenya fast.

**The Basics: What Are IFRS S1 and S2?**

The International Sustainability Standards Board (ISSB) issued two standards in June 2023:

- **IFRS S1 (General Requirements)**: Requires companies to disclose all material sustainability-related risks and opportunities that could affect their financial position, performance, and cash flows.
- **IFRS S2 (Climate-Related Disclosures)**: Specifically focuses on climate risks and opportunities. Think of it as the successor to the TCFD framework, but with more teeth.

Kenya, through ICPAK and the Financial Reporting Centre, has confirmed adoption from January 2027 for Public Interest Entities (PIEs). This includes listed companies, banks, insurance companies, large SACCOs, and other significant entities.

**What IFRS S2 Actually Asks For**

Let's break down the four core areas:

**Governance** — Who in your organisation is responsible for climate-related risks? How often does the board discuss them? What skills or competencies do your directors have in this area?

**Strategy** — How do climate risks and opportunities affect your business model and financial planning? You need to describe the actual and potential effects on your revenues, expenditures, assets, liabilities, and cost of capital. This includes scenario analysis.

**Risk Management** — How do you identify, assess, prioritise, and monitor climate-related risks? How is this integrated into your overall enterprise risk management?

**Metrics and Targets** — This is where it gets quantitative. You need to report:
- Greenhouse gas emissions (Scope 1, 2, and where material, Scope 3)
- For financial institutions: financed emissions (Scope 3, Category 15)
- Climate-related targets and progress against them
- Amounts of assets or business activities exposed to climate-related physical and transition risks

**Why This Is Different From What You've Done Before**

Many Kenyan companies already publish sustainability sections in their annual reports. Here's why IFRS S1/S2 is fundamentally different:

1. **It's connected to financials**: These aren't standalone sustainability reports. They sit alongside your financial statements and must be consistent with them.
2. **It's auditable**: Disclosures must be prepared with the same rigor as financial statements. Expect assurance requirements to follow.
3. **It's specific**: Vague statements like "we are committed to sustainability" won't cut it. You need actual data, scenarios, and quantified impacts.
4. **It has a timeline**: This isn't aspirational — it's a reporting standard with a compliance date.

**The CFO's Checklist**

Here's what needs to happen in the next 10 months:

1. **Gap assessment**: Compare your current disclosures against IFRS S2 requirements. Where are the biggest gaps?
2. **Data infrastructure**: Do you have systems to collect emissions data, physical risk exposure, transition risk indicators? If not, start building or acquiring them now.
3. **Cross-functional team**: This isn't just a finance exercise. You need risk, operations, compliance, and sustainability working together.
4. **Board education**: Your board will need to demonstrate competence in climate risk governance. Start with training sessions.
5. **Technology investment**: Manual approaches won't scale. Purpose-built platforms can automate data collection, calculate metrics, run scenario analysis, and generate compliant reports.
6. **Assurance planning**: Even if assurance isn't required in year one, prepare as if it will be. Clean data and documented processes now prevent painful audits later.

**The Opportunity Behind the Mandate**

Here's what most people miss: IFRS S1/S2 compliance isn't just a cost. It's a signal to investors, DFIs, and markets that your institution is well-governed and future-proof. Companies with strong climate disclosures are already seeing:

- Lower cost of capital from ESG-focused investors
- Better access to green bonds and sustainability-linked loans
- Stronger relationships with international partners and DFIs
- Improved risk management that catches problems early

The CFOs who treat this as strategic — not just compliance — will lead their organisations into the next decade with confidence.`
  },
  {
    id: 'green-finance-taxonomy',
    title: "Kenya's Green Finance Taxonomy: A Practical Guide for Financial Institutions",
    date: 'February 2026',
    readTime: '7 min read',
    category: 'Green Finance',
    summary: "The Kenya Green Finance Taxonomy (KGFT) tells you what counts as 'green'. Here's how to use it in your lending and investment decisions.",
    content: `Kenya's Green Finance Taxonomy (KGFT) was launched to give financial institutions a clear, science-based classification of what qualifies as a "green" economic activity. If your bank, SACCO, or fund is offering green products — or wants to — the KGFT is your reference standard.

**What Is the KGFT?**

Simply put, the Kenya Green Finance Taxonomy is a classification system. It defines which economic activities contribute to climate change mitigation, adaptation, or other environmental objectives. Think of it as a dictionary that tells you: "This loan is green. This one isn't. And here's why."

The taxonomy was developed with input from the National Treasury, Kenya Bankers Association (KBA), IFC, and other stakeholders. It aligns with international taxonomies (like the EU Taxonomy) while being grounded in Kenya's specific economic activities and climate realities.

**Why It Matters for Your Institution**

1. **Green bond eligibility**: If you want to issue or invest in green bonds, the KGFT defines what qualifies for the "green" label. The Nairobi Securities Exchange and CMA use it as a reference.

2. **DFI partnerships**: When IFC, FMO, KfW, or other DFIs offer green credit lines, they want to know your lending meets taxonomy standards. The KGFT gives you a framework to prove it.

3. **Regulatory alignment**: CBK's CRDF references the KGFT. Your climate disclosures need to show what portion of your portfolio aligns with the taxonomy.

4. **Greenwashing protection**: Without a taxonomy, any loan to a company that mentions "environment" could be called green. The KGFT gives you objective criteria, protecting you from greenwashing accusations.

**Key Sectors Covered**

The KGFT covers Kenya's major economic sectors:

- **Agriculture**: Climate-smart agriculture, drought-resistant crops, soil carbon sequestration, sustainable irrigation
- **Energy**: Solar, wind, geothermal, energy efficiency, clean cooking
- **Transport**: Electric vehicles, public transit, non-motorised transport infrastructure
- **Water**: Sustainable water management, flood protection, wastewater treatment
- **Buildings**: Green buildings, energy-efficient construction, climate-resilient housing
- **Manufacturing**: Clean production processes, circular economy activities
- **Waste Management**: Recycling, composting, waste-to-energy
- **Forestry**: Sustainable forest management, reforestation, agroforestry

**How to Apply It in Practice**

Here's a practical workflow for using the KGFT in your lending:

**Step 1: Screen at origination** — When a borrower applies for a loan, check whether the proposed activity falls under a KGFT category. A farmer installing solar-powered irrigation? That's taxonomy-aligned. A property developer building in a flood plain with no resilience features? That's not.

**Step 2: Tag your portfolio** — Go through your existing loan book and tag which loans align with KGFT categories. This gives you your "green portfolio ratio" — a key metric for CBK reporting and DFI engagement.

**Step 3: Set targets** — Once you know your baseline, set targets for increasing your green portfolio. DFIs love institutions with clear green lending targets.

**Step 4: Report** — Use the taxonomy categories to structure your green finance disclosures. This feeds directly into your CBK CRDF report and IFRS S2 disclosures.

**Common Mistakes to Avoid**

- **Don't guess**: If you're not sure whether an activity qualifies, check the taxonomy criteria. "It seems green" isn't good enough.
- **Don't ignore the Do No Significant Harm (DNSH) criteria**: A solar farm that destroys a wetland doesn't qualify, even though solar is green. The KGFT includes safeguards.
- **Don't treat it as a one-time exercise**: Portfolio tagging needs to be ongoing, not a once-a-year project.

The KGFT isn't just a compliance tool — it's a business development tool. Use it to identify green lending opportunities, attract DFI funding, and differentiate your institution in the market.`
  },
  {
    id: 'climate-data-collection',
    title: "How to Collect Climate Data from Borrowers Without Losing Your Mind",
    date: 'February 2026',
    readTime: '6 min read',
    category: 'Data',
    summary: "The biggest bottleneck in climate risk reporting isn't regulation — it's getting data from your borrowers. Here's a practical approach.",
    content: `Every bank and SACCO we talk to says the same thing: "We understand the requirements. We know we need to report. But how on earth do we get climate data from our borrowers?"

It's a fair question. Your borrowers didn't sign up to fill out emissions questionnaires. Your relationship managers didn't train to ask about carbon footprints. And your core banking system definitely doesn't have a field for "Scope 1 greenhouse gas emissions."

But here's the thing: you don't need perfect data from day one. You need a system that starts collecting useful data now and improves over time.

**The Data You Actually Need**

Let's demystify this. For most Kenyan financial institutions, the climate data you need from borrowers falls into five categories:

1. **Sector and activity**: What does the borrower do? (Agriculture, manufacturing, transport, energy, construction, etc.) You probably already capture this — but how granular is it?

2. **Physical location**: Where are the borrower's operations? County-level is a minimum. Specific coordinates are ideal. Why? Because Kenya's climate risks vary enormously by location. A farmer in Turkana faces different risks than one in Kiambu.

3. **Energy profile**: What energy sources does the borrower use? Grid electricity, diesel generators, solar, biomass? This is the foundation for estimating their emissions.

4. **Physical risk exposure**: Is the borrower in a flood zone? Drought-prone area? Exposed to heat stress? You can estimate much of this from location data and existing hazard maps.

5. **Transition readiness**: Has the borrower taken any steps toward climate adaptation or mitigation? Solar installation, water harvesting, crop diversification, energy efficiency improvements?

**A Practical Collection Strategy**

Here's what actually works:

**Phase 1: Use what you already have (Month 1-2)**

You have more climate-relevant data than you think. Your existing loan files contain sector codes, business descriptions, and location data. Cross-reference this with:
- Kenya's 47-county climate hazard profiles
- Kenya Green Finance Taxonomy sector classifications
- PCAF data quality guidance (to estimate emissions from proxy data)

This alone gets you to a baseline — rough, but real.

**Phase 2: Add questions to existing processes (Month 3-4)**

Don't create a separate climate questionnaire. Instead, add 5-10 climate questions to your existing credit application and annual review processes:
- What county/sub-county are your operations in?
- What's your primary energy source?
- Have you experienced business disruption from weather events in the past 3 years?
- Do you have any climate adaptation measures in place?
- What percentage of your revenue comes from agriculture/manufacturing/transport?

Your relationship managers can ask these questions during normal interactions. No special training needed for the basics.

**Phase 3: Build a digital data collection layer (Month 5-6)**

This is where technology comes in. A platform-based approach allows you to:
- Send standardised digital questionnaires to borrowers
- Auto-populate fields from existing data
- Calculate emissions estimates from proxy data
- Score climate risk at the borrower level
- Aggregate data for portfolio-level reporting

**What About Data Quality?**

The PCAF (Partnership for Carbon Accounting Financials) framework has a brilliant concept: a data quality ladder from 1 (best — verified primary data) to 5 (worst — estimated from sector averages). The point isn't to start at level 1. The point is to start somewhere and improve.

- **Quality 5**: Estimate using sector and country averages. You can do this today with zero borrower input.
- **Quality 4**: Use revenue or asset-based estimates with sector emission factors.
- **Quality 3**: Use borrower-specific energy data to calculate emissions.
- **Quality 2**: Use verified borrower-specific data.
- **Quality 1**: Audited and verified emissions data directly from the borrower.

Most Kenyan institutions will start at quality 4-5. That's fine. What matters is having a plan to move up the ladder.

**Stop Waiting for Perfect Data**

The biggest mistake we see is institutions waiting until they have "complete" data before they start reporting. That's like waiting until you're an expert swimmer before getting in the pool. You learn by doing.

Start with proxy data. Add real data as you collect it. Improve your quality scores over time. Your first report won't be perfect — and that's exactly what regulators expect. What they don't expect is silence.`
  },
  {
    id: 'insurance-climate',
    title: "Kenya's Insurers Are Sitting on a Climate Risk Time Bomb — And Most Don't Know It",
    date: 'January 2026',
    readTime: '7 min read',
    category: 'Insurance',
    summary: "With KSH 300B+ in assets and growing exposure to climate-sensitive sectors, Kenya's insurance industry needs to wake up to climate risk.",
    content: `Kenya's insurance industry has a climate problem. It's not a future problem — it's happening right now. And the industry's response, so far, has been largely to look the other way.

**The Numbers Tell the Story**

Consider what's happened in the past three years:
- The 2023-2024 drought cycle caused agricultural losses estimated at over KSH 100 billion nationally
- The April-May 2024 Nairobi floods resulted in property damage claims that stretched some general insurers to their limits
- Livestock insurance payouts in arid and semi-arid counties have increased by over 200% since 2020
- Climate-related claims now represent the fastest-growing category across general insurance

And Kenya's 56 insurance companies are, for the most part, pricing risk using historical data that no longer reflects reality.

**Why Historical Data Is Failing You**

Insurance is built on one fundamental assumption: the past is a reasonable predictor of the future. For decades, this worked. You could look at 20 years of flood data, claims history, and weather patterns and price your products accordingly.

Climate change breaks this assumption. Here's how:

- **Rainfall patterns have shifted**: What was a 1-in-100-year flood event in Nairobi is now happening every few years.
- **Drought cycles have accelerated**: The Horn of Africa experienced five consecutive failed rainy seasons (2020-2023) — unprecedented in recorded history.
- **Temperature extremes are increasing**: Heat waves affect crop yields, worker productivity, and infrastructure durability in ways that historical data doesn't capture.
- **Compound events**: It's not just one risk at a time anymore. Drought followed by flash floods. Heat stress combined with water scarcity.

If you're pricing risk based on the last 20 years, you're systematically underpricing climate exposure.

**What IRA Will Require**

The Insurance Regulatory Authority (IRA) is watching what CBK is doing with the CRDF — and they're preparing. While IRA hasn't issued a formal climate risk directive yet, signals are clear:

- IRA has participated in regional discussions on climate risk in insurance
- The East African Insurance Supervisors Association is developing climate risk guidelines
- IFRS S1/S2 will apply to insurance companies as PIEs
- Global reinsurers (who backstop Kenyan insurers) are already requiring climate risk assessments

When IRA moves — and based on current trajectory, expect something by mid-2027 — the requirements will likely cover:
- Climate risk stress testing for underwriting portfolios
- Physical risk assessment for property and agriculture books
- Transition risk assessment for investment portfolios
- Climate-adjusted actuarial assumptions

**What Smart Insurers Are Doing Now**

The forward-thinking insurers in Kenya aren't waiting for IRA. They're:

1. **Integrating climate data into underwriting**: Using county-level hazard maps and climate projections to price risk more accurately.
2. **Stress-testing their portfolios**: Running climate scenarios to understand how their claims profile changes under different warming pathways.
3. **Adjusting investment strategies**: Their investment portfolios (over KSH 700B across the industry) are exposed to transition risk through holdings in carbon-intensive sectors.
4. **Developing climate-linked products**: Parametric insurance, index-based crop insurance, and climate adaptation products are growth opportunities.
5. **Building data capabilities**: Investing in the technology and data infrastructure needed for climate-aware operations.

**The Business Case Is Clear**

This isn't just about compliance. Insurers that understand climate risk will:
- Price products more accurately (and profitably)
- Avoid the tail-risk losses that destroy capital
- Capture the growing market for climate adaptation products
- Attract partnerships with DFIs and international reinsurers
- Build trust with policyholders who are increasingly climate-aware

Kenya's insurance industry is at a crossroads. The institutions that embed climate risk into their operations now will thrive. The ones that don't will find themselves blindsided by the next climate event — and the regulation that follows.`
  },
  {
    id: 'scenario-analysis',
    title: "Climate Scenario Analysis Explained: A Non-Technical Guide for Kenyan Financial Institutions",
    date: 'January 2026',
    readTime: '8 min read',
    category: 'Technical',
    summary: "Scenario analysis sounds complicated. It doesn't have to be. Here's what it actually means and how to do it without a PhD in climate science.",
    content: `"Climate scenario analysis" might be the most intimidating phrase in the entire CBK CRDF document. If you're a risk manager or CFO reading those words and thinking "we don't have the capacity for this," you're in good company. Most institutions feel the same way.

But here's the truth: scenario analysis is more approachable than it sounds. Let's break it down.

**What Is Scenario Analysis? (In Plain English)**

Scenario analysis is simply asking: "What would happen to our business if the world goes in direction A versus direction B?"

For climate, the two main directions are:

1. **Orderly transition (1.5-2°C)**: The world takes serious action on climate change. Carbon prices rise, regulations tighten, fossil fuels decline, green industries grow. Physical climate impacts are contained but still significant.

2. **Disorderly / Hot house (3°C+)**: Climate action is too slow or too late. Physical impacts become severe — more droughts, floods, heat waves. Some economic sectors face existential risk.

Your job is to look at your portfolio through both lenses and ask: "How do our borrowers, investments, and operations perform in each scenario?"

**What CBK Expects**

CBK's CRDF requires banks to conduct scenario analysis covering:
- At least two climate scenarios (one aligned with 1.5-2°C, one with 3°C+)
- Both physical risks (floods, droughts, heat stress) and transition risks (policy changes, technology shifts, market sentiment)
- Short-term (1-5 years), medium-term (5-15 years), and long-term (15-30+ years) horizons
- Impact on your credit portfolio, financial position, and business strategy

**A Step-by-Step Approach**

Here's how to actually do this without hiring a climate consultancy:

**Step 1: Choose Your Scenarios**

Don't invent your own. Use established scenarios:
- **NGFS (Network for Greening the Financial System)**: Six scenarios ranging from orderly transition to hot house world. These are what most central banks reference.
- **IPCC Shared Socioeconomic Pathways (SSPs)**: SSP1-2.6 (sustainable development) and SSP5-8.5 (fossil fuel-intensive) are commonly used.

For your first analysis, two scenarios are enough: an orderly transition (NGFS "Net Zero 2050") and a physical risk scenario (NGFS "Current Policies").

**Step 2: Identify Your Key Exposures**

You don't need to analyse every single loan. Focus on:
- Your largest sector concentrations (agriculture, real estate, manufacturing, transport)
- Your most geographically concentrated exposures (which counties?)
- Your highest-risk sectors (fossil fuel-related, deforestation-linked, water-intensive)

Typically, 70-80% of your climate risk is concentrated in 20-30% of your portfolio.

**Step 3: Map Physical Risks to Your Portfolio**

Using Kenya's county-level climate data:
- Which counties face highest drought risk? Map your agricultural lending there.
- Which areas are flood-prone? Map your property and infrastructure lending there.
- Where are heat stress projections highest? Consider the impact on worker productivity and business viability.

This creates a "heat map" of your physical risk exposure.

**Step 4: Map Transition Risks**

For each major sector in your portfolio:
- How would a carbon price of $50/ton affect your borrowers' costs?
- Which borrowers are in sectors that will face regulatory restrictions?
- Which borrowers might benefit from the transition (renewable energy, green construction)?

**Step 5: Quantify the Impact**

This is where it gets analytical, but proxy approaches work well:
- Use sector-level estimates of climate impact on revenue and costs
- Apply credit risk adjustments (increase in probability of default) based on scenario severity
- Estimate changes in collateral values (especially real estate and agricultural land)

**Step 6: Document and Disclose**

Write up your findings in a clear narrative:
- What scenarios did you use?
- What are the key risks to your portfolio?
- What's your most vulnerable exposure?
- What actions are you taking in response?

**Common Misconceptions**

- **"We need perfect data"**: No. Scenario analysis is about direction, not precision. Rough estimates that identify your biggest risks are far more valuable than no analysis at all.
- **"We need specialised software"**: You can start with spreadsheets and county-level data. Purpose-built platforms make it easier, but don't let technology be a barrier.
- **"The results need to be exact"**: Scenario analysis outputs are inherently uncertain. CBK doesn't expect you to predict the future. They expect you to demonstrate that you've thought about it systematically.
- **"We can do this once and check the box"**: Scenario analysis should be updated regularly as climate science, regulations, and your portfolio evolve.

The hardest part of scenario analysis is starting. Once you've done your first one, the second is much easier. And your institution will be genuinely better at understanding and managing climate risk — not just compliant, but actually more resilient.`
  },
  {
    id: 'pcaf-emissions',
    title: "Financed Emissions 101: How Kenyan Banks Can Measure Their Portfolio's Carbon Footprint",
    date: 'January 2026',
    readTime: '7 min read',
    category: 'Technical',
    summary: "Your bank's biggest climate impact isn't your office electricity. It's the emissions generated by the businesses you lend to. Here's how to measure them.",
    content: `Here's a fact that surprises many bankers: the carbon footprint of your loan portfolio is typically 100 to 700 times larger than the emissions from your own operations. Your offices, vehicles, and business travel are a rounding error compared to the emissions generated by the businesses you finance.

This is what "financed emissions" means — and it's what CBK, IFRS S2, and international investors increasingly want to see measured.

**What Are Financed Emissions?**

Financed emissions are the greenhouse gas emissions associated with the loans and investments in your portfolio. Under the GHG Protocol, these fall under Scope 3, Category 15.

Here's the logic: if your bank lends KSH 500 million to a cement manufacturer, you're enabling that manufacturer's operations — including their emissions. A portion of those emissions is "attributed" to your bank, proportional to your share of financing.

**The PCAF Standard**

The Partnership for Carbon Accounting Financials (PCAF) is the global standard for measuring financed emissions. It provides:
- Methodologies for different asset classes (business loans, mortgages, project finance, listed equity, etc.)
- Emission factors for estimating emissions when primary data isn't available
- A data quality scoring system (1-5) that acknowledges the reality of imperfect data

**How the Calculation Works**

The basic formula is straightforward:

**Financed Emissions = Attribution Factor × Borrower Emissions**

Where:
- **Attribution Factor** = (Outstanding Loan Amount) ÷ (Borrower's Total Assets or Revenue)
- **Borrower Emissions** = Direct emissions (Scope 1) + Energy emissions (Scope 2)

So if you've lent KSH 100 million to a company with KSH 1 billion in total assets and 10,000 tCO2e in annual emissions, your financed emissions from that loan are: (100M / 1B) × 10,000 = 1,000 tCO2e.

**Where to Get Emission Data**

This is the practical challenge. Most Kenyan borrowers don't report their emissions. So how do you estimate?

**Tier 1: Sector average approach (Data Quality 5)**
Use average emission intensity per sector per unit of revenue. The PCAF database and IFC emission factors provide these for developing markets. This requires only: sector classification + revenue of borrower.

**Tier 2: Revenue-based approach (Data Quality 4)**
Use more granular sector emission factors applied to actual borrower revenue. Better than sector averages because you're using real revenue data.

**Tier 3: Physical activity-based (Data Quality 3)**
Use data on the borrower's actual physical activities — tonnes of output, hectares farmed, kWh consumed. Much more accurate but requires data collection.

**Tier 4: Borrower-reported (Data Quality 2)**
The borrower provides their own emissions data, calculated using established methodologies.

**Tier 5: Verified data (Data Quality 1)**
Third-party verified emissions data from the borrower. The gold standard, but rare in Kenya.

**Getting Started: A Practical Roadmap**

**Month 1**: Classify your entire loan portfolio by sector (ISIC or KeSIC codes). Most banks can do this from existing data.

**Month 2**: Apply PCAF sector-level emission factors to estimate financed emissions for your entire portfolio. This gives you a baseline at Data Quality 4-5.

**Month 3**: Identify your top 20 emitting exposures. These are typically large loans to emission-intensive sectors (cement, manufacturing, agriculture, transport).

**Month 4-6**: For your top 20, collect actual data — energy consumption, fuel usage, production volumes. This moves those exposures up to Data Quality 3.

**Ongoing**: Gradually expand primary data collection across your portfolio. Integrate climate data questions into loan origination and annual review processes.

**Why This Matters Beyond Compliance**

Banks that measure financed emissions can:
- **Identify concentration risk**: Where is your portfolio most carbon-exposed?
- **Set reduction targets**: Commit to aligning your portfolio with net-zero pathways
- **Develop green products**: Know exactly which loans qualify as "green"
- **Engage borrowers**: Use the data to help your clients reduce their own emissions
- **Access green financing**: Demonstrate to DFIs that you understand and manage your climate impact

Your financed emissions number is becoming as important as your NPL ratio. The banks that measure it first will define the standard for Kenya's financial sector.`
  },
  {
    id: 'board-climate-governance',
    title: "What Your Board Needs to Know About Climate Risk — A Briefing Guide for Directors",
    date: 'December 2025',
    readTime: '6 min read',
    category: 'Governance',
    summary: "Board-level climate risk governance is no longer optional. Here's how to brief your directors and ensure they're equipped to oversee climate-related risks.",
    content: `If you're a CEO, company secretary, or board member at a Kenyan financial institution, here's something you need to hear clearly: climate risk is now a board-level governance issue, and regulators will be looking at how your board oversees it.

Both CBK's CRDF and IFRS S2 start with governance. The first thing you have to disclose is how your board and senior management oversee climate-related risks and opportunities. This isn't an afterthought — it's the foundation everything else is built on.

**What Regulators Want to See**

CBK and IFRS S2 expect you to disclose:

1. **Which body or individual oversees climate-related risks**: Is it the full board? A committee? Who specifically?
2. **How climate risk is considered in strategic decisions**: Is it a standing agenda item? How does it influence business planning?
3. **The competencies and skills of the oversight body**: Do your directors understand climate risk? What training have they received?
4. **How management reports to the board on climate**: What information flows upward? How frequently?
5. **How climate risk integrates with other governance processes**: Is it part of your risk appetite framework, audit processes, remuneration policies?

**Why This Matters for Directors Personally**

This isn't just an institutional obligation — it's a personal one. Directors of financial institutions in Kenya have fiduciary duties that increasingly encompass climate risk:

- **Prudential duty**: Climate risk can materially affect the financial health of your institution. Ignoring it could be seen as a failure of oversight.
- **Compliance duty**: CBK CRDF compliance is mandatory. Directors who allow non-compliance risk supervisory action.
- **Disclosure duty**: Under IFRS S2, directors will sign off on sustainability disclosures alongside financial statements.

In other markets (notably Australia, UK, and the EU), directors have already faced legal action for inadequate climate risk oversight. Kenya is watching.

**The Board Briefing You Should Schedule This Month**

Here's a practical guide for a 90-minute board briefing:

**Agenda Item 1: Context (15 min)**
- What is climate risk and why does it matter for financial institutions?
- Global trends: TCFD, ISSB, net-zero commitments
- Kenya-specific: CBK CRDF, IFRS S1/S2 adoption, KGFT

**Agenda Item 2: Our Exposure (20 min)**
- Portfolio concentration in climate-sensitive sectors
- Geographic exposure to physical risks (county-level data)
- Preliminary view of financed emissions
- Comparison to peer institutions

**Agenda Item 3: Regulatory Requirements (15 min)**
- What CBK CRDF requires from us (timeline, content)
- What IFRS S2 requires from us
- Consequences of non-compliance
- What regulators in peer markets (Nigeria, South Africa) are doing

**Agenda Item 4: Our Readiness (15 min)**
- Gap assessment results (if available)
- Current capabilities vs. requirements
- Technology and data infrastructure status
- Key risks and resource needs

**Agenda Item 5: Proposed Governance Structure (15 min)**
- Who will own climate risk at board level?
- Management committee structure
- Reporting cadence
- Integration with existing risk governance

**Agenda Item 6: Decisions Required (10 min)**
- Approve climate risk governance framework
- Allocate budget for compliance tools and data
- Set quarterly board reporting cadence
- Approve management to proceed with compliance programme

**Building Board Competence**

IFRS S2 specifically asks about the climate-related competencies of your governance body. Here's how to build them:

- **External training**: Organisations like the Global Association of Risk Professionals (GARP) offer sustainability and climate risk certifications for board members.
- **Expert sessions**: Invite climate risk practitioners to present to the board quarterly.
- **Peer learning**: Connect with directors at other institutions who have gone through the process.
- **Board appointment criteria**: Consider climate/ESG expertise in future board recruitment.

Climate governance isn't about making every director a climate scientist. It's about ensuring the board can ask the right questions, challenge management effectively, and make informed decisions. That starts with a single briefing — and it needs to happen now.`
  },
  {
    id: 'dfi-green-capital',
    title: "How Climate Risk Compliance Unlocks DFI Capital: A Guide for Kenyan Financial Institutions",
    date: 'December 2025',
    readTime: '8 min read',
    category: 'Capital',
    summary: "The DFIs aren't just talking about climate anymore — they're putting money behind it. Here's how to position your institution to access green capital.",
    content: `Here's something that most Kenyan financial institutions haven't fully grasped yet: climate risk compliance isn't just a cost. It's a key that unlocks some of the most attractive capital available in Africa today.

Development Finance Institutions — IFC, FMO, KfW, Norfund, Proparco, AfDB, and others — are collectively deploying billions of dollars in green and climate-aligned financing across Africa. Kenya is one of their priority markets. And they're looking for local financial institutions that can demonstrate climate-aware operations to serve as on-lending partners.

**The Capital That's Available**

Let's look at what's actually on the table:

- **IFC**: Committed $4.4 billion to climate finance in FY2024 alone, with Africa as a priority region. They offer green credit lines, first-loss facilities, and technical assistance packages to financial institutions.
- **FMO**: The Netherlands' DFI has a dedicated facility for Kenyan financial institutions focused on green SME lending and climate resilience.
- **KfW**: Germany's development bank runs multiple programmes supporting green finance in Kenya, including credit lines with concessional pricing (sometimes 2-3% below market rates).
- **AfDB**: The African Development Bank's Africa Green Financing Facility specifically targets financial intermediaries in climate-vulnerable countries.
- **Green Climate Fund (GCF)**: Provides highly concessional financing through accredited entities for climate adaptation and mitigation projects.

The total pool of DFI climate capital available to Kenyan financial institutions is estimated at over $2 billion annually. Most of it goes untapped because institutions can't meet the eligibility criteria.

**What DFIs Actually Look For**

When a DFI evaluates your institution for a green credit line, they assess:

1. **Climate risk governance**: Do you have board-level oversight of climate risk? Is there a designated team or officer?
2. **Environmental and Social Management System (ESMS)**: Do you screen loans for environmental and social risks?
3. **Green lending capability**: Can you identify, tag, and track green loans using a taxonomy like KGFT?
4. **Climate data and reporting**: Can you measure and report on the climate impact of your portfolio?
5. **Institutional capacity**: Do you have the systems, processes, and people to manage climate-aware lending?

Notice a pattern? These are exactly the same capabilities you need for CBK CRDF and IFRS S2 compliance. Climate compliance and DFI capital access are two sides of the same coin.

**The Economics Are Compelling**

Let's run the numbers on a typical DFI green credit line:

- **Facility size**: $20 million (KSH 2.6 billion at current rates)
- **Pricing**: SOFR + 2-3% (vs. market rates of SOFR + 5-6%)
- **Tenor**: 7-10 years (vs. typical 3-5 year market funding)
- **Technical assistance**: Often includes a $1-2 million TA grant for capacity building
- **Your spread**: You on-lend at market rates to green borrowers, capturing 2-3% margin
- **First-loss cushion**: Some facilities include DFI-funded first-loss guarantees of 10-20%

In simple terms: you get cheaper, longer-term funding with a built-in risk cushion, and you earn a healthy spread by on-lending to green activities.

**How to Position Your Institution**

**Step 1: Get your house in order**

Before you approach any DFI, you need:
- A climate risk policy (board-approved)
- An ESMS (even a basic one)
- The ability to tag loans as green using KGFT criteria
- Some basic climate data on your portfolio
- A management team that can articulate your climate strategy

**Step 2: Identify the right DFIs**

Not every DFI is right for every institution. Match based on:
- Your institution size (some DFIs target Tier 1-2 banks, others focus on SACCOs and MFBs)
- Your sector focus (agriculture, SMEs, real estate, etc.)
- The type of facility you need (credit line, guarantee, equity, TA)

**Step 3: Develop a green lending pipeline**

DFIs want to see that you have borrowers who need green financing. Build a pipeline:
- Which of your existing borrowers are in KGFT-aligned sectors?
- What green investment needs do they have? (Solar, energy efficiency, climate-smart agriculture)
- What's the estimated financing demand?

**Step 4: Approach with a proposition, not a request**

DFIs respond best when you come with a clear proposition:
- "We have X borrowers in Y green sectors needing Z in financing"
- "We've assessed our climate risk exposure and have a compliance plan"
- "Here's how we'll measure and report on climate impact"

**The Institutions That Are Already Doing This**

Several Kenyan banks have already secured green credit lines:
- KCB Group: Multiple IFC and AfDB climate facilities
- Equity Group: GCF-accredited, extensive green lending portfolio
- Co-operative Bank: FMO green SME credit line
- NCBA: IFC climate finance partnership

These institutions invested in climate capabilities early and are now reaping the rewards. The opportunity is still wide open for Tier 2-3 banks, SACCOs, MFBs, and insurance companies that can demonstrate readiness.

**The Bottom Line**

Investing in climate risk compliance isn't a cost centre — it's an investment in accessing the most attractive capital in the market. For every shilling you spend on building climate capabilities, you can access hundreds in concessional DFI financing.

The question isn't whether you can afford to invest in climate compliance. It's whether you can afford not to.`
  },
  {
    id: 'pension-funds-climate',
    title: "Kenya's Pension Funds Hold KSH 2 Trillion — And Climate Risk Could Wipe Out Billions",
    date: 'February 2026',
    readTime: '7 min read',
    category: 'Pensions',
    summary: "RBA-regulated pension funds are the largest institutional investors in Kenya. Most have zero visibility into their climate exposure.",
    content: `Kenya's retirement benefits sector manages over KSH 2 trillion in assets. That money belongs to millions of Kenyans who are counting on it being there when they retire. And right now, a growing portion of those assets is exposed to climate risks that nobody is measuring.

**Where Pension Money Is Invested**

The Retirement Benefits Authority (RBA) data shows that Kenya's pension funds are heavily invested in:
- **Government securities** (about 40-50%): Relatively safe from direct climate risk, but government fiscal capacity could be strained by climate disasters
- **Real estate** (15-20%): Directly exposed to physical risks — floods, heat stress, water scarcity
- **Equities** (15-20%): Many NSE-listed companies are in climate-sensitive sectors
- **Fixed deposits and corporate bonds** (10-15%): Credit risk affected by borrowers' climate exposure
- **Infrastructure and alternatives** (5-10%): Long-lived assets with 20-30 year horizons, most exposed to climate change

The challenge? Most pension fund trustees and fund managers have no idea which portions of their portfolio are climate-exposed.

**Why This Matters Now**

Three forces are converging:

1. **Fiduciary duty is evolving**: Globally, courts and regulators are ruling that fiduciary duty includes consideration of material climate risks. Ignoring climate risk when making investment decisions is increasingly seen as a breach of duty.

2. **IFRS S1/S2 is coming**: From January 2027, large pension schemes will need to make sustainability disclosures. This means quantifying climate exposure, reporting on governance, and showing how climate risk is integrated into investment decision-making.

3. **Asset stranding is real**: Investments in sectors that fail to adapt — coal, oil and gas, water-intensive agriculture, coastal real estate without resilience — could lose significant value. A pension fund holding these assets is holding risk it hasn't priced.

**What Fund Managers Should Do**

The most forward-thinking pension fund managers in Kenya are already taking action:

**Portfolio climate screening**: Map every holding against climate risk factors. Which equities are in emission-intensive sectors? Which real estate is in flood or drought zones? Which bonds are issued by companies with high transition risk?

**Climate-adjusted return expectations**: Factor climate risks into your return assumptions. A real estate portfolio in a flood-prone area shouldn't be modelled the same way as one in a low-risk zone.

**Engagement with investee companies**: Use your influence as shareholders to push investee companies toward better climate risk management and disclosure.

**Green investment pipeline**: Actively seek climate-aligned investment opportunities — green bonds, renewable energy infrastructure, climate-resilient real estate, impact funds.

**Trustee education**: Your trustees need to understand climate risk. Not in scientific detail, but enough to ask the right questions and make informed allocation decisions.

**The Competitive Edge**

Pension funds that embrace climate risk management aren't just being responsible — they're being smart. They'll:
- Identify and avoid stranded assets before they lose value
- Access growing pools of green investment opportunities
- Meet evolving regulatory requirements without last-minute scrambles
- Build trust with members who increasingly care about where their money goes
- Attract partnerships with DFIs looking for institutional co-investors

The pension funds that act now protect their members' futures. The ones that wait are gambling with retirement savings.`
  },
  {
    id: 'microfinance-climate',
    title: "Microfinance Banks and Climate Risk: Small Institutions, Big Exposure",
    date: 'January 2026',
    readTime: '6 min read',
    category: 'Microfinance',
    summary: "Kenya's 13 MFBs serve the most climate-vulnerable borrowers. Here's why climate risk management is survival, not compliance.",
    content: `Kenya's microfinance banks serve a unique niche: the borrowers that commercial banks often overlook. Small traders, farmers, women's groups, youth entrepreneurs, and micro-enterprises in both urban and rural areas. These are also the people most vulnerable to climate change.

**Why MFBs Face Outsized Climate Risk**

Your average MFB borrower doesn't have the financial buffers that larger businesses do. When a climate event hits, the impact is immediate and severe:

- A smallholder farmer whose crops fail due to drought has no reserves to fall back on. Your agricultural loan becomes an NPL overnight.
- A market trader in a flood-prone area loses their entire stock in one afternoon. That working capital loan? Gone.
- A transport operator facing rising fuel costs due to carbon policies can't absorb the margin squeeze.

The numbers are stark: MFBs with significant agricultural exposure in drought-affected counties have seen NPL ratios spike by 5-10 percentage points during recent drought cycles. For institutions with thin capital buffers, that's an existential threat.

**The Data Challenge**

MFBs face a unique version of the data challenge:
- Your borrowers are unlikely to have any formal climate or emissions data
- Many operate informally or semi-formally
- Geographic data may be imprecise
- Loan sizes are small, making per-loan data collection costly

But here's the good news: proxy-based approaches work well for microfinance. You can estimate climate risk exposure using:
- **County and sub-county location** (mapped to climate hazard data)
- **Sector of activity** (agriculture, trade, transport, services)
- **Loan product type** (crop input loans, livestock, working capital, housing)
- **Seasonal patterns** (when are defaults highest, and do they correlate with weather events?)

You already have this data in your core banking system. You just haven't connected it to climate risk.

**What CBK Expects from MFBs**

The CBK CRDF applies to all CBK-supervised institutions — including microfinance banks. The requirements are the same, but CBK has indicated that proportionality will apply: smaller institutions won't be expected to produce the same depth of analysis as a Tier 1 bank.

What MFBs need at minimum:
- A governance statement on climate risk oversight
- A basic assessment of physical risk exposure in your lending areas
- Some view of how climate events have affected your portfolio historically
- Steps you're taking to manage the risk going forward

**Building Climate Resilience — Not Just Compliance**

For MFBs, climate risk management isn't about checking regulatory boxes. It's about survival. Here's a practical playbook:

1. **Map your portfolio by geography**: Overlay your loan book onto Kenya's county climate hazard maps. Where are your most concentrated exposures?

2. **Analyse historical weather-default correlations**: Look at your NPL data alongside rainfall and temperature data for the past 5 years. You'll likely find patterns you didn't know existed.

3. **Adjust your credit scoring**: Add climate risk factors to your credit assessment. A borrower in a high-drought county growing rain-fed crops is a different risk than one with irrigated farmland.

4. **Develop climate-resilient products**: Flexible repayment schedules tied to harvest seasons. Insurance-linked loans. Climate adaptation micro-loans (solar, water harvesting, drought-resistant seeds).

5. **Partner for data and tools**: You don't need to build everything yourself. Platforms like ours provide climate risk tools designed for institutions of all sizes.

MFBs have always been closer to the ground than larger institutions. That proximity is an advantage — you understand your borrowers' realities better than anyone. Use that understanding to build climate resilience into everything you do.`
  },
  {
    id: 'greenwashing-risk',
    title: "The Greenwashing Trap: How Kenyan Institutions Can Avoid Costly Missteps",
    date: 'December 2025',
    readTime: '6 min read',
    category: 'Risk',
    summary: "Calling something 'green' without the data to back it up is risky. Here's how to stay on the right side of the line.",
    content: `Every financial institution in Kenya wants to look green right now. DFIs are offering green credit lines. Regulators are promoting sustainable finance. Customers are asking about environmental responsibility. And so the temptation is strong: slap a "green" label on your products and hope nobody looks too closely.

This is greenwashing. And it's about to become very expensive.

**What Greenwashing Looks Like in Practice**

Greenwashing isn't always intentional fraud. Often it's well-meaning but poorly executed green claims:

- **The relabelled loan**: Taking an existing agricultural loan product and calling it "green" without changing the criteria or tracking the environmental impact.
- **The vague commitment**: Publishing a sustainability statement full of aspirational language ("we are committed to a sustainable future") with zero data, targets, or accountability.
- **The cherry-picked disclosure**: Highlighting one solar project while ignoring the 95% of your portfolio that's in carbon-intensive sectors.
- **The borrowed credibility**: Referencing international frameworks (TCFD, ISSB) in your annual report without actually implementing them.
- **The misleading product**: Marketing a "climate-resilient" insurance product that doesn't actually cover climate-related losses.

**Why Greenwashing Is Getting Riskier**

Several developments are raising the stakes:

1. **Regulatory scrutiny**: CBK's CRDF will require structured disclosures with actual data. You can't hide vague claims in a compliance report.

2. **DFI due diligence**: When IFC, FMO, or KfW gives you a green credit line, they audit how you use it. Misusing green funds can result in clawbacks and blacklisting.

3. **Legal risk**: Globally, greenwashing litigation is exploding. Companies are being sued by investors, consumers, and regulators for misleading environmental claims. This is coming to Africa.

4. **Reputational damage**: In the age of social media, being called out for greenwashing can destroy trust overnight. Ask DWS (fined $25M by the SEC) or HSBC (UK advertising ban).

5. **IFRS S2 auditing**: When sustainability disclosures sit alongside financial statements, auditors will scrutinise them. Unsupported claims will be flagged.

**How to Stay on the Right Side**

The good news is that avoiding greenwashing is straightforward — it just requires discipline:

**Use the Kenya Green Finance Taxonomy (KGFT)**: Don't invent your own definition of "green." Use the KGFT criteria to classify your lending and investment activities. If it doesn't meet the taxonomy criteria, don't call it green.

**Measure before you claim**: Before saying "X% of our portfolio is green," make sure you have the data and methodology to back it up. Use PCAF for emissions, KGFT for classification.

**Be honest about where you are**: It's better to say "we're at the beginning of our climate risk journey" than to pretend you're further along. Regulators, DFIs, and sophisticated investors respect honesty.

**Set targets you can track**: Vague commitments are worse than no commitments. Set specific, time-bound, measurable targets: "Increase green lending to 20% of our portfolio by 2028."

**Build internal capability**: Greenwashing often happens because institutions lack the expertise to know what's genuinely green. Invest in training and tools.

**Document everything**: Every green claim should be backed by data, methodology, and a paper trail. If you can't document it, don't claim it.

**The Positive Alternative**

Instead of greenwashing, focus on genuine progress — even if it's small. An honest story of a bank that's at 3% green lending but has a credible plan to reach 15% is far more compelling than a bank claiming 50% without evidence.

Authenticity builds trust. Trust builds partnerships. Partnerships build business. That's the virtuous cycle of genuine climate action — and it's far more valuable than any green label.`
  },
  {
    id: 'nse-listed-climate',
    title: "NSE-Listed Companies: Your Shareholders Will Soon Demand Climate Disclosure — Are You Ready?",
    date: 'November 2025',
    readTime: '7 min read',
    category: 'Listed Companies',
    summary: "CMA and NSE are tightening sustainability disclosure rules. Listed companies need to prepare now.",
    content: `If your company is listed on the Nairobi Securities Exchange, climate disclosure is about to become non-negotiable. Not because it's trendy. Because your shareholders, regulators, and the market will demand it.

**The Regulatory Landscape for Listed Companies**

Multiple regulatory forces are converging on NSE-listed companies:

- **CMA ESG Reporting**: The Capital Markets Authority has already issued guidelines for ESG disclosure by listed companies. Currently voluntary, but the direction is clear.
- **NSE ESG Guidance**: The Nairobi Securities Exchange has published its own ESG guidance for issuers, increasingly referenced in listing requirements.
- **IFRS S1/S2**: Kenya's adoption from January 2027 will apply to all Public Interest Entities — which includes every listed company.
- **International investors**: Foreign institutional investors (who hold significant portions of NSE-listed stocks) are already screening for climate disclosure.

**What's Changing**

The shift from voluntary to mandatory climate disclosure changes everything:

**Before**: You could publish a few pages of sustainability content in your annual report, mention your tree-planting initiatives, and call it a day.

**After**: You'll need structured disclosures on climate governance, strategy, risk management, and metrics — consistent with your financial statements, auditable, and comparable to your peers.

This isn't a minor addition to your annual report. It's a fundamental change in how you report on your business.

**Sector-Specific Risks**

Different NSE sectors face different climate risks:

**Banking and financial services**: Financed emissions, credit risk from climate-exposed borrowers, transition risk in investment portfolios.

**Manufacturing (BAT, Bamburi, EAPC)**: Direct operational emissions, energy costs, carbon pricing exposure, supply chain disruption from climate events.

**Agriculture (Kakuzi, Sasini, Williamson Tea)**: Physical risk from changing rainfall and temperature patterns, pest and disease shifts, water scarcity, land degradation.

**Energy (KenGen, KPLC)**: Transition opportunities (geothermal, solar, wind) but also risks from changing hydrological patterns affecting hydropower.

**Real estate and construction (Centum, Home Afrika)**: Physical risk to properties, changing building codes, insurance cost increases.

**Telecommunications and services (Safaricom, others)**: Relatively lower direct climate risk, but supply chain and infrastructure vulnerability.

**What Investors Are Asking**

Institutional investors — both local and international — are increasingly including climate risk in their investment analysis:

- **Climate Action 100+**: A coalition of investors with $68 trillion in assets is engaging the world's largest emitters. African companies are on their list.
- **FTSE Russell and MSCI ESG Ratings**: These ratings agencies assess climate disclosure and performance. Poor scores affect your inclusion in ESG indices and cost of capital.
- **Proxy voting**: Shareholders are filing and voting on climate-related resolutions at AGMs worldwide. This trend is reaching African markets.

**A Practical Preparation Guide**

Here's what every NSE-listed company should do in the next 12 months:

1. **Conduct a materiality assessment**: Which climate risks and opportunities are most material to your specific business? Don't try to disclose everything — focus on what matters most.

2. **Measure your emissions**: Start with Scope 1 (direct) and Scope 2 (electricity). Scope 3 can come later for most companies, but financial institutions need to start on financed emissions now.

3. **Identify physical and transition risks**: Map your operations, assets, and supply chains against climate hazards and transition scenarios.

4. **Establish governance**: Assign board-level responsibility for climate risk. Create a management committee. Set reporting cadences.

5. **Build your data infrastructure**: You'll need systems to collect, track, and report climate data on an ongoing basis. Manual processes won't scale.

6. **Start with a TCFD-aligned report**: Even before IFRS S2 becomes mandatory, publishing a TCFD-aligned climate report signals leadership and builds your capabilities.

7. **Engage your value chain**: Talk to your suppliers, customers, and investees about climate risk. Your disclosure will eventually need to cover your broader value chain impacts.

The listed companies that lead on climate disclosure will attract capital, build investor confidence, and set the standard for Kenya's capital markets. The laggards will find themselves increasingly shut out of ESG-screened investment flows.`
  },
  {
    id: 'county-climate-mapping',
    title: "Kenya's 47 Counties, 47 Different Climate Risks: Why Location Data Is Everything",
    date: 'November 2025',
    readTime: '6 min read',
    category: 'Data',
    summary: "Climate risk in Kenya is hyperlocal. A bank's exposure in Turkana looks nothing like its exposure in Kiambu. Here's why county-level data matters.",
    content: `Kenya is one of the most climatically diverse countries in Africa. Within 580,000 square kilometres, you have coastal humidity, highland cold, arid deserts, lake basins, and everything in between. This means climate risk is fundamentally local — and any financial institution that tries to assess climate risk without county-level data is flying blind.

**The Climate Risk Diversity of Kenya**

Let's take a quick tour:

**Arid and Semi-Arid Counties (Turkana, Marsabit, Mandera, Wajir, Garissa, Isiolo, Samburu)**: These counties face severe drought risk. Rainfall has become increasingly unpredictable, and pastoral livelihoods are under existential threat. Livestock losses during the 2021-2023 drought exceeded KSH 50 billion.

**Coastal Counties (Mombasa, Kilifi, Kwale, Lamu)**: Sea-level rise, saltwater intrusion, coastal flooding, and coral reef degradation. Mombasa's commercial district faces increasing flood risk. Tourism and fishing livelihoods are exposed.

**Highland Counties (Kiambu, Nyeri, Murang'a, Kericho, Nandi)**: Temperature increases are shifting agricultural zones. Tea and coffee — Kenya's export cash crops — are sensitive to temperature changes. Some tea-growing areas are already seeing yield declines.

**Lake Basin Counties (Kisumu, Siaya, Homabay, Busia)**: Lake Victoria flooding, waterborne disease, and agricultural disruption. The lake's water levels have fluctuated dramatically in recent years.

**Urban Counties (Nairobi, Mombasa, Kisumu)**: Urban heat islands, flash flooding (Nairobi's 2024 floods were devastating), water scarcity, and infrastructure vulnerability.

**Rift Valley (Nakuru, Baringo, Kajiado)**: Drought, human-wildlife conflict exacerbated by habitat loss, landslides in escarpment areas.

**Why This Matters for Financial Institutions**

When you assess the climate risk of your portfolio, you need to know where your borrowers operate. Two identical loans — same amount, same sector, same borrower profile — can have completely different climate risk profiles based on location:

- A KSH 5 million agricultural loan in Turkana (drought-prone) versus Kiambu (relatively water-secure)
- A KSH 50 million property loan in Mombasa's flood zone versus Nairobi's upland suburbs
- A KSH 10 million SME loan in Garissa (extreme heat stress) versus Nyeri (moderate climate)

Without location data, you're averaging across these vastly different risk profiles — which means you're underpricing risk in some areas and overpricing it in others.

**Building a County-Level Risk Map**

Here's how to create a useful climate risk map for your portfolio:

**Step 1: Geocode your portfolio**
Tag every borrower with their county (and ideally sub-county) of operation. Most institutions have this data in some form — addresses, branch locations, or KRA PIN registrations.

**Step 2: Overlay climate hazard data**
Use publicly available data to map climate hazards by county:
- Kenya Meteorological Department rainfall and temperature data
- National Drought Management Authority drought severity classifications
- County Integrated Development Plans (CIDPs) climate risk sections
- FEWS NET food security and climate bulletins
- Kenya's National Adaptation Plan county-level assessments

**Step 3: Score risk by county**
Create a simple scoring system: Low / Medium / High / Very High for each major hazard (drought, flood, heat stress, sea-level rise, landslide) by county.

**Step 4: Map your portfolio exposure**
Cross-reference your loan book with county risk scores. What percentage of your portfolio is in high-risk counties? Which sectors in which counties are most exposed?

**Step 5: Visualise and act**
A heat map of your climate exposure is one of the most powerful tools for board reporting, risk committee discussions, and strategic planning. It makes abstract climate risk tangible.

**The Technology Advantage**

Modern platforms can automate this entire process — taking your loan data, mapping it to county-level hazard profiles, and generating risk-scored portfolio views in minutes rather than months. The data exists. The tools exist. What's been missing is the connection between financial portfolios and climate geography.

Kenya's 47 counties are 47 different climate risk environments. Your portfolio risk management needs to reflect that reality.`
  },
  {
    id: 'tcfd-vs-issb',
    title: "TCFD, ISSB, IFRS S2, CBK CRDF — A Plain English Guide to the Alphabet Soup",
    date: 'November 2025',
    readTime: '5 min read',
    category: 'Standards',
    summary: "Confused by all the climate reporting frameworks? You're not alone. Here's how they all fit together.",
    content: `If you've been in any meeting about climate risk in the past year, you've probably heard a dozen acronyms thrown around: TCFD, ISSB, IFRS S1, IFRS S2, CRDF, KGFT, PCAF, GHG Protocol, SASB, GRI... It's enough to make anyone's head spin.

Let's cut through the noise. Here's what actually matters for Kenyan financial institutions, and how it all connects.

**The Framework Family Tree**

Think of it as a family:

**TCFD** (Task Force on Climate-related Financial Disclosures) was the grandfather. Created by the Financial Stability Board in 2015, it established the four-pillar structure: Governance, Strategy, Risk Management, Metrics & Targets. Almost every climate framework since has built on this structure.

**ISSB** (International Sustainability Standards Board) is the TCFD's successor. In 2023, the TCFD was officially absorbed into the ISSB. Same structure, but now with the authority of an international standards-setting body (under the IFRS Foundation).

**IFRS S1** (General Sustainability Disclosures) and **IFRS S2** (Climate-Related Disclosures) are the actual standards issued by the ISSB. IFRS S2 is essentially the TCFD framework turned into an enforceable standard with more specific requirements.

**CBK CRDF** (Climate-Related Disclosures Framework) is Kenya's version. It takes the TCFD/IFRS S2 structure and applies it specifically to CBK-supervised institutions (banks, MFBs, mortgage companies). Think of it as the Kenyan translation of the global standard.

**KGFT** (Kenya Green Finance Taxonomy) is complementary — it classifies which activities count as "green." It doesn't tell you how to disclose; it tells you what to classify.

**PCAF** (Partnership for Carbon Accounting Financials) provides the methodology for measuring financed emissions — a key metric required by IFRS S2 and CBK CRDF.

**The Key Takeaway: They All Say the Same Thing**

Here's what nobody tells you: these frameworks are fundamentally the same. They all ask four questions:

1. **Governance**: Who in your organisation is responsible for climate risk?
2. **Strategy**: How does climate risk affect your business?
3. **Risk Management**: How do you identify and manage climate risks?
4. **Metrics**: What are the numbers?

If you build your climate risk management around these four pillars, you're simultaneously addressing TCFD, IFRS S2, CBK CRDF, and most DFI requirements. You don't need separate compliance programmes for each framework.

**What Kenya Specifically Requires**

For most Kenyan financial institutions, the binding requirements are:

- **CBK CRDF** (October 2026): If you're a bank, MFB, or mortgage company supervised by CBK
- **IFRS S1/S2** (January 2027): If you're a Public Interest Entity (listed company, bank, insurer, large SACCO, etc.)
- **IRA Climate Risk Guidelines** (expected 2027): If you're an insurance company
- **RBA/SASRA** (timeline TBD): If you're a pension fund or SACCO

**The Practical Translation**

Here's what you actually need to do, regardless of which framework you're reporting against:

1. **Put climate risk on the board agenda** → Satisfies the Governance pillar of all frameworks
2. **Assess how climate affects your portfolio** → Satisfies Strategy for all frameworks
3. **Integrate climate into your risk management** → Satisfies Risk Management for all frameworks
4. **Measure your emissions and set targets** → Satisfies Metrics for all frameworks

Don't get lost in the acronyms. Focus on the substance. Build a solid foundation across these four pillars, and you'll be compliant with whatever specific framework applies to you.

The alphabet soup is less complicated than it looks — and understanding this saves you time, money, and headaches.`
  },
  {
    id: 'audit-firms-opportunity',
    title: "For Audit and Consulting Firms: Climate Risk Is Your Next Big Revenue Stream",
    date: 'October 2025',
    readTime: '6 min read',
    category: 'Advisory',
    summary: "Every financial institution in Kenya will need climate risk support. Audit and consulting firms are perfectly positioned to deliver — if they move now.",
    content: `If you run or work at an audit firm, consulting practice, or advisory business in Kenya, pay attention: climate risk compliance is about to create the biggest advisory market since IFRS adoption. And the firms that position themselves now will dominate it.

**The Size of the Opportunity**

Let's do the maths:

- 38 commercial banks, 13 MFBs, and 56 insurance companies need CBK/IRA climate risk compliance
- 175+ deposit-taking SACCOs will need climate risk guidance as SASRA follows CBK
- 65+ NSE-listed companies need IFRS S2 compliance
- Hundreds of large non-listed entities classified as PIEs
- Every one of these institutions needs: gap assessments, governance setup, data infrastructure, scenario analysis, report preparation, and potentially assurance

Conservative estimate: the climate risk advisory market in Kenya is worth KSH 5-10 billion over the next 3-5 years. That's new revenue, not cannibalisation of existing services.

**Why Audit Firms Are Uniquely Positioned**

You already have three things that are hard to replicate:

1. **Trusted client relationships**: Your clients — banks, insurers, listed companies — already trust you with their most sensitive financial data. Climate risk is a natural extension.

2. **Technical credibility**: Your brand carries weight. When you tell a client's board that their climate risk governance needs improvement, they listen in a way they might not with a pure-play sustainability consultant.

3. **Assurance capability**: Eventually, climate disclosures will need assurance (IFRS S2 is designed for it). Only audit firms with the right capabilities will be able to provide this.

**What Services to Offer**

The climate advisory practice can start generating revenue quickly:

**Gap Assessment** (KSH 500K - 2M per engagement): Compare the client's current state against CBK CRDF and IFRS S2 requirements. Identify gaps and prioritise actions. This is the entry point for most engagements.

**Governance Setup** (KSH 300K - 1M): Help clients establish board-level climate oversight, management committees, policies, and reporting structures.

**Climate Risk Assessment** (KSH 1-5M): Portfolio-level physical and transition risk analysis. Scenario analysis. Sector and county-level exposure mapping.

**Report Preparation** (KSH 1-3M): Prepare the actual CBK CRDF submission or IFRS S2 disclosure. Data gathering, narrative drafting, metrics calculation.

**Training and Capacity Building** (KSH 200K - 500K per session): Board briefings, management training, credit officer education on climate risk.

**Climate Assurance** (KSH 1-3M): When assurance requirements kick in, this becomes a recurring annual engagement — just like financial statement audits.

**How to Build the Practice**

1. **Invest in expertise**: Send 2-3 partners/managers through the GARP Sustainability and Climate Risk (SCR) certification. It takes 3-6 months and costs roughly $600 per person.

2. **Start with existing clients**: Don't cold-call. Approach your audit and advisory clients with a climate risk gap assessment offer. Many will say yes because they trust you and know they need to act.

3. **Partner with technology**: You don't need to build your own climate risk platform. Partner with a technology provider that can supply the data, analytics, and reporting tools. You bring the client relationships and advisory expertise; the technology partner brings the engine.

4. **Create scalable methodologies**: Develop standardised gap assessment templates, governance frameworks, and report formats that can be deployed across multiple clients efficiently.

5. **Position early**: Write thought leadership, speak at KBA and ICPAK events, publish climate risk guides. The firms that are visible now will be the first calls when institutions start their compliance programmes.

**The Window Is Open**

Right now, very few Kenyan audit and consulting firms have dedicated climate risk practices. The big four (PwC, EY, Deloitte, KPMG) are building globally but haven't fully localised for the Kenyan market. Mid-tier and local firms that move quickly can capture significant market share.

The window won't stay open forever. As the October 2026 CRDF deadline approaches, demand will surge. The firms that have built their capabilities by then will capture the work. The ones that haven't will watch from the sidelines.`
  },
  {
    id: 'climate-smart-agriculture',
    title: "Climate-Smart Agriculture Lending: The Biggest Green Finance Opportunity for Kenyan Banks",
    date: 'October 2025',
    readTime: '7 min read',
    category: 'Green Finance',
    summary: "Agriculture is 22% of Kenya's GDP and massively climate-exposed. Climate-smart agriculture lending is a trillion-shilling opportunity.",
    content: `Agriculture contributes 22% of Kenya's GDP, employs over 40% of the total population, and accounts for 65% of export earnings. It's also the sector most vulnerable to climate change. For Kenyan financial institutions, this intersection creates the single largest green finance opportunity in the market.

**The Problem**

Kenya's agricultural sector is overwhelmingly rain-fed. When the rains fail — as they have with increasing frequency — the sector contracts. The 2021-2023 drought wiped an estimated 2-3 percentage points off GDP growth. Crop failures cascade through the economy: farmers default on loans, rural incomes collapse, food prices spike, and urban consumers suffer.

Traditional agricultural lending has always been risky. Climate change is making it riskier. But here's the twist: the solution — climate-smart agriculture (CSA) — creates a massive lending opportunity.

**What Is Climate-Smart Agriculture?**

CSA is agriculture that:
- **Increases productivity sustainably** (more output without more environmental damage)
- **Builds resilience to climate impacts** (withstands droughts, floods, and temperature changes)
- **Reduces greenhouse gas emissions** (less methane, less deforestation, more carbon sequestration)

In practical terms for Kenya, CSA includes:

**Irrigation**: Moving from rain-fed to irrigated agriculture. Solar-powered drip irrigation systems can transform a farmer's resilience to drought. A single system costs KSH 200-500K and pays for itself in 2-3 seasons.

**Drought-resistant seeds and crops**: Breeding and distributing crop varieties that can tolerate heat and water stress. This is an input financing opportunity.

**Soil health management**: Cover cropping, composting, conservation tillage. Improves yields and sequesters carbon.

**Agroforestry**: Integrating trees into farming systems. Provides shade, prevents soil erosion, diversifies income, and sequesters carbon.

**Post-harvest infrastructure**: Storage and cold chain facilities that reduce the 30-40% of food lost post-harvest in Kenya. Climate-controlled storage is especially valuable as temperatures rise.

**Livestock management**: Improved breeds, fodder management, biogas from animal waste. Reduces emissions while improving productivity.

**The Lending Opportunity**

The financing gap for climate-smart agriculture in Kenya is estimated at KSH 100+ billion annually. Current lending covers a fraction of this. Here's where the money goes:

- **Solar irrigation systems**: KSH 200K - 5M per system, depending on scale
- **Greenhouse and shade net installation**: KSH 500K - 3M per unit
- **Post-harvest storage facilities**: KSH 1-10M per facility
- **Agroforestry establishment**: KSH 100K - 500K per hectare
- **Climate-resilient livestock**: KSH 200K - 2M per enterprise
- **Biogas digesters**: KSH 100K - 500K per installation

These are bankable investments with clear returns and relatively short payback periods. They also qualify as green lending under the Kenya Green Finance Taxonomy.

**Why DFIs Are Pouring Money Into This**

DFIs see climate-smart agriculture as a triple win: climate adaptation, food security, and economic development. That's why:

- IFC has dedicated CSA credit lines available for Kenyan FIs
- KfW funds multiple agricultural climate resilience programmes in Kenya
- IFAD and the World Bank have active CSA projects in 30+ Kenyan counties
- The Green Climate Fund finances agricultural adaptation through accredited entities

When you build a CSA lending portfolio, you're not just creating a product — you're positioning your institution to access some of the most attractive funding in the market.

**How to Build a CSA Lending Portfolio**

1. **Define your CSA products**: Create specific loan products for solar irrigation, greenhouses, post-harvest storage, and other CSA activities. These need tailored terms — seasonal repayment, longer tenors, grace periods during establishment.

2. **Train your agricultural lending team**: Your relationship managers in rural branches need to understand what CSA looks like on the ground. Partner with agricultural extension services for joint training.

3. **Use the KGFT to classify**: Tag every CSA loan as taxonomy-aligned from origination. This creates the data trail you need for green reporting and DFI compliance.

4. **Partner with technology providers**: Satellite imagery, weather data, and agronomic analytics can help you assess and monitor CSA investments remotely.

5. **Build the DFI case**: Package your CSA pipeline and approach DFIs with a clear proposition: "We have X thousand farmers in Y counties ready for Z in CSA investment."

Climate-smart agriculture isn't just good for the environment. It's good for farmers, good for food security, and good for your institution's bottom line. In a country where agriculture is everything, this is the green finance opportunity of the decade.`
  },
  {
    id: 'east-africa-compliance',
    title: "Beyond Kenya: Climate Risk Regulation Is Coming to All of East Africa",
    date: 'October 2025',
    readTime: '6 min read',
    category: 'Africa',
    summary: "Uganda, Tanzania, Rwanda, and Ethiopia are all developing climate finance frameworks. Pan-regional institutions need to prepare now.",
    content: `If your institution operates across East Africa — and many Kenyan financial groups do — climate risk regulation isn't just a Kenyan issue. Every major economy in the East African Community is developing its own climate finance framework. Here's what's happening and what it means for regional players.

**Country-by-Country Snapshot**

**Uganda**
The Bank of Uganda issued Environmental, Social and Governance Guidelines for financial institutions in 2023. While not yet as prescriptive as CBK's CRDF, the direction is clear. The Capital Markets Authority of Uganda is also developing ESG disclosure requirements for listed entities. Uganda's National Adaptation Programme of Action identifies financial sector resilience as a priority.

**Tanzania**
The Bank of Tanzania has been engaging with the Sustainable Banking Network (SBN) and has signalled intentions to develop climate-related guidance for supervised institutions. Tanzania's capital markets regulator (CMSA) is working on sustainability disclosure requirements. The country's heavy dependence on rain-fed agriculture makes climate risk especially material.

**Rwanda**
Rwanda is arguably the most progressive in the region after Kenya. The National Bank of Rwanda (BNR) has integrated ESG considerations into its supervisory framework. The Rwanda Green Fund (FONERWA) is one of Africa's most successful national climate funds. Rwanda's CMA issued Green Bond and Sustainability-Linked Bond Guidelines in December 2024. Rwanda is positioning Kigali as East Africa's green finance hub.

**Ethiopia**
Ethiopia is in the early stages of financial sector liberalisation, but climate risk awareness is growing. The National Bank of Ethiopia is developing risk management guidelines that may include environmental risk. Ethiopia's Green Economy Strategy provides a policy foundation. The country's vulnerability to drought and food insecurity makes climate risk oversight critical for financial stability.

**What This Means for Regional Players**

Several Kenyan financial groups operate across these markets: KCB Group (Uganda, Tanzania, Rwanda, Burundi, DRC, South Sudan), Equity Group (Uganda, Tanzania, Rwanda, DRC, South Sudan), NCBA (Tanzania), I&M Group (Uganda, Tanzania, Rwanda).

For these groups, climate risk compliance is a regional challenge:
- Different countries will have different timelines and specific requirements
- Group-level climate governance needs to cover all subsidiaries
- Data collection must work across different markets
- Reporting will need to be consolidated at group level while meeting local requirements

**The Advantage of Moving Early**

Regional players that build climate risk capability now get:

- **Scalable systems**: A platform deployed for the Kenyan operation can be adapted for Uganda, Tanzania, and Rwanda with localised data and regulatory mapping.
- **Group-level efficiency**: One methodology, one governance framework, adapted for each jurisdiction.
- **DFI attractiveness**: DFIs love regional financial groups that demonstrate climate awareness across their footprint.
- **Regulatory goodwill**: Being ahead of local requirements in each market builds regulatory trust.

**The EAC Opportunity**

The East African Community as a bloc is also engaging with climate finance:
- EAC partner states have committed to harmonising sustainable finance frameworks
- Regional development banks (like the East African Development Bank) are developing climate strategies
- Cross-border investments and trade linkages mean that climate risk in one EAC country affects financial institutions in others

**Practical Next Steps for Regional Groups**

1. **Establish group-level climate governance**: The group board and risk committee should oversee climate risk across all markets, not just Kenya.
2. **Map regulatory timelines**: Create a matrix of climate risk requirements and deadlines across each country you operate in.
3. **Build a regional data platform**: Deploy climate risk tools that can ingest data from all your markets and produce both local and consolidated reports.
4. **Start with Kenya, then replicate**: Use your Kenya CRDF compliance programme as the template. Adapt it for each subsequent market.
5. **Engage with local regulators**: In markets where regulation is still developing, engage proactively. Being part of the conversation is better than reacting to the outcome.

East Africa is one of the world's most climate-vulnerable regions. Financial institutions that operate here have both a responsibility and an opportunity to lead on climate risk management. The ones that build regional capability now will define the standard for decades to come.`
  },
  {
    id: 'transition-planning',
    title: "Transition Plans: Why Every Kenyan Bank Needs One (And What to Put in It)",
    date: 'September 2025',
    readTime: '7 min read',
    category: 'Strategy',
    summary: "A transition plan isn't just a document — it's your institution's roadmap for navigating the shift to a low-carbon economy.",
    content: `You'll hear the term "transition plan" increasingly in climate risk discussions. CBK's CRDF mentions it. IFRS S2 references it. DFIs ask about it. But what exactly is a transition plan, and why does your institution need one?

**What Is a Transition Plan?**

A transition plan is a time-bound, action-oriented strategy that sets out how your institution will manage its response to the transition to a low-carbon economy. It covers both the risks you need to manage and the opportunities you want to capture.

Think of it as your institution's answer to the question: "As the world moves away from fossil fuels and toward green energy, as carbon prices rise and regulations tighten, how will you adapt your business to thrive?"

**Why Kenyan Banks Need One**

"But Kenya already has 90% renewable electricity — we're not like a coal-dependent economy."

True. Kenya's grid is one of the greenest in Africa. But transition risk goes far beyond electricity:

- **Agricultural transformation**: As climate change disrupts rain-fed agriculture, banks with large agricultural portfolios need to plan for how their lending will evolve. Which crops will remain viable? Which regions will need different agricultural models?

- **Transport electrification**: Kenya is planning for electric vehicle adoption. Banks financing petrol-dependent transport businesses are financing transition risk.

- **Building standards**: Green building codes are coming. Real estate portfolios need to factor in the cost of compliance and the risk of stranded assets.

- **Carbon markets**: Kenya's participation in international carbon markets is growing. This creates opportunities for banks that understand carbon credit financing and risks for those that don't.

- **International supply chain requirements**: Kenya's export sectors (tea, coffee, flowers, textiles) face increasing sustainability requirements from European and US buyers. Exporters that can't demonstrate climate action will lose market access.

**What Goes Into a Transition Plan**

A good transition plan has six components:

**1. Ambition and targets**
Where do you want to be? Set specific, time-bound targets:
- Green portfolio as a percentage of total lending (e.g., 15% by 2028, 30% by 2030)
- Financed emissions reduction trajectory (e.g., aligned with Kenya's NDC)
- Sector-specific targets for high-emitting exposures

**2. Current state assessment**
Where are you now? Baseline your:
- Current green lending portfolio
- Financed emissions by sector
- High-carbon exposure concentration
- Climate risk governance maturity

**3. Sector strategies**
For each significant sector in your portfolio:
- What are the transition risks and opportunities?
- Which subsectors will grow, shrink, or transform?
- How will you adjust your lending strategy?
- What engagement will you undertake with borrowers?

**4. Products and services**
What new offerings will you develop?
- Green loan products
- Sustainability-linked loans
- Climate adaptation financing
- Carbon market services
- Advisory services for borrowers on their own transitions

**5. Internal capabilities**
What do you need to build?
- Staff training and awareness
- Data and technology systems
- Risk model adjustments
- Board and management competencies

**6. Implementation timeline**
When will each element be delivered? Map actions to quarters and years, with clear milestones and accountability.

**Making It Real**

The biggest risk with transition plans is that they become impressive documents that sit on shelves. To avoid this:

- **Embed it in strategy**: The transition plan should be part of your strategic plan, not a separate sustainability exercise.
- **Link it to incentives**: Connect management KPIs and bonus structures to transition plan milestones.
- **Report on progress**: Include transition plan updates in your quarterly board reporting and annual disclosures.
- **Review and update**: Transition plans should be living documents, updated annually as climate science, regulation, and market conditions evolve.

**The DFI Connection**

Here's the business case that gets the most attention in boardrooms: DFIs are increasingly requiring transition plans as a condition for facilities. When IFC or FMO evaluates your institution for a climate credit line, one of the first things they'll ask is: "What's your transition strategy?"

Having a credible transition plan doesn't just satisfy regulators — it opens doors to the most attractive capital in the market. Build the plan, live the plan, and the capital follows.`
  },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null)
  const toggleSegment = (seg: string) => setExpandedSegment(prev => prev === seg ? null : seg)
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null)
  const [blogFilter, setBlogFilter] = useState<string>('All')

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
          --bg2: #eef1f6;
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
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
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
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-5 { grid-template-columns: repeat(2, 1fr); }
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
      <header style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 14 }}>CR</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--dark)', lineHeight: 1.2 }}>Climate Risk &amp; Compliance</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.2 }}>by CFO Innovation Partners</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-red hide-mobile" style={{ fontSize: 11 }}>CBK CRDF: Oct 2026</span>
            <span className="badge badge-amber hide-mobile" style={{ fontSize: 11 }}>IFRS S1/S2: Jan 2027</span>
            <a href="/auth" className="btn btn-primary" style={{ padding: '7px 16px', fontSize: 13 }}>Sign In</a>
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
                padding: '10px 14px', border: 'none',
                borderBottom: activeTab === tab ? '3px solid var(--accent)' : '3px solid transparent',
                background: activeTab === tab ? 'var(--accent-light)' : 'none',
                borderRadius: activeTab === tab ? '8px 8px 0 0' : 0,
                cursor: 'pointer', fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? 'var(--accent)' : 'var(--text2)',
                fontSize: 13, whiteSpace: 'nowrap', transition: 'all 0.2s',
                ...(tab === 'Get Started' ? { background: activeTab === tab ? 'var(--accent)' : 'var(--accent)', color: 'white', borderRadius: 6, margin: '4px 0', fontWeight: 700, borderBottom: 'none' } : {})
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
                  background: activeTab === tab ? 'var(--accent-light)' : (tab === 'Get Started' ? 'var(--accent)' : 'transparent'),
                  color: activeTab === tab ? 'var(--accent)' : (tab === 'Get Started' ? 'white' : 'var(--text)'),
                  fontWeight: activeTab === tab || tab === 'Get Started' ? 700 : 400,
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

      {/* ============ SERVICES ============ */}
      {activeTab === 'Services' && (
        <div className="section">
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: 'var(--accent)' }}>Our Services</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 24, fontSize: 14, maxWidth: 700 }}>
            End-to-end climate risk compliance and green finance infrastructure for Kenya&apos;s financial sector. Technology-first, human-supported.
          </p>

          <div className="grid-2" style={{ marginBottom: 32 }}>
            {[
              {
                icon: '📊',
                title: 'Climate Risk Assessment & Reporting',
                desc: 'Automated CBK CRDF and IFRS S2 report generation. Portfolio-level physical and transition risk analysis. Scenario modelling across multiple climate pathways.',
                features: ['CBK CRDF report builder', 'IFRS S2 disclosure templates', 'Physical risk heat maps by county', 'Transition risk sector scoring', 'Board-ready dashboards']
              },
              {
                icon: '📈',
                title: 'Financed Emissions Measurement (PCAF)',
                desc: 'Calculate your portfolio\'s carbon footprint using the PCAF standard. Track emissions intensity across sectors and set science-based reduction targets.',
                features: ['Scope 3 Category 15 calculation', 'Sector emission factors for Kenya', 'Data quality scoring (1-5)', 'Year-on-year tracking', 'Benchmarking against peers']
              },
              {
                icon: '🏗️',
                title: 'Green Finance Taxonomy Tagging (KGFT)',
                desc: 'Classify your loan portfolio against the Kenya Green Finance Taxonomy. Identify green lending opportunities and track your green portfolio ratio.',
                features: ['KGFT sector classification', 'Green portfolio ratio tracking', 'Do No Significant Harm screening', 'DFI eligibility reporting', 'Green bond use-of-proceeds verification']
              },
              {
                icon: '🔍',
                title: 'Free Climate Readiness Diagnostic',
                desc: 'A comprehensive 6-pillar assessment that benchmarks your institution\'s climate risk readiness against regulatory requirements and best practices.',
                features: ['15-minute online assessment', 'Instant readiness score', 'Gap analysis by pillar', 'Prioritised action plan', 'Peer benchmarking'],
                cta: true
              },
              {
                icon: '📋',
                title: 'Borrower Climate Data Collection',
                desc: 'Digital questionnaires, proxy-based estimation, and progressive data quality improvement. Get borrower-level climate data without manual spreadsheets.',
                features: ['Digital borrower questionnaires', 'Proxy estimation from sector data', 'County-level hazard mapping', 'Integration with core banking', 'PCAF data quality ladder']
              },
              {
                icon: '🎓',
                title: 'Board & Management Training',
                desc: 'Practical climate risk training for boards, risk committees, credit teams, and compliance officers. Tailored to Kenya\'s regulatory context.',
                features: ['Board climate governance briefings', 'Credit officer climate training', 'Risk committee workshops', 'Customised to your institution', 'Ongoing learning modules']
              },
              {
                icon: '🤝',
                title: 'DFI Partnership Facilitation',
                desc: 'Position your institution to access green credit lines, concessional capital, and technical assistance from IFC, FMO, KfW, AfDB, and other DFIs.',
                features: ['Green pipeline development', 'DFI proposal preparation', 'Impact measurement setup', 'ESMS development', 'Ongoing reporting support']
              },
              {
                icon: '🏢',
                title: 'Channel & White-Label Partnerships',
                desc: 'For audit firms, consulting practices, industry associations, and DFIs: deploy our platform across your client base or portfolio companies.',
                features: ['White-label platform', 'Co-branded solutions', 'Bulk licensing', 'Partner training & certification', 'Revenue sharing models']
              },
            ].map(service => (
              <div key={service.title} className="card" style={{ borderTop: '3px solid var(--accent)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{service.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{service.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12, lineHeight: 1.5 }}>{service.desc}</p>
                <ul style={{ fontSize: 13, color: 'var(--text)', listStyle: 'none', padding: 0 }}>
                  {service.features.map(f => (
                    <li key={f} style={{ padding: '3px 0', borderBottom: '1px solid var(--bg)' }}>&#10003; {f}</li>
                  ))}
                </ul>
                {service.cta && (
                  <button className="btn btn-primary" style={{ marginTop: 12, width: '100%' }} onClick={() => switchTab('Get Started')}>Take Free Diagnostic</button>
                )}
              </div>
            ))}
          </div>

          {/* Open Source Tools Integration */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: 'var(--dark)' }}>Integrated Open-Source Climate Tools</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 16 }}>
              Our platform integrates leading open-source climate risk tools to provide institutional-grade analytics without the institutional price tag.
            </p>
            <div className="grid-3">
              {[
                { name: 'PACTA (RMI)', desc: 'Portfolio alignment analysis against Paris Agreement targets. Measures your lending portfolio against 2°C-aligned sector pathways.', use: 'Portfolio alignment' },
                { name: 'CLIMADA (ETH Zurich)', desc: 'Probabilistic natural catastrophe risk modelling. Calculates expected losses from droughts, floods, and tropical storms.', use: 'Physical risk modelling' },
                { name: 'OS-Climate', desc: 'Open-source physical and transition risk analytics platform backed by Linux Foundation. Scenario analysis and data integration.', use: 'Scenario analysis' },
                { name: '1in1000 (PRISK)', desc: 'Sovereign climate risk assessment tool. Evaluates how climate change affects country-level economic performance and debt sustainability.', use: 'Sovereign risk' },
                { name: 'WRI Aqueduct', desc: 'Global water risk mapping tool by World Resources Institute. Maps water stress, flood risk, and drought severity at sub-national level.', use: 'Water risk mapping' },
                { name: 'WWF Risk Filter', desc: 'Biodiversity and water risk screening for investment portfolios. Maps deforestation and water stress across supply chains.', use: 'Biodiversity screening' },
              ].map(tool => (
                <div key={tool.name} className="card card-blue">
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{tool.name}</h4>
                  <span className="badge badge-blue" style={{ marginBottom: 8, display: 'inline-block' }}>{tool.use}</span>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing CTA */}
          <div style={{ textAlign: 'center', padding: 32, background: 'var(--bg2)', borderRadius: 12 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Ready to Get Started?</h3>
            <p style={{ color: 'var(--text2)', marginBottom: 16, maxWidth: 500, margin: '0 auto 16px' }}>
              Start with a free climate readiness diagnostic, or talk to us about a full implementation.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/diagnostic" className="btn btn-primary">Free Diagnostic</a>
              <button className="btn btn-outline" onClick={() => switchTab('Get Started')}>Request Demo</button>
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 12 }}>partner@cfopartners.fund &nbsp;|&nbsp; +254 748 918 910</p>
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
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Kenya&apos;s Climate Risk Ecosystem</h1>
          <p style={{ color: 'var(--text2)', marginBottom: 20 }}>1,500+ institutions across 7 segments. Click any segment to explore.</p>

          {/* Regulatory Comparison */}
          <div className="card" style={{ marginBottom: 20, overflowX: 'auto' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Regulatory Framework Comparison</h3>
            <table>
              <thead><tr><th>Dimension</th><th>Banks</th><th>SACCOs</th><th>Insurers</th><th>Pension</th><th>MFBs</th><th>Listed Cos</th></tr></thead>
              <tbody>
                <tr><td style={{ fontWeight: 600 }}>Regulator</td><td>CBK</td><td>SASRA</td><td>IRA</td><td>RBA</td><td>CBK</td><td>CMA/NSE</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Framework</td><td>CRDF + IFRS S2</td><td>IFRS S1+S2</td><td>IFRS S1+S2</td><td>IFRS S1+S2</td><td>CRDF + IFRS S2</td><td>NSE ESG + IFRS S2</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Deadline</td><td>Oct 2026</td><td>Jan 2027</td><td>Jan 2027</td><td>Jan 2027</td><td>Oct 2026</td><td>Jan 2027</td></tr>
              </tbody>
            </table>
          </div>

          {/* Expandable Segment List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Banks */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => toggleSegment('banks')} style={{ width: '100%', padding: '16px 20px', border: 'none', background: expandedSegment === 'banks' ? 'var(--accent-light)' : 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div><span style={{ fontWeight: 700, fontSize: 16 }}>Commercial Banks</span><span style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 12 }}>39 licensed &bull; KSH 7.2T+ assets &bull; 73% submitted reports</span></div>
                <span style={{ fontSize: 18, color: 'var(--accent)' }}>{expandedSegment === 'banks' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {expandedSegment === 'banks' && (
                <div style={{ padding: '0 20px 20px' }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, margin: '12px 0 8px' }}>Tier 1 Banks (9) &mdash; ~75% of total assets</h4>
                  <div style={{ overflowX: 'auto' }}><table><thead><tr><th>#</th><th>Bank</th><th>Assets (KSH B)</th><th>Ownership</th><th>Sustainability</th></tr></thead>
                  <tbody>{BANKS_TIER1.map(b => <tr key={b.n}><td>{b.n}</td><td style={{ fontWeight: 600 }}>{b.name}</td><td>{b.assets}</td><td>{b.ownership}</td><td><span className="badge badge-green" style={{ fontSize: 11 }}>{b.esg}</span></td></tr>)}</tbody></table></div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, margin: '16px 0 8px' }}>Tier 2 Banks (10)</h4>
                  <div style={{ overflowX: 'auto' }}><table><thead><tr><th>#</th><th>Bank</th><th>Assets (KSH B)</th><th>Ownership</th></tr></thead>
                  <tbody>{BANKS_TIER2.map(b => <tr key={b.n}><td>{b.n}</td><td style={{ fontWeight: 600 }}>{b.name}</td><td>{b.assets}</td><td>{b.ownership}</td></tr>)}</tbody></table></div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, margin: '16px 0 8px' }}>Tier 3 Banks (20)</h4>
                  <div style={{ overflowX: 'auto' }}><table><thead><tr><th>#</th><th>Bank</th><th>Assets (KSH B)</th><th>Ownership</th></tr></thead>
                  <tbody>{BANKS_TIER3.map(b => <tr key={b.n}><td>{b.n}</td><td style={{ fontWeight: 600 }}>{b.name}</td><td>{b.assets}</td><td>{b.ownership}</td></tr>)}</tbody></table></div>
                </div>
              )}
            </div>

            {/* SACCOs */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => toggleSegment('saccos')} style={{ width: '100%', padding: '16px 20px', border: 'none', background: expandedSegment === 'saccos' ? 'var(--accent-light)' : 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div><span style={{ fontWeight: 700, fontSize: 16 }}>Deposit-Taking SACCOs</span><span style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 12 }}>176 SASRA-regulated &bull; KSH 900B+ &bull; 6.5M+ members</span></div>
                <span style={{ fontSize: 18, color: 'var(--accent)' }}>{expandedSegment === 'saccos' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {expandedSegment === 'saccos' && (
                <div style={{ padding: '0 20px 20px' }}>
                  <p style={{ fontSize: 14, color: 'var(--text2)', margin: '12px 0' }}>SACCOs are Public Interest Entities. Must adopt IFRS S1 &amp; S2 from January 2027. Virtually none have ESG teams &mdash; CFOIP&apos;s largest opportunity.</p>
                  <div style={{ overflowX: 'auto' }}><table><thead><tr><th>#</th><th>SACCO</th><th>Assets (KSH B)</th><th>Members</th><th>Sector</th></tr></thead>
                  <tbody>{SACCOS.map(s => <tr key={s.n}><td>{s.n}</td><td style={{ fontWeight: 600 }}>{s.name}</td><td>{s.assets}</td><td>{s.members}</td><td>{s.sector}</td></tr>)}</tbody></table></div>
                </div>
              )}
            </div>

            {/* Insurance */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => toggleSegment('insurance')} style={{ width: '100%', padding: '16px 20px', border: 'none', background: expandedSegment === 'insurance' ? 'var(--accent-light)' : 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div><span style={{ fontWeight: 700, fontSize: 16 }}>Insurance Companies</span><span style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 12 }}>62 licensed &bull; KSH 320B+ premiums &bull; KSH 850B+ assets</span></div>
                <span style={{ fontSize: 18, color: 'var(--accent)' }}>{expandedSegment === 'insurance' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {expandedSegment === 'insurance' && (
                <div style={{ padding: '0 20px 20px' }}>
                  <p style={{ fontSize: 14, color: 'var(--text2)', margin: '12px 0' }}>Double exposure: physical risks increase claims, investment portfolios carry transition risk.</p>
                  <div style={{ overflowX: 'auto' }}><table><thead><tr><th>Insurer</th><th>Type</th><th>Premiums</th><th>Sustainability</th></tr></thead>
                  <tbody>{INSURERS.map(i => <tr key={i.name}><td style={{ fontWeight: 600 }}>{i.name}</td><td>{i.type}</td><td>{i.premiums}</td><td>{i.esg}</td></tr>)}</tbody></table></div>
                </div>
              )}
            </div>

            {/* Pensions */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => toggleSegment('pensions')} style={{ width: '100%', padding: '16px 20px', border: 'none', background: expandedSegment === 'pensions' ? 'var(--accent-light)' : 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div><span style={{ fontWeight: 700, fontSize: 16 }}>Pension Schemes</span><span style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 12 }}>1,200+ schemes &bull; KSH 1.8T+ AUM &bull; 25+ fund managers</span></div>
                <span style={{ fontSize: 18, color: 'var(--accent)' }}>{expandedSegment === 'pensions' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {expandedSegment === 'pensions' && (
                <div style={{ padding: '0 20px 20px' }}>
                  <div style={{ overflowX: 'auto', marginTop: 12 }}><table><thead><tr><th>Category</th><th>Key Names</th><th>CFOIP Relevance</th></tr></thead>
                  <tbody>
                    <tr><td style={{ fontWeight: 600 }}>Large Schemes</td><td>NSSF (KSH 300B+), LAPTRUST, County Pension Fund</td><td><span className="badge badge-green">High</span></td></tr>
                    <tr><td style={{ fontWeight: 600 }}>Fund Managers</td><td>Old Mutual, Britam, Sanlam, ICEA LION, CIC Asset Mgmt</td><td><span className="badge badge-green">High</span></td></tr>
                    <tr><td style={{ fontWeight: 600 }}>Administrators</td><td>Zamara, Minet, CPF Administrators, Enwealth</td><td><span className="badge badge-amber">Medium</span></td></tr>
                  </tbody></table></div>
                </div>
              )}
            </div>

            {/* MFBs */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => toggleSegment('mfbs')} style={{ width: '100%', padding: '16px 20px', border: 'none', background: expandedSegment === 'mfbs' ? 'var(--accent-light)' : 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div><span style={{ fontWeight: 700, fontSize: 16 }}>Microfinance Banks</span><span style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 12 }}>14 licensed &bull; KSH 120B+ assets &bull; 2M+ borrowers</span></div>
                <span style={{ fontSize: 18, color: 'var(--accent)' }}>{expandedSegment === 'mfbs' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {expandedSegment === 'mfbs' && (
                <div style={{ padding: '0 20px 20px' }}>
                  <div style={{ overflowX: 'auto', marginTop: 12 }}><table><thead><tr><th>#</th><th>MFB</th><th>Focus</th><th>Est. Borrowers</th></tr></thead>
                  <tbody>{MFBS.map(m => <tr key={m.n}><td>{m.n}</td><td style={{ fontWeight: 600 }}>{m.name}</td><td>{m.focus}</td><td>{m.borrowers}</td></tr>)}</tbody></table></div>
                </div>
              )}
            </div>

            {/* Listed Companies */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => toggleSegment('listed')} style={{ width: '100%', padding: '16px 20px', border: 'none', background: expandedSegment === 'listed' ? 'var(--accent-light)' : 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div><span style={{ fontWeight: 700, fontSize: 16 }}>NSE-Listed Companies</span><span style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 12 }}>~65 issuers &bull; KSH 2.1T+ market cap &bull; ~29 doing ESG</span></div>
                <span style={{ fontSize: 18, color: 'var(--accent)' }}>{expandedSegment === 'listed' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {expandedSegment === 'listed' && (
                <div style={{ padding: '0 20px 20px' }}>
                  <p style={{ fontSize: 14, color: 'var(--text2)', margin: '12px 0' }}>NSE ESG guidance since 2021 but IFRS S2 from Jan 2027 raises the bar. Most not ready for quantitative climate disclosure.</p>
                  <div style={{ overflowX: 'auto' }}><table><thead><tr><th>Company</th><th>Sector</th><th>Market Cap</th><th>IFRS S2 Readiness</th></tr></thead>
                  <tbody>{LISTED_COS.map(c => <tr key={c.name}><td style={{ fontWeight: 600 }}>{c.name}</td><td>{c.sector}</td><td>{c.marketCap}</td><td><span className={`badge ${c.readiness === 'Partial alignment' ? 'badge-amber' : 'badge-red'}`}>{c.readiness}</span></td></tr>)}</tbody></table></div>
                </div>
              )}
            </div>

            {/* DFIs */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => toggleSegment('dfis')} style={{ width: '100%', padding: '16px 20px', border: 'none', background: expandedSegment === 'dfis' ? 'var(--accent-light)' : 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div><span style={{ fontWeight: 700, fontSize: 16 }}>DFIs, Climate Funds &amp; Partners</span><span style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 12 }}>$4B+ climate finance &bull; 15+ active DFIs &bull; 10+ climate funds</span></div>
                <span style={{ fontSize: 18, color: 'var(--accent)' }}>{expandedSegment === 'dfis' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {expandedSegment === 'dfis' && (
                <div style={{ padding: '0 20px 20px' }}>
                  <p style={{ fontSize: 14, color: 'var(--text2)', margin: '12px 0' }}>DFIs invest billions but investees can&apos;t provide climate data. CFOIP deploys at investee level &mdash; data flows up automatically.</p>
                  <div style={{ overflowX: 'auto' }}><table><thead><tr><th>Organisation</th><th>Type</th><th>Climate Focus</th><th>CFOIP Angle</th></tr></thead>
                  <tbody>{DFIS.map(d => <tr key={d.name}><td style={{ fontWeight: 600 }}>{d.name}</td><td>{d.type}</td><td style={{ fontSize: 13 }}>{d.focus}</td><td style={{ fontSize: 13 }}>{d.angle}</td></tr>)}</tbody></table></div>
                </div>
              )}
            </div>
          </div>
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

      {/* ============ BLOG ============ */}
      {activeTab === 'Blog' && (
        <div className="section">
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: 'var(--accent)' }}>Insights &amp; Perspectives</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 20, fontSize: 14 }}>
            Practical guidance on climate risk, compliance, and green finance for Kenya&apos;s financial sector. Written in plain language for busy professionals.
          </p>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))].map(cat => (
              <button
                key={cat}
                onClick={() => setBlogFilter(cat)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  background: blogFilter === cat ? 'var(--accent)' : 'var(--bg2)',
                  color: blogFilter === cat ? '#fff' : 'var(--text2)',
                  border: 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {BLOG_POSTS.filter(p => blogFilter === 'All' || p.category === blogFilter).map(post => (
              <div key={post.id} className="card" style={{ cursor: 'pointer' }} onClick={() => setExpandedBlog(prev => prev === post.id ? null : post.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: 'var(--accent)', color: '#fff' }}>{post.category}</span>
                      <span style={{ fontSize: 12, color: 'var(--text2)' }}>{post.date}</span>
                      <span style={{ fontSize: 12, color: 'var(--text2)' }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{post.summary}</p>
                  </div>
                  <span style={{ fontSize: 20, color: 'var(--accent)', fontWeight: 700, flexShrink: 0, transform: expandedBlog === post.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>&#9660;</span>
                </div>

                {expandedBlog === post.id && (
                  <div
                    style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--bg2)', fontSize: 14, lineHeight: 1.8, color: 'var(--text1)' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {post.content.split('\n\n').map((para, i) => {
                      if (para.startsWith('**') && para.endsWith('**')) {
                        return <h4 key={i} style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8, color: 'var(--accent)' }}>{para.replace(/\*\*/g, '')}</h4>
                      }
                      if (para.match(/^\d+\.\s\*\*/)) {
                        return (
                          <div key={i} style={{ marginBottom: 8, paddingLeft: 16 }}>
                            {para.split('\n').map((line, j) => {
                              const boldMatch = line.match(/\*\*(.*?)\*\*/)
                              if (boldMatch) {
                                const parts = line.split(/\*\*.*?\*\*/)
                                return <p key={j} style={{ marginBottom: 4 }}><strong>{boldMatch[1]}</strong>{parts[1]}</p>
                              }
                              return <p key={j} style={{ marginBottom: 4 }}>{line}</p>
                            })}
                          </div>
                        )
                      }
                      if (para.startsWith('- **')) {
                        return (
                          <div key={i} style={{ marginBottom: 8, paddingLeft: 16 }}>
                            {para.split('\n').map((line, j) => {
                              const boldMatch = line.match(/\*\*(.*?)\*\*/)
                              if (boldMatch) {
                                const parts = line.split(/\*\*.*?\*\*/)
                                return <p key={j} style={{ marginBottom: 4 }}>&#8226; <strong>{boldMatch[1]}</strong>{parts[1]}</p>
                              }
                              return <p key={j} style={{ marginBottom: 4 }}>{line}</p>
                            })}
                          </div>
                        )
                      }
                      // Handle inline bold
                      if (para.includes('**')) {
                        const segments = para.split(/(\*\*.*?\*\*)/)
                        return (
                          <p key={i} style={{ marginBottom: 12 }}>
                            {segments.map((seg, s) =>
                              seg.startsWith('**') ? <strong key={s}>{seg.replace(/\*\*/g, '')}</strong> : seg
                            )}
                          </p>
                        )
                      }
                      return <p key={i} style={{ marginBottom: 12 }}>{para}</p>
                    })}

                    <div style={{ marginTop: 24, padding: 16, background: 'var(--bg2)', borderRadius: 10, textAlign: 'center' }}>
                      <p style={{ fontWeight: 700, marginBottom: 8 }}>Need help with this?</p>
                      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>Our platform automates climate risk reporting, data collection, and compliance for Kenyan financial institutions.</p>
                      <button className="btn btn-primary" onClick={() => switchTab('Get Started')}>Get Started Free</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Blog CTA */}
          <div style={{ marginTop: 32, padding: 24, background: 'var(--bg2)', borderRadius: 12, textAlign: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Stay Updated</h3>
            <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 4 }}>New insights published regularly. Follow developments in climate risk regulation, green finance, and compliance across Kenya and Africa.</p>
            <p style={{ fontSize: 14, color: 'var(--text2)' }}>Questions? Reach us at <strong>partner@cfopartners.fund</strong> or <strong>+254 748 918 910</strong></p>
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
