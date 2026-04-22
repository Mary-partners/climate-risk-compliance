import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

const CTABand: React.FC = () => {
  return (
    <Section variant="forest">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-6">
          Ready to start reporting?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Run a 15-minute diagnostic or sign in to access the full platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/diagnostic">
            <Button variant="primary" size="lg">
              Start diagnostic
            </Button>
          </Link>
          <Link href="/auth">
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}

export default CTABand
