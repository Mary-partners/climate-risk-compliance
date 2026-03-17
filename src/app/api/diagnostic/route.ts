import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface DiagnosticPayload {
  institutionName: string;
  contactName: string;
  email: string;
  role: string;
  institutionType: string;
  totalAssets?: string;
  borrowerCount?: string;
  hasEsgTeam?: string;
  hasSubmittedReports?: string;
  collectsClimateData?: string;
  kgftClassified?: string;
  pcafMeasured?: string;
  frameworks?: string[];
  pressingDeadline?: string;
  topChallenges?: string[];
  additionalInfo?: string;
}

function calculateReadinessScore(data: DiagnosticPayload): number {
  let score = 0;

  if (data.hasEsgTeam === "Yes") score += 20;
  else if (data.hasEsgTeam === "Planning to hire") score += 10;

  if (data.hasSubmittedReports === "Yes") score += 20;
  else if (data.hasSubmittedReports === "In progress") score += 10;

  if (data.collectsClimateData === "Yes systematically") score += 20;
  else if (data.collectsClimateData === "Yes partially") score += 10;

  if (data.kgftClassified === "Yes fully") score += 20;
  else if (data.kgftClassified === "Partially") score += 10;

  if (data.pcafMeasured === "Yes") score += 20;
  else if (data.pcafMeasured === "In progress") score += 10;

  return score;
}

export async function POST(request: NextRequest) {
  try {
    const body: DiagnosticPayload = await request.json();

    const { institutionName, contactName, email, role, institutionType } = body;

    // Validate required fields
    const missing: string[] = [];
    if (!institutionName) missing.push("institutionName");
    if (!contactName) missing.push("contactName");
    if (!email) missing.push("email");
    if (!role) missing.push("role");
    if (!institutionType) missing.push("institutionType");

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    const readinessScore = calculateReadinessScore(body);

    // Save to database
    const prisma = getPrismaClient();
    await prisma.diagnostic.create({
      data: {
        institutionName,
        contactName,
        email,
        role,
        institutionType,
        totalAssets: body.totalAssets ?? null,
        borrowerCount: body.borrowerCount ?? null,
        hasEsgTeam: body.hasEsgTeam ?? null,
        hasSubmittedReports: body.hasSubmittedReports ?? null,
        collectsClimateData: body.collectsClimateData ?? null,
        kgftClassified: body.kgftClassified ?? null,
        pcafMeasured: body.pcafMeasured ?? null,
        frameworks: body.frameworks ?? [],
        pressingDeadline: body.pressingDeadline ?? null,
        topChallenges: body.topChallenges ?? [],
        additionalInfo: body.additionalInfo ?? null,
        readinessScore,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Diagnostic received",
      readinessScore,
    });
  } catch (error) {
    console.error("[Diagnostic Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
