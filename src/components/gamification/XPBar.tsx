import { Zap, Trophy } from 'lucide-react'
import type { Level } from '../../data/types'
import { Icon } from '../common/Icon'

interface XPBarProps {
  currentXP: number
  currentLevel: Level
  nextLevel: Level | null
  xpProgress: number
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
}

const sizeStyles = {
  sm: {
    container: 'gap-2',
    bar: 'h-1.5',
    icon: 'h-4 w-4',
    text: 'text-xs',
  },
  md: {
    container: 'gap-3',
    bar: 'h-2',
    icon: 'h-5 w-5',
    text: 'text-sm',
  },
  lg: {
    container: 'gap-4',
    bar: 'h-3',
    icon: 'h-6 w-6',
    text: 'text-base',
  },
}

export function XPBar({
  currentXP,
  currentLevel,
  nextLevel,
  xpProgress,
  size = 'md',
  showDetails = true,
}: XPBarProps) {
  const styles = sizeStyles[size]
  const xpToNextLevel = nextLevel ? nextLevel.minXP - currentXP : 0

  return (
    <div className={`flex flex-col ${styles.container}`}>
      {/* Header */}
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center rounded-lg bg-gray-700 p-1.5 ${currentLevel.color}`}
            >
              <Icon name={currentLevel.icon} className="h-5 w-5" />
            </div>
            <div>
              <p className={`font-semibold ${styles.text}`}>{currentLevel.name}</p>
              <p className={`text-gray-400 ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
                Nivel {currentLevel.level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <Zap className={styles.icon} />
            <span className={`font-bold ${styles.text}`}>{currentXP} XP</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        <div className={`${styles.bar} overflow-hidden rounded-full bg-gray-700`}>
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 ease-out"
            style={{ width: `${xpProgress}%` }}
          />
        </div>

        {/* Progress indicator dot */}
        {xpProgress > 0 && xpProgress < 100 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-lg shadow-primary-500/50 transition-all duration-500"
            style={{ left: `calc(${xpProgress}% - 6px)` }}
          />
        )}
      </div>

      {/* Footer */}
      {showDetails && nextLevel && (
        <p className={`text-gray-400 ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          {xpToNextLevel} XP para {nextLevel.name}
        </p>
      )}

      {showDetails && !nextLevel && (
        <p className={`flex items-center gap-1 text-yellow-500 font-medium ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          <Trophy className="h-4 w-4" />
          Nivel maximo alcanzado
        </p>
      )}
    </div>
  )
}
