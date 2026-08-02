import { Search } from 'lucide-react'

export default function Hero({ query, onQueryChange }) {
  return (
    <section className="relative overflow-hidden bg-pine-700">
      {/* Signature motif: topographic contour lines, echoing the elevation-gain
          data that defines every trail card below. */}
      <div
        className="absolute inset-0 bg-contours bg-cover bg-center opacity-60"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-900/80 via-pine-800/40 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-tan-300">
          50 states · countless summits
        </p>
        <h1 className="mt-4 font-display text-4xl text-summit sm:text-6xl">
          Find your next trailhead
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-tan-100/90 sm:text-lg">
          Search, save, and track hikes across America's national parks — then watch your
          bucket list turn into miles and elevation earned.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-summit p-2 shadow-card-hover">
          <Search size={18} className="ml-2 shrink-0 text-pine-700/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by trail, park, or state…"
            className="w-full bg-transparent px-1 py-2 text-ink outline-none placeholder:text-pine-700/40"
          />
        </div>
      </div>
    </section>
  )
}
