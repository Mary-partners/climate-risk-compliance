import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import DataTable from '@/components/ui/DataTable'
import StatusPill from '@/components/ui/StatusPill'

const CBKTimeline: React.FC = () => {
  const columns = [
    { key: 'date', label: 'Date', align: 'left' as const },
    { key: 'milestone', label: 'Milestone', align: 'left' as const },
    { key: 'institutions', label: 'Institutions Affected', align: 'left' as const },
    { key: 'status', label: 'Status', align: 'left' as const },
  ]

  const rows = [
    {
      date: 'Apr 2025',
      milestone: 'CBK CRDF template and guidance released',
      institutions: 'All CBK-regulated institutions',
      status: <StatusPill variant="compliant">Complete</StatusPill>,
    },
    {
      date: 'Jul 2025',
      milestone: 'Pilot phase — voluntary submissions from Tier 1 banks',
      institutions: '12 Tier 1 commercial banks',
      status: <StatusPill variant="compliant">Complete</StatusPill>,
    },
    {
      date: 'Jan 2026',
      milestone: 'KGFT taxonomy finalized and published',
      institutions: 'All financial institutions',
      status: <StatusPill variant="compliant">Complete</StatusPill>,
    },
    {
      date: 'Oct 2026',
      milestone: 'First mandatory CRDF disclosures due',
      institutions: 'Banks, insurers, pension funds, SACCOs',
      status: <StatusPill variant="in-progress">Upcoming</StatusPill>,
    },
    {
      date: 'Jan 2027',
      milestone: 'IFRS S2 mandatory for listed companies',
      institutions: 'NSE-listed companies + Tier 1/2 banks',
      status: <StatusPill variant="not-started">Pending</StatusPill>,
    },
    {
      date: 'Apr 2027',
      milestone: 'Second annual CRDF disclosures due',
      institutions: 'All CBK-regulated institutions',
      status: <StatusPill variant="not-started">Pending</StatusPill>,
    },
  ]

  return (
    <Section variant="default">
      <SectionHeader 
        title="CBK CRDF timeline"
        description="Key regulatory milestones for climate risk disclosure in Kenya"
      />
      <DataTable columns={columns} rows={rows} zebra />
    </Section>
  )
}

export default CBKTimeline
