import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, company, role, teamSize, auditId } = await req.json();

    if (!email || !auditId) {
      return NextResponse.json(
        { message: "Email and auditId are required" },
        { status: 400 },
      );
    }

    const audit = await prisma.audit.findUnique({
      where: { id: auditId },
    });

    if (!audit) {
      return NextResponse.json({ message: "Audit not found" }, { status: 404 });
    }

    const lead = await prisma.lead.create({
      data: {
        email,
        company,
        role,
        teamSize,
        auditId,
      },
    });

    await resend.emails.send({
      from: "SpendWise <onboarding@resend.dev>",
      to: email,
      subject: "Your AI Spend Audit Report",
      html: `
        <h2>Your AI Spend Audit is Ready</h2>
        <p>Hi${role ? ` ${role}` : ""},</p>
        <p>Your audit shows a potential saving of <strong>$${audit.totalMonthlySavings}/month</strong> ($${audit.totalAnnualSavings}/year).</p>
        ${
          audit.totalMonthlySavings > 500
            ? `<p>Given your significant savings opportunity, a Credex advisor will reach out shortly to help you capture these savings through discounted AI credits.</p>`
            : `<p>We'll notify you when new optimizations apply to your stack.</p>`
        }
        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/audit/${audit.shareId}">View your full report</a></p>
        <br/>
        <p>— Credex Team</p>
      `,
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
