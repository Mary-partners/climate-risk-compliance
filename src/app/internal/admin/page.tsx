'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

interface UserRow {
  id: string
  name: string | null
  email: string
  organisation: string | null
  organisationType: string | null
  jobTitle: string | null
  phone: string | null
  cbkTier: string | null
  role: string
  createdAt: string
}
interface DiagnosticRow {
  id: string
  institutionName: string
  contactName: string
  email: string
  role: string
  institutionType: string
  readinessScore: number | null
  additionalInfo: string | null
  createdAt: string
}
interface InquiryRow {
  id: string
  name: string
  email: string
  organisation: string
  organisationType: string
  biggestChallenge: string | null
  additionalNotes: string | null
  createdAt: string
}
interface AdminData {
  admin: { name: string | null; email: string }
  counts: { users: number; diagnostics: number; inquiries: number }
  users: UserRow[]
  diagnostics: DiagnosticRow[]
  inquiries: InquiryRow[]
}

type Column<T> = { label: string; get: (row: T) => string | number | null | undefined }

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function toCsv<T>(rows: T[], cols: Column<T>[]): string {
  const esc = (v: unknown) => `"${(v == null ? '' : String(v)).replace(/"/g, '""')}"`
  const header = cols.map((c) => esc(c.label)).join(',')
  const body = rows.map((r) => cols.map((c) => esc(c.get(r))).join(',')).join('\n')
  return `${header}\n${body}`
}

