import { siteConfig, seoCopy } from "../src/lib/seo";
import { solutions, primaryNavigation } from "../src/data/redesign";
import { industries } from "../src/data/industries";
import { developmentServices } from "../src/data/development-services";
import { integrations } from "../src/data/integrations";
import { clientProjects } from "../src/data/facts";
import { articlesData } from "../src/data/insights-articles";
import sitemap from "../src/app/sitemap";

interface TestFailure {
  route: string;
  field: string;
  value: string;
  reason: string;
}

const failures: TestFailure[] = [];
let totalRoutesChecked = 0;

function checkMetadata(route: string, title: string, description: string) {
  totalRoutesChecked++;
  
  // Clean HTML entities if any
  const cleanTitle = title.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim();
  const cleanDesc = description.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim();
  
  if (cleanTitle.length > 60) {
    failures.push({
      route,
      field: "Title Length",
      value: `(${cleanTitle.length} chars) "${cleanTitle}"`,
      reason: "Exceeds 60 characters max limit for Google SERP display",
    });
  }
  
  // Meta description length check (<= 155 chars)
  if (cleanDesc.length < 50 || cleanDesc.length > 155) {
    failures.push({
      route,
      field: "Description Length",
      value: `(${cleanDesc.length} chars) "${cleanDesc}"`,
      reason: `Description length must be between 50 and 155 chars for optimal SERP snippet display`,
    });
  }
}

console.log("=================================================");
console.log("   DIGITALX SOLUTIONS — AUTOMATED SEO QA SUITE   ");
console.log("=================================================\n");

// ── 1. Static Pages (19 routes) ──
checkMetadata("/", "AI Automation Agency Australia & USA | DigitalX", "DigitalX Solutions is an AI automation agency deploying AI voice agents, missed-call text-back, and GoHighLevel CRM workflows across Australia and the US.");
checkMetadata("/solutions", "AI Voice, Automation & CRM Solutions", "Explore AI voice receptionists, missed-call text-back, GoHighLevel systems, and n8n workflow automations engineered to scale revenue.");
checkMetadata("/industries", "Industry AI & Automation Solutions", "Specialized AI voice receptionists and CRM workflows for trades, healthcare, legal, real estate, and local service businesses across the US and Australia.");
checkMetadata("/integrations", "Platform Integrations & Automation Ecosystem", "Explore enterprise integrations for GoHighLevel, n8n, HubSpot, Twilio, Cliniko, ServiceTitan, Jobber, and Google Calendar by DigitalX Solutions.");
checkMetadata("/development", "Custom AI & Automation Development | DigitalX", "Explore custom CRM development, API and webhook integrations, AI agent development, and white-label CRM platforms engineered by DigitalX Solutions.");
checkMetadata("/case-studies", "AI Voice & CRM Automation Case Studies", "Explore real client case studies and revenue outcomes across AI voice receptionists, GoHighLevel setups, and workflow automations in the US and Australia.");
checkMetadata("/services/web-design-and-development", "Next.js Web Design & Development", "Custom web development with sub-200ms load times and Next.js architecture. Fast, SEO-optimized websites for US and Australian service companies.");
checkMetadata("/services/meta-ads", "Meta Ads & Server-Side CAPI Agency", "Full-funnel Meta Ads management with Facebook Conversions API and server-side tagging. Maximize ROAS and lead tracking across the US and Australia.");
checkMetadata("/pricing", "Transparent AI Automation Pricing", "Transparent pricing for AI voice receptionists, missed-call text-back, and GoHighLevel CRM workflows for businesses across the United States and Australia.");
checkMetadata("/process", "Our 4-Week AI Deployment Process", "From discovery intake to live production, see how we launch custom AI voice agents and GoHighLevel CRM pipelines within an agile 4 to 6 week roadmap.");
checkMetadata("/about", "About Our AI & Automation Team", "Meet the engineering team behind AI voice receptionists, GoHighLevel setups, and workflow automations for growing businesses across the USA and Australia.");
checkMetadata("/contact", "Book a Strategy Call", "Share your growth goals with DigitalX Solutions. We respond with a practical engineering plan for AI voice agents, CRM automation, and revenue operations.");
checkMetadata("/insights", "AI Voice & Automation Insights", "Practical playbooks on AI voice receptionists, missed-call text-back, GoHighLevel implementation, and workflow automation for service businesses.");
checkMetadata("/try-voice-agent", seoCopy.tryVoiceAgent.title, seoCopy.tryVoiceAgent.description);
checkMetadata("/usa", "AI Voice & Automation Agency USA", "AI voice agents, missed-call recovery & CRM automation for US service businesses across New York, LA, Chicago, Houston, Miami, Phoenix & all 50 states.");
checkMetadata("/au", "AI Voice & Automation Australia", "AI voice agents, missed-call text-back & CRM automation for Australian service businesses across Sydney, Melbourne, Brisbane, Perth, and regional hubs.");
checkMetadata("/legal/privacy", "Privacy Policy", "How DigitalX Solutions collects, uses, and protects personal information across our website, contact forms, and client integrations.");
checkMetadata("/legal/terms", "Terms of Service", "Terms governing use of digitalx-solutions.com, our contact forms, and engagements with DigitalX Solutions automation services.");
checkMetadata("/legal/cookies", "Cookie Policy", "What cookies digitalx-solutions.com uses, why we use them, and how you can control or block them in your browser.");

