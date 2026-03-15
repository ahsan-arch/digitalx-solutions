import { NextResponse } from "next/server";

/**
 * IndexNow API endpoint — pings Bing, Yandex, and Naver to re-crawl URLs instantly.
 * Usage: POST /api/indexnow with body { urls: ["/", "/services", ...] }
 * Or GET /api/indexnow to submit all key pages automatically.
 */

const INDEX_NOW_KEY = "3c12d5a79b40fe68";
const SITE = "https://digitalx-solutions.com";

const ALL_URLS = [
    "/",
    "/services",
    "/services/web-dev",
    "/services/meta-ads",
    "/services/revenue-operations",
    "/services/conversational-ai",
    "/services/ai-voice-receptionists",
    "/services/nextjs-development",
    "/services/meta-ads-engineering",
    "/about",
    "/work",
    "/contact",
    "/insights",
    "/insights/n8n-vs-zapier",
    "/insights/ai-voice-receptionists-guide",
    "/insights/server-side-tracking-meta-ads",
    "/locations/usa",
    "/locations/australia",
];

export async function GET() {
    const urlList = ALL_URLS.map((path) => `${SITE}${path}`);

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
            message: result.status === 200 || result.status === 202
                ? "URLs submitted successfully to IndexNow (Bing, Yandex, Naver)"
                : "Submission may have failed — check status code",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit to IndexNow", details: String(error) },
            { status: 500 }
        );
    }
}
