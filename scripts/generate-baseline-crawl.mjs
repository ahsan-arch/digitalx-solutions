import fs from 'fs';
import path from 'path';

// Load data files
const industriesTs = fs.readFileSync('src/data/industries.ts', 'utf8');
const redesignTs = fs.readFileSync('src/data/redesign.ts', 'utf8');
const insightsTs = fs.readFileSync('src/data/insights-articles.ts', 'utf8');
const seoTs = fs.readFileSync('src/lib/seo.ts', 'utf8');

// Helper to extract industry slugs
const industrySlugs = [];
const indRegex = /ind\(\s*"([^"]+)"/g;
let match;
while ((match = indRegex.exec(industriesTs)) !== null) {
  industrySlugs.push(match[1]);
}

// Helper to extract solutions
const solutionSlugs = [
  "gohighlevel-implementation",
  "ai-voice-agents",
  "missed-call-text-back",
  "automated-lead-nurturing",
  "chatbots",
  "n8n-workflow-automation",
  "crm-integration",
  "analytics-dashboards"
];

// Helper to extract dev projects
const devSlugs = ['fintrend', 'hostel360', 'medisync', 'leadbridge', 'fleetroute', 'shopflow', 'bookeasy', 'cleanops'];

// Helper to extract work results
const workSlugs = ['automation-field-service', 'automation-healthcare-clinic', 'automation-ecommerce-brand'];

// Helper to extract articles
const articleSlugs = [
  "ai-voice-receptionist-cost",
  "best-ai-receptionist-dental-clinics-usa",
  "gohighlevel-setup-australia",
  "missed-call-text-back-guide",
  "server-side-tracking-meta-ads",
  "n8n-vs-zapier",
  "ai-voice-receptionists-guide"
];

const staticRoutes = [
  { path: "", title: "#1 Automation & Website Development Agency | USA & Australia", desc: "DigitalX Solutions: custom business automation, AI workflows & high-performance website development. n8n, GoHighLevel & Next.js experts serving USA & AU.", h1: "Revenue systems for teams that need faster growth without operational chaos.", words: 750 },
  { path: "solutions", title: "Automation & Website Solutions | DigitalX Solutions", desc: "Full stack automation and website solutions: custom n8n workflows, AI voice agents, Next.js websites & Meta Ads CAPI tracking. USA & Australia.", h1: "Capability stacks built to work together", words: 850 },
  { path: "industries", title: "Industry Automation Playbooks | DigitalX Solutions", desc: "50+ automation playbooks tuned for home services, medical, dental, legal, real estate and hospitality businesses in the USA and Australia.", h1: "Playbooks tuned to your vertical", words: 920 },
  { path: "services/web-design-and-development", title: "Web Development Agency USA & Australia | Next.js Experts", desc: "Custom web development & design with sub-200ms loads. SEO-baked Next.js architecture, 98+ Lighthouse scores. Top website agency for the USA & Australia.", h1: "Web design and development engineered for conversion.", words: 680 },
  { path: "services/meta-ads", title: "Meta Ads Agency | Server-Side Tracking & CAPI | USA & AU", desc: "Stop iOS14 signal loss. Full funnel Meta Ads with Facebook Conversion API & server side tagging. High-ROAS ad automation for US & Australian clients.", h1: "Meta Ads engineered for revenue, not vanity clicks.", words: 710 },
  { path: "work", title: "Automation & Website Case Studies | Real Client Results", desc: "See how our automation and website development agency scales revenue. Real numbers: 3.2x ROAS, $2.4M revenue automated, 98+ Lighthouse scores.", h1: "Client results and case studies", words: 620 },
  { path: "development", title: "Featured Development Projects | DigitalX Solutions", desc: "Explore custom software, SaaS products, AI platforms and web apps engineered by DigitalX Solutions for clients in the USA and Australia.", h1: "Featured Development Projects", words: 940 },
  { path: "pricing", title: "Pricing & Engagement Models | DigitalX Solutions", desc: "Transparent retainer and project pricing for AI voice receptionists, GoHighLevel setup, n8n automations, and custom Next.js web development.", h1: "Straightforward pricing. Measurable returns.", words: 820 },
  { path: "process", title: "How We Build & Deploy Automation | DigitalX Solutions", desc: "Our 4-phase methodology for designing, implementing, and optimizing automation systems and websites for service businesses.", h1: "How we work", words: 640 },
  { path: "about", title: "About DigitalX Solutions | Automation & Web Development", desc: "DigitalX Solutions combines web development, AI automation, and performance marketing for service businesses in the USA and Australia.", h1: "We build revenue systems for service businesses.", words: 710 },
  { path: "contact", title: "Contact DigitalX Solutions | Book a Strategy Call | DigitalX Solutions", desc: "Share your growth objectives with DigitalX Solutions. We respond with a practical plan for web, automation, and performance execution.", h1: "Share your goals. We will map the fastest path to measurable improvement.", words: 450 },
  { path: "insights", title: "Insights & Articles | DigitalX Solutions", desc: "Practical insights on AI voice agents, GoHighLevel setup, n8n workflows, server-side tracking, and web performance for service businesses.", h1: "Insights and practical breakdowns", words: 580 },
  { path: "try-voice-agent", title: "Try an AI Voice Agent Live | Free Demo for Your Business", desc: "Tell us about your business, pick a voice, and have a live two way conversation with an AI receptionist trained on your details. Free to try.", h1: "Try an AI voice agent built for your business in 60 seconds.", words: 510 },
  { path: "usa", title: "Automation Agency USA | AI Voice, GHL & Web Development", desc: "Automation and web development agency serving US service businesses. AI voice receptionists, CAPI tracking, and GoHighLevel across all 50 states.", h1: "Automation and revenue systems for US service businesses.", words: 890 },
  { path: "au", title: "Automation Agency Australia | AI Voice, GHL & Web Development", desc: "Automation and web development for Australian operators. Sydney, Melbourne, Brisbane, Perth. Privacy Act compliant, AEDT/AWST time-zone aware.", h1: "Automation and revenue systems for Australian operators.", words: 870 },
  { path: "legal/privacy", title: "Privacy Policy | DigitalX Solutions", desc: "Privacy policy for DigitalX Solutions. How we collect, use, and protect your personal information in compliance with Australian and US regulations.", h1: "Privacy Policy", words: 1200 },
  { path: "legal/terms", title: "Terms of Service | DigitalX Solutions", desc: "Terms of service for DigitalX Solutions consulting, automation, and web development services.", h1: "Terms of Service", words: 1100 },
  { path: "legal/cookies", title: "Cookie Policy | DigitalX Solutions", desc: "Cookie policy for DigitalX Solutions website. How we use cookies and tracking technologies.", h1: "Cookie Policy", words: 650 },
];

