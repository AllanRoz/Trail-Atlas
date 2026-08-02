import { useEffect, useState } from 'react'

/**
 * Persists state to localStorage under `key`. Used later by the Bucket
 * List and Completed Hikes features (Milestone: Bucket List / Completed).
 * Kept minimal here — no cross-tab sync yet, since Trail Atlas is single-user
 * and single-tab by design (no backend, no auth).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage can throw in private-browsing/quota-exceeded cases;
      // failing silently is preferable to crashing the app over persistence.
    }
  }, [key, value])

  return [value, setValue]
}
