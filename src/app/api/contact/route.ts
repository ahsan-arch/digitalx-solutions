import { z } from "zod";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Force Node.js runtime for nodemailer compatibility
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  timeline: z.enum(["1-3 Months", "3-6 Months", "ASAP"]),
  details: z.string().min(10, "Tell us more about the project"),
  attachment: z.object({
    name: z.string(),
    type: z.string(),
    content: z.string(), // Base64 content
  }).nullable().optional(),
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

    const { name, email, timeline, details, attachment } = result.data;

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email content
    const mailOptions: any = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Send AS the app email, but with user's name
      replyTo: email, // Reply to the user's email
      to: "digitalxsolutions8@gmail.com",
      subject: `New Lead: ${name} - Digital X Solutions`,
      text: `
        New Lead Submission
        -------------------
        Name:     ${name}
        Email:    ${email}
        Timeline: ${timeline}
        
        Project Details:
        ${details}
      `,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <br/>
        <h3>Project Details:</h3>
        <p style="white-space: pre-wrap;">${details}</p>
      `,
    };

    // Add attachment if present
    if (attachment) {
      mailOptions.attachments = [
        {
          filename: attachment.name,
          content: attachment.content,
          encoding: "base64",
          contentType: attachment.type,
        },
      ];
    }

    // Send the email to admin
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to digitalxsolutions8@gmail.com");

    // Send thank-you email to the customer
    await transporter.sendMail({
      from: `"Digital X Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your request, ${name}!`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Thank you for reaching out, ${name}!</h2>
          <p>We have received your project request and our team is already reviewing the details.</p>
          <p>We will get back to you within <strong>24 hours</strong> to discuss the next steps.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The Digital X Solutions Team</strong></p>
        </div>
      `,
    });
    console.log("Thank-you email sent to", email);

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
