import { prisma } from "@/lib/prisma";
import {  NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shareId: string }> },
) {
  try {
    const { shareId } = await params;
    console.log(shareId);

    const audit = await prisma.audit.findUnique({
      where: {
        shareId,
      },
    });

    if (!audit) {
      return NextResponse.json(
        {
          message: "Audit not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        audit,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
