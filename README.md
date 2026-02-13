# Velocity Digital

Premium agency site — Web Development, Meta Ads, Growth Marketing.

## Tech Stack

- **Framework:** Next.js 15 (App Router, RSC, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** Framer Motion
- **Validation:** Zod
- **Deployment:** Vercel (recommended)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/contact/        # Lead qualification API (Zod-validated)
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Tailwind + custom base styles
├── components/
│   ├── ui/                 # Atoms — Button, Container, Badge, Form Fields
│   ├── sections/           # Molecules — Hero, Services, Work, FAQ, CTA
│   └── layout/             # Header, Footer
├── data/                   # Local CMS — case studies, services, site content
└── lib/
    ├── utils.ts            # cn() helper, formatters
    ├── motion.ts           # Framer Motion presets
    └── schemas/            # Zod validation schemas
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design Tokens

Custom palette defined in `tailwind.config.ts`:

| Token         | Value       | Usage                    |
|---------------|-------------|--------------------------|
| Charcoal 950  | `#0a0a0a`   | Primary surface          |
| Cream         | `#f4f4f0`   | Primary text, light bg   |
| Cobalt        | `#2d5bff`   | Primary accent           |
| Ember         | `#e8430a`   | Secondary accent/urgency |

## Contact API

`POST /api/contact` — Zod-validated with lead scoring.

Fields: name, email, company, service, budget, timeline, message + optional qualification fields.

Returns lead tier (hot/warm/cold) and customized response timing.

## Content

All copy lives in `src/data/` — case studies, services, testimonials, FAQs, navigation. Designed to be swapped for a headless CMS later (Sanity, Payload, etc.).
