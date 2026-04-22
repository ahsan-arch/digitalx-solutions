import { ContactIntakeForm } from "@/components/forms/contact-intake-form";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata = generatePageMetadata("/contact", {
    title: "Contact DigitalX Solutions | Book a Strategy Call",
    description:
        "Share your growth objectives with DigitalX Solutions. We respond with a practical plan for web, automation, and performance execution.",
});

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
            "Contact DigitalX Solutions to plan web development, automation, and performance initiatives for your business.",
        url: `${siteConfig.domain}/contact`,
        mainEntity: {
            "@id": `${siteConfig.domain}/#organization`,
        },
    };

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

            <section className="container-shell">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Contact</p>
                <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
                    Share your goals. We will map the fastest path to measurable improvement.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                    Tell us where growth is getting blocked right now. We will reply with a clear recommendation on
                    scope, sequencing, and expected outcomes.
                </p>
            </section>

            <section className="container-shell mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="flex flex-col gap-8">
                    <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-sm" style={{ minHeight: '650px' }}>
                        <iframe 
                            src="https://calendar.app.google/3uYnBF2GrdyswwV59" 
                            style={{ border: 0, width: '100%', height: '100%', minHeight: '650px' }} 
                            frameBorder="0"
                            title="Book a Strategy Call"
                        ></iframe>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Or send us a message</h2>
                        <ContactIntakeForm />
                    </div>
                </div>

                <aside className="rounded-3xl border border-border bg-white p-6 md:p-8 h-fit">
                    <h2 className="text-xl font-semibold text-foreground">What to expect</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
                        <li>- Response within one business day</li>
                        <li>- Clear recommendation with phased options</li>
                        <li>- Honest fit check before any commitment</li>
                    </ul>

                    <div className="mt-8 rounded-2xl border border-border bg-surface-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Coverage</p>
                        <p className="mt-2 text-sm text-foreground/72">Sydney, Australia and remote delivery for teams across the United States.</p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-border bg-surface-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Email</p>
                        <a href="mailto:info@digitalx-solutions.com" className="mt-2 inline-block text-sm font-medium text-brand">
                            info@digitalx-solutions.com
                        </a>
                    </div>
                </aside>
            </section>
        </main>
    );
}
