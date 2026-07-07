import React from 'react'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'

const pillars = [
  {
    title: 'Climate Change Solutions',
    body: 'Adaptation, mitigation, climate finance, policy and strategy development, risk assessment, and the monitoring and evaluation of climate-compatible development at community, sector, national, and regional level.',
  },
  {
    title: 'Clean Energy Development',
    body: 'Sustainable biomass energy planning, solar system design and installation, clean cooking fuel and technology assessments, and consumer financing solutions that address rural energy challenges.',
  },
  {
    title: 'Natural Resource Management',
    body: 'REDD and REDD+ forestry projects, climate-smart agriculture, land use and forestry, and value chain development that conserve biodiversity, protect land, and open access to carbon markets.',
  },
  {
    title: 'Green Growth and Green Finance',
    body: 'Green principles, green technologies, and green project development that mobilise public and private capital into clean, low-carbon growth in support of national climate commitments.',
  },
]

const AboutCE: React.FC = () => {
  return (
    <Section variant="default">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <Eyebrow>About Climate &amp; Energy Advisory</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 mb-6 leading-tight">
            A citadel of resilience and sustainability, built over more than two decades
          </h2>
          <div className="space-y-5 text-lg text-ink-700 leading-relaxed">
            <p>
              Climate &amp; Energy Advisory (C&amp;E) is a leading Kenyan consultancy specialising in
              sustainable clean energy projects, climate change solutions, and green growth
              development. For more than twenty-seven years we have delivered innovative and
              resilient solutions for communities and institutions across Africa and beyond, with a
              consistent focus on the sustainable management and use of resources.
            </p>
            <p>
              We handle work from end to end, combining project management, capacity building,
              training, policy implementation, and community empowerment. That same rigour, evidence,
              and methodology now sits behind our climate risk and ESG readiness platform, made
              practical for banks, SACCOs, insurers, listed companies, and the businesses they serve.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-cream-50 border border-ink-200 rounded-lg p-6 border-l-4 border-l-gold-500"
              >
                <h3 className="text-base font-bold font-serif text-navy-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-ink-700 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default AboutCE
