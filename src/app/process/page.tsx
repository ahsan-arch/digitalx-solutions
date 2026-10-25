import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
import { processSteps } from "@/data/redesign";
import { SectionIllustration } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/process", {
  title: "Our 4-Week AI Deployment Process",
  description:
    "From discovery intake to live production, see how we launch custom AI voice agents and GoHighLevel CRM pipelines within an agile 4 to 6 week roadmap.",
});

const detail = [
  {
    week: "Weeks 1 to 2",
    title: "Phase 1: Discovery, Intake Audit & Pipeline Mapping",
    body:
      "We sit on real customer call recordings, audit your intake forms, and map out every leak between your phone lines, lead capture pages, and dispatch scheduling software. We review call transcripts to identify the top 20 questions customers ask, common objections, pricing inquiries, and edge cases. By the end of Week 2, you approve a complete conversational blueprint and technical system architecture.",
  },
  {
    week: "Weeks 2 to 4",
    title: "Phase 2: CRM Architecture, Webhook Integrations & Prompt Tuning",
    body:
      "We configure your GoHighLevel or HubSpot CRM pipelines, custom fields, and booking calendar logic with real-time buffer rules. Next, we write the system prompt for the AI voice agent, defining strict guardrails: exact pricing bounds, service qualification criteria, and polite refusal parameters for out-of-scope inquiries. All webhooks connecting Twilio/Telnyx to n8n and your dispatch CRM (Jobber, ServiceTitan, Cliniko) are deployed with cryptographic signature verification.",
  },
  {
    week: "Week 5",
    title: "Phase 3: Synthetic Stress Testing & Supervised Soft Launch",
    body:
      "Before a single real caller connects to the AI, we execute over 50 synthetic test calls. We test background trade noise (power tools, road traffic), heavy regional accents (Australian regional slang, broad American dialects), conversational interruptions, and intentional prompt injection attempts. Once the agent passes with a 98%+ task completion score, we begin a supervised soft launch during off-peak hours with human operators monitoring live transcripts.",
  },
  {
    week: "Week 6 & Ongoing",
    title: "Phase 4: Full Production Cutover & Continuous Optimization",
    body:
      "We cut over your primary phone line or configure automated conditional call forwarding for busy and unanswered rings. Every week, our team reviews low-confidence transcripts, tunes conversational prompts, and updates your knowledge base as your business expands services. You receive monthly ROI reports detailing call recovery rate, saved staff labor hours, and booked revenue.",
  },
];

const processFaqs = [
  {
    question: "How long does a typical AI voice agent deployment take?",
    answer:
      "A standard single-number AI voice receptionist with GoHighLevel calendar booking and missed-call text back launches in 3 to 4 weeks. Multi-location practices or custom CRM integrations with legacy enterprise databases typically require 4 to 6 weeks from kickoff to full production.",
  },
  {
    question: "What happens if a caller asks a question the AI doesn't know?",
    answer:
      "The agent never hallucinates or guesses facts. When faced with an unknown policy or complex issue, it acknowledges the limitation honestly, collects the caller's preferred callback time and notes, and immediately triggers an SMS alert to your on-call staff or executes a warm SIP transfer to a mobile phone.",
  },
  {
    question: "Do we have to change our existing phone numbers?",
    answer:
      "No. You keep your existing carrier and phone numbers. We set up conditional call forwarding (e.g. forward on busy or no answer after 3 rings) to your dedicated DigitalX AI SIP trunk, ensuring zero disruption to your published business numbers.",
  },
  {
    question: "What access or assets do you need from our team to begin?",
    answer:
      "During kickoff, we need sample call recordings or common FAQs, your service pricing rules, calendar booking availability, and administrative access to your CRM and domain DNS (if configuring custom email and SMS sending subdomains).",
  },
];

const technicalSafeguards = [
  {
    title: "Sub-800ms Latency Budget",
    description:
      "We optimize voice streaming using Deepgram Nova-2 speech-to-text, fast inference LLM models, and ElevenLabs conversational audio streaming over WebSockets. Response delays stay under 800ms, eliminating awkward conversational pauses.",
    icon: Zap,
  },
  {
    title: "10DLC Carrier Verification",
    description:
      "For US clients sending SMS text-backs, we submit and manage the complete A2P 10DLC brand and campaign registration through The Campaign Registry, ensuring 99%+ deliverability without carrier spam blocking.",
    icon: ShieldCheck,
  },
  {
    title: "Fail-Safe Human Escalation",
    description:
      "Every workflow includes an immediate escape hatch. If a caller requests a human operator or expresses urgent distress, the call transfers via SIP trunking to your staff line with a pre-recorded whisper summary.",
    icon: Cpu,
  },
  {
    title: "Idempotent Webhook Queues",
    description:
      "To prevent duplicate appointments or multiple SMS messages sent to the same caller, all webhook payloads pass through an idempotent queue in n8n with deduplication caches.",
    icon: Layers,
  },
];

