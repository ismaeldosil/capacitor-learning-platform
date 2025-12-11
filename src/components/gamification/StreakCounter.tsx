import { Flame, AlertTriangle } from 'lucide-react'

interface StreakCounterProps {
  streak: number
  isAtRisk?: boolean
  showBonus?: boolean
  bonusXP?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'compact'
}

const sizeStyles = {
  sm: {
    container: 'gap-1.5',
    icon: 'h-4 w-4',
    text: 'text-sm',
    badge: 'text-xs px-1.5 py-0.5',
  },
  md: {
    container: 'gap-2',
    icon: 'h-5 w-5',
    text: 'text-base',
    badge: 'text-xs px-2 py-0.5',
  },
  lg: {
    container: 'gap-3',
    icon: 'h-7 w-7',
    text: 'text-xl',
    badge: 'text-sm px-2.5 py-1',
  },
}

export function StreakCounter({
  streak,
  isAtRisk = false,
  showBonus = true,
  bonusXP = 0,
  size = 'md',
  variant = 'default',
}: StreakCounterProps) {
  const styles = sizeStyles[size]
  const isActive = streak > 0

  if (variant === 'compact') {
    return (
      <div className={`flex items-center ${styles.container}`}>
        <Flame
          className={`${styles.icon} ${
            isActive ? 'text-orange-500 animate-pulse' : 'text-gray-500'
          }`}
        />
        <span className={`font-medium ${styles.text}`}>{streak}</span>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center ${styles.container} ${
        isAtRisk ? 'animate-pulse' : ''
      }`}
    >
      {/* Fire Icon with Animation */}
      <div className="relative">
        <Flame
          className={`${styles.icon} transition-all duration-300 ${
            isActive
              ? streak >= 7
                ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                : streak >= 3
                ? 'text-orange-500 drop-shadow-[0_0_6px_rgba(249,115,22,0.5)]'
                : 'text-orange-400'
              : 'text-gray-500'
          } ${isActive ? 'animate-bounce-subtle' : ''}`}
        />
        {isActive && streak >= 3 && (
          <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
        )}
      </div>

      {/* Streak Count */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-bold ${styles.text}`}>{streak}</span>
          <span className={`text-gray-400 ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
            {streak === 1 ? 'día' : 'días'}
          </span>
        </div>

        {/* Risk Warning */}
        {isAtRisk && (
          <div className="flex items-center gap-1 text-warning-500">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs">¡No pierdas tu racha!</span>
          </div>
        )}
      </div>

      {/* Bonus Badge */}
      {showBonus && bonusXP > 0 && (
        <span
          className={`${styles.badge} rounded-full bg-orange-500/20 text-orange-400 font-medium`}
        >
          +{bonusXP} XP
        </span>
      )}
    </div>
  )
}
