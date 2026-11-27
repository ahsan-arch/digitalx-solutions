"use client";

import { FormEvent, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { companyProfile } from "@/data/redesign";
import { trackFormSubmit, trackWhatsAppClick, trackPhoneTap } from "@/lib/analytics";

const needOptions = [
  "Custom CRM Development ($2,200 – $15,000+)",
  "Hybrid CRM + GoHighLevel Integration",
  "24/7 AI Voice Receptionist",
  "n8n Workflow Automation",
  "Full Audit & TCO Estimate",
] as const;

const timeZoneOptions = [
  "US Eastern (ET · New York)",
  "US Central (CT · Chicago)",
  "US Mountain (MT · Denver)",
  "US Pacific (PT · Los Angeles)",
  "Australia Eastern (AET · Sydney)",
  "Australia Western (AWST · Perth)",
] as const;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactIntakeForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [need, setNeed] = useState<(typeof needOptions)[number]>(needOptions[0]);
  const [timeZone, setTimeZone] = useState<(typeof timeZoneOptions)[number]>(timeZoneOptions[0]);
  const [details, setDetails] = useState("");
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    const trimmedContact = contact.trim();
    const isEmail = trimmedContact.includes("@");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contact: trimmedContact,
          ...(isEmail ? { email: trimmedContact } : { phone: trimmedContact }),
          need,
          callbackRequested,
          timeline: "ASAP",
          details: `Time Zone: ${timeZone}\n${details.trim() || `Interested in: ${need}`}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      trackFormSubmit("strategy_call_intake", true);
      setSubmitState("success");
      setMessage("Thanks, your request is received. We will reply within one business day.");
      setName("");
      setContact("");
      setNeed(needOptions[0]);
      setDetails("");
      setCallbackRequested(false);
    } catch {
      trackFormSubmit("strategy_call_intake", false);
      setSubmitState("error");
      setMessage("Something went wrong. Please email info@digitalx-solutions.com or message us on WhatsApp.");
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-border/80 bg-surface-50 p-6 md:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-border/80 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="contact-info" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Email or Phone
            </label>
            <input
              id="contact-info"
              name="contact"
              required
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              className="w-full rounded-xl border border-border/80 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
              placeholder="name@company.com or +61 / +1..."
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-need" className="mb-1.5 block text-sm font-medium text-foreground/80">
              What do you need?
            </label>
            <select
              id="contact-need"
              name="need"
              value={need}
              onChange={(event) => setNeed(event.target.value as (typeof needOptions)[number])}
              className="w-full rounded-xl border border-border/80 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
            >
              {needOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-timezone" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Preferred Time Zone
            </label>
            <select
              id="contact-timezone"
              name="timeZone"
              value={timeZone}
              onChange={(event) => setTimeZone(event.target.value as (typeof timeZoneOptions)[number])}
              className="w-full rounded-xl border border-border/80 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
            >
              {timeZoneOptions.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-details" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Brief context
          </label>
          <textarea
            id="contact-details"
            name="details"
            required
            minLength={5}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border/80 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
            placeholder="Share your current stack, user count, or bottleneck."
          />
        </div>

        <label className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/80 cursor-pointer">
          <input
            type="checkbox"
            checked={callbackRequested}
            onChange={(e) => setCallbackRequested(e.target.checked)}
            className="h-4 w-4 rounded border-border/80 text-brand focus:ring-brand"
          />
          <span>Request a quick phone or WhatsApp callback</span>
        </label>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <span>{submitState === "submitting" ? "Sending..." : "Book a strategy call"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href={companyProfile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("contact_form")}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>WhatsApp Chat</span>
          </a>

          <a
            href={`tel:${companyProfile.phoneE164}`}
            onClick={() => trackPhoneTap(companyProfile.phone)}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-white px-4 py-3 text-sm font-semibold text-foreground hover:bg-surface-100 transition"
          >
            <Phone className="h-4 w-4 text-brand" />
            <span>Direct Callback</span>
          </a>
        </div>

        {message && (
          <p
            role="status"
            className={`text-sm font-medium ${submitState === "error" ? "text-red-600" : "text-emerald-700"}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