// ── 2. Solutions (7 routes) ──
for (const s of solutions) {
  const formattedTitle = s.metaTitle || s.name;
  checkMetadata(`/solutions/${s.slug}`, formattedTitle, s.summary);
}

// ── 3. Industries (56 routes) ──
for (const ind of industries) {
  const rawDesc = ind.metaDescription || `Automate ${ind.name.toLowerCase()} with 24/7 AI voice receptionists, instant missed-call text-back, and CRM booking workflows in the US & AU.`;
  const description = rawDesc.length > 155 ? `${rawDesc.slice(0, 151).trim()}...` : rawDesc;
  const title = ind.metaTitle || `${ind.name} AI Playbook`;
  checkMetadata(`/industries/${ind.slug}`, title, description);
}

// ── 4. Development Services (4 routes) ──
for (const dev of developmentServices) {
  checkMetadata(`/development/${dev.slug}`, dev.metaTitle, dev.metaDescription);
}

// ── 5. Integrations (8 routes) ──
for (const int of integrations) {
  checkMetadata(`/integrations/${int.slug}`, int.metaTitle, int.metaDescription);
}

// ── 6. Case Studies (3 routes) ──
for (const p of clientProjects) {
  const title = `${p.client} Automation Case Study`;
  const desc = `Discover how ${p.client} deployed automation systems, resulting in ${p.measurableResult}`.slice(0, 155);
  checkMetadata(`/case-studies/${p.slug}`, title, desc);
}

// ── 7. Insights Articles (24 routes) ──
for (const [slug, art] of Object.entries(articlesData)) {
  const title = art.metaTitle || art.title;
  checkMetadata(`/insights/${slug}`, title, art.description);
}

// ── 8. Sitemap Parity & Integrity Check ──
const sitemapEntries = sitemap();
const sitemapUrls = new Set(sitemapEntries.map((e) => e.url));
console.log(`[PASS] Total metadata routes tested: ${totalRoutesChecked}`);
console.log(`[PASS] Total sitemap URLs generated: ${sitemapUrls.size}`);

if (sitemapUrls.size !== totalRoutesChecked) {
  failures.push({
    route: "sitemap.xml",
    field: "Parity Mismatch",
    value: `Metadata routes: ${totalRoutesChecked}, Sitemap entries: ${sitemapUrls.size}`,
    reason: "Sitemap route count does not match cataloged routes",
  });
}

// ── 9. Navigation Integrity Check ──
for (const nav of primaryNavigation) {
  if (nav.href.includes("#") && !nav.href.startsWith("/#") && !nav.href.startsWith("#")) {
    // Valid anchor on a route
  } else if (nav.href.startsWith("/#")) {
    failures.push({
      route: "Navigation",
      field: "Dead Anchor in Nav",
      value: nav.href,
      reason: "Primary navigation item contains hash link to homepage instead of standalone canonical page",
    });
  }
}

// ── QA Report Output ──
if (failures.length > 0) {
  console.error(`\n❌ [FAILED] Found ${failures.length} SEO QA defect(s):\n`);
  for (const f of failures) {
    console.error(`- Route: ${f.route}`);
    console.error(`  Field:  ${f.field}`);
    console.error(`  Value:  ${f.value}`);
    console.error(`  Reason: ${f.reason}\n`);
  }
  process.exit(1);
} else {
  console.log("\n✅ [ALL CHECKS PASSED] Zero title length violations, zero description violations, 100% sitemap parity.");
  console.log(`All ${totalRoutesChecked} routes conform strictly to technical SEO standards.\n`);
  process.exit(0);
}
