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
        description: "Stop settling for generic performance. We build Next.js sites that load in <200ms and engineer server-side Meta ad campaigns. No buzzwords. Just revenue.",
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
    contact: {
        title: "Start a Project. DigitalX Solutions.",
        description: "Serious inquiries only. If you're ready to invest in infrastructure that actually converts, fill out the terminal. $15k minimum engagement.",
    },
};

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
                sameAs: [
                    "https://twitter.com/digitalx_solutions",
                    "https://linkedin.com/company/digitalx-solutions",
                    "https://instagram.com/digitalx_solutions",
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
