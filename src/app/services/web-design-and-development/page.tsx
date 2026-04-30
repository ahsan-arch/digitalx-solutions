import type { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/services/web-design-and-development", {
  title: "Web Design & Development | Next.js Sites for Service Businesses",
  description:
    "Conversion-focused websites built on Next.js for local service businesses. Sub-200ms load times, SEO-baked architecture, and CRM-ready forms.",
});

const faqs = [
  {
    question: "What is Next.js development?",
    answer:
      "Next.js is a React based framework for production websites and web applications. It ships with server side rendering, static generation, image optimization, and routing built in. For a marketing site, Next.js gives you React's component model with SEO friendly server rendering and Lighthouse scores in the high 90s out of the box.",
  },
  {
    question: "Is Next.js still relevant in 2026?",
    answer:
      "Yes, Next.js continues to grow and is now the default framework for most React based production sites. It solves the classic SEO problem with single page React apps (empty initial HTML) by rendering pages on the server, and the App Router added streaming, server components, and partial prerendering that no other React framework currently matches.",
  },
  {
    question: "Is Next.js better for SEO than a plain React site?",
    answer:
      "Significantly better. Plain React apps render an empty HTML shell and only fill it in once JavaScript executes, which crawlers and AI search engines handle inconsistently. Next.js renders each page's HTML on the server (or at build time) so search engines, social previews, and AI crawlers see complete content immediately, and Core Web Vitals scores are much higher.",
  },
  {
    question: "Can Next.js be used to build a Progressive Web App (PWA)?",
    answer:
      "Yes. Next.js works well as a PWA foundation, you add a manifest, a service worker, and offline assets, and ship an installable, app like experience to iOS and Android without a native code base or app store review cycle. We deploy PWAs for booking heavy service businesses where customers expect a one tap return to the site.",
  },
  {
    question: "How long does a custom Next.js website take to build?",
    answer:
      "A focused marketing site with 8 to 15 pages, custom design, CMS, and CRM wired forms typically ships in 4 to 8 weeks. Faster if you bring existing brand assets and content. We stage the work so you see a live preview every week and can redirect priorities before the final cut.",
  },
];

const capabilities = [
  "Next.js 15 + App Router architecture",
  "Headless CMS or hand-built content layers",
  "Sub-200ms server response, 95+ Lighthouse",
  "Booking + intake forms wired to your CRM",
  "Server side analytics and ad attribution",
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
      "We test on real devices and slow networks, not just our own desks. Mobile carriers in regional Australia and tier-3 US markets are first class targets.",
  },
  {
    title: "Plugs into your automation stack from day one",
    body:
      "Forms, calendar embeds, and lead routing connect directly to GoHighLevel, n8n, or your existing CRM, never an isolated WordPress island.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Also available</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              Web design &amp; development for local service businesses.
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
              We are an automation first agency. When clients also need a new site &mdash; one engineered to feed leads
              straight into the automation stack &mdash; we build it ourselves on Next.js.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration src="/illustrations/web-dev.svg" priority />
          </div>
        </div>
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
