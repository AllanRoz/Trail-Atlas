// One-off generator — run with `node generate-trails.mjs` from this folder.
// Produces src/data/trails.js. Not part of the shipped app; kept here so the
// dataset can be regenerated/extended later without hand-editing 50 objects.

const seeds = [
  { id: 'angels-landing', name: 'Angels Landing', state: 'Utah', nationalPark: 'Zion National Park', lat: 37.2691, lng: -112.9481, distance: 5.4, elevationGain: 1488, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert', permit: true },
  { id: 'mist-trail', name: 'Mist Trail to Vernal Fall', state: 'California', nationalPark: 'Yosemite National Park', lat: 37.7275, lng: -119.5573, distance: 3.0, elevationGain: 1000, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'pnw' },
  { id: 'skyline-trail', name: 'Skyline Trail', state: 'Washington', nationalPark: 'Mount Rainier National Park', lat: 46.7857, lng: -121.7350, distance: 5.5, elevationGain: 1700, difficulty: 'Moderate', loop: 'Loop', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'pnw' },
  { id: 'delicate-arch', name: 'Delicate Arch Trail', state: 'Utah', nationalPark: 'Arches National Park', lat: 38.7436, lng: -109.4993, distance: 3.0, elevationGain: 480, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'old-rag', name: 'Old Rag Mountain Loop', state: 'Virginia', nationalPark: 'Shenandoah National Park', lat: 38.5678, lng: -78.2953, distance: 9.1, elevationGain: 2415, difficulty: 'Hard', loop: 'Loop', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'eastern', permit: true },
  { id: 'emerald-lake', name: 'Emerald Lake Trail', state: 'Colorado', nationalPark: 'Rocky Mountain National Park', lat: 40.3122, lng: -105.6470, distance: 3.6, elevationGain: 605, difficulty: 'Easy', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'half-dome', name: 'Half Dome Trail', state: 'California', nationalPark: 'Yosemite National Park', lat: 37.7459, lng: -119.5332, distance: 14.2, elevationGain: 4800, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'pnw', permit: true },
  { id: 'bright-angel', name: 'Bright Angel Trail', state: 'Arizona', nationalPark: 'Grand Canyon National Park', lat: 36.0570, lng: -112.1420, distance: 9.5, elevationGain: 4380, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'south-kaibab', name: 'South Kaibab Trail', state: 'Arizona', nationalPark: 'Grand Canyon National Park', lat: 36.0544, lng: -112.0810, distance: 6.0, elevationGain: 3600, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'narrows-bottom-up', name: 'The Narrows (Bottom-Up)', state: 'Utah', nationalPark: 'Zion National Park', lat: 37.2982, lng: -112.9481, distance: 9.4, elevationGain: 334, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'chimney-tops', name: 'Chimney Tops Trail', state: 'Tennessee', nationalPark: 'Great Smoky Mountains National Park', lat: 35.6382, lng: -83.4557, distance: 4.0, elevationGain: 1400, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'alum-cave-leconte', name: 'Alum Cave Trail to Mount LeConte', state: 'Tennessee', nationalPark: 'Great Smoky Mountains National Park', lat: 35.6437, lng: -83.4402, distance: 11.0, elevationGain: 2763, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'jordan-pond-path', name: 'Jordan Pond Path', state: 'Maine', nationalPark: 'Acadia National Park', lat: 44.3286, lng: -68.2534, distance: 3.3, elevationGain: 150, difficulty: 'Easy', loop: 'Loop', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'precipice-trail', name: 'Precipice Trail', state: 'Maine', nationalPark: 'Acadia National Park', lat: 44.3396, lng: -68.1857, distance: 2.1, elevationGain: 1000, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'highline-trail', name: 'Highline Trail', state: 'Montana', nationalPark: 'Glacier National Park', lat: 48.6960, lng: -113.7180, distance: 11.6, elevationGain: 830, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'grinnell-glacier', name: 'Grinnell Glacier Trail', state: 'Montana', nationalPark: 'Glacier National Park', lat: 48.7592, lng: -113.7328, distance: 10.6, elevationGain: 1600, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'alpine' },
  { id: 'wonderland-section', name: 'Wonderland Trail (Spray Park Section)', state: 'Washington', nationalPark: 'Mount Rainier National Park', lat: 46.8021, lng: -121.7603, distance: 8.0, elevationGain: 2200, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'pnw' },
  { id: 'hoh-river', name: 'Hoh River Trail', state: 'Washington', nationalPark: 'Olympic National Park', lat: 47.8604, lng: -123.9327, distance: 5.6, elevationGain: 200, difficulty: 'Easy', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'pnw' },
  { id: 'hurricane-hill', name: 'Hurricane Hill Trail', state: 'Washington', nationalPark: 'Olympic National Park', lat: 47.9738, lng: -123.5001, distance: 3.2, elevationGain: 700, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'pnw' },
  { id: 'cascade-canyon', name: 'Cascade Canyon Trail', state: 'Wyoming', nationalPark: 'Grand Teton National Park', lat: 43.7904, lng: -110.7526, distance: 9.1, elevationGain: 1128, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'delta-lake', name: 'Delta Lake Trail', state: 'Wyoming', nationalPark: 'Grand Teton National Park', lat: 43.7423, lng: -110.8046, distance: 8.0, elevationGain: 2320, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'grand-prismatic-overlook', name: 'Grand Prismatic Spring Overlook', state: 'Wyoming', nationalPark: 'Yellowstone National Park', lat: 44.5250, lng: -110.8383, distance: 1.2, elevationGain: 105, difficulty: 'Easy', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'mount-washburn', name: 'Mount Washburn Trail', state: 'Wyoming', nationalPark: 'Yellowstone National Park', lat: 44.7967, lng: -110.4351, distance: 6.2, elevationGain: 1400, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'fairyland-loop', name: 'Fairyland Loop Trail', state: 'Utah', nationalPark: 'Bryce Canyon National Park', lat: 37.6382, lng: -112.1546, distance: 8.0, elevationGain: 1716, difficulty: 'Hard', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'navajo-loop', name: 'Navajo Loop Trail', state: 'Utah', nationalPark: 'Bryce Canyon National Park', lat: 37.6220, lng: -112.1683, distance: 1.3, elevationGain: 550, difficulty: 'Moderate', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'devils-garden', name: 'Devils Garden Loop', state: 'Utah', nationalPark: 'Arches National Park', lat: 38.7826, lng: -109.5951, distance: 7.9, elevationGain: 1082, difficulty: 'Hard', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'chesler-park', name: 'Chesler Park Loop', state: 'Utah', nationalPark: 'Canyonlands National Park', lat: 38.1500, lng: -109.8390, distance: 6.0, elevationGain: 1000, difficulty: 'Moderate', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'longs-peak-keyhole', name: 'Longs Peak Keyhole Route', state: 'Colorado', nationalPark: 'Rocky Mountain National Park', lat: 40.2548, lng: -105.6155, distance: 14.5, elevationGain: 5100, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine', permit: true },
  { id: 'sky-pond', name: 'Sky Pond Trail', state: 'Colorado', nationalPark: 'Rocky Mountain National Park', lat: 40.3070, lng: -105.6437, distance: 9.0, elevationGain: 1780, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'alpine' },
  { id: 'comet-falls', name: 'Comet Falls Trail', state: 'Washington', nationalPark: 'Mount Rainier National Park', lat: 46.7590, lng: -121.8332, distance: 3.8, elevationGain: 1200, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'pnw' },
  { id: 'manoa-falls', name: 'Manoa Falls Trail', state: 'Hawaii', nationalPark: "Honolulu Watershed Forest Reserve", lat: 21.3325, lng: -157.8011, distance: 1.6, elevationGain: 400, difficulty: 'Easy', loop: 'Out-and-Back', dogFriendly: true, waterfalls: true, scenicViews: true, region: 'hawaii' },
  { id: 'hanakapiai-falls', name: 'Kalalau Trail to Hanakapiai Falls', state: 'Hawaii', nationalPark: 'Nā Pali Coast State Wilderness Park', lat: 22.2203, lng: -159.5950, distance: 8.0, elevationGain: 1200, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'hawaii', permit: true },
  { id: 'diamond-head', name: 'Diamond Head Summit Trail', state: 'Hawaii', nationalPark: 'Diamond Head State Monument', lat: 21.2620, lng: -157.8059, distance: 1.6, elevationGain: 560, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'hawaii' },
  { id: 'franconia-ridge', name: 'Franconia Ridge Loop', state: 'New Hampshire', nationalPark: 'White Mountain National Forest', lat: 44.1601, lng: -71.6438, distance: 8.9, elevationGain: 3900, difficulty: 'Hard', loop: 'Loop', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'mount-marcy', name: 'Mount Marcy Trail', state: 'New York', nationalPark: 'Adirondack Park', lat: 44.1128, lng: -73.9237, distance: 14.8, elevationGain: 3166, difficulty: 'Hard', loop: 'Out-and-Back', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'multnomah-wahkeena', name: 'Multnomah Falls to Wahkeena Loop', state: 'Oregon', nationalPark: 'Columbia River Gorge National Scenic Area', lat: 45.5762, lng: -122.1158, distance: 5.0, elevationGain: 1600, difficulty: 'Moderate', loop: 'Loop', dogFriendly: true, waterfalls: true, scenicViews: true, region: 'pnw' },
  { id: 'mcafee-knob', name: 'McAfee Knob Trail', state: 'Virginia', nationalPark: 'Jefferson National Forest', lat: 37.3785, lng: -80.0335, distance: 8.8, elevationGain: 1740, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'enchanted-rock', name: 'Enchanted Rock Summit Trail', state: 'Texas', nationalPark: 'Enchanted Rock State Natural Area', lat: 30.5060, lng: -98.8189, distance: 1.5, elevationGain: 425, difficulty: 'Easy', loop: 'Loop', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'south-rim-big-bend', name: 'South Rim Trail', state: 'Texas', nationalPark: 'Big Bend National Park', lat: 29.2498, lng: -103.3020, distance: 12.0, elevationGain: 2000, difficulty: 'Hard', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'wildcat-ridge', name: 'Wildcat Ridge Trail', state: 'Michigan', nationalPark: 'Porcupine Mountains Wilderness State Park', lat: 46.8330, lng: -89.8320, distance: 6.8, elevationGain: 1000, difficulty: 'Moderate', loop: 'Loop', dogFriendly: true, waterfalls: true, scenicViews: true, region: 'eastern' },
  { id: 'cadillac-south-ridge', name: 'Cadillac Mountain South Ridge Trail', state: 'Maine', nationalPark: 'Acadia National Park', lat: 44.3494, lng: -68.2247, distance: 7.0, elevationGain: 1100, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'mirror-lake-loop', name: 'Mirror Lake Loop', state: 'California', nationalPark: 'Yosemite National Park', lat: 37.7415, lng: -119.5568, distance: 4.6, elevationGain: 200, difficulty: 'Easy', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'pnw' },
  { id: 'taft-point', name: 'Taft Point Trail', state: 'California', nationalPark: 'Yosemite National Park', lat: 37.7161, lng: -119.6187, distance: 2.2, elevationGain: 300, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'pnw' },
  { id: 'watchman-trail', name: 'Watchman Trail', state: 'Utah', nationalPark: 'Zion National Park', lat: 37.1963, lng: -112.9871, distance: 3.3, elevationGain: 368, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'desert' },
  { id: 'beehive-trail', name: 'Beehive Trail', state: 'Maine', nationalPark: 'Acadia National Park', lat: 44.3372, lng: -68.1892, distance: 1.4, elevationGain: 450, difficulty: 'Hard', loop: 'Loop', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'eastern' },
  { id: 'dream-lake', name: 'Dream Lake Trail', state: 'Colorado', nationalPark: 'Rocky Mountain National Park', lat: 40.3145, lng: -105.6491, distance: 2.2, elevationGain: 425, difficulty: 'Easy', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'alpine-ridge', name: 'Alpine Ridge Trail', state: 'Colorado', nationalPark: 'Rocky Mountain National Park', lat: 40.4360, lng: -105.8180, distance: 0.6, elevationGain: 200, difficulty: 'Easy', loop: 'Out-and-Back', dogFriendly: false, waterfalls: false, scenicViews: true, region: 'alpine' },
  { id: 'rainbow-falls', name: 'Rainbow Falls Trail', state: 'Tennessee', nationalPark: 'Great Smoky Mountains National Park', lat: 35.6742, lng: -83.4630, distance: 5.4, elevationGain: 1500, difficulty: 'Moderate', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'eastern' },
  { id: 'laurel-falls', name: 'Laurel Falls Trail', state: 'Tennessee', nationalPark: 'Great Smoky Mountains National Park', lat: 35.6763, lng: -83.5646, distance: 2.6, elevationGain: 400, difficulty: 'Easy', loop: 'Out-and-Back', dogFriendly: false, waterfalls: true, scenicViews: true, region: 'eastern' },
  { id: 'congaree-boardwalk', name: 'Congaree Boardwalk Loop', state: 'South Carolina', nationalPark: 'Congaree National Park', lat: 33.7948, lng: -80.7821, distance: 2.4, elevationGain: 20, difficulty: 'Easy', loop: 'Loop', dogFriendly: true, waterfalls: false, scenicViews: true, region: 'eastern' },
]

const seasonByRegion = {
  desert: 'Spring and fall — summer heat and afternoon storms make midday travel risky',
  alpine: 'Mid-July through September, once snow clears from the high country',
  pnw: 'Late June through September; trails at elevation hold snow into early summer',
  eastern: 'Spring and fall for cool temperatures and color; summer is humid, and higher elevations ice over in winter',
  hawaii: 'Year-round, though trails can close temporarily after heavy rain',
}

const parkingNotes = [
  'Trailhead lot is small and fills before 7am on weekends; arrive early or use the overflow lot down the road.',
  'Paid parking at the visitor center; a free shuttle runs to the trailhead during peak season.',
  'Roadside pull-offs near the trailhead; no dedicated lot, so carpooling is recommended in summer.',
  'Trailhead has a dedicated lot with restrooms; fills by mid-morning on weekends and holidays.',
]

function slugName(name) {
  return name.replace(/\(.*?\)/g, '').trim()
}

function buildFeatures(seed) {
  const features = []
  if (seed.waterfalls) features.push('Waterfalls')
  if (seed.scenicViews) features.push('Scenic Views')
  if (seed.dogFriendly) features.push('Dog Friendly')
  features.push(seed.loop === 'Loop' ? 'Loop Trail' : 'Out-and-Back')
  if (seed.elevationGain >= 2500) features.push('Strenuous Climb')
  if (seed.distance <= 2) features.push('Family Friendly')
  if (seed.permit) features.push('Permit Required')
  return features
}

function buildDescription(seed) {
  const highlights = []
  if (seed.waterfalls) highlights.push('cascading waterfalls')
  if (seed.elevationGain >= 2500) highlights.push('a serious sustained climb')
  if (seed.distance <= 2) highlights.push('an approachable, family-friendly distance')
  if (seed.scenicViews && highlights.length < 2) highlights.push('sweeping viewpoints')
  if (!highlights.length) highlights.push('quiet, well-shaded scenery')

  const loopWord = seed.loop === 'Loop' ? 'loop' : 'out-and-back route'
  const article = /^[aeiou]/i.test(seed.difficulty) ? 'an' : 'a'
  return `${slugName(seed.name)} climbs ${seed.elevationGain.toLocaleString()} ft over ${seed.distance} miles through ${seed.nationalPark} in ${seed.state}, ${article} ${seed.difficulty.toLowerCase()} ${loopWord} known for ${highlights.join(' and ')}.`
}

function buildParking(seed, index) {
  const note = parkingNotes[index % parkingNotes.length]
  const permitNote = seed.permit ? ' A permit is required for this trail and is typically obtained in advance by lottery or online reservation.' : ''
  return `${note}${permitNote}`
}

function estimateTime(seed) {
  const hours = seed.distance / 2.2 + seed.elevationGain / 1000
  const low = Math.max(0.5, Math.round(hours * 2) / 2)
  if (low < 1) return '< 1 hr'
  const high = low + (low >= 6 ? 2 : 1)
  return `${low}-${high} hrs`
}

function rating(id) {
  let hash = 0
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 1000
  return (4.3 + (hash % 71) / 100).toFixed(1)
}

const trails = seeds.map((seed, index) => ({
  id: seed.id,
  name: seed.name,
  state: seed.state,
  nationalPark: seed.nationalPark,
  lat: seed.lat,
  lng: seed.lng,
  distance: seed.distance,
  elevationGain: seed.elevationGain,
  estimatedTime: estimateTime(seed),
  difficulty: seed.difficulty,
  rating: Number(rating(seed.id)),
  description: buildDescription(seed),
  heroImage: `https://picsum.photos/seed/${seed.id}/1600/900`,
  thumbnail: `https://picsum.photos/seed/${seed.id}/600/400`,
  features: buildFeatures(seed),
  parkingInfo: buildParking(seed, index),
  bestSeason: seasonByRegion[seed.region],
  loop: seed.loop,
  dogFriendly: seed.dogFriendly,
  waterfalls: seed.waterfalls,
  scenicViews: seed.scenicViews,
}))

const fileContents = `// Trail Atlas seed dataset — ${trails.length} trails across the United States.
// Hero/thumbnail images are seeded Picsum placeholders (deterministic per
// trail id, always resolve) — swap for real trail photography before
// production use.
export const trails = ${JSON.stringify(trails, null, 2)}

export const difficulties = ['Easy', 'Moderate', 'Hard']
export const loopTypes = ['Loop', 'Out-and-Back']
`

console.log(fileContents)
