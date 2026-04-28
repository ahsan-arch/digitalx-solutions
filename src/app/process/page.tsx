import type { Metadata } from "next";
import Link from "next/link";
import { processSteps } from "@/data/redesign";
import { SectionIllustration } from "@/components/ui";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/process", {
  title: "Our Process | DigitalX Solutions Engagement Model",
  description:
    "From discovery to ongoing iteration, see how we deploy AI voice, CRM automation, and growth dashboards inside 4 to 6 weeks.",
});

const detail = [
  {
    week: "Weeks 1 to 2",
    title: "Discover & map",
    body:
      "We sit on a few of your calls, audit your current intake, and document every leak between phone, calendar, ads, and CRM.",
  },
  {
    week: "Weeks 2 to 4",
    title: "Build & integrate",
    body:
      "We deploy the GoHighLevel snapshot, tune AI voice prompts to your services, and wire SMS, email, and dashboards into your workflow.",
  },
  {
    week: "Week 5",
    title: "Test & launch",
    body:
      "We run supervised live calls, test failure paths, and train your team. Once everyone is confident, we go live with monitoring.",
  },
  {
    week: "Ongoing",
    title: "Iterate & report",
    body:
      "Monthly reviews of call transcripts, booking rates, and ROI. We tune sequences and prompts as your services and seasonality change.",
  },
];

export default function ProcessPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Process", url: `${siteConfig.domain}/process` },
  ]);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Process</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              A 4 to 6 week launch, then a system that compounds.
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
              We do not disappear after launch and we do not drown you in onboarding decks. Every phase has a deliverable
              you can see, measure, and own.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration src="/illustrations/process.svg" priority />
          </div>
        </div>
      </section>

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

      <section className="container-shell mt-16 space-y-5">
        <h2 className="font-display text-display-sm text-ink-primary">What each phase looks like in practice</h2>
        {detail.map((d) => (
          <div
            key={d.title}
            className="rounded-lg border border-line-subtle bg-surface-sunken p-6 md:p-8"
          >
            <p className="font-mono text-overline text-accent">{d.week}</p>
            <h3 className="mt-2 font-display text-title-lg text-ink-primary">{d.title}</h3>
            <p className="mt-3 text-body text-ink-secondary">{d.body}</p>
          </div>
        ))}
      </section>

      <section className="container-shell mt-16 rounded-lg bg-surface-inverse p-8 md:p-12">
        <h2 className="font-display text-display-sm text-ink-on-inverse">Ready to map your funnel?</h2>
        <p className="mt-3 max-w-2xl text-body text-ink-on-inverse/80">
          A 20-minute fit call covers your current intake, the leaks we usually find, and whether automation is worth
          your time at this stage.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Book a fit call
        </Link>
      </section>
    </main>
  );
}
