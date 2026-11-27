"use client";

import { useEffect, useMemo, useRef, useState, FormEvent } from "react";
import { Calendar, Clock, ExternalLink, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackFormSubmit } from "@/lib/analytics";

interface LazyCalendarEmbedProps {
  src: string;
  title?: string;
}

interface TimezoneOption {
  id: string;
  label: string;
  shortLabel: string;
  city: string;
  group: "US" | "AU";
}

const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { id: "America/New_York", label: "US Eastern Time (ET · New York)", shortLabel: "US Eastern", city: "New York", group: "US" },
  { id: "America/Chicago", label: "US Central Time (CT · Chicago)", shortLabel: "US Central", city: "Chicago", group: "US" },
  { id: "America/Denver", label: "US Mountain Time (MT · Denver)", shortLabel: "US Mountain", city: "Denver", group: "US" },
  { id: "America/Los_Angeles", label: "US Pacific Time (PT · Los Angeles)", shortLabel: "US Pacific", city: "Los Angeles", group: "US" },
  { id: "America/Anchorage", label: "US Alaska Time (AKT)", shortLabel: "US Alaska", city: "Anchorage", group: "US" },
  { id: "Pacific/Honolulu", label: "US Hawaii Time (HT)", shortLabel: "US Hawaii", city: "Honolulu", group: "US" },
  { id: "Australia/Sydney", label: "Australian Eastern Time (AET · Sydney)", shortLabel: "Sydney AET", city: "Sydney", group: "AU" },
  { id: "Australia/Perth", label: "Australian Western Time (AWST · Perth)", shortLabel: "Perth AWST", city: "Perth", group: "AU" },
];

const US_SLOT_TIMES = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "5:30 PM",
  "7:00 PM",
] as const;