export default function ProcessPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Process", url: `${siteConfig.domain}/process` },
  ]);

  const faqSchema = generateFAQSchema(processFaqs);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Our Methodology</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              A 4 to 6 week launch, then a system that compounds.
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
              We do not disappear after launch and we do not drown you in theoretical onboarding decks. Every phase has a concrete deliverable
              you can test, measure, and own in your own cloud infrastructure.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration
              src="/illustrations/process.svg"
              alt="DigitalX 4-phase agile methodology for designing and deploying enterprise automations"
              priority
            />
          </div>
        </div>
      </section>

      {/* 4 Steps Overview */}
      <section className="container-shell mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <article
            key={step.title}
            className="rounded-lg border border-line-subtle bg-surface-raised p-6"
          >
            <p className="font-mono text-overline text-accent">Step {i + 1}</p>
            <h2 className="mt-2 font-display text-2xl text-ink-primary">{step.title}</h2>
            <p className="mt-3 text-body-sm text-ink-secondary">{step.description}</p>
          </article>
        ))}
      </section>

      {/* Detailed Phase Breakdown */}
      <section className="container-shell mt-16 space-y-6">
        <div>
          <h2 className="font-display text-display-sm text-ink-primary">What Each Phase Delivers in Practice</h2>
          <p className="mt-2 text-body-sm text-ink-secondary">
            Here is the exact week-by-week engineering roadmap followed for every AI agent and CRM implementation.
          </p>
        </div>
        <div className="grid gap-5">
          {detail.map((d) => (
            <div
              key={d.title}
              className="rounded-lg border border-line-subtle bg-surface-sunken p-6 md:p-8"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-pill bg-accent-soft px-3 py-1 font-mono text-xs font-semibold text-accent">
                  {d.week}
                </span>
              </div>
              <h3 className="mt-3 font-display text-title-lg text-ink-primary">{d.title}</h3>
              <p className="mt-3 text-body leading-relaxed text-ink-secondary">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Standards & Safeguards */}
      <section className="container-shell mt-16">
        <div className="rounded-xl border border-line-subtle bg-surface-raised p-6 md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Quality Assurance</p>
            <h2 className="mt-2 font-display text-display-sm text-ink-primary">
              Engineering Delivery Standards &amp; Rollout Safeguards
            </h2>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Deploying voice automation into production demands rigorous telephony controls to protect your brand reputation.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {technicalSafeguards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deployment Checklist */}
      <section className="container-shell mt-16">
        <div className="rounded-xl border border-line-subtle bg-surface-sunken p-6 md:p-10">
          <h2 className="font-display text-display-sm text-ink-primary">
            Implementation Handover &amp; Deliverables Checklist
          </h2>
          <p className="mt-2 text-body-sm text-ink-secondary">
            At project signoff, your company receives 100% intellectual property ownership of all assets:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm text-ink-secondary">
            <div className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface-raised p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold text-ink-primary">Full CRM Snapshot</p>
                <p className="mt-1 text-xs text-ink-tertiary">All pipelines, custom fields, SMS templates, and automated workflows.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface-raised p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold text-ink-primary">Tuned System Prompts</p>
                <p className="mt-1 text-xs text-ink-tertiary">Documented markdown system prompts and service guardrails.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface-raised p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold text-ink-primary">Carrier &amp; SIP Porting</p>
                <p className="mt-1 text-xs text-ink-tertiary">Direct ownership of all phone numbers, Twilio subaccounts, or Telnyx trunks.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface-raised p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold text-ink-primary">Team Video SOPs</p>
                <p className="mt-1 text-xs text-ink-tertiary">Short Loom video tutorials for your front-desk and dispatchers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface-raised p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold text-ink-primary">Live ROI Dashboard</p>
                <p className="mt-1 text-xs text-ink-tertiary">Real-time tracking of answered calls, booked leads, and recovered revenue.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface-raised p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold text-ink-primary">30-Day Hypercare</p>
                <p className="mt-1 text-xs text-ink-tertiary">Priority engineering support with same-day prompt iterations post-launch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container-shell mt-16">
        <div className="rounded-xl border border-line-subtle bg-surface-raised p-6 md:p-10">
          <h2 className="font-display text-display-sm text-ink-primary">Frequently Asked Questions About Deployment</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {processFaqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
                <h3 className="font-display text-base font-semibold text-ink-primary">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-shell mt-16 rounded-xl bg-surface-inverse p-8 text-center md:p-12">
        <h2 className="font-display text-display-sm text-ink-on-inverse">Ready to map your intake funnel?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-body text-ink-on-inverse/80">
          A 20-minute fit call covers your current intake, the leaks we usually find in your industry, and whether voice automation is worth
          your time at your current volume.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Book a discovery call
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-pill border border-line-subtle bg-white/10 px-6 py-3 text-sm font-semibold text-ink-on-inverse transition hover:bg-white/20"
          >
            Review pricing models
          </Link>
        </div>
      </section>
    </main>
  );
}
