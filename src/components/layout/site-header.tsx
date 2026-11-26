"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, Database, PhoneCall, MessageSquare, Layers, Code, ShieldCheck, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MotionProvider } from "@/components/motion/motion-provider";
import { companyProfile, primaryNavigation } from "@/data/redesign";
import { cn } from "@/lib/utils";

const serviceDropdownItems = [
  {
    category: "Custom CRM & Software Architecture",
    items: [
      {
        title: "Custom CRM Development",
        desc: "Bespoke Next.js & PostgreSQL portals with 0 per-seat fees",
        href: "/development/custom-crm-development",
        badge: "Flagship",
        icon: Database,
      },
      {
        title: "White-Label CRM Platforms",
        desc: "Multi-tenant SaaS architectures for agencies and franchises",
        href: "/development/white-label-crm-platform",
        badge: "Multi-Tenant",
        icon: Layers,
      },
      {
        title: "API & Webhook Integrations",
        desc: "Resilient middleware connecting legacy databases and CRMs",
        href: "/development/api-webhook-integrations",
        badge: "Middleware",
        icon: Code,
      },
    ],
  },
  {
    category: "AI Telephony & Revenue Operations",
    items: [
      {
        title: "AI Voice Agents & Receptionists",
        desc: "24/7 low-latency conversational phone intake and triage",
        href: "/solutions/ai-voice-agents",
        badge: "24/7 Intake",
        icon: PhoneCall,
      },
      {
        title: "GoHighLevel CRM Implementation",
        desc: "Turnkey snapshots, 10DLC compliance, and opportunity pipelines",
        href: "/solutions/gohighlevel-implementation",
        badge: "Turnkey",
        icon: ShieldCheck,
      },
      {
        title: "Missed-Call Text-Back",
        desc: "Instant SMS lead recovery in under 60 seconds",
        href: "/solutions/missed-call-text-back",
        badge: "< 60s SLA",
        icon: MessageSquare,
      },
      {
        title: "n8n Workflow Automation",
        desc: "Self-hosted Docker pipelines with zero per-task software fees",
        href: "/solutions/n8n-workflow-automation",
        badge: "Self-Hosted",
        icon: Code,
      },
    ],
  },
];

