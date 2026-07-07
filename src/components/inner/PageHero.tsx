import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Icon, { IconName } from '@/components/home/icons'

interface PageHeroProps {
  eyebrow: string
  title: string
  lead: string
  points?: { icon: IconName; text: string }[]
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
}

const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  lead,
  points,
  primaryCta = { href: '/diagnostic', label: 'Start Your Climate Readiness Diagnostic' },
  secondaryCta = {
    href: 'mailto:stephen.mutimba@eclimateadvisory.com?subject=Enquiry%20%E2%80%94%20Climate%20%26%20Energy%20Advisory',
    label: 'Speak with our team',
  },
}) => {
  const isMailto = secondaryCta.href.startsWith('mailto:')
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 15%, #305d99 0, transparent 44%), radial-gradient(circle at 92% 85%, #c28f22 0, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-screen-2xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className={points && points.length ? 'lg:col-span-7' : 'lg:col-span-9'}>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-200 mb-6">
              {eyebrow}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold font-serif leading-[1.12] text-balance mb-6">
              {title}
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
              {lead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={primaryCta.href}>
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-gold-500 hover:!bg-gold-600 !text-navy-950 w-full sm:w-auto hover:-translate-y-0.5 transition-transform"
                >
                  {primaryCta.label}
                </Button>
              </Link>
              {isMailto ? (
                <a href={secondaryCta.href}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="!bg-transparent !text-white !border-white/50 hover:!bg-white/10 w-full sm:w-auto transition-colors"
                  >
                    {secondaryCta.label}
                  </Button>
                </a>
              ) : (
                <Link href={secondaryCta.href}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="!bg-transparent !text-white !border-white/50 hover:!bg-white/10 w-full sm:w-auto transition-colors"
                  >
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {points && points.length > 0 && (
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-7 md:p-8">
                <ul className="space-y-5">
                  {points.map((p) => (
                    <li key={p.text} className="flex gap-4">
                      <span className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300">
                        <Icon name={p.icon} className="w-5 h-5" />
                      </span>
                      <span className="text-sm text-white/85 leading-relaxed self-center">
                        {p.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PageHero
