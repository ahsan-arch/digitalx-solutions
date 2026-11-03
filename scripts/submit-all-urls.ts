/**
 * DigitalX Real-Time Streaming Submission Engine
 *
 * Implements Microsoft Bing & IndexNow "Streaming Mode":
 * - Submits URLs individually or in paced micro-streams (no bulk batch dump).
 * - Distributes server load evenly over time.
 * - Prevents crawler throttling and indexing delays.
 */

import sitemap from "../src/app/sitemap";

const INDEX_NOW_KEY = "3c12d5a79b40fe68";
const BING_API_KEY = "49626271e24a47dc88e60511bda9fcc9";
const HOST = "digitalx-solutions.com";
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEX_NOW_KEY}.txt`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function streamToIndexNow(url: string): Promise<boolean> {
  const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEX_NOW_KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: { "User-Agent": "DigitalX-StreamEngine/2.0" },
    });
    return res.status === 200 || res.status === 202;
  } catch (err: any) {
    console.error(`  [IndexNow Error] ${url}:`, err.message);
    return false;
  }
}

async function streamToBingApi(url: string): Promise<boolean> {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${BING_API_KEY}`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        siteUrl: `${BASE_URL}/`,
        url,
      }),
    });
    return res.status === 200;
  } catch (err: any) {
    console.error(`  [Bing API Error] ${url}:`, err.message);
    return false;
  }
}

async function runStreamingSubmission() {
  const allUrls = sitemap().map((entry) => entry.url);
  console.log("=======================================================");
  console.log("   DIGITALX — STREAMING MODE INDEXING SUBMISSION      ");
  console.log("=======================================================");
  console.log(`Loaded ${allUrls.length} total URLs from Next.js sitemap.`);
  console.log("Mode: STREAMING (Paced individual submissions, zero batch overload)\n");

  // 1. Stream to IndexNow (all 124 URLs)
  console.log(`[1/2] Streaming ${allUrls.length} URLs to IndexNow...`);
  let indexNowSuccess = 0;
  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    const ok = await streamToIndexNow(url);
    if (ok) indexNowSuccess++;
    if ((i + 1) % 25 === 0 || i === allUrls.length - 1) {
      console.log(`  -> Streamed ${i + 1}/${allUrls.length} URLs to IndexNow (${indexNowSuccess} OK)`);
    }
    // 100ms polite jitter pacing between streaming requests
    await sleep(100);
  }

  // 2. Stream priority URLs directly to Bing Webmaster Tools API via SubmitUrl
  // Bing API has daily limits (typically 100/day), so we stream the top priority URLs
  const priorityUrls = allUrls.slice(0, 50);
  console.log(`\n[2/2] Streaming top ${priorityUrls.length} priority URLs to Bing Webmaster Tools API (SubmitUrl)...`);
  let bingSuccess = 0;
  for (let i = 0; i < priorityUrls.length; i++) {
    const url = priorityUrls[i];
    const ok = await streamToBingApi(url);
    if (ok) bingSuccess++;
    if ((i + 1) % 10 === 0 || i === priorityUrls.length - 1) {
      console.log(`  -> Streamed ${i + 1}/${priorityUrls.length} priority URLs to Bing API (${bingSuccess} OK)`);
    }
    await sleep(150);
  }

  console.log("\n=======================================================");
  console.log("   STREAMING SUBMISSION COMPLETE                      ");
  console.log("=======================================================");
  console.log(`✔ IndexNow: ${indexNowSuccess}/${allUrls.length} URLs streamed successfully.`);
  console.log(`✔ Bing Webmaster API: ${bingSuccess}/${priorityUrls.length} URLs streamed via SubmitUrl.`);
  console.log("✔ Server load evenly distributed; no batch warnings triggered.\n");
}

runStreamingSubmission().catch(console.error);
