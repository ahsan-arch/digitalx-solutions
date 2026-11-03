const dns = require('dns').promises;
const fs = require('fs');

const history = JSON.parse(fs.readFileSync('data/outreach-history.json', 'utf8'));
const contacted = new Set(history.map((h) => (h.email || '').toLowerCase().trim()));

// 1. Unsent from yesterday
const yesterdayTargets = fs.existsSync('data/new-targets.json')
  ? JSON.parse(fs.readFileSync('data/new-targets.json', 'utf8'))
  : [];
const unsentFromYesterday = yesterdayTargets.filter(
  (t) => !contacted.has((t.email || '').toLowerCase().trim())
);

// 2. Comprehensive Candidate Pool for Today
const freshCandidates = [
  // Trades - Texas
  { name: 'Service Manager', email: 'service@airco.com', company: 'AirCo Heating & Plumbing', industry: 'trades', city: 'Fort Worth', country: 'US', website: 'https://airco.com' },
  { name: 'Commercial Estimator', email: 'info@innovative-roofs.com', company: 'Innovative Roofing Services', industry: 'trades', city: 'Houston', country: 'US', website: 'https://innovative-roofs.com' },
  { name: 'Service Dispatcher', email: 'service@expertairductcleaninghouston.com', company: 'Expert Air Houston', industry: 'trades', city: 'Houston', country: 'US', website: 'https://expertairductcleaninghouston.com' },
  { name: 'General Manager', email: 'admin@d7roofingtx.com', company: 'D7 Roofing & Metal', industry: 'trades', city: 'Houston', country: 'US', website: 'https://d7roofingtx.com' },

  // Trades - Florida
  { name: 'Service Coordinator', email: 'service@cornerstonepros.com', company: 'Cornerstone Pros', industry: 'trades', city: 'Tampa', country: 'US', website: 'https://cornerstonepros.com' },
  { name: 'Office Manager', email: 'office@acguyoftampa.com', company: 'The A/C Guy of Tampa Bay', industry: 'trades', city: 'Tampa', country: 'US', website: 'https://acguyoftampa.com' },
  { name: 'General Manager', email: 'info@myprohvac.com', company: 'My Pro HVAC', industry: 'trades', city: 'Miami', country: 'US', website: 'https://myprohvac.com' },
  { name: 'Customer Service Lead', email: 'customer-service@apogeehvac.com', company: 'Apogee HVAC Solutions', industry: 'trades', city: 'Miami', country: 'US', website: 'https://apogeehvac.com' },

  // Trades - Carolinas & Southeast
  { name: 'Service Director', email: 'comfort@mcclintockhvac.com', company: 'McClintock Heating & Plumbing', industry: 'trades', city: 'Charlotte', country: 'US', website: 'https://mcclintockhvac.com' },
  { name: 'Estimating Manager', email: 'info@nickandcoair.com', company: 'Nick & Co. Air Conditioning', industry: 'trades', city: 'Charlotte', country: 'US', website: 'https://nickandcoair.com' },
  { name: 'HVAC Project Lead', email: 'jreid@moncriefair.com', company: 'Moncrief Heating & Air', industry: 'trades', city: 'Atlanta', country: 'US', website: 'https://moncriefair.com' },
  { name: 'Operations Director', email: 'david@pvhvac.com', company: 'PV Heating & Air', industry: 'trades', city: 'Atlanta', country: 'US', website: 'https://peaveyhvac.com' },

  // Trades - Midwest & Plains
  { name: 'Operations Director', email: 'info@asapplhvac.com', company: 'ASAP Plumbing & HVAC', industry: 'trades', city: 'Chicago', country: 'US', website: 'https://asapplhvac.com' },
  { name: 'Customer Service Lead', email: 'support@blueyetiservices.com', company: 'Blue Yeti HVAC & Plumbing', industry: 'trades', city: 'Minneapolis', country: 'US', website: 'https://blueyetiservices.com' },
  { name: 'Commercial Estimator', email: 'info@centralroofing.com', company: 'Central Roofing Company', industry: 'trades', city: 'Minneapolis', country: 'US', website: 'https://centralroofing.com' },
  { name: 'Sales Director', email: 'sales@whiteriverhvac.com', company: 'White River Heat & Air', industry: 'trades', city: 'Indianapolis', country: 'US', website: 'https://whiteriverhvac.com' },
  { name: 'General Manager', email: 'info@grandhvaccolumbus.com', company: 'Grand HVAC Columbus', industry: 'trades', city: 'Columbus', country: 'US', website: 'https://grandhvaccolumbus.com' },
  { name: 'Service Director', email: 'service@drabekandhill.com', company: 'Drabek & Hill HVAC', industry: 'trades', city: 'Oklahoma City', country: 'US', website: 'https://drabekandhill.com' },
  { name: 'Dispatch Manager', email: 'service@aircomfortsolutions.net', company: 'Air Comfort Solutions', industry: 'trades', city: 'Oklahoma City', country: 'US', website: 'https://aircomfortsolutions.net' },

  // Trades - Mountain & West Coast
  { name: 'Customer Care Director', email: 'info@tlcplumbing.com', company: 'TLC Plumbing & HVAC', industry: 'trades', city: 'Albuquerque', country: 'US', website: 'https://tlcplumbing.com' },
  { name: 'Office Manager', email: 'info@abqplumbing.com', company: 'Albuquerque Plumbing Heating & Cooling', industry: 'trades', city: 'Albuquerque', country: 'US', website: 'https://abqplumb.com' },
  { name: 'Service Coordinator', email: 'hello-denver@itsdone.com', company: 'Done! Plumbing & Heating', industry: 'trades', city: 'Denver', country: 'US', website: 'https://itsdone.com' },
  { name: 'Commercial Dispatcher', email: 'service@phoenixplumbingmasters.com', company: 'Phoenix Plumbing Masters', industry: 'trades', city: 'Phoenix', country: 'US', website: 'https://phoenixplumbingmasters.com' },
  { name: 'Operations Manager', email: 'info@theaussieplumber.com', company: 'The Aussie Plumber Phoenix', industry: 'trades', city: 'Phoenix', country: 'US', website: 'https://theaussieplumber.com' },
  { name: 'Customer Care Lead', email: 'info@greenwoodheating.com', company: 'Greenwood Heating', industry: 'trades', city: 'Seattle', country: 'US', website: 'https://greenwoodheating.com' },
  { name: 'Service Coordinator', email: 'info@bestplumbing.com', company: 'Best Plumbing Seattle', industry: 'trades', city: 'Seattle', country: 'US', website: 'https://bestplumbing.com' },
  { name: 'Operations Lead', email: 'info@expressplumbinghvac.com', company: 'Express Plumbing & HVAC', industry: 'trades', city: 'San Diego', country: 'US', website: 'https://expressplumbinghvac.com' },

  // Trades - Mid-Atlantic
  { name: 'Service Director', email: 'info@centercityplumber.com', company: 'Center City Plumbing & Drains', industry: 'trades', city: 'Philadelphia', country: 'US', website: 'https://centercityplumber.com' },
  { name: 'Operations Manager', email: 'office@adammechanical.com', company: 'Adam Mechanical', industry: 'trades', city: 'Philadelphia', country: 'US', website: 'https://adammechanical.com' },

  // Australia Tradies
  { name: 'Service Manager', email: 'services@sydplumbing.com.au', company: 'Sydney Plumbing', industry: 'trades', city: 'Sydney', country: 'AU', website: 'https://sydplumbing.com.au' },
  { name: 'Service Dispatcher', email: 'service@friendlyplumbing.com.au', company: 'Friendly Plumbing', industry: 'trades', city: 'Sydney', country: 'AU', website: 'https://friendlyplumbing.com.au' },
  { name: 'Operations Manager', email: 'info@facilitiescoolingandheating.com.au', company: 'Facilities Cooling & Heating', industry: 'trades', city: 'Melbourne', country: 'AU', website: 'https://facilitiescoolingandheating.com.au' },
  { name: 'Managing Electrician', email: 'info@djdelectrics.com.au', company: 'DJD Electrics', industry: 'trades', city: 'Melbourne', country: 'AU', website: 'https://djdelectrics.com.au' },
  { name: 'Electrical Supervisor', email: 'info@elecsureelectrical.com.au', company: 'ElecSure Electrical', industry: 'trades', city: 'Melbourne', country: 'AU', website: 'https://elecsureelectrical.com.au' },
  { name: 'Operations Lead', email: 'service@verifyelectrical.com.au', company: 'Verify Electrical', industry: 'trades', city: 'Brisbane', country: 'AU', website: 'https://verifyelectrical.com.au' },
  { name: 'Commercial Estimator', email: 'contact@contactelec.com.au', company: 'Contact Electrical Service', industry: 'trades', city: 'Brisbane', country: 'AU', website: 'https://contactelec.com.au' },
  { name: 'General Manager', email: 'info@myplumbers.com.au', company: 'My Plumbers Co', industry: 'trades', city: 'Brisbane', country: 'AU', website: 'https://myplumbers.com.au' },
  { name: 'Sales Director', email: 'sales@rtltrades.com.au', company: 'RTL Trades', industry: 'trades', city: 'Brisbane', country: 'AU', website: 'https://rtltrades.com.au' },

  // Dental & Clinics - US
  { name: 'Practice Director', email: 'info@dentaltotal.com', company: 'Dental Total', industry: 'dental', city: 'Miami', country: 'US', website: 'https://dentaltotal.com' },
  { name: 'Patient Coordinator', email: 'info@drocascante.com', company: 'Advanced Cosmetic & Implant Dentistry', industry: 'dental', city: 'Miami', country: 'US', website: 'https://drocascante.com' },
  { name: 'Office Manager', email: 'office@dentalinternationalcare.com', company: 'International Dental Care', industry: 'dental', city: 'Miami', country: 'US', website: 'https://dentalinternationalcare.com' },
  { name: 'Practice Manager', email: 'office@tamborellodental.com', company: 'Tamborello Dental Associates', industry: 'dental', city: 'Houston', country: 'US', website: 'https://tamborellodental.com' },
  { name: 'Intake Coordinator', email: 'info@freshdentalcare.com', company: 'Fresh Dental Care', industry: 'dental', city: 'Houston', country: 'US', website: 'https://freshdentalcare.com' },
  { name: 'Front Desk Lead', email: 'info@drfrazar.com', company: 'The Houston Dentists', industry: 'dental', city: 'Houston', country: 'US', website: 'https://drfrazar.com' },
  { name: 'Practice Director', email: 'info@azvalleydental.com', company: 'Valley Dental Group', industry: 'dental', city: 'Phoenix', country: 'US', website: 'https://azvalleydental.com' },
  { name: 'Patient Coordinator', email: 'info@arizonabiltmoredentistry.com', company: 'Arizona Biltmore Dentistry', industry: 'dental', city: 'Phoenix', country: 'US', website: 'https://arizonabiltmoredentistry.com' },
  { name: 'Clinic Manager', email: 'info@icondentaldenver.com', company: 'ICON Dental Denver', industry: 'dental', city: 'Denver', country: 'US', website: 'https://icondentaldenver.com' },
  { name: 'Practice Lead', email: 'info@denverdental.com', company: 'Lowry Advanced Dentistry', industry: 'dental', city: 'Denver', country: 'US', website: 'https://denverdental.com' },
  { name: 'Patient Enquiries Lead', email: 'INFO@DRBAUMRIND.COM', company: 'Dr. Baumrind Dental Practice', industry: 'dental', city: 'Atlanta', country: 'US', website: 'https://drbaumrind.com' },
  { name: 'Clinic Coordinator', email: 'info@greenlakedentalcare.com', company: 'Green Lake Dental Care', industry: 'dental', city: 'Seattle', country: 'US', website: 'https://greenlakedentalcare.com' },
  { name: 'Patient Coordinator', email: 'info@northgatesmiles.com', company: 'Northgate Smiles', industry: 'dental', city: 'Seattle', country: 'US', website: 'https://northgatesmiles.com' },
  { name: 'Practice Manager', email: 'office@4thandsenecadental.com', company: '4th & Seneca Dental', industry: 'dental', city: 'Seattle', country: 'US', website: 'https://4thandsenecadental.com' },
  { name: 'Office Director', email: 'info@balboadentistry.com', company: 'Balboa Dentistry', industry: 'dental', city: 'San Diego', country: 'US', website: 'https://balboadentistry.com' },
  { name: 'Patient Intake Lead', email: 'office@cabrillodental.com', company: 'Cabrillo Dental', industry: 'dental', city: 'San Diego', country: 'US', website: 'https://cabrillodental.com' },

  // Dental & Clinics - Australia
  { name: 'Clinic Manager', email: 'info@carefamilydental.com.au', company: 'Care Family Dental', industry: 'dental', city: 'Melbourne', country: 'AU', website: 'https://carefamilydental.com.au' },
  { name: 'Patient Enquiries Lead', email: 'enquiries@mcdental.com.au', company: 'MC Dental', industry: 'dental', city: 'Melbourne', country: 'AU', website: 'https://mcdental.com.au' },
  { name: 'Practice Director', email: 'info@abc-dental.com.au', company: 'ABC Dental', industry: 'dental', city: 'Sydney', country: 'AU', website: 'https://abc-dental.com.au' },
  { name: 'Intake Lead', email: 'info@cleardental.com.au', company: 'Clear Dental', industry: 'dental', city: 'Sydney', country: 'AU', website: 'https://cleardental.com.au' },
  { name: 'Front Desk Coordinator', email: 'reception@thedentalpractice.com.au', company: 'The Dental Practice', industry: 'dental', city: 'Sydney', country: 'AU', website: 'https://thedentalpractice.com.au' },
  { name: 'Reception Lead', email: 'reception@terreyhillsdental.com.au', company: 'Terrey Hills Dental', industry: 'dental', city: 'Sydney', country: 'AU', website: 'https://terreyhillsdental.com.au' },

  // Property Management & B2B
  { name: 'Property Director', email: 'info@therevolutionfirm.com', company: 'Revolution Rental Management', industry: 'b2b', city: 'Atlanta', country: 'US', website: 'https://therevolutionfirm.com' },
  { name: 'Leasing Manager', email: 'agent@onesourceatlanta.com', company: 'One Source Property Management', industry: 'b2b', city: 'Atlanta', country: 'US', website: 'https://onesourceatlanta.com' },
  { name: 'Portfolio Manager', email: 'Phoenix@RentalsAmerica.com', company: 'Rentals America Phoenix', industry: 'b2b', city: 'Phoenix', country: 'US', website: 'https://rentalsamerica.com' },
  { name: 'Operations Director', email: 'insidesales@paiellirealty.com', company: 'Simply Property Management', industry: 'b2b', city: 'Phoenix', country: 'US', website: 'https://phoenixpropertymgmt.com' }
];

