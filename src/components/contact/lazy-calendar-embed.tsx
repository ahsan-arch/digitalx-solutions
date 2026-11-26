"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ExternalLink } from "lucide-react";

interface LazyCalendarEmbedProps {
  src: string;
  title?: string;
}

/**
 * Defers mounting the third-party Google Calendar iframe until scrolled near viewport
 * (or explicitly requested by the user), preventing third-party blocking scripts
 * from hurting LCP / INP while reserving fixed vertical height for zero CLS.
 */
export function LazyCalendarEmbed({
  src,
  title = "Book a Strategy Call",
}: LazyCalendarEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="rounded-3xl border border-white/10 bg-[#0d1421]/85 overflow-hidden shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-surface-50 px-5 py-3 text-xs">
        <span className="inline-flex items-center gap-2 font-semibold text-foreground">
          <Calendar className="h-4 w-4 text-brand" />
          Live Strategy &amp; Architecture Calendar
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-brand hover:underline"
        >
          Open in Google Calendar
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="relative h-[540px] sm:h-[650px] w-full bg-surface-50/40">
        {shouldLoad ? (
          <iframe
            src={src}
            className="relative z-10 h-full w-full border-0"
            title={title}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <Calendar className="h-8 w-8 text-brand mb-3" />
            <p className="font-display text-base font-semibold text-foreground">
              Interactive Booking Calendar
            </p>
            <p className="mt-1 text-xs text-foreground/65 max-w-xs">
              Loads automatically as you view, or open directly in a new tab.
            </p>
            <button
              type="button"
              onClick={() => setShouldLoad(true)}
              className="mt-4 inline-flex items-center rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-deep transition"
            >
              Load Calendar Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
