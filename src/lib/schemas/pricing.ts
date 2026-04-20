import { z } from "zod";

export const pricingInquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    description: z.string().min(10, "Please provide some details"),
    planName: z.string(),
    planPrice: z.string(),
});

export type PricingInquiryInput = z.infer<typeof pricingInquirySchema>;
