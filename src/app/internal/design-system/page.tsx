'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import StatusPill from '@/components/ui/StatusPill'
import StatCard from '@/components/ui/StatCard'
import DataTable from '@/components/ui/DataTable'
import Eyebrow from '@/components/ui/Eyebrow'

export default function DesignSystemDemo() {
  const sampleColumns = [
    { key: 'institution', label: 'Institution', align: 'left' as const },
    { key: 'type', label: 'Type', align: 'left' as const },
    { key: 'status', label: 'Status', align: 'center' as const },
    { key: 'compliance', label: 'Compliance', align: 'right' as const },
  ]

  const sampleRows = [
    { institution: 'KCB Bank', type: 'Tier 1', status: 'Active', compliance: '94%' },
    { institution: 'Equity Bank', type: 'Tier 1', status: 'Active', compliance: '89%' },
    { institution: 'Co-op Bank', type: 'Tier 1', status: 'Active', compliance: '92%' },
    { institution: 'NCBA Bank', type: 'Tier 2', status: 'Pending', compliance: '78%' },
  ]

  return (
    <div className="min-h-screen">
      <Section variant="cream">
        <div className="text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-ink-950 mb-4">
            Design System Foundation
          </h1>
          <p className="text-lg text-ink-700 max-w-2xl mx-auto">
            Climate-serious components for compliance platforms
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Typography"
          title="Fraunces Serif + Inter Sans"
          description="Display headlines use Fraunces for editorial weight. Body text and UI use Inter."
        />
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl font-bold font-serif text-ink-950 mb-2">
              H1 Headline (Fraunces)
            </h1>
            <p className="text-base text-ink-700">
              Body text uses Inter for readability and UI clarity across dense compliance data.
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold font-serif text-ink-950 mb-2">
              H2 Section Title (Fraunces)
            </h2>
            <p className="text-base text-ink-700">
              Supporting paragraph in Inter sans-serif.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="cream">
        <SectionHeader
          eyebrow="Colors"
          title="Climate-Serious Palette"
          description="Forest (primary), Moss (secondary), Cream (canvas), Ink (text), Signal (urgency)"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="h-24 bg-forest-950 rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Forest 950</p>
          </div>
          <div>
            <div className="h-24 bg-forest-700 rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Forest 700</p>
          </div>
          <div>
            <div className="h-24 bg-moss-500 rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Moss 500</p>
          </div>
          <div>
            <div className="h-24 bg-cream-100 border border-ink-200 rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Cream 100</p>
          </div>
          <div>
            <div className="h-24 bg-ink-950 rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Ink 950</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Components"
          title="Button Variants"
          description="Primary, secondary, ghost, and link styles"
        />
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </Section>

      <Section variant="cream">
        <SectionHeader
          eyebrow="Components"
          title="Card Variants"
          description="Default, outlined, and muted containers"
        />
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default">
            <h3 className="text-lg font-semibold mb-2">Default Card</h3>
            <p className="text-sm text-ink-700">
              Standard white background with subtle border and hover state.
            </p>
          </Card>
          <Card variant="outlined">
            <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
            <p className="text-sm text-ink-700">
              Transparent background with prominent border.
            </p>
          </Card>
          <Card variant="muted">
            <h3 className="text-lg font-semibold mb-2">Muted Card</h3>
            <p className="text-sm text-ink-700">
              Subtle moss background for secondary content.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Components"
          title="Badge Variants"
          description="Neutral, success, warning, danger, and info"
        />
        <div className="flex flex-wrap gap-3">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Section>

      <Section variant="cream">
        <SectionHeader
          eyebrow="Components"
          title="Status Pills"
          description="Compliance-specific statuses with dot indicators"
        />
        <div className="flex flex-wrap gap-3">
          <StatusPill variant="compliant" />
          <StatusPill variant="in-progress" />
          <StatusPill variant="at-risk" />
          <StatusPill variant="not-started" />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Custom Labels</h3>
          <div className="flex flex-wrap gap-3">
            <StatusPill variant="compliant">IFRS S1/S2 Ready</StatusPill>
            <StatusPill variant="at-risk">CBK CRDF Review Needed</StatusPill>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Components"
          title="Stat Cards"
          description="Large serif numbers for KPI display"
        />
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard value="1,500+" label="Financial Institutions" />
          <StatCard
            value="94%"
            label="Compliance Rate"
            delta={{ value: '+12% YoY', trend: 'up' }}
          />
          <StatCard
            value="47"
            label="Counties Covered"
            delta={{ value: 'Complete', trend: 'neutral' }}
          />
        </div>
      </Section>

      <Section variant="cream">
        <SectionHeader
          eyebrow="Components"
          title="Data Table"
          description="Minimal table for institution listings"
        />
        <Card>
          <DataTable columns={sampleColumns} rows={sampleRows} zebra />
        </Card>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Without Zebra Striping</h3>
          <Card>
            <DataTable columns={sampleColumns} rows={sampleRows} />
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Components"
          title="Section & SectionHeader"
          description="Composable layout primitives with consistent spacing"
        />
        <div className="space-y-6">
          <Card variant="muted">
            <p className="text-sm text-ink-700 mb-2">
              <strong>Section</strong> wraps content with max-w-6xl, horizontal padding, and vertical rhythm. Variants: default (white), cream, forest (dark).
            </p>
            <p className="text-sm text-ink-700">
              <strong>SectionHeader</strong> combines Eyebrow + serif H2 + lead paragraph in one component.
            </p>
          </Card>
        </div>
      </Section>

      <Section variant="forest">
        <div className="text-center">
          <Eyebrow className="text-forest-300">Dark Section Example</Eyebrow>
          <h2 className="text-4xl font-bold font-serif text-white mb-4">
            Forest Variant
          </h2>
          <p className="text-lg text-forest-100 max-w-2xl mx-auto mb-8">
            Dark sections use forest-950 background with white text for hero or footer areas.
          </p>
          <Button variant="secondary">Learn More</Button>
        </div>
      </Section>

      <Section variant="cream">
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-4">Design System Complete</h3>
          <p className="text-ink-700 max-w-xl mx-auto">
            All primitives are now available in <code className="px-2 py-1 bg-white rounded text-sm">src/components/ui/</code>
          </p>
        </div>
      </Section>
    </div>
  )
}
