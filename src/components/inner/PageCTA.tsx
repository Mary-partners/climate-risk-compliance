import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Icon from '@/components/home/icons'

interface PageCTAProps {
  title: string
  body: string
}

const PageCTA: React.FC<PageCTAProps> = ({ title, body }) => {
  return (
    <Section variant="forest">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-5 leading-tight">{title}</h2>
          <p className="text-lg text-white/85 leading-relaxed">{body}</p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-8 flex flex-col gap-4">
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
            <a href="mailto:stephen.mutimba@eclimateadvisory.com?subject=Enquiry%20%E2%80%94%20Climate%20%26%20Energy%20Advisory">
              <Button
                variant="secondary"
                size="lg"
                className="!bg-transparent !text-white !border-white/50 hover:!bg-white/10 w-full justify-between transition-colors"
              >
                Book a Strategy Call
                <Icon name="arrow" className="w-5 h-5" />
              </Button>
            </a>
            <p className="pt-4 border-t border-white/10 text-sm text-white/70">
              Stephen Mutimba · stephen.mutimba@eclimateadvisory.com · +254 722 721680
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default PageCTA
