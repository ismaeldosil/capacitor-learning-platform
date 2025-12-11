import { useState, useCallback } from 'react'
import { CheckCircle, XCircle, RotateCcw, ArrowRight, ArrowDown, Smartphone } from 'lucide-react'
import { getBuildChallenges, type BuildStep } from '../../data/games'

interface BuildPipelineProps {
  onComplete: (score: number, total: number) => void
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled
}

export function BuildPipeline({ onComplete }: BuildPipelineProps) {
  const challenges = getBuildChallenges()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [arrangedSteps, setArrangedSteps] = useState<BuildStep[]>([])
  const [availableSteps, setAvailableSteps] = useState<BuildStep[]>(() =>
    shuffleArray([...challenges[0]!.steps])
  )
  const [isVerified, setIsVerified] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [draggedStep, setDraggedStep] = useState<BuildStep | null>(null)

  const currentChallenge = challenges[currentIndex]!

  const handleDragStart = useCallback((step: BuildStep) => {
    setDraggedStep(step)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDropOnPipeline = useCallback((index?: number) => {
    if (draggedStep) {
      const isFromArranged = arrangedSteps.find(s => s.id === draggedStep.id)

      if (isFromArranged) {
        // Reordering within pipeline
        const newArranged = arrangedSteps.filter(s => s.id !== draggedStep.id)
        if (index !== undefined) {
          newArranged.splice(index, 0, draggedStep)
        } else {
          newArranged.push(draggedStep)
        }
        setArrangedSteps(newArranged)
      } else {
        // Adding from available
        if (index !== undefined) {
          const newArranged = [...arrangedSteps]
          newArranged.splice(index, 0, draggedStep)
          setArrangedSteps(newArranged)
        } else {
          setArrangedSteps(prev => [...prev, draggedStep])
        }
        setAvailableSteps(prev => prev.filter(s => s.id !== draggedStep.id))
      }
    }
    setDraggedStep(null)
  }, [draggedStep, arrangedSteps])

  const handleDropOnAvailable = useCallback(() => {
    if (draggedStep && !availableSteps.find(s => s.id === draggedStep.id)) {
      setAvailableSteps(prev => [...prev, draggedStep])
      setArrangedSteps(prev => prev.filter(s => s.id !== draggedStep.id))
    }
    setDraggedStep(null)
  }, [draggedStep, availableSteps])

  const handleStepClick = useCallback((step: BuildStep, isArranged: boolean) => {
    if (isVerified) return

    if (isArranged) {
      setArrangedSteps(prev => prev.filter(s => s.id !== step.id))
      setAvailableSteps(prev => [...prev, step])
    } else {
      setAvailableSteps(prev => prev.filter(s => s.id !== step.id))
      setArrangedSteps(prev => [...prev, step])
    }
  }, [isVerified])

  const handleVerify = useCallback(() => {
    const userOrder = arrangedSteps.map(s => s.id)
    const correct = JSON.stringify(userOrder) === JSON.stringify(currentChallenge.correctOrder)
    setIsCorrect(correct)
    setIsVerified(true)
    if (correct) {
      setScore(prev => prev + 1)
    }
  }, [arrangedSteps, currentChallenge.correctOrder])

  const handleNext = useCallback(() => {
    if (currentIndex < challenges.length - 1) {
      const nextChallenge = challenges[currentIndex + 1]!
      setCurrentIndex(prev => prev + 1)
      setArrangedSteps([])
      setAvailableSteps(shuffleArray([...nextChallenge.steps]))
      setIsVerified(false)
      setIsCorrect(false)
    } else {
      onComplete(score + (isCorrect ? 0 : 0), challenges.length)
    }
  }, [currentIndex, challenges, score, isCorrect, onComplete])

  const handleReset = useCallback(() => {
    setArrangedSteps([])
    setAvailableSteps(shuffleArray([...currentChallenge.steps]))
    setIsVerified(false)
    setIsCorrect(false)
  }, [currentChallenge.steps])

  const getPlatformIcon = (platform: string) => {
    if (platform === 'android') return '🤖'
    if (platform === 'ios') return '🍎'
    return '🌐'
  }

  const getPlatformColor = (platform: string) => {
    if (platform === 'android') return 'border-green-500 bg-green-600/20'
    if (platform === 'ios') return 'border-blue-500 bg-blue-600/20'
    return 'border-gray-500 bg-gray-600/20'
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Pipeline {currentIndex + 1} de {challenges.length}
        </span>
        <span className="text-sm font-medium text-green-400">
          Puntuación: {score}/{currentIndex + (isVerified ? 1 : 0)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${((currentIndex + (isVerified ? 1 : 0)) / challenges.length) * 100}%` }}
        />
      </div>

      {/* Challenge Header */}
      <div className="card flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-2xl">
          {getPlatformIcon(currentChallenge.platform)}
        </div>
        <div>
          <h3 className="font-semibold">
            Build Pipeline para {currentChallenge.platform === 'android' ? 'Android' : 'iOS'}
          </h3>
          <p className="text-sm text-gray-400">
            Ordena los pasos del proceso de build en el orden correcto
          </p>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Smartphone className="h-4 w-4" />
          <span>Tu Pipeline:</span>
        </div>

        {/* Drop Zone for Pipeline */}
        <div
          className={`min-h-[200px] rounded-lg border-2 border-dashed p-4 transition-colors ${
            arrangedSteps.length === 0
              ? 'border-gray-600 bg-gray-800/50'
              : 'border-blue-500 bg-gray-800'
          }`}
          onDragOver={handleDragOver}
          onDrop={() => handleDropOnPipeline()}
          role="region"
          aria-label="Pipeline de build"
        >
          {arrangedSteps.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              Arrastra los pasos aquí en el orden correcto
            </div>
          ) : (
            <div className="space-y-2">
              {arrangedSteps.map((step, index) => (
                <div key={step.id}>
                  <div
                    className="drop-zone h-2"
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      e.stopPropagation()
                      handleDropOnPipeline(index)
                    }}
                  />
                  <button
                    draggable={!isVerified}
                    onDragStart={() => handleDragStart(step)}
                    onClick={() => handleStepClick(step, true)}
                    disabled={isVerified}
                    className={`flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-all ${
                      isVerified ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:bg-gray-700'
                    } ${getPlatformColor(step.platform)}`}
                    aria-label={`Paso ${index + 1}: ${step.name}`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-sm font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{step.name}</p>
                      <p className="text-xs text-gray-400">{step.description}</p>
                    </div>
                    {index < arrangedSteps.length - 1 && (
                      <ArrowDown className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Steps */}
        <div className="text-sm text-gray-500">Pasos disponibles:</div>
        <div
          className="min-h-[100px] rounded-lg bg-gray-800 p-4"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
          role="region"
          aria-label="Pasos disponibles"
        >
          {availableSteps.length === 0 ? (
            <div className="text-center text-gray-500">Todos los pasos han sido asignados</div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {availableSteps.map(step => (
                <button
                  key={step.id}
                  draggable={!isVerified}
                  onDragStart={() => handleDragStart(step)}
                  onClick={() => handleStepClick(step, false)}
                  disabled={isVerified}
                  className={`rounded-lg border-2 p-3 text-left transition-all ${
                    isVerified ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:bg-gray-700'
                  } ${getPlatformColor(step.platform)}`}
                  aria-label={`Añadir paso: ${step.name}`}
                >
                  <p className="font-medium">{step.name}</p>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {isVerified && (
        <div
          className={`rounded-lg border p-4 ${
            isCorrect
              ? 'border-green-600/30 bg-green-600/10'
              : 'border-red-600/30 bg-red-600/10'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="mt-0.5 h-5 w-5 text-green-400" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 text-red-400" />
            )}
            <div>
              <p className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '¡Pipeline correcto!' : 'Orden incorrecto'}
              </p>
              {!isCorrect && (
                <div className="mt-2 text-sm text-gray-400">
                  <p className="mb-1">Orden correcto:</p>
                  <ol className="list-inside list-decimal space-y-1">
                    {currentChallenge.steps
                      .sort((a, b) => {
                        const orderA = currentChallenge.correctOrder.indexOf(a.id)
                        const orderB = currentChallenge.correctOrder.indexOf(b.id)
                        return orderA - orderB
                      })
                      .map(s => (
                        <li key={s.id}>{s.name}</li>
                      ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          disabled={isVerified}
          className="btn-secondary flex items-center gap-2"
          aria-label="Reiniciar"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </button>

        {!isVerified ? (
          <button
            onClick={handleVerify}
            disabled={arrangedSteps.length !== currentChallenge.steps.length}
            className="btn-primary flex items-center gap-2"
            aria-label="Verificar pipeline"
          >
            Verificar
            <CheckCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
            aria-label={currentIndex < challenges.length - 1 ? 'Siguiente pipeline' : 'Ver resultados'}
          >
            {currentIndex < challenges.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
