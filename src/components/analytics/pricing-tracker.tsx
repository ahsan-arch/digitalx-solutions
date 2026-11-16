"use client";

import { useEffect } from "react";
import { trackPricingView } from "@/lib/analytics";

export function PricingTracker() {
  useEffect(() => {
    trackPricingView("overview");
  }, []);

  return null;
}
