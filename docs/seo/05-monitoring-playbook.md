# DigitalX Solutions — Ongoing SEO Monitoring & Telemetry Playbook

> **Target Domain**: `https://digitalx-solutions.com`  
> **Target Markets**: United States (en-US) & Australia (en-AU)  
> **Core Commercial Focus**: AI Voice Receptionists, Missed-Call Text-Back, GoHighLevel Setup, n8n Workflow Automation

---

## 1. Monitoring Cadence Overview

To maintain #1 organic rankings for high-intent commercial queries across Australia and the United States, execute monitoring according to this fixed calendar:

| Cadence | Focus Area | Tools | Primary Metrics / Thresholds |
| :--- | :--- | :--- | :--- |
| **Weekly (Monday)** | Indexation & Crawl Health | Google Search Console (GSC), Bing Webmaster | 0 Server Errors (5xx), 0 Redirect Loops, 107/107 Valid Indexed URLs |
| **Weekly (Thursday)** | Search Performance & CTR | GSC Performance (Search Results) | Impressions, Clicks, Average Position (US vs. AU), Low-CTR Queries |
| **Bi-Weekly** | Technical Core Web Vitals | PageSpeed Insights, CrUX Dashboard | LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 on Mobile |
| **Monthly** | Entity & Local Citation Audit | Google Business Profile, Apple Maps, Yellow Pages | 100% NAP parity across Sydney HQ and US SAB directories |
| **Monthly** | Backlink Profile & Competitive Inflow | Ahrefs / Semrush | Zero toxic spam spikes, 3–5 new referring domains/month |
| **Quarterly** | Content Freshness & Decay Audit | Internal SEO QA Suite (`npm run seo:qa`) | Update benchmark stats, verify software integration APIs (GHL, n8n) |

---

## 2. Google Search Console Weekly SOP

### 2.1 Index Coverage & Crawl Health (Monday)
1. **Navigate to GSC > Indexing > Pages**.
2. **Review "Why pages aren't indexed" table**:
   - `Discovered - currently not indexed`: If > 5 URLs, inspect URLs in GSC. Check for internal link depth or orphaned status. (Ensure every new URL has at least 3 inbound contextual links).
   - `Crawled - currently not indexed`: Flag for content quality review. Run against the 1,200-word industry playbook minimum.
   - `Page with redirect`: Verify that only obsolete legacy URLs redirect to canonical paths. Ensure internal links point directly to the destination.
   - `Alternate page with proper canonical tag`: Ensure desktop vs mobile or query parameter URLs (`?ref=`, `?source=`) point cleanly to the self-referencing canonical.
   - `Not found (404)`: Check for broken backlinks or deleted pages. If external links exist, configure a 301 redirect in `next.config.ts`.
3. **Verify Sitemaps**:
   - Navigate to **Indexing > Sitemaps**.
   - Ensure `https://digitalx-solutions.com/sitemap.xml` shows status **Success** with exact matching page count (currently 107 URLs).

### 2.2 Search Performance & CTR Optimization SOP (Thursday)
1. **Navigate to GSC > Performance > Search results**.
2. **Configure Baseline Filters**:
   - Date: **Last 28 days** (compare to previous period).
   - Search type: **Web**.
   - Country Filter: Segment by **United States** and **Australia** separately.
3. **Identify Commercial "Striking Distance" Opportunities (Positions 4–15)**:
   - Filter by **Average Position** between `4.0` and `15.0`.
   - Sort by **Impressions** descending.
   - Export queries into `docs/seo/inputs/striking-distance.csv`.
4. **Execution Protocol for Low-CTR Queries**:
   - If a commercial query has > 200 impressions/month, position < 10, but **CTR < 2.5%**:
     - Inspect the Search Engine Results Page (SERP) directly in an incognito window with geographic location set to target market.
     - Review competitor title tags and snippet hooks.
     - Optimize the target page's title tag: ensure the exact query hook appears in the first 35 characters.
     - Ensure the target page has an answered question for this query wrapped in `FAQPage` schema to capture a rich snippet.

---

## 3. Core Web Vitals & Real-User Telemetry SOP

### 3.1 Field Data Monitoring
Google ranks pages based on real user experiences via the Chrome User Experience Report (CrUX).
Monitor field data under **GSC > Experience > Core Web Vitals**:

- **Largest Contentful Paint (LCP)**: Must stay under **2.5 seconds** at the 75th percentile.
  - *Remediation*: Check hero images for `priority` and responsive `sizes` attribute. Ensure no blocking third-party scripts execute prior to LCP.
- **Interaction to Next Paint (INP)**: Must stay under **200 milliseconds** at the 75th percentile.
  - *Remediation*: Ensure third-party widgets (e.g., Google Calendar iframe, chat embeds) are loaded with `loading="lazy"` and defer hydration until idle.
- **Cumulative Layout Shift (CLS)**: Must stay under **0.1**.
  - *Remediation*: Verify all image elements have explicit `width` and `height` or aspect-ratio wrappers. Verify dynamic audio visualizer widgets reserve container height before mounting.

### 3.2 Automated Lab Validation
Before pushing any structural code updates:
```bash
npm run type-check
npm run lint -- --dir src
npm run seo:qa
npm run build
```

---

## 4. Third-Party Data Import Guide (`docs/seo/inputs/`)

Per the project operating rules, whenever third-party data from Ahrefs, Semrush, or Google Search Console is available, drop the raw CSV exports into `docs/seo/inputs/` using the following exact filenames:

### 4.1 Google Search Console Exports
- **`docs/seo/inputs/gsc-queries-us.csv`**:
  - GSC > Performance > Country: United States > Date: Last 3 Months > Export Queries.
- **`docs/seo/inputs/gsc-queries-au.csv`**:
  - GSC > Performance > Country: Australia > Date: Last 3 Months > Export Queries.
- **`docs/seo/inputs/gsc-pages.csv`**:
  - GSC > Performance > Export Pages.

### 4.2 Ahrefs / Semrush Competitive Exports
- **`docs/seo/inputs/ahrefs-organic-keywords.csv`**:
  - Ahrefs > Site Explorer > `digitalx-solutions.com` > Organic Keywords > Export all keywords.
- **`docs/seo/inputs/ahrefs-backlinks.csv`**:
  - Ahrefs > Site Explorer > `digitalx-solutions.com` > Backlinks > One link per domain > Export.
- **`docs/seo/inputs/competitor-gap-matrix.csv`**:
  - Ahrefs Content Gap or Semrush Keyword Gap comparing `digitalx-solutions.com` against `smith.ai`, `bland.ai`, and `myreceptionist.com.au`.

---

## 5. Local NAP & Citation Audit SOP

Once per month, execute an audit of active directory citations:
1. Open the Master Citation Manifest (`docs/seo/03-citations.md`).
2. Inspect live listings on Google Business Profile, Apple Business Connect, Bing Places, Yellow Pages AU, and Yelp US.
3. Check for unauthorized edits, duplicate listings, or incorrect phone formats.
4. Verify review velocity: request 1–2 verified client reviews per month on Google Business Profile and Clutch.co.

---

## 6. Toxic Backlink & Negative SEO Safeguards

1. Inspect incoming backlinks monthly in Ahrefs / Semrush.
2. Flag any unnatural link surges:
   - Foreign language casino / adult anchor text.
   - Low-quality scraper domains scraping entire blog posts.
3. If negative SEO is detected:
   - Maintain a disavow file candidate list in `docs/seo/inputs/disavow-candidates.txt`.
   - Submit via Google Search Console Disavow Tool only if automated manual action warnings appear or high volumes of toxic spam anchors threaten domain reputation.
