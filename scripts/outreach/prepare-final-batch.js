const dns = require('dns').promises;
const fs = require('fs');

const history = JSON.parse(fs.readFileSync('data/outreach-history.json', 'utf8'));
const contacted = new Set(history.map((h) => (h.email || '').toLowerCase().trim()));

const candidates = [
  { name: 'Service Coordinator', email: 'service@ss-plumbing.com', company: 'S&S Plumbing', industry: 'trades', city: 'San Antonio', country: 'US', website: 'https://ss-plumbing.com' },
  { name: 'Operations Manager', email: 'service@murrayplumbing.com', company: 'Murray Plumbing', industry: 'trades', city: 'San Antonio', country: 'US', website: 'https://murrayplumbing.com' },
  { name: 'Commercial Dispatcher', email: 'service@xpertplumbing.com', company: 'Xpert Plumbing', industry: 'trades', city: 'San Antonio', country: 'US', website: 'https://xpertplumbing.com' },
  { name: 'HVAC Project Lead', email: 'info@lexairconditioning.com', company: 'Lex Air Conditioning', industry: 'trades', city: 'Dallas', country: 'US', website: 'https://lexairconditioning.com' },
  { name: 'Operations Director', email: 'Info@TexasPremierPlumbing.com', company: 'Texas Premier Plumbing', industry: 'trades', city: 'Houston', country: 'US', website: 'https://texaspremierplumbing.com' },
  { name: 'Service Manager', email: 'info@crmelectrical.com.au', company: 'CRM Electrical Industries', industry: 'trades', city: 'Gold Coast', country: 'AU', website: 'https://crmelectrical.com.au' },
  { name: 'Operations Lead', email: 'info@promptelectrical.com.au', company: 'Prompt Electrical', industry: 'trades', city: 'Gold Coast', country: 'AU', website: 'https://promptelectrical.com.au' },
  { name: 'Managing Electrician', email: 'info@ismeelec.com.au', company: 'Isme Electrical', industry: 'trades', city: 'Gold Coast', country: 'AU', website: 'https://ismeelec.com.au' },
  { name: 'Emergency Dispatcher', email: 'info@emergencyplumbergc.com.au', company: 'Emergency Plumber GC', industry: 'trades', city: 'Gold Coast', country: 'AU', website: 'https://emergencyplumbergc.com.au' },
  { name: 'Commercial Coordinator', email: 'office@totalsystems.com.au', company: 'Total Air & Electrical', industry: 'trades', city: 'Perth', country: 'AU', website: 'https://electricalperth.com.au' },
  { name: 'Electrical Director', email: 'tony@perthelectricalservices.com.au', company: 'Perth Electrical Services', industry: 'trades', city: 'Perth', country: 'AU', website: 'https://perthelectricalservices.com.au' },
  { name: 'Patient Enquiries Lead', email: 'reception@facevaluedental.com', company: 'Face Value Dental', industry: 'dental', city: 'Brisbane', country: 'AU', website: 'https://facevaluedental.com' },
  { name: 'Practice Director', email: 'reception@edwardstreetdental.com.au', company: 'Edward Street Dental', industry: 'dental', city: 'Brisbane', country: 'AU', website: 'https://edwardstreetdental.com.au' },
  { name: 'Clinic Manager', email: 'info@windsorfamilydentist.com.au', company: 'Windsor Family Dentist', industry: 'dental', city: 'Brisbane', country: 'AU', website: 'https://windsorfamilydentist.com.au' },
  { name: 'Practice Lead', email: 'info@accentdental.com.au', company: 'Accent Dental Care', industry: 'dental', city: 'Perth', country: 'AU', website: 'https://accentdental.com.au' },
  { name: 'Patient Coordinator', email: 'info@southperthdentalexcellence.com.au', company: 'South Perth Dental Excellence', industry: 'dental', city: 'Perth', country: 'AU', website: 'https://southperthdentalexcellence.com.au' },
  { name: 'Front Desk Lead', email: 'reception@evpdental.com.au', company: 'EVP Dental', industry: 'dental', city: 'Perth', country: 'AU', website: 'https://evpdental.com.au' },
  { name: 'Clinic Coordinator', email: 'reception@perthcitydental.com.au', company: 'Perth City Dental', industry: 'dental', city: 'Perth', country: 'AU', website: 'https://perthcitydental.com.au' },
  { name: 'Practice Manager', email: 'office@tamborellodental.com', company: 'Tamborello Dental Associates', industry: 'dental', city: 'Houston', country: 'US', website: 'https://tamborellodental.com' },
  { name: 'Intake Coordinator', email: 'info@freshdentalcare.com', company: 'Fresh Dental Care', industry: 'dental', city: 'Houston', country: 'US', website: 'https://freshdentalcare.com' },
  { name: 'Front Desk Lead', email: 'info@drfrazar.com', company: 'The Houston Dentists', industry: 'dental', city: 'Houston', country: 'US', website: 'https://drfrazar.com' }
];

async function prepareFinalBatch() {
  const uniqueMap = new Map();

  for (const c of candidates) {
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

  console.log(`Total verified targets ready for final batch: ${validTargets.length}`);

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

prepareFinalBatch().catch(console.error);

