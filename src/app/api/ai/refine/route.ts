import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { section, content } = await request.json();

    if (!section || !content) {
      return NextResponse.json(
        { error: "Section and content are required" },
        { status: 400 },
      );
    }

    const refinedContent = `Refined ${section}: ${content} (enhanced with AI suggestions)`;

    return NextResponse.json({
      refinedContent,
      suggestions: [
        "Use action verbs",
        "Include quantifiable results",
        "Keep it concise and impactful",
      ],
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to refine content" },
      { status: 500 },
    );
  }
}
