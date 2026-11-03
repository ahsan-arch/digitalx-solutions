/**
 * IndexNow & Bing Real-Time Streaming Submission Engine
 *
 * Replaces legacy batch dumps with real-time streaming mode:
 * - Submits individual URLs or small paced groups as changes occur.
 * - Prevents crawler / server overload.
 * - Broadcasts instantly to Bing, Yandex, Naver, and Seznam.
 */

import { articlesData } from "@/data/insights-articles";
import { results, solutions } from "@/data/redesign";
import { industries } from "@/data/industries";
import { developmentServices } from "@/data/development-services";

export const INDEX_NOW_KEY = "3c12d5a79b40fe68";
export const BING_API_KEY = "49626271e24a47dc88e60511bda9fcc9";
export const HOST = "digitalx-solutions.com";
export const SITE_URL = `https://${HOST}`;
export const KEY_LOCATION = `${SITE_URL}/${INDEX_NOW_KEY}.txt`;

export const STATIC_PATHS = [
    "/",
    "/solutions",
    "/industries",
    "/integrations",
    "/services/web-design-and-development",
    "/services/meta-ads",
    "/case-studies",
    "/development",
    "/pricing",
    "/process",
    "/about",
    "/contact",
    "/insights",
    "/try-voice-agent",
    "/usa",
    "/au",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
];

export function getAllSiteUrls(): string[] {
    const dynamicPaths = [
        ...solutions.map((s) => `/solutions/${s.slug}`),
        ...industries.map((i) => `/industries/${i.slug}`),
        ...results.map((r) => `/case-studies/${r.slug}`),
        ...developmentServices.map((d) => `/development/${d.slug}`),
        ...Object.keys(articlesData).map((slug) => `/insights/${slug}`),
    ];

    return [...STATIC_PATHS, ...dynamicPaths].map((path) => `${SITE_URL}${path}`);
}

export interface StreamResult {
    url: string;
    indexNowStatus: number | null;
    indexNowOk: boolean;
    bingStatus?: number | null;
    bingOk?: boolean;
    error?: string;
}

/**
 * Streams a single URL to IndexNow using the real-time GET endpoint.
 * This ensures immediate indexing without triggering server load warnings.
 */
export async function streamSingleUrlToIndexNow(url: string): Promise<{ status: number; ok: boolean; message: string }> {
    try {
        const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEX_NOW_KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;
        const res = await fetch(endpoint, {
            method: "GET",
            headers: { "User-Agent": "DigitalX-StreamingEngine/2.0" },
        });

        return {
            status: res.status,
            ok: res.status === 200 || res.status === 202,
            message: res.statusText || (res.status === 200 ? "OK" : "Accepted"),
        };
    } catch (err: any) {
        return {
            status: 500,
            ok: false,
            message: err?.message || "Unknown error",
        };
    }
}

/**
 * Streams a single URL to Bing Webmaster Tools API using the single-URL SubmitUrl endpoint.
 * Replaces legacy SubmitUrlbatch to adhere to Bing's streaming guidelines.
 */
export async function streamSingleUrlToBing(url: string): Promise<{ status: number; ok: boolean; message: string }> {
    try {
        const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${BING_API_KEY}`;
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                siteUrl: `${SITE_URL}/`,
                url: url,
            }),
        });

        const text = await res.text();
        return {
            status: res.status,
            ok: res.status === 200,
            message: text,
        };
    } catch (err: any) {
        return {
            status: 500,
            ok: false,
            message: err?.message || "Unknown error",
        };
    }
}

/**
 * Streams a list of URLs sequentially with a gentle delay to distribute server load evenly.
 */
export async function streamUrlsSequentially(
    urls: string[],
    options: {
        delayMs?: number;
        submitToBing?: boolean;
        onProgress?: (result: StreamResult, index: number, total: number) => void;
    } = {}
): Promise<StreamResult[]> {
    const { delayMs = 150, submitToBing = false, onProgress } = options;
    const results: StreamResult[] = [];

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const indexNowRes = await streamSingleUrlToIndexNow(url);

        const result: StreamResult = {
            url,
            indexNowStatus: indexNowRes.status,
            indexNowOk: indexNowRes.ok,
        };

        if (submitToBing) {
            const bingRes = await streamSingleUrlToBing(url);
            result.bingStatus = bingRes.status;
            result.bingOk = bingRes.ok;
        }

        results.push(result);
        if (onProgress) {
            onProgress(result, i + 1, urls.length);
        }

        // Polite jitter delay between streams to keep crawler bandwidth flat
        if (i < urls.length - 1 && delayMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    return results;
}

