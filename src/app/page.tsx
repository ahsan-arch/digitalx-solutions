import Link from "next/link";
import { ArrowRight, PhoneCall, MessageSquare, Database, Clock, ChevronRight } from "lucide-react";
import { generateBreadcrumbSchema, geoHreflangLanguages, siteConfig } from "@/lib/seo";
import { HeroPreviewTabs, TiltCard, CertifiedPartnerStrip, ProjectCard, AudioCallPreview, FAQAccordion } from "@/components/ui";
import { FeaturedBuildsShowcase } from "@/components/projects/featured-builds-showcase";
import { MagneticButton, AnimatedCounter, StaggerGrid, StaggerGridItem, SpotlightCard } from "@/components/motion";
import { heroMetrics, processSteps, solutions } from "@/data/redesign";
import { industryCategories } from "@/data/industries";
import factsData from "@/data/facts";

export const metadata = {
  title: "Custom CRM Development & AI Automation | DigitalX Solutions",
  description:
    "Custom CRM development, Next.js web portals, and 24/7 AI voice receptionists serving Australian and US businesses with zero per-seat fees.",
  alternates: {
    canonical: siteConfig.domain,
    languages: geoHreflangLanguages,
  },
  openGraph: {
    title: "Custom CRM Development & AI Automation | DigitalX Solutions",
    description:
      "Custom CRM development, Next.js web portals, and 24/7 AI voice receptionists serving Australian and US businesses with zero per-seat fees.",
    url: siteConfig.domain,
    siteName: "DigitalX Solutions",
    type: "website",
    images: [
      {
        url: "/api/og?title=Custom+CRM+Development+%26+AI+Automation",
        width: 1200,
        height: 630,
        alt: "Custom CRM Development & AI Automation | DigitalX Solutions",
        type: "image/png",
      },
    ],
  },
};

