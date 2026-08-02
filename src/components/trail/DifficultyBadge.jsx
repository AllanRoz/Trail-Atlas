import { cn } from '../../utils/cn'

const styles = {
  Easy: 'bg-moss-400/15 text-moss-600 dark:text-moss-400',
  Moderate: 'bg-tan-500/20 text-tan-500 dark:text-tan-300',
  Hard: 'bg-clay/15 text-clay-600 dark:text-clay',
}

export default function DifficultyBadge({ difficulty }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        styles[difficulty],
      )}
    >
      {difficulty}
    </span>
  )
}
