/**
 * One-off diagnostic: is digitalx-solutions.com actually indexed by Google?
 *   npx tsx --env-file=.env.local scripts/seo-indexation-check.ts
 */

import { hostnameOf, serpSearch } from "./lib/serpapi";

type Query = {
    q: string;
    gl: string;
    google_domain: string;
    label: string;
};

const QUERIES: Query[] = [
    { q: "site:digitalx-solutions.com", gl: "us", google_domain: "google.com", label: "site: index check (US)" },
    { q: "site:digitalx-solutions.com", gl: "au", google_domain: "google.com.au", label: "site: index check (AU)" },
    { q: "digitalx solutions", gl: "us", google_domain: "google.com", label: "brand search (US)" },
    { q: "digitalx solutions", gl: "au", google_domain: "google.com.au", label: "brand search (AU)" },
];

async function main() {
    if (!process.env.SERPAPI_KEY) {
        console.error("SERPAPI_KEY missing in .env.local");
        process.exit(1);
    }

    for (const q of QUERIES) {
        const data = (await serpSearch({
            q: q.q,
            gl: q.gl,
            hl: "en",
            google_domain: q.google_domain,
            num: 100,
        })) as Record<string, unknown> & {
            organic_results?: Array<{ position: number; link: string; title?: string }>;
            search_information?: { total_results?: number };
        };

        const total = data.search_information?.total_results;
        const organic = data.organic_results ?? [];
        const ours = organic.filter((r) => hostnameOf(r.link) === "digitalx-solutions.com");

        console.log("---", q.label, "---");
        console.log("  total results:", total ?? "n/a");
        console.log("  organic returned:", organic.length);
        console.log("  digitalx-solutions.com pages in top-100:", ours.length);

        if (ours.length > 0) {
            ours.slice(0, 5).forEach((r) =>
                console.log(`    #${r.position}  ${r.title ?? ""}  —  ${r.link}`)
            );
        } else if (organic.length > 0) {
            console.log("  top 3 (sanity):");
            organic.slice(0, 3).forEach((r) =>
                console.log(`    #${r.position}  ${hostnameOf(r.link) ?? r.link}  —  ${(r.title ?? "").slice(0, 60)}`)
            );
        }
        console.log("");
    }
}

main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
});
