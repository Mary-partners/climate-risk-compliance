import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon, { IconName } from '@/components/home/icons'

const drivers: { icon: IconName; label: string; detail: string }[] = [
  {
    icon: 'bank',
    label: 'Central Bank of Kenya',
    detail:
      'Climate risk expectations for banks, SACCOs, microfinance banks, and other regulated institutions.',
  },
  {
    icon: 'scale',
    label: 'IFRS S1 & S2',
    detail:
      'Global standards for sustainability and climate-related financial disclosure now being adopted in Kenya.',
  },
  {
    icon: 'building',
    label: 'Nairobi Securities Exchange',
    detail: 'ESG disclosure guidance that listed companies are increasingly expected to follow.',
  },
  {
    icon: 'trending',
    label: 'Lenders, investors, and buyers',
    detail:
      'Climate and ESG due diligence is quickly becoming a standard part of financing and procurement.',
  },
]

const frameworks = [
  'CBK Climate Risk Guidance',
  'IFRS S1 & S2',
  'TCFD',
  'NSE ESG Disclosure',
  'Kenya Green Finance Taxonomy',
  'PCAF',
]

const RegulatoryDrivers: React.FC = () => {
  return (
    <Section variant="default">
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              Why this matters now
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
              The requirements are already taking shape
            </h2>
          </div>
          <p className="lg:col-span-5 text-ink-600 leading-relaxed">
            Climate and ESG expectations are arriving from several directions at once. Understanding
            which ones apply to your institution is the first step towards a practical response.
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {drivers.map((driver, i) => (
          <Reveal key={driver.label} delay={i * 80}>
            <div className="group h-full rounded-xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-navy-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                <Icon name={driver.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900 mb-2">{driver.label}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{driver.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm text-ink-500 mr-1">Aligned to:</span>
        {frameworks.map((f) => (
          <span
            key={f}
            className="inline-flex items-center rounded-full border border-ink-200 bg-cream-50 px-3 py-1 text-xs font-medium text-navy-800"
          >
            {f}
          </span>
        ))}
      </div>
    </Section>
  )
}

export default RegulatoryDrivers
