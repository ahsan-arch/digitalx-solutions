import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";
import { developmentProjects } from "@/data/redesign";

export const metadata = generatePageMetadata("/development", {
  title: "Development Projects | Custom Software and Automation Builds",
  description:
    "Explore custom software and automation projects we have built, from AI voice receptionists and lead automation to ecommerce tracking and analytics dashboards.",
});

export default function DevelopmentPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Development", url: `${siteConfig.domain}/development` },
  ]);

  const itemListSchema = generateItemListSchema(
    "DigitalX Solutions Development Projects",
    developmentProjects.map((project) => ({
      name: project.name,
      url: `${siteConfig.domain}/development/${project.slug}`,
      description: project.overview,
    })),
  );

  return (
    <main id="main" className="pb-20 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="container-shell">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Development</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">
            Custom software and automation we have built.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
            From AI voice receptionists to lead automation, ecommerce tracking, and analytics dashboards, these are the
            kinds of systems we design and ship for service businesses across the USA and Australia.
          </p>
        </div>
      </section>

      <section className="container-shell mt-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {developmentProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/development/${project.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface-50 p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
            >
              <h2 className="font-display text-2xl text-foreground group-hover:text-brand">{project.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{project.overview}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface-100 px-3 py-1 text-[11px] font-medium text-foreground/75"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <span className="mt-auto pt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                View full details
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell mt-12">
        <div className="rounded-3xl border border-border bg-foreground px-6 py-12 text-center text-white md:px-10">
          <h2 className="font-display text-3xl md:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            Tell us what you want to build or automate and we will scope a clear plan with timelines and pricing.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-foreground"
          >
            Book a strategy call
          </Link>
        </div>
      </section>
    </main>
  );
}
