import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Database, Clock, Layers, MessageSquare, PhoneCall, Workflow, Users, Settings } from "lucide-react";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServicePageSchema,
  siteConfig,
} from "@/lib/seo";
import { FAQAccordion } from "@/components/ui";

const pageTitle = "GoHighLevel Setup & CRM Automation | DigitalX";
const pageDescription =
  "Turn GoHighLevel into an automated acquisition engine: custom pipelines, A2P 10DLC compliance, missed-call text-back, and AI workflows built in 7 days.";

export const metadata = generatePageMetadata("/gohighlevel-crm-setup-automation", {
  title: pageTitle,
  description: pageDescription,
});

const faqItems = [
  {
    question: "Can you fix an existing GoHighLevel account instead of starting from scratch?",
    answer:
      "Yes. Most clients come to us with an existing sub-account that has broken triggers or incomplete A2P setup. We audit your current workflows, clean up duplicate tags and fields, and rebuild your core automations cleanly without disrupting live campaigns.",
  },
  {
    question: "Do you handle A2P 10DLC registration for SMS compliance?",
    answer:
      "Yes. We manage the full brand and campaign registration process inside GoHighLevel so your business phone numbers are approved by carriers for automated texting with maximum deliverability.",
  },
  {
    question: "Can you connect GoHighLevel to external tools like n8n, Make, or QuickBooks?",
    answer:
      "Yes. Beyond native GoHighLevel triggers, we build custom webhook and REST API integrations connecting GHL to n8n, Make, QuickBooks Online, Cliniko, ServiceTitan, and custom web applications.",
  },
  {
    question: "Do you build reusable Snapshots for other agencies?",
    answer:
      "Yes. If you run a marketing or SaaS agency on GoHighLevel, we engineer niche-specific master Snapshots that you can deploy across new client sub-accounts in one click.",
  },
];

export default function GoHighLevelCrmSetupAutomationPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "GoHighLevel Setup & Automation", url: `${siteConfig.domain}/gohighlevel-crm-setup-automation` },
  ]);

  const serviceSchema = generateServicePageSchema({
    name: "GoHighLevel Setup & CRM Automation Service",
    description: pageDescription,
    url: `${siteConfig.domain}/gohighlevel-crm-setup-automation`,
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
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-white px-6 py-12 shadow-xs md:px-12 md:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Production CRM engineering across Australia and the US
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                GoHighLevel Setup and CRM Automation Built to Capture, Nurture, and Close Every Lead
              </h1>
              <p className="mt-5 text-base leading-relaxed text-foreground/80 md:text-lg">
                Stop paying for a GoHighLevel account you only use at partial capacity. We architect custom pipelines, automated SMS/email follow-ups, A2P-compliant phone systems, and AI booking workflows tailored to how your business sells.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  <Workflow className="h-4 w-4" />
                  Book a 15-Minute CRM Audit
                </Link>
                <Link
                  href="/solutions/gohighlevel-implementation"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-white px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-surface-sunken"
                >
                  Explore System Specifications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-4 text-xs text-foreground/75">
                Already on GoHighLevel? We audit and rebuild messy sub-accounts without breaking your live campaigns.
              </p>
            </div>

            {/* Platform Integration Highlights */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border/80 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">A2P 10DLC Telephony</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">Carrier-Approved SMS</p>
                <p className="mt-1 text-xs text-foreground/75">Full brand registration preventing carrier spam filtering.</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">Speed to Lead Automation</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">&lt; 60s Text-Back</p>
                <p className="mt-1 text-xs text-foreground/75">Instant conversational recovery on missed phone calls.</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">Synced Calendars</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">Automated Bookings</p>
                <p className="mt-1 text-xs text-foreground/75">Round-robin calendar sync with zero double-bookings.</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-white p-4 shadow-xs">
                <span className="text-xs font-semibold text-brand">Fast Turnaround</span>
                <p className="mt-1 font-display text-base font-semibold text-foreground">7 Business Days</p>
                <p className="mt-1 text-xs text-foreground/75">Turnkey configuration, testing, and team handover.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE BOTTLENECK (PROBLEM AGITATION) */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Systemic bottlenecks
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Why Most GoHighLevel Accounts Fail to Generate ROI
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                Buying the software is easy; configuring the backend logic so leads never slip through the cracks is where teams get stuck.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <ShieldCheck className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Unverified SMS &amp; Blocked Messages
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Without proper A2P 10DLC brand and campaign registration, mobile carriers filter out your automated follow-up texts before prospects ever see them.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Clock className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Slow Speed-to-Lead
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Leads submitted from Meta Ads, Google Ads, or website forms sit untouched for hours while sales reps manually update spreadsheets or fragmented tabs.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Database className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Cluttered Pipelines &amp; Dead Workflows
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Generic snapshots leave your team guessing which stage a deal is in, leading to missed follow-ups, untracked quotes, and unbilled invoices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE BUILD */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Comprehensive implementation
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                End-to-End CRM Architecture Done for You
              </h2>
              <p className="mt-3 text-sm text-foreground/75 md:text-base">
                We design, configure, and stress-test five integrated layers inside your GoHighLevel instance.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  Sales Pipelines
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  Custom Sales Pipelines &amp; Lead Routing
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Stage-by-stage deal tracking with automated round-robin rep assignment, lead scoring based on engagement, and instant Slack or SMS alerts when high-intent prospects reply.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  Speed to Lead
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  Speed-to-Lead &amp; Missed-Call Text-Back
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Under-60-second automated SMS, email, and voicemail drops triggered the moment a form is submitted or an inbound phone call goes unanswered on the job.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  A2P 10DLC and Phone Setup
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  LC Phone &amp; A2P 10DLC Compliance
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Complete phone number provisioning, call recording setup, and carrier compliance registration so your outbound texts achieve maximum inboxing deliverability.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <span className="text-xs font-semibold text-brand">
                  Conversation AI and Booking
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  Conversation AI &amp; Smart Booking
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Trained AI chat agents across SMS, web chat, Instagram, and Facebook Messenger that qualify prospects and book directly onto synced Google or Outlook calendars with automated no-show reminders.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6 lg:col-span-2">
                <span className="text-xs font-semibold text-brand">
                  Snapshots and External APIs
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  Custom Agency Snapshots &amp; Integrations
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Reusable account templates for multi-location businesses or marketing agencies, plus custom webhook and REST API connections to n8n, QuickBooks Online, Stripe, and external SQL databases.
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
                Implementation roadmap
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Live, Tested, and Documented in 7 Business Days
              </h2>
              <p className="mt-3 text-sm text-foreground/75 md:text-base">
                Our structured delivery framework eliminates downtime, prevents lost customer data, and guarantees rapid adoption.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Days 1 to 2
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Funnel &amp; Pipeline Blueprint
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We map your inbound lead sources, sales stages, team roles, and communication rules before touching a single workflow trigger.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Days 3 to 5
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Custom Build &amp; Data Migration
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We configure your pipelines, workflows, calendars, forms, and A2P registration, and migrate your existing contacts cleanly from HubSpot, Pipedrive, or spreadsheets.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Days 6 to 7
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Live Testing &amp; Team Handover
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We run end-to-end test leads through every automation branch and provide recorded video SOP walkthroughs so your team can operate the system with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: BUYER FAQ ACCORDION */}
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
                Practical answers to the most common setup and migration questions for GoHighLevel implementations.
              </p>
            </div>

            <div className="mt-8">
              <FAQAccordion items={faqItems} defaultOpenIndex={0} />
            </div>
          </div>
        </section>

        {/* SECTION 6: BOTTOM CONVERSION BANNER */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl saas-grid-bg border border-brand/30 bg-foreground px-6 py-12 text-white md:px-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Ready to Turn GoHighLevel Into Your Growth Engine?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Book a 15-minute audit call to map out a custom CRM and automation blueprint for your business.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-deep transition-colors"
                >
                  Book Your Free CRM Audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  View Fixed Pricing Tiers
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
