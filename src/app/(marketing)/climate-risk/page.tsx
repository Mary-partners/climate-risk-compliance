import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/inner/PageHero'
import InfoColumns from '@/components/inner/InfoColumns'
import FeatureGrid from '@/components/inner/FeatureGrid'
import PageCTA from '@/components/inner/PageCTA'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon from '@/components/home/icons'

export const metadata: Metadata = {
  title: 'Climate Risk — Physical & Transition Risk for Financial Institutions | C&E',
  description:
    'C&E helps banks, SACCOs, insurers, and investors understand physical and transition climate risk across borrowers, sectors, portfolios, and collateral, aligned to CBK guidance, TCFD, and IFRS S2.',
}

export default function ClimateRiskPage() {
  return (
    <main>
      <PageHero
        eyebrow="Climate Risk"
        title="Understand how climate risk affects your borrowers, portfolios, and long-term resilience"
        lead="For financial institutions, climate risk is increasingly connected to governance, strategy, credit assessment, portfolio monitoring, and reporting. We help you translate broad climate risk expectations into practical internal frameworks that hold up to regulator, board, and investor scrutiny."
        points={[
          { icon: 'alert', text: 'Physical risk across floods, drought, heat, and other hazards' },
          { icon: 'trending', text: 'Transition risk from policy, technology, and market shifts' },
          { icon: 'chart', text: 'Portfolio and sector exposure mapping' },
          { icon: 'shield', text: 'Climate risk governance and management frameworks' },
        ]}
      />

      <InfoColumns
        eyebrow="The two sides of climate risk"
        title="Physical risk and transition risk both affect the balance sheet"
        chips={['TCFD', 'IFRS S2', 'CBK Climate Risk Guidance', 'NGFS scenarios']}
        paragraphs={[
          'Physical risk is the risk that climate hazards — such as floods, drought, heat stress, and shifting rainfall — damage collateral, disrupt borrowers, and weaken the sectors an institution lends to. In Kenya, events such as the 2024 floods have already tested the resilience of lending books and insurance portfolios.',
          'Transition risk is the risk that the shift to a lower-carbon economy — through policy, technology, and changing market and consumer preferences — reduces the value of certain assets, sectors, and business models. Both types of risk can affect credit quality, collateral, and long-term strategy.',
          'We help institutions understand where these risks sit in their portfolios, how material they are, and what practical steps reduce exposure over time.',
        ]}
      />

      <FeatureGrid
        eyebrow="What we assess and build"
        title="From exposure mapping to a working climate risk framework"
        intro="We combine climate and sector expertise with a finance-aware view of your portfolio, so the output is usable by credit, risk, and the board."
        items={[
          { icon: 'alert', title: 'Physical risk assessment', body: 'We assess exposure to floods, drought, heat stress, and other hazards across the counties, sectors, and collateral your institution is exposed to.' },
          { icon: 'trending', title: 'Transition risk assessment', body: 'We evaluate how policy, technology, and market shifts could affect the value and creditworthiness of carbon-exposed sectors in your book.' },
          { icon: 'chart', title: 'Portfolio exposure mapping', body: 'We map climate exposure across sectors, counties, and borrower segments so you can see where risk concentrates.' },
          { icon: 'bank', title: 'Borrower and sector risk tools', body: 'We design practical tools to assess climate risk at the borrower and sector level and integrate them into credit processes.' },
          { icon: 'compass', title: 'Scenario and stress considerations', body: 'We help you think through climate scenarios and stress considerations in a way that is proportionate to your size and data maturity.' },
          { icon: 'shield', title: 'Climate risk governance', body: 'We design the policies, roles, and reporting structures that embed climate risk into governance, strategy, and risk management.' },
        ]}
      />

      {/* Kenya spotlight */}
      <Section variant="cream">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
                Kenya spotlight
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight mb-5">
                County-level climate hazard data for all 47 Kenyan counties
              </h2>
              <p className="text-lg text-ink-700 leading-relaxed mb-6">
                Our platform includes hazard risk data across all 47 counties and multiple hazard
                types and time horizons, so exposure can be assessed where your borrowers and
                collateral actually sit — not at a generic national average.
              </p>
              <Link
                href="/climate-risk/kenya"
                className="inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-navy-900 transition-colors"
              >
                Explore the Kenya view
                <Icon name="arrow" className="w-5 h-5" />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-navy-900 text-white p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { figure: '47', label: 'Counties covered' },
                    { figure: '6+', label: 'Hazard types' },
                    { figure: '3', label: 'Time horizons' },
                    { figure: 'RAG', label: 'Risk ratings' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl font-serif font-bold text-gold-400 mb-1">{s.figure}</div>
                      <div className="text-sm text-white/70">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <PageCTA
        title="Turn climate risk into a manageable part of your strategy"
        body="Start with a readiness diagnostic to see how prepared your institution is to identify, govern, and report climate risk, or speak with our team about your portfolio."
      />
    </main>
  )
}
