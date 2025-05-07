import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// AIインストラクション設定を読み込む
const instructionsPath = path.join(process.cwd(), 'public', 'config', 'instructions.json');
const instructionsConfig = JSON.parse(
  fs.readFileSync(instructionsPath, 'utf-8')
);

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const themeName = url.searchParams.get('theme') || instructionsConfig.defaultTheme;
    const selectedInstructions = instructionsConfig.themes[themeName] || instructionsConfig.themes[instructionsConfig.defaultTheme];

    if (!selectedInstructions) {
      console.error("適切なインストラクションが見つかりませんでした。テーマ:", themeName);
      return NextResponse.json({ error: "Failed to get appropriate instructions" }, { status: 400 });
    }

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
          instructions: selectedInstructions,
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