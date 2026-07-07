import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'

interface InfoColumnsProps {
  eyebrow: string
  title: string
  paragraphs: string[]
  variant?: 'default' | 'cream'
  chips?: string[]
}

const InfoColumns: React.FC<InfoColumnsProps> = ({
  eyebrow,
  title,
  paragraphs,
  variant = 'default',
  chips,
}) => {
  return (
    <Section variant={variant}>
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              {eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
              {title}
            </h2>
            {chips && chips.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-full border border-ink-200 bg-cream-50 px-3 py-1 text-xs font-medium text-navy-800"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-7 space-y-5 text-lg text-ink-700 leading-relaxed max-w-3xl">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default InfoColumns
