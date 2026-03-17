export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      name,
      organisation,
      organisationType,
      jobTitle,
      phone,
      cbkTier,
    } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const prisma = getPrismaClient();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Create user
    const hashedPassword = hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name: name || null,
        organisation: organisation || null,
        organisationType: organisationType || null,
        jobTitle: jobTitle || null,
        phone: phone || null,
        cbkTier: cbkTier || null,
      },
    });

    // Create session
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    });

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
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
