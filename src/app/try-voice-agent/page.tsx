import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, HelpCircle, PhoneCall, Sparkles, Zap } from "lucide-react";
import { VoiceAgentExperience } from "./voice-agent-experience";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServicePageSchema,
  seoCopy,
  siteConfig,
} from "@/lib/seo";

export const metadata = generatePageMetadata("/try-voice-agent", seoCopy.tryVoiceAgent);

const demoFaqs = [
  {
    question: "How accurate is the voice agent with accents and background noise?",
    answer:
      "Our underlying models use Deepgram Nova-2 speech-to-text, which handles regional accents (including broad Australian, British, and American dialects) with over 95% word accuracy. Production systems also filter acoustic ambient noise like road traffic or workshop equipment.",
  },
  {
    question: "Is any of my test business data stored or recorded?",
    answer:
      "No. This browser demo runs in a temporary sandbox. Your business name, services, and voice selections are held only in browser memory and are wiped the moment you close or refresh the page.",
  },
  {
    question: "How does the production system differ from this browser demo?",
    answer:
      "This browser demo showcases conversational tone and rapid turn-taking. In production, we wire the AI directly to your telephone lines via SIP trunking, connect it to your live booking calendar (Google, Outlook, Cliniko, ServiceTitan), and sync contact details and call recordings directly to your CRM.",
  },
  {
    question: "Can the AI transfer difficult callers to a real person?",
    answer:
      "Yes. In production deployments, if a caller requests a manager, shows distress, or has an emergency, the AI executes a warm SIP transfer to your mobile or office phone, speaking a 5-second private whisper summary to you before bridging the caller.",
  },
];

export default function TryVoiceAgentPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Voice Demo", url: `${siteConfig.domain}/try-voice-agent` },
  ]);

  const serviceSchema = generateServicePageSchema({
    name: "Live AI Voice Agent Demo",
    description: seoCopy.tryVoiceAgent.description,
    url: `${siteConfig.domain}/try-voice-agent`,
  });

  const faqSchema = generateFAQSchema(demoFaqs);

  return (
    <main id="main" className="pb-20 pt-12">
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

      {/* Hero Section */}
      <section className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive Voice Demo
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            Try an AI voice agent trained on your business.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
            Tell us about your business in a few quick fields, pick a conversational voice, and experience a real-time
            spoken conversation with an AI receptionist. No sign-up, no credit card required &mdash; runs directly in your browser.
          </p>
        </div>
      </section>

      {/* Voice Agent Demo App */}
      <section className="container-shell mt-10">
        <div className="mx-auto max-w-3xl">
          <VoiceAgentExperience />
        </div>
      </section>

      {/* Test Scenarios */}
      <section className="container-shell mt-16">
        <div className="rounded-xl border border-line-subtle bg-surface-raised p-6 md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Testing Ideas</p>
            <h2 className="mt-2 font-display text-display-sm text-ink-primary">
              Sample Scenarios to Test During Your Call
            </h2>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Once you start the call, test how the conversational AI handles real customer situations:
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
              <h3 className="font-display text-base font-semibold text-ink-primary">1. Urgent After-Hours Inquiry</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                Tell the agent you have an emergency repair or sudden issue and need someone dispatched first thing tomorrow morning.
              </p>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
              <h3 className="font-display text-base font-semibold text-ink-primary">2. Pricing &amp; Service Scope</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                Ask about call-out fees, warranty coverage, or hourly rates to test how it conveys pricing without overcommitting.
              </p>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
              <h3 className="font-display text-base font-semibold text-ink-primary">3. Requesting a Callback</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                Explain a complex custom project, give your name and phone number, and ask for the business owner to ring you back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Sandbox vs Full Production Deployment Comparison */}
      <section className="container-shell mt-12">
        <div className="rounded-xl border border-line-subtle bg-surface-sunken p-6 md:p-10">
          <div>
            <h2 className="font-display text-display-sm text-ink-primary">
              Browser Demo vs Full Production Deployment
            </h2>
            <p className="mt-2 text-body-sm text-ink-secondary">
              See what makes our production client installations vastly more powerful than a simple browser sandbox.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line-subtle bg-surface-raised text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
                <tr>
                  <th className="p-3">Capability</th>
                  <th className="p-3">In-Browser Demo</th>
                  <th className="p-3">DigitalX Production Deployment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-subtle text-ink-secondary">
                <tr>
                  <td className="p-3 font-medium text-ink-primary">Audio Delivery</td>
                  <td className="p-3">Web Audio API / Browser Mic</td>
                  <td className="p-3 font-semibold text-accent">Carrier SIP Trunking (Twilio / Telnyx) with crystal-clear telephony codec</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink-primary">Voice Latency</td>
                  <td className="p-3">~800ms &ndash; 1,100ms</td>
                  <td className="p-3 font-semibold text-emerald-600">Sub-700ms ultra-low jitter streaming with natural conversational interruption</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink-primary">Calendar Integration</td>
                  <td className="p-3">Simulated in-session check</td>
                  <td className="p-3 font-semibold text-accent">Live 2-way lock with Google Calendar, Outlook, Cliniko, ServiceTitan, or Jobber</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink-primary">CRM &amp; Pipeline Sync</td>
                  <td className="p-3">Wiped upon disconnect</td>
                  <td className="p-3 font-semibold text-accent">Automatic contact creation, deal staging, and full audio/transcript logs in GoHighLevel or HubSpot</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink-primary">Escalation &amp; Warm Transfer</td>
                  <td className="p-3">Not available</td>
                  <td className="p-3 font-semibold text-emerald-600">SIP transfer to owner mobile with 5-second private whisper briefing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container-shell mt-16">
        <div className="rounded-xl border border-line-subtle bg-surface-raised p-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-display-sm text-ink-primary">Frequently Asked Questions</h2>
              <p className="text-body-sm text-ink-secondary">
                Everything you need to know about testing and deploying AI voice receptionists.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {demoFaqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
                <h3 className="font-display text-base font-semibold text-ink-primary">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="container-shell mt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-line-subtle bg-surface-sunken p-8 text-center md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Ready for a production system?
          </p>
          <h2 className="font-display text-3xl text-ink-primary md:text-4xl">
            We will wire this directly into your business phone line and CRM.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink-secondary md:text-base">
            The live demo gives you the conversational feel. Our turnkey production build adds dedicated local phone numbers,
            calendar booking, automated SMS follow-up, and 24/7 reliability.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions/ai-voice-receptionists"
              className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-surface-raised px-6 py-3 text-sm font-semibold text-ink-primary transition hover:bg-surface-sunken"
            >
              Explore AI voice receptionists
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