function getNextBusinessDateString(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  if (date.getDay() === 6) date.setDate(date.getDate() + 2);
  if (date.getDay() === 0) date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

function buildCalendarUrl(baseSrc: string, timeZone: string): string {
  try {
    const url = new URL(baseSrc);
    url.searchParams.set("gv", "true");
    url.searchParams.set("ctz", timeZone);
    return url.toString();
  } catch {
    return baseSrc;
  }
}

/**
 * Defers mounting the third-party Google Calendar iframe until scrolled near viewport,
 * supports selecting US (ET/CT/MT/PT) or Australian time zones directly via ?ctz=,
 * and includes an instant Direct Slot Request mode so US callers can always book a time.
 */
export function LazyCalendarEmbed({
  src,
  title = "Book a Strategy Call",
}: LazyCalendarEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [mode, setMode] = useState<"calendar" | "direct">("calendar");
  const [selectedTz, setSelectedTz] = useState<string>("America/New_York");
  const [localClock, setLocalClock] = useState<string>("");

  // Direct US Time-Zone slot booking state
  const [preferredDate, setPreferredDate] = useState<string>(getNextBusinessDateString);
  const [preferredSlot, setPreferredSlot] = useState<string>(US_SLOT_TIMES[4]);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMsg, setSubmitMsg] = useState("");

  // Default cleanly to US Eastern or visitor's detected US/AU zone
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TIMEZONE_OPTIONS.some((t) => t.id === detected)) {
        setSelectedTz(detected);
      }
    } catch {
      // Fallback stays America/New_York
    }
  }, []);

  // Show live clock readout in chosen US/AU timezone
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: selectedTz,
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        }).format(new Date());
        setLocalClock(formatted);
      } catch {
        setLocalClock("");
      }
    };
    updateClock();
    const id = setInterval(updateClock, 30000);
    return () => clearInterval(id);
  }, [selectedTz]);

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

  const calendarSrcWithTz = useMemo(() => buildCalendarUrl(src, selectedTz), [src, selectedTz]);
  const activeOption = TIMEZONE_OPTIONS.find((t) => t.id === selectedTz) || TIMEZONE_OPTIONS[0];

  async function handleDirectSlotSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("submitting");
    setSubmitMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName.trim(),
          email: guestEmail.trim(),
          contact: guestEmail.trim(),
          need: `Calendar Meeting Request (${activeOption.shortLabel})`,
          callbackRequested: false,
          timeline: "ASAP",
          details: [
            `Preferred Time Zone: ${activeOption.label} (${selectedTz})`,
            `Requested Date: ${preferredDate}`,
            `Requested Time: ${preferredSlot} (${activeOption.shortLabel})`,
            guestNotes.trim() ? `Notes: ${guestNotes.trim()}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (!response.ok) {
        throw new Error("Booking request failed");
      }

      trackFormSubmit("us_timezone_slot_request", true);
      setSubmitState("success");
      setSubmitMsg(
        `Request locked in for ${preferredDate} at ${preferredSlot} (${activeOption.shortLabel}). We will send your calendar invite shortly.`
      );
      setGuestName("");
      setGuestEmail("");
      setGuestNotes("");
    } catch {
      trackFormSubmit("us_timezone_slot_request", false);
      setSubmitState("error");
      setSubmitMsg("Unable to send right now. Please try the email form above or message on WhatsApp.");
    }
  }

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-border/80 bg-white overflow-hidden shadow-xs"
    >
      {/* Top Bar: Header + Open External Link */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 bg-surface-sunken px-5 py-3 text-xs">
        <span className="inline-flex items-center gap-2 font-semibold text-foreground">
          <Calendar className="h-4 w-4 text-brand" />
          Live Strategy &amp; Architecture Calendar
        </span>
        <a
          href={calendarSrcWithTz}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-brand hover:underline"
        >
          Open in Google Calendar
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Time Zone Switcher & Mode Controls */}
      <div className="border-b border-border/70 bg-white px-4 py-3.5 sm:px-5 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="h-4 w-4 text-brand shrink-0" />
            <label htmlFor="calendar-timezone-select" className="text-xs font-semibold text-foreground shrink-0">
              Your Time Zone:
            </label>
            <select
              id="calendar-timezone-select"
              value={selectedTz}
              onChange={(e) => {
                setSelectedTz(e.target.value);
                setShouldLoad(true);
              }}
              className="min-w-0 flex-1 sm:max-w-[290px] rounded-md border border-border/80 bg-surface-sunken px-2.5 py-1.5 text-xs font-medium text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
            >
              <optgroup label="United States Time Zones">
                {TIMEZONE_OPTIONS.filter((tz) => tz.group === "US").map((tz) => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Australia Time Zones">
                {TIMEZONE_OPTIONS.filter((tz) => tz.group === "AU").map((tz) => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {localClock && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-secondary shrink-0">
              <Clock className="h-3.5 w-3.5 text-brand" />
              Local time ({activeOption.city}): {localClock}
            </span>
          )}
        </div>

        {/* Mode Switch Tabs: Google Calendar Live Grid vs Direct US Time Slot Request */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div
            role="tablist"
            aria-label="Booking Method"
            className="inline-flex rounded-md border border-border/80 bg-surface-sunken p-0.5 text-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "calendar"}
              onClick={() => setMode("calendar")}
              className={cn(
                "rounded px-3 py-1.5 font-semibold transition-colors",
                mode === "calendar"
                  ? "bg-white text-foreground shadow-2xs"
                  : "text-ink-secondary hover:text-foreground"
              )}
            >
              Google Calendar ({activeOption.shortLabel})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "direct"}
              onClick={() => setMode("direct")}
              className={cn(
                "rounded px-3 py-1.5 font-semibold transition-colors",
                mode === "direct"
                  ? "bg-white text-brand-deep shadow-2xs"
                  : "text-ink-secondary hover:text-foreground"
              )}
            >
              Pick US Time Slot Directly
            </button>
          </div>

          <span className="text-[11px] text-ink-tertiary">
            Need another US evening slot? Switch to &ldquo;Pick US Time Slot Directly&rdquo;.
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      {mode === "calendar" ? (
        <div className="relative h-[540px] sm:h-[640px] w-full bg-surface-sunken/30">
          {shouldLoad ? (
            <iframe
              key={calendarSrcWithTz}
              src={calendarSrcWithTz}
              className="relative z-10 h-full w-full border-0"
              title={`${title} (${activeOption.shortLabel})`}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <Calendar className="h-8 w-8 text-brand mb-3" />
              <p className="font-display text-base font-semibold text-foreground">
                Interactive Booking Calendar ({activeOption.shortLabel})
              </p>
              <p className="mt-1 text-xs text-ink-secondary max-w-xs">
                Loads automatically as you view, or pick a preferred US time directly.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShouldLoad(true)}
                  className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-deep transition"
                >
                  Load Calendar Now
                </button>
                <button
                  type="button"
                  onClick={() => setMode("direct")}
                  className="inline-flex items-center rounded-lg border border-border/80 bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-sunken transition"
                >
                  Request US Time Slot
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleDirectSlotSubmit} className="p-6 sm:p-8 space-y-5 bg-white">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
              Guaranteed US &amp; AU Time-Zone Scheduling
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
              Request a Meeting in {activeOption.label}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
              Select your preferred date and time in {activeOption.shortLabel}. Our engineering team confirms with a calendar invite directly in your chosen time zone.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="slot-date" className="mb-1.5 block text-xs font-semibold text-foreground">
                Preferred Date ({activeOption.shortLabel})
              </label>
              <input
                id="slot-date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-surface-sunken px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="slot-time" className="mb-1.5 block text-xs font-semibold text-foreground">
                Preferred Time ({activeOption.shortLabel})
              </label>
              <select
                id="slot-time"
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-surface-sunken px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:bg-white"
              >
                {US_SLOT_TIMES.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot} ({activeOption.shortLabel})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="slot-name" className="mb-1.5 block text-xs font-semibold text-foreground">
                Full Name
              </label>
              <input
                id="slot-name"
                type="text"
                required
                minLength={2}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Jordan Smith"
                className="w-full rounded-lg border border-border/80 bg-surface-sunken px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="slot-email" className="mb-1.5 block text-xs font-semibold text-foreground">
                Work Email (for Calendar Invite)
              </label>
              <input
                id="slot-email"
                type="email"
                required
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="jordan@company.com"
                className="w-full rounded-lg border border-border/80 bg-surface-sunken px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="slot-notes" className="mb-1.5 block text-xs font-semibold text-foreground">
              Agenda / System Focus (Optional)
            </label>
            <input
              id="slot-notes"
              type="text"
              value={guestNotes}
              onChange={(e) => setGuestNotes(e.target.value)}
              placeholder="e.g. Custom CRM portal, AI voice receptionist, or GoHighLevel build"
              className="w-full rounded-lg border border-border/80 bg-surface-sunken px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-deep disabled:opacity-60"
            >
              <span>{submitState === "submitting" ? "Booking Request..." : "Confirm Time-Zone Request"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setMode("calendar")}
              className="text-xs font-semibold text-ink-secondary hover:text-brand underline"
            >
              Back to Google Calendar grid
            </button>
          </div>

          {submitMsg && (
            <div
              role="status"
              className={cn(
                "flex items-start gap-2 rounded-lg border p-3 text-xs font-medium",
                submitState === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
              )}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{submitMsg}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
