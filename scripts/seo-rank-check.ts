/**
 * SerpAPI rank tracker — checks DigitalX position on google.com (US) and
 * google.com.au (AU) for each target keyword. Writes a markdown report to
 * reports/seo/rank-{YYYY-MM-DD}.md.
 *
 *   npm run seo:rank          # core list only (~10 kw × 2 locales = 20 calls)
 *   npm run seo:rank -- --full  # full keyword sweep (~37 kw × 2 = 74 calls)
 *
 * SerpAPI free tier = 100 searches/month — the default core list keeps you
 * well under that. Use --full once a month at most on free tier.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LOCALES, hostnameOf, serpSearch, sleep } from "./lib/serpapi";
import { seoKeywords, siteConfig } from "../src/lib/seo";

const TARGET_HOST = hostnameOf(siteConfig.domain) ?? siteConfig.domain;

// Top-priority keywords to track on every run. Picked from seoKeywords for
// breadth: brand, geo-targeted "automation/website agency" terms, primary
// service categories, and one local-pack candidate (AI voice receptionist).
const CORE_KEYWORDS = [
    "automation agency USA",
    "automation agency Australia",
    "website agency USA",
    "website agency Australia",
    "n8n automation agency",
    "GoHighLevel automation expert",
    "AI voice receptionist",
    "Meta Ads agency Australia",
    "Next.js development agency",
    "business automation agency",
];

type Row = {
    keyword: string;
    locale: "US" | "AU";
    position: number | null;
    url: string | null;
    title: string | null;
    inLocalPack: boolean;
    topCompetitors: string[];
};

async function checkKeyword(keyword: string): Promise<Row[]> {
    const rows: Row[] = [];
    for (const loc of LOCALES) {
        try {
            const data = await serpSearch({
                q: keyword,
                gl: loc.gl,
                hl: loc.hl,
                google_domain: loc.google_domain,
                num: 100,
            });
            const organic = data.organic_results ?? [];
            const ours = organic.find(
                (r) => hostnameOf(r.link) === TARGET_HOST
            );
            const top3 = organic
                .slice(0, 3)
                .map((r) => hostnameOf(r.link) ?? r.link);
            const local = data.local_results?.places ?? [];
            const inLocalPack = local.some((p) =>
                p.title?.toLowerCase().includes("digitalx")
            );
            rows.push({
                keyword,
                locale: loc.label,
                position: ours?.position ?? null,
                url: ours?.link ?? null,
                title: ours?.title ?? null,
                inLocalPack,
                topCompetitors: top3,
            });
        } catch (err) {
            console.error(
                `  [ERR] ${keyword} (${loc.label}): ${(err as Error).message}`
            );
            rows.push({
                keyword,
                locale: loc.label,
                position: null,
                url: null,
                title: null,
                inLocalPack: false,
                topCompetitors: [],
            });
        }
        await sleep(250);
    }
    return rows;
}

function formatPosition(r?: Row): string {
    if (!r) return "—";
    if (r.position == null) return "—";
    if (r.position <= 3) return `**#${r.position}**`;
    if (r.position <= 10) return `#${r.position}`;
    return `#${r.position}`;
}

function asMarkdown(rows: Row[], full: boolean): string {
    const date = new Date().toISOString().slice(0, 10);
    const byKeyword = new Map<string, Partial<Record<"US" | "AU", Row>>>();
    for (const r of rows) {
        if (!byKeyword.has(r.keyword)) byKeyword.set(r.keyword, {});
        byKeyword.get(r.keyword)![r.locale] = r;
    }

    const lines: string[] = [
        `# DigitalX Rank Report — ${date}`,
        "",
        `Target: \`${TARGET_HOST}\` · Locales: US (google.com), AU (google.com.au) · Mode: ${full ? "full sweep" : "core"}`,
        "",
        "## Position summary",
        "",
        "| Keyword | US | AU | US local pack | AU local pack |",
        "| --- | ---: | ---: | :---: | :---: |",
    ];

    let ranked = 0;
    let total = 0;
    for (const [kw, locs] of byKeyword) {
        const us = locs.US;
        const au = locs.AU;
        if (us?.position != null) ranked++;
        if (au?.position != null) ranked++;
        total += 2;
        const localCell = (r?: Row) => (r?.inLocalPack ? "✓" : "");
        lines.push(
            `| ${kw} | ${formatPosition(us)} | ${formatPosition(au)} | ${localCell(us)} | ${localCell(au)} |`
        );
    }

    lines.push(
        "",
        `**Coverage:** ranked in top-100 on **${ranked} / ${total}** keyword/locale combinations.`,
        "",
        "## Top organic competitors per keyword",
        ""
    );

    for (const [kw, locs] of byKeyword) {
        lines.push(`### ${kw}`);
        for (const label of ["US", "AU"] as const) {
            const r = locs[label];
            const comps = r?.topCompetitors ?? [];
            lines.push(
                `- **${label}** — ${comps.length ? comps.join(", ") : "no data"}`
            );
        }
        lines.push("");
    }

    lines.push(
        "## Action notes",
        "",
        "- Keywords with no position: candidates for new landing pages or content gap fills.",
        "- Positions #4–#20: on-page optimization + internal linking opportunities.",
        "- Positions #1–#3: monitor; defend with FAQ schema + content refresh.",
        "- Local-pack misses on geo terms (`...USA`, `...Australia`): check Google Business Profile coverage.",
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

    const args = process.argv.slice(2);
    const full = args.includes("--full");
    const keywords = full ? seoKeywords : CORE_KEYWORDS;

    console.log(
        `SerpAPI rank check — ${keywords.length} keywords × ${LOCALES.length} locales = ${keywords.length * LOCALES.length} requests`
    );
    console.log(
        full ? "(full sweep)" : "(core list; pass --full for all keywords)"
    );
    console.log("");

    const allRows: Row[] = [];
    for (const kw of keywords) {
        process.stdout.write(`  ${kw} ... `);
        const rows = await checkKeyword(kw);
        const us = rows.find((r) => r.locale === "US");
        const au = rows.find((r) => r.locale === "AU");
        console.log(
            `US:${us?.position ?? "—"} AU:${au?.position ?? "—"}`
        );
        allRows.push(...rows);
    }

    const md = asMarkdown(allRows, full);
    const date = new Date().toISOString().slice(0, 10);
    const dir = resolve(process.cwd(), "reports", "seo");
    mkdirSync(dir, { recursive: true });
    const outPath = resolve(dir, `rank-${date}.md`);
    writeFileSync(outPath, md, "utf8");
    console.log(`\nReport written: ${outPath}`);
}

main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
});
