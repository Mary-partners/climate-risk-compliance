import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import LogosRow from '@/components/home/LogosRow'
import ProblemStatement from '@/components/home/ProblemStatement'
import ThemeTeasers from '@/components/home/ThemeTeasers'
import CTABand from '@/components/home/CTABand'

export const metadata: Metadata = {
  title: 'Climate Risk Platform — ESG, TCFD, IFRS Reporting & Compliance',
  description: 'Comprehensive climate risk and ESG reporting platform for financial institutions. Navigate TCFD, IFRS S1/S2, CSRD, and regional requirements with confidence.',
  openGraph: {
    title: 'Climate Risk Platform — ESG, TCFD, IFRS Reporting & Compliance',
    description: 'Comprehensive climate risk and ESG reporting platform for financial institutions. Navigate TCFD, IFRS S1/S2, CSRD, and regional requirements with confidence.',
    type: 'website',
    url: 'https://climate-risk-compliance.com',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate Risk Platform — ESG, TCFD, IFRS Reporting & Compliance',
    description: 'Comprehensive climate risk and ESG reporting platform for financial institutions. Navigate TCFD, IFRS S1/S2, CSRD, and regional requirements with confidence.',
    images: ['/og-image.png'],
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <LogosRow />
      <ProblemStatement />
      <ThemeTeasers />
      <CTABand />
    </main>
  )
}
