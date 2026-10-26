import dns from "node:dns";
import https from "node:https";
import http from "node:http";
import { scrapedLeads, ScrapedLead } from "./scraped-leads";
import { probeSmtpMailbox, resolveMxHost } from "./smtp-verifier";
import fs from "node:fs";
import path from "node:path";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {}

export interface VerifiedLead extends ScrapedLead {
  verifiedEmail: string;
  source: "scraped_website" | "direct_probe";
  smtpResponse: string;
}

function fetchUrl(url: string, timeoutMs = 6000): Promise<string> {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith("https") ? https : http;
      const req = client.get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
          timeout: timeoutMs,
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            let redirectUrl = res.headers.location;
            if (!redirectUrl.startsWith("http")) {
              redirectUrl = new URL(redirectUrl, url).href;
            }
            return fetchUrl(redirectUrl, timeoutMs).then(resolve);
          }
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve(data));
        }
      );
      req.on("error", () => resolve(""));
      req.on("timeout", () => {
        req.destroy();
        resolve("");
      });
    } catch {
      resolve("");
    }
  });
}

function extractDomainEmails(html: string, domain: string): string[] {
  const cleanDomain = domain.replace(/^www\./i, "").toLowerCase();
  const mailtoRegex = /mailto:([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const emails = new Set<string>();
  let match;

  while ((match = mailtoRegex.exec(html)) !== null) {
    const email = match[1].toLowerCase().trim().replace(/[.,]$/, "");
    if (email.endsWith(`@${cleanDomain}`) || email.endsWith(`.${cleanDomain}`)) {
      emails.add(email);
    }
  }

  const rawRegex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/gi;
  while ((match = rawRegex.exec(html)) !== null) {
    const e = match[0].toLowerCase().trim().replace(/[.,]$/, "");
    if (
      (e.endsWith(`@${cleanDomain}`) || e.endsWith(`.${cleanDomain}`)) &&
      !e.endsWith(".png") &&
      !e.endsWith(".jpg") &&
      !e.endsWith(".webp") &&
      !e.includes("sentry") &&
      !e.includes("wixpress")
    ) {
      emails.add(e);
    }
  }

  return Array.from(emails);
}

export async function findVerifiedEmailForLead(lead: ScrapedLead): Promise<VerifiedLead | null> {
  const cleanDomain = lead.domain.replace(/^www\./i, "").toLowerCase();
  console.log(`\n🔍 Investigating: ${lead.company} (${cleanDomain}) - ${lead.name}`);

  // 1. Check MX existence
  const mx = await resolveMxHost(cleanDomain);
  if (!mx) {
    console.log(`  ❌ No MX found for domain ${cleanDomain}. Skipping.`);
    return null;
  }
  console.log(`  ✔ MX Exchange: ${mx}`);

  // 2. Scrape website pages
  const candidateEmails = new Set<string>();

  const pagesToScrape = [
    `https://${cleanDomain}`,
    `https://${cleanDomain}/contact`,
    `https://${cleanDomain}/contact-us`,
    `https://${cleanDomain}/about`,
    `https://${cleanDomain}/about-us`,
    `https://${cleanDomain}/help`,
  ];

  for (const page of pagesToScrape) {
    const html = await fetchUrl(page);
    if (html) {
      const extracted = extractDomainEmails(html, cleanDomain);
      extracted.forEach((e) => candidateEmails.add(e));
    }
  }

  // Common direct mailbox patterns to probe if scraped set is small
  const first = lead.firstName.toLowerCase().replace(/[^a-z]/g, "");
  const last = lead.name.split(" ").slice(-1)[0]?.toLowerCase().replace(/[^a-z]/g, "");

  if (first) {
    candidateEmails.add(`${first}@${cleanDomain}`);
    if (last) {
      candidateEmails.add(`${first}.${last}@${cleanDomain}`);
      candidateEmails.add(`${first[0]}${last}@${cleanDomain}`);
    }
  }
  candidateEmails.add(`hello@${cleanDomain}`);
  candidateEmails.add(`contact@${cleanDomain}`);
  candidateEmails.add(`info@${cleanDomain}`);
  candidateEmails.add(`support@${cleanDomain}`);

  console.log(`  Testing candidates against mail server (${candidateEmails.size} candidates)...`);

  for (const candidate of candidateEmails) {
    process.stdout.write(`    Probing ${candidate}... `);
    const probe = await probeSmtpMailbox(candidate, 6000);
    if (probe.isValid) {
      console.log(`✔ ACCEPTED! (250 OK)`);
      return {
        ...lead,
        verifiedEmail: candidate,
        source: "direct_probe",
        smtpResponse: probe.message,
      };
    } else {
      console.log(`Rejected (${probe.code})`);
    }
  }

  console.log(`  ❌ No accepted mailboxes found for ${cleanDomain}. Skipping.`);
  return null;
}

export async function generateVerifiedLeadList() {
  console.log("============================================================");
  console.log("   DIGITALX SOLUTIONS — 100% VERIFIED LEAD GENERATOR        ");
  console.log("============================================================\n");
  console.log(`Checking ${scrapedLeads.length} scraped prospects with live SMTP probe...\n`);

  const outputPath = path.join(process.cwd(), "data", "verified-leads.json");
  const verified: VerifiedLead[] = [];

  for (let i = 0; i < scrapedLeads.length; i++) {
    const lead = scrapedLeads[i];
    const res = await findVerifiedEmailForLead(lead);
    if (res) {
      verified.push(res);
      fs.writeFileSync(outputPath, JSON.stringify(verified, null, 2), "utf8");
      console.log(`  🎉 ADDED TO VERIFIED LIST: ${res.verifiedEmail} (${verified.length} verified so far)`);
    }
  }

  console.log("\n============================================================");
  console.log(`VERIFICATION COMPLETE! Saved ${verified.length} verified leads to: ${outputPath}`);
  console.log("============================================================\n");
}

if (require.main === module) {
  generateVerifiedLeadList().catch(console.error);
}
