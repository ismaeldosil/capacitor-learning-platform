import { useUser } from '../../contexts/UserContext'
import { useTranslation } from 'react-i18next'
import { Flame, Zap } from 'lucide-react'
import { LanguageSwitcher } from '../common/LanguageSwitcher'
import { CapacitorLogo } from '../common/CapacitorLogo'
import { Icon } from '../common/Icon'

export function Navbar() {
  const { user, currentLevel, xpProgress, nextLevel } = useUser()
  const { t } = useTranslation('gamification')

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

        {/* Stats */}
        <div className="flex items-center gap-6">
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
          <div className="hidden w-32 md:block">
            <div className="h-2 overflow-hidden rounded-full bg-gray-700">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            {nextLevel && (
              <p className="mt-1 text-xs text-gray-400">
                {t('xpToNext', { xp: nextLevel.minXP - user.xp, level: nextLevel.name })}
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
