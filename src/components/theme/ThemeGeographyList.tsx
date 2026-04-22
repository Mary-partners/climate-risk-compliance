import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface Country {
  name: string
  status: 'active' | 'coming-soon'
  href?: string
}

interface ThemeGeographyListProps {
  countries: Country[]
}

const ThemeGeographyList: React.FC<ThemeGeographyListProps> = ({ countries }) => {
  return (
    <Section variant="cream">
      <SectionHeader 
        title="Geographic coverage"
        description="Regulatory guidance tailored to your jurisdiction"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country) => {
          const isActive = country.status === 'active'
          const CardComponent = isActive && country.href ? Link : 'div'
          
          return (
            <Card 
              key={country.name}
              variant={isActive ? 'default' : 'muted'}
              as={CardComponent}
              {...(isActive && country.href && { href: country.href })}
              className={!isActive ? 'opacity-60 cursor-not-allowed' : ''}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink-950">
                    {country.name}
                  </h3>
                  <Badge variant={isActive ? 'success' : 'neutral'}>
                    {isActive ? 'Active' : 'Coming soon'}
                  </Badge>
                </div>
                {country.name === 'Kenya' && isActive && (
                  <Badge variant="info" className="text-xs">
                    Most complete coverage
                  </Badge>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}

export default ThemeGeographyList
