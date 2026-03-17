import { NextRequest, NextResponse } from "next/server";

interface InquiryPayload {
  name: string;
  email: string;
  organisation: string;
  organisationType: string;
  journeyStage?: string;
  biggestChallenge?: string;
  additionalNotes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: InquiryPayload = await request.json();

    const { name, email, organisation, organisationType } = body;

    // Validate required fields
    const missing: string[] = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!organisation) missing.push("organisation");
    if (!organisationType) missing.push("organisationType");

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

    // Log for now; Prisma DB insert will replace this when DATABASE_URL is configured
    console.log("[Inquiry Received]", {
      name,
      email,
      organisation,
      organisationType,
      journeyStage: body.journeyStage ?? null,
      biggestChallenge: body.biggestChallenge ?? null,
      additionalNotes: body.additionalNotes ?? null,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully",
    });
  } catch (error) {
    console.error("[Inquiry Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
