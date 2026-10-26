export type IndustryVertical = "trades" | "dental" | "b2b" | "general";

export interface Lead {
  email: string;
  name: string;
  company: string;
  industry: IndustryVertical;
  city?: string;
  country?: "AU" | "US" | "Global";
  website?: string;
  phone?: string;
  notes?: string;
}

export interface EmailTemplate {
  subject: string;
  bodyText: string;
  bodyHtml: string;
}

export interface SendRecord {
  email: string;
  name: string;
  company: string;
  industry: IndustryVertical;
  subject: string;
  sentAt: string;
  status: "sent" | "dry_run" | "skipped_daily_limit" | "skipped_duplicate" | "skipped_invalid_mx" | "unsubscribed" | "bounced" | "failed";
  provider: string;
  messageId?: string;
  error?: string;
}

export interface OutreachConfig {
  dailyCap: number; // default: 50
  minDelaySeconds: number; // default: 60s
  maxDelaySeconds: number; // default: 180s
  senderName: string;
  senderEmail: string;
  replyTo: string;
  companyAddress: string;
  provider: "resend" | "smtp" | "dry_run";
}
