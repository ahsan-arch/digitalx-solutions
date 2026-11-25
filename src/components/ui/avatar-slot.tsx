"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AvatarSlotProps {
  src: string;
  alt: string;
  fallbackText: string;
  className?: string;
  showRing?: boolean;
}

export function AvatarSlot({
  src,
  alt,
  fallbackText,
  className = "h-14 w-14",
  showRing = false,
}: AvatarSlotProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand font-bold text-white border",
        showRing ? "border-brand/40 ring-2 ring-brand/15" : "border-border",
        className
      )}
    >
      {Boolean(src) && !hasError && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover z-10"
          onError={() => setHasError(true)}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-brand text-lg font-semibold text-white">
        {fallbackText}
      </div>
    </div>
  );
}
