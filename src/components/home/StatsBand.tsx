import React from 'react'
import Icon, { IconName } from '@/components/home/icons'

const stats: { icon: IconName; figure: string; label: string; small?: boolean }[] = [
  {
    icon: 'clipboard',
    figure: '27+',
    label: 'Years advising on climate, clean energy, and sustainability across Africa',
  },
  {
    icon: 'globe',
    figure: '30+',
    label: 'Countries where we have delivered projects across Africa, Asia, and South America',
  },
  {
    icon: 'target',
    figure: '4',
    label: 'Integrated practice areas spanning climate, energy, natural resources, and green finance',
  },
  {
    icon: 'users',
    figure: 'AfDB · SIDA · GIZ',
    label: 'Development-finance and government institutions that have trusted our work',
    small: true,
  },
]

const StatsBand: React.FC = () => {
  return (
    <section className="bg-navy-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center lg:text-left ${
                i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-6' : ''
              }`}
            >
              <div className="mb-3 flex justify-center lg:justify-start">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300">
                  <Icon name={stat.icon} className="w-5 h-5" />
                </span>
              </div>
              <div
                className={`font-serif font-bold text-gold-400 mb-2 ${
                  stat.small ? 'text-lg md:text-xl' : 'text-4xl md:text-5xl'
                }`}
              >
                {stat.figure}
              </div>
              <p className="text-sm text-white/75 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBand
