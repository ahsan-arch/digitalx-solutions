import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/schemas/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const { name, email, contact, phone, need, callbackRequested, timeline, details, attachment } = result.data;
    const contactDisplay = email || contact || phone || "Not provided";
    const resolvedEmail = email && email.includes("@") ? email : contact && contact.includes("@") ? contact : "";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions: Record<string, unknown> = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      ...(resolvedEmail ? { replyTo: resolvedEmail } : {}),
      to: "info@digitalx-solutions.com",
      subject: `New Lead: ${name}${need ? ` (${need})` : ""}, DigitalX Solutions`,
      text: `
        New Lead Submission
        -------------------
        Name:               ${name}
        Email / Phone:      ${contactDisplay}
        Need / Focus:       ${need || "General"}
        Callback Requested: ${callbackRequested ? "Yes" : "No"}
        Timeline:           ${timeline}
        
        Details:
        ${details}
      `,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email / Phone:</strong> ${contactDisplay}</p>
        <p><strong>Need / Focus:</strong> ${need || "General"}</p>
        <p><strong>Callback Requested:</strong> ${callbackRequested ? "Yes" : "No"}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <br/>
        <h3>Project Details:</h3>
        <p style="white-space: pre-wrap;">${details}</p>
      `,
    };

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

    await transporter.sendMail(mailOptions);

    if (resolvedEmail) {
      await transporter.sendMail({
        from: `"DigitalX Solutions" <${process.env.EMAIL_USER}>`,
        to: resolvedEmail,
        subject: `We've received your request, ${name}!`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Thank you for reaching out, ${name}!</h2>
            <p>We have received your request and our solutions engineering team is reviewing the details.</p>
            <p>We will get back to you within <strong>one business day</strong>.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>DigitalX Solutions</strong></p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
