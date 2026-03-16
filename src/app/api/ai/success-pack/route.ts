import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const successPack = {
      coverLetter:
        "Professional cover letter template with personalized content...",
      interviewQuestions: [
        "Tell me about yourself",
        "What are your strengths and weaknesses?",
        "Why do you want to work here?",
      ],
      followUpEmail: "Thank you for the interview opportunity...",
      salaryNegotiationTips: [
        "Research market rates",
        "Know your worth",
        "Practice your pitch",
      ],
    };

    return NextResponse.json(successPack);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate success pack" },
      { status: 500 },
    );
  }
}
