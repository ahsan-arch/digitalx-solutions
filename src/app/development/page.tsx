import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Database, HelpCircle, Layers, ShieldCheck, Terminal } from "lucide-react";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/seo";
import { developmentServices } from "@/data/development-services";

export const metadata: Metadata = {
  title: "Custom AI & Automation Development | DigitalX",
  description:
    "Explore custom CRM development, API and webhook integrations, AI agent development, and white-label CRM platforms engineered by DigitalX Solutions.",
  alternates: {
    canonical: `${siteConfig.domain}/development`,
  },
};

const developmentFaqs = [
  {
    question: "How does DigitalX differ from traditional custom software development agencies?",
    answer:
      "Traditional agencies build everything from scratch, which inflates budgets to six figures and takes 6 to 12 months. We use a high-leverage hybrid model: we build bespoke Next.js frontends and custom database logic on top of battle-tested automation cores (GoHighLevel, n8n, and HubSpot APIs). This delivers fully custom functionality at a fraction of the cost, usually shipping in 3 to 6 weeks.",
  },
  {
    question: "Do we own the intellectual property and code for our custom build?",
    answer:
      "Yes, 100%. All custom code, database schemas, API connectors, and automation workflows are deployed directly into your own cloud accounts (Vercel, AWS, Supabase, GitHub). You have complete intellectual property ownership with zero vendor lock-in.",
  },
  {
    question: "What technology stack do you use for custom web development and AI middleware?",
    answer:
      "Our core engineering stack comprises Next.js 15 (React 19 App Router), TypeScript, Tailwind CSS, PostgreSQL with Prisma ORM, Redis for high-throughput message queues, and Node.js serverless functions. For AI agents, we leverage LangGraph state machines, Deepgram Nova-2, and ElevenLabs conversational audio streaming.",
  },
  {
    question: "How do you ensure data security and compliance with enterprise systems?",
    answer:
      "All API endpoints implement cryptographic HMAC-SHA256 signature verification, strict TLS encryption, and environment-isolated secrets management. Our systems adhere to Australian Privacy Principles (Privacy Act 1988) and US carrier A2P 10DLC compliance standards.",
  },
];

export default function DevelopmentHubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Development", url: `${siteConfig.domain}/development` },
  ]);

  const faqSchema = generateFAQSchema(developmentFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        <section className="container-shell">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <Code className="h-3.5 w-3.5" />
              Software Engineering &amp; Custom Architecture
            </div>
            <h1 className="font-display text-4xl text-foreground md:text-5xl lg:text-6xl font-semibold leading-tight">
              Custom AI &amp; Automation Development Services
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
              When standard SaaS templates fall short, DigitalX Solutions designs, engineers, and ships bespoke software systems. From custom CRM architectures and resilient API webhook middleware to autonomous tool-calling AI agents and turnkey white-label platforms, our engineering team builds production solutions that scale your operations without technical debt.
            </p>
          </div>
        </section>

        {/* 4 Core Development Service Pillars */}
        <section className="container-shell mt-12 md:mt-16">
          <div className="grid gap-6 md:grid-cols-2">
            {developmentServices.map((service) => (
              <article
                key={service.slug}
                className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 md:p-8 shadow-xs hover:border-brand/40 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-600/20">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Production Architecture
                    </span>
                    <span className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
                      Fixed-Scope Delivery
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-xs font-semibold text-brand">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {service.summary.slice(0, 240)}...
                  </p>

                  <div className="mt-5 border-t border-border/60 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                      Core Stack Components
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {service.architecturalComponents.map((comp) => (
                        <span
                          key={comp}
                          className="rounded-md bg-surface-50 px-2.5 py-0.5 text-[11px] font-medium text-foreground/70 border border-border/60"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <Link
                    href={`/development/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-deep transition-colors"
                  >
                    View Engineering Blueprint <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Technical Standards Callout */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-3xl border border-border bg-surface-50 p-8 md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Reliability First</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-foreground">
                Our Engineering Standards &amp; Principles
              </h2>
              <p className="mt-2 text-sm text-foreground/70 max-w-2xl">
                We engineer software to run quietly in production for years. Here are the non-negotiable architectural benchmarks applied to every codebase we ship.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/80 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand font-bold mb-4">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">Sub-500ms Execution</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                  We optimize webhook endpoints, neural speech models, and database queries for low latency so callers and users experience zero conversational lag.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-bold mb-4">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">Idempotent Pipelines</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                  Every webhook and data sync pipeline implements unique hash keys, ensuring dropped or retried packets never duplicate customer records or payments.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 font-bold mb-4">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">Strict Schema Safety</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                  LLM tool calls are bound by deterministic Zod and Pydantic schemas, eliminating hallucinated function parameters and corrupted database writes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Development FAQs */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-3xl border border-border bg-white p-8 md:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  Frequently Asked Questions About Custom Development
                </h2>
                <p className="text-xs text-foreground/60">
                  Engineering timelines, technology choices, and intellectual property ownership.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {developmentFaqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-border/80 bg-surface-50 p-6">
                  <h3 className="font-display text-base font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/75">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="container-shell mt-16">
          <div className="rounded-3xl bg-foreground p-8 text-center text-white md:p-12">
            <h2 className="font-display text-3xl md:text-4xl">Have a complex technical requirement?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Talk directly with a senior solutions engineer. We will review your existing system architecture and deliver a phased delivery proposal with fixed pricing.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition-colors"
              >
                Schedule an Engineering Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
