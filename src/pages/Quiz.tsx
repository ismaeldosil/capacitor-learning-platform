import { useParams, Link, Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { MODULES } from '../data/constants'
import { ArrowLeft, Brain } from 'lucide-react'

export function Quiz() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { user, isQuizCompleted } = useUser()

  const module = MODULES.find((m) => m.id === moduleId)

  if (!module) {
    return <Navigate to="/" replace />
  }

  // Check if module is locked
  if (user.xp < module.requiredXP) {
    return <Navigate to="/" replace />
  }

  // Check if all lessons are completed
  const allLessonsCompleted = module.lessons.every((lessonId) =>
    user.completedLessons.includes(lessonId)
  )

  if (!allLessonsCompleted) {
    return <Navigate to={`/module/${moduleId}`} replace />
  }

  const quizDone = isQuizCompleted(module.quizId)

  return (
    <div className="mx-auto max-w-4xl animate-in">
      {/* Back Link */}
      <Link
        to={`/module/${moduleId}`}
        className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver al módulo</span>
      </Link>

      {/* Quiz Header */}
      <div className="card mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-600 text-3xl">
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Quiz: {module.title}</h1>
            <p className="mt-1 text-gray-400">
              Evalúa tus conocimientos del módulo
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {quizDone ? '✅ Quiz completado' : '📊 10 preguntas • 70% para aprobar'}
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Placeholder */}
      <div className="card">
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-600/20">
            <Brain className="h-12 w-12 text-purple-400" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">
            {quizDone ? 'Quiz Completado' : 'Quiz en Desarrollo'}
          </h2>
          <p className="mx-auto max-w-md text-gray-400">
            {quizDone
              ? 'Ya has completado este quiz. Puedes volver a intentarlo para mejorar tu puntuación.'
              : 'El sistema de quizzes se cargará desde el repositorio capacitor-learning-content. Las preguntas incluirán múltiple opción con explicaciones detalladas.'}
          </p>
          <div className="mt-8">
            <Link to={`/module/${moduleId}`} className="btn-primary">
              Volver al módulo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
