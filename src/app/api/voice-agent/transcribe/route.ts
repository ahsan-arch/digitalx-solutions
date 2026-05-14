import { NextResponse } from "next/server";
import { getClientKey, rateLimit } from "@/lib/voice-agent/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const MODEL = "whisper-large-v3-turbo";
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

export async function POST(req: Request) {
  if (!rateLimit(`transcribe:${getClientKey(req)}`, 60, 5 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY is not configured." }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const audio = formData.get("audio");
  if (!(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing audio blob" }, { status: 400 });
  }
  if (audio.size === 0) {
    return NextResponse.json({ text: "" });
  }
  if (audio.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Audio too large" }, { status: 413 });
  }

  const groqForm = new FormData();
  const filename = audio.type.includes("mp4")
    ? "audio.mp4"
    : audio.type.includes("ogg")
      ? "audio.ogg"
      : "audio.webm";
  groqForm.append("file", audio, filename);
  groqForm.append("model", MODEL);
  groqForm.append("language", "en");
  groqForm.append("response_format", "json");
  groqForm.append("temperature", "0");

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: groqForm,
    });
  } catch (err) {
    console.error("Groq transcribe fetch failed", err);
    return NextResponse.json({ error: "Transcription service unreachable" }, { status: 502 });
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error("Groq transcribe error", upstream.status, detail);
    return NextResponse.json({ error: "Transcription failed" }, { status: 502 });
  }

  const data = (await upstream.json()) as { text?: string };
  return NextResponse.json({ text: (data.text ?? "").trim() });
}
