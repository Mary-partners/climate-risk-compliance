import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CFOIP | Climate Risk & Compliance Platform for Kenya\'s Financial Sector',
  description: 'Helping Kenya\'s financial institutions collect, analyse, and report climate risk data. IFRS S1/S2, CBK CRDF, KGFT, PCAF compliance.',
  keywords: ['climate risk', 'compliance', 'Kenya', 'IFRS S1', 'IFRS S2', 'CBK CRDF', 'KGFT', 'PCAF', 'ESG', 'financial sector'],
  openGraph: {
    title: 'CFOIP | Climate Risk & Compliance Platform',
    description: 'Climate risk data infrastructure for Kenya\'s 1,500+ financial institutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
