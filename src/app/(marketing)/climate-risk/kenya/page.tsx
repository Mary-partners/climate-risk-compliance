import React from 'react'
import Breadcrumbs from '@/components/kenya/Breadcrumbs'
import KenyaHero from '@/components/kenya/KenyaHero'
import RegulatoryFrameworks from '@/components/kenya/RegulatoryFrameworks'
import CBKTimeline from '@/components/kenya/CBKTimeline'
import InstitutionCoverage from '@/components/kenya/InstitutionCoverage'
import CountyHazardSnapshot from '@/components/kenya/CountyHazardSnapshot'
import RelatedCountries from '@/components/kenya/RelatedCountries'
import ThemeCTA from '@/components/theme/ThemeCTA'

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
