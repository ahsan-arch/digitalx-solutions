import { NextResponse } from "next/server";
import { z } from "zod";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { getClientKey, rateLimit } from "@/lib/voice-agent/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_VOICES = new Set([
  "en-US-AriaNeural",
  "en-US-JennyNeural",
  "en-US-EmmaNeural",
  "en-US-MichelleNeural",
  "en-US-AnaNeural",
  "en-US-SaraNeural",
  "en-US-GuyNeural",
  "en-US-AndrewNeural",
  "en-US-BrianNeural",
  "en-US-DavisNeural",
  "en-US-RogerNeural",
  "en-US-SteffanNeural",
  "en-US-ChristopherNeural",
  "en-US-EricNeural",
  "en-GB-LibbyNeural",
  "en-GB-SoniaNeural",
  "en-GB-RyanNeural",
  "en-AU-NatashaNeural",
  "en-AU-WilliamNeural",
]);

const schema = z.object({
  text: z.string().min(1).max(800),
  voice: z.string().min(1).max(50),
});

export async function POST(req: Request) {
  if (!rateLimit(`edge-tts:${getClientKey(req)}`, 120, 5 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  if (!ALLOWED_VOICES.has(parsed.data.voice)) {
    return NextResponse.json({ error: "Unknown voice" }, { status: 400 });
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(
      parsed.data.voice,
      OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
    );
    const { audioStream } = await tts.toStream(parsed.data.text);

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      audioStream.on("end", () => resolve());
      audioStream.on("close", () => resolve());
      audioStream.on("error", (err: unknown) => reject(err));
    });

    try {
      tts.close();
    } catch {}

    if (chunks.length === 0) {
      console.error("Edge TTS produced no audio for voice", parsed.data.voice);
      return NextResponse.json({ error: "TTS produced no audio" }, { status: 502 });
    }

    const audioBuffer = Buffer.concat(chunks);
    return new Response(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Edge TTS error", err);
    return NextResponse.json({ error: "TTS failed" }, { status: 502 });
  }
}
