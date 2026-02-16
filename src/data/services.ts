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
    id: "meta-ads",
    title: "Meta Ads Engineering",
    description: "We don't 'boost posts'. We engineer full-funnel acquisition systems. Server-side CAPI tailored to bypass iOS14+ signal loss.",
    metrics: "Avg. 4.2x ROAS",
    tags: ["CAPI Setup", "Retargeting Matrix", "Creative Testing"],
    colSpan: 2,
    href: "/services/meta-ads",
  },
  {
    id: "web-dev",
    title: "High-Performance Web",
    description: "Next.js sites that load in <200ms. SEO-baked architecture. If it's not instant, it's broken.",
    metrics: "98+ Lighthouse",
    tags: ["Next.js 16", "Headless CMS", "WebGL"],
    colSpan: 1,
    href: "/services/web-dev",
  },
  {
    id: "automation",
    title: "Revenue Operations",
    description: "Kill manual data entry. CRM integrations that sync leads from ad click to signed contract automatically.",
    metrics: "10h/wk Saved",
    tags: ["Zapier", "HubSpot", "Python Scripts"],
    colSpan: 1,
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
