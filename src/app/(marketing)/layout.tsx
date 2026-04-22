import React from 'react'
import SiteNav from '@/components/layout/SiteNav'
import Footer from '@/components/home/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteNav />
      {children}
      <Footer />
    </>
  )
}
