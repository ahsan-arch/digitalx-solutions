import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteConfig.domain,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${siteConfig.domain}/solutions`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteConfig.domain}/solutions/web-development`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteConfig.domain}/solutions/ai-automation`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteConfig.domain}/solutions/performance-marketing`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteConfig.domain}/industries`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteConfig.domain}/industries/home-services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteConfig.domain}/industries/healthcare`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteConfig.domain}/industries/professional-services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteConfig.domain}/work`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteConfig.domain}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteConfig.domain}/locations/usa`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteConfig.domain}/locations/australia`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteConfig.domain}/insights`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${siteConfig.domain}/insights/server-side-tracking-meta-ads`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteConfig.domain}/insights/n8n-vs-zapier`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteConfig.domain}/insights/ai-voice-receptionists-guide`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteConfig.domain}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];
}
