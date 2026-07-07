import React from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import Icon, { IconName } from '@/components/home/icons'

interface FeatureGridProps {
  eyebrow: string
  title: string
  intro?: string
  variant?: 'default' | 'cream'
  columns?: 2 | 3
  items: { icon?: IconName; title: string; body: string }[]
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  eyebrow,
  title,
  intro,
  variant = 'default',
  columns = 3,
  items,
}) => {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
  return (
    <Section variant={variant}>
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
              {eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
              {title}
            </h2>
          </div>
          {intro && (
            <p className="lg:col-span-5 text-ink-600 leading-relaxed">{intro}</p>
          )}
        </div>
      </Reveal>

      <div className={`grid ${gridCols} gap-6`}>
        {items.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 70} className="h-full">
            <div className="group h-full rounded-xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-navy-300">
              {item.icon && (
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                  <Icon name={item.icon} className="w-6 h-6" />
                </div>
              )}
              <h3 className="text-lg font-bold font-serif text-navy-900 mb-2">{item.title}</h3>
              <p className="text-sm text-ink-700 leading-relaxed">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default FeatureGrid
