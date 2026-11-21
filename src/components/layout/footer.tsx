import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { companyProfile, footerColumns } from "@/data/redesign";
import { PlatformIntegrationsStrip } from "@/components/ui";
import { ObfuscatedEmail } from "./obfuscated-email";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-surface-50 py-16">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_2fr]">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-tight text-foreground" aria-label="DigitalX Solutions Homepage">
              {companyProfile.name}
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/80">{companyProfile.tagline}</p>
            <p className="mt-4 text-sm text-foreground/75">{companyProfile.location}</p>

            <div className="mt-3">
              <ObfuscatedEmail />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <a
                href={`tel:${companyProfile.phoneE164}`}
                aria-label={`Call DigitalX Solutions at ${companyProfile.phone}`}
                className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-lg border border-border/80 bg-white px-3.5 py-2 font-medium text-brand transition-colors hover:bg-surface-100 hover:text-brand-deep"
              >
                {companyProfile.phone}
              </a>
              <a
                href={companyProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-lg border border-border/80 bg-white px-3.5 py-2 font-medium text-brand transition-colors hover:bg-surface-100 hover:text-brand-deep"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-xs font-semibold text-foreground">
                  {column.title}
                </h3>
                <ul className="space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[38px] items-center py-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <PlatformIntegrationsStrip />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-foreground/75 md:flex-row md:items-center md:justify-between">
          <p>
            (c) {currentYear} {companyProfile.name}. All rights reserved.
          </p>
          <p>Casula NSW, Australia &amp; US Operations | Built for measurable revenue outcomes.</p>
        </div>
      </div>
    </footer>
  );
}
