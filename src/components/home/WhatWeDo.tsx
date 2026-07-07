import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon, { IconName } from '@/components/home/icons'

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'compass',
    title: 'We begin with clarity',
    body: 'We assess your current climate risk and ESG readiness, identify the specific regulatory, investor, lender, or board expectations that apply to your organisation, and develop a practical roadmap for implementation that reflects your context.',
  },
  {
    icon: 'shield',
    title: 'We help you build the systems',
    body: 'We put in place the tools, policies, dashboards, reports, training, and governance structures needed to manage climate and ESG obligations with confidence — from board reporting and climate risk policies to ESG data systems and IFRS S1 and S2 readiness.',
  },
  {
    icon: 'check',
    title: 'We make it credible and repeatable',
    body: 'The goal is not to overwhelm your team with frameworks. It is to help you understand what matters, what is missing, what must be done first, and how to turn climate and ESG requirements into a business process that stands up to scrutiny.',
  },
]

const WhatWeDo: React.FC = () => {
  return (
    <Section variant="default">
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              What we do
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight mb-5">
              We help institutions understand, prepare for, and respond to climate and ESG
              requirements
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed">
              We work end to end — from the first honest assessment of where you stand to the
              systems, evidence, and reporting that keep you compliant year after year.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-5">
            {steps.map((step) => (
              <div
                key={step.title}
                className="group flex gap-5 rounded-xl border border-ink-200 bg-cream-50 p-6 transition-all duration-300 hover:border-navy-300 hover:shadow-md"
              >
                <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-700 text-white">
                  <Icon name={step.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-ink-700 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default WhatWeDo
