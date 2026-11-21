# DigitalX Solutions — Active Redirect & Canonical Mapping Registry (Prompt v2)

**Generated:** 2026-11-16  
**Branch:** `fix/trust-seo`  
**Purpose:** Master registry of permanent 301 redirects implemented in `next.config.ts` and `rel=canonical` tags implemented in page metadata.

---

## 1. Active Permanent 301 Redirects (`next.config.ts`)

| Source URL | Destination Target | Redirect Type | Strategic Rationale |
| :--- | :--- | :--- | :--- |
| `/services/web-dev` | `/services/web-design-and-development` | 301 Permanent | Canonical slug consolidation |
| `/services/nextjs-development` | `/services/web-design-and-development` | 301 Permanent | Service consolidation |
| `/services/meta-ads-engineering` | `/services/meta-ads` | 301 Permanent | Canonical slug consolidation |
| `/services/ai-voice-receptionists` | `/solutions/ai-voice-agents` | 301 Permanent | Migrated service page to canonical solution pillar |
| `/services/conversational-ai` | `/solutions/ai-agents-chatbots` | 301 Permanent | Migrated service page to canonical solution pillar |
| `/services/revenue-operations` | `/solutions/hubspot-automation` | 301 Permanent | Migrated service page to canonical solution pillar |
| `/solutions/ai-voice-receptionists` | `/solutions/ai-voice-agents` | 301 Permanent | Solution alias normalization |
| `/solutions/chatbots` | `/solutions/ai-agents-chatbots` | 301 Permanent | Solution alias normalization |
| `/solutions/automated-lead-nurturing` | `/solutions/lead-generation` | 301 Permanent | Solution alias normalization |
| `/riverstone-dental-group` | `/case-studies/dental-clinic` | 301 Permanent | Legacy root alias |
| `/case-studies/riverstone-dental-group` | `/case-studies/dental-clinic` | 301 Permanent | Slug normalization |
| `/case-studies/riverstone-dental` | `/case-studies/dental-clinic` | 301 Permanent | Anonymized case-study slug normalization |
| `/case-studies/harbor-plumbing` | `/case-studies/plumbing-contractor` | 301 Permanent | Anonymized case-study slug normalization |
| `/case-studies/atlas-consulting` | `/case-studies/advisory-practice` | 301 Permanent | Anonymized case-study slug normalization |
| `/about/team/ahsan-architect` | `/about` | 301 Permanent | Retired unverified alias; founder profile served at `/about/team/jazib-shahid` |
| `/insights/how-dental-clinic-increased-appointments-32-percent` | `/insights/how-dental-clinic-increased-appointments-ai-voice` | 301 Permanent | Compliance normalization (removed unproven "32-percent" from slug) |
| `/insights/how-plumbing-company-recovered-180k-ai-voice` | `/insights/plumbing-ai-voice-dispatch-case-study` | 301 Permanent | Compliance normalization (removed unproven "180k" revenue figure from slug to neutral slug) |
| `/insights/how-we-built-self-hosted-30-second-speed-to-lead-pipeline-n8n-vapi` | `/insights/how-we-built-self-hosted-speed-to-lead-pipeline-n8n-vapi` | 301 Permanent | Latency normalization (removed "30-second" latency figure from slug to neutral slug) |
| `/integrations/gohighlevel-ai-voice-agent` | `/integrations/gohighlevel` | 301 Permanent | Integration slug alias |
| `/integrations/n8n-workflows-for-business` | `/integrations/n8n` | 301 Permanent | Integration slug alias |
| `/integrations/hubspot-workflow-automation` | `/integrations/hubspot` | 301 Permanent | Integration slug alias |
| `/services` | `/solutions` | 301 Permanent | Services index redirected to Solutions hub |
| `/locations/usa` | `/usa` | 301 Permanent | Location URL promotion to top-level geo page |
| `/locations/australia` | `/au` | 301 Permanent | Location URL promotion to top-level geo page |
| `/locations` | `/` | 301 Permanent | Legacy location hub redirected to homepage |

---

## 2. Active Canonical Tags for Duplicate / Thin Content Clusters (`rel=canonical`)

In accordance with Prompt v2, secondary duplicate pages are currently kept live with direct `<link rel="canonical">` tags pointing to their primary authority pillars:

| Secondary URL (Live 200) | Canonical Target (`rel=canonical`) | Monitoring Window | Action Scheduled in Merge Plan |
| :--- | :--- | :--- | :--- |
| `/insights/ai-voice-receptionist-cost` | `https://digitalx-solutions.com/pricing` | 30 Days (Nov 16 – Dec 16) | 301 redirect pending owner sign-off |
| `/insights/n8n-vs-zapier` | `https://digitalx-solutions.com/insights/n8n-vs-zapier-vs-make` | 30 Days (Nov 16 – Dec 16) | 301 redirect pending owner sign-off |
| `/insights/ai-voice-receptionists-guide` | `https://digitalx-solutions.com/insights/what-is-an-ai-voice-agent` | 30 Days (Nov 16 – Dec 16) | 301 redirect pending owner sign-off |
| `/insights/ai-receptionist-vs-human-receptionist` | `https://digitalx-solutions.com/insights/ai-receptionist-vs-call-centre` | 30 Days (Nov 16 – Dec 16) | 301 redirect pending owner sign-off |
| `/insights/missed-call-text-back-guide` | `https://digitalx-solutions.com/solutions/missed-call-text-back` | 30 Days (Nov 16 – Dec 16) | 301 redirect pending owner sign-off |

---

## 3. Temporary `noindex` Telephony Research Pages

The following research pages serve 200 HTTP status with `robots: noindex, follow`, are excluded from `sitemap.ts` and the `/insights` listing page, and display a visible update notice until the owner supplies verified call logs:
- `/insights/after-hours-answer-rate-study`
- `/insights/ai-voice-receptionist-benchmark-2026`
