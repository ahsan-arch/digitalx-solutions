# DigitalX Solutions — Web Analytics & GA4 / GTM Event Architecture

**Generated:** 2026-11-16  
**Standard:** Google Tag Manager (GTM) Container Specification & GA4 Recommended Event Schema  
**Implementation File:** `src/lib/analytics.ts`

---

## 1. Overview & DataLayer Architecture

DigitalX Solutions dispatches client-side engagement and conversion signals using standard `dataLayer.push` operations. All events execute asynchronously without impacting Time to Interactive (TTI) or Total Blocking Time (TBT).

The master event dispatcher is implemented in `src/lib/analytics.ts`:
```typescript
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
```

---

## 2. Documented GA4 Event Schema

| Event Name | Trigger Condition | Source Component / Route | Parameters Dispatched | Conversion Goal |
| :--- | :--- | :--- | :--- | :--- |
| **`demo_start`** | User initiates the interactive voice agent simulator | `src/components/ui/voice-agent-demo.tsx` (`startDemo()`) | `category: "engagement"`, `industry: string` (e.g., plumbing, dental, hvac) | High-intent engagement |
| **`strategy_call_click`** | User clicks any primary or secondary strategy call booking CTA | `src/components/navigation/mobile-book-call.tsx`, `/contact` | `category: "conversion"`, `source: string` (e.g., `mobile_sticky_bar`, `hero_secondary`) | Lead intent initiation |
| **`form_submit`** | User submits the strategy consultation intake form | `src/components/forms/contact-intake-form.tsx` (`handleSubmit()`) | `category: "conversion"`, `form_name: "strategy_call_intake"`, `success: boolean` | Primary Macro Conversion |
| **`whatsapp_click`** | User clicks direct WhatsApp chat link | `src/components/navigation/mobile-book-call.tsx`, Direct links | `category: "conversion"`, `source: string` | Direct operator outreach |
| **`phone_tap`** | User taps the telephone number or mobile "Call Now" button | `src/components/navigation/mobile-book-call.tsx` | `category: "conversion"`, `phone: "+61 451 413 786"` | Immediate phone inquiry |
| **`pricing_view`** | User navigates to the commercial pricing overview page | `src/components/analytics/pricing-tracker.tsx` (`/pricing`) | `category: "commercial"`, `tier: "overview"` | Commercial consideration |

---

## 3. GTM Container Trigger & Variable Mapping

In Google Tag Manager:
1. **Trigger Configuration:**
   - Create Custom Event triggers for `demo_start`, `strategy_call_click`, `form_submit`, `whatsapp_click`, `phone_tap`, and `pricing_view`.
2. **Variable Configuration:**
   - DataLayer Variable `industry` $\rightarrow$ maps to GA4 Event Parameter `industry`.
   - DataLayer Variable `source` $\rightarrow$ maps to GA4 Event Parameter `traffic_source_element`.
   - DataLayer Variable `form_name` $\rightarrow$ maps to GA4 Event Parameter `form_name`.
3. **GA4 Event Tags:**
   - Fire GA4 Event Tags with Measurement ID `G-XXXXXXXXXX` on matching triggers. Mark `form_submit` and `phone_tap` as Key Events (Conversions) in Google Analytics 4.

