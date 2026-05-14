import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientKey, rateLimit } from "@/lib/voice-agent/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/audio/speech";
const MODEL = "playai-tts";

const ALLOWED_VOICES = new Set([
  "Aaliyah-PlayAI",
  "Adelaide-PlayAI",
  "Angelo-PlayAI",
  "Arista-PlayAI",
  "Atlas-PlayAI",
  "Basil-PlayAI",
  "Briggs-PlayAI",
  "Calum-PlayAI",
  "Celeste-PlayAI",
  "Cheyenne-PlayAI",
  "Chip-PlayAI",
  "Cillian-PlayAI",
  "Deedee-PlayAI",
  "Eleanor-PlayAI",
  "Fritz-PlayAI",
  "Gail-PlayAI",
  "Indigo-PlayAI",
  "Mamaw-PlayAI",
  "Mason-PlayAI",
  "Mikail-PlayAI",
  "Mitch-PlayAI",
  "Nia-PlayAI",
  "Quinn-PlayAI",
  "Ruby-PlayAI",
  "Thunder-PlayAI",
]);

const speechRequestSchema = z.object({
  text: z.string().min(1).max(800),
  voice: z.string().min(1).max(50),
});

export async function POST(req: Request) {
  if (!rateLimit(`speech:${getClientKey(req)}`, 90, 5 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = speechRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!ALLOWED_VOICES.has(parsed.data.voice)) {
    return NextResponse.json({ error: "Unknown voice" }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        input: parsed.data.text,
        voice: parsed.data.voice,
        response_format: "wav",
      }),
    });
  } catch (err) {
    console.error("Groq TTS fetch failed", err);
    return NextResponse.json({ error: "Speech service unreachable" }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("Groq TTS error", upstream.status, detail);
    return NextResponse.json({ error: "Speech synthesis failed" }, { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "audio/wav",
      "Cache-Control": "no-store",
    },
  });
}
