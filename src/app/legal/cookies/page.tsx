import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/legal/cookies", {
  title: "Cookie Policy | DigitalX Solutions",
  description:
    "What cookies digitalxsolutions.com uses, why we use them, and how you can control or block them in your browser.",
});

const lastUpdated = "April 2026";

export default function CookiesPage() {
  return (
    <main className="pb-20 pt-12">
      <article className="mx-auto w-full max-w-prose px-4 md:px-8">
        <p className="font-mono text-overline text-ink-tertiary">Legal</p>
        <h1 className="mt-3 font-display text-display-md text-ink-primary">Cookie Policy</h1>
        <p className="mt-3 font-mono text-caption text-ink-tertiary">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:text-ink-primary prose-p:text-ink-secondary prose-li:text-ink-secondary prose-a:text-accent">
          <p>
            This page explains how DigitalX Solutions uses cookies and similar tracking technologies on
            digitalxsolutions.com.
          </p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They allow the site to
            remember your actions and preferences across pages and visits.
          </p>

          <h2>Cookies we use</h2>
          <ul>
            <li>
              <strong>Essential</strong> &mdash; required for the site to function (e.g., security headers, form
              CSRF tokens). Cannot be disabled.
            </li>
            <li>
              <strong>Analytics</strong> &mdash; aggregated traffic and performance data. Used only to improve the
              site, never for advertising. Disabled until you opt in.
            </li>
            <li>
              <strong>Advertising</strong> &mdash; if you arrived from a Meta or Google ad, those platforms set
              their own cookies for attribution. We honour Do Not Track and platform-level opt-outs.
            </li>
          </ul>

          <h2>Managing cookies</h2>
          <p>
            All major browsers let you block or delete cookies in their privacy settings. Blocking essential
            cookies may prevent the site from working correctly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:info@digitalxsolutions.com">info@digitalxsolutions.com</a>.
          </p>
        </div>
      </article>
    </main>
  );
}
