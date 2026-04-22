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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest-700 focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to content
      </a>
      <SiteNav />
      <div id="main-content">
        {children}
      </div>
      <Footer />
    </>
  )
}
