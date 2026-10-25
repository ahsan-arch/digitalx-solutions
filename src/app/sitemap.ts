import { MetadataRoute } from "next";
import { siteConfig, geoHreflangLanguages } from "@/lib/seo";
import { articlesData } from "@/data/insights-articles";
import { developmentProjects, results, solutions } from "@/data/redesign";
import { developmentServices } from "@/data/development-services";
import { integrations } from "@/data/integrations";
import { clientProjects } from "@/data/facts";
import { industries } from "@/data/industries";

export default function sitemap(): MetadataRoute.Sitemap {
    // Stable release timestamp so Googlebot respects <lastmod> instead of
    // treating it as dynamic spam on every crawl request.
    const releaseDate = new Date("2026-04-15T00:00:00.000Z");

    const geoAlternates = { languages: geoHreflangLanguages };

    const staticEntries: MetadataRoute.Sitemap = [
        { url: siteConfig.domain, changeFrequency: "weekly" as const, priority: 1.0, alternates: geoAlternates },
        { url: `${siteConfig.domain}/solutions`, changeFrequency: "monthly" as const, priority: 0.9 },
        { url: `${siteConfig.domain}/industries`, changeFrequency: "weekly" as const, priority: 0.9 },
        { url: `${siteConfig.domain}/integrations`, changeFrequency: "weekly" as const, priority: 0.9 },
        { url: `${siteConfig.domain}/development`, changeFrequency: "monthly" as const, priority: 0.85 },
        { url: `${siteConfig.domain}/case-studies`, changeFrequency: "monthly" as const, priority: 0.8 },
        { url: `${siteConfig.domain}/services/web-design-and-development`, changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${siteConfig.domain}/services/meta-ads`, changeFrequency: "monthly" as const, priority: 0.7 },
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
    ].map((entry) => ({ ...entry, lastModified: releaseDate }));

    const solutionEntries: MetadataRoute.Sitemap = solutions.map((s) => ({
        url: `${siteConfig.domain}/solutions/${s.slug}`,
        lastModified: releaseDate,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    const industryEntries: MetadataRoute.Sitemap = industries.map((i) => ({
        url: `${siteConfig.domain}/industries/${i.slug}`,
        lastModified: releaseDate,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    const devServiceEntries: MetadataRoute.Sitemap = developmentServices.map((s) => ({
        url: `${siteConfig.domain}/development/${s.slug}`,
        lastModified: releaseDate,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    const integrationEntries: MetadataRoute.Sitemap = integrations.map((i) => ({
        url: `${siteConfig.domain}/integrations/${i.slug}`,
        lastModified: releaseDate,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    const caseStudiesEntries: MetadataRoute.Sitemap = clientProjects.map((p) => ({
        url: `${siteConfig.domain}/case-studies/${p.slug}`,
        lastModified: releaseDate,
        changeFrequency: "monthly",
        priority: 0.75,
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
        ...devServiceEntries,
        ...integrationEntries,
        ...caseStudiesEntries,
        ...articleEntries,
    ];
}
