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
    category: "Custom CRM & Software",
    items: [
      {
        title: "Custom CRM Development",
        desc: "Bespoke Next.js & PostgreSQL portals with zero per-seat fees",
        href: "/development/custom-crm-development",
        tag: "Flagship",
        icon: Database,
      },
      {
        title: "White-Label CRM Platforms",
        desc: "Multi-tenant SaaS architectures for agencies and franchises",
        href: "/development/white-label-crm-platform",
        tag: "Multi-Tenant",
        icon: Layers,
      },
      {
        title: "API & Webhook Integrations",
        desc: "Resilient middleware connecting legacy databases and CRMs",
        href: "/development/api-webhook-integrations",
        tag: "Middleware",
        icon: Code,
      },
    ],
  },
  {
    category: "AI Telephony & Operations",
    items: [
      {
        title: "AI Voice Agents & Receptionists",
        desc: "24/7 low-latency conversational phone intake and triage",
        href: "/solutions/ai-voice-agents",
        tag: "24/7 Voice",
        icon: PhoneCall,
      },
      {
        title: "GoHighLevel CRM Implementation",
        desc: "Turnkey snapshots, 10DLC compliance, and opportunity pipelines",
        href: "/solutions/gohighlevel-implementation",
        tag: "Turnkey",
        icon: ShieldCheck,
      },
      {
        title: "Missed-Call Text-Back",
        desc: "Instant SMS lead recovery in under 60 seconds",
        href: "/solutions/missed-call-text-back",
        tag: "< 60s SLA",
        icon: MessageSquare,
      },
      {
        title: "n8n Workflow Automation",
        desc: "Self-hosted pipelines with zero per-task software fees",
        href: "/solutions/n8n-workflow-automation",
        tag: "Self-Hosted",
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
    const isScrolled = latest > 12;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  });

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

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
          "sticky top-0 z-50 border-b transition-colors duration-200",
          scrolled
            ? "border-border bg-white/95 backdrop-blur-md shadow-xs"
            : "border-border/80 bg-surface-page/95 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded bg-foreground font-mono text-xs font-bold tracking-tight text-surface-page transition-colors group-hover:bg-brand"
            >
              DX
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              {companyProfile.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
            {primaryNavigation.map((item) => {
              if (item.label === "Services") {
                const isServicesActive =
                  pathname.startsWith("/solutions") || pathname.startsWith("/development");
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
                        "flex items-center gap-1 whitespace-nowrap py-5 text-sm font-medium transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                        isServicesActive
                          ? "border-brand text-foreground font-semibold"
                          : "border-transparent text-foreground/75 hover:text-foreground"
                      )}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={cn("h-3.5 w-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <m.div
                          id="services-mega-menu"
                          role="region"
                          aria-label="Services submenu"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.14, ease: EASE_PRECISION }}
                          className="absolute left-1/2 top-full -translate-x-1/2 w-[660px] rounded-lg border border-border bg-white p-6 shadow-md origin-top"
                        >
                          <div className="grid grid-cols-2 gap-8">
                            {serviceDropdownItems.map((group) => (
                              <div key={group.category} className="space-y-3">
                                <p className="border-b border-border/70 pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
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
                                          "group/item flex items-start gap-3 rounded-md p-2.5 transition-colors hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                                          isItemActive && "bg-surface-sunken"
                                        )}
                                      >
                                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded bg-surface-sunken text-foreground/70 group-hover/item:text-brand transition-colors">
                                          <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="text-xs font-semibold text-foreground group-hover/item:text-brand transition-colors">
                                              {srv.title}
                                            </span>
                                            {srv.tag && (
                                              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                                                {srv.tag}
                                              </span>
                                            )}
                                          </div>
                                          <p className="mt-0.5 text-[11px] leading-snug text-foreground/65">
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

                          <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-3.5 text-xs">
                            <Link
                              href="/solutions"
                              onClick={() => setDropdownOpen(false)}
                              className="font-semibold text-brand hover:underline"
                            >
                              All automation solutions &rarr;
                            </Link>
                            <Link
                              href="/development"
                              onClick={() => setDropdownOpen(false)}
                              className="font-medium text-foreground/75 hover:text-foreground"
                            >
                              All engineering blueprints &rarr;
                            </Link>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap border-b-2 py-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                    isActive
                      ? "border-brand text-foreground font-semibold"
                      : "border-transparent text-foreground/75 hover:text-foreground",
                    item.label === "Custom CRMs" && !isActive && "text-brand font-semibold hover:text-brand-deep"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden items-center gap-4 xl:flex">
            <Link
              href="/try-voice-agent"
              className="text-xs font-semibold text-foreground/75 transition-colors hover:text-brand"
            >
              Live AI Demo
            </Link>
            <Link
              href="/contact"
              className="group/cta inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <span>Book a strategy call</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border bg-white text-foreground transition-colors hover:bg-surface-sunken xl:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Clean Architectural Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <m.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: EASE_PRECISION }}
              className="overflow-hidden border-t border-border bg-white shadow-md xl:hidden max-h-[82vh] overflow-y-auto"
            >
              <nav className="mx-auto max-w-[1200px] px-4 py-4 space-y-5" aria-label="Mobile navigation">
                <div>
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground/55">
                    Core Services
                  </p>
                  <div className="divide-y divide-border/60 rounded-lg border border-border/80 bg-surface-page">
                    <Link
                      href="/development/custom-crm-development"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-brand"
                    >
                      <span>Custom CRM Development</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider">Flagship</span>
                    </Link>
                    <Link
                      href="/solutions/ai-voice-agents"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-surface-sunken"
                    >
                      AI Voice Agents &amp; Receptionists
                    </Link>
                    <Link
                      href="/solutions/gohighlevel-implementation"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-surface-sunken"
                    >
                      GoHighLevel CRM Setup
                    </Link>
                    <Link
                      href="/solutions/missed-call-text-back"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-surface-sunken"
                    >
                      Missed-Call Text-Back (&lt; 60s)
                    </Link>
                    <Link
                      href="/solutions/n8n-workflow-automation"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-surface-sunken"
                    >
                      n8n Workflow Automation
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground/55">
                    Explore
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/pricing"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[44px] items-center rounded-md border border-border/80 bg-surface-page px-3.5 text-sm font-medium text-foreground"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/case-studies"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[44px] items-center rounded-md border border-border/80 bg-surface-page px-3.5 text-sm font-medium text-foreground"
                    >
                      Case Studies
                    </Link>
                    <Link
                      href="/industries"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[44px] items-center rounded-md border border-border/80 bg-surface-page px-3.5 text-sm font-medium text-foreground"
                    >
                      Industries
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[44px] items-center rounded-md border border-border/80 bg-surface-page px-3.5 text-sm font-medium text-foreground"
                    >
                      About Us
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <span>Book a strategy call</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/try-voice-agent"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-border bg-surface-page px-4 py-2.5 text-sm font-semibold text-foreground"
                  >
                    <PhoneCall className="h-4 w-4 text-brand" />
                    <span>Hear a live AI demo</span>
                  </Link>
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </MotionProvider>
  );
}
