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
  title: 'Climate & Energy Advisory (C&E) — Climate Risk & Compliance Platform | CBK CRDF, IFRS S1/S2, TCFD',
  description: 'Climate & Energy Advisory (C&E) helps Kenyan banks, SACCOs, MFBs and insurers meet the CBK Climate Risk Disclosure Framework, IFRS S1/S2, TCFD and the Kenya Green Finance Taxonomy — diagnostic, reporting and climate data on one platform.',
  keywords: ['Climate & Energy Advisory', 'climate risk', 'ESG reporting', 'CBK CRDF', 'Kenya Green Finance Taxonomy', 'IFRS S1', 'IFRS S2', 'TCFD', 'PCAF', 'climate disclosure', 'compliance'],
  openGraph: {
    title: 'Climate & Energy Advisory (C&E) — Climate Risk & Compliance Platform',
    description: 'CBK CRDF, IFRS S1/S2, TCFD and Kenya Green Finance Taxonomy compliance for financial institutions — by Climate & Energy Advisory.',
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
