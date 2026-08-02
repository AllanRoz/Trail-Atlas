import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export default function Layout() {
  const [isDark, setIsDark] = useLocalStorage('trail-atlas:dark-mode', false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isDark={isDark} onToggleDark={() => setIsDark((prev) => !prev)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
