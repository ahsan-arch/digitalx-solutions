import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { VoiceAgentExperience } from "./voice-agent-experience";
import {
  generateBreadcrumbSchema,
  generatePageMetadata,
  generateServicePageSchema,
  seoCopy,
  siteConfig,
} from "@/lib/seo";

export const metadata = generatePageMetadata("/try-voice-agent", seoCopy.tryVoiceAgent);

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

      <section className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            Live Demo
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
            Try a voice agent trained on your business.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            Tell us about your business in five quick fields, pick a voice, and have a real
            two way conversation with an AI receptionist. No signup, no card - it runs in
            your browser and your survey is wiped when you leave.
          </p>
        </div>
      </section>

      <section className="container-shell mt-10">
        <div className="mx-auto max-w-3xl">
          <VoiceAgentExperience />
        </div>
      </section>

      <section className="container-shell mt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-border bg-surface-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/55">
            Ready for the real thing?
          </p>
          <h2 className="font-display text-3xl text-foreground md:text-4xl">
            We&apos;ll wire this into your phone line, CRM, and calendar.
          </h2>
          <p className="max-w-xl text-sm text-foreground/65 md:text-base">
            The live demo gives you the conversational shape. Our production deployment adds
            calendar bookings, CRM sync, call transcripts, and 24/7 reliability.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            Book a strategy call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
