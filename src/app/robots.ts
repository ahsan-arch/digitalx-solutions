import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    if (process.env.VERCEL_ENV === "preview") {
        return {
            rules: [{ userAgent: "*", disallow: "/" }],
        };
    }

    return {
        rules: [
            { userAgent: "*", allow: "/", disallow: "/api/" },
            { userAgent: "GPTBot", allow: "/", disallow: "/api/" },
            { userAgent: "ChatGPT-User", allow: "/" },
            { userAgent: "Google-Extended", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
            { userAgent: "Anthropic-ai", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "Bytespider", allow: "/" },
            { userAgent: "OAI-SearchBot", allow: "/" },
        ],
        sitemap: `${siteConfig.domain}/sitemap.xml`,
    };
}
