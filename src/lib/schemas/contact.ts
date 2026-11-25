import { z } from "zod";

export const contactAttachmentSchema = z.object({
  name: z.string(),
  type: z.string(),
  content: z.string(),
});

export const contactSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    contact: z.string().optional(),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().optional(),
    need: z.string().optional(),
    callbackRequested: z.boolean().optional(),
    timeline: z.enum(["1-3 Months", "3-6 Months", "ASAP"]).optional().default("ASAP"),
    details: z.string().min(5, "Tell us briefly what you need"),
    attachment: contactAttachmentSchema.nullable().optional(),
  })
  .refine(
    (data) =>
      Boolean(
        (data.email && data.email.trim().length > 0) ||
          (data.contact && data.contact.trim().length >= 5) ||
          (data.phone && data.phone.trim().length >= 5)
      ),
    {
      message: "Please provide an email address or phone number",
      path: ["contact"],
    }
  );

export type ContactFormInput = z.infer<typeof contactSchema>;
