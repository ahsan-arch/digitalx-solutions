export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Development", href: "/#development" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Voice Demo", href: "/try-voice-agent" },
];

export const heroMetrics = [
  { value: "24/7", label: "AI call coverage" },
  { value: "< 60s", label: "Missed call text back" },
  { value: "5x", label: "Lift in booked jobs" },
  { value: "Zero", label: "Missed leads at 2 am" },
];

export type SolutionSlug =
  | "gohighlevel-implementation"
  | "ai-voice-agents"
  | "missed-call-text-back"
  | "automated-lead-nurturing"
  | "chatbots"
  | "n8n-workflow-automation"
  | "crm-integration"
  | "analytics-dashboards";

export type SolutionFaq = { question: string; answer: string };

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
  faqs?: SolutionFaq[];
};

export const solutions: Solution[] = [
  {
    slug: "gohighlevel-implementation",
    name: "GoHighLevel Implementation",
    tagline: "Full GHL build out + snapshots + automations",
    summary:
      "We stand up GoHighLevel end to end, pipelines, snapshots, workflows, calendars, and SMS, so every lead, job, and follow up runs on one system instead of five tabs.",
    outcomes: [
      "One source of truth for leads, calls, SMS, bookings, and deals",
      "Industry tuned snapshots live in days, not months",
      "Automated follow ups and stage movement, no manual pipeline hygiene",
    ],
    capabilities: [
      "Industry master snapshots (home services, med spas, dental, legal, fitness)",
      "Pipelines + opportunity stages with win/loss automation",
      "Two way SMS, Missed call text back, and AI voice integration",
      "Calendar + booking widgets with round robin routing",
      "Workflow automations (lead scoring, tagging, sequence triggers)",
      "Sub account setup, white label, and team SOPs for handover",
    ],
    bestFor:
      "Owner operators and agencies standardising on GoHighLevel who want a production grade build, not a template dump.",
    legacyPaths: ["/services/revenue-operations"],
    group: "operate",
    faqs: [
      {
        question: "What is GoHighLevel and what is it used for?",
        answer:
          "GoHighLevel (GHL) is an all in one cloud based marketing and operations platform that combines CRM, pipelines, calendar booking, two way SMS, email automation, funnels, and reporting. Agencies and service businesses use it to replace a stack of separate tools (Mailchimp, Calendly, ActiveCampaign, ClickFunnels) with one system.",
      },
      {
        question: "Is GoHighLevel like Salesforce?",
        answer:
          "For service businesses and agencies, GoHighLevel covers what most Salesforce users actually use day to day, pipeline management, contact tracking, workflow automation, and reporting, plus marketing channels (email, SMS, funnels, landing pages) that Salesforce sells separately. Salesforce is still the right choice for enterprise teams with deep custom data models. For everyone else, GHL is faster to deploy and dramatically cheaper.",
      },
      {
        question: "How do I create automation workflows in GoHighLevel?",
        answer:
          "Inside GoHighLevel, open the Automations section, click Workflows, then Create New Workflow. Pick a trigger (form submission, missed call, tag added, appointment booked) and chain actions like sending an SMS, moving a deal stage, waiting an hour, or branching on a condition. Our implementation builds these workflows from production tested templates, with proper error handling and tagging so leads never get stuck silently.",
      },
      {
        question: "Is GoHighLevel free to use?",
        answer:
          "GoHighLevel offers a 14 day trial but is not free long term. Plans start at around USD 97 per month for a single business and scale up for agencies that need sub accounts. The pricing usually pays for itself by replacing 4 to 6 separate SaaS tools. We help clients pick the right tier and consolidate their existing tool spend.",
      },
      {
        question: "How long does a full GoHighLevel implementation take?",
        answer:
          "A focused implementation, snapshots, pipelines, automations, calendars, two way SMS, AI voice integration, and team handover, typically takes 2 to 4 weeks. Industry tuned snapshots cut this dramatically because we are not rebuilding the same flows from scratch every engagement.",
      },
    ],
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    tagline: "24/7 answering + qualification + booking",
    summary:
      "Human sounding AI receptionists answer every call, qualify the caller, and book the job, day, night, weekends, and holidays.",
    outcomes: [
      "Zero missed calls and after hours revenue leaks",
      "Consistent qualification every time, not when staff are free",
      "Bookings dropped directly into your calendar and CRM",
    ],
    capabilities: [
      "Industry tuned voice prompts (plumbers, med spas, gyms, etc.)",
      "Live call forwarding with intent detection",
      "Multi language support (English, Spanish, Arabic)",
      "Calendar + CRM integration (GHL, Google Calendar, HubSpot)",
      "Call transcripts + sentiment reports",
    ],
    bestFor:
      "Owner operators who answer phones themselves, lose calls during jobs, or burn hours on unqualified tire kickers.",
    legacyPaths: ["/services/ai-voice-receptionists"],
    group: "capture",
    faqs: [
      {
        question: "What is an AI voice receptionist?",
        answer:
          "An AI voice receptionist is a software agent that answers inbound phone calls, holds a natural conversation with the caller, qualifies them, and books the job into your calendar. It runs 24/7, never takes a sick day, and hands off to a human when the call needs one.",
      },
      {
        question: "How much does an AI voice receptionist cost?",
        answer:
          "Pricing varies with call volume and complexity. Self serve tools start around USD 50 to 150 per month for low volume. Custom agents tuned to a specific industry and integrated with your CRM and calendar typically run USD 300 to 1,500 per month, with measurable ROI for any business losing more than a couple of after hours calls per week.",
      },
      {
        question: "Can an AI voice agent book appointments directly into my calendar?",
        answer:
          "Yes. Our AI voice agents integrate with GoHighLevel, Google Calendar, HubSpot, and most modern booking systems. The agent checks live availability, holds the slot during the call, and writes the appointment back with full call notes attached.",
      },
      {
        question: "Do AI receptionists work for tradies and home service businesses?",
        answer:
          "Yes, this is one of the strongest use cases. Plumbers, HVAC technicians, electricians, and roofers are usually on tools when calls come in. An AI voice agent answers every call, qualifies the job (emergency vs routine), books the visit, and texts the owner a summary, recovering revenue that otherwise goes to whichever competitor picks up first.",
      },
      {
        question: "Will the AI voice agent sound robotic?",
        answer:
          "Modern voice agents use streaming neural voices that handle interruptions, pauses, and casual phrasing. Most callers cannot tell they are speaking to an AI in the first 30 seconds. We tune prompts, pacing, and accent for each market (US English, Australian English, bilingual Spanish where needed).",
      },
    ],
  },
  {
    slug: "missed-call-text-back",
    name: "Missed Call text back",
    tagline: "Under a minute to every missed caller",
    summary:
      "Every call you can't pick up triggers an instant SMS, so the lead is engaged before they dial your competitor.",
    outcomes: [
      "Recover 30 to 50% of otherwise lost callers",
      "Start the conversation before the next business opens",
      "Zero ops overhead, runs silently in the background",
    ],
    capabilities: [
      "Instant SMS trigger on every missed call",
      "Two way SMS with AI-assisted replies",
      "Escalation rules (handoff to team, booking link, voicemail)",
      "Business hours logic + holiday handling",
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
    tagline: "Multi step email + SMS sequences that close",
    summary:
      "Every new inquiry gets a tailored, multi touch follow up sequence so leads don't go cold while you run your business.",
    outcomes: [
      "Recover no shows and ghosters with automated follow ups",
      "Shorten quote to close by staying top of mind",
      "Free your team from chasing, focus them on converting",
    ],
    capabilities: [
      "Industry specific nurture templates",
      "Email + SMS + WhatsApp sequencing",
      "Behavior triggered branching (opens, replies, bookings)",
      "A/B testing and win rate reporting",
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
      "Deflect price shoppers while qualifying serious buyers",
      "Lower support load by answering the top 20 FAQs instantly",
    ],
    capabilities: [
      "Custom trained on your services + policies",
      "Web widget + WhatsApp Business API + SMS",
      "Booking link handoff on intent",
      "Human takeover with full conversation context",
      "Analytics on top questions, conversions, and drop off",
    ],
    bestFor:
      "Any business with a website doing more than $10k/mo in leads, especially multi location and after hours heavy.",
    legacyPaths: ["/services/conversational-ai"],
    group: "nurture",
  },
  {
    slug: "n8n-workflow-automation",
    name: "n8n Workflow Automation",
    tagline: "Custom automations that replace your manual ops",
    summary:
      "Bespoke n8n workflows that wire your CRM, ads, forms, calendars, and AI into automated pipelines, self hosted or cloud, with 90%+ cost savings vs Zapier at scale.",
    outcomes: [
      "Kill the $600/mo Zapier bill and run 10x more workflows",
      "Automate the 3 to 8 hours per week every team loses to copy/paste",
      "Monitoring + error alerts so automations don't silently break",
    ],
    capabilities: [
      "Self hosted or cloud n8n instance setup + hardening",
      "CRM sync (GHL, HubSpot, Pipedrive) with Meta/Google Ads + forms",
      "AI-powered lead scoring, routing, and enrichment workflows",
      "Zapier-to-n8n migrations with parallel run validation",
      "Webhook + API integrations for custom tools",
      "Error workflows, Slack alerts, and execution logs",
    ],
    bestFor:
      "Teams hitting Zapier cost ceilings or needing logic their SaaS automation tool can't do.",
    legacyPaths: [],
    group: "operate",
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
      "Real time visibility into what's working across every channel",
    ],
    capabilities: [
      "GoHighLevel master snapshots per industry",
      "n8n + Zapier backends for edge cases",
      "Data sync across Meta Ads, Google Ads, email, SMS, calls",
      "Custom pipelines + tag logic per service line",
      "Team training + SOPs for long term adoption",
    ],
    bestFor:
      "Owner operators outgrowing spreadsheets and agencies stitched from 6 separate tools.",
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
      "Know your true cost per booked job this week, not next quarter",
      "Spot channel drop offs before they blow up your month",
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
  | "plumbing-companies"
  | "electricians"
  | "hvac-companies"
  | "roofing-companies"
  | "home-remodeling-companies"
  | "senior-care-facilities"
  | "physical-therapy-clinics"
  | "dental-clinics"
  | "real-estate-agencies"
  | "accounting-firms"
  | "veterinary-clinics";

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
    slug: "plumbing-companies",
    name: "Plumbing Companies",
    headline: "Stop losing jobs to the first plumber who picks up.",
    summary:
      "Deploy AI voice agents, Missed call text back, and booking automation so every quote request turns into a scheduled visit.",
    niches: ["Residential Plumbing", "Commercial Plumbing", "Emergency Services"],
    painPoints: [
      "Missing calls while on tools, losing the job to whoever answers next",
      "Quote follow ups slipping through the cracks",
      "Ad spend that can't be traced to booked revenue",
    ],
    playbook: [
      "AI voice agent answers every call, qualifies, books the visit",
      "Missed call text back recovers 30 to 50% of lost callers",
      "Automated quote follow ups via SMS + email",
      "GHL pipeline with job-type tagging for Meta retargeting",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "missed-call-text-back",
      "automated-lead-nurturing",
      "gohighlevel-implementation",
    ],
  },
  {
    slug: "electricians",
    name: "Electricians",
    headline: "Keep your schedule full and never miss an emergency call.",
    summary:
      "Automate intake, scheduling, and reminders so your technicians are always moving to the next profitable job.",
    niches: ["Residential Electricians", "Commercial Electricians", "Industrial Electrical"],
    painPoints: [
      "High inbound volume with no dedicated front desk",
      "Emergency calls going to voicemail after hours",
      "Scheduling conflicts between routine and urgent jobs",
    ],
    playbook: [
      "AI voice + chat intake with emergency priority routing",
      "Automated appointment confirmations + reminders",
      "After hours booking with technician dispatch logic",
      "Review asks post visit to compound local SEO",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "chatbots",
      "automated-lead-nurturing",
      "gohighlevel-implementation",
    ],
  },
  {
    slug: "hvac-companies",
    name: "HVAC Companies",
    headline: "Capture every AC blowout and furnace failure instantly.",
    summary:
      "During peak seasons, speed to lead is everything. We add front end qualification and nurture so your trucks get to the highest value jobs first.",
    niches: ["AC Repair", "Heating Specialists", "Commercial HVAC"],
    painPoints: [
      "Scaling support during peak season surges",
      "Losing after hours emergency calls to competitors",
      "Routing emergencies to whichever tech answers first, not the right one",
    ],
    playbook: [
      "AI chatbot qualifies emergencies vs. routine",
      "Lead scoring + routing to available trucks",
      "After hours automated booking with emergency escalation",
      "Seasonal nurture for tune ups and maintenance plans",
    ],
    relatedSolutionSlugs: [
      "chatbots",
      "ai-voice-agents",
      "gohighlevel-implementation",
      "n8n-workflow-automation",
    ],
  },
  {
    slug: "roofing-companies",
    name: "Roofing Companies",
    headline: "Book every storm lead before the next roofer knocks.",
    summary:
      "Storm damage and urgent repairs hit in bursts. Capture, qualify, and schedule inspections instantly so your crew is the one on the roof, not the competitor down the street.",
    niches: ["Residential Roofing", "Commercial Roofing", "Storm Damage & Insurance Claims"],
    painPoints: [
      "Storm driven lead surges overwhelming the front desk",
      "Insurance claim leads slipping through the cracks before contact",
      "Long gap between inspection, quote, and signed contract",
    ],
    playbook: [
      "AI voice agent handles inspection booking 24/7",
      "Missed call text back during storm surges",
      "Automated quote follow up tailored to insurance vs. cash jobs",
      "Post install review and referral asks wired to GHL",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "missed-call-text-back",
      "automated-lead-nurturing",
      "gohighlevel-implementation",
    ],
  },
  {
    slug: "home-remodeling-companies",
    name: "Home Remodeling Companies",
    headline: "Nurture high ticket leads without the manual chase.",
    summary:
      "Remodeling has a long consideration cycle. We automate multi touch nurture and follow ups so your pipeline stays warm for months.",
    niches: ["Kitchen Remodels", "Bathroom Renovations", "Full Home Makeovers"],
    painPoints: [
      "3 to 6 month sales cycles with leads going cold",
      "No system for staying top of mind between the quote and the deposit",
      "Review and referral asks never getting sent post project",
    ],
    playbook: [
      "Multi touch nurture tailored to 3-6 month decision cycles",
      "Automated before/after portfolio drips",
      "Post project review asks wired to your CRM",
      "Dashboards to track quote to close velocity",
    ],
    relatedSolutionSlugs: [
      "automated-lead-nurturing",
      "chatbots",
      "analytics-dashboards",
      "gohighlevel-implementation",
    ],
  },
  {
    slug: "senior-care-facilities",
    name: "Senior Care Facilities",
    headline: "Compassionate, prompt responses for families in need.",
    summary:
      "Provide instant answers to touring and pricing questions 24/7, capturing tour bookings directly from your website or phone line.",
    niches: ["Assisted Living", "Memory Care", "Independent Living"],
    painPoints: [
      "Families needing immediate answers after hours",
      "Slow tour scheduling losing the family to another facility",
      "Lost inquiries sitting in an inbox no one checks",
    ],
    playbook: [
      "AI voice agent for 24/7 compassionate intake",
      "Automated tour scheduling with reminder sequences",
      "Lead scoring for high intent families",
      "CRM pipeline tracking from first call to move in",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "automated-lead-nurturing",
      "gohighlevel-implementation",
      "crm-integration",
    ],
  },
  {
    slug: "physical-therapy-clinics",
    name: "Physical Therapy Clinics",
    headline: "Fill the calendar without hiring another receptionist.",
    summary:
      "Automate patient intake, scheduling, waitlists, and reminders while staying inside your compliance boundaries to keep chairs full.",
    niches: ["Sports Therapy", "Rehabilitation", "Chiropractic Care"],
    painPoints: [
      "No shows costing $150+ per empty slot",
      "Front desk overload during peak hours",
      "Manual waitlist management when cancellations hit",
    ],
    playbook: [
      "AI voice intake with compliance aware handling",
      "Automated reminders via SMS + email",
      "No show recovery workflows that refill cancellations",
      "Missed call text back for after hours inquiries",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "missed-call-text-back",
      "chatbots",
      "gohighlevel-implementation",
    ],
  },
  {
    slug: "dental-clinics",
    name: "Dental Clinics",
    headline: "Automate patient recall and reduce no shows.",
    summary:
      "Ensure every hygiene appointment is filled and every high ticket implant consultation is nurtured through automated multi channel sequences.",
    niches: ["General Dentistry", "Orthodontics", "Cosmetic Dentistry"],
    painPoints: [
      "Empty chairs from last minute cancellations",
      "Patients overdue for hygiene and never getting recalled",
      "Front desk tied up on calls instead of chairside support",
    ],
    playbook: [
      "Automated recall sequences by treatment type",
      "Missed call text back during peak hours",
      "Waitlist activation on cancellation",
      "Multi touch nurture for implants and cosmetic consults",
    ],
    relatedSolutionSlugs: [
      "automated-lead-nurturing",
      "gohighlevel-implementation",
      "analytics-dashboards",
      "ai-voice-agents",
    ],
  },
  {
    slug: "real-estate-agencies",
    name: "Real Estate Agencies",
    headline: "Respond first. Win the listing or the sale.",
    summary:
      "Make sure every Zillow ping, Meta lead, or property inquiry is handled instantly, qualifying buyers and sellers before you even dial.",
    niches: ["Residential Real Estate", "Commercial Real Estate", "Property Management"],
    painPoints: [
      "Leads going cold in the 20-minute gap between alerts",
      "80% of portal leads are unqualified and waste agent time",
      "No post close referral or review system",
    ],
    playbook: [
      "Instant AI response to every portal + ad lead",
      "Qualification flow for serious buyers vs. tire kickers",
      "Drip nurture for long horizon buyers (6 to 18 months out)",
      "Post close referral + review automation",
    ],
    relatedSolutionSlugs: [
      "chatbots",
      "automated-lead-nurturing",
      "gohighlevel-implementation",
      "crm-integration",
    ],
  },
  {
    slug: "accounting-firms",
    name: "Accounting Firms",
    headline: "Qualify better clients before tax season hits.",
    summary:
      "Automate tax season intake, document collection reminders, and appointment scheduling so your CPAs focus on billable advisory work.",
    niches: ["Tax Preparation", "Corporate Accounting", "Bookkeeping"],
    painPoints: [
      "Too many manual document requests consuming staff time",
      "Unqualified prospects clogging the calendar",
      "Tax season creating capacity bottlenecks",
    ],
    playbook: [
      "AI chatbot for intake and qualification criteria",
      "Automated document request sequences with reminders",
      "Lead routing based on service need (tax, advisory, bookkeeping)",
      "Year round nurture for advisory cross sell",
    ],
    relatedSolutionSlugs: [
      "chatbots",
      "automated-lead-nurturing",
      "gohighlevel-implementation",
      "n8n-workflow-automation",
    ],
  },
  {
    slug: "veterinary-clinics",
    name: "Veterinary Clinics",
    headline: "Better support for pet owners, 24/7.",
    summary:
      "Handle emergency triage, routine appointment booking, and vaccination reminders automatically without expanding your front desk headcount.",
    niches: ["General Veterinary", "Emergency Animal Hospitals", "Specialty Pet Care"],
    painPoints: [
      "High call volume with limited front desk staff",
      "Sorting emergency vs. routine calls on the fly",
      "Missed annual checkups and vaccination recalls",
    ],
    playbook: [
      "AI voice agent for triage routing",
      "Automated vaccination and checkup reminders",
      "Missed call text back for routine inquiries",
      "Waitlist activation for cancellations",
    ],
    relatedSolutionSlugs: [
      "ai-voice-agents",
      "missed-call-text-back",
      "automated-lead-nurturing",
      "gohighlevel-implementation",
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
      "We deploy your industry tuned GHL snapshot, wire up AI voice + chat, and integrate with your existing CRM and calendar.",
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
  industrySlug?: IndustrySlug;
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
    industry: "Dental Clinics",
    industrySlug: "dental-clinics",
    challenge: "Missed inbound calls and front desk overload.",
    impact: "24/7 call coverage with automated booking, 32% more appointments.",
    services: ["AI Voice Agents", "CRM Integration"],
    solutionsUsed: ["ai-voice-agents", "crm-integration"],
    narrative: [
      "Riverstone's two receptionist front desk was answering 65% of inbound calls. The other 35%, typically after 5pm and on weekends, never got a callback, and patients booked at the next clinic.",
      "We deployed an AI voice agent trained on their service menu, hours, and intake script. It now handles overflow and after hours, books directly into their PMS, and texts a confirmation within 30 seconds.",
      "Within 60 days, booked appointments increased 32% with zero new front desk hires.",
    ],
    metrics: [
      { label: "Booked appointments", value: "+32%" },
      { label: "After hours capture", value: "94%" },
      { label: "Avg. response time", value: "< 30s" },
    ],
  },
  {
    slug: "harbor-plumbing",
    client: "Harbor Plumbing Co.",
    industry: "Plumbing Companies",
    industrySlug: "plumbing-companies",
    challenge: "Losing after hours emergency calls to competitors.",
    impact: "Recovered $180k/yr in booked jobs via Missed call text back + AI voice.",
    services: ["Missed Call text back", "AI Voice Agents"],
    solutionsUsed: ["missed-call-text-back", "ai-voice-agents"],
    narrative: [
      "Harbor's owner answered the phone himself between jobs. He estimated 30 to 40 missed calls a week, mostly nights and weekends, and emergency plumbing is the most lucrative slice.",
      "We layered Missed call text back over an AI voice agent that triages emergencies and books non urgent jobs. Calls his cell only for true after hours emergencies.",
      "First quarter recovered $48k of previously lost calls. Annualised: $180k+ in booked work without adding headcount.",
    ],
    metrics: [
      { label: "Annual recovered revenue", value: "$180k+" },
      { label: "Missed call response", value: "< 60s" },
      { label: "Owner phone interruptions", value: "-72%" },
    ],
  },
  {
    slug: "atlas-consulting",
    client: "Atlas Consulting Group",
    industry: "Accounting Firms",
    industrySlug: "accounting-firms",
    challenge: "Billable hours lost to unqualified discovery calls.",
    impact: "Qualification chatbot cut time wasters by 60%; close rate up 2.1x.",
    services: ["Chatbots", "Automated Lead Nurturing"],
    solutionsUsed: ["chatbots", "automated-lead-nurturing"],
    narrative: [
      "Atlas partners were spending 12+ hours a week on discovery calls, mostly with leads outside their billable rate range or scope.",
      "We built a qualification chatbot that asks five intake questions and only books partner calendars when the prospect clears all five. Below threshold inquiries route to an automated nurture for re evaluation in 90 days.",
      "Time wasters dropped 60% within a month. Partner call close rate rose from 18% to 38%.",
    ],
    metrics: [
      { label: "Time waster calls", value: "-60%" },
      { label: "Close rate", value: "18% -> 38%" },
      { label: "Partner hours reclaimed", value: "8/wk" },
    ],
  },
  {
    slug: "hitech-expertise",
    client: "Hi-Tech Expertise",
    industry: "Energy & Power Solutions",
    challenge: "No digital presence to showcase 13 global manufacturer partnerships and win Australian utility tenders.",
    impact: "SEO-optimized website launched, positioning Hi-Tech as Australia's #1 authorized energy agent with full product catalog and lead generation.",
    services: ["Web Design & Development", "SEO"],
    solutionsUsed: [],
    narrative: [
      "Hi-Tech Expertise is a Sydney-based authorized agent for 13 leading energy and power manufacturers across Italy, Germany, Spain, and China. They supply industrial batteries (FIAMM, Hoppecke), transformers (CEEG), HTLS conductors, OPGW cables, switchgear, instrument transformers, and smart meters to major Australian utilities including Transgrid, Ausgrid, and Endeavour Energy.",
      "Despite 20+ years of experience and 100+ major infrastructure projects delivered, they had no website to showcase their authorized partnerships, product range, or tender capabilities. Utility procurement teams and EPC contractors had no way to discover or verify their credentials online.",
      "We built a high-performance Next.js website with comprehensive product catalogs for all 12 product categories, dedicated partner pages for each of the 13 manufacturers, market-specific landing pages, and a blog strategy targeting utility procurement keywords. The site is fully AS/NZS compliant in its technical documentation and structured with Schema.org markup for maximum search visibility.",
    ],
    metrics: [
      { label: "Product categories", value: "12" },
      { label: "Manufacturer partners", value: "13" },
      { label: "Utility clients served", value: "9+" },
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
    title: "Owner operators first",
    body: "We build for plumbers, dentists, and studio owners, not CMOs with 12-person teams. Every workflow survives a busy Friday.",
  },
  {
    title: "Outcomes over tech",
    body: "Clients don't buy AI. They buy booked jobs, filled chairs, and recovered no shows. The tech is invisible.",
  },
  {
    title: "Systems, not one offs",
    body: "Every engagement is designed as an operating system, measurable, maintainable, and improvable without us.",
  },
];

export const companyProfile = {
  name: "DigitalX Solutions",
  email: "info@digitalx-solutions.com",
  location: "16 Boldrewood Ave, Casula, NSW 2170, Australia | Serving USA + Australia",
  tagline: "Stop losing revenue to missed calls and slow follow ups.",
  phone: "+61 451 413 786",
  phoneE164: "+61451413786",
  whatsappUrl: "https://wa.me/61451413786",
};

export const footerColumns = [
  {
    title: "Solutions",
    links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Industries",
    links: [
      { label: "Home Services & Contractors", href: "/industries#home-services---contractors" },
      { label: "Healthcare & Medical", href: "/industries#healthcare---medical" },
      { label: "Professional & Financial", href: "/industries#professional---financial-services" },
      { label: "Beauty, Fitness & Wellness", href: "/industries#beauty--fitness---wellness" },
      { label: "Events & Hospitality", href: "/industries#events---hospitality" },
      { label: "Automotive", href: "/industries#automotive" },
      { label: "Family, Pet & Specialty Care", href: "/industries#family--pet---specialty-care" },
      { label: "View All Industries", href: "/industries" },
    ],
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




export const developmentProjects = [
  {
    slug: 'fintrend',
    name: 'FinTrend',
    overview: 'AI powered stock price prediction platform.',
    problem: 'Retail investors and boutique trading firms lacked access to institutional grade predictive models that could synthesize real time financial news sentiment with historical price movements. Existing tools were either too complex to deploy or relied solely on historical numerical data without context.',
    solution: 'We built FinTrend, a full stack platform that brings advanced quantitative analysis to the web. It pairs 24 distinct deep learning models (LSTM, GRU, CNN, RNN) with natural language processing to deliver holistic stock forecasts, enabling users to benchmark how market news impacts predictive accuracy.',
    features: [
      'Real time dashboard for historical data visualization',
      'Side by side model comparison and performance benchmarking',
      'NLP sentiment analysis integration using the FNSPID dataset',
      'FastAPI backend serving 24 diverse neural network architectures'
    ],
    techStack: ['React', 'FastAPI', 'Deep Learning', 'Python', 'NLP']
  },
  {
    slug: 'hostel360',
    name: 'Hostel360',
    overview: 'A full stack campus accommodation booking platform.',
    problem: 'University students frequently struggle with finding fast, reliable, and transparent housing. Taking physical tours is time consuming for students and owners alike, leading to booking friction and a disjointed tenant landlord relationship.',
    solution: 'CampusNest (Hostel360) connects tenants, owners, and admins via a unified web interface. By integrating 360 degree virtual tours and secure digital payments, the platform removes physical barriers to booking, completely transforming the hostel discovery experience.',
    features: [
      'Immersive 360 degree virtual room tours using Panolens.js',
      'Secure automated booking with Stripe checkout',
      'JWT based role authentication for tenants, owners and admins',
      'Comprehensive admin dashboard for managing reviews and revenue',
      'Panoramic image processing via Python and Flask microservice'
    ],
    techStack: ['React', 'Redux', 'Tailwind', 'Node.js', 'MongoDB', 'Flask']
  },
  {
    slug: 'medisync',
    name: 'MediSync',
    overview: 'AI voice receptionist and booking platform for dental and medical clinics.',
    problem: 'Busy clinics were losing new patients because front desk staff could not answer every call, especially after hours and during peak times. Each missed call meant a missed booking, and patients simply moved on to the next provider.',
    solution: 'We built MediSync, an AI voice receptionist that answers every call in natural language, qualifies the caller, and books appointments directly into the practice calendar. It runs around the clock and sends instant confirmation messages to reduce no shows.',
    features: [
      'Natural language AI voice answering for every inbound call',
      'Direct booking into the clinic calendar with conflict checks',
      'Automated appointment reminders by SMS and email',
      'Intelligent routing for emergencies versus routine visits',
      'Live dashboard showing booked calls and recovered patients'
    ],
    techStack: ['Next.js', 'Vapi', 'Twilio', 'Node.js', 'GoHighLevel']
  },
  {
    slug: 'leadbridge',
    name: 'LeadBridge',
    overview: 'GoHighLevel automation that captures, scores, and routes leads automatically.',
    problem: 'A multi location service company was collecting leads from ads, forms, and calls into separate tools with no single view. Hot leads sat unattended for hours while the team worked from spreadsheets, and follow up was inconsistent.',
    solution: 'We designed LeadBridge, a GoHighLevel build that unifies every lead source into one pipeline, scores each lead by intent, and routes it to the right rep in seconds. Automated nurture sequences keep slower leads warm until they are ready to buy.',
    features: [
      'Unified pipeline pulling leads from ads, forms, chat, and calls',
      'Automatic lead scoring based on source and behavior',
      'Instant routing to the right team member by location',
      'Multi step nurture sequences for email and SMS',
      'Owner dashboard for pipeline value and conversion rates'
    ],
    techStack: ['GoHighLevel', 'n8n', 'Node.js', 'Meta CAPI', 'Webhooks']
  },
  {
    slug: 'fleetroute',
    name: 'FleetRoute',
    overview: 'Dispatch and quoting automation for field service and logistics teams.',
    problem: 'A field service operator handled quotes and job assignments by phone and paper, which slowed response times and left jobs poorly matched to the nearest available crew. Customers waited days for a quote that competitors delivered in minutes.',
    solution: 'We built FleetRoute, a web platform that calculates instant quotes, assigns jobs to the closest available crew, and tracks every job from request to completion. Automated updates keep customers informed at each step.',
    features: [
      'Instant automated quoting based on job type and distance',
      'Smart job assignment to the nearest available crew',
      'Live job tracking from request to completion',
      'Automated status updates by SMS to customers',
      'Reporting on response times and crew utilization'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Mapbox', 'Express']
  },
  {
    slug: 'shopflow',
    name: 'ShopFlow',
    overview: 'Ecommerce automation and server side tracking that recovers lost sales.',
    problem: 'An online retailer was losing conversions to abandoned carts and could not trust its ad reporting after browser tracking changes. Without accurate data, ad budget was spent on the wrong audiences.',
    solution: 'We built ShopFlow, which adds server side tracking with the Meta Conversions API and automated cart recovery flows. Shoppers who leave get a timely reminder, and the store finally sees accurate conversion data to guide ad spend.',
    features: [
      'Server side tracking with the Meta Conversions API',
      'Automated abandoned cart recovery by email and SMS',
      'Accurate conversion reporting after browser tracking loss',
      'Product feed sync for dynamic retargeting',
      'Revenue and return on ad spend dashboard'
    ],
    techStack: ['Next.js', 'Shopify', 'Meta CAPI', 'n8n', 'Node.js']
  },
  {
    slug: 'bookeasy',
    name: 'BookEasy',
    overview: 'Self service booking and reminder system for salons and wellness studios.',
    problem: 'A group of salons relied on phone bookings that tied up staff and left gaps in the schedule when clients forgot appointments. Last minute openings went unfilled because there was no quick way to reach waiting clients.',
    solution: 'We built BookEasy, a self service booking site with automated reminders and a waitlist that fills cancellations automatically. Clients book in seconds and staff spend their time on service rather than the phone.',
    features: [
      'Self service online booking available any time',
      'Automated reminders that reduce missed appointments',
      'Waitlist that fills cancellations automatically',
      'Repeat visit prompts to improve retention',
      'Simple dashboard for staff schedules and revenue'
    ],
    techStack: ['Next.js', 'Supabase', 'Stripe', 'Twilio', 'Tailwind']
  },
  {
    slug: 'insightboard',
    name: 'InsightBoard',
    overview: 'Unified analytics dashboard for ad spend, pipeline, and revenue.',
    problem: 'An agency owner tracked performance across seven different tools and never had a clear picture of what was working. Reporting took hours each week and decisions were made on guesswork rather than current numbers.',
    solution: 'We built InsightBoard, a single dashboard that pulls ad spend, pipeline, and revenue into one live view. Owners see what drives results in real time, and reporting that once took hours now updates automatically.',
    features: [
      'One live view of ad spend, pipeline, and revenue',
      'Automated data sync from ad platforms and the CRM',
      'Custom alerts when key numbers move',
      'Client ready reports generated automatically',
      'Trend views for booked jobs and cost per lead'
    ],
    techStack: ['Next.js', 'n8n', 'BigQuery', 'Node.js', 'Recharts']
  },
  {
    slug: 'voxassist',
    name: 'VoxAssist',
    overview: 'Multichannel AI chatbot for websites, WhatsApp, and SMS.',
    problem: 'A service business received questions across its website, WhatsApp, and SMS but could not respond quickly enough to convert them. Visitors left before anyone replied, and common questions consumed staff time.',
    solution: 'We built VoxAssist, an AI chatbot trained on the services, pricing, and policies of the business that answers across every channel instantly. It qualifies visitors, books appointments, and hands off to a human only when needed.',
    features: [
      'One AI assistant across website, WhatsApp, and SMS',
      'Trained on real services, pricing, and policies',
      'Qualifies visitors and books appointments instantly',
      'Smart handoff to a human for complex requests',
      'Conversation analytics to improve answers over time'
    ],
    techStack: ['Next.js', 'OpenAI', 'Twilio', 'WhatsApp Business API', 'Node.js']
  }
];
