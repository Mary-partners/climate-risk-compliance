import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Icon from '@/components/home/icons'

const CTABand: React.FC = () => {
  return (
    <Section variant="forest">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 leading-tight">
            Know where you stand before the questions become urgent
          </h2>
          <div className="space-y-5 text-lg text-white/85 leading-relaxed">
            <p>
              Climate risk and ESG reporting are becoming part of how institutions are assessed by
              regulators, lenders, investors, boards, customers, and partners. Waiting until a report
              is due, a lender asks for documentation, or a board requests answers creates
              unnecessary pressure on your team.
            </p>
            <p>
              The better starting point is to understand your current readiness, identify the most
              important gaps, and build a practical roadmap before that pressure arrives.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-8">
            <p className="text-sm text-white/70 mb-6">
              Start with a structured diagnostic, or speak with our team about your institution.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/diagnostic">
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-gold-500 hover:!bg-gold-600 !text-navy-950 w-full justify-between hover:-translate-y-0.5 transition-transform"
                >
                  Start Your Climate Readiness Diagnostic
                  <Icon name="arrow" className="w-5 h-5" />
                </Button>
              </Link>
              <a href="mailto:stephen.mutimba@eclimateadvisory.com?subject=Compliance%20Review%20Request%20%E2%80%94%20Climate%20%26%20ESG">
                <Button
                  variant="secondary"
                  size="lg"
                  className="!bg-transparent !text-white !border-white/50 hover:!bg-white/10 w-full justify-between transition-colors"
                >
                  Book a Compliance Review
                  <Icon name="arrow" className="w-5 h-5" />
                </Button>
              </a>
            </div>
            <p className="mt-6 pt-5 border-t border-white/10 text-sm text-white/70">
              Stephen Mutimba · stephen.mutimba@eclimateadvisory.com · +254 722 721680
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default CTABand
