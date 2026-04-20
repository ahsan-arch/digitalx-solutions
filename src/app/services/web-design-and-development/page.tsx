import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/services/web-design-and-development", {
  title: "Web Design & Development | Next.js Sites for Service Businesses",
  description:
    "Conversion-focused websites built on Next.js for local service businesses. Sub-200ms load times, SEO-baked architecture, and CRM-ready forms.",
});

const capabilities = [
  "Next.js 15 + App Router architecture",
  "Headless CMS or hand-built content layers",
  "Sub-200ms server response, 95+ Lighthouse",
  "Booking + intake forms wired to your CRM",
  "Server-side analytics and ad attribution",
  "Hosting on Vercel or Cloudflare with edge caching",
];

const positioning = [
  {
    title: "We build sites that close, not sites that look pretty",
    body:
      "Every section is judged by whether it moves a visitor toward booking, calling, or buying. Brand decoration ships only when it earns its place.",
  },
  {
    title: "Engineered for the platforms your customers use",
    body:
      "We test on real devices and slow networks, not just our own desks. Mobile carriers in regional Australia and tier-3 US markets are first-class targets.",
  },
  {
    title: "Plugs into your automation stack from day one",
    body:
      "Forms, calendar embeds, and lead routing connect directly to GoHighLevel, n8n, or your existing CRM — never an isolated WordPress island.",
  },
];

export default function WebDesignDevelopmentPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Services", url: `${siteConfig.domain}/services/web-design-and-development` },
    {
      name: "Web Design & Development",
      url: `${siteConfig.domain}/services/web-design-and-development`,
    },
  ]);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="container-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Also available</p>
        <h1 className="mt-3 max-w-4xl font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
          Web design &amp; development for local service businesses.
        </h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
          We are an automation-first agency. When clients also need a new site &mdash; one engineered to feed leads
          straight into the automation stack &mdash; we build it ourselves on Next.js.
        </p>
      </section>

      <section className="container-shell mt-12 grid gap-8 lg:grid-cols-2">
        {positioning.map((p) => (
          <article key={p.title} className="rounded-lg border border-line-subtle bg-surface-raised p-6 md:p-8">
            <h2 className="font-display text-title-lg text-ink-primary">{p.title}</h2>
            <p className="mt-3 text-body text-ink-secondary">{p.body}</p>
          </article>
        ))}
      </section>

      <section className="container-shell mt-16">
        <h2 className="font-display text-display-sm text-ink-primary">Capabilities</h2>
        <ul className="mt-5 grid gap-3 text-body text-ink-secondary md:grid-cols-2">
          {capabilities.map((c) => (
            <li
              key={c}
              className="rounded-md border border-line-subtle bg-surface-raised px-4 py-3"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-shell mt-16 rounded-lg bg-surface-inverse p-8 md:p-12">
        <h2 className="font-display text-display-sm text-ink-on-inverse">Need a site that earns its hosting bill?</h2>
        <p className="mt-3 max-w-2xl text-body text-ink-on-inverse/80">
          We scope based on the leads you need to capture, not the templates we want to sell.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Request a build quote
        </Link>
      </section>
    </main>
  );
}
