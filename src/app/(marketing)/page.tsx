import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import LogosRow from '@/components/home/LogosRow'
import ProblemStatement from '@/components/home/ProblemStatement'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeServe from '@/components/home/WhoWeServe'
import CoreServices from '@/components/home/CoreServices'
import DiagnosticSection from '@/components/home/DiagnosticSection'
import WhyUs from '@/components/home/WhyUs'
import CTABand from '@/components/home/CTABand'

export const metadata: Metadata = {
  title: 'Climate & Energy Advisory (C&E) — Climate Risk & ESG Readiness',
  description:
    'Climate & Energy Advisory helps banks, SACCOs, insurers, listed companies, SMEs, boards, and investors in Kenya assess their climate risk and ESG readiness and build practical reporting and compliance systems aligned to CBK guidance, IFRS S1/S2, TCFD, and the Kenya Green Finance Taxonomy.',
  openGraph: {
    title: 'Climate & Energy Advisory (C&E) — Climate Risk & ESG Readiness',
    description:
      'Practical climate risk and ESG readiness for institutions preparing for Kenya’s next regulatory shift.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate & Energy Advisory (C&E) — Climate Risk & ESG Readiness',
    description:
      'Practical climate risk and ESG readiness for institutions preparing for Kenya’s next regulatory shift.',
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <LogosRow />
      <ProblemStatement />
      <WhatWeDo />
      <WhoWeServe />
      <CoreServices />
      <DiagnosticSection />
      <WhyUs />
      <CTABand />
    </main>
  )
}
