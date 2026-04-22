import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Climate Risk & Compliance Platform — IFRS S1/S2, TCFD, ESG Reporting',
  description: 'The climate risk, compliance, and ESG reporting platform for institutions navigating IFRS S1/S2, TCFD, CBK CRDF, and emerging disclosure regulation.',
  keywords: ['climate risk', 'ESG reporting', 'IFRS S1', 'IFRS S2', 'TCFD', 'CSRD', 'climate disclosure', 'compliance'],
  openGraph: {
    title: 'Climate Risk & Compliance Platform — IFRS S1/S2, TCFD, ESG Reporting',
    description: 'The climate risk, compliance, and ESG reporting platform for institutions navigating IFRS S1/S2, TCFD, CBK CRDF, and emerging disclosure regulation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
