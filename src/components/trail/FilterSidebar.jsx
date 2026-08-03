import { useMemo } from 'react'
import { difficulties, loopTypes, trails } from '../../data/trails'
import { cn } from '../../utils/cn'

const tagFilters = [
  { key: 'dogFriendly', label: 'Dog Friendly' },
  { key: 'waterfalls', label: 'Waterfalls' },
  { key: 'scenicViews', label: 'Scenic Views' },
]

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'border-pine-700 bg-pine-700 text-tan-100 dark:border-tan-300 dark:bg-tan-300 dark:text-pine-900'
          : 'border-pine-100 text-pine-700/70 hover:border-moss-500 dark:border-pine-500/30 dark:text-tan-100/70',
      )}
    >
      {children}
    </button>
  )
}

function FilterGroup({ label, children }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-pine-700/50 dark:text-tan-100/50">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="rounded-lg border border-pine-100 bg-white px-3 py-1.5 text-sm text-pine-700 outline-none focus-visible:border-moss-500 dark:border-pine-500/30 dark:bg-pine-900/40 dark:text-tan-100"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

// Horizontal filter bar sitting above the results, rather than a tall
// sidebar — frees up the full width below for a 3-column card grid plus
// the map, and means the filter controls never dictate page height.
export default function FilterSidebar({ filters, onChange }) {
  const states = useMemo(() => [...new Set(trails.map((t) => t.state))].sort(), [])
  const parks = useMemo(() => [...new Set(trails.map((t) => t.nationalPark))].sort(), [])

  const toggleDifficulty = (d) => {
    const next = filters.difficulty.includes(d)
      ? filters.difficulty.filter((x) => x !== d)
      : [...filters.difficulty, d]
    onChange({ ...filters, difficulty: next })
  }

  const toggleTag = (key) => {
    onChange({ ...filters, [key]: !filters[key] })
  }

  return (
    <div className="flex flex-wrap items-start gap-x-8 gap-y-5 rounded-2xl bg-white p-5 shadow-card dark:bg-pine-700/40">
      <FilterGroup label="State">
        <Select value={filters.state} onChange={(v) => onChange({ ...filters, state: v })} options={states} placeholder="All states" />
      </FilterGroup>

      <FilterGroup label="National Park">
        <Select
          value={filters.nationalPark}
          onChange={(v) => onChange({ ...filters, nationalPark: v })}
          options={parks}
          placeholder="All parks"
        />
      </FilterGroup>

      <FilterGroup label="Difficulty">
        {difficulties.map((d) => (
          <Pill key={d} active={filters.difficulty.includes(d)} onClick={() => toggleDifficulty(d)}>
            {d}
          </Pill>
        ))}
      </FilterGroup>

      <FilterGroup label="Route Type">
        {loopTypes.map((l) => (
          <Pill
            key={l}
            active={filters.loop === l}
            onClick={() => onChange({ ...filters, loop: filters.loop === l ? null : l })}
          >
            {l}
          </Pill>
        ))}
      </FilterGroup>

      <div className="min-w-[160px]">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-pine-700/50 dark:text-tan-100/50">
          Max Distance: <span className="font-mono text-pine-700 dark:text-tan-100">{filters.maxDistance} mi</span>
        </h3>
        <input
          type="range"
          min="1"
          max="15"
          value={filters.maxDistance}
          onChange={(e) => onChange({ ...filters, maxDistance: Number(e.target.value) })}
          className="w-full accent-moss-500"
        />
      </div>

      <div className="min-w-[160px]">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-pine-700/50 dark:text-tan-100/50">
          Max Elevation Gain: <span className="font-mono text-pine-700 dark:text-tan-100">{filters.maxElevation.toLocaleString()} ft</span>
        </h3>
        <input
          type="range"
          min="100"
          max="5100"
          step="100"
          value={filters.maxElevation}
          onChange={(e) => onChange({ ...filters, maxElevation: Number(e.target.value) })}
          className="w-full accent-moss-500"
        />
      </div>

      <FilterGroup label="Features">
        {tagFilters.map(({ key, label }) => (
          <Pill key={key} active={filters[key]} onClick={() => toggleTag(key)}>
            {label}
          </Pill>
        ))}
      </FilterGroup>
    </div>
  )
}
