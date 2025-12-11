import { type ReactNode } from 'react'
import { Trophy, Flame, Zap, BookOpen, Target, Award } from 'lucide-react'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string | number
  subValue?: string
  color?: string
  trend?: 'up' | 'down' | 'neutral'
}

function StatCard({ icon, label, value, subValue, color = 'text-gray-400' }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-700 bg-gray-800 p-4 transition-all hover:border-gray-600">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
      </div>
    </div>
  )
}

interface StatsPanelProps {
  xp: number
  level: number
  levelName: string
  streak: number
  completedLessons: number
  totalLessons: number
  completedQuizzes: number
  badges: number
  totalBadges: number
  layout?: 'grid' | 'row'
}

export function StatsPanel({
  xp,
  level,
  levelName,
  streak,
  completedLessons,
  totalLessons,
  completedQuizzes,
  badges,
  totalBadges,
  layout = 'grid',
}: StatsPanelProps) {
  const progressPercent = Math.round((completedLessons / totalLessons) * 100)

  const stats: StatCardProps[] = [
    {
      icon: <Zap className="h-6 w-6" />,
      label: 'XP Total',
      value: xp.toLocaleString(),
      color: 'text-yellow-500',
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      label: 'Nivel',
      value: `Lvl ${level}`,
      subValue: levelName,
      color: 'text-purple-500',
    },
    {
      icon: <Flame className="h-6 w-6" />,
      label: 'Racha',
      value: `${streak} días`,
      color: streak > 0 ? 'text-orange-500' : 'text-gray-500',
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: 'Progreso',
      value: `${progressPercent}%`,
      subValue: `${completedLessons}/${totalLessons} lecciones`,
      color: 'text-blue-500',
    },
    {
      icon: <Target className="h-6 w-6" />,
      label: 'Quizzes',
      value: completedQuizzes,
      subValue: 'completados',
      color: 'text-green-500',
    },
    {
      icon: <Award className="h-6 w-6" />,
      label: 'Logros',
      value: `${badges}/${totalBadges}`,
      color: 'text-pink-500',
    },
  ]

  const gridClass =
    layout === 'grid'
      ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
      : 'flex flex-wrap gap-4'

  return (
    <div className={gridClass}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

// Compact version for smaller spaces
interface CompactStatsProps {
  xp: number
  streak: number
  progress: number
}

export function CompactStats({ xp, streak, progress }: CompactStatsProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-yellow-500" />
        <span className="font-medium">{xp}</span>
      </div>
      <div className="flex items-center gap-2">
        <Flame className={`h-4 w-4 ${streak > 0 ? 'text-orange-500' : 'text-gray-500'}`} />
        <span className="font-medium">{streak}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-primary-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-400">{progress}%</span>
      </div>
    </div>
  )
}
