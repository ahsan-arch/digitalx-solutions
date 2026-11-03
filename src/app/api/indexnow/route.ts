import { NextRequest, NextResponse } from "next/server";
import {
    getAllSiteUrls,
    streamSingleUrlToIndexNow,
    streamUrlsSequentially,
    SITE_URL,
} from "@/lib/indexnow";

export const dynamic = "force-dynamic";

/**
 * GET /api/indexnow
 * Supports:
 * - ?url=https://digitalx-solutions.com/pricing  -> Stream single URL in real-time
 * - ?limit=10                                  -> Stream first N priority URLs
 * - Default                                    -> Streams all URLs with paced intervals (streaming mode)
 */
export async function GET(request: NextRequest) {
    if (process.env.VERCEL_ENV !== "production" && process.env.NODE_ENV !== "development") {
        return NextResponse.json(
            { skipped: true, reason: "IndexNow only runs in production environment." },
            { status: 200 }
        );
    }

    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");
    const limitParam = searchParams.get("limit");

    // Case 1: Real-time single-URL streaming (recommended by Bing / IndexNow)
    if (targetUrl) {
        if (!targetUrl.startsWith(SITE_URL)) {
            return NextResponse.json(
                { error: `URL must belong to ${SITE_URL}` },
                { status: 400 }
            );
        }

        const res = await streamSingleUrlToIndexNow(targetUrl);
        return NextResponse.json({
            mode: "streaming",
            type: "single-url",
            url: targetUrl,
            status: res.status,
            success: res.ok,
            message: res.message,
            timestamp: new Date().toISOString(),
        });
    }

    // Case 2: Streaming multiple URLs with polite pacing to prevent server overload
    const allUrls = getAllSiteUrls();
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), allUrls.length) : allUrls.length;
    const urlsToStream = allUrls.slice(0, limit);

    try {
        const streamResults = await streamUrlsSequentially(urlsToStream, {
            delayMs: 100, // 100ms polite spacing between requests
            submitToBing: false, // IndexNow automatically broadcasts to Bingbot
        });

        const successful = streamResults.filter((r) => r.indexNowOk).length;

        return NextResponse.json({
            mode: "streaming",
            type: "sequential-stream",
            totalUrls: allUrls.length,
            streamedCount: streamResults.length,
            successfulCount: successful,
            message: `Streamed ${successful}/${streamResults.length} URLs to IndexNow without batch overload.`,
            sampleResults: streamResults.slice(0, 5),
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to stream to IndexNow", details: error?.message || String(error) },
            { status: 500 }
        );
    }
}

/**
 * POST /api/indexnow
 * Accepts:
 * { "url": "https://digitalx-solutions.com/solutions/ai-voice-agents" }
 * or
 * { "urls": ["https://digitalx-solutions.com/page1", "https://digitalx-solutions.com/page2"] }
 *
 * Streams URLs immediately to IndexNow upon publishing/editing.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => ({}));
        const urlsToStream: string[] = [];

        if (typeof body.url === "string") {
            urlsToStream.push(body.url);
        } else if (Array.isArray(body.urls)) {
            urlsToStream.push(...body.urls.filter((u: any) => typeof u === "string"));
        }

        if (urlsToStream.length === 0) {
            return NextResponse.json(
                { error: "Please provide a 'url' string or 'urls' array in JSON body." },
                { status: 400 }
            );
        }

        // Validate domain
        for (const u of urlsToStream) {
            if (!u.startsWith(SITE_URL)) {
                return NextResponse.json(
                    { error: `All URLs must belong to ${SITE_URL}. Invalid: ${u}` },
                    { status: 400 }
                );
            }
        }

        // Single URL stream
        if (urlsToStream.length === 1) {
            const single = await streamSingleUrlToIndexNow(urlsToStream[0]);
            return NextResponse.json({
                mode: "streaming",
                type: "single-url",
                url: urlsToStream[0],
                status: single.status,
                success: single.ok,
                message: single.message,
                timestamp: new Date().toISOString(),
            });
        }

        // Multiple URLs streaming sequentially
        const results = await streamUrlsSequentially(urlsToStream, {
            delayMs: 150,
        });

        const successful = results.filter((r) => r.indexNowOk).length;

        return NextResponse.json({
            mode: "streaming",
            type: "streamed-list",
            streamedCount: results.length,
            successfulCount: successful,
            message: `Streamed ${successful}/${results.length} URLs to IndexNow.`,
            results,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Streaming submission failed", details: error?.message || String(error) },
            { status: 500 }
        );
    }
}
