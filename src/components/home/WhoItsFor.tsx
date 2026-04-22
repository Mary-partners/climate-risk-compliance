import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

const WhoItsFor: React.FC = () => {
  const institutions = [
    {
      number: '01',
      name: 'Commercial Banks',
      description: 'Regulatory climate risk disclosure, portfolio alignment, transition planning',
    },
    {
      number: '02',
      name: 'SACCOs / Cooperatives',
      description: 'Member-owned financial institutions navigating emerging climate mandates',
    },
    {
      number: '03',
      name: 'Insurers',
      description: 'Physical risk underwriting, climate scenario analysis, regulatory reporting',
    },
    {
      number: '04',
      name: 'Pension Funds',
      description: 'Long-term asset owners managing climate risk in portfolios',
    },
    {
      number: '05',
      name: 'Microfinance Banks',
      description: 'Financial inclusion institutions addressing climate adaptation finance',
    },
    {
      number: '06',
      name: 'Listed Corporates',
      description: 'Public companies preparing for IFRS S1/S2 and jurisdictional mandates',
    },
    {
      number: '07',
      name: 'DFIs & Climate Funds',
      description: 'Development finance and climate funds tracking impact and compliance',
    },
    {
      number: '08',
      name: 'Asset Managers',
      description: 'Investment managers measuring and reporting portfolio climate risk',
    },
  ]

  return (
    <Section variant="cream">
      <SectionHeader
        eyebrow="Who it serves"
        title="Built for institutions under disclosure mandates"
        description="From banks and insurers to asset managers and listed corporates—any organization navigating climate compliance."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {institutions.map((institution) => (
          <Card key={institution.number} variant="outlined">
            <div className="text-2xl font-serif font-bold text-forest-700 mb-3">
              {institution.number}
            </div>
            <h3 className="text-lg font-bold text-ink-950 mb-2">
              {institution.name}
            </h3>
            <p className="text-sm text-ink-700 leading-relaxed">
              {institution.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default WhoItsFor
