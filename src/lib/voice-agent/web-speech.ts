import type { Voice } from "./voices";

/* ───────── Type shims for browser-only APIs ───────── */

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = { error: string };

export type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives?: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onspeechstart?: (() => void) | null;
  onspeechend?: (() => void) | null;
  onaudiostart?: (() => void) | null;
  onaudioend?: (() => void) | null;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  }
}

/* ───────── STT (legacy SpeechRecognition — kept for capability detection) ───────── */

export function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionCtor() !== null;
}

export function createRecognizer(): SpeechRecognitionLike | null {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) return null;
  const r = new Ctor();
  r.lang = "en-US";
  r.continuous = true;
  r.interimResults = true;
  if ("maxAlternatives" in r) r.maxAlternatives = 1;
  return r;
}

/* ───────── TTS (browser speechSynthesis) ───────── */

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function loadBrowserVoices(timeoutMs = 1500): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve([]);
      return;
    }
    const synth = window.speechSynthesis;
    const initial = synth.getVoices();
    if (initial.length > 0) {
      resolve(initial);
      return;
    }
    let settled = false;
    const onChange = () => {
      if (settled) return;
      const next = synth.getVoices();
      if (next.length > 0) {
        settled = true;
        synth.removeEventListener("voiceschanged", onChange);
        resolve(next);
      }
    };
    synth.addEventListener("voiceschanged", onChange);
    setTimeout(() => {
      if (settled) return;
      settled = true;
      synth.removeEventListener("voiceschanged", onChange);
      resolve(synth.getVoices());
    }, timeoutMs);
  });
}

/** Heuristic for "this is a neural / high-quality voice rather than a legacy robotic one". */
const NEURAL_HINT = /Online|Natural|Neural|Google/i;
/** Legacy Windows TTS voices that sound robotic — used as a soft deprioritizer. */
const LEGACY_HINT = /Microsoft (David|Zira|Mark|Hazel)\b/i;

function rankVoices(pool: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return [...pool].sort((a, b) => {
    const aNeural = NEURAL_HINT.test(a.name);
    const bNeural = NEURAL_HINT.test(b.name);
    if (aNeural !== bNeural) return aNeural ? -1 : 1;
    const aLegacy = LEGACY_HINT.test(a.name);
    const bLegacy = LEGACY_HINT.test(b.name);
    if (aLegacy !== bLegacy) return aLegacy ? 1 : -1;
    return 0;
  });
}

export function pickBrowserVoice(
  voice: Voice,
  available: SpeechSynthesisVoice[],
  exclude?: Set<string>
): SpeechSynthesisVoice | null {
  if (available.length === 0) return null;

  const english = available.filter((v) => /^en[-_]/i.test(v.lang));
  const ranked = rankVoices(english.length > 0 ? english : available);
  const notExcluded = (v: SpeechSynthesisVoice) => !exclude?.has(v.name);

  if (voice.browserVoiceMatchers) {
    for (const matcher of voice.browserVoiceMatchers) {
      const hit = ranked.find((v) => matcher.test(v.name) && notExcluded(v));
      if (hit) return hit;
    }
  }

  if (voice.browserVoiceGender) {
    const re =
      voice.browserVoiceGender === "female"
        ? /\b(Aria|Jenny|Emma|Michelle|Ana|Sara|Samantha|Allison|Ava|Victoria|Hazel|Zira|female|woman)\b/i
        : /\b(Guy|Andrew|Brian|Roger|Steffan|Davis|Daniel|Alex|Mark|David|Fred|male|man)\b/i;
    const neuralOnly = ranked.filter((v) => NEURAL_HINT.test(v.name));
    const neuralHit = neuralOnly.find((v) => re.test(v.name) && notExcluded(v));
    if (neuralHit) return neuralHit;
    const anyHit = ranked.find((v) => re.test(v.name) && notExcluded(v));
    if (anyHit) return anyHit;
  }

  return (
    ranked.find((v) => NEURAL_HINT.test(v.name) && notExcluded(v)) ??
    ranked.find(notExcluded) ??
    ranked[0] ??
    null
  );
}

/**
 * Greedy assignment: walk the catalog in order, give each slot the best available
 * voice that no earlier slot has already claimed. Guarantees distinct voices
 * when at least N English voices exist.
 */
export function assignBrowserVoices(
  catalog: Voice[],
  available: SpeechSynthesisVoice[]
): Map<string, SpeechSynthesisVoice | null> {
  const result = new Map<string, SpeechSynthesisVoice | null>();
  const claimed = new Set<string>();
  for (const voice of catalog) {
    const picked = pickBrowserVoice(voice, available, claimed);
    result.set(voice.id, picked);
    if (picked) claimed.add(picked.name);
  }
  return result;
}

export function speakWithBrowser(
  text: string,
  voice: SpeechSynthesisVoice | null,
  signal?: AbortSignal
): Promise<void> {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported() || !text.trim()) {
      resolve();
      return;
    }
    if (signal?.aborted) {
      resolve();
      return;
    }
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    if (voice) utter.voice = voice;
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      signal?.removeEventListener("abort", onAbort);
      resolve();
    };
    const onAbort = () => {
      try {
        synth.cancel();
      } catch {}
      finish();
    };
    utter.onend = finish;
    utter.onerror = finish;
    signal?.addEventListener("abort", onAbort, { once: true });

    try {
      synth.speak(utter);
    } catch {
      finish();
    }
  });
}

/** Silent WAV used to "unlock" audio on iOS Safari inside a click handler. */
export const SILENT_WAV =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
