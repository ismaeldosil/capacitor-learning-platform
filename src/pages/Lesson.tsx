import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUser } from '../contexts/UserContext'
import { MODULES } from '../data/constants'
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Code, Image, Lightbulb, AlertTriangle } from 'lucide-react'
import { Button } from '../components/common/Button'
import { LessonContent } from '../components/lesson'
import { useTranslatedLessonContent } from '../hooks/useTranslatedContent'

export function Lesson() {
  const { moduleId, lessonId } = useParams<{
    moduleId: string
    lessonId: string
  }>()
  const navigate = useNavigate()
  const { user, isLessonCompleted, completeLesson } = useUser()
  const { t } = useTranslation('lesson')
  const { t: tGamification } = useTranslation('gamification')

  // Call hooks unconditionally at the top
  const lessonContent = useTranslatedLessonContent(lessonId || '')

  const module = MODULES.find((m) => m.id === moduleId)

  if (!module || !lessonId) {
    return <Navigate to="/" replace />
  }

  // Check if module is locked
  if (user.xp < module.requiredXP) {
    return <Navigate to="/" replace />
  }

  const lessonIndex = module.lessons.indexOf(lessonId)
  if (lessonIndex === -1) {
    return <Navigate to={`/module/${moduleId}`} replace />
  }

  const isCompleted = isLessonCompleted(lessonId)
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null
  const nextLesson =
    lessonIndex < module.lessons.length - 1
      ? module.lessons[lessonIndex + 1]
      : null

  const lessonTitle = tGamification(`lessonTitles.${lessonId}`)
  const moduleTitle = tGamification(`modules.${module.id}.title`)

  const handleComplete = () => {
    if (!isCompleted) {
      completeLesson(lessonId)
    }

    if (nextLesson) {
      navigate(`/lesson/${moduleId}/${nextLesson}`)
    } else {
      navigate(`/module/${moduleId}`)
    }
  }

  return (
    <div className="mx-auto max-w-4xl animate-in">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link to="/" className="hover:text-white">
          Dashboard
        </Link>
        <span>/</span>
        <Link to={`/module/${moduleId}`} className="hover:text-white">
          {moduleTitle}
        </Link>
        <span>/</span>
        <span className="text-white">{lessonTitle}</span>
      </div>

      {/* Lesson Header */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {t('progress', {
                  current: lessonIndex + 1,
                  total: module.lessons.length,
                })}
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  {t('completed')}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-bold">{lessonTitle}</h1>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary-400">+10 XP</span>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="card mb-8">
        {lessonContent.length > 0 ? (
          <LessonContent blocks={lessonContent} />
        ) : (
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              El contenido de esta lección se cargará desde el repositorio
              <code className="mx-1 rounded bg-gray-700 px-2 py-1">
                capacitor-learning-content
              </code>
              una vez que esté implementado el sistema de carga de contenido.
            </p>

            <div className="my-8 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Contenido de la lección: {lessonTitle}
              </h3>
              <p className="text-gray-400">
                Esta sección mostrará el contenido markdown de la lección con:
              </p>
              <ul className="mt-4 space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  Explicaciones teoricas
                </li>
                <li className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-400" />
                  Bloques de codigo con syntax highlighting
                </li>
                <li className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-purple-400" />
                  Diagramas y capturas de pantalla
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Tips y notas importantes
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  Advertencias y mejores practicas
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevLesson ? (
          <Link
            to={`/lesson/${moduleId}/${prevLesson}`}
            className="btn-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('navigation.previous')}
          </Link>
        ) : (
          <Link to={`/module/${moduleId}`} className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            {t('navigation.back')}
          </Link>
        )}

        <Button onClick={handleComplete} variant="primary">
          {isCompleted ? (
            nextLesson ? (
              <>
                {t('navigation.next')}
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              t('navigation.backToModule')
            )
          ) : (
            <>
              {t('navigation.complete')}
              <CheckCircle className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
