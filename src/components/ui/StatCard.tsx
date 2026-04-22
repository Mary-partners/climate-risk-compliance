import React from 'react'

interface StatCardProps {
  value: string | number
  label: string
  delta?: {
    value: string | number
    trend: 'up' | 'down' | 'neutral'
  }
  className?: string
}

const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  label, 
  delta,
  className = '' 
}) => {
  const deltaColor = {
    up: 'text-forest-600',
    down: 'text-signal-red-500',
    neutral: 'text-ink-600',
  }
  
  return (
    <div className={`bg-white border border-ink-200 rounded-lg p-6 ${className}`}>
      <div className="text-4xl md:text-5xl font-bold font-serif text-ink-950 mb-2">
        {value}
      </div>
      <div className="text-sm text-ink-600 font-medium mb-1">
        {label}
      </div>
      {delta && (
        <div className={`text-sm font-medium ${deltaColor[delta.trend]}`}>
          {delta.trend === 'up' && '↑ '}
          {delta.trend === 'down' && '↓ '}
          {delta.value}
        </div>
      )}
    </div>
  )
}

export default StatCard
