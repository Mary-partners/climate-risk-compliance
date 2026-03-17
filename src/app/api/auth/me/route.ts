export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const prisma = getPrismaClient();

    // Find session and check expiry
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      // Clean up expired session if it exists
      if (session) {
        await prisma.session.delete({
          where: { id: session.id },
        });
      }

      return NextResponse.json(
        { error: "Session expired or invalid" },
        { status: 401 }
      );
    }

    const user = session.user;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        organisation: user.organisation,
        organisationType: user.organisationType,
        jobTitle: user.jobTitle,
        phone: user.phone,
        cbkTier: user.cbkTier,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
