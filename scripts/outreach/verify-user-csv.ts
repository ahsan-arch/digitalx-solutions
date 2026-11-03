import dns from "dns/promises";
import fs from "fs";
import { Lead } from "./types";

const rawLeads: Array<Lead & { rawName?: string }> = [
  { name: "Empire Roofing Team", email: "info@empireroofing.com.au", company: "Empire Roofing", industry: "trades", city: "Sydney, NSW", country: "AU", website: "https://empireroofing.com.au" },
  { name: "Daniel", email: "daniel@roofranger.com.au", company: "Roof Ranger", industry: "trades", city: "Penrith, NSW", country: "AU", website: "https://roofranger.com.au" },
  { name: "Sydney Discount Roof Repair Team", email: "info@roof-restoration-in-sydney.com.au", company: "Sydney Discount Roof Repair", industry: "trades", city: "Parramatta, NSW", country: "AU", website: "https://roof-restoration-in-sydney.com.au" },
  { name: "Sydney Roof Restoration Team", email: "sydneyroofrestorationsnsw@outlook.com", company: "Sydney Roof Restoration", industry: "trades", city: "Casula, NSW", country: "AU", website: "https://sydneyroofrestorationsnsw.com.au" },
  { name: "Clay", email: "clayroser@hotmail.com", company: "Sydney Roof Repairs & Restorations", industry: "trades", city: "Sydney, NSW", country: "AU", website: "https://sydneyroofrepairsandrestorations.com.au" },
  { name: "Roof Repairs Sydney Team", email: "info@roofrepairssydney.com.au", company: "Roof Repairs Sydney", industry: "trades", city: "Sutherland Shire, NSW", country: "AU", website: "https://roofrepairssydney.com.au" },
  { name: "Aaron", email: "aaron@sydneyroofrevival.com.au", company: "Sydney Roof Revival", industry: "trades", city: "Sydney, NSW", country: "AU", website: "https://sydneyroofrevival.com.au" },
  { name: "Sydney Gutter & Roof Restoration Team", email: "info@sydneygrr.com.au", company: "Sydney Gutter & Roof Restoration", industry: "trades", city: "Seven Hills, NSW", country: "AU", website: "https://sydneygrr.com.au" },
  { name: "Roofline Team", email: "info@rooflines.com.au", company: "Roofline", industry: "trades", city: "Sydney, NSW", country: "AU", website: "https://rooflines.com.au" },
  { name: "The Local Plumber Team", email: "info@thelocalplumber.com.au", company: "The Local Plumber", industry: "trades", city: "Melbourne, VIC", country: "AU", website: "https://thelocalplumber.com.au" },
  { name: "Expert Plumbing Team", email: "info@expertplumbing.com.au", company: "Expert Plumbing & Gas Services", industry: "trades", city: "Brunswick, VIC", country: "AU", website: "https://expertplumbing.com.au" },
  { name: "Bruce", email: "bruce@gbrand.com.au", company: "G. Brand & Sons Plumbing", industry: "trades", city: "Cheltenham, VIC", country: "AU", website: "https://gbrand.com.au" },
  { name: "Guardian Plumbing Team", email: "admin@guardianplumbing.com.au", company: "Guardian Plumbing", industry: "trades", city: "Hawthorn, VIC", country: "AU", website: "https://guardianplumbing.net.au" },
  { name: "Incor Plumber Team", email: "info@incorplumbermelbourne.com.au", company: "Incor Plumber Melbourne", industry: "trades", city: "Melbourne, VIC", country: "AU", website: "https://incorplumbermelbourne.com.au" },
  { name: "Around Town Plumbing Team", email: "info@atplumbingmelbourne.com.au", company: "Around Town Plumbing", industry: "trades", city: "Dandenong, VIC", country: "AU", website: "https://atplumbingmelbourne.com.au" },
  { name: "A&C Plumbing Team", email: "office@aandcplumbing.com", company: "A&C Plumbing", industry: "trades", city: "Yarraville, VIC", country: "AU", website: "https://aandcplumbing.com.au" },
  { name: "Local Plumbing Melbourne Team", email: "info@localplumbingmelbourne.com.au", company: "Local Plumbing Melbourne", industry: "trades", city: "Melbourne, VIC", country: "AU", website: "https://localplumbingmelbourne.com.au" },
  { name: "Taylor Brothers Team", email: "info@taylorbrothersplumbing.com.au", company: "Taylor Brothers Plumbing", industry: "trades", city: "Melbourne, VIC", country: "AU", website: "https://taylorbrothersplumbing.com.au" },
  { name: "Discount AC Team", email: "sales@discountACR.com", company: "Discount AC & Refrigeration", industry: "trades", city: "Phoenix, AZ", country: "US", website: "https://discountacr.com" },
  { name: "Icon Mechanical Team", email: "Office@iconmechanicalinc.com", company: "Icon Mechanical Inc", industry: "trades", city: "Goodyear, AZ", country: "US", website: "https://iconmechanicalinc.com" },
  { name: "Gonzales Heating & Cooling Team", email: "gonzaleshtandcl@aol.com", company: "Gonzales Heating & Cooling", industry: "trades", city: "Phoenix, AZ", country: "US", website: "https://gonzaleshc.com" },
  { name: "Heath's Air Team", email: "info@heathsair.com", company: "Heath's Air, LLC", industry: "trades", city: "Mesa, AZ", country: "US", website: "https://heathsair.com" },
  { name: "Arrington Roofing Team", email: "info@arringtonroofing.com", company: "Arrington Roofing", industry: "trades", city: "Dallas, TX", country: "US", website: "https://arringtonroofing.com" },
  { name: "American Dream Roofing Team", email: "info@adcroofing.com", company: "American Dream Roofing", industry: "trades", city: "Dallas, TX", country: "US", website: "https://adcroofing.com" },
  { name: "CLC Roofing Team", email: "info@clcroofing.com", company: "CLC Roofing Inc", industry: "trades", city: "Coppell, TX", country: "US", website: "https://clcroofing.com" },
];

