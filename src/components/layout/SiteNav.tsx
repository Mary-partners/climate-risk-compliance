'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

interface NavItem {
  label: string
  href: string
  disabled?: boolean
}

interface NavSection {
  label: string
  items: NavItem[]
}

const SiteNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const navSections: { [key: string]: NavSection[] } = {
    'ESG': [
      {
        label: 'Overview',
        items: [{ label: 'Overview', href: '/esg' }],
      },
      {
        label: 'Topics',
        items: [
          { label: 'Materiality assessment', href: '/esg#materiality' },
          { label: 'Metrics & KPIs', href: '/esg#metrics' },
          { label: 'Assurance readiness', href: '/esg#assurance' },
          { label: 'Disclosure publishing', href: '/esg#disclosure' },
        ],
      },
    ],
    'Climate Risk': [
      {
        label: 'Overview',
        items: [{ label: 'Overview', href: '/climate-risk' }],
      },
      {
        label: 'Topics',
        items: [
          { label: 'Physical risk', href: '/climate-risk#physical-risk' },
          { label: 'Transition risk', href: '/climate-risk#transition-risk' },
          { label: 'Portfolio alignment', href: '/climate-risk#portfolio' },
        ],
      },
      {
        label: 'Geography',
        items: [
          { label: 'Kenya', href: '/climate-risk/kenya' },
          { label: 'Nigeria', href: '/climate-risk/nigeria', disabled: true },
        ],
      },
    ],
    'Compliance': [
      {
        label: 'Overview',
        items: [{ label: 'Overview', href: '/compliance' }],
      },
      {
        label: 'Topics',
        items: [
          { label: 'Regulatory horizon', href: '/compliance#regulatory' },
          { label: 'Reporting templates', href: '/compliance#templates' },
          { label: 'Audit trail', href: '/compliance#audit' },
          { label: 'Filing automation', href: '/compliance#filing' },
        ],
      },
    ],
    'Board & Governance': [
      {
        label: 'Overview',
        items: [{ label: 'Overview', href: '/governance' }],
      },
      {
        label: 'Topics',
        items: [
          { label: 'Board climate literacy', href: '/governance#literacy' },
          { label: 'Oversight frameworks', href: '/governance#oversight' },
          { label: 'Risk committee tooling', href: '/governance#committee' },
          { label: 'Disclosure sign-off', href: '/governance#sign-off' },
        ],
      },
    ],
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        const dropdownEl = dropdownRefs.current[activeDropdown]
        if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
          setActiveDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeDropdown])

  const handleKeyDown = (e: React.KeyboardEvent, navKey: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveDropdown(activeDropdown === navKey ? null : navKey)
    } else if (e.key === 'Escape') {
      setActiveDropdown(null)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-serif font-bold text-forest-900">
              Climate Risk Platform
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {Object.keys(navSections).map((navKey) => (
              <div
                key={navKey}
                ref={(el) => {
                  dropdownRefs.current[navKey] = el
                }}
                className="relative"
              >
                <button
                  className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors py-2"
                  onClick={() => setActiveDropdown(activeDropdown === navKey ? null : navKey)}
                  onKeyDown={(e) => handleKeyDown(e, navKey)}
                  aria-expanded={activeDropdown === navKey}
                  aria-haspopup="true"
                >
                  {navKey}
                </button>
                {activeDropdown === navKey && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-ink-200 rounded-lg shadow-lg min-w-[240px] py-2">
                    {navSections[navKey].map((section, idx) => (
                      <div key={section.label}>
                        {idx > 0 && <div className="border-t border-ink-200 my-2" />}
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              item.disabled
                                ? 'text-ink-400 cursor-not-allowed'
                                : 'text-ink-700 hover:bg-moss-50 hover:text-forest-700'
                            }`}
                            onClick={() => !item.disabled && setActiveDropdown(null)}
                            {...(item.disabled && { 'aria-disabled': 'true' })}
                          >
                            {item.label}
                            {item.disabled && (
                              <span className="ml-2 text-xs text-ink-400">(Coming soon)</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/resources"
              className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors"
            >
              Resources
            </Link>
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
            className="lg:hidden p-2"
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
          <div className="lg:hidden py-4 border-t border-ink-200 transition-all duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
              {Object.keys(navSections).map((navKey) => (
                <details key={navKey} className="group">
                  <summary className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors cursor-pointer py-2 list-none">
                    <span className="flex items-center justify-between">
                      {navKey}
                      <svg
                        className="w-4 h-4 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="pl-4 py-2 flex flex-col gap-2">
                    {navSections[navKey].map((section) =>
                      section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-sm transition-colors ${
                            item.disabled
                              ? 'text-ink-400 cursor-not-allowed'
                              : 'text-ink-600 hover:text-forest-700'
                          }`}
                          onClick={() => !item.disabled && setMobileMenuOpen(false)}
                          {...(item.disabled && { 'aria-disabled': 'true' })}
                        >
                          {item.label}
                          {item.disabled && (
                            <span className="ml-2 text-xs text-ink-400">(Coming soon)</span>
                          )}
                        </Link>
                      ))
                    )}
                  </div>
                </details>
              ))}
              <Link
                href="/resources"
                className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/auth"
                className="text-sm font-medium text-ink-700 hover:text-forest-700 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link href="/diagnostic">
                <Button variant="primary" size="sm" className="w-full mt-2">
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

export default SiteNav
