import dns from "dns/promises";
import fs from "fs";

const candidateLeads = [
  // Previous verified 15
  { name: "Service Director", email: "info@servicewizardac.com", company: "Service Wizard", industry: "trades", city: "Austin, TX", country: "US", website: "https://servicewizardac.com" },
  { name: "Office Manager", email: "info@ccservicesoftampa.com", company: "C & C Services of Tampa", industry: "trades", city: "Tampa, FL", country: "US", website: "https://ccservicesoftampainc.com" },
  { name: "Dispatch Manager", email: "info@callfcs.com", company: "Fresh Comfort Solutions", industry: "trades", city: "Phoenix, AZ", country: "US", website: "https://callfcs.com" },
  { name: "Service Manager", email: "service@thehvaccompany.net", company: "The HVAC Company", industry: "trades", city: "Mesa, AZ", country: "US", website: "https://thehvaccompany.net" },
  { name: "General Manager", email: "info@idealairaz.com", company: "Ideal Air Conditioning", industry: "trades", city: "Phoenix, AZ", country: "US", website: "https://idealairaz.com" },
  { name: "Operations Director", email: "info@airatlantahvac.com", company: "Air Atlanta HVAC", industry: "trades", city: "Atlanta, GA", country: "US", website: "https://airatlantahvac.com" },
  { name: "Sales & Service Team", email: "sales@allaboutheatingandair.com", company: "All About Heating & Air", industry: "trades", city: "Atlanta, GA", country: "US", website: "https://allaboutheatingandair.com" },
  { name: "Operations Manager", email: "info@supercoolcharlotte.com", company: "Super Cool HVAC", industry: "trades", city: "Charlotte, NC", country: "US", website: "https://supercoolcharlotte.com" },
  { name: "Dispatch Team", email: "service@formulaairhvac.com", company: "Formula Air HVAC", industry: "trades", city: "Indian Trail, NC", country: "US", website: "https://formulaairhvac.com" },
  { name: "Service Director", email: "info@mydenverplumber.net", company: "My Denver Plumber", industry: "trades", city: "Denver, CO", country: "US", website: "https://mydenverplumber.net" },
  { name: "Operations Manager", email: "info@chrishalesplumbing.com", company: "Chris Hales Plumbing", industry: "trades", city: "Denver, CO", country: "US", website: "https://chrishalesplumbing.com" },
  { name: "Commercial Service Team", email: "info@everestmechanical.com", company: "Everest Mechanical", industry: "trades", city: "Denver, CO", country: "US", website: "https://everestmechanical.com" },
  { name: "Practice Manager", email: "info@austindentalco.com", company: "Austin Dental Co", industry: "dental", city: "Austin, TX", country: "US", website: "https://austindentalco.com" },
  { name: "Practice Coordinator", email: "hello@dallasdentalwellness.com", company: "Dallas Dental Wellness", industry: "dental", city: "Dallas, TX", country: "US", website: "https://dallasdentalwellness.com" },
  { name: "Patient Care Coordinator", email: "info@onedentalmiami.com", company: "ONE Dental Miami", industry: "dental", city: "Miami, FL", country: "US", website: "https://onedentalmiami.com" },
  
  // New candidates
  { name: "Service Manager", email: "info@blueplanetsd.com", company: "Blue Planet Plumbing", industry: "trades", city: "San Diego, CA", country: "US", website: "https://plumbersinsandiego.com" },
  { name: "Dispatch Team", email: "info@homeproplumbingsd.com", company: "HomePro Plumbing", industry: "trades", city: "San Diego, CA", country: "US", website: "https://homeproplumbingsd.com" },
  { name: "Customer Service Lead", email: "customerservice@plumbingplus.net", company: "Plumbing Plus", industry: "trades", city: "San Diego, CA", country: "US", website: "https://plumbingplus.net" },
  { name: "Service Coordinator", email: "service@airfloridasolutions.com", company: "Air Florida Solutions", industry: "trades", city: "Orlando, FL", country: "US", website: "https://airfloridasolutions.com" },
  { name: "Dr. Chris Johnson", email: "info@downtownhoustondentist.com", company: "Downtown Houston Dental", industry: "dental", city: "Houston, TX", country: "US", website: "https://downtownhoustondentist.com" },
  { name: "Practice Coordinator", email: "info@houston-dental.com", company: "Houston's Dentist", industry: "dental", city: "Houston, TX", country: "US", website: "https://houston-dental.com" },
  { name: "Practice Manager", email: "office@19thstreetdental.com", company: "19th Street Dental", industry: "dental", city: "Atlanta, GA", country: "US", website: "https://19thstreetdental.com" },
  { name: "Operations Director", email: "info@myhrc.biz", company: "Houston Roofing & Construction", industry: "trades", city: "Houston, TX", country: "US", website: "https://houstonroofingonline.com" },
  { name: "Estimating Team", email: "mailbox@trustroofingtx.com", company: "Trust Roofing", industry: "trades", city: "Houston, TX", country: "US", website: "https://trustroofingtx.com" },
];

async function verifyMxWithTimeout(domain: string, timeoutMs: number = 3000): Promise<boolean> {
  const timeoutPromise = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), timeoutMs));
  const dnsPromise = dns.resolveMx(domain).then((records) => records && records.length > 0).catch(() => false);
  return Promise.race([dnsPromise, timeoutPromise]);
}

async function run() {
  const history: any[] = JSON.parse(fs.readFileSync("data/outreach-history.json", "utf8"));
  const sentEmails = new Set(history.filter((r) => r.status === "sent").map((r) => r.email.toLowerCase().trim()));

  console.log(`Checking ${candidateLeads.length} USA candidates...`);
  const verified: typeof candidateLeads = [];

  for (const lead of candidateLeads) {
    const email = lead.email.toLowerCase().trim();
    if (sentEmails.has(email)) {
      console.log(`❌ Already sent to: ${email}`);
      continue;
    }
    const domain = email.split("@")[1];
    const hasMx = await verifyMxWithTimeout(domain);
    if (!hasMx) {
      console.log(`❌ No MX: ${email} (${domain})`);
      continue;
    }
    console.log(`✔ Verified: ${email} (${lead.company})`);
    verified.push(lead);
  }

  console.log(`\nVerified ${verified.length} / ${candidateLeads.length} leads.`);
  
  // Write to data/curated-targets.csv
  const headers = "name,email,company,industry,city,country,website\n";
  const rows = verified.map(l => `"${l.name}","${l.email}","${l.company}","${l.industry}","${l.city}","${l.country}","${l.website}"`).join("\n");
  fs.writeFileSync("data/curated-targets.csv", headers + rows, "utf8");
  console.log(`Saved ${verified.length} leads to data/curated-targets.csv`);
}

run();
