import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

const ThemeTeasers: React.FC = () => {
  const themes = [
    {
      title: 'ESG',
      description: 'Report with confidence across every framework that matters.',
      href: '/esg',
    },
    {
      title: 'Climate Risk',
      description: 'Quantify physical and transition risk across your portfolio.',
      href: '/climate-risk',
    },
    {
      title: 'Compliance',
      description: 'From regulation to filing in one audited workflow.',
      href: '/compliance',
    },
    {
      title: 'Board & Governance',
      description: 'Climate-aware oversight, without the steep learning curve.',
      href: '/governance',
    },
  ]

  return (
    <Section variant="cream">
      <SectionHeader 
        eyebrow="Platform themes"
        title="Everything you need, organized by how you work"
        description="Navigate by the way compliance and ESG professionals actually think about their work"
      />
      <div className="grid md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <Card key={theme.title} as={Link} href={theme.href} variant="default">
            <h3 className="text-2xl font-bold font-serif text-ink-950 mb-3">
              {theme.title}
            </h3>
            <p className="text-ink-700 leading-relaxed mb-4">
              {theme.description}
            </p>
            <div className="flex items-center text-forest-700 font-semibold text-sm">
              Learn more
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default ThemeTeasers
