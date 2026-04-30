/**
 * Minimal SerpAPI Google Search client for SEO scripts.
 * Key is loaded from process.env.SERPAPI_KEY (set in .env.local).
 */

const ENDPOINT = "https://serpapi.com/search.json";

export type Locale = {
    label: "US" | "AU";
    gl: string;
    hl: string;
    google_domain: string;
};

export const LOCALES: Locale[] = [
    { label: "US", gl: "us", hl: "en", google_domain: "google.com" },
    { label: "AU", gl: "au", hl: "en", google_domain: "google.com.au" },
];

export type OrganicResult = {
    position: number;
    title: string;
    link: string;
    snippet?: string;
    displayed_link?: string;
};

export type RelatedQuestion = {
    question: string;
    snippet?: string;
    title?: string;
    link?: string;
};

export type RelatedSearch = { query: string; link?: string };

export type SerpResponse = {
    organic_results?: OrganicResult[];
    related_questions?: RelatedQuestion[];
    related_searches?: RelatedSearch[];
    local_results?: { places?: Array<{ title?: string; link?: string }> };
    answer_box?: unknown;
    knowledge_graph?: unknown;
    error?: string;
    search_metadata?: { status?: string };
};

export async function serpSearch(params: {
    q: string;
    gl?: string;
    hl?: string;
    google_domain?: string;
    num?: number;
}): Promise<SerpResponse> {
    const key = process.env.SERPAPI_KEY;
    if (!key) {
        throw new Error(
            "SERPAPI_KEY is missing. Add it to .env.local: SERPAPI_KEY=your_rotated_key"
        );
    }

    const url = new URL(ENDPOINT);
    url.searchParams.set("engine", "google");
    url.searchParams.set("api_key", key);
    url.searchParams.set("q", params.q);
    url.searchParams.set("num", String(params.num ?? 10));
    if (params.gl) url.searchParams.set("gl", params.gl);
    if (params.hl) url.searchParams.set("hl", params.hl);
    if (params.google_domain) url.searchParams.set("google_domain", params.google_domain);

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const text = await res.text();

    if (!res.ok) {
        throw new Error(`SerpAPI ${res.status}: ${text.slice(0, 300)}`);
    }

    let json: SerpResponse;
    try {
        json = JSON.parse(text) as SerpResponse;
    } catch {
        throw new Error(`SerpAPI returned non-JSON: ${text.slice(0, 200)}`);
    }

    if (json.error) {
        throw new Error(`SerpAPI error: ${json.error}`);
    }

    return json;
}

export function hostnameOf(link: string): string | null {
    try {
        return new URL(link).hostname.replace(/^www\./, "");
    } catch {
        return null;
    }
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
