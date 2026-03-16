import { NextRequest, NextResponse } from "next/server";

declare global {
  var otpStore: Record<string, { otp: string; expiresAt: number }> | undefined;
}
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();


    global.otpStore = global.otpStore || {};
    global.otpStore[email] = {
      otp: mockOtp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
