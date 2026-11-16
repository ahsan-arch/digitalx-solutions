# DigitalX Solutions — Content Merge Plan & Canonical Consolidation (Prompt v2)

**Generated:** 2026-11-16  
**Review Window:** 30 Days (Monitoring: Nov 16, 2026 – Dec 16, 2026)  
**Scheduled Review Date:** December 16, 2026  
**Branch:** `fix/trust-seo`  

---

## 1. Strategy & Reversible Implementation

To protect existing search rankings, organic impressions, and external referral traffic while resolving keyword cannibalization:

1. **Reversible First:** In accordance with Prompt v2 safety rules, secondary duplicate pages are **NOT** immediately 301-redirected. They remain live, indexable, and accessible via their URLs.
2. **Canonical Consolidation:** Every secondary page has its `<link rel="canonical">` tag configured to point directly to its primary pillar page. Search engine crawlers (Google, Bing) attribute PageRank and indexing signals to the primary pillar without breaking inbound links.
3. **30-Day Monitoring:** Traffic, organic impressions, and ranking stability will be monitored for 30 days. On December 16, 2026, the site owner reviews performance before turning on permanent 301 redirects in `next.config.ts`.

---

## 2. Duplicate Pairs & Canonical Mapping Ledger

| Secondary Page URL | Primary Target URL | Topic Overlap & Rationale | Current Technical Status | Recommended Action After 30 Days | Review Date | Owner Approval |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/insights/ai-voice-receptionist-cost` | `/pricing` (Commercial)<br>`/insights/ai-voice-agent-pricing` (Info) | Pricing breakdown overlaps with core `/pricing` packages and comprehensive pricing explainer. | Live 200 with `rel=canonical` $\rightarrow$ `/pricing` | 301 redirect to `/pricing` once Google indexes the canonical consolidation. | 2026-12-16 | Pending Owner Review |
| `/insights/n8n-vs-zapier` | `/insights/n8n-vs-zapier-vs-make` | Two-way comparison is subsumed by the 3-way guide (which covers self-hosting, Docker, and enterprise concurrency). | Live 200 with `rel=canonical` $\rightarrow$ `/insights/n8n-vs-zapier-vs-make` | 301 redirect to `/insights/n8n-vs-zapier-vs-make`. | 2026-12-16 | Pending Owner Review |
| `/insights/ai-voice-receptionists-guide` | `/insights/what-is-an-ai-voice-agent` | Foundational explainer overlaps with the main technical architecture pillar. | Live 200 with `rel=canonical` $\rightarrow$ `/insights/what-is-an-ai-voice-agent` | 301 redirect to `/insights/what-is-an-ai-voice-agent`. | 2026-12-16 | Pending Owner Review |
| `/insights/ai-receptionist-vs-human-receptionist` | `/insights/ai-receptionist-vs-call-centre` | Human receptionist comparison is covered within the comprehensive call center comparison pillar. | Live 200 with `rel=canonical` $\rightarrow$ `/insights/ai-receptionist-vs-call-centre` | 301 redirect to `/insights/ai-receptionist-vs-call-centre`. | 2026-12-16 | Pending Owner Review |
| `/insights/missed-call-text-back-guide` | `/solutions/missed-call-text-back` | Informational guide splits commercial intent from the core solution landing page. | Live 200 with `rel=canonical` $\rightarrow$ `/solutions/missed-call-text-back` | 301 redirect to `/solutions/missed-call-text-back`. | 2026-12-16 | Pending Owner Review |

---

## 3. Case-Study Slugs Normalization

| Legacy URL | Canonical Target | Action Taken | Rationale |
| :--- | :--- | :--- | :--- |
| `/insights/how-dental-clinic-increased-appointments-32-percent` | `/insights/how-dental-clinic-increased-appointments-ai-voice` | Permanent 301 Redirect | Removed unverified "32 percent" statistic from the URL slug while retaining organic referral equity. |
| `/case-studies/riverstone-dental-group` | `/case-studies/riverstone-dental` | Permanent 301 Redirect | Slug normalization between "riverstone-dental-group" and "riverstone-dental". |
| `/riverstone-dental-group` | `/case-studies/riverstone-dental` | Permanent 301 Redirect | Legacy direct root alias redirect. |

---

## 4. Implementation Steps to Execute 301 Redirects (Post-Approval)

When the owner approves turning on the 301 redirects on December 16, 2026:
1. Add the 5 redirect rules to `async redirects()` in `next.config.ts`:
   ```ts
   { source: "/insights/ai-voice-receptionist-cost", destination: "/pricing", permanent: true },
   { source: "/insights/n8n-vs-zapier", destination: "/insights/n8n-vs-zapier-vs-make", permanent: true },
   { source: "/insights/ai-voice-receptionists-guide", destination: "/insights/what-is-an-ai-voice-agent", permanent: true },
   { source: "/insights/ai-receptionist-vs-human-receptionist", destination: "/insights/ai-receptionist-vs-call-centre", permanent: true },
   { source: "/insights/missed-call-text-back-guide", destination: "/solutions/missed-call-text-back", permanent: true },
   ```
2. Remove their records from `articlesData` in `src/data/insights-articles.ts`.
3. Update `/docs/redirects.md` with execution timestamp.
