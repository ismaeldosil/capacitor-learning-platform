import { useUser } from '../contexts/UserContext'
import { useTranslation } from 'react-i18next'
import { MODULES } from '../data/constants'
import { Link } from 'react-router-dom'
import {
  Trophy,
  Flame,
  Zap,
  BookOpen,
  Lock,
  CheckCircle,
  ChevronRight,
} from 'lucide-react'
import type { ModuleStatus } from '../data/types'
import { getModuleStatus } from '../utils'

export function Dashboard() {
  const { user, currentLevel } = useUser()
  const { t } = useTranslation('dashboard')
  const { t: tGamification } = useTranslation('gamification')

  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0)
  const progressPercent = Math.round(
    (user.completedLessons.length / totalLessons) * 100
  )

  return (
    <div className="mx-auto max-w-6xl animate-in">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {t('welcome', { name: user.name })} {currentLevel.icon}
        </h1>
        <p className="mt-2 text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Zap className="h-6 w-6 text-yellow-500" />}
          label={t('stats.totalXP')}
          value={user.xp.toString()}
        />
        <StatCard
          icon={<Trophy className="h-6 w-6 text-purple-500" />}
          label={t('stats.level')}
          value={currentLevel.name}
        />
        <StatCard
          icon={<Flame className="h-6 w-6 text-orange-500" />}
          label={t('stats.streak')}
          value={`${user.streak} ${t('stats.streak').toLowerCase() === 'streak' ? 'days' : 'días'}`}
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          label={t('stats.progress')}
          value={`${progressPercent}%`}
        />
      </div>

      {/* Overall Progress */}
      <div className="card mb-8">
        <h2 className="mb-4 text-lg font-semibold">
          {t('overallProgress.title')}
        </h2>
        <div className="h-4 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-400">
          {t('overallProgress.lessonsCompleted', {
            completed: user.completedLessons.length,
            total: totalLessons,
          })}
        </p>
      </div>

      {/* Modules Grid */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">{t('modules.title')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODULES.map((module) => {
            const status = getModuleStatus(
              module.id,
              user.xp,
              user.completedLessons,
              user.completedQuizzes
            )
            const lessonsCompleted = module.lessons.filter((l) =>
              user.completedLessons.includes(l)
            ).length
            const progress = Math.round(
              (lessonsCompleted / module.lessons.length) * 100
            )

            return (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={tGamification(`modules.${module.id}.title`)}
                description={tGamification(`modules.${module.id}.description`)}
                icon={module.icon}
                status={status}
                progress={progress}
                lessonsCompleted={lessonsCompleted}
                totalLessons={module.lessons.length}
                requiredXP={module.requiredXP}
                userXP={user.xp}
                t={t}
              />
            )
          })}
        </div>
      </div>

      {/* Badges Section */}
      <div className="card">
        <h2 className="mb-4 text-lg font-semibold">
          {t('achievements.title', { count: user.badges.length, total: 8 })}
        </h2>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {[
            { id: 'first-launch', icon: '🎯' },
            { id: 'speed-runner', icon: '⚡' },
            { id: 'perfect-score', icon: '💯' },
            { id: 'on-fire', icon: '🔥' },
            { id: 'module-master', icon: '🎓' },
            { id: 'capacitor-king', icon: '👑' },
            { id: 'quiz-genius', icon: '🧠' },
            { id: 'gamer', icon: '🎮' },
          ].map((badge) => {
            const isUnlocked = user.badges.includes(badge.id)
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 ${
                  isUnlocked ? '' : 'opacity-30 grayscale'
                }`}
                title={tGamification(`badges.${badge.id}.name`)}
              >
                <span className="text-3xl">{badge.icon}</span>
                <span className="max-w-full truncate text-xs text-gray-400">
                  {tGamification(`badges.${badge.id}.name`)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="card flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}

// Module Card Component
function ModuleCard({
  id,
  title,
  description,
  icon,
  status,
  progress,
  lessonsCompleted,
  totalLessons,
  requiredXP,
  userXP,
  t,
}: {
  id: string
  title: string
  description: string
  icon: string
  status: ModuleStatus
  progress: number
  lessonsCompleted: number
  totalLessons: number
  requiredXP: number
  userXP: number
  t: (key: string, options?: Record<string, unknown>) => string
}) {
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'

  const content = (
    <div
      className={`card relative overflow-hidden transition-all ${
        isLocked
          ? 'opacity-60'
          : 'hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10'
      }`}
    >
      {/* Status Badge */}
      <div className="absolute right-4 top-4">
        {isLocked && <Lock className="h-5 w-5 text-gray-500" />}
        {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
      </div>

      {/* Content */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700 text-2xl">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">
            {t('modules.lessons', {
              completed: lessonsCompleted,
              total: totalLessons,
            })}
          </span>
          <span className="text-gray-400">{progress}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
          <div
            className={`h-full transition-all duration-300 ${
              isCompleted
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-primary-500 to-accent-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Locked Message */}
      {isLocked && (
        <p className="mt-3 text-sm text-gray-500">
          {t('modules.unlockMessage', { xp: requiredXP - userXP })}
        </p>
      )}

      {/* Action */}
      {!isLocked && (
        <div className="mt-4 flex items-center justify-end text-primary-400">
          <span className="text-sm font-medium">
            {isCompleted ? t('modules.review') : t('modules.continue')}
          </span>
          <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </div>
  )

  if (isLocked) {
    return content
  }

  return <Link to={`/module/${id}`}>{content}</Link>
}
