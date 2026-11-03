import fs from "fs";
import dns from "dns/promises";
import { scrapedLeads } from "./scraped-leads";

const history = JSON.parse(fs.readFileSync("data/outreach-history.json", "utf8"));
const sentEmails = new Set(history.filter((r: any) => r.status === "sent").map((r: any) => r.email.toLowerCase().trim()));
const sentCompanies = new Set(history.filter((r: any) => r.status === "sent").map((r: any) => (r.company || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim()));

async function verifyMx(domain: string): Promise<boolean> {
  const timeoutPromise = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 2500));
  const dnsPromise = dns.resolveMx(domain).then((records) => records && records.length > 0).catch(() => false);
  return Promise.race([dnsPromise, timeoutPromise]);
}

async function check() {
  console.log("Checking scraped leads...");
  for (const lead of scrapedLeads) {
    const email = (lead.email || "").toLowerCase().trim();
    const cleanCompany = (lead.company || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();
    const isEmailSent = sentEmails.has(email);
    const isCompanySent = sentCompanies.has(cleanCompany);
    if (isEmailSent || isCompanySent) {
      console.log(`Company/Email already contacted: ${lead.company} (${email}) - emailSent: ${isEmailSent}, companySent: ${isCompanySent}`);
    } else {
      const domain = email.split("@")[1];
      const mx = domain ? await verifyMx(domain) : false;
      console.log(`Uncontacted: ${lead.company} (${email}) | MX: ${mx}`);
    }
  }
}

check();

