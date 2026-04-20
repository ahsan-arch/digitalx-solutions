import { z } from "zod";

export const contactAttachmentSchema = z.object({
    name: z.string(),
    type: z.string(),
    content: z.string(),
});

export const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    timeline: z.enum(["1-3 Months", "3-6 Months", "ASAP"]),
    details: z.string().min(10, "Tell us more about the project"),
    attachment: contactAttachmentSchema.nullable().optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
