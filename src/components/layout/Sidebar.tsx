import { NavLink } from 'react-router-dom'
import { Home, Lock, CheckCircle, Circle } from 'lucide-react'
import { useUser } from '../../contexts/UserContext'
import { MODULES } from '../../data/constants'
import { getModuleStatus } from '../../utils'

const moduleIcons: Record<string, string> = {
  'module-1': '🚀',
  'module-2': '🔌',
  'module-3': '🔨',
  'module-4': '🏪',
}

export function Sidebar() {
  const { user } = useUser()

  return (
    <aside
      className="hidden w-64 flex-shrink-0 border-r border-gray-700 bg-gray-800 lg:block"
      aria-label="Navegación principal"
    >
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4" aria-label="Menú de módulos">
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
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          {/* Modules Section */}
          <div className="pt-6">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Módulos
            </h3>
            <div className="space-y-1">
              {MODULES.map((module) => {
                const status = getModuleStatus(
                  module.id,
                  user.xp,
                  user.completedLessons,
                  user.completedQuizzes
                )
                const isLocked = status === 'locked'

                return (
                  <NavLink
                    key={module.id}
                    to={isLocked ? '#' : `/module/${module.id}`}
                    onClick={(e) => isLocked && e.preventDefault()}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isLocked
                          ? 'cursor-not-allowed text-gray-500'
                          : isActive
                          ? 'bg-primary-600/20 text-primary-400'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                  >
                    <span className="text-lg">
                      {moduleIcons[module.id] || '📚'}
                    </span>
                    <span className="flex-1 truncate text-sm font-medium">
                      {module.title}
                    </span>
                    {status === 'locked' && (
                      <Lock className="h-4 w-4 text-gray-500" />
                    )}
                    {status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {status === 'in_progress' && (
                      <Circle className="h-4 w-4 text-yellow-500" />
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4">
          <div className="text-center text-xs text-gray-500">
            <p>Capacitor Learning Platform</p>
            <p className="mt-1">v0.1.0</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
