import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, CheckCircle2, Route, Mountain as ElevationIcon, Percent } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { trails } from '../data/trails'
import { useTrailLists } from '../hooks/useTrailLists'

const DIFFICULTY_COLORS = { Easy: '#4B7455', Moderate: '#B9A374', Hard: '#B5562A' }

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card dark:bg-pine-700/40">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-500/15 text-moss-600 dark:text-moss-400">
        <Icon size={18} />
      </span>
      <div>
        <p className="font-mono text-xl font-semibold text-pine-700 dark:text-tan-100">{value}</p>
        <p className="text-xs text-pine-700/50 dark:text-tan-100/50">{label}</p>
      </div>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card dark:bg-pine-700/40">
      <h3 className="mb-4 font-display text-base text-pine-700 dark:text-tan-100">{title}</h3>
      <div className="h-64 w-full">{children}</div>
    </div>
  )
}

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' })

export default function Dashboard() {
  const { saved, completed } = useTrailLists()

  const completedTrails = useMemo(
    () => completed.map((c) => ({ ...trails.find((t) => t.id === c.id), completedAt: c.completedAt })).filter((t) => t.id),
    [completed],
  )

  const totalMiles = completedTrails.reduce((sum, t) => sum + t.distance, 0)
  const totalElevation = completedTrails.reduce((sum, t) => sum + t.elevationGain, 0)
  const targetCount = saved.length + completedTrails.length
  const completionPct = targetCount ? Math.round((completedTrails.length / targetCount) * 100) : 0

  const byDifficulty = useMemo(() => {
    const counts = { Easy: 0, Moderate: 0, Hard: 0 }
    completedTrails.forEach((t) => { counts[t.difficulty] = (counts[t.difficulty] || 0) + 1 })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [completedTrails])

  const byMonth = useMemo(() => {
    const buckets = {}
    completedTrails
      .slice()
      .sort((a, b) => a.completedAt - b.completedAt)
      .forEach((t) => {
        const key = monthFormatter.format(new Date(t.completedAt))
        buckets[key] = (buckets[key] || 0) + 1
      })
    return Object.entries(buckets).map(([month, count]) => ({ month, count }))
  }, [completedTrails])

  const distanceOverTime = useMemo(() => {
    let running = 0
    return completedTrails
      .slice()
      .sort((a, b) => a.completedAt - b.completedAt)
      .map((t) => {
        running += t.distance
        return { date: monthFormatter.format(new Date(t.completedAt)), miles: Number(running.toFixed(1)) }
      })
  }, [completedTrails])

  const hasData = completedTrails.length > 0

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <h1 className="font-display text-3xl text-pine-700 dark:text-tan-100">Dashboard</h1>
      <p className="mt-1 text-sm text-pine-700/60 dark:text-tan-100/60">Your hiking progress at a glance.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard icon={Bookmark} label="Bucket List" value={saved.length} />
        <StatCard icon={CheckCircle2} label="Completed" value={completedTrails.length} />
        <StatCard icon={Percent} label="Completion" value={`${completionPct}%`} />
        <StatCard icon={Route} label="Miles Hiked" value={totalMiles.toFixed(1)} />
        <StatCard icon={ElevationIcon} label="Elevation (ft)" value={totalElevation.toLocaleString()} />
      </div>

      {!hasData ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-pine-100 py-20 text-center dark:border-pine-500/30">
          <p className="font-display text-lg text-pine-700 dark:text-tan-100">No completed hikes yet</p>
          <p className="text-sm text-pine-700/50 dark:text-tan-100/50">
            Charts fill in as you mark trails complete from Explore.
          </p>
          <Link
            to="/"
            className="rounded-full bg-pine-700 px-5 py-2 text-sm font-medium text-tan-100 transition-colors hover:bg-pine-500 dark:bg-tan-300 dark:text-pine-900"
          >
            Browse trails
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ChartCard title="Hikes by Difficulty">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byDifficulty} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {byDifficulty.map((entry) => (
                    <Cell key={entry.name} fill={DIFFICULTY_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Monthly Completed Hikes">
            <ResponsiveContainer>
              <BarChart data={byMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F3A2E" strokeOpacity={0.08} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#4B7455" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Cumulative Distance Over Time">
            <ResponsiveContainer>
              <LineChart data={distanceOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F3A2E" strokeOpacity={0.08} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="miles" stroke="#B5562A" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  )
}
