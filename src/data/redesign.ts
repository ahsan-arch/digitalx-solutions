export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Results", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const heroMetrics = [
  { value: "$18M+", label: "Client-attributed revenue" },
  { value: "47", label: "Projects launched" },
  { value: "4.6x", label: "Average paid media ROAS" },
  { value: "< 2s", label: "Typical launch page speed" },
];

export type Solution = {
  slug: "web-development" | "ai-automation" | "performance-marketing";
  name: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  capabilities: string[];
  bestFor: string;
  legacyPaths: string[];
};

export const solutions: Solution[] = [
  {
    slug: "web-development",
    name: "Web Development",
    tagline: "Fast, conversion-ready websites and product surfaces",
    summary:
      "We design and ship high-performance Next.js websites that turn qualified traffic into booked calls and pipeline.",
    outcomes: [
      "Improve conversion rate with a clearer UX and stronger page hierarchy",
      "Cut bounce from slow pages with performance budgets built into delivery",
      "Create a scalable page architecture your team can extend without rework",
    ],
    capabilities: [
      "Messaging-first website strategy",
      "UX/UI design systems",
      "Next.js implementation and performance engineering",
      "Technical SEO foundations and schema",
      "Launch analytics and conversion tracking",
    ],
    bestFor:
      "B2B teams that need a site to support sales conversations, not just brand awareness.",
    legacyPaths: ["/services/web-dev", "/services/nextjs-development"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    tagline: "Operational systems that remove manual bottlenecks",
    summary:
      "We architect automation across CRM, ops, and customer communication using n8n, GoHighLevel, and AI assistants.",
    outcomes: [
      "Reduce repetitive admin work and lead-response latency",
      "Standardize follow-up and pipeline hygiene across teams",
      "Create resilient workflows with observability and fallback handling",
    ],
    capabilities: [
      "Workflow architecture and event mapping",
      "n8n and GoHighLevel implementation",
      "AI voice and conversational agent deployment",
      "Data synchronization across core systems",
      "Operational dashboards and QA routines",
    ],
    bestFor:
      "Service businesses and growing teams that are losing revenue to fragmented processes.",
    legacyPaths: [
      "/services/revenue-operations",
      "/services/conversational-ai",
      "/services/ai-voice-receptionists",
    ],
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    tagline: "Paid media systems with stronger data and creative feedback loops",
    summary:
      "We run Meta acquisition with server-side tracking, rapid creative iteration, and offer-page alignment.",
    outcomes: [
      "Recover lost attribution signal after iOS privacy changes",
      "Lower CPA through creative testing discipline",
      "Improve budget efficiency with full-funnel measurement",
    ],
    capabilities: [
      "Meta Ads strategy and account architecture",
      "Server-side CAPI and event quality optimization",
      "Landing page and offer alignment",
      "Weekly testing cadence and performance reporting",
      "Retargeting and lifecycle campaign structures",
    ],
    bestFor:
      "Teams with active ad spend that need cleaner measurement and consistent decision velocity.",
    legacyPaths: ["/services/meta-ads", "/services/meta-ads-engineering"],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export type Industry = {
  slug: "home-services" | "healthcare" | "professional-services";
  name: string;
  headline: string;
  summary: string;
  painPoints: string[];
  playbook: string[];
  relatedSolutionSlugs: Solution["slug"][];
};

export const industries: Industry[] = [
  {
    slug: "home-services",
    name: "Home Services",
    headline: "Book more qualified jobs without adding front-desk overhead",
    summary:
      "From plumbing to electrical and HVAC, we improve lead handling, scheduling consistency, and local landing page performance.",
    painPoints: [
      "Missed calls and delayed lead response",
      "Inconsistent quote and follow-up workflows",
      "Ads running without clean attribution by service type",
    ],
    playbook: [
      "Call capture and instant response automation",
      "Service-specific landing pages mapped to campaigns",
      "Quote follow-up workflows and no-show prevention",
    ],
    relatedSolutionSlugs: ["web-development", "ai-automation", "performance-marketing"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Improve patient acquisition and communication reliability",
    summary:
      "We help clinics modernize patient journeys with compliant communication workflows, conversion-focused pages, and reporting clarity.",
    painPoints: [
      "High inbound volume and limited staff capacity",
      "Manual intake and appointment bottlenecks",
      "Campaign spend that lacks outcome visibility",
    ],
    playbook: [
      "Patient inquiry triage and booking automations",
      "Service-line landing pages for paid campaigns",
      "Follow-up and reminder systems integrated with CRM",
    ],
    relatedSolutionSlugs: ["ai-automation", "web-development", "performance-marketing"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    headline: "Build a demand engine that supports longer sales cycles",
    summary:
      "For legal, finance, and consulting teams, we create clear positioning, structured demand capture, and automated lead qualification.",
    painPoints: [
      "Low-quality inbound leads and unclear qualification",
      "Slow handoffs between marketing and sales",
      "Website content that does not support trust-heavy decisions",
    ],
    playbook: [
      "Authority-focused website and service architecture",
      "Lead scoring and CRM routing automations",
      "Lifecycle nurture and consultation booking workflows",
    ],
    relatedSolutionSlugs: ["web-development", "ai-automation", "performance-marketing"],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const processSteps = [
  {
    title: "Diagnose",
    description:
      "We audit your current demand flow, conversion paths, and operating constraints to identify highest-leverage changes.",
  },
  {
    title: "Design",
    description:
      "We define the system architecture across pages, workflows, and campaign feedback loops before implementation begins.",
  },
  {
    title: "Deploy",
    description:
      "We ship in staged releases with instrumentation from day one so outcomes can be measured immediately.",
  },
  {
    title: "Refine",
    description:
      "We run recurring optimization cycles based on observed behavior, conversion quality, and business goals.",
  },
];

export type ResultCard = {
  client: string;
  industry: string;
  challenge: string;
  impact: string;
  services: string[];
};

export const results: ResultCard[] = [
  {
    client: "Apex Fitness",
    industry: "E-commerce",
    challenge: "Attribution loss and rising CPA after privacy updates.",
    impact: "5.1x ROAS and CPA reduction from $65 to $22 in 90 days.",
    services: ["Performance Marketing", "AI Automation"],
  },
  {
    client: "Atlas Collective",
    industry: "Professional Services",
    challenge: "Slow site and weak conversion path for qualified traffic.",
    impact: "2.1x lift in qualified consultation starts after relaunch.",
    services: ["Web Development", "Performance Marketing"],
  },
  {
    client: "Riverstone Dental Group",
    industry: "Healthcare",
    challenge: "Missed inbound calls and front-desk overload.",
    impact: "24/7 call coverage with automated booking and 32% more appointments.",
    services: ["AI Automation", "Web Development"],
  },
];

export const testimonials = [
  {
    quote:
      "DigitalX rebuilt our demand flow end to end. We finally have a system, not disconnected tactics.",
    author: "Rachel Kim",
    role: "CMO, Nomad Health",
  },
  {
    quote:
      "They improved both speed and clarity in our site. Sales calls are better before they even start.",
    author: "James Whitfield",
    role: "Head of Growth, Carve Finance",
  },
  {
    quote:
      "The automation rollout removed dozens of manual handoffs every week and gave us cleaner reporting.",
    author: "Priya Desai",
    role: "Director of Digital, Atlas Collective",
  },
];

export const aboutPrinciples = [
  {
    title: "Systems over one-off tactics",
    body: "Every engagement is designed as an operating system that can be measured, maintained, and improved.",
  },
  {
    title: "Clarity over complexity",
    body: "Clear offer communication, clear ownership, and clear reporting beat flashy but fragile execution.",
  },
  {
    title: "Performance with accountability",
    body: "We define outcomes early, instrument delivery, and stay close to the numbers after launch.",
  },
];

export const companyProfile = {
  name: "DigitalX Solutions",
  email: "info@digitalx-solutions.com",
  location: "Sydney, Australia and United States",
  tagline: "Revenue systems for growth-focused businesses.",
};

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Web Development", href: "/solutions/web-development" },
      { label: "AI Automation", href: "/solutions/ai-automation" },
      { label: "Performance Marketing", href: "/solutions/performance-marketing" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Home Services", href: "/industries/home-services" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Professional Services", href: "/industries/professional-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Results", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
