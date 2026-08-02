import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Flag, Mountain as ElevationIcon, Route, MapPin } from 'lucide-react'
import TrailCard from '../components/trail/TrailCard'
import { trails } from '../data/trails'
import { useTrailLists } from '../hooks/useTrailLists'

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card dark:bg-pine-700/40">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-500/15 text-moss-600 dark:text-moss-400">
        <Icon size={18} />
      </span>
      <div>
        <p className="font-mono text-xl font-semibold text-pine-700 dark:text-tan-100">{value}</p>
        <p className="text-xs text-pine-700/50 dark:text-tan-100/50">{label}</p>
      </div>
    </div>
  )
}

export default function Completed() {
  const { completed, isSaved, isCompleted, toggleSaved, toggleCompleted } = useTrailLists()

  const completedTrails = useMemo(() => {
    return completed
      .map((entry) => ({ ...trails.find((t) => t.id === entry.id), completedAt: entry.completedAt }))
      .filter((t) => t.id)
      .sort((a, b) => b.completedAt - a.completedAt)
  }, [completed])

  const stats = useMemo(() => {
    const totalMiles = completedTrails.reduce((sum, t) => sum + t.distance, 0)
    const totalElevation = completedTrails.reduce((sum, t) => sum + t.elevationGain, 0)
    const states = new Set(completedTrails.map((t) => t.state)).size
    const parks = new Set(completedTrails.map((t) => t.nationalPark)).size
    return { totalMiles, totalElevation, states, parks }
  }, [completedTrails])

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-pine-700 dark:text-tan-100">Completed Hikes</h1>
        <p className="mt-1 text-sm text-pine-700/60 dark:text-tan-100/60">
          <span className="font-mono font-semibold text-pine-700 dark:text-tan-100">{completedTrails.length}</span>{' '}
          {completedTrails.length === 1 ? 'hike' : 'hikes'} completed
        </p>
      </div>

      {completedTrails.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-pine-100 py-20 text-center dark:border-pine-500/30">
          <Flag size={32} className="text-pine-700/30 dark:text-tan-100/30" />
          <div>
            <p className="font-display text-lg text-pine-700 dark:text-tan-100">No completed hikes yet</p>
            <p className="mt-1 text-sm text-pine-700/50 dark:text-tan-100/50">
              Mark a trail complete from Explore and your stats will show up here.
            </p>
          </div>
          <Link
            to="/"
            className="rounded-full bg-pine-700 px-5 py-2 text-sm font-medium text-tan-100 transition-colors hover:bg-pine-500 dark:bg-tan-300 dark:text-pine-900"
          >
            Browse trails
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard icon={Route} label="Total Miles" value={stats.totalMiles.toFixed(1)} />
            <StatCard icon={ElevationIcon} label="Elevation Climbed (ft)" value={stats.totalElevation.toLocaleString()} />
            <StatCard icon={MapPin} label="States Visited" value={stats.states} />
            <StatCard icon={Flag} label="Parks Visited" value={stats.parks} />
          </div>

          {/* Per-hike completion date, personal rating, notes, and favorite
              flag land in the next pass — this view already reflects real
              completed-trail data pulled from the same state Explore writes to. */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {completedTrails.map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
                isSaved={isSaved(trail.id)}
                isCompleted={isCompleted(trail.id)}
                onToggleSave={toggleSaved}
                onToggleComplete={toggleCompleted}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
