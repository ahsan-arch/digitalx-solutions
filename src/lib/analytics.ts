/**
 * Google Tag Manager & GA4 Event Tracking Helper
 * Safely dispatches standard analytics events to window.dataLayer
 */

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
}

export function trackDemoStart(industry?: string) {
  trackEvent("demo_start", {
    category: "engagement",
    industry: industry || "general",
  });
}

export function trackStrategyCallClick(source?: string) {
  trackEvent("strategy_call_click", {
    category: "conversion",
    source: source || "unknown",
  });
}

export function trackWhatsAppClick(source?: string) {
  trackEvent("whatsapp_click", {
    category: "conversion",
    source: source || "unknown",
  });
}

export function trackPhoneTap(phoneNumber?: string) {
  trackEvent("phone_tap", {
    category: "conversion",
    phone: phoneNumber || "+61 451 413 786",
  });
}

export function trackPricingView(tierName?: string) {
  trackEvent("pricing_view", {
    category: "commercial",
    tier: tierName || "overview",
  });
}

export function trackFormSubmit(formName: string, success: boolean = true) {
  trackEvent("form_submit", {
    category: "conversion",
    form_name: formName,
    success,
  });
}

