import React from 'react'
import { Metadata } from 'next'
import PageHero from '@/components/inner/PageHero'
import InfoColumns from '@/components/inner/InfoColumns'
import FeatureGrid from '@/components/inner/FeatureGrid'
import PageCTA from '@/components/inner/PageCTA'

export const metadata: Metadata = {
  title: 'ESG & Sustainability Reporting — Climate & Energy Advisory (C&E)',
  description:
    'C&E helps institutions build credible ESG and sustainability reporting — materiality, data and evidence systems, metrics, assurance readiness, and disclosure aligned to IFRS S1, GRI, and the frameworks that matter in Kenya.',
}

export default function ESGPage() {
  return (
    <main>
      <PageHero
        eyebrow="ESG & Sustainability Reporting"
        title="ESG and sustainability reporting that stands up to investor, lender, and regulator scrutiny"
        lead="We help organisations prepare ESG and sustainability reports that are credible, evidence-based, and aligned with the expectations of boards, investors, regulators, and lenders. Our work goes well beyond writing the report; we help build the data, evidence, and routines behind it."
        points={[
          { icon: 'target', text: 'Materiality assessment grounded in your business and stakeholders' },
          { icon: 'database', text: 'ESG data and evidence systems that make reporting repeatable' },
          { icon: 'shield', text: 'Assurance readiness for third-party verification' },
          { icon: 'document', text: 'Disclosures aligned to IFRS S1, GRI, and relevant standards' },
        ]}
      />

      <InfoColumns
        eyebrow="Why this is changing"
        title="ESG reporting is moving from a communications exercise to a business discipline"
        paragraphs={[
          'Listed companies, financial institutions, and a growing number of small and medium enterprises are being asked to disclose ESG information more clearly and more credibly. Investors, lenders, regulators, and large buyers increasingly want to understand how an organisation manages environmental responsibility, people, governance, and climate exposure.',
          'A sustainability report on its own is no longer enough. Stakeholders want to see how the information was gathered, who owns the data, and how the organisation is using it to make decisions. That shift is what turns ESG reporting from a once-a-year document into an ongoing business discipline.',
          'We help organisations identify what is material, collect reliable data, validate the evidence, and present disclosures that are genuinely useful rather than decorative.',
        ]}
      />

      <FeatureGrid
        eyebrow="What we help you put in place"
        title="A complete ESG reporting capability, not just a report"
        intro="Each element is designed to be practical and repeatable, so ESG reporting becomes a routine your team can sustain year after year."
        items={[
          { icon: 'target', title: 'Materiality assessment', body: 'We identify and prioritise the ESG topics that matter most to your stakeholders and your business, so your reporting focuses on what is genuinely material.' },
          { icon: 'database', title: 'ESG data and evidence systems', body: 'We design simple data systems, responsibility matrices, reporting calendars, and evidence folders so the information sitting across finance, human resources, operations, and risk can be reported reliably.' },
          { icon: 'chart', title: 'Metrics and KPIs', body: 'We help you define and track the environmental, social, and governance indicators that align with the frameworks relevant to your organisation.' },
          { icon: 'shield', title: 'Assurance readiness', body: 'We prepare your ESG data and processes for third-party verification, so your disclosures can withstand external audit and due diligence.' },
          { icon: 'document', title: 'Disclosure and reporting', body: 'We structure and draft credible sustainability reports aligned to IFRS S1, GRI, and other relevant standards, written for the people who actually read them.' },
          { icon: 'users', title: 'Board and management reporting', body: 'We translate ESG information into clear reporting packs that help leadership understand progress, gaps, and the decisions required of them.' },
        ]}
      />

      <InfoColumns
        eyebrow="How we work"
        title="We begin with your organisation, not with a framework"
        variant="cream"
        paragraphs={[
          'Rather than starting from a checklist, we start by understanding your business model, your stakeholders, your data maturity, and the specific expectations you are being asked to meet. From there we build a reporting approach that fits your context.',
          'This matters because ESG expectations do not affect every organisation in the same way. A listed company needs credible public disclosure, a bank needs portfolio-level insight, and a growing business needs to be ready for lenders, buyers, and investors. We shape the work around those realities.',
        ]}
      />

      <PageCTA
        title="Build ESG reporting your stakeholders can trust"
        body="Start with a structured readiness diagnostic to understand where your ESG reporting stands today, or speak with our team about your specific disclosure obligations."
      />
    </main>
  )
}
