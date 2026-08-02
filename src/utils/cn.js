import clsx from 'clsx'

// Thin wrapper so components can compose conditional class names without
// importing clsx everywhere directly — keeps a single swap point if we
// ever add tailwind-merge later.
export function cn(...args) {
  return clsx(...args)
}
