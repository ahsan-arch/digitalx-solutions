"use client";

import Link from "next/link";
import { Phone, PhoneCall, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackPhoneTap, trackStrategyCallClick, trackWhatsAppClick } from "@/lib/analytics";
import factsData from "@/data/facts";

export function MobileBookCall() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  const phoneTel = factsData.company.phoneAU.replace(/\s+/g, "");

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-3 md:hidden">
      <div className="mx-auto flex max-w-sm items-center gap-2">
        <a
          href={`tel:${phoneTel}`}
          onClick={() => trackPhoneTap(factsData.company.phoneAU)}
          aria-label={`Tap to call DigitalX Solutions at ${factsData.company.phoneAU}`}
          className="flex h-12 min-w-[76px] items-center justify-center gap-1.5 rounded-full border border-border/80 bg-white px-3 text-xs font-semibold text-foreground shadow-lg active:scale-95 transition-transform"
        >
          <Phone className="h-4 w-4 text-emerald-600" />
          <span>Call</span>
        </a>

        <a
          href={factsData.company.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("mobile_sticky")}
          aria-label="Chat with DigitalX Solutions on WhatsApp"
          className="flex h-12 min-w-[96px] items-center justify-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 shadow-lg active:scale-95 transition-transform"
        >
          <MessageSquare className="h-4 w-4 text-emerald-600" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/try-voice-agent"
          onClick={() => trackStrategyCallClick("mobile_sticky_demo")}
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand px-3 text-xs font-semibold text-white shadow-lg shadow-brand/25 active:scale-95 transition-transform"
        >
          <PhoneCall className="h-4 w-4 shrink-0" />
          <span className="truncate">Hear Live Call</span>
        </Link>
      </div>
    </div>
  );
}
