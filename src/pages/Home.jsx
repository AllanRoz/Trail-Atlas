import { useMemo, useState } from 'react'
import { Map as MapIcon, X } from 'lucide-react'
import Hero from '../components/layout/Hero'
import FilterSidebar from '../components/trail/FilterSidebar'
import TrailCard from '../components/trail/TrailCard'
import TrailMap from '../components/trail/TrailMap'
import { trails } from '../data/trails'
import { useTrailLists } from '../hooks/useTrailLists'

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
  const { isSaved, isCompleted, toggleSaved, toggleCompleted } = useTrailLists()

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

      <div className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 lg:px-10">
        {/* items-start (not the flex default of stretch) so the filter card
            hugs its own content instead of stretching to match the taller
            results column next to it. */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <FilterSidebar filters={filters} onChange={setFilters} />

          <div className="min-w-0 flex-1">
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

            {/* Cards keep a fixed, readable width (2-up) instead of growing
                with the viewport; the map is a flex child that claims
                whatever space is left over on wide screens. */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div
                className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:w-[640px] lg:shrink-0 ${
                  showMap ? 'hidden lg:grid' : ''
                }`}
              >
                {filteredTrails.map((trail) => (
                  <TrailCard
                    key={trail.id}
                    trail={trail}
                    isSaved={isSaved(trail.id)}
                    isCompleted={isCompleted(trail.id)}
                    onToggleSave={toggleSaved}
                    onToggleComplete={toggleCompleted}
                  />
                ))}
                {filteredTrails.length === 0 && (
                  <p className="col-span-full rounded-2xl border border-dashed border-pine-100 p-10 text-center text-pine-700/50 dark:border-pine-500/30 dark:text-tan-100/50">
                    No trails match those filters yet. Try loosening a filter or clearing your search.
                  </p>
                )}
              </div>

              <div
                className={`h-[500px] flex-1 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] ${
                  showMap ? '' : 'hidden lg:block'
                }`}
              >
                <TrailMap trails={filteredTrails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
