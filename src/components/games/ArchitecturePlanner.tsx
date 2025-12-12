import { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Lightbulb,
  Layers,
  Database,
  Settings,
  Layout,
} from 'lucide-react'
import { useTranslatedArchitectureChallenges } from '../../hooks/useTranslatedContent'

interface ArchitecturePlannerProps {
  onComplete: (score: number, total: number) => void
}

type LayerType = 'presentation' | 'domain' | 'data' | 'infrastructure'

const LAYERS: { id: LayerType; name: string; icon: React.ReactNode; color: string }[] = [
  {
    id: 'presentation',
    name: 'Presentation',
    icon: <Layout className="h-4 w-4" />,
    color: 'blue',
  },
  {
    id: 'domain',
    name: 'Domain',
    icon: <Layers className="h-4 w-4" />,
    color: 'purple',
  },
  {
    id: 'data',
    name: 'Data',
    icon: <Database className="h-4 w-4" />,
    color: 'green',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: <Settings className="h-4 w-4" />,
    color: 'orange',
  },
]

const layerColors: Record<LayerType, { bg: string; border: string; text: string }> = {
  presentation: {
    bg: 'bg-blue-600/20',
    border: 'border-blue-500',
    text: 'text-blue-400',
  },
  domain: {
    bg: 'bg-purple-600/20',
    border: 'border-purple-500',
    text: 'text-purple-400',
  },
  data: {
    bg: 'bg-green-600/20',
    border: 'border-green-500',
    text: 'text-green-400',
  },
  infrastructure: {
    bg: 'bg-orange-600/20',
    border: 'border-orange-500',
    text: 'text-orange-400',
  },
}

