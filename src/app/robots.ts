import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    if (process.env.VERCEL_ENV === "preview") {
        return {
            rules: [{ userAgent: "*", disallow: "/" }],
        };
    }

    // High-priority AI crawlers and search grounding bots
    const aiAndSearchBots = [
        "*",
        "Googlebot",
        "Bingbot",
        "GPTBot",             // OpenAI model training
        "OAI-SearchBot",      // OpenAI ChatGPT Search citations & grounding
        "ChatGPT-User",       // OpenAI ChatGPT Browse user sessions
        "ClaudeBot",          // Anthropic model training & web fetch
        "Claude-SearchBot",   // Anthropic Claude Search citations
        "PerplexityBot",      // Perplexity search indexing
        "Perplexity-User",    // Perplexity real-time user browsing
        "Google-Extended",    // Gemini / Google AI Overviews grounding
        "meta-externalagent", // Meta AI web retrieval
        "Bytespider",         // ByteDance
        "Applebot-Extended",  // Apple Intelligence web grounding
        "Amazonbot",          // Amazon Alexa & Bedrock retrieval
        "cohere-ai",          // Cohere Command models
        "DuckAssistBot",      // DuckDuckGo AI Assist
    ];

    const rules = aiAndSearchBots.map((bot) => ({
        userAgent: bot,
        allow: ["/", "/api/og"],
        disallow: ["/api/", "/admin/"],
    }));

    return {
        rules,
        sitemap: `${siteConfig.domain}/sitemap.xml`,
    };
}
