export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Development", href: "/development" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
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
  | "ai-voice-receptionists"
  | "ai-voice-agents"
  | "missed-call-text-back"
  | "lead-generation"
  | "automated-lead-nurturing"
  | "ai-agents-chatbots"
  | "chatbots"
  | "n8n-workflow-automation"
  | "hubspot-automation"
  | "crm-integration"
  | "analytics-dashboards";

export type SolutionFaq = { question: string; answer: string };

export type SolutionStep = {
  name: string;
  text: string;
  detail: string;
};

export type SolutionComparisonRow = {
  feature: string;
  digitalx: string;
  traditional: string;
  manual: string;
};

export type TechnicalSpec = {
  label: string;
  value: string;
  description: string;
};

export type SolutionPricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export type Solution = {
  slug: SolutionSlug;
  name: string;
  metaTitle?: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  capabilities: string[];
  bestFor: string;
  legacyPaths: string[];
  group: "capture" | "nurture" | "operate";
  faqs?: SolutionFaq[];
  workflowSteps: SolutionStep[];
  comparison: SolutionComparisonRow[];
  technicalSpecs: TechnicalSpec[];
  pricingTiers: SolutionPricingTier[];
};

export const solutions: Solution[] = [
  {
    slug: "gohighlevel-implementation",
    name: "GoHighLevel Implementation",
    metaTitle: "GoHighLevel Expert & Setup Service",
    tagline: "Full GHL build out + snapshots + automations",
    summary:
      "We stand up GoHighLevel end-to-end: snapshots, workflows, calendars, and two-way SMS so every lead and job runs on one system instead of five tabs.",
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
    workflowSteps: [
      {
        name: "Stack Audit & Architecture Design",
        text: "We inventory current tech stack, forms, calendars, and pipelines to eliminate redundant subscriptions.",
        detail: "Identify data bottlenecks and cancel overlapping subscriptions (Calendly, ActiveCampaign, Zapier) to reduce software overhead.",
      },
      {
        name: "Sub-Account & Compliance Setup",
        text: "Configure 10DLC A2P brand registration, custom DNS records, SPF, DKIM, and DMARC.",
        detail: "Carrier-compliant messaging setup ensuring 99%+ deliverability across US and Australian telecom carriers.",
      },
      {
        name: "Master Snapshot & Automation Deployment",
        text: "Install battle-tested pipelines, calendars, two-way SMS, and speed-to-lead automations.",
        detail: "Pre-configured opportunity stages, automated win/loss logic, review sequences, and AI voice routing tailored to your vertical.",
      },
      {
        name: "Team Training & Custom SOP Handover",
        text: "Live screen-recorded staff training and documented standard operating procedures.",
        detail: "Role-specific video walkthroughs, mobile app setup for field technicians, and ongoing workflow refinement.",
      },
    ],
    comparison: [
      {
        feature: "Build Architecture",
        digitalx: "Production-grade custom schemas & workflows",
        traditional: "Unconfigured generic template snapshot",
        manual: "Fragile DIY setup after weeks of tutorials",
      },
      {
        feature: "Deliverability (SMS/Email)",
        digitalx: "Verified 10DLC A2P + DMARC configuration",
        traditional: "Default shared numbers (high carrier spam rate)",
        manual: "Blocked carrier traffic and spam filtering",
      },
      {
        feature: "Field Team Adoption",
        digitalx: "Role-specific training & mobile SOPs",
        traditional: "Zero documentation or team onboarding",
        manual: "High staff friction; abandoned in 60 days",
      },
      {
        feature: "Third-Party Integration",
        digitalx: "Native webhooks into n8n, QuickBooks, Xero & CAPI",
        traditional: "Isolated within GHL without accounting sync",
        manual: "Manual CSV exports and double-entry",
      },
    ],
    technicalSpecs: [
      {
        label: "Deployment Window",
        value: "14 - 21 Business Days",
        description: "Turnkey delivery including 10DLC verification, pipelines, and workflows",
      },
      {
        label: "Inboxing Protocols",
        value: "10DLC, DKIM, SPF, DMARC",
        description: "Carrier-compliant infrastructure for maximum SMS and email deliverability",
      },
      {
        label: "Integration Layer",
        value: "REST API & Webhooks",
        description: "Direct sync with accounting, Meta Conversions API (CAPI), and external ERPs",
      },
      {
        label: "Security Grade",
        value: "HIPAA & APPs Capable",
        description: "Encrypted sub-accounts adhering to US and Australian data protection baselines",
      },
    ],
    pricingTiers: [
      {
        name: "Core Buildout",
        price: "$2,400 one-time",
        cadence: "turnkey implementation",
        description: "Complete GoHighLevel setup for single-location operators",
        features: [
          "Sub-account architecture & custom domain DNS",
          "10DLC A2P brand registration",
          "Industry opportunity pipelines & calendar routing",
          "5 core automated SMS/email follow-up sequences",
          "Team handover session & mobile SOP library",
        ],
      },
      {
        name: "Enterprise Architecture",
        price: "$4,800 one-time",
        cadence: "multi-location rollout",
        description: "Advanced setup for multi-location or high-volume service businesses",
        highlight: true,
        features: [
          "Everything in Core Buildout",
          "Custom n8n API middleware & external webhook sync",
          "Meta Conversions API (CAPI) server-side tracking",
          "Historical database migration & deduplication",
          "30 days post-launch hypercare & SLA support",
        ],
      },
    ],
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
    slug: "ai-voice-receptionists",
    name: "AI Voice Receptionists",
    metaTitle: "AI Voice Receptionist for Business",
    tagline: "24/7 answering + qualification + booking",
    summary:
      "Human-sounding AI voice receptionists and real-time automation answer calls, qualify prospects, and book appointments 24/7 across the US & Australia.",
    outcomes: [
      "Zero missed calls and after hours revenue leaks",
      "Consistent qualification every time, not when staff are free",
      "Bookings dropped directly into your calendar and CRM",
    ],
    capabilities: [
      "Real-time voice automation with sub-500ms response latency",
      "Industry tuned voice prompts (plumbers, clinics, contractors)",
      "Live call forwarding with intelligent intent detection",
      "Multi-language support (English, Spanish, Arabic)",
      "Calendar + CRM integration (GoHighLevel, Google Calendar, HubSpot)",
      "Instant call transcripts, audio recordings, and sentiment reports",
    ],
    bestFor:
      "Owner operators who answer phones themselves, lose calls during jobs, or burn hours on unqualified tire kickers.",
    legacyPaths: ["/services/ai-voice-receptionists"],
    group: "capture",
    workflowSteps: [
      {
        name: "Sub-500ms Inbound Answering",
        text: "Telephony stream connects instantly without robotic delay or unnatural pauses.",
        detail: "Ultra-low latency streaming neural voice greets the caller in a natural, region-matched accent (US or Australian English).",
      },
      {
        name: "Natural Intent & Emergency Triage",
        text: "Identifies emergency repair calls vs routine estimate inquiries and extracts full caller details.",
        detail: "Handles interruptions naturally and asks intelligent follow-up questions regarding location, urgency, and service requirements.",
      },
      {
        name: "Live Calendar Booking & Verification",
        text: "Queries live availability in GoHighLevel or Google Calendar and locks the appointment.",
        detail: "Direct calendar verification prevents double-bookings and immediately syncs customer details to the CRM pipeline.",
      },
      {
        name: "Automated Dispatch & Audio Delivery",
        text: "Sends an immediate SMS confirmation to the caller and alerts on-duty staff with recording and transcript.",
        detail: "Full call audio recording, sentiment analysis, and transcribed action items are delivered via SMS, email, or Slack within 15 seconds.",
      },
    ],
    comparison: [
      {
        feature: "Availability",
        digitalx: "24/7/365 instant pick-up",
        traditional: "Business hours or slow call centers",
        manual: "Voicemail / missed while on jobs",
      },
      {
        feature: "Speed to Answer",
        digitalx: "< 500ms streaming neural voice",
        traditional: "30-90 second hold times",
        manual: "Hours before callback",
      },
      {
        feature: "Live Calendar Booking",
        digitalx: "Bi-directional real-time calendar sync",
        traditional: "Takes handwritten message; requires callback",
        manual: "Frustrating phone tag",
      },
      {
        feature: "Operating Cost",
        digitalx: "Flat retainers ($1,200 - $2,800/mo)",
        traditional: "$3,500 - $6,000/mo per full-time rep",
        manual: "Thousands lost to competing bidders",
      },
    ],
    technicalSpecs: [
      {
        label: "Voice Engine Latency",
        value: "< 500ms Time-to-Speech",
        description: "Real-time streaming neural speech engine with interruption & barge-in support",
      },
      {
        label: "Telephony Compatibility",
        value: "Twilio / SIP / Carrier Forwarding",
        description: "Works with Telstra, Optus, AT&T, Verizon, T-Mobile, RingCentral, and VoIP lines",
      },
      {
        label: "Calendar & CRM Sync",
        value: "Live Bi-Directional Webhooks",
        description: "Direct integration into GoHighLevel, Google Calendar, HubSpot, and ServiceTitan",
      },
      {
        label: "Uptime SLA",
        value: "99.9% Telephony Redundancy",
        description: "Geo-distributed carrier gateways across US East/West and Australia East",
      },
    ],
    pricingTiers: [
      {
        name: "Operator Launch",
        price: "$1,200/mo",
        cadence: "billed monthly (AUD/USD)",
        description: "For solo trades and single-van service businesses",
        features: [
          "Up to 300 minutes voice intake included",
          "Tuned industry conversation prompt",
          "Live calendar booking & CRM sync",
          "Instant SMS notifications with audio & transcript",
          "US or Australian native neural voice model",
        ],
      },
      {
        name: "Multi-Van Scale",
        price: "$2,800/mo",
        cadence: "billed monthly (AUD/USD)",
        description: "For busy clinics, multi-truck contractors, and high-volume operations",
        highlight: true,
        features: [
          "Up to 1,000 minutes voice intake included",
          "Multi-technician emergency routing & escalation",
          "After-hours on-call dispatch automation",
          "Bi-directional CRM & webhook integration",
          "Dedicated solutions engineer & quarterly tuning",
        ],
      },
    ],
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
    metaTitle: "Missed-Call Text-Back & Recovery",
    tagline: "Under a minute to every missed caller",
    summary:
      "Instant missed-call text-back and automated lead recovery for service businesses. Engage callers in under 30 seconds before they dial a competitor.",
    outcomes: [
      "Recover 30 to 50% of otherwise lost callers",
      "Start the conversation before the next business opens",
      "Zero ops overhead, runs silently in the background",
    ],
    capabilities: [
      "Instant real-time SMS trigger on every missed or unanswered call",
      "Two-way SMS with conversational AI recovery assistance",
      "Escalation rules (team handoff, booking links, emergency triage)",
      "Time-zone aware business hours logic & holiday routing",
      "Live reporting on lead recovery rate & attributed job revenue",
    ],
    bestFor:
      "Any business where a missed call equals a lost customer, home services, clinics, salons, law firms.",
    legacyPaths: [],
    group: "capture",
    workflowSteps: [
      {
        name: "Carrier Signal Interception",
        text: "The system detects an unanswered, abandoned, or busy incoming call within 15 seconds.",
        detail: "Catches lost callers before they leave your Google Business Profile to dial a competing contractor.",
      },
      {
        name: "Contextual Conversational SMS",
        text: "Dispatches an instant, personalized SMS addressing the caller and offering immediate help.",
        detail: "Custom variations like: 'Hi, sorry we missed you on tools! How can our team help you right now?'",
      },
      {
        name: "Automated Conversational Triage",
        text: "AI conversational engine asks qualifying questions or provides a self-booking appointment link.",
        detail: "Captures urgency, job location, and photos via two-way MMS without requiring human intervention.",
      },
      {
        name: "CRM Pipeline Sync & Tech Alert",
        text: "Inserts the contact into GoHighLevel, tags as 'Recovered Lead', and alerts the on-duty tech.",
        detail: "Full message transcript and contact data are instantly visible in your mobile app and CRM pipeline.",
      },
    ],
    comparison: [
      {
        feature: "Response Speed",
        digitalx: "< 30 seconds automatic outreach",
        traditional: "15-45 minutes manual text",
        manual: "Hours later or ignored",
      },
      {
        feature: "Carrier Reputation",
        digitalx: "10DLC registered & carrier approved",
        traditional: "Shared unregistered VoIP numbers",
        manual: "Personal carrier spam filters",
      },
      {
        feature: "Lead Recovery Rate",
        digitalx: "30% - 50% caller engagement",
        traditional: "10% - 15% callback rate",
        manual: "< 5% voicemail callback rate",
      },
      {
        feature: "Workflow Automation",
        digitalx: "Auto-books appointment & updates CRM",
        traditional: "Leaves conversation hanging",
        manual: "Requires constant manual typing",
      },
    ],
    technicalSpecs: [
      {
        label: "Trigger Response Time",
        value: "< 30 Seconds",
        description: "Dispatches SMS immediately when telephony carrier signals an unanswered call",
      },
      {
        label: "Compliance Registration",
        value: "10DLC / A2P Registered",
        description: "Approved brand & campaign registration ensuring 99%+ carrier delivery rate",
      },
      {
        label: "Regulatory Safeguards",
        value: "TCPA & Spam Act 2003",
        description: "Automated opt-out enforcement (STOP, CANCEL) and clear business identification",
      },
      {
        label: "CRM Sync",
        value: "Native GoHighLevel / Webhooks",
        description: "Two-way conversational history logged in real time to contact timeline",
      },
    ],
    pricingTiers: [
      {
        name: "Essential Recovery",
        price: "$450/mo",
        cadence: "billed monthly",
        description: "Essential missed-call protection for solo contractors and local shops",
        features: [
          "Instant missed-call text-back (<30s)",
          "10DLC brand registration assistance",
          "Customized business greeting templates",
          "Mobile app for team two-way messaging",
          "Monthly lead recovery reporting",
        ],
      },
      {
        name: "Conversational Growth",
        price: "$950/mo",
        cadence: "billed monthly",
        description: "Two-way AI text triage and automated calendar scheduling",
        highlight: true,
        features: [
          "Everything in Essential Recovery",
          "Conversational AI SMS qualifying bot",
          "Direct self-booking calendar integration",
          "Multi-user staff push notifications",
          "CRM pipeline automation & stage progression",
        ],
      },
    ],
    faqs: [
      {
        question: "How does missed-call text-back integrate with my existing business phone?",
        answer:
          "We configure simple conditional call forwarding or carrier webhooks from your existing mobile, landline, or VoIP provider (Telstra, Optus, AT&T, Verizon, RingCentral). When a call is unanswered or busy, the carrier signals our system and triggers an instant SMS within 30 seconds.",
      },
      {
        question: "Does this comply with US TCPA and Australian Spam Act 2003 laws?",
        answer:
          "Yes, strictly. We configure 10DLC A2P brand and campaign registration for US clients, include mandatory business identification and opt-out keywords (STOP, UNSUBSCRIBE), and adhere to Australian Spam Act 2003 transactional communication exemptions.",
      },
      {
        question: "Can the customer text back and have a natural conversation?",
        answer:
          "Yes. Customers can reply directly to the SMS. You can configure the system to use conversational AI to triage their inquiry and provide a booking link, or manage replies directly from our unified mobile app.",
      },
      {
        question: "What percentage of missed callers actually engage with the text?",
        answer:
          "Across our home services and clinic clients in the US and Australia, between 30% and 50% of missed callers reply to the automated text within 5 minutes, allowing you to secure the job before they dial a competitor.",
      },
    ],
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
    workflowSteps: [
      {
        name: "Multi-Source Lead Ingestion",
        text: "Ingest leads from Google Ads, Meta Ads, website forms, and incoming calls into one normalized pipeline.",
        detail: "Eliminates duplicate records and tags each lead with service intent, campaign origin, and timestamp.",
      },
      {
        name: "Speed-to-Lead Initial Touch",
        text: "Dispatches personalized SMS and email confirmation within 60 seconds of inquiry.",
        detail: "Acknowledges the inquiry immediately, shares social proof or customer reviews, and offers instant scheduling.",
      },
      {
        name: "Behavior-Adaptive Multi-Channel Follow-up",
        text: "Chains strategic SMS, email, and WhatsApp touchpoints adapted to how the prospect engages.",
        detail: "If an email is opened but no booking is made, a gentle SMS follow-up triggers 24 hours later.",
      },
      {
        name: "Automated Pause & Sales Handoff",
        text: "The sequence instantly disengages upon customer reply or booking, alerting your team.",
        detail: "Prevents awkward duplicate outreach and pushes the qualified opportunity into your sales rep's priority queue.",
      },
    ],
    comparison: [
      {
        feature: "Cadence Intelligence",
        digitalx: "Behavior-triggered branching & pausing",
        traditional: "Rigid one-size-fits-all drip emails",
        manual: "Sporadic manual follow-up emails",
      },
      {
        feature: "Channels Used",
        digitalx: "SMS + Email + WhatsApp in harmony",
        traditional: "Email only (low open rates)",
        manual: "Single phone call attempt",
      },
      {
        feature: "Response Tracking",
        digitalx: "Pauses immediately upon customer reply",
        traditional: "Keeps sending emails after reply",
        manual: "Messy inboxes and missed replies",
      },
      {
        feature: "Lead Re-engagement",
        digitalx: "Recovers 20-35% of stalled estimates",
        traditional: "< 5% cold list reactivation",
        manual: "Lost leads forgotten in spreadsheets",
      },
    ],
    technicalSpecs: [
      {
        label: "Channel Support",
        value: "SMS, Email & WhatsApp API",
        description: "Synchronized multi-channel outreach preventing customer fatigue",
      },
      {
        label: "Deliverability Optimization",
        value: "Dedicated IP & Warmup",
        description: "Automated sending cadence, domain reputation monitoring, and spam-score audits",
      },
      {
        label: "Logic Engine",
        value: "Conditional Branching",
        description: "Workflows adapt based on email opens, link clicks, SMS replies, and form submissions",
      },
      {
        label: "Attribution Sync",
        value: "UTM & Campaign Tracking",
        description: "Passes original ad source and conversion timestamps to your CRM analytics",
      },
    ],
    pricingTiers: [
      {
        name: "Nurture Launch",
        price: "$950/mo",
        cadence: "billed monthly",
        description: "Turnkey follow-up automation for active quote pipelines",
        features: [
          "Up to 3 multi-channel nurture workflows",
          "Speed-to-lead instant SMS & email",
          "Stalled quote re-engagement sequence",
          "Review & referral generation sequence",
          "Monthly conversion rate optimization",
        ],
      },
      {
        name: "Full Lifecycle Engine",
        price: "$1,800/mo",
        cadence: "billed monthly",
        description: "End-to-end customer lifecycle, reactivation, and VIP retention",
        highlight: true,
        features: [
          "Unlimited custom nurture workflows",
          "Database reactivation sprints (past customers)",
          "Dynamic segmentation based on customer lifetime value",
          "Advanced A/B testing on subject lines and copy",
          "Bi-directional webhook sync with external CRMs",
        ],
      },
    ],
    faqs: [
      {
        question: "How quickly does the lead nurture sequence trigger after an inquiry?",
        answer:
          "The initial touchpoint (SMS or email confirmation) triggers in under 60 seconds. Research shows responding within 5 minutes increases conversion rates by up to 391% compared to waiting an hour.",
      },
      {
        question: "Will the automated messages stop sending if the customer replies?",
        answer:
          "Yes, automatically. The moment a contact replies to an SMS, clicks to book an appointment, or calls your office, the nurture workflow immediately disengages and notifies your sales team to prevent awkward duplicate messages.",
      },
      {
        question: "Can you help reactivate our old list of previous inquiries?",
        answer:
          "Yes. We design and execute dedicated 'Database Reactivation' campaigns using non-spammy, high-converting SMS and email offers that routinely generate dozens of booked jobs from dormant customer databases.",
      },
      {
        question: "What platforms do you build the nurture sequences on?",
        answer:
          "We primarily build and manage sequences inside GoHighLevel, but can also integrate or synchronize with HubSpot, ActiveCampaign, Klaviyo, or custom webhooks via n8n.",
      },
    ],
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
    workflowSteps: [
      {
        name: "Knowledge Base & Guardrail Ingestion",
        text: "The conversational AI is grounded on your services, pricing parameters, service areas, and company FAQs.",
        detail: "Strict retrieval guardrails prevent hallucinations, unauthorized price promises, or off-topic responses.",
      },
      {
        name: "Omnichannel Deployment",
        text: "Embedded on your website, WhatsApp Business API, and SMS with matching brand styling.",
        detail: "Responsive, lightweight widget that does not degrade mobile Core Web Vitals or page load speeds.",
      },
      {
        name: "Conversational Qualification & Intake",
        text: "Engages visitors 24/7, answers technical questions, filters price shoppers, and extracts job details.",
        detail: "Collects customer name, verified phone number, job address, and preferred booking date naturally.",
      },
      {
        name: "Direct Calendar Booking & Team Handoff",
        text: "Presents live booking availability or transfers high-intent chats to staff with full context.",
        detail: "Locks the appointment directly into your calendar or sends an instant push notification for staff takeover.",
      },
    ],
    comparison: [
      {
        feature: "Conversational Depth",
        digitalx: "Context-aware LLM with guardrails",
        traditional: "Rigid button-based decision trees",
        manual: "Live chat unattended after 5pm",
      },
      {
        feature: "Channel Integration",
        digitalx: "Website + WhatsApp + SMS",
        traditional: "Website widget only",
        manual: "Scattered across different inboxes",
      },
      {
        feature: "Calendar Integration",
        digitalx: "Embeds live real-time booking slots",
        traditional: "Collects email and promises reply",
        manual: "Back-and-forth scheduling emails",
      },
      {
        feature: "Knowledge Guardrails",
        digitalx: "Strict company policy grounding",
        traditional: "Generic canned answers",
        manual: "Inconsistent staff answers",
      },
    ],
    technicalSpecs: [
      {
        label: "Inference Latency",
        value: "< 800ms Token Streaming",
        description: "Instant conversational responses using optimized cloud LLM inference",
      },
      {
        label: "Guardrail Architecture",
        value: "Retrieval-Augmented (RAG)",
        description: "Answers strictly restricted to verified business data with hallucination prevention",
      },
      {
        label: "Omnichannel Endpoints",
        value: "Web, WhatsApp & SMS",
        description: "Single unified knowledge base driving all customer chat endpoints",
      },
      {
        label: "Security Compliance",
        value: "No Training on PII",
        description: "Caller and customer personal data is never used to train public models",
      },
    ],
    pricingTiers: [
      {
        name: "Web Conversion Bot",
        price: "$650/mo",
        cadence: "billed monthly",
        description: "24/7 website chat qualification and appointment booking",
        features: [
          "Custom website chat widget styled to your brand",
          "Trained on company FAQs, pricing & service areas",
          "Direct calendar booking integration",
          "Real-time lead alerts via email & SMS",
          "Monthly chat transcript review and prompt tuning",
        ],
      },
      {
        name: "Omnichannel Suite",
        price: "$1,450/mo",
        cadence: "billed monthly",
        description: "Comprehensive web, WhatsApp Business, and SMS conversational AI",
        highlight: true,
        features: [
          "Everything in Web Conversion Bot",
          "Official WhatsApp Business API integration",
          "SMS conversational AI answering",
          "Live human takeover with mobile push notifications",
          "CRM contact record auto-creation and tagging",
        ],
      },
    ],
    faqs: [
      {
        question: "Will the chatbot make up prices or hallucinate false information?",
        answer:
          "No. We utilize strict Retrieval-Augmented Generation (RAG) architecture and boundary guardrails. If a visitor asks a question outside of the bot's verified knowledge base, it politely declines to guess and routes the question to your human team.",
      },
      {
        question: "Can the chatbot book appointments directly into our calendar?",
        answer:
          "Yes. The bot connects directly with GoHighLevel, Google Calendar, Calendly, or your proprietary CRM to present live availability and secure the booking right inside the chat window.",
      },
      {
        question: "How does the bot hand off a conversation to a human team member?",
        answer:
          "When a customer requests human support or meets high-value lead criteria, the bot flags the conversation, sends an urgent push notification to your team, and allows any staff member to jump into the chat seamlessly.",
      },
      {
        question: "Does the WhatsApp bot require an official WhatsApp Business API account?",
        answer:
          "Yes, we handle the complete Meta Business Verification and WhatsApp Business Cloud API setup, ensuring your business has an official, verified business profile.",
      },
    ],
  },
  {
    slug: "n8n-workflow-automation",
    name: "n8n Workflow Automation",
    metaTitle: "n8n Automation Agency & Workflows",
    tagline: "Custom automations that replace your manual ops",
    summary:
      "Custom n8n workflows connecting your CRM, ads, forms, calendars, and AI into automated pipelines. Deploy self-hosted or cloud with 90%+ savings vs Zapier.",
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
    workflowSteps: [
      {
        name: "Process Audit & Schema Blueprint",
        text: "We document every manual copy-paste task, software silo, and data flow between your operational tools.",
        detail: "Map inputs, endpoints, error conditions, and rate limits across your CRM, accounting, and marketing stack.",
      },
      {
        name: "Hardened Infrastructure Deployment",
        text: "Spin up a dedicated n8n instance (self-hosted Docker container or secure cloud) with SSL, backups, and encryption.",
        detail: "Configured with SSL, automated database backups, AES-256 credential encryption, and execution pruning.",
      },
      {
        name: "Resilient Node Pipeline Engineering",
        text: "Build custom automation workflows with conditional branching, data transformations, and custom JavaScript/Python nodes.",
        detail: "Transform data payloads with JavaScript/Python code nodes and handle pagination and edge cases.",
      },
      {
        name: "Error Handling & Observability",
        text: "Configure automated dead-letter queues, execution logging, and real-time alerts to Slack, Discord, or email on failure.",
        detail: "Every execution is logged; failed executions automatically retry with exponential backoff and alert engineers.",
      },
    ],
    comparison: [
      {
        feature: "Task Cost Structure",
        digitalx: "Zero per-task charges (flat host/retainer)",
        traditional: "Expensive per-task fees ($300-$1,500/mo)",
        manual: "Hundreds of manual hours lost each month",
      },
      {
        feature: "Data Sovereignty",
        digitalx: "100% on your own secure server",
        traditional: "Third-party US cloud servers",
        manual: "Scattered in spreadsheets and browser tabs",
      },
      {
        feature: "Complex Logic & Coding",
        digitalx: "Full JS/Python loops, sub-workflows & webhooks",
        traditional: "Severely restricted step limits",
        manual: "High human calculation error rate",
      },
      {
        feature: "Error Recovery",
        digitalx: "Automatic retries & Slack alert triggers",
        traditional: "Silent task pauses requiring manual re-run",
        manual: "Data errors go unnoticed for weeks",
      },
    ],
    technicalSpecs: [
      {
        label: "Deployment Options",
        value: "Self-Hosted or Cloud",
        description: "Deploy on your private AWS, DigitalOcean, Hetzner, or managed n8n Cloud instance",
      },
      {
        label: "Cost Optimization",
        value: "90%+ Savings vs Zapier",
        description: "Run millions of workflow executions with zero incremental per-task bills",
      },
      {
        label: "Security Architecture",
        value: "AES-256 Encryption",
        description: "Credentials stored with database-level encryption behind private VPC firewalls",
      },
      {
        label: "Execution Observability",
        value: "Live Webhook Logging",
        description: "Full audit trails for every API payload, response status, and transformation",
      },
    ],
    pricingTiers: [
      {
        name: "Workflow Sprint",
        price: "$1,800 one-time",
        cadence: "turnkey buildout",
        description: "Dedicated deployment of n8n server and 3 custom operational workflows",
        features: [
          "Production n8n Docker deployment with SSL & backups",
          "3 custom API workflows (CRM, billing, marketing)",
          "Automated error notification triggers to Slack/Email",
          "Encrypted credential vault setup",
          "Full technical architecture documentation & handover",
        ],
      },
      {
        name: "Managed Automation Retainer",
        price: "$1,200/mo",
        cadence: "billed monthly",
        description: "Continuous automation engineering, monitoring, and workflow expansion",
        highlight: true,
        features: [
          "Up to 10 active managed production workflows",
          "24/7 server monitoring and automated error recovery",
          "Zapier/Make task migration into n8n",
          "Priority SLA support via dedicated Slack channel",
          "Monthly pipeline optimization & new API integrations",
        ],
      },
    ],
    faqs: [
      {
        question: "Why should we migrate from Zapier to n8n?",
        answer:
          "Zapier charges aggressive per-task fees that punish growing businesses, often reaching $500 to $2,000+ per month. n8n is open-source and self-hostable, allowing you to run unlimited executions for a fraction of the hosting cost, with far more powerful data transformation capabilities.",
      },
      {
        question: "Can n8n run inside our own private cloud or data center?",
        answer:
          "Yes. We frequently deploy n8n inside our clients' own AWS, Google Cloud, DigitalOcean, or on-premises Docker environments. Your sensitive customer and financial data never passes through third-party servers.",
      },
      {
        question: "What happens if an external API or service experiences downtime?",
        answer:
          "Our n8n pipelines are engineered with error triggers, automatic exponential retry mechanisms, and dead-letter queues. If an external service is temporarily unreachable, the payload is held and re-attempted, while sending an immediate alert to our team.",
      },
      {
        question: "Can n8n connect to custom or legacy software without native integrations?",
        answer:
          "Yes. n8n features versatile HTTP Request nodes, raw webhook listeners, and custom JavaScript/Python execution nodes, enabling connection to any software with a REST API, GraphQL endpoint, or SQL database.",
      },
    ],
  },
  {
    slug: "crm-integration",
    name: "CRM Integration",
    metaTitle: "CRM Automation Agency & Setup",
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
    workflowSteps: [
      {
        name: "Database Normalization & Cleansing",
        text: "Clean, deduplicate, and standardize existing customer records across previous CRMs, spreadsheets, and accounting tools.",
        detail: "Eliminates duplicate contacts, standardizes phone numbers into E.164 international format, and maps legacy tags.",
      },
      {
        name: "Custom Pipeline & Schema Architecture",
        text: "Configure custom deal stages, custom contact fields, tags, and automated win/loss tracking matching your exact sales cycle.",
        detail: "Maps deal stages to real-world operations (Quote Requested, Estimate Sent, Job In-Progress, Invoiced, Closed-Won).",
      },
      {
        name: "Full-Stack API & Webhook Wiring",
        text: "Connect website forms, ad platforms (Meta CAPI & Google Ads), call tracking, and field software into one central hub.",
        detail: "Bi-directional synchronization between GoHighLevel, field software (ServiceTitan, Jobber), and accounting (QuickBooks, Xero).",
      },
      {
        name: "Role-Based Team Handover & Dashboards",
        text: "Configure permissions for dispatchers, technicians, and managers, accompanied by live training and process SOPs.",
        detail: "Includes screen-recorded training videos, mobile app setup for field teams, and custom manager dashboards.",
      },
    ],
    comparison: [
      {
        feature: "Data Cohesion",
        digitalx: "Single unified source of truth",
        traditional: "Fragmented across 4 different platforms",
        manual: "Spreadsheets updated haphazardly",
      },
      {
        feature: "Marketing Attribution",
        digitalx: "Closed-loop revenue attribution",
        traditional: "Click tracking without revenue data",
        manual: "No idea which marketing channel works",
      },
      {
        feature: "Automation Triggering",
        digitalx: "Instant stage-change automations",
        traditional: "Manual status updates by staff",
        manual: "Leads go neglected for weeks",
      },
      {
        feature: "Accounting Sync",
        digitalx: "Bi-directional Xero / QuickBooks sync",
        traditional: "Manual invoice creation",
        manual: "Double data entry and billing errors",
      },
    ],
    technicalSpecs: [
      {
        label: "Supported CRMs",
        value: "GoHighLevel, HubSpot, Salesforce",
        description: "Specialized in GoHighLevel architecture with enterprise API sync to legacy CRMs",
      },
      {
        label: "Attribution Precision",
        value: "Server-Side CAPI + UTMs",
        description: "Closed-loop offline conversion tracking sent back to Meta and Google Ads",
      },
      {
        label: "Field Integration",
        value: "ServiceTitan, Jobber & Clio",
        description: "Bridges modern marketing engines with industry-specific ERP and field software",
      },
      {
        label: "Data Security",
        value: "SOC2 & APPs Aligned",
        description: "Strict role-based access control, field encryption, and automated audit logging",
      },
    ],
    pricingTiers: [
      {
        name: "Core CRM Integration",
        price: "$2,200 one-time",
        cadence: "turnkey integration",
        description: "Connect your marketing channels, website, and phone into one unified CRM",
        features: [
          "GoHighLevel or HubSpot pipeline setup",
          "Lead capture forms & call tracking synchronization",
          "Meta Ads & Google Ads conversion tracking",
          "Clean contact import & tag architecture",
          "Staff training workshop & workflow documentation",
        ],
      },
      {
        name: "Full Enterprise Stack",
        price: "$4,500 one-time",
        cadence: "enterprise buildout",
        description: "Multi-system synchronization connecting CRM, ERP, accounting, and field software",
        highlight: true,
        features: [
          "Everything in Core CRM Integration",
          "Bi-directional accounting sync (QuickBooks/Xero)",
          "Field service software bridge (ServiceTitan, Jobber)",
          "Custom n8n middleware for complex data schemas",
          "30 days post-launch hypercare & schema optimization",
        ],
      },
    ],
    faqs: [
      {
        question: "Which CRM platforms does DigitalX Solutions implement?",
        answer:
          "We specialize deeply in GoHighLevel for service businesses and agencies due to its all-in-one capabilities. We also build custom bidirectional integrations with HubSpot, Salesforce, Pipedrive, and industry platforms like ServiceTitan and Jobber.",
      },
      {
        question: "Can you migrate our existing customer data without losing history?",
        answer:
          "Yes. We perform structured data migration sprints where we export, clean, map, and import your existing contact history, tags, notes, and deals so your team hits the ground running with zero data loss.",
      },
      {
        question: "How do you track which ad campaign produced a paying customer?",
        answer:
          "We implement closed-loop server-side tracking using the Meta Conversions API (CAPI) and Google Ads offline conversion imports. When a deal reaches 'Won' in your CRM, the actual revenue is sent back to the ad network to train the bidding algorithm on real profit.",
      },
      {
        question: "How long does a typical CRM integration project take?",
        answer:
          "A standard CRM implementation typically takes between 2 to 3 weeks, including data migration, automation testing, and live staff training.",
      },
    ],
  },
  {
    slug: "hubspot-automation",
    name: "HubSpot Automation",
    metaTitle: "HubSpot Automation Partner & Workflows",
    tagline: "Custom pipelines, webhooks, and AI sync for HubSpot",
    summary:
      "Certified HubSpot automation partner. We engineer automated lead routing, custom n8n webhooks, AI agent syncing, and sales pipelines for high-growth firms.",
    outcomes: [
      "Eliminate manual CRM hygiene with automated deal creation and stage changes",
      "Bridge HubSpot to AI voice receptionists and external tools via resilient webhooks",
      "Accurate closed-loop attribution connecting ad spend directly to HubSpot revenue",
    ],
    capabilities: [
      "Custom HubSpot workflow engineering across Marketing, Sales, and Service Hubs",
      "Custom webhook middleware connecting external APIs to HubSpot Contact & Deal objects",
      "Bi-directional n8n workflow integration for complex multi-platform data sync",
      "Telephony and AI voice receptionist integration with automated call recording logs",
      "Lead scoring, round-robin rep assignment, and automated SLA breach notifications",
      "Certified partner consulting to audit existing workflow bloat and trigger loops",
    ],
    bestFor:
      "Mid-market service companies and B2B operators on HubSpot who need advanced automated routing without paying $10k/month agency retainers.",
    legacyPaths: ["/services/revenue-operations", "/solutions/crm-integration"],
    group: "operate",
    workflowSteps: [
      {
        name: "HubSpot Portal Audit & Property Normalization",
        text: "Clean, deduplicate, and standardize existing contact and company schemas, eliminating ghost properties and trigger conflicts.",
        detail: "Audit existing automated workflows to prevent infinite enrollment loops and ensure standard E.164 phone number formatting.",
      },
      {
        name: "Custom Pipeline & Automation Workflow Engineering",
        text: "Build deal stages, custom properties, and automated stage-gate movements tailored to your sales and fulfillment lifecycle.",
        detail: "Deploy lead scoring models that calculate engagement threshold scores before routing leads to sales representatives.",
      },
      {
        name: "API, Webhook & Middleware Synchronization",
        text: "Connect website forms, ad platforms (Meta CAPI & Google Ads), call tracking, and field software into one central hub.",
        detail: "Deploy self-hosted n8n workflows that listen for HubSpot webhooks, perform transformations, and update external databases.",
      },
      {
        name: "Sales Team SOPs & Handover Validation",
        text: "Configure permissions for reps and managers, accompanied by live screen-recorded training and process documentation.",
        detail: "Includes role-specific walkthroughs, notification routing into Slack or Microsoft Teams, and manager performance dashboards.",
      },
    ],
    comparison: [
      {
        feature: "Data Synchronization",
        digitalx: "Sub-second webhook & n8n bi-directional sync",
        traditional: "Batch sync or standard Zapier connectors",
        manual: "Manual CSV exports and fragmented spreadsheets",
      },
      {
        feature: "Automation Depth",
        digitalx: "Multi-branch conditional logic with custom webhook payloads",
        traditional: "Basic email autoresponders",
        manual: "Manual reminder tasks that get ignored",
      },
      {
        feature: "Voice & Call Integration",
        digitalx: "Direct AI voice receptionist sync with call recordings",
        traditional: "Disconnected phone dialer with no CRM transcript",
        manual: "Personal mobile calls with zero tracking",
      },
      {
        feature: "Commercial Model",
        digitalx: "Fixed sprint or clear retainer with zero task bloat",
        traditional: "$10,000+/mo retainers from legacy agencies",
        manual: "Dozens of internal hours wasted every week",
      },
    ],
    technicalSpecs: [
      {
        label: "API Protocol",
        value: "HubSpot REST API v3",
        description: "Direct REST API endpoints with OAuth2 token rotation and webhook subscription endpoints",
      },
      {
        label: "Middleware Architecture",
        value: "Self-Hosted n8n / Serverless",
        description: "Zero per-task licensing penalties on massive webhook ingestion volumes",
      },
      {
        label: "Sync Propagation",
        value: "< 1,500ms Webhook Execution",
        description: "Instant deal creation and contact enrichment as soon as forms or calls trigger",
      },
      {
        label: "Partner Status",
        value: "Certified Solutions Partner",
        description: "Vetted HubSpot implementation specialists adhering to HubSpot architectural best practices",
      },
    ],
    pricingTiers: [
      {
        name: "HubSpot Automation Sprint",
        price: "$2,800",
        cadence: "One-time build (or $3,900 AUD)",
        description: "Targeted workflow engineering, pipeline restructuring, and webhook integration for existing HubSpot portals.",
        features: [
          "Portal audit and workflow conflict resolution",
          "Custom pipeline setup with stage-gate automations",
          "Up to 3 custom webhook integrations (n8n / external APIs)",
          "Lead scoring and round-robin rep routing",
          "Team video SOPs and admin handover call",
          "14 days post-launch warranty and bug fixes",
        ],
      },
      {
        name: "Full-Stack HubSpot + AI Growth Engine",
        price: "$5,400",
        cadence: "One-time build (or $7,500 AUD)",
        highlight: true,
        description: "Complete architecture connecting HubSpot to 24/7 AI voice receptionists, Meta CAPI, and field dispatch software.",
        features: [
          "Everything in Automation Sprint included",
          "AI voice receptionist integration with automated transcript logging",
          "Missed-call text-back sequence connected to HubSpot CRM",
          "Meta Conversions API (CAPI) closed-loop revenue feedback",
          "Custom manager dashboard in Looker Studio or HubSpot",
          "30 days dedicated engineering support & optimization",
        ],
      },
    ],
    faqs: [
      {
        question: "Why should we hire an automation agency if HubSpot already has a built-in workflow builder?",
        answer:
          "HubSpot's native workflow builder is powerful, but it cannot natively perform complex external data transformations, stream audio recordings from voice agents, or bridge to custom legacy software without expensive enterprise add-ons. We build resilient middleware using n8n and serverless functions so HubSpot seamlessly orchestrates your entire tech stack.",
      },
      {
        question: "Can you connect our proprietary database or field software to HubSpot?",
        answer:
          "Yes. We engineer bi-directional webhooks and custom REST API integrations connecting HubSpot to SQL databases, ServiceTitan, Jobber, Cliniko, or custom internal systems, with full deduplication and error-retry queues.",
      },
      {
        question: "How do you prevent duplicate contacts and deal loops in complex workflows?",
        answer:
          "We implement strict unenrollment criteria, unique identifier property checks, and idempotency headers across all webhook triggers to guarantee that workflows execute exactly once per event.",
      },
      {
        question: "Do you work with HubSpot Starter, Professional, or Enterprise tiers?",
        answer:
          "We primarily work with companies on HubSpot Professional or Enterprise where automated workflows and custom properties are unlocked. For teams on Starter, we often deploy external n8n workflows that interact with the HubSpot REST API to provide advanced automation without forcing an immediate software tier upgrade.",
      },
    ],
  },
  {
    slug: "analytics-dashboards",
    name: "Analytics & Reporting Dashboards",
    tagline: "Live pipeline + ROI dashboards for owners",
    summary:
      "Track bookings, revenue, ad spend, and pipeline conversion in one unified dashboard instead of logging into separate ad, CRM, and call tools.",
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
    workflowSteps: [
      {
        name: "Data Source Identification & Extraction",
        text: "Connect ad accounts (Meta, Google), CRM (GoHighLevel, HubSpot), telephony, and accounting (Xero, QuickBooks).",
        detail: "Extracts daily impression, spend, click, lead, deal, and payment data through official secure APIs.",
      },
      {
        name: "Data Modeling & Transformation",
        text: "Build unified data schemas that calculate true Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and Average Order Value (AOV).",
        detail: "Resolves data discrepancies between ad platforms and closed bank deposits for undeniable financial truth.",
      },
      {
        name: "Visual Dashboard Construction",
        text: "Design clean, responsive executive dashboards with real-time KPI cards, pipeline stage visualizers, and technician scorecards.",
        detail: "Mobile-optimized views allowing business owners to monitor real-time company vitals from anywhere.",
      },
      {
        name: "Automated Reporting Digests",
        text: "Configure weekly and monthly automated summary reports delivered directly to the business owner via email and Slack.",
        detail: "Provides high-level performance highlights, top-performing channels, and proactive warnings on pipeline dips.",
      },
    ],
    comparison: [
      {
        feature: "Reporting Accuracy",
        digitalx: "Closed-loop reconciled revenue data",
        traditional: "Discrepancy-ridden platform metrics",
        manual: "Manual Excel sheets compiled monthly",
      },
      {
        feature: "Metric Freshness",
        digitalx: "Near real-time live data updates",
        traditional: "Delayed weekly batch updates",
        manual: "Outdated by the time it is compiled",
      },
      {
        feature: "Actionable Insights",
        digitalx: "Identifies exact bottlenecks by team/ad",
        traditional: "Overwhelming vanity metrics",
        manual: "High-level guesses without context",
      },
      {
        feature: "Executive Accessibility",
        digitalx: "Single mobile-friendly dashboard & digests",
        traditional: "Multiple complex tool logins",
        manual: "Scattered paper and email reports",
      },
    ],
    technicalSpecs: [
      {
        label: "Refresh Cadence",
        value: "Near Real-Time / Hourly",
        description: "Automated API webhooks and scheduled extraction pipelines",
      },
      {
        label: "Data Visualization",
        value: "Tailored Executive Views",
        description: "Custom interactive dashboards accessible via web or embedded in GoHighLevel",
      },
      {
        label: "Calculated KPIs",
        value: "CAC, LTV, ROAS & Pipeline Velocity",
        description: "True business metrics calculated by merging ad spend with closed CRM revenue",
      },
      {
        label: "Access Controls",
        value: "Role-Based Permissions",
        description: "Restrict financial and sales performance data based on employee hierarchy",
      },
    ],
    pricingTiers: [
      {
        name: "Executive KPI Dashboard",
        price: "$1,600 one-time",
        cadence: "turnkey buildout",
        description: "Unified dashboard connecting ad spend, lead volume, and booked revenue",
        features: [
          "Multi-source data pipeline setup (Ads + CRM + Calls)",
          "Custom executive KPI dashboard layout",
          "Automated weekly email summary digest",
          "Cost per Lead & Cost per Booked Call tracking",
          "Dashboard walkthrough and metric definition guide",
        ],
      },
      {
        name: "Operational Intelligence Suite",
        price: "$3,200 one-time",
        cadence: "enterprise rollout",
        description: "Comprehensive reporting suite with technician scorecards and LTV forecasting",
        highlight: true,
        features: [
          "Everything in Executive KPI Dashboard",
          "Individual salesperson & technician performance metrics",
          "Closed-loop accounting reconciliation (Xero/QuickBooks)",
          "Predictive pipeline and seasonal demand forecasting",
          "Quarterly metric review and dashboard refinement",
        ],
      },
    ],
    faqs: [
      {
        question: "Why shouldn't I just look at Google Ads or Facebook Ads Manager reports?",
        answer:
          "Platform ad managers only show self-reported click and conversion data, often taking credit for the same customer multiple times while ignoring refunds, cancellations, and sales cycles. A unified dashboard matches actual closed revenue from your CRM to ad spend for true profit measurement.",
      },
      {
        question: "Can this dashboard be accessed on mobile devices?",
        answer:
          "Yes, our dashboards are built with responsive layouts optimized for mobile screens, and we also configure automated weekly snapshot emails so you can review performance without needing to log in.",
      },
      {
        question: "Can we track individual sales rep or technician performance?",
        answer:
          "Yes. If your team logs appointments, closed jobs, or quotes inside your CRM or field software, we can build individual scorecards tracking close rates, average job value, and customer satisfaction.",
      },
      {
        question: "Do we need to pay ongoing licensing fees for dashboard software?",
        answer:
          "We design dashboards using cost-effective tools (such as Looker Studio, native GoHighLevel reporting, or lightweight cloud tools) so you avoid expensive enterprise business intelligence licensing fees.",
      },
    ],
  },
];

