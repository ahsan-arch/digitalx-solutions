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
  serverExternalPackages: ["nodemailer"],
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
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
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