const homeFaqs = [
  {
    question: "How fast does the AI answering agent answer incoming calls?",
    answer:
      "Our AI Voice Receptionists deliver fast, natural responses with no robotic pause or delay, answering calls 24/7.",
  },
  {
    question: "Does this AI integrate with existing CRMs?",
    answer:
      "Yes. We specialize in custom GoHighLevel CRM setup and integrate directly with ServiceTitan, HubSpot, and Google Calendar via webhooks and API. Client records, appointment bookings, and full transcripts update automatically.",
  },
  {
    question: "Can the voice agents handle phone number forwarding?",
    answer:
      "Yes, through carriers and Twilio, we connect existing US and Australian numbers, meaning your business can use our services without needing any complex forwarding steps.",
  },
  {
    question: "How does the missed-call lead recovery work?",
    answer:
      "If you are busy on the line, our automated missed-call text back system sends an instant text to the missed caller in under 60 seconds to triage, recover, and schedule the lead.",
  },
];

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
  ]);

  const homeGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": `${siteConfig.domain}/#organization`,
        name: "DigitalX Solutions",
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/icon.svg`,
        image: `${siteConfig.domain}/api/og`,
        telephone: "+61 451 413 786",
        email: "info@digitalx-solutions.com",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Australia",
          },
          {
            "@type": "Country",
            name: "United States",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/digitalx-solutions-aus/",
          "https://www.facebook.com/people/Digitalx-solutions/61588252343955/",
          "https://www.instagram.com/digitalx_solutions/",
          "https://github.com/digitalx-solutions",
          "https://clutch.co/profile/digitalx-solutions",
          "https://www.crunchbase.com/organization/digitalx-solutions",
          "https://www.trustpilot.com/review/digitalx-solutions.com",
          "https://community.n8n.io/u/digitalx_solutions",
          "https://www.producthunt.com/@digitalx_solutions",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: homeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraphSchema) }}
      />

      <main id="main" className="pb-24">
        {/* SECTION 1: HERO */}
        <section className="container-shell pt-10 md:pt-14">
          <div className="saas-grid-bg relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b111e]/90 px-6 py-10 shadow-[0_24px_64px_-20px_rgba(2,6,23,0.9)] backdrop-blur-md md:px-10 md:py-14">
            <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-md border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Custom software, voice telephony &amp; revenue automation
                </p>
                <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-white md:text-5xl font-semibold">
                  Custom CRM Development &amp; AI Revenue Operations
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                  DigitalX Solutions architects bespoke Next.js and PostgreSQL custom CRM systems with 100% IP ownership and zero per-seat fees. We engineer 24/7 AI voice receptionists, under-60-second missed-call recovery, and self-hosted n8n workflow pipelines directly into your core operational database across Australia and the United States.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MagneticButton>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-4px_rgba(37,99,235,0.65)] transition-colors hover:bg-brand-deep"
                    >
                      Book a strategy call
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </MagneticButton>
                  <Link
                    href="/try-voice-agent"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-400/35 hover:bg-white/10"
                  >
                    <PhoneCall className="h-4 w-4 text-cyan-400" />
                    Hear a live AI demo
                  </Link>
                </div>
              </div>

              <div className="relative">
                <HeroPreviewTabs />
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-[#070a11]/80 p-4 backdrop-blur-sm">
                <p className="font-mono text-2xl font-semibold tabular-nums text-white">
                  $<AnimatedCounter value={0} /> Per-Seat
                </p>
                <p className="mt-1 text-sm text-slate-400">100% Owned source code &amp; IP</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#070a11]/80 p-4 backdrop-blur-sm">
                <p className="font-mono text-2xl font-semibold tabular-nums text-cyan-300">
                  &lt; <AnimatedCounter value={60} suffix="s" />
                </p>
                <p className="mt-1 text-sm text-slate-400">Missed-call SMS lead recovery</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#070a11]/80 p-4 backdrop-blur-sm">
                <p className="font-mono text-2xl font-semibold tabular-nums text-white">
                  <AnimatedCounter value={60} suffix="%+" /> Est.
                </p>
                <p className="mt-1 text-sm text-slate-400">Illustrative 3-yr TCO reduction</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#070a11]/80 p-4 backdrop-blur-sm">
                <p className="font-mono text-2xl font-semibold tabular-nums text-white">5–14 Days</p>
                <p className="mt-1 text-sm text-slate-400">GHL &amp; AI voice launch</p>
              </div>
            </div>

            {/* GEO / AEO System Definition & Architecture Anchor */}
            <div className="mt-8 rounded-xl border border-white/10 bg-[#070a11]/75 p-6 md:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-medium text-cyan-300">
                  System architecture and definition
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  What is an Enterprise AI Voice Receptionist?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
                  An AI voice receptionist is a real-time conversational telephony agent engineered to answer inbound phone calls 24/7, converse naturally with zero robotic delay, qualify customer requirements, and execute operational workflows, including direct CRM calendar booking, emergency triage dispatch, and automated under-60-second missed-call SMS recovery.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-[#0d1421]/85 p-4">
                  <p className="text-xs font-semibold text-cyan-300">Telephony Layer</p>
                  <p className="mt-1 font-display text-base font-semibold text-white">Natural Spoken Intake</p>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    Powered by low-latency SIP trunks and Deepgram Nova-2 speech recognition for crystal-clear transcription across Australian and US accents.
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#0d1421]/85 p-4">
                  <p className="text-xs font-semibold text-cyan-300">Action Engine</p>
                  <p className="mt-1 font-display text-base font-semibold text-white">Live Calendar &amp; CRM Sync</p>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    Checks real-time staff availability, books confirmed slots, writes customer notes, and executes warm live transfers for urgent callers.
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#0d1421]/85 p-4">
                  <p className="text-xs font-semibold text-cyan-300">Lead Recovery Safeguard</p>
                  <p className="mt-1 font-display text-base font-semibold text-white">Under-60s Text-Back</p>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    When lines are occupied, automated two-way SMS engages callers in under 60 seconds to lock in quotes before they reach competitors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PLATFORM INTEGRATIONS STRIP */}
        <section className="container-shell mt-8 md:mt-12">
          <CertifiedPartnerStrip />
        </section>

        {/* SECTION 3: WHY AUTOMATION MATTERS */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-white/10 bg-[#0d1421]/85 p-6 md:p-12 shadow-xs backdrop-blur-md">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-cyan-300">
                The cost of missed inbound calls
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-white md:text-4xl">
                Why Manual Phone Handling &amp; Slow Follow-Ups Cost Real Revenue
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                When a homeowner with a burst pipe or a patient with a toothache calls your business, they need help immediately. Deploying a{" "}
                <Link href="/solutions/ai-voice-agents" className="font-semibold text-cyan-300 hover:underline">
                  24/7 AI voice receptionist
                </Link>{" "}
                or an{" "}
                <Link href="/solutions/missed-call-text-back" className="font-semibold text-cyan-300 hover:underline">
                  automated missed-call text-back system
                </Link>{" "}
                captures those high-intent inquiries in under 60 seconds. Paired with scalable{" "}
                <Link href="/solutions/gohighlevel-implementation" className="font-semibold text-cyan-300 hover:underline">
                  GoHighLevel CRM setups
                </Link>{" "}
                and{" "}
                <Link href="/solutions/n8n-workflow-automation" className="font-semibold text-cyan-300 hover:underline">
                  custom n8n automations
                </Link>
                , your leads are triaged, scheduled, and dispatched before they reach a competitor.
              </p>
            </div>

            <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StaggerGridItem>
                <SpotlightCard className="h-full rounded-xl border border-white/10 bg-[#070a11]/85 p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                    <PhoneCall className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">Zero Call Abandonment</h3>
                  <span className="text-xs font-semibold text-cyan-300">24/7 Voice Answering</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Answers every inbound call immediately, preventing prospective clients from dropping to competitors while you are on jobs.
                  </p>
                </SpotlightCard>
              </StaggerGridItem>

              <StaggerGridItem>
                <SpotlightCard className="h-full rounded-xl border border-white/10 bg-[#070a11]/85 p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                    <Clock className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">Instant SMS Dispatch</h3>
                  <span className="text-xs font-semibold text-cyan-300">Under 60-Second Text-Back</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Dispatches a personalized conversational SMS within 60 seconds of an unanswered call to engage the prospect instantly.
                  </p>
                </SpotlightCard>
              </StaggerGridItem>

              <StaggerGridItem>
                <SpotlightCard className="h-full rounded-xl border border-white/10 bg-[#070a11]/85 p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">Immediate Engagement</h3>
                  <span className="text-xs font-medium text-cyan-300">Fast SMS &amp; Voice Follow-Up</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Immediate two-way conversational outreach dramatically outperforms delayed follow-ups, securing high-intent prospects before competitors respond.
                  </p>
                </SpotlightCard>
              </StaggerGridItem>

              <StaggerGridItem>
                <SpotlightCard className="h-full rounded-xl border border-white/10 bg-[#070a11]/85 p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                    <Database className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">Direct Calendar Booking</h3>
                  <span className="text-xs font-semibold text-cyan-300">Two-Way CRM Integration</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Qualifies job requirements and writes confirmed appointments straight into your calendar and CRM without phone tag.
                  </p>
                </SpotlightCard>
              </StaggerGridItem>
            </StaggerGrid>
          </div>
        </section>

        {/* SECTION 4: BENTO SERVICES OVERVIEW */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-cyan-300">Production capability stacks</p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-white md:text-4xl">
                Engineered Systems That Work in Production
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Our core stack combines Next.js and PostgreSQL custom CRM portals with GoHighLevel pipelines, self-hosted n8n webhooks, and 24/7 AI voice intake. Every system deploys directly inside client-owned infrastructure to eliminate recurring seat bloat and connect inbound calls, SMS follow-ups, and calendar bookings.
              </p>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 shrink-0">
              View all solutions
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Flagship Bento Card spanning 2 cols on desktop */}
            <div className="md:col-span-2 h-full">
              <TiltCard
                href="/development/custom-crm-development"
                className="rounded-2xl border border-cyan-400/30 bg-[#0d1526]/90 p-6 md:p-8 shadow-xs backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-brand px-2.5 py-0.5 font-mono text-[11px] font-semibold text-white">
                    Flagship Capability
                  </span>
                  <span className="font-mono text-xs font-semibold text-cyan-300">3–6 Wks &bull; $0 Seat Fees</span>
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold tracking-tight text-white">
                  Custom CRM Development &amp; Architecture
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                  Bespoke Next.js &amp; PostgreSQL portals built on top of enterprise APIs with Role-Based Access Control (RBAC), E.164 phone deduplication, and 100% IP ownership. Compare 3-year Total Cost of Ownership against per-seat SaaS on our pricing model.
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-200">
                  Explore Custom CRM Blueprint
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </span>
              </TiltCard>
            </div>

            {solutions.slice(0, 4).map((solution) => (
              <div key={solution.slug} className="h-full">
                <TiltCard
                  href={`/solutions/${solution.slug}`}
                  className="rounded-xl border border-white/10 bg-[#0d1421]/85 p-6 shadow-xs backdrop-blur-md"
                >
                  <p className="text-xs font-medium text-cyan-300">{solution.tagline}</p>
                  <h3 className="mt-2 font-display text-2xl text-white">{solution.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{solution.summary}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-200">
                    Explore {solution.name}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: PROJECTS & SHIPPED SOFTWARE */}
        <section className="container-shell mt-16 md:mt-20">
          <FeaturedBuildsShowcase />

          <div className="mt-14 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-brand">Client deployments &amp; architectural models</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Recent Automation Deployments
              </h2>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Each deployment or illustrative architectural model below pairs specific operational bottlenecks with client-owned infrastructure across trades, clinics, and advisory groups. Any modeled ROI or seat-cost figures are labeled transparently with calculation inputs so leadership can inspect assumptions before scoping.
              </p>
            </div>
            <Link href="/case-studies" className="text-sm font-semibold text-brand hover:text-brand-deep shrink-0">
              See all case studies
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {["dental-clinic", "plumbing-contractor", "hybrid-field-service-crm"]
              .map((id) => factsData.clientProjects.find((p) => p.id === id))
              .filter((project): project is NonNullable<typeof project> => Boolean(project))
              .map((project) => (
                <div key={project.id} className="h-full transition-transform duration-200 [@media(hover:hover)]:hover:-translate-y-1">
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>

          {/* Dual CTA after Proof Section */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-deep transition"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/try-voice-agent"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-cyan-400/35 hover:bg-white/10 transition"
            >
              <PhoneCall className="h-4 w-4 text-cyan-400" />
              Hear a live AI demo
            </Link>
          </div>
        </section>

        {/* SECTION 6: PROCESS */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-white/10 bg-[#0d1421]/85 p-6 md:p-10 shadow-xs backdrop-blur-md">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-cyan-300">14-day production roadmap</p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-white md:text-4xl">How We Take You Live in 14 Days</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                We do not sell pre-recorded tutorials or empty templates. We engineer, test, and maintain your telephony and CRM infrastructure so it works without ongoing friction.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="h-full rounded-xl border border-white/10 bg-[#070a11]/80 p-5 transition-colors hover:border-cyan-400/30">
                  <p className="font-mono text-xs font-medium text-cyan-300">Phase {index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: INDUSTRIES & CITY COVERAGE */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-cyan-300">Industry architectures</p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-white md:text-4xl">
                Tuned for Your Industry &amp; Operating Model
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Serving Australian and US businesses, each industry playbook adapts call triage scripts, CRM pipeline stages, and direct dispatch webhooks to your vertical software. From ServiceTitan and Jobber in trades to Cliniko in allied health, intake rules match how your team books work.
              </p>
            </div>
            <Link href="/industries" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 shrink-0">
              View all industry playbooks
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/industries/plumbers-hvac-trades",
                title: "Plumbers, HVAC & Trades",
                desc: "Emergency dispatch triage, jobsite missed-call text-back, and ServiceTitan/Jobber synchronization.",
                cta: "View Trade Playbook",
              },
              {
                href: "/industries/medical-dental-clinics",
                title: "Medical & Dental Clinics",
                desc: "24/7 patient booking, emergency intake, appointment confirmations, and Cliniko PMS calendar sync.",
                cta: "View Dental Playbook",
              },
              {
                href: "/industries/automotive-workshops",
                title: "Automotive Workshops & Mechanics",
                desc: "Vehicle intake capture, diagnostic quote follow-ups, and automated service reminder SMS sequences.",
                cta: "View Automotive Playbook",
              },
              {
                href: "/industries/beauty-wellness",
                title: "Beauty, Salons & Med Spas",
                desc: "Capture callers while stylists have hands full, automate deposits, and reduce no-shows to near-zero.",
                cta: "View Salon Playbook",
              },
              {
                href: "/industries/professional-services",
                title: "Legal & Professional Services",
                desc: "Conflict-of-interest checks, automated client intake questionnaires, and qualified discovery bookings.",
                cta: "View Professional Playbook",
              },
              {
                href: "/industries/events-hospitality",
                title: "Events, Venues & Hospitality",
                desc: "Private dining and venue hire intake, dietary constraint capture, and instant quote generation.",
                cta: "View Hospitality Playbook",
              },
            ].map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group rounded-xl border border-white/10 bg-[#0d1421]/85 p-6 shadow-xs backdrop-blur-md transition-colors hover:border-cyan-400/35"
              >
                <h3 className="font-display text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{ind.desc}</p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-cyan-300">
                  {ind.cta} <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 8: FAQ ACCORDION */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-white/10 bg-[#0d1421]/85 p-6 md:p-12 shadow-xs backdrop-blur-md">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-cyan-300">
                Frequently asked questions
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-white md:text-4xl">
                Frequently Asked Implementation Questions
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                Straightforward answers to the four questions service business owners ask us most frequently.
              </p>
            </div>

            <div className="mt-8">
              <FAQAccordion items={homeFaqs} defaultOpenIndex={0} />
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CTA */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="saas-grid-bg rounded-2xl border border-cyan-400/25 bg-[#0d1526]/95 px-6 py-12 text-white shadow-[0_0_60px_-18px_rgba(56,189,248,0.22)] md:px-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl tracking-tight md:text-5xl font-semibold leading-tight text-white">
                Stop Losing Jobs to Missed Calls and Slow Follow-Ups
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
                Let us audit your current call volume and map a bespoke automation pipeline. No pushy sales pitch, just a practical architectural plan with fixed pricing.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition-colors"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/try-voice-agent"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-cyan-400" />
                  Hear a live AI demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
