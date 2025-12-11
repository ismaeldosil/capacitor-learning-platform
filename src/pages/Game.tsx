import { useParams, Link, Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { MODULES } from '../data/constants'
import { ArrowLeft } from 'lucide-react'

const gameInfo: Record<
  string,
  { title: string; description: string; icon: string }
> = {
  'command-builder': {
    title: 'Command Builder',
    description:
      'Construye comandos de Capacitor CLI arrastrando los segmentos en el orden correcto',
    icon: '🔧',
  },
  'plugin-matcher': {
    title: 'Plugin Matcher',
    description:
      'Conecta casos de uso con el plugin de Capacitor correcto',
    icon: '🔌',
  },
  'build-pipeline': {
    title: 'Build Pipeline',
    description:
      'Ordena los pasos del proceso de build para Android e iOS',
    icon: '🔨',
  },
  'store-reviewer': {
    title: 'Store Reviewer',
    description:
      'Identifica errores en configuraciones que causarían rechazo en las tiendas',
    icon: '🔍',
  },
}

export function Game() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { user, isQuizCompleted, isGameCompleted } = useUser()

  const module = MODULES.find((m) => m.id === moduleId)

  if (!module) {
    return <Navigate to="/" replace />
  }

  // Check if module is locked
  if (user.xp < module.requiredXP) {
    return <Navigate to="/" replace />
  }

  // Check if quiz is completed
  const quizDone = isQuizCompleted(module.quizId)
  if (!quizDone) {
    return <Navigate to={`/module/${moduleId}`} replace />
  }

  const gameDone = isGameCompleted(module.gameId)
  const game = gameInfo[module.gameId] || {
    title: module.gameId,
    description: '',
    icon: '🎮',
  }

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

      {/* Game Header */}
      <div className="card mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-600 text-3xl">
            {game.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{game.title}</h1>
            <p className="mt-1 text-gray-400">{game.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              {gameDone ? '✅ Juego completado' : '🏆 +100 XP al completar'}
            </p>
          </div>
        </div>
      </div>

      {/* Game Placeholder */}
      <div className="card">
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-600/20 text-5xl">
            {game.icon}
          </div>
          <h2 className="mb-2 text-xl font-semibold">
            {gameDone ? 'Juego Completado' : 'Juego en Desarrollo'}
          </h2>
          <p className="mx-auto max-w-md text-gray-400">
            {gameDone
              ? '¡Felicidades! Has completado este mini-juego. Puedes volver a jugarlo para practicar.'
              : `El mini-juego "${game.title}" se implementará con datos del repositorio capacitor-learning-content. Incluirá mecánicas interactivas y feedback educativo.`}
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
