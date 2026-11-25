"use client";

import { useEffect } from "react";

const APOLLO_APP_ID = process.env.NEXT_PUBLIC_APOLLO_APP_ID || "6a1d2efae60b0b000c601e10";

/**
 * Defers external Apollo tracking script until first user interaction on production domains
 * so initial paint, FCP, and LCP remain unaffected by third-party requests.
 */
export function ApolloTracker() {
  useEffect(() => {
    if (!APOLLO_APP_ID || typeof window === "undefined") return;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;

    let loaded = false;
    const initApollo = () => {
      if (loaded) return;
      loaded = true;

      window.removeEventListener("scroll", initApollo);
      window.removeEventListener("touchstart", initApollo);
      window.removeEventListener("pointerdown", initApollo);
      window.removeEventListener("keydown", initApollo);

      const n = Math.random().toString(36).substring(7);
      const o = document.createElement("script");
      o.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${n}`;
      o.async = true;
      o.defer = true;
      o.onload = () => {
        const win = window as unknown as {
          trackingFunctions?: { onLoad: (cfg: { appId: string }) => void };
        };
        win.trackingFunctions?.onLoad({ appId: APOLLO_APP_ID });
      };
      document.head.appendChild(o);
    };

    window.addEventListener("scroll", initApollo, { passive: true, once: true });
    window.addEventListener("touchstart", initApollo, { passive: true, once: true });
    window.addEventListener("pointerdown", initApollo, { passive: true, once: true });
    window.addEventListener("keydown", initApollo, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", initApollo);
      window.removeEventListener("touchstart", initApollo);
      window.removeEventListener("pointerdown", initApollo);
      window.removeEventListener("keydown", initApollo);
    };
  }, []);

  return null;
}
