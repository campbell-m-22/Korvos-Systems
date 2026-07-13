# Korvos Systems — landing page

Marketing landing page for Korvos Systems, the backend-automation consulting arm
of Korvos. Vite + React (JSX) + Tailwind v4 + Motion + Phosphor icons.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

```bash
npm run build && npm run preview   # production build
```

## Design

- **Dials:** DESIGN_VARIANCE 5 · MOTION_INTENSITY 5 · VISUAL_DENSITY 3
- **Theme:** single warm light theme (brand tokens lock a dull off-white surface).
- **Accent:** one family only — bright orange (`#ff5a1f`) on Korvos navy (`#0f1e33`).
- **Type:** Plus Jakarta Sans (headings + wordmark) / Inter (body), via Google Fonts.
- **Motion:** hero entrance, scroll reveals, hover physics. All honour
  `prefers-reduced-motion`.

## Swap targets (placeholder images)

One `picsum.photos` seeded placeholder is marked `SWAP TARGET` in the code and
should be replaced with real photography:

1. `src/components/Capabilities.jsx` — lead-capture bento image.

The hero uses a built animated "assembling system" visual (no photo).

## Content honesty

No fabricated client logos, testimonials or metrics. Credibility is stated
honestly: built by the team behind Korvos, fixed pricing, you own the code,
built to run unattended. Australian English throughout.
