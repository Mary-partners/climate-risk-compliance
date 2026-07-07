import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const shiftPoints = [
  {
    label: 'Central Bank of Kenya',
    detail:
      'Climate risk expectations for banks, SACCOs, microfinance banks, and other regulated institutions.',
  },
  {
    label: 'IFRS S1 & S2',
    detail:
      'Global standards for sustainability and climate-related financial disclosure now being adopted in Kenya.',
  },
  {
    label: 'Nairobi Securities Exchange',
    detail: 'ESG disclosure guidance that listed companies are expected to follow.',
  },
  {
    label: 'Lenders, investors, and buyers',
    detail:
      'Climate and ESG due diligence is quickly becoming a standard part of financing and procurement.',
  },
]

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 15%, #305d99 0, transparent 45%), radial-gradient(circle at 90% 85%, #c28f22 0, transparent 42%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: message */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-200 mb-6">
              Climate Risk &amp; ESG Readiness Platform
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold font-serif leading-[1.1] text-balance mb-6">
              Climate risk, ESG compliance, and sustainability reporting for institutions preparing
              for Kenya&rsquo;s next regulatory shift
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-4 max-w-2xl">
              Climate risk and ESG reporting are quickly moving from voluntary corporate
              responsibility into mainstream regulation, lending, investment, governance, and board
              accountability. We help banks, SACCOs, insurers, listed companies, small and medium
              enterprises, investors, and leadership teams understand what is required, assess where
              they currently stand, and build practical reporting and compliance systems that can
              stand up to regulator, board, lender, and investor scrutiny.
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-2xl">
              Our work supports institutions preparing for Central Bank of Kenya climate risk
              expectations, IFRS S1 and S2 sustainability disclosures, Nairobi Securities Exchange
              ESG guidance, investor due diligence, lender requirements, and the emerging
              sustainability reporting obligations taking shape across Kenya and the wider African
              market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic">
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-gold-500 hover:!bg-gold-600 !text-navy-950 w-full sm:w-auto"
                >
                  Start Your Climate Readiness Diagnostic
                </Button>
              </Link>
              <a href="mailto:stephen.mutimba@eclimateadvisory.com?subject=Strategy%20Call%20Request%20%E2%80%94%20Climate%20%26%20ESG%20Readiness">
                <Button
                  variant="secondary"
                  size="lg"
                  className="!bg-transparent !text-white !border-white/50 hover:!bg-white/10 w-full sm:w-auto"
                >
                  Book a Strategy Call
                </Button>
              </a>
            </div>
          </div>

          {/* Right: the regulatory shift, to fill and inform */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-7 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-gold-300 mb-2">
                Why this matters now
              </div>
              <h2 className="text-xl font-bold font-serif text-white mb-6 leading-snug">
                The requirements are already taking shape
              </h2>
              <ul className="space-y-5">
                {shiftPoints.map((point) => (
                  <li key={point.label} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gold-400"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{point.label}</p>
                      <p className="text-sm text-white/70 leading-relaxed">{point.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-5 border-t border-white/10 text-sm text-white/75 leading-relaxed">
                We help you understand which of these apply to your institution, assess where you
                stand today, and build a practical response before the pressure arrives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
