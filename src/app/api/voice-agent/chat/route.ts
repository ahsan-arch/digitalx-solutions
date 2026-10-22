import { NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/schemas/voice-agent";
import { getClientKey, rateLimit } from "@/lib/voice-agent/rate-limit";
import {
  createFallbackStream,
  generateReceptionistReply,
} from "@/lib/voice-agent/fallback-generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const CANDIDATE_MODELS = [
  "llama-3.1-8b-instant",
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "llama3-8b-8192",
  "mixtral-8x7b-32768",
];

const STREAM_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Accel-Buffering": "no",
};

export async function POST(req: Request) {
  if (!rateLimit(`chat:${getClientKey(req)}`, 60, 5 * 60 * 1000)) {
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

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;

  // If Groq API key is present, attempt live LLM inference with candidate models
  if (apiKey) {
    for (const model of CANDIDATE_MODELS) {
      try {
        const upstream = await fetch(GROQ_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            stream: true,
            temperature: 0.7,
            max_tokens: 220,
            messages: [
              { role: "system", content: parsed.data.systemPrompt },
              ...parsed.data.messages,
            ],
          }),
        });

        if (upstream.ok && upstream.body) {
          const reader = upstream.body.getReader();
          const decoder = new TextDecoder();
          const encoder = new TextEncoder();

          const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
              let buffer = "";
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  buffer += decoder.decode(value, { stream: true });
                  const lines = buffer.split("\n");
                  buffer = lines.pop() ?? "";
                  for (const raw of lines) {
                    const line = raw.trim();
                    if (!line.startsWith("data:")) continue;
                    const data = line.slice(5).trim();
                    if (data === "[DONE]") {
                      controller.close();
                      return;
                    }
                    try {
                      const json = JSON.parse(data);
                      const delta = json?.choices?.[0]?.delta?.content;
                      if (typeof delta === "string" && delta.length > 0) {
                        controller.enqueue(encoder.encode(delta));
                      }
                    } catch {
                      // ignore malformed lines
                    }
                  }
                }
                controller.close();
              } catch (err) {
                console.error("Groq stream read error", err);
                controller.error(err);
              }
            },
            cancel() {
              reader.cancel().catch(() => {});
            },
          });

          return new Response(stream, { headers: STREAM_HEADERS });
        }

        const errDetail = await upstream.text().catch(() => "");
        console.warn(`Groq model ${model} failed (${upstream.status}):`, errDetail);

        // If 401 (bad auth) or 429 (rate limit), don't keep hammering subsequent models
        if (upstream.status === 401 || upstream.status === 429) {
          break;
        }
      } catch (err) {
        console.warn(`Groq fetch error for ${model}`, err);
      }
    }
  }

  // Graceful fallback: synthesize a contextual AI receptionist reply
  console.info("[voice-agent] Serving intelligent fallback conversational stream");
  const reply = generateReceptionistReply(parsed.data.systemPrompt, parsed.data.messages);
  const stream = createFallbackStream(reply);

  return new Response(stream, { headers: STREAM_HEADERS });
}

