import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon, { IconName } from '@/components/home/icons'

const pillars: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'leaf',
    title: 'Climate Change Solutions',
    body: 'Adaptation, mitigation, climate finance, policy and strategy development, risk assessment, and monitoring and evaluation at community, sector, national, and regional level.',
  },
  {
    icon: 'sun',
    title: 'Clean Energy Development',
    body: 'Sustainable biomass energy planning, solar system design and installation, clean cooking fuel and technology assessments, and consumer financing for rural energy.',
  },
  {
    icon: 'tree',
    title: 'Natural Resource Management',
    body: 'REDD and REDD+ forestry projects, climate-smart agriculture, land use and forestry, and value chain development that conserve biodiversity and open access to carbon markets.',
  },
  {
    icon: 'coins',
    title: 'Green Growth and Green Finance',
    body: 'Green principles, green technologies, and green project development that mobilise public and private capital into clean, low-carbon growth in support of national climate commitments.',
  },
]

const AboutCE: React.FC = () => {
  return (
    <Section variant="default">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
            About Climate &amp; Energy Advisory
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 mb-6 leading-tight">
            A citadel of resilience and sustainability, built over more than two decades
          </h2>
          <div className="space-y-5 text-lg text-ink-700 leading-relaxed">
            <p>
              Climate &amp; Energy Advisory (C&amp;E) is a leading Kenyan consultancy specialising in
              sustainable clean energy projects, climate change solutions, and green growth
              development. For more than twenty-seven years we have delivered innovative and
              resilient solutions for communities and institutions across Africa and beyond.
            </p>
            <p>
              We handle work from end to end, combining project management, capacity building,
              training, policy implementation, and community empowerment. That same rigour, evidence,
              and methodology now sits behind our climate risk and ESG readiness platform, made
              practical for banks, SACCOs, insurers, listed companies, and the businesses they serve.
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70} className="h-full">
              <div className="group h-full rounded-xl bg-cream-50 border border-ink-200 border-l-4 border-l-gold-500 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                  <Icon name={pillar.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-serif text-navy-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-ink-700 leading-relaxed">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default AboutCE
