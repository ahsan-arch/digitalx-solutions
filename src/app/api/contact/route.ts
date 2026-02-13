import { z } from "zod";
import { NextResponse } from "next/server";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  timeline: z.enum(["1-3 Months", "3-6 Months", "ASAP"]),
  budget: z.enum(["$5k-$10k", "$10k-$25k", "$25k+"]),
  details: z.string().min(10, "Tell us more about the project"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // In a real app, send email/Slack notification here
    console.log("Lead Received:", result.data);

    return NextResponse.json({ success: true, message: "Message received." });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
