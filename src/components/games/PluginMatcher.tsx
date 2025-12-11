import { useState, useCallback, useMemo } from 'react'
import { CheckCircle, XCircle, Lightbulb, RotateCcw, Plug } from 'lucide-react'
import { getPluginPairs, type PluginPair } from '../../data/games'

interface PluginMatcherProps {
  onComplete: (score: number, total: number) => void
}

interface Match {
  useCaseId: string
  pluginName: string
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled
}

export function PluginMatcher({ onComplete }: PluginMatcherProps) {
  const allPairs = getPluginPairs()
  const [pairs] = useState<PluginPair[]>(() => shuffleArray([...allPairs]).slice(0, 6))
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [showHints, setShowHints] = useState<Set<string>>(new Set())
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState<Map<string, boolean>>(new Map())

  const shuffledPlugins = useMemo(() => {
    return shuffleArray(pairs.map(p => ({ name: p.pluginName, plugin: p.plugin })))
  }, [pairs])

  const matchedUseCases = useMemo(() => {
    return new Set(matches.map(m => m.useCaseId))
  }, [matches])

  const matchedPlugins = useMemo(() => {
    return new Set(matches.map(m => m.pluginName))
  }, [matches])

  const handleUseCaseClick = useCallback((id: string) => {
    if (matchedUseCases.has(id) || isComplete) return
    setSelectedUseCase(selectedUseCase === id ? null : id)
  }, [selectedUseCase, matchedUseCases, isComplete])

  const handlePluginClick = useCallback((pluginName: string) => {
    if (!selectedUseCase || matchedPlugins.has(pluginName) || isComplete) return

    setMatches(prev => [...prev, { useCaseId: selectedUseCase, pluginName }])
    setSelectedUseCase(null)
  }, [selectedUseCase, matchedPlugins, isComplete])

  const handleShowHint = useCallback((id: string) => {
    setShowHints(prev => new Set([...prev, id]))
  }, [])

  const handleReset = useCallback(() => {
    setMatches([])
    setSelectedUseCase(null)
    setShowHints(new Set())
    setIsComplete(false)
    setResults(new Map())
  }, [])

  const handleVerify = useCallback(() => {
    const newResults = new Map<string, boolean>()
    let correctCount = 0

    matches.forEach(match => {
      const pair = pairs.find(p => p.id === match.useCaseId)
      const isCorrect = pair?.pluginName === match.pluginName
      newResults.set(match.useCaseId, isCorrect ?? false)
      if (isCorrect) correctCount++
    })

    setResults(newResults)
    setIsComplete(true)

    if (matches.length === pairs.length) {
      onComplete(correctCount, pairs.length)
    }
  }, [matches, pairs, onComplete])

  const getMatchedPlugin = useCallback((useCaseId: string) => {
    return matches.find(m => m.useCaseId === useCaseId)?.pluginName
  }, [matches])

  const score = useMemo(() => {
    return Array.from(results.values()).filter(Boolean).length
  }, [results])

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Emparejados: {matches.length} de {pairs.length}
        </span>
        {isComplete && (
          <span className="text-sm font-medium text-green-400">
            Puntuación: {score}/{pairs.length}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(matches.length / pairs.length) * 100}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="card text-center">
        <Plug className="mx-auto mb-2 h-8 w-8 text-blue-400" />
        <p className="text-sm text-gray-400">
          {selectedUseCase
            ? 'Ahora selecciona el plugin que corresponde'
            : 'Selecciona un caso de uso para empezar'}
        </p>
      </div>

      {/* Game Area */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Use Cases */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400">Casos de Uso</h3>
          {pairs.map(pair => {
            const isMatched = matchedUseCases.has(pair.id)
            const isSelected = selectedUseCase === pair.id
            const result = results.get(pair.id)
            const matchedPluginName = getMatchedPlugin(pair.id)

            return (
              <div key={pair.id} className="space-y-2">
                <button
                  onClick={() => handleUseCaseClick(pair.id)}
                  disabled={isMatched || isComplete}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    isComplete && result !== undefined
                      ? result
                        ? 'border-green-500 bg-green-600/10'
                        : 'border-red-500 bg-red-600/10'
                      : isSelected
                        ? 'border-blue-500 bg-blue-600/20'
                        : isMatched
                          ? 'border-gray-600 bg-gray-700/50 opacity-75'
                          : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                  } ${isMatched || isComplete ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  aria-label={`Caso de uso: ${pair.useCase}`}
                  aria-pressed={isSelected}
                >
                  <p className="text-sm">{pair.useCase}</p>
                  {isMatched && matchedPluginName && (
                    <p className="mt-2 text-xs text-gray-400">
                      Seleccionado: <span className="text-blue-400">{matchedPluginName}</span>
                    </p>
                  )}
                  {isComplete && !result && (
                    <p className="mt-2 text-xs text-red-400">
                      Correcto: {pair.pluginName}
                    </p>
                  )}
                </button>

                {/* Hint button */}
                {!isMatched && !isComplete && (
                  <div className="flex justify-end">
                    {showHints.has(pair.id) ? (
                      <span className="flex items-center gap-1 text-xs text-yellow-400">
                        <Lightbulb className="h-3 w-3" />
                        {pair.hint}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleShowHint(pair.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-yellow-400"
                        aria-label={`Ver pista para: ${pair.useCase}`}
                      >
                        <Lightbulb className="h-3 w-3" />
                        Ver pista
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Plugins */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400">Plugins</h3>
          {shuffledPlugins.map(({ name, plugin }) => {
            const isMatched = matchedPlugins.has(name)

            return (
              <button
                key={name}
                onClick={() => handlePluginClick(name)}
                disabled={!selectedUseCase || isMatched || isComplete}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  isMatched
                    ? 'border-gray-600 bg-gray-700/50 opacity-75'
                    : selectedUseCase && !isComplete
                      ? 'border-purple-500 bg-purple-600/20 hover:bg-purple-600/30'
                      : 'border-gray-600 bg-gray-800'
                } ${!selectedUseCase || isMatched || isComplete ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label={`Plugin: ${name}`}
              >
                <p className="font-medium text-purple-400">{name}</p>
                <p className="mt-1 font-mono text-xs text-gray-500">{plugin}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results */}
      {isComplete && (
        <div
          className={`rounded-lg border p-4 ${
            score === pairs.length
              ? 'border-green-600/30 bg-green-600/10'
              : score >= pairs.length / 2
                ? 'border-yellow-600/30 bg-yellow-600/10'
                : 'border-red-600/30 bg-red-600/10'
          }`}
        >
          <div className="flex items-center gap-3">
            {score === pairs.length ? (
              <CheckCircle className="h-6 w-6 text-green-400" />
            ) : (
              <XCircle className="h-6 w-6 text-red-400" />
            )}
            <div>
              <p className="font-medium">
                {score === pairs.length
                  ? '¡Perfecto! Todos los emparejamientos correctos'
                  : `${score} de ${pairs.length} correctos`}
              </p>
              <p className="text-sm text-gray-400">
                {score === pairs.length
                  ? 'Dominas los plugins de Capacitor'
                  : 'Revisa las respuestas incorrectas arriba'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          className="btn-secondary flex items-center gap-2"
          aria-label="Reiniciar juego"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </button>

        {!isComplete ? (
          <button
            onClick={handleVerify}
            disabled={matches.length < pairs.length}
            className="btn-primary flex items-center gap-2"
            aria-label="Verificar emparejamientos"
          >
            Verificar
            <CheckCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => onComplete(score, pairs.length)}
            className="btn-primary flex items-center gap-2"
            aria-label="Ver resultados finales"
          >
            Ver Resultados
          </button>
        )}
      </div>
    </div>
  )
}
