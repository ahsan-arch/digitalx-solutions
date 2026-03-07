import { Metadata } from "next";

export const siteConfig = {
    domain: "https://digitalx-solutions.com",
    social: {
        twitter: "@digitalx_solutions",
    },
};

// ── Geo-Targeted, Keyword-Rich SEO Copy ──
// Every title ≤60 chars, every description ≤155 chars, includes US/AU signals
export const seoCopy = {
    home: {
        title: "DigitalX Solutions | n8n & GoHighLevel Automation Agency",
        description: "AI automation & web development agency in Australia & USA. Custom n8n workflows, GoHighLevel systems, and high-ROAS Meta Ads.",
    },
    services: {
        title: "Digital Marketing & Engineering Services | USA & AU",
        description:
            "End-to-end digital infrastructure: sub-second websites, server-side CAPI tracking, bespoke revenue operations & AI voice agents. Serving USA & Australia.",
    },
    webDev: {
        title: "High Performance Web Development Agency | Next.js Experts",
        description:
            "Sub-second Next.js websites engineered for conversion. 100 Lighthouse scores, headless CMS, SEO-baked architecture. Serving the US & Australia.",
    },
    metaAds: {
        title: "Meta Ads Engineering Agency | Server Side CAPI Experts",
        description:
            "Stop iOS14 signal loss. Full-funnel Meta ad systems engineered with server side CAPI tracking. Avg 4.2x ROAS for clients in USA & Australia.",
    },
    revenueOps: {
        title: "Bespoke Revenue Operations & Custom n8n Automation",
        description:
            "Automate workflows with custom n8n & GoHighLevel architectures. Zapier alternatives for complex automation. Serving USA & Australia.",
    },
    work: {
        title: "Case Studies | DigitalX Solutions Engineering Portfolio",
        description:
            "Real numbers, validated stacks. See how we scale revenue with high-performance web systems and Meta CAPI engineering in Sydney, NYC, & beyond.",
    },
    contact: {
        title: "Start a Project | DigitalX Solutions | Get in Touch",
        description:
            "Invest in engineered solutions that convert. Contact our high performance web development and automation agency. Serving USA & Australia.",
    },
    conversationalAI: {
        title: "AI Voice Receptionists & Custom Booking Agents | USA & AU",
        description:
            "Deploy 24/7 AI voice receptionists for dental clinics, salons, and medical practices. Custom conversational AI agents. Serving USA & Australia.",
    },
};

// ── Primary target keywords for metadata ──
export const seoKeywords = [
    // n8n Automation (low competition, high relevance)
    "n8n automation agency",
    "n8n developer for hire",
    "custom n8n workflows",
    "n8n vs Zapier",
    "hire n8n developer",
    "n8n integration specialist",
    // GoHighLevel (growing market)
    "GoHighLevel automation agency",
    "GoHighLevel expert",
    "GoHighLevel custom workflows",
    "hire GoHighLevel expert",
    "GoHighLevel CRM setup agency",
    // AI Voice Agents & Conversational AI (hot, rapidly growing)
    "AI voice receptionist",
    "AI receptionist for dental clinic",
    "AI phone answering service",
    "AI appointment booking agent",
    "AI receptionist for salon",
    "AI answering service for medical practice",
    "WhatsApp chatbot for business",
    // Meta Ads / Facebook CAPI
    "Meta ads agency Australia",
    "Facebook Conversion API setup",
    "server side tracking Meta ads",
    "Meta ads ROAS optimization",
    "Facebook ads agency Sydney",
    // Next.js & Web Development
    "Next.js development agency",
    "high performance website development",
    "headless CMS development agency",
    "web development agency Sydney",
    "React Next.js agency",
    // Geo-targeted
    "AI automation agency Australia",
    "AI automation agency USA",
    "digital agency Sydney",
    "marketing automation agency",
    "automation agency Sydney",
    // Brand
    "DigitalX Solutions",
];

/**
 * Generate hreflang alternates for US + AU targeting.
 * x-default = main domain (en-US)
 */
function generateHreflangAlternates(route: string) {
    const url = `${siteConfig.domain}${route || "/"}`;
    return {
        canonical: route || "/",
        languages: {
            "en-US": url,
            "en-AU": url,
            "x-default": url,
        },
    };
}

/**
 * Generate full page metadata with OG, Twitter, hreflang, and canonical for any route.
 */
