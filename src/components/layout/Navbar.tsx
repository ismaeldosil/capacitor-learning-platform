import { useUser } from '../../contexts/UserContext'
import { useTranslation } from 'react-i18next'
import { Flame, Zap, Search, Command, Code } from 'lucide-react'
import { LanguageSwitcher } from '../common/LanguageSwitcher'
import { CapacitorLogo } from '../common/CapacitorLogo'
import { Icon } from '../common/Icon'

interface NavbarProps {
  onSearchClick?: () => void
}

export function Navbar({ onSearchClick }: NavbarProps) {
  const { user, currentLevel, xpProgress, nextLevel, devMode } = useUser()
  const { t } = useTranslation(['gamification', 'search'])

  return (
    <header className="sticky top-0 z-10 border-b border-gray-700 bg-gray-800/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
            <CapacitorLogo size={24} className="text-white" />
          </div>
          <span className="hidden text-lg font-bold sm:block">
            Capacitor Learning
          </span>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/50 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-700 transition-colors"
          aria-label={t('search:searchConcepts')}
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">{t('search:searchConcepts')}</span>
          <kbd className="hidden lg:flex items-center gap-0.5 ml-2 px-1.5 py-0.5 text-xs bg-gray-800 rounded border border-gray-600">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>

        {/* Stats */}
        <div className="flex items-center gap-6">
          {/* Mobile Search Button */}
          <button
            onClick={onSearchClick}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label={t('search:searchConcepts')}
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Dev Mode Badge */}
          {devMode && (
            <div className="flex items-center gap-1 rounded-full bg-purple-600/20 px-2 py-1 text-xs font-medium text-purple-400">
              <Code className="h-3 w-3" />
              DEV
            </div>
          )}

          {/* Streak */}
          <div className="flex items-center gap-2">
            <Flame
              className={`h-5 w-5 ${
                user.streak > 0 ? 'text-orange-500' : 'text-gray-500'
              }`}
            />
            <span className="font-medium">{user.streak}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">{user.xp} XP</span>
          </div>

          {/* Level Badge */}
          <div className="flex items-center gap-2 rounded-full bg-gray-700 px-3 py-1">
            <Icon name={currentLevel.icon} className={`h-5 w-5 ${currentLevel.color}`} />
            <span className={`font-medium ${currentLevel.color}`}>
              Lvl {currentLevel.level}
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="hidden w-32 lg:block">
            <div className="h-2 overflow-hidden rounded-full bg-gray-700">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            {nextLevel && (
              <p className="mt-1 text-xs text-gray-400">
                {t('gamification:xpToNext', { xp: nextLevel.minXP - user.xp, level: nextLevel.name })}
              </p>
            )}
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
