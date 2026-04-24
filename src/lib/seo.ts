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
        title: "#1 Automation & Website Development Agency | USA & Australia",
        description: "DigitalX Solutions: custom business automation, AI workflows & high-performance website development. n8n, GoHighLevel & Next.js experts serving USA & AU.",
    },
    services: {
        title: "Automation & Website Services | AI, n8n, Meta Ads Agency",
        description:
            "Full-stack automation and website services: custom n8n workflows, AI voice agents, Next.js websites & Meta Ads CAPI tracking. USA & Australia.",
    },
    webDev: {
        title: "Web Development Agency USA & Australia | Next.js Experts",
        description:
            "Custom web development & design with sub-200ms loads. SEO-baked Next.js architecture, 98+ Lighthouse scores. Top website agency in Sydney & USA.",
    },
    metaAds: {
        title: "Meta Ads Agency | Server-Side Tracking & CAPI | USA & AU",
        description:
            "Stop iOS14 signal loss. Full-funnel Meta Ads with Facebook Conversion API & server-side tagging. High-ROAS ad automation for US & Australian clients.",
    },
    revenueOps: {
        title: "Business Automation Agency | n8n & GoHighLevel Workflows",
        description:
            "Custom workflow automation with n8n & GoHighLevel CRM. We automate sales pipelines, lead routing & data sync for businesses in the USA & Australia.",
    },
    work: {
        title: "Automation & Website Case Studies | Real Client Results",
        description:
            "See how our automation and website development agency scales revenue. Real numbers: 3.2x ROAS, $2.4M revenue automated, 98+ Lighthouse scores.",
    },
    contact: {
        title: "Hire an Automation & Website Agency | Start Your Project",
        description:
            "Contact DigitalX Solutions, the automation and website development agency serving USA & Australia. Get a free consultation for your project.",
    },
    conversationalAI: {
        title: "AI Voice Receptionists & Automation for Service Businesses",
        description:
            "Deploy 24/7 AI voice agents that answer phones, book appointments & qualify leads. Custom automation for dental clinics, salons & medical practices.",
    },
};

// ── Primary target keywords for metadata ──
// Ordered by search intent: highest-volume terms first
export const seoKeywords = [
    // ★ Top-priority: "automation" and "website" terms the user MUST rank for
    "automation agency",
    "business automation agency",
    "workflow automation agency",
    "automation agency USA",
    "automation agency Australia",
    "website development agency",
    "website design agency",
    "custom website development",
    "website agency USA",
    "website agency Australia",

    // Web Development (Next.js & Headless CMS)
    "Next.js development agency",
    "custom website design and development",
    "website development Sydney",
    "web development agency USA",
    "SEO website development",
    "headless CMS development",

    // Automation & Workflows (n8n & GoHighLevel)
    "n8n automation agency",
    "custom n8n workflows",
    "GoHighLevel automation expert",
    "business process automation",
    "custom workflow automation",
    "marketing automation agency",
    "sales automation agency",
    "CRM automation agency",

    // Meta Ads & Tracking
    "Meta Ads agency Australia",
    "server-side tracking agency",
    "Facebook Conversion API setup",
    "Meta Ads ROAS optimization",

    // AI & Voice Agents
    "AI voice receptionist",
    "AI appointment booking agent",
    "AI automation agency",
    "conversational AI agency",

    // Brand + Local
    "DigitalX Solutions",
    "digital agency Sydney",
    "automation company Australia",
    "website company USA",
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
                    alt: `DigitalX Solutions | ${copy.title}`,
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
                telephone: "+61 451 413 786",
                sameAs: [
                    "https://instagram.com/digitalx_solutions",
                    "https://facebook.com/digitalx_solutions",
                ],
                foundingDate: "2022",
                numberOfEmployees: {
                    "@type": "QuantitativeValue",
                    value: "10",
                },
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    email: "info@digitalx-solutions.com",
                    telephone: "+61 451 413 786",
                    availableLanguage: ["English"],
                },
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                        ],
                        opens: "09:00",
                        closes: "18:00",
                    },
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
                    "n8n Workflow Automation, Building custom open-source automation pipelines as a Zapier alternative",
                    "GoHighLevel (GHL), Custom CRM, pipeline, and marketing automation architecture for agencies",
                    "Next.js Development Agency, Sub-200ms high-performance websites with SEO-baked architecture",
                    "Meta Ads Engineering, Server-side CAPI tracking to bypass iOS14+ signal loss",
                    "Conversational AI, 24/7 AI voice receptionists and WhatsApp chatbots for local businesses",
                    "AI Voice Receptionists, Automated phone answering for dental clinics, salons, and gyms",
                    "Revenue Operations (RevOps), End-to-end automation of lead capture, nurture, and conversion",
                    "Business Process Automation, Replacing manual workflows with intelligent n8n pipelines",
                    "White-Label Automation for Agencies, Building automation systems agencies can resell",
                    "Digital Marketing Sydney and USA, Full-service digital growth for Australian and American businesses",
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
                sameAs: [
                    "https://en.wikipedia.org/wiki/Web_development",
                    "https://en.wikipedia.org/wiki/Next.js",
                ],
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
                sameAs: [
                    "https://en.wikipedia.org/wiki/Revenue_operations",
                    "https://en.wikipedia.org/wiki/Business_process_automation",
                ],
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
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteConfig.domain}/?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
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
