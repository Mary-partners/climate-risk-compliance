import React from 'react'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'

const ProblemStatement: React.FC = () => {
  return (
    <Section variant="cream">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>The shift underway</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 mb-6 leading-tight">
          Climate disclosure is becoming a business requirement, not a public relations exercise
        </h2>
        <div className="space-y-5 text-lg text-ink-700 leading-relaxed">
          <p>
            Across Kenya, climate risk and ESG expectations are beginning to affect how
            institutions are governed, financed, assessed, and trusted. Banks are being expected to
            understand climate exposure in their lending books. Listed companies are being asked to
            disclose ESG information more clearly. Small and medium enterprises are beginning to
            face ESG questions from lenders, buyers, investors, and development partners. Boards are
            being asked to show oversight. Chief financial officers and risk teams are being
            expected to produce evidence rather than assumptions.
          </p>
          <p>
            For many institutions, the challenge is not a lack of interest. The challenge is
            knowing how to translate broad climate and ESG expectations into a practical internal
            system that actually works. A sustainability report on its own is no longer enough if
            the business cannot show how the information was gathered, who owns the data, how
            climate risk affects strategy, and how leadership is using that information to make
            decisions.
          </p>
          <p>
            We help institutions move from fragmented ESG activity to a structured readiness
            process that connects regulation, governance, data, reporting, finance, and risk
            management into one coherent approach.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default ProblemStatement