export function ArchitecturePlanner({ onComplete }: ArchitecturePlannerProps) {
  const { t } = useTranslation('gamesContent')
  const challenges = useTranslatedArchitectureChallenges()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [assignments, setAssignments] = useState<Record<string, LayerType>>({})
  const [isVerified, setIsVerified] = useState(false)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null)

  const currentChallenge = challenges[currentIndex]!

  const handleDragStart = useCallback(
    (componentId: string) => {
      if (isVerified) return
      setDraggedComponent(componentId)
    },
    [isVerified]
  )

  const handleDragEnd = useCallback(() => {
    setDraggedComponent(null)
  }, [])

  const handleDrop = useCallback(
    (layerId: LayerType) => {
      if (isVerified || !draggedComponent) return

      setAssignments((prev) => ({
        ...prev,
        [draggedComponent]: layerId,
      }))
      setDraggedComponent(null)
    },
    [isVerified, draggedComponent]
  )

  const handleComponentClick = useCallback(
    (componentId: string, layerId: LayerType) => {
      if (isVerified) return

      setAssignments((prev) => ({
        ...prev,
        [componentId]: layerId,
      }))
    },
    [isVerified]
  )

  const handleVerify = useCallback(() => {
    const correctCount = Object.entries(assignments).filter(
      ([compId, layer]) => currentChallenge.correctLayers[compId] === layer
    ).length

    const totalComponents = currentChallenge.components.length
    const isPerfect = correctCount === totalComponents

    setIsVerified(true)
    if (isPerfect) {
      setScore((prev) => prev + 1)
    }
  }, [assignments, currentChallenge])

  const handleNext = useCallback(() => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setAssignments({})
      setIsVerified(false)
      setShowHint(false)
    } else {
      onComplete(score, challenges.length)
    }
  }, [currentIndex, challenges.length, score, onComplete])

  const getComponentStatus = useCallback(
    (componentId: string) => {
      if (!isVerified) return 'neutral'

      const userAssignment = assignments[componentId]
      const correctLayer = currentChallenge.correctLayers[componentId]

      if (userAssignment === correctLayer) return 'correct'
      if (userAssignment && userAssignment !== correctLayer) return 'wrong'
      return 'missing'
    },
    [isVerified, assignments, currentChallenge]
  )

  const assignedComponents = useMemo(() => {
    return Object.keys(assignments).length
  }, [assignments])

  const correctCount = useMemo(() => {
    if (!isVerified) return 0
    return Object.entries(assignments).filter(
      ([compId, layer]) => currentChallenge.correctLayers[compId] === layer
    ).length
  }, [isVerified, assignments, currentChallenge])

  const allAssigned = assignedComponents === currentChallenge.components.length

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {t('ui.challenge', { defaultValue: 'Desafio' })} {currentIndex + 1}{' '}
          {t('ui.of', { defaultValue: 'de' })} {challenges.length}
        </span>
        <span className="text-sm font-medium text-green-400">
          {t('ui.score', { defaultValue: 'Puntuacion' })}: {score}/
          {currentIndex + (isVerified ? 1 : 0)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + (isVerified ? 1 : 0)) / challenges.length) * 100}%`,
          }}
        />
      </div>

      {/* Challenge Header */}
      <div className="card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600/20">
            <Layers className="h-5 w-5 text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold">{currentChallenge.title}</h3>
            <p className="text-xs text-gray-400">
              {t('ui.classifyComponents', {
                defaultValue: 'Clasifica los componentes en su capa correcta',
              })}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-300">{currentChallenge.scenario}</p>
      </div>

      {/* Layer Drop Zones */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {LAYERS.map((layer) => (
          <div
            key={layer.id}
            onDragOver={(e) => {
              e.preventDefault()
              e.currentTarget.classList.add('ring-2', 'ring-white/50')
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('ring-2', 'ring-white/50')
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.classList.remove('ring-2', 'ring-white/50')
              handleDrop(layer.id)
            }}
            className={`rounded-lg border-2 border-dashed p-3 transition-all ${layerColors[layer.id].border} ${layerColors[layer.id].bg}`}
          >
            <div className={`mb-2 flex items-center gap-2 ${layerColors[layer.id].text}`}>
              {layer.icon}
              <span className="text-sm font-medium">{layer.name}</span>
            </div>

            {/* Components assigned to this layer */}
            <div className="min-h-[60px] space-y-2">
              {currentChallenge.components
                .filter((comp) => assignments[comp.id] === layer.id)
                .map((comp) => {
                  const status = getComponentStatus(comp.id)
                  return (
                    <div
                      key={comp.id}
                      className={`rounded px-2 py-1 text-xs ${
                        isVerified
                          ? status === 'correct'
                            ? 'bg-green-600/30 text-green-300'
                            : 'bg-red-600/30 text-red-300'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {isVerified &&
                          (status === 'correct' ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          ))}
                        <span className="font-mono">{comp.name}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Components to Assign */}
      <div className="card">
        <h4 className="mb-3 text-sm font-medium text-gray-400">
          {t('ui.componentsToAssign', { defaultValue: 'Componentes a clasificar' })}:
        </h4>
        <div className="flex flex-wrap gap-2">
          {currentChallenge.components.map((comp) => {
            const isAssigned = assignments[comp.id] !== undefined
            const status = getComponentStatus(comp.id)

            return (
              <div
                key={comp.id}
                draggable={!isVerified && !isAssigned}
                onDragStart={() => handleDragStart(comp.id)}
                onDragEnd={handleDragEnd}
                className={`group relative rounded-lg border p-3 transition-all ${
                  isAssigned
                    ? 'border-gray-700 bg-gray-800/50 opacity-50'
                    : draggedComponent === comp.id
                      ? 'border-primary-500 bg-primary-600/20'
                      : 'cursor-grab border-gray-600 bg-gray-800 hover:border-gray-500 active:cursor-grabbing'
                } ${isVerified && status === 'wrong' ? 'border-red-500' : ''}`}
              >
                <p className="font-mono text-sm">{comp.name}</p>
                <p className="mt-1 text-xs text-gray-400">{comp.description}</p>

                {/* Quick assign buttons (for mobile/accessibility) */}
                {!isVerified && !isAssigned && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {LAYERS.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => handleComponentClick(comp.id, layer.id)}
                        className={`rounded px-2 py-0.5 text-xs transition-colors ${layerColors[layer.id].bg} ${layerColors[layer.id].text} hover:opacity-80`}
                        aria-label={`Asignar ${comp.name} a ${layer.name}`}
                      >
                        {layer.name.slice(0, 4)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Show correct layer after verification */}
                {isVerified && status === 'wrong' && (
                  <p className="mt-1 text-xs text-yellow-400">
                    {t('ui.correctLayer', { defaultValue: 'Correcto' })}:{' '}
                    {
                      LAYERS.find((l) => l.id === currentChallenge.correctLayers[comp.id])
                        ?.name
                    }
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Results */}
      {isVerified && (
        <div
          className={`rounded-lg border p-4 ${
            correctCount === currentChallenge.components.length
              ? 'border-green-600/30 bg-green-600/10'
              : 'border-yellow-600/30 bg-yellow-600/10'
          }`}
        >
          <div className="flex items-start gap-3">
            {correctCount === currentChallenge.components.length ? (
              <CheckCircle className="mt-0.5 h-5 w-5 text-green-400" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 text-yellow-400" />
            )}
            <div>
              <p className="font-medium">
                {correctCount === currentChallenge.components.length
                  ? t('ui.perfectClassification', {
                      defaultValue: 'Clasificacion perfecta',
                    })
                  : `${correctCount}/${currentChallenge.components.length} ${t('ui.correctAssignments', { defaultValue: 'asignaciones correctas' })}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hint */}
      {showHint && !isVerified && (
        <div className="rounded-lg border border-yellow-600/30 bg-yellow-600/10 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 text-yellow-400" />
            <p className="text-sm text-yellow-200">{currentChallenge.hint}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        {!isVerified && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="btn-secondary flex items-center gap-2 text-sm"
            aria-label={showHint ? t('ui.hideHint') : t('ui.showHint')}
          >
            <Lightbulb className="h-4 w-4" />
            {showHint
              ? t('ui.hideHint', { defaultValue: 'Ocultar pista' })
              : t('ui.showHint', { defaultValue: 'Ver pista' })}
          </button>
        )}

        <div className="ml-auto">
          {!isVerified ? (
            <button
              onClick={handleVerify}
              disabled={!allAssigned}
              className="btn-primary flex items-center gap-2"
              aria-label={t('ui.verify')}
            >
              {t('ui.verify', { defaultValue: 'Verificar' })}
              <CheckCircle className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
              aria-label={
                currentIndex < challenges.length - 1
                  ? t('ui.next')
                  : t('ui.viewResults')
              }
            >
              {currentIndex < challenges.length - 1
                ? t('ui.next', { defaultValue: 'Siguiente' })
                : t('ui.viewResults', { defaultValue: 'Ver resultados' })}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span>{t('ui.layers', { defaultValue: 'Capas' })}:</span>
        {LAYERS.map((layer) => (
          <span key={layer.id} className={`flex items-center gap-1 ${layerColors[layer.id].text}`}>
            {layer.icon}
            {layer.name}
          </span>
        ))}
      </div>
    </div>
  )
}
