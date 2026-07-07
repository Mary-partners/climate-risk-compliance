import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'

const services = [
  {
    title: 'Climate Risk Readiness Diagnostic',
    body: 'The Climate Risk Readiness Diagnostic gives your institution a clear understanding of where it stands today. We review governance, data, reporting, policies, risk management, board oversight, regulatory exposure, and operational readiness. The output is a practical report showing your readiness score, your major gaps, your priority risks, and the recommended next steps. This is ideal for institutions that know climate and ESG reporting is becoming important but need a structured starting point before committing to a full implementation process.',
  },
  {
    title: 'IFRS S1 and S2 Readiness Assessment',
    body: 'IFRS S1 and S2 introduce a more structured approach to sustainability and climate-related financial disclosure. For many organisations, the difficulty will not be reading the standards; it will be building the internal process needed to disclose credible, decision-useful information. We help organisations assess their readiness, identify data gaps, map material sustainability and climate-related risks, review governance structures, and develop a phased implementation plan they can actually follow.',
  },
  {
    title: 'CBK Climate Risk Implementation Support',
    body: 'For financial institutions, climate risk is increasingly connected to governance, strategy, risk management, credit assessment, portfolio monitoring, and reporting. We help banks and lenders translate climate risk expectations into practical internal frameworks. This includes climate risk policies, board governance structures, portfolio exposure mapping, sector risk tools, management reporting templates, borrower ESG assessment tools, and clear implementation roadmaps.',
  },
  {
    title: 'ESG and Sustainability Reporting',
    body: 'We support organisations to prepare ESG and sustainability reports that are credible, evidence-based, and aligned with stakeholder expectations. Our process goes well beyond writing the report. We help identify material issues, gather the underlying data, validate the evidence, structure the disclosures, and present the information in a way that is genuinely useful to boards, investors, regulators, lenders, and other stakeholders.',
  },
  {
    title: 'ESG Data and Evidence Systems',
    body: 'Many organisations struggle with ESG reporting because the necessary information sits across finance, human resources, operations, procurement, legal, risk, facilities, and programme teams. We help organisations design simple ESG data systems, responsibility matrices, reporting calendars, evidence folders, and internal controls so that ESG reporting becomes a repeatable routine rather than a rushed annual effort.',
  },
  {
    title: 'Board and Management Reporting Packs',
    body: 'We design board-ready climate and ESG reporting packs that help leadership teams understand exposure, compliance status, key risks, progress, data gaps, and the decisions that are required of them. These packs are especially useful for board committees, audit and risk committees, executive teams, and institutions that are preparing for regulatory or investor scrutiny.',
  },
  {
    title: 'SME ESG and Climate Readiness Scoring',
    body: 'We provide practical ESG and climate readiness scoring for small and medium enterprises, borrowers, suppliers, investees, and portfolio companies. This helps banks, investors, accelerators, and corporates assess where businesses currently stand and understand what support they need in order to become more resilient, more fundable, and more compliant.',
  },
]

const CoreServices: React.FC = () => {
  return (
    <Section variant="default">
      <SectionHeader
        eyebrow="Core services"
        title="Our services are designed to move you from awareness to implementation"
        description="Each engagement is built to produce something your institution can use — a diagnosis, a plan, a system, a report, or the evidence behind it."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="bg-cream-50 border border-ink-200 rounded-lg p-7 flex flex-col"
          >
            <div className="text-sm font-bold text-gold-600 mb-3">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-900 mb-3">{service.title}</h3>
            <p className="text-sm text-ink-700 leading-relaxed">{service.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default CoreServices
