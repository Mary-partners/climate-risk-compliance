import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import StatusPill from '@/components/ui/StatusPill'

const FrameworksSupported: React.FC = () => {
  const frameworks = [
    {
      name: 'IFRS S1',
      description: 'General sustainability-related financial disclosures',
    },
    {
      name: 'IFRS S2',
      description: 'Climate-related disclosures (physical & transition risk)',
    },
    {
      name: 'TCFD',
      description: 'Task Force on Climate-related Financial Disclosures',
    },
    {
      name: 'EU CSRD',
      description: 'Corporate Sustainability Reporting Directive',
    },
    {
      name: 'CBK CRDF',
      description: 'Central Bank of Kenya Climate Risk Disclosure Framework',
    },
    {
      name: 'NGFS',
      description: 'Network for Greening the Financial System scenarios',
    },
    {
      name: 'PCAF',
      description: 'Partnership for Carbon Accounting Financials',
    },
    {
      name: 'KGFT',
      description: 'Kenya Green Finance Taxonomy',
    },
  ]

  return (
    <Section variant="default" id="frameworks">
      <SectionHeader
        eyebrow="Multi-framework support"
        title="Built for global compliance"
        description="One platform that maps your data to the frameworks regulators require."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.name} variant="default">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-ink-950">
                {framework.name}
              </h3>
              <StatusPill variant="compliant">Supported</StatusPill>
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">
              {framework.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default FrameworksSupported
