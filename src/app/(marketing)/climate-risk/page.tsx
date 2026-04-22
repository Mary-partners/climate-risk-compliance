import React from 'react'
import ThemeHero from '@/components/theme/ThemeHero'
import ThemeOverview from '@/components/theme/ThemeOverview'
import ThemeFrameworks from '@/components/theme/ThemeFrameworks'
import ThemeGeographyList from '@/components/theme/ThemeGeographyList'
import ThemeCTA from '@/components/theme/ThemeCTA'

export default function ClimateRiskPage() {
  const overviewItems = [
    {
      title: 'Physical risk exposure',
      description: 'Assess vulnerability to acute and chronic climate hazards across your assets and operations.',
      href: '#physical-risk',
    },
    {
      title: 'Transition risk scenarios',
      description: 'Model policy, technology, and market shifts under different climate transition pathways.',
      href: '#transition-risk',
    },
    {
      title: 'Portfolio alignment',
      description: 'Measure portfolio warming potential and alignment with Paris Agreement targets.',
      href: '#portfolio',
    },
    {
      title: 'Stress testing',
      description: 'Conduct scenario analysis to understand financial impacts of climate-related risks.',
    },
  ]

  const frameworks = [
    'TCFD',
    'IFRS S2',
    'NGFS',
    'PCAF',
  ]

  const countries = [
    { name: 'Kenya', status: 'active' as const, href: '/climate-risk/kenya' },
    { name: 'Nigeria', status: 'coming-soon' as const },
    { name: 'South Africa', status: 'coming-soon' as const },
    { name: 'Ghana', status: 'coming-soon' as const },
    { name: 'EU', status: 'coming-soon' as const },
    { name: 'UK', status: 'coming-soon' as const },
    { name: 'USA', status: 'coming-soon' as const },
  ]

  return (
    <main>
      <ThemeHero
        eyebrow="Climate risk"
        title="Quantify physical and transition risk across your portfolio."
        lead="Advanced climate risk platform for assessing physical hazards, transition scenarios, portfolio alignment, and stress testing under TCFD, IFRS S2, and NGFS frameworks."
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
      />
      <ThemeOverview items={overviewItems} />
      <ThemeFrameworks frameworks={frameworks} />
      <ThemeGeographyList countries={countries} />
      <ThemeCTA
        title="Ready to quantify your climate risk exposure?"
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
        secondaryCta={{ href: '/auth', label: 'Sign in' }}
      />
    </main>
  )
}
