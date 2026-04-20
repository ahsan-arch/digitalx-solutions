import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/legal/privacy", {
  title: "Privacy Policy | DigitalX Solutions",
  description:
    "How DigitalX Solutions collects, uses, and protects personal information across our website, contact forms, and client integrations.",
});

const lastUpdated = "April 2026";

export default function PrivacyPage() {
  return (
    <main className="pb-20 pt-12">
      <article className="mx-auto w-full max-w-prose px-4 md:px-8">
        <p className="font-mono text-overline text-ink-tertiary">Legal</p>
        <h1 className="mt-3 font-display text-display-md text-ink-primary">Privacy Policy</h1>
        <p className="mt-3 font-mono text-caption text-ink-tertiary">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:text-ink-primary prose-p:text-ink-secondary prose-li:text-ink-secondary prose-a:text-accent">
          <p>
            DigitalX Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates digitalx-solutions.com and provides AI
            voice, automation, and CRM services to local service businesses in the United States and Australia. This
            policy explains what personal information we collect, how we use it, and the choices you have.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>Contact form submissions (name, email, phone, project details, optional file attachments).</li>
            <li>Pricing inquiry details (company, plan of interest, comments).</li>
            <li>Server logs (IP, user agent, requested URL) retained 30 days for security and abuse prevention.</li>
            <li>Cookies and analytics — see our Cookie Policy for details.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to inquiries and deliver requested services.</li>
            <li>To send transactional updates about your project.</li>
            <li>To improve site performance, security, and search ranking.</li>
            <li>To meet legal, regulatory, and tax obligations in the US and Australia.</li>
          </ul>

          <h2>How we share it</h2>
          <p>
            We do not sell personal information. We share data only with processors required to deliver our services
            (e.g., Vercel hosting, Google Workspace email, GoHighLevel CRM, n8n workflow infrastructure). Each
            processor operates under their own data protection agreement.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request access, correction, or deletion of your personal information at any time. Email
            <a href="mailto:info@digitalx-solutions.com"> info@digitalx-solutions.com</a> and we will respond within
            30 days.
          </p>

          <h2>Contact</h2>
          <p>
            DigitalX Solutions, Casula NSW Australia. Email{" "}
            <a href="mailto:info@digitalx-solutions.com">info@digitalx-solutions.com</a>.
          </p>
        </div>
      </article>
    </main>
  );
}
