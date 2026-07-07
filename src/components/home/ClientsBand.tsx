import React from 'react'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'

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
      <div className="max-w-3xl mx-auto text-center mb-10">
        <Eyebrow>Who we work with</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 mb-6 leading-tight">
          Trusted by leading development, climate, and government institutions
        </h2>
        <p className="text-lg text-ink-700 leading-relaxed">
          Over more than two decades, C&amp;E Advisory has built strong working relationships with
          bilateral and multilateral agencies, international development organisations, governments,
          private institutions, and non-governmental organisations. Our project experience spans
          Eastern, Southern, and Western Africa — from Kenya, Uganda, Tanzania, Rwanda, and Ethiopia
          to Zambia, Malawi, Mozambique, Nigeria, and Senegal — as well as projects in Brazil,
          Nepal, and Suriname.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {clients.map((client) => (
          <span
            key={client}
            className="inline-flex items-center rounded-full bg-white border border-ink-200 px-4 py-2 text-sm font-medium text-navy-900 shadow-sm"
          >
            {client}
          </span>
        ))}
      </div>
    </Section>
  )
}

export default ClientsBand
