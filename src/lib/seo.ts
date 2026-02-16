import { Metadata } from "next";

export const siteConfig = {
    domain: "https://digitalx-solutions.com",
    social: {
        twitter: "@digitalx_solutions",
    },
};

// The Anti-AI Copy — Punchy, outcome-focused, no buzzwords.
export const seoCopy = {
    home: {
        title: "DigitalX Solutions | High-Performance Web Dev & Meta Ads",
        description: "We build sub-second Next.js sites and engineer server-side Meta ad campaigns. No buzzwords. Just revenue.",
    },
    services: {
        title: "Our Services | Web Dev, Meta Ads & Revenue Ops",
        description: "End-to-end digital infrastructure: sub-second websites, server-side ad tracking, and CRM automation. Everything engineered to convert.",
    },
    webDev: {
        title: "Next.js Development for Revenue. Sub-second Load Times.",
        description: "If your site loads in >2s, you're losing money. We build headless, high-conversion web apps using Next.js 16. Google Core Web Vitals score: 100.",
    },
    metaAds: {
        title: "Meta Ads Engineering. Server-Side Tracking & CAPI.",
        description: "90% of agencies fail because they rely on broken pixels. We engineer full-funnel acquisition systems with offline conversion tracking. Scale past iOS14.",
    },
    revenueOps: {
        title: "Revenue Operations & CRM Integration. Kill Manual Data Entry.",
        description: "Sync leads from ad click to signed contract automatically. We integrate HubSpot, Salesforce, and custom Python scripts to attribute every dollar.",
    },
    work: {
        title: "Our Work | Case Studies & Results",
        description: "Real numbers. Validated stacks. No fluff. See how we scale revenue for brands with high-performance web systems and Meta ad engineering.",
    },
    contact: {
        title: "Start a Project. DigitalX Solutions.",
        description: "Serious inquiries only. If you're ready to invest in infrastructure that actually converts, fill out the terminal. $15k minimum engagement.",
    },
};

/**
 * Generate full page metadata with OG, Twitter, and canonical for any route.
 */
export function generatePageMetadata(
    route: string,
    copy: { title: string; description: string }
): Metadata {
    const url = `${siteConfig.domain}${route}`;
    return {
        title: copy.title,
        description: copy.description,
        alternates: {
            canonical: route || "/",
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url,
            title: copy.title,
            description: copy.description,
            siteName: "DigitalX Solutions",
            images: [
                {
                    url: "/api/og",
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
            images: ["/api/og"],
            creator: siteConfig.social.twitter,
        },
    };
}

// JSON-LD Generators
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
                telephone: "+61 400 000 000", // Replace with actual business number
                sameAs: [
                    "https://twitter.com/digitalx_solutions",
                    "https://linkedin.com/company/digitalx-solutions",
                    "https://instagram.com/digitalx_solutions",
                    "https://youtube.com/@digitalx_solutions",
                    "https://facebook.com/digitalx_solutions",
                ],
                areaServed: {
                    "@type": "GeoCircle",
                    geoMidpoint: {
                        "@type": "GeoCoordinates",
                        latitude: -33.955,
                        longitude: 150.880,
                    },
                    geoRadius: "10000",
                },
            },
            {
                "@type": "Service",
                "@id": `${siteConfig.domain}/#service-meta-ads`,
                serviceType: "Meta Ads Engineering",
                provider: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                description: seoCopy.metaAds.description,
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
