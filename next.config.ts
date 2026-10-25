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
      // Old service pages → matching canonical Solution pages
      { source: "/services/ai-voice-receptionists", destination: "/solutions/ai-voice-agents", permanent: true },
      { source: "/services/conversational-ai", destination: "/solutions/ai-agents-chatbots", permanent: true },
      { source: "/services/revenue-operations", destination: "/solutions/hubspot-automation", permanent: true },
      // Legacy solution aliases → canonical pillar URLs
      { source: "/solutions/ai-voice-receptionists", destination: "/solutions/ai-voice-agents", permanent: true },
      { source: "/solutions/chatbots", destination: "/solutions/ai-agents-chatbots", permanent: true },
      { source: "/solutions/automated-lead-nurturing", destination: "/solutions/lead-generation", permanent: true },
      { source: "/solutions/crm-integration", destination: "/solutions/hubspot-automation", permanent: true },
      // Integration slug aliases
      { source: "/integrations/gohighlevel-ai-voice-agent", destination: "/integrations/gohighlevel", permanent: true },
      { source: "/integrations/n8n-workflows-for-business", destination: "/integrations/n8n", permanent: true },
      { source: "/integrations/hubspot-workflow-automation", destination: "/integrations/hubspot", permanent: true },
      // Services index → Solutions hub
      { source: "/services", destination: "/solutions", permanent: true },
      // Legacy Work index & details → Case Studies
      { source: "/work", destination: "/case-studies", permanent: true },
      { source: "/work/:slug", destination: "/case-studies/:slug", permanent: true },
      // Legacy development sample projects → Development Hub
      { source: "/development/fintrend", destination: "/development", permanent: true },
      { source: "/development/fleetroute", destination: "/development", permanent: true },
      { source: "/development/hostel360", destination: "/development", permanent: true },
      { source: "/development/insightboard", destination: "/development", permanent: true },
      { source: "/development/shopflow", destination: "/development", permanent: true },
      { source: "/development/bookeasy", destination: "/development", permanent: true },
      { source: "/development/leadbridge", destination: "/development", permanent: true },
      { source: "/development/medisync", destination: "/development", permanent: true },
      { source: "/development/voxassist", destination: "/development", permanent: true },
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
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' data: blob: https: wss:",
              "media-src 'self' blob: data:",
              "frame-src 'self' https://www.googletagmanager.com https://calendar.google.com https://calendar.app.google",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      {
        // Cache static files (images, icons, fonts) aggressively for 1 year
        source: "/:path*.(svg|png|jpg|jpeg|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
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
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
