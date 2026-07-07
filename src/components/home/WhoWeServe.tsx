import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon, { IconName } from '@/components/home/icons'

const audiences: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'bank',
    title: 'Banks and Financial Institutions',
    body: 'Banks, SACCOs, microfinance institutions, digital lenders, and fund managers are increasingly expected to understand how climate risk affects borrowers, sectors, portfolios, collateral, and credit quality. We help them assess readiness, design climate risk governance, map portfolio exposure, build borrower ESG assessment tools, and prepare board reports aligned to emerging regulation.',
  },
  {
    icon: 'building',
    title: 'Listed Companies and Public Interest Entities',
    body: 'Listed companies and public interest entities face growing expectations around ESG disclosure, sustainability reporting, and climate-related financial information. We support them to assess disclosure gaps, prepare for IFRS S1 and S2, develop credible sustainability reports, strengthen board oversight, and align reporting with local and international frameworks.',
  },
  {
    icon: 'briefcase',
    title: 'SMEs and Growth Companies',
    body: 'For small and medium enterprises, ESG readiness is becoming part of access to finance, procurement, and investment. We help these businesses understand what ESG means in practical terms, assess their readiness, prepare documentation, improve governance, and build simple reporting systems that support funding and long-term resilience.',
  },
  {
    icon: 'users',
    title: 'Boards and Leadership Teams',
    body: 'Boards are expected to provide oversight on material risks, and climate risk is increasingly part of that responsibility. We help boards and leadership teams understand their obligations, review current readiness, define governance responsibilities, establish reporting routines, and make climate risk a genuine part of strategic and risk oversight.',
  },
  {
    icon: 'trending',
    title: 'Investors, Accelerators, and Development Programmes',
    body: 'Investors, funders, accelerators, and development partners increasingly need to assess ESG and climate readiness across their portfolios, particularly in climate-exposed sectors. We provide ESG readiness scoring, portfolio diagnostics, due diligence tools, capacity-building programmes, and reporting frameworks that support better decision-making.',
  },
]

const WhoWeServe: React.FC = () => {
  return (
    <Section variant="cream">
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              Who we serve
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
              Built for institutions that need practical climate and ESG readiness
            </h2>
          </div>
          <p className="lg:col-span-5 text-ink-600 leading-relaxed">
            Climate and ESG requirements do not affect every institution in the same way. We tailor
            our work to the questions each type of organisation is being asked to answer.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audiences.map((audience, i) => (
          <Reveal key={audience.title} delay={i * 70} className="h-full">
            <div className="group h-full rounded-xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-400">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-100 text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                <Icon name={audience.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-navy-900 mb-3">{audience.title}</h3>
              <p className="text-sm text-ink-700 leading-relaxed">{audience.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default WhoWeServe
