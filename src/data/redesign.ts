export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export const heroMetrics = [
  { value: "24/7", label: "AI call coverage" },
  { value: "< 60s", label: "Missed-call text-back" },
  { value: "5×", label: "Lift in booked jobs" },
  { value: "Zero", label: "Missed leads at 2 am" },
];

export type SolutionSlug =
  | "ai-voice-agents"
  | "automated-lead-nurturing"
  | "crm-integration"
  | "missed-call-text-back"
  | "chatbots"
  | "analytics-dashboards";

export type Solution = {
  slug: SolutionSlug;
  name: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  capabilities: string[];
  bestFor: string;
  legacyPaths: string[];
  group: "capture" | "nurture" | "operate";
};

export const solutions: Solution[] = [
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    tagline: "24/7 answering + qualification + booking",
    summary:
      "Human-sounding AI receptionists answer every call, qualify the caller, and book the job, day, night, weekends, and holidays.",
    outcomes: [
      "Zero missed calls and after-hours revenue leaks",
      "Consistent qualification every time, not when staff are free",
      "Bookings dropped directly into your calendar and CRM",
    ],
    capabilities: [
      "Industry-tuned voice prompts (plumbers, med spas, gyms, etc.)",
      "Live call forwarding with intent detection",
      "Multi-language support (English, Spanish, Arabic)",
      "Calendar + CRM integration (GHL, Google Calendar, HubSpot)",
      "Call transcripts + sentiment reports",
    ],
    bestFor:
      "Owner-operators who answer phones themselves, lose calls during jobs, or burn hours on unqualified tire-kickers.",
    legacyPaths: ["/services/ai-voice-receptionists"],
    group: "capture",
  },
  {
    slug: "missed-call-text-back",
    name: "Missed Call Text-Back",
    tagline: "Under a minute to every missed caller",
    summary:
      "Every call you can't pick up triggers an instant SMS, so the lead is engaged before they dial your competitor.",
    outcomes: [
      "Recover 30 to 50% of otherwise-lost callers",
      "Start the conversation before the next business opens",
      "Zero ops overhead, runs silently in the background",
    ],
    capabilities: [
      "Instant SMS trigger on every missed call",
      "Two-way SMS with AI-assisted replies",
      "Escalation rules (handoff to team, booking link, voicemail)",
      "Business-hours logic + holiday handling",
      "Reporting on recovery rate + revenue attribution",
    ],
    bestFor:
      "Any business where a missed call equals a lost customer, home services, clinics, salons, law firms.",
    legacyPaths: [],
    group: "capture",
  },
  {
    slug: "automated-lead-nurturing",
    name: "Automated Lead Nurturing",
    tagline: "Multi-step email + SMS sequences that close",
    summary:
      "Every new inquiry gets a tailored, multi-touch follow-up sequence so leads don't go cold while you run your business.",
    outcomes: [
      "Recover no-shows and ghosters with automated follow-ups",
      "Shorten quote-to-close by staying top-of-mind",
      "Free your team from chasing, focus them on converting",
    ],
    capabilities: [
      "Industry-specific nurture templates",
      "Email + SMS + WhatsApp sequencing",
      "Behavior-triggered branching (opens, replies, bookings)",
      "A/B testing and win-rate reporting",
      "Seamless handoff to human reps on intent signals",
    ],
    bestFor:
      "Services with consideration cycles, med spas, legal, mortgage, fitness memberships, home improvement estimates.",
    legacyPaths: [],
    group: "nurture",
  },
  {
    slug: "chatbots",
    name: "Chatbots (Web + WhatsApp + SMS)",
    tagline: "AI that qualifies, books, and answers 24/7",
    summary:
      "Deploy AI chat on your website, WhatsApp, and SMS. Trained on your services, pricing, and FAQs, so it actually converts.",
    outcomes: [
      "Capture inquiries when your team is asleep",
      "Deflect price-shoppers while qualifying serious buyers",
      "Lower support load by answering the top 20 FAQs instantly",
    ],
    capabilities: [
      "Custom-trained on your services + policies",
      "Web widget + WhatsApp Business API + SMS",
      "Booking-link handoff on intent",
      "Human takeover with full conversation context",
      "Analytics on top questions, conversions, and drop-off",
    ],
    bestFor:
      "Any business with a website doing more than $10k/mo in leads, especially multi-location and after-hours heavy.",
    legacyPaths: ["/services/conversational-ai"],
    group: "nurture",
  },
  {
    slug: "crm-integration",
    name: "CRM Integration",
    tagline: "GoHighLevel, n8n, and your existing stack, wired together",
    summary:
      "We connect your phone, chat, forms, ads, and calendar into one CRM so every lead is tracked, scored, and routed automatically.",
    outcomes: [
      "One pipeline, no more spreadsheets, sticky notes, or lost leads",
      "Automatic lead scoring and routing to the right closer",
      "Real-time visibility into what's working across every channel",
    ],
    capabilities: [
      "GoHighLevel master snapshots per industry",
      "n8n + Zapier backends for edge cases",
      "Data sync across Meta Ads, Google Ads, email, SMS, calls",
      "Custom pipelines + tag logic per service line",
      "Team training + SOPs for long-term adoption",
    ],
    bestFor:
      "Owner-operators outgrowing spreadsheets and agencies stitched from 6 separate tools.",
    legacyPaths: ["/services/revenue-operations"],
    group: "operate",
  },
  {
    slug: "analytics-dashboards",
    name: "Analytics & Reporting Dashboards",
    tagline: "Live pipeline + ROI dashboards for owners",
    summary:
      "See bookings, revenue, ad spend, and pipeline health in one dashboard, not seven tabs you forget to check.",
    outcomes: [
      "Know your true cost-per-booked-job this week, not next quarter",
      "Spot channel drop-offs before they blow up your month",
      "Defensible numbers for every marketing decision",
    ],
    capabilities: [
      "Unified dashboard across ads, calls, chat, bookings",
      "Revenue attribution by source and campaign",
      "Weekly email digests for owners who don't log in",
      "Custom KPI tracking per industry vertical",
      "Forecasting + goal tracking",
    ],
    bestFor:
      "Owners who want numbers at a glance, not another report to chase.",
    legacyPaths: [],
    group: "operate",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export type IndustrySlug =
  | "home-services"
  | "healthcare-wellness"
  | "professional-services"
  | "fitness-personal-care"
  | "real-estate";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  headline: string;
  summary: string;
  niches: string[];
  painPoints: string[];
  playbook: string[];
  relatedSolutionSlugs: SolutionSlug[];
};

