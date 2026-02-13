export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  stack: string[]; // Tech used
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
    stack: ["Shopify Plus", "Meta Ads Manager", "TripleWhale"],
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
    stack: ["Next.js", "Three.js", "Vercel"],
    numbers: [
      { label: "Load Time", value: "0.4s" },
      { label: "Conversion", value: "+210%" },
      { label: "Users", value: "50k+" },
    ],
  },
];
