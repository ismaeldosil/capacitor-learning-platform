import { useState, useCallback } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUser } from '../contexts/UserContext'
import { MODULES, XP_REWARDS } from '../data/constants'
import { ArrowLeft, Trophy, RotateCcw, CheckCircle, Wrench, Plug, Hammer, Search, Layers, Shield } from 'lucide-react'
import {
  CommandBuilder,
  PluginMatcher,
  BuildPipeline,
  StoreReviewer,
  ArchitecturePlanner,
  SecurityAudit,
} from '../components/games'
import type { GameType } from '../data/types'
import { trackGameStart, trackGameComplete } from '../utils'

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
  const { user, isQuizCompleted, isGameCompleted, completeGame, devMode } = useUser()
  const { t } = useTranslation('game')
  const { t: tGamification } = useTranslation('gamification')

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

  const handleGameComplete = useCallback(
    (score: number, total: number) => {
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
    },
    [module, completeGame]
  )

  const handlePlayAgain = useCallback(() => {
    setGameState('intro')
    setResult(null)
  }, [])

  if (!module) {
    return <Navigate to="/" replace />
  }

  // Check if module is locked (bypass in dev mode)
  if (!devMode && user.xp < module.requiredXP) {
    return <Navigate to="/" replace />
  }

  // Check if quiz is completed
  const quizDone = isQuizCompleted(module.quizId)
  if (!quizDone) {
    return <Navigate to={`/module/${moduleId}`} replace />
  }

  const gameDone = isGameCompleted(module.gameId)

  // Get game type key
  const gameTypeKey = module.gameId as
    | 'command-builder'
    | 'plugin-matcher'
    | 'build-pipeline'
    | 'store-reviewer'
    | 'architecture-planner'
    | 'security-audit'
  const gameTypeMap: Record<string, string> = {
    'command-builder': 'commandBuilder',
    'plugin-matcher': 'pluginMatcher',
    'build-pipeline': 'buildPipeline',
    'store-reviewer': 'storeReviewer',
    'architecture-planner': 'architecturePlanner',
    'security-audit': 'securityAudit',
  }
  const gameKey = gameTypeMap[gameTypeKey] || 'commandBuilder'

  const GameIcon = {
    'command-builder': Wrench,
    'plugin-matcher': Plug,
    'build-pipeline': Hammer,
    'store-reviewer': Search,
    'architecture-planner': Layers,
    'security-audit': Shield,
  }[module.gameId] || Wrench
  const gameTitle = tGamification(`gameTitles.${module.gameId}`)

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
      case 'architecture-planner':
        return <ArchitecturePlanner onComplete={handleGameComplete} />
      case 'security-audit':
        return <SecurityAudit onComplete={handleGameComplete} />
      default:
        return (
          <div className="py-12 text-center">
            <p className="text-gray-400">{t('notAvailable.title')}</p>
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
        <span>{t('backToModule')}</span>
      </Link>

      {/* Game Header */}
      <div className="card mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-600">
            <GameIcon className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{gameTitle}</h1>
            <p className="mt-1 text-gray-400">
              {t(`types.${gameKey}.description`)}
            </p>
            <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
              {gameDone ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('intro.completed')}
                </>
              ) : (
                t('intro.xpReward', { xp: XP_REWARDS.GAME_COMPLETE })
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Game Content */}
      {gameState === 'intro' && (
        <div className="card">
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-600/20">
              <GameIcon className="h-12 w-12 text-orange-400" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">
              {gameDone ? t('intro.alreadyCompleted') : t('intro.readyPlay')}
            </h2>
            <p className="mx-auto mb-6 max-w-md text-gray-400">
              {t(`types.${gameKey}.instructions`)}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartGame}
                className="btn-primary flex items-center gap-2"
              >
                {gameDone ? t('intro.playAgain') : t('intro.start')}
                <Trophy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'playing' && <div className="card">{renderGame()}</div>}

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
              {result.passed ? t('intro.alreadyCompleted') : t('intro.start')}
            </h2>

            {/* Score */}
            <div className="mb-6">
              <div className="mb-2 text-4xl font-bold">
                {Math.round((result.score / result.total) * 100)}%
              </div>
              <p className="text-gray-400">
                {result.score} / {result.total}
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

            {/* Actions */}
            <div className="mt-8 flex justify-center gap-4">
              {!result.passed && (
                <button
                  onClick={handlePlayAgain}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t('intro.playAgain')}
                </button>
              )}
              <button
                onClick={() => navigate(`/module/${moduleId}`)}
                className="btn-primary"
              >
                {t('backToModule')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
