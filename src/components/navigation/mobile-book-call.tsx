"use client";

import Link from "next/link";
import { PhoneCall, MessageSquare, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackStrategyCallClick, trackWhatsAppClick } from "@/lib/analytics";
import factsData from "@/data/facts";

/**
 * Flush sticky mobile CTA bar tailored for 390px viewports without floating pill distortion.
 */
export function MobileBookCall() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return (
    <nav
      aria-label="Mobile sticky action bar"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-sm backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <Link
          href="/contact"
          onClick={() => trackStrategyCallClick("mobile_sticky_book")}
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-md bg-brand px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-deep"
        >
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Book a strategy call</span>
        </Link>

        <Link
          href="/try-voice-agent"
          onClick={() => trackStrategyCallClick("mobile_sticky_demo")}
          className="flex h-11 items-center justify-center gap-1.5 rounded-md border border-border bg-surface-page px-3 text-xs font-semibold text-foreground transition-colors hover:bg-surface-sunken"
        >
          <PhoneCall className="h-3.5 w-3.5 text-brand shrink-0" />
          <span>Demo</span>
        </Link>

        <a
          href={factsData.company.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("mobile_sticky")}
          aria-label="Chat with DigitalX Solutions on WhatsApp"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          <MessageSquare className="h-4 w-4" />
        </a>
      </div>
    </nav>
  );
}
