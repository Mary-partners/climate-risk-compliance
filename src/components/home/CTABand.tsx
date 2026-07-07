import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

const CTABand: React.FC = () => {
  return (
    <Section variant="forest">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 leading-tight">
          Know where you stand before the questions become urgent
        </h2>
        <div className="space-y-5 text-lg text-white/85 leading-relaxed mb-10">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/diagnostic">
            <Button variant="primary" size="lg" className="!bg-gold-500 hover:!bg-gold-600 !text-navy-950 w-full sm:w-auto">
              Start Your Climate Readiness Diagnostic
            </Button>
          </Link>
          <a href="mailto:stephen.mutimba@eclimateadvisory.com?subject=Compliance%20Review%20Request%20%E2%80%94%20Climate%20%26%20ESG">
            <Button variant="secondary" size="lg" className="!bg-transparent !text-white !border-white/50 hover:!bg-white/10 w-full sm:w-auto">
              Book a Compliance Review
            </Button>
          </a>
        </div>
      </div>
    </Section>
  )
}

export default CTABand
