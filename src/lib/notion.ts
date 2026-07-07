// Optional Notion mirror. When NOTION_TOKEN and the relevant database IDs are set
// as environment variables, new accounts, diagnostics, and inquiries are copied
// into Notion databases. If the variables are not set, every function is a safe
// no-op, so the site works with or without Notion configured.

const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_VERSION = "2022-06-28"

type NotionValue = Record<string, unknown>

const title = (v?: string | null) => ({ title: [{ text: { content: (v || "—").slice(0, 2000) } }] })
const rich = (v?: string | null) => ({ rich_text: v ? [{ text: { content: v.slice(0, 2000) } }] : [] })
const email = (v?: string | null) => ({ email: v || null })
const phone = (v?: string | null) => ({ phone_number: v || null })
const num = (v?: number | null) => ({ number: v == null || Number.isNaN(v) ? null : v })
const date = (v: string) => ({ date: { start: v } })

async function createNotionPage(databaseId: string | undefined, properties: Record<string, NotionValue>) {
  if (!NOTION_TOKEN || !databaseId) return // Notion not configured — do nothing.
  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
    })
    if (!res.ok) {
      const detail = await res.text()
      console.error("[Notion] create page failed", res.status, detail.slice(0, 400))
    }
  } catch (error) {
    console.error("[Notion] request error", error)
  }
}

export interface AccountRecord {
  name?: string | null
  email: string
  organisation?: string | null
  organisationType?: string | null
  jobTitle?: string | null
  phone?: string | null
  cbkTier?: string | null
  role?: string | null
}

export async function syncAccountToNotion(u: AccountRecord) {
  await createNotionPage(process.env.NOTION_ACCOUNTS_DB_ID, {
    Name: title(u.name || u.email),
    Email: email(u.email),
    Organisation: rich(u.organisation),
    "Organisation type": rich(u.organisationType),
    "Job title": rich(u.jobTitle),
    Phone: phone(u.phone),
    "CBK tier": rich(u.cbkTier),
    Role: rich(u.role),
    "Signed up": date(new Date().toISOString()),
  })
}

export interface DiagnosticRecord {
  institutionName: string
  contactName: string
  email: string
  institutionType: string
  role: string
  readinessScore?: number | null
  additionalInfo?: string | null
}

export async function syncDiagnosticToNotion(d: DiagnosticRecord) {
  await createNotionPage(process.env.NOTION_DIAGNOSTICS_DB_ID, {
    Institution: title(d.institutionName),
    Contact: rich(d.contactName),
    Email: email(d.email),
    "Institution type": rich(d.institutionType),
    Role: rich(d.role),
    "Readiness score": num(d.readinessScore),
    Summary: rich(d.additionalInfo),
    Completed: date(new Date().toISOString()),
  })
}

export interface InquiryRecord {
  name: string
  email: string
  organisation?: string | null
  organisationType?: string | null
  biggestChallenge?: string | null
  additionalNotes?: string | null
}

export async function syncInquiryToNotion(i: InquiryRecord) {
  await createNotionPage(process.env.NOTION_INQUIRIES_DB_ID, {
    Name: title(i.name),
    Email: email(i.email),
    Organisation: rich(i.organisation),
    "Organisation type": rich(i.organisationType),
    Challenge: rich(i.biggestChallenge),
    Notes: rich(i.additionalNotes),
    Submitted: date(new Date().toISOString()),
  })
}
