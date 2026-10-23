"use client";

import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim();

export function GoogleTagManager() {
  useEffect(() => {
    if (!GTM_ID || typeof window === "undefined") return;

    let loaded = false;
    const initGTM = () => {
      if (loaded) return;
      loaded = true;

      // Remove event listeners once triggered
      window.removeEventListener("scroll", initGTM);
      window.removeEventListener("touchstart", initGTM);
      window.removeEventListener("pointerdown", initGTM);
      window.removeEventListener("keydown", initGTM);

      (function (w: unknown, d: Document, s: string, l: string, i: string) {
        const win = w as Record<string, unknown[]>;
        win[l] = win[l] || [];
        win[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s) as HTMLScriptElement;
        const dl = l !== "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f?.parentNode?.insertBefore(j, f);
      })(window, document, "script", "dataLayer", GTM_ID);
    };

    // Load immediately on any first user interaction (passive, zero impact on TBT)
    window.addEventListener("scroll", initGTM, { passive: true, once: true });
    window.addEventListener("touchstart", initGTM, { passive: true, once: true });
    window.addEventListener("pointerdown", initGTM, { passive: true, once: true });
    window.addEventListener("keydown", initGTM, { passive: true, once: true });

    // Fallback load when main thread has completely finished hydration and is idle
    type WindowWithIdle = Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleWin = window as WindowWithIdle;

    if (typeof idleWin.requestIdleCallback === "function") {
      const idleId = idleWin.requestIdleCallback(initGTM, { timeout: 4000 });
      return () => {
        if (typeof idleWin.cancelIdleCallback === "function") {
          idleWin.cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(initGTM, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}

export function GoogleTagManagerNoscript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
