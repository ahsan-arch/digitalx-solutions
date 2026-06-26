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
            "Full stack automation and website services: custom n8n workflows, AI voice agents, Next.js websites & Meta Ads CAPI tracking. USA & Australia.",
    },
    webDev: {
        title: "Web Development Agency USA & Australia | Next.js Experts",
        description:
            "Custom web development & design with sub-200ms loads. SEO-baked Next.js architecture, 98+ Lighthouse scores. Top website agency for the USA & Australia.",
    },
    metaAds: {
        title: "Meta Ads Agency | Server-Side Tracking & CAPI | USA & AU",
        description:
            "Stop iOS14 signal loss. Full funnel Meta Ads with Facebook Conversion API & server side tagging. High-ROAS ad automation for US & Australian clients.",
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
    tryVoiceAgent: {
        title: "Try an AI Voice Agent Live | Free Demo for Your Business",
        description:
            "Tell us about your business, pick a voice, and have a live two way conversation with an AI receptionist trained on your details. Free to try.",
    },
};

// ── Primary target keywords for metadata ──
// Ordered by search intent: highest volume terms first
export const seoKeywords = [
    // ★ Top priority: "automation" and "website" terms the user MUST rank for
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
    "server side tracking agency",
    "Facebook Conversion API setup",
    "Meta Ads ROAS optimization",

    // AI & Voice Agents
    "AI voice receptionist",
    "AI appointment booking agent",
    "AI automation agency",
    "conversational AI agency",

    // US local-intent (balance the AU city coverage above)
    "automation agency New York",
    "automation agency Los Angeles",
    "AI voice receptionist USA",
    "GoHighLevel agency USA",
    "Meta Ads agency USA",
    "web development agency New York",

    // Brand + Local
    "DigitalX Solutions",
    "digital agency Sydney",
    "automation company Australia",
    "website company USA",
];


/**
 * Reciprocal hreflang cluster for the geo-targeted pages.
 * en-US -> /usa, en-AU -> /au, x-default -> homepage.
 * Every page in the cluster must list the SAME set of alternates for Google
 * to honour them, so this constant is shared by the homepage, /usa and /au.
 */
export const geoHreflangLanguages = {
    "en-US": `${siteConfig.domain}/usa`,
    "en-AU": `${siteConfig.domain}/au`,
    "x-default": siteConfig.domain,
};

/**
 * Generate hreflang alternates.
 * Only the geo-targeted routes (homepage, /usa, /au) emit en-US/en-AU
 * alternates — pointing two locales at one URL on country-agnostic pages
 * (services, solutions, insights, …) is invalid, so those get a self-canonical only.
 */
function generateHreflangAlternates(route: string) {
    const isGeoPage =
        route === "" || route === "/" || route === "/usa" || route === "/au";
    return {
        canonical: route || "/",
        ...(isGeoPage ? { languages: geoHreflangLanguages } : {}),
    };
}

/**
 * Generate full page metadata with OG, Twitter, hreflang, and canonical for any route.
 */
