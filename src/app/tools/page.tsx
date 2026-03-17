'use client'

import { useState, useEffect, useCallback } from 'react'
import AuthGate from '@/lib/AuthGate'
import { useAuth } from '@/lib/AuthContext'
import {
  COUNTY_HAZARDS,
  HAZARD_DISPLAY_KEYS,
  HAZARD_LABELS,
  PERIOD_LABELS,
  getRiskLabel,
  getRiskColor,
  HazardScores,
} from '@/lib/hazard-data'
import Link from 'next/link'

/* ─── CSS Variables ─── */
const V = {
  primary: '#1a56db',
  accent: '#0ea5e9',
  bg: '#f8fafc',
  bg2: '#eef1f6',
  text: '#1e293b',
  muted: '#64748b',
  green: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444',
  white: '#ffffff',
  font: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
}

/* ─── Helpers ─── */
function riskCellColor(level: number) {
  if (level <= 2) return { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' }
  if (level === 3) return { bg: '#fffbeb', text: '#92400e', border: '#fde68a' }
  return { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' }
}

function AnimatedNumber({ target, duration = 1200, prefix = '', suffix = '', decimals = 0 }: {
  target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number
}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(id) }
      else setVal(start)
    }, 16)
    return () => clearInterval(id)
  }, [target, duration])
  return <span>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11,
      fontWeight: 600, background: color + '18', color, letterSpacing: 0.3,
      border: `1px solid ${color}44`,
    }}>{label}</span>
  )
}

function StatusDot({ status, color, pulse }: { status: string; color: string; pulse?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: V.muted, fontWeight: 500 }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block',
        boxShadow: pulse ? `0 0 0 0 ${color}` : 'none',
        animation: pulse ? 'statusPulse 2s infinite' : 'none',
      }} />
      {status}
    </span>
  )
}

function ProgressBar({ value, max = 100, color = V.primary, height = 8 }: {
  value: number; max?: number; color?: string; height?: number
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ width: '100%', background: V.bg2, borderRadius: height, height, overflow: 'hidden' }}>
      <div style={{
        width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: height, transition: 'width 1s ease',
      }} />
    </div>
  )
}

function TemplateMapping({ text }: { text: string }) {
  return (
    <div style={{
      marginTop: 16, padding: '10px 14px', background: `${V.primary}0a`, borderRadius: 8,
      border: `1px dashed ${V.primary}33`, fontSize: 12, color: V.primary, fontWeight: 500,
    }}>
      CBK CRDF Mapping: {text}
    </div>
  )
}

/* ─── Tool 1: PACTA ─── */
function PACTATool() {
  const sectors = ['Agriculture', 'Energy', 'Transport', 'Manufacturing', 'Real Estate', 'Mining']
  const [allocations, setAllocations] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    sectors.forEach(s => init[s] = 0)
    init['Agriculture'] = 30; init['Energy'] = 25; init['Manufacturing'] = 20
    init['Real Estate'] = 15; init['Transport'] = 10
    return init
  })
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<null | {
    tempScore: number; sectorResults: { name: string; aligned: number; misaligned: number; techMix: string }[]
  }>(null)

  const run = () => {
    setRunning(true); setResults(null)
    setTimeout(() => {
      const active = sectors.filter(s => allocations[s] > 0)
      const alignMap: Record<string, number> = {
        Agriculture: 42, Energy: 35, Transport: 28, Manufacturing: 55, 'Real Estate': 68, Mining: 22,
      }
      const techMixMap: Record<string, string> = {
        Agriculture: 'Climate-smart 38% | Conventional 62%',
        Energy: 'Renewable 31% | Fossil 69%',
        Transport: 'EV/Hybrid 24% | ICE 76%',
        Manufacturing: 'Low-carbon 52% | High-emission 48%',
        'Real Estate': 'Green-certified 64% | Standard 36%',
        Mining: 'Sustainable 18% | Conventional 82%',
      }
      const totalAlloc = Object.values(allocations).reduce((a, b) => a + b, 0) || 1
      let weighted = 0
      active.forEach(s => { weighted += (allocations[s] / totalAlloc) * alignMap[s] })
      const tempScore = 1.5 + (1 - weighted / 100) * 2.5
      setResults({
        tempScore: Math.round(tempScore * 10) / 10,
        sectorResults: active.map(s => ({
          name: s, aligned: alignMap[s], misaligned: 100 - alignMap[s], techMix: techMixMap[s],
        })),
      })
      setRunning(false)
    }, 1500)
  }

  const tempColor = (t: number) => t <= 2 ? V.green : t <= 3 ? V.amber : V.red

  return (
    <div>
      <p style={{ fontSize: 13, color: V.muted, marginBottom: 16 }}>
        Adjust your portfolio sector allocations, then run alignment analysis against Paris Agreement pathways.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {sectors.map(s => (
          <div key={s} style={{ background: V.white, borderRadius: 8, padding: 12, border: `1px solid ${V.bg2}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: V.text }}>{s}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: V.primary }}>{allocations[s]}%</span>
            </div>
            <input type="range" min={0} max={100} value={allocations[s]}
              onChange={e => setAllocations(p => ({ ...p, [s]: +e.target.value }))}
              style={{ width: '100%', accentColor: V.primary, cursor: 'pointer' }} />
          </div>
        ))}
      </div>
      <button onClick={run} disabled={running}
        style={{
          marginTop: 16, padding: '10px 28px', background: running ? V.muted : `linear-gradient(135deg, ${V.primary}, ${V.accent})`,
          color: V.white, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
          cursor: running ? 'wait' : 'pointer', transition: 'all .3s',
        }}>
        {running ? 'Analyzing...' : 'Run Alignment Analysis'}
      </button>

      {results && (
        <div style={{ marginTop: 20, animation: 'fadeSlideIn .5s ease' }}>
          <div style={{
            background: `linear-gradient(135deg, ${tempColor(results.tempScore)}11, ${tempColor(results.tempScore)}05)`,
            border: `1px solid ${tempColor(results.tempScore)}33`, borderRadius: 12, padding: 20, marginBottom: 16,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: V.muted, marginBottom: 4 }}>Portfolio Temperature Alignment</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: tempColor(results.tempScore), lineHeight: 1 }}>
                <AnimatedNumber target={results.tempScore} decimals={1} suffix="°C" />
              </div>
              {/* Temperature gauge */}
              <div style={{ margin: '16px auto', maxWidth: 320, position: 'relative', height: 24, background: V.bg2, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 12,
                  width: `${((results.tempScore - 1.5) / 2.5) * 100}%`,
                  background: `linear-gradient(90deg, ${V.green}, ${V.amber}, ${V.red})`,
                  transition: 'width 1.5s ease',
                }} />
                <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 8px', fontSize: 9, lineHeight: '24px', color: V.muted }}>
                  <span>1.5°C</span><span>2°C</span><span>3°C</span><span>4°C</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: V.muted }}>
                {results.tempScore <= 2 ? 'Paris-aligned' : results.tempScore <= 3 ? 'Partial alignment — transition needed' : 'Significant misalignment — urgent action required'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {results.sectorResults.map(sr => (
              <div key={sr.name} style={{ background: V.white, borderRadius: 10, padding: 14, border: `1px solid ${V.bg2}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: V.text, marginBottom: 8 }}>{sr.name}</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  <div style={{ flex: sr.aligned, height: 6, background: V.green, borderRadius: 3 }} />
                  <div style={{ flex: sr.misaligned, height: 6, background: V.red, borderRadius: 3 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: V.muted }}>
                  <span style={{ color: V.green }}>Aligned {sr.aligned}%</span>
                  <span style={{ color: V.red }}>Misaligned {sr.misaligned}%</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 10, color: V.muted, background: V.bg, padding: '4px 8px', borderRadius: 4 }}>
                  {sr.techMix}
                </div>
              </div>
            ))}
          </div>
          <TemplateMapping text="Physical Risk Exposures — Part B: Sector Allocation" />
        </div>
      )}
    </div>
  )
}

