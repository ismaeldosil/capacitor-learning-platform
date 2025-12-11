import { useState, useCallback } from 'react'
import { CheckCircle, XCircle, Lightbulb, RotateCcw, ArrowRight } from 'lucide-react'
import { getCommandChallenges, type CommandPart } from '../../data/games'

interface CommandBuilderProps {
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

export function CommandBuilder({ onComplete }: CommandBuilderProps) {
  const challenges = getCommandChallenges()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [arrangedParts, setArrangedParts] = useState<CommandPart[]>([])
  const [availableParts, setAvailableParts] = useState<CommandPart[]>(() =>
    shuffleArray([...challenges[0]!.parts])
  )
  const [showHint, setShowHint] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [draggedPart, setDraggedPart] = useState<CommandPart | null>(null)

  const currentChallenge = challenges[currentIndex]!

  const handleDragStart = useCallback((part: CommandPart) => {
    setDraggedPart(part)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDropOnArranged = useCallback(() => {
    if (draggedPart && !arrangedParts.find(p => p.id === draggedPart.id)) {
      setArrangedParts(prev => [...prev, draggedPart])
      setAvailableParts(prev => prev.filter(p => p.id !== draggedPart.id))
    }
    setDraggedPart(null)
  }, [draggedPart, arrangedParts])

  const handleDropOnAvailable = useCallback(() => {
    if (draggedPart && !availableParts.find(p => p.id === draggedPart.id)) {
      setAvailableParts(prev => [...prev, draggedPart])
      setArrangedParts(prev => prev.filter(p => p.id !== draggedPart.id))
    }
    setDraggedPart(null)
  }, [draggedPart, availableParts])

  const handlePartClick = useCallback((part: CommandPart, isArranged: boolean) => {
    if (isVerified) return

    if (isArranged) {
      setArrangedParts(prev => prev.filter(p => p.id !== part.id))
      setAvailableParts(prev => [...prev, part])
    } else {
      setAvailableParts(prev => prev.filter(p => p.id !== part.id))
      setArrangedParts(prev => [...prev, part])
    }
  }, [isVerified])

  const handleVerify = useCallback(() => {
    const userOrder = arrangedParts.map(p => p.id)
    const correct = JSON.stringify(userOrder) === JSON.stringify(currentChallenge.correctOrder)
    setIsCorrect(correct)
    setIsVerified(true)
    if (correct) {
      setScore(prev => prev + 1)
    }
  }, [arrangedParts, currentChallenge.correctOrder])

  const handleNext = useCallback(() => {
    if (currentIndex < challenges.length - 1) {
      const nextChallenge = challenges[currentIndex + 1]!
      setCurrentIndex(prev => prev + 1)
      setArrangedParts([])
      setAvailableParts(shuffleArray([...nextChallenge.parts]))
      setShowHint(false)
      setIsVerified(false)
      setIsCorrect(false)
    } else {
      onComplete(score + (isCorrect ? 0 : 0), challenges.length)
    }
  }, [currentIndex, challenges, score, isCorrect, onComplete])

  const handleReset = useCallback(() => {
    setArrangedParts([])
    setAvailableParts(shuffleArray([...currentChallenge.parts]))
    setShowHint(false)
    setIsVerified(false)
    setIsCorrect(false)
  }, [currentChallenge.parts])

  const getPartColor = (type: CommandPart['type']) => {
    switch (type) {
      case 'base':
        return 'bg-blue-600 hover:bg-blue-500'
      case 'flag':
        return 'bg-purple-600 hover:bg-purple-500'
      case 'argument':
        return 'bg-green-600 hover:bg-green-500'
      case 'platform':
        return 'bg-orange-600 hover:bg-orange-500'
      default:
        return 'bg-gray-600 hover:bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Desafío {currentIndex + 1} de {challenges.length}
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

      {/* Challenge */}
      <div className="card">
        <h3 className="mb-2 text-lg font-semibold">{currentChallenge.instruction}</h3>
        <p className="text-sm text-gray-400">{currentChallenge.description}</p>
      </div>

      {/* Command Building Area */}
      <div className="space-y-4">
        {/* Drop Zone for Arranged Parts */}
        <div
          className={`min-h-[80px] rounded-lg border-2 border-dashed p-4 transition-colors ${
            arrangedParts.length === 0
              ? 'border-gray-600 bg-gray-800/50'
              : 'border-blue-500 bg-gray-800'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDropOnArranged}
          role="region"
          aria-label="Zona de comando"
        >
          <div className="mb-2 text-xs text-gray-500">Tu comando:</div>
          <div className="flex flex-wrap gap-2">
            {arrangedParts.length === 0 ? (
              <span className="text-gray-500">Arrastra las partes aquí o haz clic en ellas</span>
            ) : (
              arrangedParts.map((part, index) => (
                <button
                  key={part.id}
                  draggable={!isVerified}
                  onDragStart={() => handleDragStart(part)}
                  onClick={() => handlePartClick(part, true)}
                  disabled={isVerified}
                  className={`flex items-center gap-1 rounded px-3 py-2 font-mono text-sm text-white transition-all ${
                    isVerified ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                  } ${getPartColor(part.type)}`}
                  aria-label={`Parte ${index + 1}: ${part.text}`}
                >
                  {part.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Parts */}
        <div
          className="min-h-[60px] rounded-lg bg-gray-800 p-4"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
          role="region"
          aria-label="Partes disponibles"
        >
          <div className="mb-2 text-xs text-gray-500">Partes disponibles:</div>
          <div className="flex flex-wrap gap-2">
            {availableParts.length === 0 ? (
              <span className="text-gray-500">Todas las partes han sido usadas</span>
            ) : (
              availableParts.map(part => (
                <button
                  key={part.id}
                  draggable={!isVerified}
                  onDragStart={() => handleDragStart(part)}
                  onClick={() => handlePartClick(part, false)}
                  disabled={isVerified}
                  className={`rounded px-3 py-2 font-mono text-sm text-white transition-all ${
                    isVerified ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                  } ${getPartColor(part.type)}`}
                  aria-label={`Añadir parte: ${part.text}`}
                >
                  {part.text}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hint */}
      {showHint && !isVerified && (
        <div className="rounded-lg border border-yellow-600/30 bg-yellow-600/10 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 text-yellow-400" />
            <p className="text-sm text-yellow-200">{currentChallenge.hint}</p>
          </div>
        </div>
      )}

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
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              {!isCorrect && (
                <p className="mt-1 text-sm text-gray-400">
                  Comando correcto:{' '}
                  <code className="rounded bg-gray-700 px-2 py-0.5 font-mono text-white">
                    {currentChallenge.parts
                      .sort((a, b) => {
                        const orderA = currentChallenge.correctOrder.indexOf(a.id)
                        const orderB = currentChallenge.correctOrder.indexOf(b.id)
                        return orderA - orderB
                      })
                      .map(p => p.text)
                      .join(' ')}
                  </code>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {!isVerified && (
            <>
              <button
                onClick={handleReset}
                className="btn-secondary flex items-center gap-2"
                aria-label="Reiniciar"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar
              </button>
              <button
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="btn-secondary flex items-center gap-2"
                aria-label="Ver pista"
              >
                <Lightbulb className="h-4 w-4" />
                Pista
              </button>
            </>
          )}
        </div>

        {!isVerified ? (
          <button
            onClick={handleVerify}
            disabled={arrangedParts.length === 0}
            className="btn-primary flex items-center gap-2"
            aria-label="Verificar respuesta"
          >
            Verificar
            <CheckCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
            aria-label={currentIndex < challenges.length - 1 ? 'Siguiente desafío' : 'Ver resultados'}
          >
            {currentIndex < challenges.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span>Leyenda:</span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-blue-600" /> Comando base
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-purple-600" /> Flag
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-green-600" /> Argumento
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-orange-600" /> Plataforma
        </span>
      </div>
    </div>
  )
}
