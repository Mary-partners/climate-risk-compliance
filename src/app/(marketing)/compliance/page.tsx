import React from 'react'
import { Metadata } from 'next'
import ThemeHero from '@/components/theme/ThemeHero'
import ThemeOverview from '@/components/theme/ThemeOverview'
import ThemeFrameworks from '@/components/theme/ThemeFrameworks'
import ThemeGeographyList from '@/components/theme/ThemeGeographyList'
import ThemeCTA from '@/components/theme/ThemeCTA'

export const metadata: Metadata = {
  title: 'Compliance & Regulatory Reporting — CSRD, CBK, SEC',
  description: 'End-to-end compliance platform simplifying regulatory tracking, template management, audit trails, and filing automation for IFRS S1/S2, TCFD, CSRD, and regional requirements.',
  openGraph: {
    title: 'Compliance & Regulatory Reporting — CSRD, CBK, SEC',
    description: 'End-to-end compliance platform simplifying regulatory tracking, template management, audit trails, and filing automation for IFRS S1/S2, TCFD, CSRD, and regional requirements.',
    type: 'website',
    url: 'https://climate-risk-compliance.com/compliance',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compliance & Regulatory Reporting — CSRD, CBK, SEC',
    description: 'End-to-end compliance platform simplifying regulatory tracking, template management, audit trails, and filing automation for IFRS S1/S2, TCFD, CSRD, and regional requirements.',
    images: ['/og-image.png'],
  },
}

export default function CompliancePage() {
  const overviewItems = [
    {
      title: 'Regulatory horizon',
      description: 'Stay ahead of emerging climate disclosure requirements and implementation timelines.',
    },
    {
      title: 'Reporting templates',
      description: 'Pre-built templates for IFRS, TCFD, CSRD, and jurisdiction-specific filings.',
    },
    {
      title: 'Audit trail',
      description: 'Comprehensive documentation and version control for all compliance activities.',
    },
    {
      title: 'Filing automation',
      description: 'Streamlined workflows from data collection to regulatory submission.',
    },
  ]

  const frameworks = [
    'IFRS S1/S2',
    'TCFD',
    'CSRD',
    'CBK CRDF',
    'SEC climate rules',
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
        eyebrow="Regulatory compliance"
        title="From regulation to filing in one audited workflow."
        lead="End-to-end compliance platform that simplifies regulatory tracking, template management, audit trails, and filing automation for IFRS S1/S2, TCFD, CSRD, and regional requirements."
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
      />
      <ThemeOverview items={overviewItems} />
      <ThemeFrameworks frameworks={frameworks} />
      <ThemeGeographyList countries={countries} />
      <ThemeCTA
        title="Ready to simplify your compliance workflow?"
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
        secondaryCta={{ href: '/auth', label: 'Sign in' }}
      />
    </main>
  )
}