async function prepareBatch() {
  const combined = [...unsentFromYesterday, ...freshCandidates];
  const uniqueMap = new Map();

  for (const c of combined) {
    const email = (c.email || '').toLowerCase().trim();
    if (!email || contacted.has(email) || uniqueMap.has(email)) continue;
    uniqueMap.set(email, c);
  }

  const validTargets = [];
  console.log(`Checking MX records for ${uniqueMap.size} unique candidate domains...`);

  for (const [email, target] of uniqueMap.entries()) {
    const domain = email.split('@')[1];
    try {
      const mx = await Promise.race([
        dns.resolveMx(domain),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
      ]);
      if (mx && mx.length > 0) {
        validTargets.push(target);
      } else {
        console.log(`No MX for: ${domain}`);
      }
    } catch (err) {
      console.log(`MX check failed for ${domain}: ${err.message || err.code}`);
    }
  }

  console.log(`Total verified targets ready for today: ${validTargets.length}`);

  const header = 'name,email,company,industry,city,country,website\n';
  const rows = validTargets.map((t) => [
    t.name,
    t.email,
    t.company,
    t.industry,
    t.city,
    t.country,
    t.website
  ].map((val) => (val && val.includes(',') ? `"${val}"` : val || '')).join(','));

  fs.writeFileSync('data/curated-targets.csv', header + rows.join('\n') + '\n', 'utf8');
  console.log(`Successfully generated data/curated-targets.csv with ${validTargets.length} records!`);
}

prepareBatch().catch(console.error);
