export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (sessionToken) {
      const prisma = getPrismaClient();

      // Delete the session from DB
      await prisma.session.deleteMany({
        where: { token: sessionToken },
      });
    }

    // Clear the cookie
    cookieStore.set("session_token", "", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 0,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
