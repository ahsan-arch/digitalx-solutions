/**
 * SerpAPI content miner — pulls "People Also Ask" + "Related Searches" from
 * Google for each seed keyword across US + AU. Output is a markdown brief at
 * reports/seo/content-ideas-{YYYY-MM-DD}.md you can use to seed:
 *   - new /insights articles
 *   - FAQ JSON-LD blocks on /solutions/[slug] and /industries/[slug]
 *   - additional H2/H3 sections on existing pages
 *
 *   npm run seo:mine
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LOCALES, serpSearch, sleep } from "./lib/serpapi";

const SEED_KEYWORDS = [
    "AI voice receptionist",
    "n8n automation agency",
    "business automation agency",
    "GoHighLevel automation",
    "Meta Ads agency Australia",
    "Next.js development agency",
    "AI appointment booking agent",
    "server side tracking agency",
];

type Mined = {
    keyword: string;
    locale: "US" | "AU";
    paa: { question: string; snippet?: string }[];
    related: string[];
};

async function mineKeyword(keyword: string): Promise<Mined[]> {
    const out: Mined[] = [];
    for (const loc of LOCALES) {
        try {
            const data = await serpSearch({
                q: keyword,
                gl: loc.gl,
                hl: loc.hl,
                google_domain: loc.google_domain,
            });
            const paa = (data.related_questions ?? []).map((q) => ({
                question: q.question,
                snippet: q.snippet,
            }));
            const related = (data.related_searches ?? [])
                .map((r) => r.query)
                .filter((q): q is string => Boolean(q));
            out.push({ keyword, locale: loc.label, paa, related });
        } catch (err) {
            console.error(
                `  [ERR] ${keyword} (${loc.label}): ${(err as Error).message}`
            );
            out.push({ keyword, locale: loc.label, paa: [], related: [] });
        }
        await sleep(250);
    }
    return out;
}

function asMarkdown(mined: Mined[]): string {
    const date = new Date().toISOString().slice(0, 10);
    const lines: string[] = [
        `# DigitalX Content Ideas — ${date}`,
        "",
        "Mined from Google's *People Also Ask* + *Related Searches* across US & AU.",
        "Use these to seed FAQ JSON-LD, blog posts, and on-page H2/H3 sections.",
        "",
    ];

    const byKeyword = new Map<string, Mined[]>();
    for (const m of mined) {
        if (!byKeyword.has(m.keyword)) byKeyword.set(m.keyword, []);
        byKeyword.get(m.keyword)!.push(m);
    }

    for (const [keyword, locales] of byKeyword) {
        lines.push(`## ${keyword}`, "");

        const paaMap = new Map<
            string,
            { snippet?: string; locales: string[] }
        >();
        for (const m of locales) {
            for (const p of m.paa) {
                const key = p.question.trim().toLowerCase();
                if (!paaMap.has(key)) {
                    paaMap.set(key, { snippet: p.snippet, locales: [] });
                }
                paaMap.get(key)!.locales.push(m.locale);
            }
        }

        if (paaMap.size > 0) {
            lines.push("### People Also Ask");
            for (const [q, meta] of paaMap) {
                const display = q.charAt(0).toUpperCase() + q.slice(1);
                lines.push(`- ${display} _(${meta.locales.join(", ")})_`);
                if (meta.snippet) {
                    const trimmed = meta.snippet
                        .replace(/\s+/g, " ")
                        .slice(0, 240);
                    lines.push(`  > ${trimmed}`);
                }
            }
            lines.push("");
        }

        const relMap = new Map<string, string[]>();
        for (const m of locales) {
            for (const r of m.related) {
                const key = r.trim().toLowerCase();
                if (!relMap.has(key)) relMap.set(key, []);
                relMap.get(key)!.push(m.locale);
            }
        }

        if (relMap.size > 0) {
            lines.push("### Related Searches");
            for (const [r, locs] of relMap) {
                lines.push(`- ${r} _(${locs.join(", ")})_`);
            }
            lines.push("");
        }

        if (paaMap.size === 0 && relMap.size === 0) {
            lines.push("_No PAA or related searches returned by SerpAPI._", "");
        }
    }

    lines.push(
        "## How to use this",
        "",
        "1. **FAQ JSON-LD** — pick 3-5 questions per page from PAA, write 1-2 sentence answers, wire via `generateFAQSchema()` from `src/lib/seo.ts`.",
        "2. **New articles** — each PAA cluster that doesn't map to an existing page is a candidate `/insights/{slug}` post.",
        "3. **H2 expansion** — add Related-Search terms as H2/H3 sections on the matching service or solution page to capture long-tail traffic.",
        ""
    );

    return lines.join("\n");
}

async function main() {
    if (!process.env.SERPAPI_KEY) {
        console.error(
            "SERPAPI_KEY is missing. Add it to .env.local:\n  SERPAPI_KEY=your_rotated_key\n\nGet/rotate at https://serpapi.com/dashboard."
        );
        process.exit(1);
    }

    console.log(
        `SerpAPI content miner — ${SEED_KEYWORDS.length} seeds × ${LOCALES.length} locales = ${SEED_KEYWORDS.length * LOCALES.length} requests`
    );
    console.log("");

    const all: Mined[] = [];
    for (const kw of SEED_KEYWORDS) {
        process.stdout.write(`  ${kw} ... `);
        const rows = await mineKeyword(kw);
        const totalPaa = rows.reduce((s, r) => s + r.paa.length, 0);
        const totalRel = rows.reduce((s, r) => s + r.related.length, 0);
        console.log(`PAA:${totalPaa} Related:${totalRel}`);
        all.push(...rows);
    }

    const md = asMarkdown(all);
    const date = new Date().toISOString().slice(0, 10);
    const dir = resolve(process.cwd(), "reports", "seo");
    mkdirSync(dir, { recursive: true });
    const outPath = resolve(dir, `content-ideas-${date}.md`);
    writeFileSync(outPath, md, "utf8");
    console.log(`\nReport written: ${outPath}`);
}

main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
});
