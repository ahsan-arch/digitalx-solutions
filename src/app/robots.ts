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
            { userAgent: "*", allow: ["/", "/api/og"], disallow: "/api/" },
            { userAgent: "GPTBot", allow: ["/", "/api/og"], disallow: "/api/" },
            { userAgent: "ChatGPT-User", allow: "/" },
            { userAgent: "Google-Extended", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
            { userAgent: "Anthropic-ai", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "Claude-User", allow: "/" },
            { userAgent: "Claude-SearchBot", allow: "/" },
            { userAgent: "Bytespider", allow: "/" },
            { userAgent: "OAI-SearchBot", allow: "/" },
            { userAgent: "Perplexity-User", allow: "/" },
            { userAgent: "Applebot-Extended", allow: "/" },
            { userAgent: "meta-externalagent", allow: "/" },
            { userAgent: "DuckAssistBot", allow: "/" },
            { userAgent: "Amazonbot", allow: "/" },
            { userAgent: "cohere-ai", allow: "/" },
        ],
        sitemap: `${siteConfig.domain}/sitemap.xml`,
    };
}
