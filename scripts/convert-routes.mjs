// Converts downloaded trail track files — .gpx or .json (GeoJSON, or a
// plain array of coordinate points) — into the compact [lat, lng] arrays
// TrailMap expects, and writes them to public/routes/{trail-id}.json.
//
// Usage:
//   1. Drop your downloaded files into a folder, named to match trail ids
//      from src/data/trails.js — e.g. angels-landing.gpx, half-dome.json.
//      (Check the `id` field in src/data/trails.js if unsure.)
//   2. node scripts/convert-routes.mjs path/to/your/tracks-folder
//   3. Commit the generated public/routes/*.json files.
//
// No dependencies. GPX is read with a regex (fine for standard <trkpt>
// tags). JSON is auto-detected across a few common shapes:
//   - GeoJSON Feature / FeatureCollection (LineString / MultiLineString)
//   - a plain array of [lat, lng] or [lng, lat] pairs (order auto-detected)
//   - a plain array of {lat, lng} / {latitude, longitude} objects
//   - any of the above nested under a "coordinates" / "points" / "track" /
//     "trk" / "segments" / "trackPoints" key

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, basename, extname } from 'node:path'

const MAX_POINTS = 300 // downsample very dense tracks so the JSON stays small and the map stays smooth

const inputDir = process.argv[2]
if (!inputDir) {
  console.error('Usage: node scripts/convert-routes.mjs <folder-of-gpx-or-json-files>')
  process.exit(1)
}

const outputDir = join(process.cwd(), 'public', 'routes')
mkdirSync(outputDir, { recursive: true })

// ---------- GPX ----------

const trkptPattern = /<trkpt[^>]*\slat="(-?\d+(?:\.\d+)?)"[^>]*\slon="(-?\d+(?:\.\d+)?)"/g

function extractFromGpx(text) {
  const points = []
  let match
  while ((match = trkptPattern.exec(text)) !== null) {
    points.push([Number(match[1]), Number(match[2])])
  }
  return points
}

// ---------- JSON ----------

function normalizePairs(pairs, swap) {
  return pairs
    .map((p) => {
      if (!Array.isArray(p) || p.length < 2) return null
      let [a, b] = p
      if (swap) [a, b] = [b, a] // GeoJSON stores [lng, lat] — flip to [lat, lng]
      a = Number(a)
      b = Number(b)
      return [a, b]
    })
    .filter((p) => p && Number.isFinite(p[0]) && Number.isFinite(p[1]) && Math.abs(p[0]) <= 90 && Math.abs(p[1]) <= 180)
}

// A latitude can't exceed ±90, so if the first coordinate in a pair does,
// the pair must be [lng, lat] and needs swapping.
function guessNeedsSwap(pairs) {
  const first = pairs.find((p) => Array.isArray(p) && p.length >= 2)
  return first ? Math.abs(Number(first[0])) > 90 : false
}

function coordsFromGeometry(geometry) {
  if (!geometry) return []
  if (geometry.type === 'LineString') return geometry.coordinates
  if (geometry.type === 'MultiLineString') return geometry.coordinates.flat()
  if (geometry.type === 'Point') return [geometry.coordinates]
  return []
}

function extractFromJson(data) {
  // GeoJSON Feature / FeatureCollection — coordinates are [lng, lat], always swap.
  if (data?.type === 'Feature') {
    return normalizePairs(coordsFromGeometry(data.geometry), true)
  }
  if (data?.type === 'FeatureCollection') {
    const coords = (data.features ?? []).flatMap((f) => coordsFromGeometry(f.geometry))
    return normalizePairs(coords, true)
  }
  if (data?.type === 'LineString' || data?.type === 'MultiLineString') {
    return normalizePairs(coordsFromGeometry(data), true)
  }

  // Otherwise look for an array of points, either at the top level or
  // nested under a common key.
  const candidates = [data, data?.coordinates, data?.points, data?.track, data?.trk, data?.segments, data?.trackPoints].filter(
    Array.isArray,
  )

  for (const arr of candidates) {
    if (!arr.length) continue
    const first = arr[0]

    if (Array.isArray(first)) {
      return normalizePairs(arr, guessNeedsSwap(arr))
    }

    if (first && typeof first === 'object') {
      const pairs = arr.map((p) => [
        p.lat ?? p.latitude ?? p.Lat ?? p.y,
        p.lng ?? p.lon ?? p.long ?? p.longitude ?? p.Lng ?? p.x,
      ])
      const points = normalizePairs(pairs, false)
      if (points.length) return points
    }
  }

  return []
}

// ---------- shared ----------

function downsample(points, maxPoints) {
  if (points.length <= maxPoints) return points
  const step = points.length / maxPoints
  const result = []
  for (let i = 0; i < maxPoints; i++) {
    result.push(points[Math.floor(i * step)])
  }
  result.push(points[points.length - 1]) // always keep the true endpoint
  return result
}

const files = readdirSync(inputDir).filter((f) => ['.gpx', '.json'].includes(extname(f).toLowerCase()))

if (!files.length) {
  console.error(`No .gpx or .json files found in ${inputDir}`)
  process.exit(1)
}

for (const file of files) {
  const raw = readFileSync(join(inputDir, file), 'utf-8')
  const ext = extname(file).toLowerCase()

  let points
  try {
    points = ext === '.gpx' ? extractFromGpx(raw) : extractFromJson(JSON.parse(raw))
  } catch (err) {
    console.warn(`⚠️  Couldn't parse ${file}: ${err.message} — skipping`)
    continue
  }

  if (!points.length) {
    console.warn(`⚠️  No usable coordinates found in ${file} — skipping. If this is JSON, the shape may not be recognized (open an issue with a sample of its structure).`)
    continue
  }

  const trailId = basename(file, ext)
  const outPath = join(outputDir, `${trailId}.json`)
  writeFileSync(outPath, JSON.stringify(downsample(points, MAX_POINTS)))
  console.log(`✓ ${file} → public/routes/${trailId}.json (${Math.min(points.length, MAX_POINTS)} points)`)
}
