# Trail Atlas

A static, client-only hiking bucket-list app. React + Vite + Tailwind + Leaflet, everything
persisted to `localStorage`. No backend, no auth, no paid APIs — designed to host for free on
GitHub Pages.

## Milestone 1 (this delivery)

- Project structure (`components/`, `pages/`, `hooks/`, `data/`, `utils/`, `styles/`)
- Vite + Tailwind configured, with a small custom design-token set (see `tailwind.config.js`)
- Routing for all five top-level pages (Home, Trail Detail, Bucket List, Completed, Dashboard) —
  the latter three are stubs for now
- Sticky, responsive navigation (desktop top bar + mobile bottom bar) with dark mode toggle
- Full Home page: hero + live search, filter sidebar, trail card grid, Leaflet/OpenStreetMap
  markers with popups, all wired together and filtering a small seed dataset (6 trails)

## Not yet built (future milestones)

- Full 50+ trail dataset with galleries, parking info, best season, etc.
- Trail Detail page content
- Bucket List sorting/removal
- Completed Hikes tracking (date, personal rating, notes, favorite) + stats
- Dashboard charts (Recharts is already in `package.json`, not yet wired up)

## Getting started

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repo named `trail-atlas` (or update `base` in
   `vite.config.js` to match whatever your repo is named).
2. `npm run build` — this outputs static files to `dist/`.
3. `npm run deploy` — uses `gh-pages` to publish `dist/` to the `gh-pages` branch.
4. In your repo's Settings → Pages, set the source to the `gh-pages` branch.

Your site will be live at `https://<your-username>.github.io/trail-atlas/`.
