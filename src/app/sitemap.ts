import { MetadataRoute } from "next";
import { siteConfig, geoHreflangLanguages } from "@/lib/seo";
import { articlesData } from "@/data/insights-articles";
import { developmentProjects, results, solutions } from "@/data/redesign";
import { industries } from "@/data/industries";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const geoAlternates = { languages: geoHreflangLanguages };

    const staticEntries: MetadataRoute.Sitemap = [
        { url: siteConfig.domain, changeFrequency: "weekly" as const, priority: 1.0, alternates: geoAlternates },
        { url: `${siteConfig.domain}/solutions`, changeFrequency: "monthly" as const, priority: 0.9 },
        { url: `${siteConfig.domain}/industries`, changeFrequency: "weekly" as const, priority: 0.9 },
        { url: `${siteConfig.domain}/services/web-design-and-development`, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${siteConfig.domain}/services/meta-ads`, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${siteConfig.domain}/work`, changeFrequency: "monthly" as const, priority: 0.8 },
        { url: `${siteConfig.domain}/pricing`, changeFrequency: "monthly" as const, priority: 0.8 },
        { url: `${siteConfig.domain}/process`, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${siteConfig.domain}/about`, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${siteConfig.domain}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${siteConfig.domain}/insights`, changeFrequency: "weekly" as const, priority: 0.8 },
        { url: `${siteConfig.domain}/try-voice-agent`, changeFrequency: "weekly" as const, priority: 0.9 },
        { url: `${siteConfig.domain}/usa`, changeFrequency: "weekly" as const, priority: 0.9, alternates: geoAlternates },
        { url: `${siteConfig.domain}/au`, changeFrequency: "weekly" as const, priority: 0.9, alternates: geoAlternates },
        { url: `${siteConfig.domain}/legal/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
        { url: `${siteConfig.domain}/legal/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
        { url: `${siteConfig.domain}/legal/cookies`, changeFrequency: "yearly" as const, priority: 0.3 },
    ].map((entry) => ({ ...entry, lastModified: now }));

    const solutionEntries: MetadataRoute.Sitemap = solutions.map((s) => ({
        url: `${siteConfig.domain}/solutions/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    const industryEntries: MetadataRoute.Sitemap = industries.map((i) => ({
        url: `${siteConfig.domain}/industries/${i.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    const developmentEntries: MetadataRoute.Sitemap = developmentProjects.map((p) => ({
        url: `${siteConfig.domain}/development/${p.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.7,
    }));

    const workEntries: MetadataRoute.Sitemap = results.map((r) => ({
        url: `${siteConfig.domain}/work/${r.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const articleEntries: MetadataRoute.Sitemap = Object.entries(articlesData).map(([slug, article]) => ({
        url: `${siteConfig.domain}/insights/${slug}`,
        lastModified: new Date(article.dateModified || article.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        ...staticEntries,
        ...solutionEntries,
        ...industryEntries,
        ...developmentEntries,
        ...workEntries,
        ...articleEntries,
    ];
}
