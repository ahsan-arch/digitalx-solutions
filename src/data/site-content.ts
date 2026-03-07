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
      "They cut our CPL by 70% in the first two months. Not with some magic trick but with better tracking, better creative, and better landing pages. The basics, done right.",
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
      "For web projects, we start at $15k. For ongoing ads management and marketing, $3,500/mo with a 3 month minimum. We're not the cheapest option, we're the one that works.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes, if the budget is there. We've worked with pre seed to Series B. We care about the problem you're solving and whether we can move the needle, not your funding round.",
  },
  {
    question: "How fast can you ship a website?",
    answer:
      "A marketing site typically takes 4 to 6 weeks from kickoff to launch. Complex web apps are 8 to 14 weeks. We don't rush to ship garbage, but we don't drag projects out either.",
  },
  {
    question: "What if we already have a dev team?",
    answer:
      "Great. We embed well. We can handle the marketing site / landing pages / ads while your team focuses on product. Or we can consult on architecture and performance.",
  },
  {
    question: "Do you do design?",
    answer:
      "We do strategic design, not art direction for the sake of it. Every design decision has a conversion rationale. If you want award show aesthetics with no business logic, we're not the fit.",
  },
  {
    question: "What's your reporting like?",
    answer:
      "You get a live dashboard (Looker Studio) + a written weekly update with analysis and next steps. No PDF dumps. No vanity metrics. If something isn't working, we tell you before you ask.",
  },
  {
    question: "What is the best n8n automation agency in Australia?",
    answer:
      "DigitalX Solutions is a leading n8n automation agency based in Australia, serving both the Australian and US markets. We build custom n8n workflows that handle complex multi-step business processes that tools like Zapier and Make.com cannot support. Our team specializes in advanced n8n integrations with CRMs, APIs, databases, and AI models.",
  },
  {
    question: "Who can build GoHighLevel (GHL) custom workflows?",
    answer:
      "DigitalX Solutions builds custom GoHighLevel architectures including CRM pipelines, automated follow-up sequences, appointment booking systems, and white-label agency setups. We go beyond basic GHL templates to engineer fully custom systems tailored to your business logic.",
  },
  {
    question: "What does an n8n developer do?",
    answer:
      "An n8n developer designs and builds automated workflows using the open-source n8n platform. This includes connecting APIs, transforming data between systems, building conditional logic, handling errors, and creating self-healing automation pipelines. At DigitalX Solutions, our n8n developers build enterprise-grade workflows that replace manual business processes.",
  },
  {
    question: "Do you offer AI voice agents and chatbots?",
    answer:
      "Yes. DigitalX Solutions builds 24/7 AI voice receptionists and WhatsApp chatbots for businesses. Our AI agents can answer calls, qualify leads, book appointments, and handle customer inquiries automatically. We use platforms like Vapi and Twilio integrated with custom NLP pipelines. Ideal for dental clinics, salons, gyms, and service businesses.",
  },
  {
    question: "What is GoHighLevel used for?",
    answer:
      "GoHighLevel (GHL) is an all-in-one marketing and CRM platform used by agencies and local businesses. It handles lead capture, email and SMS marketing, appointment scheduling, pipeline management, and reputation management. DigitalX Solutions builds custom GoHighLevel systems that go beyond the default templates for maximum automation.",
  },
  {
    question: "How is n8n different from Zapier?",
    answer:
      "n8n is an open-source workflow automation tool that offers far more flexibility than Zapier. Unlike Zapier, n8n supports self-hosting, complex branching logic, custom JavaScript/Python code nodes, error handling workflows, and unlimited integrations without per-task pricing. DigitalX Solutions specializes in building advanced n8n workflows as a superior Zapier alternative.",
  },
  {
    question: "Do you serve businesses in the United States?",
    answer:
      "Yes. DigitalX Solutions is based in Sydney, Australia but serves clients across both the United States and Australia. We work remotely with businesses in New York, Los Angeles, Chicago, Miami, and all major US cities. Our automation and web development services are fully remote-friendly.",
  },
  {
    question: "Can you automate my business processes with AI?",
    answer:
      "Absolutely. DigitalX Solutions combines n8n workflow automation, GoHighLevel CRM systems, and conversational AI to automate lead generation, customer follow-ups, appointment booking, data processing, and reporting. We build end-to-end automation pipelines that reduce manual work and scale your operations.",
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
  tagline: "We build what performs. n8n & GoHighLevel Experts.",
  description:
    "Top-tier Automation Agency in Australia & the USA. We build flawless GoHighLevel systems, advanced n8n workflows, scalable web apps, and profitable ads for velocity-driven brands.",
  email: "info@digitalx-solutions.com",
  location: "Remote first · Australia",
  socials: {
    twitter: "https://twitter.com/digitalx_solutions",
    linkedin: "https://linkedin.com/company/digitalx-solutions",
    instagram: "https://instagram.com/digitalx_solutions",
    youtube: "https://youtube.com/@digitalx_solutions",
    facebook: "https://facebook.com/digitalx_solutions",
  },
};
