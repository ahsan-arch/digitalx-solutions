import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, MessageSquare, Zap, Database, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { HeroIllustration, TiltCard, CertifiedPartnerStrip, ProjectCard } from "@/components/ui";
import { heroMetrics, processSteps, solutions } from "@/data/redesign";
import { industryCategories } from "@/data/industries";
import factsData from "@/data/facts";

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.domain}/#organization`,
    name: "DigitalX Solutions",
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/logos/gohighlevel.svg`,
    description:
      "AI automation agency deploying 24/7 AI voice receptionists, missed-call text-back, and GoHighLevel CRM workflows for businesses across Australia and the United States.",
    telephone: "+61 451 413 786",
    email: "info@digitalx-solutions.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "16 Boldrewood Ave",
      addressLocality: "Casula",
      addressRegion: "NSW",
      postalCode: "2170",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.9518,
      longitude: 150.9044,
    },
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "United States" },
    ],
    priceRange: "$$",
    sameAs: [
      "https://www.linkedin.com/company/digitalx-solutions-aus",
      "https://www.instagram.com/digitalx_solutions",
      "https://www.facebook.com/people/Digitalx-solutions/61588252343955",
      "https://x.com/digitalx_solutions",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can DigitalX set up my AI receptionist?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most businesses go live in 5 to 14 business days. We configure your voice persona, call flow logic, calendar booking, and CRM integration, then test with real call scenarios before switching your line live.",
        },
      },
      {
        "@type": "Question",
        name: "Will callers notice a delay when the AI responds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our agents are tuned for natural conversation, responding with sub-500ms neural turnaround after the caller finishes speaking. We test latency on your actual phone line and call flows before go-live.",
        },
      },
      {
        "@type": "Question",
        name: "Does the AI receptionist sync with GoHighLevel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Contacts, call transcripts, audio recordings, and booked appointments sync into your GoHighLevel pipeline automatically, and we trigger automated follow-up workflows from each call outcome.",
        },
      },
      {
        "@type": "Question",
        name: "Can I keep my existing business number?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We set up conditional call forwarding or number porting, or provision a dedicated local number through Twilio. Callers see the number they already know and your team keeps full control.",
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main" className="pb-24">
        {/* SECTION 1: HERO */}
        <section className="container-shell pt-12 md:pt-16">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-50 px-6 py-12 shadow-sm md:px-10 md:py-16">
            <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  AI Automation Agency — Australia &amp; USA
                </div>
                <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
                  AI Automation Agency for High-Growth Service Businesses
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                  DigitalX Solutions builds and deploys 24/7 human-sounding AI voice receptionists, under-30-second missed-call text-back, GoHighLevel CRM architectures, and custom n8n workflow automations for trades, healthcare clinics, and professional services across Australia and the United States.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
                  >
                    Book a Strategy Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/try-voice-agent"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-100"
                  >
                    <PhoneCall className="h-4 w-4 text-brand" />
                    Test Live Voice Demo
                  </Link>
                </div>
              </div>

              <div className="relative">
                <HeroIllustration />
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border/80 bg-white/80 p-4">
                  <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  <p className="mt-1 text-sm text-foreground/75">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CERTIFIED PARTNER STRIP */}
        <CertifiedPartnerStrip />

        {/* SECTION 3: WHY AUTOMATION MATTERS */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                The Revenue Leak
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Why Manual Phone Handling &amp; Slow Follow-Ups Cost Real Revenue
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                When a homeowner with a burst pipe or a patient with a toothache calls your business, they are not shopping around for fun. They need help immediately. If your phone rings out or goes to voicemail, they hang up and dial the next listing on Google within 45 seconds.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 font-bold">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">62% Unanswered Calls</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Small service businesses miss over half of all inbound calls during active jobs, lunch breaks, and evenings.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">85% Hang-Up Rate</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Callers who hit voicemail hang up without leaving a message. Voicemail is where inbound deals go to die.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">391% Lift via Speed</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Replying with a conversational two-way text under 60 seconds captures the lead before they reach competitor lines.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">20 hrs Saved / Week</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Eliminating manual job logging, back-and-forth scheduling, and CRM updates frees up valuable operational hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SERVICES OVERVIEW */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Core Capability Stacks</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Engineered Systems That Work in Production
              </h2>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-brand hover:text-brand-deep">
              View all solutions
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {solutions.slice(0, 6).map((solution) => (
              <TiltCard
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group block h-full rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/40 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">{solution.tagline}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{solution.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{solution.summary}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                  Explore system specs
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* SECTION 5: PROJECTS WITH REAL CLIENT DATA */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Client Implementations</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Recent Automation Deployments
              </h2>
            </div>
            <Link href="/work" className="text-sm font-semibold text-brand hover:text-brand-deep">
              See all case studies
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {factsData.clientProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* SECTION 6: PROCESS */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Delivery Framework</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">How We Take You Live in 14 Days</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75 md:text-base">
                We do not sell pre-recorded tutorials or empty templates. We engineer, test, and maintain your telephony and CRM infrastructure so it works without ongoing friction.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-border bg-surface-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Phase 0{index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: INDUSTRIES & CITY COVERAGE */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Vertical Playbooks</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Tuned for Your Industry &amp; Operating Model
              </h2>
            </div>
            <Link href="/industries" className="text-sm font-semibold text-brand hover:text-brand-deep">
              View all industry playbooks
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/industries/plumbers-hvac-trades"
              className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/40 hover:shadow-xs"
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
              className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/40 hover:shadow-xs"
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
              className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/40 hover:shadow-xs"
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
              className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/40 hover:shadow-xs"
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
              className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/40 hover:shadow-xs"
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
              className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/40 hover:shadow-xs"
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
          <div className="rounded-3xl border border-border bg-white p-6 md:p-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Operator FAQ</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Frequently Asked Implementation Questions
              </h2>
              <p className="mt-3 text-sm text-foreground/75">
                Straightforward answers to the four questions service business owners ask us most frequently.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  How fast can DigitalX set up my AI receptionist?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Most businesses go live in 5 to 14 business days. We configure your voice persona, call flow logic, calendar booking, and CRM integration, then test with real call scenarios before switching your line live.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Will callers notice a delay when the AI responds?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Our agents are tuned for natural conversation, responding with sub-500ms neural turnaround after the caller finishes speaking. We test latency on your actual phone line and call flows before go-live.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Does the AI receptionist sync with GoHighLevel?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Yes. Contacts, call transcripts, audio recordings, and booked appointments sync into your GoHighLevel pipeline automatically, and we trigger automated follow-up workflows from each call outcome.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Can I keep my existing business number?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Yes. We set up conditional call forwarding or number porting, or provision a dedicated local number through Twilio. Callers see the number they already know and your team keeps full control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FINAL CTA */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-3xl border border-border bg-foreground px-6 py-12 text-white md:px-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
                Stop Losing Jobs to Missed Calls and Slow Follow-Ups
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Let us audit your current call volume and map a bespoke automation pipeline. No pushy sales pitch—just a practical architectural plan with fixed pricing.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-surface-100 transition-colors"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/try-voice-agent"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4" />
                  Test Live AI Voice Agent
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
