import { useParams, Link } from 'react-router-dom'
import { trails } from '../data/trails'

// Full detail layout (gallery, description, parking info, map, etc.) is
// its own milestone. This stub confirms routing works end-to-end and gives
// the Home page's "View Details" links somewhere real to go.
export default function TrailDetail() {
  const { id } = useParams()
  const trail = trails.find((t) => t.id === id)

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link to="/" className="text-sm text-moss-600 underline">
        ← Back to Explore
      </Link>
      <h1 className="mt-4 font-display text-3xl text-pine-700 dark:text-tan-100">{trail.name}</h1>
      <p className="mt-1 text-pine-700/60 dark:text-tan-100/60">
        {trail.nationalPark}, {trail.state}
      </p>
      <p className="mt-6 rounded-2xl border border-dashed border-pine-100 p-6 text-sm text-pine-700/50 dark:border-pine-500/30 dark:text-tan-100/50">
        Full trail detail page (hero image, description, gallery, parking info, interactive map) lands in
        the next milestone.
      </p>
    </div>
  )
}
