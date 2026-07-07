import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import DashboardMockup from '@/components/home/DashboardMockup'

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 18%, #305d99 0, transparent 42%), radial-gradient(circle at 92% 82%, #c28f22 0, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-screen-2xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: message */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-200 mb-6">
              Climate Risk &amp; ESG Readiness Platform
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.9rem] font-bold font-serif leading-[1.1] text-balance mb-6">
              Climate risk, ESG compliance, and sustainability reporting for institutions preparing
              for Kenya&rsquo;s next regulatory shift
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
              We help banks, SACCOs, insurers, listed companies, small and medium enterprises,
              investors, and leadership teams understand what is required, assess where they
              currently stand, and build practical reporting and compliance systems that can stand up
              to regulator, board, lender, and investor scrutiny.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic">
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-gold-500 hover:!bg-gold-600 !text-navy-950 w-full sm:w-auto shadow-lg shadow-gold-500/20 hover:-translate-y-0.5 transition-transform"
                >
                  Start Your Climate Readiness Diagnostic
                </Button>
              </Link>
              <a href="mailto:stephen.mutimba@eclimateadvisory.com?subject=Strategy%20Call%20Request%20%E2%80%94%20Climate%20%26%20ESG%20Readiness">
                <Button
                  variant="secondary"
                  size="lg"
                  className="!bg-transparent !text-white !border-white/50 hover:!bg-white/10 w-full sm:w-auto transition-colors"
                >
                  Book a Strategy Call
                </Button>
              </a>
            </div>
          </div>

          {/* Right: product mockup */}
          <div className="lg:pl-4">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
