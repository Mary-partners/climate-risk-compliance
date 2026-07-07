import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'

const ProblemStatement: React.FC = () => {
  return (
    <Section variant="cream">
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              The shift underway
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight lg:sticky lg:top-24">
              Climate disclosure is becoming a business requirement, not a public relations exercise
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg text-ink-700 leading-relaxed max-w-3xl">
            <p>
              Across Kenya, climate risk and ESG expectations are beginning to affect how
              institutions are governed, financed, assessed, and trusted. Banks are being expected to
              understand climate exposure in their lending books. Listed companies are being asked to
              disclose ESG information more clearly. Small and medium enterprises are beginning to
              face ESG questions from lenders, buyers, investors, and development partners. Boards are
              being asked to show oversight, and chief financial officers and risk teams are being
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
      </Reveal>
    </Section>
  )
}

export default ProblemStatement
