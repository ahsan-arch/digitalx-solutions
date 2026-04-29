// One-off sample generator. Produces 4 short MP3s so we can audition Ava + Andrew
// before generating the full batch for all 77 industries.
//
// Run: node scripts/generate-samples.mjs

import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../public/demos/_samples");

const VOICES = {
  agent: "en-US-AvaMultilingualNeural",
  caller: "en-US-AndrewMultilingualNeural",
};

const samples = [
  {
    file: "agent-greeting.mp3",
    voice: VOICES.agent,
    text: "Hi, thank you for calling Riverstone Dental! This is Ava, how can I help you today?",
  },
  {
    file: "caller-opener.mp3",
    voice: VOICES.caller,
    text: "Hey, my AC just stopped working and it's like 95 degrees in here.",
  },
  {
    file: "agent-booking.mp3",
    voice: VOICES.agent,
    text: "Got it. That sounds like it could be a refrigerant or compressor issue. I have a technician available tomorrow morning between 8 and 10 AM. I'll also send you a text confirmation right now.",
  },
  {
    file: "caller-detail.mp3",
    voice: VOICES.caller,
    text: "Yes, my last visit was about 8 months ago. Name is Sarah Mitchell.",
  },
];

async function synth(voice, text, outPath) {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text);

  await new Promise((resolveP, rejectP) => {
    const file = createWriteStream(outPath);
    audioStream.on("data", (chunk) => file.write(chunk));
    audioStream.on("end", () => {
      file.end();
      tts.close();
      resolveP();
    });
    audioStream.on("error", (err) => {
      file.end();
      tts.close();
      rejectP(err);
    });
  });
}

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const s of samples) {
    const outPath = resolve(outDir, s.file);
    process.stdout.write(`Generating ${s.file} ... `);
    await synth(s.voice, s.text, outPath);
    process.stdout.write("done\n");
  }
  console.log(`\nAll samples written to: ${outDir}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
