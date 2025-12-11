import { Link } from 'react-router-dom'
import { Lock, CheckCircle, ChevronRight, Clock, BookOpen } from 'lucide-react'
import type { ModuleStatus } from '../../data/types'

interface ModuleCardProps {
  id: string
  title: string
  description: string
  icon: string
  status: ModuleStatus
  progress: number
  lessonsCompleted: number
  totalLessons: number
  estimatedTime?: string
  requiredXP?: number
  userXP?: number
}

export function ModuleCard({
  id,
  title,
  description,
  icon,
  status,
  progress,
  lessonsCompleted,
  totalLessons,
  estimatedTime,
  requiredXP = 0,
  userXP = 0,
}: ModuleCardProps) {
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isInProgress = status === 'in_progress'

  const content = (
    <div
      className={`
        group relative overflow-hidden rounded-xl border bg-gray-800 p-6 transition-all duration-300
        ${
          isLocked
            ? 'border-gray-700 opacity-60 cursor-not-allowed'
            : isCompleted
            ? 'border-green-500/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10'
            : 'border-gray-700 hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10'
        }
      `}
    >
      {/* Background gradient on hover */}
      {!isLocked && (
        <div
          className={`
            absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100
            ${isCompleted ? 'bg-gradient-to-br from-green-500/5 to-transparent' : 'bg-gradient-to-br from-primary-500/5 to-transparent'}
          `}
        />
      )}

      {/* Status Badge */}
      <div className="absolute right-4 top-4">
        {isLocked && <Lock className="h-5 w-5 text-gray-500" />}
        {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
        {isInProgress && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
        )}
      </div>

      {/* Header */}
      <div className="relative flex items-start gap-4">
        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-xl text-3xl transition-transform duration-300
            ${isLocked ? 'bg-gray-700' : 'bg-gray-700 group-hover:scale-110'}
          `}
        >
          {icon}
        </div>
        <div className="flex-1 pr-8">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Meta info */}
      <div className="relative mt-4 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>{totalLessons} lecciones</span>
        </div>
        {estimatedTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">
            {lessonsCompleted}/{totalLessons} completadas
          </span>
          <span className={isCompleted ? 'text-green-500' : 'text-gray-400'}>
            {progress}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              isCompleted
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-primary-500 to-accent-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Locked Message */}
      {isLocked && requiredXP > 0 && (
        <p className="relative mt-4 text-sm text-gray-500 flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Necesitas {requiredXP - userXP} XP más para desbloquear
        </p>
      )}

      {/* Action Button */}
      {!isLocked && (
        <div className="relative mt-4 flex items-center justify-end text-primary-400 group-hover:text-primary-300">
          <span className="text-sm font-medium">
            {isCompleted ? 'Revisar' : isInProgress ? 'Continuar' : 'Comenzar'}
          </span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  )

  if (isLocked) {
    return content
  }

  return <Link to={`/module/${id}`}>{content}</Link>
}
