import React from 'react'

type CardVariant = 'default' | 'outlined' | 'muted'

interface CardProps {
  variant?: CardVariant
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  [key: string]: any
}

const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  as: Component = 'div',
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'rounded-lg p-6 transition-all duration-300'
  
  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-white border border-ink-200 hover:border-forest-400 hover:shadow-md',
    outlined: 'bg-transparent border-2 border-ink-300 hover:border-forest-500',
    muted: 'bg-moss-50 border border-moss-200',
  }
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export default Card
