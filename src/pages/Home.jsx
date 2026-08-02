import { useMemo, useState } from 'react'
import { Map as MapIcon, X } from 'lucide-react'
import Hero from '../components/layout/Hero'
import FilterSidebar from '../components/trail/FilterSidebar'
import TrailCard from '../components/trail/TrailCard'
import TrailMap from '../components/trail/TrailMap'
import { trails } from '../data/trails'
import { useLocalStorage } from '../hooks/useLocalStorage'

const defaultFilters = {
  difficulty: [],
  loop: null,
  maxDistance: 15,
  dogFriendly: false,
  waterfalls: false,
  scenicViews: false,
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState(defaultFilters)
  const [showMap, setShowMap] = useState(false)
  const [savedIds, setSavedIds] = useLocalStorage('trail-atlas:bucket-list', [])
  const [completedIds, setCompletedIds] = useLocalStorage('trail-atlas:completed', [])

  const toggleSave = (id) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const toggleComplete = (id) =>
    setCompletedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const filteredTrails = useMemo(() => {
    return trails.filter((trail) => {
      const matchesQuery =
        !query ||
        [trail.name, trail.state, trail.nationalPark].some((field) =>
          field.toLowerCase().includes(query.toLowerCase()),
        )
      const matchesDifficulty = !filters.difficulty.length || filters.difficulty.includes(trail.difficulty)
      const matchesLoop = !filters.loop || trail.loop === filters.loop
      const matchesDistance = trail.distance <= filters.maxDistance
      const matchesDog = !filters.dogFriendly || trail.dogFriendly
      const matchesWaterfalls = !filters.waterfalls || trail.waterfalls
      const matchesScenic = !filters.scenicViews || trail.scenicViews

      return (
        matchesQuery && matchesDifficulty && matchesLoop && matchesDistance && matchesDog && matchesWaterfalls && matchesScenic
      )
    })
  }, [query, filters])

  return (
    <div>
      <Hero query={query} onQueryChange={setQuery} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <FilterSidebar filters={filters} onChange={setFilters} />

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-pine-700/60 dark:text-tan-100/60">
                <span className="font-mono font-semibold text-pine-700 dark:text-tan-100">
                  {filteredTrails.length}
                </span>{' '}
                trails found
              </p>
              <button
                type="button"
                onClick={() => setShowMap((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-full border border-pine-100 px-3 py-1.5 text-sm font-medium text-pine-700 transition-colors hover:border-moss-500 dark:border-pine-500/30 dark:text-tan-100 lg:hidden"
              >
                {showMap ? <X size={14} /> : <MapIcon size={14} />}
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className={`col-span-1 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 ${showMap ? 'hidden lg:grid' : ''}`}>
                {filteredTrails.map((trail) => (
                  <TrailCard
                    key={trail.id}
                    trail={trail}
                    isSaved={savedIds.includes(trail.id)}
                    isCompleted={completedIds.includes(trail.id)}
                    onToggleSave={toggleSave}
                    onToggleComplete={toggleComplete}
                  />
                ))}
                {filteredTrails.length === 0 && (
                  <p className="col-span-full rounded-2xl border border-dashed border-pine-100 p-10 text-center text-pine-700/50 dark:border-pine-500/30 dark:text-tan-100/50">
                    No trails match those filters yet. Try loosening a filter or clearing your search.
                  </p>
                )}
              </div>

              <div className={`col-span-1 h-[500px] lg:col-span-2 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] ${showMap ? '' : 'hidden lg:block'}`}>
                <TrailMap trails={filteredTrails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
