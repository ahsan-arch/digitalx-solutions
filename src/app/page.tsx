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

  const homeGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.domain}/#organization`,
        name: "DigitalX Solutions",
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/assets/logo.png`,
        image: `${siteConfig.domain}/assets/og-home-image.jpg`,
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
          latitude: -33.9519,
          longitude: 150.9054,
        },
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
          "https://x.com/digitalx_solutions",
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
        mainEntity: [
          {
            "@type": "Question",
            name: "How fast does the AI answering agent answer incoming calls?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our AI Voice Receptionists feature sub-500ms voice response latency. Calling patients or customers receive immediate responses with no robotic pause or delay, 24/7.",
            },
          },
          {
            "@type": "Question",
            name: "Does this AI integrate with existing CRMs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We specialize in custom GoHighLevel CRM setup and integrate directly with ServiceTitan, HubSpot, and Google Calendar via webhooks and API. Client records, appointment bookings, and full transcripts update automatically.",
            },
          },
          {
            "@type": "Question",
            name: "Can the voice agents handle phone number forwarding?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, through carriers and Twilio, we connect existing US and Australian numbers, meaning your business can use our services without needing any complex forwarding steps.",
            },
          },
          {
            "@type": "Question",
            name: "How does the missed-call lead recovery work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you are busy on the line, our automated missed-call text back system sends an instant text to the missed caller in under 60 seconds to triage, recover, and schedule the lead.",
            },
          },
        ],
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
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-border/70 bg-white px-3 py-1 text-xs font-medium text-foreground/80">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Voice telephony and workflow automation · Australia &amp; US</span>
                </div>
                <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
                  AI Automation Agency for High-Growth Service Businesses
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                  DigitalX Solutions builds and deploys 24/7 human-sounding AI voice receptionists, under-60-second missed-call text-back, GoHighLevel and HubSpot CRM architectures, and custom n8n workflow automations for trades, healthcare clinics, and professional services across Australia and the United States.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
                  >
                    Book a strategy call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/try-voice-agent"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-sunken"
                  >
                    <PhoneCall className="h-4 w-4 text-brand" />
                    Test live voice demo
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
                <div key={metric.label} className="rounded-xl border border-border/70 bg-white p-4 shadow-xs">
                  <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">{metric.value}</p>
                  <p className="mt-1 text-sm text-foreground/75">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CERTIFIED PARTNER STRIP */}
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
                captures those high-intent inquiries in under 30 seconds. Paired with scalable{" "}
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
                <h3 className="mt-4 font-display text-xl font-semibold tabular-nums text-foreground">62% Unanswered Calls</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Small service businesses miss over half of all inbound calls during active jobs, lunch breaks, and evenings.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Clock className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tabular-nums text-foreground">85% Hang-Up Rate</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Callers who hit voicemail hang up without leaving a message. Voicemail is where inbound deals go to die.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tabular-nums text-foreground">391% Lift via Speed</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Replying with a conversational two-way text under 60 seconds captures the lead before they reach competitor lines.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Database className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tabular-nums text-foreground">20 hrs Saved / Week</h3>
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
              <p className="text-xs font-medium text-brand">Production capability stacks</p>
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
                className="group block h-full rounded-xl border border-border/80 bg-white p-6 shadow-xs hover:border-brand/40"
              >
                <p className="text-xs font-medium text-foreground/60">{solution.tagline}</p>
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
              <p className="text-xs font-medium text-brand">Verified deployments</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Recent Automation Deployments
              </h2>
            </div>
            <Link href="/case-studies" className="text-sm font-semibold text-brand hover:text-brand-deep">
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
                <div key={step.title} className="rounded-xl border border-border/70 bg-surface-page p-5">
                  <p className="font-mono text-xs font-medium text-foreground/60">Phase 0{index + 1}</p>
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
              <p className="text-xs font-medium text-brand">Industry architectures</p>
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
              <p className="text-xs font-medium text-brand">Frequently asked questions</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Frequently Asked Implementation Questions
              </h2>
              <p className="mt-3 text-sm text-foreground/75">
                Straightforward answers to the four questions service business owners ask us most frequently.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  How fast does the AI answering agent answer incoming calls?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Our AI Voice Receptionists feature sub-500ms voice response latency. Calling patients or customers receive immediate responses with no robotic pause or delay, 24/7.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Does this AI integrate with existing CRMs?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Yes. We specialize in custom GoHighLevel CRM setup and integrate directly with ServiceTitan, HubSpot, and Google Calendar via webhooks and API. Client records, appointment bookings, and full transcripts update automatically.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Can the voice agents handle phone number forwarding?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Yes, through carriers and Twilio, we connect existing US and Australian numbers, meaning your business can use our services without needing any complex forwarding steps.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  How does the missed-call lead recovery work?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  If you are busy on the line, our automated missed-call text back system sends an instant text to the missed caller in under 60 seconds to triage, recover, and schedule the lead.
                </p>
              </div>
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
                Let us audit your current call volume and map a bespoke automation pipeline. No pushy sales pitch—just a practical architectural plan with fixed pricing.
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
                  Test live AI voice agent
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
