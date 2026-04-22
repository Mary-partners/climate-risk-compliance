import React from 'react'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

const Eyebrow: React.FC<EyebrowProps> = ({ children, className = '' }) => {
  return (
    <div className={`text-xs uppercase tracking-wider font-semibold text-forest-600 mb-3 ${className}`}>
      {children}
    </div>
  )
}

export default Eyebrow