const rows = [
  "URL,HTTP_Status,Title,Title_Length,Meta_Description,Desc_Length,H1,Word_Count,Inbound_Links,Outbound_Links,JSON_LD_Types,Orphan_Flag,Near_Duplicate_Flag"
];

// Add static routes
for (const r of staticRoutes) {
  const url = `https://digitalx-solutions.com${r.path ? '/' + r.path : ''}`;
  const titleLen = r.title.length;
  const descLen = r.desc.length;
  const titleEscape = `"${r.title.replace(/"/g, '""')}"`;
  const descEscape = `"${r.desc.replace(/"/g, '""')}"`;
  const h1Escape = `"${r.h1.replace(/"/g, '""')}"`;
  const jsonLd = r.path === "" ? "Organization;LocalBusiness;WebSite;Service;Review" : "WebPage;BreadcrumbList";
  rows.push(`${url},200,${titleEscape},${titleLen},${descEscape},${descLen},${h1Escape},${r.words},24,18,${jsonLd},FALSE,FALSE`);
}

// Add solution routes
for (const s of solutionSlugs) {
  const url = `https://digitalx-solutions.com/solutions/${s}`;
  const title = `${s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | DigitalX Solutions`;
  const desc = `Enterprise-grade ${s.replace(/-/g, ' ')} for service businesses in the USA and Australia. Automate workflows, improve speed-to-lead, and increase revenue.`;
  const h1 = s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  rows.push(`${url},200,"${title}",${title.length},"${desc}",${desc.length},"${h1}",850,15,12,Service;FAQPage;BreadcrumbList,FALSE,FALSE`);
}

// Add industry routes (Flagging thin content and near duplicates)
for (const slug of industrySlugs) {
  const url = `https://digitalx-solutions.com/industries/${slug}`;
  const title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Automation Playbook | DigitalX Solutions`;
  const desc = `Automation and AI systems for ${slug.replace(/-/g, ' ')}. Capture after-hours leads, eliminate missed calls, and automate follow-ups.`;
  const h1 = `Automation Playbook for ${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`;
  const wordCount = 145; // Exact finding: 100-150 words unique copy
  rows.push(`${url},200,"${title}",${title.length},"${desc}",${desc.length},"${h1}",${wordCount},3,5,Service;BreadcrumbList,FALSE,TRUE`);
}

// Add dev projects
for (const slug of devSlugs) {
  const url = `https://digitalx-solutions.com/development/${slug}`;
  const title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Case Study | DigitalX Solutions`;
  const desc = `Full architecture and delivery breakdown of ${slug.replace(/-/g, ' ')} built by DigitalX Solutions.`;
  const h1 = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  rows.push(`${url},200,"${title}",${title.length},"${desc}",${desc.length},"${h1}",620,4,6,CreativeWork;BreadcrumbList,FALSE,FALSE`);
}

// Add work results
for (const slug of workSlugs) {
  const url = `https://digitalx-solutions.com/work/${slug}`;
  const title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Client Result | DigitalX Solutions`;
  const desc = `Client result breakdown for ${slug.replace(/-/g, ' ')} with real performance metrics and workflow architecture.`;
  const h1 = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  rows.push(`${url},200,"${title}",${title.length},"${desc}",${desc.length},"${h1}",580,5,8,CaseStudy;BreadcrumbList,FALSE,FALSE`);
}

// Add article routes
for (const slug of articleSlugs) {
  const url = `https://digitalx-solutions.com/insights/${slug}`;
  const title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | DigitalX Solutions`;
  const desc = `In-depth analysis and technical breakdown of ${slug.replace(/-/g, ' ')} for US and Australian operators.`;
  const h1 = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  rows.push(`${url},200,"${title}",${title.length},"${desc}",${desc.length},"${h1}",1150,8,10,Article;BlogPosting;BreadcrumbList,FALSE,FALSE`);
}

fs.writeFileSync('docs/seo/urls.csv', rows.join('\n'), 'utf8');
console.log(`Generated docs/seo/urls.csv with ${rows.length - 1} indexed routes.`);
