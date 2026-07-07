import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'

const audiences = [
  {
    title: 'Banks and Financial Institutions',
    body: 'Banks, SACCOs, microfinance institutions, digital lenders, fund managers, and other financial institutions are increasingly expected to understand how climate risk affects borrowers, sectors, portfolios, collateral, credit quality, operations, governance, and long-term resilience. We help financial institutions assess their climate risk readiness, design internal climate risk governance structures, map portfolio exposure, create borrower ESG assessment tools, prepare board reports, train their teams, and build implementation roadmaps that are aligned to emerging regulatory and market expectations.',
  },
  {
    title: 'Listed Companies and Public Interest Entities',
    body: 'Listed companies and public interest entities are facing growing expectations around ESG disclosure, sustainability reporting, governance transparency, and climate-related financial information. These expectations affect how companies communicate with investors, regulators, lenders, boards, and the public. We support companies to assess their ESG disclosure gaps, prepare for IFRS S1 and S2, develop credible sustainability reports, strengthen board oversight, collect reliable ESG data, and align their reporting with the relevant local and international frameworks.',
  },
  {
    title: 'SMEs and Growth Companies',
    body: 'For small and medium enterprises, ESG readiness is becoming part of access to finance, procurement, investment, and partnership opportunities. A growing business may be asked by a bank, an investor, a donor, a large buyer, or an accelerator to show how it manages governance, people, environmental responsibility, climate exposure, and operational risk. We help these businesses understand what ESG means in practical terms, assess their readiness, prepare documentation, improve governance, and build simple reporting systems that support funding, procurement, investor conversations, and long-term resilience.',
  },
  {
    title: 'Boards and Leadership Teams',
    body: 'Boards are expected to provide oversight on material risks, and climate risk is increasingly becoming part of that responsibility. Directors do not need technical jargon; they need clear information on exposure, compliance obligations, management readiness, data gaps, financial implications, and the decisions that are required of them. We help boards and leadership teams understand their climate and ESG obligations, review current readiness, define governance responsibilities, establish reporting routines, and make climate risk a genuine part of strategic and risk oversight.',
  },
  {
    title: 'Investors, Accelerators, and Development Programmes',
    body: 'Investors, funders, accelerators, and development partners increasingly need to assess ESG and climate readiness across their portfolios. This is especially important where investees or beneficiaries operate in agriculture, energy, manufacturing, logistics, infrastructure, finance, retail, housing, mobility, or other climate-exposed sectors. We provide ESG readiness scoring, portfolio diagnostics, due diligence tools, capacity-building programmes, and reporting frameworks that help these institutions understand risk and support better decision-making.',
  },
]

const WhoWeServe: React.FC = () => {
  return (
    <Section variant="cream">
      <SectionHeader
        eyebrow="Who we serve"
        title="Built for institutions that need practical climate and ESG readiness"
        description="Climate and ESG requirements do not affect every institution in the same way. We tailor our work to the questions each type of organisation is being asked to answer."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {audiences.map((audience, index) => (
          <div
            key={audience.title}
            className={`bg-white border border-ink-200 rounded-lg p-8 border-t-4 border-t-gold-500 ${
              index === audiences.length - 1 && audiences.length % 2 !== 0 ? 'md:col-span-2' : ''
            }`}
          >
            <h3 className="text-xl font-bold font-serif text-navy-900 mb-3">{audience.title}</h3>
            <p className="text-ink-700 leading-relaxed">{audience.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default WhoWeServe
