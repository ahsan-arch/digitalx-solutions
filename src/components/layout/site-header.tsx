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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-surface-page/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="DigitalX Solutions">
          <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-sm font-bold text-brand">
            DX
          </span>
          <span className="text-base font-semibold text-foreground">
            {companyProfile.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl bg-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
          >
            Book a strategy call
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground xl:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-border/70 bg-surface-page px-4 pb-5 pt-3 xl:hidden">
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
                      ? "bg-surface-sunken text-foreground"
                      : "text-foreground/70 hover:bg-white hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white"
            >
              Book a strategy call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
