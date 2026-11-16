import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ExternalLink, Linkedin, ShieldCheck, Terminal, Award, BookOpen, Layers } from "lucide-react";
import factsData from "@/data/facts";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

type TeamMember = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  fullBio: string[];
  linkedin: string;
  skills: string[];
  certifications: string[];
  reviewedSolutions: { title: string; href: string }[];
  authoredArticles: { title: string; href: string }[];
};

const teamMembers: Record<string, TeamMember> = {
  "ahsan-architect": {
    slug: "ahsan-architect",
    name: "Ahsan Architect",
    role: "Founder & Lead Solutions Engineer",
    tagline: "Full-stack systems architect specializing in high-concurrency telephony backends and automated revenue operations.",
    bio: factsData.leadership.founder.bio,
    fullBio: [
      "Ahsan Architect is the founder and lead systems architect at DigitalX Solutions. With over eight years of hands-on experience in telecommunications infrastructure, enterprise CRM customization, and autonomous voice orchestration, Ahsan designs and audits mission-critical intake pipelines for service contractors, healthcare clinics, and advisory practices across Australia and North America.",
      "His technical expertise centers on bridging legacy telephony interfaces (PSTN, SIP trunks, carrier forwarding) with low-latency neural intelligence layers. By orchestrating Deepgram Nova-2 speech-to-text models, ultra-low latency large language model reasoning, and ElevenLabs streaming synthesis over WebRTC pipelines, he builds conversational intake engines that reliably achieve fast, natural voice turnaround latencies.",
      "Prior to establishing DigitalX Solutions in Casula, NSW, Ahsan architected automated sales pipelines, webhook routing middleware, and custom GoHighLevel CRM snapshots for high-growth commercial service providers. He advocates strictly for transparent operational metrics, zero vendor lock-in, and self-hosted automation infrastructure (utilizing n8n and PostgreSQL) to eliminate recurring software tax.",
      "In his day-to-day engineering leadership, Ahsan focuses on deterministic latency profiling across global carrier routes. Every telephony deployment undergoes rigorous jitter buffer testing, acoustic echo cancellation tuning, and carrier-grade SIP trunk failover simulations. This disciplined approach guarantees that inbound callers experience natural conversational cadence without audible packet degradation or conversational collisions, even during sudden regional peak call spikes.",
      "Under his architectural direction, DigitalX Solutions rejects black-box automation dependencies. Ahsan prioritizes composable event-driven architectures where client data ownership is paramount. By enforcing strict separation between conversational intelligence layers and core business records, every client deployment maintains localized cryptographic key isolation, automated database rollbacks, and tamper-resistant transaction logging compliant with modern Australian and North American enterprise regulatory frameworks.",
      "His evaluation framework for automation readiness balances engineering feasibility against demonstrable unit economics. Rather than deploying artificial intelligence for its own sake, Ahsan mandates that every voice agent, webhook middleware bridge, and CRM snapshot addresses a quantified operational bottleneck—such as uncaptured after-hours emergency calls or repetitive manual calendar dispatching—ensuring that clients capture measurable operational velocity from day one.",
      "At DigitalX Solutions, Ahsan directly oversees technical architecture reviews, telephony compliance auditing under Australian and US telecommunications law, and the continuous quality assurance of production conversational agents."
    ],
    linkedin: factsData.leadership.founder.linkedinUrl,
    skills: [
      "Low-Latency SIP Trunking & WebRTC Audio Gateways",
      "Streaming Speech-to-Text (Deepgram Nova-2) & Neural TTS",
      "Self-Hosted Workflow Orchestration (n8n, Docker, PostgreSQL)",
      "GoHighLevel (GHL) Enterprise Snapshots & Two-Way SMS",
      "HubSpot CRM & Multi-Touch Attribution Synchronization",
      "10DLC A2P Carrier Compliance & Telecommunications Law",
      "RESTful API & High-Throughput Webhook Architecture"
    ],
    certifications: [
      "GoHighLevel Agency Partner (Platform Architecture)",
      "n8n Workflow Partner & Community Creator",
      "HubSpot Solutions Partner Ecosystem Member",
      "Twilio Communications & SIP Trunking Engineering Specialist"
    ],
    reviewedSolutions: [
      { title: "24/7 AI Voice Receptionists Architecture", href: "/solutions/ai-voice-agents" },
      { title: "Automated Missed-Call Text-Back Engineering", href: "/solutions/missed-call-text-back" },
      { title: "Turnkey GoHighLevel Implementation Blueprint", href: "/solutions/gohighlevel-implementation" },
      { title: "Self-Hosted n8n Workflow Automation Architecture", href: "/solutions/n8n-workflow-automation" }
    ],
    authoredArticles: [
      { title: "AI Voice Agent Pricing: Transparent Setup & Per-Minute Breakdown", href: "/insights/ai-voice-agent-pricing" },
      { title: "n8n vs Zapier vs Make: Workflow Automation Agency Comparison", href: "/insights/n8n-vs-zapier-vs-make" },
      { title: "AI Call Recording Laws in Australia and the US: Complete Compliance Guide", href: "/insights/ai-call-recording-laws-australia-us" },
      { title: "What is an AI Voice Agent? Architecture, Latency & How It Works", href: "/insights/what-is-an-ai-voice-agent" }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(teamMembers).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const member = teamMembers[resolvedParams.slug];

  if (!member) return { title: "Team Member Not Found" };

  return generatePageMetadata(`/about/team/${member.slug}`, {
    title: `${member.name} | ${member.role}`,
    description: member.tagline,
  });
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const member = teamMembers[resolvedParams.slug];

  if (!member) {
    notFound();
  }

  const url = `${siteConfig.domain}/about/team/${member.slug}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "About", url: `${siteConfig.domain}/about` },
    { name: "Team", url: `${siteConfig.domain}/about#leadership` },
    { name: member.name, url },
  ]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url,
    sameAs: [member.linkedin],
    worksFor: {
      "@type": "Organization",
      name: factsData.company.name,
      url: siteConfig.domain,
    },
    knowsAbout: member.skills,
    address: {
      "@type": "PostalAddress",
      streetAddress: factsData.company.headquarters.streetAddress,
      addressLocality: factsData.company.headquarters.addressLocality,
      addressRegion: factsData.company.headquarters.addressRegion,
      postalCode: factsData.company.headquarters.postalCode,
      addressCountry: factsData.company.headquarters.addressCountry,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        <div className="container-shell max-w-4xl">
          {/* Breadcrumb back */}
          <Link
            href="/about"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-foreground/60 transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to About &amp; Engineering Team
          </Link>

          {/* Member Card */}
          <section className="rounded-3xl border border-border bg-white p-8 md:p-12 shadow-xs">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-white shadow-md">
                  AA
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                      {member.name}
                    </h1>
                  </div>
                  <p className="mt-1 font-mono text-sm font-semibold text-brand">
                    {member.role}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground/60">
                    DigitalX Solutions • Casula NSW, Australia
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface-50 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface-100 hover:text-brand"
                >
                  <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600/20 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Verified Reviewer</span>
                </span>
              </div>
            </div>

            {/* Sub-tagline */}
            <p className="mt-6 border-y border-border/60 py-4 text-sm font-medium leading-relaxed text-foreground/85">
              {member.tagline}
            </p>

            {/* Biographical Narrative */}
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-foreground/75">
              <h2 className="font-display text-xl font-bold text-foreground">
                Engineering Background &amp; Architecture Philosophy
              </h2>
              {member.fullBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Architecture Standards */}
            <div className="mt-10 border-t border-border/60 pt-8">
              <h2 className="font-display text-lg font-bold text-foreground">
                Telephony Architecture &amp; Auditing Standards
              </h2>
              <p className="mt-1 text-xs text-foreground/60">
                Core technical design principles enforced across all voice agent and CRM infrastructure builds.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-surface-50 p-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                    Fast Natural Pacing
                  </h3>
                  <p className="mt-1.5 text-xs text-foreground/75">
                    Rigorous acoustic pipeline profiling across WebRTC audio transport, streaming speech recognition, and token synthesis to ensure natural conversational pacing.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-surface-50 p-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                    Zero Data Loss Queues
                  </h3>
                  <p className="mt-1.5 text-xs text-foreground/75">
                    High-throughput webhook buffering using Redis queues, exponential backoff retries, and strict schema validation to prevent missing inbound leads.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-surface-50 p-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                    Multi-Jurisdiction Compliance
                  </h3>
                  <p className="mt-1.5 text-xs text-foreground/75">
                    Architectural pre-call synthetic disclosures, two-party recording consent routing, and 10DLC carrier registrations for complete legal compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Technical Capabilities */}
            <div className="mt-10 border-t border-border/60 pt-8">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                <Terminal className="h-4 w-4 text-brand" />
                Technical Competencies &amp; Infrastructure Specializations
              </h2>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {member.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-start gap-2 rounded-xl border border-border/70 bg-surface-50/70 p-3 text-xs font-medium text-foreground/80"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications and Accreditations */}
            <div className="mt-10 border-t border-border/60 pt-8">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                <Award className="h-4 w-4 text-brand" />
                Partner Credentials &amp; Certifications
              </h2>
              <ul className="mt-4 space-y-2 text-xs text-foreground/80">
                {member.certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviewed Architectural Blueprints */}
            <div className="mt-10 border-t border-border/60 pt-8">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                <Layers className="h-4 w-4 text-brand" />
                Systems Architectures Reviewed &amp; Approved
              </h2>
              <p className="mt-1 text-xs text-foreground/60">
                Production architecture blueprints audited for telephony redundancy, latency budgets, and compliance.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {member.reviewedSolutions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between rounded-xl border border-border/80 bg-surface-50 p-3.5 text-xs font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-white"
                  >
                    <span>{item.title}</span>
                    <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Authored Engineering Insights */}
            <div className="mt-10 border-t border-border/60 pt-8">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                <BookOpen className="h-4 w-4 text-brand" />
                Authored Telephony &amp; Automation Guides
              </h2>
              <div className="mt-4 space-y-2.5">
                {member.authoredArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group flex items-center justify-between rounded-xl border border-border/70 p-3 text-xs font-medium text-foreground/80 transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <span>{article.title}</span>
                    <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

