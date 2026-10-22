# DigitalX Solutions — Content & SEO Technical Standards SOP

> **Target Audience**: Content Authors, Engineers, and Growth Marketers adding new pages to `digitalx-solutions.com`.  
> **Goal**: Protect technical SEO hygiene, prevent doorway page penalties, maintain schema validity, and ensure all content ranks at the top of Google US and Google AU.

---

## 1. Golden Rules of Content Publishing

1. **Never Publish Thin Doorway Pages**:
   - Industry playbooks must have **>= 1,200 words** of unique, vertical-specific content (intake protocols, field software integrations, regulatory compliance, unit economics).
   - Solution hubs must have **>= 1,000 words** with visual 4-step workflow steppers, technical specifications, and transparent pricing.
   - Blog posts/insights must have **>= 1,500 words** with original research, step-by-step technical guides, and structured tables.
2. **Strict Title Tag Discipline**:
   - Titles must be **strictly under 60 characters** (including the auto-appended ` | DigitalX` brand suffix).
   - Never add `| DigitalX` or `| DigitalX Solutions` manually inside `metadata.title` — it is automatically appended by the root layout template `%s | DigitalX`.
   - Lead with the primary commercial keyword in the first 35 characters.
3. **Meta Description Standards**:
   - Length: **100 to 160 characters**.
   - Must include the target query, primary differentiator (e.g. "<500ms voice AI", "GHL integration"), and an actionable commercial call to action (e.g., "Calculate your ROI", "Book intake call").
4. **Mandatory Schema Markup**:
   - Every Solution page must include: `Service`, `HowTo` (workflow steps), `BreadcrumbList`, and `FAQPage` (strictly matching visible FAQs).
   - Every Industry page must include: `Service`, `HowTo` (intake sequence), `BreadcrumbList`, and `FAQPage`.
   - Every Blog/Insight page must include: `BlogPosting`, `BreadcrumbList`, and `Person` author markup.
5. **Verified NAP Footprint**:
   - Every conversion/consultation card must feature the verified business details:
     - Phone: `+61 451 413 786`
     - Address: `16 Boldrewood Ave, Casula NSW 2170, Australia`
     - Direct WhatsApp action and direct tel: click-to-call link.

---

## 2. Checklist for Adding a New Solution Hub (`src/data/redesign.ts`)

When adding a new solution:
- [ ] Assign a unique, URL-safe slug in `solutionsData` (e.g., `ai-scheduling-agent`).
- [ ] Define title: `< 48 characters` (allowing 12 characters for ` | DigitalX`).
- [ ] Define description: `110–155 characters`.
- [ ] Supply at least 4 `workflowSteps` with `title`, `description`, `tool`, and `outcome`.
- [ ] Supply technical specs (`latency`, `concurrency`, `telephonyStack`, `integrations`, `uptime`, `compliance`).
- [ ] Supply comparison matrix (DigitalX vs Traditional Call Centers vs DIY).
- [ ] Supply transparent investment tiers (e.g., Launch vs Scale with USD and AUD pricing).
- [ ] Supply at least 4 structured, non-generic FAQs.
- [ ] Update `src/app/sitemap.ts` (automatically handled via dynamic object keys).

---

## 3. Checklist for Adding a New Industry Playbook (`src/data/industries.ts`)

When adding a new industry:
- [ ] Assign a unique, URL-safe slug in `industriesData` (e.g., `electrician-companies`).
- [ ] Define title: `< 48 characters`.
- [ ] Define description: `110–155 characters`.
- [ ] Supply `intakeArchitecture` with a 4-step workflow, intake questions, and emergency qualification criteria.
- [ ] Supply `softwareIntegrations` with 4 verified CRM/dispatch tools (e.g., ServiceTitan, Fergus, Simpro).
- [ ] Supply `complianceAndStandards` for both the United States and Australia.
- [ ] Supply `unitEconomics` with missed-call loss calculations and estimated annual recovered gross profit.
- [ ] Supply at least 4 industry-specific FAQs addressing real objections.

---

## 4. Checklist for Adding an Insights Article (`src/data/insights-articles.ts`)

When authoring a research report or technical guide:
- [ ] Define author entity: `Ahsan Architect` (Founder & Lead Automation Engineer) linking to `/about`.
- [ ] Define `datePublished` and `dateModified` in ISO format (`YYYY-MM-DD`).
- [ ] Word count >= 1,500 words.
- [ ] Include at least 2 structured markdown data tables for journalists and AI scrapers to cite.
- [ ] Include clear internal links to at least 2 relevant Solution hubs and 2 relevant Industry playbooks.

---

## 5. Automated CI Validation Gate

Before creating a pull request:
```bash
# 1. Type check
npm run type-check

# 2. Linting
npm run lint -- --dir src

# 3. SEO automated QA (all 100+ routes)
npm run seo:qa

# 4. Production static build verification
npm run build
```
If any of these commands fail or report a violation, **do not merge**. Fix the violation locally before pushing.
