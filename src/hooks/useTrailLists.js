import { useLocalStorage } from './useLocalStorage'

// Single source of truth for "saved" and "completed" trail state. Every page
// that needs this (Home, Bucket List, Completed, Dashboard) calls this hook
// instead of keeping its own local state — since each is backed by the same
// localStorage key, navigating between pages always reflects the latest
// toggles instead of showing stale/empty stub data.
//
// Schema:
//   saved:     [{ id, addedAt }]                      — addedAt powers "sort by date added"
//   completed: [{ id, completedAt, rating, notes, favorite }] — rating/notes/favorite
//              are wired up fully in the Completed Hikes milestone; placeholders for now
//              so we don't need a migration later.
export function useTrailLists() {
  const [saved, setSaved] = useLocalStorage('trail-atlas:bucket-list', [])
  const [completed, setCompleted] = useLocalStorage('trail-atlas:completed', [])

  const isSaved = (id) => saved.some((s) => s.id === id)
  const isCompleted = (id) => completed.some((c) => c.id === id)

  const toggleSaved = (id) => {
    setSaved((prev) => (prev.some((s) => s.id === id) ? prev.filter((s) => s.id !== id) : [...prev, { id, addedAt: Date.now() }]))
  }

  const toggleCompleted = (id) => {
    setCompleted((prev) =>
      prev.some((c) => c.id === id)
        ? prev.filter((c) => c.id !== id)
        : [...prev, { id, completedAt: Date.now(), rating: null, notes: '', favorite: false }],
    )
  }

  return { saved, completed, isSaved, isCompleted, toggleSaved, toggleCompleted, setSaved, setCompleted }
}
