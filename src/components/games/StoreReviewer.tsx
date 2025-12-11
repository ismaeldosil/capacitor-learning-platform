import { useState, useCallback } from 'react'
import { CheckCircle, XCircle, ArrowRight, AlertTriangle, Store } from 'lucide-react'
import { getStoreScenarios } from '../../data/games'

interface StoreReviewerProps {
  onComplete: (score: number, total: number) => void
}

export function StoreReviewer({ onComplete }: StoreReviewerProps) {
  const scenarios = getStoreScenarios()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIssues, setSelectedIssues] = useState<Set<string>>(new Set())
  const [isVerified, setIsVerified] = useState(false)
  const [score, setScore] = useState(0)

  const currentScenario = scenarios[currentIndex]!

  const handleIssueToggle = useCallback((issue: string) => {
    if (isVerified) return

    setSelectedIssues(prev => {
      const newSet = new Set(prev)
      if (newSet.has(issue)) {
        newSet.delete(issue)
      } else {
        newSet.add(issue)
      }
      return newSet
    })
  }, [isVerified])

  const handleVerify = useCallback(() => {
    const correctSet = new Set(currentScenario.correctIssues)
    const userSet = selectedIssues

    // Penalize for wrong selections
    const wrongSelections = Array.from(userSet).filter(i => !correctSet.has(i)).length
    const missedIssues = Array.from(correctSet).filter(i => !userSet.has(i)).length

    const isPerfect = wrongSelections === 0 && missedIssues === 0

    setIsVerified(true)
    if (isPerfect) {
      setScore(prev => prev + 1)
    }
  }, [selectedIssues, currentScenario.correctIssues])

  const handleNext = useCallback(() => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedIssues(new Set())
      setIsVerified(false)
    } else {
      onComplete(score, scenarios.length)
    }
  }, [currentIndex, scenarios.length, score, onComplete])

  const isIssueCorrect = useCallback((issue: string) => {
    return currentScenario.correctIssues.includes(issue)
  }, [currentScenario.correctIssues])

  const getIssueStatus = useCallback((issue: string) => {
    if (!isVerified) return 'neutral'

    const isSelected = selectedIssues.has(issue)
    const isCorrectIssue = isIssueCorrect(issue)

    if (isSelected && isCorrectIssue) return 'correct' // True positive
    if (isSelected && !isCorrectIssue) return 'wrong' // False positive
    if (!isSelected && isCorrectIssue) return 'missed' // False negative
    return 'neutral' // True negative
  }, [isVerified, selectedIssues, isIssueCorrect])

  const correctCount = Array.from(selectedIssues).filter(i => isIssueCorrect(i)).length
  const wrongCount = Array.from(selectedIssues).filter(i => !isIssueCorrect(i)).length
  const missedCount = currentScenario.correctIssues.filter(i => !selectedIssues.has(i)).length

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Escenario {currentIndex + 1} de {scenarios.length}
        </span>
        <span className="text-sm font-medium text-green-400">
          Puntuación: {score}/{currentIndex + (isVerified ? 1 : 0)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${((currentIndex + (isVerified ? 1 : 0)) / scenarios.length) * 100}%` }}
        />
      </div>

      {/* Scenario Header */}
      <div className="card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20">
            <Store className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold">{currentScenario.title}</h3>
            <p className="text-xs text-red-400">Aplicación rechazada</p>
          </div>
        </div>
        <p className="text-sm text-gray-300">{currentScenario.description}</p>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <AlertTriangle className="h-4 w-4" />
          <span>Selecciona los problemas que causarían el rechazo:</span>
        </div>

        {currentScenario.issues.map(issue => {
          const status = getIssueStatus(issue)
          const isSelected = selectedIssues.has(issue)

          return (
            <button
              key={issue}
              onClick={() => handleIssueToggle(issue)}
              disabled={isVerified}
              className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                isVerified
                  ? status === 'correct'
                    ? 'border-green-500 bg-green-600/10'
                    : status === 'wrong'
                      ? 'border-red-500 bg-red-600/10'
                      : status === 'missed'
                        ? 'border-yellow-500 bg-yellow-600/10'
                        : 'border-gray-600 bg-gray-800'
                  : isSelected
                    ? 'border-orange-500 bg-orange-600/20'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              } ${isVerified ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={issue}
              aria-pressed={isSelected}
            >
              {/* Checkbox */}
              <div
                className={`flex h-6 w-6 items-center justify-center rounded border-2 ${
                  isVerified
                    ? status === 'correct'
                      ? 'border-green-500 bg-green-500'
                      : status === 'wrong'
                        ? 'border-red-500 bg-red-500'
                        : status === 'missed'
                          ? 'border-yellow-500'
                          : 'border-gray-600'
                    : isSelected
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-600'
                }`}
              >
                {(isSelected || status === 'missed') && (
                  <span className="text-white">
                    {status === 'correct' && <CheckCircle className="h-4 w-4" />}
                    {status === 'wrong' && <XCircle className="h-4 w-4" />}
                    {status === 'missed' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {!isVerified && isSelected && '✓'}
                  </span>
                )}
              </div>

              {/* Issue Text */}
              <span className={status === 'wrong' ? 'line-through opacity-50' : ''}>
                {issue}
              </span>

              {/* Status Label */}
              {isVerified && (
                <span
                  className={`ml-auto text-xs ${
                    status === 'correct'
                      ? 'text-green-400'
                      : status === 'wrong'
                        ? 'text-red-400'
                        : status === 'missed'
                          ? 'text-yellow-400'
                          : ''
                  }`}
                >
                  {status === 'correct' && 'Correcto'}
                  {status === 'wrong' && 'Incorrecto'}
                  {status === 'missed' && 'No seleccionado'}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Results */}
      {isVerified && (
        <div
          className={`rounded-lg border p-4 ${
            wrongCount === 0 && missedCount === 0
              ? 'border-green-600/30 bg-green-600/10'
              : 'border-yellow-600/30 bg-yellow-600/10'
          }`}
        >
          <div className="mb-3 flex items-start gap-3">
            {wrongCount === 0 && missedCount === 0 ? (
              <CheckCircle className="mt-0.5 h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-400" />
            )}
            <div>
              <p className="font-medium">
                {wrongCount === 0 && missedCount === 0
                  ? '¡Perfecto! Identificaste todos los problemas'
                  : `${correctCount} correctos, ${wrongCount} erróneos, ${missedCount} omitidos`}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-lg bg-gray-800 p-3">
            <p className="text-sm font-medium text-gray-300">Explicación:</p>
            <p className="mt-1 text-sm text-gray-400">{currentScenario.explanation}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end">
        {!isVerified ? (
          <button
            onClick={handleVerify}
            disabled={selectedIssues.size === 0}
            className="btn-primary flex items-center gap-2"
            aria-label="Verificar selección"
          >
            Verificar
            <CheckCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
            aria-label={currentIndex < scenarios.length - 1 ? 'Siguiente escenario' : 'Ver resultados'}
          >
            {currentIndex < scenarios.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Legend */}
      {isVerified && (
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span>Leyenda:</span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded bg-green-500" /> Problema correcto
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded bg-red-500" /> Falsa alarma
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded border-2 border-yellow-500" /> Problema omitido
          </span>
        </div>
      )}
    </div>
  )
}
