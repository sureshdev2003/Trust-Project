import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sessionToken } = await request.json();

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Session token is required", isValid: false },
        { status: 401 }
      );
    }

    // In a real app, you'd verify the token against a database
    // For now, we just check if it exists
    const isValid = sessionToken.length > 0;

    return NextResponse.json({
      isValid,
      message: isValid ? "Session valid" : "Session invalid",
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Internal server error", isValid: false },
      { status: 500 }
    );
  }
}
