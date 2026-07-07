import React from 'react'

const pillars = [
  { name: 'Governance & Oversight', score: 72, rag: '#16a34a' },
  { name: 'Strategy & Planning', score: 58, rag: '#d97706' },
  { name: 'Risk Management', score: 41, rag: '#dc2626' },
  { name: 'Metrics & Targets', score: 64, rag: '#d97706' },
  { name: 'Data Infrastructure', score: 38, rag: '#dc2626' },
  { name: 'Taxonomy & Classification', score: 70, rag: '#16a34a' },
]

// Donut geometry for the overall score
const R = 52
const C = 2 * Math.PI * R
const overall = 57
const offset = C * (1 - overall / 100)

const DashboardMockup: React.FC = () => {
  return (
    <div className="relative">
      {/* floating accent behind the card */}
      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold-400/20 to-navy-500/10 blur-xl" aria-hidden="true" />
      <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-ink-100 bg-cream-50">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="ml-3 text-[11px] font-medium text-ink-500">
            Climate Risk Readiness Diagnostic
          </span>
        </div>

        <div className="p-5 md:p-6">
          {/* top: score gauge + summary */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative flex-shrink-0">
              <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
                <circle cx="60" cy="60" r={R} fill="none" stroke="#e7eaf0" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r={R}
                  fill="none"
                  stroke="#c28f22"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-serif text-navy-900">{overall}%</span>
                <span className="text-[10px] uppercase tracking-wide text-ink-400">Readiness</span>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-signal-amber-50 px-2.5 py-1 text-[11px] font-semibold text-signal-amber-700 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-amber-500" />
                Developing — Amber
              </div>
              <p className="text-sm text-ink-600 leading-snug">
                Assessed across 6 pillars and 36 questions, benchmarked to CBK CRDF and IFRS S1/S2.
              </p>
            </div>
          </div>

          {/* pillar bars */}
          <div className="space-y-3">
            {pillars.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.rag }} />
                    <span className="text-xs font-medium text-ink-700">{p.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-500">{p.score}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-ink-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.score}%`, backgroundColor: p.rag }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between text-[11px] text-ink-400">
            <span>RAG gap analysis</span>
            <span>90-day action plan ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMockup
