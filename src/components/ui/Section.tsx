import React from 'react'

type SectionVariant = 'default' | 'cream' | 'forest'

interface SectionProps {
  variant?: SectionVariant
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  [key: string]: any
}

const Section: React.FC<SectionProps> = ({ 
  variant = 'default',
  children,
  className = '',
  as: Component = 'section',
  ...props
}) => {
  const baseStyles = 'py-16 md:py-24'
  
  const variantStyles: Record<SectionVariant, string> = {
    default: 'bg-white',
    cream: 'bg-cream-100',
    forest: 'bg-forest-950 text-white',
  }
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`
  
  return (
    <Component className={classes} {...props}>
      <div className="max-w-6xl mx-auto px-6">
        {children}
      </div>
    </Component>
  )
}

export default Section
