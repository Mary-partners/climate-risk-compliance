import React from 'react'

type StatusVariant = 'compliant' | 'in-progress' | 'at-risk' | 'not-started'

interface StatusPillProps {
  variant: StatusVariant
  children?: React.ReactNode
  className?: string
}

const StatusPill: React.FC<StatusPillProps> = ({ 
  variant, 
  children,
  className = '' 
}) => {
  const baseStyles = 'inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium border'
  
  const variantConfig: Record<StatusVariant, { styles: string; dot: string; label?: string }> = {
    'compliant': {
      styles: 'bg-forest-50 text-forest-700 border-forest-200',
      dot: 'bg-forest-500',
      label: 'Compliant',
    },
    'in-progress': {
      styles: 'bg-moss-50 text-moss-700 border-moss-200',
      dot: 'bg-moss-500',
      label: 'In Progress',
    },
    'at-risk': {
      styles: 'bg-signal-amber-50 text-signal-amber-700 border-signal-amber-700/20',
      dot: 'bg-signal-amber-500',
      label: 'At Risk',
    },
    'not-started': {
      styles: 'bg-ink-100 text-ink-700 border-ink-200',
      dot: 'bg-ink-400',
      label: 'Not Started',
    },
  }
  
  const config = variantConfig[variant]
  const classes = `${baseStyles} ${config.styles} ${className}`
  
  return (
    <span className={classes}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {children || config.label}
    </span>
  )
}

export default StatusPill
