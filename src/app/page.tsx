import Link from "next/link";
import { ArrowRight, PhoneCall, MessageSquare, Database, Clock, ChevronRight } from "lucide-react";
import { generateBreadcrumbSchema, geoHreflangLanguages, siteConfig } from "@/lib/seo";
import { HeroPreviewTabs, TiltCard, CertifiedPartnerStrip, ProjectCard, AudioCallPreview, FAQAccordion } from "@/components/ui";
import { FeaturedBuildsShowcase } from "@/components/projects/featured-builds-showcase";
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
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteConfig.domain}/#organization`,
        name: "DigitalX Solutions",
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/assets/logo.png`,
        image: `${siteConfig.domain}/assets/og-home-image.jpg`,
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
        <section className="container-shell pt-12 md:pt-16">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-white/70 px-6 py-12 shadow-xs md:px-10 md:py-16">
            <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <p className="mb-3 text-xs font-medium text-brand-deep">
                  Custom software, voice telephony, and workflow automation
                </p>
                <h1 className="font-display text-4xl leading-tight tracking-tight text-foreground md:text-5xl font-semibold">
                  Custom CRM Development &amp; AI Revenue Operations
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                  DigitalX Solutions architects bespoke Next.js and PostgreSQL custom CRM systems with 100% IP ownership and zero per-seat fees. We engineer 24/7 AI voice receptionists, under-60-second missed-call recovery, and self-hosted n8n workflow pipelines directly into your core operational database across Australia and the United States.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep"
                  >
                    Book a strategy call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/try-voice-agent"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-sunken"
                  >
                    <PhoneCall className="h-4 w-4" />
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
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">100% Owned IP</p>
                <p className="mt-1 text-sm text-foreground/75">Zero per-seat software fees</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">&lt; 60s</p>
                <p className="mt-1 text-sm text-foreground/75">Missed-call SMS lead recovery</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">3–6 Weeks</p>
                <p className="mt-1 text-sm text-foreground/75">Custom CRM builds delivery</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">5–14 Days</p>
                <p className="mt-1 text-sm text-foreground/75">GHL &amp; AI voice launch</p>
              </div>
            </div>

            {/* GEO / AEO System Definition & Architecture Anchor */}
            <div className="mt-8 rounded-xl border border-border/70 bg-surface-50/70 p-6 md:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-medium text-brand">
                  System architecture and definition
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">
                  What is an Enterprise AI Voice Receptionist?
                </h2>
                <p className="mt-3 text-base leading-relaxed text-foreground/80">
                  An AI voice receptionist is a real-time conversational telephony agent engineered to answer inbound phone calls 24/7, converse naturally with zero robotic delay, qualify customer requirements, and execute operational workflows, including direct CRM calendar booking, emergency triage dispatch, and automated under-60-second missed-call SMS recovery.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border/60 bg-white p-4">
                  <p className="text-xs font-semibold text-brand">Telephony Layer</p>
                  <p className="mt-1 font-display text-base font-semibold text-foreground">Natural Spoken Intake</p>
                  <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                    Powered by low-latency SIP trunks and Deepgram Nova-2 speech recognition for crystal-clear transcription across Australian and US accents.
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-white p-4">
                  <p className="text-xs font-semibold text-brand">Action Engine</p>
                  <p className="mt-1 font-display text-base font-semibold text-foreground">Live Calendar &amp; CRM Sync</p>
                  <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                    Checks real-time staff availability, books confirmed slots, writes customer notes, and executes warm live transfers for urgent callers.
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-white p-4">
                  <p className="text-xs font-semibold text-brand">Lead Recovery Safeguard</p>
                  <p className="mt-1 font-display text-base font-semibold text-foreground">Under-60s Text-Back</p>
                  <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
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
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                The cost of missed inbound calls
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Why Manual Phone Handling &amp; Slow Follow-Ups Cost Real Revenue
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                When a homeowner with a burst pipe or a patient with a toothache calls your business, they need help immediately. Deploying a{" "}
                <Link href="/solutions/ai-voice-agents" className="font-semibold text-brand hover:underline">
                  24/7 AI voice receptionist
                </Link>{" "}
                or an{" "}
                <Link href="/solutions/missed-call-text-back" className="font-semibold text-brand hover:underline">
                  automated missed-call text-back system
                </Link>{" "}
                captures those high-intent inquiries in under 60 seconds. Paired with scalable{" "}
                <Link href="/solutions/gohighlevel-implementation" className="font-semibold text-brand hover:underline">
                  GoHighLevel CRM setups
                </Link>{" "}
                and{" "}
                <Link href="/solutions/n8n-workflow-automation" className="font-semibold text-brand hover:underline">
                  custom n8n automations
                </Link>
                , your leads are triaged, scheduled, and dispatched before they reach a competitor.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">Zero Call Abandonment</h3>
                <span className="text-xs font-semibold text-brand">24/7 Voice Answering</span>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Answers every inbound call immediately, preventing prospective clients from dropping to competitors while you are on jobs.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Clock className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">Instant SMS Dispatch</h3>
                <span className="text-xs font-semibold text-brand">Under 60-Second Text-Back</span>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Dispatches a personalized conversational SMS within 60 seconds of an unanswered call to engage the prospect instantly.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/75">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">Immediate Conversational Engagement</h3>
                <span className="text-xs font-medium text-brand-deep">Fast SMS &amp; Voice Follow-Up</span>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Immediate two-way conversational outreach dramatically outperforms delayed follow-ups, securing high-intent prospects before competitors respond.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Database className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">Direct Calendar Booking</h3>
                <span className="text-xs font-semibold text-brand">Two-Way CRM Integration</span>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Qualifies job requirements and writes confirmed appointments straight into your calendar and CRM without phone tag.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SERVICES OVERVIEW */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-brand">Production capability stacks</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Engineered Systems That Work in Production
              </h2>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Our core stack combines Next.js and PostgreSQL custom CRM portals with GoHighLevel pipelines, self-hosted n8n webhooks, and 24/7 AI voice intake. Every system deploys directly inside client-owned infrastructure to eliminate recurring seat bloat and connect inbound calls, SMS follow-ups, and calendar bookings.
              </p>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-brand hover:text-brand-deep shrink-0">
              View all solutions
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Flagship Card: Custom CRM Development */}
            <div className="h-full">
              <TiltCard
                href="/development/custom-crm-development"
                className="rounded-2xl border border-brand/40 bg-white p-6 shadow-xs hover:border-brand"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-brand px-2 py-0.5 font-mono text-[11px] font-semibold text-white">
                    Flagship Capability
                  </span>
                  <span className="font-mono text-xs font-semibold text-brand">3–6 Wks</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
                  Custom CRM Development &amp; Architecture
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Bespoke Next.js &amp; PostgreSQL portals built on top of enterprise APIs with 100% IP ownership and zero per-seat fees.
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                  Explore Custom CRM Blueprint
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </TiltCard>
            </div>

            {solutions.slice(0, 5).map((solution) => (
              <div key={solution.slug} className="h-full">
                <TiltCard
                  href={`/solutions/${solution.slug}`}
                  className="rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
                >
                  <p className="text-xs font-medium text-foreground/75">{solution.tagline}</p>
                  <h3 className="mt-2 font-display text-2xl text-foreground">{solution.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{solution.summary}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-100 transition"
            >
              <PhoneCall className="h-4 w-4 text-brand" />
              Hear a live AI demo
            </Link>
          </div>
        </section>

        {/* SECTION 6: PROCESS */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-10 shadow-xs">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-brand">14-day production roadmap</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">How We Take You Live in 14 Days</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75 md:text-base">
                We do not sell pre-recorded tutorials or empty templates. We engineer, test, and maintain your telephony and CRM infrastructure so it works without ongoing friction.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="h-full rounded-xl border border-border/70 bg-surface-page p-5 transition-colors hover:border-brand/35">
                  <p className="font-mono text-xs font-medium text-foreground/75">Phase {index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: INDUSTRIES & CITY COVERAGE */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-brand">Industry architectures</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Tuned for Your Industry &amp; Operating Model
              </h2>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Serving Australian and US businesses, each industry playbook adapts call triage scripts, CRM pipeline stages, and direct dispatch webhooks to your vertical software. From ServiceTitan and Jobber in trades to Cliniko in allied health, intake rules match how your team books work.
              </p>
            </div>
            <Link href="/industries" className="text-sm font-semibold text-brand hover:text-brand-deep shrink-0">
              View all industry playbooks
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/industries/plumbers-hvac-trades"
              className="group rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
            >
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-brand transition-colors">
                Plumbers, HVAC &amp; Trades
              </h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Emergency dispatch triage, jobsite missed-call text-back, and ServiceTitan/Jobber synchronization.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                View Trade Playbook <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </Link>

            <Link
              href="/industries/medical-dental-clinics"
              className="group rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
            >
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-brand transition-colors">
                Medical &amp; Dental Clinics
              </h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                24/7 patient booking, emergency intake, appointment confirmations, and Cliniko PMS calendar sync.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                View Dental Playbook <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </Link>

            <Link
              href="/industries/automotive-workshops"
              className="group rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
            >
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-brand transition-colors">
                Automotive Workshops &amp; Mechanics
              </h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Vehicle intake capture, diagnostic quote follow-ups, and automated service reminder SMS sequences.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                View Automotive Playbook <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </Link>

            <Link
              href="/industries/beauty-wellness"
              className="group rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
            >
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-brand transition-colors">
                Beauty, Salons &amp; Med Spas
              </h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Capture callers while stylists have hands full, automate deposits, and reduce no-shows to near-zero.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                View Salon Playbook <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </Link>

            <Link
              href="/industries/professional-services"
              className="group rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
            >
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-brand transition-colors">
                Legal &amp; Professional Services
              </h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Conflict-of-interest checks, automated client intake questionnaires, and qualified discovery bookings.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                View Professional Playbook <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </Link>

            <Link
              href="/industries/events-hospitality"
              className="group rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
            >
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-brand transition-colors">
                Events, Venues &amp; Hospitality
              </h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Private dining and venue hire intake, dietary constraint capture, and instant quote generation.
              </p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                View Hospitality Playbook <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </Link>
          </div>
        </section>

        {/* SECTION 8: FAQ ACCORDION */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-brand">
                Frequently asked questions
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Frequently Asked Implementation Questions
              </h2>
              <p className="mt-3 text-sm text-foreground/75">
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
          <div className="rounded-2xl border border-border bg-foreground px-6 py-12 text-white md:px-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
                Stop Losing Jobs to Missed Calls and Slow Follow-Ups
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Let us audit your current call volume and map a bespoke automation pipeline. No pushy sales pitch, just a practical architectural plan with fixed pricing.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-foreground hover:bg-surface-sunken transition-colors"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/try-voice-agent"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4" />
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
