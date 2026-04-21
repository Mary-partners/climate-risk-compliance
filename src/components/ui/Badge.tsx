import React from 'react'

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'neutral', 
  children, 
  className = '' 
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border'
  
  const variantStyles: Record<BadgeVariant, string> = {
    neutral: 'bg-ink-100 text-ink-700 border-ink-200',
    success: 'bg-forest-50 text-forest-700 border-forest-200',
    warning: 'bg-signal-amber-50 text-signal-amber-700 border-signal-amber-700/20',
    danger: 'bg-signal-red-50 text-signal-red-700 border-signal-red-700/20',
    info: 'bg-moss-50 text-moss-700 border-moss-200',
  }
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge
