import re

with open('src/data/redesign.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update SolutionSlug
old_slug_union = '''export type SolutionSlug =
  | "gohighlevel-implementation"
  | "ai-voice-agents"
  | "missed-call-text-back"
  | "automated-lead-nurturing"
  | "chatbots"
  | "n8n-workflow-automation"
  | "crm-integration"
  | "analytics-dashboards";'''

new_slug_union = '''export type SolutionSlug =
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
  | "analytics-dashboards";'''

if old_slug_union in content:
    content = content.replace(old_slug_union, new_slug_union)
    print("Replaced SolutionSlug union")
else:
    print("Could not find old_slug_union")

# 2. Update gohighlevel-implementation summary
old_ghl_summary = '"We stand up GoHighLevel end-to-end: snapshots, workflows, calendars, and two-way SMS so every lead, job, and follow-up runs on one system instead of five tabs."'
new_ghl_summary = '"We stand up GoHighLevel end-to-end: snapshots, workflows, calendars, and two-way SMS so every lead and job runs on one system instead of five tabs."'
content = content.replace(old_ghl_summary, new_ghl_summary)

# 3. Update missed-call-text-back summary
old_mctb_summary = '"Instant missed-call text-back and automated lead recovery for service businesses. Engage callers under 30 seconds before they dial a competitor in the US & AU."'
new_mctb_summary = '"Instant missed-call text-back and automated lead recovery for service businesses. Engage callers in under 30 seconds before they dial a competitor."'
content = content.replace(old_mctb_summary, new_mctb_summary)

# 4. Update ai-voice-agents slug to ai-voice-receptionists
content = content.replace('slug: "ai-voice-agents",\n    name: "AI Voice Agents",\n    metaTitle: "AI Voice Agents & AI Automation Service",', 
                         'slug: "ai-voice-receptionists",\n    name: "AI Voice Receptionists",\n    metaTitle: "AI Voice Receptionist for Business",')

# 5. Update chatbots slug to ai-agents-chatbots
content = content.replace('slug: "chatbots",\n    name: "Chatbots (Web + WhatsApp + SMS)",\n    metaTitle: "AI Chatbots & Conversational AI",',
                         'slug: "ai-agents-chatbots",\n    name: "AI Agents & Chatbots",\n    metaTitle: "AI Agents for Business & Chatbots",')

# 6. Update automated-lead-nurturing slug to lead-generation
content = content.replace('slug: "automated-lead-nurturing",\n    name: "Automated Lead Nurturing",\n    metaTitle: "Automated Lead Nurturing Solutions",',
                         'slug: "lead-generation",\n    name: "Meta Ads & Lead Generation",\n    metaTitle: "Meta Ads for Lead Generation",')

# 7. Add hubspot-automation solution right before analytics-dashboards
hubspot_solution = '''  {
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
'''

if 'slug: "hubspot-automation"' not in content:
    content = content.replace('  {\n    slug: "analytics-dashboards",', hubspot_solution + '  {\n    slug: "analytics-dashboards",')
    print("Added hubspot-automation solution")
else:
    print("hubspot-automation already present")

# 8. Update getSolutionBySlug
old_get_solution = '''export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}'''

new_get_solution = '''const solutionLegacyAliases: Record<string, string> = {
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
}'''

if old_get_solution in content:
    content = content.replace(old_get_solution, new_get_solution)
    print("Updated getSolutionBySlug with aliases")
else:
    print("Could not find old_get_solution")

with open('src/data/redesign.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished updating src/data/redesign.ts")
