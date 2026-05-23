import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimiting";
import { runAudit } from "@/services/audit/runAudit";
import { generateSummary } from "@/services/generateSummary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tools, useCase, teamSize, isPublic } = await req.json();

    const auditResult = runAudit(tools, useCase);

    const ipAddress: string = req.headers.get("x-forwarded-for") ?? "";

    const { success, remaining, resetIn } = await rateLimit(ipAddress);

    if (!success) {
      return NextResponse.json(
        {
          message: `Limit exceeded. You can audit only 5 times per hour. Try again in ${Math.ceil(resetIn / 60)} minutes`,
          remaining,
          resetIn,
        },
        {
          status: 429,
        },
      );
    }

    const summary = await generateSummary(auditResult, useCase);

    const auditSave = await prisma.audit.create({
      data: {
        teamSize,
        useCase,
        tools,
        isPublic,
        results: JSON.parse(
          JSON.stringify({
            auditResult,
            summary,
          }),
        ),
        totalMonthlySavings: Math.round(auditResult.totalMonthlySavings),
        totalAnnualSavings: Math.round(auditResult.totalAnnualSavings),
      },
    });

    return NextResponse.json(
      {
        success: true,
        share_id: auditSave.shareId,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      {
        message,
      },
      {
        status: 500,
      },
    );
  }
}
