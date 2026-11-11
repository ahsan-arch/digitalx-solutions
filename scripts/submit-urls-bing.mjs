import fs from 'fs';

const INDEX_NOW_KEY = '3c12d5a79b40fe68';
const BING_API_KEY = '49626271e24a47dc88e60511bda9fcc9';
const HOST = 'digitalx-solutions.com';
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEX_NOW_KEY}.txt`;

const PRIORITY_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/case-studies`,
  `${BASE_URL}/integrations`,
  `${BASE_URL}/integrations/gohighlevel`,
  `${BASE_URL}/integrations/n8n`,
  `${BASE_URL}/integrations/hubspot`,
  `${BASE_URL}/integrations/twilio`,
  `${BASE_URL}/integrations/servicetitan`,
  `${BASE_URL}/integrations/jobber`,
  `${BASE_URL}/integrations/cliniko`,
  `${BASE_URL}/integrations/google-calendar`,
  `${BASE_URL}/insights/after-hours-answer-rate-study`,
  `${BASE_URL}/insights/how-much-does-a-missed-call-cost-a-business`,
  `${BASE_URL}/insights/ai-receptionist-vs-call-centre`,
  `${BASE_URL}/insights/what-is-an-ai-voice-agent`,
  `${BASE_URL}/insights/ai-voice-agent-pricing`,
  `${BASE_URL}/insights/ai-call-recording-laws-australia-us`,
  `${BASE_URL}/insights/missed-call-text-back-compliance`,
  `${BASE_URL}/insights/what-is-an-ai-agent`,
  `${BASE_URL}/insights/ai-agent-vs-chatbot`,
  `${BASE_URL}/insights/n8n-vs-zapier-vs-make`,
  `${BASE_URL}/insights/gohighlevel-setup-australia`,
  `${BASE_URL}/insights/server-side-tracking-meta-ads`,
  `${BASE_URL}/insights/n8n-vs-zapier`,
  `${BASE_URL}/insights/how-plumbing-company-recovered-180k-ai-voice`,
  `${BASE_URL}/insights/how-automation-reduced-missed-calls`,
  `${BASE_URL}/insights/how-we-built-self-hosted-30-second-speed-to-lead-pipeline-n8n-vapi`,
  `${BASE_URL}/usa`,
  `${BASE_URL}/au`,
  `${BASE_URL}/solutions`,
  `${BASE_URL}/solutions/enterprise-ai-automation`,
  `${BASE_URL}/solutions/crm-integration`,
  `${BASE_URL}/solutions/ai-voice-agents`,
  `${BASE_URL}/solutions/missed-call-text-back`,
  `${BASE_URL}/pricing`,
  `${BASE_URL}/contact`,
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function streamIndexNow() {
  console.log(`[IndexNow Streaming] Streaming ${PRIORITY_URLS.length} priority URLs individually...`);
  let success = 0;
  for (let i = 0; i < PRIORITY_URLS.length; i++) {
    const url = PRIORITY_URLS[i];
    const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEX_NOW_KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: { 'User-Agent': 'DigitalX-StreamEngine/2.0' },
      });
      if (res.status === 200 || res.status === 202) {
        success++;
        console.log(`  ✔ [IndexNow] Streamed: ${url}`);
      } else {
        console.warn(`  ⚠ [IndexNow] Status ${res.status}: ${url}`);
      }
    } catch (err) {
      console.error(`  ✖ [IndexNow Error] ${url}:`, err.message);
    }
    await sleep(150);
  }
  console.log(`[IndexNow] Finished streaming ${success}/${PRIORITY_URLS.length} URLs.`);
}

async function streamBingWebmasterApi() {
  console.log(`\n[Bing API Streaming] Streaming ${PRIORITY_URLS.length} priority URLs via SubmitUrl (no batch)...`);
  let success = 0;
  for (let i = 0; i < PRIORITY_URLS.length; i++) {
    const url = PRIORITY_URLS[i];
    const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${BING_API_KEY}`;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          siteUrl: `${BASE_URL}/`,
          url,
        }),
      });
      if (res.status === 200) {
        success++;
        console.log(`  ✔ [Bing API] Streamed: ${url}`);
      } else {
        const text = await res.text();
        console.warn(`  ⚠ [Bing API] Status ${res.status}: ${url} - ${text}`);
      }
    } catch (err) {
      console.error(`  ✖ [Bing API Error] ${url}:`, err.message);
    }
    await sleep(200);
  }
  console.log(`[Bing API] Finished streaming ${success}/${PRIORITY_URLS.length} URLs.`);
}

async function main() {
  await streamIndexNow();
  await streamBingWebmasterApi();
  console.log('\n✔ Streaming execution finished cleanly. No batch processing warnings triggered.');
}

main();
