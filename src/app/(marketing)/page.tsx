import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import StatsBand from '@/components/home/StatsBand'
import LogosRow from '@/components/home/LogosRow'
import ProblemStatement from '@/components/home/ProblemStatement'
import AboutCE from '@/components/home/AboutCE'
import ClientsBand from '@/components/home/ClientsBand'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeServe from '@/components/home/WhoWeServe'
import CoreServices from '@/components/home/CoreServices'
import DiagnosticSection from '@/components/home/DiagnosticSection'
import WhyUs from '@/components/home/WhyUs'
import CTABand from '@/components/home/CTABand'

export const metadata: Metadata = {
  title: 'Climate & Energy Advisory (C&E) — Climate Risk & ESG Readiness',
  description:
    'Climate & Energy Advisory (C&E) is a leading Kenyan consultancy with more than 27 years of experience in climate, clean energy, and sustainability across Africa. We help banks, SACCOs, insurers, listed companies, SMEs, boards, and investors assess their climate and ESG readiness and build practical reporting and compliance systems aligned to CBK guidance, IFRS S1/S2, TCFD, and the Kenya Green Finance Taxonomy.',
  openGraph: {
    title: 'Climate & Energy Advisory (C&E) — Climate Risk & ESG Readiness',
    description:
      'A leading Kenyan climate, energy, and sustainability consultancy helping institutions prepare for Kenya’s next regulatory shift.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate & Energy Advisory (C&E) — Climate Risk & ESG Readiness',
    description:
      'A leading Kenyan climate, energy, and sustainability consultancy helping institutions prepare for Kenya’s next regulatory shift.',
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBand />
      <LogosRow />
      <ProblemStatement />
      <AboutCE />
      <ClientsBand />
      <WhatWeDo />
      <WhoWeServe />
      <CoreServices />
      <DiagnosticSection />
      <WhyUs />
      <CTABand />
    </main>
  )
}
