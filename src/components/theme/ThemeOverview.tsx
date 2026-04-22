import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

interface OverviewItem {
  title: string
  description: string
  href?: string
}

interface ThemeOverviewProps {
  items: OverviewItem[]
}

const ThemeOverview: React.FC<ThemeOverviewProps> = ({ items }) => {
  return (
    <Section variant="cream">
      <SectionHeader 
        title="What's covered"
        description="Everything you need to manage this theme"
      />
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Card 
            key={item.title} 
            variant="default"
            as={item.href ? Link : 'div'}
            {...(item.href && { href: item.href })}
          >
            <h3 className="text-xl font-bold font-serif text-ink-950 mb-3">
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

export default ThemeOverview
