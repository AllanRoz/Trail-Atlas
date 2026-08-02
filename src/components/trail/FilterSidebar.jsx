import { difficulties, loopTypes } from '../../data/trails'
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

export default function FilterSidebar({ filters, onChange }) {
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
    <aside className="w-full shrink-0 space-y-6 rounded-2xl bg-white p-5 shadow-card dark:bg-pine-700/40 lg:w-64">
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-pine-700/50 dark:text-tan-100/50">
          Difficulty
        </h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <Pill key={d} active={filters.difficulty.includes(d)} onClick={() => toggleDifficulty(d)}>
              {d}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-pine-700/50 dark:text-tan-100/50">
          Route Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {loopTypes.map((l) => (
            <Pill key={l} active={filters.loop === l} onClick={() => onChange({ ...filters, loop: filters.loop === l ? null : l })}>
              {l}
            </Pill>
          ))}
        </div>
      </div>

      <div>
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

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-pine-700/50 dark:text-tan-100/50">
          Features
        </h3>
        <div className="flex flex-wrap gap-2">
          {tagFilters.map(({ key, label }) => (
            <Pill key={key} active={filters[key]} onClick={() => toggleTag(key)}>
              {label}
            </Pill>
          ))}
        </div>
      </div>
    </aside>
  )
}
