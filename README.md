# Trail Atlas

A static, client-only hiking bucket-list app. React + Vite + Tailwind + Leaflet, everything
persisted to `localStorage`. No backend, no auth, no paid APIs — designed to host for free on
GitHub Pages.

## What's built

- **Explore (Home)** — hero search, a filter bar (state, national park, difficulty, route type,
  max distance, max elevation gain, dog friendly / waterfalls / scenic views), a 3-column trail
  card grid, and a live Leaflet/OpenStreetMap panel with popups, all filtering the same 50-trail
  dataset in real time.
- **Trail Detail** — hero image, stats, description, photo gallery, features, best season,
  parking info, an embedded map, and Add to Bucket List / Mark Completed actions.
- **Bucket List** — saved trails with sorting by date added, difficulty, distance, or state.
- **Completed Hikes** — completed trails plus rollup stats (total miles, elevation climbed,
  states visited, parks visited).
- **Dashboard** — bucket list count, completed count, completion %, mileage, and elevation, plus
  charts for hikes by difficulty, monthly completions, and cumulative distance over time
  (Recharts).
- Sticky, responsive navigation (desktop top bar + mobile bottom bar) with dark mode.
- All save/complete state lives in one shared hook (`src/hooks/useTrailLists.js`) backed by
  `localStorage`, so every page reflects the same data.

## Data

`src/data/trails.js` ships with 50 real U.S. trails (name, state, park, coordinates, distance,
elevation gain, estimated time, difficulty, rating, description, hero/thumbnail images, features,
parking info, best season). It was produced by `generate-trails.mjs` in the project root — rerun
`node generate-trails.mjs > src/data/trails.js` if you edit the seed list or want to add more
trails; it's not part of the built app.

Hero/thumbnail/gallery images are seeded [Picsum](https://picsum.photos) placeholders
(deterministic per trail id, so they always resolve) — swap in real trail photography before
using this for anything beyond a demo.

## Not yet built

- Per-hike completion detail (personal rating, notes, favorite flag) — the data shape already
  reserves fields for this (`rating`, `notes`, `favorite` on each completed entry), just no UI yet.

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