/* ─── Tool 2: CLIMADA ─── */
function CLIMADATool() {
  const counties = Object.keys(COUNTY_HAZARDS).sort()
  const [selected, setSelected] = useState<string[]>(['Nairobi'])
  const [periodIdx, setPeriodIdx] = useState<0 | 1 | 2>(1)
  const [assetValue, setAssetValue] = useState<string>('1000000000')
  const [showLoss, setShowLoss] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleCounty = (c: string) => {
    setSelected(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const calcEAL = (county: string) => {
    const data = COUNTY_HAZARDS[county]
    if (!data) return 0
    const avg = HAZARD_DISPLAY_KEYS.reduce((sum, k) => sum + data[k][periodIdx], 0) / HAZARD_DISPLAY_KEYS.length
    const lossRate = (avg / 5) * 0.08
    return parseFloat(assetValue || '0') * lossRate
  }

  return (
    <div>
      <p style={{ fontSize: 13, color: V.muted, marginBottom: 12 }}>
        Explore county-level hazard risk data from CBK official datasets. Select counties to compare risk profiles.
      </p>

      {/* County selector */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div onClick={() => setDropdownOpen(!dropdownOpen)} style={{
          padding: '10px 14px', background: V.white, border: `1px solid ${V.bg2}`, borderRadius: 8,
          cursor: 'pointer', fontSize: 13, display: 'flex', flexWrap: 'wrap', gap: 4, minHeight: 40, alignItems: 'center',
        }}>
          {selected.length === 0 ? <span style={{ color: V.muted }}>Select counties...</span> :
            selected.map(c => (
              <span key={c} style={{
                background: `${V.primary}15`, color: V.primary, padding: '2px 8px', borderRadius: 12,
                fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                {c}
                <span onClick={e => { e.stopPropagation(); toggleCounty(c) }} style={{ cursor: 'pointer', fontWeight: 400 }}>x</span>
              </span>
            ))}
        </div>
        {dropdownOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: 200, overflowY: 'auto',
            background: V.white, border: `1px solid ${V.bg2}`, borderRadius: 8, marginTop: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,.1)', zIndex: 50,
          }}>
            {counties.map(c => (
              <div key={c} onClick={() => toggleCounty(c)} style={{
                padding: '8px 14px', fontSize: 13, cursor: 'pointer',
                background: selected.includes(c) ? `${V.primary}0a` : 'transparent',
                color: selected.includes(c) ? V.primary : V.text,
                fontWeight: selected.includes(c) ? 600 : 400,
              }}>
                {selected.includes(c) ? '\u2713 ' : ''}{c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Period toggles */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {PERIOD_LABELS.map((label, idx) => (
          <button key={idx} onClick={() => setPeriodIdx(idx as 0 | 1 | 2)} style={{
            padding: '6px 16px', borderRadius: 6, border: `1px solid ${periodIdx === idx ? V.primary : V.bg2}`,
            background: periodIdx === idx ? `${V.primary}12` : V.white,
            color: periodIdx === idx ? V.primary : V.muted,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Risk matrix */}
      {selected.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', background: V.bg2, borderRadius: '8px 0 0 0', color: V.text, fontWeight: 700 }}>Hazard</th>
                {selected.map((c, i) => (
                  <th key={c} style={{
                    textAlign: 'center', padding: '8px 12px', background: V.bg2, color: V.text, fontWeight: 700,
                    borderRadius: i === selected.length - 1 ? '0 8px 0 0' : 0,
                  }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HAZARD_DISPLAY_KEYS.map((hk, ri) => (
                <tr key={hk}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: V.text, borderBottom: `1px solid ${V.bg2}`, whiteSpace: 'nowrap' }}>
                    {HAZARD_LABELS[hk]}
                  </td>
                  {selected.map(c => {
                    const level = COUNTY_HAZARDS[c]?.[hk]?.[periodIdx] ?? 0
                    const clr = riskCellColor(level)
                    return (
                      <td key={c} style={{ textAlign: 'center', padding: '6px 8px', borderBottom: `1px solid ${V.bg2}` }}>
                        <span style={{
                          display: 'inline-block', width: 36, height: 28, lineHeight: '28px', borderRadius: 6,
                          background: clr.bg, color: clr.text, fontWeight: 700, fontSize: 13,
                          border: `1px solid ${clr.border}`,
                        }}>
                          {level}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 10, color: V.muted }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#ecfdf5', border: '1px solid #a7f3d0', marginRight: 4, verticalAlign: 'middle' }} />1-2 Low</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#fffbeb', border: '1px solid #fde68a', marginRight: 4, verticalAlign: 'middle' }} />3 Moderate</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#fef2f2', border: '1px solid #fecaca', marginRight: 4, verticalAlign: 'middle' }} />4-5 High</span>
          </div>
        </div>
      )}

      {/* EAL Calculator */}
      <div style={{ marginTop: 20, padding: 16, background: `linear-gradient(135deg, ${V.accent}08, ${V.primary}08)`, borderRadius: 10, border: `1px solid ${V.accent}22` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: V.text, marginBottom: 10 }}>Expected Annual Loss Simulator</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ fontSize: 11, color: V.muted, display: 'block', marginBottom: 4 }}>Total Asset Value (KES)</label>
            <input type="text" value={assetValue} onChange={e => setAssetValue(e.target.value.replace(/[^0-9]/g, ''))}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: `1px solid ${V.bg2}`,
                fontSize: 13, fontFamily: V.font, color: V.text,
              }} />
          </div>
          <button onClick={() => setShowLoss(true)} style={{
            padding: '8px 20px', background: V.accent, color: V.white, border: 'none', borderRadius: 6,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>Calculate</button>
        </div>
        {showLoss && selected.length > 0 && (
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
            {selected.map(c => {
              const eal = calcEAL(c)
              return (
                <div key={c} style={{ background: V.white, borderRadius: 8, padding: 12, border: `1px solid ${V.bg2}` }}>
                  <div style={{ fontSize: 11, color: V.muted }}>{c}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: V.red, marginTop: 2 }}>
                    <AnimatedNumber target={eal / 1e6} decimals={1} prefix="KES " suffix="M" />
                  </div>
                  <div style={{ fontSize: 10, color: V.muted }}>estimated annual loss</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <TemplateMapping text="Hazard Risk Data (Sheet 4) & Physical Risk Exposures (Sheet 6)" />
    </div>
  )
}

/* ─── Tool 3: OS-Climate ─── */
function OSClimateTool() {
  const scenarios = [
    {
      id: 'nz2050', name: 'Net Zero 2050 (IEA)', color: V.green, icon: '\u{1F331}',
      carbonPrice: [50, 130, 250], gdpImpact: -1.2, strandedRisk: 'High (Short-term)',
      transitionSpeed: 'Rapid', energyMix2050: 'Renewables 85%',
      portfolioEffect: 'High transition cost, low long-term physical risk',
    },
    {
      id: 'delayed', name: 'Delayed Transition', color: V.amber, icon: '\u{23F3}',
      carbonPrice: [15, 60, 200], gdpImpact: -2.5, strandedRisk: 'Very High (Post-2035)',
      transitionSpeed: 'Slow then abrupt', energyMix2050: 'Renewables 55%',
      portfolioEffect: 'Sudden value adjustments after 2035',
    },
    {
      id: 'current', name: 'Current Policies', color: V.red, icon: '\u{1F525}',
      carbonPrice: [10, 20, 35], gdpImpact: -5.8, strandedRisk: 'Low (Transition)',
      transitionSpeed: 'Minimal', energyMix2050: 'Renewables 35%',
      portfolioEffect: 'Severe physical risk exposure, chronic losses',
    },
    {
      id: 'below2', name: 'Below 2\u00B0C', color: V.accent, icon: '\u{1F30D}',
      carbonPrice: [35, 90, 180], gdpImpact: -1.8, strandedRisk: 'Moderate',
      transitionSpeed: 'Steady', energyMix2050: 'Renewables 72%',
      portfolioEffect: 'Balanced transition and physical risk',
    },
  ]
  const [selectedIds, setSelectedIds] = useState<string[]>(['nz2050', 'current'])

  const toggle = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const sel = scenarios.filter(s => selectedIds.includes(s.id))

  return (
    <div>
      <p style={{ fontSize: 13, color: V.muted, marginBottom: 14 }}>
        Compare climate scenarios and their impacts on your portfolio. Select scenarios to compare side by side.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {scenarios.map(s => (
          <button key={s.id} onClick={() => toggle(s.id)} style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: `2px solid ${selectedIds.includes(s.id) ? s.color : V.bg2}`,
            background: selectedIds.includes(s.id) ? s.color + '12' : V.white,
            color: selectedIds.includes(s.id) ? s.color : V.muted, transition: 'all .2s',
          }}>
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      {sel.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(sel.length, 4)}, 1fr)`, gap: 12 }}>
          {sel.map(s => (
            <div key={s.id} style={{
              borderRadius: 12, overflow: 'hidden', border: `2px solid ${s.color}33`,
              background: V.white, animation: 'fadeSlideIn .4s ease',
            }}>
              <div style={{ background: `linear-gradient(135deg, ${s.color}22, ${s.color}08)`, padding: '14px 16px', borderBottom: `1px solid ${s.color}22` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: V.text }}>{s.icon} {s.name}</div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: V.muted, marginBottom: 4 }}>Carbon Price Trajectory ($/tCO2)</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                    {['2025', '2035', '2050'].map((yr, i) => (
                      <div key={yr} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>${s.carbonPrice[i]}</div>
                        <div style={{ color: V.muted }}>{yr}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${V.bg2}`, paddingTop: 12, display: 'grid', gap: 10 }}>
                  {[
                    ['GDP Impact', `${s.gdpImpact}%`],
                    ['Stranded Asset Risk', s.strandedRisk],
                    ['Transition Speed', s.transitionSpeed],
                    ['Energy Mix 2050', s.energyMix2050],
                  ].map(([label, val]) => (
                    <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: V.muted }}>{label}</span>
                      <span style={{ fontWeight: 700, color: V.text, textAlign: 'right', maxWidth: '55%' }}>{val}</span>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 12, padding: '8px 10px', background: `${s.color}08`, borderRadius: 6,
                  fontSize: 10, color: s.color, fontWeight: 500, lineHeight: 1.4, border: `1px solid ${s.color}22`,
                }}>
                  Portfolio: {s.portfolioEffect}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <TemplateMapping text="Transition Risk Exposures & Qualitative Questionnaire" />
    </div>
  )
}

/* ─── Tool 4: 1in1000 ─── */
function SovereignRiskTool() {
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<null | typeof data>(null)

  const data = {
    kenya: { fiscalImpact: 2.4, debtSustain: 62, infraVuln: 3.8, agriGDP: 18.5 },
    peers: [
      { name: 'Tanzania', fiscalImpact: 2.1, debtSustain: 58, infraVuln: 3.5, agriGDP: 23.1 },
      { name: 'Uganda', fiscalImpact: 2.8, debtSustain: 54, infraVuln: 4.1, agriGDP: 21.7 },
      { name: 'Ethiopia', fiscalImpact: 3.2, debtSustain: 48, infraVuln: 4.4, agriGDP: 32.6 },
      { name: 'Rwanda', fiscalImpact: 1.6, debtSustain: 71, infraVuln: 2.9, agriGDP: 24.3 },
    ],
  }

  const run = () => {
    setRunning(true)
    setTimeout(() => { setResults(data); setRunning(false) }, 1800)
  }

  return (
    <div>
      <p style={{ fontSize: 13, color: V.muted, marginBottom: 14 }}>
        Assess Kenya's sovereign climate risk and compare against regional peers.
      </p>
      <button onClick={run} disabled={running} style={{
        padding: '10px 24px',
        background: running ? V.muted : `linear-gradient(135deg, ${V.primary}, #7c3aed)`,
        color: V.white, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: running ? 'wait' : 'pointer',
      }}>
        {running ? 'Loading sovereign data...' : 'Load Kenya Sovereign Risk Dashboard'}
      </button>

      {results && (
        <div style={{ marginTop: 20, animation: 'fadeSlideIn .5s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 18 }}>
            {[
              { label: 'Fiscal Impact of Climate Change', value: results.kenya.fiscalImpact, suffix: '% GDP', color: V.red },
              { label: 'Climate-Adj Debt Sustainability', value: results.kenya.debtSustain, suffix: '/100', color: V.amber },
              { label: 'Infrastructure Vulnerability', value: results.kenya.infraVuln, suffix: '/5', color: V.amber },
              { label: 'Agricultural GDP at Risk', value: results.kenya.agriGDP, suffix: '%', color: V.red },
            ].map(item => (
              <div key={item.label} style={{
                background: `linear-gradient(135deg, ${item.color}08, ${V.white})`,
                borderRadius: 10, padding: 16, border: `1px solid ${item.color}22`,
              }}>
                <div style={{ fontSize: 10, color: V.muted, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>
                  <AnimatedNumber target={item.value} decimals={1} suffix={item.suffix} />
                </div>
                <div style={{ fontSize: 10, color: V.primary, fontWeight: 600, marginTop: 2 }}>Kenya</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: V.text, marginBottom: 10 }}>Regional Peer Comparison</div>
          <div style={{ background: V.white, borderRadius: 10, border: `1px solid ${V.bg2}`, overflow: 'hidden' }}>
            {['Kenya', ...results.peers.map(p => p.name)].map((name, i) => {
              const d = name === 'Kenya' ? results.kenya : results.peers.find(p => p.name === name)!
              const isKenya = name === 'Kenya'
              return (
                <div key={name} style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 1fr', padding: '10px 14px',
                  borderBottom: `1px solid ${V.bg2}`, fontSize: 12,
                  background: isKenya ? `${V.primary}06` : 'transparent',
                }}>
                  <div style={{ fontWeight: isKenya ? 700 : 500, color: isKenya ? V.primary : V.text }}>{name}</div>
                  <div style={{ textAlign: 'center' }}>
                    <ProgressBar value={d.fiscalImpact} max={5} color={V.red} height={6} />
                    <span style={{ fontSize: 10, color: V.muted }}>{d.fiscalImpact}% GDP</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ProgressBar value={d.debtSustain} max={100} color={d.debtSustain > 60 ? V.green : V.amber} height={6} />
                    <span style={{ fontSize: 10, color: V.muted }}>{d.debtSustain}/100</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ProgressBar value={d.infraVuln} max={5} color={V.amber} height={6} />
                    <span style={{ fontSize: 10, color: V.muted }}>{d.infraVuln}/5</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ProgressBar value={d.agriGDP} max={40} color={V.red} height={6} />
                    <span style={{ fontSize: 10, color: V.muted }}>{d.agriGDP}%</span>
                  </div>
                </div>
              )
            })}
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 1fr', padding: '6px 14px', fontSize: 9, color: V.muted, background: V.bg }}>
              <div />
              <div style={{ textAlign: 'center' }}>Fiscal Impact</div>
              <div style={{ textAlign: 'center' }}>Debt Score</div>
              <div style={{ textAlign: 'center' }}>Infra Vuln</div>
              <div style={{ textAlign: 'center' }}>Agri GDP Risk</div>
            </div>
          </div>
          <TemplateMapping text="Climate Risk Materiality Assessment" />
        </div>
      )}
    </div>
  )
}

/* ─── Tool 5: WRI Aqueduct ─── */
function AqueductTool() {
  const [county, setCounty] = useState('Nairobi')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<null | Record<string, { score: number; label: string }>>(null)
  const counties = Object.keys(COUNTY_HAZARDS).sort()

  // Simulate water risk data based on county geography
  const genData = useCallback((c: string) => {
    const aridCounties = ['Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Turkana', 'Isiolo', 'Samburu', 'Tana River']
    const coastalCounties = ['Mombasa', 'Kilifi', 'Kwale', 'Lamu']
    const highlandCounties = ['Nyeri', 'Kiambu', 'Nyandarua', "Murang'a", 'Kirinyaga', 'Embu', 'Meru']
    const lakeCounties = ['Kisumu', 'Siaya', 'Homa Bay', 'Migori', 'Busia']

    let baseStress = 2.5
    let flood = 2.0
    let drought = 2.5
    let seasonal = 2.5
    let groundwater = 2.5

    if (aridCounties.includes(c)) { baseStress = 4.5; drought = 4.8; seasonal = 4.2; groundwater = 4.6; flood = 1.5 }
    else if (coastalCounties.includes(c)) { baseStress = 3.2; flood = 3.8; drought = 3.0; seasonal = 3.5; groundwater = 2.8 }
    else if (highlandCounties.includes(c)) { baseStress = 1.8; flood = 2.5; drought = 1.5; seasonal = 2.0; groundwater = 1.6 }
    else if (lakeCounties.includes(c)) { baseStress = 2.0; flood = 4.2; drought = 1.8; seasonal = 3.0; groundwater = 1.9 }

    // Add some pseudo-random variation using string hash
    const hash = c.split('').reduce((a, ch) => a + ch.charCodeAt(0), 0) % 10
    const jitter = (hash - 5) * 0.08

    const clamp = (v: number) => Math.round(Math.min(5, Math.max(1, v + jitter)) * 10) / 10
    const overall = clamp((baseStress + flood + drought + seasonal + groundwater) / 5)

    const lbl = (v: number) => v <= 1.5 ? 'Very Low' : v <= 2.5 ? 'Low' : v <= 3.5 ? 'Moderate' : v <= 4.5 ? 'High' : 'Very High'

    return {
      'Overall Water Risk': { score: overall, label: lbl(overall) },
      'Baseline Water Stress': { score: clamp(baseStress), label: lbl(clamp(baseStress)) },
      'Flood Risk': { score: clamp(flood), label: lbl(clamp(flood)) },
      'Drought Risk': { score: clamp(drought), label: lbl(clamp(drought)) },
      'Seasonal Variability': { score: clamp(seasonal), label: lbl(clamp(seasonal)) },
      'Groundwater Stress': { score: clamp(groundwater), label: lbl(clamp(groundwater)) },
    }
  }, [])

  const run = () => {
    setLoading(true); setResults(null)
    setTimeout(() => { setResults(genData(county)); setLoading(false) }, 1200)
  }

  const gaugeColor = (score: number) => score <= 2 ? V.green : score <= 3.5 ? V.amber : V.red

  return (
    <div>
      <p style={{ fontSize: 13, color: V.muted, marginBottom: 14 }}>
        Assess water-related risks at the county level. Results inform agricultural lending exposure assessments.
      </p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ fontSize: 11, color: V.muted, display: 'block', marginBottom: 4 }}>Select County</label>
          <select value={county} onChange={e => setCounty(e.target.value)} style={{
            width: '100%', padding: '8px 12px', borderRadius: 6, border: `1px solid ${V.bg2}`,
            fontSize: 13, fontFamily: V.font, color: V.text, background: V.white,
          }}>
            {counties.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={run} disabled={loading} style={{
          padding: '8px 20px', background: loading ? V.muted : V.accent, color: V.white,
          border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
        }}>
          {loading ? 'Fetching...' : 'Assess Water Risk'}
        </button>
      </div>

      {results && (
        <div style={{ animation: 'fadeSlideIn .4s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
            {Object.entries(results).map(([metric, data]) => {
              const clr = gaugeColor(data.score)
              const isOverall = metric === 'Overall Water Risk'
              return (
                <div key={metric} style={{
                  background: isOverall ? `linear-gradient(135deg, ${clr}12, ${V.white})` : V.white,
                  borderRadius: 10, padding: 14, border: `1px solid ${isOverall ? clr + '44' : V.bg2}`,
                  gridColumn: isOverall ? 'span 2' : 'span 1',
                }}>
                  <div style={{ fontSize: 10, color: V.muted, marginBottom: 8 }}>{metric}</div>
                  {/* Circular gauge */}
                  <div style={{ position: 'relative', width: isOverall ? 80 : 56, height: isOverall ? 80 : 56, margin: '0 auto 8px' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle cx="18" cy="18" r="15" fill="none" stroke={V.bg2} strokeWidth="3" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke={clr} strokeWidth="3"
                        strokeDasharray={`${(data.score / 5) * 94.2} 94.2`}
                        strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
                    </svg>
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      fontSize: isOverall ? 16 : 13, fontWeight: 800, color: clr,
                    }}>
                      {data.score}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: clr }}>{data.label}</div>
                </div>
              )
            })}
          </div>
          <div style={{
            marginTop: 14, padding: 12, background: `${V.accent}06`, borderRadius: 8,
            border: `1px solid ${V.accent}22`, fontSize: 11, color: V.muted, lineHeight: 1.5,
          }}>
            <strong style={{ color: V.text }}>Agricultural Lending Exposure:</strong> Counties with high water stress scores (4+)
            indicate elevated risk for crop loan portfolios. Consider adjusting collateral requirements and monitoring frequencies
            for borrowers in {county}.
          </div>
          <TemplateMapping text="Physical Risk Exposures — Environmental Factors" />
        </div>
      )}
    </div>
  )
}

/* ─── Tool 6: WWF Risk Filter ─── */
function BiodiversityTool() {
  const sectors = ['Agriculture', 'Manufacturing', 'Services', 'Mining', 'Real Estate', 'Tourism']
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['Agriculture', 'Mining', 'Manufacturing'])
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<null | Record<string, {
    overall: number; deforestation: number; waterPollution: number; habitatLoss: number; label: string
  }>>(null)

  const toggle = (s: string) => {
    setSelectedSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const sectorData: Record<string, { overall: number; deforestation: number; waterPollution: number; habitatLoss: number; label: string }> = {
    Agriculture: { overall: 4.2, deforestation: 4.8, waterPollution: 3.5, habitatLoss: 4.6, label: 'High' },
    Manufacturing: { overall: 3.0, deforestation: 1.5, waterPollution: 4.2, habitatLoss: 2.8, label: 'Medium' },
    Services: { overall: 1.5, deforestation: 0.5, waterPollution: 1.0, habitatLoss: 1.2, label: 'Low' },
    Mining: { overall: 4.8, deforestation: 4.5, waterPollution: 4.9, habitatLoss: 4.9, label: 'Very High' },
    'Real Estate': { overall: 3.2, deforestation: 3.0, waterPollution: 2.5, habitatLoss: 3.5, label: 'Medium' },
    Tourism: { overall: 3.5, deforestation: 2.8, waterPollution: 2.2, habitatLoss: 3.8, label: 'Medium-High' },
  }

  const run = () => {
    setRunning(true); setResults(null)
    setTimeout(() => {
      const res: typeof results = {}
      selectedSectors.forEach(s => { res![s] = sectorData[s] })
      setResults(res)
      setRunning(false)
    }, 1400)
  }

  const impactColor = (v: number) => v <= 1.5 ? V.green : v <= 3 ? V.amber : v <= 4 ? '#ea580c' : V.red

  return (
    <div>
      <p style={{ fontSize: 13, color: V.muted, marginBottom: 14 }}>
        Screen your lending portfolio for biodiversity and ecosystem impact risks.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {sectors.map(s => (
          <button key={s} onClick={() => toggle(s)} style={{
            padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: `1px solid ${selectedSectors.includes(s) ? V.primary : V.bg2}`,
            background: selectedSectors.includes(s) ? `${V.primary}12` : V.white,
            color: selectedSectors.includes(s) ? V.primary : V.muted, transition: 'all .2s',
          }}>
            {s}
          </button>
        ))}
      </div>
      <button onClick={run} disabled={running || selectedSectors.length === 0} style={{
        padding: '10px 24px',
        background: running ? V.muted : `linear-gradient(135deg, #16a34a, #15803d)`,
        color: V.white, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: running ? 'wait' : 'pointer',
      }}>
        {running ? 'Screening...' : 'Run Biodiversity Screening'}
      </button>

      {results && (
        <div style={{ marginTop: 20, animation: 'fadeSlideIn .5s ease' }}>
          {/* Risk matrix */}
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 12 }}>
              <thead>
                <tr>
                  {['Sector', 'Overall Impact', 'Deforestation', 'Water Pollution', 'Habitat Loss', 'Rating'].map((h, i) => (
                    <th key={h} style={{
                      padding: '8px 12px', background: V.bg2, textAlign: i === 0 ? 'left' : 'center',
                      color: V.text, fontWeight: 700, fontSize: 11,
                      borderRadius: i === 0 ? '8px 0 0 0' : i === 5 ? '0 8px 0 0' : 0,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(results).map(([sector, data]) => (
                  <tr key={sector}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: V.text, borderBottom: `1px solid ${V.bg2}` }}>{sector}</td>
                    {[data.overall, data.deforestation, data.waterPollution, data.habitatLoss].map((val, i) => (
                      <td key={i} style={{ textAlign: 'center', padding: '8px', borderBottom: `1px solid ${V.bg2}` }}>
                        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: impactColor(val) + '18', color: impactColor(val), fontWeight: 800, fontSize: 14,
                            border: `1px solid ${impactColor(val)}33`,
                          }}>
                            {val}
                          </div>
                        </div>
                      </td>
                    ))}
                    <td style={{ textAlign: 'center', padding: '8px', borderBottom: `1px solid ${V.bg2}` }}>
                      <Badge label={data.label} color={impactColor(data.overall)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sector detail cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {Object.entries(results).map(([sector, data]) => (
              <div key={sector} style={{
                background: V.white, borderRadius: 10, padding: 14, border: `1px solid ${V.bg2}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: V.text, marginBottom: 10 }}>{sector}</div>
                {[
                  { label: 'Deforestation Risk', value: data.deforestation },
                  { label: 'Water Pollution', value: data.waterPollution },
                  { label: 'Habitat Loss', value: data.habitatLoss },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: V.muted, marginBottom: 2 }}>
                      <span>{item.label}</span>
                      <span style={{ fontWeight: 700, color: impactColor(item.value) }}>{item.value}/5</span>
                    </div>
                    <ProgressBar value={item.value} max={5} color={impactColor(item.value)} height={5} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <TemplateMapping text="Metrics & Targets, Alignment Metrics" />
        </div>
      )}
    </div>
  )
}

/* ─── Tool Card Definitions ─── */
interface ToolDef {
  id: string
  name: string
  org: string
  icon: string
  category: string
  categoryColor: string
  status: string
  statusColor: string
  statusPulse?: boolean
  description: string
  Component: React.FC
}

const TOOLS: ToolDef[] = [
  {
    id: 'pacta', name: 'PACTA', org: 'RMI', icon: '\u{1F3AF}', category: 'Portfolio Alignment',
    categoryColor: '#7c3aed', status: 'Ready to Connect', statusColor: V.green,
    description: 'Measures lending portfolio alignment against Paris Agreement 2\u00B0C pathways. Analyse your sector allocations and technology mix against climate targets.',
    Component: PACTATool,
  },
  {
    id: 'climada', name: 'CLIMADA', org: 'ETH Zurich', icon: '\u{1F30A}', category: 'Physical Risk Modelling',
    categoryColor: V.accent, status: 'Live Data Available', statusColor: V.green, statusPulse: true,
    description: 'County-level physical hazard risk modelling using CBK official datasets. Explore risk profiles for all 47 Kenyan counties across multiple time horizons.',
    Component: CLIMADATool,
  },
  {
    id: 'osclimate', name: 'OS-Climate', org: 'Linux Foundation', icon: '\u{1F52C}', category: 'Scenario Analysis',
    categoryColor: '#2563eb', status: 'Ready to Connect', statusColor: V.green,
    description: 'Compare climate transition scenarios and understand how different policy pathways impact your portfolio risk exposure and asset values.',
    Component: OSClimateTool,
  },
  {
    id: '1in1000', name: '1in1000 (PRISK)', org: 'CCRI', icon: '\u{1F3DB}\uFE0F', category: 'Sovereign Risk',
    categoryColor: '#9333ea', status: 'Demo Available', statusColor: V.amber,
    description: "Assess Kenya's sovereign climate risk — fiscal impacts, debt sustainability, and infrastructure vulnerability. Compare with regional peers.",
    Component: SovereignRiskTool,
  },
  {
    id: 'aqueduct', name: 'WRI Aqueduct', org: 'World Resources Institute', icon: '\u{1F4A7}', category: 'Water Risk Mapping',
    categoryColor: '#0891b2', status: 'API Connected', statusColor: V.green,
    description: 'Comprehensive water risk assessment at the county level. Evaluate baseline water stress, flood risk, drought risk, and groundwater conditions.',
    Component: AqueductTool,
  },
  {
    id: 'wwf', name: 'WWF Risk Filter', org: 'WWF', icon: '\u{1F33F}', category: 'Biodiversity Screening',
    categoryColor: '#16a34a', status: 'Ready to Connect', statusColor: V.green,
    description: 'Screen lending sectors for biodiversity impact — deforestation, water pollution, and habitat loss exposure per industry.',
    Component: BiodiversityTool,
  },
]

/* ─── Main Page ─── */
export default function ToolsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggle = (id: string) => setExpandedId(prev => prev === id ? null : id)

  return (
    <AuthGate>
      <style>{`
        @keyframes statusPulse {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,.5); }
          70% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        input[type=range]::-webkit-slider-thumb { cursor: pointer; }
        select:focus, input:focus { outline: 2px solid ${V.accent}66; outline-offset: 1px; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: V.bg, fontFamily: V.font, color: V.text,
      }}>
        {/* Back to Dashboard */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 100, padding: '10px 24px',
          background: 'rgba(248,250,252,.85)', backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${V.bg2}`,
        }}>
          <Link href="/dashboard" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: V.primary, textDecoration: 'none',
            padding: '4px 0',
          }}>
            <span style={{ fontSize: 16 }}>{'\u2190'}</span> Back to Dashboard
          </Link>
        </div>

        {/* Hero */}
        <div style={{
          padding: '48px 24px 40px', textAlign: 'center',
          background: `linear-gradient(135deg, ${V.primary}08, ${V.accent}06, ${V.bg})`,
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h1 style={{
              fontSize: 32, fontWeight: 800, color: V.text, margin: 0, lineHeight: 1.2,
              letterSpacing: -0.5,
            }}>
              Tools & Integrations
            </h1>
            <p style={{
              fontSize: 16, color: V.muted, marginTop: 12, lineHeight: 1.6,
            }}>
              Connect to leading open-source climate risk engines. Run analyses directly from your dashboard
              and auto-populate CBK CRDF templates.
            </p>
            <div style={{
              display: 'inline-flex', gap: 24, marginTop: 20, fontSize: 12, color: V.muted,
            }}>
              <span><strong style={{ color: V.text }}>6</strong> Integrations</span>
              <span><strong style={{ color: V.green }}>3</strong> Live</span>
              <span><strong style={{ color: V.amber }}>1</strong> Demo</span>
              <span><strong style={{ color: V.primary }}>2</strong> Ready</span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TOOLS.map(tool => {
              const expanded = expandedId === tool.id
              const hovered = hoveredId === tool.id
              return (
                <div key={tool.id} style={{
                  borderRadius: 14, overflow: 'hidden',
                  border: `1px solid ${expanded ? V.primary + '44' : hovered ? V.primary + '22' : V.bg2}`,
                  background: V.white,
                  boxShadow: expanded
                    ? `0 8px 32px ${V.primary}12, 0 2px 8px rgba(0,0,0,.04)`
                    : hovered
                      ? '0 4px 16px rgba(0,0,0,.06)'
                      : '0 1px 4px rgba(0,0,0,.03)',
                  transition: 'all .3s ease',
                }}>
                  {/* Card Header */}
                  <div
                    onClick={() => toggle(tool.id)}
                    onMouseEnter={() => setHoveredId(tool.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      padding: '18px 22px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: expanded ? `linear-gradient(135deg, ${V.primary}04, transparent)` : 'transparent',
                      transition: 'background .3s',
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 22,
                      background: `${tool.categoryColor}10`, border: `1px solid ${tool.categoryColor}22`,
                      flexShrink: 0,
                    }}>
                      {tool.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: V.text }}>{tool.name}</span>
                        <span style={{ fontSize: 11, color: V.muted }}>by {tool.org}</span>
                        <Badge label={tool.category} color={tool.categoryColor} />
                      </div>
                      <div style={{ fontSize: 12, color: V.muted, marginTop: 3, lineHeight: 1.4 }}>
                        {tool.description}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                      <StatusDot status={tool.status} color={tool.statusColor} pulse={tool.statusPulse} />
                      <div style={{
                        width: 28, height: 28, borderRadius: 8, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        background: expanded ? `${V.primary}10` : V.bg,
                        color: expanded ? V.primary : V.muted,
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'all .3s ease', fontSize: 14, fontWeight: 700,
                      }}>
                        {'\u25BC'}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Demo Area */}
                  <div style={{
                    maxHeight: expanded ? 2000 : 0,
                    opacity: expanded ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height .5s ease, opacity .4s ease',
                  }}>
                    <div style={{
                      padding: '0 22px 22px',
                      borderTop: `1px solid ${V.bg2}`,
                    }}>
                      <div style={{
                        marginTop: 18, padding: 20, background: V.bg, borderRadius: 10,
                        border: `1px solid ${V.bg2}`,
                      }}>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14,
                          padding: '4px 10px', borderRadius: 6, background: `${tool.categoryColor}10`,
                          fontSize: 11, fontWeight: 600, color: tool.categoryColor,
                        }}>
                          Interactive Demo
                        </div>
                        <tool.Component />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AuthGate>
  )
}
