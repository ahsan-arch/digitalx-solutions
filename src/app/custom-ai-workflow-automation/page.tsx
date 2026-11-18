import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Database, Clock, Workflow, Terminal, Server, FileText, AlertTriangle, Cpu, Layers } from "lucide-react";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServicePageSchema,
  siteConfig,
} from "@/lib/seo";
import { FAQAccordion } from "@/components/ui";

const pageTitle = "Custom n8n & Make Workflow Automation | DigitalX";
const pageDescription =
  "Eliminate manual data entry and recurring SaaS bloat: custom self-hosted n8n and Make workflow automations, API integrations, and AI data pipelines.";

export const metadata = generatePageMetadata("/custom-ai-workflow-automation", {
  title: pageTitle,
  description: pageDescription,
});

const faqItems = [
  {
    question: "Should we use self-hosted n8n or Make.com?",
    answer:
      "If you run high-volume workflows, need strict data privacy, or want to eliminate per-operation fees, self-hosted n8n is usually the best choice. For lighter setups where you prefer zero server maintenance, Make.com is a strong alternative. We help you choose the right fit during your audit.",
  },
  {
    question: "Can you migrate our existing Zapier workflows to n8n?",
    answer:
      "Yes. We audit your active Zaps, consolidate redundant multi-step workflows into cleaner n8n architectures, and migrate your triggers and webhooks with zero downtime.",
  },
  {
    question: "Can you integrate software that does not have a built-in n8n or Make node?",
    answer:
      "Yes. As long as the platform has a REST API, GraphQL endpoint, or webhook support, we build custom HTTP integrations and authentication flows to connect it to the rest of your stack.",
  },
  {
    question: "How do you prevent workflows from breaking when an API fails?",
    answer:
      "We build dedicated error-handling branches, exponential backoff retries for temporary rate limits, and real-time alert notifications so failed executions are caught and resolved before they impact customers.",
  },
  {
    question: "Do we own the workflows and infrastructure after the project is complete?",
    answer:
      "Yes. Everything is built inside your own n8n instance or Make organization. You retain full ownership of all workflow JSON files, credentials, and documentation with zero vendor lock-in.",
  },
];

export default function CustomAiWorkflowAutomationPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Custom Workflow Automation", url: `${siteConfig.domain}/custom-ai-workflow-automation` },
  ]);

  const serviceSchema = generateServicePageSchema({
    name: "Custom n8n & Make Workflow Automation Service",
    description: pageDescription,
    url: `${siteConfig.domain}/custom-ai-workflow-automation`,
  });

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        {/* SECTION 1: HERO */}
        <section className="container-shell">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-white/70 px-6 py-12 shadow-xs md:px-12 md:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Open-source infrastructure, n8n and Make engineering
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                Custom n8n and Make Workflow Automation That Connects Your Entire Tech Stack
              </h1>
              <p className="mt-5 text-base leading-relaxed text-foreground/80 md:text-lg">
                Stop paying bloated per-task Zapier bills and copying data manually between apps. We engineer resilient, production-grade n8n and Make automations, custom REST API integrations, and AI data pipelines that run your backend operations on autopilot.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  <Workflow className="h-4 w-4" />
                  Book a 15-Minute Workflow Audit
                </Link>
                <Link
                  href="/solutions/n8n-workflow-automation"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-white px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-surface-sunken"
                >
                  Explore n8n Specifications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-4 text-xs text-foreground/60">
                Have brittle Zapier workflows eating your budget? We migrate and optimize your existing automations onto self-hosted n8n.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">Infrastructure</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">Self-Hosted n8n</p>
                <p className="mt-1 text-xs text-foreground/75">Unlimited executions with 100% data privacy.</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">Cost Efficiency</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">Zero Per-Task Fees</p>
                <p className="mt-1 text-xs text-foreground/75">Eliminates exponential SaaS task bill spikes.</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">Reliability</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">Automated Retries</p>
                <p className="mt-1 text-xs text-foreground/75">Exponential backoff &amp; instant Slack error alerts.</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">Code Ownership</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">100% Client Owned</p>
                <p className="mt-1 text-xs text-foreground/75">Zero vendor lock-in with full JSON exports.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE OPERATIONAL BOTTLENECK */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Operational friction
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Disconnected Software Silently Drains Your Margin
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                Most growing companies run on multiple software tools that do not communicate properly. Relying on manual workarounds or basic single-step triggers creates daily operational friction.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Zap className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Runaway Per-Task SaaS Costs
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Basic automation platforms penalize your growth; scaling lead volume or syncing complex records pushes monthly subscription bills into the thousands.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <AlertTriangle className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Fragile Workflows That Fail Silently
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Simple plug-and-play zaps break the moment an API times out, a webhook payload changes, or an unexpected schema enters your CRM database.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Clock className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Hours Lost to Repetitive Admin
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Operations and sales teams waste valuable hours exporting CSVs, creating invoices manually, updating spreadsheets, and chasing updates across chat and email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE ARCHITECT & DEPLOY */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Technical capabilities
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Enterprise-Grade Backend Automation Built for Reliability
              </h2>
              <p className="mt-3 text-sm text-foreground/75 md:text-base">
                We engineer scalable data pipelines that eliminate repetitive friction and run resiliently in production.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  Self-Hosted Infrastructure
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  Self-Hosted n8n &amp; Zapier Migrations
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  We deploy, secure, and configure private n8n instances on your cloud infrastructure, giving you unlimited workflow executions, full data privacy, and major monthly cost savings over Zapier.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  Custom API Integrations
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  Custom REST API &amp; Webhooks
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  When native connectors fall short, we write custom HTTP requests, webhook listeners, and data transformation scripts connecting GoHighLevel, QuickBooks Online, Cliniko, Stripe, Twilio, and SQL databases.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  AI Data Pipelines
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  AI Agent &amp; LLM Data Pipelines
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  We embed structured AI steps directly inside your operations, automatically parsing incoming PDFs, enriching B2B leads, scoring inquiries, and drafting tailored responses before routing to staff.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  Lead-to-Cash Automation
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  End-to-End Lead-to-Cash Sync
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Automatically turn closed deals in your CRM into customer records, generated contracts, QuickBooks invoices, and project onboarding boards without a single manual click.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6 lg:col-span-2">
                <span className="text-xs font-semibold text-brand">
                  Error Handling and Alerts
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  Built-In Error Handling &amp; Live Alerting
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Every workflow includes automated retry logic, payload validation, and instant Slack or email alerts so your engineering and operations teams know immediately if an external third-party API goes down.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Delivery methodology
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Engineered, Stress-Tested, and Documented
              </h2>
              <p className="mt-3 text-sm text-foreground/75 md:text-base">
                A disciplined engineering approach ensuring seamless transitions, comprehensive documentation, and zero operational downtime.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Phase 1: Architecture
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  System Architecture &amp; Bottleneck Audit
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We map your current software stack, data schemas, and manual bottlenecks to identify the highest-ROI workflows to automate first.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Phase 2: Engineering
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Custom Node Engineering &amp; Sandbox Testing
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We build your workflows in n8n or Make using clean modular logic, handling pagination, rate limits, and edge-case payloads in a safe staging environment.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Phase 3: Production Handover
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Production Launch &amp; Full Ownership
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We deploy to production, monitor initial live runs, and hand over technical documentation and workflow backups so you retain 100% code and infrastructure ownership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: REAL-WORLD AUTOMATION EXAMPLES */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-brand">
                Operational blueprints
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                High-Impact Workflows We Build Every Week
              </h2>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-brand hover:text-brand-deep">
              View all workflow architectures
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border/80 bg-white p-6 shadow-xs">
              <span className="text-xs font-semibold text-brand">Lead Automation</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                Automated B2B Lead Enrichment &amp; Routing
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                New web form or ad lead arrives &rarr; AI enriches company domain and executive role &rarr; CRM record is created and scored &rarr; Assigned sales representative receives an instant Slack briefing and SMS notification.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-white p-6 shadow-xs">
              <span className="text-xs font-semibold text-brand">Finance Operations</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                Zero-Touch Accounting &amp; Invoicing Sync
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Payment clears in Stripe or a deal moves to &ldquo;Won&rdquo; in CRM &rarr; Customer records and line items sync to QuickBooks Online &rarr; Tax-compliant invoice and receipt are generated and emailed automatically.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-white p-6 shadow-xs">
              <span className="text-xs font-semibold text-brand">Document Processing</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                AI Document &amp; Inbox Triage
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Inbound client emails and PDF attachments are parsed by an LLM &rarr; Key dates, pricing line-items, and action items are extracted into structured JSON &rarr; Records update automatically in your database or project board.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: BUYER FAQ ACCORDION */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-brand">
                Buyer FAQ
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-foreground/75">
                Straightforward technical answers regarding n8n hosting, Make.com orchestration, and custom API integrations.
              </p>
            </div>

            <div className="mt-8">
              <FAQAccordion items={faqItems} defaultOpenIndex={0} />
            </div>
          </div>
        </section>

        {/* SECTION 7: BOTTOM CONVERSION BANNER */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border bg-foreground px-6 py-12 text-white md:px-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Ready to Automate Your Backend Operations?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Book a 15-minute architecture call to map out your custom n8n or Make automation roadmap.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-surface-sunken"
                >
                  Schedule Your Workflow Audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/solutions/n8n-workflow-automation"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  View Workflow Specs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
