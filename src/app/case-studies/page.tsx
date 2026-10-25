import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { clientProjects } from "@/data/facts";
import { ProjectCard } from "@/components/ui/project-card";
import { CertifiedPartnerStrip } from "@/components/ui/partner-strip";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/case-studies", {
  title: "AI Voice & CRM Automation Case Studies",
  description:
    "Explore real client case studies and revenue outcomes across AI voice receptionists, GoHighLevel setups, and workflow automations in the US and Australia.",
});

export default function CaseStudiesIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Case Studies", url: `${siteConfig.domain}/case-studies` },
  ]);

  const itemListSchema = generateItemListSchema(
    "DigitalX Solutions Case Studies & Engineering Outcomes",
    clientProjects.map((p) => ({
      name: `${p.client} — ${p.industry}`,
      url: `${siteConfig.domain}/case-studies/${p.slug}`,
      description: p.measurableResult,
    }))
  );

  return (
    <main className="pb-24 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Header */}
      <section className="container-shell">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">
            Verified Engineering Outcomes
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">
            Real automation deployments. Measurable revenue recovered.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
            We don&apos;t pitch hypothetical AI theories. Below are real-world operational builds
            engineered for trade contractors, healthcare practices, and professional service operators
            across Australia and the United States.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-foreground/60">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Strict Client Verification Policy: Zero invented metrics, testimonials, or unauthorized logos.</span>
          </div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="container-shell mt-10">
        <CertifiedPartnerStrip />
      </section>

      {/* Project Cards Grid */}
      <section className="container-shell mt-14">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">
              Featured Client Deployments
            </h2>
            <p className="mt-1 text-sm text-foreground/70">
              Detailed problem audits, technical architectures, and verified operational results.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {clientProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Methodology & Verification Standards */}
      <section className="container-shell mt-20">
        <div className="rounded-3xl border border-border bg-surface-50 p-8 md:p-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Our Measurement Framework
            </p>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-4xl">
              How we calculate and verify automation ROI
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75 md:text-base">
              Every client engagement begins with a telemetry audit before any workflow or telephony
              stream is deployed. We measure three baseline variables over a 14-day pre-launch window:
              unanswered inbound call volume, average speed-to-lead on ad clicks or web inquiries, and
              opportunity drop-off rate between quote generation and deal closure.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Metric 01</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                Inbound Call Capture Rate
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                Tracking every unanswered call across business hours and after-hours shifts. We benchmark
                instant sub-500ms AI pick-up against legacy voicemail abandonment rates.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Metric 02</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                Speed-to-Lead &amp; Recovery
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                Measuring conversational response times on paid Meta Ads and missed calls. Deploying
                automated SMS text-back in under 30 seconds to lock leads before they dial competitors.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Metric 03</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                Closed-Won Pipeline Value
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                Connecting CRM deal stages directly to accounting software (Xero and QuickBooks) to verify
                actual collected revenue rather than projected vanity metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-shell mt-20">
        <div className="rounded-3xl border border-border bg-foreground px-6 py-14 text-center text-white md:px-12">
          <h2 className="font-display text-3xl md:text-4xl">
            Want to see how these systems apply to your business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            Book an engineering consultation. We will audit your current missed call volume, map your
            customer intake workflows, and project your 90-day recovered revenue model.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-deep transition"
            >
              Book a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/try-voice-agent"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              Test Live Voice Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
