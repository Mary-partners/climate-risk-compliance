import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

const PlatformPillars: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Diagnose',
      description: '6-pillar readiness assessment covering governance, strategy, risk management, metrics & targets, scenario analysis, and transition planning. 15 minutes to baseline your current state against IFRS S1/S2, TCFD, and CBK CRDF.',
    },
    {
      number: '02',
      title: 'Report',
      description: 'Multi-framework report builder that maps your inputs to IFRS S1/S2, TCFD, CBK CRDF, EU CSRD, and emerging jurisdictions. Built-in validation, cross-references, and export to regulatory formats.',
    },
    {
      number: '03',
      title: 'Integrate',
      description: 'Plug into PACTA (portfolio alignment), CLIMADA (physical risk), OS-Climate (open data), and WRI Aqueduct (water stress). Bring your own data or use platform defaults to accelerate scenario analysis.',
    },
  ]

  return (
    <Section variant="default" id="platform">
      <SectionHeader
        eyebrow="How it works"
        title="From diagnosis to filing"
        description="Three pillars that take you from readiness assessment to regulatory submission."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <Card key={pillar.number} variant="outlined">
            <div className="text-4xl font-serif font-bold text-forest-700 mb-4">
              {pillar.number}
            </div>
            <h3 className="text-xl font-bold text-ink-950 mb-3">
              {pillar.title}
            </h3>
            <p className="text-ink-700 leading-relaxed">
              {pillar.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default PlatformPillars
