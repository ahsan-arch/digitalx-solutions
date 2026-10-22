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

  const models = ["whisper-large-v3-turbo", "whisper-large-v3"];
  const filename = audio.type.includes("mp4")
    ? "audio.mp4"
    : audio.type.includes("ogg")
      ? "audio.ogg"
      : "audio.webm";

  for (const model of models) {
    try {
      const groqForm = new FormData();
      groqForm.append("file", audio, filename);
      groqForm.append("model", model);
      groqForm.append("language", "en");
      groqForm.append("response_format", "json");
      groqForm.append("temperature", "0");

      const upstream = await fetch(GROQ_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: groqForm,
      });

      if (upstream.ok) {
        const data = (await upstream.json()) as { text?: string };
        return NextResponse.json({ text: (data.text ?? "").trim() });
      }

      const detail = await upstream.text().catch(() => "");
      console.warn(`Groq transcribe model ${model} failed (${upstream.status}):`, detail);
    } catch (err) {
      console.warn(`Groq transcribe fetch failed for ${model}`, err);
    }
  }

  return NextResponse.json({ error: "Transcription failed" }, { status: 502 });
}
