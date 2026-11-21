import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, Clock, ShieldCheck, Database, Zap, Cpu, HelpCircle, Layers, Activity } from "lucide-react";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServicePageSchema,
  siteConfig,
} from "@/lib/seo";
import { AudioCallPreview, FAQAccordion, MissedCallCalculator } from "@/components/ui";

const pageTitle = "24/7 AI Voice Receptionist | DigitalX Solutions";
const pageDescription =
  "Never miss another inbound lead. Deploy a custom-trained 24/7 AI voice receptionist integrated directly with your CRM and calendar in 7 days.";

export const metadata = generatePageMetadata("/ai-voice-receptionist-service", {
  title: pageTitle,
  description: pageDescription,
});

const faqItems = [
  {
    question: "Does the AI voice receptionist sound robotic?",
    answer:
      "No. We build agents using modern neural voice synthesis with fast, natural conversational pacing, natural breathing pauses, and dynamic interruption handling so callers experience a smooth, human-grade conversation.",
  },
  {
    question: "Can it transfer urgent calls to a real person?",
    answer:
      "Yes. We configure custom warm-transfer rules so emergency calls, VIP clients, or complex inquiries are routed straight to your mobile phone or front desk with a quick summary whispered to you first before bridging the caller.",
  },
  {
    question: "Do we have to change our existing business phone number?",
    answer:
      "No. You keep your existing business number and simply set up conditional call forwarding (for missed or after-hours calls) or route your main line directly through our SIP/Twilio bridge.",
  },
  {
    question: "Which CRMs and calendars does it integrate with?",
    answer:
      "Our agents integrate natively with GoHighLevel, Google Calendar, Outlook, HubSpot, Cliniko, ServiceTitan, Jobber, and any platform supporting webhooks or REST APIs via n8n.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most custom AI voice receptionist deployments go from initial discovery call to full live testing within 5 to 7 business days, followed by live shadow monitoring.",
  },
];

export default function AiVoiceReceptionistServicePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "AI Voice Receptionist", url: `${siteConfig.domain}/ai-voice-receptionist-service` },
  ]);

  const serviceSchema = generateServicePageSchema({
    name: "24/7 AI Voice Receptionist Service",
    description: pageDescription,
    url: `${siteConfig.domain}/ai-voice-receptionist-service`,
  });

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        {/* SECTION 1: HERO */}
        <section className="container-shell">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-white/70 px-6 py-12 shadow-xs md:px-12 md:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Autonomous inbound voice telephony across Australia and the US
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                24/7 AI Voice Receptionist That Answers, Qualifies, and Books Appointments Automatically
              </h1>
              <p className="mt-5 text-base leading-relaxed text-foreground/80 md:text-lg">
                Stop losing high-value inbound calls to voicemail. We build and deploy custom-trained AI phone agents that handle inbound inquiries, sync directly with your CRM, and book qualified appointments onto your calendar around the clock.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-deep"
                >
                  <PhoneCall className="h-4 w-4" />
                  Book a 15-Minute Live Demo
                </Link>
                <Link
                  href="/try-voice-agent"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-white px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-surface-sunken"
                >
                  Test AI Voice in Browser
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-4 text-xs text-foreground/75">
                Experience natural, low-latency conversational turn-taking with zero credit card required.
              </p>
            </div>

            {/* Quick Hero Audio Preview */}
            <div className="mt-10 max-w-2xl">
              <AudioCallPreview
                src="/demos/plumbing-companies/turn-0.mp3"
                title="Live Production Sample"
                scenario="Emergency Plumbing Dispatch"
                callerLabel="Burst Pipe Qualification &amp; Calendar Booking"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: THE REVENUE LEAK */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Operational diagnosis
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Every Missed Call Is a Paying Customer Calling Your Competitor
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                Service businesses lose thousands in monthly revenue because front-desk teams are overwhelmed, busy on another line, or off the clock.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <PhoneCall className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Unanswered Peak Calls
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  A high percentage of inbound calls to service businesses go unanswered during peak job hours, weekends, and late evenings when customers need urgent help.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Clock className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Voicemail Is a Dead End
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Most prospective callers refuse to leave a voicemail and immediately dial the next competing local business on Google, permanently losing the high-intent lead.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-white text-foreground/80">
                  <Zap className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Manual Intake Bottlenecks
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Receptionists and office managers spend hours answering repetitive pricing, location, and availability questions instead of focusing on high-margin operations.
                </p>
              </div>
            </div>

            {/* Interactive Revenue Leak Calculator */}
            <div className="mt-10">
              <MissedCallCalculator defaultBookingUrl="/contact" />
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE PROOF / LIVE DEMO */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Audio benchmarks
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Hear Our AI Voice Agents in Action
              </h2>
              <p className="mt-3 text-sm text-foreground/75 md:text-base">
                Listen to real production scenarios showcasing natural conversational pacing, instant intent triage, and automated calendar actions.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="flex flex-col justify-between rounded-xl border border-border/70 bg-surface-page p-5">
                <div>
                  <span className="text-xs font-semibold text-brand">
                    Home Services
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                    After-Hours Emergency Dispatch
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                    Listen to the AI qualify an urgent burst pipe, extract the customer property address, and route an instant dispatch notification to the on-call field technician.
                  </p>
                </div>
                <div className="mt-4">
                  <AudioCallPreview
                    src="/demos/plumbing-companies/turn-0.mp3"
                    title="HVAC &amp; Plumbing Intake"
                    scenario="Emergency Dispatch"
                    callerLabel="Burst Pipe Triage"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border/70 bg-surface-page p-5">
                <div>
                  <span className="text-xs font-semibold text-brand">
                    Healthcare
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                    Clinic Intake &amp; Rescheduling
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                    Hear natural conversational turn-taking as the voice agent verifies patient insurance queries and locks in an open appointment slot in Cliniko.
                  </p>
                </div>
                <div className="mt-4">
                  <AudioCallPreview
                    src="/demos/dental-clinics/turn-0.mp3"
                    title="Dental &amp; Clinic Intake"
                    scenario="Patient Booking"
                    callerLabel="Insurance &amp; Calendar Sync"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border/70 bg-surface-page p-5">
                <div>
                  <span className="text-xs font-semibold text-brand">
                    Professional Services
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                    Outbound Speed-to-Lead Callback
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                    Hear the agent call a web-form lead in under 60 seconds of submission, qualify commercial requirements, and book a live discovery consultation.
                  </p>
                </div>
                <div className="mt-4">
                  <AudioCallPreview
                    src="/demos/real-estate-agencies/turn-0.mp3"
                    title="Real Estate &amp; Advisory"
                    scenario="Speed-to-Lead Callback"
                    callerLabel="Discovery Booking"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Turnkey deployment framework
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                From Concept to Live Phone Agent in 7 Days
              </h2>
              <p className="mt-3 text-sm text-foreground/75 md:text-base">
                We engineer, integrate, and stress-test your telephony pipeline so your team experiences zero disruption during transition.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Days 1 to 2
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Call Flow &amp; Knowledge Mapping
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We audit your current call scripts, FAQs, service pricing rules, and qualification criteria to map out every conversation branch, objection, and edge case.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Days 3 to 5
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Custom Voice Build &amp; CRM Integration
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We engineer your agent using low-latency neural voice models and connect it via API to your phone lines (Twilio/SIP), calendar, and CRM (GoHighLevel, HubSpot, Cliniko, or custom webhooks).
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface-page p-6">
                <p className="text-xs font-semibold text-brand">
                  Days 6 to 7
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  Stress-Testing &amp; Live Launch
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  We run dozens of simulated calls, testing regional accents, acoustic background noise, interruptions, and warm human transfers, before safely routing live inbound traffic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: INDUSTRY USE CASES */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-brand">
                Sector Playbooks
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Built for High-Intent Service Businesses
              </h2>
            </div>
            <Link href="/industries" className="text-sm font-semibold text-brand hover:text-brand-deep">
              View all 50+ industries
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border/80 bg-white p-6 shadow-xs">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Home Services &amp; Trades
              </h3>
              <p className="mt-1 text-xs font-medium text-brand">
                HVAC, Plumbing &amp; Roofing
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Capture emergency jobs 24/7, filter out tire-kickers, and dispatch urgent repair jobs automatically to technicians on the road.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-white p-6 shadow-xs">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Medical &amp; Dental Clinics
              </h3>
              <p className="mt-1 text-xs font-medium text-brand">
                Dental, Allied Health &amp; Med Spas
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Handle patient appointment bookings, cancellations, and routine clinic FAQs without placing callers on long hold queues.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-white p-6 shadow-xs">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Real Estate &amp; Advisory
              </h3>
              <p className="mt-1 text-xs font-medium text-brand">
                Property &amp; Consultancies
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Qualify buyers, tenants, and maintenance requests instantly while updating CRM records and inspection calendars in real time.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-white p-6 shadow-xs">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Marketing &amp; Agencies
              </h3>
              <p className="mt-1 text-xs font-medium text-brand">
                Lead-Gen &amp; Media Teams
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Deploy white-label AI voice receptionists to your existing client roster to boost lead retention and generate predictable recurring revenue.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: TECHNICAL SPECIFICATIONS & ARCHITECTURE */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-brand">
                Architectural Standards
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Enterprise Voice Telephony Specifications
              </h2>
              <p className="mt-3 text-sm text-foreground/75 md:text-base">
                Engineered for continuous reliability, compliance, and seamless CRM synchronization.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border/60 bg-surface-page p-5">
                <span className="text-xs font-semibold text-brand">Speech Engine</span>
                <p className="mt-1 text-base font-semibold text-foreground">Deepgram Nova-2</p>
                <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                  Real-time streaming speech-to-text with advanced acoustic filtering for background vehicle, road, and jobsite noise.
                </p>
              </div>

              <div className="rounded-lg border border-border/60 bg-surface-page p-5">
                <span className="text-xs font-semibold text-brand">Voice Latency</span>
                <p className="mt-1 text-base font-semibold text-foreground">Natural Human Turn-Taking</p>
                <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                  Fast response pacing engineered to support natural interruptions, pauses, and barge-in without audio overlapping.
                </p>
              </div>

              <div className="rounded-lg border border-border/60 bg-surface-page p-5">
                <span className="text-xs font-semibold text-brand">Integration Layer</span>
                <p className="mt-1 text-base font-semibold text-foreground">Bi-Directional Webhooks</p>
                <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                  Direct live synchronization with GoHighLevel, HubSpot, ServiceTitan, Jobber, and custom n8n data pipelines.
                </p>
              </div>

              <div className="rounded-lg border border-border/60 bg-surface-page p-5">
                <span className="text-xs font-semibold text-brand">Telephony Security</span>
                <p className="mt-1 text-base font-semibold text-foreground">Carrier SIP Forwarding</p>
                <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
                  Works seamlessly with existing Australian and US phone carriers via conditional call forwarding or SIP trunk routing.
                </p>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="mt-6 rounded-xl border border-border/60 bg-surface-50 p-4 text-xs text-foreground/75">
              <p>
                <strong>Telephony Compliance &amp; Recording Notice:</strong> All voice deployments can be configured with automated call recording disclosures compliant with telecommunications regulations across Australia and the United States. For detailed state and federal compliance guidance, review our guide on{" "}
                <Link href="/insights/ai-call-recording-laws-australia-us" className="text-brand underline hover:text-brand-deep">
                  AI call recording laws in Australia &amp; the US
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: BUYER FAQ ACCORDION */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-12 shadow-xs">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-brand">
                Buyer FAQ
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-foreground/75">
                Answers to the operational questions service business owners ask before deploying an AI voice receptionist.
              </p>
            </div>

            <div className="mt-8">
              <FAQAccordion items={faqItems} defaultOpenIndex={0} />
            </div>
          </div>
        </section>

        {/* SECTION 8: BOTTOM CONVERSION BANNER */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-2xl border border-border bg-foreground px-6 py-12 text-white md:px-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Ready to Automate Your Inbound Phone Lines?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Book a quick 15-minute strategy call to test a custom voice agent tailored to your business workflow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-surface-sunken"
                >
                  Schedule Your Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/try-voice-agent"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
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
