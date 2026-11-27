import Link from "next/link";
import { Phone, ArrowUpRight, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { companyProfile, footerColumns } from "@/data/redesign";
import { PlatformIntegrationsStrip } from "@/components/ui";
import { ObfuscatedEmail } from "./obfuscated-email";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cv-auto border-t border-border bg-white pt-12 pb-24 md:pt-14 md:pb-10">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Studio Brand & Direct Channels */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded bg-foreground font-mono text-xs font-bold tracking-tight text-surface-page"
              >
                DX
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                {companyProfile.name}
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-ink-secondary">
              {companyProfile.tagline}
            </p>

            <div className="space-y-2 border-t border-border/70 pt-4 text-sm">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-tertiary">
                Direct Engineering Contact
              </p>
              <div className="pt-0.5">
                <ObfuscatedEmail />
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-0.5">
                <a
                  href={`tel:${companyProfile.phoneE164}`}
                  aria-label={`Call DigitalX Solutions at ${companyProfile.phone}`}
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
                >
                  <Phone className="h-4 w-4 text-brand shrink-0" />
                  <span>{companyProfile.phone}</span>
                </a>
                <a
                  href={companyProfile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on WhatsApp"
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
                >
                  <WhatsAppIcon className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>WhatsApp Direct</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-tertiary" />
                </a>
              </div>
              <p className="text-xs text-ink-tertiary">
                {companyProfile.location}
              </p>
            </div>
          </div>

          {/* Mobile Accordion Navigation (< md): avoids multi-column vertical sprawl on 390px screens */}
          <div className="md:hidden divide-y divide-border/80 border-y border-border/80">
            {footerColumns.map((column, idx) => (
              <details key={column.title} className="group" open={idx === 0}>
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-foreground select-none [&::-webkit-details-marker]:hidden">
                  <span>{column.title}</span>
                  <ChevronDown className="h-4 w-4 text-ink-tertiary transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <ul className="grid grid-cols-1 gap-1 pb-4 pt-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-[40px] items-center text-sm text-ink-secondary transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          {/* Desktop 5-Column Balanced Grid (>= md) */}
          <div className="hidden md:grid lg:col-span-8 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-tertiary">
                  {column.title}
                </h3>
                <ul className="space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-0.5 text-[13px] leading-snug text-ink-secondary transition-colors hover:text-brand"
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

        <div className="mt-10 md:mt-12">
          <PlatformIntegrationsStrip />
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border/80 pt-6 text-xs text-ink-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {companyProfile.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
            <Link href="/facts" className="hover:text-foreground transition-colors">
              Company Facts
            </Link>
            <span className="hidden md:inline text-border-strong">|</span>
            <span>Serving Australian &amp; US businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
