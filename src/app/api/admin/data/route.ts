export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json(
        { error: "Not authorised. Sign in with an administrator account." },
        { status: 403 }
      );
    }

    const prisma = getPrismaClient();
    const [users, diagnostics, inquiries] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          organisation: true,
          organisationType: true,
          jobTitle: true,
          phone: true,
          cbkTier: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.diagnostic.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    return NextResponse.json({
      admin: { name: admin.name, email: admin.email },
      counts: {
        users: users.length,
        diagnostics: diagnostics.length,
        inquiries: inquiries.length,
      },
      users,
      diagnostics,
      inquiries,
    });
  } catch (error) {
    console.error("[Admin data error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
