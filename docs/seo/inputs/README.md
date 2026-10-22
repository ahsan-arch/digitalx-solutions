# Search Console & Third-Party Telemetry Inputs Directory

Per the project rules (*"Never invent data. If a number needs Search Console, Ahrefs or Semrush, write 'unavailable' and tell me exactly which report to export into docs/seo/inputs/"*), place your verified production exports into this folder:

---

## 1. Google Search Console Performance Export
* **Target File**: `docs/seo/inputs/gsc-performance-last-3m.csv`
* **How to Export**:
  1. Open [Google Search Console](https://search.google.com/search-console).
  2. Select property: `https://digitalx-solutions.com` (or Domain property `digitalx-solutions.com`).
  3. Navigate to **Performance** > **Search results**.
  4. Set Date Filter: **Last 3 months** (or Last 28 days for recent launch).
  5. In the top right corner, click **Export** > **Download CSV**.
  6. Extract the zip and copy `Queries.csv` and `Pages.csv` into this folder as `gsc-performance-last-3m.csv`.

---

## 2. Ahrefs or Semrush Organic Keyword Export
* **Target File**: `docs/seo/inputs/ahrefs-organic-keywords.csv`
* **How to Export**:
  1. Open Ahrefs Site Explorer (or Semrush Domain Overview).
  2. Enter `digitalx-solutions.com`.
  3. Go to **Organic Keywords** (select both United States and Australia databases).
  4. Click **Export** > **Full export (CSV)**.
  5. Save file as `ahrefs-organic-keywords.csv` in this folder.

---

## 3. Client Verification & Case Authorizations
* **Target File**: `docs/seo/inputs/client-case-authorizations.txt`
* **Content to Provide**:
  - Confirmation of client permission for:
    - Harbor Plumbing (Mike Harbison)
    - Riverstone Dental Group (Dr. Priya Desai)
    - Atlas Consulting (James Whitfield)
  - Indication if any names are illustrative pseudonyms (so they can be properly labeled or replaced with authorized client case studies).
