import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// AIインストラクション設定を読み込む
const instructionsPath = path.join(process.cwd(), 'config', 'instructions.json');
const instructionsConfig = JSON.parse(
  fs.readFileSync(instructionsPath, 'utf-8')
);

export async function GET() {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "shimmer",
          instructions: instructionsConfig.instructions,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}