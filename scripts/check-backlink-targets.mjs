import https from 'https';
import http from 'http';

const TARGETS = [
  { name: 'Clutch', url: 'https://clutch.co/get-listed', priority: 'P1', tier: 'Tier 1' },
  { name: 'GoodFirms', url: 'https://www.goodfirms.co/get-listed', priority: 'P1', tier: 'Tier 1' },
  { name: 'Trustpilot Business', url: 'https://business.trustpilot.com/signup', priority: 'P1', tier: 'Tier 1' },
  { name: 'G2 Provider', url: 'https://www.g2.com/products/new', priority: 'P2', tier: 'Tier 1' },
  { name: 'DesignRush', url: 'https://www.designrush.com/agency/join', priority: 'P2', tier: 'Tier 1' },
  { name: 'UpCity', url: 'https://upcity.com/get-listed', priority: 'P2', tier: 'Tier 1' },
  { name: 'Sortlist', url: 'https://www.sortlist.com/join-agency', priority: 'P3', tier: 'Tier 1' },
  { name: 'n8n Creators', url: 'https://n8n.io/creators/', priority: 'P1', tier: 'Tier 2' },
  { name: 'Bing Places', url: 'https://www.bing.com/places', priority: 'P1', tier: 'Tier 3' },
  { name: 'Crunchbase', url: 'https://www.crunchbase.com/register', priority: 'P2', tier: 'Tier 3' },
  { name: 'Yellow Pages AU', url: 'https://www.yellowpages.com.au/', priority: 'P2', tier: 'Tier 3' },
  { name: 'Connectively (HARO)', url: 'https://www.connectively.us/', priority: 'P1', tier: 'Tier 4' },
  { name: 'Product Hunt', url: 'https://www.producthunt.com/', priority: 'P2', tier: 'Tier 5' },
];

async function checkUrl(target) {
  try {
    const res = await fetch(target.url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });
    return { ...target, status: res.status, ok: res.ok || res.status === 403 || res.status === 401 };
  } catch (err) {
    // If HEAD failed or timed out, try GET
    try {
      const res = await fetch(target.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: AbortSignal.timeout(8000),
      });
      return { ...target, status: res.status, ok: res.ok || res.status === 403 || res.status === 401 };
    } catch (e) {
      return { ...target, status: 'Error', error: e.message, ok: false };
    }
  }
}

async function main() {
  console.log(`Checking ${TARGETS.length} backlink entry targets...`);
  const results = await Promise.all(TARGETS.map(checkUrl));
  console.log('\n--- TARGET STATUS SUMMARY ---');
  for (const r of results) {
    console.log(`[${r.priority}] ${r.name.padEnd(22)} (${r.tier}) - Status: ${r.status}`);
  }
}

main();
