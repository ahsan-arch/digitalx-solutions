import Link from "next/link";
import { companyProfile, footerColumns } from "@/data/redesign";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-surface-50 py-16">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_2fr]">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-tight text-foreground">
              {companyProfile.name}
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/70">{companyProfile.tagline}</p>
            <p className="mt-4 text-sm text-foreground/60">{companyProfile.location}</p>
            <a
              href={`mailto:${companyProfile.email}`}
              className="mt-2 inline-block text-sm font-medium text-brand transition-colors hover:text-brand-deep"
            >
              {companyProfile.email}
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-foreground/70 transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-sm text-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>
            (c) {currentYear} {companyProfile.name}. All rights reserved.
          </p>
          <p>Built for measurable growth in the USA and Australia.</p>
        </div>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      </div>
    </footer>
  );
}