async function verifyMxWithTimeout(domain: string, timeoutMs: number = 3000): Promise<boolean> {
  const timeoutPromise = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), timeoutMs));
  const dnsPromise = dns.resolveMx(domain).then((records) => records && records.length > 0).catch(() => false);
  return Promise.race([dnsPromise, timeoutPromise]);
}

async function main() {
  const history: any[] = JSON.parse(fs.readFileSync("data/outreach-history.json", "utf8"));
  const sentEmails = new Set(history.filter((r) => r.status === "sent").map((r) => r.email.toLowerCase().trim()));

  console.log(`Analyzing ${rawLeads.length} leads provided by user...`);
  const verified: typeof rawLeads = [];
  const skipped: any[] = [];

  for (const lead of rawLeads) {
    const email = lead.email.toLowerCase().trim();
    if (sentEmails.has(email)) {
      console.log(`⏭️ Skipped (already contacted): ${email} (${lead.company})`);
      skipped.push({ email, reason: "already_contacted" });
      continue;
    }

    const domain = email.split("@")[1];
    const hasMx = await verifyMxWithTimeout(domain);
    if (!hasMx) {
      console.log(`❌ Skipped (No MX/Bounce Risk): ${email} (${lead.company})`);
      skipped.push({ email, reason: "no_mx" });
      continue;
    }

    console.log(`✔ Verified & Deliverable: ${email} (${lead.company}) - ${lead.city}`);
    verified.push(lead);
  }

  console.log(`\n============================================================`);
  console.log(`Total Leads Provided:    ${rawLeads.length}`);
  console.log(`Verified Deliverable:    ${verified.length}`);
  console.log(`Skipped:                 ${skipped.length}`);
  console.log(`============================================================\n`);

  // Write verified leads into data/user-targets.csv
  const headers = "name,email,company,industry,city,country,website\n";
  const rows = verified
    .map(
      (l) =>
        `"${l.name}","${l.email}","${l.company}","${l.industry}","${l.city}","${l.country}","${l.website}"`
    )
    .join("\n");
  fs.writeFileSync("data/user-targets.csv", headers + rows, "utf8");
  console.log(`Saved ${verified.length} verified leads to data/user-targets.csv`);
}

main().catch(console.error);

