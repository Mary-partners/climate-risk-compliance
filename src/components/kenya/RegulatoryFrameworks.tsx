import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

const RegulatoryFrameworks: React.FC = () => {
  const frameworks = [
    {
      title: 'CBK Climate Risk Disclosure Framework (CRDF)',
      description: 'Mandatory climate risk assessment and disclosure requirements for all CBK-regulated institutions. Covers physical and transition risks, scenario analysis, and governance structures. First disclosures due October 2026.',
      scope: '1,500+ institutions',
    },
    {
      title: 'Kenya Green Finance Taxonomy (KGFT)',
      description: 'National taxonomy aligned with EU Taxonomy and ASEAN standards. Defines green, transition, and excluded economic activities. Supports climate finance mobilization and prevents greenwashing.',
      scope: 'All financial institutions',
    },
    {
      title: 'Kenya Sector Investment Codes (KeSIC)',
      description: 'Sector classification system aligned with ISIC and NACE frameworks. Used for portfolio segmentation and transition risk assessment across 21 economic sectors.',
      scope: 'Portfolio classification',
    },
    {
      title: 'IFRS S2 (Kenya adoption)',
      description: 'Kenya is an early adopter of IFRS S2 Climate-related Disclosures. Required for listed companies from January 2027. CBK CRDF aligns with S2 requirements for comparable reporting.',
      scope: 'Listed companies + banks',
    },
  ]

  return (
    <Section variant="cream">
      <SectionHeader 
        title="Regulatory frameworks"
        description="Kenya's comprehensive climate risk and finance regulatory architecture"
      />
      <div className="grid md:grid-cols-2 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.title} variant="default">
            <h3 className="text-lg font-semibold text-ink-950 mb-2">
              {framework.title}
            </h3>
            <p className="text-sm text-ink-700 mb-3 leading-relaxed">
              {framework.description}
            </p>
            <p className="text-xs font-medium text-forest-700">
              Scope: {framework.scope}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default RegulatoryFrameworks
