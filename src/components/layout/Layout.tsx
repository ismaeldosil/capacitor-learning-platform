import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { LevelUpPopup } from '../gamification/LevelUpPopup'
import { useUser } from '../../contexts/UserContext'

export function Layout() {
  const { pathname } = useLocation()
  const { levelUpNotification, clearLevelUpNotification } = useUser()

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Level Up Notification */}
      <LevelUpPopup
        level={levelUpNotification}
        onClose={clearLevelUpNotification}
      />
    </div>
  )
}
