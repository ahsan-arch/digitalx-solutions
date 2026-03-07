import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: "/api/",
            },
            // Explicitly allow AI search engine crawlers
            {
                userAgent: "GPTBot",
                allow: "/",
                disallow: "/api/",
            },
            {
                userAgent: "ChatGPT-User",
                allow: "/",
            },
            {
                userAgent: "Google-Extended",
                allow: "/",
            },
            {
                userAgent: "PerplexityBot",
                allow: "/",
            },
            {
                userAgent: "Anthropic-ai",
                allow: "/",
            },
            {
                userAgent: "ClaudeBot",
                allow: "/",
            },
            {
                userAgent: "Bytespider",
                allow: "/",
            },
        ],
        sitemap: `${siteConfig.domain}/sitemap.xml`,
    };
}
