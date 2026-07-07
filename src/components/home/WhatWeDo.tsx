import React from 'react'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'

const WhatWeDo: React.FC = () => {
  return (
    <Section variant="default">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>What we do</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 mb-6 leading-tight">
          We help institutions understand, prepare for, and respond to climate risk and ESG
          reporting requirements
        </h2>
        <div className="space-y-5 text-lg text-ink-700 leading-relaxed">
          <p>
            Our work begins with clarity. We assess your current climate risk and ESG readiness, we
            identify the specific regulatory, investor, lender, or board expectations that apply to
            your organisation, and we develop a practical roadmap for implementation that reflects
            your context rather than a generic template.
          </p>
          <p>
            We then help you build the tools, policies, dashboards, reports, training, and
            governance structures needed to manage climate and ESG obligations with confidence.
            This includes supporting board reporting, climate risk policies, ESG data systems, IFRS
            S1 and S2 readiness, sustainability reports, portfolio risk mapping, small and medium
            enterprise ESG scoring, and the compliance evidence files that stand behind every
            disclosure.
          </p>
          <p>
            The goal is not to overwhelm your team with frameworks. The goal is to help your
            institution understand what matters, what is missing, what must be done first, and how
            to turn climate and ESG requirements into a credible and repeatable business process.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default WhatWeDo