export function generatePageMetadata(
    route: string,
    copy: { title: string; description: string }
): Metadata {
    const url = `${siteConfig.domain}${route}`;
    const ogParams = new URLSearchParams({ title: copy.title });

    return {
        title: copy.title,
        description: copy.description,
        keywords: seoKeywords,
        alternates: generateHreflangAlternates(route),
        openGraph: {
            type: "website",
            locale: "en_US",
            url,
            title: copy.title,
            description: copy.description,
            siteName: "DigitalX Solutions",
            images: [
                {
                    url: `/api/og?${ogParams.toString()}`,
                    width: 1200,
                    height: 630,
                    alt: `DigitalX Solutions - ${copy.title}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
            images: [`/api/og?${ogParams.toString()}`],
            creator: siteConfig.social.twitter,
        },
        other: {
            "geo.region": "US, AU",
            "geo.placename": "New York, Sydney",
        },
    };
}

// ── JSON-LD Generators ──

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["ProfessionalService", "LocalBusiness"],
                "@id": `${siteConfig.domain}/#organization`,
                name: "DigitalX Solutions",
                url: siteConfig.domain,
                email: "info@digitalx-solutions.com",
                logo: `${siteConfig.domain}/logo.png`,
                image: `${siteConfig.domain}/api/og`,
                priceRange: "$$$",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "16 Boldrewood Ave",
                    addressLocality: "Casula",
                    addressRegion: "NSW",
                    postalCode: "2170",
                    addressCountry: "AU",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: -33.9519,
                    longitude: 150.9054,
                },
                telephone: "+61 400 000 000",
                sameAs: [
                    "https://twitter.com/digitalx_solutions",
                    "https://linkedin.com/company/digitalx-solutions",
                    "https://instagram.com/digitalx_solutions",
                    "https://youtube.com/@digitalx_solutions",
                    "https://facebook.com/digitalx_solutions",
                ],
                areaServed: [
                    {
                        "@type": "Country",
                        name: "United States",
                    },
                    {
                        "@type": "Country",
                        name: "Australia",
                    },
                    {
                        "@type": "City",
                        name: "Sydney",
                        containedInPlace: { "@type": "Country", name: "Australia" },
                    },
                    {
                        "@type": "City",
                        name: "New York",
                        containedInPlace: { "@type": "Country", name: "United States" },
                    },
                    {
                        "@type": "City",
                        name: "Los Angeles",
                        containedInPlace: { "@type": "Country", name: "United States" },
                    },
                    {
                        "@type": "City",
                        name: "Chicago",
                        containedInPlace: { "@type": "Country", name: "United States" },
                    },
                    {
                        "@type": "City",
                        name: "Miami",
                        containedInPlace: { "@type": "Country", name: "United States" },
                    },
                    {
                        "@type": "City",
                        name: "Melbourne",
                        containedInPlace: { "@type": "Country", name: "Australia" },
                    },
                ],
                knowsAbout: [
                    "n8n Workflow Automation — Building custom open-source automation pipelines as a Zapier alternative",
                    "GoHighLevel (GHL) — Custom CRM, pipeline, and marketing automation architecture for agencies",
                    "Next.js Development Agency — Sub-200ms high-performance websites with SEO-baked architecture",
                    "Meta Ads Engineering — Server-side CAPI tracking to bypass iOS14+ signal loss",
                    "Conversational AI — 24/7 AI voice receptionists and WhatsApp chatbots for local businesses",
                    "AI Voice Receptionists — Automated phone answering for dental clinics, salons, and gyms",
                    "Revenue Operations (RevOps) — End-to-end automation of lead capture, nurture, and conversion",
                    "Business Process Automation — Replacing manual workflows with intelligent n8n pipelines",
                    "White-Label Automation for Agencies — Building automation systems agencies can resell",
                    "Digital Marketing Sydney and USA — Full-service digital growth for Australian and American businesses",
                ],
            },
            {
                "@type": "Service",
                "@id": `${siteConfig.domain}/#service-meta-ads`,
                serviceType: "Meta Ads Engineering",
                provider: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                description: seoCopy.metaAds.description,
                areaServed: [
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "Australia" },
                ],
                sameAs: [
                    "https://en.wikipedia.org/wiki/Social_media_marketing",
                    "https://en.wikipedia.org/wiki/Pay-per-click",
                ],
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Meta Ads Services",
                    itemListElement: [
                        {
                            "@type": "Offer",
                            itemOffered: {
                                "@type": "Service",
                                name: "Retainer Model",
                            },
                            price: "3500",
                            priceCurrency: "USD",
                            priceSpecification: {
                                "@type": "UnitPriceSpecification",
                                price: "3500",
                                priceCurrency: "USD",
                                referenceQuantity: {
                                    "@type": "QuantitativeValue",
                                    value: "1",
                                    unitCode: "MON",
                                },
                            },
                        },
                    ],
                },
            },
            {
                "@type": "Service",
                "@id": `${siteConfig.domain}/#service-web-dev`,
                serviceType: "High Performance Web Development",
                provider: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                description: seoCopy.webDev.description,
                areaServed: [
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "Australia" },
                ],
                category: "Next.js Development Agency",
            },
            {
                "@type": "Service",
                "@id": `${siteConfig.domain}/#service-revenue-ops`,
                serviceType: "Bespoke Revenue Operations & Custom n8n Automation",
                provider: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                description: seoCopy.revenueOps.description,
                areaServed: [
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "Australia" },
                ],
                category: "GoHighLevel Custom Architecture",
            },
            {
                "@type": ["Service", "SoftwareApplication"],
                "@id": `${siteConfig.domain}/#service-conversational-ai`,
                name: "AI Voice Receptionists & Booking Agents",
                serviceType: "Conversational AI Agency",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Cloud, Web, Telephony",
                provider: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                description: seoCopy.conversationalAI.description,
                areaServed: [
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "Australia" },
                ],
            },
        ],
    };
}

export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        name: "DigitalX Solutions",
        url: siteConfig.domain,
        publisher: {
            "@id": `${siteConfig.domain}/#organization`,
        },
        inLanguage: ["en-US", "en-AU"],
    };
}

export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateFAQSchema(
    faqs: { question: string; answer: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function generateServicePageSchema(service: {
    name: string;
    description: string;
    url: string;
    offers?: { name: string; price: string; currency: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
            "@id": `${siteConfig.domain}/#organization`,
        },
        areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "Australia" },
        ],
        ...(service.offers && {
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `${service.name} Pricing`,
                itemListElement: service.offers.map((offer) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: offer.name },
                    price: offer.price,
                    priceCurrency: offer.currency,
                })),
            },
        }),
    };
}

export function generateArticleSchema(article: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    url: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": article.url,
        },
        headline: article.headline,
        description: article.description,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        author: {
            "@type": "Person",
            name: article.authorName,
        },
        publisher: {
            "@id": `${siteConfig.domain}/#organization`,
        },
    };
}
