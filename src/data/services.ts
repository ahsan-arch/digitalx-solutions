export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  metrics: string;
  tags: string[];
  colSpan: number; // 1, 2, or 3 for Bento Grid
  href?: string;
};

export const services: ServiceItem[] = [
  {
    id: "automation",
    title: "Advanced Revenue Operations",
    description: "Beyond Zapier. Custom n8n and GoHighLevel architectures that handle complex, multi-step workflows basic agencies can't touch.",
    metrics: "Automated Scale",
    tags: ["n8n", "GoHighLevel", "Custom Architectures"],
    colSpan: 2,
    href: "/services/revenue-operations",
  },
  {
    id: "web-dev",
    title: "High-Performance Web",
    description: "Next.js sites that load in <200ms. SEO-baked architecture. If it's not instant, it's broken.",
    metrics: "98+ Lighthouse",
    tags: ["Next.js 16", "Headless CMS", "WebGL"],
    colSpan: 1,
    href: "/services/nextjs-development",
  },
  {
    id: "meta-ads",
    title: "Meta Ads Engineering",
    description: "We don't 'boost posts'. We engineer full-funnel acquisition systems. Server-side CAPI tailored to bypass iOS14+ signal loss.",
    metrics: "Avg. 4.2x ROAS",
    tags: ["CAPI Setup", "Retargeting Matrix", "Creative Testing"],
    colSpan: 1,
    href: "/services/meta-ads-engineering",
  },
  {
    id: "conversational-ai",
    title: "Conversational AI (WhatsApp & Voice)",
    description: "Ads generate traffic; AI agents instantly qualify and book leads 24/7. drastic improvement in conversion rates.",
    metrics: "24/7 Booking",
    tags: ["WhatsApp Bots", "Voice Agents", "Instant Qualify"],
    colSpan: 2,
    href: "/services/ai-voice-receptionists",
  },
  {
    id: "creative",
    title: "Performance Creative",
    description: "UGC and Motion Graphics designed to stop the scroll. We analyze 3-second hook rates and iterate daily.",
    metrics: "+45% CTR",
    tags: ["Motion Design", "Direct Response", "Script Writing"],
    colSpan: 2,
  },
];
