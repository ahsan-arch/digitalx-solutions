import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { developmentProjects } from "@/data/redesign";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return developmentProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = developmentProjects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return generatePageMetadata(`/development/${project.slug}`, {
    title: `${project.name} | Custom Development Case Study`,
    description: project.overview,
  });
}

export default async function DevelopmentProjectPage(props: Props) {
  const { slug } = await props.params;
  const project = developmentProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Development", url: `${siteConfig.domain}/#development` },
    { name: project.name, url: `${siteConfig.domain}/development/${project.slug}` },
  ]);

  return (
    <main className="container-shell py-20 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Link
        href="/#development"
        className="mb-8 inline-flex items-center text-sm font-medium text-foreground/60 transition hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="rounded-3xl border border-border bg-surface-50 p-8 md:p-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          Development Project
        </p>
        <h1 className="my-4 font-display text-4xl text-foreground md:text-5xl lg:text-6xl">
          {project.name}
        </h1>
        <p className="mt-4 text-lg font-medium text-brand md:max-w-3xl">
          {project.overview}
        </p>

        <div className="mt-14 max-w-4xl space-y-12">
          {/* Problem Section */}
          <section>
            <h2 className="mb-4 font-display text-2xl text-foreground md:text-3xl">
              The Challenge
            </h2>
            <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
              {project.problem}
            </p>
          </section>

          {/* Solution Section */}
          <section>
            <h2 className="mb-4 font-display text-2xl text-foreground md:text-3xl">
              Our Solution
            </h2>
            <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
              {project.solution}
            </p>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="mb-4 font-display text-2xl text-foreground md:text-3xl">
              Key Features
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features?.map((feature: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 text-sm text-foreground/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack Section */}
          <section>
            <h2 className="mb-4 font-display text-2xl text-foreground md:text-3xl">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex rounded-full bg-surface-100 px-4 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}