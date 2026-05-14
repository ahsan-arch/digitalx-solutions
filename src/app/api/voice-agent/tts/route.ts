import { NextResponse } from "next/server";
import { ttsRequestSchema } from "@/lib/schemas/voice-agent";
import { voices } from "@/lib/voice-agent/voices";
import { getClientKey, rateLimit } from "@/lib/voice-agent/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_VOICES = new Set(
  voices.filter((v) => v.elevenLabsVoiceId).map((v) => v.elevenLabsVoiceId as string)
);

const fallbackResponse = () =>
  new Response(JSON.stringify({ fallback: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-TTS-Fallback": "1",
      "Cache-Control": "no-store",
    },
  });

export async function POST(req: Request) {
  if (!rateLimit(`tts:${getClientKey(req)}`, 60, 5 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ttsRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!ALLOWED_VOICES.has(parsed.data.voiceId)) {
    return NextResponse.json({ error: "Unknown voice" }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return fallbackResponse();
  }

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${parsed.data.voiceId}/stream?optimize_streaming_latency=2`;

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: parsed.data.text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });
  } catch (err) {
    console.error("ElevenLabs fetch failed", err);
    return fallbackResponse();
  }

  if (!upstream.ok || !upstream.body) {
    console.warn("ElevenLabs returned", upstream.status);
    return fallbackResponse();
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
