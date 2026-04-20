import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/services/meta-ads", {
  title: "Meta Ads Engineering | CAPI + Server-Side Tracking",
  description:
    "Meta Ads management with server-side tracking, Conversions API, and full attribution into your CRM. For service businesses spending $5k+/mo.",
});

const pillars = [
  {
    title: "Server-side tracking by default",
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

      <section className="container-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Also available</p>
        <h1 className="mt-3 max-w-4xl font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
          Meta Ads engineering, not just &ldquo;ads management&rdquo;.
        </h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
          Most agencies still rely on the browser pixel. We engineer the full attribution loop &mdash; CAPI,
          server-side tagging, deduplication &mdash; so Meta can actually find your customers.
        </p>
      </section>

      <section className="container-shell mt-12 grid gap-5 md:grid-cols-2">
        {pillars.map((p) => (
          <article key={p.title} className="rounded-lg border border-line-subtle bg-surface-raised p-6 md:p-8">
            <h2 className="font-display text-title-lg text-ink-primary" dangerouslySetInnerHTML={{ __html: p.title }} />
            <p className="mt-3 text-body text-ink-secondary" dangerouslySetInnerHTML={{ __html: p.body }} />
          </article>
        ))}
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
