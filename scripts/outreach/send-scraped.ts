import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { scrapedLeads, ScrapedLead } from "./scraped-leads";
import { verifyDomainMx, validateEmailSyntax } from "./validator";
import { probeSmtpMailbox } from "./smtp-verifier";
import { OutreachTracker } from "./tracker";
import { defaultOutreachConfig } from "./config";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomDelayMs(minSec: number, maxSec: number): number {
  // Strictly enforce minimum 120 seconds (2 full minutes) between sends to prevent spam flagging
  const safeMin = Math.max(120, Math.min(minSec, maxSec));
  const safeMax = Math.max(safeMin, Math.max(minSec, maxSec));
  const seconds = Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
  return seconds * 1000;
}

export function generateHumanEmail(lead: ScrapedLead): { subject: string; body: string } {
  let subject = "";
  let body = "";

  switch (lead.category) {
    case "healthcare":
      subject = `patient phone inquiries at ${lead.company}`;
      body = `Hi ${lead.firstName},

I saw your work at ${lead.company} and wanted to reach out directly.

A frequent challenge we see with healthcare practices is that front desk staff simply cannot keep up with patient call volume. As a result, appointment requests and after hours inquiries often go straight to voicemail, which usually means the patient calls someone else.

We set up AI voice receptionists that pick up every call twenty four seven, answer common questions, and book appointments directly into your calendar without hold times. We also set up an automated text back that follows up in seconds if someone hangs up.

Would you be open to a quick five minute chat this week to see how this works for other clinics?

Best regards,
Ahsan
DigitalX Solutions
info@digitalx-solutions.com
+61 451 413 786

PS: If you would prefer not to receive emails from me, just reply and let me know.`;
      break;

    case "veterinary":
      subject = `quick question about appointment calls at ${lead.company}`;
      body = `Hi ${lead.firstName},

I came across your work at ${lead.company} and wanted to reach out.

In veterinary practices, we often see that emergency and routine calls spike right when the team is in the middle of treating an animal. That means pet owner calls get missed, and staff end up spending hours every day managing scheduling instead of focusing on patient care.

We built an AI voice assistant that answers calls instantly, separates emergency situations from routine checkups, and books appointments automatically so your clinical team stays focused on treatments.

Would you have five minutes this week for a brief conversation to see how it works?

Best regards,
Ahsan
DigitalX Solutions
info@digitalx-solutions.com
+61 451 413 786

PS: If you would prefer not to receive emails from me, just reply and let me know.`;
      break;

    case "beauty_wellness":
      subject = `booking inquiries at ${lead.company}`;
      body = `Hi ${lead.firstName},

I saw what you are building at ${lead.company} and wanted to send a quick note.

For wellness businesses, customer inquiries and booking requests often come in across phone calls, Instagram messages, and walk ins all at once. Without a centralized system, calls get missed while staff is working with clients and bookings slip through.

We set up unified CRM systems that bring all your messages and calls into one place, automatically text back anyone whose call was missed, and send automated rebooking reminders to keep your schedule full.

Would you be open to a quick five minute chat this week to see if this could help your team?

Best regards,
Ahsan
DigitalX Solutions
info@digitalx-solutions.com
+61 451 413 786

PS: If you would prefer not to receive emails from me, just reply and let me know.`;
      break;

    default: // professional_services
      subject = `lead follow up workflow at ${lead.company}`;
      body = `Hi ${lead.firstName},

I came across ${lead.company} and wanted to reach out directly.

A common bottleneck for growing service firms is that new inquiries and calls get handled manually without a structured pipeline. Because follow up is inconsistent, potential clients often go cold before a proposal even gets sent.

We build custom CRM and workflow automations that capture every lead instantly, trigger automated qualification, and route booked calls straight to your team without manual data entry.

Would you be open to a brief five minute chat this week to see how we set this up?

Best regards,
Ahsan
DigitalX Solutions
info@digitalx-solutions.com
+61 451 413 786

PS: If you would prefer not to receive emails from me, just reply and let me know.`;
      break;
  }

  return { subject, body };
}

