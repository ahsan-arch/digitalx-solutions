import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";
import factsData from "@/data/facts";
import { articlesData } from "@/data/insights-articles";

export const metadata: Metadata = generatePageMetadata("/about/team/jazib-shahid", {
  title: "Jazib Shahid – Founder & CEO | DigitalX Solutions",
  description: "Jazib Shahid is Founder & CEO of DigitalX Solutions (founded 2020), specializing in AI voice receptionists, GoHighLevel systems, and n8n automations.",
});

export default function JazibShahidPage() {
  const { founder } = factsData.leadership;
  const coreFocus = ["GoHighLevel", "n8n (Self-Hosted)", "Twilio SIP", "Vapi", "HubSpot API"];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.domain}/about/team/jazib-shahid#person`,
    name: founder.fullName,
    jobTitle: founder.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: factsData.company.legalName,
      url: siteConfig.domain,
    },
    url: `${siteConfig.domain}/about/team/jazib-shahid`,
    description: founder.bio,
    knowsAbout: [
      "AI Voice Receptionists",
      "GoHighLevel CRM Architecture",
      "Self-Hosted n8n Workflow Automation",
      "Twilio & SIP Telephony",
      "Conversational Lead Recovery",
    ],
    sameAs: founder.linkedinUrl ? [founder.linkedinUrl] : [],
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "About", url: `${siteConfig.domain}/about` },
    { name: "Team", url: `${siteConfig.domain}/about` },
    { name: founder.fullName, url: `${siteConfig.domain}/about/team/jazib-shahid` },
  ]);

  const authoredArticles = Object.entries(articlesData)
    .filter(([, a]) => a.authorKey === "jazib" && !a.noindex)
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        <div className="container-shell max-w-4xl">
          <Link
            href="/about"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-brand hover:text-brand-deep transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to About
          </Link>

          {/* Profile Header */}
          <section className="rounded-2xl border border-border/80 bg-white p-8 md:p-12 shadow-xs">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand/10 font-display text-3xl font-bold text-brand border border-brand/20">
                JS
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-50 px-2.5 py-1 text-xs font-medium text-foreground/75">
                  <Shield className="h-3.5 w-3.5 text-brand" />
                  Executive Leadership &bull; Founded 2020
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {founder.fullName}
                </h1>
                <p className="text-base font-medium text-brand">
                  {founder.jobTitle}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6 text-foreground/80 leading-relaxed text-sm md:text-base space-y-4">
              <p>{founder.bio}</p>
              <p>
                Founded DigitalX Solutions in 2020 with the mandate of eliminating repetitive administrative bottlenecks for growing service businesses across Australia and the United States. Directs production deployment standards across telephony SIP routing, multi-location GoHighLevel CRM snapshots, and self-hosted n8n pipelines.
              </p>
            </div>

            {/* Architecture Focus Areas */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-surface-50 p-4">
                <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Core Engineering Stack
                </h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {coreFocus.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/80 bg-white px-2.5 py-1 font-mono text-xs text-foreground/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-surface-50 p-4">
                <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Operational Standards
                </h2>
                <ul className="mt-2 space-y-1.5 text-xs text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Single source of truth configuration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>10DLC A2P SMS registration &amp; compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Carrier pass-through rate transparency</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Connect CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-deep transition-colors"
              >
                Schedule Architecture Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              {founder.linkedinUrl && (
                <a
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface-50 transition-colors"
                >
                  Connect on LinkedIn &rarr;
                </a>
              )}
            </div>
          </section>

          {/* Authored Insights */}
          {authoredArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold text-foreground">
                Technical Field Notes by {founder.fullName}
              </h2>
              <div className="mt-4 grid gap-4">
                {authoredArticles.map(([slug, a]) => (
                  <Link
                    key={slug}
                    href={`/insights/${slug}`}
                    className="group block rounded-xl border border-border/70 bg-white p-5 transition hover:border-brand/40"
                  >
                    <div className="font-mono text-xs text-foreground/75">
                      {new Date(a.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-foreground group-hover:text-brand transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/75 leading-relaxed line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
