# DigitalX Solutions — Owner Action Items & Verification Ledger ([TODO])

**Generated:** 2026-11-16  
**Branch:** `fix/trust-seo`  
**Purpose:** Action items requiring owner input, evidence files, or public directory links to graduate unverified claims to fully verified status.

Under our strict compliance and E-E-A-T policy, all unverified claims, studies, certifications, and logos remain in safe default status (qualitative framing, `noindex`, or unaccredited partner label) until the owner provides the evidence below.

---

## 1. Platform Partner Proof Links

The website currently lists your agency in the **Partner Ecosystem** without displaying "Certified" badges or claims of official verification. To restore official certification badges and directory links, please provide:

- [ ] **GoHighLevel Partner Listing:**
  - *Current Value in facts.json:* `https://www.gohighlevel.com`
  - *Required:* Public agency directory listing URL, certified badge link, or marketplace profile URL.
  - *File to Update:* `/data/facts.json` under `partnerCertifications[0].proofUrl`

- [ ] **n8n Creator / Partner Listing:**
  - *Current Value in facts.json:* `https://n8n.io`
  - *Required:* Public n8n creator profile URL (e.g., `https://n8n.io/creators/digitalx` or forum expert handle).
  - *File to Update:* `/data/facts.json` under `partnerCertifications[1].proofUrl`

- [ ] **HubSpot Solutions Partner Listing:**
  - *Current Value in facts.json:* `https://www.hubspot.com/partners`
  - *Required:* Official HubSpot Academy certification ID link or partner directory profile.
  - *File to Update:* `/data/facts.json` under `partnerCertifications[2].proofUrl`

---

## 2. Reviewer & Leadership Profile

The site attributes engineering reviews and technical architecture to **Ahsan Architect** at `/about/team/ahsan-architect`.

- [ ] **LinkedIn Profile URL:**
  - *Current Placeholder:* `https://www.linkedin.com/in/ahsan-architect`
  - *Action:* Confirm live personal LinkedIn URL or supply the active profile handle.
- [ ] **Founder Headshot Asset:**
  - *Location:* Provide high-resolution SVG or AVIF/WebP headshot for the team profile page.

---

## 3. Client Case Studies & Logo Authorizations

Case studies currently operate with verified problem-solution architecture, but client logos remain unrendered until signed written releases are on file:

- [ ] **Riverstone Dental Care:**
  - *Permission Status:* Pending written brand and logo release agreement.
  - *Logo File:* Provide vector SVG or transparent WebP/PNG logo.
- [ ] **Harbor Plumbing & Heating:**
  - *Permission Status:* Pending written brand and logo release agreement.
  - *Logo File:* Provide vector SVG or transparent WebP/PNG logo.
- [ ] **Atlas Consulting Partners:**
  - *Permission Status:* Pending written brand and logo release agreement.
  - *Logo File:* Provide vector SVG or transparent WebP/PNG logo.

---

## 4. Telephony Audit & Research Log Files

The following research articles have been placed on `noindex`, unlisted from the sitemap and `/insights` directory, and marked with a visible *"Benchmark Audit in Progress"* banner:

- [ ] **After-Hours Answer Rate Study** (`/insights/after-hours-answer-rate-study`):
  - *Required Evidence:* Anonymized mystery call spreadsheet or Twilio/carrier logs showing date/time, ring durations, and voicemail outcomes.
  - *Action Once Provided:* Set `noindex: false`, remove update notice, re-add to sitemap.
- [ ] **AI Voice Receptionist ROI Benchmark Study** (`/insights/ai-voice-receptionist-benchmark-2026`):
  - *Required Evidence:* Aggregated carrier call records (CDRs) or client analytics export supporting inbound call volumes and booking rates.
  - *Action Once Provided:* Set `noindex: false`, remove update notice, re-add to sitemap.

---

## 5. Duplicate Content 30-Day Redirect Approval

Review [`/docs/merge-plan.md`](file:///c:/Users/DELL/.gemini/antigravity-ide/scratch/digitalx-solutions/docs/merge-plan.md) and confirm whether to execute permanent 301 redirects for the 5 duplicate/thin article pairs after the 30-day monitoring window ending **December 16, 2026**.
