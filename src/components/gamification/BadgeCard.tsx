import { Lock } from 'lucide-react'
import type { Badge } from '../../data/types'
import { Icon } from '../common/Icon'

interface BadgeCardProps {
  badge: Badge
  isUnlocked: boolean
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
  onClick?: () => void
}

const sizeStyles = {
  sm: {
    container: 'w-16 h-16',
    icon: 'h-6 w-6',
    lock: 'h-4 w-4',
  },
  md: {
    container: 'w-20 h-20',
    icon: 'h-8 w-8',
    lock: 'h-5 w-5',
  },
  lg: {
    container: 'w-24 h-24',
    icon: 'h-10 w-10',
    lock: 'h-6 w-6',
  },
}

export function BadgeCard({
  badge,
  isUnlocked,
  size = 'md',
  showDetails = false,
  onClick,
}: BadgeCardProps) {
  const styles = sizeStyles[size]

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`
        group flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300
        ${onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
        ${isUnlocked ? 'hover:bg-gray-700/50' : ''}
      `}
    >
      {/* Badge Icon */}
      <div
        className={`
          ${styles.container} rounded-xl flex items-center justify-center
          transition-all duration-300 relative
          ${
            isUnlocked
              ? 'bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30'
              : 'bg-gray-800 border border-gray-700 grayscale opacity-50'
          }
          ${isUnlocked ? 'group-hover:shadow-lg group-hover:shadow-primary-500/20' : ''}
        `}
      >
        {isUnlocked ? (
          <Icon
            name={badge.icon}
            className={`${styles.icon} text-primary-400 ${isUnlocked ? 'animate-bounce-subtle' : ''}`}
          />
        ) : (
          <Lock className={`${styles.lock} text-gray-500`} />
        )}

        {/* XP Bonus indicator */}
        {isUnlocked && badge.xpBonus > 0 && (
          <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
            +{badge.xpBonus}
          </div>
        )}
      </div>

      {/* Badge Name */}
      {showDetails && (
        <div className="text-center">
          <p
            className={`text-sm font-medium truncate max-w-[100px] ${
              isUnlocked ? 'text-white' : 'text-gray-500'
            }`}
          >
            {badge.name}
          </p>
          {isUnlocked && (
            <p className="text-xs text-gray-400 truncate max-w-[100px]">
              {badge.description}
            </p>
          )}
        </div>
      )}
    </button>
  )
}
