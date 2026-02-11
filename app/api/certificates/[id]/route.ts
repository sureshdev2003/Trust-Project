import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ⬅️ You MUST await params in Next.js 15
  const { id } = await context.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json(
      { error: "Invalid certificate ID" },
      { status: 400 }
    );
  }

  try {
    await db.delete(certificates).where(eq(certificates.id, numericId));

    return NextResponse.json({
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
