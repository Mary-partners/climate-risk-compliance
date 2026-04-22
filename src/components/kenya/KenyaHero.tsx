import React from 'react'
import Eyebrow from '@/components/ui/Eyebrow'

const KenyaHero: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Eyebrow>Climate Risk · Kenya</Eyebrow>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-ink-950 mb-6 leading-tight">
          Climate risk, Kenya
        </h1>
        <p className="text-lg md:text-xl text-ink-700 max-w-3xl leading-relaxed">
          The Central Bank of Kenya (CBK) Climate Risk Disclosure Framework (CRDF) requires over 1,500 financial institutions 
          to assess and disclose climate-related risks by October 2026. Our platform provides comprehensive coverage of 
          Kenya's regulatory landscape, institution rosters, county-level hazard data, and compliance timelines.
        </p>
      </div>
    </section>
  )
}

export default KenyaHero
