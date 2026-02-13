import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/work",
        "/services",
        "/services/meta-ads",
        "/services/web-dev",
        "/contact",
    ];

    return routes.map((route) => ({
        url: `${siteConfig.domain}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
    }));
}
