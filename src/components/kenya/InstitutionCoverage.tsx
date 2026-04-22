'use client'

import React, { useState } from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import DataTable from '@/components/ui/DataTable'

type InstitutionCategory = 
  | 'Commercial Banks'
  | 'SACCOs'
  | 'Insurers'
  | 'Pension Funds'
  | 'Microfinance Banks'
  | 'Listed Companies'
  | 'DFIs'

const InstitutionCoverage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InstitutionCategory>('Commercial Banks')

  const tabs: { label: InstitutionCategory; count: number }[] = [
    { label: 'Commercial Banks', count: 39 },
    { label: 'SACCOs', count: 175 },
    { label: 'Insurers', count: 55 },
    { label: 'Pension Funds', count: 1246 },
    { label: 'Microfinance Banks', count: 14 },
    { label: 'Listed Companies', count: 62 },
    { label: 'DFIs', count: 8 },
  ]

  const institutionData: Record<InstitutionCategory, any> = {
    'Commercial Banks': {
      columns: [
        { key: 'name', label: 'Institution', align: 'left' as const },
        { key: 'tier', label: 'Tier', align: 'left' as const },
        { key: 'assets', label: 'Assets (KES bn)', align: 'right' as const },
      ],
      rows: [
        { name: 'KCB Bank Kenya', tier: 'Tier 1', assets: '1,248' },
        { name: 'Equity Bank Kenya', tier: 'Tier 1', assets: '1,156' },
        { name: 'Co-operative Bank of Kenya', tier: 'Tier 1', assets: '823' },
        { name: 'NCBA Bank Kenya', tier: 'Tier 1', assets: '612' },
        { name: 'Absa Bank Kenya', tier: 'Tier 1', assets: '589' },
        { name: 'Standard Chartered Bank Kenya', tier: 'Tier 1', assets: '487' },
        { name: 'Stanbic Bank Kenya', tier: 'Tier 1', assets: '421' },
        { name: 'I&M Bank', tier: 'Tier 1', assets: '389' },
        { name: 'Diamond Trust Bank Kenya', tier: 'Tier 1', assets: '367' },
        { name: 'Citibank N.A. Kenya', tier: 'Tier 1', assets: '156' },
        { name: 'Bank of Africa Kenya', tier: 'Tier 2', assets: '134' },
        { name: 'Housing Finance Company of Kenya', tier: 'Tier 2', assets: '98' },
        { name: 'Prime Bank', tier: 'Tier 2', assets: '87' },
        { name: 'Sidian Bank', tier: 'Tier 2', assets: '76' },
        { name: 'Family Bank', tier: 'Tier 2', assets: '72' },
        { name: 'Gulf African Bank', tier: 'Tier 3', assets: '18' },
        { name: 'Consolidated Bank of Kenya', tier: 'Tier 3', assets: '16' },
        { name: 'Credit Bank', tier: 'Tier 3', assets: '14' },
        { name: 'Trans-National Bank', tier: 'Tier 3', assets: '12' },
        { name: 'Mayfair Bank', tier: 'Tier 3', assets: '8' },
      ],
    },
    'SACCOs': {
      columns: [
        { key: 'category', label: 'SACCO Category', align: 'left' as const },
        { key: 'count', label: 'Count', align: 'right' as const },
        { key: 'members', label: 'Total Members', align: 'right' as const },
      ],
      rows: [
        { category: 'Deposit-taking SACCOs (SASRA-regulated)', count: '175', members: '4.2M' },
        { category: 'Non-deposit SACCOs', count: '8,000+', members: '12M+' },
        { category: 'Total registered SACCOs', count: '8,175+', members: '16M+' },
      ],
    },
    'Insurers': {
      columns: [
        { key: 'name', label: 'Institution', align: 'left' as const },
        { key: 'type', label: 'Type', align: 'left' as const },
        { key: 'premiums', label: 'GWP (KES bn)', align: 'right' as const },
      ],
      rows: [
        { name: 'Jubilee Insurance', type: 'Composite', premiums: '32.4' },
        { name: 'APA Insurance', type: 'Composite', premiums: '18.7' },
        { name: 'Britam Insurance', type: 'Composite', premiums: '16.2' },
        { name: 'CIC General Insurance', type: 'Non-life', premiums: '12.8' },
        { name: 'UAP Insurance', type: 'Composite', premiums: '11.5' },
        { name: 'ICEA LION General', type: 'Non-life', premiums: '9.3' },
        { name: 'GA Insurance', type: 'Non-life', premiums: '8.1' },
        { name: 'Madison Insurance', type: 'Composite', premiums: '6.4' },
        { name: 'Directline Assurance', type: 'Non-life', premiums: '5.2' },
        { name: 'Kenindia Assurance', type: 'Composite', premiums: '4.8' },
      ],
    },
    'Pension Funds': {
      columns: [
        { key: 'category', label: 'Fund Category', align: 'left' as const },
        { key: 'count', label: 'Number of Funds', align: 'right' as const },
        { key: 'aum', label: 'AUM (KES bn)', align: 'right' as const },
      ],
      rows: [
        { category: 'Occupational pension schemes', count: '1,246', aum: '1,742' },
        { category: 'Individual retirement schemes', count: '18', aum: '87' },
        { category: 'Umbrella schemes', count: '8', aum: '124' },
        { category: 'Total registered schemes', count: '1,272', aum: '1,953' },
      ],
    },
    'Microfinance Banks': {
      columns: [
        { key: 'name', label: 'Institution', align: 'left' as const },
        { key: 'tier', label: 'Tier', align: 'left' as const },
        { key: 'branches', label: 'Branches', align: 'right' as const },
      ],
      rows: [
        { name: 'Kenya Women Microfinance Bank', tier: 'Tier 1 MFB', branches: '42' },
        { name: 'Faulu Microfinance Bank', tier: 'Tier 1 MFB', branches: '38' },
        { name: 'SMEP Microfinance Bank', tier: 'Tier 1 MFB', branches: '34' },
        { name: 'Rafiki Microfinance Bank', tier: 'Tier 1 MFB', branches: '28' },
        { name: 'U&I Microfinance Bank', tier: 'Tier 1 MFB', branches: '22' },
        { name: 'Sumac Microfinance Bank', tier: 'Tier 2 MFB', branches: '18' },
        { name: 'Century Microfinance Bank', tier: 'Tier 2 MFB', branches: '15' },
        { name: 'Caritas Microfinance Bank', tier: 'Tier 2 MFB', branches: '12' },
        { name: 'Daraja Microfinance Bank', tier: 'Tier 2 MFB', branches: '9' },
        { name: 'Muungano Microfinance Bank', tier: 'Tier 2 MFB', branches: '7' },
      ],
    },
    'Listed Companies': {
      columns: [
        { key: 'name', label: 'Company', align: 'left' as const },
        { key: 'sector', label: 'Sector', align: 'left' as const },
        { key: 'market_cap', label: 'Market Cap (KES bn)', align: 'right' as const },
      ],
      rows: [
        { name: 'Safaricom PLC', sector: 'Telecommunications', market_cap: '842' },
        { name: 'East African Breweries', sector: 'Manufacturing', market_cap: '198' },
        { name: 'Equity Group Holdings', sector: 'Banking', market_cap: '187' },
        { name: 'KCB Group', sector: 'Banking', market_cap: '164' },
        { name: 'Co-operative Bank', sector: 'Banking', market_cap: '89' },
        { name: 'BAT Kenya', sector: 'Manufacturing', market_cap: '76' },
        { name: 'Bamburi Cement', sector: 'Construction & Allied', market_cap: '54' },
        { name: 'Stanbic Holdings', sector: 'Banking', market_cap: '48' },
        { name: 'NCBA Group', sector: 'Banking', market_cap: '42' },
        { name: 'Kenya Power & Lighting', sector: 'Energy & Utilities', market_cap: '38' },
      ],
    },
    'DFIs': {
      columns: [
        { key: 'name', label: 'Institution', align: 'left' as const },
        { key: 'mandate', label: 'Mandate', align: 'left' as const },
      ],
      rows: [
        { name: 'Industrial & Commercial Development Corporation (ICDC)', mandate: 'Industrial financing and venture capital' },
        { name: 'Agricultural Finance Corporation (AFC)', mandate: 'Agricultural credit and rural development' },
        { name: 'Kenya Industrial Estates (KIE)', mandate: 'SME industrial development' },
        { name: 'Tourism Finance Corporation (TFC)', mandate: 'Tourism sector financing' },
        { name: 'National Housing Corporation (NHC)', mandate: 'Affordable housing development' },
        { name: 'Kenya Development Bank (KDB)', mandate: 'Infrastructure and development finance' },
        { name: 'Uwezo Fund', mandate: 'Youth and women enterprise funding' },
        { name: 'Youth Enterprise Development Fund (YEDF)', mandate: 'Youth entrepreneurship support' },
      ],
    },
  }

  const activeData = institutionData[activeTab]

  return (
    <Section variant="cream">
      <SectionHeader 
        title="Institution coverage"
        description="Comprehensive roster of CBK-regulated institutions and climate disclosure obligors"
      />
      
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.label
                ? 'bg-forest-700 text-white'
                : 'bg-white text-ink-700 border border-ink-200 hover:border-forest-400'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <DataTable 
        columns={activeData.columns} 
        rows={activeData.rows} 
        zebra 
      />
    </Section>
  )
}

export default InstitutionCoverage
