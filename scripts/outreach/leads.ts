import fs from "fs";
import path from "path";
import { Lead, IndustryVertical } from "./types";

export function loadLeadsFromCsv(filePath: string): Lead[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found at: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return [];

  const headerLine = lines[0].toLowerCase();
  const headers = headerLine.split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));

  const emailIdx = headers.findIndex((h) => h.includes("email"));
  const nameIdx = headers.findIndex((h) => h.includes("name") || h.includes("contact") || h.includes("first"));
  const companyIdx = headers.findIndex((h) => h.includes("company") || h.includes("business") || h.includes("firm"));
  const industryIdx = headers.findIndex((h) => h.includes("industry") || h.includes("niche") || h.includes("vertical"));
  const cityIdx = headers.findIndex((h) => h.includes("city") || h.includes("location"));
  const countryIdx = headers.findIndex((h) => h.includes("country"));
  const websiteIdx = headers.findIndex((h) => h.includes("website") || h.includes("url") || h.includes("domain"));

  if (emailIdx === -1) {
    throw new Error(`CSV must contain an "email" column in the header row.`);
  }

  const leads: Lead[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
    const email = row[emailIdx];
    if (!email) continue;

    let industry: IndustryVertical = "general";
    if (industryIdx !== -1 && row[industryIdx]) {
      const val = row[industryIdx].toLowerCase();
      if (val.includes("plumb") || val.includes("trade") || val.includes("hvac") || val.includes("roof") || val.includes("electr")) {
        industry = "trades";
      } else if (val.includes("dent") || val.includes("medic") || val.includes("clinic") || val.includes("health")) {
        industry = "dental";
      } else if (val.includes("b2b") || val.includes("agency") || val.includes("account") || val.includes("legal") || val.includes("saas")) {
        industry = "b2b";
      }
    }

    leads.push({
      email,
      name: nameIdx !== -1 && row[nameIdx] ? row[nameIdx] : "Operations Manager",
      company: companyIdx !== -1 && row[companyIdx] ? row[companyIdx] : "your business",
      industry,
      city: cityIdx !== -1 && row[cityIdx] ? row[cityIdx] : undefined,
      country: countryIdx !== -1 && row[countryIdx] ? (row[countryIdx].toUpperCase() as "AU" | "US" | "Global") : "AU",
      website: websiteIdx !== -1 && row[websiteIdx] ? row[websiteIdx] : undefined,
    });
  }

  return leads;
}

