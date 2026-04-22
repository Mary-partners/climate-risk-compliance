'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'Frameworks', href: '#frameworks' },
    { label: 'Resources', href: '#resources' },
    { label: 'Sign in', href: '/auth' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-serif font-bold text-forest-900">
              Climate Risk Platform
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/auth"
              className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors"
            >
              Sign in
            </Link>
            <Link href="/diagnostic">
              <Button variant="primary" size="sm">
                Start diagnostic
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-ink-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-ink-200">
            <div className="flex flex-col gap-4">
              {navItems.slice(0, 3).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/auth"
                className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link href="/diagnostic">
                <Button variant="primary" size="sm" className="w-full">
                  Start diagnostic
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
