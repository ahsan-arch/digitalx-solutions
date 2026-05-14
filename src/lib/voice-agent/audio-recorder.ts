"use client";

/**
 * Continuous mic recorder with voice-activity detection (VAD).
 * Replaces browser SpeechRecognition. Uses MediaRecorder for audio capture
 * and WebAudio AnalyserNode RMS to detect speech start/end.
 * When the user finishes a turn (silence > 1.2s after speech), the recorded
 * chunk is handed back via onTurn() — caller posts it to /api/voice-agent/transcribe.
 */

export type RecorderHandlers = {
  onSpeechStart: () => void;
  onSpeechEnd: () => void;
  onTurn: (blob: Blob) => void;
  onError: (message: string) => void;
};

export type Recorder = {
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

const SILENCE_MS = 1200;
const RMS_THRESHOLD = 0.02;
const MIN_SPEECH_MS = 250;

function pickMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "audio/webm";
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
    "audio/mp4",
  ];
  for (const m of candidates) {
    if (MediaRecorder.isTypeSupported(m)) return m;
  }
  return "audio/webm";
}

export async function startContinuousRecorder(
  handlers: RecorderHandlers
): Promise<Recorder | null> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    handlers.onError("Your browser doesn't support microphone access.");
    return null;
  }
  if (typeof MediaRecorder === "undefined") {
    handlers.onError("Your browser doesn't support MediaRecorder. Try Chrome or Edge.");
    return null;
  }

  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  } catch (err) {
    const name = (err as Error)?.name ?? "";
    if (name === "NotAllowedError" || name === "SecurityError") {
      handlers.onError(
        "Microphone access denied. Allow mic permission for this site and reload."
      );
    } else if (name === "NotFoundError" || name === "OverconstrainedError") {
      handlers.onError(
        "No microphone detected. Check that your mic is connected and selected as the default input."
      );
    } else {
      handlers.onError("Couldn't access your microphone. " + (name || ""));
    }
    return null;
  }

  const AudioCtx =
    (typeof window !== "undefined"
      ? window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      : undefined) ?? null;
  if (!AudioCtx) {
    stream.getTracks().forEach((t) => t.stop());
    handlers.onError("Your browser doesn't support the WebAudio API.");
    return null;
  }

  const audioCtx = new AudioCtx();
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = 0.6;
  source.connect(analyser);
  const buffer = new Float32Array(analyser.fftSize);
  const mimeType = pickMimeType();

  let recorder: MediaRecorder | null = null;
  let chunks: Blob[] = [];
  let speaking = false;
  let silenceStart: number | null = null;
  let speechStart: number | null = null;
  let stopped = false;
  let paused = false;
  let rafId: number | null = null;

  function startNewRecorder() {
    chunks = [];
    try {
      recorder = new MediaRecorder(stream, { mimeType });
    } catch {
      recorder = new MediaRecorder(stream);
    }
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      if (stopped) return;
      const blob = new Blob(chunks, { type: chunks[0]?.type ?? mimeType });
      chunks = [];
      if (blob.size > 0) handlers.onTurn(blob);
    };
    try {
      recorder.start();
    } catch (err) {
      console.warn("[audio-recorder] start failed", err);
    }
  }

  function rms(): number {
    analyser.getFloatTimeDomainData(buffer);
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
    return Math.sqrt(sum / buffer.length);
  }

  function tick() {
    if (stopped) return;
    rafId = requestAnimationFrame(tick);
    if (paused) return;

    const level = rms();
    const now = performance.now();

    if (level > RMS_THRESHOLD) {
      silenceStart = null;
      if (!speaking) {
        speaking = true;
        speechStart = now;
        handlers.onSpeechStart();
        if (!recorder || recorder.state === "inactive") startNewRecorder();
      }
    } else if (speaking) {
      if (silenceStart === null) silenceStart = now;
      else if (now - silenceStart > SILENCE_MS) {
        speaking = false;
        const duration = speechStart ? now - speechStart : 0;
        silenceStart = null;
        speechStart = null;
        handlers.onSpeechEnd();
        if (recorder && recorder.state !== "inactive") {
          if (duration > MIN_SPEECH_MS) {
            try {
              recorder.stop();
            } catch {}
            recorder = null;
          } else {
            try {
              recorder.stop();
            } catch {}
            recorder = null;
            chunks = [];
          }
        }
      }
    }
  }

  tick();

  return {
    pause: () => {
      paused = true;
      if (recorder && recorder.state !== "inactive") {
        try {
          recorder.stop();
        } catch {}
        recorder = null;
        chunks = [];
      }
      speaking = false;
      silenceStart = null;
      speechStart = null;
    },
    resume: () => {
      paused = false;
      speaking = false;
      silenceStart = null;
      speechStart = null;
    },
    stop: () => {
      stopped = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      try {
        recorder?.stop();
      } catch {}
      recorder = null;
      try {
        source.disconnect();
      } catch {}
      try {
        audioCtx.close();
      } catch {}
      stream.getTracks().forEach((t) => t.stop());
    },
  };
}
