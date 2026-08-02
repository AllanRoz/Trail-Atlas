import { NavLink } from 'react-router-dom'
import { Mountain, Moon, Sun, Bookmark, CheckCircle2, LayoutDashboard } from 'lucide-react'
import { cn } from '../../utils/cn'

const links = [
  { to: '/', label: 'Explore', icon: Mountain, end: true },
  { to: '/bucket-list', label: 'Bucket List', icon: Bookmark },
  { to: '/completed', label: 'Completed', icon: CheckCircle2 },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export default function Navbar({ isDark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-50 border-b border-pine-100 bg-summit/90 backdrop-blur dark:border-pine-500/30 dark:bg-pine-900/90">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl text-pine-700 dark:text-tan-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine-700 text-tan-300 dark:bg-tan-300 dark:text-pine-900">
            <Mountain size={18} strokeWidth={2.5} />
          </span>
          Trail Atlas
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-pine-700 text-tan-100 dark:bg-tan-300 dark:text-pine-900'
                    : 'text-pine-700/80 hover:bg-pine-50 dark:text-tan-100/80 dark:hover:bg-pine-700/50',
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={onToggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-10 w-10 items-center justify-center rounded-full text-pine-700 transition-colors hover:bg-pine-50 dark:text-tan-100 dark:hover:bg-pine-700/50"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* Mobile nav — bottom-fixed so it stays reachable one-handed */}
      <div className="flex items-center justify-around border-t border-pine-100 py-2 dark:border-pine-500/30 md:hidden">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium',
                isActive ? 'text-pine-700 dark:text-tan-300' : 'text-pine-700/50 dark:text-tan-100/50',
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
