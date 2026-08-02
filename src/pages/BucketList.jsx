import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import TrailCard from '../components/trail/TrailCard'
import { trails } from '../data/trails'
import { useTrailLists } from '../hooks/useTrailLists'

const sortOptions = [
  { value: 'dateAdded', label: 'Date Added' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'distance', label: 'Distance' },
  { value: 'state', label: 'State' },
]

const difficultyRank = { Easy: 0, Moderate: 1, Hard: 2 }

export default function BucketList() {
  const { saved, isSaved, isCompleted, toggleSaved, toggleCompleted } = useTrailLists()
  const [sortBy, setSortBy] = useState('dateAdded')

  const savedTrails = useMemo(() => {
    const withMeta = saved
      .map((entry) => ({ ...trails.find((t) => t.id === entry.id), addedAt: entry.addedAt }))
      .filter((t) => t.id) // guards against stale ids if the seed dataset ever changes

    return [...withMeta].sort((a, b) => {
      if (sortBy === 'difficulty') return difficultyRank[a.difficulty] - difficultyRank[b.difficulty]
      if (sortBy === 'distance') return a.distance - b.distance
      if (sortBy === 'state') return a.state.localeCompare(b.state)
      return b.addedAt - a.addedAt // most recently added first
    })
  }, [saved, sortBy])

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-pine-700 dark:text-tan-100">Bucket List</h1>
          <p className="mt-1 text-sm text-pine-700/60 dark:text-tan-100/60">
            <span className="font-mono font-semibold text-pine-700 dark:text-tan-100">{savedTrails.length}</span>{' '}
            {savedTrails.length === 1 ? 'trail' : 'trails'} saved
          </p>
        </div>

        {savedTrails.length > 0 && (
          <label className="flex items-center gap-2 text-sm text-pine-700/70 dark:text-tan-100/70">
            Sort by
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-pine-100 bg-white px-3 py-1.5 text-sm text-pine-700 outline-none focus-visible:border-moss-500 dark:border-pine-500/30 dark:bg-pine-700/40 dark:text-tan-100"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {savedTrails.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-pine-100 py-20 text-center dark:border-pine-500/30">
          <Compass size={32} className="text-pine-700/30 dark:text-tan-100/30" />
          <div>
            <p className="font-display text-lg text-pine-700 dark:text-tan-100">Your bucket list is empty</p>
            <p className="mt-1 text-sm text-pine-700/50 dark:text-tan-100/50">
              Save a trail from Explore and it'll show up here.
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedTrails.map((trail) => (
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
      )}
    </div>
  )
}
