import fs from 'fs';

const apiKey = '49626271e24a47dc88e60511bda9fcc9';
const siteUrl = 'https://digitalx-solutions.com/';

async function fetchEndpoint(name, params = {}) {
  const query = new URLSearchParams({
    siteUrl,
    apikey: apiKey,
    ...params,
  });
  const url = `https://ssl.bing.com/webmaster/api.svc/json/${name}?${query.toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return { error: err.message };
  }
}

async function run() {
  console.log('Querying Bing Webmaster API for:', siteUrl);

  const results = {};

  // 1. Crawl Issues
  results.crawlIssues = await fetchEndpoint('GetCrawlIssues');
  console.log('Crawl Issues received');

  // 2. Crawl Stats
  results.crawlStats = await fetchEndpoint('GetCrawlStats');
  console.log('Crawl Stats received');

  // 3. Query Stats
  results.queryStats = await fetchEndpoint('GetQueryStats');
  console.log('Query Stats received');

  // 4. Rank and Traffic Stats
  results.rankAndTraffic = await fetchEndpoint('GetRankAndTrafficStats');
  console.log('Rank and Traffic Stats received');

  // 5. Feeds / Sitemaps
  results.feeds = await fetchEndpoint('GetFeeds');
  console.log('Feeds received');

  // 6. URL Submission Quota
  results.submissionQuota = await fetchEndpoint('GetUrlSubmissionQuota');
  console.log('Submission Quota received');

  fs.writeFileSync('docs/seo/inputs/bing-webmaster-report.json', JSON.stringify(results, null, 2));
  console.log('Saved to docs/seo/inputs/bing-webmaster-report.json');
}

run();
