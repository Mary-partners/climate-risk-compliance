import React from 'react'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'

interface ThemeHeroProps {
  eyebrow: string
  title: string
  lead: string
  primaryCta: {
    href: string
    label: string
  }
}

const ThemeHero: React.FC<ThemeHeroProps> = ({ eyebrow, title, lead, primaryCta }) => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-ink-950 mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-ink-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {lead}
          </p>
          <Link href={primaryCta.href}>
            <Button variant="primary" size="lg">
              {primaryCta.label}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ThemeHero
