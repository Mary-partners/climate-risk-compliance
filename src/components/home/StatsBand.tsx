import React from 'react'

const stats = [
  {
    figure: '27+',
    label: 'Years advising on climate, clean energy, and sustainability across Africa',
  },
  {
    figure: '30+',
    label: 'Countries where we have delivered projects across Africa, Asia, and South America',
  },
  {
    figure: '4',
    label: 'Integrated practice areas spanning climate, energy, natural resources, and green finance',
  },
  {
    figure: 'AfDB · SIDA · GIZ',
    label: 'Development-finance and government institutions that have trusted our work',
    small: true,
  },
]

const StatsBand: React.FC = () => {
  return (
    <section className="bg-navy-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div
                className={`font-serif font-bold text-gold-400 mb-2 ${
                  stat.small ? 'text-xl md:text-2xl' : 'text-4xl md:text-5xl'
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