const solutionLegacyAliases: Record<string, string> = {
  "ai-voice-agents": "ai-voice-receptionists",
  "chatbots": "ai-agents-chatbots",
  "automated-lead-nurturing": "lead-generation",
  "crm-integration": "hubspot-automation",
};

export function getSolutionBySlug(slug: string): Solution | undefined {
  const directMatch = solutions.find((solution) => solution.slug === slug);
  if (directMatch) return directMatch;
  const aliasedSlug = solutionLegacyAliases[slug];
  if (aliasedSlug) {
    return solutions.find((solution) => solution.slug === aliasedSlug);
  }
  return undefined;
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
  metaDescription?: string;
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
    metaDescription: "See how Riverstone Dental Group captured 94% of after-hours patient calls and increased booked appointments by 32% using DigitalX AI voice receptionist agents.",
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
    metaDescription: "See how Harbor Plumbing Co. recovered $180,000 in annual revenue using 24/7 AI voice emergency call triage and automated missed-call text-back workflows.",
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
    metaDescription: "Read how Atlas Consulting Group cut unqualified discovery calls by 60% and lifted sales close rates by 2.1x with an automated intake qualification chatbot.",
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
    metaDescription: "Explore how Hi-Tech Expertise modernized enterprise asset inspection reporting and client intake workflows with custom Next.js web application development.",
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
  {
    slug: "njprotiling",
    client: "NJ Pro Tiling",
    industry: "Tiling Contractor",
    challenge: "A licensed Melbourne tiling contractor with no website to win premium residential work or show up in local search.",
    impact: "Designed and built a professional website and ran a full SEO program so NJ Pro Tiling can be found for tiling work across Melbourne.",
    metaDescription: "See how NJ Pro Tiling increased local search visibility and inbound customer quote requests through a high-speed website and targeted local SEO strategy.",
    services: ["Web Design & Development", "SEO"],
    solutionsUsed: [],
    narrative: [
      "NJ Pro Tiling is a licensed Melbourne tiling contractor delivering floor and wall tiling, bathroom renovations, kitchen splashbacks, outdoor tiling, and AS 3740 compliant waterproofing. The craftsmanship was excellent, but there was no website to showcase it or capture the homeowners searching online for a tiler.",
      "We designed and built a fast, mobile first website at njprotiling.com using the company's own project photography rather than stock images. It leads with the services, trust signals, and certifications premium clients look for, including licensed status, AS 3740 waterproofing, and clear pages for bathrooms, splashbacks, and outdoor tiling.",
      "We then ran a full SEO program: clean technical setup, on page optimization, and local SEO targeting tiling searches across Melbourne suburbs, with Schema markup so search engines and AI assistants understand the business. The result is a professional site built to rank locally and turn visitors into quote requests.",
    ],
    metrics: [
      { label: "Engagement", value: "Web and SEO" },
      { label: "Service area", value: "Melbourne" },
      { label: "Built for", value: "Local leads" },
    ],
  },
  {
    slug: "automation-home-services",
    client: "Confidential Home Services Brand",
    industry: "Home Services",
    challenge: "Missed after hours calls and manual scheduling were losing booked jobs to faster competitors.",
    impact: "Deployed AI voice, missed call text back, and a new website so every inbound lead is captured and booked.",
    metaDescription: "Discover how a home services business captured after-hours jobs and organized sales pipelines with 24/7 AI voice answering and GoHighLevel automation.",
    services: ["AI Voice Agents", "Missed Call Text Back", "Web Design & Development"],
    solutionsUsed: ["ai-voice-agents", "missed-call-text-back", "gohighlevel-implementation"],
    narrative: [
      "This client is a home services business that was strong on the tools but losing work online. Calls went unanswered after hours and on busy days, and scheduling was handled by hand, so leads slipped to whichever competitor picked up first.",
      "We built a fast website wired to capture and route leads, then deployed an AI voice agent that answers every call, qualifies the job, and books it, plus missed call text back that reaches anyone who still slips through. Everything flows into a GoHighLevel pipeline.",
      "The business now captures inbound leads day and night without adding front desk staff, and the owner can see every lead, job, and follow up in one place.",
    ],
    metrics: [
      { label: "Engagement", value: "Automation and Web" },
      { label: "Coverage", value: "Around the clock" },
      { label: "Focus", value: "Lead capture" },
    ],
  },
  {
    slug: "automation-healthcare-clinic",
    client: "Confidential Dental Group",
    industry: "Healthcare",
    challenge: "A busy front desk was sending new patient calls to voicemail, and many enquiries never got a callback.",
    impact: "An AI receptionist, CRM automation, and a faster website cut missed calls and filled the schedule.",
    metaDescription: "Read how a busy healthcare clinic eliminated missed patient calls, filled calendar schedules, and protected front-desk bandwidth with custom AI voice and CRM.",
    services: ["AI Voice Agents", "CRM Integration", "Web Design & Development"],
    solutionsUsed: ["ai-voice-agents", "crm-integration", "automated-lead-nurturing"],
    narrative: [
      "This client is a healthcare practice whose front desk was overwhelmed by inbound calls while caring for patients in the room. New patient enquiries went to voicemail and many were never followed up.",
      "We deployed an AI voice receptionist that answers and books appointments, connected it to the practice CRM, and added automated reminders and nurture so enquiries do not go cold. We also rebuilt the website to load fast and convert.",
      "Reception now stays focused on patients in the building while the AI handles overflow and after hours enquiries, and the schedule fills without extra hires.",
    ],
    metrics: [
      { label: "Engagement", value: "Automation and Web" },
      { label: "Focus", value: "Booked appointments" },
      { label: "Channels", value: "Voice and CRM" },
    ],
  },
  {
    slug: "automation-ecommerce-brand",
    client: "Confidential Ecommerce Brand",
    industry: "Ecommerce",
    challenge: "Abandoned carts and unreliable ad tracking after browser changes were quietly draining revenue.",
    impact: "A fast website, server side conversion tracking, and automated cart recovery protected revenue and ad spend.",
    metaDescription: "See how an online ecommerce brand recovered abandoned cart revenue and secured tracking with Meta CAPI server-side data and automated n8n CRM workflows.",
    services: ["Web Design & Development", "n8n Workflow Automation", "CRM Integration"],
    solutionsUsed: ["n8n-workflow-automation", "crm-integration"],
    narrative: [
      "This client is an online brand that was losing sales to abandoned carts and could not trust its ad reporting after browser tracking changes, while a slow site hurt conversions.",
      "We built a fast website, added server side tracking with the Meta Conversions API for accurate attribution, and wired automated cart recovery and customer flows in n8n connected to the CRM.",
      "The brand now sees accurate conversion data to guide ad spend, recovers carts automatically, and runs on a site built for speed and conversion.",
    ],
    metrics: [
      { label: "Engagement", value: "Automation and Web" },
      { label: "Focus", value: "Recovered revenue" },
      { label: "Tracking", value: "Server side" },
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
      { label: "Home Services & Contractors", href: "/industries#home-services-contractors" },
      { label: "Healthcare & Medical", href: "/industries#healthcare-medical" },
      { label: "Professional & Financial", href: "/industries#professional-financial-services" },
      { label: "Beauty, Fitness & Wellness", href: "/industries#beauty-fitness-wellness" },
      { label: "Events & Hospitality", href: "/industries#events-hospitality" },
      { label: "Automotive", href: "/industries#automotive" },
      { label: "Family, Pet & Specialty Care", href: "/industries#family-pet-specialty-care" },
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
      { label: "Case Studies", href: "/case-studies" },
      { label: "Development", href: "/development" },
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
    metaDescription: 'Explore FinTrend, an institutional-grade stock forecasting platform pairing 24 deep learning neural networks with real-time financial news sentiment analysis.',
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
    metaDescription: 'Explore Hostel360, a campus accommodation booking web platform featuring 360-degree virtual room tours, role-based dashboards, and Stripe payment processing.',
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
    metaDescription: 'Explore MediSync, an autonomous AI voice receptionist for dental and medical clinics that qualifies patient inquiries and books appointments directly 24/7.',
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
    metaDescription: 'Explore LeadBridge, a high-converting GoHighLevel automation engine that captures, scores, and routes inbound leads to sales reps in seconds. Case study.',
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
    metaDescription: 'Discover FleetRoute, an automated dispatch and quoting web application that calculates travel distance, assigns jobs to crews, and sends real-time SMS updates.',
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
    metaDescription: 'See how ShopFlow restores lost ecommerce revenue using Meta CAPI server-side conversion tracking, automated abandoned cart SMS sequences, and live analytics.',
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
    metaDescription: 'Explore BookEasy, a self-service online booking and automated SMS reminder system designed for busy beauty salons and wellness studios. Full case study.',
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
    metaDescription: 'See how InsightBoard unifies ad spend, CRM sales pipelines, and live revenue into a single real-time executive dashboard engineered for modern scaling agencies.',
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
    metaDescription: 'Discover VoxAssist, a multichannel AI conversational agent deployed across website, WhatsApp, and SMS that qualifies leads and schedules appointments 24/7.',
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
