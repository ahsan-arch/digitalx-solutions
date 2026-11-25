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
  HelpCircle,
  PhoneCall,
  Clock,
} from "lucide-react";
import { clientProjects } from "@/data/facts";
import { CaseStudyUiVisual } from "@/components/case-studies/case-study-ui-visual";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clientProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);

  const caseStudyDescriptions: Record<string, string> = {
    "dental-clinic":
      "See how a metropolitan dental practice captured after-hours patient calls and streamlined appointment bookings using DigitalX AI voice receptionist agents.",
    "plumbing-contractor":
      "See how a commercial plumbing contractor recovered after-hours emergency calls using 24/7 AI voice triage and automated missed-call text-back workflows.",
    "advisory-practice":
      "See how an accounting and advisory practice automated client qualification, intake triage, and calendar bookings with custom GoHighLevel CRM workflows.",
    "hybrid-field-service-crm":
      "Illustrative Next.js & PostgreSQL custom CRM architecture replacing per-seat SaaS CRM licenses with GoHighLevel API and Twilio SIP sync.",
    "healthcare-patient-portal-crm":
      "Illustrative Next.js, PostgreSQL, and Cliniko two-way CRM portal architecture modeling licensing reduction and clean multi-clinic RBAC.",
  };

  if (!project) {
    return {
      title: "Case Study Not Found | DigitalX Solutions",
      description:
        "Explore real-world automation deployments, AI voice receptionists, and GoHighLevel CRM architectures engineered for service businesses across the US & AU.",
    };
  }

  const caseStudyTitles: Record<string, string> = {
    "dental-clinic": "Dental Clinic AI Voice Receptionist Case Study",
    "plumbing-contractor": "Plumbing Contractor Emergency Call & Text-Back Case Study",
    "advisory-practice": "Advisory Practice CRM & Intake Automation Case Study",
    "hybrid-field-service-crm": "Hybrid Custom CRM Case Study: Trade & Field Services",
    "healthcare-patient-portal-crm": "Healthcare Custom CRM & Patient Portal Case Study",
  };
  const title = caseStudyTitles[project.slug] || `${project.industry} Case Study`;
  const description =
    caseStudyDescriptions[project.slug] ||
    `Discover how this ${project.industry.toLowerCase()} deployed 24/7 voice automation and CRM systems across Australia and the US.`;

  const ogUrl = `/api/og?${new URLSearchParams({ title }).toString()}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/case-studies/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain}/case-studies/${project.slug}`,
      siteName: "DigitalX Solutions",
      type: "article",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  const caseStudyTitles: Record<string, string> = {
    "dental-clinic": "Dental Clinic AI Voice Receptionist Case Study",
    "plumbing-contractor": "Plumbing Contractor Emergency Call & Text-Back Case Study",
    "advisory-practice": "Advisory Practice CRM & Intake Automation Case Study",
    "hybrid-field-service-crm": "Hybrid Custom CRM Case Study: Trade & Field Services",
    "healthcare-patient-portal-crm": "Healthcare Custom CRM & Patient Portal Case Study",
  };

  const caseStudyFaqs = [
    {
      question: "How long did it take to build and deploy this automation system?",
      answer:
        "The complete engagement from initial intake discovery to full production cutover was delivered in 4 weeks. This included conversational prompt engineering, telephony SIP configuration, calendar booking logic, and comprehensive synthetic stress testing.",
    },
    {
      question: "What happened when a customer had an emergency or complex question?",
      answer:
        "The system was configured with a strict human escalation protocol. If a caller reported an emergency, expressed distress, or asked about out-of-scope policies, the call immediately bridged via warm SIP transfer to the on-call staff mobile phone with a 5-second private audio summary.",
    },
    {
      question: "How was the operational outcome measured?",
      answer:
        "We connected GoHighLevel opportunity pipelines directly to accounting and payment records. Every recovered call and booked appointment was tagged with a unique campaign ID, allowing exact tracking of settled invoices and booked revenue.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Case Studies", url: `${siteConfig.domain}/case-studies` },
    { name: project.client, url: `${siteConfig.domain}/case-studies/${project.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudyTitles[project.slug] || `${project.industry} Case Study`,
    description: project.measurableResult,
    datePublished: "2026-11-11T00:00:00.000Z",
    dateModified: "2026-11-25T00:00:00.000Z",
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

  const faqSchema = generateFAQSchema(caseStudyFaqs);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Link
        href="/case-studies"
        className="mb-8 inline-flex items-center text-sm font-medium text-foreground/75 transition hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all case studies
      </Link>

      {/* Hero Header */}
      <div className="rounded-3xl border border-border bg-surface-50 p-8 md:p-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-medium text-brand">
              {project.industry} Case Study
            </span>
            <span className="text-xs text-foreground/40">•</span>
            <span className="text-xs font-medium text-foreground/75">Production Architecture</span>
          </div>

          <span className="text-xs font-medium text-foreground/50">
            Case Study
          </span>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
          <div>
            <h1 className="font-display text-3xl text-foreground md:text-5xl font-bold">
              {caseStudyTitles[project.slug] || `${project.industry} Case Study`}
            </h1>
            <p className="mt-2 text-sm text-foreground/75">
              {project.client} &mdash; {project.industry}
            </p>
            <p className="mt-3 text-lg font-medium text-brand">
              {project.measurableResult}
            </p>
          </div>

          {hasLogoPermission ? (
            <div className="flex h-14 w-32 shrink-0 items-center">
              <Image
                src={project.logoFile!}
                alt={`${project.client} logo`}
                width={128}
                height={56}
                className="max-h-14 w-auto object-contain"
                style={{ maxHeight: "56px", width: "auto" }}
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
          <h2 className="font-mono text-xs font-medium text-foreground/75">
            Executive Summary
          </h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg">
            When the operator partnered with DigitalX Solutions, they faced operational friction
            in {project.industry.toLowerCase()}: {project.problem.toLowerCase()} We deployed a tailored
            architecture featuring {project.toolsUsed.join(", ")}, producing{" "}
            {project.measurableResult.toLowerCase()}
          </p>
        </div>

        {/* Dedicated UI Visual & Before/After Architecture when available */}
        {"roiStats" in project && project.roiStats && "beforeStack" in project && project.beforeStack && "afterStack" in project && project.afterStack && (
          <div className="mt-10">
            <CaseStudyUiVisual
              title={`${project.industry} — Architecture Overview`}
              mediaPath={"mediaPath" in project ? (project.mediaPath as string) : ""}
              expectedAssetPath={
                (project as { expectedAssetPath?: string }).expectedAssetPath ||
                `public/images/case-studies/${project.slug}.webp`
              }
              sourceLabel={"source" in project ? (project.source as string) : "Illustrative estimate"}
              calculationInputs={"calculationInputs" in project ? (project.calculationInputs as string) : undefined}
              beforeStack={project.beforeStack as string[]}
              afterStack={project.afterStack as string[]}
              stats={project.roiStats as { label: string; value: string }[]}
            />
          </div>
        )}

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
              directly to calendar scheduling logic and CRM records. Calls are answered with fast, natural responses
              without robotic delay, while conversational SMS triggers instantly capture dropped callers.
            </p>
            <div className="mt-6">
              <h3 className="font-mono text-xs font-medium text-foreground/70">
                Technology Stack Deployed:
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
              Modeled &amp; Operational Outcomes
            </h2>
          </div>
          <p className="mt-3 text-base font-semibold text-emerald-700">
            {project.measurableResult}
          </p>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-foreground/75">
            Every workflow tracks call detail records, missed-call SMS recovery latency, and opportunity stage updates cleanly inside client-owned CRM databases. Explore our live demo or book an engineering review to model exact scope for your team.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white hover:bg-brand-deep transition"
            >
              Book a strategy call
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/try-voice-agent"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-surface-100 transition"
            >
              Hear a live AI demo
            </Link>
          </div>
        </div>

        {/* Delivery Timeline & Safeguards */}
        <div className="mt-12 rounded-2xl border border-border bg-white p-6 md:p-10">
          <div className="flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-brand" />
            <h2 className="font-display text-xl font-bold text-foreground">
              Implementation Timeline &amp; Technical Safeguards
            </h2>
          </div>
          <p className="mt-2 text-xs text-foreground/70">
            How this system was staged, stress-tested, and cut over to live production without downtime:
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3 text-xs text-foreground/75">
            <div className="rounded-xl border border-border bg-surface-50 p-4">
              <span className="text-xs font-semibold text-brand">Weeks 1 to 2</span>
              <h3 className="mt-1 font-semibold text-foreground text-sm">Discovery &amp; Blueprint</h3>
              <p className="mt-2 leading-relaxed">
                Audited historical call logs, documented frequent customer objections, and mapped out custom appointment booking availability rules.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-50 p-4">
              <span className="text-xs font-semibold text-brand">Week 3</span>
              <h3 className="mt-1 font-semibold text-foreground text-sm">Prompt Tuning &amp; SIP Wiring</h3>
              <p className="mt-2 leading-relaxed">
                Tuned conversational prompts on Deepgram and ElevenLabs, verified 10DLC SMS registration, and wired two-way webhooks to the CRM.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-50 p-4">
              <span className="text-xs font-semibold text-brand">Week 4</span>
              <h3 className="mt-1 font-semibold text-foreground text-sm">50 Synthetic Calls &amp; Launch</h3>
              <p className="mt-2 leading-relaxed">
                Ran 50 simulated calls testing background noise and regional accents. Conducted supervised live testing before full 24/7 cutover.
              </p>
            </div>
          </div>
        </div>

        {/* Case Study FAQs */}
        <div className="mt-12 rounded-2xl border border-border bg-surface-50 p-6 md:p-10">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="h-5 w-5 text-brand" />
            <h2 className="font-display text-xl font-bold text-foreground">
              Frequently Asked Questions About This Build
            </h2>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {caseStudyFaqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border bg-white p-5">
                <h3 className="font-semibold text-foreground text-sm">{faq.question}</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Internal Links */}
        <div className="mt-14 border-t border-border pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/solutions/ai-voice-agents"
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
