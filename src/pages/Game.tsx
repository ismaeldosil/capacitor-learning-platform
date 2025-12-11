import { useState, useCallback } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { MODULES, XP_REWARDS } from '../data/constants'
import { ArrowLeft, Trophy, RotateCcw, CheckCircle } from 'lucide-react'
import { CommandBuilder, PluginMatcher, BuildPipeline, StoreReviewer } from '../components/games'
import type { GameType } from '../data/types'
import { trackGameStart, trackGameComplete } from '../utils'

const gameInfo: Record<
  string,
  { title: string; description: string; icon: string; instructions: string }
> = {
  'command-builder': {
    title: 'Command Builder',
    description:
      'Construye comandos de Capacitor CLI arrastrando los segmentos en el orden correcto',
    icon: '🔧',
    instructions: 'Arrastra y suelta las partes del comando en el orden correcto para completar cada desafío.',
  },
  'plugin-matcher': {
    title: 'Plugin Matcher',
    description:
      'Conecta casos de uso con el plugin de Capacitor correcto',
    icon: '🔌',
    instructions: 'Empareja cada caso de uso con el plugin que lo resuelve. Usa las pistas si necesitas ayuda.',
  },
  'build-pipeline': {
    title: 'Build Pipeline',
    description:
      'Ordena los pasos del proceso de build para Android e iOS',
    icon: '🔨',
    instructions: 'Arrastra los pasos en el orden correcto para completar el pipeline de build.',
  },
  'store-reviewer': {
    title: 'Store Reviewer',
    description:
      'Identifica errores en configuraciones que causarían rechazo en las tiendas',
    icon: '🔍',
    instructions: 'Lee cada escenario y selecciona los issues que podrían causar un rechazo.',
  },
}

type GameState = 'intro' | 'playing' | 'result'

interface GameResult {
  score: number
  total: number
  passed: boolean
  xpEarned: number
}

export function Game() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const { user, isQuizCompleted, isGameCompleted, completeGame } = useUser()

  const [gameState, setGameState] = useState<GameState>('intro')
  const [result, setResult] = useState<GameResult | null>(null)

  const module = MODULES.find((m) => m.id === moduleId)

  const handleStartGame = useCallback(() => {
    setGameState('playing')
    setResult(null)
    if (module) {
      trackGameStart(module.gameId)
    }
  }, [module])

  const handleGameComplete = useCallback((score: number, total: number) => {
    const passed = score >= total * 0.7 // 70% to pass
    const xpEarned = passed ? XP_REWARDS.GAME_COMPLETE : 0

    if (module) {
      // Track game completion
      trackGameComplete(module.gameId, Math.round((score / total) * 100))

      if (passed) {
        completeGame(module.gameId)
      }
    }

    setResult({ score, total, passed, xpEarned })
    setGameState('result')
  }, [module, completeGame])

  const handlePlayAgain = useCallback(() => {
    setGameState('intro')
    setResult(null)
  }, [])

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
    instructions: '',
  }

  const renderGame = () => {
    switch (module.gameId as GameType) {
      case 'command-builder':
        return <CommandBuilder onComplete={handleGameComplete} />
      case 'plugin-matcher':
        return <PluginMatcher onComplete={handleGameComplete} />
      case 'build-pipeline':
        return <BuildPipeline onComplete={handleGameComplete} />
      case 'store-reviewer':
        return <StoreReviewer onComplete={handleGameComplete} />
      default:
        return (
          <div className="py-12 text-center">
            <p className="text-gray-400">Juego no disponible</p>
          </div>
        )
    }
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
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{game.title}</h1>
            <p className="mt-1 text-gray-400">{game.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              {gameDone ? '✅ Juego completado' : `🏆 +${XP_REWARDS.GAME_COMPLETE} XP al completar`}
            </p>
          </div>
        </div>
      </div>

      {/* Game Content */}
      {gameState === 'intro' && (
        <div className="card">
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-600/20 text-5xl">
              {game.icon}
            </div>
            <h2 className="mb-2 text-xl font-semibold">
              {gameDone ? '¡Juego Completado!' : '¿Listo para jugar?'}
            </h2>
            <p className="mx-auto mb-6 max-w-md text-gray-400">
              {game.instructions}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartGame}
                className="btn-primary flex items-center gap-2"
              >
                {gameDone ? 'Jugar de nuevo' : 'Comenzar juego'}
                <Trophy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="card">
          {renderGame()}
        </div>
      )}

      {gameState === 'result' && result && (
        <div className="card">
          <div className="py-8 text-center">
            {/* Result Icon */}
            <div
              className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
                result.passed ? 'bg-green-600/20' : 'bg-red-600/20'
              }`}
            >
              {result.passed ? (
                <Trophy className="h-12 w-12 text-yellow-400" />
              ) : (
                <span className="text-5xl">😔</span>
              )}
            </div>

            {/* Result Title */}
            <h2 className="mb-2 text-2xl font-bold">
              {result.passed ? '¡Juego Completado!' : 'Inténtalo de nuevo'}
            </h2>

            {/* Score */}
            <div className="mb-6">
              <div className="mb-2 text-4xl font-bold">
                {Math.round((result.score / result.total) * 100)}%
              </div>
              <p className="text-gray-400">
                {result.score} de {result.total} correctos
              </p>
            </div>

            {/* XP Earned */}
            {result.passed && result.xpEarned > 0 && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-600/20 px-4 py-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold text-yellow-400">
                  +{result.xpEarned} XP
                </span>
              </div>
            )}

            {/* Message */}
            <p className="mx-auto mb-8 max-w-md text-gray-400">
              {result.passed
                ? '¡Excelente trabajo! Has demostrado tu conocimiento en este desafío.'
                : 'Necesitas al menos 70% para aprobar. Revisa el contenido y vuelve a intentarlo.'}
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              {!result.passed && (
                <button
                  onClick={handlePlayAgain}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Intentar de nuevo
                </button>
              )}
              <button
                onClick={() => navigate(`/module/${moduleId}`)}
                className="btn-primary"
              >
                Volver al módulo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
