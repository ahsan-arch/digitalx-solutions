import nodemailer from "nodemailer";
import { Lead, SendRecord } from "./types";
import { defaultOutreachConfig, getProviderConfig } from "./config";
import { renderTemplate } from "./templates";
import { validateEmailSyntax, verifyDomainMx } from "./validator";
import { OutreachTracker } from "./tracker";
import { loadLeadsFromCsv, sampleSeedLeads } from "./leads";

interface RunOptions {
  mode: "dry_run" | "send" | "stats";
  vertical?: "trades" | "dental" | "b2b" | "all";
  csvPath?: string;
  limit?: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomDelayMs(minSec: number, maxSec: number): number {
  const min = Math.min(minSec, maxSec);
  const max = Math.max(minSec, maxSec);
  const seconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return seconds * 1000;
}

async function sendViaResend(
  apiKey: string,
  from: string,
  to: string,
  replyTo: string,
  subject: string,
  text: string,
  html: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        text,
        html,
      }),
    });

    const data = (await res.json()) as any;
    if (!res.ok) {
      return { success: false, error: data?.message || `HTTP ${res.status}` };
    }
    return { success: true, messageId: data?.id };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}

async function sendViaSmtp(
  smtpConfig: any,
  from: string,
  to: string,
  replyTo: string,
  subject: string,
  text: string,
  html: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transportOpts: any = {
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    };

    if (smtpConfig.service === "gmail") {
      transportOpts.service = "gmail";
    } else {
      transportOpts.host = smtpConfig.host;
      transportOpts.port = smtpConfig.port;
      transportOpts.secure = smtpConfig.secure;
    }

    const transporter = nodemailer.createTransport(transportOpts);

    const info = await transporter.sendMail({
      from,
      to,
      replyTo,
      subject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}

export async function runOutreach(options: RunOptions) {
  const tracker = new OutreachTracker();
  const providerConfig = getProviderConfig();
  const dailyCap = options.limit || defaultOutreachConfig.dailyCap;

  console.log("\n============================================================");
  console.log("       DIGITALX SOLUTIONS — AUTOMATED OUTREACH ENGINE        ");
  console.log("============================================================\n");

  if (options.mode === "stats") {
    const stats = tracker.getStats(dailyCap);
    console.log("Current Outreach Telemetry:");
    console.log(`  Daily Sending Cap:       ${stats.dailyCap} emails/day`);
    console.log(`  Sent Today:              ${stats.todaySent} emails`);
    console.log(`  Remaining Daily Quota:   ${stats.remainingQuota} emails`);
    console.log(`  Lifetime Contacts Sent:  ${stats.totalSent} emails`);
    console.log(`  Unique Prospects:        ${stats.uniqueContacts}`);
    console.log(`  Unsubscribed Addresses:  ${stats.unsubscribesCount}`);
    console.log("============================================================\n");
    return;
  }

  const remainingQuota = tracker.getRemainingDailyQuota(dailyCap);
  console.log(`Daily Quota: ${dailyCap} | Sent Today: ${tracker.getTodaySentCount()} | Available Today: ${remainingQuota}`);
  console.log(`Active Mode: ${options.mode.toUpperCase()}`);
  console.log(`Configured Sender: "${defaultOutreachConfig.senderName}" <${defaultOutreachConfig.senderEmail}>`);
  console.log(`Delivery Provider: ${providerConfig.provider.toUpperCase()}`);

  if (remainingQuota <= 0 && options.mode === "send") {
    console.log("\n⚠️ Daily quota of 50 emails has already been reached for today.");
    console.log("To protect domain sender reputation, no further emails will be sent until tomorrow 00:00:00.\n");
    return;
  }

  // Sourcing leads
  let leads: Lead[] = [];
  if (options.csvPath) {
    console.log(`\nLoading leads from CSV: ${options.csvPath}`);
    leads = loadLeadsFromCsv(options.csvPath);
  } else {
    console.log(`\nLoading leads from built-in verified prospect database...`);
    leads = sampleSeedLeads;
  }

  if (options.vertical && options.vertical !== "all") {
    leads = leads.filter((l) => l.industry === options.vertical);
    console.log(`Filtered for vertical: "${options.vertical}" (${leads.length} available)`);
  }

  let sentCount = 0;
  let skippedCount = 0;
  const targetBatchSize = Math.min(leads.length, remainingQuota);

  console.log(`\nBeginning batch run of up to ${targetBatchSize} prospects...\n`);

  for (let i = 0; i < leads.length && sentCount < remainingQuota; i++) {
    const lead = leads[i];
    console.log(`------------------------------------------------------------`);
    console.log(`[${sentCount + 1}/${targetBatchSize}] Processing: ${lead.name} (${lead.company})`);
    console.log(`  Email: ${lead.email} | Industry: ${lead.industry} | Location: ${lead.city || "N/A"}`);

    // 1. Check Unsubscribe
    if (tracker.isUnsubscribed(lead.email)) {
      console.log(`  ⏭️ Skipped: Recipient previously unsubscribed.`);
      skippedCount++;
      continue;
    }

    // 2. Check 60-day duplicate prevention
    if (tracker.isAlreadyContacted(lead.email, 60)) {
      console.log(`  ⏭️ Skipped: Already contacted within last 60 days.`);
      skippedCount++;
      continue;
    }

    // 3. Syntax validation
    const syntax = validateEmailSyntax(lead.email);
    if (!syntax.isValid) {
      console.log(`  ❌ Skipped: Invalid email format (${syntax.reason}).`);
      skippedCount++;
      continue;
    }

    // 4. MX Record verification to protect against hard bounces
    process.stdout.write(`  Checking MX records for domain... `);
    const hasMx = await verifyDomainMx(lead.email);
    if (!hasMx) {
      console.log(`FAILED! Domain does not accept incoming emails.`);
      console.log(`  ❌ Skipped: Protect sender reputation against hard bounce.`);
      tracker.recordSend({
        email: lead.email,
        name: lead.name,
        company: lead.company,
        industry: lead.industry,
        subject: "N/A",
        sentAt: new Date().toISOString(),
        status: "skipped_invalid_mx",
        provider: providerConfig.provider,
      });
      skippedCount++;
      continue;
    }
    console.log(`VERIFIED ✔`);

    // 5. Render Personalized Template
    const template = renderTemplate(lead);

    if (options.mode === "dry_run") {
      console.log(`  Subject: "${template.subject}"`);
      console.log(`  [DRY RUN] Email verified and validated. Message preview:`);
      console.log(`  ----------------------------------------------------------`);
      console.log(`  ${template.bodyText.split("\n").slice(0, 5).join("\n  ")}...`);
      console.log(`  ----------------------------------------------------------`);
      console.log(`  ✔ Status: Dry-run passed successfully.`);
      sentCount++;
      continue;
    }

    // 6. Live Send Mode
    const fromHeader = `"${defaultOutreachConfig.senderName}" <${defaultOutreachConfig.senderEmail}>`;
    let result: { success: boolean; messageId?: string; error?: string };

    if (providerConfig.provider === "resend") {
      result = await sendViaResend(
        providerConfig.apiKey,
        fromHeader,
        lead.email,
        defaultOutreachConfig.replyTo,
        template.subject,
        template.bodyText,
        template.bodyHtml
      );
    } else if (providerConfig.provider === "smtp") {
      result = await sendViaSmtp(
        providerConfig,
        fromHeader,
        lead.email,
        defaultOutreachConfig.replyTo,
        template.subject,
        template.bodyText,
        template.bodyHtml
      );
    } else {
      console.log(`  ⚠️ No sending credentials configured. Defaulting to safe dry run.`);
      result = { success: true, messageId: "dry_run_simulated" };
    }

    if (result.success) {
      console.log(`  🚀 SENT successfully! Message ID: ${result.messageId || "ok"}`);
      tracker.recordSend({
        email: lead.email,
        name: lead.name,
        company: lead.company,
        industry: lead.industry,
        subject: template.subject,
        sentAt: new Date().toISOString(),
        status: "sent",
        provider: providerConfig.provider,
        messageId: result.messageId,
      });
      sentCount++;
    } else {
      console.log(`  ❌ Send failed: ${result.error}`);
      tracker.recordSend({
        email: lead.email,
        name: lead.name,
        company: lead.company,
        industry: lead.industry,
        subject: template.subject,
        sentAt: new Date().toISOString(),
        status: "bounced",
        provider: providerConfig.provider,
        error: result.error,
      });
      skippedCount++;
    }

    // Apply human jitter delay between sends (if more to send)
    if (sentCount < targetBatchSize && options.mode === "send") {
      const delayMs = getRandomDelayMs(defaultOutreachConfig.minDelaySeconds, defaultOutreachConfig.maxDelaySeconds);
      console.log(`  ⏳ Jitter delay: Waiting ${(delayMs / 1000).toFixed(0)}s before next send to protect domain...`);
      await sleep(delayMs);
    }
  }

  console.log("\n============================================================");
  console.log("                    RUN EXECUTION SUMMARY                   ");
  console.log("============================================================");
  console.log(`Mode:            ${options.mode.toUpperCase()}`);
  console.log(`Processed:       ${sentCount}`);
  console.log(`Skipped:         ${skippedCount}`);
  console.log(`Remaining Quota: ${tracker.getRemainingDailyQuota(dailyCap)} emails`);
  console.log("============================================================\n");
}

// CLI Execution entrypoint
if (require.main === module) {
  const args = process.argv.slice(2);
  const isSend = args.includes("--send");
  const isStats = args.includes("--stats");
  const isDryRun = args.includes("--dry-run") || (!isSend && !isStats);

  const verticalIdx = args.indexOf("--vertical");
  const vertical = verticalIdx !== -1 ? (args[verticalIdx + 1] as any) : "all";

  const csvIdx = args.indexOf("--csv");
  const csvPath = csvIdx !== -1 ? args[csvIdx + 1] : undefined;

  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : 50;

  runOutreach({
    mode: isStats ? "stats" : isSend ? "send" : "dry_run",
    vertical,
    csvPath,
    limit,
  }).catch((err) => {
    console.error("Fatal outreach error:", err);
    process.exit(1);
  });
}
