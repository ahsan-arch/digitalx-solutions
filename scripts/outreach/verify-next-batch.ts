import dns from "dns/promises";
import fs from "fs";
import { Lead } from "./types";

const candidates: Array<Lead & { rawName?: string }> = [
  // Florida - Roofing & Plumbing
  { name: "Brannan Roofing Team", email: "info@brannanroofing.com", company: "Brannan Roofing LLC", industry: "trades", city: "Jacksonville, FL", country: "US", website: "https://brannanroofing.com" },
  { name: "Prime Roofing Team", email: "office@primeroofingfl.com", company: "Prime Roofing", industry: "trades", city: "Jacksonville, FL", country: "US", website: "https://primeroofingfl.com" },
  { name: "Cache Roofing Team", email: "info@cacheroofing.com", company: "Cache Roofing", industry: "trades", city: "Jacksonville, FL", country: "US", website: "https://cacheroofing.com" },
  { name: "Fortress Roofing Team", email: "info@fortressrc.com", company: "Fortress Roofing", industry: "trades", city: "Jacksonville, FL", country: "US", website: "https://fortressrc.com" },
  { name: "Stonebridge Roofing Team", email: "info@stonebridgebuilt.com", company: "Stonebridge Roofing", industry: "trades", city: "Jacksonville, FL", country: "US", website: "https://stonebridgebuilt.com" },
  { name: "Turner Plumbing Team", email: "info@turnerplumbingco.com", company: "Turner Plumbing Company", industry: "trades", city: "Jacksonville, FL", country: "US", website: "https://turnerplumbingco.com" },
  { name: "Mesic Construction Team", email: "info@mesicconstruction.com", company: "Mesic Construction & Plumbing", industry: "trades", city: "Jacksonville, FL", country: "US", website: "https://mesicconstruction.com" },

  // Nevada - HVAC & Plumbing
  { name: "Buenos Aires AC Team", email: "info@buenosairesac.com", company: "Buenos Aires Air Conditioning", industry: "trades", city: "Las Vegas, NV", country: "US", website: "https://buenosairesac.com" },
  { name: "USA Air Conditioning Team", email: "info@usa-airconditioning.com", company: "U.S.A. Air Conditioning", industry: "trades", city: "Las Vegas, NV", country: "US", website: "https://usa-airconditioning.com" },
  { name: "Support Refrigeration Team", email: "info@supportrefrigerationinc.com", company: "Support Refrigeration Inc", industry: "trades", city: "Las Vegas, NV", country: "US", website: "https://supportrefrigerationinc.com" },
  { name: "Plumbing Pros Team", email: "info@plumbingprosnv.com", company: "Plumbing Pros Las Vegas", industry: "trades", city: "Las Vegas, NV", country: "US", website: "https://plumbingprosnv.com" },
  { name: "Service Plus Plumbing Team", email: "info@myvegasplumber.com", company: "Service Plus Plumbing", industry: "trades", city: "Henderson, NV", country: "US", website: "https://myvegasplumber.com" },

  // Washington - HVAC & Plumbing
  { name: "Greenwood Heating Team", email: "service@greenwoodheating.com", company: "Greenwood Heating", industry: "trades", city: "Seattle, WA", country: "US", website: "https://greenwoodheating.com" },
  { name: "Aakool Heating Team", email: "info@aakool.com", company: "Aakool Heating and Cooling", industry: "trades", city: "Seattle, WA", country: "US", website: "https://aakool.com" },
  { name: "Evergreen HVAC Team", email: "sales@evergreenhvac.com", company: "Evergreen Commercial HVAC", industry: "trades", city: "Seattle, WA", country: "US", website: "https://evergreenhvac.com" },
  { name: "Seattle Plumbing Team", email: "info@seattleplumbingllc.com", company: "Seattle Plumbing LLC", industry: "trades", city: "Seattle, WA", country: "US", website: "https://seattleplumbingllc.com" },

  // Texas - Plumbing, Roofing & Dental
  { name: "COR Plumbing Team", email: "info@corplumbing.net", company: "COR Plumbing", industry: "trades", city: "San Antonio, TX", country: "US", website: "https://corplumbing.net" },
  { name: "Bolin Plumbing Team", email: "info@bolinplumbing.com", company: "Bolin Plumbing", industry: "trades", city: "San Antonio, TX", country: "US", website: "https://bolinplumbing.com" },
  { name: "Austin Roofing & Construction Team", email: "info@austinroofingandconstruction.com", company: "Austin Roofing and Construction", industry: "trades", city: "Austin, TX", country: "US", website: "https://austinroofingandconstruction.com" },
  { name: "Austin Roofing Company Team", email: "info@austinroofingcompany.us", company: "Austin Roofing Company", industry: "trades", city: "Austin, TX", country: "US", website: "https://austinroofingcompany.us" },
  { name: "Gies Family Dental Team", email: "frontdesk@giesfamilydental.com", company: "Gies Family Dental", industry: "dental", city: "San Antonio, TX", country: "US", website: "https://giesfamilydental.com" },
  { name: "Fiesta Orthodontics Team", email: "info@fiestaorthodontics.com", company: "Fiesta Orthodontics", industry: "dental", city: "San Antonio, TX", country: "US", website: "https://fiestaorthodontics.com" },

  // North Carolina - Dental
  { name: "Charlotte Dental Arts Team", email: "office@charlottedentalarts.com", company: "Charlotte Dental Arts", industry: "dental", city: "Charlotte, NC", country: "US", website: "https://charlottedentalarts.com" },
  { name: "Renaissance Dental Team", email: "admin@renaissancedentalcenter.com", company: "Renaissance Dental Center", industry: "dental", city: "Raleigh, NC", country: "US", website: "https://renaissancedentalcenter.com" },

  // Arizona - Dental
  { name: "Arizona Biltmore Dentistry Team", email: "info@arizonabiltmoredentistry.com", company: "Arizona Biltmore Dentistry", industry: "dental", city: "Phoenix, AZ", country: "US", website: "https://arizonabiltmoredentistry.com" },
  { name: "Acacia Dental Team", email: "info@acaciadentalaz.com", company: "Acacia Dental", industry: "dental", city: "Tempe, AZ", country: "US", website: "https://acaciadentalaz.com" },
  { name: "BlueDot Dental Team", email: "info@bluedotdental.com", company: "BlueDot Dental", industry: "dental", city: "Gilbert, AZ", country: "US", website: "https://bluedotdental.com" },
  { name: "Toothology Dental Team", email: "info@toothologydental.com", company: "Toothology Dental", industry: "dental", city: "Scottsdale, AZ", country: "US", website: "https://toothologydental.com" },

  // Colorado - Dental
  { name: "Lowry Advanced Dentistry Team", email: "info@denverdental.com", company: "Lowry Advanced Dentistry", industry: "dental", city: "Denver, CO", country: "US", website: "https://denverdental.com" },
  { name: "Denver Dream Dentistry Team", email: "office@denverdreamdentistry.com", company: "Denver Dream Dentistry", industry: "dental", city: "Denver, CO", country: "US", website: "https://denverdreamdentistry.com" },
  { name: "Ask Dental Care Team", email: "info@askdentalcare.com", company: "Ask Dental Care", industry: "dental", city: "Denver, CO", country: "US", website: "https://askinnodental.com" },

  // Additional US HVAC
  { name: "Cool Air USA Team", email: "service@coolairusa.com", company: "Cool Air USA", industry: "trades", city: "Miami, FL", country: "US", website: "https://coolairusa.com" },
  { name: "White River Heat Team", email: "sales@whiteriverhvac.com", company: "White River Heat & Air", industry: "trades", city: "Indianapolis, IN", country: "US", website: "https://whiteriverhvac.com" },
  { name: "Norman Air Team", email: "service@normanair.com", company: "Norman Air", industry: "trades", city: "Oklahoma City, OK", country: "US", website: "https://normanair.com" }
];

