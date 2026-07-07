import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'

const WhyUs: React.FC = () => {
  return (
    <Section variant="cream">
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 mb-16">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              Why institutions work with us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
              A practical, finance-aware, and governance-led approach
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-lg text-ink-700 leading-relaxed max-w-3xl">
            <p>
              We understand that climate risk and ESG reporting cannot be treated as a side project.
              For Kenyan and African institutions, these requirements sit inside a wider business
              reality that includes limited data, lean teams, evolving regulation, investor pressure,
              cost constraints, genuine climate vulnerability, and a growing demand for credible
              reporting.
            </p>
            <p>
              Our approach is practical, finance-aware, and governance-led. We help organisations
              understand what is required, but we also help them build the internal systems needed to
              respond. We do not simply prepare attractive reports; we help create the evidence, the
              structures, and the routines that stand behind the report and give it authority.
            </p>
            <p>
              We are especially useful to institutions that need a partner who can speak to the board,
              the chief financial officer, the compliance team, the risk team, the lender, the
              investor, and the small business owner in language that each of them can understand.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 pt-14 border-t border-ink-200">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              What makes this different
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-ink-950 leading-tight">
              Many ESG solutions begin with frameworks. We begin with the institution.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-lg text-ink-700 leading-relaxed max-w-3xl">
            <p>
              We look at your business model, your regulatory exposure, your financing needs, your
              governance structure, your data maturity, your climate exposure, and the stakeholders
              who are most likely to ask you questions. From there, we help you build a practical
              response that fits your context rather than a generic checklist.
            </p>
            <p>
              This matters because climate and ESG requirements will not affect every institution in
              the same way. A bank needs to understand portfolio risk. A listed company needs credible
              disclosure. A small business needs to be ready for lenders and buyers. A board needs
              meaningful oversight. An investor needs comparable portfolio data. A funder needs
              evidence of both impact and risk management. Our work is designed around those realities.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default WhyUs
