// Full Bucket List page (sort by difficulty/distance/state/date-added,
// remove trails, etc.) is its own milestone. Stub keeps routing/nav complete.
export default function BucketList() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-3xl text-pine-700 dark:text-tan-100">Bucket List</h1>
      <p className="mt-3 text-pine-700/60 dark:text-tan-100/60">
        Your saved trails will live here — built out in the Bucket List milestone.
      </p>
    </div>
  )
}
