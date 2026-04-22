import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import DataTable from '@/components/ui/DataTable'
import StatusPill from '@/components/ui/StatusPill'

const GlobalRoadmap: React.FC = () => {
  const columns = [
    { key: 'jurisdiction', label: 'Jurisdiction', align: 'left' as const },
    { key: 'framework', label: 'Framework', align: 'left' as const },
    { key: 'who', label: 'Who must report', align: 'left' as const },
    { key: 'deadline', label: 'Deadline', align: 'left' as const },
    { key: 'status', label: 'Status', align: 'center' as const },
  ]

  const rows = [
    {
      jurisdiction: 'Kenya',
      framework: 'CBK CRDF',
      who: 'Banks, SACCOs, insurers, pension funds',
      deadline: 'Oct 2026',
      status: <StatusPill variant="compliant">Active</StatusPill>,
    },
    {
      jurisdiction: 'Global',
      framework: 'IFRS S1/S2',
      who: 'Listed companies',
      deadline: 'Jan 2027',
      status: <StatusPill variant="compliant">Active</StatusPill>,
    },
    {
      jurisdiction: 'EU',
      framework: 'CSRD',
      who: 'Large corporates',
      deadline: '2024–2028 staggered',
      status: <StatusPill variant="compliant">Active</StatusPill>,
    },
    {
      jurisdiction: 'UK',
      framework: 'TCFD-mandatory',
      who: 'Listed + large private',
      deadline: 'In force',
      status: <StatusPill variant="compliant">Active</StatusPill>,
    },
    {
      jurisdiction: 'Nigeria',
      framework: 'SEC sustainability rules',
      who: 'Listed companies',
      deadline: '2025–2027',
      status: <StatusPill variant="in-progress">Emerging</StatusPill>,
    },
    {
      jurisdiction: 'South Africa',
      framework: 'JSE + climate disclosure',
      who: 'Listed companies',
      deadline: '2025+',
      status: <StatusPill variant="in-progress">Emerging</StatusPill>,
    },
    {
      jurisdiction: 'USA',
      framework: 'SEC climate rules',
      who: 'Public companies',
      deadline: 'Phased',
      status: <StatusPill variant="at-risk">In flux</StatusPill>,
    },
  ]

  return (
    <Section variant="default">
      <SectionHeader
        eyebrow="Disclosure timeline"
        title="Global climate reporting mandates"
        description="Tracking when disclosure becomes mandatory across jurisdictions."
      />
      <DataTable columns={columns} rows={rows} zebra />
    </Section>
  )
}

export default GlobalRoadmap
