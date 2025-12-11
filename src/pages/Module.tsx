import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUser } from '../contexts/UserContext'
import { MODULES } from '../data/constants'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Circle,
  Play,
  Gamepad2,
  Clock,
} from 'lucide-react'
import { Icon } from '../components/common/Icon'

export function Module() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { user, isLessonCompleted, isQuizCompleted, isGameCompleted } =
    useUser()
  const { t } = useTranslation('module')
  const { t: tGamification } = useTranslation('gamification')

  const module = MODULES.find((m) => m.id === moduleId)

  if (!module) {
    return <Navigate to="/" replace />
  }

  // Check if module is locked
  if (user.xp < module.requiredXP) {
    return <Navigate to="/" replace />
  }

  const allLessonsCompleted = module.lessons.every((lessonId) =>
    isLessonCompleted(lessonId)
  )
  const quizDone = isQuizCompleted(module.quizId)
  const gameDone = isGameCompleted(module.gameId)

  return (
    <div className="mx-auto max-w-4xl animate-in">
      {/* Back Link */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t('backToDashboard')}</span>
      </Link>

      {/* Module Header */}
      <div className="card mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-700">
            <Icon name={module.icon} className="h-8 w-8 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {tGamification(`modules.${module.id}.title`)}
            </h1>
            <p className="mt-1 text-gray-400">
              {tGamification(`modules.${module.id}.description`)}
            </p>
            <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {tGamification(`modules.${module.id}.estimatedTime`)}
            </p>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="h-5 w-5" />
          {t('sections.lessons')}
        </h2>
        <div className="space-y-3">
          {module.lessons.map((lessonId, index) => {
            const completed = isLessonCompleted(lessonId)
            const lessonTitle = tGamification(`lessonTitles.${lessonId}`)

            return (
              <Link
                key={lessonId}
                to={`/lesson/${moduleId}/${lessonId}`}
                className="card flex items-center gap-4 transition-all hover:border-primary-500"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    completed ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                >
                  {completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{lessonTitle}</h3>
                  <p className="text-sm text-gray-400">+10 XP</p>
                </div>
                {completed ? (
                  <span className="text-sm text-green-500">
                    {t('lessonStatus.completed')}
                  </span>
                ) : (
                  <Play className="h-5 w-5 text-primary-400" />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quiz Section */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Circle className="h-5 w-5" />
          {t('sections.evaluation')}
        </h2>
        <Link
          to={allLessonsCompleted ? `/quiz/${moduleId}` : '#'}
          onClick={(e) => !allLessonsCompleted && e.preventDefault()}
          className={`card flex items-center gap-4 transition-all ${
            allLessonsCompleted
              ? 'hover:border-primary-500'
              : 'cursor-not-allowed opacity-60'
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              quizDone ? 'bg-green-600' : 'bg-purple-600'
            }`}
          >
            {quizDone ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <span className="font-medium">?</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{t('quiz.title')}</h3>
            <p className="text-sm text-gray-400">
              {allLessonsCompleted ? '+25-50 XP' : t('quiz.locked')}
            </p>
          </div>
          {quizDone && (
            <span className="text-sm text-green-500">
              {t('lessonStatus.completed')}
            </span>
          )}
        </Link>
      </div>

      {/* Game Section */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Gamepad2 className="h-5 w-5" />
          {t('game.title')}
        </h2>
        <Link
          to={quizDone ? `/game/${moduleId}` : '#'}
          onClick={(e) => !quizDone && e.preventDefault()}
          className={`card flex items-center gap-4 transition-all ${
            quizDone
              ? 'hover:border-primary-500'
              : 'cursor-not-allowed opacity-60'
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              gameDone ? 'bg-green-600' : 'bg-orange-600'
            }`}
          >
            {gameDone ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Gamepad2 className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">
              {tGamification(`gameTitles.${module.gameId}`)}
            </h3>
            <p className="text-sm text-gray-400">
              {quizDone ? '+100 XP' : t('game.locked')}
            </p>
          </div>
          {gameDone && (
            <span className="text-sm text-green-500">
              {t('lessonStatus.completed')}
            </span>
          )}
        </Link>
      </div>
    </div>
  )
}
