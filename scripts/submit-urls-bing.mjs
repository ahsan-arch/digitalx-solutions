import fs from 'fs';

const INDEX_NOW_KEY = '3c12d5a79b40fe68';
const BING_API_KEY = '49626271e24a47dc88e60511bda9fcc9';
const HOST = 'digitalx-solutions.com';
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEX_NOW_KEY}.txt`;

const PRIORITY_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/usa`,
  `${BASE_URL}/au`,
  `${BASE_URL}/solutions`,
  `${BASE_URL}/solutions/ai-voice-agents`,
  `${BASE_URL}/solutions/missed-call-text-back`,
  `${BASE_URL}/solutions/n8n-workflow-automation`,
  `${BASE_URL}/solutions/gohighlevel-implementation`,
  `${BASE_URL}/try-voice-agent`,
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