function download(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function scoreClasses(score: number | null): string {
  if (score == null) return 'bg-ink-100 text-ink-500'
  if (score < 40) return 'bg-red-100 text-red-700'
  if (score < 70) return 'bg-amber-100 text-amber-700'
  return 'bg-green-100 text-green-700'
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'forbidden' | 'error'>('loading')
  const [tab, setTab] = useState<'users' | 'diagnostics' | 'inquiries'>('users')

  useEffect(() => {
    fetch('/api/admin/data')
      .then(async (res) => {
        if (res.status === 403) {
          setStatus('forbidden')
          return
        }
        if (!res.ok) {
          setStatus('error')
          return
        }
        setData(await res.json())
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [])

  const userCols: Column<UserRow>[] = useMemo(
    () => [
      { label: 'Name', get: (r) => r.name },
      { label: 'Email', get: (r) => r.email },
      { label: 'Organisation', get: (r) => r.organisation },
      { label: 'Type', get: (r) => r.organisationType },
      { label: 'Job title', get: (r) => r.jobTitle },
      { label: 'Phone', get: (r) => r.phone },
      { label: 'CBK tier', get: (r) => r.cbkTier },
      { label: 'Role', get: (r) => r.role },
      { label: 'Joined', get: (r) => fmtDate(r.createdAt) },
    ],
    []
  )
  const diagCols: Column<DiagnosticRow>[] = useMemo(
    () => [
      { label: 'Institution', get: (r) => r.institutionName },
      { label: 'Contact', get: (r) => r.contactName },
      { label: 'Email', get: (r) => r.email },
      { label: 'Type', get: (r) => r.institutionType },
      { label: 'Role', get: (r) => r.role },
      { label: 'Readiness score', get: (r) => r.readinessScore },
      { label: 'Summary', get: (r) => r.additionalInfo },
      { label: 'Completed', get: (r) => fmtDate(r.createdAt) },
    ],
    []
  )
  const inqCols: Column<InquiryRow>[] = useMemo(
    () => [
      { label: 'Name', get: (r) => r.name },
      { label: 'Email', get: (r) => r.email },
      { label: 'Organisation', get: (r) => r.organisation },
      { label: 'Type', get: (r) => r.organisationType },
      { label: 'Challenge', get: (r) => r.biggestChallenge },
      { label: 'Notes', get: (r) => r.additionalNotes },
      { label: 'Submitted', get: (r) => fmtDate(r.createdAt) },
    ],
    []
  )

  if (status === 'loading') {
    return (
      <Centered>
        <div className="h-8 w-8 border-2 border-navy-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-ink-500">Loading submissions…</p>
      </Centered>
    )
  }

  if (status === 'forbidden') {
    return (
      <Centered>
        <h1 className="text-2xl font-serif font-bold text-navy-900 mb-3">Administrator access required</h1>
        <p className="text-ink-600 mb-6 max-w-md">
          This dashboard is restricted. Please sign in with an authorised administrator account
          (for example, <strong>mary@cfolead.solutions</strong>) to view submissions.
        </p>
        <Link
          href="/auth"
          className="inline-flex items-center rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold px-6 py-3 transition-colors"
        >
          Go to sign in
        </Link>
      </Centered>
    )
  }

  if (status === 'error' || !data) {
    return (
      <Centered>
        <h1 className="text-2xl font-serif font-bold text-navy-900 mb-3">Something went wrong</h1>
        <p className="text-ink-600 mb-6">We could not load the submissions. Please try again.</p>
        <button
          onClick={() => location.reload()}
          className="inline-flex items-center rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold px-6 py-3 transition-colors"
        >
          Retry
        </button>
      </Centered>
    )
  }

  const tabs = [
    { key: 'users' as const, label: 'Accounts', count: data.counts.users },
    { key: 'diagnostics' as const, label: 'Diagnostics', count: data.counts.diagnostics },
    { key: 'inquiries' as const, label: 'Inquiries', count: data.counts.inquiries },
  ]

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="bg-navy-950 text-white">
        <div className="max-w-screen-2xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-bold">C&amp;E Advisory</span>
              <span className="text-xs uppercase tracking-wider text-gold-300">Admin</span>
            </div>
            <p className="text-sm text-white/60">Submissions &amp; sign-ups</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70 hidden sm:inline">
              {data.admin.name || data.admin.email}
            </span>
            <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
              View site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {tabs.map((t) => (
            <div key={t.key} className="rounded-xl bg-white border border-ink-200 p-6">
              <p className="text-sm text-ink-500 mb-1">{t.label}</p>
              <p className="text-4xl font-serif font-bold text-navy-900">{t.count}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-ink-200 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                tab === t.key
                  ? 'border-gold-500 text-navy-900'
                  : 'border-transparent text-ink-500 hover:text-navy-800'
              }`}
            >
              {t.label} <span className="text-ink-400">({t.count})</span>
            </button>
          ))}
        </div>

        {tab === 'users' && (
          <TableCard
            title="Accounts"
            onExport={() => download('ce-accounts.csv', toCsv(data.users, userCols))}
            empty={data.users.length === 0}
            emptyText="No accounts yet. Sign-ups will appear here."
            columns={userCols.map((c) => c.label)}
          >
            {data.users.map((r) => (
              <tr key={r.id} className="border-t border-ink-100 hover:bg-cream-50">
                <Td>{r.name || '—'}</Td>
                <Td>{r.email}</Td>
                <Td>{r.organisation || '—'}</Td>
                <Td>{r.organisationType || '—'}</Td>
                <Td>{r.jobTitle || '—'}</Td>
                <Td>{r.phone || '—'}</Td>
                <Td>{r.cbkTier || '—'}</Td>
                <Td>{r.role}</Td>
                <Td>{fmtDate(r.createdAt)}</Td>
              </tr>
            ))}
          </TableCard>
        )}

        {tab === 'diagnostics' && (
          <TableCard
            title="Diagnostics"
            onExport={() => download('ce-diagnostics.csv', toCsv(data.diagnostics, diagCols))}
            empty={data.diagnostics.length === 0}
            emptyText="No completed diagnostics yet. Results will appear here once institutions finish the assessment."
            columns={diagCols.map((c) => c.label)}
          >
            {data.diagnostics.map((r) => (
              <tr key={r.id} className="border-t border-ink-100 hover:bg-cream-50 align-top">
                <Td>{r.institutionName}</Td>
                <Td>{r.contactName}</Td>
                <Td>{r.email}</Td>
                <Td>{r.institutionType}</Td>
                <Td>{r.role}</Td>
                <Td>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${scoreClasses(r.readinessScore)}`}>
                    {r.readinessScore == null ? '—' : `${r.readinessScore}%`}
                  </span>
                </Td>
                <Td className="max-w-md whitespace-normal text-xs text-ink-500">
                  {r.additionalInfo || '—'}
                </Td>
                <Td>{fmtDate(r.createdAt)}</Td>
              </tr>
            ))}
          </TableCard>
        )}

        {tab === 'inquiries' && (
          <TableCard
            title="Inquiries"
            onExport={() => download('ce-inquiries.csv', toCsv(data.inquiries, inqCols))}
            empty={data.inquiries.length === 0}
            emptyText="No inquiries yet."
            columns={inqCols.map((c) => c.label)}
          >
            {data.inquiries.map((r) => (
              <tr key={r.id} className="border-t border-ink-100 hover:bg-cream-50 align-top">
                <Td>{r.name}</Td>
                <Td>{r.email}</Td>
                <Td>{r.organisation}</Td>
                <Td>{r.organisationType}</Td>
                <Td className="max-w-xs whitespace-normal">{r.biggestChallenge || '—'}</Td>
                <Td className="max-w-xs whitespace-normal">{r.additionalNotes || '—'}</Td>
                <Td>{fmtDate(r.createdAt)}</Td>
              </tr>
            ))}
          </TableCard>
        )}
      </main>
    </div>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-6">
      <div className="text-center">{children}</div>
    </div>
  )
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-sm text-ink-700 ${className}`}>{children}</td>
}

function TableCard({
  title,
  onExport,
  empty,
  emptyText,
  columns,
  children,
}: {
  title: string
  onExport: () => void
  empty: boolean
  emptyText: string
  columns: string[]
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-white border border-ink-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink-200 bg-cream-50">
        <h2 className="text-sm font-semibold text-navy-900">{title}</h2>
        {!empty && (
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold px-3 py-2 transition-colors"
          >
            Export CSV
          </button>
        )}
      </div>
      {empty ? (
        <p className="px-4 py-12 text-center text-sm text-ink-500">{emptyText}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-cream-50">
                {columns.map((c) => (
                  <th
                    key={c}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500 whitespace-nowrap"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}
