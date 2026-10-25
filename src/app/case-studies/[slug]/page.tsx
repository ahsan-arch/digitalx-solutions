import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Cpu,
  Layers,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { clientProjects } from "@/data/facts";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clientProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Case Study Not Found" };
  }

  const title = `${project.client} Automation Case Study | DigitalX`;
  const description = `Discover how ${project.client} deployed automation systems, resulting in ${project.measurableResult}`;

  return {
    title,
    description: description.slice(0, 155),
    alternates: {
      canonical: `${siteConfig.domain}/case-studies/${project.slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 155),
      url: `${siteConfig.domain}/case-studies/${project.slug}`,
      siteName: "DigitalX Solutions",
      type: "article",
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Case Studies", url: `${siteConfig.domain}/case-studies` },
    { name: project.client, url: `${siteConfig.domain}/case-studies/${project.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.client} Automation Architecture & Case Study`,
    description: project.measurableResult,
    author: {
      "@type": "Organization",
      name: "DigitalX Solutions",
      url: siteConfig.domain,
    },
    publisher: {
      "@type": "Organization",
      name: "DigitalX Solutions",
      url: siteConfig.domain,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.domain}/case-studies/${project.slug}`,
    },
  };

  const hasLogoPermission = project.permissionToUseNameAndLogo && project.logoFile;

  return (
    <main className="container-shell py-16 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Link
        href="/case-studies"
        className="mb-8 inline-flex items-center text-sm font-medium text-foreground/60 transition hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all case studies
      </Link>

      {/* Hero Header */}
      <div className="rounded-3xl border border-border bg-surface-50 p-8 md:p-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {project.industry} Case Study
            </span>
            <span className="text-xs text-foreground/40">•</span>
            <span className="text-xs font-medium text-foreground/60">Verified Build</span>
          </div>

          {!project.permissionToUseNameAndLogo && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              [TODO: Client Name Pseudonymised - Written Consent Pending]
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
          <div>
            <h1 className="font-display text-3xl text-foreground md:text-5xl font-bold">
              {project.client}
            </h1>
            <p className="mt-3 text-lg font-medium text-brand">
              {project.measurableResult}
            </p>
          </div>

          {hasLogoPermission ? (
            <div className="relative h-14 w-32 shrink-0">
              <Image
                src={project.logoFile!}
                alt={`${project.client} logo`}
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white border border-border text-brand font-bold">
              <Building2 className="h-7 w-7" />
            </div>
          )}
        </div>

        {/* Executive Summary (< 100 words) */}
        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/50">
            Executive Summary
          </h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg">
            When {project.client} partnered with DigitalX Solutions, they faced operational friction
            in {project.industry.toLowerCase()}: {project.problem.toLowerCase()} We deployed a tailored
            telephony and CRM architecture featuring {project.toolsUsed.join(", ")}, producing{" "}
            {project.measurableResult.toLowerCase()}
          </p>
        </div>

        {/* Core Narrative Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {/* Problem Deep Dive */}
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h2 className="font-display text-xl">The Operational Bottleneck</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">
              {project.problem}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">
              Before implementation, prospective callers were frequently routed to voicemail during peak
              operational windows or after standard trading hours. In service businesses, over 80% of
              callers who reach voicemail hang up immediately and phone a competing provider. This
              silent leak generated massive customer acquisition waste and eroded margins.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>Unanswered inbound inquiries during busy operational windows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>Zero automated follow-up on dropped or missed calls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>Manual, fragmented data entry between telephone and CRM systems</span>
              </li>
            </ul>
          </div>

          {/* Solution & Engineering Architecture */}
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Cpu className="h-5 w-5 text-brand" />
              <h2 className="font-display text-xl">What Was Built &amp; Deployed</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">
              {project.whatWasBuilt}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">
              We engineered a production-grade integration layer that connects inbound telephony streams
              directly to calendar scheduling logic and CRM records. Calls are answered in sub-500ms
              without robotic delay, while conversational SMS triggers instantly capture dropped callers.
            </p>
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                Technology Stack Used:
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-50 px-3 py-1.5 text-xs font-semibold text-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Measurable Impact & Revenue Metrics */}
        <div className="mt-12 rounded-2xl border border-emerald-600/30 bg-emerald-500/5 p-6 md:p-10">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h2 className="font-display text-xl font-bold text-foreground">
              Verified Revenue Outcomes
            </h2>
          </div>
          <p className="mt-3 text-base font-semibold text-emerald-700">
            {project.measurableResult}
          </p>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-foreground/70">
            Performance metrics are continuously logged via executive telemetry dashboards, cross-referencing
            telephony provider call detail records (CDRs) against closed opportunity stages in GoHighLevel.
          </p>
        </div>

        {/* Contextual Internal Links */}
        <div className="mt-14 border-t border-border pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/solutions/ai-voice-receptionists"
              className="text-xs font-semibold text-brand hover:underline"
            >
              Explore AI Voice Receptionists →
            </Link>
            <Link
              href="/solutions/missed-call-text-back"
              className="text-xs font-semibold text-brand hover:underline"
            >
              Explore Missed-Call Text-Back →
            </Link>
            <Link
              href="/solutions/gohighlevel-implementation"
              className="text-xs font-semibold text-brand hover:underline"
            >
              GoHighLevel Implementations →
            </Link>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-deep transition"
          >
            Deploy This Architecture for Your Business
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
