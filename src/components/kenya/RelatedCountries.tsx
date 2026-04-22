import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

const RelatedCountries: React.FC = () => {
  const countries = [
    { name: 'Nigeria', status: 'Coming soon' },
    { name: 'South Africa', status: 'Coming soon' },
    { name: 'Ghana', status: 'Coming soon' },
  ]

  return (
    <Section variant="cream">
      <SectionHeader 
        title="Other African markets"
        description="Climate risk coverage expanding across Sub-Saharan Africa"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country) => (
          <Card key={country.name} variant="muted" className="opacity-60">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-ink-950">
                {country.name}
              </h3>
              <Badge variant="neutral">{country.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default RelatedCountries
