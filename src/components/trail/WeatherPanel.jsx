import { useEffect, useState } from 'react'
import { Wind, Loader2, CloudOff, Sunrise, Sunset } from 'lucide-react'
import { weatherFromCode } from '../../utils/weatherCodes'

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })

// Open-Meteo requires no API key and allows browser-side CORS requests,
// which is why it's the one live network call in an otherwise fully static
// app — it doesn't compromise "no backend, no paid APIs."
export default function WeatherPanel({ lat, lng }) {
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', data: null })

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=7`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Weather request failed')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', data: null })
      })

    return () => {
      cancelled = true
    }
  }, [lat, lng])

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-10 text-sm text-pine-700/50 shadow-card dark:bg-pine-700/40 dark:text-tan-100/50">
        <Loader2 size={16} className="animate-spin" />
        Loading trailhead weather…
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-10 text-sm text-pine-700/50 shadow-card dark:bg-pine-700/40 dark:text-tan-100/50">
        <CloudOff size={16} />
        Weather is unavailable right now — try again later.
      </div>
    )
  }

  const { current, daily } = state.data
  const currentWeather = weatherFromCode(current.weather_code)
  const CurrentIcon = currentWeather.icon
  const sunrise = daily.sunrise?.[0] ? timeFormatter.format(new Date(daily.sunrise[0])) : null
  const sunset = daily.sunset?.[0] ? timeFormatter.format(new Date(daily.sunset[0])) : null

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card dark:bg-pine-700/40">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pine-100 pb-5 dark:border-pine-500/20">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky-600 dark:text-sky">
            <CurrentIcon size={28} />
          </span>
          <div>
            <p className="font-mono text-3xl font-semibold text-pine-700 dark:text-tan-100">
              {Math.round(current.temperature_2m)}°F
            </p>
            <p className="text-sm text-pine-700/60 dark:text-tan-100/60">{currentWeather.label} at the trailhead</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-pine-700/45 dark:text-tan-100/45">
              <Wind size={12} /> {Math.round(current.wind_speed_10m)} mph wind
            </p>
          </div>
        </div>

        {(sunrise || sunset) && (
          <div className="flex gap-5">
            {sunrise && (
              <div className="flex flex-col items-center gap-1">
                <Sunrise size={20} className="text-tan-500" />
                <p className="font-mono text-sm text-pine-700 dark:text-tan-100">{sunrise}</p>
                <p className="text-[10px] uppercase tracking-wide text-pine-700/40 dark:text-tan-100/40">Sunrise</p>
              </div>
            )}
            {sunset && (
              <div className="flex flex-col items-center gap-1">
                <Sunset size={20} className="text-clay" />
                <p className="font-mono text-sm text-pine-700 dark:text-tan-100">{sunset}</p>
                <p className="text-[10px] uppercase tracking-wide text-pine-700/40 dark:text-tan-100/40">Sunset</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {daily.time.map((date, i) => {
          const day = weatherFromCode(daily.weather_code[i])
          const DayIcon = day.icon
          return (
            <div key={date} className="flex flex-col items-center gap-1 rounded-xl p-2 text-center">
              <p className="text-xs font-medium text-pine-700/60 dark:text-tan-100/60">
                {i === 0 ? 'Today' : dayFormatter.format(new Date(date))}
              </p>
              <DayIcon size={20} className="text-moss-600 dark:text-moss-400" />
              <p className="font-mono text-xs text-pine-700 dark:text-tan-100">
                {Math.round(daily.temperature_2m_max[i])}°
              </p>
              <p className="font-mono text-xs text-pine-700/40 dark:text-tan-100/40">
                {Math.round(daily.temperature_2m_min[i])}°
              </p>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-[11px] text-pine-700/35 dark:text-tan-100/35">Weather data from Open-Meteo.</p>
    </div>
  )
}
