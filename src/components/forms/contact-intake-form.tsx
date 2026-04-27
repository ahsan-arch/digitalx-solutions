"use client";

import { FormEvent, useState } from "react";

const timelineOptions = ["1-3 Months", "3-6 Months", "ASAP"] as const;

type SubmitState = "idle" | "submitting" | "success" | "error";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ContactIntakeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeline, setTimeline] = useState<(typeof timelineOptions)[number]>("1-3 Months");
  const [details, setDetails] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    try {
      const attachmentPayload = attachment
        ? {
            name: attachment.name,
            type: attachment.type || "application/octet-stream",
            content: await fileToBase64(attachment),
          }
        : null;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          timeline,
          details,
          attachment: attachmentPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitState("success");
      setMessage("Thanks, your request is in. We will respond within one business day.");
      setName("");
      setEmail("");
      setTimeline("1-3 Months");
      setDetails("");
      setAttachment(null);
    } catch {
      setSubmitState("error");
      setMessage("Something went wrong. Please email info@digitalx-solutions.com directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-border bg-surface-50 p-6 md:p-8">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-foreground/75">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-foreground/75">
          Work email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label htmlFor="contact-timeline" className="mb-2 block text-sm font-medium text-foreground/75">
          Preferred timeline
        </label>
        <select
          id="contact-timeline"
          name="timeline"
          value={timeline}
          onChange={(event) => setTimeline(event.target.value as (typeof timelineOptions)[number])}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
        >
          {timelineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-details" className="mb-2 block text-sm font-medium text-foreground/75">
          Project context
        </label>
        <textarea
          id="contact-details"
          name="details"
          required
          minLength={10}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={6}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
          placeholder="Tell us about goals, current blockers, and desired outcomes."
        />
      </div>

      <div>
        <label htmlFor="contact-attachment" className="mb-2 block text-sm font-medium text-foreground/75">
          Optional attachment
        </label>
        <input
          id="contact-attachment"
          type="file"
          onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />
      </div>

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitState === "submitting" ? "Sending..." : "Send project request"}
      </button>

      {message ? (
        <p className={submitState === "error" ? "text-sm text-red-600" : "text-sm text-emerald-700"}>{message}</p>
      ) : null}
    </form>
  );
}
