import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-ink-950 mb-6 leading-tight">
            Climate disclosure, built for the institutions that have to get it right.
          </h1>
          <p className="text-lg md:text-xl text-ink-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            The climate risk and ESG reporting platform for compliance teams navigating IFRS S1/S2, TCFD, CBK CRDF, and emerging disclosure regulation.
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
      </div>
    </section>
  )
}

export default Hero
