import { OutreachConfig } from "./types";

export const defaultOutreachConfig: OutreachConfig = {
  dailyCap: parseInt(process.env.OUTREACH_DAILY_CAP || "50", 10),
  minDelaySeconds: parseInt(process.env.OUTREACH_MIN_DELAY_SEC || "45", 10),
  maxDelaySeconds: parseInt(process.env.OUTREACH_MAX_DELAY_SEC || "120", 10),
  senderName: process.env.OUTREACH_SENDER_NAME || "Ahsan Architect",
  senderEmail: process.env.OUTREACH_FROM_EMAIL || "ahsan@digitalx-solutions.com",
  replyTo: process.env.OUTREACH_REPLY_TO || "info@digitalx-solutions.com",
  companyAddress: "DigitalX Solutions, 16 Boldrewood Ave, Casula NSW 2170, Australia",
  provider: (process.env.OUTREACH_PROVIDER as "resend" | "smtp" | "dry_run") || "dry_run",
};

export function getProviderConfig() {
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasSmtp = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

  if (hasResend) {
    return {
      provider: "resend" as const,
      apiKey: process.env.RESEND_API_KEY!,
    };
  }

  if (hasSmtp) {
    return {
      provider: "smtp" as const,
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: process.env.SMTP_SECURE !== "false",
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    };
  }

  return {
    provider: "dry_run" as const,
  };
}
