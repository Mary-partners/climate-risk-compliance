import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import DataTable from '@/components/ui/DataTable'
import { COUNTY_HAZARDS, HAZARD_DISPLAY_KEYS, HAZARD_LABELS, getRiskLabel, getRiskColor } from '@/lib/hazard-data'

const CountyHazardSnapshot: React.FC = () => {
  const getTopHazards = (countyName: string): string => {
    const hazards = COUNTY_HAZARDS[countyName]
    if (!hazards) return '—'

    const hazardScores = HAZARD_DISPLAY_KEYS.map(key => ({
      name: HAZARD_LABELS[key],
      score: hazards[key][1],
    }))

    const topHazards = hazardScores
      .filter(h => h.score >= 4)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(h => h.name)

    return topHazards.length > 0 ? topHazards.join(', ') : 'Low exposure'
  }

  const getHighestRisk = (countyName: string): JSX.Element => {
    const hazards = COUNTY_HAZARDS[countyName]
    if (!hazards) return <span>—</span>

    const maxScore = Math.max(
      ...HAZARD_DISPLAY_KEYS.map(key => hazards[key][1])
    )

    const colors = getRiskColor(maxScore)
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
        {getRiskLabel(maxScore)}
      </span>
    )
  }

  const columns = [
    { key: 'county', label: 'County', align: 'left' as const },
    { key: 'topHazards', label: 'Top Hazards (2020-2040)', align: 'left' as const },
    { key: 'riskLevel', label: 'Risk Level', align: 'left' as const },
  ]

  const rows = Object.keys(COUNTY_HAZARDS).sort().map(county => ({
    county,
    topHazards: getTopHazards(county),
    riskLevel: getHighestRisk(county),
  }))

  return (
    <Section variant="default">
      <SectionHeader 
        title="47-county hazard snapshot"
        description={`Physical climate risk exposure across all ${Object.keys(COUNTY_HAZARDS).length} Kenyan counties (2020-2040 projections)`}
      />
      <DataTable columns={columns} rows={rows} zebra />
    </Section>
  )
}

export default CountyHazardSnapshot
