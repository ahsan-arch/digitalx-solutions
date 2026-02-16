export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  stack: { name: string; url: string }[]; // Tech used with external links
  numbers: {
    label: string;
    value: string;
  }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "apex-fitness",
    client: "Apex Fitness",
    industry: "E-Commerce",
    challenge: "CPA exploded to $65 after iOS14. Creative fatigue was high.",
    solution: "Implemented server-side tracking (CAPI) and a 'vs' creative strategy comparing generic gyms to Apex home gear.",
    stack: [
      { name: "Shopify Plus", url: "https://www.shopify.com/plus" },
      { name: "Meta Ads Manager", url: "https://www.facebook.com/business/tools/ads-manager" },
      { name: "TripleWhale", url: "https://triplewhale.com/" },
    ],
    numbers: [
      { label: "ROAS", value: "5.1x" },
      { label: "CPA", value: "$22" },
      { label: "Revenue", value: "+$1.2M" },
    ],
  },
  {
    id: "solana-defi",
    client: "Nebula Protocol",
    industry: "Web3 / SaaS",
    challenge: "Slow landing page caused 80% bounce rate. Brand looked generic.",
    solution: "Rebuilt on Next.js. WebGL hero section. Brutalist typography to signal technical dominance.",
    stack: [
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "Three.js", url: "https://threejs.org/" },
      { name: "Vercel", url: "https://vercel.com/" },
    ],
    numbers: [
      { label: "Load Time", value: "0.4s" },
      { label: "Conversion", value: "+210%" },
      { label: "Users", value: "50k+" },
    ],
  },
];
