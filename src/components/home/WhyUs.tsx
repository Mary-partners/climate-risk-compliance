import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

const WhyUs: React.FC = () => {
  const differentiators = [
    {
      title: 'Built for emerging markets, not retrofitted from EU tooling',
      description: 'Most climate disclosure platforms were built for European large-cap corporates and adapted downward. We started with the constraints of institutions in Kenya, Nigeria, and South Africa—limited budgets, lean compliance teams, fragmented data—and built a platform that works in that reality.',
    },
    {
      title: 'One platform from diagnostic to filing—not a consulting engagement',
      description: 'No six-month scoping, no waiting for external consultants to build your first report. You start with a 15-minute diagnostic, move to the report builder, and export directly to the formats regulators require. The platform is the capability.',
    },
    {
      title: 'Affordable enough to actually deploy—disclosure ≠ six-figure invoice',
      description: 'Climate disclosure should not cost more than your audit fee. We price for institutions that need to comply but cannot justify enterprise software budgets. If you have 50–500 employees and a compliance mandate, this platform is for you.',
    },
  ]

  return (
    <Section variant="default" id="resources">
      <SectionHeader
        eyebrow="Why this platform"
        title="Built for the institutions that have been priced out"
      />
      <div className="grid md:grid-cols-3 gap-6">
        {differentiators.map((item, index) => (
          <Card key={index} variant="muted">
            <h3 className="text-xl font-bold text-ink-950 mb-4 leading-snug">
              {item.title}
            </h3>
            <p className="text-ink-700 leading-relaxed">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default WhyUs
