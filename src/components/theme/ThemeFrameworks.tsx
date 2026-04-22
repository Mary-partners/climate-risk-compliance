import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'

interface ThemeFrameworksProps {
  frameworks: string[]
}

const ThemeFrameworks: React.FC<ThemeFrameworksProps> = ({ frameworks }) => {
  return (
    <Section variant="default">
      <SectionHeader 
        title="Supported frameworks"
        description="We handle compliance across all major regulatory standards"
      />
      <div className="flex flex-wrap justify-center gap-3">
        {frameworks.map((framework) => (
          <Badge key={framework} variant="neutral">
            {framework}
          </Badge>
        ))}
      </div>
    </Section>
  )
}

export default ThemeFrameworks
