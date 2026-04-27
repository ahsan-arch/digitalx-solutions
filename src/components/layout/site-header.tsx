"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { companyProfile, primaryNavigation } from "@/data/redesign";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="DigitalX Solutions home">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-100 text-brand">
            DX
          </span>
          <span className="hidden text-lg font-semibold text-foreground/90 sm:block">
            {companyProfile.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-foreground/65 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            Book a strategy call
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-border/70 bg-background/95 px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-surface-100 text-foreground"
                      : "text-foreground/70 hover:bg-surface-50 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white"
            >
              Book a strategy call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
