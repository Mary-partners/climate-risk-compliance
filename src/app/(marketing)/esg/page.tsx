import React from 'react'
import ThemeHero from '@/components/theme/ThemeHero'
import ThemeOverview from '@/components/theme/ThemeOverview'
import ThemeFrameworks from '@/components/theme/ThemeFrameworks'
import ThemeGeographyList from '@/components/theme/ThemeGeographyList'
import ThemeCTA from '@/components/theme/ThemeCTA'

export default function ESGPage() {
  const overviewItems = [
    {
      title: 'Materiality assessment',
      description: 'Identify and prioritize ESG topics that matter most to your stakeholders and business operations.',
    },
    {
      title: 'Metrics & KPIs',
      description: 'Track and report on key performance indicators aligned with global reporting frameworks.',
    },
    {
      title: 'Assurance readiness',
      description: 'Prepare your ESG data and processes for third-party verification and audit.',
    },
    {
      title: 'Disclosure publishing',
      description: 'Generate compliant reports formatted for IFRS, GRI, SASB, and other standards.',
    },
  ]

  const frameworks = [
    'GRI',
    'SASB',
    'IFRS S1',
    'ESRS',
  ]

  const countries = [
    { name: 'Kenya', status: 'coming-soon' as const },
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
        eyebrow="ESG reporting"
        title="Report with confidence across every framework that matters."
        lead="Comprehensive ESG reporting platform that helps compliance teams navigate materiality assessment, metrics tracking, assurance, and disclosure across GRI, SASB, IFRS S1, and ESRS."
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
      />
      <ThemeOverview items={overviewItems} />
      <ThemeFrameworks frameworks={frameworks} />
      <ThemeGeographyList countries={countries} />
      <ThemeCTA
        title="Ready to streamline your ESG reporting?"
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
        secondaryCta={{ href: '/auth', label: 'Sign in' }}
      />
    </main>
  )
}
