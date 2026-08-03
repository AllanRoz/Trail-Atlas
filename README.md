# Trail Atlas

A static, client-only hiking bucket-list app. React + Vite + Tailwind + Leaflet, everything
persisted to `localStorage`. No backend, no auth, no paid APIs — designed to host for free on
GitHub Pages.

## What's built

- **Explore (Home)** — hero search, a filter bar (state, national park, difficulty, route type,
  max distance, max elevation gain, dog friendly / waterfalls / scenic views), a 3-column trail
  card grid, and a live Leaflet/OpenStreetMap panel with popups, all filtering the same 50-trail
  dataset in real time.
- **Trail Detail** — hero image, stats, description, live current + 7-day weather forecast at
  the trailhead, features, best season, parking info, an embedded map with an illustrative route
  overlay, and Add to Bucket List / Mark Completed actions.
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

Hero/thumbnail images are seeded [Picsum](https://picsum.photos) placeholders (deterministic per
trail id, so they always resolve) — swap in real trail photography before using this for anything
beyond a demo.

Weather on the Trail Detail page comes from [Open-Meteo](https://open-meteo.com) — free, no API
key, browser-CORS-friendly, so it doesn't violate the "no backend, no paid APIs" constraint. It's
the one live network call in an otherwise fully static app.

The route line on the Trail Detail map is a **deterministic illustrative approximation**
(`src/utils/generateRoute.js`) by default — this dataset doesn't include real GPS trail geometry.

### Adding real routes

1. Download track files for your trails — `.gpx` or `.json` both work — named to match each
   trail's `id` in `src/data/trails.js` (e.g. `angels-landing.gpx`, `half-dome.json`).
2. Run:
   ```bash
   node scripts/convert-routes.mjs path/to/your/tracks-folder
   ```
   This extracts and downsamples each track's points and writes `public/routes/{trail-id}.json`.
   JSON files are auto-detected across a few common shapes — GeoJSON `Feature`/`FeatureCollection`
   (handles the `[lng, lat]` coordinate order GeoJSON uses, flipping it to `[lat, lng]`), a plain
   array of `[lat, lng]` or `[lng, lat]` pairs (order is auto-detected), or an array of
   `{lat, lng}` / `{latitude, longitude}` objects — nested under a `coordinates`, `points`,
   `track`, or `trk` key if needed.
3. Commit those JSON files. That's it — no code changes needed. The Trail Detail page checks
   `public/routes/{id}.json` first and only falls back to the generated route if that file
   doesn't exist, so you can convert trails one at a time.

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
