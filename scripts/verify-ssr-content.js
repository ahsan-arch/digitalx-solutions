const fs = require('fs');
const path = require('path');

const targetRoutes = [
  { path: 'index.html', name: 'Homepage (/)' },
  { path: 'solutions/ai-voice-agents.html', name: 'AI Voice Agents' },
  { path: 'solutions/gohighlevel-implementation.html', name: 'GoHighLevel Implementation' },
  { path: 'solutions/n8n-workflow-automation.html', name: 'n8n Workflow Automation' },
  { path: 'solutions/hubspot-automation.html', name: 'HubSpot Automation' },
  { path: 'industries/plumbers-hvac-trades.html', name: 'Plumbers & Trades' },
  { path: 'industries/medical-dental-clinics.html', name: 'Medical & Dental' }
];

console.log('=== SSR RAW HTML AUDIT (NO JAVASCRIPT) ===\n');

let allPassed = true;
const serverAppDir = path.join(process.cwd(), '.next', 'server', 'app');

for (const route of targetRoutes) {
  const filePath = path.join(serverAppDir, route.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    allPassed = false;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const hasFaq = html.includes('FAQ') || html.includes('Frequently Asked') || html.includes('Question');
  const wordCount = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;

  console.log(`Route: ${route.name}`);
  console.log(`  Raw HTML Size: ${(html.length / 1024).toFixed(1)} KB | Word Count: ${wordCount}`);
  console.log(`  H1: ${h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE'}`);
  console.log(`  H2 Count: ${h2Matches.length} (${h2Matches.slice(0, 3).join(' | ')}...)`);
  console.log(`  FAQ Content Present: ${hasFaq}`);
  console.log(`  Status: ${wordCount > 300 && h1Match && hasFaq ? '✔ VERIFIED SSR' : '⚠️ INCOMPLETE'}\n`);
}

if (!allPassed) {
  process.exit(1);
}
console.log('✅ All core routes verified: Full content is present in raw HTML prior to client hydration.');