async function verifyMxWithTimeout(domain: string, timeoutMs: number = 2500): Promise<boolean> {
  const timeoutPromise = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), timeoutMs));
  const dnsPromise = dns.resolveMx(domain).then((records) => records && records.length > 0).catch(() => false);
  return Promise.race([dnsPromise, timeoutPromise]);
}

async function main() {
  const history: any[] = JSON.parse(fs.readFileSync("data/outreach-history.json", "utf8"));
  const sentEmails = new Set(history.filter((r) => r.status === "sent").map((r) => r.email.toLowerCase().trim()));
  const sentCompanies = new Set(history.filter((r) => r.status === "sent").map((r) => (r.company || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim()));

  console.log(`Checking ${candidates.length} fresh candidate leads...`);
  const verified: typeof candidates = [];
  const skipped: any[] = [];

  for (const lead of candidates) {
    const email = lead.email.toLowerCase().trim();
    const cleanCompany = (lead.company || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

    if (sentEmails.has(email) || sentCompanies.has(cleanCompany)) {
      console.log(`⏭️ Skipped (already contacted): ${lead.company} (${email})`);
      skipped.push({ lead, reason: "already_contacted" });
      continue;
    }

    const domain = email.split("@")[1];
    const hasMx = await verifyMxWithTimeout(domain);
    if (!hasMx) {
      console.log(`❌ Skipped (No MX/Hard Bounce Risk): ${lead.company} (${email})`);
      skipped.push({ lead, reason: "no_mx" });
      continue;
    }

    console.log(`✔ Verified & Deliverable: ${lead.company} (${email}) - ${lead.city}`);
    verified.push(lead);
  }

  console.log(`\n============================================================`);
  console.log(`Total Candidates:       ${candidates.length}`);
  console.log(`Verified Deliverable:   ${verified.length}`);
  console.log(`Skipped:                ${skipped.length}`);
  console.log(`============================================================\n`);

  // Target exactly up to 25 leads to keep within daily quota with high deliverability
  const batch = verified.slice(0, 25);
  const headers = "name,email,company,industry,city,country,website\n";
  const rows = batch
    .map(
      (l) =>
        `"${l.name}","${l.email}","${l.company}","${l.industry}","${l.city}","${l.country}","${l.website}"`
    )
    .join("\n");
  fs.writeFileSync("data/next-targets.csv", headers + rows, "utf8");
  console.log(`Saved ${batch.length} verified leads to data/next-targets.csv`);
}

main().catch(console.error);

