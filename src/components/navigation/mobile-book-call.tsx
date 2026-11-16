"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackStrategyCallClick } from "@/lib/analytics";

export function MobileBookCall() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <Link
        href="/contact"
        onClick={() => trackStrategyCallClick("mobile_sticky_bar")}
        className="mx-auto flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/25 active:scale-95 transition-transform"
      >
        <PhoneCall className="h-4 w-4" />
        Book a strategy call
      </Link>
    </div>
  );
}
