import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Vapi sends a wrapper "message" object
        const message = body.message;

        if (!message) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        // We only care about the end-of-call report for CRM logging
        if (message.type === "end-of-call-report") {
            const { call, transcript, summary, recordingUrl } = message;
            const callerNumber = call?.customer?.number || "Unknown Web Caller";

            console.log(`[VAPI Webhook] Call ended from ${callerNumber}`);
            console.log(`[VAPI Summary] ${summary}`);

            // 1. Send an email notification to the agency owner
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: `"Vapi AI Voice Agent" <${process.env.EMAIL_USER}>`,
                    to: "digitalxsolutions8@gmail.com", // Fallback, could be an env var
                    subject: `📞 New AI Voice Call Completed`,
                    html: `
            <h2>New AI Voice Lead / Call Completed</h2>
            <p><strong>Caller:</strong> ${callerNumber}</p>
            <p><strong>Duration:</strong> ${Math.round((call?.endedAt ? new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime() : 0) / 1000)} seconds</p>
            <p><strong>Cost:</strong> $${call?.cost || 0}</p>
            ${recordingUrl ? `<p><strong>Recording:</strong> <a href="${recordingUrl}">Listen here</a></p>` : ''}
            
            <hr />
            
            <h3>Call Summary:</h3>
            <p style="white-space: pre-wrap;">${summary || "No summary generated."}</p>
            
            <h3>Full Transcript:</h3>
            <p style="white-space: pre-wrap; color: #555;">${transcript || "No transcript available."}</p>
          `,
                });
                console.log("[VAPI Webhook] Email notification sent.");
            }

            // 2. Forward to CRM / n8n / GoHighLevel Webhook
            if (process.env.CRM_WEBHOOK_URL) {
                try {
                    await fetch(process.env.CRM_WEBHOOK_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            source: "Vapi Voice Agent",
                            callerNumber,
                            summary,
                            transcript,
                            recordingUrl,
                            callId: call?.id,
                        }),
                    });
                    console.log("[VAPI Webhook] Forwarded to CRM via webhook.");
                } catch (webhookErr) {
                    console.error("[VAPI Webhook] Failed to forward to CRM:", webhookErr);
                }
            }
        }

        // Vapi requires a 200 OK response or it will keep retrying
        return NextResponse.json({ success: true, received: true });

    } catch (error) {
        console.error("[VAPI Webhook] Error processing incoming webhook:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
