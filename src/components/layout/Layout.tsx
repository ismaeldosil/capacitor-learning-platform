import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { LevelUpPopup } from '../gamification/LevelUpPopup'
import { SearchModal } from '../common/SearchModal'
import { useUser } from '../../contexts/UserContext'
import { useSearchShortcut } from '../../hooks/useKeyboardShortcut'

export function Layout() {
  const { pathname } = useLocation()
  const { levelUpNotification, clearLevelUpNotification } = useUser()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Abrir búsqueda con Cmd+K
  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  useSearchShortcut(openSearch)

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar onSearchClick={openSearch} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Level Up Notification */}
      <LevelUpPopup
        level={levelUpNotification}
        onClose={clearLevelUpNotification}
      />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </div>
  )
}
