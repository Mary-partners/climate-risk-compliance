import React from 'react'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/kenya/Breadcrumbs'
import KenyaHero from '@/components/kenya/KenyaHero'
import RegulatoryFrameworks from '@/components/kenya/RegulatoryFrameworks'
import CBKTimeline from '@/components/kenya/CBKTimeline'
import InstitutionCoverage from '@/components/kenya/InstitutionCoverage'
import CountyHazardSnapshot from '@/components/kenya/CountyHazardSnapshot'
import RelatedCountries from '@/components/kenya/RelatedCountries'
import ThemeCTA from '@/components/theme/ThemeCTA'

export const metadata: Metadata = {
  title: 'Climate Risk Reporting in Kenya — CBK CRDF, KGFT',
  description: 'Navigate Kenya\'s Climate Risk Disclosure Framework (CRDF) and Kenya Green Finance Taxonomy (KGFT) with comprehensive climate risk reporting tools.',
  openGraph: {
    title: 'Climate Risk Reporting in Kenya — CBK CRDF, KGFT',
    description: 'Navigate Kenya\'s Climate Risk Disclosure Framework (CRDF) and Kenya Green Finance Taxonomy (KGFT) with comprehensive climate risk reporting tools.',
    type: 'website',
    url: 'https://climate-risk-compliance.com/climate-risk/kenya',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate Risk Reporting in Kenya — CBK CRDF, KGFT',
    description: 'Navigate Kenya\'s Climate Risk Disclosure Framework (CRDF) and Kenya Green Finance Taxonomy (KGFT) with comprehensive climate risk reporting tools.',
    images: ['/og-image.png'],
  },
}

export default function KenyaPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Climate Risk', href: '/climate-risk' },
    { label: 'Kenya' },
  ]

  return (
    <main>
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <KenyaHero />
      <RegulatoryFrameworks />
      <CBKTimeline />
      <InstitutionCoverage />
      <CountyHazardSnapshot />
      <RelatedCountries />
      <ThemeCTA
        title="Ready to assess your Kenyan portfolio?"
        primaryCta={{ href: '/diagnostic', label: 'Start diagnostic' }}
        secondaryCta={{ href: '/auth', label: 'Sign in' }}
      />
    </main>
  )
}