export async function runScrapedOutreach(mode: "dry_run" | "send" | "test", testEmail?: string) {
  const tracker = new OutreachTracker();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "info@digitalx-solutions.com",
      pass: (process.env.EMAIL_PASS || "").replace(/\s+/g, ""),
    },
  });

  const senderName = process.env.OUTREACH_SENDER_NAME || "Ahsan | DigitalX Solutions";
  const senderEmail = process.env.OUTREACH_FROM_EMAIL || process.env.EMAIL_USER || "info@digitalx-solutions.com";
  const fromHeader = `"${senderName}" <${senderEmail}>`;

  console.log("\n============================================================");
  console.log("   DIGITALX SOLUTIONS — SCRAPED REPORT OUTREACH RUNNER       ");
  console.log("============================================================\n");
  console.log(`Total Leads in Report:  ${scrapedLeads.length}`);
  console.log(`Execution Mode:         ${mode.toUpperCase()}`);
  console.log(`Sender:                 ${fromHeader}\n`);

  if (mode === "test" && testEmail) {
    console.log(`Sending sample human emails across all 4 categories to: ${testEmail}...`);
    const sampleLeads: ScrapedLead[] = [
      scrapedLeads.find((l) => l.category === "healthcare")!,
      scrapedLeads.find((l) => l.category === "veterinary")!,
      scrapedLeads.find((l) => l.category === "beauty_wellness")!,
      scrapedLeads.find((l) => l.category === "professional_services")!,
    ].filter(Boolean);

    for (const lead of sampleLeads) {
      const emailContent = generateHumanEmail(lead);
      console.log(`\nSending [${lead.category}] sample for ${lead.company}...`);
      const info = await transporter.sendMail({
        from: fromHeader,
        to: testEmail,
        replyTo: "info@digitalx-solutions.com",
        subject: `[TEST SAMPLE - ${lead.category.toUpperCase()}] ${emailContent.subject}`,
        text: emailContent.body,
      });
      console.log(`✔ Sent! Message ID: ${info.messageId}`);
    }
    console.log("\nAll sample test emails delivered successfully.\n");
    return;
  }

  const remainingQuota = tracker.getRemainingDailyQuota(50);
  console.log(`Remaining Daily Quota: ${remainingQuota} emails`);

  if (remainingQuota <= 0 && mode === "send") {
    console.log("\nDaily 50-email quota has already been met for today. Halting.");
    return;
  }

  let sent = 0;
  let skipped = 0;

  // Prefer verified leads file if available
  const verifiedPath = path.join(process.cwd(), "data", "verified-leads.json");
  let leadsToProcess: ScrapedLead[] = scrapedLeads;
  if (fs.existsSync(verifiedPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));
      if (Array.isArray(parsed) && parsed.length > 0) {
        leadsToProcess = parsed.map((item: any) => ({
          ...item,
          email: item.verifiedEmail || item.email,
        }));
        console.log(`Loaded ${leadsToProcess.length} pre-verified leads from data/verified-leads.json`);
      }
    } catch {}
  }

  for (let i = 0; i < leadsToProcess.length && sent < remainingQuota; i++) {
    const lead = leadsToProcess[i];
    console.log(`------------------------------------------------------------`);
    console.log(`[${sent + 1}/${remainingQuota}] ${lead.name} — ${lead.title} (${lead.company})`);
    console.log(`  Category: ${lead.category} | Domain: ${lead.domain}`);
    console.log(`  Target Email: ${lead.email}`);
    console.log(`  Identified Problem: ${lead.problem}`);
    console.log(`  Offered Solution:   ${lead.solution}`);

    // Syntax validation
    const syntax = validateEmailSyntax(lead.email);
    if (!syntax.isValid) {
      console.log(`  ❌ Skipped: Invalid syntax.`);
      skipped++;
      continue;
    }

    // Duplicate check
    if (tracker.isAlreadyContacted(lead.email)) {
      console.log(`  ℹ Already contacted within last 60 days. Skipping duplicate.`);
      continue;
    }

    // Live SMTP Mailbox Verification Probe (HELO/MAIL FROM/RCPT TO)
    process.stdout.write(`  Probing recipient mailbox on ${lead.domain}... `);
    const probe = await probeSmtpMailbox(lead.email);
    if (!probe.isValid) {
      console.log(`REJECTED (${probe.code}). ${probe.message}`);
      console.log(`  ❌ Skipped to protect domain reputation against bounce.`);
      skipped++;
      continue;
    }
    console.log(`VERIFIED & ACCEPTED (250 OK) ✔`);

    const emailContent = generateHumanEmail(lead);

    if (mode === "dry_run") {
      console.log(`  Subject: "${emailContent.subject}"`);
      console.log(`  Message Preview:\n${emailContent.body.split("\n").slice(0, 4).join("\n  ")}...`);
      console.log(`  ✔ Dry-run passed.`);
      sent++;
      continue;
    }

    // Live send
    try {
      const info = await transporter.sendMail({
        from: fromHeader,
        to: lead.email,
        replyTo: "info@digitalx-solutions.com",
        subject: emailContent.subject,
        text: emailContent.body,
      });

      console.log(`  🚀 SENT! Message ID: ${info.messageId}`);
      tracker.recordSend({
        email: lead.email,
        name: lead.name,
        company: lead.company,
        industry: "b2b",
        subject: emailContent.subject,
        sentAt: new Date().toISOString(),
        status: "sent",
        provider: "smtp",
        messageId: info.messageId,
      });
      sent++;

      // Strict anti-spam break (minimum 2 minutes)
      if (sent < remainingQuota) {
        const delayMs = getRandomDelayMs(defaultOutreachConfig.minDelaySeconds, defaultOutreachConfig.maxDelaySeconds);
        console.log(`  ⏳ Anti-spam break: Waiting ${(delayMs / 1000).toFixed(0)}s (minimum 2 minutes) to protect inbox placement...`);
        await sleep(delayMs);
      }
    } catch (err: any) {
      console.log(`  ❌ Send error: ${err.message}`);
      skipped++;
    }
  }

  console.log("\n============================================================");
  console.log(`EXECUTION FINISHED: Sent: ${sent} | Skipped: ${skipped}`);
  console.log("============================================================\n");
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const isTest = args.includes("--test");
  const isDryRun = args.includes("--dry-run");
  const isSend = args.includes("--send") && !isDryRun;
  const testEmail = isTest ? args[args.indexOf("--test") + 1] || "jazibshahid0@gmail.com" : undefined;

  const mode = isTest ? "test" : isSend ? "send" : "dry_run";
  runScrapedOutreach(mode, testEmail).catch((err) => {
    console.error("Outreach runner failed:", err);
    process.exit(1);
  });
}
