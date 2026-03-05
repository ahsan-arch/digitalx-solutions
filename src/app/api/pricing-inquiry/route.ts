import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs"; // Force Node.js runtime for nodemailer compatibility
export const dynamic = "force-dynamic";

const pricingSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    description: z.string().min(10, "Please provide some details"),
    planName: z.string(),
    planPrice: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = pricingSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, description, planName, planPrice } = result.data;

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Email to Admin
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: "info@digitalx-solutions.com",
            subject: `New Pricing Inquiry: ${planName} Plan`,
            html: `
        <h2>New Pricing Inquiry</h2>
        <p><strong>Plan:</strong> ${planName} (${planPrice})</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <h3>Project Description:</h3>
        <p style="white-space: pre-wrap;">${description}</p>
      `,
        });

        // 2. Thank You Email to User
        await transporter.sendMail({
            from: `"Digital X Solutions" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `We've received your request for the ${planName} Plan`,
            html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Thank you for your interest, ${name}!</h2>
          <p>We have received your inquiry regarding the <strong>${planName} Plan</strong>.</p>
          <p>Our team calculates custom strategies for every client. We will review your project details and get back to you shortly to discuss the next steps.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The Digital X Solutions Team</strong></p>
        </div>
      `,
        });

        return NextResponse.json({ success: true, message: "Inquiry sent successfully." });
    } catch (error) {
        console.error("Error processing pricing inquiry:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
