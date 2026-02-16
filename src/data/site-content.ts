export interface Stat {
  value: string;
  label: string;
  context?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

/* ── Social Proof Numbers ── */
export const stats: Stat[] = [
  { value: "$18M+", label: "Revenue generated for clients", context: "Last 24 months" },
  { value: "4.6x", label: "Average ROAS across accounts", context: "Meta Ads, blended" },
  { value: "47", label: "Projects shipped", context: "Since 2022" },
  { value: "<2s", label: "Avg page load time", context: "Across all builds" },
];

/* ── Testimonials ── */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Most agencies talk about strategy. Velocity actually builds things that work. Our site went from a liability to our best salesperson.",
    author: "Rachel Kim",
    role: "CMO",
    company: "Nomad Health",
  },
  {
    quote:
      "They cut our CPL by 70% in the first two months. Not with some magic trick — with better tracking, better creative, and better landing pages. The basics, done right.",
    author: "James Whitfield",
    role: "Head of Growth",
    company: "Carve Finance",
  },
  {
    quote:
      "The site they built us loads faster than our competitors' in every market. That alone moved our conversion rate up 2 points.",
    author: "Priya Desai",
    role: "Director of Digital",
    company: "Atlas Collective",
  },
];

/* ── FAQ ── */
export const faqs: FAQ[] = [
  {
    question: "What's your minimum engagement?",
    answer:
      "For web projects, we start at $15k. For ongoing ads management and marketing, $3,500/mo with a 3-month minimum. We're not the cheapest option — we're the one that works.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes, if the budget is there. We've worked with pre-seed to Series B. We care about the problem you're solving and whether we can move the needle, not your funding round.",
  },
  {
    question: "How fast can you ship a website?",
    answer:
      "A marketing site typically takes 4–6 weeks from kickoff to launch. Complex web apps are 8–14 weeks. We don't rush to ship garbage, but we don't drag projects out either.",
  },
  {
    question: "What if we already have a dev team?",
    answer:
      "Great. We embed well. We can handle the marketing site / landing pages / ads while your team focuses on product. Or we can consult on architecture and performance.",
  },
  {
    question: "Do you do design?",
    answer:
      "We do strategic design — not art direction for the sake of it. Every design decision has a conversion rationale. If you want award-show aesthetics with no business logic, we're not the fit.",
  },
  {
    question: "What's your reporting like?",
    answer:
      "You get a live dashboard (Looker Studio) + a written weekly update with analysis and next steps. No PDF dumps. No vanity metrics. If something isn't working, we tell you before you ask.",
  },
];

/* ── Navigation ── */
export const navigation = {
  main: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  cta: { label: "Start a Project", href: "/contact" },
};

/* ── Company Info ── */
export const company = {
  name: "DigitalX Solutions",
  tagline: "We build what performs.",
  description:
    "Performance-obsessed digital agency. We build fast sites, run profitable ads, and grow brands that care about numbers — not just aesthetics.",
  email: "digitalxsolutions8@gmail.com",
  location: "Remote-first · Australia",
  socials: {
    twitter: "https://twitter.com/digitalx_solutions",
    linkedin: "https://linkedin.com/company/digitalx-solutions",
    instagram: "https://instagram.com/digitalx_solutions",
    youtube: "https://youtube.com/@digitalx_solutions",
    facebook: "https://facebook.com/digitalx_solutions",
  },
};
