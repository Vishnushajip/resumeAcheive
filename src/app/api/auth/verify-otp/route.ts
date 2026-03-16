import { NextRequest, NextResponse } from "next/server";

declare global {
  var otpStore: Record<string, { otp: string; expiresAt: number }> | undefined;
}

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 },
      );
    }

    global.otpStore = global.otpStore || {};
    const storedOtp = global.otpStore[email];

    if (!storedOtp) {
      return NextResponse.json(
        { error: "OTP not found or expired" },
        { status: 400 },
      );
    }

    if (Date.now() > storedOtp.expiresAt) {
      delete global.otpStore[email];
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (storedOtp.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const userId = email.replace(/[^a-zA-Z0-9]/g, "");
    const token = `token_${userId}_${Date.now()}`;

    delete global.otpStore[email];

    return NextResponse.json({
      token,
      user: {
        email,
        id: userId,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 },
    );
  }
}