export function generatePageMetadata(
    route: string,
    copy: { title: string; description: string },
    geo?: { region: string | string[]; placename: string | string[]; position?: string }
): Metadata {
    const url = `${siteConfig.domain}${route}`;
    const ogParams = new URLSearchParams({ title: copy.title });

    // Default to a neutral US+AU signal (no single lat/long, which would pin the
    // whole site to one country). Country pages pass their own geo.
    const geoOther = geo
        ? {
              "geo.region": geo.region,
              "geo.placename": geo.placename,
              ...(geo.position
                  ? { "geo.position": geo.position, ICBM: geo.position.replace(";", ", ") }
                  : {}),
          }
        : {
              "geo.region": ["US", "AU"],
              "geo.placename": ["United States", "Australia"],
          };

    return {
        title: copy.title,
        description: copy.description,
        keywords: seoKeywords,
        authors: [{ name: "DigitalX Solutions", url: siteConfig.domain }],
        creator: "DigitalX Solutions",
        publisher: "DigitalX Solutions",
        alternates: generateHreflangAlternates(route),
        openGraph: {
            type: "website",
            locale: "en_US",
            alternateLocale: ["en_AU"],
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
                    type: "image/png",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
            images: [`/api/og?${ogParams.toString()}`],
            site: siteConfig.social.twitter,
            creator: siteConfig.social.twitter,
        },
        other: geoOther,
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
                alternateName: ["DigitalX", "Digital X Solutions"],
                description:
                    "DigitalX Solutions is a web development, AI automation, and performance marketing agency serving service businesses in the United States and Australia. We build websites, AI voice agents, GoHighLevel and CRM systems, and Meta Ads tracking.",
                disambiguatingDescription:
                    "A digital marketing and software agency. Not a medical imaging, radiology, or X-ray provider.",
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
                    "https://www.instagram.com/digitalx_solutions/",
                    "https://www.facebook.com/people/Digitalx-solutions/61588252343955/",
                    "https://www.linkedin.com/company/digitalx-solutions-aus/",
                    "https://x.com/digitalx_solutions",
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
                    availableLanguage: ["en-US", "en-AU"],
                    areaServed: ["US", "AU"],
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
                slogan: "Revenue systems for teams that need faster growth without operational chaos.",
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
                    "n8n Workflow Automation, Building custom open source automation pipelines as a Zapier alternative",
                    "GoHighLevel (GHL), Custom CRM, pipeline, and marketing automation architecture for agencies",
                    "Next.js Development Agency, Sub-200ms high-performance websites with SEO-baked architecture",
                    "Meta Ads Engineering, Server side CAPI tracking to bypass iOS14+ signal loss",
                    "Conversational AI, 24/7 AI voice receptionists and WhatsApp chatbots for local businesses",
                    "AI Voice Receptionists, Automated phone answering for dental clinics, salons, and gyms",
                    "Revenue Operations (RevOps), End to-end automation of lead capture, nurture, and conversion",
                    "Business Process Automation, Replacing manual workflows with intelligent n8n pipelines",
                    "White-Label Automation for Agencies, Building automation systems agencies can resell",
                    "Digital Marketing Sydney and USA, Full service digital growth for Australian and American businesses",
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
                    "https://en.wikipedia.org/wiki/Pay per-click",
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
        alternateName: ["DigitalX", "Digital X Solutions"],
        url: siteConfig.domain,
        description: seoCopy.home.description,
        publisher: {
            "@id": `${siteConfig.domain}/#organization`,
        },
        inLanguage: ["en-US", "en-AU"],
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: {
            "@id": `${siteConfig.domain}/#organization`,
        },
        speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "h2", "main p"],
        },
    };
}

export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${items[items.length - 1]?.url ?? siteConfig.domain}#breadcrumbs`,
        inLanguage: "en-US",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateItemListSchema(
    name: string,
    items: { name: string; url: string; description?: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.url,
            ...(item.description && { description: item.description }),
        })),
    };
}

export function generateFAQSchema(
    faqs: { question: string; answer: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "en-US",
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

export function generateReviewSchema(testimonial: {
    quote: string;
    author: string;
    role: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: { "@id": `${siteConfig.domain}/#organization` },
        author: {
            "@type": "Person",
            name: testimonial.author,
            jobTitle: testimonial.role,
        },
        reviewBody: testimonial.quote,
    };
}

export function generateArticleSchema(article: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: { name: string; url?: string; jobTitle?: string };
    url: string;
    wordCount?: number;
    articleSection?: string;
    keywords?: string[];
    articleBody?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${article.url}#article`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": article.url,
        },
        headline: article.headline,
        description: article.description,
        image: {
            "@type": "ImageObject",
            url: article.image,
            width: 1200,
            height: 630,
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        author: {
            "@type": "Person",
            name: article.author.name,
            ...(article.author.url && { url: article.author.url }),
            ...(article.author.jobTitle && { jobTitle: article.author.jobTitle }),
        },
        publisher: {
            "@id": `${siteConfig.domain}/#organization`,
        },
        inLanguage: "en-US",
        isAccessibleForFree: true,
        speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "h2", ".prose p"],
        },
        ...(article.wordCount && { wordCount: article.wordCount }),
        ...(article.articleSection && { articleSection: article.articleSection }),
        ...(article.keywords && article.keywords.length > 0 && { keywords: article.keywords.join(", ") }),
        ...(article.articleBody && { articleBody: article.articleBody }),
    };
}

// ── Additional schema helpers ──

export function generateBlogSchema(posts: Array<{
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
}>) {
    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${siteConfig.domain}/insights#blog`,
        url: `${siteConfig.domain}/insights`,
        name: "DigitalX Insights",
        description:
            "Engineering insights on AI automation, n8n workflows, GoHighLevel, server-side tracking, and Next.js performance.",
        publisher: { "@id": `${siteConfig.domain}/#organization` },
        inLanguage: "en-US",
        blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            "@id": `${p.url}#blogposting`,
            headline: p.title,
            description: p.description,
            url: p.url,
            datePublished: p.datePublished,
            dateModified: p.dateModified ?? p.datePublished,
            ...(p.authorName && {
                author: { "@type": "Person", name: p.authorName },
            }),
        })),
    };
}

