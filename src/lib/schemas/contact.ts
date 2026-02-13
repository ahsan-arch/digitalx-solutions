import { z } from "zod";

/**
 * Contact form schema — designed for high-ticket lead qualification.
 * Budget and timeline fields are intentional friction to filter tire-kickers.
 */
export const contactSchema = z.object({
  /* ── Identity ── */
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255)
    .trim()
    .toLowerCase(),

  company: z
    .string()
    .min(1, "Company name is required")
    .max(200)
    .trim(),

  role: z
    .string()
    .max(100)
    .trim()
    .optional(),

  website: z
    .string()
    .url("Please enter a valid URL (include https://)")
    .max(500)
    .optional()
    .or(z.literal("")),

  /* ── Qualification ── */
  service: z.enum(
    ["web-development", "meta-ads", "digital-marketing", "multiple", "not-sure"],
    { errorMap: () => ({ message: "Please select a service" }) }
  ),

  budget: z.enum(
    ["under-10k", "10k-25k", "25k-50k", "50k-100k", "100k-plus"],
    { errorMap: () => ({ message: "Please select a budget range" }) }
  ),

  timeline: z.enum(
    ["asap", "1-2-months", "3-6-months", "6-plus-months", "ongoing"],
    { errorMap: () => ({ message: "Please select a timeline" }) }
  ),

  /* ── Context ── */
  message: z
    .string()
    .min(20, "Please provide at least a brief description (20+ characters)")
    .max(5000, "Message must be under 5,000 characters")
    .trim(),

  currentMonthlyRevenue: z
    .string()
    .max(50)
    .trim()
    .optional(),

  currentAdSpend: z
    .string()
    .max(50)
    .trim()
    .optional(),

  howDidYouHear: z
    .string()
    .max(200)
    .trim()
    .optional(),

  /* ── Anti-spam ── */
  honeypot: z
    .string()
    .max(0, "Bot detected")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/* ── Human-readable labels for selects ── */

export const serviceOptions = [
  { value: "web-development", label: "Web Development & Engineering" },
  { value: "meta-ads", label: "Meta Ads Management" },
  { value: "digital-marketing", label: "Digital Marketing & Growth" },
  { value: "multiple", label: "Multiple Services" },
  { value: "not-sure", label: "Not sure yet — let's talk" },
];

export const budgetOptions = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 – $25,000" },
  { value: "25k-50k", label: "$25,000 – $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k-plus", label: "$100,000+" },
];

export const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "ongoing", label: "Ongoing retainer" },
];
