import React, { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-forest-700 hover:bg-forest-800 text-white shadow-sm hover:shadow-md',
      secondary: 'bg-white hover:bg-moss-50 text-ink-900 border border-ink-300 hover:border-forest-400',
      ghost: 'bg-transparent hover:bg-moss-50 text-ink-900',
      link: 'bg-transparent hover:underline text-forest-700 hover:text-forest-800',
    }
    
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg',
    }
    
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
