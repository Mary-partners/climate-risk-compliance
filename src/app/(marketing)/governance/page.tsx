import React from 'react'
import { Metadata } from 'next'
import ThemeHero from '@/components/theme/ThemeHero'
import ThemeOverview from '@/components/theme/ThemeOverview'
import ThemeFrameworks from '@/components/theme/ThemeFrameworks'
import ThemeGeographyList from '@/components/theme/ThemeGeographyList'
import ThemeCTA from '@/components/theme/ThemeCTA'

export const metadata: Metadata = {
  title: 'Board & Climate Governance — TCFD Oversight',
  description: 'Board governance platform supporting climate literacy development, oversight frameworks, risk committee tooling, and disclosure sign-off aligned with TCFD and IFRS S2.',
  openGraph: {
    title: 'Board & Climate Governance — TCFD Oversight',
    description: 'Board governance platform supporting climate literacy development, oversight frameworks, risk committee tooling, and disclosure sign-off aligned with TCFD and IFRS S2.',
    type: 'website',
    url: 'https://climate-risk-compliance.com/governance',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Board & Climate Governance — TCFD Oversight',
    description: 'Board governance platform supporting climate literacy development, oversight frameworks, risk committee tooling, and disclosure sign-off aligned with TCFD and IFRS S2.',
    images: ['/og-image.png'],
  },
}

export default function GovernancePage() {
  const overviewItems = [
    {
      title: 'Board climate literacy',
      description: 'Executive education and briefing materials to build board-level climate fluency.',
    },
    {
      title: 'Oversight frameworks',
      description: 'Structured governance processes for climate risk oversight and decision-making.',
    },
    {
      title: 'Risk committee tooling',
      description: 'Dashboards and reporting designed for board risk committees and executive teams.',
    },
    {
      title: 'Disclosure sign-off',
      description: 'Clear accountability workflows for board review and approval of climate disclosures.',
    },
  ]

  const frameworks = [
    'TCFD governance pillar',
    'IFRS S2 governance',
    'NACD guidance',
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
        eyebrow="Board & governance"
        title="Climate-aware oversight, without the steep learning curve."
        lead="Board governance platform that supports climate literacy development, oversight frameworks, risk committee tooling, and disclosure sign-off processes aligned with TCFD and IFRS S2 governance requirements."
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
      />
      <ThemeOverview items={overviewItems} />
      <ThemeFrameworks frameworks={frameworks} />
      <ThemeGeographyList countries={countries} />
      <ThemeCTA
        title="Ready to strengthen your climate governance?"
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
        secondaryCta={{ href: '/auth', label: 'Sign in' }}
      />
    </main>
  )
}
