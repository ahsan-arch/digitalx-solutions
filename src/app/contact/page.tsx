import { ContactIntakeForm } from "@/components/forms/contact-intake-form";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { SectionIllustration } from "@/components/ui";
import { companyProfile } from "@/data/redesign";
import { generateBreadcrumbSchema, generateFAQSchema, generatePageMetadata, siteConfig } from "@/lib/seo";
import { HelpCircle, MapPin, PhoneCall, ShieldCheck, Zap } from "lucide-react";

export const metadata = generatePageMetadata("/contact", {
  title: "Book a Strategy Call",
  description:
    "Share your growth goals with DigitalX Solutions. We respond with a practical engineering plan for AI voice agents, CRM automation, and revenue operations.",
});

const consultationFaqs = [
  {
    question: "What happens during the initial discovery strategy call?",
    answer:
      "We spend 20 minutes auditing your current inbound lead flow, missed call volume, and CRM architecture. We identify the specific leaks in your intake process and propose a concrete technical roadmap with exact software requirements, timelines, and fixed-cost tiers.",
  },
  {
    question: "Do I need technical documentation prepared before speaking with you?",
    answer:
      "No. Simply bring an understanding of your current intake pain points, typical call volume, and the tools you currently use (such as your phone carrier, booking calendar, and CRM). We handle all technical scoping and architectural design.",
  },
  {
    question: "Do you sign Mutual Non-Disclosure Agreements (NDAs)?",
    answer:
      "Yes. We routinely sign NDAs prior to discovery sessions for clients with proprietary business processes, custom CRM configurations, or sensitive customer data requirements.",
  },
  {
    question: "How quickly do you reply to contact inquiries?",
    answer:
      "Our solutions engineering team in Casula NSW reviews every submission and responds within one business day with practical scheduling options or initial architectural feedback.",
  },
  {
    question: "Do you work with businesses outside Australia and the United States?",
    answer:
      "Our core operational delivery is optimized for Australian Eastern/Western and US Eastern/Pacific time zones, with full compliance for Australian Privacy Principles, ACMA Spam Act, and US 10DLC A2P carrier regulations. While we consider select UK and Canadian clients on a case-by-case basis, AU and US operators remain our primary focus.",
  },
  {
    question: "What happens if we need custom integrations with proprietary legacy databases?",
    answer:
      "We design custom API middleware in Node.js and TypeScript, connecting legacy SQL or on-premise systems to modern CRM webhooks via secure TLS encrypted tunnels with HMAC authentication.",
  },
];

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Contact", url: `${siteConfig.domain}/contact` },
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.domain}/contact`,
    name: "Contact DigitalX Solutions",
    description:
      "Contact DigitalX Solutions to plan AI voice receptionists, CRM automation, and revenue operations for your business.",
    url: `${siteConfig.domain}/contact`,
    mainEntity: {
      "@id": `${siteConfig.domain}/#organization`,
    },
  };

  const faqSchema = generateFAQSchema(consultationFaqs);

  return (
    <main id="main" className="pb-20 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Contact &amp; Scoping</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">
              Share your goals. We will map the fastest path to measurable improvement.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              Tell us where customer intake or phone lines are leaking revenue right now. We will reply with a clear,
              unpadded recommendation covering technical scope, software sequencing, and expected return on investment.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration
              src="/illustrations/contact.svg"
              alt="Schedule a strategy consultation for AI voice receptionists and workflow automations"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container-shell mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-8">
          <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-sm" style={{ minHeight: '650px' }}>
            <iframe 
              src="https://calendar.app.google/3uYnBF2GrdyswwV59" 
              style={{ border: 0, width: '100%', height: '100%', minHeight: '650px' }} 
              frameBorder="0"
              title="Book a Strategy Call"
              loading="lazy"
            ></iframe>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Or send us a project inquiry</h2>
            <ContactIntakeForm />
          </div>
        </div>

        <aside className="rounded-3xl border border-border bg-white p-6 md:p-8 h-fit space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">What to expect</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-1 text-emerald-600 shrink-0" />
                <span>Direct consultation with an experienced solutions engineer, never a script-reading salesperson.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-4 w-4 mt-1 text-brand shrink-0" />
                <span>Written response within one business day with phased implementation options.</span>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="h-4 w-4 mt-1 text-brand shrink-0" />
                <span>Honest operational fit check before any commercial commitment or contract is discussed.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Casula Office &amp; Coverage</p>
            <p className="mt-2 text-sm text-foreground/72 leading-relaxed">
              16 Boldrewood Ave, Casula NSW 2170, Australia. Onshore Australian engineering team serving businesses across Sydney, Melbourne, Brisbane, and remote delivery nationwide in the US.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Direct Email</p>
            <a href="mailto:info@digitalx-solutions.com" className="mt-2 inline-block text-sm font-medium text-brand hover:underline">
              info@digitalx-solutions.com
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-surface-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Direct Phone &amp; WhatsApp</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={`tel:${companyProfile.phoneE164}`}
                className="text-sm font-medium text-brand transition-colors hover:text-brand-deep"
              >
                {companyProfile.phone}
              </a>
              <a
                href={companyProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-deep"
              >
                <WhatsAppIcon className="h-[1.125rem] w-[1.125rem]" />
                WhatsApp Direct
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Strategy Methodology Section */}
      <section className="container-shell mt-16">
        <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Our 3-Step Intake &amp; Architecture Scoping Methodology
          </h2>
          <p className="mt-2 text-sm text-foreground/70 max-w-2xl">
            We structure every discovery call to ensure you leave with immediate technical clarity, regardless of whether we work together.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3 text-sm text-foreground/75">
            <div className="rounded-2xl border border-border bg-white p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Phase 01</span>
              <h3 className="mt-2 font-display text-base font-semibold text-foreground">Intake Friction Audit</h3>
              <p className="mt-2 text-xs leading-relaxed">
                We calculate your current missed call percentage, secret-shop your after-hours answering experience, and identify where customer inquiries drop off between your ads and CRM.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Phase 02</span>
              <h3 className="mt-2 font-display text-base font-semibold text-foreground">Stack Feasibility Check</h3>
              <p className="mt-2 text-xs leading-relaxed">
                We evaluate your existing software (ServiceTitan, Jobber, Cliniko, HubSpot, or GoHighLevel) to confirm webhook capabilities, two-way calendar sync, and telephony routing feasibility.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Phase 03</span>
              <h3 className="mt-2 font-display text-base font-semibold text-foreground">Fixed-Scope Blueprint</h3>
              <p className="mt-2 text-xs leading-relaxed">
                You receive a transparent engineering proposal outlining system architecture, prompt guardrails, telephony pass-through unit economics, and an agile 4-week launch schedule.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
              Pre-Call Preparation Checklist for Business Owners
            </h3>
            <p className="mt-2 text-xs text-foreground/65 leading-relaxed">
              To make your 20-minute strategy session as high-leverage as possible, it helps to have rough figures for:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs text-foreground/75">
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 mt-1 rounded-full bg-brand shrink-0" />
                <span>Estimated weekly inbound phone calls and typical after-hours missed call percentages.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 mt-1 rounded-full bg-brand shrink-0" />
                <span>Your primary calendar booking software (e.g. Google Calendar, Outlook, Cliniko, ServiceTitan, Jobber).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 mt-1 rounded-full bg-brand shrink-0" />
                <span>Top three customer objections or service inquiries your front-desk staff answer repeatedly.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 mt-1 rounded-full bg-brand shrink-0" />
                <span>Current telephony setup (whether you use VoIP, mobile forwarding, or on-premise PBX).</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container-shell mt-16">
        <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Frequently Asked Consultation Questions
              </h2>
              <p className="text-xs text-foreground/60">
                Clear answers before you book a strategy session with our engineering team.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {consultationFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-border/80 bg-surface-50 p-6">
                <h3 className="font-display text-base font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
