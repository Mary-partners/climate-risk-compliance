import React from 'react'
import Badge from '@/components/ui/Badge'

const LogosRow: React.FC = () => {
  const frameworks = [
    'CBK Climate Risk Guidance',
    'IFRS S1 & S2',
    'TCFD',
    'NSE ESG Disclosure',
    'Kenya Green Finance Taxonomy',
    'PCAF',
  ]

  return (
    <section className="bg-cream-50 py-8 border-b border-ink-200">
      <div className="max-w-screen-2xl mx-auto px-6">
        <p className="text-center text-sm text-ink-600 mb-5">
          Our work is aligned to the frameworks that regulators, lenders, investors, and boards
          are beginning to expect across Kenya and the wider region.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {frameworks.map((framework) => (
            <Badge key={framework} variant="info">
              {framework}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogosRow
