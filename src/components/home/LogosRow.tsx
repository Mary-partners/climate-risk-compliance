import React from 'react'
import Badge from '@/components/ui/Badge'

const LogosRow: React.FC = () => {
  const frameworks = [
    'IFRS S1/S2',
    'TCFD',
    'EU CSRD',
    'CBK CRDF',
    'PCAF',
    'KGFT',
  ]

  return (
    <section className="bg-cream-50 py-8 border-y border-ink-200">
      <div className="max-w-6xl mx-auto px-6">
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
