import type { Level } from '../../data/types'

interface LevelBadgeProps {
  level: Level
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  variant?: 'default' | 'minimal'
}

const sizeStyles = {
  sm: {
    container: 'px-2 py-1 gap-1',
    icon: 'text-base',
    text: 'text-xs',
  },
  md: {
    container: 'px-3 py-1.5 gap-1.5',
    icon: 'text-lg',
    text: 'text-sm',
  },
  lg: {
    container: 'px-4 py-2 gap-2',
    icon: 'text-2xl',
    text: 'text-base',
  },
}

export function LevelBadge({
  level,
  size = 'md',
  showName = false,
  variant = 'default',
}: LevelBadgeProps) {
  const styles = sizeStyles[size]

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center ${styles.container}`}>
        <span className={styles.icon}>{level.icon}</span>
        <span className={`font-semibold ${level.color} ${styles.text}`}>
          {level.level}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`
        inline-flex items-center rounded-full bg-gray-700/80 backdrop-blur
        ${styles.container}
      `}
    >
      <span className={styles.icon}>{level.icon}</span>
      <span className={`font-semibold ${level.color} ${styles.text}`}>
        Lvl {level.level}
      </span>
      {showName && (
        <span className={`text-gray-400 ${styles.text} hidden sm:inline`}>
          {level.name}
        </span>
      )}
    </div>
  )
}