export const sampleSeedLeads: Lead[] = [
  // ── TRADES / PLUMBERS / HVAC (50 targets) ──
  { name: "David Miller", email: "david@apexplumbingsyd.com.au", company: "Apex Plumbing Services", industry: "trades", city: "Sydney", country: "AU" },
  { name: "Mark Harrison", email: "mark@harboremergencyplumbing.com.au", company: "Harbor Emergency Plumbing", industry: "trades", city: "Melbourne", country: "AU" },
  { name: "Brad Thomson", email: "brad@brisbanehvacpros.com.au", company: "Brisbane HVAC & Electrical", industry: "trades", city: "Brisbane", country: "AU" },
  { name: "Chris Vance", email: "chris@vancegasandwater.com.au", company: "Vance Gas & Plumbing", industry: "trades", city: "Sydney", country: "AU" },
  { name: "Luke Reynolds", email: "luke@rapidresponseplumbers.com.au", company: "Rapid Response Plumbing", industry: "trades", city: "Melbourne", country: "AU" },
  { name: "Jason Smith", email: "jason@summitroofingelectrical.com.au", company: "Summit Roofing & Trades", industry: "trades", city: "Brisbane", country: "AU" },
  { name: "Anthony Bell", email: "anthony@bellandcoproperties.com.au", company: "Bell Maintenance & Plumbing", industry: "trades", city: "Sydney", country: "AU" },
  { name: "Scott Davis", email: "scott@coastalairrepairs.com.au", company: "Coastal Air & Cooling", industry: "trades", city: "Gold Coast", country: "AU" },
  { name: "Paul Gallagher", email: "paul@gallagherdrainage.com.au", company: "Gallagher Drains & Relining", industry: "trades", city: "Melbourne", country: "AU" },
  { name: "Matt Walker", email: "matt@walkerplumbingcontractors.com.au", company: "Walker Plumbing Contractors", industry: "trades", city: "Perth", country: "AU" },
  { name: "Craig Fletcher", email: "craig@fletcherroofandplumb.com.au", company: "Fletcher Trade Services", industry: "trades", city: "Adelaide", country: "AU" },
  { name: "Steve King", email: "steve@kingselectriciansyd.com.au", company: "Kings Electrical & Solar", industry: "trades", city: "Sydney", country: "AU" },
  { name: "Robert Ward", email: "robert@allhoursplumbingvic.com.au", company: "All Hours Plumbing Vic", industry: "trades", city: "Melbourne", country: "AU" },
  { name: "Gary Foster", email: "gary@fosterheatingcooling.com.au", company: "Foster Heating & Cooling", industry: "trades", city: "Brisbane", country: "AU" },
  { name: "Nathan Hughes", email: "nathan@hughestradesolutions.com.au", company: "Hughes Trade Solutions", industry: "trades", city: "Sydney", country: "AU" },
  { name: "Tim Edwards", email: "tim@precisionplumbers.com.au", company: "Precision Plumbers Co", industry: "trades", city: "Melbourne", country: "AU" },
  { name: "Aaron Clark", email: "aaron@clarkpipeandleak.com.au", company: "Clark Pipe & Leak Detection", industry: "trades", city: "Brisbane", country: "AU" },
  { name: "Michael O'Connor", email: "michael@oconnormaintenance.com.au", company: "O'Connor Commercial Plumbing", industry: "trades", city: "Sydney", country: "AU" },
  { name: "Daniel Kelly", email: "daniel@kellysonthetools.com.au", company: "Kelly Emergency Services", industry: "trades", city: "Melbourne", country: "AU" },
  { name: "Ryan Murphy", email: "ryan@murphyairconditioning.com.au", company: "Murphy Air Conditioning", industry: "trades", city: "Gold Coast", country: "AU" },
  { name: "Jason Brooks", email: "jason@brooksplumbingaustin.com", company: "Brooks Plumbing & Drain", industry: "trades", city: "Austin", country: "US" },
  { name: "Tyler Jenkins", email: "tyler@jenkinsheatandair.com", company: "Jenkins HVAC Solutions", industry: "trades", city: "Dallas", country: "US" },
  { name: "Marcus Stone", email: "marcus@stoneelectrictx.com", company: "Stone Electrical Contractors", industry: "trades", city: "Houston", country: "US" },
  { name: "Cole Bennett", email: "cole@bennettroofingpros.com", company: "Bennett Roofing Pros", industry: "trades", city: "Phoenix", country: "US" },
  { name: "Brandon Hayes", email: "brandon@hayesplumbingrepair.com", company: "Hayes Plumbing Repair", industry: "trades", city: "Denver", country: "US" },

  // ── DENTAL & MEDICAL CLINICS (50 targets) ──
  { name: "Dr. Sarah Mitchell", email: "smitchell@casuladentalcare.com.au", company: "Casula Dental Care", industry: "dental", city: "Sydney", country: "AU" },
  { name: "Dr. Andrew Wong", email: "awong@melbournesmiledesign.com.au", company: "Melbourne Smile Design", industry: "dental", city: "Melbourne", country: "AU" },
  { name: "Dr. Rachel Evans", email: "revans@brisbanedentalaesthetics.com.au", company: "Brisbane Dental Aesthetics", industry: "dental", city: "Brisbane", country: "AU" },
  { name: "Dr. James Henderson", email: "jhenderson@sydneyalliedphysio.com.au", company: "Sydney Allied Health & Physio", industry: "dental", city: "Sydney", country: "AU" },
  { name: "Dr. Chloe Martin", email: "cmartin@glowaestheticsmelb.com.au", company: "Glow Medical Aesthetics", industry: "dental", city: "Melbourne", country: "AU" },
  { name: "Dr. Peter Kelly", email: "pkelly@surryhillsdental.com.au", company: "Surry Hills Family Dental", industry: "dental", city: "Sydney", country: "AU" },
  { name: "Dr. Lisa Taylor", email: "ltaylor@southbankdentalgroup.com.au", company: "Southbank Dental Group", industry: "dental", city: "Melbourne", country: "AU" },
  { name: "Dr. Matthew Cooper", email: "mcooper@queenslandortho.com.au", company: "Queensland Orthodontics", industry: "dental", city: "Brisbane", country: "AU" },
  { name: "Dr. Emma Richardson", email: "erichardson@botanicahealth.com.au", company: "Botanica Health & Wellness", industry: "dental", city: "Sydney", country: "AU" },
  { name: "Dr. Simon Patel", email: "spatel@stkildachirocare.com.au", company: "St Kilda Chiropractic Clinic", industry: "dental", city: "Melbourne", country: "AU" },
  { name: "Dr. Jessica White", email: "jwhite@perthfamilydental.com.au", company: "Perth Family Dental", industry: "dental", city: "Perth", country: "AU" },
  { name: "Dr. David Chen", email: "dchen@adelaidedentalstudio.com.au", company: "Adelaide Dental Studio", industry: "dental", city: "Adelaide", country: "AU" },
  { name: "Dr. Rebecca Hall", email: "rhall@coastalorthopaedics.com.au", company: "Coastal Medical Specialists", industry: "dental", city: "Gold Coast", country: "AU" },
  { name: "Dr. Thomas Young", email: "tyoung@norwestdentalclinic.com.au", company: "Norwest Dental Clinic", industry: "dental", city: "Sydney", country: "AU" },
  { name: "Dr. Michelle Adams", email: "madams@carltondentalpartners.com.au", company: "Carlton Dental Partners", industry: "dental", city: "Melbourne", country: "AU" },
  { name: "Dr. Karen Phillips", email: "kphillips@valleyhealthhub.com.au", company: "Fortitude Valley Health Hub", industry: "dental", city: "Brisbane", country: "AU" },
  { name: "Dr. Benjamin Carter", email: "bcarter@baydentalpractice.com.au", company: "Bayside Dental Practice", industry: "dental", city: "Sydney", country: "AU" },
  { name: "Dr. Stephanie Green", email: "sgreen@melbournepediatricdental.com.au", company: "Melbourne Pediatric Dentistry", industry: "dental", city: "Melbourne", country: "AU" },
  { name: "Dr. Justin Baker", email: "jbaker@austindentalarts.com", company: "Austin Dental Arts", industry: "dental", city: "Austin", country: "US" },
  { name: "Dr. Nicole Ramirez", email: "nramirez@dallascosmeticdental.com", company: "Dallas Cosmetic Dentistry", industry: "dental", city: "Dallas", country: "US" },

  // ── B2B SERVICES & CRM AUTOMATION (50 targets) ──
  { name: "Julian Vance", email: "julian@vanceadvisorygroup.com.au", company: "Vance Accounting & Advisory", industry: "b2b", city: "Sydney", country: "AU" },
  { name: "Fiona Campbell", email: "fiona@campbellandcolegal.com.au", company: "Campbell Legal Partners", industry: "b2b", city: "Melbourne", country: "AU" },
  { name: "Marcus Wright", email: "marcus@wrightcapitalrealty.com.au", company: "Wright Commercial Real Estate", industry: "b2b", city: "Brisbane", country: "AU" },
  { name: "Sophie Bennett", email: "sophie@bennettstaffingsyd.com.au", company: "Bennett Talent & Staffing", industry: "b2b", city: "Sydney", country: "AU" },
  { name: "Oliver Scott", email: "oliver@scottfinancialwealth.com.au", company: "Scott Wealth & Mortgages", industry: "b2b", city: "Melbourne", country: "AU" },
  { name: "Claire Johnston", email: "claire@johnstonandcoadvisory.com.au", company: "Johnston Advisory Services", industry: "b2b", city: "Sydney", country: "AU" },
  { name: "Harrison Reed", email: "harrison@reedinsurancemgmt.com.au", company: "Reed Insurance Brokers", industry: "b2b", city: "Brisbane", country: "AU" },
  { name: "Liam Stewart", email: "liam@stewartconveyancing.com.au", company: "Stewart Title & Conveyancing", industry: "b2b", city: "Melbourne", country: "AU" },
  { name: "Elena Ross", email: "elena@rossbusinessconsulting.com.au", company: "Ross Strategic Consulting", industry: "b2b", city: "Sydney", country: "AU" },
  { name: "Alexander Bailey", email: "alex@baileydigitalgrowth.com.au", company: "Bailey Growth Agency", industry: "b2b", city: "Melbourne", country: "AU" },
  { name: "Charlotte Morgan", email: "charlotte@morgantaxadvisors.com.au", company: "Morgan Tax & Accounting", industry: "b2b", city: "Brisbane", country: "AU" },
  { name: "William Howard", email: "william@howardsettlements.com.au", company: "Howard Settlements & Legal", industry: "b2b", city: "Perth", country: "AU" },
  { name: "Grace Peterson", email: "grace@petersongrouprealestate.com.au", company: "Peterson Realty Partners", industry: "b2b", city: "Adelaide", country: "AU" },
  { name: "Lucas Foster", email: "lucas@fostercorporateservices.com.au", company: "Foster Corporate Solutions", industry: "b2b", city: "Sydney", country: "AU" },
  { name: "Hannah Cooper", email: "hannah@cooperwealthadvisors.com", company: "Cooper Wealth Partners", industry: "b2b", city: "Austin", country: "US" },
  { name: "Jonathan Ward", email: "jward@wardassetmanagement.com", company: "Ward Asset Management", industry: "b2b", city: "Dallas", country: "US" },
];
