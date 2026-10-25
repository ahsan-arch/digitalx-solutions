# DigitalX Solutions — Missing Information Ledger (`/docs/missing-info.md`)

> **Non-Negotiable Rule 1 Compliance**:  
> In accordance with Google's Quality Rater Guidelines, Helpful Content System, and Australian Consumer Law, this document tracks every pending fact, metric, credential, and client asset. Zero unverified claims, fabricated clients, or synthetic statistics may appear in production copy without written owner sign-off.

---

## 1. Leadership & Legal Entity

| Field | Current Site Value | Needed Owner Input | Impact / Location |
| :--- | :--- | :--- | :--- |
| **Founder Canonical Name** | `Ahsan Architect` (in `/about`) vs `Jazib / Muhammad Hashir Butt` (in git/docs) | Clarify canonical name to display publicly on `/about`, article bylines, and JSON-LD `Person` schema. | Google E-E-A-T entity matching across LinkedIn, Google Knowledge Graph, and Wikidata. |
| **Founder LinkedIn URL** | `https://www.linkedin.com/in/ahsan-architect` | Verify if this is the active personal LinkedIn profile URL or provide the canonical profile. | Founder profile link on `/about` and author cards. |
| **Legal Business Entity** | DigitalX Solutions | Supply registered legal business name, ABN (Australian Business Number), or ACN. | Footer, `/legal/terms`, and `LocalBusiness` schema. |
| **US Telephone Number** | None (currently Australian `+61 451 413 786` only) | Supply dedicated US inbound / forwarding phone number (e.g. Twilio / GHL line). | US landing page (`/usa`), Google Business Profile US, and national schema. |

---

## 2. Partner Certifications & Proof URLs

*The owner states these credentials are held. Under our rules, each partner badge or claim MUST link to an official proof URL.*

| Partner | Stated Credential | Needed Proof URL | Action Required |
| :--- | :--- | :--- | :--- |
| **GoHighLevel** | Certified Agency Partner / Admin | `[TODO: GHL Partner Directory URL or Digital Badge Link]` | Add link to homepage certified-partner strip and `/solutions/gohighlevel-implementation`. |
| **n8n** | Certified Workflow Partner / Creator | `[TODO: n8n Creator Profile URL, e.g. https://n8n.io/creators/...]` | Add link to homepage certified-partner strip and `/solutions/n8n-workflow-automation`. |
| **HubSpot** | Solutions Partner / Certified Admin | `[TODO: HubSpot Academy Certificate or Directory Profile URL]` | Add link to homepage partner strip and `/solutions/hubspot-automation`. |

---

## 3. Client Projects & Case Studies

*All existing case study records in the template are currently marked as unverified until the owner confirms whether real names/logos have written permission or if they must be anonymized.*

| Project ID | Client Name Listed | Industry | Real Client? | Written Permission to Use Name/Logo? | Verified Outcome Data |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `riverstone-dental` | Riverstone Dental Group | Dental Clinics | `[TODO]` | `[NO - Pending]` | Confirm if 94% after-hours capture and +32% bookings are backed by client CRM data. |
| `harbor-plumbing` | Harbor Plumbing Co. | Plumbing | `[TODO]` | `[NO - Pending]` | Confirm if $180k recovered revenue is an actual client metric or illustrative calculation. |
| `atlas-consulting` | Atlas Consulting Group | Accounting | `[TODO]` | `[NO - Pending]` | Confirm if 60% disqualification rate and 2.1x close rate are verified client telemetry. |
| `bookeasy` | BookEasy | Beauty/Salons | `[TODO]` | `[NO - Pending]` | Provide high-res SVG/PNG client logo file if approved. |
| `fintrend` | FinTrend | FinTech | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |
| `fleetroute` | FleetRoute | Field Services | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |
| `hostel360` | Hostel360 | Accommodation | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |
| `insightboard` | InsightBoard | Marketing Agencies | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |
| `leadbridge` | LeadBridge | B2B Services | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |
| `medisync` | MediSync | Healthcare | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |
| `shopflow` | ShopFlow | E-commerce | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |
| `voxassist` | VoxAssist | Multi-location | `[TODO]` | `[NO - Pending]` | Provide client logo and permission status. |

---

## 4. Testimonials & Reviews

*No testimonials will display review star schema or public endorsements unless verified.*

| Author | Role & Company | Stated Quote | Status |
| :--- | :--- | :--- | :---: |
| Mike Harbison | Owner, Harbor Plumbing | *"Before DigitalX, I was answering the phone on roofs..."* | `[TODO: Pending written consent]` |
| Dr. Priya Desai | Owner, Riverstone Dental | *"The AI agent books consults while we're in treatments..."* | `[TODO: Pending written consent]` |
| James Whitfield | Partner, Atlas Consulting | *"We stopped chasing. The nurture sequences handle the 90-day cycle..."* | `[TODO: Pending written consent]` |

---

## 5. Pricing & Go-Live SLA Benchmarks

| Metric / Service | Working Site Value | Needed Owner Confirmation |
| :--- | :--- | :--- |
| **Missed Call Text Back** | $497 - $997 setup + $197 - $497/mo | Confirm exact packages to display on `/pricing` and money pages. |
| **AI Voice Receptionist** | $1,497 - $2,997 setup + $497 - $1,297/mo | Confirm base monthly retainer and whether telephony minutes are billed at cost. |
| **GoHighLevel System Build** | $2,500 - $7,500 one-time | Confirm tier breakdown. |
| **Go-Live Timeline** | 5 to 14 business days | Confirm if SLA is guaranteed. |
| **Neural Voice Latency** | Sub-500ms | Confirm latency benchmark observed on live Vapi / Retell / Edge TTS deployments. |

---

## Action Plan
As the owner supplies each item, update `data/facts.json` directly and remove the corresponding entry from this ledger.
