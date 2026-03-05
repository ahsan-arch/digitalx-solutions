"use client";

import Link from "next/link";
import { DigitalXLogo } from "@/components/ui/logo";
import { FloatingDock } from "@/components/navigation/floating-dock";
import { Footer } from "@/components/layout";

/**
 * SubPageLayout — Wraps all interior pages with:
 *   1. A persistent top nav bar (logo + back link)
 *   2. The FloatingDock bottom nav
 *   3. The site Footer
 */
export function SubPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* ── Top Navigation Bar ── */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <DigitalXLogo className="h-7 w-auto text-neon" />
                        <span className="font-display font-bold text-lg tracking-tight text-white">
                            DigitalX Solutions
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/#services"
                            className="text-white/60 hover:text-white font-medium text-sm transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="/#pricing"
                            className="text-white/60 hover:text-white font-medium text-sm transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/#work"
                            className="text-white/60 hover:text-white font-medium text-sm transition-colors"
                        >
                            Case Studies
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-5 py-2 bg-neon text-background rounded-stitch font-medium text-sm hover:bg-neon-vivid transition-colors"
                        >
                            Start Project
                        </Link>
                    </div>
                </div>
            </nav>

            <FloatingDock />

            <main id="main" className="pt-16">
                {children}
            </main>

            <Footer />
        </>
    );
}
