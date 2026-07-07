import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon from '@/components/home/icons'

const regions = [
  {
    name: 'Eastern Africa',
    places: 'Kenya, Uganda, Tanzania, Rwanda, Burundi, Ethiopia, Djibouti, Somalia, South Sudan',
  },
  {
    name: 'Southern Africa',
    places: 'Zambia, Malawi, Mozambique, Namibia, Eswatini, South Africa, Zimbabwe, Lesotho',
  },
  {
    name: 'Western Africa',
    places: 'Nigeria, Senegal, Ghana, Benin, Burkina Faso, Cameroon, Mali, Chad, DRC, Togo',
  },
  {
    name: 'Asia & South America',
    places: 'Brazil, Nepal, and Suriname',
  },
]

const clients = [
  'African Development Bank (AfDB)',
  'Swedish International Development Agency (SIDA)',
  'Agence Française de Développement (AFD)',
  'GIZ',
  'WWF',
  'Stockholm Environment Institute (SEI)',
  'Climate & Development Knowledge Network (CDKN)',
  'UN Economic Commission for Africa (UNECA)',
  'Belgian Government Cooperation (ENABLE)',
  'Cardno Emerging Markets',
  'Vivid Economics',
  'Ecometrica',
]

const ClientsBand: React.FC = () => {
  return (
    <Section variant="cream">
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              Who we work with
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
              Trusted by leading development, climate, and government institutions
            </h2>
          </div>
          <p className="lg:col-span-5 text-ink-600 leading-relaxed">
            Over more than two decades, C&amp;E Advisory has built strong working relationships with
            bilateral and multilateral agencies, governments, and development organisations, with
            project experience in more than thirty countries.
          </p>
        </div>
      </Reveal>

      {/* Footprint by region */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {regions.map((region, i) => (
          <Reveal key={region.name} delay={i * 70} className="h-full">
            <div className="h-full rounded-xl bg-white border border-ink-200 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700 text-white">
                <Icon name="globe" className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-navy-900 mb-2">{region.name}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{region.places}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Client roster */}
      <Reveal>
        <div className="rounded-2xl bg-white border border-ink-200 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-5">
            Selected clients and partners
          </p>
          <div className="flex flex-wrap gap-3">
            {clients.map((client) => (
              <span
                key={client}
                className="inline-flex items-center rounded-full bg-cream-50 border border-ink-200 px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-gold-400 hover:bg-gold-50"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default ClientsBand
