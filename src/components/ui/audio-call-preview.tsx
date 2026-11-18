"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioCallPreviewProps {
  src: string;
  title?: string;
  scenario?: string;
  callerLabel?: string;
  className?: string;
}

export function AudioCallPreview({
  src,
  title = "Live AI Intake Call",
  scenario = "Emergency Plumbing Triage",
  callerLabel = "Burst Pipe Inquiry",
  className,
}: AudioCallPreviewProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 21);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = Number(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // 16 stylized soundwave bars with varying heights
  const barHeights = [40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 65, 85, 35, 70, 55, 40];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-white p-4 sm:p-5 shadow-xs transition-colors hover:border-brand/40",
        className
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause audio call preview" : "Play audio call preview"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs transition-transform active:scale-95 hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-foreground">
                {title}
              </span>
            </div>
            <p className="text-xs text-foreground/70">
              {scenario}: <span className="text-foreground/85 font-medium">{callerLabel}</span>
            </p>
          </div>
        </div>

        {/* Dynamic Equalizer Waveform & Time */}
        <div className="flex items-center gap-3 sm:ml-auto">
          <div
            className="flex h-8 items-center gap-1 px-2 py-1"
            aria-hidden="true"
          >
            {barHeights.map((h, i) => (
              <span
                key={i}
                className={cn(
                  "w-1 rounded-full transition-all duration-200",
                  isPlaying
                    ? "bg-brand"
                    : "bg-border/80"
                )}
                style={{
                  height: isPlaying
                    ? `${Math.max(20, (h * (0.6 + Math.sin((currentTime * 5) + i) * 0.4)))}%`
                    : `${h * 0.35}%`,
                  animationDelay: `${i * 60}ms`,
                }}
              />
            ))}
          </div>

          <span className="font-mono text-xs tabular-nums text-foreground/60 w-16 text-right">
            {formatTime(currentTime)} / {formatTime(duration || 21)}
          </span>
        </div>
      </div>

      {/* Progress Slider Bar */}
      <div className="mt-3 pt-2 border-t border-border/40">
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 21}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek audio timeline"
            className="w-full h-1.5 bg-surface-sunken rounded-lg appearance-none cursor-pointer accent-brand focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
