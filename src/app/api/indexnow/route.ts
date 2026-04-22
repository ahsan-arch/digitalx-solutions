import { NextResponse } from "next/server";
import { articlesData } from "@/data/insights-articles";
import { industries, solutions } from "@/data/redesign";

const INDEX_NOW_KEY = "3c12d5a79b40fe68";
const SITE = "https://digitalx-solutions.com";

const STATIC_PATHS = [
    "/",
    "/solutions",
    "/industries",
    "/services/web-design-and-development",
    "/services/meta-ads",
    "/work",
    "/pricing",
    "/process",
    "/about",
    "/contact",
    "/insights",
    "/usa",
    "/au",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
];

export async function GET() {
    if (process.env.VERCEL_ENV !== "production") {
        return NextResponse.json(
            { skipped: true, reason: "IndexNow only runs in production." },
            { status: 200 }
        );
    }

    const dynamicPaths = [
        ...solutions.map((s) => `/solutions/${s.slug}`),
        ...industries.map((i) => `/industries/${i.slug}`),
        ...Object.keys(articlesData).map((slug) => `/insights/${slug}`),
    ];

    const urlList = [...STATIC_PATHS, ...dynamicPaths].map((path) => `${SITE}${path}`);

    try {
        const result = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                host: "digitalx-solutions.com",
                key: INDEX_NOW_KEY,
                keyLocation: `${SITE}/${INDEX_NOW_KEY}.txt`,
                urlList,
            }),
        });

        return NextResponse.json({
            status: result.status,
            statusText: result.statusText,
            urlsSubmitted: urlList.length,
            message:
                result.status === 200 || result.status === 202
                    ? "URLs submitted successfully to IndexNow (Bing, Yandex, Naver)"
                    : "Submission may have failed, check status code",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit to IndexNow", details: String(error) },
            { status: 500 }
        );
    }
}
