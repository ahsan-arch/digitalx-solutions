export type VoiceKind = "standard" | "premium";

export type Voice = {
  id: string;
  label: string;
  description: string;
  kind: VoiceKind;
  /** Optional badge text shown next to the label, e.g. "HOT" for the recommended voice. */
  badge?: string;
  /**
   * Groq PlayAI voice ID — when set, the agent uses Groq's cloud TTS so the same
   * voice plays on every device. Falls back to browser TTS if the request fails.
   */
  groqVoice?: string;
  /** Used in `speechSynthesis.getVoices()` matching. Lower index = stronger preference. */
  browserVoiceMatchers?: RegExp[];
  /** Fallback gender preference if no matcher hits. */
  browserVoiceGender?: "female" | "male";
  elevenLabsVoiceId?: string;
};

export const voices: Voice[] = [
  {
    id: "aria",
    label: "Aria",
    description: "Warm, friendly female voice. Same voice on every device.",
    kind: "standard",
    badge: "HOT",
    groqVoice: "Arista-PlayAI",
    browserVoiceMatchers: [
      /Microsoft Aria Online/i,
      /Microsoft Aria/i,
      /Google US English/i,
      /Samantha/i,
    ],
    browserVoiceGender: "female",
  },
  {
    id: "jenny",
    label: "Jenny",
    description: "Calm, professional female voice. Same voice on every device.",
    kind: "standard",
    groqVoice: "Eleanor-PlayAI",
    browserVoiceMatchers: [
      /Microsoft Jenny Online/i,
      /Microsoft Jenny/i,
      /Microsoft Emma Online/i,
      /Microsoft Michelle Online/i,
      /Allison/i,
      /Ava/i,
    ],
    browserVoiceGender: "female",
  },
  {
    id: "guy",
    label: "Guy",
    description: "Friendly, approachable male voice. Same voice on every device.",
    kind: "standard",
    groqVoice: "Atlas-PlayAI",
    browserVoiceMatchers: [
      /Microsoft Guy Online/i,
      /Microsoft Guy/i,
      /Microsoft Andrew Online/i,
      /Microsoft Brian Online/i,
      /Daniel/i,
    ],
    browserVoiceGender: "male",
  },
  {
    id: "roger",
    label: "Roger",
    description: "Confident, news-anchor male voice. Same voice on every device.",
    kind: "standard",
    groqVoice: "Thunder-PlayAI",
    browserVoiceMatchers: [
      /Microsoft Roger Online/i,
      /Microsoft Steffan Online/i,
      /Microsoft Davis Online/i,
      /Microsoft Davis/i,
      /Alex/i,
    ],
    browserVoiceGender: "male",
  },
];

export function getVoice(id: string): Voice | undefined {
  return voices.find((v) => v.id === id);
}
