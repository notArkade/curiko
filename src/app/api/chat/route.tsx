import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Just pass the string directly
    const result = await model.generateContent(message);

    // Extract text safely
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: "Failed to connect to Gemini" },
      { status: 500 }
    );
  }
}
