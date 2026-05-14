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

  const HARD_TIMEOUT_MS = 5000;

  try {
    const tts = new MsEdgeTTS();
    const closeTts = () => {
      try {
        tts.close();
      } catch {}
    };

    const result = await Promise.race<
      | { ok: true; buffer: Buffer }
      | { ok: false; reason: string }
    >([
      (async () => {
        try {
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
          if (chunks.length === 0) {
            return { ok: false as const, reason: "empty audio stream" };
          }
          return { ok: true as const, buffer: Buffer.concat(chunks) };
        } catch (err) {
          return {
            ok: false as const,
            reason: (err as Error)?.message ?? String(err),
          };
        }
      })(),
      new Promise<{ ok: false; reason: string }>((resolve) =>
        setTimeout(
          () => resolve({ ok: false as const, reason: "timeout" }),
          HARD_TIMEOUT_MS
        )
      ),
    ]);

    closeTts();

    if (!result.ok) {
      console.error("Edge TTS failed:", result.reason, "voice=", parsed.data.voice);
      return NextResponse.json({ error: result.reason }, { status: 502 });
    }

    return new Response(new Uint8Array(result.buffer), {
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
