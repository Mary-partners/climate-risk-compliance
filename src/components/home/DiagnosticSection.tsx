import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'

const deliverables = [
  'A climate and ESG readiness score for your institution',
  'A regulatory and stakeholder exposure map',
  'A gap analysis across governance, data, reporting, and risk management',
  'A practical ninety-day action plan',
  'A concise board-level summary the board can act on',
  'A recommended implementation roadmap',
]

const DiagnosticSection: React.FC = () => {
  return (
    <Section variant="default">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <Eyebrow>Where to begin</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 mb-6 leading-tight">
            Start with a Climate Risk Readiness Diagnostic
          </h2>
          <div className="space-y-5 text-lg text-ink-700 leading-relaxed">
            <p>
              Before your institution invests in a sustainability report, ESG software, a climate
              policy, board training, or a full compliance programme, it needs a clear view of its
              current position. The Climate Risk Readiness Diagnostic is designed to help you
              understand your exposure, your obligations, your gaps, and your priorities.
            </p>
            <p>
              The diagnostic reviews your organisation across governance, strategy, risk management,
              reporting, data, compliance, and financial impact. It helps your team answer the
              questions that matter most, including which climate and ESG expectations apply to you,
              what information you already have, what is missing, who owns the process internally,
              what the board needs to know, and what you should prioritise over the next ninety days.
            </p>
            <p>
              At the end of the process, you receive a practical report that can be used with
              confidence by management, boards, compliance teams, chief financial officers, risk
              officers, investors, or funders.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/diagnostic">
              <Button variant="primary" size="lg" className="bg-navy-800 hover:bg-navy-900 text-white">
                Start Diagnostic
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-navy-900 text-white rounded-2xl p-8 md:p-10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-300 mb-6">
            What you receive
          </h3>
          <ul className="space-y-4">
            {deliverables.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 flex-shrink-0 text-gold-400" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-white/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default DiagnosticSection
