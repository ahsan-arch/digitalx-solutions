import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/legal/terms", {
  title: "Terms of Service | DigitalX Solutions",
  description:
    "Terms governing use of digitalx-solutions.com, our contact forms, and engagements with DigitalX Solutions automation services.",
});

const lastUpdated = "April 2026";

export default function TermsPage() {
  return (
    <main className="pb-20 pt-12">
      <article className="mx-auto w-full max-w-prose px-4 md:px-8">
        <p className="font-mono text-overline text-ink-tertiary">Legal</p>
        <h1 className="mt-3 font-display text-display-md text-ink-primary">Terms of Service</h1>
        <p className="mt-3 font-mono text-caption text-ink-tertiary">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:text-ink-primary prose-p:text-ink-secondary prose-li:text-ink-secondary prose-a:text-accent">
          <p>
            These terms govern your use of digitalx-solutions.com and any services provided by DigitalX Solutions
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using this site or engaging us for services, you accept these
            terms.
          </p>

          <h2>Acceptable use</h2>
          <ul>
            <li>You will not attempt to compromise, scrape, or overload the site or our infrastructure.</li>
            <li>You will not submit forms with deceptive, harmful, or unlawful content.</li>
            <li>You will not use AI-generated submissions to spam our intake.</li>
          </ul>

          <h2>Service engagements</h2>
          <p>
            Engagements are governed by a separate Statement of Work. Pricing, scope, deliverables, and
            cancellation terms are documented in that SOW and supersede the general representations on this site.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All site content (copy, code, illustrations) is owned by DigitalX Solutions unless attributed
            otherwise. Client deliverables are owned by the client upon final payment, except for our internal
            tooling, snapshots, and reusable libraries which remain our property.
          </p>

          <h2>No warranties</h2>
          <p>
            The site is provided &ldquo;as is&rdquo;. We make no guarantees of uninterrupted access, defect-free
            operation, or any specific marketing outcome.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent permitted by law, our liability for any claim arising from use of this site is limited to
            AU$100. Engagement-specific liability is capped per the SOW.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms periodically. Continued use of the site after changes are posted constitutes
            acceptance.
          </p>
        </div>
      </article>
    </main>
  );
}
