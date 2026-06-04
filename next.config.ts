import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // msedge-tts + ws need runtime loading (not Webpack bundling) so the native
  // WebSocket frame-mask helper resolves correctly on serverless.
  serverExternalPackages: ["nodemailer", "msedge-tts", "ws"],
  async redirects() {
    return [
      // Consolidated secondary services
      { source: "/services/web-dev", destination: "/services/web-design-and-development", permanent: true },
      { source: "/services/nextjs-development", destination: "/services/web-design-and-development", permanent: true },
      { source: "/services/meta-ads-engineering", destination: "/services/meta-ads", permanent: true },
      // Old service pages → matching Solution pages
      { source: "/services/ai-voice-receptionists", destination: "/solutions/ai-voice-agents", permanent: true },
      { source: "/services/conversational-ai", destination: "/solutions/chatbots", permanent: true },
      { source: "/services/revenue-operations", destination: "/solutions/crm-integration", permanent: true },
      // Services index → Solutions hub
      { source: "/services", destination: "/solutions", permanent: true },
      // Locations promoted to top level
      { source: "/locations/usa", destination: "/usa", permanent: true },
      { source: "/locations/australia", destination: "/au", permanent: true },
      { source: "/locations", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        ],
      },
      {
        // Cache static assets for 1 year
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // CDN caching + security headers for all pages
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=600",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=600",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=600",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
          // Security headers — improves SEO trust signals + security posture
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Allow the voice-agent page to request mic permission from this origin.
            // `self` permits use on the same origin only — third-party iframes still blocked.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Report-only first: this never blocks anything, it only surfaces
            // violations in the browser console so the policy can be tuned
            // before switching the key to "Content-Security-Policy" to enforce.
            // 'unsafe-inline'/'unsafe-eval' are required while GTM and Next.js
            // hydration scripts run without per-request nonces. Watch the console
            // for blocked sources (e.g. Meta Pixel) and add them before enforcing.
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
              "font-src 'self' data:",
              "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
              "media-src 'self' blob: data:",
              "frame-src 'self' https://www.googletagmanager.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        // Cache fonts aggressively
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache images
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
