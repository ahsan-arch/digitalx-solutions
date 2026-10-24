import fs from 'fs';

const INDEX_NOW_KEY = '3c12d5a79b40fe68';
const BING_API_KEY = '49626271e24a47dc88e60511bda9fcc9';
const HOST = 'digitalx-solutions.com';
const BASE_URL = `https://${HOST}`;

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

async function submitIndexNow() {
  console.log(`[IndexNow] Submitting ${PRIORITY_URLS.length} priority URLs to IndexNow...`);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEX_NOW_KEY,
        keyLocation: `${BASE_URL}/${INDEX_NOW_KEY}.txt`,
        urlList: PRIORITY_URLS,
      }),
    });
    console.log(`[IndexNow] Response status: ${res.status} ${res.statusText}`);
  } catch (err) {
    console.error(`[IndexNow] Error:`, err.message);
  }
}

async function submitBingWebmasterApi() {
  console.log(`[Bing API] Submitting URL batch to Bing Webmaster Tools...`);
  try {
    const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        siteUrl: `${BASE_URL}/`,
        urlList: PRIORITY_URLS,
      }),
    });
    const text = await res.text();
    console.log(`[Bing API] Response status: ${res.status}`, text);
  } catch (err) {
    console.error(`[Bing API] Error:`, err.message);
  }
}

async function main() {
  await submitIndexNow();
  await submitBingWebmasterApi();
}

main();
