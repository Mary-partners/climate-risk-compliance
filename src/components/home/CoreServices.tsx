import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon, { IconName } from '@/components/home/icons'

const services: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'clipboard',
    title: 'Climate Risk Readiness Diagnostic',
    body: 'A clear, structured view of where your institution stands across governance, data, reporting, policies, risk management, board oversight, and regulatory exposure — with a readiness score, priority gaps, and recommended next steps.',
  },
  {
    icon: 'scale',
    title: 'IFRS S1 and S2 Readiness Assessment',
    body: 'We help you assess readiness for sustainability and climate-related financial disclosure, identify data gaps, map material risks, review governance, and develop a phased implementation plan you can actually follow.',
  },
  {
    icon: 'bank',
    title: 'CBK Climate Risk Implementation Support',
    body: 'We translate climate risk expectations into practical internal frameworks — climate risk policies, board governance structures, portfolio exposure mapping, sector risk tools, management reporting templates, and implementation roadmaps.',
  },
  {
    icon: 'document',
    title: 'ESG and Sustainability Reporting',
    body: 'We identify material issues, gather the underlying data, validate the evidence, structure the disclosures, and present credible reports that are genuinely useful to boards, investors, regulators, and lenders.',
  },
  {
    icon: 'database',
    title: 'ESG Data and Evidence Systems',
    body: 'We design simple ESG data systems, responsibility matrices, reporting calendars, evidence folders, and internal controls so that ESG reporting becomes a repeatable routine rather than a rushed annual effort.',
  },
  {
    icon: 'users',
    title: 'Board and Management Reporting Packs',
    body: 'We design board-ready climate and ESG reporting packs covering exposure, compliance status, key risks, progress, data gaps, and the decisions required — built for board committees, audit and risk committees, and executive teams.',
  },
  {
    icon: 'target',
    title: 'SME ESG and Climate Readiness Scoring',
    body: 'We provide practical ESG and climate readiness scoring for small and medium enterprises, borrowers, suppliers, and investees, helping banks, investors, and corporates assess where businesses stand and what support they need.',
  },
]

const CoreServices: React.FC = () => {
  return (
    <Section variant="default">
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              Core services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
              Designed to move you from awareness to implementation
            </h2>
          </div>
          <p className="lg:col-span-5 text-ink-600 leading-relaxed">
            Each engagement is built to produce something your institution can use — a diagnosis, a
            plan, a system, a report, or the evidence behind it.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={(i % 3) * 70} className="h-full">
            <div className="group h-full rounded-xl border border-ink-200 bg-cream-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-navy-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                <Icon name={service.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-serif text-navy-900 mb-2">{service.title}</h3>
              <p className="text-sm text-ink-700 leading-relaxed">{service.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default CoreServices
