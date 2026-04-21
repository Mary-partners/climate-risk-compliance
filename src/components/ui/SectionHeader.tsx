import React from 'react'
import Eyebrow from './Eyebrow'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  eyebrow, 
  title, 
  description,
  className = ''
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-ink-950 mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-ink-700 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
