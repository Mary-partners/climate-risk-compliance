import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/prisma";

// Emails allowed to view the admin dashboard. Overridable via the ADMIN_EMAILS
// env var (comma-separated); defaults to the C&E leads so no setup is required.
const DEFAULT_ADMINS = [
  "mary@cfolead.solutions",
  "stephen.mutimba@eclimateadvisory.com",
];

export function getAdminEmails(): string[] {
  const fromEnv = process.env.ADMIN_EMAILS;
  const list = fromEnv ? fromEnv.split(",") : DEFAULT_ADMINS;
  return list.map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

/**
 * Returns the currently authenticated user if — and only if — they are an
 * admin. Returns null for anonymous, expired, or non-admin sessions.
 */
export async function getAdminUser() {
  const token = cookies().get("session_token")?.value;
  if (!token) return null;

  const prisma = getPrismaClient();
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) return null;
  if (!isAdminEmail(session.user.email)) return null;

  return session.user;
}
