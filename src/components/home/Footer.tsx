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
        { label: 'Documentation', href: '/resources' },
        { label: 'Compliance Timeline', href: '/compliance' },
        { label: 'Support', href: 'mailto:stephen.mutimba@eclimateadvisory.com' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Climate & Energy Advisory', href: '#' },
        { label: 'Contact', href: 'mailto:stephen.mutimba@eclimateadvisory.com' },
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
      ],
    },
  ]

  const complianceBadges = [
    'CBK CRDF',
    'IFRS S1/S2',
    'TCFD',
    'KGFT',
    'PCAF',
  ]

  return (
    <footer className="bg-ink-950 text-white py-16">
      <div className="max-w-screen-2xl mx-auto px-6">
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
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="text-center md:text-left">
              <p className="text-xl font-serif font-bold mb-1">
                Climate &amp; Energy Advisory <span className="text-white/60 font-sans font-normal text-base">(C&amp;E)</span>
              </p>
              <p className="text-xs uppercase tracking-wider text-gold-300 mb-3">
                Citadel of Resilience &amp; Sustainability
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                2nd Floor, Golden Ivy, Karen Road, Karen<br />
                Nairobi, Kenya
              </p>
              <p className="text-sm text-white/70 mt-2">
                <a href="mailto:stephen.mutimba@eclimateadvisory.com" className="hover:text-white transition-colors">stephen.mutimba@eclimateadvisory.com</a><br />
                <a href="tel:+254722721680" className="hover:text-white transition-colors">+254 722 721680</a>
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
            © {new Date().getFullYear()} Climate &amp; Energy Advisory (C&amp;E). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
