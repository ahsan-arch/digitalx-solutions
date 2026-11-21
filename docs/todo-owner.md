# DigitalX Solutions — Owner Action Items & Verification Ledger

**Generated:** 2026-11-21  
**Branch:** `fix/trust-seo`  
**Status:** Required Owner Actions (Digital Guider Audit & Trust Compliance)

Under our non-negotiable safety rules, the site codebase now strictly uses safe defaults (qualitative outcomes, "Built with n8n", "We build on GoHighLevel", "Client name withheld", and `noindex` on unreferenced studies). The following items can only be completed by the business owner (**Jazib Shahid**):

---

## 1. Domain Registration & SSL Renewal (Urgent)

* **Finding from Digital Guider Audit:** The domain `digitalx-solutions.com` was registered approximately 9 months ago and **expires in about 3 months** (February/March 2027). A domain with short remaining registration is a known trust penalty signal in Google search algorithms.
* **Owner Action Required:**
  - [ ] Log in to your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare, Google Domains) and renew `digitalx-solutions.com` for at least **3 to 5 years**.
  - [ ] Turn on **Auto-Renew**.
  - [ ] Confirm Let's Encrypt / Vercel SSL auto-renewal is active with valid HSTS preload.

---

## 2. Local Entity Verification & Citations

* **Finding from Digital Guider Audit:** The audit found **zero local listings** and no verified business profile for the Casula office.
* **Owner Action Required:**
  - [ ] **Google Business Profile (Casula, NSW):**
    - Create and verify a Google Business Profile for *DigitalX Solutions* at `16 Boldrewood Ave, Casula NSW 2170, Australia`.
    - Set primary category: *Software Company* / *Marketing Agency* / *Telecommunications Service*.
    - Add website URL: `https://digitalx-solutions.com`.
  - [ ] **Yelp Listing:** Claim and verify a Yelp business page for DigitalX Solutions in the Sydney/Casula area.
  - [ ] **Australian Business Directories:** List DigitalX Solutions on TrueLocal, Yellow Pages Australia, and Hotfrog Australia with consistent NAP (Name, Address, Phone: `+61 451 413 786`).

---

## 3. Registered Entity Identifier (ABN)

* **Current Status:** Left empty (`""` in `data/facts.json`) per safety rules.
* **Owner Action Required:**
  - [ ] Provide the official Australian Business Number (ABN) or Australian Company Number (ACN) for DigitalX Solutions.
  - [ ] Once provided, populate `"abn": "YOUR_ABN"` in `/data/facts.json`.

---

## 4. Social Media Accounts & Vanity URLs

* **Findings from Digital Guider Audit:**
  - Meta tags previously referenced `@digitalx_solutions` on X (Twitter), but no account existed. All `twitter:site` tags have been safely removed.
  - The Facebook page currently uses a raw numeric ID (`61588252343955`).
* **Owner Action Required:**
  - [ ] **X / Twitter:** Create an official handle `@digitalx_solutions` or `digitalx_aus` on X.com. Once active, provide the URL to restore `twitter:site` and `sameAs` schema.
  - [ ] **Facebook:** Claim a vanity username on Facebook (e.g., `facebook.com/digitalxsolutionsaus`).
  - [ ] **Founder LinkedIn Profile:** Provide Jazib Shahid's personal LinkedIn profile URL to link in `/data/facts.json` (replacing the company page link).

---

## 5. Partner Credentials & Proof Links

* **Current Status:** Site copy states "Built with n8n" and "We build on GoHighLevel". Badges saying "Certified" or "Registered Partner" are disabled until proof URLs exist.
* **Owner Action Required:**
  - [ ] **n8n Certification:** Provide your n8n certification verification link, credential ID, or public creator profile URL.
  - [ ] **GoHighLevel Agency Status:** Provide your public GoHighLevel partner directory listing, certified snapshot link, or agency certification URL.
  - [ ] **HubSpot Solutions Directory:** Provide public partner directory profile or Academy certification ID.
  - [ ] Once links are available, paste them into `partnerCertifications[].proofUrl` in `/data/facts.json`.

---

## 6. Real Customer Reviews & Testimonials

* **Finding from Digital Guider Audit:** The audit recorded zero customer reviews. In accordance with zero-invention rules, all placeholder testimonials have been cleared (`testimonials: []`).
* **Owner Action Required:**
  - [ ] Send your Google Business Profile review link to past satisfied clients in Australia and the US.
  - [ ] Collect at least 5 to 10 verified reviews on Google and Trustpilot.
  - [ ] Secure written consent from clients before featuring company names or logos on the homepage.

---

## 7. Backlinks & Authority Building

* **Finding from Digital Guider Audit:** Backlink profile is rated "Bad" and organic traffic is "Very Low".
* **Owner Action Required:**
  - [ ] Submit DigitalX Solutions to verified industry directories: **Clutch.co**, **GoodFirms**, **Crunchbase** (confirm verification), **ProductHunt**.
  - [ ] Participate actively in technical communities (n8n community forum `community.n8n.io`, GoHighLevel official community) contributing verified workflows and case tutorials.
  - [ ] Never purchase cheap PBN backlinks; earn editorial mentions through real integration architecture and open-source contributions.
