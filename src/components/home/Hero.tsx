import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #305d99 0, transparent 45%), radial-gradient(circle at 85% 15%, #c28f22 0, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-200 mb-6">
            Climate Risk &amp; ESG Readiness Platform
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight text-balance mb-8">
            Climate risk, ESG compliance, and sustainability reporting for institutions
            preparing for Kenya&rsquo;s next regulatory shift
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-6 max-w-3xl">
            Climate risk and ESG reporting are quickly moving from voluntary corporate
            responsibility into mainstream regulation, lending, investment, governance, and board
            accountability. We help banks, SACCOs, insurers, listed companies, small and medium
            enterprises, investors, and leadership teams understand what is required, assess where
            they currently stand, and build practical reporting and compliance systems that can
            stand up to regulator, board, lender, and investor scrutiny.
          </p>
          <p className="text-base md:text-lg text-white/75 leading-relaxed mb-10 max-w-3xl">
            Our work supports institutions preparing for Central Bank of Kenya climate risk
            expectations, IFRS S1 and S2 sustainability disclosures, Nairobi Securities Exchange
            ESG guidance, investor due diligence, lender requirements, supplier assessments, and
            the emerging sustainability reporting obligations taking shape across Kenya and the
            wider African market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic">
              <Button variant="primary" size="lg" className="bg-gold-500 hover:bg-gold-600 text-navy-950 w-full sm:w-auto">
                Start Your Climate Readiness Diagnostic
              </Button>
            </Link>
            <a href="mailto:stephen.mutimba@eclimateadvisory.com?subject=Strategy%20Call%20Request%20%E2%80%94%20Climate%20%26%20ESG%20Readiness">
              <Button variant="secondary" size="lg" className="bg-transparent border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                Book a Strategy Call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