export function generatePricingSchema(plans: Array<{
    name: string;
    description: string;
    price: string; // numeric or "Custom"
    priceCurrency?: string;
    billingPeriod?: "MONTH" | "YEAR" | "ONE_TIME";
    url: string;
}>) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteConfig.domain}/pricing#service`,
        name: "DigitalX Solutions Automation Packages",
        description:
            "Monthly automation, AI voice, and growth packages for local service businesses in the USA and Australia.",
        provider: { "@id": `${siteConfig.domain}/#organization` },
        areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "Australia" },
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Automation Packages",
            itemListElement: plans.map((plan) => {
                const numericPrice = plan.price.replace(/[^0-9.]/g, "");
                const isNumeric = numericPrice.length > 0;
                return {
                    "@type": "Offer",
                    name: plan.name,
                    description: plan.description,
                    url: plan.url,
                    ...(isNumeric && {
                        price: numericPrice,
                        priceCurrency: plan.priceCurrency ?? "USD",
                        ...(plan.billingPeriod && plan.billingPeriod !== "ONE_TIME" && {
                            priceSpecification: {
                                "@type": "UnitPriceSpecification",
                                price: numericPrice,
                                priceCurrency: plan.priceCurrency ?? "USD",
                                referenceQuantity: {
                                    "@type": "QuantitativeValue",
                                    value: "1",
                                    unitCode: plan.billingPeriod === "YEAR" ? "ANN" : "MON",
                                },
                            },
                        }),
                    }),
                    itemOffered: {
                        "@type": "Service",
                        name: plan.name,
                        description: plan.description,
                        provider: { "@id": `${siteConfig.domain}/#organization` },
                    },
                };
            }),
        },
    };
}

export function generateLocalBusinessSchema(opts: {
    pathname: string;
    name: string;
    description: string;
    addressCountry: "US" | "AU";
    addressRegion?: string;
    addressLocality?: string;
    geo?: { latitude: number; longitude: number };
    areaServed: { type: "Country" | "City"; name: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${siteConfig.domain}${opts.pathname}#localbusiness`,
        name: opts.name,
        url: `${siteConfig.domain}${opts.pathname}`,
        description: opts.description,
        image: `${siteConfig.domain}/api/og`,
        logo: `${siteConfig.domain}/logo.png`,
        email: "info@digitalx-solutions.com",
        telephone: "+61 451 413 786",
        priceRange: "$$$",
        parentOrganization: { "@id": `${siteConfig.domain}/#organization` },
        ...(opts.addressLocality || opts.addressRegion
            ? {
                  address: {
                      "@type": "PostalAddress",
                      ...(opts.addressLocality && { addressLocality: opts.addressLocality }),
                      ...(opts.addressRegion && { addressRegion: opts.addressRegion }),
                      addressCountry: opts.addressCountry,
                  },
              }
            : {}),
        ...(opts.geo && {
            geo: {
                "@type": "GeoCoordinates",
                latitude: opts.geo.latitude,
                longitude: opts.geo.longitude,
            },
        }),
        areaServed: opts.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    };
}

export function generateCollectionPageSchema(opts: {
    name: string;
    description: string;
    url: string;
    items: { name: string; url: string; description?: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${opts.url}#collection`,
        name: opts.name,
        description: opts.description,
        url: opts.url,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteConfig.domain}/#website` },
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: opts.items.length,
            itemListElement: opts.items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                url: item.url,
                ...(item.description && { description: item.description }),
            })),
        },
    };
}

export function generateContactPageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${siteConfig.domain}/contact#contactpage`,
        url: `${siteConfig.domain}/contact`,
        name: "Contact DigitalX Solutions",
        description:
            "Get in touch with DigitalX Solutions to discuss your automation, AI voice, or website project.",
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteConfig.domain}/#website` },
        mainEntity: { "@id": `${siteConfig.domain}/#organization` },
    };
}

export function generateAboutPageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${siteConfig.domain}/about#aboutpage`,
        url: `${siteConfig.domain}/about`,
        name: "About DigitalX Solutions",
        description:
            "Learn about DigitalX Solutions, an AI automation and web development agency serving the USA and Australia.",
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteConfig.domain}/#website` },
        mainEntity: { "@id": `${siteConfig.domain}/#organization` },
    };
}
