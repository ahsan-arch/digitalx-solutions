"use client";

import Link from "next/link";
import { PhoneCall, MessageSquare, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackStrategyCallClick, trackWhatsAppClick } from "@/lib/analytics";
import factsData from "@/data/facts";

/**
 * Sticky mobile conversion CTA bar matching global CTA hierarchy:
 * Primary CTA ("Book a strategy call") + Secondary ("Hear demo" / WhatsApp).
 */
export function MobileBookCall() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return (
    <nav
      aria-label="Mobile sticky action bar"
      className="fixed inset-x-0 bottom-3 z-40 px-3 md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-border/80 bg-white p-1.5 shadow-lg backdrop-blur-xl">
        <Link
          href="/contact"
          onClick={() => trackStrategyCallClick("mobile_sticky_book")}
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand px-3 text-xs font-semibold text-white shadow-xs active:scale-[0.98] transition-transform"
        >
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Book a strategy call</span>
        </Link>

        <Link
          href="/try-voice-agent"
          onClick={() => trackStrategyCallClick("mobile_sticky_demo")}
          className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface-50 px-3 text-xs font-semibold text-foreground active:scale-[0.98] transition-transform"
        >
          <PhoneCall className="h-3.5 w-3.5 text-brand shrink-0" />
          <span>Hear demo</span>
        </Link>

        <a
          href={factsData.company.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("mobile_sticky")}
          aria-label="Chat with DigitalX Solutions on WhatsApp"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 active:scale-[0.98] transition-transform"
        >
          <MessageSquare className="h-4 w-4" />
        </a>
      </div>
    </nav>
  );
}
