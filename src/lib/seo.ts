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
        title: "DigitalX Solutions | Web Dev & Automation Agency — USA & Australia",
        description:
            "High-performance Next.js websites & intelligent automation systems engineered for revenue. Serving businesses across the United States and Australia. Results, not buzzwords.",
    },
    services: {
        title: "Digital Marketing Services | Web Dev, Ads & Automation",
        description:
            "End-to-end digital infrastructure: sub-second websites, server-side ad tracking, CRM automation & AI agents. Serving USA & Australia.",
    },
    webDev: {
        title: "Next.js Web Development Agency | Fast Sites USA & Australia",
        description:
            "Sub-second Next.js websites engineered for conversion. 100 Lighthouse scores, headless CMS, SEO-baked architecture. Serving the US & Australia.",
    },
    metaAds: {
        title: "Meta Ads Agency | Server-Side Tracking & CAPI Experts",
        description:
            "Full-funnel Meta ad systems with server-side CAPI tracking. Scale past iOS14 signal loss. Avg 4.2x ROAS for clients in USA & Australia.",
    },
    revenueOps: {
        title: "Revenue Operations & CRM Automation | n8n & GoHighLevel",
        description:
            "Automate lead-to-contract workflows with custom n8n, GoHighLevel & HubSpot integrations. Kill manual data entry. USA & Australia.",
    },
    work: {
        title: "Case Studies & Results | DigitalX Solutions Portfolio",
        description:
            "Real numbers, validated stacks. See how we scale revenue for brands with high-performance web systems and Meta ad engineering in USA & AU.",
    },
    contact: {
        title: "Start a Project | DigitalX Solutions — Get in Touch",
        description:
            "Ready to invest in digital infrastructure that converts? Contact DigitalX Solutions. Minimum $15k engagement. Serving USA & Australia.",
    },
    conversationalAI: {
        title: "Conversational AI Agents | WhatsApp & Voice Bots",
        description:
            "AI agents that qualify and book leads 24/7 via WhatsApp & voice. Instant response, autonomous booking. Serving USA & Australia.",
    },
};

// ── Primary target keywords for metadata ──
export const seoKeywords = [
    "web development agency USA",
    "web development agency Australia",
    "Next.js development company",
    "Meta ads agency",
    "Facebook ads agency USA",
    "Meta CAPI tracking",
    "server side tracking",
    "revenue operations automation",
    "GoHighLevel automation",
    "n8n workflow automation",
    "conversational AI agents",
    "WhatsApp business bot",
    "digital marketing agency Sydney",
    "digital marketing agency New York",
    "high performance website development",
    "CRM automation agency",
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
                email: "digitalxsolutions8@gmail.com",
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
                    "Next.js Web Development",
                    "Meta Ads Engineering",
                    "Server-Side Tracking",
                    "Revenue Operations",
                    "Conversational AI",
                    "GoHighLevel Automation",
                    "n8n Workflow Automation",
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
                serviceType: "High-Performance Web Development",
                provider: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                description: seoCopy.webDev.description,
                areaServed: [
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "Australia" },
                ],
            },
            {
                "@type": "Service",
                "@id": `${siteConfig.domain}/#service-revenue-ops`,
                serviceType: "Revenue Operations & CRM Automation",
                provider: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                description: seoCopy.revenueOps.description,
                areaServed: [
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "Australia" },
                ],
            },
            {
                "@type": "Service",
                "@id": `${siteConfig.domain}/#service-conversational-ai`,
                serviceType: "Conversational AI Agents",
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