export const industries: Industry[] = [
  {
    slug: "home-services",
    name: "Home Services",
    headline: "Stop losing jobs to the first plumber who picks up.",
    summary:
      "For trades who answer calls from job sites, we deploy AI voice agents, missed-call text-back, and booking automation so every quote request turns into a scheduled visit.",
    niches: ["Plumbers", "Roofers", "HVAC", "Electricians", "Landscapers", "Pest control", "Painters"],
    painPoints: [
      "Missing calls while on tools, and losing the job",
      "Quote follow-ups slipping through the cracks",
      "Ad spend that can't be traced to booked revenue",
    ],
    playbook: [
      "AI voice agent answers every call, qualifies the job, books the visit",
      "Missed-call text-back recovers 30 to 50% of lost callers",
      "Automated quote follow-ups with SMS + email sequences",
      "GHL pipeline with job-type tagging for Meta retargeting",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "missed-call-text-back",
      "automated-lead-nurturing",
      "crm-integration",
    ],
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    headline: "Fill the calendar without hiring another receptionist.",
    summary:
      "For med spas, dental, chiropractors, and therapists, we automate intake, scheduling, and reminders while staying inside your compliance boundaries.",
    niches: ["Med spas", "Dental practices", "Chiropractors", "Therapists", "Physiotherapists", "Naturopaths"],
    painPoints: [
      "High inbound volume but only two front-desk seats",
      "No-shows costing $300 to 800 per empty chair",
      "Staff copying leads between software manually",
    ],
    playbook: [
      "AI voice + chat intake with HIPAA-aware handling",
      "Automated appointment confirmations + reminders via SMS",
      "No-show recovery workflows that refill cancellations",
      "Service-specific landing pages for each treatment",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "chatbots",
      "automated-lead-nurturing",
      "analytics-dashboards",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    headline: "Qualify better leads before you spend a minute on a call.",
    summary:
      "For lawyers, mortgage brokers, accountants, and consultants, we add front-end qualification and nurture so your billable hours go to real buyers.",
    niches: ["Lawyers", "Mortgage brokers", "Accountants", "Consultants", "Financial planners", "Insurance brokers"],
    painPoints: [
      "Too many unqualified inquiries clogging the calendar",
      "Long sales cycles with no system to stay top-of-mind",
      "Referral pipeline that breaks when the one rainmaker is busy",
    ],
    playbook: [
      "AI chatbot qualifies inquiries against your intake criteria",
      "Lead scoring + routing to the right partner or paralegal",
      "Multi-touch nurture tailored to 90+ day decision cycles",
      "Client-review and referral-ask automation post-close",
    ],
    relatedSolutionSlugs: [
      "chatbots",
      "automated-lead-nurturing",
      "crm-integration",
      "analytics-dashboards",
    ],
  },
  {
    slug: "fitness-personal-care",
    name: "Fitness & Personal Care",
    headline: "Fill the schedule, and keep it full.",
    summary:
      "For gyms, studios, salons, and barbershops, we automate trial signups, rebooking, and win-back so retention stops depending on memory.",
    niches: ["Gyms", "Yoga / pilates studios", "Salons", "Barbershops", "Personal trainers", "Nail bars"],
    painPoints: [
      "Walk-ins converting at 40% when they should hit 70%+",
      "Clients who ghost after their first visit and never return",
      "DMs and missed calls piling up outside peak hours",
    ],
    playbook: [
      "AI voice + chat answers trial inquiries around the clock",
      "Automated first-visit follow-up and rebooking flows",
      "Win-back sequences for lapsed members / clients",
      "Referral + review asks post-visit, wired to your CRM",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "chatbots",
      "automated-lead-nurturing",
      "missed-call-text-back",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Local Retail",
    headline: "Respond first. Win the listing or the sale.",
    summary:
      "For agents, brokers, property managers, and local retailers, we make sure every Zillow ping, Meta lead, or shop inquiry is handled instantly.",
    niches: ["Real estate agents", "Brokerages", "Property managers", "Local retailers", "Furniture stores", "Boutiques"],
    painPoints: [
      "Leads going cold in the 20-minute gap between alerts",
      "Portal leads treated like junk because 80% are junk",
      "No system for post-close nurture or referral asks",
    ],
    playbook: [
      "Instant AI response to every portal + ad lead",
      "Qualification flow that separates serious buyers from tire-kickers",
      "Drip nurture for long-horizon buyers (6 to 18 months out)",
      "Post-close referral + review automation",
    ],
    relatedSolutionSlugs: [
      "missed-call-text-back",
      "chatbots",
      "automated-lead-nurturing",
      "crm-integration",
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const processSteps = [
  {
    title: "Discover",
    description:
      "We map your current call flow, lead sources, and manual handoffs, and show you the exact leaks costing you revenue.",
  },
  {
    title: "Build",
    description:
      "We deploy your industry-tuned GHL snapshot, wire up AI voice + chat, and integrate with your existing CRM and calendar.",
  },
  {
    title: "Launch",
    description:
      "We go live with your team trained, call flows tested, and dashboards showing what's working in week one.",
  },
  {
    title: "Iterate",
    description:
      "We tune prompts, sequences, and pipelines monthly based on real call transcripts, booking rates, and revenue outcomes.",
  },
];

export type ResultCard = {
  slug: string;
  client: string;
  industry: string;
  industrySlug: IndustrySlug;
  challenge: string;
  impact: string;
  services: string[];
  solutionsUsed: SolutionSlug[];
  narrative: string[];
  metrics: { label: string; value: string }[];
};

export const results: ResultCard[] = [
  {
    slug: "riverstone-dental-group",
    client: "Riverstone Dental Group",
    industry: "Healthcare & Wellness",
    industrySlug: "healthcare-wellness",
    challenge: "Missed inbound calls and front-desk overload.",
    impact: "24/7 call coverage with automated booking, 32% more appointments.",
    services: ["AI Voice Agents", "CRM Integration"],
    solutionsUsed: ["ai-voice-agents", "crm-integration"],
    narrative: [
      "Riverstone's two-receptionist front desk was answering 65% of inbound calls. The other 35%, typically after 5pm and on weekends, never got a callback, and patients booked at the next clinic.",
      "We deployed an AI voice agent trained on their service menu, hours, and intake script. It now handles overflow and after-hours, books directly into their PMS, and texts a confirmation within 30 seconds.",
      "Within 60 days, booked appointments increased 32% with zero new front-desk hires.",
    ],
    metrics: [
      { label: "Booked appointments", value: "+32%" },
      { label: "After-hours capture", value: "94%" },
      { label: "Avg. response time", value: "< 30s" },
    ],
  },
  {
    slug: "harbor-plumbing",
    client: "Harbor Plumbing Co.",
    industry: "Home Services",
    industrySlug: "home-services",
    challenge: "Losing after-hours emergency calls to competitors.",
    impact: "Recovered $180k/yr in booked jobs via missed-call text-back + AI voice.",
    services: ["Missed Call Text-Back", "AI Voice Agents"],
    solutionsUsed: ["missed-call-text-back", "ai-voice-agents"],
    narrative: [
      "Harbor's owner answered the phone himself between jobs. He estimated 30 to 40 missed calls a week, mostly nights and weekends, and emergency plumbing is the most lucrative slice.",
      "We layered missed-call text-back over an AI voice agent that triages emergencies and books non-urgent jobs. Calls his cell only for true after-hours emergencies.",
      "First quarter recovered $48k of previously-lost calls. Annualised: $180k+ in booked work without adding headcount.",
    ],
    metrics: [
      { label: "Annual recovered revenue", value: "$180k+" },
      { label: "Missed-call response", value: "< 60s" },
      { label: "Owner phone interruptions", value: "−72%" },
    ],
  },
  {
    slug: "atlas-consulting",
    client: "Atlas Consulting Group",
    industry: "Professional Services",
    industrySlug: "professional-services",
    challenge: "Billable hours lost to unqualified discovery calls.",
    impact: "Qualification chatbot cut time-wasters by 60%; close rate up 2.1×.",
    services: ["Chatbots", "Automated Lead Nurturing"],
    solutionsUsed: ["chatbots", "automated-lead-nurturing"],
    narrative: [
      "Atlas partners were spending 12+ hours a week on discovery calls, mostly with leads outside their billable-rate range or scope.",
      "We built a qualification chatbot that asks five intake questions and only books partner calendars when the prospect clears all five. Below-threshold inquiries route to an automated nurture for re-evaluation in 90 days.",
      "Time-wasters dropped 60% within a month. Partner-call close rate rose from 18% to 38%.",
    ],
    metrics: [
      { label: "Time-waster calls", value: "−60%" },
      { label: "Close rate", value: "18% → 38%" },
      { label: "Partner hours reclaimed", value: "8/wk" },
    ],
  },
];

export function getResultBySlug(slug: string): ResultCard | undefined {
  return results.find((r) => r.slug === slug);
}

export const testimonials = [
  {
    quote:
      "Before DigitalX, I was answering the phone on roofs and still losing jobs. Now every call gets answered, even at 10 pm.",
    author: "Mike Harbison",
    role: "Owner, Harbor Plumbing",
  },
  {
    quote:
      "The AI agent books consults while we're in treatments. Our front desk finally gets to focus on patients in the room.",
    author: "Dr. Priya Desai",
    role: "Owner, Riverstone Dental Group",
  },
  {
    quote:
      "We stopped chasing. The nurture sequences handle the 90-day cycle so we only jump in when a lead is actually ready.",
    author: "James Whitfield",
    role: "Partner, Atlas Consulting",
  },
];

export const aboutPrinciples = [
  {
    title: "Owner-operators first",
    body: "We build for plumbers, dentists, and studio owners, not CMOs with 12-person teams. Every workflow survives a busy Friday.",
  },
  {
    title: "Outcomes over tech",
    body: "Clients don't buy AI. They buy booked jobs, filled chairs, and recovered no-shows. The tech is invisible.",
  },
  {
    title: "Systems, not one-offs",
    body: "Every engagement is designed as an operating system, measurable, maintainable, and improvable without us.",
  },
];

export const companyProfile = {
  name: "DigitalX Solutions",
  email: "info@digitalx-solutions.com",
  location: "Casula, NSW, serving USA + Australia",
  tagline: "Stop losing revenue to missed calls and slow follow-ups.",
};

export const footerColumns = [
  {
    title: "Solutions",
    links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Industries",
    links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    title: "Also available",
    links: [
      { label: "Web Design & Development", href: "/services/web-design-and-development" },
      { label: "Meta Ads", href: "/services/meta-ads" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Regions & legal",
    links: [
      { label: "United States", href: "/usa" },
      { label: "Australia", href: "/au" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];
