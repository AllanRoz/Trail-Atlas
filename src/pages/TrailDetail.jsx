import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Bookmark, CheckCircle2, MapPin, Mountain as ElevationIcon, Star, Clock, Calendar, ParkingCircle, Tag, Route as RouteIcon } from 'lucide-react'
import DifficultyBadge from '../components/trail/DifficultyBadge'
import TrailMap from '../components/trail/TrailMap'
import WeatherPanel from '../components/trail/WeatherPanel'
import { trails } from '../data/trails'
import { useTrailLists } from '../hooks/useTrailLists'
import { loadRoute } from '../utils/generateRoute'
import { cn } from '../utils/cn'

function StatBlock({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card dark:bg-pine-700/40">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-500/15 text-moss-600 dark:text-moss-400">
        <Icon size={16} />
      </span>
      <div>
        <p className="font-mono text-sm font-semibold text-pine-700 dark:text-tan-100">{value}</p>
        <p className="text-xs text-pine-700/50 dark:text-tan-100/50">{label}</p>
      </div>
    </div>
  )
}

export default function TrailDetail() {
  const { id } = useParams()
  const trail = trails.find((t) => t.id === id)
  const { isSaved, isCompleted, toggleSaved, toggleCompleted } = useTrailLists()

  // Tries a real GPX-derived route first (public/routes/{id}.json), falls
  // back to a generated illustrative path if that trail hasn't been
  // converted yet — see src/utils/generateRoute.js.
  const [route, setRoute] = useState(null)
  const [routeIsReal, setRouteIsReal] = useState(false)

  useEffect(() => {
    if (!trail) return
    let cancelled = false
    setRoute(null)
    loadRoute(trail).then(({ points, isReal }) => {
      if (!cancelled) {
        setRoute(points)
        setRouteIsReal(isReal)
      }
    })
    return () => {
      cancelled = true
    }
  }, [trail])

  if (!trail) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-pine-700 dark:text-tan-100">Trail not found</h1>
        <Link to="/" className="mt-4 inline-block text-moss-600 underline">
          Back to Explore
        </Link>
      </div>
    )
  }

  const saved = isSaved(trail.id)
  const completed = isCompleted(trail.id)

  return (
    <div>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden sm:h-[55vh]">
        <img src={trail.heroImage} alt={trail.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-900/85 via-pine-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-8 sm:px-6">
          <Link to="/" className="text-sm text-tan-100/80 underline">
            ← Back to Explore
          </Link>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <DifficultyBadge difficulty={trail.difficulty} />
              <h1 className="mt-2 font-display text-3xl text-summit sm:text-4xl">{trail.name}</h1>
              <p className="mt-1 flex items-center gap-1 text-tan-100/90">
                <MapPin size={15} />
                {trail.nationalPark}, {trail.state}
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-summit/90 px-3 py-1.5 font-mono text-sm font-semibold text-pine-700">
              <Star size={14} className="fill-tan-500 text-tan-500" />
              {trail.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatBlock icon={MapPin} label="Distance" value={`${trail.distance} mi`} />
          <StatBlock icon={ElevationIcon} label="Elevation Gain" value={`${trail.elevationGain.toLocaleString()} ft`} />
          <StatBlock icon={Clock} label="Est. Time" value={trail.estimatedTime} />
          <StatBlock icon={Tag} label="Route" value={trail.loop} />
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => toggleSaved(trail.id)}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
              saved
                ? 'bg-tan-300 text-pine-900'
                : 'bg-pine-700 text-tan-100 hover:bg-pine-500 dark:bg-tan-300 dark:text-pine-900',
            )}
          >
            <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
            {saved ? 'Saved to Bucket List' : 'Add to Bucket List'}
          </button>
          <button
            type="button"
            onClick={() => toggleCompleted(trail.id)}
            className={cn(
              'flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
              completed
                ? 'border-moss-500 bg-moss-500/15 text-moss-600 dark:text-moss-400'
                : 'border-pine-100 text-pine-700 hover:border-moss-500 hover:text-moss-600 dark:border-pine-500/30 dark:text-tan-100',
            )}
          >
            <CheckCircle2 size={16} />
            {completed ? 'Marked Completed' : 'Mark Completed'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="font-display text-xl text-pine-700 dark:text-tan-100">About this trail</h2>
              <p className="mt-2 leading-relaxed text-pine-700/80 dark:text-tan-100/80">{trail.description}</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-pine-700 dark:text-tan-100">Weather at the Trailhead</h2>
              <div className="mt-3">
                <WeatherPanel lat={trail.lat} lng={trail.lng} />
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-pine-700 dark:text-tan-100">Features</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {trail.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-tan-100 px-3 py-1.5 text-sm font-medium text-pine-700 dark:bg-pine-700/50 dark:text-tan-100"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-5 shadow-card dark:bg-pine-700/40">
              <h3 className="mb-3 flex items-center gap-2 font-display text-base text-pine-700 dark:text-tan-100">
                <Calendar size={16} /> Best Season
              </h3>
              <p className="text-sm text-pine-700/70 dark:text-tan-100/70">{trail.bestSeason}</p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-card dark:bg-pine-700/40">
              <h3 className="mb-3 flex items-center gap-2 font-display text-base text-pine-700 dark:text-tan-100">
                <ParkingCircle size={16} /> Parking
              </h3>
              <p className="text-sm text-pine-700/70 dark:text-tan-100/70">{trail.parkingInfo}</p>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 font-display text-base text-pine-700 dark:text-tan-100">
                <RouteIcon size={16} /> Route
              </h3>
              <div className="h-64 overflow-hidden rounded-2xl shadow-card">
                <TrailMap trails={[trail]} route={route} />
              </div>
              <p className="mt-2 text-[11px] leading-snug text-pine-700/40 dark:text-tan-100/40">
                {routeIsReal
                  ? 'Route from a recorded GPS track.'
                  : "Route shown is an illustrative approximation — no GPS track uploaded for this trail yet."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
