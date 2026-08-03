// Trail Atlas doesn't have real GPS track data for these trails (no GPX/
// GeoJSON source), so this produces a deterministic, plausible-looking path
// from the trailhead — scaled to the trail's stated distance — purely as a
// visual stand-in until real trail geometry is wired in. Same trail id
// always produces the same path (no jitter on re-render).

function seededRandom(seed) {
  let t = seed + 0x6d2b79f5
  return function random() {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}

export function generateApproxRoute(trail, segments = 7) {
  const rand = seededRandom(hashString(trail.id))
  const isLoop = trail.loop === 'Loop'
  // Out-and-back trails report round-trip distance; draw one leg (half),
  // since the return leg overlays the same line on the map.
  const legMiles = isLoop ? trail.distance : trail.distance / 2
  const milesPerSegment = legMiles / segments

  const points = [[trail.lat, trail.lng]]
  let lat = trail.lat
  let lng = trail.lng
  let bearing = rand() * 360

  for (let i = 0; i < segments; i++) {
    bearing += (rand() - 0.5) * 80
    const distDeg = milesPerSegment / 69 // ~69 miles per degree latitude
    const rad = (bearing * Math.PI) / 180
    lat += distDeg * Math.cos(rad)
    lng += (distDeg * Math.sin(rad)) / Math.cos((trail.lat * Math.PI) / 180)
    points.push([lat, lng])
  }

  if (isLoop) points.push([trail.lat, trail.lng])

  return points
}

// Looks for a real route at /routes/{id}.json (produced by
// scripts/gpx-to-json.mjs from a downloaded .gpx file). Falls back to the
// generated illustrative route if no file exists for this trail yet — so
// you can convert GPX files trail-by-trail without anything breaking in
// the meantime.
export async function loadRoute(trail) {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}routes/${trail.id}.json`)
    if (res.ok) {
      const points = await res.json()
      if (Array.isArray(points) && points.length > 1) {
        return { points, isReal: true }
      }
    }
  } catch {
    // network hiccup or missing file — fall through to the generated route
  }
  return { points: generateApproxRoute(trail), isReal: false }
}
