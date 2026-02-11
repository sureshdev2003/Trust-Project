import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { admin } from "@/drizzle/schema";
import { verifyPassword, generateSessionToken } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Get admin from database
    const adminUser = await db.select().from(admin).limit(1);

    if (adminUser.length === 0) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    // Verify password
    const isValid = verifyPassword(password, adminUser[0].passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = generateSessionToken();

    return NextResponse.json({
      success: true,
      sessionToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
