"use client";

import Link from "next/link";
import { Phone, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackPhoneTap, trackStrategyCallClick } from "@/lib/analytics";
import factsData from "@/data/facts";

export function MobileBookCall() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  const phoneTel = factsData.company.phoneAU.replace(/\s+/g, "");

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <div className="mx-auto flex max-w-sm items-center gap-2">
        <a
          href={`tel:${phoneTel}`}
          onClick={() => trackPhoneTap(factsData.company.phoneAU)}
          aria-label={`Tap to call DigitalX Solutions at ${factsData.company.phoneAU}`}
          className="flex h-12 min-w-[104px] items-center justify-center gap-1.5 rounded-full border border-border/80 bg-white px-3.5 text-xs font-semibold text-foreground shadow-lg active:scale-95 transition-transform"
        >
          <Phone className="h-4 w-4 text-emerald-600" />
          <span>Call Now</span>
        </a>

        <Link
          href="/try-voice-agent"
          onClick={() => trackStrategyCallClick("mobile_sticky_demo")}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 text-xs font-semibold text-white shadow-lg shadow-brand/25 active:scale-95 transition-transform"
        >
          <PhoneCall className="h-4 w-4" />
          <span>Hear the demo</span>
        </Link>
      </div>
    </div>
  );
}
