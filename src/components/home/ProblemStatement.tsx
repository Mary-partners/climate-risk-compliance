import React from 'react'
import Section from '@/components/ui/Section'

const ProblemStatement: React.FC = () => {
  return (
    <Section variant="cream">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 mb-6">
          Climate disclosure is no longer optional
        </h2>
        <p className="text-lg text-ink-700 leading-relaxed">
          Financial regulators worldwide are mandating climate risk disclosure. IFRS S1 and S2 take effect January 2027 for listed companies. The EU's CSRD is already staggered through 2028. Kenya's Central Bank finalized the CRDF framework in 2024, requiring all banks, SACCOs, insurers, and pension funds to report by October 2026. The window to build disclosure capability is closing. Organizations that treat this as a compliance checkbox—rather than an operational capability—will face regulatory scrutiny, reputational risk, and competitive disadvantage as peers move faster.
        </p>
      </div>
    </Section>
  )
}

export default ProblemStatement
