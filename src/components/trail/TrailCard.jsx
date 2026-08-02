import { Link } from 'react-router-dom'
import { Bookmark, CheckCircle2, MapPin, Mountain as ElevationIcon, Star, Clock } from 'lucide-react'
import DifficultyBadge from './DifficultyBadge'
import { cn } from '../../utils/cn'

export default function TrailCard({ trail, isSaved, isCompleted, onToggleSave, onToggleComplete }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover dark:bg-pine-700/40">
      <div className="relative h-48 overflow-hidden">
        <img
          src={trail.thumbnail}
          alt={`${trail.name} trail`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <DifficultyBadge difficulty={trail.difficulty} />
        </div>
        <button
          type="button"
          onClick={() => onToggleSave(trail.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? 'Remove from bucket list' : 'Add to bucket list'}
          className={cn(
            'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors',
            isSaved ? 'bg-tan-300 text-pine-900' : 'bg-pine-900/40 text-summit hover:bg-pine-900/60',
          )}
        >
          <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight text-pine-700 dark:text-tan-100">
            {trail.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 font-mono text-sm text-pine-700 dark:text-tan-100">
            <Star size={14} className="fill-tan-500 text-tan-500" />
            {trail.rating}
          </span>
        </div>

        <p className="mt-1 flex items-center gap-1 text-sm text-pine-700/60 dark:text-tan-100/60">
          <MapPin size={13} />
          {trail.nationalPark}, {trail.state}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-pine-100 pt-3 font-mono text-xs text-pine-700/80 dark:border-pine-500/20 dark:text-tan-100/70">
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-pine-700/40 dark:text-tan-100/40">Distance</dt>
            <dd className="mt-0.5">{trail.distance} mi</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-pine-700/40 dark:text-tan-100/40">
              <ElevationIcon size={10} /> Gain
            </dt>
            <dd className="mt-0.5">{trail.elevationGain} ft</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-pine-700/40 dark:text-tan-100/40">
              <Clock size={10} /> Time
            </dt>
            <dd className="mt-0.5">{trail.estimatedTime}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            to={`/trails/${trail.id}`}
            className="flex-1 rounded-full bg-pine-700 px-4 py-2 text-center text-sm font-medium text-tan-100 transition-colors hover:bg-pine-500 dark:bg-tan-300 dark:text-pine-900 dark:hover:bg-tan-500"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={() => onToggleComplete(trail.id)}
            aria-pressed={isCompleted}
            aria-label={isCompleted ? 'Marked completed' : 'Mark as completed'}
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
              isCompleted
                ? 'border-moss-500 bg-moss-500/15 text-moss-600 dark:text-moss-400'
                : 'border-pine-100 text-pine-700/50 hover:border-moss-500 hover:text-moss-600 dark:border-pine-500/30 dark:text-tan-100/50',
            )}
          >
            <CheckCircle2 size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}
