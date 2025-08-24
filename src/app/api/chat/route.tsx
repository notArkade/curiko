import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    // Add therapist-style system prompt
    const systemPrompt = `You are an empathetic AI therapist. 
    Your role is to listen calmly, validate the user’s feelings, 
    and respond with warmth, support, and gentle coping strategies. 
    Avoid sounding robotic or overly clinical — keep it natural and conversational.`;

    // Combine system prompt with user input
    const input = `${systemPrompt}\n\nUser: ${message}`;

    // Call Gemini
    const result = await model.generateContent(input);

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
