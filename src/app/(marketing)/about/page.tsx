import React from 'react'
import { Metadata } from 'next'
import PageHero from '@/components/inner/PageHero'
import InfoColumns from '@/components/inner/InfoColumns'
import FeatureGrid from '@/components/inner/FeatureGrid'
import PageCTA from '@/components/inner/PageCTA'
import StatsBand from '@/components/home/StatsBand'
import ClientsBand from '@/components/home/ClientsBand'

export const metadata: Metadata = {
  title: 'About Climate & Energy Advisory (C&E) — 27+ Years Across Africa',
  description:
    'Climate & Energy Advisory (C&E) is a leading Kenyan consultancy in clean energy, climate change, and green growth, with more than 27 years of work across 30+ countries and clients including the African Development Bank, SIDA, GIZ, AFD, and WWF.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Climate & Energy Advisory"
        title="A citadel of resilience and sustainability, working across Africa for more than two decades"
        lead="Climate & Energy Advisory (C&E) is a leading Kenyan consultancy specialising in sustainable clean energy, climate change solutions, and green growth. We combine deep field experience with a finance-aware, governance-led approach — the same rigour we bring to governments and development finance institutions now sits behind our climate risk and ESG readiness platform."
        points={[
          { icon: 'clipboard', text: 'More than 27 years of climate, energy, and sustainability work' },
          { icon: 'globe', text: 'Projects delivered in over 30 countries' },
          { icon: 'target', text: 'Four integrated practice areas' },
          { icon: 'users', text: 'Clients including AfDB, SIDA, GIZ, AFD, and WWF' },
        ]}
        secondaryCta={{ href: '/resources', label: 'Read our insights' }}
      />

      <StatsBand />

      <InfoColumns
        eyebrow="Who we are"
        title="We help institutions turn climate and ESG expectations into a credible business process"
        paragraphs={[
          'Founded to work at the intersection of climate, energy, and finance, C&E has spent more than twenty-seven years delivering innovative and resilient solutions for communities and institutions across Africa and beyond. Our focus has always been the sustainable management and use of resources, and the practical systems that make sustainability real rather than rhetorical.',
          'We handle work from end to end — combining project management, capacity building, training, policy implementation, and community empowerment. Whether the client is a national government, a development finance institution, a bank, or a growing enterprise, our aim is the same: to help them understand what is required, see where they stand, and build something they can sustain.',
          'That experience is what our climate risk and ESG readiness platform is built on. It brings the methods, evidence, and discipline we use in large programmes to the banks, SACCOs, insurers, listed companies, and businesses now facing climate and ESG expectations of their own.',
        ]}
      />

      <FeatureGrid
        eyebrow="Our practice areas"
        title="Four connected areas of expertise"
        intro="Our climate risk and ESG work draws on the full breadth of the firm's practice across climate, energy, natural resources, and green finance."
        variant="cream"
        columns={2}
        items={[
          { icon: 'leaf', title: 'Climate Change Solutions', body: 'Adaptation, mitigation, climate finance, policy and strategy development, risk assessment, and monitoring and evaluation at community, sector, national, and regional level.' },
          { icon: 'sun', title: 'Clean Energy Development', body: 'Sustainable biomass energy planning, solar system design and installation, clean cooking fuel and technology assessments, and consumer financing solutions for rural energy.' },
          { icon: 'tree', title: 'Natural Resource Management', body: 'REDD and REDD+ forestry projects, climate-smart agriculture, land use and forestry, and value chain development that conserve biodiversity and open access to carbon markets.' },
          { icon: 'coins', title: 'Green Growth and Green Finance', body: 'Green principles, green technologies, and green project development that mobilise public and private capital into clean, low-carbon growth in support of national climate commitments.' },
        ]}
      />

      <ClientsBand />

      <PageCTA
        title="Work with a team that has done this across the continent"
        body="Start with a readiness diagnostic, or speak with our team about how our experience applies to your institution's climate and ESG challenges."
      />
    </main>
  )
}