const EASE_PRECISION: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 24;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  });

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Accessible Escape & outside-click handling with focus restoration
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (dropdownOpen) {
          setDropdownOpen(false);
          servicesBtnRef.current?.focus();
        }
        if (menuOpen) {
          setMenuOpen(false);
          mobileToggleRef.current?.focus();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, dropdownOpen]);

  return (
    <MotionProvider>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-200",
        scrolled
          ? "border-border bg-surface-page/95 backdrop-blur-lg shadow-sm"
          : "border-border/60 bg-surface-page/85 backdrop-blur-md"
      )}
    >
      <div className={cn("mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 md:px-8 transition-all duration-200", scrolled ? "h-16" : "h-18")}>
        <Link href="/" className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded-lg">
          <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/25 bg-surface-50 text-sm font-bold text-brand shadow-2xs transition-transform duration-200 group-hover:scale-105">
            DX
          </span>
          <span className="text-base font-semibold text-foreground">
            {companyProfile.name}
          </span>
        </Link>

        {/* Desktop Navigation (6 Items) */}
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            if (item.label === "Services") {
              const isServicesActive = pathname.startsWith("/solutions") || pathname.startsWith("/development");
              return (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    ref={servicesBtnRef}
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    aria-controls="services-mega-menu"
                    aria-haspopup="true"
                    className={cn(
                      "flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors py-2 rounded-lg px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                      isServicesActive ? "text-foreground font-semibold" : "text-foreground/75 hover:text-foreground"
                    )}
                  >
                    <span>Services</span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                  </button>

                  {/* Animated Mega Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <m.div
                        id="services-mega-menu"
                        role="region"
                        aria-label="Services submenu"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: EASE_PRECISION }}
                        className="absolute left-1/2 -translate-x-1/2 top-full w-[640px] rounded-2xl border border-white/10 bg-[#0d1421]/95 backdrop-blur-xl p-6 shadow-xl origin-top"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {serviceDropdownItems.map((group) => (
                            <div key={group.category} className="space-y-3">
                              <p className="font-mono text-xs font-medium text-brand-deep">
                                {group.category}
                              </p>
                              <div className="space-y-1">
                                {group.items.map((srv) => {
                                  const Icon = srv.icon;
                                  const isItemActive = pathname === srv.href;
                                  return (
                                    <Link
                                      key={srv.href}
                                      href={srv.href}
                                      onClick={() => setDropdownOpen(false)}
                                      className={cn(
                                        "group/item flex items-start gap-2.5 rounded-xl p-2.5 transition-all hover:bg-surface-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                                        isItemActive && "bg-surface-50 ring-1 ring-border"
                                      )}
                                    >
                                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-100 text-foreground/75 group-hover/item:bg-brand/10 group-hover/item:text-brand transition-colors">
                                        <Icon className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs font-semibold text-foreground group-hover/item:text-brand transition-colors">
                                            {srv.title}
                                          </span>
                                          {srv.badge && (
                                            <span className="rounded bg-brand/10 px-1.5 py-0.2 font-mono text-[9px] font-bold text-brand">
                                              {srv.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-[11px] text-foreground/60 leading-tight mt-0.5">
                                          {srv.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                          <Link
                            href="/solutions"
                            onClick={() => setDropdownOpen(false)}
                            className="font-semibold text-brand hover:underline"
                          >
                            View all automation solutions &rarr;
                          </Link>
                          <Link
                            href="/development"
                            onClick={() => setDropdownOpen(false)}
                            className="text-foreground/70 hover:text-foreground"
                          >
                            View all engineering blueprints &rarr;
                          </Link>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-sm font-medium transition-colors rounded-lg px-1.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                  isActive ? "text-foreground font-semibold" : "text-foreground/75 hover:text-foreground",
                  item.label === "Custom CRMs" && "font-semibold text-brand hover:text-brand-deep"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button with sheen + arrow micro-interaction */}
        <div className="hidden xl:block">
          <Link
            href="/contact"
            className="group/cta relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-2xs transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
            />
            <span className="relative">Book a strategy call</span>
            <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          ref={mobileToggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border text-foreground xl:hidden transition-colors hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EASE_PRECISION }}
            className="overflow-hidden border-t border-border/70 bg-surface-page px-4 pb-6 pt-3 xl:hidden max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              <Link
                href="/development/custom-crm-development"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-bold text-brand bg-brand/5 flex items-center justify-between"
              >
                <span>Custom CRM Development</span>
                <span className="font-mono text-[10px] uppercase">Flagship</span>
              </Link>

              <div className="py-2">
                <p className="px-3 text-[11px] font-mono font-semibold text-foreground/75">Services</p>
                <div className="mt-1 space-y-0.5">
                  <Link href="/solutions/ai-voice-agents" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-1.5 text-xs text-foreground/80 hover:bg-surface-sunken">
                    AI Voice Agents &amp; Receptionists
                  </Link>
                  <Link href="/solutions/gohighlevel-implementation" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-1.5 text-xs text-foreground/80 hover:bg-surface-sunken">
                    GoHighLevel CRM Setup
                  </Link>
                  <Link href="/solutions/missed-call-text-back" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-1.5 text-xs text-foreground/80 hover:bg-surface-sunken">
                    Missed-Call Text-Back (&lt; 60s)
                  </Link>
                  <Link href="/solutions/n8n-workflow-automation" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-1.5 text-xs text-foreground/80 hover:bg-surface-sunken">
                    n8n Workflow Automation
                  </Link>
                  <Link href="/development/white-label-crm-platform" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-1.5 text-xs text-foreground/80 hover:bg-surface-sunken">
                    White-Label CRM Platforms
                  </Link>
                </div>
              </div>

              <Link href="/industries" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-sunken">
                Industries
              </Link>
              <Link href="/case-studies" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-sunken">
                Case Studies
              </Link>
              <Link href="/pricing" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-sunken">
                Pricing
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-sunken">
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-2xs"
              >
                <span>Book a strategy call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
    </MotionProvider>
  );
}
