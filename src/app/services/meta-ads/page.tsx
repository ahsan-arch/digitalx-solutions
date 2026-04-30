import type { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/services/meta-ads", {
  title: "Meta Ads Engineering | CAPI + Server-Side Tracking",
  description:
    "Meta Ads management with server side tracking, Conversions API, and full attribution into your CRM. For service businesses spending $5k+/mo.",
});

const faqs = [
  {
    question: "What is server side tracking?",
    answer:
      "Server side tracking sends conversion data from your own server to advertising platforms like Meta and Google, instead of relying on the user's browser to fire pixels. This bypasses ad blockers, iOS App Tracking Transparency, and Safari's Intelligent Tracking Prevention, so you keep accurate attribution even when the browser pixel is blocked.",
  },
  {
    question: "Is server side tracking legal?",
    answer:
      "Yes, server side tracking is legal when configured correctly. You still need to obtain user consent for cookies and tracking under GDPR, CCPA, and the Australian Privacy Principles, hash personal identifiers (email, phone) before sending, and disclose the practice in your privacy policy. The data flow itself is well within the rules, what matters is the consent and hashing layer around it.",
  },
  {
    question: "What is the Meta Conversions API (CAPI)?",
    answer:
      "The Conversions API is Meta's official server side tracking endpoint. Instead of the browser pixel reporting events directly to Facebook, your server sends a secure server to server request after each conversion. Meta deduplicates events between the pixel and CAPI using an event_id, so the server event acts as a fallback when the browser pixel is blocked.",
  },
  {
    question: "Why does server side tracking matter after iOS 14?",
    answer:
      "Since iOS 14.5 introduced App Tracking Transparency, browser pixels miss 20 to 50 percent of conversions for many service businesses. Meta's algorithm needs accurate conversion signals to find your buyers, so missing data inflates reported CPAs and degrades targeting. Clients we move to CAPI typically see Event Match Quality jump from around 4 to 8 plus on a 10 point scale and a 25 percent reduction in measured cost per acquisition within 30 days.",
  },
  {
    question: "How long does it take to set up server side tracking?",
    answer:
      "A standard CAPI plus server tag setup takes 5 to 10 business days, faster if you are already on Next.js or have GTM Server Container access. The work covers infrastructure, event mapping, deduplication, hashing, consent layer, and a parallel run period to validate event match quality before cutting the browser pixel back.",
  },
];

const pillars = [
  {
    title: "Server side tracking by default",
    body:
      "Every account ships with the Conversions API and a server-tag setup. You measure what actually converts, not what iOS 14 lets you see.",
  },
  {
    title: "Creative built around your offers",
    body:
      "We write hooks tied to your booked-job math, not a stock library of swipes. Static, motion, and UGC variants tested weekly.",
  },
  {
    title: "Bid &amp; budget tuning weekly",
    body:
      "Audiences, placements, and budgets reviewed every week. Slow-bleeding ad sets killed inside seven days, not at month-end.",
  },
  {
    title: "Reporting tied to revenue",
    body:
      "Dashboards show booked appointments, won deals, and revenue &mdash; not just clicks. CRM data flows back into Meta for better lookalikes.",
  },
];

export default function MetaAdsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Services", url: `${siteConfig.domain}/services/meta-ads` },
    { name: "Meta Ads", url: `${siteConfig.domain}/services/meta-ads` },
  ]);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Also available</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              Meta Ads engineering, not just &ldquo;ads management&rdquo;.
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
              Most agencies still rely on the browser pixel. We engineer the full attribution loop &mdash; CAPI,
              server side tagging, deduplication &mdash; so Meta can actually find your customers.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration src="/illustrations/meta-ads.svg" priority />
          </div>
        </div>
      </section>

      <section className="container-shell mt-12 grid gap-5 md:grid-cols-2">
        {pillars.map((p) => (
          <article key={p.title} className="rounded-lg border border-line-subtle bg-surface-raised p-6 md:p-8">
            <h2 className="font-display text-title-lg text-ink-primary" dangerouslySetInnerHTML={{ __html: p.title }} />
            <p className="mt-3 text-body text-ink-secondary" dangerouslySetInnerHTML={{ __html: p.body }} />
          </article>
        ))}
      </section>

      <section className="container-shell mt-16">
        <div className="rounded-lg border border-line-subtle bg-surface-raised p-6 md:p-10">
          <h2 className="font-display text-display-sm text-ink-primary">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-line-subtle pb-6 last:border-b-0 last:pb-0">
                <dt className="font-display text-title-md text-ink-primary">{faq.question}</dt>
                <dd className="mt-2 text-body text-ink-secondary">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-shell mt-16 rounded-lg border border-line-subtle bg-surface-sunken p-6 md:p-10">
        <h2 className="font-display text-display-sm text-ink-primary">Who it&rsquo;s for</h2>
        <p className="mt-3 max-w-3xl text-body text-ink-secondary">
          Service businesses spending $5k&ndash;$60k/month on Meta who need attribution they can defend, not a
          dashboard that shows clicks.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Audit my Meta account
        </Link>
      </section>
    </main>
  );
}
