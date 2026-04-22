import React from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Diagnostic', href: '/diagnostic' },
        { label: 'Report Builder', href: '/auth' },
        { label: 'Integrations', href: '#platform' },
      ],
    },
    {
      title: 'Frameworks',
      links: [
        { label: 'IFRS S1/S2', href: '#frameworks' },
        { label: 'TCFD', href: '#frameworks' },
        { label: 'CBK CRDF', href: '#frameworks' },
        { label: 'EU CSRD', href: '#frameworks' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#resources' },
        { label: 'Compliance Timeline', href: '#resources' },
        { label: 'Support', href: 'mailto:support@climatecompliance.com' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Contact', href: 'mailto:hello@climatecompliance.com' },
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
      ],
    },
  ]

  const complianceBadges = [
    'IFRS S1/S2',
    'TCFD',
    'CBK CRDF',
    'EU CSRD',
  ]

  return (
    <footer className="bg-ink-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('mailto:') ? (
                      <a
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-xl font-serif font-bold mb-2">
                Climate Risk Platform
              </p>
              <p className="text-sm text-white/60">
                contact@climatecompliance.com
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {complianceBadges.map((badge) => (
                <Badge key={badge} variant="neutral" className="bg-white/10 text-white/90 border-white/20">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/50 text-center mt-8">
            © {new Date().getFullYear()} Climate Risk Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
