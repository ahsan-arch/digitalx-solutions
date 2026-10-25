export type Integration = {
  slug: string;
  name: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  category: "CRM & Pipelines" | "Workflow & APIs" | "Telephony & Voice" | "Field Services" | "Scheduling";
  tagline: string;
  summary: string;
  painPointAddressed: string;
  toolsUsed: string[];
  workflowSteps: {
    step: string;
    title: string;
    description: string;
    technicalDetail: string;
  }[];
  technicalSpecifications: {
    label: string;
    value: string;
  }[];
  commonMistakesToAvoid: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSolutions: { title: string; href: string }[];
  relatedInsights: { title: string; href: string }[];
};

export const integrationsData: Integration[] = [
  {
    slug: "gohighlevel",
    name: "GoHighLevel AI Voice Agent Integration",
    primaryKeyword: "GoHighLevel AI voice agent",
    metaTitle: "GoHighLevel AI Voice Agent Setup",
    metaDescription: "Connect AI voice agents directly to GoHighLevel CRM. Automate real-time call logging, appointment booking, and custom pipeline stage triggers.",
    category: "CRM & Pipelines",
    tagline: "Bi-directional voice AI telephony synced with GHL pipelines",
    summary: "Most businesses trying to wire voice AI into GoHighLevel get stuck dealing with broken webhook payloads, unmapped custom fields, or double-firing SMS workflows. We configure a resilient, bi-directional integration that connects your telephony stream (via Twilio, Retell, or Vapi) directly to your HighLevel sub-account. When an inbound caller speaks with your AI voice receptionist, the conversation is transcribed in real-time, qualification data is parsed into custom opportunity fields, and your GHL calendar automatically checks slot availability to book the customer on the line.",
    painPointAddressed: "Agencies and operators struggling with broken Zapier zaps, messy custom value mapping, and failed calendar bookings during live voice calls.",
    toolsUsed: ["GoHighLevel CRM", "Twilio SIP", "OpenAI GPT-4o", "Deepgram STT", "Custom Webhooks"],
    workflowSteps: [
      {
        step: "01",
        title: "Telephony Webhook & Inbound SIP Route",
        description: "Configure inbound SIP trunking from your business phone number to the voice AI server.",
        technicalDetail: "We provision a dedicated Twilio trunk that passes caller ID, call SID, and geographical metadata to the webhook endpoint in under 150ms."
      },
      {
        step: "02",
        title: "Live HighLevel Slot Query",
        description: "The AI agent checks calendar availability via the HighLevel v2 Calendar API while the caller is speaking.",
        technicalDetail: "Uses function calling to query `GET /calendars/events/free-slots` with timezone normalization for US Eastern/Pacific or Australian Eastern time."
      },
      {
        step: "03",
        title: "Deterministic Booking & Lead Upsert",
        description: "Create or update the contact record, assign the pipeline stage, and reserve the appointment slot.",
        technicalDetail: "Executes `POST /contacts/upsert` with standardized E.164 phone numbers to prevent duplicate contact creation."
      },
      {
        step: "04",
        title: "Post-Call Tagging & Pipeline Automation",
        description: "Push audio recording URL, summary transcript, and sentiment tags back to the GHL conversation timeline.",
        technicalDetail: "Triggers downstream GHL workflows such as automated SMS confirmation, calendar reminders, and internal Slack/email notifications."
      }
    ],
    technicalSpecifications: [
      { label: "API Version", value: "HighLevel REST API v2 (OAuth 2.0 / Private App Token)" },
      { label: "Turnaround Latency", value: "Sub-500ms neural voice turnaround" },
      { label: "Calendar Conflict Handling", value: "Real-time slot lock with 15-minute hold buffers" },
      { label: "Error Fallback", value: "Automatic failover to SMS intake link if carrier packet drops" }
    ],
    commonMistakesToAvoid: [
      "Failing to standardize caller phone numbers into E.164 (+61 / +1), which causes HighLevel to create fragmented duplicate contacts for the same customer.",
      "Triggering a generic 'New Lead' SMS campaign immediately after the call while the customer already agreed to an appointment over voice, causing customer confusion.",
      "Allowing non-deterministic prompt text to set appointment times without strict schema validation against actual calendar slot availability."
    ],
    faqs: [
      {
        question: "Can the AI voice agent book directly into my GoHighLevel calendar?",
        answer: "Yes. The AI voice agent uses tool-calling functions to check live calendar slots in your HighLevel calendar, presents two to three available options to the caller in conversational natural language, and books the selected slot instantly."
      },
      {
        question: "How does the integration prevent duplicate contacts in HighLevel?",
        answer: "We query your HighLevel sub-account using the caller's verified incoming phone number in E.164 format. If an existing contact exists, the agent updates that record with the new call transcript and tags rather than generating a duplicate."
      },
      {
        question: "What happens if a caller has a complex emergency that the AI cannot handle?",
        answer: "We configure an automated transfer rule. The AI calmly advises the caller that it is bridging them directly to your emergency on-call technician or manager, and executes a live SIP warm transfer to your mobile number."
      }
    ],
    relatedSolutions: [
      { title: "GoHighLevel Implementation", href: "/solutions/gohighlevel-implementation" },
      { title: "AI Voice Receptionists", href: "/solutions/ai-voice-receptionists" },
      { title: "Missed-Call Text-Back", href: "/solutions/missed-call-text-back" }
    ],
    relatedInsights: [
      { title: "How Many Calls Do Plumbers Miss?", href: "/insights/how-many-calls-do-plumbers-miss" },
      { title: "GoHighLevel vs HubSpot for Service Businesses", href: "/insights/gohighlevel-vs-hubspot" }
    ]
  },
  {
    slug: "n8n",
    name: "n8n Workflow Automation Integration",
    primaryKeyword: "n8n workflows for business",
    metaTitle: "n8n Workflows for Business & CRM Setup",
    metaDescription: "Scale business process automation with custom self-hosted n8n workflows. Connect CRM, webhooks, databases, and AI agents without per-task SaaS fees.",
    category: "Workflow & APIs",
    tagline: "Production-grade, self-hosted workflow automation without per-task SaaS taxes",
    summary: "When businesses scale past 20,000 monthly automation runs on Zapier or Make, software bills spike into thousands of dollars while complex multi-step pipelines suffer timeouts. DigitalX Solutions designs, self-hosts, and manages dedicated n8n automation instances deployed on secure Docker or cloud infrastructure. We engineer custom n8n workflows that handle heavy data transformations, multi-system CRM synchronization, and LLM agent orchestration with total data sovereignty and strict compliance with Australian Privacy Principles and US data standards.",
    painPointAddressed: "Exorbitant Zapier bills, rate-limit bottlenecks on Make, and lack of data privacy when processing sensitive client records through third-party multi-tenant clouds.",
    toolsUsed: ["n8n (Self-Hosted)", "Docker", "PostgreSQL", "OpenAI / Anthropic APIs", "Redis Queue"],
    workflowSteps: [
      {
        step: "01",
        title: "Docker VPS Deployment with Queue Mode",
        description: "Deploy n8n in high-availability Queue Mode using Redis and PostgreSQL for zero-downtime execution.",
        technicalDetail: "Configured with dedicated worker processes, automatic container restarts, and encrypted environment variables."
      },
      {
        step: "02",
        title: "Webhook Ingestion with Signature Verification",
        description: "Receive real-time lead, invoice, or telephony payloads with cryptographic signature checks.",
        technicalDetail: "Validates HMAC-SHA256 headers before processing to eliminate malicious spam requests."
      },
      {
        step: "03",
        title: "Complex Transformation & AI Tool Calling",
        description: "Normalize data across legacy APIs and execute deterministic Python or JavaScript node transforms.",
        technicalDetail: "Executes custom logic, batch array processing, and LangChain memory integration within isolated node runtimes."
      },
      {
        step: "04",
        title: "Error Trigger & Telegram/Slack Escalation",
        description: "Catch failed node executions immediately and alert engineers with full debug payloads.",
        technicalDetail: "Utilizes dedicated n8n Error Trigger nodes that send structured error alerts with retry execution IDs to a private operations channel."
      }
    ],
    technicalSpecifications: [
      { label: "Execution Capacity", value: "Unlimited monthly executions (capped only by server compute)" },
      { label: "Data Sovereignty", value: "100% self-hosted on Australian or US servers of your choice" },
      { label: "Node Runtime", value: "Native JavaScript / TypeScript execution with NPM module support" },
      { label: "Security", value: "TLS 1.3, encrypted database secrets, and isolated Docker network bridge" }
    ],
    commonMistakesToAvoid: [
      "Running production n8n instances in default single-process SQLite mode without Redis, which causes memory exhaustion and crashes under burst traffic.",
      "Failing to implement error sub-workflows, leaving failed webhook payloads lost without retry logs or team notifications.",
      "Hardcoding API keys inside workflow nodes rather than utilizing n8n's encrypted credential manager."
    ],
    faqs: [
      {
        question: "Why should a business choose n8n over Zapier or Make?",
        answer: "n8n gives you unlimited workflow runs on your own dedicated server without per-operation pricing penalties. It also allows custom JavaScript code execution, full database access, and total data privacy since client information never sits in a third-party shared cloud."
      },
      {
        question: "Who maintains the n8n server if something goes down?",
        answer: "DigitalX Solutions provides ongoing managed DevOps and monitoring retainers. We monitor server uptime, handle security patches, review node execution logs, and update workflows as your external APIs evolve."
      },
      {
        question: "Can n8n connect to our internal custom database or ERP?",
        answer: "Yes. n8n natively connects to PostgreSQL, MySQL, MSSQL, MongoDB, Redis, and any REST or GraphQL API with custom headers and webhook triggers."
      }
    ],
    relatedSolutions: [
      { title: "n8n Workflow Automation", href: "/solutions/n8n-workflow-automation" },
      { title: "API & Webhook Integrations", href: "/development/api-webhook-integrations" },
      { title: "GoHighLevel Implementation", href: "/solutions/gohighlevel-implementation" }
    ],
    relatedInsights: [
      { title: "n8n vs Zapier vs Make: Enterprise Cost Breakdown", href: "/insights/n8n-vs-zapier-vs-make" },
      { title: "What is an AI Agent?", href: "/insights/what-is-an-ai-agent" }
    ]
  },
  {
    slug: "hubspot",
    name: "HubSpot Workflow Automation & AI Integration",
    primaryKeyword: "HubSpot workflow automation",
    metaTitle: "HubSpot Workflow Automation Services",
    metaDescription: "Modernize your RevOps with HubSpot workflow automation. Connect custom webhooks, n8n data pipelines, and AI voice call logging directly to HubSpot.",
    category: "CRM & Pipelines",
    tagline: "Enterprise RevOps pipelines and custom webhook automation for HubSpot",
    summary: "HubSpot Professional and Enterprise tiers offer powerful sales and marketing hubs, but scaling teams frequently hit roadblocks when trying to connect external telephony, proprietary databases, or specialized AI agents. DigitalX Solutions engineers custom HubSpot workflow automations that bridge the gap between standard CRM objects and modern AI tooling. We build webhook-driven lifecycle triggers, automated lead enrichment pipelines, and custom event logging so your sales reps see verified caller transcripts and booking details right inside their deal timeline.",
    painPointAddressed: "Manual lead routing bottlenecks, missing voice call attribution, and rigid native workflow limits requiring expensive custom code actions.",
    toolsUsed: ["HubSpot CRM API v3", "HubSpot Operations Hub", "n8n", "Twilio", "Webhook Endpoints"],
    workflowSteps: [
      {
        step: "01",
        title: "Lifecycle Stage & Deal Pipeline Blueprint",
        description: "Align contact and deal properties with your real sales velocity and service operational handoffs.",
        technicalDetail: "Establishes clean custom property schemas with strict validation to prevent dirty CRM data entry."
      },
      {
        step: "02",
        title: "Webhook Telephony Stream to Timeline API",
        description: "Ingest live call recordings, voice summaries, and transcript text into contact activity timelines.",
        technicalDetail: "Executes `POST /crm/v3/timeline/events` to create rich custom timeline cards with audio playback widgets."
      },
      {
        step: "03",
        title: "Automated Round-Robin Task Assignment",
        description: "Route qualified high-ticket leads to sales reps based on territory, availability, and lead score.",
        technicalDetail: "Utilizes custom webhook triggers to calculate sales rep capacity before assigning deal ownership."
      },
      {
        step: "04",
        title: "Attribution & Offline Conversions Sync",
        description: "Push deal milestone changes back to Meta Conversions API and Google Ads for offline ROAS optimization.",
        technicalDetail: "Matches hashed email and phone data with ad click IDs (`fbclid`, `gclid`) upon deal closed-won events."
      }
    ],
    technicalSpecifications: [
      { label: "API Standard", value: "HubSpot CRM API v3 with OAuth 2.0 & Private App Access" },
      { label: "Object Support", value: "Contacts, Companies, Deals, Tickets, and Custom Objects" },
      { label: "Timeline Integration", value: "Rich Custom Event Cards with Direct Audio Link Rendering" },
      { label: "Compliance", value: "Full alignment with HubSpot API rate limits (100–150 req/10s)" }
    ],
    commonMistakesToAvoid: [
      "Overloading contact records with dozens of unindexed text properties instead of creating dedicated deal or custom engagement objects.",
      "Relying on multi-step native delay timers that break when an external lead triggers an out-of-order status change.",
      "Failing to pass conversion values back to ad networks when a deal closes offline inside the CRM."
    ],
    faqs: [
      {
        question: "Can an AI voice agent log call details directly into HubSpot?",
        answer: "Yes. Following each completed phone call, the voice system pushes the full audio recording, concise bulleted summary, call duration, and outcome tags directly into the contact's HubSpot activity timeline."
      },
      {
        question: "Do we need HubSpot Operations Hub Enterprise to build these automations?",
        answer: "No. By pairing standard HubSpot Professional with our external n8n or serverless webhook middleware, we can execute advanced computational workflows and multi-system syncs without requiring expensive Enterprise custom-code add-ons."
      },
      {
        question: "Can you migrate our legacy workflows from ActiveCampaign or Zapier into HubSpot?",
        answer: "Yes. We audit your legacy automation logic, clean your contact tags and custom fields, and rebuild optimized workflows directly inside HubSpot."
      }
    ],
    relatedSolutions: [
      { title: "HubSpot Automation Partner", href: "/solutions/hubspot-automation" },
      { title: "Custom CRM Development", href: "/development/custom-crm-development" },
      { title: "GoHighLevel Implementation", href: "/solutions/gohighlevel-implementation" }
    ],
    relatedInsights: [
      { title: "GoHighLevel vs HubSpot for Service Businesses", href: "/insights/gohighlevel-vs-hubspot" },
      { title: "Cost of a Missed Call to a Business", href: "/insights/how-much-does-a-missed-call-cost-a-business" }
    ]
  },
  {
    slug: "twilio",
    name: "Twilio Telephony & AI Voice Infrastructure",
    primaryKeyword: "Twilio AI voice agent setup",
    metaTitle: "Twilio AI Voice Agent Setup & Porting",
    metaDescription: "Set up Twilio telephony for AI voice agents. Keep your existing phone number, configure SIP trunks, and deploy sub-500ms neural call routing.",
    category: "Telephony & Voice",
    tagline: "Keep your 10-year-old business number while adding 24/7 AI voice answering",
    summary: "Business owners are terrified that deploying AI voice agents means abandoning the familiar local telephone number they have printed on their vans, shirts, and billboards for a decade. With DigitalX Solutions, you never lose your number. We configure carrier-grade Twilio SIP trunking, number porting, and conditional call forwarding. Inbound calls ring your office or cell phone first; if unanswered within 15 seconds or dialed after business hours, the call is seamlessly handed off to your AI voice receptionist with zero caller interruption.",
    painPointAddressed: "Fear of losing existing business phone numbers, poor audio quality, high latency, and carrier spam tagging.",
    toolsUsed: ["Twilio Voice API", "Twilio SIP Trunking", "TwiML Bins", "Deepgram WebSockets", "10DLC Brand Registration"],
    workflowSteps: [
      {
        step: "01",
        title: "Conditional Call Forwarding or SIP Setup",
        description: "Set your existing Telstra, Optus, AT&T, or Verizon line to forward on busy or no-answer.",
        technicalDetail: "Directs carrier no-answer overflow (`*67*` / `*71*`) to a provisioned low-latency Twilio SIP inbound endpoint."
      },
      {
        step: "02",
        title: "A2P 10DLC & Australian Carrier Registration",
        description: "Register your business tax ID and messaging use-case to ensure 99%+ carrier delivery rates.",
        technicalDetail: "Eliminates spam filtering on outbound missed-call text-backs by securing vetted carrier campaign approval."
      },
      {
        step: "03",
        title: "Bi-Directional Audio WebSocket Stream",
        description: "Stream high-definition 8kHz/16kHz audio directly to neural speech recognition and LLM models.",
        technicalDetail: "Utilizes Twilio `<Connect><Stream>` to achieve real-time full-duplex conversational audio streaming with sub-500ms latency."
      },
      {
        step: "04",
        title: "Emergency Live Call Bridging",
        description: "Execute immediate warm transfers to on-call technicians when an urgent emergency is identified.",
        technicalDetail: "Uses `<Dial>` TwiML verbs with whisper announcements so your staff knows caller details before answering."
      }
    ],
    technicalSpecifications: [
      { label: "Audio Protocol", value: "Real-Time WebSocket Full-Duplex PCM Audio Streaming" },
      { label: "Carrier Compliance", value: "US A2P 10DLC Vetted / Australian ACMA Spam Act Compliant" },
      { label: "Transfer Latency", value: "Sub-1.2 second live bridge to staff cell phones" },
      { label: "Uptime SLA", value: "99.95% backed by Twilio global carrier network redundancy" }
    ],
    commonMistakesToAvoid: [
      "Failing to complete A2P 10DLC brand registration before launching SMS automations, which causes US telecom carriers to block text-backs silently.",
      "Hardcoding unconditional call forwarding, which prevents business owners from answering their own phones during normal business hours.",
      "Using low-bandwidth codecs that degrade voice synthesis clarity, making AI receptionists sound like muffled recordings."
    ],
    faqs: [
      {
        question: "Do I have to change my existing business phone number to use AI?",
        answer: "No. You keep your existing business phone number. We configure conditional call forwarding so that when your line rings out or you are on another call, your carrier automatically routes the caller to our AI voice system."
      },
      {
        question: "Can the AI transfer emergency callers to my mobile phone?",
        answer: "Yes. When an emergency is detected (such as an active water leak or urgent dental pain), the AI agent immediately bridges the call to your mobile phone and whispers a 5-second brief before you speak to the caller."
      },
      {
        question: "How much do Twilio phone numbers and minutes cost?",
        answer: "Twilio telephony is extremely cost-effective. Dedicated local phone numbers typically cost $1.15 to $2.00 per month, with inbound voice minutes billed at approximately $0.013 per minute."
      }
    ],
    relatedSolutions: [
      { title: "AI Voice Receptionists", href: "/solutions/ai-voice-receptionists" },
      { title: "Missed-Call Text-Back", href: "/solutions/missed-call-text-back" },
      { title: "GoHighLevel Implementation", href: "/solutions/gohighlevel-implementation" }
    ],
    relatedInsights: [
      { title: "AI Call Recording Laws in Australia and the US", href: "/insights/ai-call-recording-laws-australia-us" },
      { title: "Missed-Call Text-Back Compliance Guide", href: "/insights/missed-call-text-back-compliance" }
    ]
  },
  {
    slug: "servicetitan",
    name: "ServiceTitan AI Receptionist & Dispatch Integration",
    primaryKeyword: "ServiceTitan AI receptionist",
    metaTitle: "ServiceTitan AI Receptionist & Booking",
    metaDescription: "Integrate 24/7 AI voice receptionists with ServiceTitan. Automatically book urgent trade jobs, triage emergency calls, and sync with dispatch boards.",
    category: "Field Services",
    tagline: "Zero missed emergency dispatch calls for HVAC, plumbing, and electrical contractors",
    summary: "For high-volume trade contractors running on ServiceTitan, missed calls during summer heatwaves or winter freezes represent thousands of dollars in lost installation and repair revenue. DigitalX Solutions connects conversational AI voice agents directly to the ServiceTitan API. Our voice agents answer callers within two rings, qualify their equipment make, model, and emergency urgency, and inject unassigned job tickets directly into your ServiceTitan dispatch board with complete audio recordings and transcripts.",
    painPointAddressed: "Overwhelmed dispatchers during weather-driven call spikes, losing emergency after-hours calls to competitor contractors, and inaccurate job intake notes.",
    toolsUsed: ["ServiceTitan API v2", "Twilio Voice", "GoHighLevel", "n8n Integration Middleware"],
    workflowSteps: [
      {
        step: "01",
        title: "Inbound Call Triage & Address Verification",
        description: "AI agent answers the call, gathers service address, problem description, and equipment details.",
        technicalDetail: "Validates caller address against your company's geofenced service territory in real time."
      },
      {
        step: "02",
        title: "ServiceTitan Customer & Location Lookup",
        description: "Check if the caller is an existing membership club customer or a new inbound lead.",
        technicalDetail: "Executes `GET /crm/v2/customers` to pull existing equipment histories and service agreements."
      },
      {
        step: "03",
        title: "Direct Job & Booking Injection",
        description: "Create an unassigned job on the ServiceTitan dispatch board with proper business unit tags.",
        technicalDetail: "Calls `POST /jpm/v2/jobs` setting correct priority flags, campaign source IDs, and appointment arrival windows."
      },
      {
        step: "04",
        title: "Instant SMS Confirmation & Map Tracking Link",
        description: "Text the homeowner immediate booking confirmation and technician dispatch expectations.",
        technicalDetail: "Sends immediate reassurance text-back under 30 seconds confirming job ticket number."
      }
    ],
    technicalSpecifications: [
      { label: "API Version", value: "ServiceTitan REST API v2 (Tenant Authorized App)" },
      { label: "Supported Trades", value: "HVAC, Plumbing, Electrical, Garage Door, Roofing" },
      { label: "Dispatch Board Sync", value: "Live ticket creation with priority tags and audio attachments" },
      { label: "Membership Recognition", value: "Detects active ServiceTitan maintenance agreements" }
    ],
    commonMistakesToAvoid: [
      "Failing to match the incoming phone number against existing customer location records, resulting in split service histories.",
      "Injecting jobs with generic business unit tags, which confuses dispatchers and disrupts technician commission tracking.",
      "Not setting strict emergency triage rules, causing non-urgent maintenance requests to wake up on-call technicians at 2 AM."
    ],
    faqs: [
      {
        question: "Does the AI create actual jobs inside ServiceTitan?",
        answer: "Yes. The AI voice agent creates real customer records, locations, and unassigned jobs directly inside your ServiceTitan dispatch board, complete with the caller's problem summary, equipment notes, and call recording."
      },
      {
        question: "Can the AI prioritize emergency water leaks or heating outages?",
        answer: "Yes. We configure specialized priority workflows. Emergency calls are flagged as High Priority on your board and can simultaneously trigger an urgent SMS or call transfer to your on-call technician."
      },
      {
        question: "What if the customer is outside our normal service territory?",
        answer: "The AI verifies the caller's suburb or zip code. If they fall outside your operational boundaries, the agent politely informs them of your service radius and suggests alternative assistance, avoiding wasted technician driving time."
      }
    ],
    relatedSolutions: [
      { title: "AI Voice Receptionists", href: "/solutions/ai-voice-receptionists" },
      { title: "Missed-Call Text-Back", href: "/solutions/missed-call-text-back" },
      { title: "Plumbers & HVAC Trade Playbook", href: "/industries/plumbers-hvac-trades" }
    ],
    relatedInsights: [
      { title: "How Many Calls Do Plumbers Miss?", href: "/insights/how-many-calls-do-plumbers-miss" },
      { title: "How Much Does a Missed Call Cost a Business?", href: "/insights/how-much-does-a-missed-call-cost-a-business" }
    ]
  },
  {
    slug: "jobber",
    name: "Jobber AI Receptionist & Quote Automation",
    primaryKeyword: "Jobber AI receptionist",
    metaTitle: "Jobber AI Receptionist & Booking Setup",
    metaDescription: "Automate trade job intake with Jobber AI receptionist integration. Capture client details, create quote requests, and book site visits 24/7.",
    category: "Field Services",
    tagline: "Turn missed trade phone calls into scheduled Jobber quote requests",
    summary: "Running a trade business while simultaneously quoting jobs and answering the phone leads to missed calls and burnt-out owners. DigitalX Solutions connects conversational AI phone agents directly to your Jobber account. When homeowners call for electrical, landscaping, plumbing, or cleaning work, our voice agent collects project specifications, square footage, urgency, and address, then creates a clean Client Profile and Quote Request in Jobber automatically.",
    painPointAddressed: "Tradies having to pull over trucks to write down client addresses on scrap paper while losing jobs to competitors.",
    toolsUsed: ["Jobber GraphQL API", "Twilio Voice", "GoHighLevel", "n8n Webhooks"],
    workflowSteps: [
      {
        step: "01",
        title: "Inbound Voice Intake & Scope Capture",
        description: "AI agent answers trade calls, notes job description, property type, and scheduling preferences.",
        technicalDetail: "Extracts structured JSON entities (service category, timeline, property address) from caller dialogue."
      },
      {
        step: "02",
        title: "Client & Property Upsert in Jobber",
        description: "Check Jobber database for existing client record and add property service address.",
        technicalDetail: "Executes GraphQL mutations `clientCreate` or `clientEdit` with normalized mobile contact info."
      },
      {
        step: "03",
        title: "Automated Job Request Creation",
        description: "Generate a new Request inside Jobber with caller notes and uploaded audio recording.",
        technicalDetail: "Calls `requestCreate` attaching structured scope notes so your office staff can review and quote in one click."
      },
      {
        step: "04",
        title: "Instant Two-Way SMS Confirmation",
        description: "Send the customer a professional text confirmation with their quote reference and photo upload link.",
        technicalDetail: "Provides an instant mobile link where homeowners can text photos of their breaker panel or yard."
      }
    ],
    technicalSpecifications: [
      { label: "API Protocol", value: "Jobber GraphQL API (OAuth 2.0 PKCE Authorized)" },
      { label: "Data Objects", value: "Clients, Properties, Requests, Assessments, and Custom Fields" },
      { label: "Photo Intake", value: "Two-way MMS photo upload link delivered via text immediately after call" },
      { label: "Supported Trades", value: "Landscaping, Residential Cleaning, HVAC, Plumbing, Handyman" }
    ],
    commonMistakesToAvoid: [
      "Failing to capture complete physical addresses during the call, requiring office staff to call back just to confirm the street name.",
      "Creating raw unverified jobs instead of Jobber Requests, cluttering your schedule before quotes are priced and accepted.",
      "Not sending a confirmation text, leaving the homeowner wondering if their request was actually received."
    ],
    faqs: [
      {
        question: "Does the AI create Requests or scheduled Jobs inside Jobber?",
        answer: "By default, we configure the system to create Jobber Requests. This allows you to review the scope and location before committing to a scheduled visit. However, for fixed-price standard services, we can configure direct calendar booking."
      },
      {
        question: "Can homeowners text photos of the job after speaking with the AI?",
        answer: "Yes. Immediately after the call finishes, our system sends an automated SMS with a secure upload link where the customer can send photos of their project, which sync directly into their Jobber request."
      },
      {
        question: "How long does it take to connect Jobber with the AI voice system?",
        answer: "Standard Jobber integration and voice testing typically takes between 5 and 7 business days from initial intake to live production calls."
      }
    ],
    relatedSolutions: [
      { title: "AI Voice Receptionists", href: "/solutions/ai-voice-receptionists" },
      { title: "Missed-Call Text-Back", href: "/solutions/missed-call-text-back" },
      { title: "Plumbers & HVAC Trade Playbook", href: "/industries/plumbers-hvac-trades" }
    ],
    relatedInsights: [
      { title: "How Many Calls Do Plumbers Miss?", href: "/insights/how-many-calls-do-plumbers-miss" },
      { title: "How Much Does a Missed Call Cost a Business?", href: "/insights/how-much-does-a-missed-call-cost-a-business" }
    ]
  },
  {
    slug: "cliniko",
    name: "Cliniko AI Receptionist & Patient Booking Integration",
    primaryKeyword: "Cliniko AI receptionist",
    metaTitle: "Cliniko AI Receptionist & Patient Booking",
    metaDescription: "Deploy an AI voice receptionist for Cliniko allied health practices. Automate 24/7 patient booking, appointment triage, and calendar synchronization.",
    category: "Scheduling",
    tagline: "24/7 patient appointment booking that respects Australian Privacy Principles",
    summary: "Allied health clinics, physiotherapists, chiropractors, and dental practices across Australia face constant front desk bottlenecks during peak treatment hours. When receptionists are welcoming patients in the clinic, inbound phone calls go unanswered. DigitalX Solutions connects intelligent AI voice receptionists directly to Cliniko PMS. Our voice agents recognize patient inquiry types, check practitioner availability across treatment modalities, and book appointments directly into Cliniko diaries 24 hours a day, 7 days a week.",
    painPointAddressed: "Patient calls abandoned while front desk staff attend to in-clinic clients, leading to lost new patient billings.",
    toolsUsed: ["Cliniko REST API v1", "Twilio Australian Voice", "n8n", "Australian Privacy Principles Compliant Cloud"],
    workflowSteps: [
      {
        step: "01",
        title: "Patient Verification & Triage",
        description: "Voice AI welcomes the caller, determines whether they are a new or returning patient, and confirms appointment reason.",
        technicalDetail: "Queries `GET /patients` using the verified Australian mobile number (+61) to locate existing patient records."
      },
      {
        step: "02",
        title: "Real-Time Practitioner Availability Query",
        description: "Check open diary slots for the requested practitioner, modality, and clinic location.",
        technicalDetail: "Calls `GET /individual_appointments/available_times` normalized for practitioner working hours and buffer times."
      },
      {
        step: "03",
        title: "Cliniko Diary Booking Creation",
        description: "Reserve the appointment slot, attach treatment note tags, and assign proper appointment type codes.",
        technicalDetail: "Executes `POST /individual_appointments` creating the verified booking with instant status confirmation."
      },
      {
        step: "04",
        title: "Instant Patient SMS & Intake Form Link",
        description: "Send patient an immediate SMS confirmation containing digital medical history intake forms.",
        technicalDetail: "Delivers encrypted intake form link so patients complete their paperwork prior to arriving at the clinic."
      }
    ],
    technicalSpecifications: [
      { label: "API Standard", value: "Cliniko REST API v1 (API Key Header Authentication)" },
      { label: "Compliance Standard", value: "Australian Privacy Principles (Privacy Act 1988) & My Health Record standards" },
      { label: "Practitioner Routing", value: "Supports multi-practitioner, multi-room, and multi-location clinic diaries" },
      { label: "Patient Sync", value: "Real-time read/write patient profile and appointment synchronization" }
    ],
    commonMistakesToAvoid: [
      "Allowing AI agents to dispense clinical or medical advice rather than strictly handling booking, pricing, location, and hours.",
      "Failing to account for practitioner treatment buffers, causing back-to-back appointment overlap during busy afternoon clinic hours.",
      "Storing raw patient clinical notes on unencrypted third-party US cloud servers without signed data sovereignty agreements."
    ],
    faqs: [
      {
        question: "Is this integration compliant with Australian health privacy laws?",
        answer: "Yes. Our telephony and data pipelines comply with the Australian Privacy Principles (Privacy Act 1988). The AI voice receptionist collects only necessary operational booking details (name, phone, appointment type, preferred time) and does not store sensitive diagnostic medical histories on third-party servers."
      },
      {
        question: "Can the AI handle multi-practitioner clinics with different service durations?",
        answer: "Yes. The AI queries your Cliniko account by individual practitioner and service type, accurately booking 30-minute follow-ups vs 60-minute initial consultations without scheduling errors."
      },
      {
        question: "What happens if an existing patient calls to cancel or reschedule?",
        answer: "The AI verifies their identity, locates their existing appointment in Cliniko, and offers alternative diary slots to reschedule them immediately, updating your Cliniko diary without manual front desk intervention."
      }
    ],
    relatedSolutions: [
      { title: "AI Voice Receptionists", href: "/solutions/ai-voice-receptionists" },
      { title: "Medical & Dental Playbook", href: "/industries/medical-dental-clinics" },
      { title: "GoHighLevel Implementation", href: "/solutions/gohighlevel-implementation" }
    ],
    relatedInsights: [
      { title: "AI Call Recording Laws in Australia and the US", href: "/insights/ai-call-recording-laws-australia-us" },
      { title: "AI Voice Receptionist Pricing Guide", href: "/insights/ai-voice-agent-pricing" }
    ]
  },
  {
    slug: "google-calendar",
    name: "Google Calendar AI Voice Booking Integration",
    primaryKeyword: "AI voice agent Google Calendar booking",
    metaTitle: "AI Voice Agent Google Calendar Booking",
    metaDescription: "Connect AI voice agents directly to Google Calendar. Real-time slot availability, double-booking prevention, and instant SMS meeting confirmations.",
    category: "Scheduling",
    tagline: "Live conversational voice scheduling connected directly to your Google Workspace",
    summary: "Small business owners and consultants rely on Google Calendar to run their working lives, but manual scheduling back-and-forth drains hours of productive time. DigitalX Solutions connects conversational AI voice receptionists directly to Google Calendar via OAuth 2.0. Our agents speak naturally with callers, verify free and busy slots in real time, apply necessary travel and buffer times, and lock in the appointment on your calendar with automated calendar invitations and SMS notifications sent in seconds.",
    painPointAddressed: "Double bookings, missed phone appointments, and callers refusing to click email scheduling links.",
    toolsUsed: ["Google Calendar API v3", "Google Workspace OAuth 2.0", "Twilio Voice", "GoHighLevel"],
    workflowSteps: [
      {
        step: "01",
        title: "Live Free/Busy Slot Query",
        description: "Check actual availability across multiple team calendars using Google's FreeBusy API.",
        technicalDetail: "Executes `freebusy.query` with min/max time boundaries and dynamic 15-minute padding buffers."
      },
      {
        step: "02",
        title: "Conversational Option Presentation",
        description: "The AI agent offers the caller two distinct convenient options (e.g., Tuesday morning or Wednesday afternoon).",
        technicalDetail: "Translates raw ISO-8601 timestamps into natural spoken phrasing tailored to the caller's local timezone."
      },
      {
        step: "03",
        title: "Calendar Event Creation & Google Meet Link",
        description: "Insert the confirmed meeting into your calendar with attendee details, phone number, and agenda.",
        technicalDetail: "Calls `events.insert` with automatic Google Meet video link generation and guest notification triggers."
      },
      {
        step: "04",
        title: "Two-Way SMS Reminder & Reschedule Loop",
        description: "Text the caller instant meeting confirmation with a 1-click link to reschedule or cancel.",
        technicalDetail: "Syncs with HighLevel or Twilio SMS to deliver 24-hour and 1-hour automated SMS reminders."
      }
    ],
    technicalSpecifications: [
      { label: "API Protocol", value: "Google Calendar API v3 (OAuth 2.0 User Consent / Service Account)" },
      { label: "Timezone Support", value: "Automatic multi-timezone detection across US and Australian zones" },
      { label: "Buffer Management", value: "Custom pre- and post-meeting buffer periods to prevent overlapping" },
      { label: "Team Scheduling", value: "Supports round-robin and collective multi-host scheduling" }
    ],
    commonMistakesToAvoid: [
      "Scheduling appointments without checking Google Calendar secondary calendars (personal, holidays), leading to embarrassing double-bookings.",
      "Failing to add buffer times between on-site client appointments, leaving technicians stranded in traffic.",
      "Relying on email invites alone without SMS reminders; text reminders cut appointment no-show rates by over 65%."
    ],
    faqs: [
      {
        question: "Can the AI voice agent check multiple calendars to prevent double-booking?",
        answer: "Yes. We configure the FreeBusy query across both your work calendar and personal calendar to ensure the AI never offers a time slot where you are already committed."
      },
      {
        question: "What happens if a caller wants to reschedule their booking?",
        answer: "The caller can simply call back or click the reschedule link in their confirmation text. The AI voice agent recognizes their existing booking, removes the previous event, and moves them to their new preferred time."
      },
      {
        question: "Does this work with standard free Gmail accounts or only Google Workspace?",
        answer: "It works with both standard @gmail.com accounts and enterprise Google Workspace domains."
      }
    ],
    relatedSolutions: [
      { title: "AI Voice Receptionists", href: "/solutions/ai-voice-receptionists" },
      { title: "GoHighLevel Implementation", href: "/solutions/gohighlevel-implementation" },
      { title: "Missed-Call Text-Back", href: "/solutions/missed-call-text-back" }
    ],
    relatedInsights: [
      { title: "How Much Does a Missed Call Cost a Business?", href: "/insights/how-much-does-a-missed-call-cost-a-business" },
      { title: "What is an AI Voice Agent?", href: "/insights/what-is-an-ai-voice-agent" }
    ]
  }
];

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrationsData.find((i) => i.slug === slug);
}

export const integrations = integrationsData;
