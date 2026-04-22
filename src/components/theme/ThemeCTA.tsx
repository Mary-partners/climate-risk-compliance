import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

interface CTAButton {
  href: string
  label: string
}

interface ThemeCTAProps {
  title: string
  primaryCta: CTAButton
  secondaryCta?: CTAButton
}

const ThemeCTA: React.FC<ThemeCTAProps> = ({ title, primaryCta, secondaryCta }) => {
  return (
    <Section variant="forest">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-8 leading-tight">
          {title}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryCta.href}>
            <Button variant="primary" size="lg">
              {primaryCta.label}
            </Button>
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href}>
              <Button variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Section>
  )
}

export default ThemeCTA
