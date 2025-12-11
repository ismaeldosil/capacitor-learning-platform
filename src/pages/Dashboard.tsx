import { useUser } from '../contexts/UserContext'
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
import { AdBanner } from '../components/ads'

export function Dashboard() {
  const { user, currentLevel } = useUser()

  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0)
  const progressPercent = Math.round(
    (user.completedLessons.length / totalLessons) * 100
  )

  return (
    <div className="mx-auto max-w-6xl animate-in">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          ¡Bienvenido, {user.name}! {currentLevel.icon}
        </h1>
        <p className="mt-2 text-gray-400">
          Continúa tu camino para convertirte en un experto de Capacitor
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Zap className="h-6 w-6 text-yellow-500" />}
          label="XP Total"
          value={user.xp.toString()}
        />
        <StatCard
          icon={<Trophy className="h-6 w-6 text-purple-500" />}
          label="Nivel"
          value={currentLevel.name}
        />
        <StatCard
          icon={<Flame className="h-6 w-6 text-orange-500" />}
          label="Racha"
          value={`${user.streak} días`}
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          label="Progreso"
          value={`${progressPercent}%`}
        />
      </div>

      {/* Overall Progress */}
      <div className="card mb-8">
        <h2 className="mb-4 text-lg font-semibold">Progreso General</h2>
        <div className="h-4 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-400">
          {user.completedLessons.length} de {totalLessons} lecciones completadas
        </p>
      </div>

      {/* Modules Grid */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Módulos del Curso</h2>
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
                title={module.title}
                description={module.description}
                icon={module.icon}
                status={status}
                progress={progress}
                lessonsCompleted={lessonsCompleted}
                totalLessons={module.lessons.length}
                requiredXP={module.requiredXP}
                userXP={user.xp}
              />
            )
          })}
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner
        slot="dashboard-footer"
        format="horizontal"
        className="mb-8"
      />

      {/* Badges Section */}
      <div className="card">
        <h2 className="mb-4 text-lg font-semibold">
          Logros ({user.badges.length}/8)
        </h2>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {[
            { id: 'first-launch', icon: '🎯', name: 'First Launch' },
            { id: 'speed-runner', icon: '⚡', name: 'Speed Runner' },
            { id: 'perfect-score', icon: '💯', name: 'Perfect Score' },
            { id: 'on-fire', icon: '🔥', name: 'On Fire' },
            { id: 'module-master', icon: '🎓', name: 'Module Master' },
            { id: 'capacitor-king', icon: '👑', name: 'Capacitor King' },
            { id: 'quiz-genius', icon: '🧠', name: 'Quiz Genius' },
            { id: 'gamer', icon: '🎮', name: 'Gamer' },
          ].map((badge) => {
            const isUnlocked = user.badges.includes(badge.id)
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 ${
                  isUnlocked ? '' : 'opacity-30 grayscale'
                }`}
                title={badge.name}
              >
                <span className="text-3xl">{badge.icon}</span>
                <span className="text-xs text-gray-400 truncate max-w-full">
                  {badge.name}
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
            {lessonsCompleted}/{totalLessons} lecciones
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
          Necesitas {requiredXP - userXP} XP más para desbloquear
        </p>
      )}

      {/* Action */}
      {!isLocked && (
        <div className="mt-4 flex items-center justify-end text-primary-400">
          <span className="text-sm font-medium">
            {isCompleted ? 'Revisar' : 'Continuar'}
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
