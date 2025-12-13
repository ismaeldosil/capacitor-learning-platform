import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  Lock,
  CheckCircle,
  Circle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useUser } from '../../contexts/UserContext'
import { MODULES } from '../../data/constants'
import { getModuleStatus } from '../../utils'
import { Icon } from '../common/Icon'

export function Sidebar() {
  const { user } = useUser()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`hidden flex-shrink-0 border-r border-gray-700 bg-gray-800 transition-all duration-300 ease-in-out lg:block ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      aria-label="Navegación principal"
    >
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2" aria-label="Menú de módulos">
          {/* Dashboard Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            title="Dashboard"
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Dashboard</span>}
          </NavLink>

          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 flex-shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">Colapsar</span>
              </>
            )}
          </button>

          {/* Modules Section */}
          <div className="pt-4">
            {!isCollapsed && (
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Módulos
              </h3>
            )}
            <div className="space-y-1">
              {MODULES.map((module, index) => {
                const status = getModuleStatus(
                  module.id,
                  user.xp,
                  user.completedLessons,
                  user.completedQuizzes
                )
                const isLocked = status === 'locked'

                // Get status icon
                const StatusIcon = () => {
                  if (status === 'locked')
                    return <Lock className="h-4 w-4 flex-shrink-0 text-gray-500" />
                  if (status === 'completed')
                    return (
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                    )
                  if (status === 'in_progress')
                    return (
                      <Circle className="h-4 w-4 flex-shrink-0 text-yellow-500" />
                    )
                  return null
                }

                return (
                  <NavLink
                    key={module.id}
                    to={isLocked ? '#' : `/module/${module.id}`}
                    onClick={(e) => isLocked && e.preventDefault()}
                    className={({ isActive }) =>
                      `flex items-center rounded-lg px-3 py-2 transition-colors ${
                        isCollapsed ? 'justify-center' : 'gap-2'
                      } ${
                        isLocked
                          ? 'cursor-not-allowed text-gray-500'
                          : isActive
                            ? 'bg-primary-600/20 text-primary-400'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                    title={isCollapsed ? module.title : undefined}
                  >
                    {isCollapsed ? (
                      // Collapsed: show number or status icon
                      <div className="relative">
                        <span className="text-xs font-bold">{index + 1}</span>
                        {status === 'completed' && (
                          <CheckCircle className="absolute -right-1 -top-1 h-3 w-3 text-green-500" />
                        )}
                      </div>
                    ) : (
                      // Expanded: show icon, title, and status
                      <>
                        <Icon
                          name={module.icon}
                          className="h-5 w-5 flex-shrink-0 text-primary-400"
                        />
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {module.title}
                        </span>
                        <StatusIcon />
                      </>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="border-t border-gray-700 p-4">
            <div className="text-center text-xs text-gray-500">
              <p>Capacitor Learning</p>
              <p className="mt-1">v0.7.0</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
