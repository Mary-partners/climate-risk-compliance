import React from 'react'
import { Metadata } from 'next'
import PageHero from '@/components/inner/PageHero'
import InfoColumns from '@/components/inner/InfoColumns'
import FeatureGrid from '@/components/inner/FeatureGrid'
import PageCTA from '@/components/inner/PageCTA'

export const metadata: Metadata = {
  title: 'Board & Governance — Climate Oversight for Directors | C&E',
  description:
    'C&E helps boards and leadership teams provide credible oversight of climate and ESG risk — with board literacy, oversight frameworks, risk committee tooling, reporting packs, and disclosure sign-off.',
}

export default function GovernancePage() {
  return (
    <main>
      <PageHero
        eyebrow="Board & Governance"
        title="Give your board the oversight of climate and ESG risk that regulators now expect"
        lead="Boards are expected to provide oversight of material risks, and climate risk is increasingly part of that responsibility. Directors do not need technical jargon; they need clear information on exposure, obligations, readiness, and the decisions required of them. We help boards make climate risk a genuine part of strategic and risk oversight."
        points={[
          { icon: 'users', text: 'Board climate literacy in the language directors actually use' },
          { icon: 'shield', text: 'Oversight frameworks and clear responsibilities' },
          { icon: 'chart', text: 'Board-ready reporting packs on exposure and progress' },
          { icon: 'check', text: 'Confident disclosure sign-off' },
        ]}
      />

      <InfoColumns
        eyebrow="Why this matters for boards"
        title="Climate oversight is becoming a test of good governance"
        paragraphs={[
          'Regulators, investors, and lenders increasingly look at whether a board genuinely understands and oversees climate and ESG risk, or whether it has simply delegated the topic and moved on. Directors are being asked to show that climate risk is on the agenda, that management is accountable, and that decisions are informed by credible information.',
          'The challenge for most boards is not willingness; it is getting information in a form they can actually use. Too often, climate and ESG material arrives as dense technical detail rather than clear insight on exposure, compliance status, financial implications, and the choices in front of the board.',
          'We help boards and leadership teams close that gap — understanding their obligations, reviewing readiness, defining responsibilities, and establishing reporting routines that make oversight practical.',
        ]}
      />

      <FeatureGrid
        eyebrow="How we support boards"
        title="Practical tools for directors, committees, and leadership teams"
        intro="We speak to the board, the chief financial officer, the risk team, and management in language each can understand, and we build oversight that fits how your board actually works."
        items={[
          { icon: 'users', title: 'Board climate literacy', body: 'Focused briefings and training that give directors a clear, practical understanding of climate and ESG risk and their oversight responsibilities.' },
          { icon: 'shield', title: 'Oversight frameworks', body: 'Clear governance structures that define how climate and ESG risk is escalated, discussed, and owned across the board and its committees.' },
          { icon: 'scale', title: 'Risk committee tooling', body: 'Practical tools and agendas for audit and risk committees so climate risk is reviewed with the same rigour as other material risks.' },
          { icon: 'chart', title: 'Board reporting packs', body: 'Board-ready packs covering exposure, compliance status, key risks, progress, data gaps, and the decisions required — written for directors.' },
          { icon: 'compass', title: 'Roles and responsibilities', body: 'A clear allocation of climate and ESG responsibilities across the board, executive team, and management, so accountability is unambiguous.' },
          { icon: 'check', title: 'Disclosure sign-off', body: 'Support so the board can sign off climate and ESG disclosures with confidence, understanding what stands behind every statement.' },
        ]}
      />

      <PageCTA
        title="Equip your board to oversee climate risk with confidence"
        body="Start with a readiness diagnostic that includes a board-level summary, or speak with our team about strengthening oversight and reporting for your directors."
      />
    </main>
  )
}
