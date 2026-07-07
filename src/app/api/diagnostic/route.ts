import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";
import { syncDiagnosticToNotion } from "@/lib/notion";

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
  // Optional values supplied by the interactive 6-pillar diagnostic client.
  readinessScore?: number;
  overallRag?: string;
  answeredCount?: number;
  totalQuestions?: number;
  pillars?: { name: string; score: number; rag: string; answered: number; total: number }[];
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

    // Prefer the score computed by the interactive client (0–100); otherwise
    // fall back to the field-based calculation.
    const readinessScore =
      typeof body.readinessScore === "number" && !Number.isNaN(body.readinessScore)
        ? Math.max(0, Math.min(100, Math.round(body.readinessScore)))
        : calculateReadinessScore(body);

    // Build a human-readable summary from the pillar breakdown, if provided.
    let additionalInfo = body.additionalInfo ?? null;
    if (body.pillars && body.pillars.length > 0) {
      const parts: string[] = [];
      if (body.overallRag) parts.push(`Overall RAG: ${body.overallRag}`);
      if (typeof body.answeredCount === "number" && typeof body.totalQuestions === "number") {
        parts.push(`Answered ${body.answeredCount}/${body.totalQuestions}`);
      }
      const pillarText = body.pillars
        .map((p) => `${p.name} ${Number(p.score).toFixed(1)}/5 (${p.rag})`)
        .join("; ");
      const summary = `${parts.join(" · ")}${parts.length ? " · " : ""}${pillarText}`;
      additionalInfo = additionalInfo ? `${additionalInfo}\n${summary}` : summary;
    }

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
        additionalInfo,
        readinessScore,
      },
    });

    // Mirror the completed diagnostic to Notion (no-op unless configured)
    await syncDiagnosticToNotion({
      institutionName,
      contactName,
      email,
      institutionType,
      role,
      readinessScore,
      additionalInfo,
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
