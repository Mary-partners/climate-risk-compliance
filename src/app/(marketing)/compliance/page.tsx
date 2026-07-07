import React from 'react'
import { Metadata } from 'next'
import PageHero from '@/components/inner/PageHero'
import InfoColumns from '@/components/inner/InfoColumns'
import FeatureGrid from '@/components/inner/FeatureGrid'
import PageCTA from '@/components/inner/PageCTA'

export const metadata: Metadata = {
  title: 'Compliance — CBK CRDF, IFRS S1/S2 & Disclosure Readiness | C&E',
  description:
    'C&E helps institutions prepare for CBK climate risk expectations, IFRS S1 and S2 disclosure, and NSE ESG guidance — with readiness assessments, reporting templates, evidence trails, and implementation roadmaps.',
}

export default function CompliancePage() {
  return (
    <main>
      <PageHero
        eyebrow="Compliance"
        title="Prepare for CBK, IFRS S1/S2, and disclosure requirements with confidence"
        lead="Climate and ESG disclosure requirements are taking shape across Kenya. We help institutions understand which obligations apply to them, assess their current readiness, and build the internal systems needed to disclose credible, decision-useful information on time."
        points={[
          { icon: 'bank', text: 'Central Bank of Kenya climate risk expectations' },
          { icon: 'scale', text: 'IFRS S1 and S2 sustainability disclosure standards' },
          { icon: 'building', text: 'Nairobi Securities Exchange ESG disclosure guidance' },
          { icon: 'clipboard', text: 'Readiness assessment, roadmap, and evidence trail' },
        ]}
      />

      <InfoColumns
        eyebrow="The regulatory horizon"
        title="The requirements are arriving from several directions at once"
        chips={['CBK Climate Risk Guidance', 'IFRS S1', 'IFRS S2', 'NSE ESG', 'Kenya Green Finance Taxonomy']}
        paragraphs={[
          'The Central Bank of Kenya has set out climate risk expectations for banks, and similar expectations are increasingly relevant across SACCOs, microfinance banks, and insurers. At the same time, IFRS S1 and S2 introduce a structured approach to sustainability and climate-related financial disclosure that Kenya is adopting.',
          'Listed companies also face ESG disclosure guidance from the Nairobi Securities Exchange, and lenders, investors, and development partners are adding their own due diligence requirements. For most institutions, the difficulty is not reading the standards; it is building the internal process needed to disclose credible information.',
          'We help you cut through the overlap, understand what genuinely applies to your institution, and sequence the work so you are ready before the pressure arrives.',
        ]}
      />

      <FeatureGrid
        eyebrow="What we deliver"
        title="From a clear readiness picture to a working reporting process"
        intro="Every engagement produces something you can use — an assessment, a roadmap, a template, or the evidence that stands behind a disclosure."
        items={[
          { icon: 'clipboard', title: 'Readiness assessment', body: 'A structured review of your governance, data, reporting, and risk management against the requirements that apply to you, with a readiness score and priority gaps.' },
          { icon: 'document', title: 'Reporting templates', body: 'Practical templates aligned to CBK, IFRS S1/S2, and other relevant frameworks, so your teams are not starting from a blank page.' },
          { icon: 'database', title: 'Evidence and audit trail', body: 'Evidence folders, responsibility matrices, and internal controls so that every disclosure can be traced back to its source.' },
          { icon: 'compass', title: 'Gap analysis and roadmap', body: 'A clear picture of what is missing, what must be done first, and a phased plan that reflects your size and data maturity.' },
          { icon: 'shield', title: 'Implementation support', body: 'Hands-on support to translate the plan into policies, processes, and reporting routines your team can sustain.' },
          { icon: 'check', title: 'Filing and disclosure readiness', body: 'Support to prepare and quality-assure your disclosures so they are complete, consistent, and ready for submission and scrutiny.' },
        ]}
      />

      <InfoColumns
        eyebrow="Our approach"
        title="Compliance built as a business process, not a last-minute scramble"
        variant="cream"
        paragraphs={[
          'We treat compliance as an operational capability rather than a one-off exercise. That means building the data, governance, and reporting routines that make each reporting cycle easier than the last, instead of a rush against the deadline.',
          'The result is an institution that can show not only what it disclosed, but how the information was gathered, who owns it, and how leadership uses it — which is exactly what regulators, lenders, and investors increasingly expect to see.',
        ]}
      />

      <PageCTA
        title="Know where you stand before the deadline becomes urgent"
        body="Start with a readiness diagnostic to understand your current compliance position and the most important gaps, or speak with our team about the obligations facing your institution."
      />
    </main>
  )
}
