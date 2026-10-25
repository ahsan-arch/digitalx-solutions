# Logo Sources & Brand Asset Guidelines (`/docs/logo-sources.md`)

> **Brand Compliance Policy**: All SVGs stored locally in `/public/logos/`. Never hotlinked. Never distorted, recoloured, or displayed in violation of minimum clear space guidelines.

---

## Brand Logo Register

| Brand | Local Asset Path | Official Brand Portal / Source | Clear Space & Usage Rules | Display Classification on DigitalX |
| :--- | :--- | :--- | :--- | :--- |
| **HubSpot** | `/public/logos/hubspot.svg` | [hubspot.com/brand-kit](https://www.hubspot.com/brand-kit) | Maintain minimum clear space equal to Sprocket width. Do not alter standard #FF7A59 and #2E475D colors. | **Certified Partner** (Pending Proof URL) |
| **n8n** | `/public/logos/n8n.svg` | [n8n.io/brand](https://n8n.io/) | Keep pink/coral gradient marks intact. Do not rotate or break node connections. | **Certified Partner / Creator** (Pending Proof URL) |
| **GoHighLevel** | `/public/logos/gohighlevel.svg` | [gohighlevel.com/press](https://www.gohighlevel.com/) | Official rocket icon + bold logotype. Blue #2A85FF. | **Certified Partner** (Pending Proof URL) |
| **Twilio** | `/public/logos/twilio.svg` | [twilio.com/legal/trademark](https://www.twilio.com/) | Red circle mark with 4 white dots. Maintain aspect ratio. | **Built with / API Telephony Provider** |
| **ServiceTitan** | `/public/logos/servicetitan.svg` | [servicetitan.com/brand](https://www.servicetitan.com/) | Blue shield mark and navy logotype. | **Integrates with / Field Services CRM** |
| **Jobber** | `/public/logos/jobber.svg` | [getjobber.com/brand](https://www.getjobber.com/) | Green #7AC143 tile. | **Integrates with / Home Services CRM** |
| **Cliniko** | `/public/logos/cliniko.svg` | [cliniko.com/brand](https://www.cliniko.com/) | Teal medical cross mark. | **Integrates with / Allied Health PMS** |
| **Google Calendar** | `/public/logos/google-calendar.svg` | [google.com/permissions](https://www.google.com/permissions/) | Google standard blue, red, yellow, green palette. | **Integrates with / Appointment Booking** |
| **Meta** | `/public/logos/meta.svg` | [about.meta.com/brand](https://about.meta.com/brand/) | Official blue infinity loop. | **Built with / Conversions API & Meta Ads** |
| **Stripe** | `/public/logos/stripe.svg` | [stripe.com/newsroom/brand-assets](https://stripe.com/) | Purple #635BFF logotype. | **Integrates with / Payment Infrastructure** |
| **OpenAI** | `/public/logos/openai.svg` | [openai.com/brand](https://openai.com/) | Official green spiral glyph. | **Built with / Core LLM Intelligence** |
| **ElevenLabs** | `/public/logos/elevenlabs.svg` | [elevenlabs.io](https://elevenlabs.io/) | Dual vertical bars mark. | **Built with / Neural Voice Synthesis** |

---

## Technical Markup Rules
1. Every `<img>` tag must include explicit `width` and `height` (e.g. `width={120} height={35}`) to prevent Cumulative Layout Shift (CLS).
2. Descriptive `alt` text is required (e.g., `alt="HubSpot Solutions Partner badge"`).
3. Below-the-fold logos must specify `loading="lazy"`.
